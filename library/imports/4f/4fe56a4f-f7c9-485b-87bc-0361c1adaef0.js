"use strict";
cc._RF.push(module, '4fe56pP98lIW4e8A2HBra7w', 'RoomNetHandler');
// scripts/app/component/page/home/RoomNetHandler.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoDispatcher_1 = require("../../../common/net/proto/ProtoDispatcher");
var ProtoSectionRoom_1 = require("../../../common/net/proto/mods/ProtoSectionRoom");
var ProtoSectionRank_1 = require("../../../common/net/proto/mods/ProtoSectionRank");
var HomeManager_1 = require("./HomeManager");
// import PlayManager from "../play/PlayManager";
var Modules = require("../../../module/Modules");
var ProtoSectionGoods_1 = require("../../../common/net/proto/mods/ProtoSectionGoods");
var ProtoSectionTask_1 = require("../../../common/net/proto/mods/ProtoSectionTask");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var ProtoReflect_1 = require("../../../common/net/proto/ProtoReflect");
var PlayManager_1 = require("../../game/PlayManager");
var DataRank_1 = require("../../../module/data/mod/DataRank");
var Message_1 = require("../../../common/Message");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var RoomNetHandler = /** @class */ (function () {
    function RoomNetHandler() {
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomMatchRequestS2C.EVENT_NAME, this.onMatchRequestReceived, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomMatchTimeoutS2C.EVENT_NAME, this.onMatchTimeOutReceived, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomInvisibleS2C.EVENT_NAME, this.onInvisibleRequestReceived, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomPlayConfirmS2C.EVENT_NAME, this.onConfirmReceived, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomPlayCreateS2C.EVENT_NAME, this.onPlayCreate, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomPlayStartS2C.EVENT_NAME, this.onPlayStart, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomReadyTimeoutS2C.EVENT_NAME, this.onReadyTimeout, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomInviteRequestS2C.EVENT_NAME, this.onInviteRequestReceived, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomOpponentLeaveS2C.EVENT_NAME, this.onOpponentLeave, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomInviteRequestS2C.EVENT_NAME, this.onInviteRequestReceived, this);
        // 排行榜
        ProtoDispatcher_1.RankDispatcher.on(ProtoSectionRank_1.RankPlayStarS2C.EVENT_NAME, this.onRankDataReceived, this);
        // RankDispatcher.on(RankPveRankS2C.EVENT_NAME, this.onPveRankDataReceived, this);
        // 获取玩家物品
        ProtoDispatcher_1.GoodsDispatcher.on(ProtoSectionGoods_1.GoodsPullS2C.EVENT_NAME, this.onPlayerGoodsResponse, this);
        ProtoDispatcher_1.GoodsDispatcher.on(ProtoSectionGoods_1.GoodsUpdateS2C.EVENT_NAME, this.onUpdataPlayerGoodsResponse, this);
        ProtoDispatcher_1.GoodsDispatcher.on(ProtoSectionGoods_1.GoodsTurntableRunS2C.EVENT_NAME, this.onTurntableRunResponse, this);
        // 全服大奖数据
        ProtoDispatcher_1.GoodsDispatcher.on(ProtoSectionGoods_1.GoodsTurntableRecordPullS2C.EVENT_NAME, this.onBigLotteryRecordReceived, this);
        ProtoDispatcher_1.GoodsDispatcher.on(ProtoSectionGoods_1.GoodsTurntableRecordNewS2C.EVENT_NAME, this.onUpdataBigLotteryRecordReceived, this);
        // 玩家任务
        ProtoDispatcher_1.TaskDispatcher.on(ProtoSectionTask_1.TaskListS2C.EVENT_NAME, this.onPlayerTaskReceived, this);
        ProtoDispatcher_1.TaskDispatcher.on(ProtoSectionTask_1.TaskUpdateS2C.EVENT_NAME, this.onUpdataPlayerTaskReceived, this);
        GamePersist_1.default.INSTANCE.OnProtoError(ProtoReflect_1.ProtoSection.room, this.onProtoRoomError, this);
        GamePersist_1.default.INSTANCE.OnProtoError(ProtoReflect_1.ProtoSection.rank, this.onProtoRankError, this);
    }
    // 处理room分段协议统一的错误码返回
    RoomNetHandler.prototype.onProtoRoomError = function (message) {
        var protoError = message;
        var protoErrMsg = protoError.errMsg;
        GamePersist_1.default.INSTANCE.Toast(protoErrMsg);
    };
    // 处理rank分段协议统一的错误码返回
    RoomNetHandler.prototype.onProtoRankError = function (message) {
        var protoError = message;
        var protoErrMsg = protoError.errMsg;
        GamePersist_1.default.INSTANCE.Toast(protoErrMsg);
    };
    // 房间已经创建可以开始比赛了
    RoomNetHandler.prototype.onPlayCreate = function (message) {
        var playCreate = message;
        if (!HomeManager_1.default.INSTANCE.HomeUI) {
            return;
        }
        var roomId = playCreate.roomId;
        var playmates = playCreate.playmates;
        var redId = playCreate.redId;
        var bluId = playCreate.bluId;
        var roomType = playCreate.roomType;
        var roomOwner = playCreate.roomOwner;
        if (roomId < 1) {
            cc.warn("\u670D\u52A1\u5668\u901A\u77E5\u65B0\u7684\u4E00\u5C40\u5F00\u59CB \u4F46\u662F\u623F\u95F4Id:" + roomId + " \u4E0D\u5408\u6CD5");
            return;
        }
        HomeManager_1.default.INSTANCE.onPlayCreate(roomId, roomType, roomOwner, redId, bluId, playmates);
    };
    // 收到服务器确认
    RoomNetHandler.prototype.onConfirmReceived = function (message) {
        var confirm = message;
        //console.log("confirm list:", confirm.confirmList);
    };
    RoomNetHandler.prototype.onReadyTimeout = function (message) {
        // 此时提醒准备时间超时，
        // console.log("ReadyTimeout-----------------");
        if (!Modules.Home.DataPlayer.IsMatching) {
            // 如果卡在匹配界面，则取消匹配
            HomeManager_1.default.INSTANCE.HomeUI.doCancelMatch();
        }
    };
    // 新的一局开始
    RoomNetHandler.prototype.onPlayStart = function (message) {
        var playStart = message;
        var roomId = playStart.roomId;
        if (roomId < 1) {
            cc.warn("\u670D\u52A1\u5668\u901A\u77E5\u65B0\u7684\u4E00\u5C40\u5F00\u59CB \u4F46\u662F\u623F\u95F4Id:" + roomId + " \u4E0D\u5408\u6CD5");
            return;
        }
        // 双方的后续局 当前已经在PlayUI场景 说明是再来一局
        if (PlayManager_1.default.INSTANCE.PlayUI) {
            PlayManager_1.default.INSTANCE.onOneMorePlayStart(roomId);
            return;
        }
        // 双方的第一局 如果当前不是HomeUI就是有问题的情况
        if (HomeManager_1.default.INSTANCE.HomeUI) {
            HomeManager_1.default.INSTANCE.onPlayStart(roomId);
            return;
        }
    };
    // 判断下当前是否在邀请确认界面
    RoomNetHandler.prototype.onOpponentLeave = function (message) {
        var opponentLeave = message;
        // console.log("####################onOpponentLeave");
        if (!HomeManager_1.default.INSTANCE.HomeUI) {
            return;
        }
        HomeManager_1.default.INSTANCE.onOpponentLeave(opponentLeave.opponentId);
    };
    RoomNetHandler.prototype.onMatchRequestReceived = function (message) {
    };
    RoomNetHandler.prototype.onMatchTimeOutReceived = function (message) {
        if (HomeManager_1.default.INSTANCE.HomeUI) {
            HomeManager_1.default.INSTANCE.onPvpAiCreate();
            // HomeManager.INSTANCE.HomeUI.doCancelMatch();
            HomeManager_1.default.INSTANCE.HomeUI.activePvpAi();
        }
    };
    RoomNetHandler.prototype.onInvisibleRequestReceived = function (message) {
    };
    // 发送邀请的请求已经被处理
    RoomNetHandler.prototype.onInviteRequestReceived = function (message) {
        var inviteRequest = message;
        if (HomeManager_1.default.INSTANCE.HomeUI) {
            HomeManager_1.default.INSTANCE.onReceiveInviteParam(inviteRequest.inviteeParam);
        }
    };
    // 排行榜的数据返回
    RoomNetHandler.prototype.onRankDataReceived = function (message) {
        var randDataResp = message;
        Modules.Home.DataRank.GlobalRankData = randDataResp.playmates;
        Modules.Home.DataRank.MyRank = randDataResp.myPos;
        DYNotify_1.DYNotify.post(Message_1.Message.UIRankUpdate);
    };
    RoomNetHandler.prototype.onPveRankDataReceived = function (message) {
        var rankData = message;
        Modules.Home.PveRank = new DataRank_1.PveDataRank();
        Modules.Home.PveRank.GlobalRankData = rankData.playmates;
        Modules.Home.PveRank.MyRank = rankData.myPos;
        //console.log(rankData);
    };
    // 玩家物品数据
    RoomNetHandler.prototype.onPlayerGoodsResponse = function (message) {
        // console.log('onPlayerGoodsResponse');
        var respData = message;
        Modules.Home.DataPlayer.PlayerGoodsData = respData.goodsList;
        Modules.Home.DataPlayer.PlayerGoodsDataLast = respData.goodsList;
        DYNotify_1.DYNotify.post(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE_INIT);
    };
    // 更新玩家物品
    RoomNetHandler.prototype.onUpdataPlayerGoodsResponse = function (message) {
        var respData = message;
        Modules.Home.DataPlayer.UpdataPlayerGoods(respData.goodsList);
        DYNotify_1.DYNotify.post(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE);
    };
    // 转盘返回
    RoomNetHandler.prototype.onTurntableRunResponse = function (message) {
        var goodsTurntableRun = message;
        DYNotify_1.DYNotify.post(Message_1.Message.TURNTABLE_LIST, goodsTurntableRun);
    };
    // 全服大奖记录
    RoomNetHandler.prototype.onBigLotteryRecordReceived = function (message) {
        var receiveData = message;
        Modules.Home.DataPlayer.BigLotteryRecordData = receiveData.recordList;
    };
    // 更新全服大奖数据
    RoomNetHandler.prototype.onUpdataBigLotteryRecordReceived = function (message) {
        var receiveData = message;
        Modules.Home.DataPlayer.UpdataBigLotteryRecord(receiveData.record);
        Modules.Home.emit(Message_1.Message.EVENT_MODULE_BIG_LOTTERY);
    };
    // 玩家任务
    RoomNetHandler.prototype.onPlayerTaskReceived = function (message) {
        var receiveData = message;
        Modules.Home.DataPlayer.PlayerTaskData = receiveData.task;
    };
    // 更新玩家任务
    RoomNetHandler.prototype.onUpdataPlayerTaskReceived = function (message) {
        var receiveData = message;
        cc.log(receiveData.task);
        Modules.Home.DataPlayer.UpdataPlayerTask(receiveData.task);
        Modules.Home.emit(Message_1.Message.EVENT_MODULE_PLAYER_TASK);
    };
    return RoomNetHandler;
}());
exports.default = RoomNetHandler;

cc._RF.pop();