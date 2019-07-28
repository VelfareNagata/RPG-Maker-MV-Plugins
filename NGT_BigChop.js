//=============================================================================
// BigChop.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// 
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:
 * @plugindesc this plug-in shreds pictures.
 * 
 * @author velfare_nagata
 * 
 * @param isCalculationOnScreen
 * @desc If true, treats the coordinate (0, 0) as the top left corner of the screen.
 * If false, treat the coordinates (0, 0) as the upper left of the image.
 * @type boolean
 * @default false
 * 
 * @param isEraseTargetPicture
 * @desc If true, erases jagged pictures.
 * If false, the shattered picture remains visible.
 * @type boolean
 * @default false
 * 
 * @param splitArrangement
 * @desc If TopBottom(1), the jagged picture is placed vertically.
 * If LeftRight(2), the jagged picture is placed left and right.
 * @type select
 * @option TopBottom
 * @value 1
 * @option LeftRight
 * @value 2
 * @default 1
 * 
 * @help The following sample game shows how to use this plug-in.
 * [Caution]I'm sorry, but we only support Japanese.
 * http://velvel.net/Cynthia/Game/BigChopSampleGame/www/
 *
 * Version
 * 2.0.0 2019/07/26 - Reduced functionality and a dedicated picture plug-in.
 * 1.0.0 2018/01/16 - Published
 * 
 * * The following plug-in commands can be used to chop picture.
 *     * PICT_BIGCHOP {0} {1} {2} {3} {4} {5} {6}
 *       {0}:[Required]target picture number
 *       {1}:[Required]Picture number.1 for displaying a chopped image
 *       {2}:[Required]Picture number.2 for displaying a chopped image
 *       {3}:[Required]X coordinate of the point A via the straight chop line
 *       {4}:[Required]Y coordinate of the point A via the straight chop line
 *       {5}:[Required]X coordinate of the point B via the straight chop line
 *       {6}:[Required]Y coordinate of the point B via the straight chop line
 * 
 * * Plug‐in commands chop the picture specified by {0} in a straight line through the coordinates specified by {3} to {6}.
 *   chopped images are displayed with the number specified by {1} to {2}.
 * 
 * * If splitArrangement is TopBottom(1),
 *   the top of the chopped image is displayed on the {1} side, 
 *   and the bottom of the chopped image is displayed on the {2} side.
 *   If splitArrangement is LeftRight(2),
 *   the left of the chopped image is displayed on the {1} side, 
 *   and the right of the chopped image is displayed on the {2} side.
 * 
 * * If isEraseTargetPicture is false,
 *   chopped picture {0} is not automatically deleted.
 * * If isEraseTargetPicture is true,
 *   chopped picture {0} is deleted automatically.
 * 
 * * If isCalculationOnScreen is false,
 *   The coordinates specified in {3} to {6} designate the upper left corner of "Image" as (0, 0).
 *   If isCalculationOnScreen is true,
 *   The coordinates specified in {3} to {6} designate the upper left corner of "Screen" as (0, 0).
 * 
 * * The values of plug-in parameters can be changed using the following plug-in commands.
 * 
 *   * If you change isCalculationOnScreen to false
 *     * SET_BIGCHOP_CALC_ON_IMAGE
 * 
 *   * If you change isCalculationOnScreen to true
 *     * SET_BIGCHOP_CALC_ON_SCREEN
 * 
 *   * If you change isEraseTargetPicture to false
 *     * SET_BIGCHOP_ERASE_TARGET_MANUAL
 * 
 *   * If you change isEraseTargetPicture to true
 *     * SET_BIGCHOP_ERASE_TARGET_AUTO
 * 
 *   * If you change splitArrangement to TopBottom(1)
 *     * SET_BIGCHOP_ARRANGEMENT_TOP_BOTTOM
 * 
 *   * If you change splitArrangement to LeftRight(2)
 *     * SET_BIGCHOP_ARRANGEMENT_LEFT_RIGHT
 */

