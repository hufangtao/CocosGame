// Auto Generate. Don't Change manually

/// <reference path="../NetByteArray.ts">

import { ByteArray } from "../NetByteArray";
import { Int16, Int32, Int64, Int8, Uint16, Uint32, Uint64, Uint8 } from "./ProtoDefine";

// 玩家信息
export class PPlayer {

  public static decode(byteArray: ByteArray): PPlayer {
    const obj = new PPlayer();
    obj.id = byteArray.readDouble();
    obj.name = byteArray.readUTF();
    obj.sex = byteArray.readUnsignedByte();
    obj.headImg = byteArray.readUTF();
    obj.score = byteArray.readDouble();
    obj.win = byteArray.readUnsignedInt();
    obj.nowsec = byteArray.readUTF();
    obj.energyFullTime = byteArray.readUTF();
    return obj;
  }

  // 玩家id
  public id: Uint64;
  // 名称
  public name: string;
  // 性别
  public sex: Uint8;
  // 头像地址
  public headImg: string;
  // 最高分
  public score: Uint64;
  // 连胜次数
  public win: Uint32;
  // now sec
  public nowsec: string;
  // energy full time: 0->full sectime->time of energy full
  public energyFullTime: string;
}

// 活动信息
export class PActivity {

  public static decode(byteArray: ByteArray): PActivity {
    const obj = new PActivity();
    obj.actid = byteArray.readUnsignedByte();
    obj.status = byteArray.readUnsignedByte();
    obj.secsLeft = byteArray.readUnsignedInt();
    return obj;
  }

  // 活动id
  public actid: Uint8;
  // 0未开启 1本次活动已终止 2活动初始阶段 3准备阶段 4...
  public status: Uint8;
  // 剩余秒数
  public secsLeft: Uint32;
}

// 财富
export class PWealth {

  public static decode(byteArray: ByteArray): PWealth {
    const obj = new PWealth();
    obj.type = byteArray.readUnsignedByte();
    obj.value = byteArray.readUnsignedInt();
    return obj;
  }

  // 财富类型
  public type: Uint8;
  // 财富数量
  public value: Uint32;
}

// 物品信息
export class PGoods {

  public static decode(byteArray: ByteArray): PGoods {
    const obj = new PGoods();
    obj.goodsId = byteArray.readUnsignedInt();
    obj.goodsNum = byteArray.readUnsignedInt();
    return obj;
  }

  // 物品id
  public goodsId: Uint32;
  // 物品数量
  public goodsNum: Uint32;
}

// 签到格
export class PSignSlot {

  public static decode(byteArray: ByteArray): PSignSlot {
    const obj = new PSignSlot();
    let len;
    obj.slot = byteArray.readUnsignedByte();
    obj.signed = byteArray.readUnsignedByte();
    obj.reward = new Array();
    len = byteArray.readShort();
    for (let i = 0; i < len; i++) {
      obj.reward.push(PGoods.decode(byteArray));
    }
    return obj;
  }

  // 签到格，对应周几
  public slot: Uint8;
  // 是否签到
  public signed: Uint8;
  // 签到奖励
  public reward: PGoods[];
}

// 兑换商品
export class PExchangeList {

  public static decode(byteArray: ByteArray): PExchangeList {
    const obj = new PExchangeList();
    obj.id = byteArray.readUnsignedInt();
    obj.price = byteArray.readUnsignedInt();
    return obj;
  }

  // 兑换Id
  public id: Uint32;
  // 兑换价格
  public price: Uint32;
}

// 中奖记录
export class PTurntableRecord {

  public static decode(byteArray: ByteArray): PTurntableRecord {
    const obj = new PTurntableRecord();
    obj.turntableId = byteArray.readUnsignedInt();
    obj.playerName = byteArray.readUTF();
    obj.time = byteArray.readUnsignedInt();
    return obj;
  }

  // 转盘Id
  public turntableId: Uint32;
  // 中奖玩家名字
  public playerName: string;
  // 中奖时间
  public time: Uint32;
}

// 房间玩伴
export class PPlaymate {

  public static decode(byteArray: ByteArray): PPlaymate {
    const obj = new PPlaymate();
    obj.id = byteArray.readDouble();
    obj.name = byteArray.readUTF();
    obj.headImg = byteArray.readUTF();
    obj.sex = byteArray.readUnsignedByte();
    obj.star = byteArray.readUnsignedInt();
    return obj;
  }

  // 玩家id
  public id: Uint64;
  // 名称
  public name: string;
  // 头像地址
  public headImg: string;
  // 性别
  public sex: Uint8;
  // 星数
  public star: Uint32;
}

