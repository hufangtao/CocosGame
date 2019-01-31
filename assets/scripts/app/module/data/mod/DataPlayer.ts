import { PPlayer, PGoods, PTurntableRecord, PTask, PExchangeRemain, PPveStat } from "../../../common/net/proto/ProtoType";

export class slot {
  buffId: number;
  num: number;
}

export default class DataPlayer {
  private myPlayer: PPlayer; // 我自己的角色信息

  private fortuneScore: number = 0;  // 我的积分
  private fortuneGold: number = 0;  // 我的元宝
  private fortuneStar: number = 0;  // 我的星数
  private fortuneEnergy: number = 0;  // 我的体力
  private fortunePvpBuff: number = 0;  // 我的buff
  private playCntTotal: number = 0;  // 比赛总局数
  private playCntWin: number = 0;  // 比赛赢的局数
  private playSaveOnce: number = 0;  // 单次拯救最多
  private playMatchOnce: number = 0;  // 单次消除最多
  private playPveTotal: number = 0;  // pve总次数
  private playPveWin: number = 0;  // pve胜利次数
  private playWeeklyWin: number = 0;  // weekly win
  private playWeeklyTotal: number = 0;  // weekly total
  private maxSuccessiveWin: number = 0;  // 最大连胜次数
  private level: number = 0;  // 关卡
  private guide: number = 0;  // 新手指导完成状态
  private energyShareCnt: number = 0;  // 体力今日分享次数
  private coinShareCnt: number = 0;  // 金币今日分享次数
  private propShareCnt: number = 0;  // 道具今日分享次数
  private pveShareCnt: number = 0;  // pve今日分享次数

  public pveStatArray: PPveStat[] = [];

  // public level1Score: number    = 0;
  // public level2Score: number    = 0;
  // public level3Score: number    = 0;
  // public level4Score: number    = 0;
  // public level5Score: number    = 0;
  // public level6Score: number    = 0;
  // public level7Score: number    = 0;
  // public level8Score: number    = 0;
  // public level9Score: number    = 0;
  // public level10Score: number   = 0;
  // public level11Score: number   = 0;
  // public level12Score: number   = 0;
  // public level13Score: number   = 0;
  // public level14Score: number   = 0;
  // public level15Score: number   = 0;

  private arrPlayerGoodsData: PGoods[]; // 玩家物品数据
  private arrPlayerGoodsDataLast: PGoods[]; // 上一次玩家物品数据
  private arrBigLotteryRecordData: PTurntableRecord[]; // 全服大奖数据
  private arrPlayerTaskData: PTask[];   // 玩家任务数据
  private arrRemainExchangeData: PExchangeRemain[]; // 交换剩余次数
  private arrCommendatoryData;           // 互推数据

  private isMatching: boolean = false;

  constructor() {
    this.arrPlayerGoodsData = [];
    this.arrPlayerGoodsDataLast = [];
    this.arrBigLotteryRecordData = [];
    this.arrPlayerTaskData = [];
    this.arrRemainExchangeData = [];
    this.arrCommendatoryData = [];
    this.pveStatArray = [];
  }

  public get NowSec() {
    return this.myPlayer.nowsec;
  }

  public set MyPlayer(value: PPlayer) {
    this.myPlayer = value;
    this.fortuneScore = this.myPlayer.score;
  }

  public set PveStatArray(value) {
    this.pveStatArray = value;
  }
  public get PveStatArray() {
    return this.pveStatArray;
  }

  // 元宝
  public set FortuneGold(value: number) {
    this.fortuneGold = value;
  }
  public get FortuneGold(): number {
    return this.fortuneGold;
  }

  // 是否正在匹配
  public get IsMatching(): boolean {
    return this.isMatching;
  }
  public set IsMatching(value: boolean) {
    this.isMatching = value;
  }

  // 星数
  public set FortuneStar(value: number) {
    this.fortuneStar = value;
  }
  public get FortuneStar(): number {
    return this.fortuneStar;
  }

  // 积分
  public set FortuneScore(value: number) {
    this.fortuneScore = value;
  }
  public get FortuneScore(): number {
    return this.fortuneScore;
  }

  // 体力
  public set FortuneEnergy(value: number) {
    this.fortuneEnergy = value;
  }
  public get FortuneEnergy(): number {
    return this.fortuneEnergy;
  }

  // PvpBuff
  public set FortunePvpBuff(value: number) {
    this.fortunePvpBuff = value;
  }
  public get FortunePvpBuff(): number {
    return this.fortunePvpBuff;
  }

