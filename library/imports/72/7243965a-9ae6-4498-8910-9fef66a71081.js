"use strict";
cc._RF.push(module, '72439ZamuZEmIkQn+9mpxCB', 'Tableware');
// scripts/app/component/game/pve/prefab/Tableware.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var BaseTile_1 = require("./BaseTile");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tableware = /** @class */ (function (_super) {
    __extends(Tableware, _super);
    function Tableware() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprTile = null;
        _this.spf_shaozi = null;
        _this.spf_panzi = null;
        _this.spf_panzi_2 = null;
        return _this;
    }
    Tableware.prototype.onLoad = function () {
        this._tileType = PlayDefine_1.TILE_TYPE.TABLEWARE;
        this.node.on('touchstart', this.onTouchStart, this);
    };
    Tableware.prototype.onDestroy = function () {
        this.node.stopAllActions();
        _super.prototype.onDestroy.call(this);
    };
    Tableware.prototype.onDisable = function () {
        this.node.stopAllActions();
        _super.prototype.onDisable.call(this);
    };
    Tableware.prototype.onTouchStart = function () {
        if (this._canTouch) {
            this.node.stopActionByTag(PlayDefine_1.Action_type.NoMatch);
            var action = cc.sequence(cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.15, 1.05, 1.05), cc.scaleTo(0.05, 1, 1), cc.delayTime(1.5));
            this.node.runAction(action);
            action.setTag(PlayDefine_1.Action_type.NoMatch);
        }
    };
    Tableware.prototype.init = function () {
        this.node.active = true;
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
    };
    Tableware.prototype.setContentSize = function (width, height) {
        this.node.setContentSize(width, height);
        this.sprTile.node.setContentSize(width, height);
    };
    Tableware.prototype.setArrPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    Tableware.prototype.setSpfByType = function (type) {
        switch (type) {
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_1:
                this.sprTile.spriteFrame = this.spf_shaozi;
                break;
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_2:
                this.sprTile.spriteFrame = this.spf_panzi;
                break;
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_3:
                this.sprTile.spriteFrame = this.spf_panzi_2;
                break;
        }
    };
    Tableware.prototype.newTile = function (x, y, isMoveTo) {
        if (isMoveTo === void 0) { isMoveTo = true; }
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * (y + 1.5));
        if (isMoveTo) {
            this.moveTo(x, y, null);
        }
    };
    // 轨道
    Tableware.prototype.transportTo = function (x, y, cb) {
        this.moveTo(x, y, cb, false);
    };
    // 传送门
    Tableware.prototype.gateTo = function (x, y, cb) {
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
    Tableware.prototype.moveTo = function (x, y, cb, isDown) {
        if (isDown === void 0) { isDown = true; }
        var self = this;
        this.x = x;
        this.y = y;
        if (isDown) {
            var action = cc.sequence(cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - 15)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 5)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                cb && cb();
            }));
        }
        else {
            var action = cc.sequence(cc.moveTo(0.8, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                cb && cb();
            }));
        }
        this.node.stopActionByTag(PlayDefine_1.Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.MoveTo);
    };
    Tableware.prototype.affected = function () {
        this.destroyTile();
    };
    // 方块销毁
    Tableware.prototype.destroyTile = function (type) {
        this.isDestroying = true;
        var self = this;
        self._game.tiles[self.x][self.y] = null;
        if (this.type === PlayDefine_1.TABLEWARE_TYPE.TYPE_3) {
            this._game.PlayUI.Audio.destroyBug();
        }
        else {
            this._game.PlayUI.Audio.destroyBottle();
        }
        var action = cc.sequence(cc.scaleTo(0.3, 0), cc.callFunc(function () {
            self.recoveryObjective();
            setTimeout(function () {
                self.node.destroy();
            }, 0);
        }));
        this.node.runAction(action);
    };
    __decorate([
        property(cc.Sprite)
    ], Tableware.prototype, "sprTile", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Tableware.prototype, "spf_shaozi", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Tableware.prototype, "spf_panzi", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Tableware.prototype, "spf_panzi_2", void 0);
    Tableware = __decorate([
        ccclass
    ], Tableware);
    return Tableware;
}(BaseTile_1.default));
exports.default = Tableware;

cc._RF.pop();