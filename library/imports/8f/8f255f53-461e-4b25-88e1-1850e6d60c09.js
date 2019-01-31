"use strict";
cc._RF.push(module, '8f2559TRh5LJYjhGFDm1gwJ', 'Prop');
// scripts/app/component/page/home/Prop.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GamePersist_1 = require("../../../common/persist/GamePersist");
var Modules_1 = require("../../../module/Modules");
var UIFunc_1 = require("../../../common/UIFunc");
var Message_1 = require("../../../common/Message");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var ShareManager_1 = require("../../../common/ShareManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Prop = /** @class */ (function (_super) {
    __extends(Prop, _super);
    function Prop() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodBuffSlot = null;
        _this.pointer = null;
        _this.adFrame = null;
        _this.hadShowAD = false;
        return _this;
    }
    Prop.prototype.onLoad = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE_INIT, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
        this.updateBuff();
        this.initAd();
        this.canLoadUIGetProp = false;
    };
    Prop.prototype.start = function () {
    };
    Prop.prototype.showHomeAd = function () {
        var _this = this;
        if (window['Partner'].supportAd()) {
            window['Partner'].showHomeAd(function () {
                _this.adFrame.active = true;
            });
        }
    };
    Prop.prototype.hideHomeAd = function () {
        if (window['Partner'].supportAd()) {
            this.adFrame.active = false;
            window['Partner'].hideHomeAd();
        }
    };
    Prop.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    Prop.prototype.init = function (homeUI) {
        this.homeUI = homeUI;
    };
    Prop.prototype.showGuideHand = function () {
        this.pointer.active = true;
        this.pointer.getComponent(cc.Animation).play("aniGuide");
    };
    Prop.prototype.initAd = function () {
        var _this = this;
        if (window['Partner'].supportAd()) {
            window['Partner'].initVideoAd();
            window['Partner'].initHomeAd(function (scrWidth, adWidth, adHeight) {
                var scale = 720 / scrWidth;
                var relAdWidth = scale * adWidth;
                var relAdHeight = scale * adHeight;
                if (!_this.adFrame) {
                    return;
                }
                _this.adFrame.width = relAdWidth + 42 * scale;
                _this.adFrame.height = relAdHeight + 4 * scale;
            });
        }
    };
    Prop.prototype.showAd = function () {
        var _this = this;
        if (this.hadShowAD) {
            return;
        }
        this.hadShowAD = true;
        this.canLoadUIGetProp = true;
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE, this.onNotify, this);
        setTimeout(function () {
            _this.hadShowAD = false;
        }, 2000);
        GamePersist_1.default.INSTANCE.blockInput();
        if (window['Partner'].supportAd()) {
            window['Partner'].showVideoAd(function () {
                ShareManager_1.ShareManager.Instance.notifyWatchAdGetProp();
            }, function () {
                _this.share();
            });
        }
        else {
            GamePersist_1.default.INSTANCE.toast('不支持广告');
            ShareManager_1.ShareManager.Instance.notifyWatchAdGetProp();
        }
    };
    // 更新buff视图
    Prop.prototype.updateBuff = function () {
        for (var i = 0; i < this.nodBuffSlot.children.length; ++i) {
            var num = 0;
            for (var j = 0; j < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++j) {
                if (Modules_1.Home.DataPlayer.PlayerGoodsData[j].goodsId === i + 1) {
                    num = Modules_1.Home.DataPlayer.PlayerGoodsData[j].goodsNum;
                }
            }
            var label = this.nodBuffSlot.children[i].getChildByName('labCount').getComponent(cc.Label);
            label.string = num + '';
        }
    };
    // 点击道具，显示说明
    Prop.prototype.onSlotClick = function (node) {
        for (var i = 0; i < this.nodBuffSlot.children.length; ++i) {
            if (node === this.nodBuffSlot.children[i]) {
                this.nodBuffSlot.children[i].getChildByName('bk-bubble').active = true;
            }
            else {
                this.nodBuffSlot.children[i].getChildByName('bk-bubble').active = false;
            }
        }
    };
    Prop.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag === Message_1.Message.EVENT_MODULE_PLAYER_PRIZE_INIT) {
            self.updateBuff();
        }
        else if (tag === Message_1.Message.EVENT_MODULE_PLAYER_PRIZE) {
            if (cc.director.getScene().name != 'home') {
                return;
            }
            if (!this.canLoadUIGetProp) {
                return;
            }
            this.canLoadUIGetProp = false;
            DYNotify_1.DYNotify.unregObserver(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE, self.onNotify, self);
            UIFunc_1.UIFunc.openUI('UIGetProp', function (node) {
                node.getComponent('UIGetProp').homeAchieveProp(self);
            });
        }
        else if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 3) {
                return;
            }
            if (param.success == 1) {
                // self.notifyWatchAd();
            }
            else if (param.success === 0) {
                GamePersist_1.default.INSTANCE.toast('获取道具次数已用完，明天再试试');
            }
        }
    };
    Prop.prototype.share = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        ShareManager_1.ShareManager.Instance.share(3);
    };
    Prop.prototype.btnListener = function (event) {
        this.pointer.active = false;
        var target = event.target;
        this.onSlotClick(null);
        switch (target.name) {
            case 'btnWatchAd':
                this.showAd();
                break;
            case 'btnSlot1':
                this.onSlotClick(target);
                break;
            case 'btnSlot2':
                this.onSlotClick(target);
                break;
            case 'btnSlot3':
                this.onSlotClick(target);
                break;
            case 'btnSlot4':
                this.onSlotClick(target);
                break;
            case 'btnShare':
                this.share();
                break;
            case 'btnBack':
                // this.panelShare.active = false;
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], Prop.prototype, "nodBuffSlot", void 0);
    __decorate([
        property(cc.Node)
    ], Prop.prototype, "pointer", void 0);
    __decorate([
        property(cc.Node)
    ], Prop.prototype, "adFrame", void 0);
    Prop = __decorate([
        ccclass
    ], Prop);
    return Prop;
}(cc.Component));
exports.default = Prop;

cc._RF.pop();