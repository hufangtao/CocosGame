import {
    RoomDispatcher,
    RankDispatcher,
    GoodsDispatcher,
    TaskDispatcher
} from "../../../common/net/proto/ProtoDispatcher";
import {
    RoomMatchRequestS2C,
    RoomInvisibleS2C,
    RoomPlayStartS2C,
    RoomPlayCreateS2C,
    RoomPlayConfirmS2C,
    RoomInviteRequestS2C,
    RoomOpponentLeaveS2C,
    RoomMatchTimeoutS2C, RoomReadyTimeoutS2C
} from "../../../common/net/proto/mods/ProtoSectionRoom";
import { RankPlayStarS2C, RankPveRankS2C } from "../../../common/net/proto/mods/ProtoSectionRank";
import HomeManager from "./HomeManager";
// import PlayManager from "../play/PlayManager";
import * as Modules from "../../../module/Modules";
import {
    GoodsTurntableRecordPullS2C,
    GoodsTurntableRecordNewS2C,
    GoodsUpdateS2C,
    GoodsPullC2S,
    GoodsPullS2C,
    GoodsTurntableRunS2C
} from "../../../common/net/proto/mods/ProtoSectionGoods";
import { TaskListS2C, TaskUpdateS2C } from "../../../common/net/proto/mods/ProtoSectionTask";
import GamePersist from "../../../common/persist/GamePersist";
import { ProtoSection } from "../../../common/net/proto/ProtoReflect";
import { IProtoError } from "../../../common/Defines";
import PlayManager from "../../game/PlayManager";
import { PveDataRank } from "../../../module/data/mod/DataRank";
import { Message } from "../../../common/Message";
import { DYNotify } from "../../../../dyGame/DYNotify";

export default class RoomNetHandler {
    constructor() {
        RoomDispatcher.on(RoomMatchRequestS2C.EVENT_NAME, this.onMatchRequestReceived, this);
        RoomDispatcher.on(RoomMatchTimeoutS2C.EVENT_NAME, this.onMatchTimeOutReceived, this);
        RoomDispatcher.on(RoomInvisibleS2C.EVENT_NAME, this.onInvisibleRequestReceived, this);
        RoomDispatcher.on(RoomPlayConfirmS2C.EVENT_NAME, this.onConfirmReceived, this);
        RoomDispatcher.on(RoomPlayCreateS2C.EVENT_NAME, this.onPlayCreate, this);
        RoomDispatcher.on(RoomPlayStartS2C.EVENT_NAME, this.onPlayStart, this);
        RoomDispatcher.on(RoomReadyTimeoutS2C.EVENT_NAME, this.onReadyTimeout, this);
        RoomDispatcher.on(RoomInviteRequestS2C.EVENT_NAME, this.onInviteRequestReceived, this);
        RoomDispatcher.on(RoomOpponentLeaveS2C.EVENT_NAME, this.onOpponentLeave, this);
        RoomDispatcher.on(RoomInviteRequestS2C.EVENT_NAME, this.onInviteRequestReceived, this);

        // 排行榜
        RankDispatcher.on(RankPlayStarS2C.EVENT_NAME, this.onRankDataReceived, this);
        // RankDispatcher.on(RankPveRankS2C.EVENT_NAME, this.onPveRankDataReceived, this);

        // 获取玩家物品
        GoodsDispatcher.on(GoodsPullS2C.EVENT_NAME, this.onPlayerGoodsResponse, this);
        GoodsDispatcher.on(GoodsUpdateS2C.EVENT_NAME, this.onUpdataPlayerGoodsResponse, this);
        GoodsDispatcher.on(GoodsTurntableRunS2C.EVENT_NAME, this.onTurntableRunResponse, this);

        // 全服大奖数据
        GoodsDispatcher.on(GoodsTurntableRecordPullS2C.EVENT_NAME, this.onBigLotteryRecordReceived, this);
        GoodsDispatcher.on(GoodsTurntableRecordNewS2C.EVENT_NAME, this.onUpdataBigLotteryRecordReceived, this);

        // 玩家任务
        TaskDispatcher.on(TaskListS2C.EVENT_NAME, this.onPlayerTaskReceived, this);
        TaskDispatcher.on(TaskUpdateS2C.EVENT_NAME, this.onUpdataPlayerTaskReceived, this);
        GamePersist.INSTANCE.OnProtoError(ProtoSection.room, this.onProtoRoomError, this);
        GamePersist.INSTANCE.OnProtoError(ProtoSection.rank, this.onProtoRankError, this);
    }

    // 处理room分段协议统一的错误码返回
    public onProtoRoomError(message) {
        const protoError: IProtoError = message;
        const protoErrMsg = protoError.errMsg;
        GamePersist.INSTANCE.Toast(protoErrMsg);
    }

    // 处理rank分段协议统一的错误码返回
    public onProtoRankError(message) {
        const protoError: IProtoError = message;
        const protoErrMsg = protoError.errMsg;
        GamePersist.INSTANCE.Toast(protoErrMsg);
    }


    // 房间已经创建可以开始比赛了
    public onPlayCreate(message) {
        const playCreate: RoomPlayCreateS2C = message;
        if (!HomeManager.INSTANCE.HomeUI) {
            return;
        }
        const roomId = playCreate.roomId;
        const playmates = playCreate.playmates;
        const redId = playCreate.redId;
        const bluId = playCreate.bluId;
        const roomType = playCreate.roomType;
        const roomOwner = playCreate.roomOwner;
        if (roomId < 1) {
            cc.warn(`服务器通知新的一局开始 但是房间Id:${roomId} 不合法`);
            return;
        }
        HomeManager.INSTANCE.onPlayCreate(roomId, roomType, roomOwner, redId, bluId, playmates);
    }

