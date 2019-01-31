import LayerGame from "./LayerGame";
import { Play, Home } from "../../../module/Modules";
import { PlayActiveBuffC2S } from "../../../common/net/proto/mods/ProtoSectionPlay";
import NetUtil from "../../../common/net/NetUtil";
import { BuffUpdate } from "../../page/home/RoomDefine";
import { Message } from "../../../common/Message";
import { DYNotify } from "../../../../dyGame/DYNotify";

const { ccclass, property } = cc._decorator;

@ccclass
export class Bottom extends cc.Component {

    @property(cc.Node)
    nodBuffSlot: cc.Node = null;

    @property(cc.Label)
    labTip: cc.Label = null;

    public layerGame: LayerGame;

    public canTouchSlot = [];

    private propOwnState = [];
    private propUseState = [];

    onLoad() {
        Play.DataPvp.bottom = this;
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_PRIZE, this.onNotify, this);
    }

    onDestroy() {
        DYNotify.removeAllObservers(this);
    }

    init(game) {
        this.layerGame = game;
    }

    initCanTouchSlot() {
        this.propOwnState = [false, false, false, false];
        this.propUseState = [false, false, false, false];
        for (let i = 0; i < this.nodBuffSlot.childrenCount; ++i) {
            this.canTouchSlot[i] = true;
        }
        this.initPropOwnState();
        this.updateBuff();
    }

    // 初始化道具拥有状态
    initPropOwnState() {
        for (let i = 0; i < this.nodBuffSlot.children.length; ++i) {
            let num = 0;
            for (let j = 0; j < Home.DataPlayer.PlayerGoodsData.length; ++j) {
                if (Home.DataPlayer.PlayerGoodsData[j].goodsId === i + 1) {
                    num = Home.DataPlayer.PlayerGoodsData[j].goodsNum;
                }
            }
            if (num > 0) {
                this.propOwnState[i] = true;
            }
        }
    }

    // 更新道具使用状态
    updatePropUseState(index) {
        this.propUseState[index] = true;
    }


    // 更新buff视图
    updateBuff() {
        for (let i = 0; i < this.nodBuffSlot.children.length; ++i) {
            if(this.layerGame.pvpTeach){
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
                continue;
            }
            if (!this.propOwnState[i]) {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                this.nodBuffSlot.children[i].scale = 1;
                this.nodBuffSlot.children[i].getComponent(cc.Button).transition = cc.Button.Transition.NONE;
            } else if (this.propUseState[i]) {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.GRAY);
                this.nodBuffSlot.children[i].scale = 1;
                this.nodBuffSlot.children[i].getComponent(cc.Button).transition = cc.Button.Transition.NONE;
            } else {
                this.nodBuffSlot.children[i].getChildByName('nodProp').getChildByName('propIcon').getComponent(cc.Sprite).setState(cc.Sprite.State.NORMAL);
                this.nodBuffSlot.children[i].getComponent(cc.Button).transition = cc.Button.Transition.SCALE;
            }
        }
    }

    // 点击道具槽
    clickSlot(index) {
        if (!this.propOwnState[index - 1]) {
            this.layerGame.PlayUI.Audio.buffInValid();
            this.layerGame.PlayUI.setToast('你尚未拥有此技能');
            let btnSlot = this.nodBuffSlot.children[index - 1];
            btnSlot.getComponent(cc.Animation).play('PropShake');
            return;
        } else if (this.propUseState[index - 1]) {
            this.layerGame.PlayUI.Audio.buffInValid();
            this.layerGame.PlayUI.setToast('该技能本局已使用');
            let btnSlot = this.nodBuffSlot.children[index - 1];
            btnSlot.getComponent(cc.Animation).play('PropShake');
            return;
        } else {

        }
        let hadProp = false;
        for (let i = 0; i < Home.DataPlayer.PlayerGoodsData.length; ++i) {
            if (Home.DataPlayer.PlayerGoodsData[i].goodsId === index) {
                hadProp = true;
            }
        }
        if (!hadProp) {
            this.layerGame.PlayUI.Audio.buffInValid();
            return
        }

        this.sendBuffType(index);
    }

    // 发送buff类型
    sendBuffType(index) {
        this.stopAllTipAction();

        let playActiveBuffC2S = new PlayActiveBuffC2S();
        playActiveBuffC2S.slotId = index;
        NetUtil.SendMsg(playActiveBuffC2S);

        this.canTouchSlot[index - 1] = false;
        this.updatePropUseState(index - 1);
        // this.propCd(index);

        if (this.layerGame.pvpAi || this.layerGame.pvpTeach) {
            this.layerGame.PlayUI.iUseProp(index);
            this.updateBuff();
        }
    }

    // 道具cd
    propCd(index) {
        let sprMask = this.nodBuffSlot.children[index - 1].getChildByName('cdMask').getComponent(cc.Sprite);
        let labCd = this.nodBuffSlot.children[index - 1].getChildByName('labCd').getComponent(cc.Label);
        labCd.node.active = true;
        sprMask.node.active = true;
        sprMask.fillRange = 1;

        this.canTouchSlot[index - 1] = false;

        let cd = 5;
        let oneSecede = 1;

        let space = 0.05;// 间隔
        let time = cd;//cd时间

        labCd.string = cd + '';

        let cb = function () {
            sprMask.fillRange -= space / time;
            oneSecede -= space;
            if (oneSecede <= 0) {
                oneSecede = 1;
                cd--;
                labCd.string = cd + '';
            }
        }

        this.schedule(cb, space);

        this.scheduleOnce(() => {
            sprMask.node.active = false;
            labCd.node.active = false;
            this.canTouchSlot[index - 1] = true;
            this.unschedule(cb);
        }, time + space)
    }

    // 道具提示
    propTips(type) {
        switch (type) {
            case 1:
                this.labTip.string = '哇好多宠物，用这个超省事';
                break;
            case 2:
                this.labTip.string = '或许它可以帮你不劳而获，嘿嘿';
                break;
            case 3:
                this.labTip.string = '遮挡ta的视野可以影响ta的发挥哦';
                break;
            case 4:
                this.labTip.string = '打乱ta的棋盘顺序可以影响ta的发挥哦';
                break;
        }
        this.shakeSlotByType(type);
        this.scheduleOnce(() => {
            this.labTip.string = '';
        }, 4)
    }

    // 停止所有动画
    stopAllTipAction() {
        for (let i = 0; i < this.nodBuffSlot.children.length; ++i) {
            let btnSlot = this.nodBuffSlot.children[i];
            btnSlot.getComponent(cc.Animation).stop('PropTip');
            btnSlot.getChildByName('nodProp').rotation = 0;
            btnSlot.getChildByName('guide-hand').active = false;
        }
    }

    // 根据道具类型晃动道具
    shakeSlotByType(type) {
        let btnSlot = this.nodBuffSlot.children[type - 1];
        btnSlot.getComponent(cc.Animation).play('PropTip');
        this.scheduleOnce(() => {
            btnSlot.getComponent(cc.Animation).stop('PropTip');
            btnSlot.getChildByName('nodProp').rotation = 0;
            btnSlot.getChildByName('guide-hand').active = false;
        }, 4);
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnSlot1':
                this.clickSlot(1);
                break;
            case 'btnSlot2':
                this.clickSlot(2);
                break;
            case 'btnSlot3':
                this.clickSlot(3);
                break;
            case 'btnSlot4':
                this.clickSlot(4);
                break;
        }
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag == BuffUpdate) {
            self.updateBuff();
        } else if (tag == Message.EVENT_MODULE_PLAYER_PRIZE) {
            self.updateBuff();
        }
    }
}