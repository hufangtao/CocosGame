import BaseComponent from "./BaseComponent";
import { IPanel } from "../common/Misc";

// 所有弹出面板的基类
const {ccclass, property} = cc._decorator;

@ccclass
export default class BasePanel extends BaseComponent implements IPanel {
  public start() {
    super.start();
  }

  public onLoad() {
    super.onLoad();
  }

  public viewNode() {
    return this.node;
  }
}
