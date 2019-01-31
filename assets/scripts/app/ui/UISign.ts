import { SignInSignListC2S, SignInSignListS2C, SignInSignC2S, SignInSignS2C } from "../common/net/proto/mods/ProtoSectionSignIn";
import NetUtil from "../common/net/NetUtil";
import { UIFunc } from "../common/UIFunc";
import { DYNotify } from "../../dyGame/DYNotify";
import { Message } from "../common/Message";
import { PGoods } from "../common/net/proto/ProtoType";
import { slot } from "../module/data/mod/DataPlayer";
import GamePersist from "../common/persist/GamePersist";
import { ShareManager } from "../common/ShareManager";
const { ccclass, property } = cc._decorator;

@ccclass
export class UISign extends cc.Component {

    @property(cc.Node)
    nodSigns: cc.Node = null;
    @property(cc.Toggle)
    togDouble: cc.Toggle = null;
    @property(cc.SpriteFrame)
    spfCoin: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfBox: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfBuff1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfBuff2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfBuff3: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfBuff4: cc.SpriteFrame = null;

    @property(cc.Button)
    btnSign: cc.Button = null;

    currDay: number;
    doubleStatus: boolean;

    onLoad() {
        this.togDouble.node.on('toggle', this.setToggleStatus, this)
    }

    onEnable() {
        DYNotify.regObserver(Message.SIGN_List, this.onNotify, this);
        DYNotify.regObserver(Message.SIGN_RESULT, this.onNotify, this);
        this.notifySignList();
        this.doubleStatus = true;
        this.togDouble.isChecked = true;
        this.canLoadUIGetProp = true;
    }
    onDisable() {
        DYNotify.removeAllObservers(this);
    }
    setToggleStatus() {
        this.doubleStatus = this.togDouble.isChecked;
    }

    // 请求签到列表
    notifySignList() {
        let signInSignList = new SignInSignListC2S();
        NetUtil.SendMsg(signInSignList);
    }

    // 显示签到列表
    showSignList(param: SignInSignListS2C) {
        this.currDay = param.now;
        for (let i = 0; i < param.list.length; ++i) {
            let data = param.list[i];
            let nodSign = this.nodSigns.children[data.slot - 1];
            this.showSignReward(nodSign, data.reward);
            if (data.slot > param.now) {
                // 未来的签到
                nodSign.getChildByName('nodAddSign').active = false;
                nodSign.getChildByName('nodSigned').active = false;
                nodSign.getChildByName('nodCurrDay').active = false;
                nodSign.getChildByName('nodNormal').active = true;
                nodSign.getComponent(cc.Button).interactable = false;
            } else if (data.slot < param.now) {
                // 过去的签到
                // nodSign.getChildByName('nodAddSign').active = false;
                // nodSign.getChildByName('nodSigned').active = false;
                nodSign.getChildByName('nodCurrDay').active = false;
                if (data.signed === 0) {
                    // 漏签
                    nodSign.getChildByName('nodNormal').active = false;
                    nodSign.getChildByName('nodAddSign').active = true;
                    nodSign.getComponent(cc.Button).interactable = true;
                } else {
                    nodSign.getChildByName('nodNormal').active = true;
                    nodSign.getChildByName('nodSigned').active = true;
                    nodSign.getComponent(cc.Button).interactable = false;
                }
            } else if (data.slot == param.now) {
                // 现在的签到
                nodSign.getChildByName('nodAddSign').active = false;
                nodSign.getChildByName('nodCurrDay').active = true;
                nodSign.getChildByName('nodNormal').active = true;

                if (data.signed === 0) {
                    nodSign.getChildByName('nodSigned').active = false;
                    nodSign.getComponent(cc.Button).interactable = false;
                    this.btnSign.interactable = true;
                } else {
                    nodSign.getChildByName('nodSigned').active = true;
                    nodSign.getComponent(cc.Button).interactable = false;
                    this.btnSign.node.getChildByName('label').getComponent(cc.Label).string = '已签到';
                    this.btnSign.interactable = false;
                }

            }
        }
    }