  // 比赛的总局数
  public set PlayCntTotal(value: number) {
    this.playCntTotal = value;
  }
  public get PlayCntTotal(): number {
    return this.playCntTotal;
  }

  // 比赛赢的局数
  public set PlayCntWin(value: number) {
    this.playCntWin = value;
  }
  public get PlayCntWin(): number {
    return this.playCntWin;
  }

  get PlayPveWin(): number {
    return this.playPveWin;
  }

  set PlayPveWin(value: number) {
    this.playPveWin = value;
  }
  get PlayPveTotal(): number {
    return this.playPveTotal;
  }

  set PlayPveTotal(value: number) {
    this.playPveTotal = value;
  }
  get PlayMatchOnce(): number {
    return this.playMatchOnce;
  }

  set PlayMatchOnce(value: number) {
    this.playMatchOnce = value;
  }
  get PlaySaveOnce(): number {
    return this.playSaveOnce;
  }

  set PlaySaveOnce(value: number) {
    this.playSaveOnce = value;
  }

  get PlayWeeklyTotal(): number {
    return this.playWeeklyTotal;
  }

  set PlayWeeklyTotal(value: number) {
    this.playWeeklyTotal = value;
  }
  get PlayWeeklyWin(): number {
    return this.playWeeklyWin;
  }

  set PlayWeeklyWin(value: number) {
    this.playWeeklyWin = value;
  }
  get Level(): number {
    return this.level;
  }

  set Level(value: number) {
    this.level = value;
  }
  get Guide(): number {
    return this.guide;
  }

  set Guide(value: number) {
    this.guide = value;
  }
  get MaxSuccessiveWin(): number {
    return this.maxSuccessiveWin;
  }

  set MaxSuccessiveWin(value: number) {
    this.maxSuccessiveWin = value;
  }

  public get MyId(): number {
    if (!this.myPlayer) {
      return 0;
    }
    return this.myPlayer.id;
  }

  public get MyName(): string {
    if (!this.myPlayer) {
      return "";
    }
    return this.myPlayer.name;
  }

  public get MyHeadUrl(): string {
    if (!this.myPlayer) {
      return "";
    }
    return this.myPlayer.headImg;
  }

  public get EnergyFullTime(): string {
    if (!this.myPlayer) {
      return "";
    }
    return this.myPlayer.energyFullTime;
  }
  public set EnergyFullTime(value: string) {
    this.myPlayer.energyFullTime = value;
  }

  // xlchen add 
  public get MySex(): number {
    if (!this.myPlayer) {
      return -1;
    }
    return this.myPlayer.sex;
  }

  // 设置玩家背包数据
  public set PlayerGoodsData(data: PGoods[]) {
    this.arrPlayerGoodsData = data;
  }

  // 获取玩家背包数据
  public get PlayerGoodsData(): PGoods[] {
    return this.arrPlayerGoodsData;
  }

  // 设置玩家背包数据
  public set PlayerGoodsDataLast(data: PGoods[]) {
    this.arrPlayerGoodsDataLast = [];
    for (let i = 0; i < data.length; ++i) {
      const goodData: PGoods = new PGoods();
      goodData.goodsId = data[i].goodsId;
      goodData.goodsNum = data[i].goodsNum;
      this.UpdataPlayerGoodsLast([goodData]);
    }
  }

  // 获取玩家背包数据
  public get PlayerGoodsDataLast(): PGoods[] {
    return this.arrPlayerGoodsDataLast;
  }

  // 更新背包数据
  public UpdataPlayerGoods(data: PGoods[]) {
    for (let i = 0; i < data.length; i++) {
      const id = data[i].goodsId;
      const num = data[i].goodsNum;
      let bFind: boolean = false;

      // 如果存在该id数据就更新，不存在就添加
      for (let j = 0; j < this.PlayerGoodsData.length; j++) {
        if (this.PlayerGoodsData[j].goodsId === id) {
          bFind = true;
          if (num === 0) {
            this.PlayerGoodsData.splice(j, 1);         // 如果数量为0，就删除
          } else {
            this.PlayerGoodsData[j].goodsNum = num;     // 如果不为0，就更新
          }
          break;
        }
      } // for j end

      // 不存该id数据,添加之
      if (bFind === false) {
        const goodData: PGoods = new PGoods();
        goodData.goodsId = id;
        goodData.goodsNum = num;
        this.PlayerGoodsData.push(goodData);
      }

    } // for i end
  }

