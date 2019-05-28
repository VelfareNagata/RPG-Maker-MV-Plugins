//=============================================================================
// NGT_BattleBgmKeeper.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
//
// 1.0.0 2019/05/10 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================
/*:ja
 * @plugindesc 戦闘終了時にBGMを鳴らせるようにします。
 * また、戦闘終了MEをマップ切替時に止めないようにできます。
 * 
 * @author ベルファーレ長田（゜∀゜）◆AHYA/HaiA.
 * 
 * @help プラグインパラメータで、
 * 戦闘終了時のBGM/MEの再生方法を設定できます。
 * 
 * ◆小技
 * 戦闘終了時に再生するBGMを、戦闘BGMと同じにすることで、
 * 戦闘BGMを戦闘終了後も継続再生することができます。
 * 
 * --------------------------------------------------
 * プラグインコマンド説明
 * --------------------------------------------------
 * ◆戦闘終了時に鳴らすBGMを変更したい場合
 * V_BGM_CHANGE {0} {1} {2} {3} {4}
 * {0}：音声ファイル名
 * {1}：音量
 * {2}：ピッチ
 * {3}：位相
 * 
 * ◆戦闘終了時にMEを再生するようにしたい場合
 * V_ME_PLAY_START
 * 
 * ◆戦闘終了時にMEを再生しないようにしたい場合
 * V_ME_PLAY_STOP
 * 
 * ◆戦闘終了時に再生したMEをマップ切替時に停止させないようにしたい場合
 * V_ME_KEEP_START
 * 
 * ◆戦闘終了時に再生したMEをマップ切替時に停止させるようにしたい場合
 * V_ME_KEEP_STOP
 * 
 * ◆戦闘終了時にBGMを再生するようにしたい場合
 * V_BGM_PLAY_START
 * 
 * ◆戦闘終了時にBGMを再生しないようにしたい場合
 * V_BGM_PLAY_STOP
 * 
 * @param IsPlayMeOnVictory
 * @desc trueの場合、戦闘終了時にMEを再生するようにします。
 * @type Boolean
 * @default true
 * 
 * @param IsKeepMeOnVictory
 * @desc trueの場合、戦闘終了時に再生したMEを、マップ切替時に止めないようにします。
 * @type Boolean
 * @default true
 * 
 * @param IsPlayBgmOnVictory
 * @desc trueの場合、戦闘終了時にBGMを再生するようにします。
 * この場合、マップで再生していたBGMはリプレイされません。
 * @type Boolean
 * @default false
 * 
 * @param VictoryBgm
 * @desc 戦闘終了時に鳴らすBGMを設定します。
 * @type struct<audioFile>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
*/
/*~struct~audioFile:ja
 * @param name
 * @desc 音声ファイル名を指定します。
 * @type string
 * @default 
 * 
 * @param volume
 * @desc 音量を指定します。
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param pitch
 * @desc ピッチを指定します。
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param pan
 * @desc 位相を指定します。
 * @type number
 * @min -100
 * @max 100
 * @default 0
*/
( function() {
    'use strict';
	var pluginName = 'NGT_BattleBgmKeeper';
	
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
    var convertEscapeCharacters = function( text ) {
        text = ( text == null ) ? '' : text;
        var window = SceneManager._scene._windowLayer.children[0];
        return window ? window.convertEscapeCharacters( text ) : text;
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
    // ローカル変数
    // --------------------------------------------------
    // 戦闘終了時のME再生フラグ
    var _isPlayMeOnVictory = true;
    // 戦闘終了時に再生したMEをマップ切替時も継続するフラグ
    var _isKeepMeOnVictory = true;
    // 戦闘終了時のBGM再生フラグ
    var _isPlayBgmOnVictory = true;
    // 戦闘勝利時に鳴らすBGM
    var _victoryBgm = {"name":"","volume":"90","pitch":"100","pan":"0"};

	// --------------------------------------------------
    // プラグインコマンド追加　　　　
    // --------------------------------------------------
    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function( command, args ) {
		_Game_Interpreter_pluginCommand.apply( this, arguments );
		
		var commandName = getCommandName( command );
        switch( commandName ) {
            case 'V_BGM_CHANGE':
                var name = ( args.length >= 1 ) ? args[0] : "";
                var volume = ( args.length >= 2 ) ? getArgNumber( args[2], 0, 100 ) : 90;
                var pitch = ( args.length >= 3 ) ? getArgNumber( args[3], 50, 150 ) : 100;
                var pan = ( args.length >= 4 ) ? getArgNumber( args[4], -100, 100 ) : 0;
                _victoryBgm = {"name":name,"volume":volume,"pitch":pitch,"pan":pan};
                console.info( `戦闘勝利BGMを変更しました。（名前：${name}、音量：${volume}、ピッチ：${pitch}、位相：${pan}）` );
                break;
            case 'V_ME_PLAY_START':
                _isPlayMeOnVictory = true;
                console.info( `戦闘終了時にMEを再生するようにしました。` );
                break;
            case 'V_ME_PLAY_STOP':
                _isPlayMeOnVictory = false;
                console.info( `戦闘終了時にMEを再生しないようにしました。` );
                break;
            case 'V_ME_KEEP_START':
                _isKeepMeOnVictory = true;
                console.info( `戦闘終了時に再生したMEをマップ切替時に停止させないようにしました。` );
                break;
            case 'V_ME_KEEP_STOP':
                _isKeepMeOnVictory = false;
                console.info( `戦闘終了時に再生したMEをマップ切替時に停止させるようにしました。` );
                break;
            case 'V_BGM_PLAY_START':
                _isPlayBgmOnVictory = true;
                console.info( `戦闘終了時にBGMを再生するようにしました。` );
                break;
            case 'V_BGM_PLAY_STOP':
                _isPlayBgmOnVictory = false;
                console.info( `戦闘終了時にBGMを再生しないようにしました。` );
                break;
		}
    };

    // --------------------------------------------------
    // 【override】Scene_Battle.terminate()
    // 
    // 戦闘終了時、必要であれば戦闘終了MEを停止させないようにします。
    // --------------------------------------------------
    Scene_Battle.prototype.terminate = function() {
        Scene_Base.prototype.terminate.call(this);
        $gameParty.onBattleEnd();
        $gameTroop.onBattleEnd();
        if( !_isKeepMeOnVictory ) {
            AudioManager.stopMe();
        }
        ImageManager.clearRequest();
    };

    // --------------------------------------------------
    // 【override】BattleManager.playVictoryMe()
    //
    // プラグインパラメータ／プラグインコマンドで指定したBGMを再生します。
    // --------------------------------------------------
    BattleManager.processVictory = function() {
        $gameParty.removeBattleStates();
        $gameParty.performVictory();
        if( _isPlayMeOnVictory ) {
            this.playVictoryMe();
        }
        if( _isPlayBgmOnVictory ) {
            AudioManager.playBgm( _victoryBgm );
        } else {
            this.replayBgmAndBgs();
        }
        this.makeRewards();
        this.displayVictoryMessage();
        this.displayRewards();
        this.gainRewards();
        this.endBattle(0);
    };

    //-----------------------------------------------------------------------------
	// 【override】Game_Temp.initialize()
	//
	// プラグインパラメータを読み込み／保持します。
	//-----------------------------------------------------------------------------
	var _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_initialize.apply( this, arguments );

		// プラグインパラメータの読込
		var parameters = PluginManager.parameters( pluginName );
		_isPlayMeOnVictory = parameters['IsPlayMeOnVictory'];
		_isKeepMeOnVictory = parameters['IsKeepMeOnVictory'];
		_isPlayBgmOnVictory = parameters['IsPlayBgmOnVictory'];
		_victoryBgm = paramParse( parameters['VictoryBgm'] );
	};
})();