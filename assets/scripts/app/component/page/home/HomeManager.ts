import HomeUI from "./HomeUI";
import HomeModule from "./HomeModule";
import * as Modules from "../../../module/Modules";
import { PlayerSelfInfoS2C, PlayerShareGameS2C } from "../../../common/net/proto/mods/ProtoSectionPlayer";
import {
    RoomMatchRequestC2S,
    RoomInvisibleC2S,
    RoomPlayConfirmC2S
} from "../../../common/net/proto/mods/ProtoSectionRoom";
import { ChatFaceC2S, ChatTextC2S } from "../../../common/net/proto/mods/ProtoSectionChat";
import { PPlaymate } from "../../../common/net/proto/ProtoType";
import { RoomType, BuffUpdate } from "./RoomDefine";
import ResLoader from "../../../common/loader/Loader";
import { Fortune, OpenHomeFrom, ValueKey } from "../../../common/Defines";
import SocialManager from "../../../common/social/SocialManager";
import RuntimeManager from "../../../common/runtime/RuntimeManager";
import * as Misc from "../../../common/Misc";
import GamePersist from "../../../common/persist/GamePersist";
import AccManager from "../login/AccManager";
import {
    GoodsTurntableRecordPullS2C,
    GoodsTurntableRecordPullC2S,
    GoodsPullC2S
} from "../../../common/net/proto/mods/ProtoSectionGoods";
import { TaskListC2S } from "../../../common/net/proto/mods/ProtoSectionTask";
import NetUtil from "../../../common/net/NetUtil";
import DYAudio from "../../../../dyGame/DYAudio";
import * as ConfigVO from "../../../common/config/vo/ConfigVO";
import { Event_type } from "../../game/PlayDefine";
import { Head } from "../../../common/config/vo/ConfigVO";
import { UIFunc } from "../../../common/UIFunc";
import UIInviteFriend from "../../../ui/UIInviteFriend";
import UIInviteDevConfirm from "../../../ui/UIInviteDevConfirm";
import { Message } from "../../../common/Message";
import { DYNotify } from "../../../../dyGame/DYNotify";

export default class HomeManager {
    private static singleInstance: HomeManager;

    public static get INSTANCE() {
        if (!this.singleInstance) {
            this.singleInstance = new HomeManager();
        }
        return this.singleInstance;
    }

    private homeUI: HomeUI = null;
    private homeModule: HomeModule;

    public UIInviteFriend: UIInviteFriend = null;

    constructor() {
        this.homeModule = Modules.Home;
        this.bigLotteryRecordRequest();
        this.playerTaskRequest();
        this.playerGoodsRequest();
    }

    public set HomeUI(value: HomeUI) {
        this.homeUI = value;
    }

    public get HomeUI(): HomeUI {
        return this.homeUI;
    }

    public onReceiveShareGameS2C(share: PlayerShareGameS2C) {
        switch (share.reason) {
            case 1:
                Modules.Home.DataPlayer.EnergyShareCnt = share.times;
                break;
            case 2:
                // Modules.Home.DataPlayer.EnergyShareCnt = share.times;
                break;
            case 3:
                Modules.Home.DataPlayer.PropShareCnt = share.times;
                break;
            case 4:
                Modules.Home.DataPlayer.CoinShareCnt = share.times;
                break;
            case 5:
                Modules.Home.DataPlayer.PveShareCnt = share.times;
                break;
        }
    }

    // 显示设置界面
    public showSettingsPanel() {
        const self = this;
        // GamePersist.INSTANCE.ForceWaiting();
        // ResLoader.loadSingle("prefab/home/SettingsLayer", function (err, settingsLayer: cc.Prefab) {
        //     const settingsPanelNode: cc.Node = cc.instantiate(settingsLayer);
        //     settingsPanelNode.parent = HomeManager.INSTANCE.HomeUI.node;
        //     settingsPanelNode.setPosition(0, 0);
        //     // self.SettingsPanel = RankScript.GetComponent(settingsPanelNode);
        //     GamePersist.INSTANCE.CancelWaiting();
        // });
    }

