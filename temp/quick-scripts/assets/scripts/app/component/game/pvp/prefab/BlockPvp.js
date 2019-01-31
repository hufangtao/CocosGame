(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pvp/prefab/BlockPvp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ca395/AjTJPbbZXGRfJTbua', 'BlockPvp', __filename);
// scripts/app/component/game/pvp/prefab/BlockPvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var Modules_1 = require("../../../../module/Modules");
var BaseTile_1 = require("../../pve/prefab/BaseTile");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BlockPvp = /** @class */ (function (_super) {
    __extends(BlockPvp, _super);
    function BlockPvp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spf_red = null;
        _this.spf_green = null;
        _this.spf_blue = null;
        _this.spf_yellow = null;
        _this.spf_purple = null;
        _this.spf_six = null;
        _this.sprTile = null;
        _this.sprEffect = null;
        _this._isAlive = true;
        return _this;
    }
    BlockPvp.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this._tileType = PlayDefine_1.TILE_TYPE.BLOCK;
    };
    BlockPvp.prototype.onEnable = function () {
        this.node.on('touchstart', this.onTouchStart, this);
    };
    BlockPvp.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
    };
    BlockPvp.prototype.start = function () {
    };
    BlockPvp.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    Object.defineProperty(BlockPvp.prototype, "isAlive", {
        get: function () {
            return this._isAlive;
        },
        set: function (value) {
            this._isAlive = value;
        },
        enumerable: true,
        configurable: true
    });
    BlockPvp.prototype.init = function () {
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
    BlockPvp.prototype.setContentSize = function (width, height) {
        this.sprTile.node.active = true;
        this.sprTile.node.setContentSize(width, height);
        this.node.setContentSize(width, height);
    };
    BlockPvp.prototype.setArrPosition = function (x, y) {
        this._canTouch = true;
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    // 方块销毁
    BlockPvp.prototype.destroyTile = function (type) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var self, anim, anim, anim;
            return __generator(this, function (_a) {
                self = this;
                this.isDestroying = true;
                this.recoveryObjective();
                // this._game.playParticle(this.x,this.y);
                if (type === PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES) {
                    // 不播放爆炸动画，不销毁
                    self.node.stopAllActions();
                    Modules_1.Play.DataPvp.pushBlock(self.node);
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.NOACTION_FIRSTDES) {
                    // 不播放动画，销毁tile
                    self._game.tiles[self.x][self.y] = null;
                    self.node.stopAllActions();
                    Modules_1.Play.DataPvp.pushBlock(self.node);
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES) {
                    // 播放动画，先销毁tile
                    self._game.tiles[self.x][self.y] = null;
                    anim = this.node.getComponent(cc.Animation);
                    anim.finished = function () {
                        Modules_1.Play.DataPvp.pushBlock(self.node);
                        _this._game.moveAllTileDown();
                    };
                    anim.play('aniBlock_blue');
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.ACTION_LASTDES) {
                    anim = this.node.getComponent(cc.Animation);
                    anim.finished = function () {
                        self._game.tiles[self.x][self.y] = null;
                        Modules_1.Play.DataPvp.pushBlock(self.node);
                        _this._game.moveAllTileDown();
                    };
                    anim.play('aniBlock_blue');
                }
                else if (type === PlayDefine_1.BLOCKDES_TYPE.ACTION_NODES) {
                    anim = this.node.getComponent(cc.Animation);
                    anim.finished = function () {
                        Modules_1.Play.DataPvp.pushBlock(self.node);
                        _this._game.moveAllTileDown();
                    };
                    anim.play('aniBlock_blue');
                }
                else {
                    self.node.stopAllActions();
                    Modules_1.Play.DataPvp.pushBlock(self.node);
                }
                return [2 /*return*/];
            });
        });
    };
    BlockPvp.prototype.newTile = function (x, y, minY, isMoveTo) {
        if (isMoveTo === void 0) { isMoveTo = true; }
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.node.stopAllActions();
        this.x = x;
        this.y = y;
        if (isMoveTo) {
            this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * (9 - minY + y + 1.5));
            this.moveTo(x, y, null, minY);
        }
        else {
            this.setArrPosition(x, y);
        }
    };
    // 移动到特定点
    BlockPvp.prototype.moveTo = function (x, y, cb, minY, isDown) {
        var _this = this;
        if (isDown === void 0) { isDown = true; }
        var self = this;
        var v = 50;
        var g = 9.8 * 300;
        var d;
        if (minY || minY === 0) {
            d = this.node.height * (9 - minY + 1.5); //200,840
        }
        else {
            d = this.node.height * (this.y - y);
        }
        var t = Math.sqrt((d - v) / g);
        var v1 = (-0.5 * g * t - v) * 1;
        g = g * 3;
        var t1 = -v1 / g;
        var d1 = v1 * t1 + 0.5 * g * t1 * t1; //-d / 15; // -56 -13.3  
        // console.log(d1);
        // console.log(t1);
        var v2 = 0;
        var d2 = -d1;
        var t2 = Math.sqrt((d2 - v2) / g);
        if (isDown) {
            var action = cc.sequence(cc.moveTo(t, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)).easing(cc.easeIn(2)), cc.moveTo(t1, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - d1)).easing(cc.easeIn(2)), cc.moveTo(t2, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)).easing(cc.easeIn(2)), cc.callFunc(function () {
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
        this.x = x;
        this.y = y;
        this._canTouch = false;
        this.node.stopActionByTag(1);
        this.node.runAction(action);
        action.setTag(1);
    };
    BlockPvp.prototype.setSpfByType = function (color) {
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
            case PlayDefine_1.BLOCK_COLOR.SIX:
                this.sprTile.spriteFrame = this.spf_six;
                break;
        }
    };
    BlockPvp.prototype.onTouchStart = function (event) {
        if (!this._game || !this._canTouch || !this._game.canTouch || this.isDestroying) {
            return;
        }
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType);
    };
    __decorate([
        property(cc.SpriteFrame)
    ], BlockPvp.prototype, "spf_red", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BlockPvp.prototype, "spf_green", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BlockPvp.prototype, "spf_blue", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BlockPvp.prototype, "spf_yellow", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BlockPvp.prototype, "spf_purple", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BlockPvp.prototype, "spf_six", void 0);
    __decorate([
        property(cc.Sprite)
    ], BlockPvp.prototype, "sprTile", void 0);
    __decorate([
        property(cc.Sprite)
    ], BlockPvp.prototype, "sprEffect", void 0);
    BlockPvp = __decorate([
        ccclass
    ], BlockPvp);
    return BlockPvp;
}(BaseTile_1.default));
exports.default = BlockPvp;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=BlockPvp.js.map
        