(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pve/prefab/BaseTile.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9bbc7OVUlhJPIotPP7mlXUe', 'BaseTile', __filename);
// scripts/app/component/game/pve/prefab/BaseTile.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var Modules_1 = require("../../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseTile = /** @class */ (function (_super) {
    __extends(BaseTile, _super);
    function BaseTile() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodContent = null;
        _this._isDestroying = false;
        _this._isMoving = false;
        _this._tileType = null;
        _this._type = null;
        _this._subType = null;
        _this.force = null;
        _this.distance1 = 50;
        _this.distance2 = 15;
        _this.distance3 = 30;
        _this.distance4 = 10;
        _this._canTouch = false;
        return _this;
    }
    Object.defineProperty(BaseTile.prototype, "game", {
        get: function () {
            return this._game;
        },
        set: function (value) {
            this._game = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTile.prototype, "canTouch", {
        get: function () {
            return this._canTouch;
        },
        set: function (value) {
            this._canTouch = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTile.prototype, "tileType", {
        get: function () {
            return this._tileType;
        },
        set: function (value) {
            this.setSpfByTileType(value);
            this._tileType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTile.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.setSpfByType(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTile.prototype, "subType", {
        get: function () {
            return this._subType;
        },
        set: function (value) {
            this.setSpfBySubType(value);
            this._subType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseTile.prototype, "isDestroying", {
        get: function () {
            return this._isDestroying;
        },
        set: function (value) {
            this._isDestroying = value;
        },
        enumerable: true,
        configurable: true
    });
    BaseTile.prototype.onLoad = function () {
    };
    BaseTile.prototype.onDestroy = function () {
    };
    BaseTile.prototype.onDisable = function () {
        this.actionCallBack = null;
        cc.director.getScheduler().unscheduleAllForTarget(this);
        this.node.targetOff(this.node);
    };
    BaseTile.prototype.onEnable = function () {
    };
    BaseTile.prototype.setSpfByTileType = function (type) {
    };
    BaseTile.prototype.setSpfByType = function (type) {
    };
    BaseTile.prototype.setSpfBySubType = function (type) {
    };
    // 正确的位置
    BaseTile.prototype.getArrPosition = function () {
        return cc.v2(this.node.width * (this.x - 4) + this.node.width / 2, this.node.height * this.y + this.node.height / 2);
    };
    BaseTile.prototype.newTile = function (x, y, isMoveTo) {
        if (isMoveTo === void 0) { isMoveTo = true; }
    };
    // 收获目标
    BaseTile.prototype.recoveryObjective = function (isTouch) {
        if (Modules_1.Play.GameModel === PlayDefine_1.GAME_MODEL.PVE) {
            Modules_1.Play.DataPve.getObjective(this.tileType, this.type, this.subType, isTouch);
            this._game.gameOver();
        }
    };
    BaseTile.prototype.init = function () {
        this.actionCallBack = null;
        this._canTouch = true;
    };
    // 圆形波浪动作，炸弹
    BaseTile.prototype.billowAct = function (x, y, cb) {
        var self = this;
        this.force = this.getForce(x, y);
        if (!this.force) {
            return;
        }
        self._canTouch = false;
        this.node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
        var instance1 = cc.v2(this.x - x, this.y - y).mag();
        if (instance1 < 2) {
            this.isDestroying = true;
            var action = cc.sequence(cc.moveBy(0.1, self.force.x * self.distance1 * 2, self.force.y * self.distance1 * 2).easing(cc.easeOut(2)), cc.moveTo(0.2, 0, 0), cc.spawn(cc.moveBy(0.2, self.force.x * self.distance2 * 2, self.force.y * self.distance2 * 2), cc.callFunc(function () {
                // self.actionCallBack && self.actionCallBack();
                // self.actionCallBack = null;
            })), 
            // cc.moveBy(0.2, this.force.x * this.distance2, -speedX * this.distance2),
            cc.moveTo(0.2, 0, 0), cc.delayTime(1), cc.callFunc((function () {
                self.node.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
                self.node.scale = 1;
                self._canTouch = true;
            })));
            self.nodContent.stopActionByTag(PlayDefine_1.Action_type.Shake);
            self.nodContent.runAction(action);
            action.setTag(PlayDefine_1.Action_type.Shake);
            if (!self.actionCallBack) {
                self.actionCallBack = cb;
                self.scheduleOnce(function () {
                    self.actionCallBack && self.actionCallBack();
                }, 0.3);
            }
        }
        else {
            var action = cc.sequence(cc.moveBy(0.1, this.force.x * this.distance1, this.force.y * this.distance1).easing(cc.easeOut(2)), cc.moveTo(0.2, 0, 0), cc.spawn(cc.moveBy(0.2, self.force.x * self.distance2 * 2, self.force.y * self.distance2 * 2), cc.callFunc(function () {
                // self.actionCallBack && self.actionCallBack();
                // self.actionCallBack = null;
            })), cc.moveTo(0.2, 0, 0), cc.callFunc((function () {
                self.node.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
                self._canTouch = true;
            })));
            self.nodContent.stopActionByTag(PlayDefine_1.Action_type.Shake);
            self.nodContent.runAction(action);
            action.setTag(PlayDefine_1.Action_type.Shake);
        }
    };
    BaseTile.prototype.getForce = function (x, y) {
        var force = cc.v2(this.x, this.y).sub(cc.v2(x, y));
        var arrPosition = this.getArrPosition();
        var curPosition = this.node.position;
        var length = arrPosition.sub(curPosition).mag();
        var normalize = force.normalize();
        // if (length >= this.distance1 * normalize.mag()) {
        //     return null
        // }
        return normalize;
    };
    // 两侧抖动动作，辣椒
    BaseTile.prototype.bothSideAct = function (x, cb) {
        var _this = this;
        this.force = this.getForce(x, this.y);
        if (!this.force) {
            return;
        }
        this._canTouch = false;
        this.node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
        var action = cc.sequence(cc.moveBy(0.1, this.force.x * this.distance3, 0).easing(cc.easeOut(2)), cc.moveTo(0.2, 0, 0), cc.moveBy(0.2, this.force.x * this.distance4, 0), cc.moveTo(0.2, 0, 0), cc.callFunc((function () {
            _this.node.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
            _this._canTouch = true;
        })));
        this.nodContent.stopActionByTag(PlayDefine_1.Action_type.Shake);
        this.nodContent.runAction(action);
        action.setTag(PlayDefine_1.Action_type.Shake);
    };
    __decorate([
        property(cc.Node)
    ], BaseTile.prototype, "nodContent", void 0);
    BaseTile = __decorate([
        ccclass
    ], BaseTile);
    return BaseTile;
}(cc.Component));
exports.default = BaseTile;

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
        //# sourceMappingURL=BaseTile.js.map
        