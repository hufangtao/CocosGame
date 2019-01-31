(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/social/SocialManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6a91fMwXk5D54zfMpSztnIN', 'SocialManager', __filename);
// scripts/app/common/social/SocialManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules = require("../../module/Modules");
var GamePersist_1 = require("../persist/GamePersist");
var Misc = require("../Misc");
var ProtoSectionPlayer_1 = require("../net/proto/mods/ProtoSectionPlayer");
var NetUtil_1 = require("../net/NetUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var SocialManager = /** @class */ (function () {
    function SocialManager() {
    }
    SocialManager_1 = SocialManager;
    Object.defineProperty(SocialManager, "INSTANCE", {
        get: function () {
            if (!SocialManager_1.singleInstance) {
                SocialManager_1.singleInstance = new SocialManager_1();
                SocialManager_1.singleInstance.init();
            }
            return SocialManager_1.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    // 设置玩家的星数
    SocialManager.prototype.setUserStar = function (star) {
        window['Partner'].setUserStar(star);
    };
    // 构造邀请的参数
    SocialManager.prototype.makeInviteParam = function (serverParam) {
        if (window['Partner'].PARTNER_NAME === "Dev") {
            return serverParam;
        }
        else if (window['Partner'].PARTNER_NAME === "Wechat") {
            var sysShare = Misc.randFlauntShare();
            var playerId = Modules.Home.DataPlayer.MyId;
            var imgUrl = window['Partner'].shareImgUrl(sysShare.img);
            return {
                imageUrl: imgUrl,
                query: "inviter=" + serverParam + "&from=" + playerId + "&time=" + GamePersist_1.default.INSTANCE.ServerTime,
                title: sysShare.title,
            };
        }
        else if (window['Partner'].PARTNER_NAME === "qqplay") {
            var sysShare = Misc.randFlauntShare();
            var playerId = Modules.Home.DataPlayer.MyId;
            var imgUrl = window['Partner'].shareImgUrl(sysShare.img);
            return {
                title: sysShare.title,
                summary: sysShare.title,
                isToFriend: true,
                qqImgUrl: "http://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/" + imgUrl,
                extendInfo: "inviter=" + serverParam + "&from=" + playerId + "&time=" + GamePersist_1.default.INSTANCE.ServerTime,
            };
        }
    };
    // 构造炫耀的参数
    SocialManager.prototype.makeFlauntParam = function () {
        var sysShare = Misc.randFlauntShare();
        var playerId = Modules.Home.DataPlayer.MyId;
        var imgUrl = window['Partner'].shareImgUrl(sysShare.img);
        return {
            imageUrl: imgUrl,
            query: "from=" + playerId + "&time=" + GamePersist_1.default.INSTANCE.ServerTime,
            title: sysShare.title,
        };
    };
    // 构造主动分享的参数
    SocialManager.prototype.makeManualParam = function () {
        var sysShare = Misc.randManualShare();
        var playerId = Modules.Home.DataPlayer.MyId;
        var imgUrl = window['Partner'].shareImgUrl(sysShare.img);
        return {
            imageUrl: imgUrl,
            query: "from=" + playerId + "&time=" + GamePersist_1.default.INSTANCE.ServerTime,
            title: sysShare.title,
        };
    };
    SocialManager.prototype.init = function () {
        var self = this;
        window['Partner'].showShareMenu();
        window['Partner'].registerShareAppCallback(function () {
            return self.onShareApp();
        }, function () {
            var playerShareGameC2S = new ProtoSectionPlayer_1.PlayerShareGameC2S();
            playerShareGameC2S.reason = 1;
            NetUtil_1.default.SendMsg(playerShareGameC2S);
        });
    };
    SocialManager.prototype.onShareApp = function () {
        var sysShare = Misc.randFlauntShare();
        var imgUrl = window['Partner'].shareImgUrl(sysShare.img);
        var playerId = Modules.Home.DataPlayer.MyId;
        return {
            imageUrl: imgUrl,
            query: "from=" + playerId + "&time=" + GamePersist_1.default.INSTANCE.ServerTime,
            title: sysShare.title,
        };
    };
    var SocialManager_1;
    SocialManager = SocialManager_1 = __decorate([
        ccclass
    ], SocialManager);
    return SocialManager;
}());
exports.default = SocialManager;

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
        //# sourceMappingURL=SocialManager.js.map
        