    // 显示排行榜界面
    showRankPanel() {
        const self = this;
        GamePersist.INSTANCE.ForceWaiting();

        UIFunc.openUI('UIRank', (node) => {
            GamePersist.INSTANCE.CancelWaiting();
            GamePersist.INSTANCE.panelPopUp(node.getChildByName('bg_sp'), () => {
                node.getComponent('UIRank').init();
            });
        });
    }

    // 显示背包界面
    public showBagPanel() {
        const self = this;
        GamePersist.INSTANCE.ForceWaiting();

        cc.loader.loadRes("prefab/home/Bag", cc.Prefab, (err, prefab) => {
            var nodItem = cc.instantiate(prefab)
            nodItem.parent = HomeManager.INSTANCE.HomeUI.node;

            nodItem.setPosition(0, 0);
            GamePersist.INSTANCE.CancelWaiting();
            GamePersist.INSTANCE.panelPopUp(nodItem.getChildByName('content'), () => {
            });
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        })
    }

    // 显示商城界面
    public showShopLayer() {
        ResLoader.loadSingle("prefab/home/shop/ShopLayer", function (err, shopLayer: cc.Prefab) {
            const pShopLayer: cc.Node = cc.instantiate(shopLayer);
            HomeManager.INSTANCE.HomeUI.showPanel(pShopLayer.getComponent("ShopLayerScript"));
            // pShopLayer.parent = HomeManager.INSTANCE.HomeUI.node;
            // pShopLayer.setPosition(0, 0);
        });
    }

    // 显示战绩界面
    public showAchievementlayer() {
        GamePersist.INSTANCE.ForceWaiting();

        UIFunc.openUI('UIAchievement', (node) => {
            GamePersist.INSTANCE.CancelWaiting();
            GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
        });
    }

    // 显示邀请等待界面
    public showInvitePanel() {
        if (this.UIInviteFriend) {
            return;
        }
        const self = this;
        UIFunc.openUI('UIInviteFriend', (node) => {
            UIFunc.closeUI('UIInviteDevConfirm', () => { });

            const UIInviteFriend: UIInviteFriend = node.getComponent('UIInviteFriend');
            self.UIInviteFriend = UIInviteFriend;
        })
    }

    // 进入邀请等待界面 作为被邀请者
    public showInvitePanelAsInvitee(invtier: string) {
        const self = this;
        UIFunc.openUI('UIInviteFriend', (node) => {
            UIFunc.closeUI('UIInviteDevConfirm', () => { });

            const UIInviteFriend: UIInviteFriend = node.getComponent('UIInviteFriend');
            self.UIInviteFriend = UIInviteFriend;
            UIInviteFriend.inviteeId = Modules.Home.PlayerId;
            UIInviteFriend.makeInivterInfoRequest(invtier);
        })
    }

    showHomeAd() {
        this.HomeUI.Prop.showHomeAd();
    }
    hideHomeAd() {
        this.HomeUI.Prop.hideHomeAd();
    }

    // 点击其他人分享的(也有可能是自己的)卡片重新打开小游戏
    public onReLaunch() {
        const reLaunchOptions = RuntimeManager.INSTANCE.ReLaunchOptions;
        if (!reLaunchOptions) {
            return;
        }
        if (!this.homeUI) {
            return;
        }
        const launchQuery = reLaunchOptions.query;
        const strPlayerId = `${Modules.Home.PlayerId}`;
        // 确保不是点击本人自己的分享卡片
        if (launchQuery.inviter && launchQuery.inviter !== strPlayerId) {
            // TODO closePanels
            if (this.UIInviteFriend) {
                this.UIInviteFriend.onCloseInvitePage();
            }
            this.showInvitePanelAsInvitee(launchQuery.inviter);
        }
    }

    // 获取全服大奖记录
    public bigLotteryRecordRequest() {
        const data = new GoodsTurntableRecordPullC2S();
        NetUtil.SendMsg(data);
    }

