import { Home, Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import { Event_type } from "../component/game/PlayDefine";
import { UIFunc } from "../common/UIFunc";
import { RoomInviterS2C, RoomInviterC2S, RoomPlayWithC2S, RoomPlayWithS2C, RoomPlayConfirmC2S, RoomInviteRequestC2S } from "../common/net/proto/mods/ProtoSectionRoom";
import HomeManager from "../component/page/home/HomeManager";
import PlaymateHead from "../component/prefab/PlaymateHead";
import { RoomDispatcher } from "../common/net/proto/ProtoDispatcher";
import * as Misc from "../common/Misc";
import { DYNotify } from "../../dyGame/DYNotify";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIInviteFriend extends cc.Component {

  private static INVITE_WAITING: number = 1;
  private static INVITE_CREATE: number = 2;
  private static INIVTE_CLOSE: number = 3;

  @property(cc.Node)
  nodMyInfo: cc.Node = null;
  @property(cc.Node)
  nodOpponentInfo: cc.Node = null;
  @property(cc.Node)
  nodNoOpponent: cc.Node = null;

  @property(PlaymateHead)
  myPlayMateHead: PlaymateHead = null;
  @property(PlaymateHead)
  opponentPlayMateHead: PlaymateHead = null;

  @property(cc.Button)
  private btnStartPlay: cc.Button = null;

  @property(cc.Button)
  private btnCloseInvite: cc.Button = null;
  @property(cc.Button)
  private btnNewInvite: cc.Button = null;
  @property(cc.Button)
  private btnBack2: cc.Button = null;
  @property(cc.RichText)
  private labButton: cc.RichText = null;
  @property(cc.RichText)
  private labTip: cc.RichText = null;

  @property(cc.SpriteFrame)
  private spfMale: cc.SpriteFrame = null;
  @property(cc.SpriteFrame)
  private spfFemale: cc.SpriteFrame = null;

  inviteeId;
  inviterParam;
  inviteStatus
  public onEnable() {
    DYNotify.regObserver(Event_type.GAMESTART, this.onNotify, this);
    this.nodOpponentInfo.active = false;
    this.nodNoOpponent.active = true;
    this.initMyInfo();
    this.labTip.string = '<b>' + '好友正在赶来的路上...' + '</b>';
    this.labButton.string = '<b>' + '开始游戏' + '</b>';
    this.btnStartPlay.interactable = false;
    this.btnNewInvite.node.active = true;
    this.btnBack2.node.active = false;
  }

  private onNotify(target, tag, param) {
    var self = target;
    if (tag == Event_type.GAMESTART) {
      self.loadGameScene();
    }
  }
  loadGameScene() {
    cc.audioEngine.stopAll();

    cc.log('loadGameScene');

    cc.director.preloadScene('game', () => {
      setTimeout(() => {
        cc.director.loadScene('game');
        UIFunc.closeUI('UIInviteFriend', () => { });
      }, 50);
    });
  }
  onDisable() {
    this.inviteeId = null;
    DYNotify.removeAllObservers(this);
  }
  public start() {

  }

  public set InviteStatus(val: number) {
    if (this.inviteStatus === val) {
      return;
    }
    const prevStatus = this.inviteStatus;
    this.inviteStatus = val;
    this.switchNodeActive();
  }

  private switchNodeActive() {
    if (this.inviteStatus === UIInviteFriend.INIVTE_CLOSE) {
      this.btnBack2.node.active = true;;
      this.labButton.string = '<b>' + '房间关闭' + '</b>';
      this.labTip.string = '<b>' + '房间关闭' + '</b>';
      this.btnStartPlay.interactable = false;
      this.btnNewInvite.node.active = false;
      this.clearOpponentInfo();
    }
  }

  initMyInfo() {
    this.myPlayMateHead.HeadUrl = Home.DataPlayer.MyHeadUrl;
    this.nodMyInfo.getChildByName('name').getComponent(cc.Label).string = Home.DataPlayer.MyName;

    const nStarNum: number = Home.DataPlayer.FortuneStar;
    const honerId: number = Misc.calcHonorId(nStarNum);
    cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, (err, spriteFrame) => {
      this.nodMyInfo.getChildByName('rank').getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    if (Home.DataPlayer.MySex == 1) {
      this.nodMyInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfMale;
    } else {
      this.nodMyInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfFemale;
    }
  }
  setOpponentInfo() {
    this.nodOpponentInfo.active = true;
    this.nodNoOpponent.active = false;
    this.opponentPlayMateHead.HeadUrl = Play.DataPlay.OpponentHeadUrl;
    this.nodOpponentInfo.getChildByName('name').getComponent(cc.Label).string = Play.DataPlay.OpponentName;

    const nStarNum: number = Home.DataRoom.opponentPlaymate.star;
    const honerId: number = Misc.calcHonorId(nStarNum);
    cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, (err, spriteFrame) => {
      this.nodOpponentInfo.getChildByName('rank').getComponent(cc.Sprite).spriteFrame = spriteFrame;
    });

    if (Home.DataRoom.opponentPlaymate.sex == 1) {
      this.nodOpponentInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfMale;
    } else {
      this.nodOpponentInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfFemale;
    }
  }
  clearMyInfo() {
    this.nodMyInfo.active = false;
  }
  clearOpponentInfo() {
    this.nodOpponentInfo.active = false;
    this.nodNoOpponent.active = true;
  }

  // 设置邀请者的参数
  public makeInivterInfoRequest(inviterParam: string) {
    // 不是被邀请者 不应该触发此处的逻辑
    if (this.inviteeId !== Home.PlayerId) {
      return;
    }

    this.inviterParam = inviterParam;
    RoomDispatcher.on(RoomInviterS2C.EVENT_NAME, this.onReciveInviterInfo, this);
    const roomInviter = new RoomInviterC2S();
    roomInviter.inviterParam = inviterParam;
    NetUtil.SendMsg(roomInviter);
  }

  // 收到邀请者的信息
  private onReciveInviterInfo(data) {
    const inviter: RoomInviterS2C = data;
    if (inviter.inviterParam !== this.inviterParam) {
      return;
    }
    RoomDispatcher.off(RoomInviterS2C.EVENT_NAME, this.onReciveInviterInfo, this);
    const opponentPlaymate = inviter.playmate;
    // this.showHeadImg(this.nodeOpponentHead, opponentPlaymate.id, opponentPlaymate.headImg);
    if (Home.DataPlayer.MyId === opponentPlaymate.id) {
      cc.log('这是我分享的链接');
      UIFunc.closeUI('UIInviteFriend', () => { 
        HomeManager.INSTANCE.showHomeAd();
      });
      return;
    }
    Home.DataRoom.opponentPlaymate = opponentPlaymate;

    this.setOpponentInfo();
    this.makePlayWithRequest(inviter.inviterParam);
  }

  // 请求和邀请者进行对战
  private makePlayWithRequest(inviterParam: string) {
    const playWith = new RoomPlayWithC2S();
    playWith.inviteeParam = inviterParam;
    NetUtil.SendMsg(playWith);
    RoomDispatcher.on(RoomPlayWithS2C.EVENT_NAME, this.onPlayWithReceived, this);
  }

  // 接受邀请的请求被处理
  // 如果房间Id为0 表示房间已经关闭
  // 如果房间Id不为0 则进行确认 等待邀请者确认后开始比赛
  private onPlayWithReceived(data) {
    cc.log('onPlayWithReceived');
    RoomDispatcher.off(RoomPlayWithS2C.EVENT_NAME, this.onPlayWithReceived, this);
    const playWith: RoomPlayWithS2C = data;
    if (playWith.roomId > 0) {
      console.log("play with room:", playWith.roomId);
    } else {
      this.InviteStatus = UIInviteFriend.INIVTE_CLOSE;
    }
  }

  // 比赛创建
  public onPlayCreate() {
    cc.log('onPlayCreate');
    this.InviteStatus = UIInviteFriend.INVITE_CREATE;
    // this.waitingTipsLabel.node.active = false;
    this.labTip.string = '<b>' + '等待开始...' + '</b>';

    if (this.inviteeId === Home.PlayerId) {
      // 如果当前的玩家是被邀请者 则自动确认
      this.makeConfirmRequest();
      this.btnNewInvite.node.active = false;
      this.btnStartPlay.interactable = false;
      this.btnBack2.node.active = false;
      this.labButton.string = '<b>' + '等待开始' + '</b>';
    } else {
      this.labButton.string = '<b>' + '开始游戏' + '</b>';
      this.btnStartPlay.interactable = true;
      this.btnNewInvite.node.active = false;
      this.setOpponentInfo();
    }
  }
  private makeConfirmRequest() {
    const confirm = new RoomPlayConfirmC2S();
    NetUtil.SendMsg(confirm);
  }
  // 返回大厅 取消邀请
  public onCloseInvitePage() {
    HomeManager.INSTANCE.hideHomeAd();
    GamePersist.INSTANCE.btnAudio_1();
    HomeManager.INSTANCE.makeInvisibleRequest();
    UIFunc.closeUI('UIInviteFriend', () => {
      HomeManager.INSTANCE.UIInviteFriend = null;
      HomeManager.INSTANCE.showHomeAd();
    });
  }
  public onOpponentLeave(playmateId: number) {
    // GamePersist.INSTANCE.Toast("对方离开");

    if (this.inviteeId === Home.PlayerId) {
      // 被邀请者进入房间关闭状态
      this.InviteStatus = UIInviteFriend.INIVTE_CLOSE;
      this.btnBack2.node.active = true;;
      this.labButton.string = '<b>' + '房间关闭' + '</b>';
      this.labTip.string = '<b>' + '房间关闭' + '</b>';
      this.btnStartPlay.interactable = false;
      this.clearOpponentInfo();
    } else {
      // 邀请者进入等待状态
      this.InviteStatus = UIInviteFriend.INVITE_WAITING;
      this.btnNewInvite.node.active = true;
      this.btnStartPlay.interactable = false;
      this.labButton.string = '<b>' + '开始游戏' + '</b>';
      this.labTip.string = '<b>' + '对方离开' + '</b>';
      this.clearOpponentInfo();
    }
  }
  // 开始游戏
  private onStartPlay() {
    GamePersist.INSTANCE.btnAudio_1();
    this.makeConfirmRequest();
  }
  private handleNewInvite() {
    GamePersist.INSTANCE.btnAudio_1();
    const inviteReq = new RoomInviteRequestC2S();
    NetUtil.SendMsg(inviteReq);
  }
  public btnListener(event: cc.Event.EventTouch) {
    var target = event.target;
    switch (target.name) {
      case 'btnBack2':
      case 'btnBack':
        this.onCloseInvitePage();
        break;
      case 'btnStartGame':
        GamePersist.INSTANCE.blockInput();
        this.onStartPlay();
        break;
      case 'btnInvite':
        this.handleNewInvite();
        break;
    }
  }
}
