// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class ActivityListC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3329;

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
export class ActivityInfoC2S implements IProtoMsgC2S {

  // 活动id
  public actid: Uint8;
  private MSG_ID: Uint16 = 3330;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.actid);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class ActivityListS2C {
  public static EVENT_NAME: string = "ActivityListS2C";

  public static decode(byteArray: ByteArray): ActivityListS2C {
    const obj = new ActivityListS2C();
    let len;
    obj.list = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.list.push(ProtoType.PActivity.decode(byteArray));
    }
    return obj;
  }

  // 活动信息列表
  public list: ProtoType.PActivity[];
}
export class ActivityInfoS2C {
  public static EVENT_NAME: string = "ActivityInfoS2C";

  public static decode(byteArray: ByteArray): ActivityInfoS2C {
    const obj = new ActivityInfoS2C();
    obj.val = ProtoType.PActivity.decode(byteArray);
    return obj;
  }

  // 活动状态
  public val: ProtoType.PActivity;
}
