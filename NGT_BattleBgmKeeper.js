//=============================================================================
// NGT_BattleBgmKeeper.js
// ----------------------------------------------------------------------------
// Copyright (c) 2019 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================
/*:
 * @plugindesc This plug-in makes the BGM sound when the battle is over.
 * This also prevents the End of Battle ME from stopping when you switch maps.
 * 
 * @author Velfare Nagata
 * 
 * @help The plug-in parameters let you set how BGM/ME plays when the battle is over.
 * 
 * * Tips
 * By making the background music to be played at the end of the battle the same as the background music of the battle, 
 * the background music of the battle can be continuously played after the battle.
 * 
 * * Version
 *   * 1.0.1 2019/07/28 - Fixed a bug in which plug-in parameters could not be retrieved successfully.
 *   * 1.0.0 2019/05/10 - Published
 * 
 * --------------------------------------------------
 * プラグインコマンド説明
 * --------------------------------------------------
 * ◆When you want to change the background music played at the end of a battle
 * V_BGM_CHANGE {0} {1} {2} {3}
 * {0}: Audio File Name
 * {1}: Volume
 * {2}: Pitch
 * {3}: Pan
 * 
 * Ex: If you want to play Battle2 in the audio/bgm folder with normal audio settings
 *     V_BGM_CHANGE Battle2 90 100 0
 * 
 * * When you want ME to play at the end of a battle.
 * V_ME_PLAY_START
 * 
 * * When you don't want ME to play at the end of a battle.
 * V_ME_PLAY_STOP
 * 
 * * When you want to continue the ME playback at the end of the battle when you switch maps.
 * V_ME_KEEP_START
 * 
 * * When you don't want to continue the ME playback at the end of the battle when you switch maps.
 * V_ME_KEEP_STOP
 * 
 * * When you want to play the background music at the end of a battle.
 * V_BGM_PLAY_START
 * 
 * * When you don't want to play the background music at the end of a battle.
 * V_BGM_PLAY_STOP
 * 
 * @param IsPlayMeOnVictory
 * @desc If true, causes ME to play at the end of the battle.
 * @type Boolean
 * @default true
 * 
 * @param IsKeepMeOnVictory
 * @desc If true, do not stop ME playback at the end of a battle when switching maps.
 * @type Boolean
 * @default true
 * 
 * @param IsPlayBgmOnVictory
 * @desc If true, causes the BGM to play at the end of the battle. In this case, 
 * the background music that was playing on the map is not replayed.
 * @type Boolean
 * @default false
 * 
 * @param VictoryBgm
 * @desc Sets the background music to be played at the end of a battle.
 * @type struct<audioFile>
 * @default {"name":"","volume":"90","pitch":"100","pan":"0"}
 * 
*/
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
 * ◆Version
 *   * 1.0.1 2019/07/28 - プラグインパラメータが正常に取得できていなかったバグを修正
 *   * 1.0.0 2019/05/10 - 初版
 * 
 * --------------------------------------------------
 * プラグインコマンド説明
 * --------------------------------------------------
 * ◆戦闘終了時に鳴らすBGMを変更したい場合
 * V_BGM_CHANGE {0} {1} {2} {3} {4}
 * {0}: 音声ファイル名
 * {1}: 音量
 * {2}: ピッチ
 * {3}: 位相
 * 
 * 例: audio/bgmフォルダに入っているBattle2を通常の音声設定で演奏したい場合
 *     V_BGM_CHANGE Battle2 90 100 0
 * 
 * ◆戦闘終了時にMEを再生したい場合
 * V_ME_PLAY_START
 * 
 * ◆戦闘終了時にMEを再生したくない場合
 * V_ME_PLAY_STOP
 * 
 * ◆戦闘終了時に再生したMEをマップ切替時に継続したい場合
 * V_ME_KEEP_START
 * 
 * ◆戦闘終了時に再生したMEをマップ切替時に継続したくない場合
 * V_ME_KEEP_STOP
 * 
 * ◆戦闘終了時にBGMを再生したい場合
 * V_BGM_PLAY_START
 * 
 * ◆戦闘終了時にBGMを再生したくない場合
 * V_BGM_PLAY_STOP
 * 
 * @param IsPlayMeOnVictory
 * @desc trueの場合、戦闘終了時にMEを再生します。
 * @type Boolean
 * @default true
 * 
 * @param IsKeepMeOnVictory
 * @desc trueの場合、戦闘終了時に再生したMEを、マップ切替時に継続します。
 * @type Boolean
 * @default true
 * 
 * @param IsPlayBgmOnVictory
 * @desc trueの場合、戦闘終了時にBGMを再生します。
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
/*~struct~audioFile:
 * @param name
 * @desc Specifies the audio file name.
 * @type string
 * @default 
 * 
 * @param volume
 * @desc Specifies the volume.
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * 
 * @param pitch
 * @desc Specifies the pitch.
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * 
 * @param pan
 * @desc Specifies the pan.
 * @type number
 * @min -100
 * @max 100
 * @default 0
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
                $gameTemp.battleBgmKeeper.victoryBgm = {"name":name,"volume":volume,"pitch":pitch,"pan":pan};
                console.info( `戦闘勝利BGMを変更しました。（名前：${name}、音量：${volume}、ピッチ：${pitch}、位相：${pan}）` );
                break;
            case 'V_ME_PLAY_START':
                $gameTemp.battleBgmKeeper.isPlayMeOnVictory = true;
                console.info( `戦闘終了時にMEを再生するようにしました。` );
                break;
            case 'V_ME_PLAY_STOP':
                $gameTemp.battleBgmKeeper.isPlayMeOnVictory = false;
                console.info( `戦闘終了時にMEを再生しないようにしました。` );
                break;
            case 'V_ME_KEEP_START':
                $gameTemp.battleBgmKeeper.isKeepMeOnVictory = true;
                console.info( `戦闘終了時に再生したMEをマップ切替時に停止させないようにしました。` );
                break;
            case 'V_ME_KEEP_STOP':
                $gameTemp.battleBgmKeeper.isKeepMeOnVictory = false;
                console.info( `戦闘終了時に再生したMEをマップ切替時に停止させるようにしました。` );
                break;
            case 'V_BGM_PLAY_START':
                $gameTemp.battleBgmKeeper.isPlayBgmOnVictory = true;
                console.info( `戦闘終了時にBGMを再生するようにしました。` );
                break;
            case 'V_BGM_PLAY_STOP':
                $gameTemp.battleBgmKeeper.isPlayBgmOnVictory = false;
                console.info( `戦闘終了時にBGMを再生しないようにしました。` );
                break;
		}
    };

    // BattleBgmKeeper ----------------------------------------------------------------------------
    // ---
    // BattleBgmKeeperの新しいインスタンスを初期化します。
    // ---
    function BattleBgmKeeper() {
        this.initialize.apply( this, arguments );
    };

    // ---
    // BattleBgmKeeperのインスタンスを初期化します。
    // ・プラグインパラメータを取得します。
    // ---
    BattleBgmKeeper.prototype.initialize = function() {
		// プラグインパラメータの読込
		var parameters = PluginManager.parameters( pluginName );
        // 戦闘終了時のME再生フラグ
		this.isPlayMeOnVictory = getParamBoolean(['IsPlayMeOnVictory'] );
        // 戦闘終了時に再生したMEをマップ切替時も継続するフラグ
		this.isKeepMeOnVictory = getParamBoolean(['IsKeepMeOnVictory'] );
        // 戦闘終了時のBGM再生フラグ
        this.isPlayBgmOnVictory = getParamBoolean(['IsPlayBgmOnVictory'] );
        // 戦闘勝利時に鳴らすBGM
        this.victoryBgm = paramParse( parameters['VictoryBgm'] );
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
        if( !$gameTemp.battleBgmKeeper.isKeepMeOnVictory ) {
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
        if( $gameTemp.battleBgmKeeper.isPlayMeOnVictory ) {
            this.playVictoryMe();
        }
        if( $gameTemp.battleBgmKeeper.isPlayBgmOnVictory ) {
            AudioManager.playBgm( $gameTemp.battleBgmKeeper.victoryBgm );
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
        this.battleBgmKeeper = new BattleBgmKeeper();
	};
})();