"use strict";
cc._RF.push(module, '6f620QSE4BDYbjDdUE8ybjA', 'Wall');
// scripts/app/component/game/pve/prefab/Wall.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var BaseTile_1 = require("./BaseTile");
var StateMgr_1 = require("../StateMgr");
var Modules_1 = require("../../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Wall = /** @class */ (function (_super) {
    __extends(Wall, _super);
    function Wall() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprTile = null;
        _this.sprCircle = null;
        _this.sprCross = null;
        _this.spf_type_1_1 = null;
        _this.spf_type_1_2 = null;
        _this.spf_type_2_1 = null;
        _this.spf_type_2_2 = null;
        _this._state = null;
        _this._collectPosition = cc.v2(-133, 915.2);
        _this.animation = null;
        return _this;
    }
    Wall.prototype.onLoad = function () {
        this._tileType = PlayDefine_1.TILE_TYPE.WALL;
        this.animation = this.node.getComponent(cc.Animation);
    };
    Wall.prototype.start = function () {
    };
    Wall.prototype.onDestroy = function () {
        this.node.stopAllActions();
        _super.prototype.onDestroy.call(this);
    };
    Wall.prototype.onDisable = function () {
        this.node.stopAllActions();
        _super.prototype.onDisable.call(this);
    };
    Wall.prototype.init = function () {
        this.node.active = true;
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprCircle.node.active = false;
        this.sprCross.node.active = false;
    };
    Wall.prototype.setContentSize = function (width, height) {
        this.node.setContentSize(width, height);
        this.sprTile.node.setContentSize(width, height);
    };
    Wall.prototype.setArrPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    Object.defineProperty(Wall.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.setState(value);
            this.setSpfByType(value);
        },
        enumerable: true,
        configurable: true
    });
    Wall.prototype.setState = function (type) {
        switch (type) {
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_1:
                this._state = 2;
                break;
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_2:
                this._state = 2;
                break;
        }
    };
    Wall.prototype.setSpfByType = function (type) {
        switch (type) {
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_1:
                switch (this._state) {
                    case 2:
                        this.sprTile.spriteFrame = this.spf_type_1_1;
                        break;
                    case 1:
                        this.sprTile.spriteFrame = this.spf_type_1_2;
                        break;
                }
                break;
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_2:
                switch (this._state) {
                    case 2:
                        this.sprTile.spriteFrame = this.spf_type_2_1;
                        break;
                    case 1:
                        this.sprTile.spriteFrame = this.spf_type_2_2;
                        break;
                }
                break;
        }
    };
    Wall.prototype.newTile = function (x, y) {
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 700);
        this.moveTo(x, y);
    };
    // 移动到特定点
    Wall.prototype.moveTo = function (x, y, isDown) {
        if (isDown === void 0) { isDown = true; }
        var self = this;
        this.x = x;
        this.y = y;
        if (isDown) {
            var action = cc.sequence(cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - 15)), cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 5)), cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
            }));
        }
        else {
            var action = cc.moveTo(0.8, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2));
        }
        this.node.stopActionByTag(PlayDefine_1.Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.MoveTo);
    };
    Wall.prototype.affected = function () {
        this.destroyTile();
    };
    // 方块销毁
    Wall.prototype.destroyTile = function (type) {
        var _this = this;
        var self = this;
        self._state--;
        this._game.PlayUI.Audio.destroyFlower();
        if (self._state > 0) {
            this.playBloomAnim();
        }
        else {
            self._game.tiles[self.x][self.y] = null;
            this.isDestroying = true;
            this.playDestroyAnim();
            var position = Modules_1.Play.DataPve.needRecovery(this.tileType, this.type, this.subType);
            this.animation.on('finished', function () {
                _this.unschedule(_this.game.wallScheduleCb);
                StateMgr_1.default.INSTANCE.isCollectOver = false;
                _this.game.wallScheduleCb = function () {
                    StateMgr_1.default.INSTANCE.isCollectOver = true;
                };
                _this.scheduleOnce(_this.game.wallScheduleCb, 0.6);
                _this.scheduleOnce(function () {
                    self.recoveryObjective();
                }, 0.6);
                var action = cc.sequence(cc.moveBy(0.1, 0, -100), cc.callFunc(function () {
                    setTimeout(function () {
                        self._game.moveAllTileDown();
                    }, 0);
                }), cc.moveTo(0.3, position.x, position.y), cc.scaleTo(0.2, 0));
                self.node.runAction(action);
            });
        }
    };
    Wall.prototype.playBloomAnim = function () {
        this.animation.play('aniWallBloom');
    };
    Wall.prototype.playDestroyAnim = function () {
        this.animation.play('aniWallDestroy');
    };
    __decorate([
        property(cc.Sprite)
    ], Wall.prototype, "sprTile", void 0);
    __decorate([
        property(cc.Sprite)
    ], Wall.prototype, "sprCircle", void 0);
    __decorate([
        property(cc.Sprite)
    ], Wall.prototype, "sprCross", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Wall.prototype, "spf_type_1_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Wall.prototype, "spf_type_1_2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Wall.prototype, "spf_type_2_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Wall.prototype, "spf_type_2_2", void 0);
    Wall = __decorate([
        ccclass
    ], Wall);
    return Wall;
}(BaseTile_1.default));
exports.default = Wall;

cc._RF.pop();