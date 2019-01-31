// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class RoomMatchRequestC2S implements IProtoMsgC2S {

  // 场次类型，从1开始依次,1、2、3、4...
  public roomType: Uint8;
  private MSG_ID: Uint16 = 3072;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.roomType);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class RoomInviteRequestC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3073;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class RoomPlayWithC2S implements IProtoMsgC2S {

  // 邀请参数
  public inviteeParam: string;
  private MSG_ID: Uint16 = 3075;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUTF(this.inviteeParam);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class RoomPlayConfirmC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3077;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class RoomInviterC2S implements IProtoMsgC2S {

  // 邀请参数
  public inviterParam: string;
  private MSG_ID: Uint16 = 3084;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUTF(this.inviterParam);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class RoomInvisibleC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3086;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class RoomMatchRequestS2C {
  public static EVENT_NAME: string = "RoomMatchRequestS2C";

  public static decode(byteArray: ByteArray): RoomMatchRequestS2C {
    const obj = new RoomMatchRequestS2C();
    return obj;
  }

}
export class RoomInviteRequestS2C {
  public static EVENT_NAME: string = "RoomInviteRequestS2C";

  public static decode(byteArray: ByteArray): RoomInviteRequestS2C {
    const obj = new RoomInviteRequestS2C();
    obj.inviteeParam = byteArray.readUTF();
    return obj;
  }

  // 邀请参数
  public inviteeParam: string;
}
export class RoomInviteTimeoutS2C {
  public static EVENT_NAME: string = "RoomInviteTimeoutS2C";

  public static decode(byteArray: ByteArray): RoomInviteTimeoutS2C {
    const obj = new RoomInviteTimeoutS2C();
    obj.roomId = byteArray.readUnsignedInt();
    return obj;
  }

  // 房间Id
  public roomId: Uint32;
}
export class RoomPlayWithS2C {
  public static EVENT_NAME: string = "RoomPlayWithS2C";

  public static decode(byteArray: ByteArray): RoomPlayWithS2C {
    const obj = new RoomPlayWithS2C();
    obj.roomId = byteArray.readUnsignedInt();
    return obj;
  }

  // 房间Id 0表示房间关闭
  public roomId: Uint32;
}
export class RoomPlayCreateS2C {
  public static EVENT_NAME: string = "RoomPlayCreateS2C";

  public static decode(byteArray: ByteArray): RoomPlayCreateS2C {
    const obj = new RoomPlayCreateS2C();
    let len;
    obj.roomId = byteArray.readUnsignedInt();
    obj.roomType = byteArray.readUnsignedByte();
    obj.roomOwner = byteArray.readDouble();
    obj.redId = byteArray.readDouble();
    obj.bluId = byteArray.readDouble();
    obj.playmates = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.playmates.push(ProtoType.PPlaymate.decode(byteArray));
    }
    return obj;
  }

  // 房间Id
  public roomId: Uint32;
  // 房间类型 1邀请 2匹配
  public roomType: Uint8;
  // 房主玩家Id 匹配模式下为0
  public roomOwner: Uint64;
  // 红方玩家Id
  public redId: Uint64;
  // 蓝方玩家Id
  public bluId: Uint64;
  // 双方的信息
  public playmates: ProtoType.PPlaymate[];
}
export class RoomPlayConfirmS2C {
  public static EVENT_NAME: string = "RoomPlayConfirmS2C";

  public static decode(byteArray: ByteArray): RoomPlayConfirmS2C {
    const obj = new RoomPlayConfirmS2C();
    let len;
    obj.confirmList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.confirmList.push(byteArray.readDouble());
    }
    return obj;
  }

  // 已经确认列表
  public confirmList: Uint64[];
}
export class RoomPlayStartS2C {
  public static EVENT_NAME: string = "RoomPlayStartS2C";

  public static decode(byteArray: ByteArray): RoomPlayStartS2C {
    const obj = new RoomPlayStartS2C();
    obj.roomId = byteArray.readUnsignedInt();
    return obj;
  }

  // 房间Id
  public roomId: Uint32;
}
export class RoomReadyTimeoutS2C {
  public static EVENT_NAME: string = "RoomReadyTimeoutS2C";

  public static decode(byteArray: ByteArray): RoomReadyTimeoutS2C {
    const obj = new RoomReadyTimeoutS2C();
    return obj;
  }

}
export class RoomPlayFinishS2C {
  public static EVENT_NAME: string = "RoomPlayFinishS2C";

  public static decode(byteArray: ByteArray): RoomPlayFinishS2C {
    const obj = new RoomPlayFinishS2C();
    obj.roomId = byteArray.readUnsignedInt();
    obj.winSide = byteArray.readUnsignedByte();
    obj.winPlaymateId = byteArray.readDouble();
    obj.saveAnimalCount = byteArray.readUnsignedInt();
    obj.score = byteArray.readUnsignedInt();
    obj.winScore = byteArray.readUnsignedInt();
    obj.winCount = byteArray.readUnsignedInt();
    obj.dailyWin = byteArray.readUnsignedInt();
    obj.dailyCnt = byteArray.readUnsignedInt();
    obj.weeklyWin = byteArray.readUnsignedInt();
    obj.weeklyCnt = byteArray.readUnsignedInt();
    obj.showContinue = byteArray.readUnsignedByte();
    obj.activeBuffCount = byteArray.readUnsignedInt();
    return obj;
  }

  // 房间Id
  public roomId: Uint32;
  // 0平局 1红方 2蓝方
  public winSide: Uint8;
  // 胜利方Id
  public winPlaymateId: Uint64;
  // 收集物品个数
  public saveAnimalCount: Uint32;
  // 积分变换的数值
  public score: Uint32;
  // 连胜获得的积分
  public winScore: Uint32;
  // 连胜次数
  public winCount: Uint32;
  // 日胜次数
  public dailyWin: Uint32;
  // 日匹配次数
  public dailyCnt: Uint32;
  // 周胜次数
  public weeklyWin: Uint32;
  // 周匹配次数
  public weeklyCnt: Uint32;
  // 是否显示再来一局 0不显示
  public showContinue: Uint8;
  // 对手使用buff的数量
  public activeBuffCount: Uint32;
}
export class RoomOpponentLeaveS2C {
  public static EVENT_NAME: string = "RoomOpponentLeaveS2C";

  public static decode(byteArray: ByteArray): RoomOpponentLeaveS2C {
    const obj = new RoomOpponentLeaveS2C();
    obj.opponentId = byteArray.readDouble();
    return obj;
  }

  // 对手的玩家Id
  public opponentId: Uint64;
}
export class RoomInviterS2C {
  public static EVENT_NAME: string = "RoomInviterS2C";

  public static decode(byteArray: ByteArray): RoomInviterS2C {
    const obj = new RoomInviterS2C();
    obj.inviterParam = byteArray.readUTF();
    obj.playmate = ProtoType.PPlaymate.decode(byteArray);
    return obj;
  }

  // 对方信息
  public inviterParam: string;
  // 对方信息
  public playmate: ProtoType.PPlaymate;
}
export class RoomInvisibleS2C {
  public static EVENT_NAME: string = "RoomInvisibleS2C";

  public static decode(byteArray: ByteArray): RoomInvisibleS2C {
    const obj = new RoomInvisibleS2C();
    return obj;
  }

}
export class RoomMatchTimeoutS2C {
  public static EVENT_NAME: string = "RoomMatchTimeoutS2C";

  public static decode(byteArray: ByteArray): RoomMatchTimeoutS2C {
    const obj = new RoomMatchTimeoutS2C();
    return obj;
  }

}
