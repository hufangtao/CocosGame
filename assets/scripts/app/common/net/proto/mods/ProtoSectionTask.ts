// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class TaskListC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 4097;

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
export class TaskGainAwardC2S implements IProtoMsgC2S {

  // 任务Id
  public id: Uint32;
  private MSG_ID: Uint16 = 4099;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.id);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class TaskListS2C {
  public static EVENT_NAME: string = "TaskListS2C";

  public static decode(byteArray: ByteArray): TaskListS2C {
    const obj = new TaskListS2C();
    let len;
    obj.task = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.task.push(ProtoType.PTask.decode(byteArray));
    }
    return obj;
  }

  // 任务列表
  public task: ProtoType.PTask[];
}
export class TaskUpdateS2C {
  public static EVENT_NAME: string = "TaskUpdateS2C";

  public static decode(byteArray: ByteArray): TaskUpdateS2C {
    const obj = new TaskUpdateS2C();
    let len;
    obj.task = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.task.push(ProtoType.PTask.decode(byteArray));
    }
    return obj;
  }

  // 任务列表
  public task: ProtoType.PTask[];
}
export class TaskGainAwardS2C {
  public static EVENT_NAME: string = "TaskGainAwardS2C";

  public static decode(byteArray: ByteArray): TaskGainAwardS2C {
    const obj = new TaskGainAwardS2C();
    return obj;
  }

}
