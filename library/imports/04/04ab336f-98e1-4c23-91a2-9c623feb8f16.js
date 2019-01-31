"use strict";
cc._RF.push(module, '04ab3NvmOFMI5GinGI/648W', 'ProtoSectionPlayer');
// scripts/app/common/net/proto/mods/ProtoSectionPlayer.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var ProtoCrypto = require("../ProtoCrypto");
var PlayerShareGameC2S = /** @class */ (function () {
    function PlayerShareGameC2S() {
        this.MSG_ID = 2819;
    }
    PlayerShareGameC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedInt(this.reason);
        var index = (PlayerShareGameC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
        PlayerShareGameC2S.EncryptIndex = index;
        return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
    };
    PlayerShareGameC2S.EncryptIndex = 0;
    return PlayerShareGameC2S;
}());
exports.PlayerShareGameC2S = PlayerShareGameC2S;
var PlayerClickC2S = /** @class */ (function () {
    function PlayerClickC2S() {
        this.MSG_ID = 2821;
    }
    PlayerClickC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.point);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayerClickC2S;
}());
exports.PlayerClickC2S = PlayerClickC2S;
var PlayerWatchAdC2S = /** @class */ (function () {
    function PlayerWatchAdC2S() {
        this.MSG_ID = 2822;
    }
    PlayerWatchAdC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.reason);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayerWatchAdC2S;
}());
exports.PlayerWatchAdC2S = PlayerWatchAdC2S;
var PlayerDoubleC2S = /** @class */ (function () {
    function PlayerDoubleC2S() {
        this.MSG_ID = 2823;
    }
    PlayerDoubleC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.reason);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayerDoubleC2S;
}());
exports.PlayerDoubleC2S = PlayerDoubleC2S;
var PlayerCommitAddressC2S = /** @class */ (function () {
    function PlayerCommitAddressC2S() {
        this.MSG_ID = 2877;
    }
    PlayerCommitAddressC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUTF(this.name);
        byteArray.writeUTF(this.phone);
        byteArray.writeUTF(this.street);
        var index = (PlayerCommitAddressC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
        PlayerCommitAddressC2S.EncryptIndex = index;
        return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
    };
    PlayerCommitAddressC2S.EncryptIndex = 0;
    return PlayerCommitAddressC2S;
}());
exports.PlayerCommitAddressC2S = PlayerCommitAddressC2S;
var PlayerAddressC2S = /** @class */ (function () {
    function PlayerAddressC2S() {
        this.MSG_ID = 2878;
    }
    PlayerAddressC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayerAddressC2S;
}());
exports.PlayerAddressC2S = PlayerAddressC2S;
var PlayerGmAddFortuneC2S = /** @class */ (function () {
    function PlayerGmAddFortuneC2S() {
        this.MSG_ID = 2879;
    }
    PlayerGmAddFortuneC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.increase);
        byteArray.writeByte(this.type);
        byteArray.writeUnsignedInt(this.num);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayerGmAddFortuneC2S;
}());
exports.PlayerGmAddFortuneC2S = PlayerGmAddFortuneC2S;
var PlayerSelfInfoS2C = /** @class */ (function () {
    function PlayerSelfInfoS2C() {
    }
    PlayerSelfInfoS2C.decode = function (byteArray) {
        var obj = new PlayerSelfInfoS2C();
        obj.player = ProtoType.PPlayer.decode(byteArray);
        return obj;
    };
    PlayerSelfInfoS2C.EVENT_NAME = "PlayerSelfInfoS2C";
    return PlayerSelfInfoS2C;
}());
exports.PlayerSelfInfoS2C = PlayerSelfInfoS2C;
var PlayerFortuneS2C = /** @class */ (function () {
    function PlayerFortuneS2C() {
    }
    PlayerFortuneS2C.decode = function (byteArray) {
        var obj = new PlayerFortuneS2C();
        obj.type = byteArray.readUnsignedByte();
        obj.val = byteArray.readUnsignedInt();
        return obj;
    };
    PlayerFortuneS2C.EVENT_NAME = "PlayerFortuneS2C";
    return PlayerFortuneS2C;
}());
exports.PlayerFortuneS2C = PlayerFortuneS2C;
var PlayerPlayStatS2C = /** @class */ (function () {
    function PlayerPlayStatS2C() {
    }
    PlayerPlayStatS2C.decode = function (byteArray) {
        var obj = new PlayerPlayStatS2C();
        obj.stat = ProtoType.PPlayStat.decode(byteArray);
        return obj;
    };
    PlayerPlayStatS2C.EVENT_NAME = "PlayerPlayStatS2C";
    return PlayerPlayStatS2C;
}());
exports.PlayerPlayStatS2C = PlayerPlayStatS2C;
var PlayerShareGameS2C = /** @class */ (function () {
    function PlayerShareGameS2C() {
    }
    PlayerShareGameS2C.decode = function (byteArray) {
        var obj = new PlayerShareGameS2C();
        obj.reason = byteArray.readUnsignedInt();
        obj.success = byteArray.readUnsignedInt();
        obj.times = byteArray.readUnsignedInt();
        return obj;
    };
    PlayerShareGameS2C.EVENT_NAME = "PlayerShareGameS2C";
    return PlayerShareGameS2C;
}());
exports.PlayerShareGameS2C = PlayerShareGameS2C;
var PlayerPveStatS2C = /** @class */ (function () {
    function PlayerPveStatS2C() {
    }
    PlayerPveStatS2C.decode = function (byteArray) {
        var obj = new PlayerPveStatS2C();
        var len;
        obj.pvestat = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.pvestat.push(ProtoType.PPveStat.decode(byteArray));
        }
        return obj;
    };
    PlayerPveStatS2C.EVENT_NAME = "PlayerPveStatS2C";
    return PlayerPveStatS2C;
}());
exports.PlayerPveStatS2C = PlayerPveStatS2C;
var PlayerDailyClearedS2C = /** @class */ (function () {
    function PlayerDailyClearedS2C() {
    }
    PlayerDailyClearedS2C.decode = function (byteArray) {
        var obj = new PlayerDailyClearedS2C();
        return obj;
    };
    PlayerDailyClearedS2C.EVENT_NAME = "PlayerDailyClearedS2C";
    return PlayerDailyClearedS2C;
}());
exports.PlayerDailyClearedS2C = PlayerDailyClearedS2C;
var PlayerCommitAddressS2C = /** @class */ (function () {
    function PlayerCommitAddressS2C() {
    }
    PlayerCommitAddressS2C.decode = function (byteArray) {
        var obj = new PlayerCommitAddressS2C();
        return obj;
    };
    PlayerCommitAddressS2C.EVENT_NAME = "PlayerCommitAddressS2C";
    return PlayerCommitAddressS2C;
}());
exports.PlayerCommitAddressS2C = PlayerCommitAddressS2C;
var PlayerAddressS2C = /** @class */ (function () {
    function PlayerAddressS2C() {
    }
    PlayerAddressS2C.decode = function (byteArray) {
        var obj = new PlayerAddressS2C();
        obj.name = byteArray.readUTF();
        obj.phone = byteArray.readUTF();
        obj.street = byteArray.readUTF();
        return obj;
    };
    PlayerAddressS2C.EVENT_NAME = "PlayerAddressS2C";
    return PlayerAddressS2C;
}());
exports.PlayerAddressS2C = PlayerAddressS2C;

cc._RF.pop();