    // 获取玩家的任务
    public playerTaskRequest() {
        const data = new TaskListC2S();
        NetUtil.SendMsg(data);
    }

    // 获取玩家的奖品
    public playerGoodsRequest() {
        const requData = new GoodsPullC2S();
        NetUtil.SendMsg(requData);
    }

    // 发起匹配请求
    public makeMatchRequest(type) {
        const makeRequest = new RoomMatchRequestC2S();
        makeRequest.roomType = type;
        NetUtil.SendMsg(makeRequest);
    }

    // 发送获取物品请求
    public makeGoodsRequest(goodId: number) {
        const msg = new ChatTextC2S();
        msg.content = "#goods " + goodId + " 1";
        NetUtil.SendMsg(msg);
        //console.log("已发送物品请求，id为" + goodId);
    }

    // 取消匹配 或者 邀请
    public makeInvisibleRequest() {
        this.homeUI.doCancelMatch();
        const makeInvisible = new RoomInvisibleC2S();
        NetUtil.SendMsg(makeInvisible);
    }

    // 房间已经创建 可以比赛了
    // 1 如果是匹配产生的房间 则自动确认比赛
    // 2 如果是邀请产生的房间 则 1) 房主需要进行确认 2) 被邀请的人自动确认比赛
    public onPlayCreate(roomId: number, roomType: number, roomOwner: number, redId: number, bluId: number, playmates: PPlaymate[]) {
        const opponentPlaymate = this.getOpponentPlaymate(playmates);
        if (!opponentPlaymate) {
            cc.warn(`房间开始${roomId}比赛 但是获取不到对手信息`);
            return;
        }
        if (roomType === RoomType.MATCH) {
            this.onMatchPlayCreate(roomId, roomOwner, redId, bluId, opponentPlaymate);
        } else {
            this.onInvitePlayCreate(roomId, roomOwner, redId, bluId, opponentPlaymate);
        }
    }

    public onPvpAiCreate() {
        let opponentPlaymate = new PPlaymate();
        opponentPlaymate.id = 1;

        let femaleNameLen = ConfigVO.FemaleName.getExtra("id_list").length;
        let surnNameLen = ConfigVO.Surname.getExtra("id_list").length;
        const surname: string = ConfigVO.Surname.get(ConfigVO.Surname.getExtra("id_list")[Math.floor(Math.random() * surnNameLen)]).name;
        let lastname = ConfigVO.FemaleName.get(ConfigVO.FemaleName.getExtra("id_list")[Math.floor(Math.random() * femaleNameLen)]).name;
        let accName = surname + lastname;


        let sex = (Math.random() > 0.5 ? 1 : 2);
        let head_index = Math.floor(Math.random() * 100);
        let prefix = (sex === 1 ? 'male' : 'female')

        let nameLen = ConfigVO.Name.getExtra("id_list_" + prefix).length;
        accName = ConfigVO.Name.get(ConfigVO.Name.getExtra("id_list_" + prefix)[Math.floor(Math.random() * nameLen)]).name;
        opponentPlaymate.name = accName;

        opponentPlaymate.headImg = prefix + '-' + head_index + ".png";
        opponentPlaymate.sex = sex;
        opponentPlaymate.star = 0;
        this.homeModule.DataRoom.bluId = Modules.Acc.PlayerId;
        this.homeModule.DataRoom.opponentPlaymate = opponentPlaymate;
    }

    // 比赛开始 进入比赛场景
    public onPlayStart(roomId: number) {
        DYAudio.stopMusic();
        if (this.homeModule.DataRoom.currentRoom !== roomId) {
            return;
        }
        DYNotify.post(Event_type.GAMESTART);
    }


    // 当前收到了自己的信息
    public onReceiveSelfInfoS2C(msg: PlayerSelfInfoS2C) {
        this.homeModule.MyPlayerInfo = msg.player;

        var date = new Date();
        this.homeModule.TimeOffset = Math.round(date.getTime() / 1000) - parseInt(this.homeModule.DataPlayer.NowSec);
        // 如果当前不在HomeUI 则切换场景过去
        if (!HomeManager.INSTANCE.HomeUI) {
            // 登陆成功收到主角信息
            if (GamePersist.INSTANCE.RootUI.uiName() === "LoginUI") {
                AccManager.INSTANCE.switchToHome();
            }
        }
    }

