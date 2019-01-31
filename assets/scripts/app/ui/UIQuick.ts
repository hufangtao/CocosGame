import { Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import { UIFunc } from "../common/UIFunc";
import DYAudio from "../../dyGame/DYAudio";
import { PlayStartPveC2S } from "../common/net/proto/mods/ProtoSectionPlay";
import PlayManager from "../component/game/PlayManager";
import NetUtil from "../common/net/NetUtil";


const { ccclass, property } = cc._decorator;

@ccclass
export default class UIQuick extends cc.Component {

    onEnable() {
        this.node.on('touchstart', this.closePanelQuick, this);
    }

    onDisable() {
        this.node.off('touchstart', this.closePanelQuick, this);
    }

    start() {

    }
    hasTouched = false;
    private closePanelQuick() {
        if (this.hasTouched) {
            return
        }
        this.hasTouched = true;
        Play.DataPve.gameBegan = true;

        GamePersist.INSTANCE.panelFadeOut(this.node, () => {
            this.node.active = false;
            this.node.opacity = 255;
            this.hasTouched = false;
            UIFunc.closeUI('UIQuick', () => { });
        });
    }
    hideOverAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].hideOverAd();
        }
    }
    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnGameBack':
                UIFunc.closeUI('UIQuick', () => { });
                GamePersist.INSTANCE.btnAudio_1();
                DYAudio.stopMusic();
                this.hideOverAd();
                GamePersist.INSTANCE.loadScene('levelChoose');
                break;
            case 'btnNotQuick':
                UIFunc.closeUI('UIQuick', () => { });
                GamePersist.INSTANCE.btnAudio_1();
                var startPve = new PlayStartPveC2S();
                PlayManager.INSTANCE.PveEnterType = 3;
                NetUtil.SendMsg(startPve);
                // this.playAgain();
                break;
        }
    }

    // update (dt) {}
}
