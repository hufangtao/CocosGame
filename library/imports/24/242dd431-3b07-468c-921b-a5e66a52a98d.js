"use strict";
cc._RF.push(module, '242ddQxOwdGjJIbpeZqUqmN', 'UIScorePve');
// scripts/app/ui/UIScorePve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../component/game/PlayDefine");
var ProtoSectionPlay_1 = require("../common/net/proto/mods/ProtoSectionPlay");
var DYAudio_1 = require("../../dyGame/DYAudio");
var UIFunc_1 = require("../common/UIFunc");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var Modules_1 = require("../module/Modules");
var PlayManager_1 = require("../component/game/PlayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIScorePve = /** @class */ (function (_super) {
    __extends(UIScorePve, _super);
    function UIScorePve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.spfCross = null;
        _this.nodSprWin = null;
        _this.nodSprLose = null;
        _this.nodBtnNextLevel = null;
        _this.nodNextLevelBtn = null;
        _this.nodObjective_score = null;
        _this.nodStar = null;
        _this.labLevel = null;
        _this.labScoreWin = null;
        _this.labScoreLose = null;
        _this.labEnergy = null;
        _this.gameOver = false;
        _this.hadBalance = false;
        return _this;
    }
    UIScorePve.prototype.onEnable = function () {
        this.hadBalance = false;
    };
    UIScorePve.prototype.onDisable = function () {
        this.gameOver = false;
    };
    UIScorePve.prototype.init = function (game) {
        this._game = game;
    };
    UIScorePve.prototype.win = function () {
        if (this.gameOver) {
            return;
        }
        if (this.hadBalance) {
            return;
        }
        this.hadBalance = true;
        this.gameOver = true;
        cc.find('Canvas').getComponent('PlayUIPve').Audio.victory();
        this.nodBtnNextLevel.active = true;
        this.node.getChildByName('panelWin').active = true;
        this.node.getChildByName('panelLose').active = false;
        this.nodBtnNextLevel.setSiblingIndex(0);
        this.labLevel.string = '第' + Modules_1.Play.DataPve.curLevel + '关';
        this.labScoreWin.string = Modules_1.Play.DataPve.score + '';
        this.nodSprWin.active = true;
        this.nodSprLose.active = false;
        var level = Modules_1.Play.DataPve.curLevel + 1;
        var levelData = Modules_1.Play.LevelDatas['level_' + level];
        if (!levelData) {
            //console.log('已经是最后一局')
        }
        this.node.active = true;
        this.nodNextLevelBtn.active = true;
        var starCnt = this.calculateStar(Modules_1.Play.DataPve.score, level - 1);
        this.showStar(starCnt);
        // 3星 5体力
        // 2星 3
        // 1星 1
        if (starCnt == 3) {
            this.labEnergy.node.parent.active = true;
            this.labEnergy.string = '5';
        }
        else if (starCnt == 2) {
            this.labEnergy.node.parent.active = true;
            this.labEnergy.string = '3';
        }
        else if (starCnt == 1) {
            this.labEnergy.node.parent.active = true;
            this.labEnergy.string = '1';
        }
        else {
            this.labEnergy.node.parent.active = false;
        }
    };
    UIScorePve.prototype.lose = function () {
        if (this.gameOver) {
            return;
        }
        if (this.hadBalance) {
            return;
        }
        this.hadBalance = true;
        this.gameOver = true;
        cc.find('Canvas').getComponent('PlayUIPve').Audio.lose();
        this.nodBtnNextLevel.active = false;
        this.node.getChildByName('panelWin').active = false;
        this.node.getChildByName('panelLose').active = true;
        this.nodBtnNextLevel.setSiblingIndex(3);
        this.labLevel.string = '第' + Modules_1.Play.DataPve.curLevel + '关';
        this.labScoreLose.string = Modules_1.Play.DataPve.score + '';
        this.nodSprWin.active = false;
        this.nodSprLose.active = true;
        this.node.active = true;
        this.nodNextLevelBtn.active = false;
        this.showUnFinishedObjectives();
    };
    UIScorePve.prototype.showUnFinishedObjectives = function () {
        for (var i = 0; i < this.nodObjective_score.children.length; ++i) {
            this.nodObjective_score.children[i].active = false;
        }
        var arrUnFinished = Modules_1.Play.DataPve.getObjectivesUnFinished();
        var _loop_1 = function (i) {
            var objective = this_1.nodObjective_score.children[arrUnFinished[i].index];
            objective.active = true;
            var nodTile = this_1._game.layerGame.panelHeader.nodObjective.children[arrUnFinished[i].index].getChildByName('sprite').children[0];
            nodTile.parent = objective.getChildByName('nodTile');
            if (arrUnFinished[i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.QUESTION) {
                objective.getChildByName('question').active = true;
            }
            else {
                objective.getChildByName('question').active = false;
            }
            objective.getChildByName('sprCross').active = false;
            this_1.scheduleOnce(function () {
                objective.getComponent(cc.Animation).play();
            }.bind(this_1, i), (i + 1) * 0.5);
        };
        var this_1 = this;
        for (var i = 0; i < arrUnFinished.length; ++i) {
            _loop_1(i);
        }
    };
    UIScorePve.prototype.delay = function (time) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.scheduleOnce(function () {
                            resolve();
                        }, time);
                    })];
            });
        });
    };
    UIScorePve.prototype.calculateStar = function (score, level) {
        var _score = Modules_1.Play.LevelDatas['level_' + level].score;
        if (!_score) {
            return;
        }
        var starCnt = 0;
        if (score >= _score[2]) {
            starCnt = 3;
        }
        else if (score >= _score[1]) {
            starCnt = 2;
        }
        else if (score >= _score[0]) {
            starCnt = 1;
        }
        else {
            starCnt = 0;
        }
        return starCnt;
    };
    UIScorePve.prototype.showStar = function (starCnt) {
        return __awaiter(this, void 0, void 0, function () {
            var i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nodStar.active = true;
                        for (i = 0; i < 3; ++i) {
                            this.nodStar.children[i].children[1].active = false;
                            this.nodStar.children[i].children[2].active = false;
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < starCnt)) return [3 /*break*/, 4];
                        this.nodStar.children[i].getComponent(cc.Animation).play('pveStar');
                        return [4 /*yield*/, this.delay(0.17)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UIScorePve.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnNextLevel':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this._game.nextLevel();
                break;
            case 'btnContinue':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                var startPve = new ProtoSectionPlay_1.PlayStartPveC2S();
                PlayManager_1.default.INSTANCE.PveEnterType = 2;
                NetUtil_1.default.SendMsg(startPve);
                // this.playAgain();
                break;
            case 'btnGameBack':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                DYAudio_1.default.stopMusic();
                GamePersist_1.default.INSTANCE.loadScene('levelChoose');
                UIFunc_1.UIFunc.closeUI('UIScorePve', function (node) { });
                break;
        }
    };
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePve.prototype, "spfCross", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePve.prototype, "nodSprWin", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePve.prototype, "nodSprLose", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePve.prototype, "nodBtnNextLevel", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePve.prototype, "nodNextLevelBtn", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePve.prototype, "nodObjective_score", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePve.prototype, "nodStar", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePve.prototype, "labLevel", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePve.prototype, "labScoreWin", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePve.prototype, "labScoreLose", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePve.prototype, "labEnergy", void 0);
    UIScorePve = __decorate([
        ccclass
    ], UIScorePve);
    return UIScorePve;
}(cc.Component));
exports.default = UIScorePve;

cc._RF.pop();