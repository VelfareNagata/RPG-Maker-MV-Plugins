//=============================================================================
// NGT_Liner.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
//
// 1.0.0 2019/06/07 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:
 * @plugindesc This plug-in draws a line through a specified set of coordinate paths.
 * 
 * @author velfare_nagata
 *
 * @param pens
 * @desc Sets pen information.
 * @type struct<pen>[]
 * @default []
 *
 * @help Draw a line by executing the following flow.
 * 
 * 1.Registering pen information by plug-in parameter or LINE_ADD_PEN command
 * 
 * 2.Set the path for drawing lines with the LINE_ADD_PATH command
 * 
 * 3.Draw a line along a path specified with the LINE_DRAW command
 *
 * [Caution]The line cannot be drawn without setting at least 2 points.
 *
 * To set paths.
 * * LINE_ADD_PATH {0} {1}
 *   {0}:[Required]Path Info X Coordinate
 *   {1}:[Required]Path Info Y Coordinate
 * 
 * To clear paths.
 * * LINE_CLEAR_PATH
 * 
 * To draw a line.
 * * LINE_DRAW {0} {1}
 *   {0}:[Required]Pen ID
 *   {1}:[Required]Duration of drawing frames per straight line
 * 
 * To clear lines.
 * * LINE_CLEAR
 * 
 * Registering pen information.
 * * LINE_ADD_PEN {0} {1} {2} {3} {4} {5}
 *   {0}:[Required]Pen ID, if duplicate, the pen information will be overwritten
 *   {1}:[Required]Color tone (red).
 *   {2}:[Required]Color tone (green).
 *   {3}:[Required]Color tone (blue).
 *   {4}:[Required]Color tone (opacity).
 *   {5}:[Required]Thickness
 * 
 */
/*:ja
 * @plugindesc 指定した座標群のパスを通る線を引くプラグインです。
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/lPiZ.
 *
 * @param pens
 * @desc ペン情報を設定します。
 * @type struct<pen>[]
 * @default []
 *
 * @help 下記のフローを実行し、線を引きます。
 * 
 * 1.プラグインパラメータ、またはLINE_ADD_PENコマンドで
 *   ペン情報を登録しておく
 * 
 * 2.LINE_ADD_PATHコマンドで線を引くためのパスを設定する
 * 
 * 3.LINE_DRAWコマンドで指定したパスに沿って線を引く
 *
 * [注意]最低2点以上パスを設定しないと線をひくことが出来ません
 * 
 *
 * パスを設定する場合
 * * LINE_ADD_PATH {0} {1}
 *   {0}:[必須]パス情報 X座標
 *   {1}:[必須]パス情報 Y座標
 * 
 * パスをクリアする場合
 * * LINE_CLEAR_PATH
 * 
 * 線を引く場合
 * * LINE_DRAW {0} {1}
 *   {0}:[必須]ペンID
 *   {0}:[必須]直線一本分の描画フレーム数
 * 
 * 線をクリアする場合
 * * LINE_CLEAR
 * 
 * ペン情報を登録する場合
 * * LINE_ADD_PEN {0} {1} {2} {3} {4} {5}
 *   {0}:[必須]ペンID、重複した場合ペン情報は上書きされます
 *   {1}:[必須]ペンの色調（赤）
 *   {2}:[必須]ペンの色調（緑）
 *   {3}:[必須]ペンの色調（青）
 *   {4}:[必須]ペンの色調（不透明度）
 *   {5}:[必須]ペンの太さ
 * 
 */
/*~struct~pen:
 * 
 * @param id
 * @desc Sets the pen ID.
 * This is used in the plug-in parameters.
 * @type string
 * @default 
 * 
 * @param color
 * @desc Sets the pen color.
 * @type struct<color>
 * @default 
 * 
 * @param thickness
 * @desc Sets the thickness of the pen.
 * @type number
 * @default 1
 * 
 */
/*~struct~pen:ja
 * 
 * @param id
 * @desc ペンIDを設定します。
 * プラグインパラメータでの指定に使用されます。
 * @type string
 * @default 
 * 
 * @param color
 * @desc ペンの色を設定します。
 * @type struct<color>
 * @default 
 * 
 * @param thickness
 * @desc ペンの太さを設定します。
 * @type number
 * @default 1
 * 
 */
/*~struct~color:
 * 
 * @param R
 * @desc Sets the color tone (red).
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param G
 * @desc Sets the color tone (green).
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param B
 * @desc Sets the color tone (blue).
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param A
 * @desc Set the tone (opacity).
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 */
/*~struct~color:ja
 * 
 * @param R
 * @desc 色調（赤）を設定します。
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param G
 * @desc 色調（緑）を設定します。
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param B
 * @desc 色調（青）を設定します。
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 * @param A
 * @desc 色調（不透明度）を設定します。
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * 
 */
