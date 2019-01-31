import { Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import { PlayGiveUpC2S, PlayAiFinishC2S } from "../common/net/proto/mods/ProtoSectionPlay";
import { UIFunc } from "../common/UIFunc";
import PlayManager from "../component/game/PlayManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nodContent: cc.Node = null;

    onLoad() {

    }

    start() {

    }

    public giveUp() {
        if (PlayManager.INSTANCE.PlayUI.layerGame.pvpAi) {
            let ai_finish = new PlayAiFinishC2S();
            ai_finish.saveAnimalCount = Play.DataPvp.petAllCnt;
            ai_finish.winSide = Play.DataPlay.AiSide;
            NetUtil.SendMsg(ai_finish);
            return;
        }
        let playGiveUp = new PlayGiveUpC2S();
        NetUtil.SendMsg(playGiveUp);
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnGiveUp':
                GamePersist.INSTANCE.panelFadeOut(this.nodContent, () => {
                    this.nodContent.active = false;
                    this.nodContent.opacity = 255;
                    UIFunc.closeUI('UIQuitConfirmPvp', () => { })
                });
                GamePersist.INSTANCE.btnAudio_1();
                this.giveUp();
                break;
            case 'continue':
                GamePersist.INSTANCE.btnAudio_2();
                GamePersist.INSTANCE.panelFadeOut(this.nodContent, () => {
                    this.nodContent.active = false;
                    this.nodContent.opacity = 255;
                    UIFunc.closeUI('UIQuitConfirmPvp', () => { })
                });
                break;
        }
    }

    // update (dt) {}
}
