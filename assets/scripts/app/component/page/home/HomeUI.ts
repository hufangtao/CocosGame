import BaseUI from "../../BaseUI";
import HomeManager from "./HomeManager";
import ResLoader from "../../../common/loader/Loader";
import { RoomInviteRequestC2S } from "../../../common/net/proto/mods/ProtoSectionRoom";
import NetController from "../../../common/net/NetController";
import * as Modules from "../../../module/Modules";
import { OpenHomeFrom } from "../../../common/Defines";
import RuntimeManager from "../../../common/runtime/RuntimeManager";
import GamePersist from "../../../common/persist/GamePersist";
import { Home } from "../../../module/Modules";
import { PlayerClickC2S } from "../../../common/net/proto/mods/ProtoSectionPlayer";
import NetUtil from "../../../common/net/NetUtil";
import PlayManager from "../../game/PlayManager";
import PlaymateHead from "../../prefab/PlaymateHead";
import DYAudio from "../../../../dyGame/DYAudio";
import { PPlaymate } from "../../../common/net/proto/ProtoType";
import { BuffUpdate } from "./RoomDefine";
import Prop from "./Prop";
import { UIFunc } from "../../../common/UIFunc";
import { Message } from "../../../common/Message";
import { DYNotify } from "../../../../dyGame/DYNotify";
import { SignInSignListC2S } from "../../../common/net/proto/mods/ProtoSectionSignIn";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomeUI extends BaseUI {
    @property(cc.Node)
    public btnStartMatch: cc.Node = null;

    @property(cc.Node)
    public btnStartPVE: cc.Node = null;

    @property(cc.Button)
    public btnInviteFriend: cc.Button = null;

    @property(cc.Button)
    public btnGm: cc.Button = null;

    @property(cc.Button)
    public btnPreview: cc.Button = null;

    @property(cc.Button)
    public btnCommendatory: cc.Button = null;

    @property(cc.Node)
    public nodHead: cc.Node = null;
    @property(cc.Prefab)
    public pHeadPerfab: cc.Prefab = null;

    @property({ type: cc.AudioClip })
    public audHomeBg: cc.AudioClip = null;

    @property(cc.Label)
    public labMoneyCount: cc.Label = null;
    @property(cc.Label)
    public energyCount: cc.Label = null;
    @property(cc.Label)
    public energyTimer: cc.Label = null;
    @property(cc.Label)
    public labName: cc.Label = null;

    @property(cc.Node)
    public pointer: cc.Node = null;
    @property(cc.Node)
    public nodAdTip: cc.Node = null;


    private tex: cc.Texture2D;
    private display: cc.Sprite;

    public Prop: Prop;

    public onLoad() {
        super.onLoad();
        cc.director.getCollisionManager().enabled = true;
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify.regObserver(BuffUpdate, this.onNotify, this);
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);

        this.Prop = this.node.getChildByName('Hall').getChildByName('Prop').getComponent('Prop');
        this.Prop.init(this);
        this.node.on('touchstart', this.Prop.onSlotClick, this.Prop);

        this.setName();
        this.showADTip();
        Home.DataPlayer.PlayerGoodsDataLast = Home.DataPlayer.PlayerGoodsData;

        HomeManager.INSTANCE.playerGoodsRequest();

        cc.director.preloadScene('levelChoose')
        window['Partner'].showGameClub();
        HomeManager.INSTANCE.UIInviteFriend = null;
    }

    showADTip() {
        this.nodAdTip.active = true;
        this.scheduleOnce(() => {
            this.nodAdTip.active = false;
            this.nodAdTip.parent.getChildByName('btnWatchAd').getComponent(cc.Animation).play('tvShake');
        }, 4.2)
    }
    hideADTip() {
        this.nodAdTip.active = false;
        this.pointer.active = false;
    }

    // 设置用户名
    setName() {
        this.labName.string = Modules.Play.DataPlay.MyName;
    }

    onEnable() {
        this.updateMmoney();
    }

    updateMmoney() {
        this.labMoneyCount.string = Home.DataPlayer.FortuneGold + '';
    }

    onDisable() {
        cc.director.getCollisionManager().enabled = false;
    }

    public start() {
        super.start();
        PlayManager.INSTANCE.PlayUI = null;
        PlayManager.INSTANCE.PlayUIPve = null;
        HomeManager.INSTANCE.HomeUI = this;
        Modules.Home.DataPlayer.IsMatching = false;
        this.btnPreview.node.active = false;

        // 如果当前网络没有连接 则重新连接
        if (!NetController.INSTANCE.Connected) {
            NetController.INSTANCE.onSocketClose();
            return;
        }

        if (Modules.Home.OpenHomeFrom === OpenHomeFrom.UI_LOGIN) {
            const reLaunchOptions = RuntimeManager.INSTANCE.ReLaunchOptions;
            if (reLaunchOptions && reLaunchOptions.query && reLaunchOptions.query.inviter) {
                HomeManager.INSTANCE.showInvitePanelAsInvitee(reLaunchOptions.query.inviter);
            } else {
                const pathParams: any = window['Partner'].getLaunchQuery();
                if (pathParams.inviter) {
                    HomeManager.INSTANCE.showInvitePanelAsInvitee(pathParams.inviter);
                }
            }
        } else if (Modules.Home.OpenHomeFrom === OpenHomeFrom.UI_PLAY) {
            // const reLaunchOptions = RuntimeManager.INSTANCE.ReLaunchOptions;
            // if (reLaunchOptions && reLaunchOptions.query && reLaunchOptions.query.inviter) {
            //     HomeManager.INSTANCE.showInvitePanelAsInvitee(reLaunchOptions.query.inviter);
            // }
        } else if (Modules.Home.OpenHomeFrom === OpenHomeFrom.UI_AIFIN) {
            // if (Home.DataRoom.OpponentId === 1) {
            //     this.handleStartMatch();
            // }
        }

        this.tex = new cc.Texture2D();
        const displayNode = new cc.Node();
        displayNode.parent = this.node;
        this.display = displayNode.addComponent(cc.Sprite);
        this.display.node.setPosition(0, 0);
        this.display.node.zIndex = (100);
        this.display.node.active = false;

        if (Modules.Home.DataPlayer.Guide == 0) {
            this.activePvpTeach();
        } else {
            if (Modules.Home.OpenHomeFrom === OpenHomeFrom.UI_GUIDE) {
                // console.log("open home from ui UI_GUIDE");
                // this.showGuideHand();
            }
            // this.notifySignList();

            this.showHead();
            DYAudio.playMusic(this.audHomeBg, true);
            this.Prop.showHomeAd();
            GamePersist.INSTANCE.onLoadSceneEnd();

        }

    }

    onLoadSceneEnd() {
    }

    showGuideHand() {
        this.pointer.active = true;
        this.pointer.getComponent(cc.Animation).play("aniGuide");
    }

    showHead() {
        const pHeadNode = cc.instantiate(this.pHeadPerfab);
        pHeadNode.setPosition(0, 0);
        pHeadNode.parent = this.nodHead;
        const playmateHead: PlaymateHead = pHeadNode.getComponent("PlaymateHead");
        playmateHead.HeadUrl = Modules.Home.DataPlayer.MyHeadUrl;
    }

    public activePvpTeach() {
        // this.LayerMatch.active = true;
        let opponentPlaymate = new PPlaymate();
        opponentPlaymate.id = 1;
        opponentPlaymate.name = "我是电脑";
        let head_index = Math.floor((Math.random() + 1) * 5);
        opponentPlaymate.headImg = "head_" + head_index + ".png";
        opponentPlaymate.sex = 1;
        opponentPlaymate.star = 0;
        Home.DataRoom.bluId = Modules.Acc.PlayerId;
        Home.DataRoom.opponentPlaymate = opponentPlaymate;


        GamePersist.INSTANCE.loadScene("bgStory")
    }

    public activePvpAi() {
        // 如果当前没有在匹配状态 直接返回
        if (!Modules.Home.DataPlayer.IsMatching) {
            return;
        }
        // this.LayerMatch.active = true;
        this.scheduleOnce(function () {
            GamePersist.INSTANCE.loadScene("game", function () {
                PlayManager.INSTANCE.PlayUI.layerGame.pvpAi = true;
                PlayManager.INSTANCE.newRound(null);
            });
        });
        this.Prop.hideHomeAd();

    }

    public showCommendatoryIcon() {
        const remoteIcon = Modules.Home.DataPlayer.CommendatoryData[0].push_icon;
        cc.loader.load(remoteIcon, (err, texture: cc.Texture2D) => {
            if (GamePersist.INSTANCE.RootUI.uiName() === "HomeUI") {
                if (err) {
                    this.btnCommendatory.node.active = false;
                } else {
                    this.btnCommendatory.node.active = true;
                    const icon: cc.Sprite = this.btnCommendatory.node.getChildByName("iconSprite").getComponent(cc.Sprite);
                    icon.spriteFrame = new cc.SpriteFrame(texture);
                }
            }
        });
    }
    public onDestroy() {
        cc.director.getScheduler().unscheduleAllForTarget(this);
        DYNotify.removeAllObservers(this);
        HomeManager.INSTANCE.HomeUI = null;
    }

    public uiName(): string {
        return "HomeUI";
    }


    public update(dt) {
        var date = new Date();
        var NowSec = parseInt(String(date.getTime() / 1000)) - Modules.Home.TimeOffset;
        var EnergyFullTime = parseInt(Modules.Home.DataPlayer.EnergyFullTime);
        var time = EnergyFullTime - NowSec;
        var Energy = Modules.Home.DataPlayer.FortuneEnergy;
        this.energyCount.string = Energy + "";
        if (EnergyFullTime == 0) {
            this.energyTimer.string = "已满";
            return;
        }
        var nextEnergy = time % 300;

        var min = parseInt(nextEnergy / 60 + "") + "";
        min = min.length > 1 ? min : "0" + min;
        var sec = parseInt(nextEnergy % 60 + "") + "";
        sec = sec.length > 1 ? sec : "0" + sec;

        this.energyTimer.string = min + ":" + sec;

    }

    public handleCancelMatch() {
        GamePersist.INSTANCE.btnAudio_1();
        this.doCancelMatch();
    }

    public doCancelMatch() {
        // 如果当前没有在匹配状态 直接返回
        Modules.Home.DataPlayer.IsMatching = false;
        if (!Modules.Home.DataPlayer.IsMatching) {
            return;
        }
        this.unscheduleAllCallbacks();

        HomeManager.INSTANCE.makeInvisibleRequest();
    }

    public async handleChooseRoom() {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIChoosePvp', () => {
            GamePersist.INSTANCE.CancelWaiting();
        })
    }

    // 邀请好友
    public handleInviteFriend() {
        GamePersist.INSTANCE.btnAudio_1();
        this.Prop.hideHomeAd();

        // 手动调用取消匹配
        if (Modules.Home.DataPlayer.IsMatching) {
            this.doCancelMatch();
        }

        const inviteReq = new RoomInviteRequestC2S();
        NetUtil.SendMsg(inviteReq);
    }

    handleSign() {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UISign', () => {
            GamePersist.INSTANCE.CancelWaiting();
        });
    }
    handleTurntable() {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UITurntable', () => {
            GamePersist.INSTANCE.CancelWaiting();
        });
    }

    // 设置
    public handleSetting() {
        GamePersist.INSTANCE.toast('暂未开放');
        // HomeManager.INSTANCE.showSettingsPanel();
    }

    // 背包
    public handleBag() {
        GamePersist.INSTANCE.btnAudio_1();
        HomeManager.INSTANCE.showBagPanel();
    }

    // 排行榜
    public handleRank() {
        GamePersist.INSTANCE.btnAudio_1();
        HomeManager.INSTANCE.showRankPanel();
    }

    // 商店
    public handleShop() {
        GamePersist.INSTANCE.toast('暂未开放');
        return;
        GamePersist.INSTANCE.btnAudio_1();
        HomeManager.INSTANCE.showShopLayer();
    }

    // 个人信息成就
    public handleAchievement() {
        GamePersist.INSTANCE.btnAudio_1();
        HomeManager.INSTANCE.showAchievementlayer();
    }

    // 当成功匹配的时候
    public onMatchPlayCreate() {
        const self = this;
        this.node.getChildByName('UIMatch').getComponent('UIMatch').setOpponentInfo();
    }


    public handleGetServerTime(event: cc.Event.EventTouch) {
    }

    public handleGm() {
        const self = this;
        ResLoader.loadSingle("prefab/home/GmPanel", function (err, gm: cc.Prefab) {
            const gmNode: cc.Node = cc.instantiate(gm);
            gmNode.parent = self.node;
            gmNode.setPosition(0, 0);
        });
    }

    public handlePreview() {
        const self = this;
        window['Partner'].previewImg({});
    }

    public onAppHide() {
        if (Modules.Home.DataPlayer.IsMatching) {
            this.handleCancelMatch();
            this.node.getChildByName('UIMatch').getComponent('UIMatch').doCancelMatch();
        }
        window['Partner'].hideHomeAd();
    }

    public handleCommendatory() {
        const arrData = Modules.Home.DataPlayer.CommendatoryData;
        const result = [];
        for (let i = 0; i < arrData.length; i++) {
            result.push(arrData[0].push_img);
        }
        window['Partner'].previewImg(result);
    }

    private async startPVE() {
        const dataPoint = new PlayerClickC2S();
        dataPoint.point = 2;
        NetUtil.SendMsg(dataPoint);

        GamePersist.INSTANCE.directionScene = 'levelChoose';
        GamePersist.INSTANCE.loadScene("levelChoose");
        this.Prop.hideHomeAd();
    }
    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.GET_SHARE_CNT) {
            if (param.reason != 1) {
                return;
            }
            if (param.success === 1) {
                self.showEnergyEmpty(2);
            }
        } else if (tag === Message.EVENT_MODULE_PLAYER_FORTUNE) {
            this.updateMmoney();
        } else if (tag === Message.SIGN_List) {
            for (let i = 0; i < param.list.length; ++i) {
                let data = param.list[i];
                if (data.slot != param.now) {
                    continue;
                }
                if (data.signed === 1) {
                    return;
                }
                if (UIFunc.findUI('UISign')) {
                    return;
                }
                UIFunc.openUI('UISign', () => { });
                DYNotify.unregObserver(Message.SIGN_List, this.onNotify, this);
            }
        }
    }

    // 请求签到列表
    notifySignList() {
        DYNotify.regObserver(Message.SIGN_List, this.onNotify, this);

        let signInSignList = new SignInSignListC2S();
        NetUtil.SendMsg(signInSignList);
    }
    showEnergyEmpty(mode) {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIEnergy', (node) => {
            node.getComponent('UIEnergy').setMode(mode);
            GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
            GamePersist.INSTANCE.CancelWaiting();
        })
    }

    // 获得体力
    getEnergy() {
        GamePersist.INSTANCE.btnAudio_1();
        if (Home.DataPlayer.FortuneEnergy >= 30) {
            GamePersist.INSTANCE.toast('体力已经满啦');
        } else {
            this.showEnergyEmpty(3);
        }
    }

    startMatch() {
        const dataPoint = new PlayerClickC2S();
        dataPoint.point = 1;
        NetUtil.SendMsg(dataPoint);

        Home.OpenHomeFrom = OpenHomeFrom.UI_PLAY;
        Home.DataPlayer.IsMatching = true;

        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIMatch', () => {
            HomeManager.INSTANCE.makeMatchRequest(1);
            GamePersist.INSTANCE.CancelWaiting();
        })
    }

    public btnListener(event: cc.Event.EventTouch) {
        this.pointer.active = false;
        var target = event.target;
        this.Prop.onSlotClick(null);
        switch (target.name) {
            case 'btnBack':
                this.doCancelMatch();
                break;
            case 'btnStartMatch':
                this.handleChooseRoom();
                // this.startMatch();
                break;
            case 'btnInviteFriend':
                this.handleInviteFriend();
                break;
            case 'btnStartPVE':
                this.startPVE();
                break;
            case 'btnShowRank':
                this.handleRank();
                break;
            case 'btnShowShop':
                this.handleShop();
                break;
            case 'btnGm':
                this.handleGm();
                break;
            case 'btnPreview':
                this.handlePreview();
                break;
            case 'btnCommendatory':
                this.handleCommendatory();
                break;
            case 'btnStartPVE':
                this.startPVE();
                break;
            case 'btnSign':
                this.handleSign();
                break;
            case 'btnTurntable':
                this.handleTurntable();
                break;
            case 'BtnSetting':
                this.handleSetting();
                break;
            case 'BtnRank':
                this.Prop.hideHomeAd();
                this.handleRank();
                break;
            case 'BtnBag':
                this.handleBag();
                break;
            case 'BtnShop':
                this.handleShop();
                break;
            case 'BtnScore':
                this.Prop.hideHomeAd();
                this.handleAchievement();
                break;
            case 'btnGetEnergy':
                this.getEnergy();
                break;
            case 'btnAddCoin':
                this.loadUIGetCoin();
                break;
        }
    }

    // 加载获取金币窗口
    loadUIGetCoin() {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIGetCoin', (node) => {
            GamePersist.INSTANCE.CancelWaiting();
            node.getComponent('UIGetCoin').setType(2);
        })
    }

}
