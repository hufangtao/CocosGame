"use strict";
cc._RF.push(module, 'be3e7R8SNtPcJVnO9G5MZXU', 'PlayUIPve');
// scripts/app/component/game/pve/PlayUIPve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseUI_1 = require("../../BaseUI");
var PanelHeaderPve_1 = require("./PanelHeaderPve");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var Modules_1 = require("../../../module/Modules");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var Audio_1 = require("../Audio");
var PlayManager_1 = require("../PlayManager");
var NetUtil_1 = require("../../../common/net/NetUtil");
var NodePool_1 = require("../NodePool");
var StateMgr_1 = require("./StateMgr");
var Defines_1 = require("../../../common/Defines");
var SocialManager_1 = require("../../../common/social/SocialManager");
var UIFunc_1 = require("../../../common/UIFunc");
var Message_1 = require("../../../common/Message");
var PlayDefine_1 = require("../PlayDefine");
var LayerGamePve_1 = require("./LayerGamePve");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var Modules = require("../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayUIPve = /** @class */ (function (_super) {
    __extends(PlayUIPve, _super);
    function PlayUIPve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panelHeaderNode = null;
        _this.panelHeader = null;
        _this.layerGameNode = null;
        _this.layerGame = null;
        _this.Audio = null;
        _this.dataPlay = null;
        _this.isOver = false;
        _this.isBonusOver = false;
        _this.canshowScore = false;
        return _this;
    }
    PlayUIPve.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.onLoad.call(this);
                StateMgr_1.default.INSTANCE.init();
                PlayManager_1.default.INSTANCE.PlayUIPve = this;
                Modules_1.Play.GameModel = PlayDefine_1.GAME_MODEL.PVE;
                DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
                DYNotify_1.DYNotify.regObserver(Message_1.Message.GAME_WIN, this.onNotify, this);
                DYNotify_1.DYNotify.regObserver(Message_1.Message.GAME_LOST, this.onNotify, this);
                this.layerGame.init(this);
                // this.showOverAd();
                UIFunc_1.UIFunc.closeUI('UIScorePve', function (node) { });
                window['Partner'].hideGameClub();
                return [2 /*return*/];
            });
        });
    };
    PlayUIPve.prototype.showOverAd = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].showOverAd();
        }
    };
    PlayUIPve.prototype.hideOverAd = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].hideOverAd();
        }
    };
    PlayUIPve.prototype.start = function () {
        _super.prototype.start.call(this);
        this.layerGameNode.active = true;
        this.isOver = false;
        this.isBonusOver = false;
        this.Audio.playBg();
    };
    PlayUIPve.prototype.onLoadSceneEnd = function () {
        this.init();
    };
    PlayUIPve.prototype.uiName = function () {
        return "PlayUIPve";
    };
    PlayUIPve.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this.setPrefab();
                NodePool_1.default.initPool();
                this.layerGame.loadLevelData(function () {
                    GamePersist_1.default.INSTANCE.onLoadSceneEnd();
                    _this.layerGame.gameBegin();
                });
                return [2 /*return*/];
            });
        });
    };
    PlayUIPve.prototype.setPrefab = function () {
        Modules_1.Play.DataPve.pfbScore = this.layerGame.pfbScore;
        Modules_1.Play.DataPve.pfbBlock = this.layerGame.pfbBlock;
        Modules_1.Play.DataPve.pfbBomb = this.layerGame.pfbBomb;
        Modules_1.Play.DataPve.pfbObstacle = this.layerGame.pfbObstacle;
        Modules_1.Play.DataPve.pfbWall = this.layerGame.pfbWall;
        Modules_1.Play.DataPve.pfbTableware = this.layerGame.pfbTableware;
        Modules_1.Play.DataPve.pfbTransport = this.layerGame.pfbTransport;
        Modules_1.Play.DataPve.pfbGate = this.layerGame.pfbGate;
        Modules_1.Play.DataPve.pfbBonusBall = this.layerGame.pfbBonusBall;
        Modules_1.Play.DataPve.pfbTileBg = this.layerGame.pfbTileBg;
    };
    PlayUIPve.prototype.nextLevel = function () {
        var level = Modules_1.Play.DataPve.curLevel + 1;
        var levelData = Modules_1.Play.LevelDatas['level_' + level];
        if (!levelData) {
            GamePersist_1.default.INSTANCE.toast('程序员小哥哥还在加班开发中');
            return;
        }
        var startPve = new ProtoSectionPlay_1.PlayStartPveC2S();
        PlayManager_1.default.INSTANCE.PveEnterType = 1;
        NetUtil_1.default.SendMsg(startPve);
    };
    PlayUIPve.prototype.loadGame = function () {
        var level = Modules_1.Play.DataPve.curLevel + 1;
        if (level <= Modules_1.Home.DataPlayer.Level + 1) {
            Modules_1.Play.DataPve.clearFreeNodes();
            Modules_1.Play.DataPve.curLevel = level;
            GamePersist_1.default.INSTANCE.loadScene('pve_game');
            this.hideOverAd();
        }
    };
    PlayUIPve.prototype.loseGame = function () {
        var playPveFinishC2S = new ProtoSectionPlay_1.PlayPveFinishC2S();
        playPveFinishC2S.pveId = Modules_1.Play.DataPve.curLevel;
        playPveFinishC2S.pveWin = 2;
        playPveFinishC2S.pveScore = Modules_1.Play.DataPve.score;
        playPveFinishC2S.remainStepsTime = Modules_1.Play.DataPve.saveStep > Modules_1.Play.DataPve.saveTime ? Modules_1.Play.DataPve.saveStep : Modules_1.Play.DataPve.saveTime;
        window['Partner'].postMsg(4, { valuekey: Defines_1.ValueKey.levelScore, score: Modules_1.Play.DataPve.score });
        // 更新社交需要的数据
        SocialManager_1.default.INSTANCE.setUserStar(Modules.Home.DataPlayer.FortuneStar + Modules.Home.DataPlayer.PlayCntWin / Modules.Home.DataPlayer.PlayCntTotal);
        NetUtil_1.default.SendMsg(playPveFinishC2S);
        DYNotify_1.DYNotify.post(Message_1.Message.GAME_LOST);
    };
    PlayUIPve.prototype.playAgain = function () {
        Modules_1.Play.DataPve.clearFreeNodes();
        GamePersist_1.default.INSTANCE.loadScene('pve_game');
        this.hideOverAd();
    };
    PlayUIPve.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnNextLevel':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.nextLevel();
                break;
            case 'btnContinue':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                var startPve = new ProtoSectionPlay_1.PlayStartPveC2S();
                PlayManager_1.default.INSTANCE.PveEnterType = 2;
                NetUtil_1.default.SendMsg(startPve);
                // this.playAgain();
                break;
            case 'btnBack':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                // GamePersist.INSTANCE.blockInput();
                this.pauseGame();
                break;
        }
    };
    PlayUIPve.prototype.onAppHide = function () {
        window['Partner'].hideOverAd();
    };
    PlayUIPve.prototype.pauseGame = function () {
        UIFunc_1.UIFunc.openUI('UIQuick', function (node) {
            GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('nodContent'), function () {
            });
        });
        Modules_1.Play.DataPve.gameBegan = false;
    };
    PlayUIPve.prototype.onNotify = function (target, tag, param) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = target;
                if (tag == Message_1.Message.GAME_WIN) {
                    self.showScore(1);
                }
                else if (tag == Message_1.Message.GAME_LOST) {
                    self.showScore(0);
                }
                else if (tag == Message_1.Message.GET_SHARE_CNT) {
                    if (param.reason != 1) {
                        return [2 /*return*/];
                    }
                    if (param.success === 1) {
                        self.showEnergyEmpty(2);
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // 看广告回调
    PlayUIPve.prototype.onWatchAd = function () {
        UIFunc_1.UIFunc.closeUI('UIAddStep', function () { });
        if (Modules_1.Play.DataPve.levelData.time > 0) {
            StateMgr_1.default.INSTANCE.isStopOperate = false;
            Modules_1.Play.DataPve.hadAddStep = true;
            Modules_1.Play.DataPve.remainTime = 10;
            this.panelHeader.updateTime();
        }
        else {
            StateMgr_1.default.INSTANCE.isStopOperate = false;
            Modules_1.Play.DataPve.hadAddStep = true;
            Modules_1.Play.DataPve.remainStep = 5;
            this.panelHeader.updateLabelStep();
        }
    };
    PlayUIPve.prototype.loadUIScorePve = function () {
        var _this = this;
        this.hideOverAd();
        UIFunc_1.UIFunc.openUI('UIScorePve', function (node) {
            _this.UIScorePve = node.getComponent('UIScorePve');
            if (_this.canshowScore) {
                _this.UIScorePve.init(_this);
                if (_this.scoreType === 0) {
                    _this.UIScorePve.lose();
                }
                else {
                    _this.UIScorePve.win();
                }
            }
        });
    };
    // 0失败,1成功
    PlayUIPve.prototype.showScore = function (type) {
        if (this.canshowScore) {
            return;
        }
        if (this.UIScorePve) {
            this.UIScorePve.init(this);
            if (type === 0) {
                this.UIScorePve.lose();
            }
            else {
                this.UIScorePve.win();
            }
        }
        else {
            this.loadUIScorePve();
            this.canshowScore = true;
            this.scoreType = type;
        }
    };
    PlayUIPve.prototype.showEnergyEmpty = function (mode) {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIEnergy', function (node) {
            node.getComponent('UIEnergy').setMode(mode);
            GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    PlayUIPve.prototype.onDestroy = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    __decorate([
        property(cc.Node)
    ], PlayUIPve.prototype, "panelHeaderNode", void 0);
    __decorate([
        property(PanelHeaderPve_1.default)
    ], PlayUIPve.prototype, "panelHeader", void 0);
    __decorate([
        property(cc.Node)
    ], PlayUIPve.prototype, "layerGameNode", void 0);
    __decorate([
        property(LayerGamePve_1.default)
    ], PlayUIPve.prototype, "layerGame", void 0);
    __decorate([
        property(Audio_1.default)
    ], PlayUIPve.prototype, "Audio", void 0);
    PlayUIPve = __decorate([
        ccclass
    ], PlayUIPve);
    return PlayUIPve;
}(BaseUI_1.default));
exports.default = PlayUIPve;

cc._RF.pop();