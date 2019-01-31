import {
  PlayReadyC2S,
  PlaySaveAnimalC2S,
  PlaySaveAnimalS2C,
  PlayNewRoundS2C,
  PlayContinueS2C,
  PlayReadyS2C,
  PlayNewPhaseS2C,
  PlayPvpFinishC2S, PlayStartPveS2C, PlayGenBlockS2C, PlayActiveBuffS2C, PlayStolenAnimalS2C, PlayBoardStatusS2C
} from "../../common/net/proto/mods/ProtoSectionPlay";
import { RoomPlayFinishS2C, RoomPlayConfirmC2S, RoomInvisibleC2S } from "../../common/net/proto/mods/ProtoSectionRoom";
import NetUtil from "../../common/net/NetUtil";
import { Play, Home } from "../../module/Modules";
import HomeManager from "../page/home/HomeManager";
import { OpenHomeFrom } from "../../common/Defines";
import * as Modules from "../../module/Modules";
import PlayUIPve from "./pve/PlayUIPve";
import GamePersist from "../../common/persist/GamePersist";
import PlayUI from "./pvp/PlayUI";
import LevelChoose from "../levelChoose/LevelChoose";


export default class PlayManager {
  private static singleInstance: PlayManager;

  public confirmEnterRoom: boolean = false;
  public bGameOver: boolean = false;

  public static get INSTANCE() {
    if (!this.singleInstance) {
      this.singleInstance = new PlayManager();
    }
    return this.singleInstance;
  }

  private isOpponentLeave;

  public get IsOpponentLeave() {
    return this.isOpponentLeave;
  }

  private playUI: PlayUI;
  public set PlayUI(value: PlayUI) {
    this.playUI = value;
  }
  public get PlayUI(): PlayUI {
    return this.playUI;
  }

  private playUIPve: PlayUIPve;
  public set PlayUIPve(value: PlayUIPve) {
    this.playUIPve = value;
  }
  public get PlayUIPve(): PlayUIPve {
    return this.playUIPve;
  }

  private pveEnterType: number;
  public set PveEnterType(value: number) {
    this.pveEnterType = value;
  }
  public get PveEnterType(): number {
    return this.pveEnterType;
  }

  private levelChoose: LevelChoose;
  public set LevelChooseUI(value: LevelChoose) {
    this.levelChoose = value;
  }
  public get LevelChooseUI(): LevelChoose {
    return this.levelChoose;
  }

  // 收集到动物请求
  public getAnimalRequest(roundId: number, slotIndex: number) {
    const msg = new PlaySaveAnimalC2S();
    NetUtil.SendMsg(msg);
  }

  public onPvpFinish(maxMatchCount) {
    const msg = new PlayPvpFinishC2S();
    msg.matchOnce = maxMatchCount;
    NetUtil.SendMsg(msg);
  }

  // 收集到动物返回
  public getAnimalResponse(obj: PlaySaveAnimalS2C) {
    if (!this.playUI) {
      return;
    }
    const saveCount = obj.saveCount;
    const animalSide = obj.animalSide;
    this.playUI.getAnimal(saveCount, animalSide);
  }

  // 生成一个障碍物
  public genBlockResponse(obj: PlayGenBlockS2C) {
    // console.log("生成一个障碍物 on myside :", obj.genSide, Play.DataPlay.MySide);
    this.playUI.genBlockResponse(obj.genSide, obj.row);
  }

  public newRound(newRoundS2C: PlayNewRoundS2C) {
    this.playUI.newRound();
  }
  public onReadyResponse(playReady: PlayReadyS2C) {
    this.playUI.onReadyResponse();
  }

  public onBack() {
    this.bGameOver = false;
    this.playUI = null;
    this.isOpponentLeave = null;
    this.invisibleRequest();
    GamePersist.INSTANCE.loadScene("home");
  }
  // 使自己不可见
  public invisibleRequest() {
    const invisibleMsg = new RoomInvisibleC2S();
    NetUtil.SendMsg(invisibleMsg);
  }
  public newPhase(newPhase: PlayNewPhaseS2C) {
    Play.DataPlay.Phase = newPhase.phaseId;
  }

  public startPve(startPveS2C: PlayStartPveS2C) {
    switch (PlayManager.INSTANCE.PveEnterType) {
      case 0: //new game
        if (window['Partner'].energyTest() || startPveS2C.started == 1) {
          this.LevelChooseUI.enterPveGame();
        } else {
          this.PlayUIPve.showEnergyEmpty(1);
        }
        break;
      case 1: //next Level
        if (window['Partner'].energyTest() || startPveS2C.started == 1) {
          this.PlayUIPve.loadGame();
        } else {
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
        } else {
          this.PlayUIPve.showEnergyEmpty(1);
        }
        break;
    }

  }

  // 准备好
  public onContinueResponse(playContinue: PlayContinueS2C) {
    // 如果对方已经离开
    if (this.isOpponentLeave) {
      return;
    }
    const continueList: number[] = playContinue.continueList;
    const cnt = continueList.length;
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
    const continuePlaymateId = continueList[0];
    if (continuePlaymateId === Play.DataPlay.OpponentId) {
      if (this.playUI) {
        this.playUI.setContinueBtn(2);
      }
      // this.setContinueBtnText("对方请求再来一局");
      // this.switchButtonState(ButtonType.kkOpponentRequestContinue);
    } else {
      // this.continueBtn.interactable = false;
      // this.setContinueBtnText("等待对方同意");
      // this.switchButtonState(ButtonType.kkWaitOpponent);
      if (this.playUI) {
        this.playUI.setContinueBtn(4);
      }
    }
  }
  // 进行比赛确认
  private makeConfirmRequest() {
    const confirmC2S = new RoomPlayConfirmC2S();
    NetUtil.SendMsg(confirmC2S);
  }
  // 再来一局开始已经确认开始
  public didOneMorePlayStart() {
    this.playUI.didOneMorePlay();
  }
  // 再来一局开始
  public onOneMorePlayStart(roomId: number) {
    // 确认当前是PlayUI
    if (!this.playUI) {
      cc.warn(`room:${roomId} playui not exist when one more play`);
      return;
    }
    // 确认是同一个房间
    if (Play.DataPlay.CurRoomId !== roomId) {
      return;
    }

    this.bGameOver = false;
    this.playUI.onOneMorePlay();
  }


  public onOpponentLeave() {
    this.isOpponentLeave = true;
    this.playUI.setContinueBtn(3);
  }

  // 一局结束 加载结算页面
  public onPlayFinish(playResult: RoomPlayFinishS2C) {
    this.playUI.onPlayFinish(playResult);
  }

  // 确认进入房间
  public readyRequest() {
    const readyMsg = new PlayReadyC2S();
    readyMsg.roomId = Home.DataRoom.currentRoom;

    NetUtil.SendMsg(readyMsg);
  }

  // 一方使用了道具
  onActiveBuff(data: PlayActiveBuffS2C) {
    if (data.effected) {
      this.playUI.onActiveBuff(data);
    }
  }

  // 偷取宠物
  onStolenAnimal(data: PlayStolenAnimalS2C) {
    this.playUI.onStolenAnimal(data);
  }

  // 棋盘上的宠物
  onBoardStatusResponse(data: PlayBoardStatusS2C) {
    this.playUI.onBoardStatusResponse(data);
  }

}
