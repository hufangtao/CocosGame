// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class ChatCommonLanguageC2S implements IProtoMsgC2S {

  // 常用语Id
  public id: Uint32;
  private MSG_ID: Uint16 = 3585;

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
export class ChatFaceC2S implements IProtoMsgC2S {

  // 表情字符串Id
  public content: string;
  private MSG_ID: Uint16 = 3586;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUTF(this.content);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class ChatTextC2S implements IProtoMsgC2S {

  // 聊天内容
  public content: string;
  private MSG_ID: Uint16 = 3587;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUTF(this.content);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class ChatVoiceC2S implements IProtoMsgC2S {

  // 聊天内容
  public content: string;
  private MSG_ID: Uint16 = 3588;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUTF(this.content);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class ChatCommonLanguageS2C {
  public static EVENT_NAME: string = "ChatCommonLanguageS2C";

  public static decode(byteArray: ByteArray): ChatCommonLanguageS2C {
    const obj = new ChatCommonLanguageS2C();
    obj.playerId = byteArray.readDouble();
    obj.id = byteArray.readUnsignedInt();
    return obj;
  }

  // 发言的玩家Id
  public playerId: Uint64;
  // 常用语Id
  public id: Uint32;
}
export class ChatFaceS2C {
  public static EVENT_NAME: string = "ChatFaceS2C";

  public static decode(byteArray: ByteArray): ChatFaceS2C {
    const obj = new ChatFaceS2C();
    obj.playerId = byteArray.readDouble();
    obj.content = byteArray.readUTF();
    return obj;
  }

  // 发言的玩家Id
  public playerId: Uint64;
  // 表情字符串Id
  public content: string;
}
export class ChatTextS2C {
  public static EVENT_NAME: string = "ChatTextS2C";

  public static decode(byteArray: ByteArray): ChatTextS2C {
    const obj = new ChatTextS2C();
    obj.playerId = byteArray.readDouble();
    obj.content = byteArray.readUTF();
    return obj;
  }

  // 发言的玩家Id
  public playerId: Uint64;
  // 聊天内容
  public content: string;
}
export class ChatVoiceS2C {
  public static EVENT_NAME: string = "ChatVoiceS2C";

  public static decode(byteArray: ByteArray): ChatVoiceS2C {
    const obj = new ChatVoiceS2C();
    obj.playerId = byteArray.readDouble();
    obj.content = byteArray.readUTF();
    return obj;
  }

  // 发言的玩家Id
  public playerId: Uint64;
  // 聊天内容
  public content: string;
}
export class ChatNoticeS2C {
  public static EVENT_NAME: string = "ChatNoticeS2C";

  public static decode(byteArray: ByteArray): ChatNoticeS2C {
    const obj = new ChatNoticeS2C();
    obj.content = byteArray.readUTF();
    return obj;
  }

  // 公告内容
  public content: string;
}
