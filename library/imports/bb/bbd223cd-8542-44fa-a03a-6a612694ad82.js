"use strict";
cc._RF.push(module, 'bbd22PNhUJE+qA6amEmlK2C', 'StateMgr');
// scripts/app/component/game/pve/StateMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var PlayDefine_1 = require("../PlayDefine");
var StateMgr = /** @class */ (function (_super) {
    __extends(StateMgr, _super);
    function StateMgr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(StateMgr, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new StateMgr();
            }
            return this.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    StateMgr.prototype.init = function () {
        this.isGameBegin = false;
        this.isTransportBegin = false;
        this.isGameOver = true; // 已经进入gameover
        this.isStopOperate = false;
        this.isAllDownOver = true;
        this.isBombOver = true;
        this.isCollectOver = true; // 宠物回收完成
        this.isAnimalDownOver = true;
        this.isTransportOver = true;
        this.isBonusActionOver = false;
        this.isBonusOver = false;
        this.haveTransport = false;
    };
    StateMgr.prototype.canTouch = function () {
    };
    StateMgr.prototype.canCompose = function () {
    };
    StateMgr.prototype.canAllDown = function () {
        var canDown = true;
        if (!this.isAllDownOver) {
            canDown = false;
        }
        return canDown;
    };
    StateMgr.prototype.canCollect = function () {
        var canCollect = true;
        if (!this.isBombOver) {
            canCollect = false;
        }
        return canCollect;
    };
    StateMgr.prototype.canTransport = function () {
        var canTransport = true;
        if (!this.isBombOver || !this.isAnimalDownOver || !this.isAllDownOver || this.isTransportBegin || Modules_1.Play.DataPve.canPetDown()) {
            canTransport = false;
        }
        return canTransport;
    };
    /**
     * 是否可操作
     * 当时间和步数结束或者目标达成，禁止操作
     */
    StateMgr.prototype.canOperate = function () {
        if (Modules_1.Play.GameModel == PlayDefine_1.GAME_MODEL.PVP) {
            return true;
        }
        var canOperate = true;
        if (Modules_1.Play.DataPve.levelData.grid.transport.length > 0) {
            if (!this.isBombOver || !this.isAnimalDownOver || !this.isCollectOver
                || !this.isTransportOver || !this.isAllDownOver) {
                canOperate = false;
            }
        }
        else {
            if (this.isStopOperate) {
                canOperate = false;
            }
        }
        return canOperate;
    };
    /**
     * 可以进入游戏结束状态
     *
     * 前提是1.水果消除结束，2.水果合成结束，3.水果收集结束，4.技能释放完成，5.宠物收集完成，6.传送带结束，7.下落结束
     *
     *
     */
    StateMgr.prototype.canGameOver = function () {
        var canGameOver = true;
        // 动画是否播放完成
        if (!this.isBombOver || !this.isCollectOver || !this.isAllDownOver || !this.isTransportOver
            || !this.isGameOver) {
            canGameOver = false;
        }
        // 步数或时间为0
        // 目标完成
        // 播放完成，时间未结束，目标未完成
        if (canGameOver && !this.isStopOperate && !Modules_1.Play.DataPve.checkWin()) {
            canGameOver = false;
        }
        // console.log('==================================================');
        // console.log(this.isBombOver);
        // console.log(this.isCollectOver);
        // console.log(this.isAllDownOver);
        return canGameOver;
    };
    StateMgr.prototype.canBonus = function () {
        var canBonus = true;
        if (!this.isBonusActionOver || this.isBonusOver || this.isTimeLevel) {
            canBonus = false;
        }
        return canBonus;
    };
    return StateMgr;
}(cc.Component));
exports.default = StateMgr;

cc._RF.pop();