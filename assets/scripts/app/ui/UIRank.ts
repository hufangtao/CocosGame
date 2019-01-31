import { Message } from "../common/Message";
import { Home, Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import { ValueKey } from "../common/Defines";
import NetUtil from "../common/net/NetUtil";
import { RankPlayStarC2S } from "../common/net/proto/mods/ProtoSectionRank";
import RankTopThreePlayer from "../component/page/home/prefab/RankTopThreePlayer";
import SocialManager from "../common/social/SocialManager";
import * as Misc from "../common/Misc";
import * as ConfigVO from "../common/config/vo/ConfigVO";
import { DYNotify } from "../../dyGame/DYNotify";
import {PStarRank} from "../common/net/proto/ProtoType";

const { ccclass, property } = cc._decorator;

enum kkRankType {
  Friend = 1,
  Global,
}

@ccclass
export default class UIRank extends cc.Component {

  public static GetComponent(node: cc.Node): UIRank {
    return node.getComponent(UIRank);
  }

  @property(cc.Node)
  private nodeGlobalContainer: cc.Node = null;   // 全服排行榜容器

  @property(cc.Node)
  private pGlobalFirstNode: cc.Node = null;
  @property(cc.Node)
  private pGlobalSecondNode: cc.Node = null;
  @property(cc.Node)
  private pGlobalThirdNode: cc.Node = null;

  @property(cc.Node)
  private pGlobalRankList: cc.Node = null;  // 全服排行list面板

  @property(cc.Node)
  private pInRankNode: cc.Node = null;     // 在排名中

  @property(cc.Label)
  private textGlobalRankPos: cc.Label = null; // 上榜榜次

  @property(cc.Node)
  private textOutsideGlobalRank: cc.Node = null; // 未上榜提示


  @property(cc.Label)
  private pNobodyLabel: cc.Label = null;      // 没有内容时的提示

  @property(cc.Node)
  private nodNotSupport: cc.Node = null;    // 不支持的功能

  @property(cc.Node)
  private nodFriendRank: cc.Node = null;

  private rankType: kkRankType;

  isShowFriendRank = false;

  public onLoad() {
    DYNotify.regObserver(Message.UIRankUpdate, this.onNotify, this);
  }

  public init() {
    this.requestRankData();
    if (window['Partner'].supportSocialFriend() && window["wx"]) {
      this.initDisplay();
    }

  }

  onEnable(){
  }

  onDisable() {
    this.isShowFriendRank = false;
    DYNotify.removeAllObservers(this);
  }

  initDisplay() {
    var openDataContext = window["wx"].getOpenDataContext();
    var sharedCanvas = openDataContext.canvas;
    sharedCanvas.width = 720;
    sharedCanvas.height = 1280;
  }

  public onDestroy() {
    Home.DataRank.GlobalRankData = null;
  }

  // 关闭当前页面
  public closeLayerBtn() {
    GamePersist.INSTANCE.btnAudio_2();
    GamePersist.INSTANCE.panelFadeOut(this.node, () => {
      this.node.active = false;
      this.node.destroy();
      this.showHomeAd();
    });
  }

  showHomeAd() {
    if (window['Partner'].supportAd()) {
      window['Partner'].showHomeAd();
    }
  }

  // 好友和全服排行切换按钮
  public radioButtonClicked(toggle: cc.Toggle, customEventData: string) {
    GamePersist.INSTANCE.btnAudio_1();
    if (customEventData === "2") {
      this.showFriendRank();
    } else if (customEventData === "1") {
      if (Home.DataRank.GlobalRankData && Home.DataRank.GlobalRankData.length > 0) {
        this.showGlobalRank();
      } else {
        this.requestRankData();
      }
    }
  }

  // 查看好友排行
  public showFriendRank() {
    if (this.rankType === kkRankType.Friend) {
      return;
    }
    this.rankType = kkRankType.Friend;

    this.hideGlobalRank();
    // 是否支持好友排行榜
    if (!window['Partner'].supportSocialFriend()) {
      this.showNotSupport();
      return;
    }

    // qqplay 排行榜特殊处理
    if (window['Partner'].PARTNER_NAME == 'qqplay') {
      window['Partner'].getRankList(this.showFriendDateRank.bind(this));
      return;
    }
    //qqplay 排行榜特殊处理

    window['Partner'].postMsg(2, { valuekey: ValueKey.gameRate });

    this.nodFriendRank.active = true;
    this.isShowFriendRank = true;
  }

public showFriendDateRank(data){
    console.log("enter friend data rank==============================");
    console.log("  ===================data11:" + JSON.stringify(data));
    var friendData = new Array();
    for (var i = 0; i < data.data.ranking_list.length; ++i) {
        var rd = data.data.ranking_list[i];
        const obj = new PStarRank();
        obj.id = 1;
        obj.name = rd.nick;
        obj.headImg = rd.url + "?aa=aa.jpg";
        obj.sex = 1;
        obj.star = parseInt(rd.score / 10000 + "");
        obj.rateOfWin = (rd.score % 10000) / 100;
        friendData.push(obj);
        if (rd.selfFlag) {
            Home.DataRank.FriendRankMyRank = i + 1;
        }
    }
    Home.DataRank.FriendRankData = friendData;
    console.log("  ===================data22:" + JSON.stringify(Home.DataRank.FriendRankData));
    this.rankType = kkRankType.Friend;

    this.nodFriendRank.active = false;
    this.nodNotSupport.active = false;
    this.nodeGlobalContainer.active = true;

    // 没有玩家时
    const vecRankData = Home.DataRank.FriendRankData;
    if (!vecRankData || vecRankData.length <= 0) {
        this.showNobody();
        return;
    }

    // 获取list内容节点,如果节点数>0，就暴利认为已经加载过
    const pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
    const nChildCount: number = pListConetn.childrenCount;
    if (nChildCount > 0) {
      console.log("nChildCount > 0 ==============================");
        pListConetn.removeAllChildren();
    }

    this.fillGlobalRank();
    // 自己的信息
    this.myRankInfo(kkRankType.Friend);
}

  // 通知进行隐藏
  public hideMirrorRank() {
    const domainMsg: any = {};
    domainMsg.name = "HideRank";
    window['Partner'].sendDomainMsg(domainMsg);
  }

  // 通知进行关闭
  public closeMirrorRank() {
    // const domainMsg: any = {};
    // domainMsg.name = "CloseRank";
    // Partner.sendDomainMsg(domainMsg);
  }

  // 查看全服排行
  public showGlobalRank(): void {
    if (this.rankType === kkRankType.Global) {
      return;
    }
    this.rankType = kkRankType.Global;

    this.hideFriendRank();
    this.nodNotSupport.active = false;
    this.nodeGlobalContainer.active = true;

    // 没有玩家时
    const vecRankData = Home.DataRank.GlobalRankData;
    if (!vecRankData || vecRankData.length <= 0) {
      this.showNobody();
      return;
    }

    // 获取list内容节点,如果节点数>0，就暴利认为已经加载过
    const pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
    const nChildCount: number = pListConetn.childrenCount;
    if (nChildCount > 0) {
      pListConetn.removeAllChildren();
    }

    this.fillGlobalRank();
    // 自己的信息
    this.myRankInfo(kkRankType.Global);
  }

  // 请求数据
  public requestRankData() {
    GamePersist.INSTANCE.ForceWaiting();
    const rankDataReq = new RankPlayStarC2S();
    rankDataReq.posStart = 1;
    rankDataReq.posEnd = 50;
    NetUtil.SendMsg(rankDataReq);
  }

  // 返回数
  public onReceiveRankData() {
    GamePersist.INSTANCE.CancelWaiting();
    this.showGlobalRank();
  }

  private fillGlobalRank() {
    console.log("enter fill in global rank============================");
    let rankList = Home.DataRank.GlobalRankData;
    if (this.rankType == kkRankType.Friend) {
        rankList = Home.DataRank.FriendRankData;
    }
    console.log("  ===================data:" + rankList.length + "========" + JSON.stringify(rankList));
    this.getComponent('ListView').showRank(rankList);
    // 前3名
    let topThree: number = 0;
    for (let i = 0; i < rankList.length; i++) {
        console.log("set rank===============================");
      const rankIdx = i + 1;
      topThree = rankIdx;
      if (rankIdx === 1) {
        const firstPlayer = RankTopThreePlayer.GetComponent(this.pGlobalFirstNode);
        firstPlayer.setRankPlayer(rankList[i]);
        console.log("first set rank");
      } else if (rankIdx === 2) {
        const secondPlayer = RankTopThreePlayer.GetComponent(this.pGlobalSecondNode);
        secondPlayer.setRankPlayer(rankList[i]);
          console.log("secondPlayer set rank");
      } else if (rankIdx === 3) {
        const thirdPlayer = RankTopThreePlayer.GetComponent(this.pGlobalThirdNode);
        thirdPlayer.setRankPlayer(rankList[i]);
          console.log("thirdPlayer set rank");
      } else {
        break;
      }
    }
    topThree = topThree + 1;
    for (topThree; topThree <= 3; topThree++) {
      if (topThree === 1) {
        const firstPlayer = RankTopThreePlayer.GetComponent(this.pGlobalFirstNode);
        firstPlayer.setEmpty();
          console.log("first set setEmpty");
      } else if (topThree === 2) {
        const secondPlayer = RankTopThreePlayer.GetComponent(this.pGlobalSecondNode);
        secondPlayer.setEmpty();
          console.log("secondPlayer set setEmpty");
      } else if (topThree === 3) {
        const thirdPlayer = RankTopThreePlayer.GetComponent(this.pGlobalThirdNode);
        thirdPlayer.setEmpty();
          console.log("thirdPlayer set setEmpty");
      }
    }

    const pListConetn: cc.Node = cc.find("rank_list/view/content", this.pGlobalRankList);
    if (!pListConetn) {
      cc.error("can't find rank list content");
      return;
    }
  }

  // 自己的排行
  private myRankInfo(type: kkRankType): void {
    let myRankPos: number = Home.DataRank.MyRank || 0;
    if (this.rankType == kkRankType.Friend) {
        myRankPos = Home.DataRank.FriendRankMyRank || 0;
    }
    // 榜次
    if (myRankPos === 0) {
      // 显示未上榜
      this.textOutsideGlobalRank.active = true;
      this.pInRankNode.getChildByName("randNumBg_sp").active = false;
    } else {
      this.textGlobalRankPos.string = `${myRankPos}`;
    }
    // 名字
    const pNameLabel = this.pInRankNode.getChildByName("name_label").getComponent(cc.Label);
    pNameLabel.string = Play.DataPlay.MyName;
    // 段位
    const myStar = Home.DataPlayer.FortuneStar;
    const StarNum = Misc.calcShowStarCount(myStar);
    const pGradeLabel = this.pInRankNode.getChildByName("grade_label").getComponent(cc.Label);
    pGradeLabel.string = Misc.getGradeName(myStar) + " " + StarNum + "星";

    // 胜率
    const pRateofWinLabel = this.pInRankNode.getChildByName("winrate_label").getComponent(cc.Label);
    if (Home.DataPlayer.PlayCntTotal === 0) {
      pRateofWinLabel.string = "0";
    } else {
      const winPercent = Home.DataPlayer.PlayCntWin / Home.DataPlayer.PlayCntTotal;
      pRateofWinLabel.string = Misc.formatPercent(winPercent);
    }
  }

  // 没有人上榜
  private showNobody() {
    this.nodeGlobalContainer.active = false;
    this.pNobodyLabel.node.active = true;
  }

  private showNotSupport() {
    this.nodeGlobalContainer.active = false;
    this.pNobodyLabel.node.active = false;
    this.nodNotSupport.active = true;
  }


  private hideGlobalRank() {
    this.nodeGlobalContainer.active = false;
  }

  private hideFriendRank() {
    this.nodFriendRank.active = false;
    this.isShowFriendRank = false;
  }

  private gatherHonorConf(): any {
    const honorConf: any = {};
    const rangeList: any[] = ConfigVO.Honor.getExtra("range");
    honorConf.range = rangeList;
    const honorNameMap: any = {};
    for (let i = 0; i < rangeList.length; i++) {
      const range: number[] = rangeList[i];
      const honorId = range[0];
      const sysHonor: ConfigVO.IHonorVO = ConfigVO.Honor.get(honorId);
      const honorName = sysHonor.name;
      honorNameMap[honorId] = honorName;
    }
    honorConf.name = honorNameMap;
    const maxStarList: number[] = ConfigVO.Honor.getExtra("max_star");
    const maxStar = maxStarList[0];
    honorConf.maxStar = maxStar;
    return honorConf;
  }

  // 分享按钮
  public shareBtn(): void {
    GamePersist.INSTANCE.btnAudio_1();
    const param = SocialManager.INSTANCE.makeFlauntParam();
    window['Partner'].doFlaunt(param, function () {

    });
  }

  // 广告
  public showAdBtn(): void {
    GamePersist.INSTANCE.btnAudio_1();
    if (window['Partner'].supportAd()) {
      window['Partner'].initVideoAd(function () {
        window['Partner'].videoAd = null;
      });
      window['Partner'].showVideoAd();
    } else {

    }
  }

  private onNotify(target, tag, param) {
    var self = target;
    if (tag == Message.UIRankUpdate) {
      self.onReceiveRankData();
    }
  }
}
