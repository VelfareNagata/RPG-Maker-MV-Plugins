//=============================================================================
// NGT_AfterImage.js
// ----------------------------------------------------------------------------
// Copyright (c) 2017 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
// 1.4.0 2019/12/10 ・残像に座標、拡大率、色調の遷移機能を追加した。
//                  ・残像の表示間隔を指定できるようにした。
//
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
 * @desc 残像がフェードアウトするまでのフレーム数を指定します。
 * @min 1
 * @max 600
 * @default 10
 * 
 * @param feedoutImageToneR
 * @desc 残像の色調(R)を指定します。
 * @min -255
 * @max 255
 * @default -255
 * 
 * @param feedoutImageToneG
 * @desc 残像の色調(G)を指定します。
 * @min -255
 * @max 255
 * @default -255
 * 
 * @param feedoutImageToneB
 * @desc 残像の色調(B)を指定します。
 * @min -255
 * @max 255
 * @default 255‏
 *
 * @param displayInterval
 * @desc 残像の表示間隔をフレーム数で指定します。
 * @min 1
 * @max 600
 * @default 1
 *
 * @param transitions
 * @desc 遷移情報を指定します。
 * @type struct<transition>[]
 * @default []
 *
 * @help 下記のプラグインコマンドを実行し、指定したピクチャに対して残像の有効／無効を設定します。
 * ※任意のパラメータが未指定の場合はプラグインパラメータが適用されます。
 *
 * ピクチャの残像を有効にする場合
 * ・PAI_ADD {0} {1} {2} {3} {4} {5}
 * ・PICT_AFTERIMAGE_ADD {0} {1} {2} {3} {4} {5}
 * ・ピクチャの残像追加 {0} {1} {2} {3} {4} {5}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【任意】残像がフェードアウトするまでのフレーム数
 *   {2}：【任意】残像の色調(R)
 *   {3}：【任意】残像の色調(G)
 *   {4}：【任意】残像の色調(B)
 *   {5}：【任意】残像の表示フレーム間隔
 * 
 * ピクチャの残像を無効にする場合
 * ・PAI_REMOVE {0}
 * ・PICT_AFTERIMAGE_REMOVE {0}
 * ・ピクチャの残像削除 {0}
 *   {0}：【必須】ピクチャ番号
 * 
 * 下記のプラグインコマンドを実行し、指定したピクチャに対して残像の遷移情報を設定します。
 * 
 * プラグインパラメータで設定した遷移情報を指定する場合
 * ・PAI_SET_TRANSITION {0} {1}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】遷移情報の識別子
 * 
 * X軸方向の移動振れ幅を指定する場合
 * ・PAI_SET_TRANSITION_MOVE_X_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * X軸方向の移動制御方法を指定する場合
 * ・PAI_SET_TRANSITION_MOVE_X_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 * Y軸方向の移動振れ幅を指定する場合
 * ・PAI_SET_TRANSITION_MOVE_Y_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * Y軸方向の移動制御方法を指定する場合
 * ・PAI_SET_TRANSITION_MOVE_Y_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 * X軸方向の拡縮振れ幅を指定する場合
 * ※0.01単位で設定することをオススメします。
 * ・PAI_SET_TRANSITION_SCALE_X_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * X軸方向の拡縮制御方法を指定する場合
 * ・PAI_SET_TRANSITION_SCALE_X_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 * Y軸方向の拡縮振れ幅を指定する場合
 * ※0.01単位で設定することをオススメします。
 * ・PAI_SET_TRANSITION_SCALE_Y_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * Y軸方向の拡縮制御方法を指定する場合
 * ・PAI_SET_TRANSITION_SCALE_Y_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 * 色調(R)の遷移振れ幅を指定する場合
 * ・PAI_SET_TRANSITION_TONE_R_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * 色調(R)の遷移制御方法を指定する場合
 * ・PAI_SET_TRANSITION_TONE_R_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 * 色調(G)の遷移振れ幅を指定する場合
 * ・PAI_SET_TRANSITION_TONE_G_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * 色調(G)の遷移制御方法を指定する場合
 * ・PAI_SET_TRANSITION_TONE_G_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 * 色調(B)の遷移振れ幅を指定する場合
 * ・PAI_SET_TRANSITION_TONE_B_RANGE {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の最小値
 *   {2}：【必須】振れ幅内の最大値
 * 
 * 色調(B)の遷移制御方法を指定する場合
 * ・PAI_SET_TRANSITION_TONE_B_ORDER {0} {1} {2}
 *   {0}：【必須】ピクチャ番号
 *   {1}：【必須】振れ幅内の値を前方から順番に取得するフラグを指定します。
 *               falseの場合、取りうる値は常にランダムに決定されます。
 *   {2}：【必須】振れ幅内の値を取得しきった時に反転するフラグを指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 *   {3}：【必須】振れ幅内の値を前方から取得しきるフレーム数を指定します。
 *               この設定はisEnabledがtrueの場合のみ有効です。
 * 
 */
/*~struct~transition:ja
 * @param id
 * @desc 遷移情報の識別子となるIDを指定します。
 * @type string
 * @default 
 * 
 * @param move
 * @desc 1フレーム毎の移動量を指定します。
 * @type struct<move>
 * @default {"x":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}","y":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}"}
 * 
 * @param scale
 * @desc 1フレーム毎の拡大率変更量を指定します。
 * @type struct<scale>
 * @default {"x":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}","y":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}"}
 * 
 * @param tone
 * @desc 1フレーム毎の色調変更量を指定します。
 * @type struct<Tone>
 * @default {"R":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}","G":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}","B":"{\"min\":\"0\",\"max\":\"0\",\"order\":\"{\\\"isEnabled\\\":\\\"true\\\",\\\"isReverse\\\":\\\"true\\\",\\\"frame\\\":\\\"30\\\"}\"}"}
*/
/*~struct~move:ja
 * 
 * @param x
 * @desc X軸方向への移動量を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
 * 
 * @param y
 * @desc Y軸方向への移動量を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
*/
/*~struct~scale:ja
 * 
 * @param x
 * @desc X軸方向への拡大率移動量(%)を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
 * 
 * @param y
 * @desc Y軸方向への拡大率移動量(%)を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
*/
/*~struct~tone:ja
 * 
 * @param R
 * @desc 色調変更量(R)を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
 * 
 * @param G
 * @desc 色調変更量(G)を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
 * 
 * @param B
 * @desc 色調変更量(B)を指定します。
 * @type struct<swingWidth>
 * @default {"min":"0","max":"0","order":"{\"isEnabled\":\"true\",\"isReverse\":\"true\",\"frame\":\"30\"}"}
*/
/*~struct~swingWidth:ja
 * 
 * @param min
 * @desc 取りうる値の最小値を指定します。
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @default 0
 * 
 * @param max
 * @desc 取りうる値の最大値を指定します。
 * @type number
 * @min -9999
 * @max 9999
 * @decimals 2
 * @default 0
 * 
 * @param order
 * @desc 取得順序設定情報を指定します。
 * @type struct<order>
 * @default {"isEnabled":"true","isReverse":"true","frame":"30"}
*/
/*~struct~order:ja
 * 
 * @param isEnabled
 * @desc 振れ幅内の値を前方から順番に取得するフラグを指定します。
 * falseの場合、取りうる値は常にランダムに決定されます。
 * @type boolean
 * @default true
 * 
 * @param isReverse
 * @desc 振れ幅内の値を取得しきった時に反転するフラグを指定します。
 * この設定はisEnabledがtrueの場合のみ有効です。
 * @type boolean
 * @default true
 * 
 * @param frame
 * @desc 振れ幅内の値を前方から取得しきるフレーム数を指定します。
 * この設定はisEnabledがtrueの場合のみ有効です。
 * @type number
 * @min 1
 * @max 600
 * @default 30
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
    let getArgDecimal = function( arg, min, max ) {
        min = ( arguments.length < 2 ) ? -Infinity : min; 
        max = ( arguments.length < 3 ) ? -Infinity : max;

        return ( parseFloat( convertEscapeCharacters( arg ), 10 ) || 0 ).clamp( min, max );
	};
    let getArgString = function( arg ) {
        return arg;
    };
    let getArgBoolean = function( arg ) {
        return ( arg == "true" );
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
            case 'PAI_ADD' :
            case 'ピクチャの残像追加':
            case 'PICT_AFTERIMAGE_ADD' :
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var feedoutOpacityPerFrame = ( args.length >= 2 ) ? getArgNumber( args[1], 1, 600 ) : manager.feedoutOpacityPerFrame;
                var feedoutImageToneR = ( args.length >= 3 ) ? getArgDecimal( args[2], -255, 255 ) : manager.feedoutImageToneR;
                var feedoutImageToneG = ( args.length >= 4 ) ? getArgDecimal( args[3], -255, 255 ) : manager.feedoutImageToneG;
                var feedoutImageToneB = ( args.length >= 5 ) ? getArgDecimal( args[4], -255, 255 ) : manager.feedoutImageToneB;
                var displayInterval = ( args.length >= 6 ) ? getArgNumber( args[5], 1, 600 ) : manager.displayInterval;
                var data = new AfterImage_Data( pictureId, feedoutOpacityPerFrame, feedoutImageToneR, feedoutImageToneG, feedoutImageToneB, displayInterval );
                manager.setAfterImageData( data );
                break;
            case 'PAI_REMOVE' :
            case 'PICT_AFTERIMAGE_REMOVE' :
            case 'ピクチャの残像削除':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                manager.removeAfterImageData( pictureId );
                break;
            case 'PAI_SET_TRANSITION' :
            case 'ピクチャの残像の遷移設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var transitionId = ( args.length >= 2 ) ? getArgString( args[1] ) : null;
                manager.setTransition( pictureId, transitionId );
                break;
            case 'PAI_SET_TRANSITION_MOVE_X_RANGE' :
            case 'ピクチャの残像の移動X軸遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                manager.setTransitionMoveXRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_MOVE_X_ORDER' :
            case 'ピクチャの残像の移動X軸遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionMoveXOrder( pictureId, isEnabled, isReverse, frame );
                break;
            case 'PAI_SET_TRANSITION_MOVE_Y_RANGE' :
            case 'ピクチャの残像の移動Y軸遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                manager.setTransitionMoveYRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_MOVE_Y_ORDER' :
            case 'ピクチャの残像の移動Y軸遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionMoveYOrder( pictureId, isEnabled, isReverse, frame );
                break;
            case 'PAI_SET_TRANSITION_SCALE_X_RANGE' :
            case 'ピクチャの残像の拡縮X軸遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                console.log( args[1] + ":" + args[2] );
                console.log( min + ":" + max );
                manager.setTransitionScaleXRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_SCALE_X_ORDER' :
            case 'ピクチャの残像の拡縮X軸遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionScaleXOrder( pictureId, isEnabled, isReverse, frame );
                break;
            case 'PAI_SET_TRANSITION_SCALE_Y_RANGE' :
            case 'ピクチャの残像の拡縮Y軸遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                manager.setTransitionScaleYRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_SCALE_Y_ORDER' :
            case 'ピクチャの残像の拡縮Y軸遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionScaleYOrder( pictureId, isEnabled, isReverse, frame );
                break;
            case 'PAI_SET_TRANSITION_TONE_R_RANGE' :
            case 'ピクチャの残像の色調R遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                manager.setTransitionToneRRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_TONE_R_ORDER' :
            case 'ピクチャの残像の色調R遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionToneROrder( pictureId, isEnabled, isReverse, frame );
                break;
            case 'PAI_SET_TRANSITION_TONE_G_RANGE' :
            case 'ピクチャの残像の色調G遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                manager.setTransitionToneGRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_TONE_G_ORDER' :
            case 'ピクチャの残像の色調G遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionToneGOrder( pictureId, isEnabled, isReverse, frame );
                break;
            case 'PAI_SET_TRANSITION_TONE_B_RANGE' :
            case 'ピクチャの残像の色調B遷移範囲設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var min = ( args.length >= 2 ) ? getArgDecimal( args[1], -9999, 9999 ) : 0;
                var max = ( args.length >= 3 ) ? getArgDecimal( args[2], -9999, 9999 ) : 0;
                manager.setTransitionToneBRange( pictureId, min, max );
                break;
            case 'PAI_SET_TRANSITION_TONE_B_ORDER' :
            case 'ピクチャの残像の色調B遷移制御設定':
                var pictureId = ( args.length >= 1 ) ? getArgNumber( args[0], 1, 9999 ) : 0;
                var isEnabled = ( args.length >= 2 ) ? getArgBoolean( args[1] ) : false;
                var isReverse = ( args.length >= 3 ) ? getArgBoolean( args[2] ) : false;
                var frame = ( args.length >= 4 ) ? getArgNumber( args[3], 1, 999 ) : 1;
                manager.setTransitionToneBOrder( pictureId, isEnabled, isReverse, frame );
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
        this.displayInterval = getParamNumber(['displayInterval'], 1, 600 );
        let parameters = PluginManager.parameters( pluginName );
		this.transitions = paramParse( parameters['transitions'] );
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
        if( this.isSetuped( data.pictureId ) ) {
            this.removeAfterImageData( data.pictureId );
        }
        this._datas[data.pictureId - 1] = data;
    };

    // ---
    // 指定したIDの遷移情報を取得します。
    // 該当するIDの遷移情報が存在しない場合はnullを返します。
    //
    // 引数
    // ・transitionId : 遷移ID
    //
    // 戻値
    // ・対応する遷移情報
    // ---
    AfterImageManager.prototype.getTransition = function( transitionId ) {
        if( !this.isEnableTransitionId( transitionId ) ) {
            return null;
        }
        return this.transitions.filter( t => t.id === transitionId )[0];
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
        if( !this.isEnablePictureId( pictureId, true ) 
        || !this.isSetuped( pictureId, true ) ) {
           return;
        }
        let data = this.getAfterImageData( pictureId );
        data.dispose();
        this._datas[pictureId - 1] = null;
    };

    // ---
    // 指定した番号のピクチャに対して、指定したIDの遷移情報を指定します。
    //
    // 引数
    // ・pictureId    : ピクチャID
    // ・transitionId : 遷移ID
    //
    // 戻値
    // ・なし
    // ---
    AfterImageManager.prototype.setTransition = function( pictureId, transitionId ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isEnableTransitionId( transitionId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        let transition = this.getTransition( transitionId );
        data.setTransition( transition );
    };

    AfterImageManager.prototype.setTransitionMoveXRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.move.x, min, max );
    };

    AfterImageManager.prototype.setTransitionMoveXOrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.move.x, isEnabled, isReverse, frame );
    };

    AfterImageManager.prototype.setTransitionMoveYRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.move.y, min, max );
    };

    AfterImageManager.prototype.setTransitionMoveYOrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.move.y, isEnabled, isReverse, frame );
    };

    AfterImageManager.prototype.setTransitionScaleXRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.scale.x, min, max );
    };

    AfterImageManager.prototype.setTransitionScaleXOrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.scale.x, isEnabled, isReverse, frame );
    };

    AfterImageManager.prototype.setTransitionScaleYRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.scale.y, min, max );
    };

    AfterImageManager.prototype.setTransitionScaleYOrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.scale.y, isEnabled, isReverse, frame );
    };

    AfterImageManager.prototype.setTransitionToneRRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.tone.R, min, max );
    };

    AfterImageManager.prototype.setTransitionToneROrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.tone.R, isEnabled, isReverse, frame );
    };

    AfterImageManager.prototype.setTransitionToneGRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.tone.G, min, max );
    };

    AfterImageManager.prototype.setTransitionToneGOrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.tone.G, isEnabled, isReverse, frame );
    };

    AfterImageManager.prototype.setTransitionToneBRange = function( pictureId, min, max ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionRange( data.transition.tone.B, min, max );
    };

    AfterImageManager.prototype.setTransitionToneBOrder = function( pictureId, isEnabled, isReverse, frame ) {
        if( !this.isEnablePictureId( pictureId, true ) 
         || !this.isSetuped( pictureId, true ) ) {
            return;
        }
        let data = this.getAfterImageData( pictureId );
        this.setTransitionOrder( data.transition.tone.B, isEnabled, isReverse, frame );
    };

    // ---
    // 指定したSwingWidthExtractorインスタンスに対して、残像の振れ幅を指定します。
    //
    // 引数
    // ・target : 更新対象のSwingWidthExtractorインスタンス
    // ・min    : 振れ幅最小値
    // ・max    : 振れ幅最大値
    //
    // 戻値
    // ・なし
    // ---
    AfterImageManager.prototype.setTransitionRange = function( target, min, max ) {
        target.data.min = min;
        target.data.max = max;
    };

    // ---
    // 指定したSwingWidthExtractorインスタンスに対して、残像の振れ幅取得順序を指定します。
    //
    // 引数
    // ・target    : 更新対象のSwingWidthExtractorインスタンス
    // ・isEnabled : 振れ幅データ順序取得フラグ
    // ・isReverse : 振れ幅データ順序反転フラグ
    // ・frame     : 振れ幅データ順序取得満了までのフレーム数
    //
    // 戻値
    // ・なし
    // ---
    AfterImageManager.prototype.setTransitionOrder = function( target, isEnabled, isReverse, frame ) {
        target.data.order.isEnabled = isEnabled;
        target.data.order.isReverse = isReverse;
        target.data.order.frame = frame;
    };

    // ---
    // 指定したピクチャ番号が有効か否かを判定します。
    //
    // 引数
    // ・pictureId       : ピクチャID
    // ・isOutputWarnLog : 警告ログ出力フラグ 
    //
    // 戻値
    // ・ピクチャ番号有効可否
    // ---
    AfterImageManager.prototype.isEnablePictureId = function( pictureId, isOutputWarnLog ) {
        let result = 1 <= pictureId || pictureId <= this.maxPictures;
        if( !result && isOutputWarnLog ) {
            console.warn( `指定したピクチャID[${pictureId}]が不正です。ピクチャIDの有効範囲は1～${this.maxPictures}です。` );
        }
        return result;
    };

    // ---
    // 指定した遷移IDが有効か否かを判定します。
    //
    // 引数
    // ・pictureId       : ピクチャID
    // ・isOutputWarnLog : 警告ログ出力フラグ 
    //
    // 戻値
    // ・ピクチャ番号有効可否
    // ---
    AfterImageManager.prototype.isEnableTransitionId = function( transitionId, isOutputWarnLog ) {
        let result = this.transitions.some( t => t.id === transitionId );
        if( !result && isOutputWarnLog ) {
            console.warn( `指定した遷移ID[${transitionId}]が不正です。残像情報が定義されていません。` );
        }
        return result;
    };

    // ---
    // 指定したピクチャ番号の残像表示データが有効か否かを判定します。
    //
    // 引数
    // ・pictureId       : ピクチャID
    // ・isOutputWarnLog : 警告ログ出力フラグ 
    //
    // 戻値
    // ・残像表示データ有効可否
    // ---
    AfterImageManager.prototype.isSetuped = function( pictureId, isOutputWarnLog ) {
        let result = this._datas[pictureId - 1] != null;
        if( !result && isOutputWarnLog ) {
            console.warn( `指定したピクチャID[${pictureId}]に残像表示データが登録されていません。` );
        }
        return result;
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
    // ---
    AfterImage_Data.prototype.initialize = function( pictureId, feedoutOpacityPerFrame, feedoutImageToneR, feedoutImageToneG, feedoutImageToneB, displayInterval ) {
        this.pictureId = pictureId;
        this.feedoutOpacityPerFrame = feedoutOpacityPerFrame;
        this.feedoutImageToneR = feedoutImageToneR;
        this.feedoutImageToneG = feedoutImageToneG;
        this.feedoutImageToneB = feedoutImageToneB;
        this.displayInterval = displayInterval;
        this.setTransition();
        this.feedoutOpacityValue = 255 / feedoutOpacityPerFrame;
        this._loopCount = 0; 
        this._intervalFrame = 0;
        this._picture = SceneManager._scene._spriteset._pictureContainer.children[( pictureId * 2 ) - 1];
        this._container = $gameTemp.afterImageManager.getContainer( pictureId );
        this._sprites = new Array();
        for( var i = 0; i < feedoutOpacityPerFrame; i++ ) {
            this._sprites.push( new Sprite_AfterImage() );
        }
    };

    // ---
    // AfterImage_Dataの遷移情報を初期化します。
    // ---
    AfterImage_Data.prototype.setTransition = function( transitionData ) {
        this.transition = AfterImage_Data.getEmptyTransition();
        if( transitionData != null ) {
            this.transition.move.x.data = transitionData.move.x;
            this.transition.move.y.data = transitionData.move.y;
            this.transition.scale.x.data = transitionData.scale.x;
            this.transition.scale.y.data = transitionData.scale.y;
            this.transition.tone.R.data = transitionData.tone.R;
            this.transition.tone.G.data = transitionData.tone.G;
            this.transition.tone.B.data = transitionData.tone.B;
        }
    };

    // ---
    // AfterImage_Dataの遷移情報を初期化します。
    // ---
    AfterImage_Data.getEmptyTransition = function() {
        return {
            id: "",
            move: {
                x: new SwingWidthExtractor(),
                y: new SwingWidthExtractor(),
            },
            scale: {
                x: new SwingWidthExtractor(),
                y: new SwingWidthExtractor(),
            },
            tone: {
                R: new SwingWidthExtractor(),
                G: new SwingWidthExtractor(),
                B: new SwingWidthExtractor()
            }
        };
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
    AfterImage_Data.prototype.addAfterImage = function( pictureData ) {
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
        let pd = pictureData;
        sprite.bitmap = pd.bitmap;
        sprite.frame = pd.frame;
        sprite.scale = pd.scale;
        sprite.anchor = pd.anchor;
        sprite.x = pd.x;
        sprite.y = pd.y;
        sprite.rotation = pd.rotation;
        sprite.opacity = 255;
        sprite.decayOpacity = this.feedoutOpacityValue;
        let t = this.transition;
        sprite.moveX = t.move.x.execute();
        sprite.moveY = t.move.y.execute();
        sprite.scaleX = t.scale.x.execute();
        sprite.scaleY = t.scale.y.execute();
        let r = pictureData.tone[0] + this.feedoutImageToneR + t.tone.R.execute();
        let g = pictureData.tone[1] + this.feedoutImageToneG + t.tone.G.execute();
        let b = pictureData.tone[2] + this.feedoutImageToneB + t.tone.B.execute();
        sprite.setColorTone( [r, g, b] );
    };

    // ---
    // 表示間隔チェック処理を実行し、表示可否を取得します。
    //
    // 引数
    // ・なし
    //
    // 戻値
    // ・残像表示可否
    // ---
    AfterImage_Data.prototype.checkDisplayInterval = function() {
        this._intervalFrame ++;
        let result = ( this._intervalFrame >= this.displayInterval );
        if( result ) {
            this._intervalFrame = 0;
        }
        return result;
    };

    // ---
    // 静止状態での遷移アニメーション有効可否を下記条件で判定します。
    // ・移動、拡縮いずれかの遷移が有効であること
    //
    // 引数
    // ・なし
    //
    // 戻値
    // ・静止状態での遷移アニメーション有効可否
    // ---
    AfterImage_Data.prototype.isEnabledTransitionInWait = function() {
        return this.transition.move.x.isEnabled()
            || this.transition.move.y.isEnabled()
            || this.transition.scale.x.isEnabled()
            || this.transition.scale.y.isEnabled(); 
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
        this._sprites = null;
    };
    // --------------------------------------------------------------------------------------------

    // SwingWidthExtractor----------------------------------------------------------------------------
    // ---
    // SwingWidthExtractorの新しいインスタンスを初期化します。
    // ---
    function SwingWidthExtractor() {
        this.initialize.apply( this, arguments );
    };

    // ---
    // SwingWidthExtractorのインスタンスを初期化します。
    // ---
    SwingWidthExtractor.prototype.initialize = function( data ) {
        this.data = data || SwingWidthExtractor.getEmptySwingWidth();
        this.nowFrame = 0;
        this.isInversion = false;
    };
    
    // ---
    // 値を取得します。
    // ---
    SwingWidthExtractor.prototype.execute = function() {
        let swingWidth = this.getNowSwingWidth();
        this.updateFrameCount();
        return Math.random() * ( swingWidth.max - swingWidth.min ) + swingWidth.min;
    };
    
    // ---
    // 現在取りうる値の振れ幅を取得します。
    // ---
    SwingWidthExtractor.prototype.getNowSwingWidth = function() {
        let data = this.data;
        let order = data.order;
        if( order.isEnabled ) {
            let interval = ( data.max - data.min ) / order.frame;
            return {
                min: data.min + ( this.nowFrame * interval ),
                max: data.min + ( this.nowFrame * interval ) + interval,
            }
        } else {
            return {
                min: data.min,
                max: data.max,
            }
        }
    };
    
    // ---
    // 
    // ---
    SwingWidthExtractor.prototype.updateFrameCount = function() {
        let order = this.data.order;
        this.nowFrame += !this.isInversion ? 1 : -1;
        if( this.nowFrame >= order.frame ) {
            if( this.data.order.isReverse ) {
                this.isInversion = true;
                this.nowFrame -= 1;
            } else {
                this.nowFrame = 0;
            }
        }
        if( this.nowFrame < 0 ) {
            if( this.data.order.isReverse ) {
                this.isInversion = false;
                this.nowFrame += 1;
            } else {
                this.nowFrame = order.frame - 1 ;
            }
        }
    };
    
    // ---
    // 指定した値範囲を取るように設定します。
    // ---
    SwingWidthExtractor.prototype.setValueRange = function( valueMin, valueMax ) {
        this.data.min = valueMin;
        this.data.max = valueMax;
    };
    
    // ---
    // 遷移の有効可否を下記条件で判定します
    // ・値の取得最大値／最小値が0でないこと
    // ---
    SwingWidthExtractor.prototype.isEnabled = function() {
        return !( this.data.min === 0 && this.data.max === 0 );
    };

    // ---
    // SwingWidthExtractorのインスタンスを初期化します。
    // ---
    SwingWidthExtractor.getEmptySwingWidth = function() {
        return {
            min: 0,
            max: 0,
            order : {
                isEnabled: false,
                isReverse: false,
                frame: 1
            }
        };
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
        this.bitmap = picture.bitmap;
        this.frame = new Array();
        this.frame.push( picture._frame[0] );
        this.frame.push( picture._frame[1] );
        this.frame.push( picture._frame[2] );
        this.frame.push( picture._frame[3] );
        let tone = picture.getColorTone();
        this.tone = new Array();
        this.tone.push( tone[0] );
        this.tone.push( tone[1] );
        this.tone.push( tone[2] );
        this.tone.push( tone[3] );
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
        // 下記いずれかの条件に合致する場合は既存処理のみ実行して処理終了
        // ・ピクチャが表示されていない場合
        // ・afterImageManagerが定義されていない場合
        // ・残像情報が取得できない場合
        // ・表示間隔に達していない場合
        let am = $gameTemp.afterImageManager;
        let pictureId = this._pictureId;
        if( !this.visible
         || am == null
         || !am.isSetuped( pictureId )
         || !am.getAfterImageData( pictureId ).checkDisplayInterval() ) {
            _Sprite_Picture_update.apply( this, arguments );
            return;
        }
        // ピクチャ更新前／更新後を比較して変化がある場合は残像を追加する
        // 遷移が定義されている場合は止まっていても残像を追加する
        var before = new Sprite_Picture_Data( this );
        _Sprite_Picture_update.apply( this, arguments );
        var after = new Sprite_Picture_Data( this );
        let data = am.getAfterImageData( pictureId );
        if( data.isEnabledTransitionInWait() || !before.equals( after ) ) {
            data.addAfterImage( before );
        }
    };
    // --------------------------------------------------------------------------------------------

    // Sprite_AfterImage------------------------------------------------------------------------
    // ---
    // 残像Spriteを管理します。
    // ---
    function Sprite_AfterImage() {
        this.initialize.apply( this, arguments );
    }
    Sprite_AfterImage.prototype = Object.create( Sprite.prototype );
    Sprite_AfterImage.prototype.constructor = Sprite_AfterImage;

    // ---
    // Sprite_AfterImageのインスタンスを初期化します。
    // * 各種メンバ変数を初期化します。
    //
    // 引数
    // * cell   : セル情報
    // ---
    Sprite_AfterImage.prototype.initialize = function() {
        Sprite.prototype.initialize.call( this );
        this.moveX = 0;
        this.moveY = 0;
        this.scaleX = 0;
        this.scaleY = 0;
        this.decayOpacity = 0;
    };

    // ---
    // 残像Spriteを描画します。
    // ---
    Sprite_AfterImage.prototype.update = function() {
        Sprite.prototype.update.call( this );
        this.x += this.moveX;
        this.y += this.moveY;
        this.scale.x += this.scaleX;
        this.scale.y += this.scaleY;
        this.opacity -= this.decayOpacity;
        if( this.opacity < 0 ) {
            this.parent.removeChild( this );
        }
    };

    // Spriteset_Base------------------------------------------------------------------------------
    // ---
    // 【Override】
    // GameTempの残像表示処理オブジェクトをクリアします。
    // ---
    var _Spriteset_Base_initialize = Spriteset_Base.prototype.initialize;
    Spriteset_Base.prototype.initialize = function() {
        _Spriteset_Base_initialize.apply( this, arguments );
        $gameTemp.afterImageManager = null;
    };
    // --------------------------------------------------------------------------------------------
})();