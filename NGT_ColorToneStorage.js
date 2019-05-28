//=============================================================================
// NGT_ColorToneStorage.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
//
// 1.0.0 2018/05/17 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:ja
 * @plugindesc Save the color tone of the screen and restore it with the plugin command.
 * 
 * @author Velfare Nagata
 *
 * @param ColorToneDictionary
 * @desc It is color tone information to keep.
 * @type struct<ColorToneDictionary>[]
 * @default []
 * 
 * @help When saving the current screen tone
 * CT_SCREEN_SAVE {0}
 * {0}：Key
 * 
 * When saving with specified screen color tone information
 * CT_SCREEN_SAVE {0} {1} {2} {3} {4}
 * {0}：Key
 * {1}：色調：赤
 * {2}：色調：緑
 * {3}：色調：青
 * {4}：色調：グレー
 *
 * When restoring the color tone information of the specified key
 * CT_SCREEN_RESTORE {0} {1} {2}
 * {0}：Key
 * {1}：色調遷移フレーム数
 * {2}：ウェイトあり／なしフラグ
 * 　　　trueを指定するとウェイトあり
 * 　　　falseを指定するとウェイトなし
 * 　　　省略した場合もウェイトなし
 * 
 * When deleting the color tone information of the specified key
 * CT_SCREEN_DELETE {0}
 * {0}：Key
