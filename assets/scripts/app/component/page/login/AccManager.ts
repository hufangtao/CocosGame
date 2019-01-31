import LoginUI from "./LoginUI";
import { SOCKET_CONNECT } from "../../../common/net/socket/SocketDefine";
import NetController from "../../../common/net/NetController";
import * as Modules from "../../../module/Modules";
import AccModule from "./AccModule";
import * as ConfigVO from "../../../common/config/vo/ConfigVO";
import GamePersist from "../../../common/persist/GamePersist";
import HomeManager from "../home/HomeManager";
import { protoErrMsg, goToHome } from "../../../common/Misc";
import { ProtoErrorCode } from "../../../common/net/proto/ProtoReflect";
import NetUtil from "../../../common/net/NetUtil";
import { AccLoginC2S, AccReloginC2S, AccLoginS2C, AccReloginS2C, AccCreateS2C, AccEnterS2C, AccEnterC2S, AccCreateC2S, AccServertimeC2S } from "../../../common/net/proto/mods/ProtoSectionAcc";
import game = cc.game;
import { OpenHomeFrom } from "../../../common/Defines";


export default class AccManager {

  private static singleInstance: AccManager;

  public static get INSTANCE() {
    if (!this.singleInstance) {
      this.singleInstance = new AccManager();
    }
    return this.singleInstance;
  }

  private retryTimes: number = 0; // 断开连接后 重新连接尝试的次数
  private loginUI: LoginUI;
  private accModule: AccModule;

  // 服务器参数
  private serverID: string ;


  constructor() {
    this.accModule = Modules.Acc;
  }

  public set LoginUI(value: LoginUI) {
    this.loginUI = value;
  }

  public get LoginUI(): LoginUI {
    return this.loginUI;
  }

  public setServerData(ID: string) {
    this.serverID = ID;
    // this.loginUI.btnServer.node.getComponentInChildren(cc.Label).string = ConfigVO.ServerList.get(ID).name;
  }

  // 获取到授权
  public didGetAuthorize(data) {
    this.accModule.LoginData = data;
    if (NetController.INSTANCE.Connected) {
      this.requestLogin();
    } else {
      this.connectServer(data);
    }
  }

  // 进入游戏
  public didEnterGame() {
    //console.log("didEnterGame 成功进入游戏");
  }

  // 切换到Home 这里有一个加载过程 非直接切换过去
  public switchToHome() {
    Modules.Home.OpenHomeFrom = OpenHomeFrom.UI_LOGIN;
    GamePersist.INSTANCE.loadScene('home')
  }

  // 进行网络连接
  public connectServer(data) {
    this.retryTimes = 0;
    
    NetController.INSTANCE.on(SOCKET_CONNECT,  this.onServerConnected, this);
    NetController.INSTANCE.off(SOCKET_CONNECT, this.onServerReConnected, this);
    
    const serverVo: ConfigVO.IServerListVO = ConfigVO.ServerList.get(this.serverID);
    NetController.INSTANCE.connect(serverVo.ip, serverVo.port, serverVo.path, serverVo.security);
  }

  // 重新连接服务器
  public reConnectServer() {
    GamePersist.INSTANCE.ForceWaiting();
    this.retryTimes = this.retryTimes + 1;    
    NetController.INSTANCE.on(SOCKET_CONNECT,   this.onServerReConnected, this);
    NetController.INSTANCE.off(SOCKET_CONNECT,  this.onServerConnected, this);
    const serverVo: ConfigVO.IServerListVO = ConfigVO.ServerList.get(this.serverID);
    NetController.INSTANCE.reConnect(serverVo.ip, serverVo.port, serverVo.path, serverVo.security);
  }

  // 网络成功连接
  public onServerConnected(data) {
    NetController.INSTANCE.off(SOCKET_CONNECT, this.onServerConnected, this);
    this.requestLogin();
  }

  // 网络重新连接成功
  public onServerReConnected() {
    NetController.INSTANCE.off(SOCKET_CONNECT, this.onServerReConnected, this);
    this.requestReLogin();
  }

  // 请求登录
  public requestLogin() {
    const gameAccount = this.getGameAccount();
    // console.log("gameAccount",gameAccount,"game_open_id",gameAccount.game_open_id);
    const gameAccountId: string = gameAccount.game_open_id;
    const gameAccountSign: string = gameAccount.game_open_id_sign;
    // 发送登陆协议
    const loginMsg = new AccLoginC2S();
    loginMsg.platform        = this.accModule.DataAcc.accPlatform;
    loginMsg.channelParam    = this.accModule.DataAcc.accPlatformParam;
    loginMsg.channelOpenId   = this.accModule.DataAcc.accOpenId;
    loginMsg.gameAccountId   = gameAccountId;
    loginMsg.gameAccountSign = gameAccountSign;
    console.log("发送的登录协议" + loginMsg.platform + loginMsg.channelOpenId + "频道openid" + loginMsg.channelParam);
    NetUtil.SendMsg(loginMsg);
  }

  // 请求重新登录
  public requestReLogin() {
    const reloginMsg    = new AccReloginC2S();
    reloginMsg.id       = this.accModule.PlayerId;
    reloginMsg.loginKey = this.accModule.DataAcc.gameLoginToken;
    reloginMsg.openId   = this.accModule.DataAcc.gameOpenId;
    NetUtil.SendMsg(reloginMsg);
  }