    // 收到服务器确认
    public onConfirmReceived(message) {
        const confirm: RoomPlayConfirmS2C = message;
        //console.log("confirm list:", confirm.confirmList);
    }

    public onReadyTimeout(message) {
        // 此时提醒准备时间超时，
        // console.log("ReadyTimeout-----------------");
        if (!Modules.Home.DataPlayer.IsMatching) {
            // 如果卡在匹配界面，则取消匹配
            HomeManager.INSTANCE.HomeUI.doCancelMatch();
        }
    }

    // 新的一局开始
    public onPlayStart(message) {
        const playStart: RoomPlayStartS2C = message;
        const roomId = playStart.roomId;
        if (roomId < 1) {
            cc.warn(`服务器通知新的一局开始 但是房间Id:${roomId} 不合法`);
            return;
        }

        // 双方的后续局 当前已经在PlayUI场景 说明是再来一局
        if (PlayManager.INSTANCE.PlayUI) {
            PlayManager.INSTANCE.onOneMorePlayStart(roomId);
            return;
        }

        // 双方的第一局 如果当前不是HomeUI就是有问题的情况
        if (HomeManager.INSTANCE.HomeUI) {
            HomeManager.INSTANCE.onPlayStart(roomId);
            return;
        }
    }

    // 判断下当前是否在邀请确认界面
    public onOpponentLeave(message) {
        const opponentLeave: RoomOpponentLeaveS2C = message;
        // console.log("####################onOpponentLeave");
        if (!HomeManager.INSTANCE.HomeUI) {
            return;
        }
        HomeManager.INSTANCE.onOpponentLeave(opponentLeave.opponentId);
    }


    public onMatchRequestReceived(message) {
    }

    public onMatchTimeOutReceived(message) {
        if (HomeManager.INSTANCE.HomeUI) {
            HomeManager.INSTANCE.onPvpAiCreate();
            // HomeManager.INSTANCE.HomeUI.doCancelMatch();
            HomeManager.INSTANCE.HomeUI.activePvpAi();
        }
    }

    public onInvisibleRequestReceived(message) {
    }

    // 发送邀请的请求已经被处理
    public onInviteRequestReceived(message) {
        const inviteRequest: RoomInviteRequestS2C = message;
        if (HomeManager.INSTANCE.HomeUI) {
            HomeManager.INSTANCE.onReceiveInviteParam(inviteRequest.inviteeParam);
        }
    }

    // 排行榜的数据返回
    public onRankDataReceived(message) {
        const randDataResp: RankPlayStarS2C = message;
        Modules.Home.DataRank.GlobalRankData = randDataResp.playmates;
        Modules.Home.DataRank.MyRank = randDataResp.myPos;
        DYNotify.post(Message.UIRankUpdate);
    }

    public onPveRankDataReceived(message) {
        const rankData: RankPveRankS2C = message;
        Modules.Home.PveRank = new PveDataRank();
        Modules.Home.PveRank.GlobalRankData = rankData.playmates;
        Modules.Home.PveRank.MyRank = rankData.myPos;
        //console.log(rankData);
    }

    // 玩家物品数据
    public onPlayerGoodsResponse(message) {
        // console.log('onPlayerGoodsResponse');
        const respData: GoodsPullS2C = message;
        Modules.Home.DataPlayer.PlayerGoodsData = respData.goodsList;
        Modules.Home.DataPlayer.PlayerGoodsDataLast = respData.goodsList;
        DYNotify.post(Message.EVENT_MODULE_PLAYER_PRIZE_INIT);
    }

    // 更新玩家物品
    public onUpdataPlayerGoodsResponse(message) {
        const respData: GoodsUpdateS2C = message;
        Modules.Home.DataPlayer.UpdataPlayerGoods(respData.goodsList);
        DYNotify.post(Message.EVENT_MODULE_PLAYER_PRIZE);
    }

    // 转盘返回
    public onTurntableRunResponse(message){
        const goodsTurntableRun: GoodsTurntableRunS2C = message;
        DYNotify.post(Message.TURNTABLE_LIST,goodsTurntableRun);
    }

    // 全服大奖记录
    public onBigLotteryRecordReceived(message) {
        const receiveData: GoodsTurntableRecordPullS2C = message;
        Modules.Home.DataPlayer.BigLotteryRecordData = receiveData.recordList;
    }

    // 更新全服大奖数据
    public onUpdataBigLotteryRecordReceived(message) {
        const receiveData: GoodsTurntableRecordNewS2C = message;
        Modules.Home.DataPlayer.UpdataBigLotteryRecord(receiveData.record);
        Modules.Home.emit(Message.EVENT_MODULE_BIG_LOTTERY);
    }

    // 玩家任务
    public onPlayerTaskReceived(message) {
        const receiveData: TaskListS2C = message;
        Modules.Home.DataPlayer.PlayerTaskData = receiveData.task;
    }

    // 更新玩家任务
    public onUpdataPlayerTaskReceived(message) {
        const receiveData: TaskListS2C = message;
        cc.log(receiveData.task);
        Modules.Home.DataPlayer.UpdataPlayerTask(receiveData.task);
        Modules.Home.emit(Message.EVENT_MODULE_PLAYER_TASK);
    }
}
