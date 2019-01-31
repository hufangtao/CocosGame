import { BuffDispatcher, PlayerDispatcher, GoodsDispatcher, SignInDispatcher } from "../../../common/net/proto/ProtoDispatcher";
import {
  PlayerSelfInfoS2C,
  PlayerFortuneS2C,
  PlayerPlayStatS2C,
  PlayerPveStatS2C,
  PlayerShareGameS2C
} from "../../../common/net/proto/mods/ProtoSectionPlayer";
import HomeManager from "./HomeManager";
import GamePersist from "../../../common/persist/GamePersist";
import { ProtoSection } from "../../../common/net/proto/ProtoReflect";
import { IProtoError } from "../../../common/Defines";
import { Home } from "../../../module/Modules";
import { BuffBuffStatusS2C } from "../../../common/net/proto/mods/ProtoSectionBuff";
import { GoodsPullS2C, GoodsUpdateS2C } from "../../../common/net/proto/mods/ProtoSectionGoods";
import { PGoods, PPveStat } from "../../../common/net/proto/ProtoType";
import { DYNotify } from "../../../../dyGame/DYNotify";
import { Message } from "../../../common/Message";
import { SignInSignListS2C, SignInSignS2C } from "../../../common/net/proto/mods/ProtoSectionSignIn";

export default class PlayerNetHandler {
  constructor() {
    PlayerDispatcher.on(PlayerSelfInfoS2C.EVENT_NAME, this.onSelfInfo, this);
    PlayerDispatcher.on(PlayerFortuneS2C.EVENT_NAME, this.onFortune, this);
    PlayerDispatcher.on(PlayerPlayStatS2C.EVENT_NAME, this.onPlayStat, this);
    PlayerDispatcher.on(PlayerPveStatS2C.EVENT_NAME, this.onPveStat, this);
    PlayerDispatcher.on(PlayerShareGameS2C.EVENT_NAME, this.onShare, this);

    BuffDispatcher.on(BuffBuffStatusS2C.EVENT_NAME, this.onBuffStatus, this);

    GamePersist.INSTANCE.OnProtoError(ProtoSection.player, this.onProtoError, this);

    SignInDispatcher.on(SignInSignListS2C.EVENT_NAME, this.onSignInSignList, this);
    SignInDispatcher.on(SignInSignS2C.EVENT_NAME, this.onSignInSign, this);
  }

  // 签到列表
  onSignInSignList(message) {
    const signInSignList: SignInSignListS2C = message;
    DYNotify.post(Message.SIGN_List,signInSignList);
  }
  // 签到列表
  onSignInSign(message) {
    const signInSign: SignInSignS2C = message;
    DYNotify.post(Message.SIGN_RESULT,signInSign);
  }

  onBuffStatus(message) {
    const buffStatus: BuffBuffStatusS2C = message;
    const slotId = buffStatus.slotId;
    const buffId = buffStatus.buffId;
    const number = buffStatus.number;
    HomeManager.INSTANCE.onBuffStatus(slotId, buffId, number);
  }

  onShare(message) {
    const share: PlayerShareGameS2C = message;
    HomeManager.INSTANCE.onReceiveShareGameS2C(share);
    DYNotify.post(Message.GET_SHARE_CNT, share);
  }

  // 处理协议统一的错误码返回
  public onProtoError(message) {
    const protoError: IProtoError = message;
    const protoErrMsg = protoError.errMsg;
    GamePersist.INSTANCE.Toast(protoErrMsg);
  }


  public onSelfInfo(message) {
    const selfInfo: PlayerSelfInfoS2C = message;
    HomeManager.INSTANCE.onReceiveSelfInfoS2C(selfInfo);
  }

  public onFortune(message) {
    const fortune: PlayerFortuneS2C = message;
    const fortuneType: number = fortune.type;
    const fortuneValue: number = fortune.val;
    HomeManager.INSTANCE.onReceiveFortune(fortuneType, fortuneValue);
  }

  public onPlayStat(message) {
    const playStat: PlayerPlayStatS2C = message;
    const playCntTotal = playStat.stat.cntTotal;
    const playCntWin = playStat.stat.cntWin;
    const saveOnce = playStat.stat.saveOnce;
    const matchOnce = playStat.stat.matchOnce;
    const pveTotal = playStat.stat.pveTotal;
    const pveWin = playStat.stat.pveWin;
    const weeklyWin = playStat.stat.pvpWinOneweek;
    const weeklyTotal = playStat.stat.pvpTotalOneweek;
    const maxSuccessiveWin = playStat.stat.maxSuccessiveWin;
    const level = playStat.stat.level;
    const guide = playStat.stat.guide;
    HomeManager.INSTANCE.onReceivePlayStat(playCntTotal, playCntWin, saveOnce, matchOnce, pveTotal, pveWin, weeklyWin, weeklyTotal, maxSuccessiveWin, level, guide);
  }

  public onPveStat(message) {
    const pveStat: PlayerPveStatS2C = message;
    const pveStatArray: PPveStat[] = pveStat.pvestat;
    // console.log(pveStatArray);
    HomeManager.INSTANCE.onReceivePveStat(pveStatArray);
  }

  // public onChatText(message) {
  //   const chatText: ChatTextS2C = message;
  // }
}
