// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class RankPlayStarC2S implements IProtoMsgC2S {

  // 起始
  public posStart: Uint32;
  // 结束
  public posEnd: Uint32;
  private MSG_ID: Uint16 = 4865;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.posStart);
    byteArray.writeUnsignedInt(this.posEnd);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}
export class RankPveRankC2S implements IProtoMsgC2S {

  // pve level
  public level: Uint32;
  // start
  public posStart: Uint32;
  // end
  public posEnd: Uint32;
  private MSG_ID: Uint16 = 4866;

  public encode(): ByteArray {
    const byteArray = new ByteArray();

    byteArray.writeUnsignedShort(0);
    byteArray.writeByte(0);
    byteArray.writeUnsignedShort(this.MSG_ID);
    byteArray.writeUnsignedInt(this.level);
    byteArray.writeUnsignedInt(this.posStart);
    byteArray.writeUnsignedInt(this.posEnd);
    byteArray.position = 0;
    byteArray.writeUnsignedShort(byteArray.length - 2);
    return byteArray;
  }

}

export class RankPlayStarS2C {
  public static EVENT_NAME: string = "RankPlayStarS2C";

  public static decode(byteArray: ByteArray): RankPlayStarS2C {
    const obj = new RankPlayStarS2C();
    let len;
    obj.myPos = byteArray.readUnsignedInt();
    obj.playmates = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.playmates.push(ProtoType.PStarRank.decode(byteArray));
    }
    return obj;
  }

  // 我的榜位
  public myPos: Uint32;
  // 玩家排行列表(已经排序)
  public playmates: ProtoType.PStarRank[];
}
export class RankPveRankS2C {
  public static EVENT_NAME: string = "RankPveRankS2C";

  public static decode(byteArray: ByteArray): RankPveRankS2C {
    const obj = new RankPveRankS2C();
    let len;
    obj.level = byteArray.readUnsignedInt();
    obj.myPos = byteArray.readUnsignedInt();
    obj.playmates = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.playmates.push(ProtoType.PPveRank.decode(byteArray));
    }
    return obj;
  }

  // level
  public level: Uint32;
  // my pos
  public myPos: Uint32;
  // ordered rank
  public playmates: ProtoType.PPveRank[];
}
