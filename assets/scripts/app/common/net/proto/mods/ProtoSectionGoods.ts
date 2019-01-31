// Auto Generated. Please don't change manually!

/// <reference path="../../NetByteArray.ts">

import { ByteArray } from "../../NetByteArray";
import { Int16, Int32, Int64, Int8, IProtoMsgC2S, Uint16, Uint32, Uint64, Uint8 } from "../ProtoDefine";
import * as ProtoType from "../ProtoType";
import * as ProtoCrypto from "../ProtoCrypto";

export class GoodsPullC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3840;

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
export class GoodsExchangeC2S implements IProtoMsgC2S {

  // 兑换的Id
  public id: Uint32;
  private MSG_ID: Uint16 = 3871;

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
export class GoodsExchangeRemainC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3872;

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
export class GoodsTurntableRunC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3891;

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
export class GoodsTurntableRecordPullC2S implements IProtoMsgC2S {

  private MSG_ID: Uint16 = 3892;

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

export class GoodsPullS2C {
  public static EVENT_NAME: string = "GoodsPullS2C";

  public static decode(byteArray: ByteArray): GoodsPullS2C {
    const obj = new GoodsPullS2C();
    let len;
    obj.goodsList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
    }
    return obj;
  }

  // 物品列表
  public goodsList: ProtoType.PGoods[];
}
export class GoodsUpdateS2C {
  public static EVENT_NAME: string = "GoodsUpdateS2C";

  public static decode(byteArray: ByteArray): GoodsUpdateS2C {
    const obj = new GoodsUpdateS2C();
    let len;
    obj.goodsList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
    }
    return obj;
  }

  // 物品列表
  public goodsList: ProtoType.PGoods[];
}
export class GoodsExchangeS2C {
  public static EVENT_NAME: string = "GoodsExchangeS2C";

  public static decode(byteArray: ByteArray): GoodsExchangeS2C {
    const obj = new GoodsExchangeS2C();
    let len;
    obj.id = byteArray.readUnsignedInt();
    obj.goodsList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
    }
    return obj;
  }

  // 兑换的Id
  public id: Uint32;
  // 物品列表(仅用于显示)
  public goodsList: ProtoType.PGoods[];
}
export class GoodsExchangeRemainS2C {
  public static EVENT_NAME: string = "GoodsExchangeRemainS2C";

  public static decode(byteArray: ByteArray): GoodsExchangeRemainS2C {
    const obj = new GoodsExchangeRemainS2C();
    let len;
    obj.exchangeList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.exchangeList.push(ProtoType.PExchangeList.decode(byteArray));
    }
    return obj;
  }

  // 兑换列表
  public exchangeList: ProtoType.PExchangeList[];
}
export class GoodsTurntableRunS2C {
  public static EVENT_NAME: string = "GoodsTurntableRunS2C";

  public static decode(byteArray: ByteArray): GoodsTurntableRunS2C {
    const obj = new GoodsTurntableRunS2C();
    let len;
    obj.id = byteArray.readUnsignedInt();
    obj.goodsList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
    }
    return obj;
  }

  // 转到的Id
  public id: Uint32;
  // 物品列表(仅用于显示)
  public goodsList: ProtoType.PGoods[];
}
export class GoodsTurntableRecordPullS2C {
  public static EVENT_NAME: string = "GoodsTurntableRecordPullS2C";

  public static decode(byteArray: ByteArray): GoodsTurntableRecordPullS2C {
    const obj = new GoodsTurntableRecordPullS2C();
    let len;
    obj.recordList = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.recordList.push(ProtoType.PTurntableRecord.decode(byteArray));
    }
    return obj;
  }

  // 中奖记录列表
  public recordList: ProtoType.PTurntableRecord[];
}
export class GoodsTurntableRecordNewS2C {
  public static EVENT_NAME: string = "GoodsTurntableRecordNewS2C";

  public static decode(byteArray: ByteArray): GoodsTurntableRecordNewS2C {
    const obj = new GoodsTurntableRecordNewS2C();
    obj.record = ProtoType.PTurntableRecord.decode(byteArray);
    return obj;
  }

  // 中奖记录
  public record: ProtoType.PTurntableRecord;
}
