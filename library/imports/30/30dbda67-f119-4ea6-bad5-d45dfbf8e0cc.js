"use strict";
cc._RF.push(module, '30dbdpn8RlOprrV1F37+ODM', 'UIChoosePvp');
// scripts/app/ui/UIChoosePvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var UIFunc_1 = require("../common/UIFunc");
var ProtoSectionPlayer_1 = require("../common/net/proto/mods/ProtoSectionPlayer");
var Defines_1 = require("../common/Defines");
var HomeManager_1 = require("../component/page/home/HomeManager");
var Message_1 = require("../common/Message");
var DYNotify_1 = require("../../dyGame/DYNotify");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodConfirm = null;
        _this.nodRooms = null;
        _this.sprRoomName = null;
        _this.labMoneyCount = null;
        _this.spfRoom1 = null;
        _this.spfRoom2 = null;
        _this.spfRoom3 = null;
        _this.spfRoom4 = null;
        _this.spfRoom5 = null;
        return _this;
    }
    NewClass.prototype.onEnable = function () {
        this.nodRooms.getChildByName('room3').getChildByName('sprite').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        this.nodRooms.getChildByName('room4').getChildByName('sprite').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        this.nodRooms.getChildByName('room5').getChildByName('sprite').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.updateMmoney();
    };
    NewClass.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    NewClass.prototype.updateMmoney = function () {
        this.labMoneyCount.string = Modules_1.Home.DataPlayer.FortuneGold + '';
    };
    NewClass.prototype.startMatch = function () {
        var _this = this;
        var dataPoint = new ProtoSectionPlayer_1.PlayerClickC2S();
        dataPoint.point = 1;
        NetUtil_1.default.SendMsg(dataPoint);
        Modules_1.Home.OpenHomeFrom = Defines_1.OpenHomeFrom.UI_PLAY;
        Modules_1.Home.DataPlayer.IsMatching = true;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIMatch', function () {
            _this.nodConfirm.active = false;
            HomeManager_1.default.INSTANCE.makeMatchRequest(_this.choiceRoomType);
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    // 加载获取金币窗口
    NewClass.prototype.loadUIGetCoin = function () {
        UIFunc_1.UIFunc.openUI('UIGetCoin', function (node) {
            node.getComponent('UIGetCoin').setType(1);
        });
    };
    // 扣去金币提示窗口
    NewClass.prototype.showConfirm = function (type) {
        var spriteFrame;
        switch (type) {
            case 1:
                if (Modules_1.Home.DataPlayer.FortuneGold < 100) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom1;
                break;
            case 2:
                if (Modules_1.Home.DataPlayer.FortuneGold < 500) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom2;
                break;
            case 3:
                if (Modules_1.Home.DataPlayer.FortuneGold < 1000) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom3;
                break;
            case 4:
                if (Modules_1.Home.DataPlayer.FortuneGold < 3000) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom4;
                break;
            case 5:
                if (Modules_1.Home.DataPlayer.FortuneGold < 5000) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom5;
                break;
        }
        this.nodConfirm.active = true;
        this.choiceRoomType = type;
        this.sprRoomName.spriteFrame = spriteFrame;
    };
    NewClass.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag === Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE) {
            this.updateMmoney();
        }
    };
    NewClass.prototype.btnListener = function (event) {
        var target = event.target;
        target.scale = 1;
        switch (target.name) {
            case 'btnBack':
                UIFunc_1.UIFunc.closeUI('UIChoosePvp', function () { });
                break;
            case 'room1':
                this.showConfirm(1);
                break;
            case 'room2':
                this.showConfirm(2);
                break;
            case 'room3':
                GamePersist_1.default.INSTANCE.toast('暂未开放，敬请期待');
                // this.showConfirm(3);
                break;
            case 'room4':
                GamePersist_1.default.INSTANCE.toast('暂未开放，敬请期待');
                // this.showConfirm(4);
                break;
            case 'room5':
                GamePersist_1.default.INSTANCE.toast('暂未开放，敬请期待');
                // this.showConfirm(5);
                break;
            case 'btnYes':
                this.startMatch();
                break;
            case 'btnNo':
                this.nodConfirm.active = false;
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "nodConfirm", void 0);
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "nodRooms", void 0);
    __decorate([
        property(cc.Sprite)
    ], NewClass.prototype, "sprRoomName", void 0);
    __decorate([
        property(cc.Label)
    ], NewClass.prototype, "labMoneyCount", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "spfRoom1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "spfRoom2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "spfRoom3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "spfRoom4", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], NewClass.prototype, "spfRoom5", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();