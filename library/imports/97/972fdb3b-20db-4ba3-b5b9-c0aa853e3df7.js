"use strict";
cc._RF.push(module, '972fds7INtLo7W5wKqFPj33', 'Block');
// scripts/app/component/game/pve/prefab/Block.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var BaseTile_1 = require("./BaseTile");
var Modules_1 = require("../../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Block = /** @class */ (function (_super) {
    __extends(Block, _super);
    function Block() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spf_red = null;
        _this.spf_green = null;
        _this.spf_blue = null;
        _this.spf_yellow = null;
        _this.spf_purple = null;
        _this.sprTile = null;
        _this.sprEffect = null;
        _this._isAlive = true;
        return _this;
    }
    Block.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._tileType = PlayDefine_1.TILE_TYPE.BLOCK;
    };
    Block.prototype.onEnable = function () {
        this.node.on('touchstart', this.onTouchStart, this);
    };
    Block.prototype.onDisable = function () {
        this.node.stopAllActions();
        _super.prototype.onDisable.call(this);
        this.node.off('touchstart', this.onTouchStart, this);
    };
    Block.prototype.start = function () {
    };
    Block.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    Object.defineProperty(Block.prototype, "isAlive", {
        get: function () {
            return this._isAlive;
        },
        set: function (value) {
            this._isAlive = value;
        },
        enumerable: true,
        configurable: true
    });
    Block.prototype.init = function () {
        _super.prototype.init.call(this);
        this._canTouch = false;
        this.node.stopAllActions();
        this.nodContent.stopAllActions();
        this.nodContent.setPosition(0, 0);
        this.isDestroying = false;
        this.getComponent(cc.Animation).stop();
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprEffect.node.active = false;
        this.sprEffect.spriteFrame = null;
        this.setContentSize(80, 80);
    };
    Block.prototype.setContentSize = function (width, height) {
        this.sprTile.node.active = true;
        this.sprTile.node.setContentSize(width, height);
        this.node.setContentSize(width, height);
    };
    Block.prototype.setArrPosition = function (x, y) {
        this._canTouch = true;
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    // 轨道
    Block.prototype.transportTo = function (x, y, cb) {
        this.moveTo(x, y, cb, false);
    };
    // 传送门
    Block.prototype.gateTo = function (x, y, cb) {
        var _this = this;
        this.x = x;
        this.y = y;
        var action = cc.sequence(cc.moveTo(0.05, cc.v2(this.node.x, this.node.y - this.node.height)), cc.callFunc(function () {
            if (_this._game.tiles[x][y]) {
                _this._game.tiles[x][y].setArrPosition(x, y + 1);
                _this.moveTo(x, y, cb);
                _this._canTouch = true;
                cb && cb();
            }
        }));
        this._canTouch = false;
        this.node.stopActionByTag(PlayDefine_1.Action_type.GateTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.GateTo);
    };
    // 移动到特定点
    Block.prototype.moveTo = function (x, y, cb, isDown) {
        var _this = this;
        if (isDown === void 0) { isDown = true; }
        var self = this;
        this.x = x;
        this.y = y;
        if (isDown) {
            var action = cc.sequence(cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
            }), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - 15)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 5)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                _this._canTouch = true;
                cb && cb();
            }));
        }
        else {
            var action = cc.sequence(cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                _this._canTouch = true;
                cb && cb();
                // this._game.canTouch = true;
            }));
        }
        this._canTouch = false;
        this.node.stopActionByTag(PlayDefine_1.Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.MoveTo);
    };
    // 方块销毁
    Block.prototype.destroyTile = function (type, isTouch) {
        return __awaiter(this, void 0, void 0, function () {
            var self, anim, anim, anim;
            return __generator(this, function (_a) {
                self = this;
                this.isDestroying = true;
                this.recoveryObjective(isTouch);
                this._game.playParticle(this.x, this.y);
                if (type === PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES) {
                    // 不播放爆炸动画，不销毁
                    self.node.stopAllActions();
                    Modules_1.Play.DataPve.pushBlock(self.node);
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.NOACTION_FIRSTDES) {
                    // 不播放动画，销毁tile
                    self._game.tiles[self.x][self.y] = null;
                    self.node.stopAllActions();
                    Modules_1.Play.DataPve.pushBlock(self.node);
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES) {
                    // 播放动画，先销毁tile
                    self._game.tiles[self.x][self.y] = null;
                    anim = this.node.getComponent(cc.Animation);
                    anim['finished'] = function () {
                        Modules_1.Play.DataPve.pushBlock(self.node);
                    };
                    anim.play('aniBlock_blue');
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.ACTION_LASTDES) {
                    anim = this.node.getComponent(cc.Animation);
                    anim['finished'] = function () {
                        self._game.tiles[self.x][self.y] = null;
                        Modules_1.Play.DataPve.pushBlock(self.node);
                    };
                    anim.play('aniBlock_blue');
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.ACTION_NODES) {
                    anim = this.node.getComponent(cc.Animation);
                    anim['finished'] = function () {
                        Modules_1.Play.DataPve.pushBlock(self.node);
                    };
                    anim.play('aniBlock_blue');
                }
                return [2 /*return*/];
            });
        });
    };
    Block.prototype.newTile = function (x, y, isMoveTo) {
        if (isMoveTo === void 0) { isMoveTo = true; }
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.node.stopAllActions();
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * (y + 1.5));
        this.x = x;
        this.y = y;
        this.moveTo(x, y, null, isMoveTo);
    };
    Block.prototype.setSpfByType = function (color) {
        this.init();
        switch (color) {
            case PlayDefine_1.BLOCK_COLOR.RED:
                this.sprTile.spriteFrame = this.spf_red;
                break;
            case PlayDefine_1.BLOCK_COLOR.GREEN:
                this.sprTile.spriteFrame = this.spf_green;
                break;
            case PlayDefine_1.BLOCK_COLOR.BLUE:
                this.sprTile.spriteFrame = this.spf_blue;
                break;
            case PlayDefine_1.BLOCK_COLOR.YELLOW:
                this.sprTile.spriteFrame = this.spf_yellow;
                break;
            case PlayDefine_1.BLOCK_COLOR.PURPLE:
                this.sprTile.spriteFrame = this.spf_purple;
                break;
        }
    };
    Block.prototype.onTouchStart = function (event) {
        if (!this._game || !this._canTouch || !this._game.canTouch || this.isDestroying) {
            return;
        }
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType);
    };
    Block.prototype.recovery = function (isTouch) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var self, position, action;
            return __generator(this, function (_a) {
                self = this;
                if (this.isDestroying) {
                    return [2 /*return*/];
                }
                this.isDestroying = true;
                self.node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
                position = Modules_1.Play.DataPve.needRecovery(this.tileType, this.type, this.subType);
                if (!position) {
                    self.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES, isTouch);
                    return [2 /*return*/];
                }
                // 回收
                self._game.tiles[self.x][self.y] = null;
                action = cc.sequence(cc.moveBy(0.1, 0, -100), cc.moveTo(0.3, position.x, position.y), cc.scaleTo(0.2, 0), cc.callFunc(function () {
                    _this.recoveryObjective(true);
                    Modules_1.Play.DataPve.pushBlock(self.node);
                }));
                self.node.runAction(action);
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        property(cc.SpriteFrame)
    ], Block.prototype, "spf_red", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Block.prototype, "spf_green", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Block.prototype, "spf_blue", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Block.prototype, "spf_yellow", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Block.prototype, "spf_purple", void 0);
    __decorate([
        property(cc.Sprite)
    ], Block.prototype, "sprTile", void 0);
    __decorate([
        property(cc.Sprite)
    ], Block.prototype, "sprEffect", void 0);
    Block = __decorate([
        ccclass
    ], Block);
    return Block;
}(BaseTile_1.default));
exports.default = Block;

cc._RF.pop();