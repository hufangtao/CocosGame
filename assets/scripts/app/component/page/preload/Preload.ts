//console.log('preload-loading')
import * as ConfigEntry from "../../../common/config/ConfigEntry";
import BaseUI from "../../BaseUI";
import NetController from "../../../common/net/NetController";
import { Play } from "../../../module/Modules";
const { ccclass, property } = cc._decorator;

@ccclass
export default class PreloadUI extends BaseUI {

  @property(cc.Label)
  public loadTip: cc.Label = null; // 加载资源时的提示信息

  @property(cc.Label)
  public loadProgress: cc.Label = null;
  @property(cc.ProgressBar)
  public progressBar: cc.ProgressBar = null;

  public onLoad() {
    super.onLoad();
    window['Partner'].initGameClub();
  }

  public uiName(): string {
    return "PreloadUI";
  }

  public async start() {
    super.start();
    this.loadProgress.string = '0%';

    const self = this;
    self.loadConfigs();

    NetController.INSTANCE.isLoadingPreload = false;
  }


  private async loadConfig(url) {
    return new Promise<any>((resolve, reject) => {
      cc.loader.loadRes(url, (err, res) => {
        if (err) {
          resolve(null)
        } else {
          resolve(res)
        }
      })
    })
  }

  private async loadConfigs() {
    const self = this;
    this.loadTip.string = "请稍后，正在加载配置...";

    self.progressBar.progress = 0.7;
    self.loadProgress.string = '70%';
    await ConfigEntry.loadAllConfig();
    self.loadTip.string = "加载完成，即将进入游戏！";
    self.progressBar.progress = 1;
    self.loadProgress.string = '100%';
    self.gotToLogin();
  }

  private gotToLogin() {
    cc.director.loadScene("login");
  }
}
