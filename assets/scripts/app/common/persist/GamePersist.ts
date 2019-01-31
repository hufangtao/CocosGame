//console.log('GamePersist-loading');
import * as Defines from "../Defines";
import * as ModuleManagerUtil from "../../module/ModuleManager";
import AccManager from "../../component/page/login/AccManager";
import * as ProtoDispatcher from "../net/proto/ProtoDispatcher";
import NetController from "../net/NetController";
import Toast from "../../component/prefab/Toast";
import { IRootUI, IPanel } from "../Misc";
import SocialManager from "../social/SocialManager";
import RuntimeManager from "../runtime/RuntimeManager";
import { PlayerShareGameC2S, PlayerWatchAdC2S } from "../net/proto/mods/ProtoSectionPlayer";
import NetUtil from "../net/NetUtil";


const { ccclass, property } = cc._decorator;

@ccclass
export default class GamePersist extends cc.Component {
  public static ToastPool: cc.NodePool = new cc.NodePool();
  public static PlaySplashPool: cc.NodePool = new cc.NodePool();

  public static get INSTANCE() {
    return GamePersist.singleInstance;
  }

  private static PERSIST_ROOT_NODE_NET: cc.Node;
  private static PERSIST_ROOT_NODE_MODULE: cc.Node;
  private static rootUI: IRootUI;
  private static singleInstance: GamePersist;

  @property(cc.Prefab)
  public toastPrefab: cc.Prefab = null;
  @property({type:cc.AudioClip})
  private pBtnAudio_1: cc.AudioClip = null;    // 按钮声音
  @property({type:cc.AudioClip})
  private pBtnAudio_2: cc.AudioClip = null;    // 按钮声音
  @property(cc.Node)
  nodTip: cc.Node = null;
  @property(cc.Node)
  nodWaitting: cc.Node = null;
  @property(cc.Node)
  layerToast: cc.Node = null;

  private nodeProtoErrDispatcher: cc.Node = null;
  private rootUI: IRootUI = null;
  private waitingPool: cc.NodePool = null;
  private waitingNode: cc.Node = null;
  private serverTime: number = 0;
  private syncServerTimeTick: number = 0;

  public directionScene = null;

  public onLoad() {
    // cc.view.enableAntiAlias(false);
    GamePersist.singleInstance = this;
    const self = this;

    cc.game.addPersistRootNode(this.node);
    Partner.registerZipLoad();
    Partner.registerToastCallback(function (msg: string) {
      self.toast(msg);
    });

    // 网络的root节点
    GamePersist.PERSIST_ROOT_NODE_NET = new cc.Node(Defines.GAME_PERSIST_NODE_ROOT_NET);
    this.node.addChild(GamePersist.PERSIST_ROOT_NODE_NET);
    this.nodeProtoErrDispatcher = new cc.Node();
    this.node.addChild(this.nodeProtoErrDispatcher);
    // 模块的root节点
    GamePersist.PERSIST_ROOT_NODE_MODULE = new cc.Node(Defines.GAME_PERSIST_NODE_ROOT_MODULE);
    this.node.addChild(GamePersist.PERSIST_ROOT_NODE_MODULE);

    // 协议各子模块触发器节点添加到NetController
    ProtoDispatcher.fillDispatcher(NetController.INSTANCE.node);
    // 各子模块逻辑控制初始化
    ModuleManagerUtil.InitManager();
    // // 初始化toast复用节点
    // for (let i = 0; i < 5; i++) {
    //   GamePersist.ToastPool.put(cc.instantiate(this.toastPrefab));
    // }

    SocialManager.INSTANCE.init();
    RuntimeManager.INSTANCE.init();
  }

  public start() {
    //console.log('GamePersist-start');
    AccManager.INSTANCE.RetryTimes = 0;

    this.node.x = cc.view.getVisibleSize().width / 2;
    this.node.y = cc.view.getVisibleSize().height / 2;
  }

  public static get RootNodeNet(): cc.Node {
    return GamePersist.PERSIST_ROOT_NODE_NET;
  }

  public static get RootNodeModule(): cc.Node {
    return GamePersist.PERSIST_ROOT_NODE_MODULE;
  }

  public ForceWaiting(msg?: string) {
    this.nodWaitting.active = true;
    this.nodWaitting.getComponent(cc.Animation).play('aniWaitting');
  }

  public CancelWaiting() {
    this.nodWaitting.getComponent(cc.Animation).stop('aniWaitting');
    this.nodWaitting.active = false;
  }

  public Toast(msg: string) {
    GamePersist.INSTANCE.toast(msg);
  }

