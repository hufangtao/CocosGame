"use strict";
cc._RF.push(module, 'a7b79lhZJNMyZhgGsCrFcEj', 'PlayManager');
// scripts/app/component/game/PlayManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoSectionPlay_1 = require("../../common/net/proto/mods/ProtoSectionPlay");
var ProtoSectionRoom_1 = require("../../common/net/proto/mods/ProtoSectionRoom");
var NetUtil_1 = require("../../common/net/NetUtil");
var Modules_1 = require("../../module/Modules");
var GamePersist_1 = require("../../common/persist/GamePersist");
var PlayManager = /** @class */ (function () {
    function PlayManager() {
        this.confirmEnterRoom = false;
        this.bGameOver = false;
    }
    Object.defineProperty(PlayManager, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new PlayManager();
            }
            return this.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "IsOpponentLeave", {
        get: function () {
            return this.isOpponentLeave;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "PlayUI", {
        get: function () {
            return this.playUI;
        },
        set: function (value) {
            this.playUI = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "PlayUIPve", {
        get: function () {
            return this.playUIPve;
        },
        set: function (value) {
            this.playUIPve = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "PveEnterType", {
        get: function () {
            return this.pveEnterType;
        },
        set: function (value) {
            this.pveEnterType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayManager.prototype, "LevelChooseUI", {
        get: function () {
            return this.levelChoose;
        },
        set: function (value) {
            this.levelChoose = value;
        },
        enumerable: true,
        configurable: true
    });
    // 收集到动物请求
    PlayManager.prototype.getAnimalRequest = function (roundId, slotIndex) {
        var msg = new ProtoSectionPlay_1.PlaySaveAnimalC2S();
        NetUtil_1.default.SendMsg(msg);
    };
    PlayManager.prototype.onPvpFinish = function (maxMatchCount) {
        var msg = new ProtoSectionPlay_1.PlayPvpFinishC2S();
        msg.matchOnce = maxMatchCount;
        NetUtil_1.default.SendMsg(msg);
    };
    // 收集到动物返回
    PlayManager.prototype.getAnimalResponse = function (obj) {
        if (!this.playUI) {
            return;
        }
        var saveCount = obj.saveCount;
        var animalSide = obj.animalSide;
        this.playUI.getAnimal(saveCount, animalSide);
    };
    // 生成一个障碍物
    PlayManager.prototype.genBlockResponse = function (obj) {
        // console.log("生成一个障碍物 on myside :", obj.genSide, Play.DataPlay.MySide);
        this.playUI.genBlockResponse(obj.genSide, obj.row);
    };
    PlayManager.prototype.newRound = function (newRoundS2C) {
        this.playUI.newRound();
    };
    PlayManager.prototype.onReadyResponse = function (playReady) {
        this.playUI.onReadyResponse();
    };
    PlayManager.prototype.onBack = function () {
        this.bGameOver = false;
        this.playUI = null;
        this.isOpponentLeave = null;
        this.invisibleRequest();
        GamePersist_1.default.INSTANCE.loadScene("home");
    };
    // 使自己不可见
    PlayManager.prototype.invisibleRequest = function () {
        var invisibleMsg = new ProtoSectionRoom_1.RoomInvisibleC2S();
        NetUtil_1.default.SendMsg(invisibleMsg);
    };
    PlayManager.prototype.newPhase = function (newPhase) {
        Modules_1.Play.DataPlay.Phase = newPhase.phaseId;
    };
    PlayManager.prototype.startPve = function (startPveS2C) {
        switch (PlayManager.INSTANCE.PveEnterType) {
            case 0: //new game
                if (window['Partner'].energyTest() || startPveS2C.started == 1) {
                    this.LevelChooseUI.enterPveGame();
                }
                else {
                    this.PlayUIPve.showEnergyEmpty(1);
                }
                break;
            case 1: //next Level
                if (window['Partner'].energyTest() || startPveS2C.started == 1) {
                    this.PlayUIPve.loadGame();
                }
                else {
                    this.PlayUIPve.showEnergyEmpty(1);
                }
                break;
            case 2: //continue
            // if (Partner.energyTest() || startPveS2C.started == 1) {
            //   this.PlayUIPve.playAgain();
            // } else {
            //   this.PlayUIPve.showEnergyEmpty(1);
            // }
            case 3: //restart game
                if (window['Partner'].energyTest() || startPveS2C.started == 1) {
                    this.PlayUIPve.playAgain();
                }
                else {
                    this.PlayUIPve.showEnergyEmpty(1);
                }
                break;
        }
    };
    // 准备好
    PlayManager.prototype.onContinueResponse = function (playContinue) {
        // 如果对方已经离开
        if (this.isOpponentLeave) {
            return;
        }
        var continueList = playContinue.continueList;
        var cnt = continueList.length;
        if (cnt < 1) {
            return;
        }
        // 大于1代表两人都同意
        if (cnt > 1) {
            // this.selfRequestContinueBtn.interactable = false;
            // this.opponentRequestContinueBtn.interactable = false;
            // this.returnBtn.interactable = false;
            // this.setContinueBtnText("双方同意再来一战");
            this.makeConfirmRequest();
            this.didOneMorePlayStart();
            return;
        }
        // 等于1代表只有一方同意
        var continuePlaymateId = continueList[0];
        if (continuePlaymateId === Modules_1.Play.DataPlay.OpponentId) {
            if (this.playUI) {
                this.playUI.setContinueBtn(2);
            }
            // this.setContinueBtnText("对方请求再来一局");
            // this.switchButtonState(ButtonType.kkOpponentRequestContinue);
        }
        else {
            // this.continueBtn.interactable = false;
            // this.setContinueBtnText("等待对方同意");
            // this.switchButtonState(ButtonType.kkWaitOpponent);
            if (this.playUI) {
                this.playUI.setContinueBtn(4);
            }
        }
    };
    // 进行比赛确认
    PlayManager.prototype.makeConfirmRequest = function () {
        var confirmC2S = new ProtoSectionRoom_1.RoomPlayConfirmC2S();
        NetUtil_1.default.SendMsg(confirmC2S);
    };
    // 再来一局开始已经确认开始
    PlayManager.prototype.didOneMorePlayStart = function () {
        this.playUI.didOneMorePlay();
    };
    // 再来一局开始
    PlayManager.prototype.onOneMorePlayStart = function (roomId) {
        // 确认当前是PlayUI
        if (!this.playUI) {
            cc.warn("room:" + roomId + " playui not exist when one more play");
            return;
        }
        // 确认是同一个房间
        if (Modules_1.Play.DataPlay.CurRoomId !== roomId) {
            return;
        }
        this.bGameOver = false;
        this.playUI.onOneMorePlay();
    };
    PlayManager.prototype.onOpponentLeave = function () {
        this.isOpponentLeave = true;
        this.playUI.setContinueBtn(3);
    };
    // 一局结束 加载结算页面
    PlayManager.prototype.onPlayFinish = function (playResult) {
        this.playUI.onPlayFinish(playResult);
    };
    // 确认进入房间
    PlayManager.prototype.readyRequest = function () {
        var readyMsg = new ProtoSectionPlay_1.PlayReadyC2S();
        readyMsg.roomId = Modules_1.Home.DataRoom.currentRoom;
        NetUtil_1.default.SendMsg(readyMsg);
    };
    // 一方使用了道具
    PlayManager.prototype.onActiveBuff = function (data) {
        if (data.effected) {
            this.playUI.onActiveBuff(data);
        }
    };
    // 偷取宠物
    PlayManager.prototype.onStolenAnimal = function (data) {
        this.playUI.onStolenAnimal(data);
    };
    // 棋盘上的宠物
    PlayManager.prototype.onBoardStatusResponse = function (data) {
        this.playUI.onBoardStatusResponse(data);
    };
    return PlayManager;
}());
exports.default = PlayManager;

cc._RF.pop();