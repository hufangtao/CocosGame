"use strict";
cc._RF.push(module, '3bc879/JIpP0qxTXwOpiFq9', 'ProtoSectionActivity');
// scripts/app/common/net/proto/mods/ProtoSectionActivity.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var ActivityListC2S = /** @class */ (function () {
    function ActivityListC2S() {
        this.MSG_ID = 3329;
    }
    ActivityListC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return ActivityListC2S;
}());
exports.ActivityListC2S = ActivityListC2S;
var ActivityInfoC2S = /** @class */ (function () {
    function ActivityInfoC2S() {
        this.MSG_ID = 3330;
    }
    ActivityInfoC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.actid);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return ActivityInfoC2S;
}());
exports.ActivityInfoC2S = ActivityInfoC2S;
var ActivityListS2C = /** @class */ (function () {
    function ActivityListS2C() {
    }
    ActivityListS2C.decode = function (byteArray) {
        var obj = new ActivityListS2C();
        var len;
        obj.list = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.list.push(ProtoType.PActivity.decode(byteArray));
        }
        return obj;
    };
    ActivityListS2C.EVENT_NAME = "ActivityListS2C";
    return ActivityListS2C;
}());
exports.ActivityListS2C = ActivityListS2C;
var ActivityInfoS2C = /** @class */ (function () {
    function ActivityInfoS2C() {
    }
    ActivityInfoS2C.decode = function (byteArray) {
        var obj = new ActivityInfoS2C();
        obj.val = ProtoType.PActivity.decode(byteArray);
        return obj;
    };
    ActivityInfoS2C.EVENT_NAME = "ActivityInfoS2C";
    return ActivityInfoS2C;
}());
exports.ActivityInfoS2C = ActivityInfoS2C;

cc._RF.pop();