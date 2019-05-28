//=============================================================================
// AfterImage.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
// 1.3.0 2019/05/27 ・機能を削減し、ピクチャ専用のプラグインとした
//                  ・キャラクターに残像を表示したい場合は下記プラグインを利用すると良いかも
//                    https://github.com/rev2nym/SAN_ResidualSprites
//
// 1.2.1 2018/01/21 ・コマンド実行時に即時反映されない不具合を修正
//                  ・ピクチャが中央表示だった場合にうまく表示されない不具合を修正
//
// 1.2.0 2018/01/06 ・乗り物に残像を表示する機能を追加
//                  ・本プラグイン使用中にセーブ／ロードを行ったときにエラーになる問題を修正。
//
// 1.1.0 2017/09/13 ・イベント、プレイヤー、フォロワーに残像を表示する機能を追加
//                  ・ピクチャーの移動でのみ残像を表示していた仕様を、
//                    ピクチャーの表示内容に何らかの変更があった場合に残像を表示するように修正。
//
// 1.0.0 2017/09/08 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:
 * @plugindesc Plugin that display ghosting when a picture is moved.
 * @author velfare_nagata
 * https://twitter.com/velfare_nagata
 *
 * @param feedoutOpacityPerFrame
 * @desc The value of frames to fade out.
 * @default 10
 * @min 1
 * @max 600
 * 
 * @param feedoutImageToneR
 * @desc The value of the afterimage R.
 * @default -255
 * @min -255
 * @max 255
 * 
 * @param feedoutImageToneG
 * @desc The value of the afterimage G.
 * @default -255
 * @min -255
 * @max 255
 * 
 * @param feedoutImageToneB
 * @desc The value of the afterimage B.
 * @default 255
 * @min -255
 * @max 255
 *
 * @help Execute the following plugin command to display or hide afterimage for the specified picture.
 * If not specified parameter of any, the plugin parameters are applied.
 *
 * Displaying the picture's afterimage
 * - PICT_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 *   {0}:[Required]The value of picture id.
 *   {1}:[Any]The value of frames to fade out.
 *   {2}:[Any]The value of the afterimage R.
 *   {3}:[Any]The value of the afterimage G.
 *   {4}:[Any]The value of the afterimage B.
 * 
 * Hiding the picture's afterimage
 * - PICT_AFTERIMAGE_REMOVE {0}
 *   {0}:[Required]The value of picture id.
 * 
 */
/*:ja
 * @plugindesc ピクチャが移動した際に残像を表示するプラグインです。
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/lPiZ.‏
 *
 * @param feedoutOpacityPerFrame
 * @desc 残像がフェードアウトするまでのフレーム数
 * @default 10
 * 
 * @param feedoutImageToneR
 * @desc 残像の色調(R)
 * @default -255
 * 
 * @param feedoutImageToneG
 * @desc 残像の色調(G)
 * @default -255
 * 
 * @param feedoutImageToneB
 * @desc 残像の色調(B)
 * @default 255
 *
 * @help 下記のプラグインコマンドを実行し、指定したピクチャに対して残像の有効／無効を設定します。
 * ※任意のパラメータが未指定の場合はプラグインパラメータが適用されます。
 *
 * ピクチャの残像を有効にする場合
 * ・PICT_AFTERIMAGE_ADD {0} {1} {2} {3} {4}
 * ・ピクチャの残像追加 {0}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【任意】残像がフェードアウトするまでのフレーム数
 *   {2}：【任意】残像の色調(R)
 *   {3}：【任意】残像の色調(G)
 *   {4}：【任意】残像の色調(B)
 * 
 * ピクチャの残像を無効にする場合
 * ・PICT_AFTERIMAGE_REMOVE {0}
 * ・ピクチャの残像削除 {0}
 *   {0}：【必須】ピクチャ番号
 * 
 */