/*:ja
 * @plugindesc ピクチャをぶった斬るプラグインです。
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/lPiZ.‏
 * 
 * @param isCalculationOnScreen
 * @desc trueの場合、座標(0,0)を画面の左上として処理します。
 * falseの場合、座標(0,0)を画像の左上として処理します。
 * @type boolean
 * @default false
 * 
 * @param isEraseTargetPicture
 * @desc trueの場合、ぶった斬ったピクチャを消去します。
 * falseの場合、ぶった斬ったピクチャは表示されたままです。
 * @type boolean
 * @default false
 * 
 * @param splitArrangement
 * @desc TopBottom(1)の場合、ぶった斬ったピクチャを上下で配置します。
 * LeftRight(2)の場合、ぶった斬ったピクチャを左右で配置します。
 * @type select
 * @option TopBottom
 * @value 1
 * @option LeftRight
 * @value 2
 * @default 1
 * 
 * @help このプラグインの使い方は下記のサンプルゲームにて紹介しています。
 * http://velvel.net/Cynthia/Game/BigChopSampleGame/www/
 *
 * 更新履歴
 * 2.0.0 2019/07/26 - 機能を削減し、ピクチャ専用のプラグインとした
 * 1.0.0 2018/01/16 - 初版
 * 
 * * 下記プラグインコマンドを実行することで、ピクチャのぶった斬ることができます。
 *     * PICT_BIGCHOP {0} {1} {2} {3} {4} {5} {6}
 *     * ピクチャのぶった斬り {0} {1} {2} {3} {4} {5} {6}
 *       {0}:【必須】ぶった斬り対象ピクチャ番号
 *       {1}:【必須】ぶった斬った画像を表示するピクチャ番号その1
 *       {2}:【必須】ぶった斬った画像を表示するピクチャ番号その2
 *       {3}:【必須】ピクチャをぶった斬る直線の経由点AのX座標
 *       {4}:【必須】ピクチャをぶった斬る直線の経由点AのY座標
 *       {5}:【必須】ピクチャをぶった斬る直線の経由点BのX座標
 *       {6}:【必須】ピクチャをぶった斬る直線の経由点BのY座標
 * 
 * * プラグインコマンドを実行すると、{0}で指定したピクチャを、{3}～{6}で指定した座標を通る直線でぶった斬ります。
 *   ぶった斬った画像を{1}～{2}で指定した番号のピクチャで表示します。
 * 
 * * splitArrangementがTopBottom(1)の場合、
 *   {1}側に画像の上部分が、{2}側に画像の下部分が表示されます。
 *   splitArrangementがLeftRight(2)の場合、
 *   {1}側に画像の上部分が、{2}側に画像の下部分が表示されます。
 * 
 * * isEraseTargetPictureがfalseの場合、
 *   ぶった斬った{0}のピクチャは自動では消去されません。
 *   isEraseTargetPictureがtrueの場合、
 *   ぶった斬った{0}のピクチャは自動的に消去されます。
 * 
 * * isCalculationOnScreenがfalseの場合、
 *   {3}～{6}で指定する座標には、「画像」の左上端を(0,0)として座標を指定します。
 *   isCalculationOnScreenがtrueの場合、
 *   {3}～{6}で指定する座標には、「画面」の左上端を(0,0)として座標を指定します。
 * 
 * * プラグインパラメータの値は下記プラグインコマンドで変更可能です。
 * 
 *   * isCalculationOnScreenをfalseに変更する場合
 *     * SET_BIGCHOP_CALC_ON_IMAGE
 *     * ぶった斬りを画像左上からする
 * 
 *   * isCalculationOnScreenをtrueに変更する場合
 *     * SET_BIGCHOP_CALC_ON_SCREEN
 *     * ぶった斬りを画面左上からする
 * 
 *   * isEraseTargetPictureをfalseに変更する場合
 *     * SET_BIGCHOP_ERASE_TARGET_MANUAL
 *     * ぶった斬りピクチャを手動消去する
 * 
 *   * isEraseTargetPictureをtrueに変更する場合
 *     * SET_BIGCHOP_ERASE_TARGET_AUTO
 *     * ぶった斬りピクチャを自動消去する
 * 
 *   * splitArrangementをTopBottom(1)に変更する場合
 *     * SET_BIGCHOP_ARRANGEMENT_TOP_BOTTOM
 *     * ぶった斬りピクチャを上下で配置する
 * 
 *   * splitArrangementをLeftRight(2)に変更する場合
 *     * SET_BIGCHOP_ARRANGEMENT_LEFT_RIGHT
 *     * ぶった斬りピクチャを左右で配置する
 */

