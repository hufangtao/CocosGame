// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class PlayReadyC2S implements IProtoMsgC2S {

  private static EncryptIndex: Uint8 = 0;
  // 房间Id
  public roomId: Uint32;
  private MSG_ID: Uint16 = 5120;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedInt(this.roomId);
    const index = (PlayReadyC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
    PlayReadyC2S.EncryptIndex = index;
    return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
  }
}
export class PlaySaveAnimalC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 5122;

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
export class PlayContinueC2S implements IProtoMsgC2S {

  private static EncryptIndex: Uint8 = 0;
  private MSG_ID: Uint16 = 5124;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    const index = (PlayContinueC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
    PlayContinueC2S.EncryptIndex = index;
    return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
  }
}
export class PlayGiveUpC2S implements IProtoMsgC2S {

  private static EncryptIndex: Uint8 = 0;
  private MSG_ID: Uint16 = 5125;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    const index = (PlayGiveUpC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
    PlayGiveUpC2S.EncryptIndex = index;
    return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
  }
}
export class PlayPveFinishC2S implements IProtoMsgC2S {

  // pve关卡
  public pveId: Uint32;
  // 是否胜利，1为胜利，2为失败
  public pveWin: Uint8;
  // pve level score
  public pveScore: Uint32;
  // 剩余时间/步数
  public remainStepsTime: Uint8;
  private MSG_ID: Uint16 = 5127;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.pveId);
    byteArray.writeByte(this.pveWin);
    byteArray.writeUnsignedInt(this.pveScore);
    byteArray.writeByte(this.remainStepsTime);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayPvpFinishC2S implements IProtoMsgC2S {

  // 单次多消个数
  public matchOnce: Uint32;
  private MSG_ID: Uint16 = 5128;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.matchOnce);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayGuideFinishC2S implements IProtoMsgC2S {

  // 是否完成，1为完成
  public guideFinish: Uint32;
  private MSG_ID: Uint16 = 5129;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.guideFinish);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayAiFinishC2S implements IProtoMsgC2S {

  // save animal count
  public saveAnimalCount: Uint32;
  // 0 ping; 1 person; 2 ai win
  public winSide: Uint32;
  private MSG_ID: Uint16 = 5130;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.saveAnimalCount);
    byteArray.writeUnsignedInt(this.winSide);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayStartPveC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 5131;

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
export class PlayActiveBuffC2S implements IProtoMsgC2S {

  // 技能槽id
  public slotId: Uint8;
  private MSG_ID: Uint16 = 5132;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.slotId);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayStolenAnimalC2S implements IProtoMsgC2S {

  // 己方被对面偷的宠物数量
  public num: Uint8;
  private MSG_ID: Uint16 = 5133;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.num);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class PlayBoardStatusC2S implements IProtoMsgC2S {

  // 当前棋盘宠物个数
  public animalNum: Uint8;
  private MSG_ID: Uint16 = 5134;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeByte(this.animalNum);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class PlayReadyS2C {
  public static EVENT_NAME: string = "PlayReadyS2C";

  public static decode(byteArray: ByteArray): PlayReadyS2C {
    const obj = new PlayReadyS2C();
    obj.roomId = byteArray.readUnsignedInt();
    return obj;
  }

  // 房间Id
  public roomId: Uint32;
}
export class PlayNewRoundS2C {
  public static EVENT_NAME: string = "PlayNewRoundS2C";

  public static decode(byteArray: ByteArray): PlayNewRoundS2C {
    const obj = new PlayNewRoundS2C();
    obj.playmateId = byteArray.readDouble();
    obj.roundId = byteArray.readUnsignedInt();
    obj.roundDeadline = byteArray.readUnsignedInt();
    return obj;
  }

  // 该回合对应的玩家
  public playmateId: Uint64;
  // 回合Id
  public roundId: Uint32;
  // 回合操作限时
  public roundDeadline: Uint32;
}
export class PlaySaveAnimalS2C {
  public static EVENT_NAME: string = "PlaySaveAnimalS2C";

  public static decode(byteArray: ByteArray): PlaySaveAnimalS2C {
    const obj = new PlaySaveAnimalS2C();
    obj.saveCount = byteArray.readUnsignedInt();
    obj.animalSide = byteArray.readUnsignedByte();
    return obj;
  }

  // 收集的个数
  public saveCount: Uint32;
  // 阵营 1红方,2蓝方
  public animalSide: Uint8;
}
export class PlayGenBlockS2C {
  public static EVENT_NAME: string = "PlayGenBlockS2C";

  public static decode(byteArray: ByteArray): PlayGenBlockS2C {
    const obj = new PlayGenBlockS2C();
    obj.genSide = byteArray.readUnsignedByte();
    obj.row = byteArray.readUnsignedByte();
    return obj;
  }

  // 生成的是哪一方
  public genSide: Uint8;
  // 在哪一行生成
  public row: Uint8;
}
export class PlayContinueS2C {
  public static EVENT_NAME: string = "PlayContinueS2C";

  public static decode(byteArray: ByteArray): PlayContinueS2C {
    const obj = new PlayContinueS2C();
    let len;
    obj.roomId = byteArray.readUnsignedInt();
    obj.continueList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.continueList.push(byteArray.readDouble());
    }
    return obj;
  }

  // 房间Id
  public roomId: Uint32;
  // 继续的玩家列表
  public continueList: Uint64[];
}
export class PlayNewPhaseS2C {
  public static EVENT_NAME: string = "PlayNewPhaseS2C";

