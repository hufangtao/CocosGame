"use strict";
cc._RF.push(module, 'f5e74t9T5BGz66tBJRWY2QP', 'Bomb');
// scripts/app/component/game/pve/prefab/Bomb.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var BaseTile_1 = require("./BaseTile");
var StateMgr_1 = require("../StateMgr");
var Modules_1 = require("../../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bomb = /** @class */ (function (_super) {
    __extends(Bomb, _super);
    function Bomb() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprHandle = null;
        _this.sprDot = null;
        _this.sprTile = null;
        _this.sprTileZZJ = null;
        _this.sprBg = null;
        _this.spf_bomb_row = null;
        _this.spf_bomb_column = null;
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
        // billowAct(x, y, cb) {
        //     this.node.runAction(cc.sequence(
        //         cc.delayTime(0.6),
        //         cc.callFunc(()=>{
        //             cb && cb();
        //         })
        //     ))
        // }
        // bothSideAct(x, cb) {
        //     this.node.runAction(cc.sequence(
        //         cc.delayTime(0.7),
        //         cc.callFunc(()=>{
        //             cb && cb();
        //         })
        //     ))
        // }
    }
    Bomb.prototype.onLoad = function () {
        this._tileType = PlayDefine_1.TILE_TYPE.BOMB;
    };
    Bomb.prototype.onEnable = function () {
        this.node.on('touchstart', this.onTouchStart, this);
    };
    Bomb.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
        this.node.stopAllActions();
        this.node.off('touchstart', this.onTouchStart, this);
    };
    Bomb.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
    };
    Object.defineProperty(Bomb.prototype, "isAlive", {
        get: function () {
            return this._isAlive;
        },
        set: function (value) {
            this._isAlive = value;
        },
        enumerable: true,
        configurable: true
    });
    Bomb.prototype.setContentSize = function (width, height) {
        // this.sprTile.node.setContentSize(width, height);
        this.node.setContentSize(width, height);
    };
    Bomb.prototype.init = function () {
        _super.prototype.init.call(this);
        this.isDestroying = false;
        this.isAction = false;
        this.sprTile.node.scale = 1;
        this.nodContent.setPosition(0, 0);
        this.node.stopAllActions();
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
    Bomb.prototype.setArrPosition = function (x, y) {
        this._canTouch = true;
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    Bomb.prototype.setSpfByType = function (type) {
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
    Bomb.prototype.hideWindmill = function () {
        this._subType = null;
        this.sprHandle.node.active = false;
        this.sprDot.node.active = false;
    };
    Bomb.prototype.showWindmill = function () {
        this.sprHandle.node.active = true;
        this.sprDot.node.active = true;
    };
    Bomb.prototype.genBombAnimation = function () {
        var self = this;
        this.sprBg.node.active = true;
        var anim = this.getComponent(cc.Animation);
        anim['genBombEnd'] = function () {
            self.sprBg.node.scale = 1;
            self.sprBg.node.active = false;
            if (self._type == PlayDefine_1.BOMB_TYPE.BOMB_AROUND) {
                anim.play('aniAreaNormal');
                // console.log('aniAreaNormal');
            }
            else if (self._type == PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
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
        }
    };
    Bomb.prototype.setSpfBySubType = function (color) {
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
    Bomb.prototype.newTile = function (x, y, isMoveTo) {
        if (isMoveTo === void 0) { isMoveTo = true; }
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 700);
        if (isMoveTo) {
            this.moveTo(x, y, null);
        }
    };
    // 轨道
    Bomb.prototype.transportTo = function (x, y, cb) {
        this.moveTo(x, y, cb, false);
    };
    // 传送门
    Bomb.prototype.gateTo = function (x, y, cb) {
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
    Bomb.prototype.moveTo = function (x, y, cb, isDown) {
        var _this = this;
        if (isDown === void 0) { isDown = true; }
        var self = this;
        this.x = x;
        this.y = y;
        this.canTouch = false;
        if (isDown) {
            var action = cc.sequence(cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 - 15)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2 + 5)), cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                _this._canTouch = true;
                cb && cb();
            }));
        }
        else {
            var action = cc.sequence(cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                _this._canTouch = true;
                cb && cb();
            }));
        }
        this.node.stopActionByTag(PlayDefine_1.Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.MoveTo);
    };
    Bomb.prototype.destroyTile = function (type) {
        this.node.stopAllActions();
        this.nodContent.stopAllActions();
        cc.director.getScheduler().unscheduleAllForTarget(this);
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
        self._game.tiles[self.x][self.y] = null;
        switch (this.type) {
            case PlayDefine_1.BOMB_TYPE.BOMB_AROUND:
                self.sprBg.node.active = true;
                self.sprBg.node.color = cc.color(255, 255, 255);
                Modules_1.Play.DataPve.pushBomb(self.node);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMN:
                self.node.rotation = 0;
                self.node.scale = 1;
                self.sprBg.node.scale = 1;
                self.sprBg.node.color = cc.color(255, 255, 255);
                Modules_1.Play.DataPve.pushBomb(self.node);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR:
                self.node.rotation = 0;
                self.node.scale = 1;
                self.sprBg.node.scale = 1;
                self.sprBg.node.rotation = 0;
                self.sprBg.node.color = cc.color(255, 255, 255);
                Modules_1.Play.DataPve.pushBomb(self.node);
                break;
        }
        this.sprTile.spriteFrame = null;
    };
    Bomb.prototype.onTouchStart = function (event) {
        if (!this._game || !this.canTouch || (this._game && !this._game.canTouch) || !StateMgr_1.default.INSTANCE.canOperate() || this.isDestroying) {
            return;
        }
        this.canTouch = false;
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType, true);
        this.recoveryObjective();
    };
    Bomb.prototype.ignite = function (isAction) {
        if (isAction === void 0) { isAction = true; }
        if (this.isAction) {
            return;
        }
        this.isAction = true;
        this.recoveryObjective();
        if (isAction) {
            this._game.ignite(this.x, this.y, this._type);
        }
        else {
            this.destroyTile();
        }
    };
    __decorate([
        property(cc.Sprite)
    ], Bomb.prototype, "sprHandle", void 0);
    __decorate([
        property(cc.Sprite)
    ], Bomb.prototype, "sprDot", void 0);
    __decorate([
        property(cc.Sprite)
    ], Bomb.prototype, "sprTile", void 0);
    __decorate([
        property(cc.Sprite)
    ], Bomb.prototype, "sprTileZZJ", void 0);
    __decorate([
        property(cc.Sprite)
    ], Bomb.prototype, "sprBg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_row", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_column", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_column_light", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_around", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_around_light", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_red", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_red_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_red_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_green", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_green_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_green_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_blue", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_blue_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_blue_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_yellow", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_yellow_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_yellow_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_purple", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_purple_handle", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_purple_dot", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bomb.prototype, "spf_bomb_colors", void 0);
    Bomb = __decorate([
        ccclass
    ], Bomb);
    return Bomb;
}(BaseTile_1.default));
exports.default = Bomb;

cc._RF.pop();