    // 设置签到奖励
    showSignReward(nodSign, rewardList) {
        if (rewardList.length > 1) {
            // 多个奖励
            nodSign.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = this.spfBox;
            nodSign.getChildByName('name').getComponent(cc.Label).string = '小礼盒';
        } else if (rewardList.length == 1) {
            let prop: PGoods = rewardList[0];

            // 设置图标
            let spriteFrame;
            switch (prop.goodsId) {
                case 11:
                    spriteFrame = this.spfCoin;
                    break;
                case 1:
                    spriteFrame = this.spfBuff1;
                    break;
                case 2:
                    spriteFrame = this.spfBuff2;
                    break;
                case 3:
                    spriteFrame = this.spfBuff3;
                    break;
                case 4:
                    spriteFrame = this.spfBuff4;
                    break;
            }
            nodSign.getChildByName('icon').getComponent(cc.Sprite).spriteFrame = spriteFrame;

            // 设置数量
            nodSign.getChildByName('name').getComponent(cc.Label).string = '数量x' + prop.goodsNum;
        }

    }
    canLoadUIGetProp;
    // 显示签到结果
    showSign(param: SignInSignS2C) {
        let nodSign = this.nodSigns.children[param.slot - 1];
        nodSign.getChildByName('nodSigned').active = true;
        nodSign.getChildByName('nodAddSign').active = false;
        nodSign.getChildByName('nodNormal').active = true;
        nodSign.getComponent(cc.Button).interactable = false;

        if (param.slot === this.currDay) {
            this.btnSign.node.getChildByName('label').getComponent(cc.Label).string = '已签到';
            this.btnSign.interactable = false;
        }
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc.openUI('UIGetProp', (node) => {
            this.canLoadUIGetProp = true;
            node.getComponent('UIGetProp').moreProp(param.reward, () => {
                UIFunc.closeUI('UIGetProp', () => { })
            });
        })
    }

    share(slotIndex, isDouble?) {
        GamePersist.INSTANCE.btnAudio_1();
        ShareManager.Instance.share(6, { slotIndex: slotIndex, isDouble: isDouble });
    }

    // 观看视频
    showAd(slotIndex, isDouble?) {
        if (window['Partner'].supportAd()) {
            GamePersist.INSTANCE.blockInput();
            window['Partner'].showVideoAd(() => {
                ShareManager.Instance.notifySign({ slotIndex: slotIndex, isDouble: isDouble });
            }, () => {
                this.share(slotIndex, isDouble);
            });
        } else {
            cc.log('不支持广告');
            ShareManager.Instance.notifySign({ slotIndex: slotIndex, isDouble: isDouble });
        }
    }

    // 签到
    onBtnSign(slotIndex) {
        if (slotIndex === this.currDay) {
            if (!this.doubleStatus) {
                // 一倍签到
                ShareManager.Instance.notifySign({ slotIndex: slotIndex, isDouble: 0 });
            } else {
                // 双倍签到
                this.showAd(slotIndex, 1);
            }
            return;
        }
        // 补签
        this.showAd(slotIndex);
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.SIGN_List) {
            self.showSignList(param);
        } else if (tag == Message.SIGN_RESULT) {
            self.showSign(param);
        }
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        target.scale = 1;
        switch (target.name) {
            case 'btnBack':
                UIFunc.closeUI('UISign', () => { });
                break;
            case 'nodSign1':
                this.onBtnSign(1);
                break;
            case 'nodSign2':
                this.onBtnSign(2);
                break;
            case 'nodSign3':
                this.onBtnSign(3);
                break;
            case 'nodSign4':
                this.onBtnSign(4);
                break;
            case 'nodSign5':
                this.onBtnSign(5);
                break;
            case 'nodSign6':
                this.onBtnSign(6);
                break;
            case 'nodSign7':
                this.onBtnSign(7);
                break;
            case 'btnSign':
                this.onBtnSign(this.currDay);
                break;
        }
    }
}