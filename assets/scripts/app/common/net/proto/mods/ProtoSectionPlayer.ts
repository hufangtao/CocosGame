// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class PlayerShareGameC2S implements IProtoMsgC2S {

  private static EncryptIndex: Uint8 = 0;
  // 原因 1获取体力 2任务 3道具 4金币 5pve
  public reason: Uint32;
  private MSG_ID: Uint16 = 2819;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedInt(this.reason);
    const index = (PlayerShareGameC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
    PlayerShareGameC2S.EncryptIndex = index;
    return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
  }
}
export class PlayerClickC2S implements IProtoMsgC2S {

  // data point
  public point: Uint32;
  private MSG_ID: Uint16 = 2821;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.point);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayerWatchAdC2S implements IProtoMsgC2S {

  // 看广告原因，1为pvp道具, 2为pve, 3为金币
  public reason: Uint8;
  private MSG_ID: Uint16 = 2822;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.reason);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayerDoubleC2S implements IProtoMsgC2S {

  // 双倍的东西， 1为结算金币 2为签到金币
  public reason: Uint8;
  private MSG_ID: Uint16 = 2823;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.reason);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayerCommitAddressC2S implements IProtoMsgC2S {

  private static EncryptIndex: Uint8 = 0;
  // 名字
  public name: string;
  // 电话号码
  public phone: string;
  // 街道
  public street: string;
  private MSG_ID: Uint16 = 2877;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUTF(this.name);
    byteArray.writeUTF(this.phone);
    byteArray.writeUTF(this.street);
    const index = (PlayerCommitAddressC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
    PlayerCommitAddressC2S.EncryptIndex = index;
    return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
  }
}
export class PlayerAddressC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 2878;

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
export class PlayerGmAddFortuneC2S implements IProtoMsgC2S {

  // 增加或者减少， 0代表减少，1代表增加
  public increase: Uint8;
  // 财富类型1:金币 2:积分 3:星数 4:energy
  public type: Uint8;
  // 财富变化值
  public num: Uint32;
  private MSG_ID: Uint16 = 2879;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.increase);
    byteArray.writeByte(this.type);
    byteArray.writeUnsignedInt(this.num);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class PlayerSelfInfoS2C {
  public static EVENT_NAME: string = "PlayerSelfInfoS2C";

  public static decode(byteArray: ByteArray): PlayerSelfInfoS2C {
    const obj = new PlayerSelfInfoS2C();
    obj.player = ProtoType.PPlayer.decode(byteArray);
    return obj;
  }

  // 玩家信息
  public player: ProtoType.PPlayer;
}
export class PlayerFortuneS2C {
  public static EVENT_NAME: string = "PlayerFortuneS2C";

  public static decode(byteArray: ByteArray): PlayerFortuneS2C {
    const obj = new PlayerFortuneS2C();
    obj.type = byteArray.readUnsignedByte();
    obj.val = byteArray.readUnsignedInt();
    return obj;
  }

  // 财富类型1:金币 2:积分 3:星数 4:energy
  public type: Uint8;
  // 财富数值
  public val: Uint32;
}
export class PlayerPlayStatS2C {
  public static EVENT_NAME: string = "PlayerPlayStatS2C";

  public static decode(byteArray: ByteArray): PlayerPlayStatS2C {
    const obj = new PlayerPlayStatS2C();
    obj.stat = ProtoType.PPlayStat.decode(byteArray);
    return obj;
  }

  // 比赛统计
  public stat: ProtoType.PPlayStat;
}
export class PlayerShareGameS2C {
  public static EVENT_NAME: string = "PlayerShareGameS2C";

  public static decode(byteArray: ByteArray): PlayerShareGameS2C {
    const obj = new PlayerShareGameS2C();
    obj.reason = byteArray.readUnsignedInt();
    obj.success = byteArray.readUnsignedInt();
    obj.times = byteArray.readUnsignedInt();
    return obj;
  }

  // 原因
  public reason: Uint32;
  // 增长体力是否成功, 0 失败, 1 成功
  public success: Uint32;
  // 已经分享的次数
  public times: Uint32;
}
export class PlayerPveStatS2C {
  public static EVENT_NAME: string = "PlayerPveStatS2C";

  public static decode(byteArray: ByteArray): PlayerPveStatS2C {
    const obj = new PlayerPveStatS2C();
    let len;
    obj.pvestat = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.pvestat.push(ProtoType.PPveStat.decode(byteArray));
    }
    return obj;
  }

  // pve比赛统计
  public pvestat: ProtoType.PPveStat[];
}
export class PlayerDailyClearedS2C {
  public static EVENT_NAME: string = "PlayerDailyClearedS2C";

  public static decode(byteArray: ByteArray): PlayerDailyClearedS2C {
    const obj = new PlayerDailyClearedS2C();
    return obj;
  }

}
export class PlayerCommitAddressS2C {
  public static EVENT_NAME: string = "PlayerCommitAddressS2C";

  public static decode(byteArray: ByteArray): PlayerCommitAddressS2C {
    const obj = new PlayerCommitAddressS2C();
    return obj;
  }

}
export class PlayerAddressS2C {
  public static EVENT_NAME: string = "PlayerAddressS2C";

  public static decode(byteArray: ByteArray): PlayerAddressS2C {
    const obj = new PlayerAddressS2C();
    obj.name = byteArray.readUTF();
    obj.phone = byteArray.readUTF();
    obj.street = byteArray.readUTF();
    return obj;
  }

  // 名字
  public name: string;
  // 电话号码
  public phone: string;
  // 街道
  public street: string;
}
