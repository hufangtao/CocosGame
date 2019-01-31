"use strict";
cc._RF.push(module, '52546Y+L61PHJE1Pd8mtZ+U', 'UIGetCoin');
// scripts/app/ui/UIGetCoin.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunc_1 = require("../common/UIFunc");
var GamePersist_1 = require("../common/persist/GamePersist");
var Message_1 = require("../common/Message");
var DYNotify_1 = require("../../dyGame/DYNotify");
var Modules_1 = require("../module/Modules");
var ShareManager_1 = require("../common/ShareManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGetCoin = /** @class */ (function (_super) {
    __extends(UIGetCoin, _super);
    function UIGetCoin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labLeftCount = null;
        _this.labLackCoin = null;
        _this.labGetCoin = null;
        return _this;
    }
    UIGetCoin.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.labLeftCount.string = '(' + Modules_1.Home.DataPlayer.CoinShareCnt + '/5)';
        this.labLackCoin.node.active = false;
        this.labGetCoin.node.active = false;
        this.canLoadUIGetProp = true;
    };
    UIGetCoin.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    UIGetCoin.prototype.setType = function (type) {
        if (type === 1) {
            this.labLackCoin.node.active = true;
        }
        else if (type === 2) {
            this.labGetCoin.node.active = true;
        }
    };
    UIGetCoin.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 4) {
                return;
            }
            if (param.success == 1) {
                self.onGetCoin();
            }
            else if (param.success === 0) {
                GamePersist_1.default.INSTANCE.toast('免费获得金币次数已用完，明天再试试');
                this.closePanel();
            }
        }
        else if (tag == Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE) {
            self.onGetCoin();
        }
    };
    UIGetCoin.prototype.onGetCoin = function () {
        var _this = this;
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc_1.UIFunc.openUI('UIGetProp', function (node) {
            _this.node.active = false;
            node.getComponent('UIGetProp').achieveCoin(100, function () {
                UIFunc_1.UIFunc.closeUI('UIGetProp', function () { });
            });
        });
    };
    UIGetCoin.prototype.share = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        ShareManager_1.ShareManager.Instance.share(4);
    };
    // 关闭本窗口
    UIGetCoin.prototype.closePanel = function () {
        UIFunc_1.UIFunc.closeUI('UIGetCoin', function () { });
    };
    // 观看视频
    UIGetCoin.prototype.showAd = function () {
        var _this = this;
        if (window['Partner'].supportAd()) {
            GamePersist_1.default.INSTANCE.blockInput();
            window['Partner'].showVideoAd(function () {
                ShareManager_1.ShareManager.Instance.notifyWatchAdGetCoin();
                _this.onGetCoin();
            }, function () {
                _this.share();
            });
        }
        else {
            cc.log('不支持广告');
            ShareManager_1.ShareManager.Instance.notifyWatchAdGetCoin();
            this.onGetCoin();
        }
    };
    UIGetCoin.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnYes':
                this.showAd();
                target.scale = 1;
                break;
            case 'btnNo':
                this.closePanel();
                target.scale = 1;
                break;
        }
    };
    __decorate([
        property(cc.Label)
    ], UIGetCoin.prototype, "labLeftCount", void 0);
    __decorate([
        property(cc.Label)
    ], UIGetCoin.prototype, "labLackCoin", void 0);
    __decorate([
        property(cc.Label)
    ], UIGetCoin.prototype, "labGetCoin", void 0);
    UIGetCoin = __decorate([
        ccclass
    ], UIGetCoin);
    return UIGetCoin;
}(cc.Component));
exports.default = UIGetCoin;

cc._RF.pop();