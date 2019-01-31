(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/ShareManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e56c6MfwzpL04YkaVQor3aS', 'ShareManager', __filename);
// scripts/app/common/ShareManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoSectionPlayer_1 = require("./net/proto/mods/ProtoSectionPlayer");
var NetUtil_1 = require("./net/NetUtil");
var DYNotify_1 = require("../../dyGame/DYNotify");
var Message_1 = require("./Message");
var GamePersist_1 = require("./persist/GamePersist");
var SocialManager_1 = require("./social/SocialManager");
var ProtoSectionSignIn_1 = require("./net/proto/mods/ProtoSectionSignIn");
var ShareManager = /** @class */ (function () {
    function ShareManager() {
    }
    Object.defineProperty(ShareManager, "Instance", {
        get: function () {
            if (ShareManager._instance == null) {
                ShareManager._instance = new ShareManager();
                DYNotify_1.DYNotify.regObserver(Message_1.Message.OnShow, ShareManager._instance.onNotify, ShareManager._instance);
            }
            return ShareManager._instance;
        },
        enumerable: true,
        configurable: true
    });
    ShareManager.prototype.share = function (type, param) {
        this.shareType = type;
        this.param = param;
        var flauntParam = SocialManager_1.default.INSTANCE.makeFlauntParam();
        window['Partner'].doFlaunt(flauntParam, function () {
        });
    };
    ShareManager.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.OnShow) {
            self.onShare(self);
        }
    };
    // 根据分享类型发送不同请求
    ShareManager.prototype.notifyByShareType = function () {
        switch (this.shareType) {
            case 1:
                this.notifyShareGetEnergy();
                break;
            case 3:
                this.notifyShareGetProp();
                break;
            case 4:
                this.notifyShareGetCoin();
                break;
            case 5:
                this.notifyShareAddStep();
                break;
            case 6:
                this.notifySign(this.param);
                break;
            case 7:
                this.notifyDoubleCoin();
                break;
        }
    };
    // 分享回调
    ShareManager.prototype.onShare = function (self) {
        if (!window['Partner'].startFlauntTime) {
            return;
        }
        var success = false;
        var duration = Date.now() - window['Partner'].startFlauntTime;
        if (duration >= 5000) {
            success = true;
        }
        else if (duration > 3000) {
            success = (Math.random() > 0.3 ? true : false);
        }
        else {
            success = (Math.random() > 0.9 ? true : false);
        }
        if (window['Partner'].PARTNER_NAME == "qqplay") {
            success = true;
        }
        if (success) {
            self.notifyByShareType();
        }
        else {
            var msg = (Math.random() > 0.67 ? '分享失败' : (Math.random() > 0.33 ? '请分享到群' : '请不要过多打扰同一个群'));
            GamePersist_1.default.INSTANCE.toast(msg);
        }
        window['Partner'].startFlauntTime = null;
    };
    // 发送签到请求
    ShareManager.prototype.notifySign = function (param) {
        var signInSign = new ProtoSectionSignIn_1.SignInSignC2S();
        signInSign.slot = param.slotIndex;
        if (param.isDouble === 1) {
            signInSign.double = 1;
        }
        else {
            signInSign.double = 0;
        }
        NetUtil_1.default.SendMsg(signInSign);
    };
    // 分享获得体力
    ShareManager.prototype.notifyShareGetEnergy = function () {
        var playerShareGameC2S = new ProtoSectionPlayer_1.PlayerShareGameC2S();
        playerShareGameC2S.reason = 1;
        NetUtil_1.default.SendMsg(playerShareGameC2S);
    };
    // 分享获得道具次数
    ShareManager.prototype.notifyShareGetProp = function () {
        var playerShareGameC2S = new ProtoSectionPlayer_1.PlayerShareGameC2S();
        playerShareGameC2S.reason = 3;
        NetUtil_1.default.SendMsg(playerShareGameC2S);
    };
    // 分享增加金币次数
    ShareManager.prototype.notifyShareGetCoin = function () {
        var playerShareGameC2S = new ProtoSectionPlayer_1.PlayerShareGameC2S();
        playerShareGameC2S.reason = 4;
        NetUtil_1.default.SendMsg(playerShareGameC2S);
    };
    // 分享增加步数次数
    ShareManager.prototype.notifyShareAddStep = function () {
        var playerShareGameC2S = new ProtoSectionPlayer_1.PlayerShareGameC2S();
        playerShareGameC2S.reason = 5;
        NetUtil_1.default.SendMsg(playerShareGameC2S);
    };
    // 发送获取双倍消息
    ShareManager.prototype.notifyDoubleCoin = function () {
        var playerDouble = new ProtoSectionPlayer_1.PlayerDoubleC2S();
        playerDouble.reason = 1;
        NetUtil_1.default.SendMsg(playerDouble);
    };
    // 观看广告获得道具
    ShareManager.prototype.notifyWatchAdGetProp = function () {
        var msg = new ProtoSectionPlayer_1.PlayerWatchAdC2S();
        msg.reason = 1;
        NetUtil_1.default.SendMsg(msg);
    };
    // 观看广告增加步数次数
    ShareManager.prototype.notifyWatchAdAddStep = function () {
        var msg = new ProtoSectionPlayer_1.PlayerWatchAdC2S();
        msg.reason = 2;
        NetUtil_1.default.SendMsg(msg);
    };
    // 观看广告获得金币
    ShareManager.prototype.notifyWatchAdGetCoin = function () {
        var msg = new ProtoSectionPlayer_1.PlayerWatchAdC2S();
        msg.reason = 3;
        NetUtil_1.default.SendMsg(msg);
    };
    // 观看广告获得双倍
    ShareManager.prototype.notifyWatchAdDoubleCoin = function () {
        var msg = new ProtoSectionPlayer_1.PlayerWatchAdC2S();
        msg.reason = 3;
        NetUtil_1.default.SendMsg(msg);
    };
    return ShareManager;
}());
exports.ShareManager = ShareManager;

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
        //# sourceMappingURL=ShareManager.js.map
        