import { ShareManager } from "../common/ShareManager";
import { UIFunc } from "../common/UIFunc";
import { GoodsTurntableRunC2S, GoodsTurntableRunS2C } from "../common/net/proto/mods/ProtoSectionGoods";
import NetUtil from "../common/net/NetUtil";
import { DYNotify } from "../../dyGame/DYNotify";
import { Message } from "../common/Message";
import GamePersist from "../common/persist/GamePersist";

const { ccclass, property } = cc._decorator;

@ccclass
export class UITurntable extends cc.Component {
    @property(cc.Node)
    nodTurntable: cc.Node = null;
    @property(cc.Button)
    btnStart: cc.Button = null;
    @property(cc.Node)
    nodConfirm: cc.Node = null;


    angle = [-22.5, 22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5]

    targetNum;
    startTurn: boolean = false;
    stopTurn: boolean = false;
    speed = 10;// 转盘速度
    accSpeed;// 结束时候的减速度
    goodsList;// 转盘获得的物品
    endAngle;// 停下之前需要转的角度
    stopTime = 60;// 停止时间
    turnTime = 3// 转动的时间
    onEnable() {
        DYNotify.regObserver(Message.TURNTABLE_LIST, this.onNotify, this);
        this.startTurn = false;
        this.stopTurn = false;
        this.speed = 10;
        this.nodTurntable.rotation = 0;
        this.btnStart.interactable = true;
        this.canLoadUIGetProp = true;
    }

    onDisable() {
        DYNotify.removeAllObservers(this);
    }

    // 启动转盘
    startTurntable(param) {
        this.targetNum = param.id;
        this.btnStart.interactable = false;
        this.startTurn = true;
        this.goodsList = param.goodsList;

        this.startTurn = true;
        this.scheduleOnce(() => {
            this.stopTurn = true;
        }, this.turnTime)
        return;


        this.nodTurntable.runAction(cc.repeatForever(cc.rotateBy(1, 720)));
        this.scheduleOnce(() => {
            this.nodTurntable.stopAllActions();
            let endAngle = randomNum(this.angle[this.targetNum - 1], this.angle[this.targetNum]);

            let rotation = (endAngle - this.nodTurntable.rotation % 360 + 720) % 360;
            let time = rotation / 720;
            this.nodTurntable.runAction(cc.sequence(
                cc.rotateBy(time, rotation),
                cc.delayTime(1),
                cc.callFunc(() => {
                    this.showGoods(param.goodsList);
                })
            ));
        }, 3);
    }
    canLoadUIGetProp;
    // 展示转盘结果
    showGoods(goodsList) {
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc.openUI('UIGetProp', (node) => {
            node.getComponent('UIGetProp').moreProp(goodsList, () => {
                this.canLoadUIGetProp = true;
                UIFunc.closeUI('UIGetProp', () => { })
            });
        })
    }

    // 提示消耗金币
    userTuentable() {
        if (true) {
            this.notifyTurnTable();
        } else {
            // 确认
            this.nodConfirm.active = true;
        }
    }

    // 发送启动转盘消息
    notifyTurnTable() {
        let turntableRun = new GoodsTurntableRunC2S();
        NetUtil.SendMsg(turntableRun);
    }
    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        target.scale = 1;
        switch (target.name) {
            case 'btnBack':
                UIFunc.closeUI('UITurntable', () => { });
                break;
            case 'btnStart':
                this.userTuentable();
                break;
        }
    }
    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.TURNTABLE_LIST) {
            cc.log(param);
            if (param.goodsList.length == 0) {
                GamePersist.INSTANCE.toast('今日转盘次数已达上限');
            } else {
                self.startTurntable(param);
            }
        }
    }


    update(dt) {
        if (!this.startTurn) {
            return;
        }
        this.nodTurntable.rotation += this.speed;

        if (this.stopTurn) {
            if (!this.endAngle) {
                let endRotation = randomNum(this.angle[this.targetNum - 1], this.angle[this.targetNum]);
                this.endAngle = (endRotation - this.nodTurntable.rotation % 360 + 720) % 360;
                if (this.endAngle < 180) {
                    this.endAngle += 360;
                }
                this.accSpeed = (- this.speed * this.speed) / 2 / this.endAngle;
            }


            this.speed += this.accSpeed;
            if (this.speed <= 0) {
                this.startTurn = false;
                this.stopTurn = false;
                this.speed = 10;
                this.endAngle = null;
                this.showGoods(this.goodsList);
                this.btnStart.interactable = true;
            }
        }

    }
}

function randomNum(startNum, endNum) {
    return Math.random() * (endNum - startNum) + startNum;
}
