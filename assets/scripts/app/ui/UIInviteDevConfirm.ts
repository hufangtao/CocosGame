import GamePersist from "../common/persist/GamePersist";
import HomeManager from "../component/page/home/HomeManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIInviteDevConfirm extends cc.Component {

  @property(cc.Label)
  public label: cc.Label = null;

  @property(cc.Button)
  private btnConfirm: cc.Button = null;

  public start() {
  }

  public onDestroy() {
  }

  public setInviteUrl(url: string): void {
    this.label.string = url;
  }

  private handleConfirm() {
    GamePersist.INSTANCE.btnAudio_1();
    window['Partner'].copyToClipboard(this.label.string);
    HomeManager.INSTANCE.showInvitePanel();
  }
}