  // toast tips
  public toast(message: string, colorType?, delayTime?) {
    var toastNode: cc.Node = GamePersist.ToastPool.get();
    if (!toastNode) {
      toastNode = cc.instantiate(this.toastPrefab);
    }
    toastNode.parent = this.layerToast;
    const toast: Toast = toastNode.getComponent("Toast");
    toast.setMessage(message, colorType, delayTime);
    return toast;
  }

  // 显示维护信息
  public async showMaintain(msg: string) {
    if (!this.rootUI) {
      return;
    }
    this.ForceWaiting();
    try {
      // const panel: PanelConfirm = await PanelConfirm.NewPanel();
      // panel.configOnlyYes();
      // panel.setContent(msg);
      // this.rootUI.showPanel(panel);
    } catch (err) {
      cc.error(`load confirm panel err:${err}`);
    }
    this.CancelWaiting();
  }


  // 开始同步时间
  public startSyncServerTime() {
    const self = this;
    const callback = function () {
      AccManager.INSTANCE.requestServerTime();
    };
    // 为了防止添加2次
    this.unschedule(callback);
    this.schedule(callback, 5);
  }

  // 播放按钮音效
  public btnAudio_1() {
    cc.audioEngine.play(this.pBtnAudio_1, false, 1.0);
  }
  public btnAudio_2() {
    cc.audioEngine.play(this.pBtnAudio_2, false, 1.0);
  }

  // 触发协议错误事件
  public EmitProtoError(protoMsgSection: number, protoName: string, errCode: number, errMsg: string) {
    const eventName = "proto_section_" + protoMsgSection;
    const errProto: any = {};
    errProto.errCode = errCode;
    errProto.errMsg = errMsg;
    errProto.protoName = protoName;
    this.nodeProtoErrDispatcher.emit(eventName, errProto);
  }

  // 注册关注协议错误事件
  public OnProtoError(protoMsgSection: number, callback: (data) => void, target?: any) {
    const eventName = "proto_section_" + protoMsgSection;
    this.nodeProtoErrDispatcher.on(eventName, callback, target);
  }

  // 取消关注协议错误事件
  public OffProtoError(protoMsgSection: number, callback: Function, target?: any) {
    const eventName = "proto_section_" + protoMsgSection;
    this.nodeProtoErrDispatcher.off(eventName, callback, target);
  }

  public set ServerTime(value: number) {
    this.serverTime = value;
  }
  public get ServerTime(): number {
    return this.serverTime;
  }

  public set RootUI(value: IRootUI) {
    this.rootUI = value;
  }

  public get RootUI(): IRootUI {
    return this.rootUI;
  }

  public get WaitingPool(): cc.NodePool {
    return this.waitingPool;
  }

  // 是否显示了且未隐藏切换场景动画
  _hasShowTips = false;
  // 开始切换场景
  loadScene(sceneName, cb?) {
    if (!this._hasShowTips) {
      this._hasShowTips = true;
      this.nodTip.getComponent('Tips').show();
    }

    var time = Date.now();
    cc.director.preloadScene(sceneName, () => {
      var leftTime = Date.now() - time;
      if (false && leftTime < 1000) {
        setTimeout(() => {
          cc.director.loadScene(sceneName, () => {
            cb && cb();
          })
        }, (1000 - leftTime))
      } else {
        setTimeout(() => {
          cc.director.loadScene(sceneName, () => {
            cb && cb();
          })
        }, 50)
      }
    });
  }
  // 切换场景完成回调
  onLoadSceneEnd(cb?) {
    if (!this._hasShowTips) {
      return
    }
    this._hasShowTips = false;
    var action = cc.sequence(
      cc.fadeOut(0.2),
      cc.callFunc(() => {
        cb && cb();
        this.nodTip.getComponent('Tips').hide();
      })
    );
    this.nodTip.runAction(action);
  }


  panelPopUp(node, cb?) {
    node.stopAllActions();
    var action = cc.sequence(
      cc.scaleTo(0.1, 1.02, 1.02),
      cc.scaleTo(0.1, 0.98, 0.98),
      cc.scaleTo(0.1, 1, 1),
      cc.callFunc(() => {
        cb && cb();
      })
    );
    node.active = true;
    node.scale = 0.95;
    node.runAction(action)
  }

  panelFadeOut(node, cb?) {
    node.stopAllActions();
    var action = cc.sequence(
      cc.fadeOut(0.2),
      cc.callFunc(() => {
        cb && cb()
      })
    )
    node.runAction(action)
  }

  blockInput() {
    GamePersist.singleInstance.getComponent(cc.BlockInputEvents).enabled = true;
    setTimeout(function () {
      GamePersist.singleInstance.node.getComponent(cc.BlockInputEvents).enabled = false;
    }, 1000);
  }

  
}