*/
/*:ja
 * @plugindesc 画面の色調を保存し、プラグインコマンドで復元します。
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/HaiA.
 *
 * @param ColorToneDictionary
 * @desc ゲーム内で予め保存しておく色調情報です。
 * @type struct<ColorToneDictionary>[]
 * @default []
 * 
 * @help 現在の画面色調を保存する場合
 * CT_SCREEN_SAVE {0}
 * {0}：キー名
 * 
 * 指定した画面色調情報で保存する場合
 * CT_SCREEN_SAVE {0} {1} {2} {3} {4}
 * {0}：キー名
 * {1}：色調：赤
 * {2}：色調：緑
 * {3}：色調：青
 * {4}：色調：グレー
 *
 * 指定したキー名の色調情報を復元する場合
 * CT_SCREEN_RESTORE {0} {1} {2}
 * {0}：キー名
 * {1}：色調遷移フレーム数
 * {2}：ウェイトあり／なしフラグ
 * 　　　trueを指定するとウェイトあり
 * 　　　falseを指定するとウェイトなし
 * 　　　省略した場合もウェイトなし
 * 
 * 指定したキー名の色調情報を削除する場合
 * CT_SCREEN_DELETE {0}
 * {0}：キー名
*/
/*~struct~ColorToneDictionary
 * @param key
 * @desc Specify the key name of color tone information to be saved.
 * @type string
 * @default 
 * 
 * @param red
 * @desc Specify red color tone information.
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * 
 * @param green
 * @desc Specify green color tone information.
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * 
 * @param blue
 * @desc Specify blue color tone information.
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * 
 * @param gray
 * @desc Specify gray color tone information.
 * @type number
 * @default 0
 * @min -255
 * @max 255
*/
/*~struct~ColorToneDictionary:ja
 * @param key
 * @desc 保存する色調情報のキー名を指定します。
 * @type string
 * @default 
 * 
 * @param red
 * @desc 色調情報の赤を指定します。
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * 
 * @param green
 * @desc 色調情報の緑を指定します。
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * 
 * @param blue
 * @desc 色調情報の青を指定します。
 * @type number
 * @default 0
 * @min -255
 * @max 255
 * 
 * @param gray
 * @desc 色調情報のグレーを指定します。
 * @type number
 * @default 0
 * @min -255
 * @max 255
*/
( function() {
    'use strict';
	var pluginName = 'NGT_ColorToneStorage';
	
    // --------------------------------------------------
    // ローカル関数
    // 参考：トリアコンタン殿の各種プラグインファイル
    // --------------------------------------------------
    var getCommandName = function( command ) {
        return ( command || '').toUpperCase();
    };
    var getArgNumber = function( arg, min, max ) {
        min = ( arguments.length < 2 ) ? -Infinity : min; 
        max = ( arguments.length < 3 ) ? -Infinity : max;

        return ( parseInt( convertEscapeCharacters( arg ), 10 ) || 0 ).clamp( min, max );
	};
    var getArgBoolean = function( arg ) {
        return ( arg == "true" );
    };
    var convertEscapeCharacters = function( text ) {
        text = ( text == null ) ? '' : text;
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters( text ) : text;
    };
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
    
    var getParamBoolean = function( paramNames ) {
        var value = getParam( paramNames );
        return ( value == "true" );
	};

    // --------------------------------------------------
    // ローカル関数
    // 参考：フトコロ殿の各種プラグインファイル
    // --------------------------------------------------
	var paramParse = function( obj ) {
        return JSON.parse( JSON.stringify( obj, paramReplace ) );
    };

    var paramReplace = function( key, value ) {
        try {
            return JSON.parse( value || null );
        } catch ( e ) {
            return value;
        }
    };

	// --------------------------------------------------
    // プラグインコマンド追加　　　　
    // --------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function( command, args ) {
		_Game_Interpreter_pluginCommand.apply( this, arguments );
		
		var commandName = getCommandName( command );
        switch( commandName ) {
            case 'CT_SCREEN_SAVE':
                var key = ( args.length >= 1 ) ? args[0] : null;
                if( key == null ) {
                    throw new SyntaxError( "キーが指定されていません。" );
                }
                var r = ( args.length >= 2 ) ? getArgNumber( args[1], -255, 255 ) : $gameScreen.tone()[0];
                var g = ( args.length >= 3 ) ? getArgNumber( args[2], -255, 255 ) : $gameScreen.tone()[1];
                var b = ( args.length >= 4 ) ? getArgNumber( args[3], -255, 255 ) : $gameScreen.tone()[2];
                var gr = ( args.length >= 5 ) ? getArgNumber( args[4], -255, 255 ) : $gameScreen.tone()[3];
                var tone = [r, g, b, gr];
                console.info( "色調情報を保存します。（キー：" + key + ", 赤：" + tone[0] + ", 緑：" + tone[1] + ", 青：" + tone[2] + ", グレー：" + tone[3] + "）" );
                $gameScreen.setStoragedTone( key, tone );
                break;
            case 'CT_SCREEN_RESTORE':
                var key = ( args.length >= 1 ) ? args[0] : null;
                if( key == null ) {
                    throw new SyntaxError( "キーが指定されていません。" );
                }
                var tone = $gameScreen.getStoragedTone( key );
                if( tone == null ) {
                    return;
                }
                console.info( "色調情報を取得しました。（キー：" + key + ", 赤：" + tone[0] + ", 緑：" + tone[1] + ", 青：" + tone[2] + ", グレー：" + tone[3] + "）" );

                var duration = ( args.length >= 2 ) ? getArgNumber( args[1], 0, 9999 ) : 0;
                var isWait = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                console.info( "色調情報を復元します。（キー：" + key + ", 色調遷移フレーム数：" + duration + ", ウェイト：" + ( isWait ? "あり" : "なし" ) + "）" );

                $gameScreen.startTint( tone, duration );
                if( isWait ) {
                    $gameMap._interpreter.wait( duration );
                }
                break;
            case 'CT_SCREEN_DELETE':
                var key = ( args.length >= 1 ) ? args[0] : null;
                if( key == null ) {
                    throw new SyntaxError( "キーが指定されていません。" );
                    return;
                }
                console.info( "色調情報を削除します。（キー：" + key + "）" );
                $gameScreen.setStoragedTone( key, null );
                break;
		}
    };

    // --------------------------------------------------
    // ゲーム開始時、プラグインパラメータで指定された色調情報を読み込みます。
    // --------------------------------------------------
    var _Game_Screen_initialize = Game_Screen.prototype.initialize;
    Game_Screen.prototype.initialize = function() {
        _Game_Screen_initialize.apply( this, arguments );
        this.initializeStoragedTone();
    };

    // --------------------------------------------------
    // プラグインパラメータで指定された色調情報を読み込みます。
    // --------------------------------------------------
    Game_Screen.prototype.initializeStoragedTone = function() {
        this._storagedTone = {};
        var parameters = PluginManager.parameters( pluginName );
		var colorToneDictionary = paramParse( parameters['ColorToneDictionary'] );
		for( var i = 0; i < colorToneDictionary.length; i++ ) {
            var ct = colorToneDictionary[i];
            this.setStoragedTone( ct.key, [ct.red, ct.green, ct.blue, ct.gray] );
        }
    };

    // --------------------------------------------------
    // 指定されたキーの色調情報を取得します。
    // --------------------------------------------------
    Game_Screen.prototype.getStoragedTone = function( key ) {
        if( this._storagedTone[key] == null ) {
            console.warn( "指定されたキーの色調情報が存在しません。（キー：" + key + "）" );
            return null;
        }
        return this._storagedTone[key];
    };

    // --------------------------------------------------
    // 指定されたキーで色調情報を保存します。
    // --------------------------------------------------
    Game_Screen.prototype.setStoragedTone = function( key, tone ) {
        this._storagedTone[key] = tone;
    };
    
})();