"use strict";
cc._RF.push(module, 'eca3aXCevhHFZ4hZp5oGPLp', 'UISign');
// scripts/app/ui/UISign.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoSectionSignIn_1 = require("../common/net/proto/mods/ProtoSectionSignIn");
var NetUtil_1 = require("../common/net/NetUtil");
var UIFunc_1 = require("../common/UIFunc");
var DYNotify_1 = require("../../dyGame/DYNotify");
var Message_1 = require("../common/Message");
var GamePersist_1 = require("../common/persist/GamePersist");
var ShareManager_1 = require("../common/ShareManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UISign = /** @class */ (function (_super) {
    __extends(UISign, _super);
    function UISign() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodSigns = null;
        _this.togDouble = null;
        _this.spfCoin = null;
        _this.spfBox = null;
        _this.spfBuff1 = null;
        _this.spfBuff2 = null;
        _this.spfBuff3 = null;
        _this.spfBuff4 = null;
        _this.btnSign = null;
        return _this;
    }
    UISign.prototype.onLoad = function () {
        this.togDouble.node.on('toggle', this.setToggleStatus, this);
    };
    UISign.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.SIGN_List, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.SIGN_RESULT, this.onNotify, this);
        this.notifySignList();
        this.doubleStatus = true;
        this.togDouble.isChecked = true;
        this.canLoadUIGetProp = true;
    };
    UISign.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    UISign.prototype.setToggleStatus = function () {
        this.doubleStatus = this.togDouble.isChecked;
    };
    // 请求签到列表
    UISign.prototype.notifySignList = function () {
        var signInSignList = new ProtoSectionSignIn_1.SignInSignListC2S();
        NetUtil_1.default.SendMsg(signInSignList);
    };
    // 显示签到列表
    UISign.prototype.showSignList = function (param) {
        this.currDay = param.now;
        for (var i = 0; i < param.list.length; ++i) {
            var data = param.list[i];
            var nodSign = this.nodSigns.children[data.slot - 1];
            this.showSignReward(nodSign, data.reward);
            if (data.slot > param.now) {
                // 未来的签到
                nodSign.getChildByName('nodAddSign').active = false;
                nodSign.getChildByName('nodSigned').active = false;
                nodSign.getChildByName('nodCurrDay').active = false;
                nodSign.getChildByName('nodNormal').active = true;
                nodSign.getComponent(cc.Button).interactable = false;
            }
            else if (data.slot < param.now) {
                // 过去的签到
                // nodSign.getChildByName('nodAddSign').active = false;
                // nodSign.getChildByName('nodSigned').active = false;
                nodSign.getChildByName('nodCurrDay').active = false;
                if (data.signed === 0) {
                    // 漏签
                    nodSign.getChildByName('nodNormal').active = false;
                    nodSign.getChildByName('nodAddSign').active = true;
                    nodSign.getComponent(cc.Button).interactable = true;
                }
                else {
                    nodSign.getChildByName('nodNormal').active = true;
                    nodSign.getChildByName('nodSigned').active = true;
                    nodSign.getComponent(cc.Button).interactable = false;
                }
            }
            else if (data.slot == param.now) {
                // 现在的签到
                nodSign.getChildByName('nodAddSign').active = false;
                nodSign.getChildByName('nodCurrDay').active = true;
                nodSign.getChildByName('nodNormal').active = true;
                if (data.signed === 0) {
                    nodSign.getChildByName('nodSigned').active = false;
                    nodSign.getComponent(cc.Button).interactable = false;
                    this.btnSign.interactable = true;
                }
                else {
                    nodSign.getChildByName('nodSigned').active = true;
                    nodSign.getComponent(cc.Button).interactable = false;
                    this.btnSign.node.getChildByName('label').getComponent(cc.Label).string = '已签到';
                    this.btnSign.interactable = false;
                }
            }
        }
    };
    // 设置签到奖励
    UISign.prototype.showSignReward = function (nodSign, rewardList) {
        if (rewardList.length > 1) {
            // 多个奖励
            nodSign.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.spfBox;
            nodSign.getChildByName('name').getComponent(cc.Label).string = '小礼盒';
        }
        else if (rewardList.length == 1) {
            var prop = rewardList[0];
            // 设置图标
            var spriteFrame = void 0;
            switch (prop.goodsId) {
                case 11:
                    spriteFrame = this.spfCoin;
                    break;
                case 1:
                    spriteFrame = this.spfBuff1;
                    break;
                case 2:
                    spriteFrame = this.spfBuff2;
                    break;
                case 3:
                    spriteFrame = this.spfBuff3;
                    break;
                case 4:
                    spriteFrame = this.spfBuff4;
                    break;
            }
            nodSign.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;
            // 设置数量
            nodSign.getChildByName('name').getComponent(cc.Label).string = '数量x' + prop.goodsNum;
        }
    };
    // 显示签到结果
    UISign.prototype.showSign = function (param) {
        var _this = this;
        var nodSign = this.nodSigns.children[param.slot - 1];
        nodSign.getChildByName('nodSigned').active = true;
        nodSign.getChildByName('nodAddSign').active = false;
        nodSign.getChildByName('nodNormal').active = true;
        nodSign.getComponent(cc.Button).interactable = false;
        if (param.slot === this.currDay) {
            this.btnSign.node.getChildByName('label').getComponent(cc.Label).string = '已签到';
            this.btnSign.interactable = false;
        }
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc_1.UIFunc.openUI('UIGetProp', function (node) {
            _this.canLoadUIGetProp = true;
            node.getComponent('UIGetProp').moreProp(param.reward, function () {
                UIFunc_1.UIFunc.closeUI('UIGetProp', function () { });
            });
        });
    };
    UISign.prototype.share = function (slotIndex, isDouble) {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        ShareManager_1.ShareManager.Instance.share(6, { slotIndex: slotIndex, isDouble: isDouble });
    };
    // 观看视频
    UISign.prototype.showAd = function (slotIndex, isDouble) {
        var _this = this;
        if (window['Partner'].supportAd()) {
            GamePersist_1.default.INSTANCE.blockInput();
            window['Partner'].showVideoAd(function () {
                ShareManager_1.ShareManager.Instance.notifySign({ slotIndex: slotIndex, isDouble: isDouble });
            }, function () {
                _this.share(slotIndex, isDouble);
            });
        }
        else {
            cc.log('不支持广告');
            ShareManager_1.ShareManager.Instance.notifySign({ slotIndex: slotIndex, isDouble: isDouble });
        }
    };
    // 签到
    UISign.prototype.onBtnSign = function (slotIndex) {
        if (slotIndex === this.currDay) {
            if (!this.doubleStatus) {
                // 一倍签到
                ShareManager_1.ShareManager.Instance.notifySign({ slotIndex: slotIndex, isDouble: 0 });
            }
            else {
                // 双倍签到
                this.showAd(slotIndex, 1);
            }
            return;
        }
        // 补签
        this.showAd(slotIndex);
    };
    UISign.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.SIGN_List) {
            self.showSignList(param);
        }
        else if (tag == Message_1.Message.SIGN_RESULT) {
            self.showSign(param);
        }
    };
    UISign.prototype.btnListener = function (event) {
        var target = event.target;
        target.scale = 1;
        switch (target.name) {
            case 'btnBack':
                UIFunc_1.UIFunc.closeUI('UISign', function () { });
                break;
            case 'nodSign1':
                this.onBtnSign(1);
                break;
            case 'nodSign2':
                this.onBtnSign(2);
                break;
            case 'nodSign3':
                this.onBtnSign(3);
                break;
            case 'nodSign4':
                this.onBtnSign(4);
                break;
            case 'nodSign5':
                this.onBtnSign(5);
                break;
            case 'nodSign6':
                this.onBtnSign(6);
                break;
            case 'nodSign7':
                this.onBtnSign(7);
                break;
            case 'btnSign':
                this.onBtnSign(this.currDay);
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], UISign.prototype, "nodSigns", void 0);
    __decorate([
        property(cc.Toggle)
    ], UISign.prototype, "togDouble", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UISign.prototype, "spfCoin", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UISign.prototype, "spfBox", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UISign.prototype, "spfBuff1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UISign.prototype, "spfBuff2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UISign.prototype, "spfBuff3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UISign.prototype, "spfBuff4", void 0);
    __decorate([
        property(cc.Button)
    ], UISign.prototype, "btnSign", void 0);
    UISign = __decorate([
        ccclass
    ], UISign);
    return UISign;
}(cc.Component));
exports.UISign = UISign;

cc._RF.pop();