( function() {
    'use strict';
    var pluginName = 'NGT_Afterimage';
    
    // --------------------------------------------------
    // ローカル関数
    // 参考：トリアコンタン殿の各種プラグインファイル
    // --------------------------------------------------
    let getArgNumber = function( arg, min, max ) {
        min = ( arguments.length < 2 ) ? -Infinity : min; 
        max = ( arguments.length < 3 ) ? -Infinity : max;

        return ( parseInt( convertEscapeCharacters( arg ), 10 ) || 0 ).clamp( min, max );
	};
    let convertEscapeCharacters = function( text ) {
        text = ( text == null ) ? '' : text;
        let window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters( text ) : text;
    };

    // --------------------------------------------------
    // ローカル関数
    // 参考：フトコロ殿の各種プラグインファイル
    // --------------------------------------------------
    var getParam = function( paramNames ) {
        for( var i = 0; i < paramNames.length; i++ ) {
            var name = PluginManager.parameters( pluginName )[paramNames[i]];
            if( name ) {
                return name;
            }
        }
        return null;
    };
    var getParamNumber = function( paramNames, min, max ) {
        min = ( arguments.length < 2 ) ? -Infinity : min; 
        max = ( arguments.length < 3 ) ? -Infinity : max;

        var value = getParam( paramNames );
        return ( parseInt( value, 10 ) || 0 ).clamp( min, max );
    };

	// --------------------------------------------------
    // プラグインコマンド追加
    // --------------------------------------------------
    let _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function( command, args ) {
		_Game_Interpreter_pluginCommand.apply( this, arguments );
        if( $gameTemp.afterImageManager == null ) {
            let maxPictures = new Game_Screen().maxPictures();
            $gameTemp.afterImageManager = new AfterImageManager( maxPictures );        
        }
        let manager = $gameTemp.afterImageManager;
		let commandName = command.toUpperCase();
        switch( commandName ) {
            case 'PICT_AFTERIMAGE_ADD' :
            case 'ピクチャの残像追加':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                if( pictureId < 1 || manager.maxPictures < pictureId ) {
                    console.warn( `指定したピクチャID[${pictureId}]が不正です。` );
                    return;
                }
                let feedoutOpacityPerFrame = ( args.length >= 2 ) ? getArgNumber( args[1], 0, 255 ) : manager.feedoutOpacityPerFrame;
                let feedoutImageToneR = ( args.length >= 3 ) ? getArgNumber( args[2], -255, 255 ) : manager.feedoutImageToneR;
                let feedoutImageToneG = ( args.length >= 4 ) ? getArgNumber( args[3], -255, 255 ) : manager.feedoutImageToneG;
                let feedoutImageToneB = ( args.length >= 5 ) ? getArgNumber( args[4], -255, 255 ) : manager.feedoutImageToneB;
                let data = new AfterImage_Data( pictureId, feedoutOpacityPerFrame, feedoutImageToneR, feedoutImageToneG, feedoutImageToneB )
                $gameTemp.afterImageManager.setAfterImageData( data );
                break;
            case 'PICT_AFTERIMAGE_REMOVE' :
            case 'ピクチャの残像削除':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                if( pictureId < 1 || manager.maxPictures < pictureId ) {
                    console.warn( `指定したピクチャID[${pictureId}]が不正です。` );
                    return;
                }
                $gameTemp.afterImageManager.removeAfterImageData( pictureId );
                break;
        }
    };

    // AfterImageManager----------------------------------------------------------------------------
    // ---
    // AfterImageManagerの新しいインスタンスを初期化します。
    // ---
    function AfterImageManager() {
        this.initialize.apply( this, arguments );
    }

    // ---
    // AfterImageManagerのインスタンスを初期化します。
    // ・プラグインパラメータを取得します。
    // ・表示可能なピクチャ数分だけ残像表示データ格納用配列を広げます。
    // ---
    AfterImageManager.prototype.initialize = function( maxPictures ) {
        this.maxPictures = maxPictures;
        this.feedoutOpacityPerFrame = getParamNumber(['feedoutOpacityPerFrame'], 1, 600 );
        this.feedoutImageToneR = getParamNumber(['feedoutImageToneR'], -255, 255 );
        this.feedoutImageToneG = getParamNumber(['feedoutImageToneG'], -255, 255 );
        this.feedoutImageToneB = getParamNumber(['feedoutImageToneB'], -255, 255 );
        this._datas = new Array();
        this._containers = new Array();
        let pictureContainer = SceneManager._scene._spriteset._pictureContainer;
        for( var i = 0; i < maxPictures; i++ ) {
            this._datas.push( null );
            let container = new Sprite();
            this._containers.push( container );
            pictureContainer.addChildAt( container, ( i * 2 ) );
        }
    };

    // ---
    // 指定したピクチャ番号の残像表示用コンテナを取得します。
    //
    // 引数
    // ・pictureId : ピクチャID
    //
    // 戻値
    // ・残像表示用コンテナ
    // ---
    AfterImageManager.prototype.getContainer = function( pictureId ) {
        return this._containers[pictureId - 1];
    };

    // ---
    // 指定したピクチャ番号の残像表示データを取得します。
    //
    // 引数
    // ・pictureId : ピクチャID
    //
    // 戻値
    // ・残像表示データ
    // ---
    AfterImageManager.prototype.getAfterImageData = function( pictureId ) {
        return this._datas[pictureId - 1];
    };

    // ---
    // 指定したピクチャ番号の残像表示データを登録します。
    //
    // 引数
    // ・data : 残像表示データ
    //
    // 戻値
    // ・なし
    // ---
    AfterImageManager.prototype.setAfterImageData = function( data ) {
        let dataIndex = data.pictureId - 1;
        if( this.isEnable( data.pictureId ) ) {
            this.removeAfterImageData( data.pictureId );
        }
        this._datas[dataIndex] = data;
    };

    // ---
    // 指定したピクチャ番号の残像表示データを削除します。
    //
    // 引数
    // ・pictureId : ピクチャID
    //
    // 戻値
    // ・なし
    // ---
    AfterImageManager.prototype.removeAfterImageData = function( pictureId ) {
        let dataIndex = pictureId - 1;
        let data = this._datas[dataIndex];
        if( data == null ) {
            return;
        }
        data.dispose();
        this._datas[dataIndex] = null;
    };

    // ---
    // 指定したピクチャ番号の残像表示データが有効か否かを判定します。
    //
    // 引数
    // ・pictureId : ピクチャID
    //
    // 戻値
    // ・残像表示データ有効可否
    // ---
    AfterImageManager.prototype.isEnable = function( pictureId ) {
        return this._datas[pictureId - 1] != null;
    };
    // --------------------------------------------------------------------------------------------

    // AfterImage_Data----------------------------------------------------------------------------
    // ---
    // AfterImage_Dataの新しいインスタンスを初期化します。
    // ---
    function AfterImage_Data() {
        this.initialize.apply( this, arguments );
    };

    // ---
    // AfterImage_Dataのインスタンスを初期化します。
    // ・残像を表示する対象のピクチャの参照を準備します。
    // ・残像を表示するためのスプライト／コンテナを準備します。
    // ・残像描画用のビットマップのキャッシュを準備します。
    // ---
    AfterImage_Data.prototype.initialize = function( pictureId, feedoutOpacityPerFrame, feedoutImageToneR, feedoutImageToneG, feedoutImageToneB ) {
        this.pictureId = pictureId;
        this.feedoutOpacityPerFrame = feedoutOpacityPerFrame;
        this.feedoutImageToneR = feedoutImageToneR;
        this.feedoutImageToneG = feedoutImageToneG;
        this.feedoutImageToneB = feedoutImageToneB;
        this.feedoutOpacityValue = 255 / feedoutOpacityPerFrame;
        this._loopCount = 0;
        this._picture = SceneManager._scene._spriteset._pictureContainer.children[( pictureId * 2 ) - 1];
        this._bitmapCache = this.getAfterImageBitmap();
        this._container = $gameTemp.afterImageManager.getContainer( pictureId );
        this._sprites = new Array();
        for( var i = 0; i < feedoutOpacityPerFrame; i++ ) {
            this._sprites.push( new Sprite() );
        }
    };

    // ---
    // 指定したピクチャデータをもとに、残像の描画更新処理を実行します。
    // 必要があれば残像表示用のビットマップキャッシュを更新し、
    // 新規残像の追加描画を行います。
    //
    // 引数
    // pictureData   : ピクチャデータ
    // isUpdateCache : ビットマップキャッシュ更新フラグ
    //
    // 戻値
    // ・なし
    // ---
    AfterImage_Data.prototype.update = function( pictureData, isUpdateCache ) {
        for( var i = 0; i < this._container.children.length; i++ ) {
            let sprite = this._container.children[i];
            if( sprite.parent != null )
            {
                sprite.opacity -= this.feedoutOpacityValue
                if( sprite.opacity < 0 ) {
                    this._container.removeChild( sprite );
                    i --;
                }
            }
        }
        if( pictureData != null ) {
            this.addAfterImage( pictureData, isUpdateCache );
        }
    };

    // ---
    // 新規残像の追加描画を行います。
    // 必要があれば残像表示用のビットマップキャッシュを更新します。
    //
    // 引数
    // pictureData   : ピクチャデータ
    // isUpdateCache : ビットマップキャッシュ更新フラグ
    //
    // 戻値
    // ・なし
    // ---
    AfterImage_Data.prototype.addAfterImage = function( pictureData, isUpdateCache ) {
        if( isUpdateCache || this._bitmapCache == null ) {
            this._bitmapCache = this.getAfterImageBitmap();
        }
        let sprite = this._sprites[this._loopCount];
        this.setupSprite( sprite, pictureData );
        this._container.addChildAt( sprite, 0 );
        this._loopCount ++;
        if( this._loopCount >= this._sprites.length ) {
            this._loopCount = 0;
        }
    };

    // ---
    // 指定したスプライトに、指定したピクチャデータを反映します。
    //
    // 引数
    // sprite      : 残像表示用スプライト
    // pictureData : ピクチャデータ
    //
    // 戻値
    // ・なし
    // ---
    AfterImage_Data.prototype.setupSprite = function( sprite, pictureData ) {
        sprite.bitmap = this._bitmapCache;
        sprite.frame = pictureData.frame;
        sprite.scale = pictureData.scale;
        sprite.anchor = pictureData.anchor;
        sprite.x = pictureData.x;
        sprite.y = pictureData.y;
        sprite.rotation = pictureData.rotation;
        sprite.opacity = 255;
    };

    // ---
    // 参照中のピクチャが表示している、ビットマップ情報から、
    // 残像表示用のビットマップ情報を取得します。
    //
    // 引数
    // ・なし
    //
    // 戻値
    // ・残像表示用のビットマップ情報
    // ---
    AfterImage_Data.prototype.getAfterImageBitmap = function() {
        // ピクチャのBitmapデータがとれない、またはBitmapデータの準備ができていない場合は無視
        if( this._picture.bitmap == null || this._picture.bitmap.width == 0 ) {
            return null;
        }
        // イメージの取得
        let width = this._picture.bitmap.width;
        let height = this._picture.bitmap.height;
        let bitmap = new Bitmap( width, height );
        bitmap.bltImage( this._picture.bitmap, 0, 0, width, height, 0, 0 );
        // 色調補正
        let canvas = bitmap._context;
        let imageData = canvas.getImageData( 0, 0, width, height );
        let pixels = imageData.data;
        for( let i = 0; i < pixels.length; i += 4 ) {
            pixels[i + 0] += this.feedoutImageToneR;
            pixels[i + 1] += this.feedoutImageToneG;
            pixels[i + 2] += this.feedoutImageToneB;
        }
        canvas.putImageData( imageData, 0, 0 );
        return bitmap;
    };

    // ---
    // AfterImage_Dataのインスタンスを安全に破棄します。
    // ・紐づいている残像表示用コンテナから全ての残像スプライトを削除します。
    // ---
    AfterImage_Data.prototype.dispose = function() {
        while( this._container.children.length > 0 ) {
            this._container.removeChildAt( 0 );
        }
        this._container = null;
        this._bitmapCache = null;
        this._sprites = null;
    };
    // --------------------------------------------------------------------------------------------

    // Sprite_Picture_Data-------------------------------------------------------------------------
    // ---
    // Sprite_Picture_Dataの新しいインスタンスを初期化します。
    // ---
    function Sprite_Picture_Data() {
        this.initialize.apply( this, arguments );
    };

    // ---
    // Sprite_Picture_Dataのインスタンスを初期化します。
    // ・指定したピクチャから下記情報を取得します。
    //   ・ファイル名
    //   ・表示フレーム情報
    //   ・原点情報
    //   ・座標
    //   ・拡縮率
    //   ・回転率
    // ---
    Sprite_Picture_Data.prototype.initialize = function( picture ) {
        this.name = picture._pictureName;
        this.frame = new Array();
        this.frame.push( picture._frame[0] );
        this.frame.push( picture._frame[1] );
        this.frame.push( picture._frame[2] );
        this.frame.push( picture._frame[3] );
        this.anchor = {
            x: picture.anchor.x,
            y: picture.anchor.y
        };
        this.x = picture.x;
        this.y = picture.y;
        this.scale = {
            x: picture.scale.x,
            y: picture.scale.y
        };
        this.rotation = picture.rotation;
    };

    // ---
    // 指定したオブジェクトと同値か否かを判定します。
    //
    // 引数
    // ・other : 比較対象オブジェクト
    //
    // 戻値
    // ・同値正否
    // ---
    Sprite_Picture_Data.prototype.equals = function( other ) {
        if( other.constructor !== Sprite_Picture_Data ) {
            return false;
        }
        var isEquals = this.name == other.name;
        isEquals &= this.frame[0] == other.frame[0];
        isEquals &= this.frame[1] == other.frame[1];
        isEquals &= this.frame[2] == other.frame[2];
        isEquals &= this.frame[3] == other.frame[3];
        isEquals &= this.x == other.x;
        isEquals &= this.y == other.y;
        isEquals &= this.scale.x == other.scale.x;
        isEquals &= this.scale.y == other.scale.y;
        isEquals &= this.anchor.x == other.anchor.x;
        isEquals &= this.anchor.y == other.anchor.y;
        isEquals &= this.rotation == other.rotation;
        return isEquals;
    };
    // --------------------------------------------------------------------------------------------

    // Sprite_Picture------------------------------------------------------------------------------
    // ---
    // 【Override】
    // 残像表示が有効なピクチャの残像の描画更新を行います。
    // また、ピクチャの表示更新が確認された場合は、残像の追加を行います。
    // ---
    var _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function() {
        // afterImageManagerに指定されていない場合は無視
        if( $gameTemp.afterImageManager == null) {
            _Sprite_Picture_update.apply( this, arguments );
            return;
        }
        // 残像情報がとれない、または残像が有効でない場合は既存処理のみ実行して処理終了
        var pictureId = this._pictureId;
        if( !$gameTemp.afterImageManager.isEnable( pictureId ) ) {
            _Sprite_Picture_update.apply( this, arguments );
            return;
        }

        // ピクチャ更新前／更新後を比較して変化がある場合は残像を表示する
        var data = $gameTemp.afterImageManager.getAfterImageData( pictureId );
        var before = new Sprite_Picture_Data( this );
        _Sprite_Picture_update.apply( this, arguments );
        var after = new Sprite_Picture_Data( this );
        if( before.equals( after ) ) {
            // 残像を描画する
            data.update();
        } else {
            // 残像を追加＆描画する
            data.update( before );
        }

    };
    // --------------------------------------------------------------------------------------------

    // // Game_Temp-----------------------------------------------------------------------------------
    // // ---
    // // 【Override】
    // // 残像表示処理オブジェクトをGameTempに定義します。
    // // ---
    // let _Game_Temp_initialize = Game_Temp.prototype.initialize;
	// Game_Temp.prototype.initialize = function() {
    //     _Game_Temp_initialize.apply( this, arguments );
    //     let maxPictures = new Game_Screen().maxPictures();
    //     this.afterImageManager = new AfterImageManager( maxPictures );
    // };
    // ---
    // 【Override】
    // 残像表示処理オブジェクトをGameTempに定義します。
    // ---
    var _Spriteset_Base_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function() {
        _Spriteset_Base_initialize.apply( this, arguments );
        $gameTemp.afterImageManager = null;
    };
    // --------------------------------------------------------------------------------------------
})();