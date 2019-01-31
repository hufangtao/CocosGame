"use strict";
cc._RF.push(module, '18f6c9tSy1FLatsl3X0upx4', 'ProtoSectionSignIn');
// scripts/app/common/net/proto/mods/ProtoSectionSignIn.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var SignInSignC2S = /** @class */ (function () {
    function SignInSignC2S() {
        this.MSG_ID = 5633;
    }
    SignInSignC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.slot);
        byteArray.writeByte(this.double);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return SignInSignC2S;
}());
exports.SignInSignC2S = SignInSignC2S;
var SignInSignListC2S = /** @class */ (function () {
    function SignInSignListC2S() {
        this.MSG_ID = 5634;
    }
    SignInSignListC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return SignInSignListC2S;
}());
exports.SignInSignListC2S = SignInSignListC2S;
var SignInSignS2C = /** @class */ (function () {
    function SignInSignS2C() {
    }
    SignInSignS2C.decode = function (byteArray) {
        var obj = new SignInSignS2C();
        var len;
        obj.slot = byteArray.readUnsignedByte();
        obj.reward = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.reward.push(ProtoType.PGoods.decode(byteArray));
        }
        return obj;
    };
    SignInSignS2C.EVENT_NAME = "SignInSignS2C";
    return SignInSignS2C;
}());
exports.SignInSignS2C = SignInSignS2C;
var SignInSignListS2C = /** @class */ (function () {
    function SignInSignListS2C() {
    }
    SignInSignListS2C.decode = function (byteArray) {
        var obj = new SignInSignListS2C();
        var len;
        obj.now = byteArray.readUnsignedByte();
        obj.list = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.list.push(ProtoType.PSignSlot.decode(byteArray));
        }
        return obj;
    };
    SignInSignListS2C.EVENT_NAME = "SignInSignListS2C";
    return SignInSignListS2C;
}());
exports.SignInSignListS2C = SignInSignListS2C;

cc._RF.pop();