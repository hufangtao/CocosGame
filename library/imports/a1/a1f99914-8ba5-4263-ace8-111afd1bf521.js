"use strict";
cc._RF.push(module, 'a1f99kUi6VCY6zoERr9G/Uh', 'Bottom');
// scripts/app/component/game/pvp/Bottom.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var NetUtil_1 = require("../../../common/net/NetUtil");
var RoomDefine_1 = require("../../page/home/RoomDefine");
var Message_1 = require("../../../common/Message");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bottom = /** @class */ (function (_super) {
    __extends(Bottom, _super);
    function Bottom() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodBuffSlot = null;
        _this.labTip = null;
        _this.canTouchSlot = [];
        _this.propOwnState = [];
        _this.propUseState = [];
        return _this;
    }
    Bottom.prototype.onLoad = function () {
        Modules_1.Play.DataPvp.bottom = this;
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE, this.onNotify, this);
    };
    Bottom.prototype.onDestroy = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    Bottom.prototype.init = function (game) {
        this.layerGame = game;
    };
    Bottom.prototype.initCanTouchSlot = function () {
        this.propOwnState = [false, false, false, false];
        this.propUseState = [false, false, false, false];
        for (var i = 0; i < this.nodBuffSlot.childrenCount; ++i) {
            this.canTouchSlot[i] = true;
        }
        this.initPropOwnState();
        this.updateBuff();
    };
    // 初始化道具拥有状态
    Bottom.prototype.initPropOwnState = function () {
        for (var i = 0; i < this.nodBuffSlot.children.length; ++i) {
            var num = 0;
            for (var j = 0; j < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++j) {
                if (Modules_1.Home.DataPlayer.PlayerGoodsData[j].goodsId === i + 1) {
                    num = Modules_1.Home.DataPlayer.PlayerGoodsData[j].goodsNum;
                }
            }
            if (num > 0) {
                this.propOwnState[i] = true;
            }
        }
    };
    // 更新道具使用状态
    Bottom.prototype.updatePropUseState = function (index) {
        this.propUseState[index] = true;
    };
    // 更新buff视图
    Bottom.prototype.updateBuff = function () {
        for (var i = 0; i < this.nodBuffSlot.children.length; ++i) {
            if (this.layerGame.pvpTeach) {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
                continue;
            }
            if (!this.propOwnState[i]) {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                this.nodBuffSlot.children[i].scale = 1;
                this.nodBuffSlot.children[i].getComponent(cc.Button).transition = cc.Button.Transition.NONE;
            }
            else if (this.propUseState[i]) {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                this.nodBuffSlot.children[i].scale = 1;
                this.nodBuffSlot.children[i].getComponent(cc.Button).transition = cc.Button.Transition.NONE;
            }
            else {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
                this.nodBuffSlot.children[i].getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
            }
        }
    };
    // 点击道具槽
    Bottom.prototype.clickSlot = function (index) {
        if (!this.propOwnState[index - 1]) {
            this.layerGame.PlayUI.Audio.buffInValid();
            this.layerGame.PlayUI.setToast('你尚未拥有此技能');
            var btnSlot = this.nodBuffSlot.children[index - 1];
            btnSlot.getComponent(cc.Animation).play('PropShake');
            return;
        }
        else if (this.propUseState[index - 1]) {
            this.layerGame.PlayUI.Audio.buffInValid();
            this.layerGame.PlayUI.setToast('该技能本局已使用');
            var btnSlot = this.nodBuffSlot.children[index - 1];
            btnSlot.getComponent(cc.Animation).play('PropShake');
            return;
        }
        else {
        }
        var hadProp = false;
        for (var i = 0; i < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++i) {
            if (Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId === index) {
                hadProp = true;
            }
        }
        if (!hadProp) {
            this.layerGame.PlayUI.Audio.buffInValid();
            return;
        }
        this.sendBuffType(index);
    };
    // 发送buff类型
    Bottom.prototype.sendBuffType = function (index) {
        this.stopAllTipAction();
        var playActiveBuffC2S = new ProtoSectionPlay_1.PlayActiveBuffC2S();
        playActiveBuffC2S.slotId = index;
        NetUtil_1.default.SendMsg(playActiveBuffC2S);
        this.canTouchSlot[index - 1] = false;
        this.updatePropUseState(index - 1);
        // this.propCd(index);
        if (this.layerGame.pvpAi || this.layerGame.pvpTeach) {
            this.layerGame.PlayUI.iUseProp(index);
            this.updateBuff();
        }
    };
    // 道具cd
    Bottom.prototype.propCd = function (index) {
        var _this = this;
        var sprMask = this.nodBuffSlot.children[index - 1].getChildByName('cdMask').getComponent(cc.Sprite);
        var labCd = this.nodBuffSlot.children[index - 1].getChildByName('labCd').getComponent(cc.Label);
        labCd.node.active = true;
        sprMask.node.active = true;
        sprMask.fillRange = 1;
        this.canTouchSlot[index - 1] = false;
        var cd = 5;
        var oneSecede = 1;
        var space = 0.05; // 间隔
        var time = cd; //cd时间
        labCd.string = cd + '';
        var cb = function () {
            sprMask.fillRange -= space / time;
            oneSecede -= space;
            if (oneSecede <= 0) {
                oneSecede = 1;
                cd--;
                labCd.string = cd + '';
            }
        };
        this.schedule(cb, space);
        this.scheduleOnce(function () {
            sprMask.node.active = false;
            labCd.node.active = false;
            _this.canTouchSlot[index - 1] = true;
            _this.unschedule(cb);
        }, time + space);
    };
    // 道具提示
    Bottom.prototype.propTips = function (type) {
        var _this = this;
        switch (type) {
            case 1:
                this.labTip.string = '哇好多宠物，用这个超省事';
                break;
            case 2:
                this.labTip.string = '或许它可以帮你不劳而获，嘿嘿';
                break;
            case 3:
                this.labTip.string = '遮挡ta的视野可以影响ta的发挥哦';
                break;
            case 4:
                this.labTip.string = '打乱ta的棋盘顺序可以影响ta的发挥哦';
                break;
        }
        this.shakeSlotByType(type);
        this.scheduleOnce(function () {
            _this.labTip.string = '';
        }, 4);
    };
    // 停止所有动画
    Bottom.prototype.stopAllTipAction = function () {
        for (var i = 0; i < this.nodBuffSlot.children.length; ++i) {
            var btnSlot = this.nodBuffSlot.children[i];
            btnSlot.getComponent(cc.Animation).stop('PropTip');
            btnSlot.getChildByName('nodProp').rotation = 0;
            btnSlot.getChildByName('guide-hand').active = false;
        }
    };
    // 根据道具类型晃动道具
    Bottom.prototype.shakeSlotByType = function (type) {
        var btnSlot = this.nodBuffSlot.children[type - 1];
        btnSlot.getComponent(cc.Animation).play('PropTip');
        this.scheduleOnce(function () {
            btnSlot.getComponent(cc.Animation).stop('PropTip');
            btnSlot.getChildByName('nodProp').rotation = 0;
            btnSlot.getChildByName('guide-hand').active = false;
        }, 4);
    };
    Bottom.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnSlot1':
                this.clickSlot(1);
                break;
            case 'btnSlot2':
                this.clickSlot(2);
                break;
            case 'btnSlot3':
                this.clickSlot(3);
                break;
            case 'btnSlot4':
                this.clickSlot(4);
                break;
        }
    };
    Bottom.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == RoomDefine_1.BuffUpdate) {
            self.updateBuff();
        }
        else if (tag == Message_1.Message.EVENT_MODULE_PLAYER_PRIZE) {
            self.updateBuff();
        }
    };
    __decorate([
        property(cc.Node)
    ], Bottom.prototype, "nodBuffSlot", void 0);
    __decorate([
        property(cc.Label)
    ], Bottom.prototype, "labTip", void 0);
    Bottom = __decorate([
        ccclass
    ], Bottom);
    return Bottom;
}(cc.Component));
exports.Bottom = Bottom;

cc._RF.pop();