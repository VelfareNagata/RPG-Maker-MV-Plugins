//=============================================================================
// NGT_Shatter.js
// ----------------------------------------------------------------------------
// Copyright (c) 2018 Velfare Nagata
// This plugin is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// Version
//
// 1.0.0 2019/03/17 ・初版
// ----------------------------------------------------------------------------
// [Twitter]: https://twitter.com/velfare_nagata/
//=============================================================================

/*:ja
 * @plugindesc ピクチャを粉砕するプラグインです。
 * 
 * @help 
 * ◆プラグインコマンド
 * SHATTER_PICTURE {0} {1}
 * 粉砕_ピクチャ {0} {1}
 * 
 * {0}：プラグインパラメータに設定した粉砕方法の名前
 * {1}：対象ピクチャID 
 *
 * @param shatterMethods
 * @desc ピクチャの粉砕方法を設定します。
 * @type struct<shatterMethod>[]
 * @default ["{\"name\":\"simple_crash\",\"memo\":\"\\\"単純粉砕\\\"\",\"splitSetting\":\"{\\\"count\\\":\\\"5\\\",\\\"lineWidth\\\":\\\"1.0000\\\",\\\"lineColor\\\":\\\"{\\\\\\\"R\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"G\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"B\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"}\",\"scatterSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"9999\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"animationType\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"referencePoint\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"acceleration\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"z\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0200\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0050\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"r\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0100\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"flashSettings\":\"[]\",\"opacitySettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"9999\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"31\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"opacity\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"name\":\"flash_crash\",\"memo\":\"\\\"フラッシュ粉砕\\\"\",\"splitSetting\":\"{\\\"count\\\":\\\"5\\\",\\\"lineWidth\\\":\\\"1.0000\\\",\\\"lineColor\\\":\\\"{\\\\\\\"R\\\\\\\":\\\\\\\"255\\\\\\\",\\\\\\\"G\\\\\\\":\\\\\\\"255\\\\\\\",\\\\\\\"B\\\\\\\":\\\\\\\"255\\\\\\\"}\\\"}\",\"scatterSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"9999\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"121\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"animationType\\\\\\\":\\\\\\\"3\\\\\\\",\\\\\\\"referencePoint\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"acceleration\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"z\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0200\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0050\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"r\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0100\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"flashSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"20\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"colorTone\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"R\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"G\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"B\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"opacitySettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"9999\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"151\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"opacity\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"name\":\"final_flash_crash\",\"memo\":\"\\\"最後の幻想10みたいなやつ\\\"\",\"splitSetting\":\"{\\\"count\\\":\\\"5\\\",\\\"lineWidth\\\":\\\"3.0000\\\",\\\"lineColor\\\":\\\"{\\\\\\\"R\\\\\\\":\\\\\\\"255\\\\\\\",\\\\\\\"G\\\\\\\":\\\\\\\"255\\\\\\\",\\\\\\\"B\\\\\\\":\\\\\\\"255\\\\\\\"}\\\"}\",\"scatterSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"46\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"animationType\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"referencePoint\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"acceleration\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"z\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0200\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0050\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"r\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0100\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"flashSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"8\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"20\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"colorTone\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"R\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"G\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"B\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"opacitySettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"5\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"76\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"opacity\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"name\":\"gradually_crash_lt\",\"memo\":\"\\\"徐々に粉砕 左上から\\\"\",\"splitSetting\":\"{\\\"count\\\":\\\"5\\\",\\\"lineWidth\\\":\\\"0.0000\\\",\\\"lineColor\\\":\\\"{\\\\\\\"R\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"G\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"B\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"}\",\"scatterSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"animationType\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"referencePoint\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"acceleration\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"-3.0000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"3.0000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"-0.5\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"-1.5\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"z\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"r\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0100\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"}\\\",\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"animationType\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"referencePoint\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"acceleration\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"z\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0200\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0050\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"r\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0100\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"flashSettings\":\"[]\",\"opacitySettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"31\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"opacity\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"name\":\"extinction_t\",\"memo\":\"\\\"消滅 上から\\\"\",\"splitSetting\":\"{\\\"count\\\":\\\"5\\\",\\\"lineWidth\\\":\\\"0.0000\\\",\\\"lineColor\\\":\\\"{\\\\\\\"R\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"G\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"B\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"}\",\"scatterSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"animationType\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"referencePoint\\\\\\\":\\\\\\\"1\\\\\\\",\\\\\\\"acceleration\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"x\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"y\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"-0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"-0.1250\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"z\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0200\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0050\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"r\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"{\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"min\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.1000\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"max\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"0.0100\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\"}\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"flashSettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"60\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"colorTone\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"R\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"255\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"G\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"B\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"0\\\\\\\\\\\\\\\"}\\\\\\\"}\\\"]\",\"opacitySettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"31\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"15\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"2\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"opacity\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}","{\"name\":\"gradually_hide_t\",\"memo\":\"\\\"徐々に消える 上から\\\"\",\"splitSetting\":\"{\\\"count\\\":\\\"5\\\",\\\"lineWidth\\\":\\\"0.0000\\\",\\\"lineColor\\\":\\\"{\\\\\\\"R\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"G\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"B\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"}\",\"scatterSettings\":\"[]\",\"flashSettings\":\"[]\",\"opacitySettings\":\"[\\\"{\\\\\\\"process\\\\\\\":\\\\\\\"{\\\\\\\\\\\\\\\"order\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"3\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startPerFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"startFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"frameTime\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"30\\\\\\\\\\\\\\\",\\\\\\\\\\\\\\\"intervalFrame\\\\\\\\\\\\\\\":\\\\\\\\\\\\\\\"1\\\\\\\\\\\\\\\"}\\\\\\\",\\\\\\\"opacity\\\\\\\":\\\\\\\"0\\\\\\\"}\\\"]\"}"]
 *
 * @author ベルファーレ長田（゜∀゜）◆AHYA/HaiA.‏
 */
/*~struct~shatterMethod:ja
 * 
 * @param name
 * @desc ピクチャの粉砕方法を表す名前です。
 * ここで設定した名前をプラグインコマンドで指定します。
 * @type string
 * @default 
 * 
 * @param memo
 * @desc このピクチャの粉砕方法に関するメモ欄です。
 * プラグインの動作には影響しません。
 * @type note
 * @default 
 * 
 * @param splitSetting
 * @desc ピクチャ粉砕時の分割に関する設定です。
 * @type struct<splitSetting>
 * @default {"count":"5","lineWidth":"0.0000","lineColor":"{\"R\":\"0\",\"G\":\"0\",\"B\":\"0\"}"}
 * 
 * @param scatterSettings
 * @desc ピクチャ粉砕時の散らばり方に関する設定です。
 * @type struct<scatterSetting>[]
 * @default []
 * 
 * @param flashSettings
 * @desc ピクチャ粉砕時のフラッシュに関する設定です。
 * @type struct<flashSetting>[]
 * @default []
 * 
 * @param opacitySettings
 * @desc ピクチャ粉砕時の不透明度変更に関する設定です。
 * @type struct<opacitySetting>[]
 * @default []
 * 
 */
