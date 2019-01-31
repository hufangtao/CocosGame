"use strict";
cc._RF.push(module, 'e1352cPnltJI4HJ+ljaYigQ', 'Obstacle');
// scripts/app/component/game/pve/prefab/Obstacle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var BaseTile_1 = require("./BaseTile");
var Modules_1 = require("../../../../module/Modules");
var StateMgr_1 = require("../StateMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Obstacle = /** @class */ (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        _this.spine_dog = null;
        _this.nodStars = null;
        _this.isAction = false;
        return _this;
    }
    Obstacle.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._tileType = PlayDefine_1.TILE_TYPE.PET;
        this.spine.animation = null;
        this.node.on('touchstart', this.onTouch, this);
        this.spine.setCompleteListener(function (trackEntry) {
            _this.spine.animation = null;
        });
        this.randomPlayAni();
    };
    Obstacle.prototype.onTouch = function (event) {
        this.spine.setAnimation(0, 'animation', false);
    };
    Obstacle.prototype.init = function () {
        this.node.stopAllActions();
        this.isAction = false;
        this.node.active = true;
        this.node.scale = 1;
        this.spine.node.active = true;
        this.spine.node.scale = 1;
        this.nodStars.active = false;
    };
    Obstacle.prototype.setContentSize = function (width, height) {
        this.node.setContentSize(width, height);
    };
    Obstacle.prototype.setArrPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    Obstacle.prototype.setSpfByType = function (type) {
        this.init();
        switch (type) {
            case PlayDefine_1.PET_TYPE.TYPE_1:
                this.spine.setSkin('mao');
                break;
            case PlayDefine_1.PET_TYPE.TYPE_2:
                this.spine.setSkin('tuzi');
                break;
            case PlayDefine_1.PET_TYPE.TYPE_3:
                this.spine.setSkin('xiong');
                break;
            case PlayDefine_1.PET_TYPE.TYPE_4:
                this.spine.setSkin('zhu');
                break;
        }
        this.spine.setToSetupPose();
    };
    Obstacle.prototype.newTile = function (x, y, isMoveTo) {
        if (isMoveTo === void 0) { isMoveTo = true; }
        this.setArrPosition(x, y);
        if (isMoveTo) {
            this.moveTo(x, y, null);
        }
    };
    // 轨道
    Obstacle.prototype.transportTo = function (x, y, cb) {
        this.moveTo(x, y, cb, false);
    };
    // 传送门
    Obstacle.prototype.gateTo = function (x, y, cb) {
        var _this = this;
        this.x = x;
        this.y = y;
        var action = cc.sequence(cc.moveTo(0.05, cc.v2(this.node.x, this.node.y - this.node.height)), cc.callFunc(function () {
            _this._game.tiles[x][y].setArrPosition(x, y + 1);
            _this.moveTo(x, y, cb);
            _this._canTouch = true;
            cb && cb();
        }));
        this._canTouch = false;
        this.node.stopActionByTag(PlayDefine_1.Action_type.GateTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.GateTo);
    };
    // 移动到特定点
    Obstacle.prototype.moveTo = function (x, y, cb, isDown) {
        if (isDown === void 0) { isDown = true; }
        var self = this;
        this.x = x;
        this.y = y;
        if (this.canRecovery()) {
            this._game.tiles[this.x][this.y] = null;
        }
        if (isDown) {
            var action = cc.sequence(cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - 15)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 5)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                self.getObstacle();
                self.onTouch(null);
                cb && cb();
            }));
        }
        else {
            var action = cc.sequence(cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                self.getObstacle();
                cb && cb();
            }));
        }
        this.node.stopActionByTag(PlayDefine_1.Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.MoveTo);
    };
    Obstacle.prototype.getCollectPosition = function () {
        return Modules_1.Play.DataPve.needRecovery(this.tileType, this.type, this.subType);
    };
    // 方块销毁
    Obstacle.prototype.destroyTile = function (type) {
        var self = this;
        Modules_1.Play.DataPve.pushObstacle(self.node);
    };
    // 可以回收
    Obstacle.prototype.canRecovery = function () {
        if (Modules_1.Play.DataPve.grid[this.x][this.y - 1] && Modules_1.Play.DataPve.grid[this.x][this.y - 1] !== PlayDefine_1.GRID_TYPE.EMPTY) {
            return false;
        }
        if (Modules_1.Play.DataPve.grid[this.x][this.y] === PlayDefine_1.GRID_TYPE.DOWNGATE) {
            return false;
        }
        return true;
    };
    // 检查回收
    Obstacle.prototype.getObstacle = function (needDestroy) {
        if (needDestroy === void 0) { needDestroy = false; }
        if (!this.canRecovery()) {
            return;
        }
        if (needDestroy) {
            this._game.tiles[this.x][this.y] = null;
        }
        // 回收
        this.recoveryObstacle();
        this._game.PlayUI.Audio.collect();
    };
    Obstacle.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.unschedule(this.onTouch);
    };
    Obstacle.prototype.onDisable = function () {
        this.node.stopAllActions();
        _super.prototype.onDisable.call(this);
    };
    // 间隔一段时间播放一次动画
    Obstacle.prototype.randomPlayAni = function () {
        var duration = Math.random() * 20 + 10;
        this.unschedule(this.onTouch);
        this.schedule(this.onTouch, duration);
    };
    Obstacle.prototype.billowAct = function (x, y, cb) {
        this.onTouch(null);
        _super.prototype.billowAct.call(this, x, y, cb);
    };
    Obstacle.prototype.bothSideAct = function (x, cb) {
        this.onTouch(null);
        _super.prototype.bothSideAct.call(this, x, cb);
    };
    Obstacle.prototype.getAction1 = function () {
        var position = this.getCollectPosition();
        position = this._game.panelTile.convertToWorldSpaceAR(position);
        position = this.node.convertToNodeSpaceAR(position);
        var direc = Math.random() > 0.5 ? -1 : 1;
        var des = (Math.random() * 270 + 30) * direc;
        var action = cc.spawn(cc.moveTo(1, position.x, position.y).easing(cc.easeCubicActionIn()), cc.sequence(cc.moveBy(0.7, des, 0), cc.moveBy(0.3, -des, 0).easing(cc.easeCircleActionIn())));
        return action;
    };
    Obstacle.prototype.getAction2 = function () {
        var direc = Math.random() > 0.5 ? -1 : 1;
        var des = (Math.random() * 270 + 30) / 2 * direc;
        var action = cc.spawn(cc.rotateBy(1, 720), cc.sequence(cc.moveBy(0.7, 0, -des), cc.moveBy(0.3, 0, des).easing(cc.easeCircleActionIn())), cc.sequence(cc.scaleTo(0.7, 1.3, 1.3), cc.scaleTo(0.3, 1, 1).easing(cc.easeCircleActionIn())));
        return action;
    };
    Obstacle.prototype.recoveryObstacle = function () {
        var _this = this;
        this._game.moveAllTileDown();
        this.spine.node.active = false;
        this.node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION;
        this.nodStars.active = true;
        for (var i = 0; i < this.nodStars.children.length; ++i) {
            this.nodStars.children[i].stopAllActions();
            this.nodStars.children[i].getChildByName('sprite').stopAllActions();
            this.nodStars.children[i].position = cc.v2(0, 0);
            this.nodStars.children[i].getChildByName('sprite').position = cc.v2(0, 0);
            this.nodStars.children[i].runAction(this.getAction1());
            this.nodStars.children[i].getChildByName('sprite').runAction(this.getAction2());
        }
        StateMgr_1.default.INSTANCE.isCollectOver = false;
        this.game.unschedule(this.game.petScheduleCb);
        this.game.petScheduleCb = function () {
            StateMgr_1.default.INSTANCE.isCollectOver = true;
        };
        this.game.scheduleOnce(this.game.petScheduleCb, 1);
        this.scheduleOnce(function () {
            _this.destroyTile();
            _this.recoveryObjective();
        }, 1.05);
    };
    __decorate([
        property(sp.Skeleton)
    ], Obstacle.prototype, "spine", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], Obstacle.prototype, "spine_dog", void 0);
    __decorate([
        property(cc.Node)
    ], Obstacle.prototype, "nodStars", void 0);
    Obstacle = __decorate([
        ccclass
    ], Obstacle);
    return Obstacle;
}(BaseTile_1.default));
exports.default = Obstacle;

cc._RF.pop();