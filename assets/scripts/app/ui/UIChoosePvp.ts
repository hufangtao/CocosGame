import { Home } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import { UIFunc } from "../common/UIFunc";
import { PlayerClickC2S } from "../common/net/proto/mods/ProtoSectionPlayer";
import { OpenHomeFrom } from "../common/Defines";
import HomeManager from "../component/page/home/HomeManager";
import { Message } from "../common/Message";
import { DYNotify } from "../../dyGame/DYNotify";
const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    nodConfirm: cc.Node = null;
    @property(cc.Node)
    nodRooms: cc.Node = null;
    @property(cc.Sprite)
    sprRoomName: cc.Sprite = null;
    @property(cc.Label)
    public labMoneyCount: cc.Label = null;
    @property(cc.SpriteFrame)
    spfRoom1:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfRoom2:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfRoom3:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfRoom4:cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfRoom5:cc.SpriteFrame = null;

    choiceRoomType;//选择的房间类型

    onEnable() {
        this.nodRooms.getChildByName('room3').getChildByName('sprite').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        this.nodRooms.getChildByName('room4').getChildByName('sprite').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        this.nodRooms.getChildByName('room5').getChildByName('sprite').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.updateMmoney();
    }
    onDisable(){
        DYNotify.removeAllObservers(this);
    }
    updateMmoney() {
        this.labMoneyCount.string = Home.DataPlayer.FortuneGold + '';
    }
    startMatch() {

        const dataPoint = new PlayerClickC2S();
        dataPoint.point = 1;
        NetUtil.SendMsg(dataPoint);

        Home.OpenHomeFrom = OpenHomeFrom.UI_PLAY;
        Home.DataPlayer.IsMatching = true;

        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIMatch', () => {
            this.nodConfirm.active = false;
            HomeManager.INSTANCE.makeMatchRequest(this.choiceRoomType);
            GamePersist.INSTANCE.CancelWaiting();
        })
    }

    // 加载获取金币窗口
    loadUIGetCoin() {
        UIFunc.openUI('UIGetCoin', (node) => {
            node.getComponent('UIGetCoin').setType(1);
        })
    }

    // 扣去金币提示窗口
    showConfirm(type) {
        let spriteFrame;

        switch (type) {
            case 1:
                if (Home.DataPlayer.FortuneGold < 100) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom1;
                break;
            case 2:
                if (Home.DataPlayer.FortuneGold < 500) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom2;
                break;
            case 3:
                if (Home.DataPlayer.FortuneGold < 1000) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom3;
                break;
            case 4:
                if (Home.DataPlayer.FortuneGold < 3000) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom4;
                break;
            case 5:
                if (Home.DataPlayer.FortuneGold < 5000) {
                    this.loadUIGetCoin();
                    return;
                }
                spriteFrame = this.spfRoom5;
                break;
        }
        this.nodConfirm.active = true;
        this.choiceRoomType = type;
        this.sprRoomName.spriteFrame = spriteFrame;
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag === Message.EVENT_MODULE_PLAYER_FORTUNE) {
            this.updateMmoney();
        }
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        target.scale = 1;
        switch (target.name) {
            case 'btnBack':
                UIFunc.closeUI('UIChoosePvp', () => { });
                break;
            case 'room1':
                this.showConfirm(1);
                break;
            case 'room2':
                this.showConfirm(2);
                break;
            case 'room3':
                GamePersist.INSTANCE.toast('暂未开放，敬请期待');
                // this.showConfirm(3);
                break;
            case 'room4':
                GamePersist.INSTANCE.toast('暂未开放，敬请期待');
                // this.showConfirm(4);
                break;
            case 'room5':
                GamePersist.INSTANCE.toast('暂未开放，敬请期待');
                // this.showConfirm(5);
                break;
            case 'btnYes':
                this.startMatch();
                break;
            case 'btnNo':
                this.nodConfirm.active = false;
                break;
        }
    }
}
