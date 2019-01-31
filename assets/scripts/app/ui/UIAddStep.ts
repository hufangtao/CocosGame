import { Message } from "../common/Message";
import LayerGamePve from "../component/game/pve/LayerGamePve";
import { Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import { UIFunc } from "../common/UIFunc";
import StateMgr from "../component/game/pve/StateMgr";
import { DYNotify } from "../../dyGame/DYNotify";
import { ShareManager } from "../common/ShareManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIAddStep extends cc.Component {
    onEnable() {
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);
    }

    onDisable() {
        DYNotify.removeAllObservers(this);
    }

    layerGame: LayerGamePve;
    // 显示增加步数界面
    init(layerGame) {
        this.layerGame = layerGame;
        if (Play.DataPve.levelData.time > 0) {
            this.node.getChildByName('addTime').active = true;
            this.node.getChildByName('addStep').active = false;

        } else {
            this.node.getChildByName('addTime').active = false;
            this.node.getChildByName('addStep').active = true;

        }
    }

    showAd() {
        if (window['Partner'].supportAd()) {
            GamePersist.INSTANCE.blockInput();
            window['Partner'].showVideoAd(() => {
                ShareManager.Instance.notifyWatchAdAddStep();
                this.onWatchAd();
            }, () => {
                this.share();
            });
        } else {
            cc.log('不支持广告');
            ShareManager.Instance.notifyWatchAdAddStep();
            this.onWatchAd();
        }
    }
    // 看广告回调
    onWatchAd() {
        UIFunc.closeUI('UIAddStep', () => { })
        if (Play.DataPve.levelData.time > 0) {
            StateMgr.INSTANCE.isStopOperate = false;
            Play.DataPve.hadAddStep = true;
            Play.DataPve.remainTime = 10;
            this.layerGame.panelHeader.updateTime();
        } else {
            StateMgr.INSTANCE.isStopOperate = false;
            Play.DataPve.hadAddStep = true;
            Play.DataPve.remainStep = 5;
            this.layerGame.panelHeader.updateLabelStep();
        }
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.GET_SHARE_CNT) {
            if (param.reason != 5) {
                return;
            }
            if (param.success == 1) {
                self.onWatchAd();
            }  else if(param.success === 0){
                GamePersist.INSTANCE.toast('免费额外资源已用完，明天再试试');
            }
        }
    }
    
    share() {
        GamePersist.INSTANCE.btnAudio_1();
        ShareManager.Instance.share(5);
    }


    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnGiveUp':
                GamePersist.INSTANCE.btnAudio_1();
                this.layerGame.PlayUI.loseGame();
                UIFunc.closeUI('UIAddStep', () => { })
                break;
            case 'btnWatchAd':
                GamePersist.INSTANCE.btnAudio_1();
                this.showAd();
                // this.onWatchAd();
                break;
        }
    }
}
