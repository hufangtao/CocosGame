import NetController from "../net/NetController";
import GamePersist from "../persist/GamePersist";
import HomeManager from "../../component/page/home/HomeManager";
import {Message} from "../Message";
import {DYNotify} from "../../../dyGame/DYNotify";
import * as Misc from "../Misc";
import * as Modules from "../../module/Modules";

const {ccclass, property} = cc._decorator;
@ccclass
export default class RuntimeManager {
    public static get INSTANCE(): RuntimeManager {
        if (!RuntimeManager.singleInstance) {
            RuntimeManager.singleInstance = new RuntimeManager();
        }
        return RuntimeManager.singleInstance;
    }

    private static singleInstance: RuntimeManager;

    private reLaunchOptions: any = null;
    private isBackground: boolean = false;


    public init() {
        const self = this;
        window['Partner'].registerOnShowCallback(function (res) {
            self.onShow(res);
        });
        window['Partner'].registerOnHideCallback(function () {
            self.onHide();
        });
    }

    // 当前是否在后台
    public get IsBackground(): boolean {
        return this.isBackground;
    }

    public get ReLaunchOptions(): any {
        const options = this.reLaunchOptions;
        this.reLaunchOptions = null;
        return options;
    }


    private onHide() {
        this.isBackground = true;
        GamePersist.INSTANCE.RootUI.onAppHide();
    }

    // 当回到前台的时候处理
    private onShow(launchOptions: any) {
        // console.log("#########onShow isback:", this.isBackground, " connect:" + NetController.INSTANCE.Connected);
        if (!this.isBackground) {
            return;
        }

        DYNotify.post(Message.OnShow);

        this.isBackground = false;
        GamePersist.INSTANCE.RootUI.onAppShow();

        if (window['Partner'].PARTNER_NAME === "Wechat") {
            // 1007 单聊会话
            // 1008 群聊会话
            const wxScene: number = launchOptions.scene || -1;
            if (!!launchOptions.reLaunch || wxScene === 1007 || wxScene === 1008) {
                this.reLaunchOptions = launchOptions;
            } else {
                this.reLaunchOptions = null;
            }
            // //console.log("#########launch Options:", launchOptions);
        }

        if (!NetController.INSTANCE.Connected) {
            // 如果没有连接网络 则调用NetController处理网络断开的逻辑
            NetController.INSTANCE.onSocketClose();
        } else {
            // 如果当前有网络 则检查是否是ReLaunch:即点击其他人分享的卡片进入
            HomeManager.INSTANCE.onReLaunch();
        }
    }
}
