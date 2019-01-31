(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pvp/PlayUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7589fKcvFBK75ULah4BLnY2', 'PlayUI', __filename);
// scripts/app/component/game/pvp/PlayUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseUI_1 = require("../../BaseUI");
var PlayManager_1 = require("../PlayManager");
var PanelHeader_1 = require("./PanelHeader");
var Modules_1 = require("../../../module/Modules");
var LayerGame_1 = require("./LayerGame");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var Modules = require("../../../module/Modules");
var Defines_1 = require("../../../common/Defines");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var NetUtil_1 = require("../../../common/net/NetUtil");
var Audio_1 = require("../Audio");
var PlayDefine_1 = require("../PlayDefine");
var UIFunc_1 = require("../../../common/UIFunc");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayUI = /** @class */ (function (_super) {
    __extends(PlayUI, _super);
    function PlayUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panelHeaderNode = null;
        _this.panelHeader = null;
        _this.layerGameNode = null;
        _this.layerGame = null;
        _this.readyGoAction = null;
        _this.spriteGameOver = null;
        _this.spritegrayBg = null;
        _this.Audio = null;
        _this.hadLoadLayerScore = false;
        _this.fristGame = true;
        _this.hadLoadPvpTip = false;
        return _this;
    }
    PlayUI.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        PlayManager_1.default.INSTANCE.PlayUI = this;
        Modules_1.Play.GameModel = PlayDefine_1.GAME_MODEL.PVP;
        this.layerGameNode.active = true;
        this.layerGame.init(this);
        Modules_1.Play.DataPvp.playUI = this;
        Modules_1.Play.DataPvp.layerGame = this.layerGame;
        Modules_1.Play.DataPvp.gameOver = false;
        this.hideHomeAd();
        window['Partner'].hideGameClub();
    };
    PlayUI.prototype.start = function () {
        _super.prototype.start.call(this);
        this.Audio.playBg();
    };
    PlayUI.prototype.onLoadSceneEnd = function () {
        this.init();
    };
    PlayUI.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.setPrefab();
                this.layerGame.gameBegain();
                this.beReady(0);
                this.loadHead();
                this.layerGameNode.active = true;
                return [2 /*return*/];
            });
        });
    };
    PlayUI.prototype.hideHomeAd = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].hideHomeAd();
        }
    };
    PlayUI.prototype.setPrefab = function () {
        Modules_1.Play.DataPvp.pfbScore = this.layerGame.pfbScore;
        Modules_1.Play.DataPvp.pfbBlock = this.layerGame.pfbBlock;
        Modules_1.Play.DataPvp.pfbBomb = this.layerGame.pfbBomb;
        Modules_1.Play.DataPvp.pfbObstacle = this.layerGame.pfbObstacle;
        Modules_1.Play.DataPvp.pfbTileBg = this.layerGame.pfbTileBg;
        Modules_1.Play.DataPvp.pfbEncourage = this.layerGame.pfbEncourage;
        Modules_1.Play.DataPvp.pfbWall = this.layerGame.pfbWall;
    };
    PlayUI.prototype.loadHead = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadRes('prefab/component/PlaymateHead')];
                    case 1:
                        res = _a.sent();
                        this.nodHead_1 = cc.instantiate(res);
                        this.nodHead_2 = cc.instantiate(res);
                        this.panelHeader.setHead(this.nodHead_1, this.nodHead_2);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 准备好了 可以指定延迟时间后, 再通知服务器
    PlayUI.prototype.beReady = function (delay) {
        if (delay === void 0) { delay = 0; }
        if (delay > 0) {
            // delay秒后通知服务器 确认进入房间
            this.scheduleOnce(function () {
                PlayManager_1.default.INSTANCE.readyRequest();
            }, delay);
        }
        else {
            PlayManager_1.default.INSTANCE.readyRequest();
        }
    };
    PlayUI.prototype.newRound = function () {
        if (this.layerGame.pvpTeach) {
            cc.log('readygoAction');
            this.readygoAction();
            this.onReadyResponse();
        }
        else {
            // if (this.layerGame.pvpAi) {
            // cc.log('readygoAction');
            // this.readygoAction();
            // }
        }
        GamePersist_1.default.INSTANCE.onLoadSceneEnd();
        this.layerGame.canTouch = true;
    };
    PlayUI.prototype.onReadyResponse = function () {
        if (!PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpTeach) {
            cc.log('readygoAction');
            this.readygoAction();
        }
        if (this.fristGame) {
            // else {
            //     console.log("guide---------", PlayManager.INSTANCE.PlayUI.layerGame.pvpTeach);
            //     this.layerGame.guide();
            // }
        }
    };
    PlayUI.prototype.getAnimal = function (saveCount, animalSide) {
        if (animalSide === Modules_1.Play.DataPlay.MySide) {
            Modules_1.Play.DataPvp.myPetAllCnt = saveCount;
        }
        else {
            Modules_1.Play.DataPvp.opponentPetAllCnt = saveCount;
        }
        this.panelHeader.getAnimal();
    };
    // 一局结束 加载结算页面
    PlayUI.prototype.onPlayFinish = function (playResult) {
        var _this = this;
        this.layerGame.gameOver();
        Modules_1.Play.DataPvp.gameBegan = false;
        Modules_1.Play.DataPvp.gameOver = true;
        if (this.layerGame.pvpTeach) {
            this.loadGuideOver();
        }
        else {
            this.spriteGameOver.active = true;
            var anim = this.spriteGameOver.getComponent(cc.Animation);
            anim.play('aniGameOver');
            anim.targetOff('finished');
            anim.on('finished', function () {
                _this.loadLayerScore(playResult);
                PlayManager_1.default.INSTANCE.onPvpFinish(_this.layerGame.maxMatchCount);
            }, this);
        }
    };
    // 加载guideover预制
    PlayUI.prototype.loadGuideOver = function () {
        var _this = this;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        cc.loader.loadRes('prefab/play/pvp/GuideOver', cc.Prefab, function (err, prefab) {
            _this.spriteGameOver.active = false;
            var node = cc.instantiate(prefab);
            node.parent = _this.node;
            GamePersist_1.default.INSTANCE.CancelWaiting();
            node.on("touchstart", function () {
                Modules.Home.OpenHomeFrom = Defines_1.OpenHomeFrom.UI_GUIDE;
                PlayManager_1.default.INSTANCE.onBack();
            });
            var guideFinish = new ProtoSectionPlay_1.PlayGuideFinishC2S();
            guideFinish.guideFinish = 1;
            NetUtil_1.default.SendMsg(guideFinish);
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        });
    };
    //加载score
    PlayUI.prototype.loadLayerScore = function (playResult) {
        var _this = this;
        if (this.hadLoadLayerScore) {
            return;
        }
        this.hadLoadLayerScore = true;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIScorePvp', function (node) {
            _this.spriteGameOver.active = false;
            GamePersist_1.default.INSTANCE.CancelWaiting();
            var UIScorePvp = node.getComponent('UIScorePvp');
            UIScorePvp.init(_this);
            UIScorePvp.playFinish(playResult, _this.nodHead_1);
        });
    };
    // 再来一局确认开始
    PlayUI.prototype.didOneMorePlay = function () {
    };
    PlayUI.prototype.setContinueBtn = function (type) {
        var layerScoreNode = this.node.getChildByName('UIScorePvp');
        if (layerScoreNode) {
            layerScoreNode.getComponent('UIScorePvp').setContinueBtn(type);
        }
    };
    // 再来一局
    PlayUI.prototype.onOneMorePlay = function () {
        this.Audio.playBg();
        this.fristGame = false;
        this.hadLoadLayerScore = false;
        this.layerGameNode.active = true;
        this.layerGame.gameBegain();
        this.beReady(0);
        this.loadHead();
        this.panelHeader.init();
    };
    PlayUI.prototype.uiName = function () {
        return "PlayUI";
    };
    PlayUI.prototype.loadRes = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cc.loader.loadRes(url, function (err, res) {
                            if (err) {
                                resolve(null);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    })];
            });
        });
    };
    // 一方投掷了一个花朵
    PlayUI.prototype.genBlockResponse = function (genSide, row) {
        // 关闭花朵产生
        return;
        if (genSide == Modules_1.Play.DataPlay.MySide) {
            this.setToast('对手不屑地丢给你一朵花', PlayDefine_1.ColorType.Red);
            this.layerGame.gainFlower(row);
            this.Audio.flower();
        }
        else {
            this.setToast('对手也不过如此嘛，送ta朵花好了', PlayDefine_1.ColorType.Green);
        }
    };
    // 一方使用了道具
    PlayUI.prototype.onActiveBuff = function (data) {
        if (data.effected === 0) {
            return;
        }
        if (data.effectSide === Modules_1.Play.DataPlay.MySide) {
            this.effectPlayer(data.buffId);
        }
        else {
            this.effectOpponent(data.buffId);
        }
    };
    // 偷取宠物
    PlayUI.prototype.onStolenAnimal = function (data) {
        if (data.animalSide === Modules_1.Play.DataPlay.MySide) {
            if (data.stealCount > 0) {
                this.setToast('嘿嘿，偷偷拿几个ta不知道', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.layerGame.grabPet(data.stealCount);
                this.Audio.buff2();
            }
            else {
                this.setToast('额，ta怎么1个宠物都没有', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.Audio.miss();
            }
        }
        else {
            if (data.stealCount > 0) {
                this.setToast('天，对手偷偷拿了你的宠物', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.Audio.trick();
            }
            else {
                this.setToast('晕，你啥都没有，恰好对方一无所获', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.Audio.opponentMiss();
            }
        }
    };
    // 更新棋盘上的宠物数量
    PlayUI.prototype.onBoardStatusResponse = function (data) {
        if (data.side !== Modules_1.Play.DataPlay.MySide) {
            Modules_1.Play.DataPvp.opponentBoardPetCnt = data.animalNum;
        }
    };
    // 影响到对手
    PlayUI.prototype.effectOpponent = function (propType) {
        switch (propType) {
            case 1:
                this.setToast('对手汇聚洪荒之力，消灭了ta看到的一切', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                break;
            case 2:
                break;
            case 3:
                this.setToast('给你遮上眼睛，看你还剩几分能耐', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, null);
                this.Audio.buff3();
                break;
            case 4:
                this.setToast('捣乱ta是我的乐趣', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.Audio.buff3();
                break;
        }
    };
    // 影响到我
    PlayUI.prototype.effectPlayer = function (propType) {
        var _this = this;
        switch (propType) {
            case 1:
                this.setToast('啊啊啊，我的小宇宙爆发啦', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.layerGame.destroyAllTiles();
                this.Audio.buff1();
                break;
            case 2:
                this.layerGame.losePet();
                break;
            case 3:
                this.setToast('对手不想和你说话，给你一朵云自己体会', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, null);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yun);
                this.layerGame.showCloud();
                this.Audio.trick();
                break;
            case 4:
                this.setToast('对手气急败坏地想扰乱你的节奏', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.Audio.trick();
                this.scheduleOnce(function () {
                    _this.layerGame.prop4();
                    _this.Audio.buff4();
                }, 2);
                break;
        }
    };
    PlayUI.prototype.iUseProp = function (propType) {
        switch (propType) {
            case 1:
                this.setToast('啊啊啊，我的小宇宙爆发啦', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.layerGame.destroyAllTiles();
                this.Audio.buff1();
                break;
            case 2:
                // this.setToast('我使用了吸取');
                this.layerGame.grabPet(null);
                break;
            case 3:
                this.setToast('给你遮上眼睛，看你还剩几分能耐', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, null);
                this.Audio.buff3();
                break;
            case 4:
                this.setToast('捣乱ta是我的乐趣', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.Audio.buff3();
                break;
        }
    };
    PlayUI.prototype.opponentUseProp = function (propType) {
        var _this = this;
        switch (propType) {
            case 1:
                this.setToast('对手汇聚洪荒之力，消灭了ta看到的一切', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                break;
            case 2:
                // this.setToast('对手使用了吸取');
                this.layerGame.losePet();
                break;
            case 3:
                this.setToast('对手不想和你说话，给你一朵云自己体会', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, null);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yun);
                this.layerGame.showCloud();
                this.Audio.trick();
                break;
            case 4:
                this.setToast('对手气急败坏地想扰乱你的节奏', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.Audio.trick();
                this.scheduleOnce(function () {
                    _this.layerGame.prop4();
                    _this.Audio.buff4();
                }, 2);
                break;
        }
    };
    // 道具提示
    PlayUI.prototype.propTips = function (type) {
        this.layerGame.bottom.propTips(type);
    };
    PlayUI.prototype.continue = function () {
        var playContinue = new ProtoSectionPlay_1.PlayContinueC2S();
        NetUtil_1.default.SendMsg(playContinue);
    };
    PlayUI.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'backButton':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                if (!PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpTeach) {
                    UIFunc_1.UIFunc.openUI('UIQuitConfirmPvp', function (node) {
                        GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
                    });
                }
                else {
                    this.setToast("请先完成教学哦");
                }
                break;
            case 'btnShowTip':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.loadPvpTip();
                break;
        }
    };
    // 加载pvp提示
    PlayUI.prototype.loadPvpTip = function () {
        var _this = this;
        if (this.hadLoadPvpTip) {
            return;
        }
        this.hadLoadPvpTip = true;
        UIFunc_1.UIFunc.openUI('UIPvpTips', function (node) {
            node.parent = _this.node;
            var btnEvent = function () {
                UIFunc_1.UIFunc.closeUI('UIPvpTips', function () { });
            };
            node.getChildByName('btnBack1').on('click', btnEvent, _this);
            _this.hadLoadPvpTip = false;
        });
    };
    //显示ReadyGo
    PlayUI.prototype.readygoAction = function () {
        var _this = this;
        var self = this;
        self.Audio.readyGo();
        this.scheduleOnce(function () {
            self.readyGoAction.active = true;
            self.readyGoAction.getComponent(cc.Animation).play("readyGo");
            self.readyGoAction.getComponent(cc.Animation).on('finished', _this.closeReadyGo, _this);
        }, 0.2);
    };
    PlayUI.prototype.closeReadyGo = function () {
        this.readyGoAction.active = false;
        this.layerGame.guide();
        Modules_1.Play.DataPvp.gameBegan = true;
        Modules_1.Play.DataPvp.gameOver = false;
        Modules_1.Play.DataPvp.beginTime = Date.now();
        Modules_1.Play.DataPvp.saveCurRank();
        Modules_1.Play.DataPvp.saveCurGrade();
        this.layerGame.sendBoardPetCnt();
    };
    PlayUI.prototype.onDestroy = function () {
    };
    PlayUI.prototype.setToast = function (msg, colorType) {
        var toast = GamePersist_1.default.INSTANCE.toast(msg, colorType, 2.5);
        for (var i = 0; i < toast.node.parent.children.length; ++i) {
            toast.node.parent.children[i].runAction(cc.moveBy(0.2, 0, 100));
        }
    };
    __decorate([
        property(cc.Node)
    ], PlayUI.prototype, "panelHeaderNode", void 0);
    __decorate([
        property(PanelHeader_1.default)
    ], PlayUI.prototype, "panelHeader", void 0);
    __decorate([
        property(cc.Node)
    ], PlayUI.prototype, "layerGameNode", void 0);
    __decorate([
        property(LayerGame_1.default)
    ], PlayUI.prototype, "layerGame", void 0);
    __decorate([
        property(cc.Node)
    ], PlayUI.prototype, "readyGoAction", void 0);
    __decorate([
        property(cc.Node)
    ], PlayUI.prototype, "spriteGameOver", void 0);
    __decorate([
        property(cc.Node)
    ], PlayUI.prototype, "spritegrayBg", void 0);
    __decorate([
        property(Audio_1.default)
    ], PlayUI.prototype, "Audio", void 0);
    PlayUI = __decorate([
        ccclass
    ], PlayUI);
    return PlayUI;
}(BaseUI_1.default));
exports.default = PlayUI;

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
        //# sourceMappingURL=PlayUI.js.map
        