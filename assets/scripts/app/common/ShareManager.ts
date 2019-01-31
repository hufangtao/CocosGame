import { PlayerShareGameC2S, PlayerWatchAdC2S, PlayerDoubleC2S } from "./net/proto/mods/ProtoSectionPlayer";
import NetUtil from "./net/NetUtil";
import { DYNotify } from "../../dyGame/DYNotify";
import { Message } from "./Message";
import GamePersist from "./persist/GamePersist";
import SocialManager from "./social/SocialManager";
import { SignInSignC2S } from "./net/proto/mods/ProtoSectionSignIn";

export class ShareManager {
    private static _instance: ShareManager;

    public static get Instance(): ShareManager {
        if (ShareManager._instance == null) {
            ShareManager._instance = new ShareManager();
            DYNotify.regObserver(Message.OnShow, ShareManager._instance.onNotify, ShareManager._instance);

        }
        return ShareManager._instance;
    }

    shareType;
    param;

    share(type, param?) {
        this.shareType = type;
        this.param = param;
        const flauntParam = SocialManager.INSTANCE.makeFlauntParam();
        window['Partner'].doFlaunt(flauntParam, () => {

        });
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.OnShow) {
            self.onShare(self);
        }
    }

    // 根据分享类型发送不同请求
    notifyByShareType() {
        switch (this.shareType) {
            case 1:
                this.notifyShareGetEnergy();
                break;
            case 3:
                this.notifyShareGetProp();
                break;
            case 4:
                this.notifyShareGetCoin();
                break;
            case 5:
                this.notifyShareAddStep();
                break;
            case 6:
                this.notifySign(this.param);
                break;
            case 7:
                this.notifyDoubleCoin();
                break;
        }
    }

    // 分享回调
    onShare(self) {
        if (!window['Partner'].startFlauntTime) {
            return;
        }
        let success = false;
        let duration = Date.now() - window['Partner'].startFlauntTime;
        if (duration >= 5000) {
            success = true;
        } else if (duration > 3000) {
            success = (Math.random() > 0.3 ? true : false);
        } else {
            success = (Math.random() > 0.9 ? true : false);
        }
        if (window['Partner'].PARTNER_NAME == "qqplay") {
            success = true;
        }
        if (success) {
            self.notifyByShareType();
        } else {
            let msg = (Math.random() > 0.67 ? '分享失败' : (Math.random() > 0.33 ? '请分享到群' : '请不要过多打扰同一个群'));
            GamePersist.INSTANCE.toast(msg);
        }
        window['Partner'].startFlauntTime = null;
    }

    // 发送签到请求
    notifySign(param) {
        let signInSign = new SignInSignC2S();
        signInSign.slot = param.slotIndex;
        if (param.isDouble === 1) {
            signInSign.double = 1;
        } else {
            signInSign.double = 0;
        }
        NetUtil.SendMsg(signInSign);
    }

    // 分享获得体力
    notifyShareGetEnergy() {
        var playerShareGameC2S = new PlayerShareGameC2S();
        playerShareGameC2S.reason = 1;
        NetUtil.SendMsg(playerShareGameC2S);
    }
    // 分享获得道具次数
    notifyShareGetProp() {
        var playerShareGameC2S = new PlayerShareGameC2S();
        playerShareGameC2S.reason = 3;
        NetUtil.SendMsg(playerShareGameC2S);
    }

    // 分享增加金币次数
    notifyShareGetCoin() {
        var playerShareGameC2S = new PlayerShareGameC2S();
        playerShareGameC2S.reason = 4;
        NetUtil.SendMsg(playerShareGameC2S);
    }

    // 分享增加步数次数
    notifyShareAddStep() {
        var playerShareGameC2S = new PlayerShareGameC2S();
        playerShareGameC2S.reason = 5;
        NetUtil.SendMsg(playerShareGameC2S);
    }

    // 发送获取双倍消息
    notifyDoubleCoin() {
        let playerDouble = new PlayerDoubleC2S();
        playerDouble.reason = 1;
        NetUtil.SendMsg(playerDouble);
    }



    // 观看广告获得道具
    notifyWatchAdGetProp() {
        var msg = new PlayerWatchAdC2S();
        msg.reason = 1;
        NetUtil.SendMsg(msg);
    }

    // 观看广告增加步数次数
    notifyWatchAdAddStep() {
        var msg = new PlayerWatchAdC2S();
        msg.reason = 2;
        NetUtil.SendMsg(msg);
    }

    // 观看广告获得金币
    notifyWatchAdGetCoin() {
        var msg = new PlayerWatchAdC2S();
        msg.reason = 3;
        NetUtil.SendMsg(msg);
    }

    // 观看广告获得双倍
    notifyWatchAdDoubleCoin() {
        var msg = new PlayerWatchAdC2S();
        msg.reason = 3;
        NetUtil.SendMsg(msg);
    }
}