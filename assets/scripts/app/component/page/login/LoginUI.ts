import { AccLoginS2C } from "../../../common/net/proto/mods/ProtoSectionAcc";
import * as ConfigVO from "../../../common/config/vo/ConfigVO";
import AccManager from "./AccManager";
import BaseUI from "../../BaseUI";
import GamePersist from "../../../common/persist/GamePersist";
import ResLoader from "../../../common/loader/Loader";
import DotAnimation from "../preload/DotAnimation";
import { ProtoErrorCode } from "../../../common/net/proto/ProtoReflect";
const { ccclass, property } = cc._decorator;

@ccclass
export default class LoginUI extends BaseUI {

  @property(cc.Node)
  public nodeAccInput: cc.Node = null;

  @property(cc.Node)
  public nodeAccCreateRole: cc.Node = null;

  @property(cc.Button)
  public btnLogin: cc.Button = null;

  @property(cc.Button)
  public btnServer: cc.Button = null;

  @property(cc.Button)
  public btnReAuthorize: cc.Button = null;

  @property(cc.EditBox)
  public userAccount: cc.EditBox = null;

  public loginData;

  private loadingAnimation: DotAnimation = null;


  /*
  ================
  生命周期回调
  ================
  */

  public onLoad() {
    super.onLoad();
    this.btnLogin.node.on(cc.Node.EventType.TOUCH_END, this.handleLoginWithInput, this);
    this.btnServer.node.on(cc.Node.EventType.TOUCH_END, this.handleSelectServer, this);
    this.btnServer.node.active = false;
    this.btnReAuthorize.node.on(cc.Node.EventType.TOUCH_END, this.onReAuthorize, this);
    // if (Partner.PARTNER_NAME === "Dev") {
    //   this.btnTestWaiting.node.active = true;
    // } else {
    //   this.btnTestWaiting.node.active = false;
    // }

    //固定服务器ID
    AccManager.INSTANCE.setServerData(window['Partner'].getServerId());

    const dotAnimation = DotAnimation.NewDotAnimation();
    dotAnimation.node.parent = this.node;
    dotAnimation.node.y = (-458);
    this.loadingAnimation = dotAnimation;
  }

  public hideLoading() {
    if (this.loadingAnimation) {
      this.loadingAnimation.node.active = false;
    }
  }

  public showLoading() {
    if (this.loadingAnimation) {
      this.loadingAnimation.node.active = true;
    }
  }

  public start() {
    super.start();
    AccManager.INSTANCE.LoginUI = this;

    // 调用第三方合作商进行账号授权操作
    const self = this;
    window['Partner'].doAccAuthorize(function (data) {
      AccManager.INSTANCE.didGetAuthorize(data);
    }, function (howTo: number) {
      self.showAccInput(howTo);
    }, AccManager.INSTANCE.existSavedGameAccount());
  }

  public onDestroy() {
    AccManager.INSTANCE.LoginUI = null;
  }


  public uiName(): string {
    return "LoginUI";
  }

  public onReAuthorize() {
    // GamePersist.INSTANCE.btnAudio_1();
    const that = this;
    this.showLoading();

    // 调用第三方合作商进行账号授权操作
    window['Partner'].doAccAuthorize(function (data) {
      AccManager.INSTANCE.didGetAuthorize(data);
    }, function (howTo: number) {
      that.showAccInput(howTo);
    }, AccManager.INSTANCE.existSavedGameAccount());
  }
  // ================================================

  /*
  howTo
      0: 什么都不做
      1: 显示输入账号界面 这个仅在开发环境才会有
      2: 显示重新登录按钮 用于新触发第三方登录逻辑
  */
  public showAccInput(howTo: number) {
    if (howTo === 0) {
      this.nodeAccInput.active = false;
      this.btnReAuthorize.node.active = false;
      return;
    }

    this.hideLoading();
    if (howTo === 1) {
      this.nodeAccInput.active = true;
    } else {
      this.btnReAuthorize.node.active = true;
    }
  }

  // 使用玩家输入的账号进行登录
  public handleLoginWithInput(event: cc.Event.EventTouch) {
    GamePersist.INSTANCE.btnAudio_1();
    const account: string = this.userAccount.string;
    if (!account || account.length < 1) {
      GamePersist.INSTANCE.toast("请输入账号");
      return;
    }
    const data: any = {};
    data.openid = account;
    data.openkey = account;
    data.platform = "Dev";
    data.params = "";
    window['Partner'].didAccAuthorize(data);
  }

  public handleSelectServer(event: cc.Event.EventTouch) {
    const self = this;
    GamePersist.INSTANCE.btnAudio_1();
    GamePersist.INSTANCE.ForceWaiting();
    ResLoader.loadSingle("prefab/login/SelectServer", function (err, ss: cc.Prefab) {
      const ssNode: cc.Node = cc.instantiate(ss);
      ssNode.parent = self.node;
      ssNode.setPosition(0, 0);
      GamePersist.INSTANCE.CancelWaiting();
    });
  }

  // 显示创建角色的界面
  public showAccCreateRole() {
    const self = this;
    this.showAccInput(0);
    GamePersist.INSTANCE.ForceWaiting();
    ResLoader.loadSingle("prefab/login/AccCreateRole", function (err, prefab: cc.Prefab) {
      const nodeCreateRole: cc.Node = cc.instantiate(prefab);
      nodeCreateRole.parent = self.nodeAccCreateRole;
      nodeCreateRole.setPosition(0, 0);
      GamePersist.INSTANCE.CancelWaiting();
    });
  }
}

