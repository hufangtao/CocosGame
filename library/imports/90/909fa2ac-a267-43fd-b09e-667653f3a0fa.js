"use strict";
cc._RF.push(module, '909faKsomdD/bCeZnZT86D6', 'ProtoSectionGoods');
// scripts/app/common/net/proto/mods/ProtoSectionGoods.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var GoodsPullC2S = /** @class */ (function () {
    function GoodsPullC2S() {
        this.MSG_ID = 3840;
    }
    GoodsPullC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return GoodsPullC2S;
}());
exports.GoodsPullC2S = GoodsPullC2S;
var GoodsExchangeC2S = /** @class */ (function () {
    function GoodsExchangeC2S() {
        this.MSG_ID = 3871;
    }
    GoodsExchangeC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.id);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return GoodsExchangeC2S;
}());
exports.GoodsExchangeC2S = GoodsExchangeC2S;
var GoodsExchangeRemainC2S = /** @class */ (function () {
    function GoodsExchangeRemainC2S() {
        this.MSG_ID = 3872;
    }
    GoodsExchangeRemainC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return GoodsExchangeRemainC2S;
}());
exports.GoodsExchangeRemainC2S = GoodsExchangeRemainC2S;
var GoodsTurntableRunC2S = /** @class */ (function () {
    function GoodsTurntableRunC2S() {
        this.MSG_ID = 3891;
    }
    GoodsTurntableRunC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return GoodsTurntableRunC2S;
}());
exports.GoodsTurntableRunC2S = GoodsTurntableRunC2S;
var GoodsTurntableRecordPullC2S = /** @class */ (function () {
    function GoodsTurntableRecordPullC2S() {
        this.MSG_ID = 3892;
    }
    GoodsTurntableRecordPullC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return GoodsTurntableRecordPullC2S;
}());
exports.GoodsTurntableRecordPullC2S = GoodsTurntableRecordPullC2S;
var GoodsPullS2C = /** @class */ (function () {
    function GoodsPullS2C() {
    }
    GoodsPullS2C.decode = function (byteArray) {
        var obj = new GoodsPullS2C();
        var len;
        obj.goodsList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
        }
        return obj;
    };
    GoodsPullS2C.EVENT_NAME = "GoodsPullS2C";
    return GoodsPullS2C;
}());
exports.GoodsPullS2C = GoodsPullS2C;
var GoodsUpdateS2C = /** @class */ (function () {
    function GoodsUpdateS2C() {
    }
    GoodsUpdateS2C.decode = function (byteArray) {
        var obj = new GoodsUpdateS2C();
        var len;
        obj.goodsList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
        }
        return obj;
    };
    GoodsUpdateS2C.EVENT_NAME = "GoodsUpdateS2C";
    return GoodsUpdateS2C;
}());
exports.GoodsUpdateS2C = GoodsUpdateS2C;
var GoodsExchangeS2C = /** @class */ (function () {
    function GoodsExchangeS2C() {
    }
    GoodsExchangeS2C.decode = function (byteArray) {
        var obj = new GoodsExchangeS2C();
        var len;
        obj.id = byteArray.readUnsignedInt();
        obj.goodsList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
        }
        return obj;
    };
    GoodsExchangeS2C.EVENT_NAME = "GoodsExchangeS2C";
    return GoodsExchangeS2C;
}());
exports.GoodsExchangeS2C = GoodsExchangeS2C;
var GoodsExchangeRemainS2C = /** @class */ (function () {
    function GoodsExchangeRemainS2C() {
    }
    GoodsExchangeRemainS2C.decode = function (byteArray) {
        var obj = new GoodsExchangeRemainS2C();
        var len;
        obj.exchangeList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.exchangeList.push(ProtoType.PExchangeList.decode(byteArray));
        }
        return obj;
    };
    GoodsExchangeRemainS2C.EVENT_NAME = "GoodsExchangeRemainS2C";
    return GoodsExchangeRemainS2C;
}());
exports.GoodsExchangeRemainS2C = GoodsExchangeRemainS2C;
var GoodsTurntableRunS2C = /** @class */ (function () {
    function GoodsTurntableRunS2C() {
    }
    GoodsTurntableRunS2C.decode = function (byteArray) {
        var obj = new GoodsTurntableRunS2C();
        var len;
        obj.id = byteArray.readUnsignedInt();
        obj.goodsList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.goodsList.push(ProtoType.PGoods.decode(byteArray));
        }
        return obj;
    };
    GoodsTurntableRunS2C.EVENT_NAME = "GoodsTurntableRunS2C";
    return GoodsTurntableRunS2C;
}());
exports.GoodsTurntableRunS2C = GoodsTurntableRunS2C;
var GoodsTurntableRecordPullS2C = /** @class */ (function () {
    function GoodsTurntableRecordPullS2C() {
    }
    GoodsTurntableRecordPullS2C.decode = function (byteArray) {
        var obj = new GoodsTurntableRecordPullS2C();
        var len;
        obj.recordList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.recordList.push(ProtoType.PTurntableRecord.decode(byteArray));
        }
        return obj;
    };
    GoodsTurntableRecordPullS2C.EVENT_NAME = "GoodsTurntableRecordPullS2C";
    return GoodsTurntableRecordPullS2C;
}());
exports.GoodsTurntableRecordPullS2C = GoodsTurntableRecordPullS2C;
var GoodsTurntableRecordNewS2C = /** @class */ (function () {
    function GoodsTurntableRecordNewS2C() {
    }
    GoodsTurntableRecordNewS2C.decode = function (byteArray) {
        var obj = new GoodsTurntableRecordNewS2C();
        obj.record = ProtoType.PTurntableRecord.decode(byteArray);
        return obj;
    };
    GoodsTurntableRecordNewS2C.EVENT_NAME = "GoodsTurntableRecordNewS2C";
    return GoodsTurntableRecordNewS2C;
}());
exports.GoodsTurntableRecordNewS2C = GoodsTurntableRecordNewS2C;

cc._RF.pop();