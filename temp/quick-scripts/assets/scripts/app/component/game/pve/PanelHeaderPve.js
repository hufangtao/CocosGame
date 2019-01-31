(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pve/PanelHeaderPve.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '69a1bqXTXZPr4y294hZDBTp', 'PanelHeaderPve', __filename);
// scripts/app/component/game/pve/PanelHeaderPve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../PlayDefine");
var StateMgr_1 = require("./StateMgr");
var Modules_1 = require("../../../module/Modules");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var panelGuidePve_1 = require("./panelGuidePve");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PanelHeaderPve = /** @class */ (function (_super) {
    __extends(PanelHeaderPve, _super);
    function PanelHeaderPve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labCountDown = null;
        _this.labLevel = null;
        _this.labScore = null;
        _this.pfbTableware = null;
        _this.nodObjective = null;
        _this.nodLastTime = null;
        _this.nodLastStep = null;
        _this.nodPanelTile = null;
        _this.panelGuide = null;
        _this.nodGameOver = null;
        _this.nodScoreProgress = null;
        _this.objective = null;
        _this.layerGame = null;
        _this.leaves = 0;
        _this.passedTime = 0;
        _this.remainTime = 10;
        _this._isObjectiveDone = [false, false, false, false, false];
        return _this;
    }
    PanelHeaderPve_1 = PanelHeaderPve;
    Object.defineProperty(PanelHeaderPve, "INSTANCE", {
        get: function () {
            return PanelHeaderPve_1.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    PanelHeaderPve.prototype.onLoad = function () {
        this.PlayUI = cc.find('Canvas').getComponent('PlayUIPve');
        PanelHeaderPve_1.singleInstance = this;
        this.nodLastTime.active = false;
        this.nodLastStep.active = false;
    };
    // 设置目标位置
    PanelHeaderPve.prototype.saveObjectivesPs = function () {
        var index = 0;
        for (var i = 0; i < Modules_1.Play.DataPve.objectives.length; ++i) {
            for (var j = 0; j < Modules_1.Play.DataPve.objectives[i].length; ++j) {
                var sprite = this.nodObjective.children[index].getChildByName('sprite');
                var p_world = sprite.parent.convertToWorldSpaceAR(sprite.getPosition());
                var p_node = this.nodPanelTile.convertToNodeSpaceAR(p_world);
                Modules_1.Play.DataPve.objectives[i][j].position = p_node;
                index++;
            }
        }
    };
    PanelHeaderPve.prototype.gameOver = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.nodGameOver.active = true;
                        var anim = _this.nodGameOver.getComponent(cc.Animation);
                        anim.play('aniBonusTime');
                        anim.on('finished', function () {
                            _this.nodGameOver.active = false;
                            resolve();
                        }, _this);
                    })];
            });
        });
    };
    PanelHeaderPve.prototype.isObjectiveDone = function (tileType, type) {
        for (var i = 0; i < this.objective.length; ++i) {
            if (this.objective[i].tileType == tileType && this.objective[i].type == type) {
                return this._isObjectiveDone[i];
            }
        }
        return true;
    };
    PanelHeaderPve.prototype.updateScore = function (score) {
        this.getScore(score);
    };
    PanelHeaderPve.prototype.getScore = function (score) {
        this.labScore.string = score + '';
        var nodBg = this.nodScoreProgress.getChildByName('nodBg');
        var nodBar = this.nodScoreProgress.getChildByName('nodBar');
        var nodStar = this.nodScoreProgress.getChildByName('nodStar');
        var _score = Modules_1.Play.LevelDatas['level_' + Modules_1.Play.DataPve.curLevel].score;
        nodBar.width = score / _score[3] * nodBg.width;
        var ps_1 = nodBg.convertToWorldSpaceAR(cc.v2(_score[0] / _score[3] * nodBg.width, 0));
        var ps_2 = nodBg.convertToWorldSpaceAR(cc.v2(_score[1] / _score[3] * nodBg.width, 0));
        var ps_3 = nodBg.convertToWorldSpaceAR(cc.v2(_score[2] / _score[3] * nodBg.width, 0));
        nodStar.children[0].x = nodStar.convertToNodeSpaceAR(ps_1).x;
        nodStar.children[1].x = nodStar.convertToNodeSpaceAR(ps_2).x;
        nodStar.children[2].x = nodStar.convertToNodeSpaceAR(ps_3).x;
        nodStar.children[3].x = nodStar.convertToNodeSpaceAR(ps_1).x;
        nodStar.children[4].x = nodStar.convertToNodeSpaceAR(ps_2).x;
        nodStar.children[5].x = nodStar.convertToNodeSpaceAR(ps_3).x;
        if (score >= _score[2]) {
            for (var x = 3; x < 6; ++x) {
                if (!nodStar.children[x].active) {
                    nodStar.children[x].active = true;
                    nodStar.children[x].getComponent(cc.Animation).play('aniSpawnStar');
                }
            }
        }
        else if (score >= _score[1]) {
            for (var x = 3; x < 5; ++x) {
                if (!nodStar.children[x].active) {
                    nodStar.children[x].active = true;
                    nodStar.children[x].getComponent(cc.Animation).play('aniSpawnStar');
                }
            }
            nodStar.children[5].active = false;
        }
        else if (score >= _score[0]) {
            if (!nodStar.children[3].active) {
                nodStar.children[3].active = true;
                nodStar.children[3].getComponent(cc.Animation).play('aniSpawnStar');
            }
            nodStar.children[4].active = false;
            nodStar.children[5].active = false;
        }
        else {
            nodStar.children[3].active = false;
            nodStar.children[4].active = false;
            nodStar.children[5].active = false;
        }
    };
    // 更新目标显示
    PanelHeaderPve.prototype.updateObjective = function (data) {
        // console.log(data)
        var label = this.nodObjective.children[data.index].getChildByName('labObjective');
        if (data.count <= 0) {
            this.panelGuide.level1_tip4(data.index);
            label.active = false;
            this.nodObjective.children[data.index].getChildByName('sprAchieved').active = true;
        }
        else {
            label.active = true;
            label.getComponent(cc.Label).string = 'x' + data.count;
            this.nodObjective.children[data.index].getChildByName('question').active = false;
            this.nodObjective.children[data.index].getChildByName('sprite').active = true;
        }
    };
    PanelHeaderPve.prototype.start = function () {
    };
    PanelHeaderPve.prototype.init = function (layerGame) {
        this.saveObjectivesPs();
        Modules_1.Play.DataPve.panelHead = this;
        Modules_1.Play.DataPve.clear();
        this.getScore(0);
        this.layerGame = layerGame;
        this.labScore.string = '0';
        this._isObjectiveDone = [false, false, false, false, false];
        Modules_1.Play.DataPve.remainTime = Modules_1.Play.DataPve.levelData.time;
        Modules_1.Play.DataPve.remainStep = Modules_1.Play.DataPve.levelData.step;
        this.labLevel.string = "\u7B2C" + Modules_1.Play.DataPve.curLevel + "\u5173";
        if (Modules_1.Play.DataPve.remainStep == 0) {
            Modules_1.Play.DataPve.isTimeLevel = true;
            this.nodLastTime.active = true;
            this.nodLastStep.active = false;
            this.labCountDown.string = Modules_1.Play.DataPve.remainTime + "";
            this.labCountDown.node.parent.getChildByName('labSec').getComponent(cc.Label).string = '秒';
        }
        else {
            Modules_1.Play.DataPve.isTimeLevel = false;
            this.nodLastTime.active = false;
            this.nodLastStep.active = true;
            this.labCountDown.string = Modules_1.Play.DataPve.remainStep + "";
            this.labCountDown.node.parent.getChildByName('labSec').getComponent(cc.Label).string = '步';
        }
        this.initObjective();
    };
    PanelHeaderPve.prototype.initObjective = function () {
        this.objective = Modules_1.Play.DataPve.levelData.objective;
        for (var i = 0; i < this.nodObjective.children.length; ++i) {
            this.nodObjective.children[i].active = false;
            this.nodObjective.children[i].getChildByName('sprAchieved').active = false;
            this.nodObjective.children[i].getChildByName('labObjective').active = true;
            var children = this.nodObjective.children[i].getChildByName('sprite').children;
            for (var j = 0; j < children.length; ++j) {
                children[j].destroy();
            }
        }
        var count = 0;
        for (var i = 0; i < this.objective.length; ++i) {
            for (var j = 0; j < this.objective[i].length; ++j) {
                var nodObjective = this.nodObjective.children[count];
                var data = this.objective[i][j];
                nodObjective.active = true;
                if (j === 0 && i !== 0) {
                    nodObjective.getChildByName('arrow').active = true;
                }
                else {
                    nodObjective.getChildByName('arrow').active = false;
                }
                if (data.objectiveType === 0) { // 正常显示水果
                    nodObjective.getChildByName('ban').active = false;
                    nodObjective.getChildByName('question').active = false;
                    nodObjective.getChildByName('sprite').active = true;
                    nodObjective.getChildByName('labObjective').active = true;
                    nodObjective.getChildByName('sprAchieved').active = false;
                }
                else if (data.objectiveType === 1) { // 显示ban
                    nodObjective.getChildByName('ban').active = true;
                    nodObjective.getChildByName('question').active = false;
                    nodObjective.getChildByName('sprite').active = true;
                    nodObjective.getChildByName('labObjective').active = false;
                    nodObjective.getChildByName('sprAchieved').active = false;
                }
                else if (data.objectiveType === 2) { // 显示问号
                    nodObjective.getChildByName('ban').active = false;
                    nodObjective.getChildByName('question').active = true;
                    nodObjective.getChildByName('sprite').active = false;
                    nodObjective.getChildByName('labObjective').active = false;
                    nodObjective.getChildByName('sprAchieved').active = false;
                }
                else {
                    // error
                }
                count++;
                var labObjective = nodObjective.getChildByName('labObjective').getComponent(cc.Label);
                labObjective.string = "x" + data.count;
                switch (data.tileType) {
                    case PlayDefine_1.TILE_TYPE.BLOCK:
                        var nodBlock = cc.instantiate(Modules_1.Play.DataPve.pfbBlock);
                        var tileComponent = nodBlock.getComponent('Block');
                        nodBlock.parent = nodObjective.getChildByName('sprite');
                        tileComponent.init();
                        tileComponent.type = data.type;
                        tileComponent.setContentSize(80, 80);
                        nodBlock.scale = 1;
                        nodBlock.zIndex = 0;
                        nodBlock.x = 0;
                        nodBlock.y = 0;
                        break;
                    case PlayDefine_1.TILE_TYPE.BOMB:
                        var nodBomb = cc.instantiate(Modules_1.Play.DataPve.pfbBomb);
                        nodBomb.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodBomb.getComponent('Bomb');
                        tileComponent.init();
                        tileComponent.type = data.type;
                        if (data.type == PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                            tileComponent.subType = PlayDefine_1.BLOCK_COLOR.COLORS;
                        }
                        tileComponent.setContentSize(80, 80);
                        nodBomb.scale = 1;
                        nodBomb.zIndex = 0;
                        nodBomb.x = 0;
                        nodBomb.y = 0;
                        break;
                    case PlayDefine_1.TILE_TYPE.PET:
                        var nodPet = cc.instantiate(Modules_1.Play.DataPve.pfbObstacle);
                        nodPet.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodPet.getComponent('Obstacle');
                        tileComponent.type = data.type;
                        tileComponent.canTouch = false;
                        tileComponent.setContentSize(80, 80);
                        nodPet.scale = 1;
                        nodPet.zIndex = 0;
                        nodPet.x = 0;
                        nodPet.y = 0;
                        break;
                    case PlayDefine_1.TILE_TYPE.TABLEWARE:
                        var nodTableware = cc.instantiate(Modules_1.Play.DataPve.pfbTableware);
                        nodTableware.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodTableware.getComponent('Tableware');
                        tileComponent.type = data.type;
                        tileComponent.canTouch = false;
                        tileComponent.setContentSize(80, 80);
                        nodTableware.scale = 1;
                        nodTableware.zIndex = 0;
                        nodTableware.x = 0;
                        nodTableware.y = 0;
                        break;
                    case PlayDefine_1.TILE_TYPE.WALL:
                        var nodWall = cc.instantiate(Modules_1.Play.DataPve.pfbWall);
                        nodWall.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodWall.getComponent('Wall');
                        tileComponent.type = data.type;
                        tileComponent.setContentSize(80, 80);
                        nodWall.scale = 1;
                        nodWall.zIndex = 0;
                        nodWall.x = 0;
                        nodWall.y = 0;
                        break;
                }
            }
        }
    };
    PanelHeaderPve.prototype.updateLabelStep = function () {
        this.labCountDown.string = Modules_1.Play.DataPve.remainStep.toString();
    };
    // 步数计算
    PanelHeaderPve.prototype.addStep = function () {
        if (Modules_1.Play.DataPve.remainStep > 0) {
            Modules_1.Play.DataPve.remainStep--;
            this.updateLabelStep();
            if (Modules_1.Play.DataPve.remainStep == 10 && !StateMgr_1.default.INSTANCE.isStopOperate) {
                var nodTip = this.node.parent.getChildByName('nodBoard').getChildByName('nodTip');
                this.PlayUI.Audio.remaindTime();
                nodTip.children[0].runAction(cc.sequence(cc.moveBy(0.2, 222, 0), cc.delayTime(2.5), cc.moveBy(0.2, -222, 0)));
            }
            if (Modules_1.Play.DataPve.remainStep <= 0) {
                // gameover
                StateMgr_1.default.INSTANCE.isStopOperate = true;
                this.layerGame.gameOver();
            }
        }
    };
    PanelHeaderPve.prototype.updateTime = function () {
        this.labCountDown.string = Modules_1.Play.DataPve.remainTime + "";
    };
    PanelHeaderPve.prototype.update = function (dt) {
        if (!Modules_1.Play.DataPve.gameBegan) {
            return;
        }
        this.passedTime += dt;
        if (this.passedTime >= 1) {
            if (Modules_1.Play.DataPve.remainTime >= 1) {
                Modules_1.Play.DataPve.remainTime -= 1;
                this.passedTime = this.passedTime - 1;
                this.labCountDown.string = Modules_1.Play.DataPve.remainTime + "";
                // 小于5秒时开始倒计时声音
                if (Modules_1.Play.DataPve.remainTime <= 5 && Modules_1.Play.DataPve.remainTime >= 1) {
                    this.PlayUI.Audio.countDownAudio();
                }
                else if (Modules_1.Play.DataPve.remainTime === 0) {
                    this.PlayUI.Audio.timeEndAudio();
                    StateMgr_1.default.INSTANCE.isStopOperate = true;
                    this.layerGame.gameOver();
                }
            }
            if (Modules_1.Play.DataPve.remainTime < 1) {
                this.passedTime = 0;
            }
        }
    };
    PanelHeaderPve.prototype.onDestroy = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    __decorate([
        property(cc.Label)
    ], PanelHeaderPve.prototype, "labCountDown", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeaderPve.prototype, "labLevel", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeaderPve.prototype, "labScore", void 0);
    __decorate([
        property(cc.Prefab)
    ], PanelHeaderPve.prototype, "pfbTableware", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeaderPve.prototype, "nodObjective", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeaderPve.prototype, "nodLastTime", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeaderPve.prototype, "nodLastStep", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeaderPve.prototype, "nodPanelTile", void 0);
    __decorate([
        property(panelGuidePve_1.default)
    ], PanelHeaderPve.prototype, "panelGuide", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeaderPve.prototype, "nodGameOver", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeaderPve.prototype, "nodScoreProgress", void 0);
    PanelHeaderPve = PanelHeaderPve_1 = __decorate([
        ccclass
    ], PanelHeaderPve);
    return PanelHeaderPve;
    var PanelHeaderPve_1;
}(cc.Component));
exports.default = PanelHeaderPve;

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
        //# sourceMappingURL=PanelHeaderPve.js.map
        