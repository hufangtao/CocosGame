import { PPlaymate } from "../../../common/net/proto/ProtoType";

export default class DataRoom {
  public opponentPlaymate: PPlaymate; // 对手玩家信息
  public currentRoom: number = 0;
  public redId: number = 0;
  public bluId: number = 0;
  public playCount: number = 0; // 玩几局了

  private roomOwner: number = 0;
  private roomType: number = 0;

  private enterRoomConfirm: boolean = false;

  public get PlayCount(): number {
    return this.playCount;
  }
  public incPlayCount() {
    this.playCount += 1;
  }

  public get RoomOwner(): number {
    return this.roomOwner;
  }
  public set RoomOwner(value: number) {
    this.roomOwner = value;
  }

  public get RoomType(): number {
    return this.roomType;
  }
  public set RoomType(value: number) {
    this.roomType = value;
  }

  // 对手的Id
  public get OpponentId(): number {
    if (!this.opponentPlaymate) {
      return 0;
    }
    return this.opponentPlaymate.id;
  }

    // 对手的名字
  public get OpponentName(): string {
    if (!this.opponentPlaymate) {
        return "";
    }
    return this.opponentPlaymate.name;
  }

  // 对手的头像url
  public get OpponentHeadUrl(): string {
    if (!this.opponentPlaymate) {
        return "";
    }
    return this.opponentPlaymate.headImg;
  }

  // 对手的性别 add
  public get OpponentSex(): number {
    if (!this.opponentPlaymate) {
        return -1;
    }
    return this.opponentPlaymate.sex;
  }

  // 进入房间确认
  public get EnterRoomConfirm(): boolean {
    return this.enterRoomConfirm;
  }
  public set EnterRoomConfirm(value: boolean) {
    this.enterRoomConfirm = value;
  }

  // 对手的积分
  public get OpponentStar(): number {
    if (!this.opponentPlaymate) {
      return 0;
    }
    return this.opponentPlaymate.star;
  }
}
