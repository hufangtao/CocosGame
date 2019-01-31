(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/home/PlayerNetHandler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '2e79dAsJ3NMxJiVwWFCaoB0', 'PlayerNetHandler', __filename);
// scripts/app/component/page/home/PlayerNetHandler.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoDispatcher_1 = require("../../../common/net/proto/ProtoDispatcher");
var ProtoSectionPlayer_1 = require("../../../common/net/proto/mods/ProtoSectionPlayer");
var HomeManager_1 = require("./HomeManager");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var ProtoReflect_1 = require("../../../common/net/proto/ProtoReflect");
var ProtoSectionBuff_1 = require("../../../common/net/proto/mods/ProtoSectionBuff");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var Message_1 = require("../../../common/Message");
var ProtoSectionSignIn_1 = require("../../../common/net/proto/mods/ProtoSectionSignIn");
var PlayerNetHandler = /** @class */ (function () {
    function PlayerNetHandler() {
        ProtoDispatcher_1.PlayerDispatcher.on(ProtoSectionPlayer_1.PlayerSelfInfoS2C.EVENT_NAME, this.onSelfInfo, this);
        ProtoDispatcher_1.PlayerDispatcher.on(ProtoSectionPlayer_1.PlayerFortuneS2C.EVENT_NAME, this.onFortune, this);
        ProtoDispatcher_1.PlayerDispatcher.on(ProtoSectionPlayer_1.PlayerPlayStatS2C.EVENT_NAME, this.onPlayStat, this);
        ProtoDispatcher_1.PlayerDispatcher.on(ProtoSectionPlayer_1.PlayerPveStatS2C.EVENT_NAME, this.onPveStat, this);
        ProtoDispatcher_1.PlayerDispatcher.on(ProtoSectionPlayer_1.PlayerShareGameS2C.EVENT_NAME, this.onShare, this);
        ProtoDispatcher_1.BuffDispatcher.on(ProtoSectionBuff_1.BuffBuffStatusS2C.EVENT_NAME, this.onBuffStatus, this);
        GamePersist_1.default.INSTANCE.OnProtoError(ProtoReflect_1.ProtoSection.player, this.onProtoError, this);
        ProtoDispatcher_1.SignInDispatcher.on(ProtoSectionSignIn_1.SignInSignListS2C.EVENT_NAME, this.onSignInSignList, this);
        ProtoDispatcher_1.SignInDispatcher.on(ProtoSectionSignIn_1.SignInSignS2C.EVENT_NAME, this.onSignInSign, this);
    }
    // 签到列表
    PlayerNetHandler.prototype.onSignInSignList = function (message) {
        var signInSignList = message;
        DYNotify_1.DYNotify.post(Message_1.Message.SIGN_List, signInSignList);
    };
    // 签到列表
    PlayerNetHandler.prototype.onSignInSign = function (message) {
        var signInSign = message;
        DYNotify_1.DYNotify.post(Message_1.Message.SIGN_RESULT, signInSign);
    };
    PlayerNetHandler.prototype.onBuffStatus = function (message) {
        var buffStatus = message;
        var slotId = buffStatus.slotId;
        var buffId = buffStatus.buffId;
        var number = buffStatus.number;
        HomeManager_1.default.INSTANCE.onBuffStatus(slotId, buffId, number);
    };
    PlayerNetHandler.prototype.onShare = function (message) {
        var share = message;
        HomeManager_1.default.INSTANCE.onReceiveShareGameS2C(share);
        DYNotify_1.DYNotify.post(Message_1.Message.GET_SHARE_CNT, share);
    };
    // 处理协议统一的错误码返回
    PlayerNetHandler.prototype.onProtoError = function (message) {
        var protoError = message;
        var protoErrMsg = protoError.errMsg;
        GamePersist_1.default.INSTANCE.Toast(protoErrMsg);
    };
    PlayerNetHandler.prototype.onSelfInfo = function (message) {
        var selfInfo = message;
        HomeManager_1.default.INSTANCE.onReceiveSelfInfoS2C(selfInfo);
    };
    PlayerNetHandler.prototype.onFortune = function (message) {
        var fortune = message;
        var fortuneType = fortune.type;
        var fortuneValue = fortune.val;
        HomeManager_1.default.INSTANCE.onReceiveFortune(fortuneType, fortuneValue);
    };
    PlayerNetHandler.prototype.onPlayStat = function (message) {
        var playStat = message;
        var playCntTotal = playStat.stat.cntTotal;
        var playCntWin = playStat.stat.cntWin;
        var saveOnce = playStat.stat.saveOnce;
        var matchOnce = playStat.stat.matchOnce;
        var pveTotal = playStat.stat.pveTotal;
        var pveWin = playStat.stat.pveWin;
        var weeklyWin = playStat.stat.pvpWinOneweek;
        var weeklyTotal = playStat.stat.pvpTotalOneweek;
        var maxSuccessiveWin = playStat.stat.maxSuccessiveWin;
        var level = playStat.stat.level;
        var guide = playStat.stat.guide;
        HomeManager_1.default.INSTANCE.onReceivePlayStat(playCntTotal, playCntWin, saveOnce, matchOnce, pveTotal, pveWin, weeklyWin, weeklyTotal, maxSuccessiveWin, level, guide);
    };
    PlayerNetHandler.prototype.onPveStat = function (message) {
        var pveStat = message;
        var pveStatArray = pveStat.pvestat;
        // console.log(pveStatArray);
        HomeManager_1.default.INSTANCE.onReceivePveStat(pveStatArray);
    };
    return PlayerNetHandler;
}());
exports.default = PlayerNetHandler;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=PlayerNetHandler.js.map
        