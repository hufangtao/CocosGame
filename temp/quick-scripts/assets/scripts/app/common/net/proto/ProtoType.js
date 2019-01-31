(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/proto/ProtoType.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '99ccf3nxFRGj7SjAyxFdgMy', 'ProtoType', __filename);
// scripts/app/common/net/proto/ProtoType.ts

// Auto Generate. Don't Change manually
Object.defineProperty(exports, "__esModule", { value: true });
// 玩家信息
var PPlayer = /** @class */ (function () {
    function PPlayer() {
    }
    PPlayer.decode = function (byteArray) {
        var obj = new PPlayer();
        obj.id = byteArray.readDouble();
        obj.name = byteArray.readUTF();
        obj.sex = byteArray.readUnsignedByte();
        obj.headImg = byteArray.readUTF();
        obj.score = byteArray.readDouble();
        obj.win = byteArray.readUnsignedInt();
        obj.nowsec = byteArray.readUTF();
        obj.energyFullTime = byteArray.readUTF();
        return obj;
    };
    return PPlayer;
}());
exports.PPlayer = PPlayer;
// 活动信息
var PActivity = /** @class */ (function () {
    function PActivity() {
    }
    PActivity.decode = function (byteArray) {
        var obj = new PActivity();
        obj.actid = byteArray.readUnsignedByte();
        obj.status = byteArray.readUnsignedByte();
        obj.secsLeft = byteArray.readUnsignedInt();
        return obj;
    };
    return PActivity;
}());
exports.PActivity = PActivity;
// 财富
var PWealth = /** @class */ (function () {
    function PWealth() {
    }
    PWealth.decode = function (byteArray) {
        var obj = new PWealth();
        obj.type = byteArray.readUnsignedByte();
        obj.value = byteArray.readUnsignedInt();
        return obj;
    };
    return PWealth;
}());
exports.PWealth = PWealth;
// 物品信息
var PGoods = /** @class */ (function () {
    function PGoods() {
    }
    PGoods.decode = function (byteArray) {
        var obj = new PGoods();
        obj.goodsId = byteArray.readUnsignedInt();
        obj.goodsNum = byteArray.readUnsignedInt();
        return obj;
    };
    return PGoods;
}());
exports.PGoods = PGoods;
// 签到格
var PSignSlot = /** @class */ (function () {
    function PSignSlot() {
    }
    PSignSlot.decode = function (byteArray) {
        var obj = new PSignSlot();
        var len;
        obj.slot = byteArray.readUnsignedByte();
        obj.signed = byteArray.readUnsignedByte();
        obj.reward = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.reward.push(PGoods.decode(byteArray));
        }
        return obj;
    };
    return PSignSlot;
}());
exports.PSignSlot = PSignSlot;
// 兑换商品
var PExchangeList = /** @class */ (function () {
    function PExchangeList() {
    }
    PExchangeList.decode = function (byteArray) {
        var obj = new PExchangeList();
        obj.id = byteArray.readUnsignedInt();
        obj.price = byteArray.readUnsignedInt();
        return obj;
    };
    return PExchangeList;
}());
exports.PExchangeList = PExchangeList;
// 中奖记录
var PTurntableRecord = /** @class */ (function () {
    function PTurntableRecord() {
    }
    PTurntableRecord.decode = function (byteArray) {
        var obj = new PTurntableRecord();
        obj.turntableId = byteArray.readUnsignedInt();
        obj.playerName = byteArray.readUTF();
        obj.time = byteArray.readUnsignedInt();
        return obj;
    };
    return PTurntableRecord;
}());
exports.PTurntableRecord = PTurntableRecord;
// 房间玩伴
var PPlaymate = /** @class */ (function () {
    function PPlaymate() {
    }
    PPlaymate.decode = function (byteArray) {
        var obj = new PPlaymate();
        obj.id = byteArray.readDouble();
        obj.name = byteArray.readUTF();
        obj.headImg = byteArray.readUTF();
        obj.sex = byteArray.readUnsignedByte();
        obj.star = byteArray.readUnsignedInt();
        return obj;
    };
    return PPlaymate;
}());
exports.PPlaymate = PPlaymate;
// 比赛统计
var PPlayStat = /** @class */ (function () {
    function PPlayStat() {
    }
    PPlayStat.decode = function (byteArray) {
        var obj = new PPlayStat();
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
    };
    return PPlayStat;
}());
exports.PPlayStat = PPlayStat;
// pve比赛统计
var PPveStat = /** @class */ (function () {
    function PPveStat() {
    }
    PPveStat.decode = function (byteArray) {
        var obj = new PPveStat();
        obj.level = byteArray.readUnsignedInt();
        obj.score = byteArray.readUnsignedInt();
        return obj;
    };
    return PPveStat;
}());
exports.PPveStat = PPveStat;
// 排行榜上的玩家
var PStarRank = /** @class */ (function () {
    function PStarRank() {
    }
    PStarRank.decode = function (byteArray) {
        var obj = new PStarRank();
        obj.id = byteArray.readDouble();
        obj.name = byteArray.readUTF();
        obj.headImg = byteArray.readUTF();
        obj.sex = byteArray.readUnsignedByte();
        obj.star = byteArray.readUnsignedInt();
        obj.rateOfWin = byteArray.readUnsignedInt();
        return obj;
    };
    return PStarRank;
}());
exports.PStarRank = PStarRank;
// player on pve rank
var PPveRank = /** @class */ (function () {
    function PPveRank() {
    }
    PPveRank.decode = function (byteArray) {
        var obj = new PPveRank();
        obj.id = byteArray.readDouble();
        obj.name = byteArray.readUTF();
        obj.headImg = byteArray.readUTF();
        obj.sex = byteArray.readUnsignedByte();
        obj.score = byteArray.readUnsignedInt();
        return obj;
    };
    return PPveRank;
}());
exports.PPveRank = PPveRank;
// 任务
var PTask = /** @class */ (function () {
    function PTask() {
    }
    PTask.decode = function (byteArray) {
        var obj = new PTask();
        obj.id = byteArray.readUnsignedInt();
        obj.progress = byteArray.readUnsignedInt();
        obj.status = byteArray.readUnsignedByte();
        return obj;
    };
    return PTask;
}());
exports.PTask = PTask;
// 房间玩伴
var PPlaymateScore = /** @class */ (function () {
    function PPlaymateScore() {
    }
    PPlaymateScore.decode = function (byteArray) {
        var obj = new PPlaymateScore();
        obj.id = byteArray.readDouble();
        obj.score = byteArray.readUnsignedInt();
        return obj;
    };
    return PPlaymateScore;
}());
exports.PPlaymateScore = PPlaymateScore;
// 娃娃的静止状态
var PBabyPos = /** @class */ (function () {
    function PBabyPos() {
    }
    PBabyPos.decode = function (byteArray) {
        var obj = new PBabyPos();
        obj.roundId = byteArray.readUnsignedInt();
        obj.x = byteArray.readUTF();
        obj.angle = byteArray.readUTF();
        obj.y = byteArray.readUTF();
        return obj;
    };
    return PBabyPos;
}());
exports.PBabyPos = PBabyPos;

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
        //# sourceMappingURL=ProtoType.js.map
        