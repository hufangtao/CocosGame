"use strict";
cc._RF.push(module, '92fdfiMb05IapIG7TZQirQ0', 'WallPvp');
// scripts/app/component/game/pvp/prefab/WallPvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var BaseTile_1 = require("../../pve/prefab/BaseTile");
var Modules_1 = require("../../../../module/Modules");
var DYAudio_1 = require("../../../../../dyGame/DYAudio");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var WallPvp = /** @class */ (function (_super) {
    __extends(WallPvp, _super);
    function WallPvp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprTile = null;
        _this.sprCircle = null;
        _this.sprCross = null;
        _this.spf_type_1_1 = null;
        _this.spf_type_1_2 = null;
        _this.spf_type_2_1 = null;
        _this.spf_type_2_2 = null;
        _this.audFloerDestroy = null;
        _this._state = null;
        _this.animation = null;
        _this._collectPosition = cc.v2(-155, 855);
        _this._collectPosition2 = cc.v2(284, 855);
        return _this;
    }
    WallPvp.prototype.onLoad = function () {
        this._tileType = PlayDefine_1.TILE_TYPE.WALL;
        this.animation = this.node.getComponent(cc.Animation);
    };
    WallPvp.prototype.start = function () {
    };
    WallPvp.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    WallPvp.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
    };
    WallPvp.prototype.init = function () {
        this.node.active = true;
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprCircle.node.active = false;
        this.sprCross.node.active = false;
    };
    WallPvp.prototype.setContentSize = function (width, height) {
        this.node.setContentSize(width, height);
        this.sprTile.node.setContentSize(width, height);
    };
    WallPvp.prototype.setArrPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    Object.defineProperty(WallPvp.prototype, "type", {
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
    WallPvp.prototype.setState = function (type) {
        switch (type) {
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_1:
                this._state = 2;
                break;
            case PlayDefine_1.TABLEWARE_TYPE.TYPE_2:
                this._state = 2;
                break;
        }
    };
    WallPvp.prototype.setSpfByType = function (type) {
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
    WallPvp.prototype.newTile = function (x, y) {
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 700);
        this.moveTo(x, y);
    };
    // 移动到特定点
    WallPvp.prototype.moveTo = function (x, y, isDown) {
        if (isDown === void 0) { isDown = true; }
        var self = this;
        this.x = x;
        this.y = y;
        this.node.stopActionByTag(1);
        if (isDown) {
            var action = cc.sequence(cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - 15)), cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 5)), cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
            }));
        }
        else {
            var action = cc.moveTo(0.8, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2));
        }
        this.node.runAction(action);
        action.setTag(1);
    };
    WallPvp.prototype.affected = function () {
        this.destroyTile();
    };
    // 方块销毁
    WallPvp.prototype.destroyTile = function (type) {
        var self = this;
        if (type == 2) {
            self._state = 0;
        }
        else {
            self._state--;
        }
        if (self._state > 0) {
            this.playBloomAnim();
        }
        else if (self._state == 0) {
            this.isDestroying = true;
            this.playDestroyAnim();
            this.animation.targetOff('finished');
            this.animation.on('finished', this.onFinished, this);
        }
    };
    WallPvp.prototype.onFinished = function () {
        var self = this;
        self._game.tiles[self.x][self.y] = null;
        var action = cc.sequence(cc.moveBy(0.1, 0, -100), cc.callFunc(function () {
            // self._game.tiles[self.x][self.y] = null;
            setTimeout(function () {
                self._game.moveAllTileDown();
            }, 0);
        }), cc.scaleTo(0.2, 0), cc.callFunc(function () {
            Modules_1.Play.DataPvp.pushWall(self.node);
        }));
        self.node.runAction(action);
    };
    WallPvp.prototype.playBloomAnim = function () {
        this.animation.play('aniWallBloom');
    };
    WallPvp.prototype.playDestroyAnim = function () {
        DYAudio_1.default.playEffect(this.audFloerDestroy, false);
        this.animation.play('aniWallDestroy');
    };
    // 扔花动作
    WallPvp.prototype.getFlower = function (x, y) {
        var _this = this;
        var startPs = this._collectPosition2;
        var endPs = cc.v2(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
        var tan = (endPs.x - startPs.x) / (endPs.y - startPs.y);
        var angle = Math.round(Math.atan(tan) / (Math.PI / 180));
        endPs = this.node.parent.convertToWorldSpaceAR(endPs);
        endPs = this.node.convertToNodeSpaceAR(endPs);
        var sign = Math.random() > 0.5 ? 1 : -1;
        var offset = 100 * sign;
        var action = cc.sequence(cc.spawn(cc.moveTo(1, endPs), cc.sequence(cc.moveBy(0.34, offset, 0).easing(cc.easeIn(0.34)), cc.moveBy(0.66, -offset, 0).easing(cc.easeOut(0.66)))), cc.callFunc(function () {
            _this.nodContent.rotation = 0;
            _this.sprTile.node.rotation = 0;
            _this.nodContent.position = cc.v2(0, 0);
            Modules_1.Play.DataPvp.pushWall(_this.node);
        }));
        this.nodContent.rotation = angle;
        this.sprTile.node.rotation = -angle;
        this.nodContent.runAction(action);
    };
    __decorate([
        property(cc.Sprite)
    ], WallPvp.prototype, "sprTile", void 0);
    __decorate([
        property(cc.Sprite)
    ], WallPvp.prototype, "sprCircle", void 0);
    __decorate([
        property(cc.Sprite)
    ], WallPvp.prototype, "sprCross", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], WallPvp.prototype, "spf_type_1_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], WallPvp.prototype, "spf_type_1_2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], WallPvp.prototype, "spf_type_2_1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], WallPvp.prototype, "spf_type_2_2", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], WallPvp.prototype, "audFloerDestroy", void 0);
    WallPvp = __decorate([
        ccclass
    ], WallPvp);
    return WallPvp;
}(BaseTile_1.default));
exports.default = WallPvp;

cc._RF.pop();