/*~struct~splitSetting:ja
 * 
 * @param count
 * @desc 分割回数を指定します。
 * ※あんまり大きくすると重くなります。
 * @type number
 * @min 1
 * @max 100
 * @default 5
 * 
 * @param lineWidth
 * @desc 分割時の線の幅を指定します。
 * @type number
 * @min 0.0000
 * @max 10.0000
 * @decimals 4
 * @default 0.0000
 * 
 * @param lineColor
 * @desc 分割時の線の色を指定します。
 * @type struct<colorTone>
 * @default {"R":"0","G":"0","B":"0"}
 * 
 */
/*~struct~scatterSetting:ja
 * 
 * @param process
 * @desc 散らばり処理を基本設定します。
 * @type struct<process>
 * @default {"order":"1","startPerFrame":"1","startFrame":"1","frameTime":"1"}
 * 
 * @param animationType
 * @desc 散らばり処理のアニメーション種別を設定します。
 * @type select
 * @option なし
 * @value 1
 * @option 基準点に近付く
 * @value 2
 * @option 基準点から離れる
 * @value 3
 * @default 1
 * 
 * @param referencePoint
 * @desc アニメーションの基準点を指定します。
 * 「animationType」で指定したエフェクトの計算に使用されます。
 * @type select
 * @option 中央
 * @value 1
 * @option 左上
 * @value 2
 * @option 上
 * @value 3
 * @option 右上
 * @value 4
 * @option 右
 * @value 5
 * @option 右下
 * @value 6
 * @option 下
 * @value 7
 * @option 左下
 * @value 8
 * @option 左
 * @value 9
 * @default 1
 * 
 * @param acceleration
 * @desc 散らばりアニメーションの加速度情報を設定します。
 * 「animationType」設定とは別に機能します。
 * @type struct<acceleration>
 * @default {"x":"{\"min\":\"0.0000\",\"max\":\"0.0000\"}","y":"{\"min\":\"0.0000\",\"max\":\"0.0000\"}","z":"{\"min\":\"0.0000\",\"max\":\"0.0000\"}","r":"{\"min\":\"0.0000\",\"max\":\"0.0000\"}"}
 * 
 */
/*~struct~flashSetting:ja
 * 
 * @param process
 * @desc フラッシュ処理を基本設定します。
 * @type struct<process>
 * @default {"order":"1","startPerFrame":"1","startFrame":"1","frameTime":"1"}
 * 
 * @param colorTone
 * @desc フラッシュ色調を設定します。
 * @type struct<colorTone>
 * @default {"R":"0","G":"0","B":"0"}
 * 
 */
/*~struct~opacitySetting:ja
 * 
 * @param process
 * @desc 不透明度変更処理を基本設定します。
 * @type struct<process>
 * @default {"order":"1","startPerFrame":"1","startFrame":"1","frameTime":"1"}
 * 
 * @param opacity
 * @desc 不透明度を設定します。
 * @type number
 * @min 0
 * @max 255
 * @default 0
 * 
 */
/*~struct~process:ja
 * 
 * @param order
 * @desc 処理を実行する順番を指定します。
 * @type select
 * @option 中央から
 * @value 1
 * @option 左上から
 * @value 2
 * @option 上から
 * @value 3
 * @option 右上から
 * @value 4
 * @option 右から
 * @value 5
 * @option 右下から
 * @value 6
 * @option 下から
 * @value 7
 * @option 左下から
 * @value 8
 * @option 左から
 * @value 9
 * @default 1
 * 
 * @param startPerFrame
 * @desc 1フレームあたりの処理開始数を指定します。
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * 
 * @param startFrame
 * @desc 処理を開始するフレーム時間を指定します。
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * 
 * @param frameTime
 * @desc 処理時間を指定します。
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * 
 * @param intervalFrame
 * @desc 次の処理を開始するまでの間隔フレーム時間を指定します。
 * @type number
 * @min 1
 * @max 9999
 * @default 1
 * 
 */
/*~struct~colorTone:ja
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
 */
/*~struct~acceleration:ja
 * @param x
 * @desc 1フレームあたりのX方向への加速度を設定します。
 * @type struct<rangeDouble>
 * @default {"min":"0.0000","max":"0.0000"}
 * 
 * @param y
 * @desc 1フレームあたりのY方向への加速度を設定します。
 * @type struct<rangeDouble>
 * @default {"min":"0.0000","max":"0.0000"}
 * 
 * @param z
 * @desc 1フレームあたりの億回転の加速度を設定します。
 * @type struct<rangeDouble>
 * @default {"min":"0.0000","max":"0.0000"}
 * 
 * @param r
 * @desc 1フレームあたりの横回転の加速度を設定します。
 * @type struct<rangeDouble>
 * @default {"min":"0.0000","max":"0.0000"}
*/
/*~struct~rangeInt:ja
 * @param min
 * @desc 最低値を設定します。
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * 
 * @param max
 * @desc 最高値を設定します。
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
*/
/*~struct~rangeDouble:ja
 * @param min
 * @desc 最低値を設定します。
 * @type number
 * @min -9999.9999
 * @max 9999.9999
 * @decimals 4
 * @default 0.0000
 * 
 * @param max
 * @desc 最高値を設定します。
 * @type number
 * @min -9999.9999
 * @max 9999.9999
 * @decimals 4
 * @default 0.0000
*/