    public onBuffStatus(slotId: number, buffId: number, num: number) {
        // console.log("技能槽：", slotId, " buffId：", buffId, "数量：", num);

        // DYNotify.post(BuffUpdate);
    }

    // 当前收到了财富信息
    public onReceiveFortune(fortuneType: number, fortuneValue: number) {
        // console.log("FortuneType:", fortuneType, "fortuneValue:", fortuneValue);
        if (fortuneType === Fortune.Gold) {
            this.homeModule.DataPlayer.FortuneGold = fortuneValue;
        } else if (fortuneType === Fortune.Score) {
            this.homeModule.DataPlayer.FortuneScore = fortuneValue;
        } else if (fortuneType === Fortune.Star) {
            this.homeModule.DataPlayer.FortuneStar = fortuneValue;
            let rate = Misc.formatPercent(this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal);

            const StarNum = Misc.calcShowStarCount(fortuneValue);
            var grade = Misc.getGradeName(fortuneValue) + " " + StarNum + "星";

            window['Partner'].postMsg(5, {
                valuekey: ValueKey.gameRate,
                rate: this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal,
                grade: grade,
                star: fortuneValue
            });
            // 更新社交需要的数据
            SocialManager.INSTANCE.setUserStar(fortuneValue + this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal);
        } else if (fortuneType === Fortune.Energy) {
            this.homeModule.DataPlayer.FortuneEnergy = fortuneValue;
        } else if (fortuneType === Fortune.Gold) {
            this.homeModule.DataPlayer.FortuneGold = fortuneType;
        }
        // 触发事件 通知其他模块财富信息变化
        DYNotify.post(Message.EVENT_MODULE_PLAYER_FORTUNE);
    }

    // 收到对手离开的消息
    public onOpponentLeave(playmateId: number) {
        if (!this.UIInviteFriend) {
            return;
        }
        this.UIInviteFriend.onOpponentLeave(playmateId);
    }

    // 当前收到了比赛统计
    public onReceivePlayStat(playCntTotal: number, playCntWin: number, saveOnce: number, matchOnce: number, pveTotal: number, pveWin: number, weeklyWin: number, weeklyTotal: number, maxSuccessiveWin: number, level: number, guide: number) {
        this.homeModule.DataPlayer.PlayCntTotal = playCntTotal;
        this.homeModule.DataPlayer.PlayCntWin = playCntWin;
        this.homeModule.DataPlayer.PlaySaveOnce = saveOnce;
        this.homeModule.DataPlayer.PlayMatchOnce = matchOnce;
        this.homeModule.DataPlayer.PlayPveTotal = pveTotal;
        this.homeModule.DataPlayer.PlayPveWin = pveWin;
        this.homeModule.DataPlayer.PlayWeeklyWin = weeklyWin;
        this.homeModule.DataPlayer.PlayWeeklyTotal = weeklyTotal;
        this.homeModule.DataPlayer.MaxSuccessiveWin = maxSuccessiveWin;
        this.homeModule.DataPlayer.Level = level;
        this.homeModule.DataPlayer.Guide = guide;

        const StarNum = Misc.calcShowStarCount(this.homeModule.DataPlayer.FortuneStar);
        var grade = Misc.getGradeName(this.homeModule.DataPlayer.FortuneStar) + " " + StarNum + "星";

        let rate = Misc.formatPercent(playCntWin / playCntTotal);
        window['Partner'].postMsg(5, {
            valuekey: ValueKey.gameRate,
            rate: playCntWin / playCntTotal,
            grade: grade,
            star: this.homeModule.DataPlayer.FortuneStar
        });
        // 更新社交需要的数据
        SocialManager.INSTANCE.setUserStar(this.homeModule.DataPlayer.FortuneStar + this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal);
    }