  // 更新背包数据旧
  public UpdataPlayerGoodsLast(data: PGoods[]) {
    for (let i = 0; i < data.length; i++) {
      if(!data[i]){
        continue;
      }
      const id = data[i].goodsId;
      const num = data[i].goodsNum;
      let bFind: boolean = false;

      // 如果存在该id数据就更新，不存在就添加
      for (let j = 0; j < this.PlayerGoodsDataLast.length; j++) {
        if (this.PlayerGoodsDataLast[j].goodsId === id) {
          bFind = true;
          if (num === 0) {
            this.PlayerGoodsDataLast.splice(j, 1);         // 如果数量为0，就删除
          } else {
            this.PlayerGoodsDataLast[j].goodsNum = num;     // 如果不为0，就更新
          }
          break;
        }
      } // for j end

      // 不存该id数据,添加之
      if (bFind === false) {
        const goodData: PGoods = new PGoods();
        goodData.goodsId = id;
        goodData.goodsNum = num;
        this.PlayerGoodsDataLast.push(goodData);
      }

    } // for i end
  }



  // 设置全服大奖数据
  public set BigLotteryRecordData(data: PTurntableRecord[]) {
    this.arrBigLotteryRecordData = data;
  }

  // 获取全服大奖数据
  public get BigLotteryRecordData(): PTurntableRecord[] {
    return this.arrBigLotteryRecordData;
  }

  // 更新全服大奖数据
  public UpdataBigLotteryRecord(data: PTurntableRecord) {
    this.arrBigLotteryRecordData.push(data);
  }

  // 设置任务数据
  public set PlayerTaskData(data: PTask[]) {
    this.arrPlayerTaskData = data;
  }

  // 获取任务数据
  public get PlayerTaskData(): PTask[] {
    return this.arrPlayerTaskData;
  }

  // 更新任务数据
  public UpdataPlayerTask(data: PTask[]) {
    for (let i = 0; i < data.length; i++) {
      const id = data[i].id;
      const progress = data[i].progress;
      const status = data[i].status;
      let bFind: boolean = false;

      // 如果存在该id数据就更新
      for (let j = 0; j < this.PlayerTaskData.length; j++) {
        if (this.PlayerTaskData[j].id === id) {
          bFind = true;
          this.PlayerTaskData[j].progress = progress;
          this.PlayerTaskData[j].status = status;
          break;
        }
      } // for j end

      // 不存该id数据,添加之
      if (bFind === false) {
        const taskData: PTask = new PTask();
        taskData.id = id;
        taskData.progress = progress;
        taskData.status = status;
        this.PlayerTaskData.push(taskData);
      }

    } // for i end
  }

  // 设置剩余交换次数
  public set RemainExchangeData(data: PExchangeRemain[]) {
    this.arrRemainExchangeData = data;
  }

  // 获取剩余交换次数
  public get RemainExchangeData(): PExchangeRemain[] {
    return this.arrRemainExchangeData;
  }

  // 获取剩余交换次数
  public getRemainExchangeDataById(id: number): PExchangeRemain {
    // 剩余次数
    const size1 = this.arrRemainExchangeData.length;
    for (let i = 0; i < size1; i++) {
      if (this.arrRemainExchangeData[i].id === id) {
        return this.arrRemainExchangeData[i];
      }
    }
  }

  // 更新剩余交换次数
  public UpdataRemainExchange(id: number, reduce: number = 1): number {
    const size = this.arrRemainExchangeData.length;
    for (let i = 0; i < size; i++) {
      if (this.arrRemainExchangeData[i].id === id) {
        this.arrRemainExchangeData[i].num -= reduce;
        if (this.arrRemainExchangeData[i].num <= 0) {
          this.arrRemainExchangeData[i].num = 0;
        }
        return this.arrRemainExchangeData[i].num;
      }
    }
  }


  // 互推数据
  public set CommendatoryData(data) {
    this.arrCommendatoryData = data;
  }

  public get CommendatoryData() {
    return this.arrCommendatoryData;
  }

  // 今日分享次数

  public set EnergyShareCnt(data) {
    this.energyShareCnt = data;
  }
  public get EnergyShareCnt() {
    return this.energyShareCnt;
  }
  public set CoinShareCnt(data) {
    this.coinShareCnt = data;
  }
  public get CoinShareCnt() {
    return this.coinShareCnt;
  }
  public set PropShareCnt(data) {
    this.propShareCnt = data;
  }
  public get PropShareCnt() {
    return this.propShareCnt;
  }
  public set PveShareCnt(data) {
    this.pveShareCnt = data;
  }
  public get PveShareCnt() {
    return this.pveShareCnt;
  }
}