( function() {
    'use strict';
    var pluginName = 'NGT_Liner';
    
    // --------------------------------------------------
    // ローカル関数
    // 参考：トリアコンタン殿の各種プラグインファイル
    // --------------------------------------------------
    let getArgString = function( arg ) {
        return convertEscapeCharacters( arg );
	};
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
	let paramParse = function( obj ) {
        return JSON.parse( JSON.stringify( obj, paramReplace ) );
    };

    let paramReplace = function( key, value ) {
        try {
            return JSON.parse( value || null );
        } catch ( e ) {
            return value;
        }
    };

	// --------------------------------------------------
    // プラグインコマンド追加
    // --------------------------------------------------
    let _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function( command, args ) {
		_Game_Interpreter_pluginCommand.apply( this, arguments );
        let manager = $gameTemp.linerManager;
		let commandName = command.toUpperCase();
        switch( commandName ) {
            case 'LINE_ADD_PATH' :
                let x = ( args.length >= 1 ) ? getArgNumber( args[0], -9999, 9999 ) : null;
                let y = ( args.length >= 2 ) ? getArgNumber( args[1], -9999, 9999 ) : null;
                manager.addPath( x, y );
                break;
            case 'LINE_CLEAR_PATH' :
                manager.clearPath();
                break;
            case 'LINE_DRAW' :
                var penId = ( args.length >= 1 ) ? getArgString( args[0], 1, 9999 ) : null;
                var duration = ( args.length >= 2 ) ? getArgNumber( args[1], 1, 600 ) : null;
                manager.drawLine( penId, duration );
                break;
            case 'LINE_CLEAR' :
                manager.clearLine();
                break;
            case 'LINE_ADD_PEN' :
                var penId = ( args.length >= 1 ) ? getArgString( args[0], 1, 9999 ) : null;
                var r = ( args.length >= 2 ) ? getArgNumber( args[0], 0, 255 ) : null;
                var g = ( args.length >= 3 ) ? getArgNumber( args[0], 0, 255 ) : null;
                var b = ( args.length >= 4 ) ? getArgNumber( args[0], 0, 255 ) : null;
                var a = ( args.length >= 5 ) ? getArgNumber( args[0], 0, 255 ) : null;
                var thickness = ( args.length >= 6 ) ? getArgNumber( args[0], 1, 100 ) : null;
                manager.addPen( penId, r, g, b, a, thickness );
                break;
        }
    };

    // LinerManager----------------------------------------------------------------------------
    // ---
    // LinerManagerの新しいインスタンスを初期化します。
    // ---
    function LinerManager() {
        this.initialize.apply( this, arguments );
    }

    // ---
    // LinerManagerのインスタンスを初期化します。
    // ・プラグインパラメータを取得します。
    // ・線の描画先スプライト情報を生成／保持します。
    // ---
    LinerManager.prototype.initialize = function() {
        let parameters = PluginManager.parameters( pluginName );
		this._pens = paramParse( parameters["pens"] );
		this._paths = new Array();
        this._container = this.createContainer();
    };

    // ---
    // 線の描画先スプライトを生成します。
    // ---
    LinerManager.prototype.createContainer = function() {
		let width = Graphics.boxWidth;
		let height = Graphics.boxHeight;
		let x = ( Graphics.width - width ) / 2;
		let y = ( Graphics.height - height ) / 2;
		let container = new Sprite();
        container.setFrame( x, y, width, height );
        return container;
    };

    // ---
    // 保持しているパス情報を初期化します。
    //
    // 引数
    // * なし
    //
    // 戻値
    // * なし
    // ---
    LinerManager.prototype.clearPath = function() {
        this._paths = new Array();
    };

    // ---
    // 線を描画している線を全てクリアします。
    //
    // 引数
    // * なし
    //
    // 戻値
    // * なし
    // ---
    LinerManager.prototype.clearLine = function() {
        while( this._container.children.length > 0 ) {
            this._container.removeChildAt( 0 );
        }
    };

    // ---
    // 保持しているパス情報を初期化します。
    //
    // 引数
    // * なし
    //
    // 戻値
    // * なし
    // ---
    LinerManager.prototype.getPen = function( penId ) {
        for( let i = 0; i < this._pens.length; i++ ) {
            if( this._pens[i].id === penId ) {
                return this._pens[i];
            }
        }
        return null;
    };

    // ---
    // パス情報を登録します。
    // パス情報が不正な場合は登録処理を行いません。
    //
    // 引数
    // * x : パス情報 X座標
    // * t : パス情報 Y座標
    //
    // 戻値
    // * なし
    // ---
    LinerManager.prototype.addPath = function( x, y ) {
        if( !this.validatePath( x, y ) ) {
            return;
        }
        this._paths.push( {
            x: x,
            y: y
        } );
    };

    // ---
    // 指定したパス情報のバリデーションを行います。
    //
    // 引数
    // * x : パス情報 X座標
    // * t : パス情報 Y座標
    //
    // 戻値
    // * バリデーション成否
    // ---
    LinerManager.prototype.validatePath = function( x, y ) {
        if( x === null ) {
            console.warn( `LINE_ADD_PATHコマンドにて指定したパス情報 X座標[${x}]が不正です。` );
            return false;
        }
        if( y === null ) {
            console.warn( `LINE_ADD_PATHコマンドにて指定したパス情報 X座標[${y}]が不正です。` );
            return false;
        }
        return true;
    };

    // ---
    // 現在保持しているパス情報で線を引きます。
    // 線を引くためのペン情報が不正な場合は描画処理を行いません。
    //
    // 引数
    // * penId : 線を描画するペンID
    // * durationInLine : 線1本あたりの描画にかかるフレーム数
    //
    // 戻値
    // * なし
    // ---
    LinerManager.prototype.drawLine = function( penId, durationInLine ) {
        if( !this.validateDrawLine( penId ) ) {
            return;
        }
        this._container.addChild( new Sprite_Line_Straight( this.getPen( penId ), this._paths, durationInLine ) )
        this.clearPath();
    };

    // ---
    // 線を引くためのバリデーションを行います。
    //
    // 引数
    // * penId : 線を描画するペンID
    //
    // 戻値
    // * バリデーション成否
    // ---
    LinerManager.prototype.validateDrawLine = function( penId ) {
        if( penId === null ) {
            console.warn( `LINE_DRAWコマンドにて指定したペンID[${penId}]が不正です。` );
            return false;
        }
        var pen = this.getPen( penId );
        if( pen === null ) {
            console.warn( `LINE_DRAWコマンドにて指定したペンID[${penId}]のペン情報が見つかりません。` );
            return false;
        }
        if( this._paths.length < 2 ) {
            console.warn( `LINE_DRAWコマンドに失敗しました。パス情報は最低でも2点必要です。（パス情報数：[${this._paths.length}]）` );
            return false;
        }
        return true;
    };

    // ---
    // 指定したペン情報を登録します。
    // 指定したペンIDに対応するペン情報が登録されている場合は、上書きします。
    //
    // 引数
    // * penId     : ペンID
    // * r         : ペンの色調（赤）
    // * g         : ペンの色調（緑）
    // * b         : ペンの色調（青）
    // * a         : ペンの色調（不透明度）
    // * thickness : ペンの太さ
    //
    // 戻値
    // * なし
    // ---
    LinerManager.prototype.addPen = function( penId, r, g, b, a, thickness ) {
        if( !this.validateAddPen( penId, r, g, b, a, thickness ) ) {
            return;
        }
        let color = {
            R: r,
            G: g,
            B: b,
            A: a,
        }
        let pen = this.getPen( penId );
        if( pen !== null ) {
            pen.color = color;
            pen.thickness = thickness;
            return;
        }
        this._pens.push( {
            id: penId,
            color: color,
            thickness: thickness
        } );
    };
    

    // ---
    // 指定した線を引くためのペン情報のバリデーションを行います。
    //
    // 引数
    // * penId     : ペンID
    // * r         : ペンの色調（赤）
    // * g         : ペンの色調（緑）
    // * b         : ペンの色調（青）
    // * a         : ペンの色調（不透明度）
    // * thickness : ペンの太さ
    //
    // 戻値
    // * バリデーション成否
    // ---
    LinerManager.prototype.validateAddPen = function( penId, r, g, b, a, thickness ) {
        if( penId === null ) {
            console.warn( `LINE_ADD_PENコマンドにて指定したペンID[${penId}]が不正です。` );
            return false;
        }
        if( r === null ) {
            console.warn( `LINE_ADD_PENコマンドにて指定したペンの色調（赤）[${r}]が不正です。` );
            return false;
        }
        if( g === null ) {
            console.warn( `LINE_ADD_PENコマンドにて指定したペンの色調（緑）[${g}]が不正です。` );
            return false;
        }
        if( b === null ) {
            console.warn( `LINE_ADD_PENコマンドにて指定したペンの色調（青）[${b}]が不正です。` );
            return false;
        }
        if( a === null ) {
            console.warn( `LINE_ADD_PENコマンドにて指定したペンの色調（不透明度）[${a}]が不正です。` );
            return false;
        }
        if( thickness === null ) {
            console.warn( `LINE_ADD_PENコマンドにて指定したペンの太さ[${thickness}]が不正です。` );
            return false;
        }
        return true;
    };
    // --------------------------------------------------------------------------------------------

    // Sprite_Line_Straight------------------------------------------------------------------------
    // ---
    // 直線のアニメーション付き描画処理を管理するSpriteです。
    // ---
	function Sprite_Line_Straight() {
		this.initialize.apply( this, arguments );
	}
	Sprite_Line_Straight.prototype = Object.create( Sprite.prototype );
    Sprite_Line_Straight.prototype.constructor = Sprite_Line_Straight;
    
    // ---
    // Sprite_Line_Straightのインスタンスを初期化します。
    // * 各種メンバ変数を初期化します。
    //
    // 引数
    // * pen            : 線を描画するペン
    // * paths          : 線の情報を表すパスデータ
    // * durationInLine : 線1本あたりの描画にかかるフレーム数
    // ---
    Sprite_Line_Straight.prototype.initialize = function( pen, paths, durationInLine ) {
        Sprite.prototype.initialize.call( this );
        this._pen = pen;
        this._paths = paths;
        this._durationInLine = durationInLine;
        this._animationFrame = 0;
        this._lineCanvas = new Sprite( new Bitmap( Graphics.boxWidth, Graphics.boxHeight ) );
        this.addChild( this._lineCanvas );
        // この時点でCanvasにペン情報を反映しておく
        let canvas = this._lineCanvas.bitmap._context;
        canvas.lineWidth = this._pen.thickness;
        canvas.strokeStyle = `rgba(${this._pen.color.R}, ${this._pen.color.G}, ${this._pen.color.B}, ${this._pen.color.A / 255})`;
    };

    // ---
    // 描画する線の本数を取得します。
    // ---
    Sprite_Line_Straight.prototype.getLineCount = function() {
		return ( this._paths != null ) ? this._paths.length - 1 : 0;
    };

    // ---
    // アニメーション完了有無を取得します。
    // ---
    Sprite_Line_Straight.prototype.isAnimated = function() {
		return this._animationFrame > ( this.getLineCount() * this._durationInLine );
    };

    // ---
    // スプライトを更新し下記の描画処理を行います。
    // ・現在のアニメーションフレーム状態に対応する分の線を描画
    // ---
    Sprite_Line_Straight.prototype.update = function() {
        Sprite.prototype.update.call( this );
        if( this.isAnimated() ) {
            return;
        }
        this.clear();
        for( let i = 0; i < this.getLineCount(); i++ ) {
            let a = this._paths[i + 0];
            let b = this._paths[i + 1];
            let animationFrameInLine = this._animationFrame - ( i * this._durationInLine );
            let percentageInLine = animationFrameInLine / this._durationInLine;
            if( percentageInLine < 0 ) {
                continue;
            }
            if( percentageInLine > 1 ) {
                percentageInLine = 1;
            }
            this.drawLine( a, b, percentageInLine );
        }
        this._animationFrame ++;
    };

    // ---
    // 指定した線分ABの点A, 点B間を、指定した割合で線を描画します。
    // 具体的には点Aから、線分AB間の指定した割合の位置にある点Pまで線を描画します。
    //
    // 引数
    // * a          : 線分ABの点A
    // * b          : 線分ABの点B
    // * percentage : 線の描画割合
    // ---
    Sprite_Line_Straight.prototype.drawLine = function( a, b, percentage ) {
        let distance = Math.sqrt( ( b.x - a.x ) * ( b.x - a.x ) + ( b.y - a.y ) * ( b.y - a.y ) );
        let radian = Math.atan2( b.y - a.y, b.x - a.x );
        let drawDistance = distance * percentage;
        let p = {
            x: a.x + Math.cos( radian ) * drawDistance,
            y: a.y + Math.sin( radian ) * drawDistance
        };
        let canvas = this._lineCanvas.bitmap._context;
        canvas.beginPath();
        canvas.moveTo( a.x, a.y );
        canvas.lineTo( p.x, p.y );
        canvas.stroke();
        canvas.closePath();
    };

    // ---
    // 線の描画しているキャンバスをクリアします。
    // ---
    Sprite_Line_Straight.prototype.clear = function() {
        let canvas = this._lineCanvas.bitmap;
        canvas.clear();
    };
    // --------------------------------------------------------------------------------------------

    // ---
    // 【Override】
    // シーンにLinerManagerの描画用スプライトを登録します。
    // ---
    let _Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
	Spriteset_Base.prototype.createUpperLayer = function() {
        _Spriteset_Base_createUpperLayer.apply( this, arguments );
        if( $gameTemp.linerManager != null ) {
		    this.addChild( $gameTemp.linerManager._container );
        }
    };
    
    // ---
    // 【Override】
    // $gameTempにLinerManagerのインスタンスを登録します。
    // ---
    let _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_initialize.apply( this, arguments );
        this.linerManager = new LinerManager();
    };
})();