    public onReceivePveStat(pveStatArray) {
        this.homeModule.DataPlayer.pveStatArray = pveStatArray;
    }

    // 当收到了邀请参数
    public onReceiveInviteParam(param: string) {
        const self = this;
        param = SocialManager.INSTANCE.makeInviteParam(param);
        
        window['Partner'].doInvite(param, function (success: boolean, data: any) {
            self.didInviteFriend(success, data);
        });
    }

    // 通过邀请链接进入游戏
    public beInvited(inviter: string) {

    }

    // 取消对手的信息
    private getOpponentPlaymate(playmates: PPlaymate[]): PPlaymate {
        const myPlayerId = Modules.Home.DataPlayer.MyId;
        // cc.log(`我的玩家Id:${myPlayerId} playmates:${playmates}`);
        const len = playmates.length;
        for (let i = 0; i < len; i++) {
            const playmate = playmates[i];
            if (playmate.id !== myPlayerId) {
                return playmate;
            }
        }
    }

    // 进行比赛确认
    private makeConfirmRequest() {
        const confirmC2S = new RoomPlayConfirmC2S();
        NetUtil.SendMsg(confirmC2S);
    }

    // 完成邀请的操作 成功与否看succes
    private didInviteFriend(success: boolean, data: any) {
        const self = this;
        if (window['Partner'].PARTNER_NAME === "Dev") {
            UIFunc.openUI('UIInviteDevConfirm', (node) => {
                UIFunc.closeUI('UIInviteFriend', () => {
                    this.UIInviteFriend = null;
                });
                const devConfirm: UIInviteDevConfirm = node.getComponent('UIInviteDevConfirm');
                devConfirm.setInviteUrl(data.url);
            });
        } else {
            // 显示邀请等待
            this.showInvitePanel();
        }
    }

    private onMatchPlayCreate(roomId: number, roomOwner: number, redId: number, bluId: number, opponentPlaymate: PPlaymate) {
        // 当前已经不在匹配状态了 则直接返回
        if (!Modules.Home.DataPlayer.IsMatching) {
            return;
        }
        this.homeModule.DataRoom.opponentPlaymate = opponentPlaymate;
        // qqplay 玩家需要加载对手头像到本地
        if (window['Partner'].needPreloadOpponentHead()) {
            var FileNameWithoutEnd = window['Partner'].getOpenIdByHeadImgUrl(this.homeModule.DataRoom.opponentPlaymate.headImg);
            window['Partner'].preloadOpponentHead(FileNameWithoutEnd);
        }
        this.homeModule.DataRoom.currentRoom = roomId;
        this.homeModule.DataRoom.bluId = bluId;
        this.homeModule.DataRoom.redId = redId;
        this.homeModule.DataRoom.RoomType = RoomType.MATCH;
        this.homeModule.DataRoom.RoomOwner = roomOwner;
        this.homeModule.DataRoom.EnterRoomConfirm = false;
        this.homeUI.onMatchPlayCreate();
        this.makeConfirmRequest();
    }


    private onInvitePlayCreate(roomId: number, roomOwner: number, redId: number, bluId: number, opponentPlaymate: PPlaymate) {
        if (!this.UIInviteFriend) {
            return;
        }

        this.homeModule.DataRoom.opponentPlaymate = opponentPlaymate;
        // qqplay 玩家需要加载对手头像到本地
        if (window['Partner'].needPreloadOpponentHead()) {
            // console.log("on Opponent Received:" + this.homeModule.DataRoom.opponentPlaymate.id);
        }
        this.homeModule.DataRoom.currentRoom = roomId;
        this.homeModule.DataRoom.bluId = bluId;
        this.homeModule.DataRoom.redId = redId;
        this.homeModule.DataRoom.RoomType = RoomType.MATCH;
        this.homeModule.DataRoom.RoomOwner = roomOwner;
        this.homeModule.DataRoom.EnterRoomConfirm = false;
        this.UIInviteFriend.onPlayCreate();
    }
}