  // 收到服务器端的登陆回应
  public onReceiveLoginS2C(msg: AccLoginS2C) {
    if (!this.loginUI) {
      return;
    }

    if (msg.code > 0) {
      this.loginUI.hideLoading();

      const errMsg = protoErrMsg(msg.code);
      GamePersist.INSTANCE.Toast(errMsg);
      window['Partner'].cleanLoginState();

      if (window['Partner'].PARTNER_NAME !== "Dev") {
        this.loginUI.showAccInput(2);
      }
      return;
    }

    const channelOpenId: string   = msg.channelOpenId;    // 第三方的open id
    const gameAccountId: string   = msg.gameAccountId;    // 游戏角色的账号Id
    const gameAccountSign: string = msg.gameAccountSign;  // 游戏账号Id的签名(用于验证)
    const gameLoginToken: string  = msg.gameLoginKey;     // 本次登陆的token

    this.accModule.DataAcc.accOpenId      = channelOpenId;
    this.accModule.DataAcc.gameLoginToken = gameLoginToken;
    this.accModule.DataAcc.gameUnionid    = gameLoginToken;
    this.accModule.DataAcc.gameOpenId     = gameAccountId;
    this.accModule.DataAcc.gameOpenIdSign = gameAccountSign;
    // 同时存储到Partner中
    window['Partner'].userInfo.openId = channelOpenId;
    this.saveGameAccount();
    const playerId: number = msg.id;
    // console.log("msg:",msg,"msg.id",msg.id);
    if (playerId > 0) {
      this.accModule.PlayerId = playerId;
      this.doSendEnterGame();
    } else {
      this.handleCreatePlayer();
    }
    
    // 开始同步服务器时间
    GamePersist.INSTANCE.startSyncServerTime();
  }


  // 收到重新登录的返回
  public onReceiveReLoginS2C(msg: AccReloginS2C) {
    GamePersist.INSTANCE.CancelWaiting();
    // 重登录成功
    cc.log(msg);
    if (msg.code === 0) {
      this.retryTimes = 0;
      HomeManager.INSTANCE.onReLaunch();
    }
  }


  // 收到创建角色的返回
  public onReceiveCreateS2C(msg: AccCreateS2C) {
    if (!this.loginUI) {
      return;
    }
    if (msg.code > 0) {
      const errMsg  = ProtoErrorCode[msg.code] || "ErrCode:" + msg.code;
      GamePersist.INSTANCE.toast(errMsg);
      return;
    }
    const playerId: number = msg.id;
    this.accModule.PlayerId = playerId;
    // 进入游戏
    this.doSendEnterGame();
  }

  // 收到服务器对进入游戏的返回
  public onReceiveEnterS2C(msg: AccEnterS2C) {
    if (!this.loginUI) {
      return;
    }
    if (msg.code > 0) {
      // TODO 进行错误的提示
      GamePersist.INSTANCE.toast("EnterS2C" +  msg.code);
      return;
    }
    this.didEnterGame();
  }

  // 发送进入游戏协议
  public doSendEnterGame() {
    const enterMsg: AccEnterC2S = new AccEnterC2S();
    enterMsg.id = this.accModule.PlayerId;
    NetUtil.SendMsg(enterMsg);
  }

  // 角色创建逻辑 如果平台支持获取用户信息 就不显示创建角色的界面
  public handleCreatePlayer() {
    if (window['Partner'].supportUserInfo()) {
      this.doSendCreatePlayer();
    } else {
      this.loginUI.showAccCreateRole();
    }
  }


  // 发送创建玩家协议
  public doSendCreatePlayer() {
    const createMsg: AccCreateC2S = new AccCreateC2S();
    NetUtil.SendMsg(createMsg);
  }

  public get RetryTimes(): number {
    return this.retryTimes;
  }
  public set RetryTimes(value: number) {
    this.retryTimes = value;
  }

  // 请求服务器时间
  public requestServerTime() {
    if (NetController.INSTANCE.Connected) {
      const msgServerTime = new AccServertimeC2S();
      NetUtil.SendMsg(msgServerTime);
    }
  }

  // 是否存在保存的游戏账号信息
  public existSavedGameAccount(): boolean {
    const gameAccount = this.getGameAccount();
    const gameOpenId: string = gameAccount.game_open_id;
    const gameOpenSign: string = gameAccount.game_open_id_sign;
    return gameOpenId !== "" && gameOpenSign !== "";
  }

  private saveGameAccount() {
    const key = "game_account";
    const gameAccount = {
      game_open_id: this.accModule.DataAcc.gameOpenId,
      game_open_id_sign: this.accModule.DataAcc.gameOpenIdSign,
    };
    const data: string = JSON.stringify(gameAccount);
    cc.sys.localStorage.setItem(key, data);
  }

  private getGameAccount() {
    const key = "game_account";
    const gameAccount = {
      game_open_id: "",
      game_open_id_sign: "",
    };
    const data: string = cc.sys.localStorage.getItem(key);
    try {
      if (data) {
        const savedData = JSON.parse(data);
        if (savedData.game_open_id) {
          gameAccount.game_open_id = savedData.game_open_id;
          gameAccount.game_open_id_sign = savedData.game_open_id_sign;
        }
      }
    } catch (e) {
      cc.warn("faild parse account data");
    }
    return gameAccount;
  }
}
