import GamePersist from "../../../common/persist/GamePersist";
import { Home } from "../../../module/Modules";
import HomeUI from "./HomeUI";
import { UIFunc } from "../../../common/UIFunc";
import { Message } from "../../../common/Message";
import { DYNotify } from "../../../../dyGame/DYNotify";
import { ShareManager } from "../../../common/ShareManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Prop extends cc.Component {

    @property(cc.Node)
    public nodBuffSlot: cc.Node = null;
    @property(cc.Node)
    public pointer: cc.Node = null;

    @property(cc.Node)
    public adFrame: cc.Node = null;
    // 四个道具位置

    homeUI: HomeUI;
    onLoad() {
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_PRIZE_INIT, this.onNotify, this);
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);

        this.updateBuff();
        this.initAd();
        this.canLoadUIGetProp = false;
    }

    start() {

    }

    showHomeAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].showHomeAd(() => {
                this.adFrame.active = true;
            });
        }
    }
    hideHomeAd() {
        if (window['Partner'].supportAd()) {
            this.adFrame.active = false;
            window['Partner'].hideHomeAd();
        }
    }
    public onDisable() {
        DYNotify.removeAllObservers(this);
    }

    init(homeUI: HomeUI) {
        this.homeUI = homeUI;
    }

    showGuideHand() {
        this.pointer.active = true;
        this.pointer.getComponent(cc.Animation).play("aniGuide");
    }



    initAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].initVideoAd();
            window['Partner'].initHomeAd((scrWidth, adWidth, adHeight) => {
                let scale = 720 / scrWidth;
                let relAdWidth = scale * adWidth;
                let relAdHeight = scale * adHeight;
                if (!this.adFrame) {
                    return;
                }
                this.adFrame.width = relAdWidth + 42 * scale;
                this.adFrame.height = relAdHeight + 4 * scale;
            });
        }
    }
    hadShowAD = false;
    showAd() {
        if (this.hadShowAD) {
            return;
        }
        this.hadShowAD = true;
        this.canLoadUIGetProp = true;
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_PRIZE, this.onNotify, this);
        setTimeout(() => {
            this.hadShowAD = false;
        }, 2000)
        GamePersist.INSTANCE.blockInput();
        if (window['Partner'].supportAd()) {
            window['Partner'].showVideoAd(() => {
                ShareManager.Instance.notifyWatchAdGetProp();
            }, () => {
                this.share();
            });
        } else {
            GamePersist.INSTANCE.toast('不支持广告');
            ShareManager.Instance.notifyWatchAdGetProp();
        }
    }


    // 更新buff视图
    updateBuff() {
        for (let i = 0; i < this.nodBuffSlot.children.length; ++i) {
            let num = 0;
            for (let j = 0; j < Home.DataPlayer.PlayerGoodsData.length; ++j) {
                if (Home.DataPlayer.PlayerGoodsData[j].goodsId === i + 1) {
                    num = Home.DataPlayer.PlayerGoodsData[j].goodsNum;
                }
            }
            let label = this.nodBuffSlot.children[i].getChildByName('labCount').getComponent(cc.Label);
            label.string = num + '';
        }
    }

    // 点击道具，显示说明
    onSlotClick(node) {
        for (let i = 0; i < this.nodBuffSlot.children.length; ++i) {
            if (node === this.nodBuffSlot.children[i]) {
                this.nodBuffSlot.children[i].getChildByName('bk-bubble').active = true;
            } else {
                this.nodBuffSlot.children[i].getChildByName('bk-bubble').active = false;
            }
        }
    }

    canLoadUIGetProp;
    private onNotify(target, tag, param) {
        var self = target;
        if (tag === Message.EVENT_MODULE_PLAYER_PRIZE_INIT) {
            self.updateBuff();
        } else if (tag === Message.EVENT_MODULE_PLAYER_PRIZE) {
            if(cc.director.getScene().name != 'home'){
                return;
            }
            if(!this.canLoadUIGetProp){
                return;
            }
            this.canLoadUIGetProp = false;
            DYNotify.unregObserver(Message.EVENT_MODULE_PLAYER_PRIZE, self.onNotify, self);
            UIFunc.openUI('UIGetProp', (node) => {
                node.getComponent('UIGetProp').homeAchieveProp(self);
            })
        } else if (tag == Message.GET_SHARE_CNT) {
            if (param.reason != 3) {
                return;
            }
            if (param.success == 1) {
                // self.notifyWatchAd();
            } else if (param.success === 0) {
                GamePersist.INSTANCE.toast('获取道具次数已用完，明天再试试');
            }
        }
    }

    share() {
        GamePersist.INSTANCE.btnAudio_1();
        ShareManager.Instance.share(3);
    }

    public btnListener(event: cc.Event.EventTouch) {
        this.pointer.active = false;
        var target = event.target;
        this.onSlotClick(null);
        switch (target.name) {
            case 'btnWatchAd':
                this.showAd();
                break;
            case 'btnSlot1':
                this.onSlotClick(target);
                break;
            case 'btnSlot2':
                this.onSlotClick(target);
                break;
            case 'btnSlot3':
                this.onSlotClick(target);
                break;
            case 'btnSlot4':
                this.onSlotClick(target);
                break;
            case 'btnShare':
                this.share();
                break;
            case 'btnBack':
                // this.panelShare.active = false;
                break;
        }
    }
}