( function() {
    'use strict';
    let pluginName = 'NGT_Shatter';

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
		
		let commandName = command.toUpperCase();
        switch( commandName ) {
			case 'SHATTER_PICTURE':
			case '粉砕_ピクチャ':
                var methodName = ( args.length >= 1 ) ? getArgString( args[0] ) : null;
                var targetPictureId = ( args.length >= 2 ) ? getArgNumber( args[1], 1, 9999 ) : null;
                var targetSprite = SceneManager._scene._spriteset._pictureContainer.children[targetPictureId - 1];
                if( targetSprite.bitmap == null ) {
                    console.warn( `指定したID[${targetPictureId}]のピクチャー画像が読み込まれていません。` );
                    return;
                }
                var shatterer = new Shatterer();
                var shatterMethod = shatterer.getShatterMethod( methodName );
				shatterer.execute( targetSprite, shatterMethod );
                break;
        }
    };

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //-----------------------------------------------------------------------------
    // NotFoundError
    //
    // 対象が見つからなかった場合に発生する例外です。
    //-----------------------------------------------------------------------------
    function NotFoundError( source, target ) {
        this.initialize.apply( this, arguments );
    };
    NotFoundError.prototype = Object.create( Error.prototype );
    NotFoundError.prototype.constructor = NotFoundError;

    //-----------------------------------------------------------------------------
    // NotFoundErrorクラスの初期化を行います。
    //
	// 引数
	// 　・source：
	// 　　検索先のオブジェクト名
	// 　・target：
	// 　　検索対象のオブジェクト名
    //-----------------------------------------------------------------------------
    NotFoundError.prototype.initialize = function( source, target ) {
        this.message = `「${source}」から「${target}が見つかりませんでした。」`;
    };
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //-----------------------------------------------------------------------------
    // ArgumentError
    //
    // 引数が不正な場合に発生する例外です。
    //-----------------------------------------------------------------------------
    function ArgumentError( source, target ) {
        this.initialize.apply( this, arguments );
    };
    ArgumentError.prototype = Object.create( Error.prototype );
    ArgumentError.prototype.constructor = ArgumentError;

    //-----------------------------------------------------------------------------
    // ArgumentErrorクラスの初期化を行います。
    //
	// 引数
	// 　・source：
	// 　　実行対象のロジック名
	// 　・target：
	// 　　エラー対象の引数名
    //-----------------------------------------------------------------------------
    ArgumentError.prototype.initialize = function( source, target ) {
        this.message = `「${source}」の引数、「${target}が不正です。」`;
    };
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
        
    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //-----------------------------------------------------------------------------
    // Shatterer
    //
    // 画像を粉々に分割する機能を提供します。
    //-----------------------------------------------------------------------------
    function Shatterer() {
        this.initialize.apply( this, arguments );
    };

    //-----------------------------------------------------------------------------
    // Shattererインスタンスの初期化処理を行います。
    //-----------------------------------------------------------------------------
    Shatterer.prototype.initialize = function() {
        let parameters = PluginManager.parameters( pluginName );
		this._shatterMethods = paramParse( parameters["shatterMethods"] );
    };

    //-----------------------------------------------------------------------------
    // 指定したスプライト画像を分割し、分割したスプライト画像一覧を取得します。
    //-----------------------------------------------------------------------------
    Shatterer.prototype.execute = function( sprite, method ) {
        let polygons = this.split( sprite, method.splitSetting );
        this.setupPolygonSprites( sprite, polygons, method.splitSetting ); 
        this.scatter( sprite, method.scatterSettings );
        this.flash( sprite, method.flashSettings );
        this.opacity( sprite, method.opacitySettings );
        sprite.startSplit();
    };

    //-----------------------------------------------------------------------------
    // 指定したスプライトの分割処理を行い、分割したスプライトをリスト形式で返します。
    //
	// 引数
	// 　・sprite：
	// 　　分割対象スプライト
	// 　・setting：
	// 　　分割設定
    //-----------------------------------------------------------------------------
    Shatterer.prototype.split = function( sprite, setting ) {
        let polygons = [];
        let points = [];
        points[0] = [];
        // 1.画像の中心点に頂点を置く
        var center = this.putCenter( sprite );
        points[0][0] = center;
        // 2.大きな同心円を作る
        // 3.同心円上に均等に、頂点を「同心円の数 * 2 + 4」の数配置する
        let splitCount = setting.count;
        let radiusPerSplitCount = Math.sqrt( Math.pow( ( sprite.bitmap.width / 2 ), 2 ) + Math.pow( ( sprite.bitmap.height / 2 ), 2 ) ) / splitCount;
        for( let i = 0; i < splitCount; i++ ) {
            let radius = radiusPerSplitCount * ( i + 1 );
            let count = ( i * 2 ) + 4;
            points.push( this.putCirclePoints( center, radius, count ) );
        }
        var getNextIndex = function( array, index ) {
            return ( index + 1 < array.length ) ? index + 1 : 0;
        };
        // 4.同心円上の頂点をn、直前の同心円の頂点をαとして、
        //   下記の法則で頂点を結びポリゴン化する
        //   0:1-α-2, 2-α-3, 3-α-4, 4-α-1
        //   1:1-α-2, α-2-β, 2-β-3, 3-β-4, β-4-γ, 4-γ-5, γ-5-Δ, 5-Δ-6, 6-Δ-1, Δ-1-α
        //   2:…
        for( let iCircle = 1; iCircle < splitCount + 1; iCircle++ ) {
            let nows = points[iCircle];
            let iNows = 0;
            let befores = points[iCircle - 1];
            let iBefores = 0;
            var loopCount = iCircle > 1 ? befores.length : nows.length;
            for( var i = 0; i < loopCount; i++ )
            {
                polygons.push( new Polygon( [nows[iNows], nows[getNextIndex(nows, iNows)], befores[iBefores]] ) );
                iNows ++;
                if( iCircle > 1 && i > 0 && ( i + 1 ) % iCircle == 0 )
                {
                    polygons.push( new Polygon( [nows[iNows], nows[getNextIndex(nows, iNows)], befores[iBefores]] ) );
                    iNows = iNows + 1 < nows.length ? iNows + 1 : 0;
                }
                if( iCircle > 1 ) {
                    polygons.push( new Polygon( [befores[iBefores], befores[getNextIndex(befores, iBefores)], nows[iNows]] ) );
                    iBefores ++;
                }
            }
        }
        return polygons;
    };

    //-----------------------------------------------------------------------------
    // 指定したスプライトの子要素に分割スプライトリストを設定します。
    //
	// 引数
	// 　・sprite：
	// 　　分割対象スプライト
	// 　・polygons：
	// 　　分割ポリゴンリスト
	// 　・setting：
	// 　　分割設定
    //-----------------------------------------------------------------------------
    Shatterer.prototype.setupPolygonSprites = function( sprite, polygons, setting ) {
        let polygonsLength = polygons.length;
        let lineWidth = setting.lineWidth;
        let lineR = setting.lineColor.R;
        let lineG = setting.lineColor.G;
        let lineB = setting.lineColor.B;
        for( let iPolygon = 0; iPolygon < polygonsLength; iPolygon++ ) 
        {
            // 1.描画先スプライトの準備
            let polygon = polygons[iPolygon];
            let width = polygon.size.width;
            let height = polygon.size.height;
            let polygonBitmap = new Bitmap( width, height );
            let polygonSprite = new Sprite_Polygon( polygonBitmap, polygon );
            polygonSprite.x = polygon.center.x - ( sprite.anchor.x == 0 ? 0 : ( sprite.width / 2 ) );
            polygonSprite.y = polygon.center.y - ( sprite.anchor.y == 0 ? 0 : ( sprite.height / 2 ) );
            // 2.描画データ保持用スプライトの準備
            let copyImageBitmap = new Bitmap( width, height );
            let copyImageSprite = new Sprite_Polygon( copyImageBitmap, polygon );
            this.copyImage( sprite, copyImageSprite );
            // 3.描画の移動
            let vertexes = polygon.vertexes;
            let canvas = polygonSprite.bitmap._context;
            // canvas.translate( -polygon.range.minX, -polygon.range.minY );
            // 4.画像に描画
            // console.log( `${polygonSprite.width}:${polygonSprite.height}`);
            canvas.beginPath();
            canvas.moveTo( vertexes[0].x - polygon.range.minX, vertexes[0].y - polygon.range.minY );
            canvas.lineTo( vertexes[1].x - polygon.range.minX, vertexes[1].y - polygon.range.minY );
            canvas.lineTo( vertexes[2].x - polygon.range.minX, vertexes[2].y - polygon.range.minY );
            canvas.closePath();
            canvas.fillStyle = canvas.createPattern( copyImageBitmap._canvas, 'no-repeat' );
            canvas.fill();
            canvas.lineWidth = lineWidth;
            canvas.strokeStyle = `rgba(${lineR}, ${lineG}, ${lineB}, 1)`;
            canvas.globalCompositeOperation = 'source-atop';
            canvas.stroke();
            canvas.globalCompositeOperation = 'destination-over';
            sprite.addChild( polygonSprite );
        }
        // 元画像消す
        sprite.bitmap = null;
    };

    //-----------------------------------------------------------------------------
    // 指定した分割スプライトに、元画像スプライトから画像データをコピーします。
    // 分割スプライトの位置／サイズの分量だけコピーを行います。
    // 
	// 引数
	// 　・source：
	// 　　画像コピー元の元画像スプライト
	// 　・target：
	// 　　画像コピー先の分割済スプライト
    //-----------------------------------------------------------------------------
    Shatterer.prototype.copyImage = function( source, target ) {
        let copyX = Math.floor( target.polygon.range.minX );
        let copyY = Math.floor( target.polygon.range.minY );
        let copyW = Math.floor( target.polygon.range.width );
        let copyH = Math.floor( target.polygon.range.height );
        let writeX = 0;
        let writeY = 0;
        // console.log( `range: minX:${target.polygon.range.minX}, maxX:${target.polygon.range.maxX}, minY:${target.polygon.range.minY}, maxY:${target.polygon.range.maxY}, width:${target.polygon.range.width}, height:${target.polygon.range.height}`);
        // console.log( `Before1 - cpX:${copyX}, cpY:${copyY}, cpW:${copyW}, cpH:${copyH}, writeX:${writeX}, writeY:${writeY}`);
        // 始点が画像の範囲外の場合は、始点を0とし、書き込み始点を範囲外分だけズラし、コピー幅を範囲外分だけ除去する
        if( copyX < 0 ) {
            writeX -= copyX;
            copyW += copyX;
            copyX = 0;
        }
        if( copyY < 0 ) {
            writeY -= copyY;
            copyH += copyY;
            copyY = 0;
        }
        // 終点が画像の範囲外の場合は、終点を画像幅とし、コピー幅を範囲外分だけ除去する
        if( source.width < copyX + copyW ) {
            copyW -= ( copyX + copyW ) - source.width;
        }
        if( source.height < copyY + copyH ) {
            copyH -= ( copyY + copyH ) - source.height;
        }
        target.bitmap.bltImage( source.bitmap, copyX, copyY, copyW, copyH, writeX, writeY );
        // console.log( `After1  - cpX:${copyX}, cpY:${copyY}, cpW:${copyW}, cpH:${copyH}, writeX:${writeX}, writeY:${writeY}`);
        // console.log( `After2 - tgW:${target.bitmap.width}, tgH:${target.bitmap.height}`);
    };

    //-----------------------------------------------------------------------------
    // 指定した分割スプライトリストに対して散らばりエフェクト処理を行います。
    // 
	// 引数
	// 　・sprite：
	// 　　分割済スプライト
	// 　・settings：
	// 　　散らばり設定リスト
    //-----------------------------------------------------------------------------
    Shatterer.prototype.scatter = function( sprite, settings ) {
        let settingsCount = settings.length;
        for( let iSettings = 0; iSettings < settingsCount; iSettings++ ) {
            let s = settings[iSettings];
            let sp = s.process;
            let orderPoint = this.getOrderPoint( sprite, sp.order );
            let sortedPolygonSprites = this.sortByNearPolygonAsc( sprite.children, sp.order, orderPoint );
            let polygonSpritesLength = sortedPolygonSprites.length;
            for( let iPolygon = 0; iPolygon < polygonSpritesLength; iPolygon ++ ) {
                let correctFrame = Math.floor( iPolygon / sp.startPerFrame ) * sp.intervalFrame;
                let cf = correctFrame;
                let polygonSprite = sortedPolygonSprites[iPolygon];
                let polygon = polygonSprite.polygon;
                let referencePoint = this.getOrderPoint( sprite, s.referencePoint );
                let differX = polygon.center.x - referencePoint.x;
                let differY = polygon.center.y - referencePoint.y;
                let speedX = ( differX * 2.5 ) / 100;
                let speedY = ( differY * 0.75 ) / 100;
                switch( s.animationType ) {
                    // 指定点に近づく
                    case 2:
                        polygonSprite.addAcceleration2d( new Acceleration2d( -speedX, -speedY, sp.startFrame + cf, 1 ) );
                        break;
                    // 指定点から離れる
                    case 3:
                        polygonSprite.addAcceleration2d( new Acceleration2d( speedX, speedY, sp.startFrame + cf, 1 ) );
                        break;
                }
                // ユーザ指定の加速度情報反映
                let sa = s.acceleration;
                let speedRandX = Math.random() * ( sa.x.max - sa.x.min ) + sa.x.min;
                let speedRandY = Math.random() * ( sa.y.max - sa.y.min ) + sa.y.min;
                polygonSprite.addAcceleration2d( new Acceleration2d( speedRandX, speedRandY, sp.startFrame + cf, sp.frameTime ) );
                let speedZ = Math.random() * ( sa.z.max - sa.z.min ) + sa.z.min;
                let speedR = Math.random() * ( sa.r.max - sa.r.min ) + sa.r.min;
                // console.log( `${speedZ} : ${speedR} : ${sp.startFrame}`)
                polygonSprite.addAcceleration3d( new Acceleration3d( speedZ, speedR, sp.startFrame + cf ) );
            }
        }
    };

    //-----------------------------------------------------------------------------
    // 指定した分割スプライトリストに対してフラッシュエフェクト処理を行います。
    // 
	// 引数
	// 　・sprite：
	// 　　分割済スプライト
	// 　・settings：
	// 　　フラッシュ設定リスト
    //-----------------------------------------------------------------------------
    Shatterer.prototype.flash = function( sprite, settings ) {
        let settingLength = settings.length;
        for( let iSettings = 0; iSettings < settingLength; iSettings++ ) {
            let s = settings[iSettings];
            let sp = s.process;
            let orderPoint = this.getOrderPoint( sprite, sp.order );
            let sortedPolygonSprites = this.sortByNearPolygonAsc( sprite.children, sp.order, orderPoint );
            let polygonSpritesLength = sortedPolygonSprites.length;
            for( let iPolygon = 0; iPolygon < polygonSpritesLength; iPolygon ++ ) {
                let correctFrame = Math.floor( iPolygon / sp.startPerFrame ) * sp.intervalFrame;
                sortedPolygonSprites[iPolygon].addFlashTone( new FlashTone( s.colorTone, sp.startFrame, sp.frameTime, correctFrame ) );
            }
        }
    };

    //-----------------------------------------------------------------------------
    // 指定した分割スプライトリストに対して不透明度変更処理を行います。
    // 
	// 引数
	// 　・sprite：
	// 　　分割済スプライト
	// 　・settings：
	// 　　不透明度変更設定リスト
    //-----------------------------------------------------------------------------
    Shatterer.prototype.opacity = function( sprite, settings ) {
        let settingLength = settings.length;
        for( let iSettings = 0; iSettings < settingLength; iSettings++ ) {
            let s = settings[iSettings];
            let sp = s.process;
            let orderPoint = this.getOrderPoint( sprite, sp.order );
            let sortedPolygonSprites = this.sortByNearPolygonAsc( sprite.children, sp.order, orderPoint );
            let polygonSpritesLength = sortedPolygonSprites.length;
            for( let iPolygon = 0; iPolygon < polygonSpritesLength; iPolygon ++ ) {
                let correctFrame = Math.floor( iPolygon / sp.startPerFrame ) * sp.intervalFrame;
                sortedPolygonSprites[iPolygon].addOpacity( new OpacityData( s.opacity, sp.startFrame, sp.frameTime, correctFrame ) );
            }
        }
    };

    //-----------------------------------------------------------------------------
    // 指定したスプライトに中心点を配置し、その座標を返します。
    //
	// 引数
	// 　・sprite：
	// 　　分割対象スプライト
    //-----------------------------------------------------------------------------
    Shatterer.prototype.putCenter = function( sprite ) {
        let bitmap = sprite.bitmap;
        let imageWidth = bitmap.width;
        let imageHeight = bitmap.height;
        let centerX = ( imageWidth / 2 );
        let centerY = ( imageHeight / 2 );
        return new Point( centerX, centerY );
    };

    //-----------------------------------------------------------------------------
    // 指定した中心点から、指定した半径の同心円を作成し、
    // その同心円上に指定した個数の頂点を均等配置し、その座標リストを返します。
    //
	// 引数
	// 　・center：
	// 　　中心点
	// 　・radius：
	// 　　半径
	// 　・count：
	// 　　頂点配置個数
    //-----------------------------------------------------------------------------
    Shatterer.prototype.putCirclePoints = function( center, radius, count ) {
        let points = [];
        let splitDegree = 360 / count;
        for( let i = 0; i < count; i++ ) {
            let degreeMin = splitDegree * i;
            let degreeMax = degreeMin + splitDegree;
            let degree = this.adjustDegree( Math.random() * ( degreeMax - degreeMin ) + degreeMin - 90 );
            let radian = degree * ( Math.PI / 180 );
            let x = center.x + radius * Math.cos( radian );
            let y = center.y + radius * Math.sin( radian );
            points.push( new Point( x, y ) );
        }
        return points;
    };

    //-----------------------------------------------------------------------------
	// 指定した角度を-360°～360°の範囲に収まるように調整し返却します。
	//-----------------------------------------------------------------------------
	Shatterer.prototype.adjustDegree = function( degree ) {
		while( degree < 0 || degree > 360 ) {
			if( degree < 0 ) {
				degree += 360;
			}
			if( degree > 360 ) {
				degree -= 360;
			}
		}
		return degree;
	}

    //-----------------------------------------------------------------------------
    // 指定した名称の分割方法をプラグインパラメータから取得します。
    // 
	// 引数
	// 　・methodName：
	// 　　分割方法名称
	// 戻値
	// 　・名称に対応する分割方法
    //-----------------------------------------------------------------------------
    Shatterer.prototype.getShatterMethod = function( methodName ) {
        let loopCount = this._shatterMethods.length;
        for( let i = 0; i < loopCount; i++ ) {
            if( this._shatterMethods[i].name == methodName ) {
                return this._shatterMethods[i];
            }
        }
        throw new NotFoundError( "ShatterMethod", methodName );
    };

    //-----------------------------------------------------------------------------
    // 指定したスプライトをベースに、指定したソートオーダーに対応するソート計算用の座標を取得します。
    // ここで取得した座標はsortByNearPolygonAscメソッドで使用します。
    // 
	// 引数
	// 　・sprite：
	// 　　分割済スプライト
	// 　・order：
	// 　　ソート順指定値
	// 戻値
	// 　・ソート計算用座標
    //-----------------------------------------------------------------------------
    Shatterer.prototype.getOrderPoint = function( sprite, order ) {
        let halfWidth = sprite.width / 2;
        let halfHeight = sprite.height / 2;
        switch( order ) {
            // 中央から
            case 1:
                return new Point( halfWidth, halfHeight );
            // 左上から
            case 2:
                return new Point( -halfWidth, -halfHeight );
            // 上から
            case 3:
                return new Point( halfWidth, -halfHeight );
            // 右上から
            case 4:
                return new Point( sprite.width + halfWidth, -halfHeight );
            // 右から
            case 5:
                return new Point( sprite.width + halfWidth, halfHeight );
            // 右下から
            case 6:
                return new Point( sprite.width + halfWidth, sprite.height + halfHeight );
            // 下から
            case 7:
                return new Point( halfWidth, sprite.height + halfHeight );
            // 左下から
            case 8: 
                return new Point( -halfWidth, sprite.height + halfHeight );
            // 左から
            case 9:
                return new Point( -halfWidth, halfHeight );
        }
    }

    //-----------------------------------------------------------------------------
    // 指定した分割スプライトリストを、指定したソート計算用座標を用いてソート処理を行い、ソートされた分割スプライトリストを返します。
    // 具体的には、分割スプライトの中心座標がソート計算用座標に近い順でソートします。
    // 
	// 引数
	// 　・sprite：
	// 　　分割済スプライト
	// 　・order：
	// 　　ソート順指定値
	// 　・point：
	// 　　ソート計算用座標
	// 戻値
	// 　・ソート済の分割済スプライト
    //-----------------------------------------------------------------------------
    Shatterer.prototype.sortByNearPolygonAsc = function( polygonSprites, order, point ) {
        // ソート順指定値が「中央から」の場合は、もともとそういうソート順なのでそのまま返す
        if( order == 1 ) {
            return polygonSprites;
        }
        let loopCount = polygonSprites.length;
        for( let i = 0; i < loopCount; i++ ) {
            let polygonCenter = polygonSprites[i].polygon.center;
            let p = point;
            let pc = polygonCenter;
            let distance = Math.floor( Math.sqrt( Math.pow( ( p.x - pc.x ), 2 ) + Math.pow( ( p.y - pc.y ), 2 ) ) * 100 );
            polygonSprites[i].sortIndex = distance;
        }
        return this.quickSort( polygonSprites, 0, polygonSprites.length - 1 );
    };
    
    //-----------------------------------------------------------------------------
    // 指定したSprite配列をインデックス値i～jの範囲で昇順クイックソートします。
    // 参考：http://www.ics.kagoshima-u.ac.jp/~fuchida/edu/algorithm/sort-algorithm/quick-sort.html
    //-----------------------------------------------------------------------------
    Shatterer.prototype.quickSort = function( targets, i, j ) {
        if( i === j ) {
            return targets;
        }
        let pivot = this.getPivot( targets, i, j );
        if( pivot === -1 ) {
            return targets;
        }
        let k = this.partition( targets, i, j, targets[pivot] );
        this.quickSort( targets, i, k - 1 );
        this.quickSort( targets, k, j );
        return targets;
    };
    
    //-----------------------------------------------------------------------------
    // パーティション分割
    // a[i]～a[j]の間で、x を軸として分割します。
    // x より小さい要素は前に、大きい要素はうしろに来ます。
    // 大きい要素の開始番号を返します。
    // 参考：http://www.ics.kagoshima-u.ac.jp/~fuchida/edu/algorithm/sort-algorithm/quick-sort.html
    //-----------------------------------------------------------------------------
    Shatterer.prototype.partition = function( targets, i, j, x ) {
        let left = i
        let right = j;

        // 検索が交差するまで繰り返します
        while( left <= right ) {
            // 軸要素以上のデータを探します
            while( left <= j && targets[left].sortIndex < x.sortIndex ) {
                left++;
            }
      
            // 軸要素未満のデータを探します
            while( right >= i && targets[right].sortIndex >= x.sortIndex ) {
                right--;
            }
            if( left > right ) {
                break;
            }
            let t = targets[left];
            targets[left] = targets[right];
            targets[right] = t;
            left ++;
            right --;
          }
          return left;
    };
    
    //-----------------------------------------------------------------------------
    // 軸要素の選択
    // 順に見て、最初に見つかった異なる2つの要素のうち、
    // 大きいほうの番号を返します。
    // 全部同じ要素の場合は -1 を返します。
    // 参考：http://www.ics.kagoshima-u.ac.jp/~fuchida/edu/algorithm/sort-algorithm/quick-sort.html
    //-----------------------------------------------------------------------------
    Shatterer.prototype.getPivot = function( targets, i, j ) {
        let k = i + 1;
        while( k <= j && targets[i].sortIndex === targets[k].sortIndex ) {
            k ++;
        }
        if( k > j ) {
            return -1;
        }
        if( targets[i].sortIndex >= targets[k].sortIndex ) {
            return i;
        }
        return k;
    };

    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //-----------------------------------------------------------------------------
    // Polygon
    //
    // 画像を三角形に切り出す際に使用する３つの頂点情報を管理します。
    //-----------------------------------------------------------------------------
    function Polygon() {
        this.initialize.apply( this, arguments );
    };

	//-----------------------------------------------------------------------------
	// 指定された頂点情報データでPolygonインスタンスを初期化します。
	//
	// 引数
	// 　・vertexes：
	// 　　ポリゴンを構成する頂点情報
	//-----------------------------------------------------------------------------
	Polygon.prototype.initialize = function( vertexes ) {
        this.vertexes = vertexes;
        this.range = this.getRange();
        this.center = this.getCenter( this.range );
        this.size = this.getSizeByRange( this.range );
    };


    //-----------------------------------------------------------------------------
    // このポリゴンの表示範囲を取得します。
    //
	// 引数
	// 　・なし
	// 戻値
	// 　・ポリゴンの表示範囲
    //-----------------------------------------------------------------------------
    Polygon.prototype.getRange = function() {
        let polygonRange = {
            "minX"  : 9999,
            "maxX"  : -9999,
            "minY"  : 9999,
            "maxY"  : -9999,
            "width" : 0,
            "height": 0
        };
        let vertexesLength = this.vertexes.length;
        for( let i = 0; i < vertexesLength; i++ )
        {
            let vertex = this.vertexes[i];
            if( vertex.x < polygonRange.minX ) {
                polygonRange.minX = vertex.x;
            }
            if( polygonRange.maxX < vertex.x ) {
                polygonRange.maxX = vertex.x;
            }
            if( vertex.y < polygonRange.minY ) {
                polygonRange.minY = vertex.y;
            }
            if( polygonRange.maxY < vertex.y ) {
                polygonRange.maxY = vertex.y;
            }
        }
        polygonRange.width =  polygonRange.maxX -  polygonRange.minX;
        polygonRange.height =  polygonRange.maxY -  polygonRange.minY;
        return polygonRange;
    };

    //-----------------------------------------------------------------------------
    // このポリゴンのサイズを取得します。
    //
	// 引数
	// 　・なし
	// 戻値
	// 　・ポリゴンのサイズ
    //-----------------------------------------------------------------------------
    Polygon.prototype.getSize = function() {
        return this.getSizeByRange( this.getRange() );
    };
    
    //-----------------------------------------------------------------------------
    // このポリゴンのサイズを指定した表示範囲から取得します。
    //
	// 引数
    // 　・range：
    // 　　ポリゴンの表示範囲
	// 戻値
	// 　・ポリゴンのサイズ
    //-----------------------------------------------------------------------------
    Polygon.prototype.getSizeByRange = function( range ) {
        return {
            "width" : ( range.maxX - range.minX ),
            "height" : ( range.maxY - range.minY ),
        };
    };

    //-----------------------------------------------------------------------------
    // このポリゴンの中心座標を取得します。
    // ※ポリゴンの元である画像上の相対座標になります。
	//
	// 引数
	// 　・なし
	// 戻値
	// 　・ポリゴンの中心座標
	//-----------------------------------------------------------------------------
    Polygon.prototype.getCenter = function( range ) {
        var centerX = range.minX + ( ( range.maxX - range.minX ) / 2 );
        var centerY = range.minY + ( ( range.maxY - range.minY ) / 2 );
        return new Point( centerX, centerY );
    };
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //-----------------------------------------------------------------------------
    // Sprite_Picture
    //
    // Sprite_Picture配下のSprite_Polygonを管理するために必要なメソッドを拡張します。
    //-----------------------------------------------------------------------------
    //-----------------------------------------------------------------------------
    // Bitmap読込時、Sprite_Polygon管理用変数を初期化します。
    //-----------------------------------------------------------------------------
    let _Sprite_Picture_loadBitmap = Sprite_Picture.prototype.loadBitmap;
    Sprite_Picture.prototype.loadBitmap = function() {
        _Sprite_Picture_loadBitmap.apply( this, arguments );
        this._isSplitting = false;
    };

    //-----------------------------------------------------------------------------
    // 子の分割スプライトが全て終了状態となってるかどうかを確認し、
    // 確認した場合はスプライトをメモリに戻し、当該スプライトを削除します。
    //-----------------------------------------------------------------------------
    let _Sprite_Picture_update = Sprite_Picture.prototype.update;
    Sprite_Picture.prototype.update = function() {
		_Sprite_Picture_update.apply( this, arguments );
        if( this._isSplitting && this.isSplitEnd() ) {
            for( let i = 0; i < this.children.length; i++ ) {
                let child = this.children[i];
                if( child.constructor === Sprite_Polygon ) {
                    this.removeChildAt( i );
                    i --;
                }
            }
            $gameScreen.erasePicture( this._pictureId );
            return;
        }
    };

    //-----------------------------------------------------------------------------
    // 子の分割スプライトが全て終了状態となってるかどうかを確認します。
    //-----------------------------------------------------------------------------
    Sprite_Picture.prototype.isSplitEnd = function() {
        return this.children.every( function( child ) {
            return child.constructor !== Sprite_Polygon 
                || ( child.constructor === Sprite_Polygon && child.isEnd() );
        }); 
    };

    //-----------------------------------------------------------------------------
    // 子の分割スプライトが全て終了状態となってるかどうかを確認します。
    //-----------------------------------------------------------------------------
    Sprite_Picture.prototype.startSplit = function() {
        this._isSplitting = true;
    };
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
    //-----------------------------------------------------------------------------
    // Sprite_Polygon
    //
    // 分割した画像を表示するスプライトです。
    //-----------------------------------------------------------------------------
    function Sprite_Polygon() {
        this.initialize.apply( this, arguments );
    };
    Sprite_Polygon.prototype = Object.create( Sprite.prototype );
    Sprite_Polygon.prototype.constructor = Sprite_Polygon;

	//-----------------------------------------------------------------------------
	// 指定されたポリゴンデータでSprite_Polygonインスタンスを初期化します。
	//
	// 引数
	// 　・bitmap：
	// 　　スプライトに表示する画像データ
	// 　・polygon：
	// 　　スプライトで表現するポリゴンデータ
	//-----------------------------------------------------------------------------
	Sprite_Polygon.prototype.initialize = function( bitmap, polygon ) {
		Sprite.prototype.initialize.call( this, bitmap );
		this._enableFrame = 0;
        this._nowFrame = 0;
        this._speed = new Point( 0, 0 );
        this._rotationSpeed2d = 0;
        this._rotationSpeed3d = 0;
        this._acceleration2ds = [];
        this._acceleration3ds = [];
        this._flashTones = [];
        this._opacityTones = [];
        this._cacheImgData = null;
        this.anchor.x = 0.5;
        this.anchor.y = 0.5;
        this.polygon = polygon;
    };

    //-----------------------------------------------------------------------------
    // 2D加速度情報を追加します。
    //-----------------------------------------------------------------------------
    Sprite_Polygon.prototype.addAcceleration2d = function( acceleration ) {
        this._acceleration2ds.push( acceleration );
        if( this._enableFrame < acceleration._endFrame ) {
            this._enableFrame = acceleration._endFrame
        }
    };

    //-----------------------------------------------------------------------------
    // 3D加速度情報を追加します。
    //-----------------------------------------------------------------------------
    Sprite_Polygon.prototype.addAcceleration3d = function( acceleration ) {
        this._acceleration3ds.push( acceleration );
        if( this._enableFrame < acceleration._endFrame ) {
            this._enableFrame = acceleration._endFrame
        }
    };

    //-----------------------------------------------------------------------------
    // 分割スプライトの状態を更新します。
    //-----------------------------------------------------------------------------
    Sprite_Polygon.prototype.update = function() {
        if( this.isEnd() ) {
            return;
        }
        Sprite.prototype.update.call( this );
        this.updateAcceleration();
        this.updatePosition();
        this.updateRotation2d();
        this.updateRotation3d();
        this.updateFlash();
        this.updateOpacity();
        this._nowFrame += 1;
    };

	//-----------------------------------------------------------------------------
	// 分割スプライトの回転表示状態を更新します。
	//-----------------------------------------------------------------------------
	Sprite_Polygon.prototype.updateRotation2d = function() {
		// this.rotation += ( this._rotationSpeed2d * ( Math.PI / 180 ) );
		this.rotation += this._rotationSpeed2d;
	};

	//-----------------------------------------------------------------------------
    // 分割スプライトの拡縮状態を更新します。
    // X方向に対して拡縮を行うことでZ軸回転を表現します。
	//-----------------------------------------------------------------------------
	Sprite_Polygon.prototype.updateRotation3d = function() {
        if( this.scale.x - this._rotationSpeed3d < -1 ) {
            return;
        }
        this.scale.x -= this._rotationSpeed3d;
	};

	//-----------------------------------------------------------------------------
	// 分割スプライトの加速度を更新します。
	//-----------------------------------------------------------------------------
	Sprite_Polygon.prototype.updateAcceleration = function() {
        for( let i = 0; i < this._acceleration2ds.length; i++ ) {
            let acceleration = this._acceleration2ds[i].get();
            this._speed.x += acceleration.x;
            this._speed.y += acceleration.y;
            if( this._acceleration2ds[i].isEnd() ) {
                this._acceleration2ds.splice( i, 1 );
                i -= 1;
            }
        }
        for( let i = 0; i < this._acceleration3ds.length; i++ ) {
            let acceleration = this._acceleration3ds[i].get();
            this._rotationSpeed2d += acceleration.y;
            this._rotationSpeed3d += acceleration.x;
            if( this._acceleration3ds[i].isEnd() ) {
                this._acceleration3ds.splice( i, 1 );
                i -= 1;
            }
        }
	};

	//-----------------------------------------------------------------------------
	// 分割スプライトの座標を更新します。
	//-----------------------------------------------------------------------------
	Sprite_Polygon.prototype.updatePosition = function() {
		this.x += this._speed.x;
		this.y += this._speed.y;
	};

	//-----------------------------------------------------------------------------
	// 分割スプライトのフラッシュ設定を更新します。
	//-----------------------------------------------------------------------------
    Sprite_Polygon.prototype.updateFlash = function() {
        for( let i = 0; i < this._flashTones.length; i++ ) {
            if( this._flashTones[i].isEnd() ) {
                this._flashTones.splice( i, 1 );
                i -= 1;
            } else {
                let tone = this._flashTones[i].get();
                this.setBlendColor( tone );
            }
        }
    }

    Sprite_Polygon.prototype.addFlashTone = function( flashTone ) {
        this._flashTones.push( flashTone );
        if( this._enableFrame < flashTone._endFrame ) {
            this._enableFrame = flashTone._endFrame;
        }
    }

	//-----------------------------------------------------------------------------
	// 分割スプライトの不透明度変更設定を更新します。
	//-----------------------------------------------------------------------------
    Sprite_Polygon.prototype.updateOpacity = function() {
        let opacity = 0;
        for( let i = 0; i < this._opacityTones.length; i++ ) {
            if( this._opacityTones[i].isEnd() ) {
                this._opacityTones.splice( i, 1 );
                i -= 1;
            } else {
                opacity = this._opacityTones[i].get();
            }
        }
        this.opacity = opacity;
    }

    Sprite_Polygon.prototype.addOpacity = function( opacityTone ) {
        this._opacityTones.push( opacityTone );
        if( this._enableFrame < opacityTone._endFrame ) {
            this._enableFrame = opacityTone._endFrame;
        }
    }

	//-----------------------------------------------------------------------------
	// 分割スプライトが終了状態か否かを判定します。
	//-----------------------------------------------------------------------------
	Sprite_Polygon.prototype.isEnd = function() {
		return this._enableFrame < this._nowFrame;
    };
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

	// MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	//-----------------------------------------------------------------------------
	// Acceleration2d
	// 
	// 分割スプライトの2D加速度を管理します。
	//-----------------------------------------------------------------------------
	function Acceleration2d() {
		this.initialize.apply( this, arguments );
	};

	//-----------------------------------------------------------------------------
	// 指定された加速度データでAcceleration2dインスタンスを初期化します。
	//
	// 引数
	// 　・x：
	// 　　X方向への加速度
	// 　・y：
	// 　　Y方向への加速度
	// 　・startFrame：
	// 　　開始フレーム数
	// 　・endFrame：
    // 　　終了フレーム数
	//-----------------------------------------------------------------------------
	Acceleration2d.prototype.initialize = function( x, y, startFrame, frameTime ) {
		this._x = x;
		this._y = y;
		this._startFrame = startFrame;
		this._endFrame = startFrame + frameTime;
        this._nowFrame = 0;
        this._enableData = new Point( this._x, this._y );
        this._disableData = new Point( 0, 0 );
    };
    
    //-----------------------------------------------------------------------------
    // 加速度情報をPoint形式で取得します。
    // ※有効フレーム数を超過している場合は加速度情報は取得できません。
	//-----------------------------------------------------------------------------
	Acceleration2d.prototype.get = function() {
        if( this.isEnd() ) {
            return this._disableData;
        }
        this._nowFrame += 1;
        return this.isEnable() ? this._enableData : this._disableData;
	};

	//-----------------------------------------------------------------------------
	// 加速度情報の有効有無を取得します。
	//-----------------------------------------------------------------------------
	Acceleration2d.prototype.isEnable = function() {
        return ( this._startFrame <= this._nowFrame && this._nowFrame < this._endFrame )
    };
	//-----------------------------------------------------------------------------
	// 加速度情報の終了有無を取得します。
	//-----------------------------------------------------------------------------
	Acceleration2d.prototype.isEnd = function() {
        return ( this._endFrame <= this._nowFrame )
	};
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	//-----------------------------------------------------------------------------
	// Acceleration3d
	// 
	// 分割スプライトの3D加速度を管理します。
	//-----------------------------------------------------------------------------
	function Acceleration3d() {
		this.initialize.apply( this, arguments );
	};

	//-----------------------------------------------------------------------------
	// 指定された加速度データでAcceleration3dインスタンスを初期化します。
	//
	// 引数
	// 　・x：
	// 　　X方向への加速度
	// 　・y：
	// 　　Y方向への加速度
	// 　・startFrame：
	// 　　開始フレーム数
	// 　・endFrame：
	// 　　終了フレーム数
	//-----------------------------------------------------------------------------
	Acceleration3d.prototype.initialize = function( z, r, startFrame ) {
		this._z = z;
		this._r = r;
		this._startFrame = startFrame;
		this._endFrame = startFrame + 1;
        this._nowFrame = 0;
        this._enableData = new Point( this._z, this._r );
        this._disableData = new Point( 0, 0 );
    };
    
    //-----------------------------------------------------------------------------
    // 加速度情報をPoint形式で取得します。
    // ※有効フレーム数を超過している場合は加速度情報は取得できません。
	//-----------------------------------------------------------------------------
	Acceleration3d.prototype.get = function() {
        if( this.isEnd() ) {
            return this._disableData;
        }
        this._nowFrame += 1;
        return this.isEnable() ? this._enableData : this._disableData;
	};

	//-----------------------------------------------------------------------------
	// 加速度情報の有効有無を取得します。
	//-----------------------------------------------------------------------------
	Acceleration3d.prototype.isEnable = function() {
        return ( this._startFrame <= this._nowFrame && this._nowFrame < this._endFrame )
    };
	//-----------------------------------------------------------------------------
	// 加速度情報の終了有無を取得します。
	//-----------------------------------------------------------------------------
	Acceleration3d.prototype.isEnd = function() {
        return ( this._endFrame <= this._nowFrame )
	};
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	//-----------------------------------------------------------------------------
	// FlashTone
	// 
	// 分割スプライトの色調変更度を管理します。
	//-----------------------------------------------------------------------------
	function FlashTone() {
		this.initialize.apply( this, arguments );
	};

	//-----------------------------------------------------------------------------
	// 指定された色調変更データでFlashToneインスタンスを初期化します。
	//
	// 引数
	// 　・tone：
	// 　　色調
	// 　・startFrame：
	// 　　開始フレーム数
	// 　・endFrame：
	// 　　終了フレーム数
	//-----------------------------------------------------------------------------
	FlashTone.prototype.initialize = function( tone, startFrame, frameTime, interval ) {
		this._tone = tone;
		this._startFrame = startFrame;
        this._endFrame = startFrame + frameTime + interval - 1;
        this._nowFrame = -1;
        this._disableData = [tone.R, tone.G, tone.B, 0];
        this._transitionTones = new Array();
        let opacityPerFrame = 255 / frameTime;
        for( let i = 0; i < startFrame + interval; i++ ) {
            this._transitionTones.push( this._disableData );
        }
        for( let i = 1; i <= frameTime; i++ ) {
            let opacity = ( i != frameTime ) ? 255 - ( opacityPerFrame * i ) : 0;
            this._transitionTones.push( [tone.R, tone.G, tone.B, opacity] );
        }
    };
    
    //-----------------------------------------------------------------------------
    // 色調情報をColorTone形式で取得します。
	//-----------------------------------------------------------------------------
	FlashTone.prototype.get = function() {
        this._nowFrame += 1;
        if( this.isEnable() ) {
            return this._transitionTones[this._nowFrame];
        } else {
            return this._disableData;
        }
	};

	//-----------------------------------------------------------------------------
	// 色調情報の有効有無を取得します。
	//-----------------------------------------------------------------------------
	FlashTone.prototype.isEnable = function() {
        return this._nowFrame < this._endFrame;
    };
	//-----------------------------------------------------------------------------
	// 色調情報の終了有無を取得します。
	//-----------------------------------------------------------------------------
	FlashTone.prototype.isEnd = function() {
        return this._endFrame <= this._nowFrame;
	};
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW

    // MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
	//-----------------------------------------------------------------------------
	// OpacityData
	// 
	// 分割スプライトの色調変更度を管理します。
	//-----------------------------------------------------------------------------
	function OpacityData() {
		this.initialize.apply( this, arguments );
	};

	//-----------------------------------------------------------------------------
	// 指定された色調変更データでOpacityDataインスタンスを初期化します。
	//
	// 引数
	// 　・tone：
	// 　　色調
	// 　・startFrame：
	// 　　開始フレーム数
	// 　・endFrame：
	// 　　終了フレーム数
	//-----------------------------------------------------------------------------
	OpacityData.prototype.initialize = function( opacity, startFrame, frameTime, interval ) {
		this._opacity = opacity;
		this._startFrame = startFrame;
        this._endFrame = startFrame + frameTime + interval - 1;
        this._nowFrame = -1;
        this._transitionOpacities = new Array();
        let opacityPerFrame = ( opacity - 255 ) / frameTime;
        for( let i = 0; i < startFrame + interval; i++ ) {
            this._transitionOpacities.push( 255 );
        }
        for( let i = 1; i <= frameTime; i++ ) {
            let value = ( i != frameTime ) ? 255 + ( opacityPerFrame * i ) : opacity;
            this._transitionOpacities.push( value );
        }
    };
    
    //-----------------------------------------------------------------------------
    // 色調情報をColorTone形式で取得します。
	//-----------------------------------------------------------------------------
	OpacityData.prototype.get = function() {
        this._nowFrame += 1;
        if( this.isEnable() ) {
            return this._transitionOpacities[this._nowFrame];
        } else {
            return this._opacity;
        }
	};

	//-----------------------------------------------------------------------------
	// 色調情報の有効有無を取得します。
	//-----------------------------------------------------------------------------
	OpacityData.prototype.isEnable = function() {
        return this._nowFrame < this._endFrame;
    };
	//-----------------------------------------------------------------------------
	// 色調情報の終了有無を取得します。
	//-----------------------------------------------------------------------------
	OpacityData.prototype.isEnd = function() {
        return this._endFrame <= this._nowFrame;
	};
    // WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW
    
    let _Game_Temp_initialize = Game_Temp.prototype.initialize;
	Game_Temp.prototype.initialize = function() {
		_Game_Temp_initialize.apply( this, arguments );
        this.Shatterer = new Shatterer();
    };
})();