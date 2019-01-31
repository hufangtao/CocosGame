(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pvp/prefab/ObstaclePvp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd03c5p1De5AH4e7LecIr2Y9', 'ObstaclePvp', __filename);
// scripts/app/component/game/pvp/prefab/ObstaclePvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../../PlayDefine");
var Modules_1 = require("../../../../module/Modules");
var BaseTile_1 = require("../../pve/prefab/BaseTile");
var NetUtil_1 = require("../../../../common/net/NetUtil");
var ProtoSectionPlay_1 = require("../../../../common/net/proto/mods/ProtoSectionPlay");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ObstaclePvp = /** @class */ (function (_super) {
    __extends(ObstaclePvp, _super);
    function ObstaclePvp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spine = null;
        _this.spine_dog = null;
        _this.nodStars = null;
        _this.isAction = false;
        _this._collectPosition = cc.v2(-155, 855);
        _this._collectPosition2 = cc.v2(155, 855);
        return _this;
    }
    ObstaclePvp.prototype.onLoad = function () {
        var _this = this;
        _super.prototype.onLoad.call(this);
        this._tileType = PlayDefine_1.TILE_TYPE.PET;
        this.spine.animation = null;
        this.spine.setCompleteListener(function (trackEntry) {
            _this.spine.animation = null;
        });
    };
    ObstaclePvp.prototype.onEnable = function () {
        this.node.on('touchstart', this.onTouch, this);
    };
    ObstaclePvp.prototype.onTouch = function (event) {
        this.spine.setAnimation(0, 'animation', false);
    };
    ObstaclePvp.prototype.init = function () {
        this.isAction = false;
        this.node.active = true;
        this.node.scale = 1;
        this.spine.node.active = true;
        this.spine.node.scale = 1;
        this.randomPlayAni();
        this.nodStars.active = false;
        for (var i = 0; i < this.nodStars.children.length; ++i) {
            this.nodStars.children[i].stopAllActions();
            this.nodStars.children[i].getChildByName('sprite').stopAllActions();
            this.nodStars.children[i].position = cc.v2(0, 0);
            this.nodStars.children[i].getChildByName('sprite').position = cc.v2(0, 0);
        }
    };
    ObstaclePvp.prototype.setContentSize = function (width, height) {
        this.node.setContentSize(width, height);
    };
    ObstaclePvp.prototype.setArrPosition = function (x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2);
    };
    ObstaclePvp.prototype.setSpfByType = function (type) {
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
    ObstaclePvp.prototype.newTile = function (x, y, minY) {
        this.setArrPosition(x, y);
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2, this.node.height * (9 - minY + y + 1.5));
        this.moveTo(x, y, null, minY);
    };
    // 移动到特定点
    ObstaclePvp.prototype.moveTo = function (x, y, cb, minY, isDown) {
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
                _this.getObstacle();
                cb && cb();
            }));
        }
        else {
            var action = cc.sequence(cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2, this.node.height * y + this.node.height / 2)), cc.callFunc(function () {
                _this._canTouch = true;
                _this.getObstacle();
                cb && cb();
                // this._game.canTouch = true;
            }));
        }
        this.x = x;
        this.y = y;
        if (this.canRecovery()) {
            this._game.tiles[this.x][this.y] = null;
        }
        this.node.stopActionByTag(1);
        this.node.runAction(action);
        action.setTag(1);
    };
    // 方块销毁
    ObstaclePvp.prototype.destroyTile = function () {
        var self = this;
        this._game.sendBoardPetCnt();
        self.nodContent.stopAllActions();
        self.node.stopAllActions();
        cc.director.getScheduler().unscheduleAllForTarget(this);
        Modules_1.Play.DataPvp.pushObstacle(self.node);
    };
    ObstaclePvp.prototype.canRecovery = function () {
        if (this.y <= 0) {
            return true;
        }
        return false;
    };
    // 检查回收
    ObstaclePvp.prototype.getObstacle = function () {
        if (this.canRecovery()) {
            // 回收
            this.recoveryObstacle();
            this._game.PlayUI.Audio.collect();
        }
    };
    ObstaclePvp.prototype.sendMsg = function () {
        var playSaveAnimalC2S = new ProtoSectionPlay_1.PlaySaveAnimalC2S();
        NetUtil_1.default.SendMsg(playSaveAnimalC2S);
    };
    ObstaclePvp.prototype.onDestroy = function () {
        _super.prototype.onDestroy.call(this);
        this.unschedule(this.onTouch);
    };
    ObstaclePvp.prototype.onDisable = function () {
        _super.prototype.onDisable.call(this);
    };
    // 间隔一段时间播放一次动画
    ObstaclePvp.prototype.randomPlayAni = function () {
        var duration = Math.random() * 2 + 1;
        // var duration = 2;
        this.unschedule(this.onTouch);
        this.schedule(this.onTouch, duration);
    };
    ObstaclePvp.prototype.billowAct = function (x, y, cb) {
        this.onTouch(null);
        _super.prototype.billowAct.call(this, x, y, cb);
    };
    ObstaclePvp.prototype.bothSideAct = function (x, cb) {
        this.onTouch(null);
        _super.prototype.bothSideAct.call(this, x, cb);
    };
    ObstaclePvp.prototype.getAction1 = function () {
        var position = this._game.panelTile.convertToWorldSpaceAR(this._collectPosition);
        position = this.node.convertToNodeSpaceAR(position);
        var direc = Math.random() > 0.5 ? -1 : 1;
        var des = (Math.random() * 270 + 30) * direc;
        var action = cc.spawn(cc.moveTo(1, position.x, position.y).easing(cc.easeCubicActionIn()), cc.sequence(cc.moveBy(0.7, des, 0), cc.moveBy(0.3, -des, 0).easing(cc.easeCircleActionIn())));
        return action;
    };
    ObstaclePvp.prototype.getAction2 = function () {
        var direc = Math.random() > 0.5 ? -1 : 1;
        var des = (Math.random() * 270 + 30) / 2 * direc;
        var action = cc.spawn(cc.rotateBy(1, 720), cc.sequence(cc.moveBy(0.7, 0, -des), cc.moveBy(0.3, 0, des).easing(cc.easeCircleActionIn())), cc.sequence(cc.scaleTo(0.7, 1.3, 1.3), cc.scaleTo(0.3, 1, 1).easing(cc.easeCircleActionIn())));
        return action;
    };
    // 抢夺宠物动作
    ObstaclePvp.prototype.runGrabAction = function (count) {
        var _this = this;
        this._game.tiles[this.x][this.y] = null;
        this.scheduleOnce(function () {
            var startPs = _this.node.position;
            var endPs = _this._collectPosition2;
            var tan = (endPs.x - startPs.x) / (endPs.y - startPs.y);
            var angle = Math.round(Math.atan(tan) / (Math.PI / 180));
            endPs = _this._game.panelTile.convertToWorldSpaceAR(endPs);
            endPs = _this.node.convertToNodeSpaceAR(endPs);
            var sign = Math.random() > 0.5 ? 1 : -1;
            var offset = 100 * sign;
            var action = cc.sequence(cc.spawn(cc.moveTo(0.6, endPs), cc.sequence(cc.moveBy(0.2, offset, 0).easing(cc.easeIn(0.2)), cc.moveBy(0.4, -offset, 0).easing(cc.easeOut(0.4)))), cc.callFunc(function () {
                _this.nodContent.rotation = 0;
                _this.spine.node.rotation = 0;
                _this.nodContent.position = cc.v2(0, 0);
                _this.destroyTile();
            }));
            _this.nodContent.rotation = angle;
            _this.spine.node.rotation = -angle;
            _this.nodContent.runAction(action);
            _this._game.moveAllTileDown();
            _this._game.beGrabedObstacle();
        }, count * 0.1);
    };
    ObstaclePvp.prototype.recoveryObstacle = function () {
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
        this.scheduleOnce(function () {
            _this._game.getObstacle();
            _this.sendMsg();
            _this.destroyTile();
        }, 1);
    };
    // 抢夺到宠物
    ObstaclePvp.prototype.grabPet = function () {
        this.getComponent(cc.Animation).play('grabPet');
    };
    __decorate([
        property(sp.Skeleton)
    ], ObstaclePvp.prototype, "spine", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], ObstaclePvp.prototype, "spine_dog", void 0);
    __decorate([
        property(cc.Node)
    ], ObstaclePvp.prototype, "nodStars", void 0);
    ObstaclePvp = __decorate([
        ccclass
    ], ObstaclePvp);
    return ObstaclePvp;
}(BaseTile_1.default));
exports.default = ObstaclePvp;

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
        //# sourceMappingURL=ObstaclePvp.js.map
        