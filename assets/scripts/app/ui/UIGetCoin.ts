import { UIFunc } from "../common/UIFunc";
import GamePersist from "../common/persist/GamePersist";
import { PlayerWatchAdC2S, PlayerShareGameC2S } from "../common/net/proto/mods/ProtoSectionPlayer";
import NetUtil from "../common/net/NetUtil";
import SocialManager from "../common/social/SocialManager";
import { Message } from "../common/Message";
import { DYNotify } from "../../dyGame/DYNotify";
import { Home } from "../module/Modules";
import { ShareManager } from "../common/ShareManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIGetCoin extends cc.Component {

    @property(cc.Label)
    labLeftCount: cc.Label = null;

    @property(cc.Label)
    labLackCoin: cc.Label = null;
    @property(cc.Label)
    labGetCoin: cc.Label = null;

    onEnable() {
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.labLeftCount.string = '(' + Home.DataPlayer.CoinShareCnt + '/5)';
        this.labLackCoin.node.active = false;
        this.labGetCoin.node.active = false;
        this.canLoadUIGetProp = true;
    }

    onDisable() {
        DYNotify.removeAllObservers(this);
    }

    setType(type) {
        if (type === 1) {
            this.labLackCoin.node.active = true;
        } else if (type === 2) {
            this.labGetCoin.node.active = true;
        }
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.GET_SHARE_CNT) {
            if (param.reason != 4) {
                return;
            }
            if (param.success == 1) {
                self.onGetCoin();
            } else if (param.success === 0) {
                GamePersist.INSTANCE.toast('免费获得金币次数已用完，明天再试试');
                this.closePanel();
            }
        } else if (tag == Message.EVENT_MODULE_PLAYER_FORTUNE) {
            self.onGetCoin();
        }
    }
    canLoadUIGetProp
    onGetCoin() {
        if(!this.canLoadUIGetProp){
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc.openUI('UIGetProp', (node) => {
            this.node.active = false;
            node.getComponent('UIGetProp').achieveCoin(100, () => {
                UIFunc.closeUI('UIGetProp', () => { })
            });
        });
    }

    share() {
        GamePersist.INSTANCE.btnAudio_1();
        ShareManager.Instance.share(4);
    }

    // 关闭本窗口
    closePanel() {
        UIFunc.closeUI('UIGetCoin', () => { });
    }

    // 观看视频
    showAd() {
        if (window['Partner'].supportAd()) {
            GamePersist.INSTANCE.blockInput();
            window['Partner'].showVideoAd(() => {
                ShareManager.Instance.notifyWatchAdGetCoin();
                this.onGetCoin();
            }, () => {
                this.share();
            });
        } else {
            cc.log('不支持广告');
            ShareManager.Instance.notifyWatchAdGetCoin();
            this.onGetCoin();
        }
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnYes':
                this.showAd();
                target.scale = 1;
                break;
            case 'btnNo':
                this.closePanel();
                target.scale = 1;
                break;

        }
    }
}