// 比赛统计
export class PPlayStat {

  public static decode(byteArray: ByteArray): PPlayStat {
    const obj = new PPlayStat();
    obj.cntTotal = byteArray.readUnsignedInt();
    obj.cntWin = byteArray.readUnsignedInt();
    obj.matchOnce = byteArray.readUnsignedInt();
    obj.saveOnce = byteArray.readUnsignedInt();
    obj.pveWin = byteArray.readUnsignedInt();
    obj.pveTotal = byteArray.readUnsignedInt();
    obj.pvpWinOneweek = byteArray.readUnsignedInt();
    obj.pvpTotalOneweek = byteArray.readUnsignedInt();
    obj.maxSuccessiveWin = byteArray.readUnsignedInt();
    obj.level = byteArray.readUnsignedInt();
    obj.guide = byteArray.readUnsignedInt();
    return obj;
  }

  // 比赛的局数
  public cntTotal: Uint32;
  // 胜利的局数
  public cntWin: Uint32;
  // 最多匹配个数
  public matchOnce: Uint32;
  // 单局最多拯救动物
  public saveOnce: Uint32;
  // pve win
  public pveWin: Uint32;
  // pve total
  public pveTotal: Uint32;
  // pvp win oneweek
  public pvpWinOneweek: Uint32;
  // pvp total oneweek
  public pvpTotalOneweek: Uint32;
  // max successive win
  public maxSuccessiveWin: Uint32;
  // level
  public level: Uint32;
  // guide
  public guide: Uint32;
}

// pve比赛统计
export class PPveStat {

  public static decode(byteArray: ByteArray): PPveStat {
    const obj = new PPveStat();
    obj.level = byteArray.readUnsignedInt();
    obj.score = byteArray.readUnsignedInt();
    return obj;
  }

  // level
  public level: Uint32;
  // score
  public score: Uint32;
}

// 排行榜上的玩家
export class PStarRank {

  public static decode(byteArray: ByteArray): PStarRank {
    const obj = new PStarRank();
    obj.id = byteArray.readDouble();
    obj.name = byteArray.readUTF();
    obj.headImg = byteArray.readUTF();
    obj.sex = byteArray.readUnsignedByte();
    obj.star = byteArray.readUnsignedInt();
    obj.rateOfWin = byteArray.readUnsignedInt();
    return obj;
  }

  // 玩家id
  public id: Uint64;
  // 名称
  public name: string;
  // 头像地址
  public headImg: string;
  // 性别
  public sex: Uint8;
  // 星数
  public star: Uint32;
  // rate of win
  public rateOfWin: Uint32;
}

// player on pve rank
export class PPveRank {

  public static decode(byteArray: ByteArray): PPveRank {
    const obj = new PPveRank();
    obj.id = byteArray.readDouble();
    obj.name = byteArray.readUTF();
    obj.headImg = byteArray.readUTF();
    obj.sex = byteArray.readUnsignedByte();
    obj.score = byteArray.readUnsignedInt();
    return obj;
  }

  // player id
  public id: Uint64;
  // player name
  public name: string;
  // head img
  public headImg: string;
  // sex
  public sex: Uint8;
  // pve score
  public score: Uint32;
}

// 任务
export class PTask {

  public static decode(byteArray: ByteArray): PTask {
    const obj = new PTask();
    obj.id = byteArray.readUnsignedInt();
    obj.progress = byteArray.readUnsignedInt();
    obj.status = byteArray.readUnsignedByte();
    return obj;
  }

  // 任务Id
  public id: Uint32;
  // 进度值
  public progress: Uint32;
  // 1已接 2已领奖
  public status: Uint8;
}

// 房间玩伴
export class PPlaymateScore {

  public static decode(byteArray: ByteArray): PPlaymateScore {
    const obj = new PPlaymateScore();
    obj.id = byteArray.readDouble();
    obj.score = byteArray.readUnsignedInt();
    return obj;
  }

  // 玩家id
  public id: Uint64;
  // 比赛得分
  public score: Uint32;
}

// 娃娃的静止状态
export class PBabyPos {

  public static decode(byteArray: ByteArray): PBabyPos {
    const obj = new PBabyPos();
    obj.roundId = byteArray.readUnsignedInt();
    obj.x = byteArray.readUTF();
    obj.angle = byteArray.readUTF();
    obj.y = byteArray.readUTF();
    return obj;
  }

  // 回合Id
  public roundId: Uint32;
  // x位置
  public x: string;
  // 角度
  public angle: string;
  // y位置
  public y: string;
}
