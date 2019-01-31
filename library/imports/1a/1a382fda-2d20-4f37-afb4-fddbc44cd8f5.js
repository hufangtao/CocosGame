"use strict";
cc._RF.push(module, '1a382/aLSBPN6+0/dvETNj1', 'UIEnergy');
// scripts/app/component/prefab/UIEnergy.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GamePersist_1 = require("../../common/persist/GamePersist");
var Modules_1 = require("../../module/Modules");
var UIFunc_1 = require("../../common/UIFunc");
var Message_1 = require("../../common/Message");
var DYNotify_1 = require("../../../dyGame/DYNotify");
var ShareManager_1 = require("../../common/ShareManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIEnergy = /** @class */ (function (_super) {
    __extends(UIEnergy, _super);
    function UIEnergy() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodEnergyEmpty = null;
        _this.nodGetEnergy = null;
        _this.nodTip = null;
        _this.sprWord = null;
        _this.spfWordShare1 = null;
        _this.spfWordShare2 = null;
        _this.spfWordShare3 = null;
        _this.spfWordShare = null;
        return _this;
    }
    UIEnergy.prototype.onLoad = function () {
    };
    UIEnergy.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.OnShow, this.onNotify, this);
    };
    UIEnergy.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    UIEnergy.prototype.setBtnWord = function () {
        if (Modules_1.Home.DataPlayer.EnergyShareCnt === 0) {
            this.sprWord.spriteFrame = this.spfWordShare3;
        }
        else if (Modules_1.Home.DataPlayer.EnergyShareCnt === 1) {
            this.sprWord.spriteFrame = this.spfWordShare2;
        }
        else if (Modules_1.Home.DataPlayer.EnergyShareCnt === 2) {
            this.sprWord.spriteFrame = this.spfWordShare1;
        }
        else if (Modules_1.Home.DataPlayer.EnergyShareCnt === 3) {
            this.sprWord.spriteFrame = this.spfWordShare;
        }
    };
    UIEnergy.prototype.setMode = function (mode) {
        if (mode == 1) {
            this.nodEnergyEmpty.active = true;
            this.nodGetEnergy.active = false;
            this.nodTip.active = false;
            this.setBtnWord();
        }
        else if (mode == 2) {
            this.nodEnergyEmpty.active = false;
            this.nodGetEnergy.active = true;
            this.nodTip.active = false;
        }
        else if (mode == 3) {
            this.nodEnergyEmpty.active = false;
            this.nodGetEnergy.active = false;
            this.nodTip.active = true;
        }
    };
    UIEnergy.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.OnShow) {
            self.onShare(self);
        }
        else if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 1) {
                return;
            }
            if (param.success === 1) {
                self.setMode(3);
            }
            else if (param.success === 0) {
                GamePersist_1.default.INSTANCE.toast('今日分享已达上限');
            }
        }
    };
    UIEnergy.prototype.share = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        if (Modules_1.Home.DataPlayer.EnergyShareCnt === 3) {
            return;
        }
        ShareManager_1.ShareManager.Instance.share(1);
    };
    UIEnergy.prototype.onCancelPanel = function () {
        UIFunc_1.UIFunc.closeUI('UIEnergy', function () { });
    };
    __decorate([
        property(cc.Node)
    ], UIEnergy.prototype, "nodEnergyEmpty", void 0);
    __decorate([
        property(cc.Node)
    ], UIEnergy.prototype, "nodGetEnergy", void 0);
    __decorate([
        property(cc.Node)
    ], UIEnergy.prototype, "nodTip", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIEnergy.prototype, "sprWord", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIEnergy.prototype, "spfWordShare1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIEnergy.prototype, "spfWordShare2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIEnergy.prototype, "spfWordShare3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIEnergy.prototype, "spfWordShare", void 0);
    UIEnergy = __decorate([
        ccclass
    ], UIEnergy);
    return UIEnergy;
}(cc.Component));
exports.default = UIEnergy;

cc._RF.pop();