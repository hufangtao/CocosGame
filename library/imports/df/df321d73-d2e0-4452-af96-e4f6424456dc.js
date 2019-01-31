"use strict";
cc._RF.push(module, 'df3211z0uBEUq+W5PZCRFbc', 'ProtoSectionRank');
// scripts/app/common/net/proto/mods/ProtoSectionRank.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var RankPlayStarC2S = /** @class */ (function () {
    function RankPlayStarC2S() {
        this.MSG_ID = 4865;
    }
    RankPlayStarC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.posStart);
        byteArray.writeUnsignedInt(this.posEnd);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RankPlayStarC2S;
}());
exports.RankPlayStarC2S = RankPlayStarC2S;
var RankPveRankC2S = /** @class */ (function () {
    function RankPveRankC2S() {
        this.MSG_ID = 4866;
    }
    RankPveRankC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.level);
        byteArray.writeUnsignedInt(this.posStart);
        byteArray.writeUnsignedInt(this.posEnd);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RankPveRankC2S;
}());
exports.RankPveRankC2S = RankPveRankC2S;
var RankPlayStarS2C = /** @class */ (function () {
    function RankPlayStarS2C() {
    }
    RankPlayStarS2C.decode = function (byteArray) {
        var obj = new RankPlayStarS2C();
        var len;
        obj.myPos = byteArray.readUnsignedInt();
        obj.playmates = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.playmates.push(ProtoType.PStarRank.decode(byteArray));
        }
        return obj;
    };
    RankPlayStarS2C.EVENT_NAME = "RankPlayStarS2C";
    return RankPlayStarS2C;
}());
exports.RankPlayStarS2C = RankPlayStarS2C;
var RankPveRankS2C = /** @class */ (function () {
    function RankPveRankS2C() {
    }
    RankPveRankS2C.decode = function (byteArray) {
        var obj = new RankPveRankS2C();
        var len;
        obj.level = byteArray.readUnsignedInt();
        obj.myPos = byteArray.readUnsignedInt();
        obj.playmates = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.playmates.push(ProtoType.PPveRank.decode(byteArray));
        }
        return obj;
    };
    RankPveRankS2C.EVENT_NAME = "RankPveRankS2C";
    return RankPveRankS2C;
}());
exports.RankPveRankS2C = RankPveRankS2C;

cc._RF.pop();