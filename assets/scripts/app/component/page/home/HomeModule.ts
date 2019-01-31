import BaseModule from "../../../module/BaseModule";
import DataPlayer from "../../../module/data/mod/DataPlayer";
import DataRoom from "../../../module/data/mod/DataRoom";
import DataRank, {PveDataRank} from "../../../module/data/mod/DataRank";
import PlayerNetHandler from "./PlayerNetHandler";
import {PPlayer} from "../../../common/net/proto/ProtoType";
import RoomNetHandler from "./RoomNetHandler";
import {OpenHomeFrom} from "../../../common/Defines";
import DebugNetHandler from "./DebugNetHandler";

export default class HomeModule extends BaseModule {
    private static MODULE_NAME: string = "home";

    private dataPlayer: DataPlayer;
    private dataRoom: DataRoom;
    private dataRank: DataRank;     // xlchen add 排行榜
    private pveRank;

    private openHomeFrom: OpenHomeFrom;

    private protoPlayerHandler: PlayerNetHandler;
    private protoRoomHandler: RoomNetHandler;
    private protoDebugHandler: DebugNetHandler;

    private timeOffset = 0;

    constructor() {
        super(HomeModule.MODULE_NAME);
    }

    public onCreated() {
        this.dataPlayer = new DataPlayer();
        this.dataRoom = new DataRoom();
        this.dataRank = new DataRank();
        this.pveRank  = null;
        this.protoPlayerHandler = new PlayerNetHandler();
        this.protoRoomHandler = new RoomNetHandler();
        this.protoDebugHandler = new DebugNetHandler();
    }

    public get TimeOffset(): number {
        return this.timeOffset;
    }

    public set TimeOffset(value: number) {
        this.timeOffset = value;
    }

    public resetHome() {
        this.dataRoom = new DataRoom();
    }

    public get DataPlayer(): DataPlayer {
        return this.dataPlayer;
    }

    public get OpenHomeFrom(): OpenHomeFrom {
        return this.openHomeFrom;
    }

    public set OpenHomeFrom(from: OpenHomeFrom) {
        this.openHomeFrom = from;
    }

    public get PlayerName(): string {
        return this.dataPlayer.MyName;
    }

    public get PlayerId(): number {
        return this.dataPlayer.MyId;
    }

    public get PlayerHeadUrl(): string {
        return this.dataPlayer.MyHeadUrl;
    }

    public get OpponentId(): number {
        return this.dataRoom.OpponentId;
    }

    public get OpponentName(): string {
        return this.dataRoom.OpponentName;
    }

    public get OpponentHeadUrl(): string {
        return this.dataRoom.OpponentHeadUrl;
    }

    // xlchen add
    public get OpponentSex(): number {
        return this.dataRoom.OpponentSex;
    }

    public get DataRoom(): DataRoom {
        return this.dataRoom;
    }

    public set MyPlayerInfo(value: PPlayer) {
        this.dataPlayer.MyPlayer = value;
    }

    public get PlayerSex(): number {
        return this.dataPlayer.MySex;
    }

    // xlchen add
    public get DataRank(): DataRank {
        return this.dataRank;
    }

    public set DataRank(data: DataRank) {
        this.dataRank = data;
    }

    public get PveRank() {
        return this.pveRank;
    }

    public set PveRank(value) {
        this.pveRank = value;
    }
}
