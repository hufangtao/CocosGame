import { UI_LAYER_POP_TIPS, ZORDER_UI_LAYER_POP_TIPS, UI_LAYER_WAITING, ZORDER_UI_LAYER_WAITING } from "../common/Defines";
import Toast from "./prefab/Toast";
import GamePersist from "../common/persist/GamePersist";
import { IRootUI, IPanel } from "../common/Misc";

// 所有场景入口UI的基类
const { ccclass, property } = cc._decorator;
@ccclass
export default class BaseUI extends cc.Component implements IRootUI {

  @property(cc.Prefab)
  public toastPrefab: cc.Prefab = null;

  private panelLayer: cc.Node = null;
  public toastLayer: cc.Node = null;
  private waitingLayer: cc.Node = null;

  public onLoad() {
    GamePersist.ToastPool.clear();
    
    
    if (CC_DEBUG) {
      // cc.director.setDisplayStats(false);
      // MemoryDetector.showMemoryStatus();
    }
    
    const canvas = this.node.getComponent(cc.Canvas);
    if (canvas) {
      if (canvas.designResolution.width / canvas.designResolution.height <= cc.view.getCanvasSize().width / cc.view.getCanvasSize().height) {
        canvas.fitHeight = true;
        canvas.fitWidth = false;
      } else {
        canvas.fitHeight = false;
        canvas.fitWidth = true;
      }

      // panel layer
      this.panelLayer = new cc.Node(UI_LAYER_POP_TIPS);
      this.panelLayer.parent = this.node;
      this.panelLayer.setPosition(0, 0);
      this.panelLayer.zIndex = 99;
      // toast layer
      this.toastLayer = new cc.Node(UI_LAYER_POP_TIPS);
      this.toastLayer.parent = canvas.node;
      this.toastLayer.x = 0;
      this.toastLayer.y = 0;
      this.toastLayer.zIndex = ZORDER_UI_LAYER_POP_TIPS;
      // waiting layer
      this.waitingLayer = new cc.Node(UI_LAYER_WAITING);
      this.waitingLayer.parent = canvas.node;
      this.waitingLayer.setPosition(0, 0);
      this.waitingLayer.zIndex = ZORDER_UI_LAYER_WAITING;
    }
  }

  public start() {
    GamePersist.INSTANCE.RootUI = this;
    this.onLoadSceneEnd();
  }

  onLoadSceneEnd() {
    GamePersist.INSTANCE.onLoadSceneEnd();
  }

  public uiName(): string {
    throw (new Error("must define your ui'name"));
  }


  // 显示面板
  public showPanel(panel: IPanel) {
    const viewNode: cc.Node = panel.viewNode();
    viewNode.parent = this.panelLayer;
  }

  // 销毁panel中的节点 
  public destroyPanel() {
    this.panelLayer.removeAllChildren(true);
  }

  // 显示等待
  public showWaiting(node: cc.Node, msg?: string) {

  }

  public onAppHide() {
  }

  public onAppShow() {
  }
}
