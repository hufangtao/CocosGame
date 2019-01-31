// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class BuffBuffStatusC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 5377;

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
export class BuffGenC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 5378;

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

export class BuffBuffStatusS2C {
  public static EVENT_NAME: string = "BuffBuffStatusS2C";

  public static decode(byteArray: ByteArray): BuffBuffStatusS2C {
    const obj = new BuffBuffStatusS2C();
    obj.slotId = byteArray.readUnsignedByte();
    obj.buffId = byteArray.readUnsignedByte();
    obj.number = byteArray.readUnsignedByte();
    return obj;
  }

  // 技能槽id
  public slotId: Uint8;
  // buff id
  public buffId: Uint8;
  // buff数量
  public number: Uint8;
}
export class BuffGenS2C {
  public static EVENT_NAME: string = "BuffGenS2C";

  public static decode(byteArray: ByteArray): BuffGenS2C {
    const obj = new BuffGenS2C();
    obj.success = byteArray.readUnsignedByte();
    obj.reason = byteArray.readUnsignedByte();
    return obj;
  }

  // 生成是否成功，0失败，1成功
  public success: Uint8;
  // 成功reason为0， 失败：1表示buff烂已经满
  public reason: Uint8;
}