  public static decode(byteArray: ByteArray): PlayNewPhaseS2C {
    const obj = new PlayNewPhaseS2C();
    obj.phaseId = byteArray.readUnsignedByte();
    obj.phaseDeadline = byteArray.readUnsignedInt();
    return obj;
  }

  // 阶段Id, 1、20s三色 2、40s四色 3、60s五色
  public phaseId: Uint8;
  // 阶段时限
  public phaseDeadline: Uint32;
}
export class PlayStartPveS2C {
  public static EVENT_NAME: string = "PlayStartPveS2C";

  public static decode(byteArray: ByteArray): PlayStartPveS2C {
    const obj = new PlayStartPveS2C();
    obj.started = byteArray.readUnsignedByte();
    return obj;
  }

  // 0:start 1:not start
  public started: Uint8;
}
export class PlayActiveBuffS2C {
  public static EVENT_NAME: string = "PlayActiveBuffS2C";

  public static decode(byteArray: ByteArray): PlayActiveBuffS2C {
    const obj = new PlayActiveBuffS2C();
    obj.buffId = byteArray.readUnsignedByte();
    obj.effectSide = byteArray.readUnsignedByte();
    obj.effected = byteArray.readUnsignedByte();
    return obj;
  }

  // 发动的BuffId, 1.清屏 2.云 3.随机小火箭 4.随机大火箭
  public buffId: Uint8;
  // 对哪一方起作用
  public effectSide: Uint8;
  // buff是否成功施加 0.失败 1.成功
  public effected: Uint8;
}
export class PlayStolenAnimalS2C {
  public static EVENT_NAME: string = "PlayStolenAnimalS2C";

  public static decode(byteArray: ByteArray): PlayStolenAnimalS2C {
    const obj = new PlayStolenAnimalS2C();
    obj.stealCount = byteArray.readUnsignedInt();
    obj.animalSide = byteArray.readUnsignedByte();
    return obj;
  }

  // 偷的个数
  public stealCount: Uint32;
  // 阵营 1红方,2蓝方
  public animalSide: Uint8;
}
export class PlayBoardStatusS2C {
  public static EVENT_NAME: string = "PlayBoardStatusS2C";

  public static decode(byteArray: ByteArray): PlayBoardStatusS2C {
    const obj = new PlayBoardStatusS2C();
    obj.animalNum = byteArray.readUnsignedByte();
    obj.side = byteArray.readUnsignedByte();
    return obj;
  }

  // 当前棋盘宠物个数
  public animalNum: Uint8;
  // 阵营 1红方,2蓝方
  public side: Uint8;
}
