"use strict";
cc._RF.push(module, '2a45cLuuItA8JEcj0w9BlYS', 'ProtoSectionBuff');
// scripts/app/common/net/proto/mods/ProtoSectionBuff.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var BuffBuffStatusC2S = /** @class */ (function () {
    function BuffBuffStatusC2S() {
        this.MSG_ID = 5377;
    }
    BuffBuffStatusC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return BuffBuffStatusC2S;
}());
exports.BuffBuffStatusC2S = BuffBuffStatusC2S;
var BuffGenC2S = /** @class */ (function () {
    function BuffGenC2S() {
        this.MSG_ID = 5378;
    }
    BuffGenC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return BuffGenC2S;
}());
exports.BuffGenC2S = BuffGenC2S;
var BuffBuffStatusS2C = /** @class */ (function () {
    function BuffBuffStatusS2C() {
    }
    BuffBuffStatusS2C.decode = function (byteArray) {
        var obj = new BuffBuffStatusS2C();
        obj.slotId = byteArray.readUnsignedByte();
        obj.buffId = byteArray.readUnsignedByte();
        obj.number = byteArray.readUnsignedByte();
        return obj;
    };
    BuffBuffStatusS2C.EVENT_NAME = "BuffBuffStatusS2C";
    return BuffBuffStatusS2C;
}());
exports.BuffBuffStatusS2C = BuffBuffStatusS2C;
var BuffGenS2C = /** @class */ (function () {
    function BuffGenS2C() {
    }
    BuffGenS2C.decode = function (byteArray) {
        var obj = new BuffGenS2C();
        obj.success = byteArray.readUnsignedByte();
        obj.reason = byteArray.readUnsignedByte();
        return obj;
    };
    BuffGenS2C.EVENT_NAME = "BuffGenS2C";
    return BuffGenS2C;
}());
exports.BuffGenS2C = BuffGenS2C;

cc._RF.pop();