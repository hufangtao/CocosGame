import * as Modules from "../../module/Modules";
import GamePersist from "../persist/GamePersist";
import * as Misc from "../Misc";
import { PlayerShareGameC2S } from "../net/proto/mods/ProtoSectionPlayer";
import NetUtil from "../net/NetUtil";

const { ccclass, property } = cc._decorator;
@ccclass
export default class SocialManager {
  public static get INSTANCE(): SocialManager {
    if (!SocialManager.singleInstance) {
      SocialManager.singleInstance = new SocialManager();
      SocialManager.singleInstance.init();
    }
    return SocialManager.singleInstance;
  }

  private static singleInstance: SocialManager;

  // 设置玩家的星数
  public setUserStar(star: number) {
    window['Partner'].setUserStar(star);
  }

  // 构造邀请的参数
  public makeInviteParam(serverParam: string): any {
    if (window['Partner'].PARTNER_NAME === "Dev") {
      return serverParam;
    } else if (window['Partner'].PARTNER_NAME === "Wechat") {
      const sysShare = Misc.randFlauntShare();
      const playerId = Modules.Home.DataPlayer.MyId;
      const imgUrl = window['Partner'].shareImgUrl(sysShare.img);
      return {
        imageUrl: imgUrl,
        query: "inviter=" + serverParam + "&from=" + playerId + "&time=" + GamePersist.INSTANCE.ServerTime,
        title: sysShare.title,
      };
    } else if (window['Partner'].PARTNER_NAME === "qqplay") {
        const sysShare = Misc.randFlauntShare();
        const playerId = Modules.Home.DataPlayer.MyId;
        const imgUrl = window['Partner'].shareImgUrl(sysShare.img);
        return {
            title: sysShare.title,
            summary: sysShare.title,
            isToFriend: true,
            qqImgUrl: "http://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/" + imgUrl,
            extendInfo: "inviter=" + serverParam + "&from=" + playerId + "&time=" + GamePersist.INSTANCE.ServerTime,
        };
    }
  }

  // 构造炫耀的参数
  public makeFlauntParam(): any {
    const sysShare = Misc.randFlauntShare();
    const playerId = Modules.Home.DataPlayer.MyId;
    const imgUrl = window['Partner'].shareImgUrl(sysShare.img);
    return {
      imageUrl: imgUrl,
      query: "from=" + playerId + "&time=" + GamePersist.INSTANCE.ServerTime,
      title: sysShare.title,
    };
  }

  // 构造主动分享的参数
  public makeManualParam(): any {
    const sysShare = Misc.randManualShare();
    const playerId = Modules.Home.DataPlayer.MyId;
    const imgUrl = window['Partner'].shareImgUrl(sysShare.img);
    return {
      imageUrl: imgUrl,
      query: "from=" + playerId + "&time=" + GamePersist.INSTANCE.ServerTime,
      title: sysShare.title,
    };
  }


  public init() {
    const self = this;
    window['Partner'].showShareMenu();
    window['Partner'].registerShareAppCallback(function () {
      return self.onShareApp();
    }, function () {
      var playerShareGameC2S = new PlayerShareGameC2S();
      playerShareGameC2S.reason = 1;
      NetUtil.SendMsg(playerShareGameC2S);
    });
  }

  private onShareApp() {
    const sysShare = Misc.randFlauntShare();
    const imgUrl = window['Partner'].shareImgUrl(sysShare.img);
    const playerId = Modules.Home.DataPlayer.MyId;
    return {
      imageUrl: imgUrl,
      query: "from=" + playerId + "&time=" + GamePersist.INSTANCE.ServerTime,
      title: sysShare.title,
    };
  }
}
