"use strict";
cc._RF.push(module, 'f56d4BYZk1LNYZLHdKI0jjK', 'HomeManager');
// scripts/app/component/page/home/HomeManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules = require("../../../module/Modules");
var ProtoSectionRoom_1 = require("../../../common/net/proto/mods/ProtoSectionRoom");
var ProtoSectionChat_1 = require("../../../common/net/proto/mods/ProtoSectionChat");
var ProtoType_1 = require("../../../common/net/proto/ProtoType");
var RoomDefine_1 = require("./RoomDefine");
var Loader_1 = require("../../../common/loader/Loader");
var Defines_1 = require("../../../common/Defines");
var SocialManager_1 = require("../../../common/social/SocialManager");
var RuntimeManager_1 = require("../../../common/runtime/RuntimeManager");
var Misc = require("../../../common/Misc");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var AccManager_1 = require("../login/AccManager");
var ProtoSectionGoods_1 = require("../../../common/net/proto/mods/ProtoSectionGoods");
var ProtoSectionTask_1 = require("../../../common/net/proto/mods/ProtoSectionTask");
var NetUtil_1 = require("../../../common/net/NetUtil");
var DYAudio_1 = require("../../../../dyGame/DYAudio");
var ConfigVO = require("../../../common/config/vo/ConfigVO");
var PlayDefine_1 = require("../../game/PlayDefine");
var UIFunc_1 = require("../../../common/UIFunc");
var Message_1 = require("../../../common/Message");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var HomeManager = /** @class */ (function () {
    function HomeManager() {
        this.homeUI = null;
        this.UIInviteFriend = null;
        this.homeModule = Modules.Home;
        this.bigLotteryRecordRequest();
        this.playerTaskRequest();
        this.playerGoodsRequest();
    }
    Object.defineProperty(HomeManager, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new HomeManager();
            }
            return this.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeManager.prototype, "HomeUI", {
        get: function () {
            return this.homeUI;
        },
        set: function (value) {
            this.homeUI = value;
        },
        enumerable: true,
        configurable: true
    });
    HomeManager.prototype.onReceiveShareGameS2C = function (share) {
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
    };
    // 显示设置界面
    HomeManager.prototype.showSettingsPanel = function () {
        var self = this;
        // GamePersist.INSTANCE.ForceWaiting();
        // ResLoader.loadSingle("prefab/home/SettingsLayer", function (err, settingsLayer: cc.Prefab) {
        //     const settingsPanelNode: cc.Node = cc.instantiate(settingsLayer);
        //     settingsPanelNode.parent = HomeManager.INSTANCE.HomeUI.node;
        //     settingsPanelNode.setPosition(0, 0);
        //     // self.SettingsPanel = RankScript.GetComponent(settingsPanelNode);
        //     GamePersist.INSTANCE.CancelWaiting();
        // });
    };
    // 显示排行榜界面
    HomeManager.prototype.showRankPanel = function () {
        var self = this;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIRank', function (node) {
            GamePersist_1.default.INSTANCE.CancelWaiting();
            GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('bg_sp'), function () {
                node.getComponent('UIRank').init();
            });
        });
    };
    // 显示背包界面
    HomeManager.prototype.showBagPanel = function () {
        var self = this;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        cc.loader.loadRes("prefab/home/Bag", cc.Prefab, function (err, prefab) {
            var nodItem = cc.instantiate(prefab);
            nodItem.parent = HomeManager.INSTANCE.HomeUI.node;
            nodItem.setPosition(0, 0);
            GamePersist_1.default.INSTANCE.CancelWaiting();
            GamePersist_1.default.INSTANCE.panelPopUp(nodItem.getChildByName('content'), function () {
            });
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        });
    };
    // 显示商城界面
    HomeManager.prototype.showShopLayer = function () {
        Loader_1.default.loadSingle("prefab/home/shop/ShopLayer", function (err, shopLayer) {
            var pShopLayer = cc.instantiate(shopLayer);
            HomeManager.INSTANCE.HomeUI.showPanel(pShopLayer.getComponent("ShopLayerScript"));
            // pShopLayer.parent = HomeManager.INSTANCE.HomeUI.node;
            // pShopLayer.setPosition(0, 0);
        });
    };
    // 显示战绩界面
    HomeManager.prototype.showAchievementlayer = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIAchievement', function (node) {
            GamePersist_1.default.INSTANCE.CancelWaiting();
            GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
        });
    };
    // 显示邀请等待界面
    HomeManager.prototype.showInvitePanel = function () {
        if (this.UIInviteFriend) {
            return;
        }
        var self = this;
        UIFunc_1.UIFunc.openUI('UIInviteFriend', function (node) {
            UIFunc_1.UIFunc.closeUI('UIInviteDevConfirm', function () { });
            var UIInviteFriend = node.getComponent('UIInviteFriend');
            self.UIInviteFriend = UIInviteFriend;
        });
    };
    // 进入邀请等待界面 作为被邀请者
    HomeManager.prototype.showInvitePanelAsInvitee = function (invtier) {
        var self = this;
        UIFunc_1.UIFunc.openUI('UIInviteFriend', function (node) {
            UIFunc_1.UIFunc.closeUI('UIInviteDevConfirm', function () { });
            var UIInviteFriend = node.getComponent('UIInviteFriend');
            self.UIInviteFriend = UIInviteFriend;
            UIInviteFriend.inviteeId = Modules.Home.PlayerId;
            UIInviteFriend.makeInivterInfoRequest(invtier);
        });
    };
    HomeManager.prototype.showHomeAd = function () {
        this.HomeUI.Prop.showHomeAd();
    };
    HomeManager.prototype.hideHomeAd = function () {
        this.HomeUI.Prop.hideHomeAd();
    };
    // 点击其他人分享的(也有可能是自己的)卡片重新打开小游戏
    HomeManager.prototype.onReLaunch = function () {
        var reLaunchOptions = RuntimeManager_1.default.INSTANCE.ReLaunchOptions;
        if (!reLaunchOptions) {
            return;
        }
        if (!this.homeUI) {
            return;
        }
        var launchQuery = reLaunchOptions.query;
        var strPlayerId = "" + Modules.Home.PlayerId;
        // 确保不是点击本人自己的分享卡片
        if (launchQuery.inviter && launchQuery.inviter !== strPlayerId) {
            // TODO closePanels
            if (this.UIInviteFriend) {
                this.UIInviteFriend.onCloseInvitePage();
            }
            this.showInvitePanelAsInvitee(launchQuery.inviter);
        }
    };
    // 获取全服大奖记录
    HomeManager.prototype.bigLotteryRecordRequest = function () {
        var data = new ProtoSectionGoods_1.GoodsTurntableRecordPullC2S();
        NetUtil_1.default.SendMsg(data);
    };
    // 获取玩家的任务
    HomeManager.prototype.playerTaskRequest = function () {
        var data = new ProtoSectionTask_1.TaskListC2S();
        NetUtil_1.default.SendMsg(data);
    };
    // 获取玩家的奖品
    HomeManager.prototype.playerGoodsRequest = function () {
        var requData = new ProtoSectionGoods_1.GoodsPullC2S();
        NetUtil_1.default.SendMsg(requData);
    };
    // 发起匹配请求
    HomeManager.prototype.makeMatchRequest = function (type) {
        var makeRequest = new ProtoSectionRoom_1.RoomMatchRequestC2S();
        makeRequest.roomType = type;
        NetUtil_1.default.SendMsg(makeRequest);
    };
    // 发送获取物品请求
    HomeManager.prototype.makeGoodsRequest = function (goodId) {
        var msg = new ProtoSectionChat_1.ChatTextC2S();
        msg.content = "#goods " + goodId + " 1";
        NetUtil_1.default.SendMsg(msg);
        //console.log("已发送物品请求，id为" + goodId);
    };
    // 取消匹配 或者 邀请
    HomeManager.prototype.makeInvisibleRequest = function () {
        this.homeUI.doCancelMatch();
        var makeInvisible = new ProtoSectionRoom_1.RoomInvisibleC2S();
        NetUtil_1.default.SendMsg(makeInvisible);
    };
    // 房间已经创建 可以比赛了
    // 1 如果是匹配产生的房间 则自动确认比赛
    // 2 如果是邀请产生的房间 则 1) 房主需要进行确认 2) 被邀请的人自动确认比赛
    HomeManager.prototype.onPlayCreate = function (roomId, roomType, roomOwner, redId, bluId, playmates) {
        var opponentPlaymate = this.getOpponentPlaymate(playmates);
        if (!opponentPlaymate) {
            cc.warn("\u623F\u95F4\u5F00\u59CB" + roomId + "\u6BD4\u8D5B \u4F46\u662F\u83B7\u53D6\u4E0D\u5230\u5BF9\u624B\u4FE1\u606F");
            return;
        }
        if (roomType === RoomDefine_1.RoomType.MATCH) {
            this.onMatchPlayCreate(roomId, roomOwner, redId, bluId, opponentPlaymate);
        }
        else {
            this.onInvitePlayCreate(roomId, roomOwner, redId, bluId, opponentPlaymate);
        }
    };
    HomeManager.prototype.onPvpAiCreate = function () {
        var opponentPlaymate = new ProtoType_1.PPlaymate();
        opponentPlaymate.id = 1;
        var femaleNameLen = ConfigVO.FemaleName.getExtra("id_list").length;
        var surnNameLen = ConfigVO.Surname.getExtra("id_list").length;
        var surname = ConfigVO.Surname.get(ConfigVO.Surname.getExtra("id_list")[Math.floor(Math.random() * surnNameLen)]).name;
        var lastname = ConfigVO.FemaleName.get(ConfigVO.FemaleName.getExtra("id_list")[Math.floor(Math.random() * femaleNameLen)]).name;
        var accName = surname + lastname;
        var sex = (Math.random() > 0.5 ? 1 : 2);
        var head_index = Math.floor(Math.random() * 100);
        var prefix = (sex === 1 ? 'male' : 'female');
        var nameLen = ConfigVO.Name.getExtra("id_list_" + prefix).length;
        accName = ConfigVO.Name.get(ConfigVO.Name.getExtra("id_list_" + prefix)[Math.floor(Math.random() * nameLen)]).name;
        opponentPlaymate.name = accName;
        opponentPlaymate.headImg = prefix + '-' + head_index + ".png";
        opponentPlaymate.sex = sex;
        opponentPlaymate.star = 0;
        this.homeModule.DataRoom.bluId = Modules.Acc.PlayerId;
        this.homeModule.DataRoom.opponentPlaymate = opponentPlaymate;
    };
    // 比赛开始 进入比赛场景
    HomeManager.prototype.onPlayStart = function (roomId) {
        DYAudio_1.default.stopMusic();
        if (this.homeModule.DataRoom.currentRoom !== roomId) {
            return;
        }
        DYNotify_1.DYNotify.post(PlayDefine_1.Event_type.GAMESTART);
    };
    // 当前收到了自己的信息
    HomeManager.prototype.onReceiveSelfInfoS2C = function (msg) {
        this.homeModule.MyPlayerInfo = msg.player;
        var date = new Date();
        this.homeModule.TimeOffset = Math.round(date.getTime() / 1000) - parseInt(this.homeModule.DataPlayer.NowSec);
        // 如果当前不在HomeUI 则切换场景过去
        if (!HomeManager.INSTANCE.HomeUI) {
            // 登陆成功收到主角信息
            if (GamePersist_1.default.INSTANCE.RootUI.uiName() === "LoginUI") {
                AccManager_1.default.INSTANCE.switchToHome();
            }
        }
    };
    HomeManager.prototype.onBuffStatus = function (slotId, buffId, num) {
        // console.log("技能槽：", slotId, " buffId：", buffId, "数量：", num);
        // DYNotify.post(BuffUpdate);
    };
    // 当前收到了财富信息
    HomeManager.prototype.onReceiveFortune = function (fortuneType, fortuneValue) {
        // console.log("FortuneType:", fortuneType, "fortuneValue:", fortuneValue);
        if (fortuneType === Defines_1.Fortune.Gold) {
            this.homeModule.DataPlayer.FortuneGold = fortuneValue;
        }
        else if (fortuneType === Defines_1.Fortune.Score) {
            this.homeModule.DataPlayer.FortuneScore = fortuneValue;
        }
        else if (fortuneType === Defines_1.Fortune.Star) {
            this.homeModule.DataPlayer.FortuneStar = fortuneValue;
            var rate = Misc.formatPercent(this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal);
            var StarNum = Misc.calcShowStarCount(fortuneValue);
            var grade = Misc.getGradeName(fortuneValue) + " " + StarNum + "星";
            window['Partner'].postMsg(5, {
                valuekey: Defines_1.ValueKey.gameRate,
                rate: this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal,
                grade: grade,
                star: fortuneValue
            });
            // 更新社交需要的数据
            SocialManager_1.default.INSTANCE.setUserStar(fortuneValue + this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal);
        }
        else if (fortuneType === Defines_1.Fortune.Energy) {
            this.homeModule.DataPlayer.FortuneEnergy = fortuneValue;
        }
        else if (fortuneType === Defines_1.Fortune.Gold) {
            this.homeModule.DataPlayer.FortuneGold = fortuneType;
        }
        // 触发事件 通知其他模块财富信息变化
        DYNotify_1.DYNotify.post(Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE);
    };
    // 收到对手离开的消息
    HomeManager.prototype.onOpponentLeave = function (playmateId) {
        if (!this.UIInviteFriend) {
            return;
        }
        this.UIInviteFriend.onOpponentLeave(playmateId);
    };
    // 当前收到了比赛统计
    HomeManager.prototype.onReceivePlayStat = function (playCntTotal, playCntWin, saveOnce, matchOnce, pveTotal, pveWin, weeklyWin, weeklyTotal, maxSuccessiveWin, level, guide) {
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
        var StarNum = Misc.calcShowStarCount(this.homeModule.DataPlayer.FortuneStar);
        var grade = Misc.getGradeName(this.homeModule.DataPlayer.FortuneStar) + " " + StarNum + "星";
        var rate = Misc.formatPercent(playCntWin / playCntTotal);
        window['Partner'].postMsg(5, {
            valuekey: Defines_1.ValueKey.gameRate,
            rate: playCntWin / playCntTotal,
            grade: grade,
            star: this.homeModule.DataPlayer.FortuneStar
        });
        // 更新社交需要的数据
        SocialManager_1.default.INSTANCE.setUserStar(this.homeModule.DataPlayer.FortuneStar + this.homeModule.DataPlayer.PlayCntWin / this.homeModule.DataPlayer.PlayCntTotal);
    };
    HomeManager.prototype.onReceivePveStat = function (pveStatArray) {
        this.homeModule.DataPlayer.pveStatArray = pveStatArray;
    };
    // 当收到了邀请参数
    HomeManager.prototype.onReceiveInviteParam = function (param) {
        var self = this;
        param = SocialManager_1.default.INSTANCE.makeInviteParam(param);
        window['Partner'].doInvite(param, function (success, data) {
            self.didInviteFriend(success, data);
        });
    };
    // 通过邀请链接进入游戏
    HomeManager.prototype.beInvited = function (inviter) {
    };
    // 取消对手的信息
    HomeManager.prototype.getOpponentPlaymate = function (playmates) {
        var myPlayerId = Modules.Home.DataPlayer.MyId;
        // cc.log(`我的玩家Id:${myPlayerId} playmates:${playmates}`);
        var len = playmates.length;
        for (var i = 0; i < len; i++) {
            var playmate = playmates[i];
            if (playmate.id !== myPlayerId) {
                return playmate;
            }
        }
    };
    // 进行比赛确认
    HomeManager.prototype.makeConfirmRequest = function () {
        var confirmC2S = new ProtoSectionRoom_1.RoomPlayConfirmC2S();
        NetUtil_1.default.SendMsg(confirmC2S);
    };
    // 完成邀请的操作 成功与否看succes
    HomeManager.prototype.didInviteFriend = function (success, data) {
        var _this = this;
        var self = this;
        if (window['Partner'].PARTNER_NAME === "Dev") {
            UIFunc_1.UIFunc.openUI('UIInviteDevConfirm', function (node) {
                UIFunc_1.UIFunc.closeUI('UIInviteFriend', function () {
                    _this.UIInviteFriend = null;
                });
                var devConfirm = node.getComponent('UIInviteDevConfirm');
                devConfirm.setInviteUrl(data.url);
            });
        }
        else {
            // 显示邀请等待
            this.showInvitePanel();
        }
    };
    HomeManager.prototype.onMatchPlayCreate = function (roomId, roomOwner, redId, bluId, opponentPlaymate) {
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
        this.homeModule.DataRoom.RoomType = RoomDefine_1.RoomType.MATCH;
        this.homeModule.DataRoom.RoomOwner = roomOwner;
        this.homeModule.DataRoom.EnterRoomConfirm = false;
        this.homeUI.onMatchPlayCreate();
        this.makeConfirmRequest();
    };
    HomeManager.prototype.onInvitePlayCreate = function (roomId, roomOwner, redId, bluId, opponentPlaymate) {
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
        this.homeModule.DataRoom.RoomType = RoomDefine_1.RoomType.MATCH;
        this.homeModule.DataRoom.RoomOwner = roomOwner;
        this.homeModule.DataRoom.EnterRoomConfirm = false;
        this.UIInviteFriend.onPlayCreate();
    };
    return HomeManager;
}());
exports.default = HomeManager;

cc._RF.pop();