( function() {
    'use strict';
    var pluginName = 'NGT_BigChop';
    
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
    var getParamBoolean = function( paramNames ) {
        var value = getParam( paramNames );
        return ( value == "true" );
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
		let commandName = command.toUpperCase();
        let manager = $gameTemp.bigchopManager;
        switch( commandName ) {
            case 'PICT_BIGCHOP' :
            case 'ピクチャのぶった斬り':
                let targetPictureId = ( args.length >= 1 ) ? getArgNumber( args[0], -9999, 9999 ) : null;
                let displayPictureId1 = ( args.length >= 2 ) ? getArgNumber( args[1], -9999, 9999 ) : null;
                let displayPictureId2 = ( args.length >= 3 ) ? getArgNumber( args[2], -9999, 9999 ) : null;
                let pointAX = ( args.length >= 4 ) ? getArgNumber( args[3], -9999, 9999 ) : null;
                let pointAY = ( args.length >= 5 ) ? getArgNumber( args[4], -9999, 9999 ) : null;
                let pointBX = ( args.length >= 6 ) ? getArgNumber( args[5], -9999, 9999 ) : null;
                let pointBY = ( args.length >= 7 ) ? getArgNumber( args[6], -9999, 9999 ) : null;
                let maxPictures = new Game_Screen().maxPictures();
                if( targetPictureId == null || targetPictureId < 1 || maxPictures < targetPictureId ) {
                    console.warn( `指定したぶった斬り対象ピクチャ番号[${targetPictureId}]が不正です。` );
                    return;
                }
                if( displayPictureId1 == null || displayPictureId1 < 1 || maxPictures < displayPictureId1 ) {
                    console.warn( `指定したぶった斬り後画像表示ピクチャ番号1[${displayPictureId1}]が不正です。` );
                    return;
                }
                if( displayPictureId2 == null || displayPictureId2 < 1 || maxPictures < displayPictureId2 ) {
                    console.warn( `指定したぶった斬り後画像表示ピクチャ番号2[${displayPictureId2}]が不正です。` );
                    return;
                }
                if( pointAX == null ) {
                    console.warn( `指定したぶった斬り直線経由点AのX座標[${pointAX}]が不正です。` );
                    return;
                }
                if( pointAY == null ) {
                    console.warn( `指定したぶった斬り直線経由点AのY座標[${pointAY}]が不正です。` );
                    return;
                }
                if( pointBX == null ) {
                    console.warn( `指定したぶった斬り直線経由点BのX座標[${pointBX}]が不正です。` );
                    return;
                }
                if( pointBY == null ) {
                    console.warn( `指定したぶった斬り直線経由点BのY座標[${pointBY}]が不正です。` );
                    return;
                }
                let line = new StraightLine( pointAX, pointAY, pointBX, pointBY );
                manager.execute( targetPictureId, displayPictureId1, displayPictureId2, line );
                break;
            case 'SET_BIGCHOP_CALC_ON_SCREEN' :
            case 'ぶった斬りを画面左上からする':
                manager.isCalculationOnScreen = true;
                break;
            case 'SET_BIGCHOP_CALC_ON_IMAGE' :
            case 'ぶった斬りを画像左上からする':
                manager.isCalculationOnScreen = false;
                break;
            case 'SET_BIGCHOP_ERASE_TARGET_AUTO' :
            case 'ぶった斬りピクチャを自動消去する':
                manager.isEraseTargetPicture = true;
                break;
            case 'SET_BIGCHOP_ERASE_TARGET_MANUAL' :
            case 'ぶった斬りピクチャを手動消去する':
                manager.isEraseTargetPicture = false;
                break;
            case 'SET_BIGCHOP_ARRANGEMENT_TOP_BOTTOM' :
            case 'ぶった斬りピクチャを上下で配置する':
                manager.splitArrangement = 1;
                break;
            case 'SET_BIGCHOP_ARRANGEMENT_LEFT_RIGHT' :
            case 'ぶった斬りピクチャを左右で配置する':
                manager.splitArrangement = 2;
                break;
        }
    };

    //  BigchopManager----------------------------------------------------------------------------
    // ---
    // BigchopManagerの新しいインスタンスを初期化します。
    // ---
    function BigchopManager() {
        this.initialize.apply( this, arguments );
    };

    // ---
    // BigchopManagerのインスタンスを初期化します。
    // ・プラグインパラメータを取得します。
    // ---
    BigchopManager.prototype.initialize = function() {
        this.isCalculationOnScreen = getParamBoolean(['isCalculationOnScreen'] );
        this.isEraseTargetPicture = getParamBoolean(['isEraseTargetPicture'] );
        this.isArrangedUpAndDown = getParamNumber(['splitArrangement'], 1, 2 );
    };

    // ---
    // 指定した番号のピクチャの有効可否を判定します。
    //
    // 引数
    // ・pictureId : ピクチャ番号
    //
    // 戻値
    // ・ピクチャの有効可否
    // ---
    BigchopManager.prototype.isEnabledPicture = function( pictureId ) {
        let targetPicture = SceneManager._scene._spriteset._pictureContainer.children[pictureId - 1];
        let targetBitmap = targetPicture.bitmap;
        if( targetBitmap == null ) {
            console.warn( `ピクチャのBitmapデータが取得できません。(ピクチャ番号：${pictureId})` );
            return false;
        }
        if( targetBitmap.width == 0 ) {
            console.warn( `ピクチャのBitmapデータが表示する準備ができていません。(ピクチャ番号：${pictureId})` );
            return false;
        }
        return true;
    };

    // ---
    // 指定した番号のピクチャのRectangleを取得します。
    //
    // 引数
    // ・pictureId : ピクチャ番号
    //
    // 戻値
    // ・ピクチャのRectangle
    // ---
    BigchopManager.prototype.getPictureRectangle = function( pictureId ) {
        let sprite = SceneManager._scene._spriteset._pictureContainer.children[pictureId - 1];
        return sprite.bitmap.rect;
    };

    // ---
    // 指定した番号のピクチャのRectangleから、4辺の情報を格納したOutlinesを生成し返します。
    //
    // 引数
    // ・pictureId : ピクチャ番号
    //
    // 戻値
    // ・ピクチャのOutlines
    // ---
    BigchopManager.prototype.getPictureOutlines = function( pictureId ) {
        let rect = this.getPictureRectangle( pictureId );
        let outlines = {
            left: new StraightLine( ( rect.x ), ( rect.y + rect.height ), ( rect.x ), ( rect.y ) ),
            top: new StraightLine( ( rect.x ), ( rect.y ), ( rect.x + rect.width ), ( rect.y ) ),
            right: new StraightLine( ( rect.x + rect.width ), ( rect.y ), ( rect.x + rect.width ), ( rect.y + rect.height ) ),
            bottom: new StraightLine( ( rect.x + rect.width ), ( rect.y + rect.height ), ( rect.x ), ( rect.y + rect.height ) ),
        };
        return outlines;
    };

    // ---
    // 指定した番号のピクチャ位置、拡大率、回転率を用いて、
    // ぶった斬り線を補正し返します。
    //
    // 引数
    // ・pictureId : ピクチャ番号
    // ・line      : ぶった斬り線
    //
    // 戻値
    // ・補正されたぶった斬り線
    // ---
    BigchopManager.prototype.correctLine = function( pictureId, line ) {
        let sprite = SceneManager._scene._spriteset._pictureContainer.children[pictureId - 1];
        let points = [line.a, line.b];
        let x = sprite.x;
        let y = sprite.y;
        let ox = sprite.anchor.x === 0.5 ? sprite.width / 2 : 0;
        let oy = sprite.anchor.y === 0.5 ? sprite.height / 2 : 0;
        let w = sprite.width - ox;
        let h = sprite.height - oy;
        let scaleX = sprite.scale.x;
        let scaleY = sprite.scale.y;
        let rad = ( -sprite.picture()._angle ) * ( Math.PI / 180 );
        for( let i = 0; i < points.length; i++ ) {
            let p = points[i];
            // 位置補正
            // 画面左上が原点の場合は、ピクチャの移動に追従してぶった斬り線も移動する
            // 画像左上が原点の場合は、ピクチャが左上にきてくれたので何もしなくてよい
            if( this.isCalculationOnScreen ) { 
                p.x += ox;
                p.y += oy
                p.x -= x;
                p.y -= y;
            }
            // 拡縮補正
            // 拡縮前のサイズ基準で原点からの距離をとり、それに拡縮率をかける
            if( scaleX != 1 ) {
                let scaledW = w * scaleX;
                let scaledPxPercentage = ( p.x - ox ) / scaledW;
                p.x = ( w * scaledPxPercentage ) + ox;
            }
            // 回転補正
            let px = p.x;
            let py = p.y;
            p.x = ox + ( px - ox ) * Math.cos( rad ) - ( py - oy ) * Math.sin( rad )
            p.y = oy + ( px - ox ) * Math.sin( rad ) + ( py - oy ) * Math.cos( rad )
            if( scaleY != 1 ) {
                let scaledH = h * scaleY;
                let scaledPyPercentage = ( p.y - oy ) / scaledH;
                p.y = ( h * scaledPyPercentage ) + oy;
            }
        }
        return line;
    };

    // ---
    // 指定した番号のピクチャと、指定した線の交差点リストを取得します。
    //
    // 引数
    // ・pictureId : ピクチャ番号
    // ・line      : ぶった斬り線
    //
    // 戻値
    // ・ピクチャとぶった斬り線の交差点リスト
    // ---
    BigchopManager.prototype.getCrossedPoints = function( pictureId, line ) {
        let outlines = this.getPictureOutlines( pictureId );
        let crossedPoints  = new Array();

        var outlinesArray = [outlines.left, outlines.top, outlines.right, outlines.bottom];
        for( let i = 0; i < outlinesArray.length; i++ ) {
            let outline = outlinesArray[i];
            let crossPoint = line.getCrossedPoint( outline );
            if( crossPoint ) {
                let contains = crossedPoints.filter( function( registered ) {
                    return registered.x === crossPoint.x && registered.y === crossPoint.y;
                } );
                if( contains.length === 0 ) {
                    crossedPoints.push( crossPoint );
                }
            }
        }
        return crossedPoints;
    };

    // ---
    // 指定した番号のピクチャのビットマップを、
    // 更に指定した番号のピクチャに、指定したパスで切って表示します。
    //
    // 引数
    // ・sourcePictureId   : ソースピクチャ番号
    // ・displayPictureId  : 表示ピクチャ番号
    // ・paths             : ぶった斬りパス
    //
    // 戻値
    // ・ぶった斬りビットマップ設定済みピクチャスプライト
    // ---
    BigchopManager.prototype.setupBigchopImage = function( sourcePictureId, displayPictureId, paths ) {
        let pictureSprites = SceneManager._scene._spriteset._pictureContainer.children;
        let source = pictureSprites[sourcePictureId - 1];
        let display = pictureSprites[displayPictureId - 1];
        if( sourcePictureId != displayPictureId ) {
            this.showBigchopImage( source, display );
            display = this.setupPictureSpriteData( source, display );
            display = this.setupPictureGameData( source, display );
        }
        display = this.setupPictureBigchopImage( source, display, paths );
        return display;
    };

    // ---
    // 指定した表示ピクチャスプライトのデータを、ソースピクチャスプライトのデータで合わせます。
    //
    // 引数
    // ・source   : ソースピクチャ
    // ・display  : 表示ピクチャ
    //
    // 戻値
    // ・設定済み表示ピクチャ
    // ---
    BigchopManager.prototype.setupPictureSpriteData = function( source, display ) {
        display._pictureName = source._pictureName;
        display.frame = new Array();
        display.frame.push( source._frame[0] );
        display.frame.push( source._frame[1] );
        display.frame.push( source._frame[2] );
        display.frame.push( source._frame[3] );
        display.anchor = {
            x: source.anchor.x,
            y: source.anchor.y
        };
        display.x = source.x;
        display.y = source.y;
        display.scale = {
            x: source.scale.x,
            y: source.scale.y
        };
        display.rotation = source.rotation;
        return display;
    };

    // ---
    // 指定した表示ピクチャゲームデータを、ソースピクチャゲームデータで合わせます。
    //
    // 引数
    // ・source   : ソースピクチャ
    // ・display  : 表示ピクチャ
    //
    // 戻値
    // ・設定済み表示ピクチャ
    // ---
    BigchopManager.prototype.setupPictureGameData = function( source, display ) {
        let dp = display.picture();
        let sp = source.picture();
        dp._name = sp._name;
        dp._origin = sp._origin;
        dp._x = sp._x;
        dp._y = sp._y;
        dp._targetX = sp._targetX;
        dp._targetY = sp._targetY;
        dp._scaleX = sp._scaleX;
        dp._scaleY = sp._scaleY;
        dp._targetScaleX = sp._targetScaleX;
        dp._targetScaleY = sp._targetScaleY;
        dp._opacity = sp._opacity;
        dp._targetOpacity = sp._targetOpacity;
        dp._duration = sp._duration;
        dp._blendMode = sp._blendMode;
        dp._tone = sp._tone;
        dp._toneTarget = sp._toneTarget;
        dp._toneDuration = sp._toneDuration;
        dp._angle = sp._angle;
        dp._rotationSpeed = sp._rotationSpeed;
        return display;
    };

    // ---
    // 指定したソースピクチャのビットマップを、
    // 更に指定した表示ピクチャに、指定したパスで切って表示します。
    //
    // 引数
    // ・source   : ソースピクチャ
    // ・display  : 表示ピクチャ
    // ・paths    : ぶった斬りパス
    //
    // 戻値
    // ・ぶった斬りビットマップ設定済みピクチャスプライト
    // ---
    BigchopManager.prototype.setupPictureBigchopImage = function( source, display, paths ) {
        let sourceBitmap = source.bitmap;
        let displayBitmap = new Bitmap( sourceBitmap.width, sourceBitmap.height );
        let canvas = displayBitmap._context;
        if( paths.length > 0 ) {
            canvas.beginPath();
            canvas.moveTo( paths[0].x, paths[0].y );
            for( let i = 1; i < paths.length; i++ ) {
                canvas.lineTo( paths[i].x, paths[i].y );
            }
            canvas.closePath();
        }
        canvas.fillStyle = canvas.createPattern( sourceBitmap._canvas, 'no-repeat' );
        canvas.fill();
        display.bitmap = displayBitmap;
        return display;
    };

    // ---
    // 指定したソースピクチャのぶった斬り画像を、
    // 指定した表示ピクチャで表示します。
    //
    // 引数
    // ・source   : ソースピクチャ
    // ・display  : 表示ピクチャ
    //
    // 戻値
    // ・なし
    // ---
    BigchopManager.prototype.showBigchopImage = function( source, display ) {
        let d = display;
        let s = source.picture();
        $gameScreen.showPicture( d._pictureId, s._name, s._origin, s._x, s._y, s._scaleX, s._scaleY, s._opacity, s._blendMode );
    };

    // ---
    // ぶった斬り処理を実行します。
    // ・ぶった斬り線とピクチャの4辺が交差しているか判定します。
    //   2辺で交差している場合はぶった斬りに成功、それ以外は失敗とみなします。
    // ・ぶった斬り線でピクチャを2つに分けて、それぞれ表示します。
    //
    // 引数
    // * targetPictureId    : ぶった斬り対象ピクチャID
    // * displayPictureId1  : ぶった斬り画像表示ピクチャID-1
    // * displayPictureId2  : ぶった斬り画像表示ピクチャID-2
    // * line               : ぶった斬り線
    //
    // 戻値
    // ・なし（ピクチャのぶった斬り処理が行われます。）
    // ---
    BigchopManager.prototype.execute = function( targetPictureId, displayPictureId1, displayPictureId2, line ) {
        // ピクチャがロード済でない場合は処理しない
        if( !this.isEnabledPicture( targetPictureId ) ) {
            return;
        }
        // 元ピクチャの座標／拡縮率／回転率をもとにぶった斬り線を補正
        let baseLine = new StraightLine( line.a.x, line.a.y, line.b.x, line.b.y );
        line = this.correctLine( targetPictureId, line );
        // ぶった斬り線とピクチャ画像が2辺で交差している場合のみぶった斬り可能
        let crossedPoints = this.getCrossedPoints( targetPictureId, line );
        if( crossedPoints.length != 2 ) {
            console.warn( `ピクチャをぶった斬れませんでした。(ピクチャ番号：${targetPictureId})` );
            return;
        }

        // ぶった斬った画像を2つにわけるために、それぞれのパスを取得
        let outlines = this.getPictureOutlines( targetPictureId );
        let outlineArray = [outlines.top, outlines.right, outlines.bottom, outlines.left];
        let paths1 = new Array();
        let paths2 = new Array();
        let discoveredCross = false;
        let firstContactIndex = 0;
        for( var iOutlines = 0; iOutlines < 4; iOutlines++ ) {
            let outline = outlineArray[iOutlines];
            paths1.push( outline.a );
            if( discoveredCross ) {
                continue;
            }
            for( var iCrossedPoints = 0; iCrossedPoints < 2; iCrossedPoints++ ) {
                let crossPoint = crossedPoints[iCrossedPoints];
                let crossPointOther = crossedPoints[( iCrossedPoints ^ 0x01 )]
                if( outline.isTouched( crossPoint ) ) {
                    firstContactIndex = iOutlines;
                    discoveredCross = true;
                    paths1.push( crossPoint );
                    paths1.push( crossPointOther );
                    paths2.push( crossPoint );
                    while( iOutlines < 4 ) {
                        let nextOutline = outlineArray[iOutlines];
                        if( nextOutline.isTouched( crossPointOther ) ) {
                            paths2.push( crossPointOther );
                            break;
                        } else {
                            paths2.push( nextOutline.b );
                        }
                        iOutlines ++;
                    }
                    break;
                }
            }
        }
        let isLessThan90 = this.isLessThan90Angle( line );
        if( this.splitArrangement == 1 ) {
            // 上下配置の場合、初めての交点がTop、かつベクトルのなす角が90度未満の場合、pathsを入れ替える
            if( firstContactIndex == 0 && isLessThan90 ) {
                var tempPaths = paths1;
                paths1 = paths2;
                paths2 = tempPaths;
            }
            // 回転した結果ベクトルのなす角が90度以下<->90度超で変化した場合、pathsを入れ替える
            if( isLessThan90 != this.isLessThan90Angle( baseLine ) ) {
                var tempPaths = paths1;
                paths1 = paths2;
                paths2 = tempPaths;
            }
        } else {
            // 左右配置の場合、初めての交点がRightまたはBottom、かつなす角が90度未満の場合、pathsを入れ替える
            if( firstContactIndex >= 1 && isLessThan90 ) {
                var tempPaths = paths1;
                paths1 = paths2;
                paths2 = tempPaths;
            }
        }
        // 回転した結果始点の上下が入れ替わった場合、pathsを入れ替える
        let baseTop = ( baseLine.a.y >= baseLine.b.y ) ? baseLine.a.id : baseLine.b.id;
        let nowTop = ( line.a.y >= line.b.y ) ? line.a.id : line.b.id;
        if( baseTop != nowTop ) {
            var tempPaths = paths1;
            paths1 = paths2;
            paths2 = tempPaths;
        }
        // 取得したパスをもとに、ピクチャスプライトにぶった斬り画像を表示
        this.setupBigchopImage( targetPictureId, displayPictureId1, paths1 );
        this.setupBigchopImage( targetPictureId, displayPictureId2, paths2 );
        if( this.isEraseTargetPicture ) {
            if( targetPictureId != displayPictureId1 && targetPictureId != displayPictureId2 ) {
                $gameScreen.erasePicture( targetPictureId );
            }
        }
    };

    // ---
    // 指定した直線と、直線の始点に対する垂線のなす角が90度以下か否かを判定します。
    //
    // 引数
    // * line   : 直線
    //
    // 戻値
    // * 指定した直線と、直線の始点に対する垂線のなす角が90度以下か否か
    // ---
    BigchopManager.prototype.isLessThan90Angle = function( line ) {
        // Y軸が少ない方を始点とする
        let target = ( line.a.y <= line.b.y )
                   ? new StraightLine( line.a.x, line.a.y, line.b.x, line.b.y )
                   : new StraightLine( line.b.x, line.b.y, line.a.x, line.a.y );
        let fromOrigin = new StraightLine( target.a.x - target.a.x, target.a.y - target.a.y, target.b.x - target.a.x, target.b.y - target.a.y );
        let perpendicular = new StraightLine( fromOrigin.a.x, fromOrigin.a.y, fromOrigin.a.x + 816, fromOrigin.a.y );
        let angleWithPerpendicular = this.getAngleBetweenVectors( fromOrigin, perpendicular );
        while( angleWithPerpendicular < 0 ) {
            angleWithPerpendicular += 180;
        }
        while( angleWithPerpendicular > 180 ) {
            angleWithPerpendicular -= 180;
        }
        return ( angleWithPerpendicular <= 90 );
    };

    // ---
    // 指定した2つの直線ABのなす角を取得します。
    //
    // 引数
    // * lineA   : 直線A
    // * lineB   : 直線B
    //
    // 戻値
    // * 指定した線と、線の始点に対する垂線のなす角が90度以下か否か
    // ---
    BigchopManager.prototype.getAngleBetweenVectors = function( lineA, lineB ) {
        let vA = lineA.getVector( lineA );
        let vB = lineB.getVector( lineB );
        let s = vA.x * vB.x + vA.y * vB.y;
        let lA = vA.x * vA.x + vA.y * vA.y;
        let lB = vB.x * vB.x + vB.y * vB.y;
        let degree = Math.acos( s / ( lA * lB ) );
        return degree * 180 / Math.PI;
    };
    
    // --------------------------------------------------------------------------------------------

    // StraightLine------------------------------------------------------------------------------
    // 指定された２点AB間を通過する直線を管理／計算します。
    //
    // ---
    // StraightLineの新しいインスタンスを初期化します。
    // ---
    function StraightLine() {
        this.initialize.apply( this, arguments );
    };

    // ---
    // StraightLineのインスタンスを初期化します。
    // ---
    StraightLine.prototype.initialize = function( ax, ay, bx, by ) {
        this.a = {
            id: 1,
            x: ax,
            y: ay
        };
        this.b = {
            id: 2,
            x: bx,
            y: by
        };
    };

    // ---
    // 指定した直線と交差しているか否か判定します。
    //
    // 引数
    // ・other : 交差している直線
    //
    // 戻値
    // ・交差有無
    // ---
    StraightLine.prototype.isCrossed = function( other ) {
        let ax = this.a.x;
        let ay = this.a.y;
        let bx = this.b.x;
        let by = this.b.y;
        let cx = other.a.x;
        let cy = other.a.y;
        let dx = other.b.x;
        let dy = other.b.y;
        if( ( ax - ay ) * ( bx - by ) * ( cx - cy ) * ( dx - dy ) == 0  ) {
            return false;
        }
        let ta = ( cx - dx ) * ( ay - cy) + ( cy - dy ) * ( cx - ax );
        let tb = ( cx - dx ) * ( by - cy) + ( cy - dy ) * ( cx - bx );
        let tc = ( ax - bx ) * ( cy - ay) + ( ay - by ) * ( ax - cx );
        let td = ( ax - bx ) * ( dy - ay) + ( ay - by ) * ( ax - dx );
      
        // 端点を含む場合
        return tc * td <= 0 && ta * tb <= 0;
        //// 端点を含まない場合
        // return tc * td < 0 && ta * tb < 0;
    };

    // ---
    // 指定した点と接しているか否か判定します。
    //
    // 引数
    // ・p : 接触している点
    //
    // 戻値
    // ・接触有無
    // ---
    StraightLine.prototype.isTouched = function( p ) {
        var abX = ( this.b.x - this.a.x );
        var abY = ( this.b.y - this.a.y );
        var bpX = ( p.x - this.b.x );
        var bpY = ( p.y - this.b.y );
        return ( abX * bpY - abY * bpX ) == 0;
    };

    // ---
    // 指定した直線との交差点を取得します。
    // 交差していない場合はnullを返します。
    //
    // 引数
    // ・other : 交差している直線
    //
    // 戻値
    // ・交差点
    // ---
    StraightLine.prototype.getCrossedPoint = function( other ) {
        let ax = this.a.x;
        let ay = this.a.y;
        let bx = this.b.x;
        let by = this.b.y;
        let cx = other.a.x;
        let cy = other.a.y;
        let dx = other.b.x;
        let dy = other.b.y;

        var d = ( bx - ax ) * ( dy - cy ) - ( by - ay ) * ( dx - cx );
        if( d == 0 )
            return null;

        var u = ( ( cx - ax ) * ( dy - cy ) - ( cy - ay ) * ( dx - cx ) ) / d;
        var v = ( ( cx - ax ) * ( by - ay ) - ( cy - ay ) * ( bx - ax ) ) / d;
        if( u < 0.0 || u > 1.0 )
            return null;

        if( v < 0.0 || v > 1.0 )
            return null;

        var x = ax + u * ( bx - ax );
        var y = ay + u * ( by - ay );
        
        return {
            x: Math.round( x ),
            y: Math.round( y )
        };
    };

    // ---
    // 始点／終点をもとにベクトル情報を取得します。
    //
    // 引数
    // * なし
    //
    // 戻値
    // * 直線のベクトル情報
    // ---
    StraightLine.prototype.getVector = function() {
        let dx = this.b.x - this.a.x;
        let dy = this.b.y - this.a.y;
        let l = Math.sqrt( dx * dx + dy * dy );
        return {
            x: dx / l + this.a.x,
            y: dy / l + this.a.y,
        }
    };

    // Spriteset_Base------------------------------------------------------------------------------
    // ---
    // 【Override】
    // GameTempのぶった斬り処理オブジェクトをクリアします。
    // ---
    var _Spriteset_Base_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function() {
        _Spriteset_Base_initialize.apply( this, arguments );
        $gameTemp.bigchopManager = new BigchopManager();
    };
    // --------------------------------------------------------------------------------------------
})();