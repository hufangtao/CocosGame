"use strict";
cc._RF.push(module, '12abcTaOWtE2bPSV1mvweux', 'BombPvp');
// scripts/app/component/game/pvp/prefab/BombPvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var StateMgr_1 = require("../../pve/StateMgr");
var Modules_1 = require("../../../../module/Modules");
var BaseTile_1 = require("../../pve/prefab/BaseTile");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BombPvp = /** @class */ (function (_super) {
    __extends(BombPvp, _super);
    function BombPvp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprHandle = null;
        _this.sprDot = null;
        _this.sprTile = null;
        _this.sprTileZZJ = null;
        _this.sprBg = null;
        _this.spf_bomb_row = null;
        _this.spf_bomb_column = null;
        _this.spf_bomb_row_strong = null;
        _this.spf_bomb_column_strong = null;
        _this.spf_bomb_column_light = null;
        _this.spf_bomb_around = null;
        _this.spf_bomb_around_light = null;
        _this.spf_bomb_red = null;
        _this.spf_bomb_red_handle = null;
        _this.spf_bomb_red_dot = null;
        _this.spf_bomb_green = null;
        _this.spf_bomb_green_handle = null;
        _this.spf_bomb_green_dot = null;
        _this.spf_bomb_blue = null;
        _this.spf_bomb_blue_handle = null;
        _this.spf_bomb_blue_dot = null;
        _this.spf_bomb_yellow = null;
        _this.spf_bomb_yellow_handle = null;
        _this.spf_bomb_yellow_dot = null;
        _this.spf_bomb_purple = null;
        _this.spf_bomb_purple_handle = null;
        _this.spf_bomb_purple_dot = null;
        _this.spf_bomb_colors = null;
        _this.isAction = false;
        _this._isAlive = true;
        _this.anim = null;
        return _this;
    }
    BombPvp.prototype.onLoad = function () {
        this._tileType = PlayDefine_1.TILE_TYPE.BOMB;
    };
    BombPvp.prototype.onEnable = function () {
        this.node.on('touchstart', this.onTouchStart, this);
    };
    BombPvp.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        this.node.off('touchstart', this.onTouchStart, this);
    };
    BombPvp.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    Object.defineProperty(BombPvp.prototype, "isAlive", {
        get: function () {
            return this._isAlive;
        },
        set: function (value) {
            this._isAlive = value;
        },
        enumerable: true,
        configurable: true
    });
    BombPvp.prototype.setContentSize = function (width, height) {
        // this.sprTile.node.setContentSize(width, height);
        this.node.setContentSize(width, height);
    };
    BombPvp.prototype.init = function () {
        _super.prototype.init.call(this);
        this.isDestroying = false;
        this.isAction = false;
        this.sprTile.node.scale = 1;
        this.nodContent.setPosition(0, 0);
        this.node.stopAllActions();
        this.node.rotation = 0;
        this.nodContent.stopAllActions();
        this.getComponent(cc.Animation).stop();
        this.sprTile.node.active = true;
        this.sprTileZZJ.node.active = true;
        this.sprTileZZJ.node.rotation = 0;
        this.nodContent.getChildByName('bombArea1').active = false;
        this.nodContent.getChildByName('bombArea2').active = false;
        this.nodContent.getChildByName('bombzzj1').active = false;
        this.nodContent.getChildByName('lajiao1').active = false;
        this.nodContent.getChildByName('lajiao2').active = false;
        this.nodContent.getChildByName('bombzzj2').active = false;
        this.nodContent.getChildByName('sprite').active = false;
        this.nodContent.getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = null;
    };
    BombPvp.prototype.setArrPosition = function (x, y) {
        this._canTouch = true;
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    BombPvp.prototype.setSpfByType = function (type) {
        var self = this;
        this.sprBg.node.active = false;
        this.getComponent(cc.Animation).stop('aniZhazhijiBg');
        switch (type) {
            case PlayDefine_1.BOMB_TYPE.BOMB_ROW:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_row;
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMN:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_column;
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_row_strong;
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_column_strong;
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_AROUND:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_around;
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR:
                this.showWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_colors;
                break;
        }
    };
    BombPvp.prototype.hideWindmill = function () {
        this.sprHandle.node.active = false;
        this.sprDot.node.active = false;
    };
    BombPvp.prototype.showWindmill = function () {
        this.sprHandle.node.active = true;
        this.sprDot.node.active = true;
    };
    BombPvp.prototype.genBombAnimation = function () {
        var self = this;
        this.sprBg.node.active = true;
        var anim = this.getComponent(cc.Animation);
        anim.genBombEnd = function () {
            self.sprBg.node.scale = 1;
            self.sprBg.node.active = false;
            if (self._type == PlayDefine_1.BOMB_TYPE.BOMB_AROUND) {
                anim.play('aniAreaNormal');
                // console.log('aniAreaNormal');
            }
            else if (self._type == PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                // anim.play('lajiao-normal');
            }
            else if (self._type == PlayDefine_1.BOMB_TYPE.BOMB_ROW) {
                // anim.play('lajiao-normal');
            }
        };
        switch (this._type) {
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMN:
                anim.play('aniGenBomb');
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_AROUND:
                anim.play('aniGenBomb');
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR:
                anim.play('aniZhazhijiBg');
                break;
            default:
                anim.play('aniGenBomb');
                break;
        }
    };
    BombPvp.prototype.setSpfBySubType = function (color) {
        if (this._type != PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
            return;
        }
        this.showWindmill();
        switch (color) {
            case PlayDefine_1.BLOCK_COLOR.RED:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_red;
                this.sprHandle.spriteFrame = this.spf_bomb_red_handle;
                this.sprDot.spriteFrame = this.spf_bomb_red_dot;
                this.sprBg.node.color = new cc.Color(255, 60, 68);
                break;
            case PlayDefine_1.BLOCK_COLOR.GREEN:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_green;
                this.sprHandle.spriteFrame = this.spf_bomb_green_handle;
                this.sprDot.spriteFrame = this.spf_bomb_green_dot;
                this.sprBg.node.color = new cc.Color(60, 212, 78);
                break;
            case PlayDefine_1.BLOCK_COLOR.BLUE:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_blue;
                this.sprHandle.spriteFrame = this.spf_bomb_blue_handle;
                this.sprDot.spriteFrame = this.spf_bomb_blue_dot;
                this.sprBg.node.color = new cc.Color(65, 91, 199);
                break;
            case PlayDefine_1.BLOCK_COLOR.YELLOW:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_yellow;
                this.sprHandle.spriteFrame = this.spf_bomb_yellow_handle;
                this.sprDot.spriteFrame = this.spf_bomb_yellow_dot;
                this.sprBg.node.color = new cc.Color(240, 178, 90);
                break;
            case PlayDefine_1.BLOCK_COLOR.PURPLE:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_purple;
                this.sprHandle.spriteFrame = this.spf_bomb_purple_handle;
                this.sprDot.spriteFrame = this.spf_bomb_purple_dot;
                this.sprBg.node.color = new cc.Color(94, 33, 160);
                break;
            case PlayDefine_1.BLOCK_COLOR.COLORS:
                this.hideWindmill();
                this.sprTileZZJ.spriteFrame = this.spf_bomb_colors;
                break;
        }
    };
    BombPvp.prototype.newTile = function (x, y, minY, isMoveTo) {
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
    BombPvp.prototype.moveTo = function (x, y, cb, minY, isDown) {
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
    BombPvp.prototype.destroyTile = function (cb, Action, isDelete) {
        if (Action === void 0) { Action = true; }
        if (isDelete === void 0) { isDelete = true; }
        var self = this;
        this.isDestroying = true;
        this.isAction = true;
        this.node.stopAllActions();
        this.sprTile.node.stopAllActions();
        this.canTouch = false;
        var anim = this.getComponent(cc.Animation);
        this.sprBg.node.active = false;
        anim.stop('aniAreaNormal');
        this.nodContent.getChildByName('bombArea2').active = false;
        anim.stop('aniZhazhijiBg');
        if (isDelete) {
            // self._game.tiles[self.x][self.y] = null;
        }
        Modules_1.Play.DataPvp.pushBomb(self.node);
    };
    BombPvp.prototype.onTouchStart = function (event) {
        if (!this._game || !this.canTouch || (this._game && !this._game.canTouch) || !StateMgr_1.default.INSTANCE.canOperate() || this.isDestroying) {
            return;
        }
        this.canTouch = false;
        this.recoveryObjective();
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType, true);
    };
    BombPvp.prototype.ignite = function (arr, isAction) {
        if (isAction === void 0) { isAction = true; }
        if (this.isAction) {
            return;
        }
        this.isAction = true;
        this.recoveryObjective();
        if (isAction) {
            this._game.ignite(this.x, this.y, this._type, arr);
        }
        else {
            this._game.tiles[this.x][this.y] = null;
            this.destroyTile(null, null);
        }
    };
    // 改变类型
    BombPvp.prototype.changeType = function () {
        if (this.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
            this.type = PlayDefine_1.BOMB_TYPE.BOMB_ROW;
        }
        else if (this.type === PlayDefine_1.BOMB_TYPE.BOMB_ROW) {
            this.type = PlayDefine_1.BOMB_TYPE.BOMB_COLUMN;
        }
        else if (this.type === PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG) {
            this.type = PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG;
        }
        else if (this.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG) {
            this.type = PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG;
        }
    };
    __decorate([
        property(cc.Sprite)
    ], BombPvp.prototype, "sprHandle", void 0);
    __decorate([
        property(cc.Sprite)
    ], BombPvp.prototype, "sprDot", void 0);
    __decorate([
        property(cc.Sprite)
    ], BombPvp.prototype, "sprTile", void 0);
    __decorate([
        property(cc.Sprite)
    ], BombPvp.prototype, "sprTileZZJ", void 0);
    __decorate([
        property(cc.Sprite)
    ], BombPvp.prototype, "sprBg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_row", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_column", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_row_strong", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_column_strong", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_column_light", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_around", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_around_light", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_red", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_red_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_red_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_green", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_green_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_green_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_blue", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_blue_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_blue_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_yellow", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_yellow_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_yellow_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_purple", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_purple_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_purple_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], BombPvp.prototype, "spf_bomb_colors", void 0);
    BombPvp = __decorate([
        ccclass
    ], BombPvp);
    return BombPvp;
}(BaseTile_1.default));
exports.default = BombPvp;

cc._RF.pop();