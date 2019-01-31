import GamePersist from "../../common/persist/GamePersist";
import SocialManager from "../../common/social/SocialManager";
import { PlayerShareGameC2S } from "../../common/net/proto/mods/ProtoSectionPlayer";
import NetUtil from "../../common/net/NetUtil";
import { Home } from "../../module/Modules";
import { UIFunc } from "../../common/UIFunc";
import { Message } from "../../common/Message";
import { DYNotify } from "../../../dyGame/DYNotify";
import { ShareManager } from "../../common/ShareManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIEnergy extends cc.Component {

    @property(cc.Node)
    nodEnergyEmpty: cc.Node = null;
    @property(cc.Node)
    nodGetEnergy: cc.Node = null;
    @property(cc.Node)
    nodTip: cc.Node = null;

    @property(cc.Sprite)
    sprWord: cc.Sprite = null;


    @property(cc.SpriteFrame)
    spfWordShare1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfWordShare2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfWordShare3: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfWordShare: cc.SpriteFrame = null;

    onLoad() {
    }

    onEnable(){
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify.regObserver(Message.OnShow, this.onNotify, this);
    }
    onDisable() {
        DYNotify.removeAllObservers(this);
    }
    setBtnWord() {
        if (Home.DataPlayer.EnergyShareCnt === 0) {
            this.sprWord.spriteFrame = this.spfWordShare3;
        } else if (Home.DataPlayer.EnergyShareCnt === 1) {
            this.sprWord.spriteFrame = this.spfWordShare2;
        } else if (Home.DataPlayer.EnergyShareCnt === 2) {
            this.sprWord.spriteFrame = this.spfWordShare1;
        } else if (Home.DataPlayer.EnergyShareCnt === 3) {
            this.sprWord.spriteFrame = this.spfWordShare;
        }
    }

    setMode(mode) {
        if (mode == 1) {
            this.nodEnergyEmpty.active = true;
            this.nodGetEnergy.active = false;
            this.nodTip.active = false;
            this.setBtnWord();
        } else if (mode == 2) {
            this.nodEnergyEmpty.active = false;
            this.nodGetEnergy.active = true;
            this.nodTip.active = false;
        } else if (mode == 3) {
            this.nodEnergyEmpty.active = false;
            this.nodGetEnergy.active = false;
            this.nodTip.active = true;
        }
    }


    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.OnShow) {
            self.onShare(self);
        } else if (tag == Message.GET_SHARE_CNT) {
            if (param.reason != 1) {
                return;
            }
            if (param.success === 1) {
                self.setMode(3);
            } else if(param.success === 0){
                GamePersist.INSTANCE.toast('今日分享已达上限');
            }
        }
    }

    share() {
        GamePersist.INSTANCE.btnAudio_1();
        if (Home.DataPlayer.EnergyShareCnt === 3) {
            return;
        }
        ShareManager.Instance.share(1);
    }

    onCancelPanel() {
        UIFunc.closeUI('UIEnergy', () => { })
    }
}
