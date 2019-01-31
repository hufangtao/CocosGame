"use strict";
cc._RF.push(module, '20c9bMvRHVHsq9KLaeT7BKV', 'UITurntable');
// scripts/app/ui/UITurntable.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunc_1 = require("../common/UIFunc");
var ProtoSectionGoods_1 = require("../common/net/proto/mods/ProtoSectionGoods");
var NetUtil_1 = require("../common/net/NetUtil");
var DYNotify_1 = require("../../dyGame/DYNotify");
var Message_1 = require("../common/Message");
var GamePersist_1 = require("../common/persist/GamePersist");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UITurntable = /** @class */ (function (_super) {
    __extends(UITurntable, _super);
    function UITurntable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodTurntable = null;
        _this.btnStart = null;
        _this.nodConfirm = null;
        _this.angle = [-22.5, 22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];
        _this.startTurn = false;
        _this.stopTurn = false;
        _this.speed = 10; // 转盘速度
        _this.stopTime = 60; // 停止时间
        _this.turnTime = 3; // 转动的时间
        return _this;
    }
    UITurntable.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.TURNTABLE_LIST, this.onNotify, this);
        this.startTurn = false;
        this.stopTurn = false;
        this.speed = 10;
        this.nodTurntable.rotation = 0;
        this.btnStart.interactable = true;
        this.canLoadUIGetProp = true;
    };
    UITurntable.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    // 启动转盘
    UITurntable.prototype.startTurntable = function (param) {
        var _this = this;
        this.targetNum = param.id;
        this.btnStart.interactable = false;
        this.startTurn = true;
        this.goodsList = param.goodsList;
        this.startTurn = true;
        this.scheduleOnce(function () {
            _this.stopTurn = true;
        }, this.turnTime);
        return;
        this.nodTurntable.runAction(cc.repeatForever(cc.rotateBy(1, 720)));
        this.scheduleOnce(function () {
            _this.nodTurntable.stopAllActions();
            var endAngle = randomNum(_this.angle[_this.targetNum - 1], _this.angle[_this.targetNum]);
            var rotation = (endAngle - _this.nodTurntable.rotation % 360 + 720) % 360;
            var time = rotation / 720;
            _this.nodTurntable.runAction(cc.sequence(cc.rotateBy(time, rotation), cc.delayTime(1), cc.callFunc(function () {
                _this.showGoods(param.goodsList);
            })));
        }, 3);
    };
    // 展示转盘结果
    UITurntable.prototype.showGoods = function (goodsList) {
        var _this = this;
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc_1.UIFunc.openUI('UIGetProp', function (node) {
            node.getComponent('UIGetProp').moreProp(goodsList, function () {
                _this.canLoadUIGetProp = true;
                UIFunc_1.UIFunc.closeUI('UIGetProp', function () { });
            });
        });
    };
    // 提示消耗金币
    UITurntable.prototype.userTuentable = function () {
        if (true) {
            this.notifyTurnTable();
        }
        else {
            // 确认
            this.nodConfirm.active = true;
        }
    };
    // 发送启动转盘消息
    UITurntable.prototype.notifyTurnTable = function () {
        var turntableRun = new ProtoSectionGoods_1.GoodsTurntableRunC2S();
        NetUtil_1.default.SendMsg(turntableRun);
    };
    UITurntable.prototype.btnListener = function (event) {
        var target = event.target;
        target.scale = 1;
        switch (target.name) {
            case 'btnBack':
                UIFunc_1.UIFunc.closeUI('UITurntable', function () { });
                break;
            case 'btnStart':
                this.userTuentable();
                break;
        }
    };
    UITurntable.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.TURNTABLE_LIST) {
            cc.log(param);
            if (param.goodsList.length == 0) {
                GamePersist_1.default.INSTANCE.toast('今日转盘次数已达上限');
            }
            else {
                self.startTurntable(param);
            }
        }
    };
    UITurntable.prototype.update = function (dt) {
        if (!this.startTurn) {
            return;
        }
        this.nodTurntable.rotation += this.speed;
        if (this.stopTurn) {
            if (!this.endAngle) {
                var endRotation = randomNum(this.angle[this.targetNum - 1], this.angle[this.targetNum]);
                this.endAngle = (endRotation - this.nodTurntable.rotation % 360 + 720) % 360;
                if (this.endAngle < 180) {
                    this.endAngle += 360;
                }
                this.accSpeed = (-this.speed * this.speed) / 2 / this.endAngle;
            }
            this.speed += this.accSpeed;
            if (this.speed <= 0) {
                this.startTurn = false;
                this.stopTurn = false;
                this.speed = 10;
                this.endAngle = null;
                this.showGoods(this.goodsList);
                this.btnStart.interactable = true;
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], UITurntable.prototype, "nodTurntable", void 0);
    __decorate([
        property(cc.Button)
    ], UITurntable.prototype, "btnStart", void 0);
    __decorate([
        property(cc.Node)
    ], UITurntable.prototype, "nodConfirm", void 0);
    UITurntable = __decorate([
        ccclass
    ], UITurntable);
    return UITurntable;
}(cc.Component));
exports.UITurntable = UITurntable;
function randomNum(startNum, endNum) {
    return Math.random() * (endNum - startNum) + startNum;
}

cc._RF.pop();