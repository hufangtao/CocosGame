// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class SignInSignC2S implements IProtoMsgC2S {

  // 签到哪一天，0代表今日签到，1-7用于其他补签
  public slot: Uint8;
  // 是否获得双倍签到奖励
  public double: Uint8;
  private MSG_ID: Uint16 = 5633;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.slot);
    byteArray.writeByte(this.double);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class SignInSignListC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 5634;

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

export class SignInSignS2C {
  public static EVENT_NAME: string = "SignInSignS2C";

  public static decode(byteArray: ByteArray): SignInSignS2C {
    const obj = new SignInSignS2C();
    let len;
    obj.slot = byteArray.readUnsignedByte();
    obj.reward = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.reward.push(ProtoType.PGoods.decode(byteArray));
    }
    return obj;
  }

  // 签到哪一天
  public slot: Uint8;
  // 签到获得的奖励
  public reward: ProtoType.PGoods[];
}
export class SignInSignListS2C {
  public static EVENT_NAME: string = "SignInSignListS2C";

  public static decode(byteArray: ByteArray): SignInSignListS2C {
    const obj = new SignInSignListS2C();
    let len;
    obj.now = byteArray.readUnsignedByte();
    obj.list = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.list.push(ProtoType.PSignSlot.decode(byteArray));
    }
    return obj;
  }

  // 当前天
  public now: Uint8;
  // 签到列表
  public list: ProtoType.PSignSlot[];
}
