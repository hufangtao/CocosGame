import * as Modules from "../../Modules";
import {PlaySide, PHASE} from "../../../component/game/PlayDefine";

export default class DataPlay {
    // public redSidePlayerId: number;
    // public bluSidePlayerId: number;
    // public enterRoomConfirm: boolean = false;
    // public playRoomId: number;
    // public opponentPlaymate: PPlaymate;
    // public redId: number;
    // public bluId: number;

    private curRoundId: number;
    private curOperatorId: number;
    private phase: number = 1;

    public get colorNum(): number {
        return PHASE[this.phase - 1].color_num;
    }

    public get Phase(): number {
        return this.phase;
    }

    public set Phase(value: number) {
        this.phase = value;
    }

    public get CurRoundId(): number {
        return this.curRoundId;
    }

    public set CurRoundId(value: number) {
        this.curRoundId = value;
    }

    public get CurRoomId(): number {
        return Modules.Home.DataRoom.currentRoom;
    }

    public get CurOperatorId(): number {
        return this.curOperatorId;
    }

    public set CurOperatorId(value: number) {
        this.curOperatorId = value;
    }

    public get CurOperatorSide(): PlaySide {
        if (this.curOperatorId === this.BluSideId) {
            return PlaySide.BLU;
        }
        if (this.curOperatorId === this.RedSideId) {
            return PlaySide.RED;
        }
        return PlaySide.UNKNOWN;
    }

    public get MySide(): PlaySide {
        if (Modules.Acc.PlayerId === this.BluSideId) {
            return PlaySide.BLU;
        }
        return PlaySide.RED;
    }

    public get AiSide(): PlaySide {
        if (Modules.Acc.PlayerId === this.BluSideId) {
            return PlaySide.RED;
        }
        return PlaySide.BLU;
    }

    public get MyName(): string {
        return Modules.Home.PlayerName;
    }

    public get MyId(): number {
        return Modules.Home.PlayerId;
    }

    public get showHeadImg(): string {
        return Modules.Home.PlayerHeadUrl;
    }

    public get OpponentSide(): PlaySide {
        if (Modules.Home.OpponentId === this.BluSideId) {
            return PlaySide.BLU;
        }
        return PlaySide.RED;
    }

    public get OpponentId(): number {
        return Modules.Home.OpponentId;
    }

    public get OpponentName(): string {
        return Modules.Home.OpponentName;
    }

    public get OpponentHeadUrl(): string {
        return Modules.Home.OpponentHeadUrl;
    }

    public get BluSideId(): number {
        return Modules.Home.DataRoom.bluId;
    }

    public get RedSideId(): number {
        return Modules.Home.DataRoom.redId;
    }
}
