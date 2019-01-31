import {
    PlaySaveAnimalS2C,
    PlayReadyS2C,
    PlayNewRoundS2C,
    PlayContinueS2C,
    PlayNewPhaseS2C,
    PlayStartPveS2C, PlayGenBlockS2C, PlayActiveBuffS2C, PlayStolenAnimalS2C, PlayBoardStatusS2C
} from "../../common/net/proto/mods/ProtoSectionPlay";
import {
    RoomPlayFinishS2C,
    RoomOpponentLeaveS2C,
    RoomReadyTimeoutS2C
} from "../../common/net/proto/mods/ProtoSectionRoom";
import {PlayDispatcher, RoomDispatcher, RankDispatcher, GoodsDispatcher} from "../../common/net/proto/ProtoDispatcher";
import PlayManager from "./PlayManager";
import PlaymateHead from "../prefab/PlaymateHead";
import {RankPveRankS2C} from "../../common/net/proto/mods/ProtoSectionRank";
import {PveDataRank} from "../../module/data/mod/DataRank";
import {Home} from "../../module/Modules";
import * as Modules from "../../module/Modules";
import HomeManager from "../page/home/HomeManager";
import { GoodsPullS2C, GoodsUpdateS2C } from "../../common/net/proto/mods/ProtoSectionGoods";
import { PGoods } from "../../common/net/proto/ProtoType";
import { Message } from "../../common/Message";
import { DYNotify } from "../../../dyGame/DYNotify";


export default class PlayNetHandler {
    constructor() {
        PlayDispatcher.on(PlaySaveAnimalS2C.EVENT_NAME, this.onSaveAnimalResponse, this);
        PlayDispatcher.on(PlayGenBlockS2C.EVENT_NAME, this.onGenBlockResponse, this);
        PlayDispatcher.on(PlayReadyS2C.EVENT_NAME, this.onReadyResponse, this);
        PlayDispatcher.on(PlayNewRoundS2C.EVENT_NAME, this.onNewRoundResponse, this);
        PlayDispatcher.on(PlayContinueS2C.EVENT_NAME, this.onContinueResponse, this);
        PlayDispatcher.on(PlayNewPhaseS2C.EVENT_NAME, this.onNewPhaseResponse, this);

        PlayDispatcher.on(PlayStartPveS2C.EVENT_NAME, this.onStartPve, this);
        PlayDispatcher.on(PlayActiveBuffS2C.EVENT_NAME, this.onActiveBuffResponse, this);
        PlayDispatcher.on(PlayStolenAnimalS2C.EVENT_NAME, this.onStolenAnimalResponse, this);
        PlayDispatcher.on(PlayBoardStatusS2C.EVENT_NAME, this.onBoardStatusResponse, this);

        RoomDispatcher.on(RoomReadyTimeoutS2C.EVENT_NAME, this.onReadyTimeout, this);
        RoomDispatcher.on(RoomPlayFinishS2C.EVENT_NAME, this.onPlayFinish, this);
        RoomDispatcher.on(RoomOpponentLeaveS2C.EVENT_NAME, this.onOpponentLeave, this);
        RankDispatcher.on(RankPveRankS2C.EVENT_NAME, this.onPveRankDataReceived, this);

        
    }

    

    private onSaveAnimalResponse(message) {
        const sveAnimalS2C: PlaySaveAnimalS2C = message;
        PlayManager.INSTANCE.getAnimalResponse(sveAnimalS2C);
    }

    private onGenBlockResponse(message){
        const genBlockS2C: PlayGenBlockS2C = message;
        PlayManager.INSTANCE.genBlockResponse(genBlockS2C);
    }

    private onReadyResponse(message) {
        const playReadyS2C: PlayReadyS2C = message;
        PlayManager.INSTANCE.onReadyResponse(playReadyS2C);
    }

    private onContinueResponse(message) {
        const playContinueS2C: PlayContinueS2C = message;
        PlayManager.INSTANCE.onContinueResponse(playContinueS2C);
    }

    private onNewRoundResponse(message) {
        const newRoundS2C: PlayNewRoundS2C = message;
        PlayManager.INSTANCE.newRound(newRoundS2C);

    }

    private onNewPhaseResponse(message) {
        const newPhaseS2C: PlayNewPhaseS2C = message;
        PlayManager.INSTANCE.newPhase(newPhaseS2C);
    }

    private onStartPve(message) {
        const startPveS2C: PlayStartPveS2C = message;
        PlayManager.INSTANCE.startPve(startPveS2C);
    }

    public onReadyTimeout(message) {
        // 此时提醒准备时间超时，
        PlayManager.INSTANCE.onBack();
    }

    // 一局结束
    private onPlayFinish(message) {
        const playResult: RoomPlayFinishS2C = message;
        PlayManager.INSTANCE.onPlayFinish(playResult);
    }

    // 对手离开
    private onOpponentLeave(message) {
        const opponentLeave: RoomOpponentLeaveS2C = message;
        //console.log("####################onOpponentLeave");
        if (!PlayManager.INSTANCE.PlayUI) {
            return;
        }
        PlayManager.INSTANCE.onOpponentLeave();
    }

    public onPveRankDataReceived(message) {
        const rankData: RankPveRankS2C = message;
        // Home.PveRank = new PveDataRank();
        // Home.PveRank.GlobalRankData = rankData.playmates;
        // Home.PveRank.MyRank = rankData.myPos;
        cc.log('RANK_RESULT')
        DYNotify.post(Message.RANK_RESULT, rankData);
    }

    public onActiveBuffResponse(message){
        const buffData: PlayActiveBuffS2C = message;
        PlayManager.INSTANCE.onActiveBuff(buffData);
    }

    public onStolenAnimalResponse(message){
        const stolenAnimalData: PlayStolenAnimalS2C = message;
        PlayManager.INSTANCE.onStolenAnimal(stolenAnimalData);
    }

    public onBoardStatusResponse(message){
        const playBoardStatus: PlayBoardStatusS2C = message;
        PlayManager.INSTANCE.onBoardStatusResponse(playBoardStatus);
    }
}
