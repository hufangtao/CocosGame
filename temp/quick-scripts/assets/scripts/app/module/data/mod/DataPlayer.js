(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/module/data/mod/DataPlayer.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '823f6a99mxDJrso9X/Se81Z', 'DataPlayer', __filename);
// scripts/app/module/data/mod/DataPlayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoType_1 = require("../../../common/net/proto/ProtoType");
var slot = /** @class */ (function () {
    function slot() {
    }
    return slot;
}());
exports.slot = slot;
var DataPlayer = /** @class */ (function () {
    function DataPlayer() {
        this.fortuneScore = 0; // 我的积分
        this.fortuneGold = 0; // 我的元宝
        this.fortuneStar = 0; // 我的星数
        this.fortuneEnergy = 0; // 我的体力
        this.fortunePvpBuff = 0; // 我的buff
        this.playCntTotal = 0; // 比赛总局数
        this.playCntWin = 0; // 比赛赢的局数
        this.playSaveOnce = 0; // 单次拯救最多
        this.playMatchOnce = 0; // 单次消除最多
        this.playPveTotal = 0; // pve总次数
        this.playPveWin = 0; // pve胜利次数
        this.playWeeklyWin = 0; // weekly win
        this.playWeeklyTotal = 0; // weekly total
        this.maxSuccessiveWin = 0; // 最大连胜次数
        this.level = 0; // 关卡
        this.guide = 0; // 新手指导完成状态
        this.energyShareCnt = 0; // 体力今日分享次数
        this.coinShareCnt = 0; // 金币今日分享次数
        this.propShareCnt = 0; // 道具今日分享次数
        this.pveShareCnt = 0; // pve今日分享次数
        this.pveStatArray = [];
        this.isMatching = false;
        this.arrPlayerGoodsData = [];
        this.arrPlayerGoodsDataLast = [];
        this.arrBigLotteryRecordData = [];
        this.arrPlayerTaskData = [];
        this.arrRemainExchangeData = [];
        this.arrCommendatoryData = [];
        this.pveStatArray = [];
    }
    Object.defineProperty(DataPlayer.prototype, "NowSec", {
        get: function () {
            return this.myPlayer.nowsec;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "MyPlayer", {
        set: function (value) {
            this.myPlayer = value;
            this.fortuneScore = this.myPlayer.score;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PveStatArray", {
        get: function () {
            return this.pveStatArray;
        },
        set: function (value) {
            this.pveStatArray = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "FortuneGold", {
        get: function () {
            return this.fortuneGold;
        },
        // 元宝
        set: function (value) {
            this.fortuneGold = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "IsMatching", {
        // 是否正在匹配
        get: function () {
            return this.isMatching;
        },
        set: function (value) {
            this.isMatching = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "FortuneStar", {
        get: function () {
            return this.fortuneStar;
        },
        // 星数
        set: function (value) {
            this.fortuneStar = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "FortuneScore", {
        get: function () {
            return this.fortuneScore;
        },
        // 积分
        set: function (value) {
            this.fortuneScore = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "FortuneEnergy", {
        get: function () {
            return this.fortuneEnergy;
        },
        // 体力
        set: function (value) {
            this.fortuneEnergy = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "FortunePvpBuff", {
        get: function () {
            return this.fortunePvpBuff;
        },
        // PvpBuff
        set: function (value) {
            this.fortunePvpBuff = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayCntTotal", {
        get: function () {
            return this.playCntTotal;
        },
        // 比赛的总局数
        set: function (value) {
            this.playCntTotal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayCntWin", {
        get: function () {
            return this.playCntWin;
        },
        // 比赛赢的局数
        set: function (value) {
            this.playCntWin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayPveWin", {
        get: function () {
            return this.playPveWin;
        },
        set: function (value) {
            this.playPveWin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayPveTotal", {
        get: function () {
            return this.playPveTotal;
        },
        set: function (value) {
            this.playPveTotal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayMatchOnce", {
        get: function () {
            return this.playMatchOnce;
        },
        set: function (value) {
            this.playMatchOnce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlaySaveOnce", {
        get: function () {
            return this.playSaveOnce;
        },
        set: function (value) {
            this.playSaveOnce = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayWeeklyTotal", {
        get: function () {
            return this.playWeeklyTotal;
        },
        set: function (value) {
            this.playWeeklyTotal = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayWeeklyWin", {
        get: function () {
            return this.playWeeklyWin;
        },
        set: function (value) {
            this.playWeeklyWin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "Level", {
        get: function () {
            return this.level;
        },
        set: function (value) {
            this.level = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "Guide", {
        get: function () {
            return this.guide;
        },
        set: function (value) {
            this.guide = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "MaxSuccessiveWin", {
        get: function () {
            return this.maxSuccessiveWin;
        },
        set: function (value) {
            this.maxSuccessiveWin = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "MyId", {
        get: function () {
            if (!this.myPlayer) {
                return 0;
            }
            return this.myPlayer.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "MyName", {
        get: function () {
            if (!this.myPlayer) {
                return "";
            }
            return this.myPlayer.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "MyHeadUrl", {
        get: function () {
            if (!this.myPlayer) {
                return "";
            }
            return this.myPlayer.headImg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "EnergyFullTime", {
        get: function () {
            if (!this.myPlayer) {
                return "";
            }
            return this.myPlayer.energyFullTime;
        },
        set: function (value) {
            this.myPlayer.energyFullTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "MySex", {
        // xlchen add 
        get: function () {
            if (!this.myPlayer) {
                return -1;
            }
            return this.myPlayer.sex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayerGoodsData", {
        // 获取玩家背包数据
        get: function () {
            return this.arrPlayerGoodsData;
        },
        // 设置玩家背包数据
        set: function (data) {
            this.arrPlayerGoodsData = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PlayerGoodsDataLast", {
        // 获取玩家背包数据
        get: function () {
            return this.arrPlayerGoodsDataLast;
        },
        // 设置玩家背包数据
        set: function (data) {
            this.arrPlayerGoodsDataLast = [];
            for (var i = 0; i < data.length; ++i) {
                var goodData = new ProtoType_1.PGoods();
                goodData.goodsId = data[i].goodsId;
                goodData.goodsNum = data[i].goodsNum;
                this.UpdataPlayerGoodsLast([goodData]);
            }
        },
        enumerable: true,
        configurable: true
    });
    // 更新背包数据
    DataPlayer.prototype.UpdataPlayerGoods = function (data) {
        for (var i = 0; i < data.length; i++) {
            var id = data[i].goodsId;
            var num = data[i].goodsNum;
            var bFind = false;
            // 如果存在该id数据就更新，不存在就添加
            for (var j = 0; j < this.PlayerGoodsData.length; j++) {
                if (this.PlayerGoodsData[j].goodsId === id) {
                    bFind = true;
                    if (num === 0) {
                        this.PlayerGoodsData.splice(j, 1); // 如果数量为0，就删除
                    }
                    else {
                        this.PlayerGoodsData[j].goodsNum = num; // 如果不为0，就更新
                    }
                    break;
                }
            } // for j end
            // 不存该id数据,添加之
            if (bFind === false) {
                var goodData = new ProtoType_1.PGoods();
                goodData.goodsId = id;
                goodData.goodsNum = num;
                this.PlayerGoodsData.push(goodData);
            }
        } // for i end
    };
    // 更新背包数据旧
    DataPlayer.prototype.UpdataPlayerGoodsLast = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (!data[i]) {
                continue;
            }
            var id = data[i].goodsId;
            var num = data[i].goodsNum;
            var bFind = false;
            // 如果存在该id数据就更新，不存在就添加
            for (var j = 0; j < this.PlayerGoodsDataLast.length; j++) {
                if (this.PlayerGoodsDataLast[j].goodsId === id) {
                    bFind = true;
                    if (num === 0) {
                        this.PlayerGoodsDataLast.splice(j, 1); // 如果数量为0，就删除
                    }
                    else {
                        this.PlayerGoodsDataLast[j].goodsNum = num; // 如果不为0，就更新
                    }
                    break;
                }
            } // for j end
            // 不存该id数据,添加之
            if (bFind === false) {
                var goodData = new ProtoType_1.PGoods();
                goodData.goodsId = id;
                goodData.goodsNum = num;
                this.PlayerGoodsDataLast.push(goodData);
            }
        } // for i end
    };
    Object.defineProperty(DataPlayer.prototype, "BigLotteryRecordData", {
        // 获取全服大奖数据
        get: function () {
            return this.arrBigLotteryRecordData;
        },
        // 设置全服大奖数据
        set: function (data) {
            this.arrBigLotteryRecordData = data;
        },
        enumerable: true,
        configurable: true
    });
    // 更新全服大奖数据
    DataPlayer.prototype.UpdataBigLotteryRecord = function (data) {
        this.arrBigLotteryRecordData.push(data);
    };
    Object.defineProperty(DataPlayer.prototype, "PlayerTaskData", {
        // 获取任务数据
        get: function () {
            return this.arrPlayerTaskData;
        },
        // 设置任务数据
        set: function (data) {
            this.arrPlayerTaskData = data;
        },
        enumerable: true,
        configurable: true
    });
    // 更新任务数据
    DataPlayer.prototype.UpdataPlayerTask = function (data) {
        for (var i = 0; i < data.length; i++) {
            var id = data[i].id;
            var progress = data[i].progress;
            var status = data[i].status;
            var bFind = false;
            // 如果存在该id数据就更新
            for (var j = 0; j < this.PlayerTaskData.length; j++) {
                if (this.PlayerTaskData[j].id === id) {
                    bFind = true;
                    this.PlayerTaskData[j].progress = progress;
                    this.PlayerTaskData[j].status = status;
                    break;
                }
            } // for j end
            // 不存该id数据,添加之
            if (bFind === false) {
                var taskData = new ProtoType_1.PTask();
                taskData.id = id;
                taskData.progress = progress;
                taskData.status = status;
                this.PlayerTaskData.push(taskData);
            }
        } // for i end
    };
    Object.defineProperty(DataPlayer.prototype, "RemainExchangeData", {
        // 获取剩余交换次数
        get: function () {
            return this.arrRemainExchangeData;
        },
        // 设置剩余交换次数
        set: function (data) {
            this.arrRemainExchangeData = data;
        },
        enumerable: true,
        configurable: true
    });
    // 获取剩余交换次数
    DataPlayer.prototype.getRemainExchangeDataById = function (id) {
        // 剩余次数
        var size1 = this.arrRemainExchangeData.length;
        for (var i = 0; i < size1; i++) {
            if (this.arrRemainExchangeData[i].id === id) {
                return this.arrRemainExchangeData[i];
            }
        }
    };
    // 更新剩余交换次数
    DataPlayer.prototype.UpdataRemainExchange = function (id, reduce) {
        if (reduce === void 0) { reduce = 1; }
        var size = this.arrRemainExchangeData.length;
        for (var i = 0; i < size; i++) {
            if (this.arrRemainExchangeData[i].id === id) {
                this.arrRemainExchangeData[i].num -= reduce;
                if (this.arrRemainExchangeData[i].num <= 0) {
                    this.arrRemainExchangeData[i].num = 0;
                }
                return this.arrRemainExchangeData[i].num;
            }
        }
    };
    Object.defineProperty(DataPlayer.prototype, "CommendatoryData", {
        get: function () {
            return this.arrCommendatoryData;
        },
        // 互推数据
        set: function (data) {
            this.arrCommendatoryData = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "EnergyShareCnt", {
        get: function () {
            return this.energyShareCnt;
        },
        // 今日分享次数
        set: function (data) {
            this.energyShareCnt = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "CoinShareCnt", {
        get: function () {
            return this.coinShareCnt;
        },
        set: function (data) {
            this.coinShareCnt = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PropShareCnt", {
        get: function () {
            return this.propShareCnt;
        },
        set: function (data) {
            this.propShareCnt = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlayer.prototype, "PveShareCnt", {
        get: function () {
            return this.pveShareCnt;
        },
        set: function (data) {
            this.pveShareCnt = data;
        },
        enumerable: true,
        configurable: true
    });
    return DataPlayer;
}());
exports.default = DataPlayer;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=DataPlayer.js.map
        