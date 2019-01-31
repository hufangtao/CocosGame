"use strict";
cc._RF.push(module, '09398UeMkpMH4P3CA9qH/0b', 'ProtoSectionAcc');
// scripts/app/common/net/proto/mods/ProtoSectionAcc.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var AccLoginC2S = /** @class */ (function () {
    function AccLoginC2S() {
        this.MSG_ID = 2560;
    }
    AccLoginC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.platform);
        byteArray.writeUTF(this.gameAccountId);
        byteArray.writeUTF(this.gameAccountSign);
        byteArray.writeUTF(this.channelOpenId);
        byteArray.writeUTF(this.channelParam);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return AccLoginC2S;
}());
exports.AccLoginC2S = AccLoginC2S;
var AccCreateC2S = /** @class */ (function () {
    function AccCreateC2S() {
        this.MSG_ID = 2562;
    }
    AccCreateC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return AccCreateC2S;
}());
exports.AccCreateC2S = AccCreateC2S;
var AccCreateWithParamsC2S = /** @class */ (function () {
    function AccCreateWithParamsC2S() {
        this.MSG_ID = 2563;
    }
    AccCreateWithParamsC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.head);
        byteArray.writeByte(this.sex);
        byteArray.writeUTF(this.name);
        byteArray.writeUTF(this.params);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return AccCreateWithParamsC2S;
}());
exports.AccCreateWithParamsC2S = AccCreateWithParamsC2S;
var AccEnterC2S = /** @class */ (function () {
    function AccEnterC2S() {
        this.MSG_ID = 2564;
    }
    AccEnterC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeDouble(this.id);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return AccEnterC2S;
}());
exports.AccEnterC2S = AccEnterC2S;
var AccReloginC2S = /** @class */ (function () {
    function AccReloginC2S() {
        this.MSG_ID = 2566;
    }
    AccReloginC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.loginKey);
        byteArray.writeUTF(this.openId);
        byteArray.writeDouble(this.id);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return AccReloginC2S;
}());
exports.AccReloginC2S = AccReloginC2S;
var AccServertimeC2S = /** @class */ (function () {
    function AccServertimeC2S() {
        this.MSG_ID = 2567;
    }
    AccServertimeC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return AccServertimeC2S;
}());
exports.AccServertimeC2S = AccServertimeC2S;
var AccLoginS2C = /** @class */ (function () {
    function AccLoginS2C() {
    }
    AccLoginS2C.decode = function (byteArray) {
        var obj = new AccLoginS2C();
        obj.code = byteArray.readUnsignedShort();
        obj.id = byteArray.readDouble();
        obj.channelOpenId = byteArray.readUTF();
        obj.gameAccountId = byteArray.readUTF();
        obj.gameAccountSign = byteArray.readUTF();
        obj.gameLoginKey = byteArray.readUTF();
        return obj;
    };
    AccLoginS2C.EVENT_NAME = "AccLoginS2C";
    return AccLoginS2C;
}());
exports.AccLoginS2C = AccLoginS2C;
var AccCreateS2C = /** @class */ (function () {
    function AccCreateS2C() {
    }
    AccCreateS2C.decode = function (byteArray) {
        var obj = new AccCreateS2C();
        obj.code = byteArray.readUnsignedShort();
        obj.id = byteArray.readDouble();
        return obj;
    };
    AccCreateS2C.EVENT_NAME = "AccCreateS2C";
    return AccCreateS2C;
}());
exports.AccCreateS2C = AccCreateS2C;
var AccEnterS2C = /** @class */ (function () {
    function AccEnterS2C() {
    }
    AccEnterS2C.decode = function (byteArray) {
        var obj = new AccEnterS2C();
        obj.code = byteArray.readUnsignedShort();
        return obj;
    };
    AccEnterS2C.EVENT_NAME = "AccEnterS2C";
    return AccEnterS2C;
}());
exports.AccEnterS2C = AccEnterS2C;
var AccKickOfflineS2C = /** @class */ (function () {
    function AccKickOfflineS2C() {
    }
    AccKickOfflineS2C.decode = function (byteArray) {
        var obj = new AccKickOfflineS2C();
        obj.content = byteArray.readUTF();
        return obj;
    };
    AccKickOfflineS2C.EVENT_NAME = "AccKickOfflineS2C";
    return AccKickOfflineS2C;
}());
exports.AccKickOfflineS2C = AccKickOfflineS2C;
var AccReloginS2C = /** @class */ (function () {
    function AccReloginS2C() {
    }
    AccReloginS2C.decode = function (byteArray) {
        var obj = new AccReloginS2C();
        obj.code = byteArray.readUnsignedShort();
        return obj;
    };
    AccReloginS2C.EVENT_NAME = "AccReloginS2C";
    return AccReloginS2C;
}());
exports.AccReloginS2C = AccReloginS2C;
var AccServertimeS2C = /** @class */ (function () {
    function AccServertimeS2C() {
    }
    AccServertimeS2C.decode = function (byteArray) {
        var obj = new AccServertimeS2C();
        obj.time = byteArray.readUnsignedInt();
        return obj;
    };
    AccServertimeS2C.EVENT_NAME = "AccServertimeS2C";
    return AccServertimeS2C;
}());
exports.AccServertimeS2C = AccServertimeS2C;
var AccBanS2C = /** @class */ (function () {
    function AccBanS2C() {
    }
    AccBanS2C.decode = function (byteArray) {
        var obj = new AccBanS2C();
        obj.reason = byteArray.readUnsignedByte();
        obj.endTime = byteArray.readUnsignedInt();
        return obj;
    };
    AccBanS2C.EVENT_NAME = "AccBanS2C";
    return AccBanS2C;
}());
exports.AccBanS2C = AccBanS2C;
var AccMaintainS2C = /** @class */ (function () {
    function AccMaintainS2C() {
    }
    AccMaintainS2C.decode = function (byteArray) {
        var obj = new AccMaintainS2C();
        obj.state = byteArray.readUnsignedShort();
        obj.desc = byteArray.readUTF();
        return obj;
    };
    AccMaintainS2C.EVENT_NAME = "AccMaintainS2C";
    return AccMaintainS2C;
}());
exports.AccMaintainS2C = AccMaintainS2C;

cc._RF.pop();