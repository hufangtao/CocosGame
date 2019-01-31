(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/proto/mods/ProtoSectionRoom.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '13644eQLtBFjJF/FeRUzqz1', 'ProtoSectionRoom', __filename);
// scripts/app/common/net/proto/mods/ProtoSectionRoom.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var RoomMatchRequestC2S = /** @class */ (function () {
    function RoomMatchRequestC2S() {
        this.MSG_ID = 3072;
    }
    RoomMatchRequestC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.roomType);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RoomMatchRequestC2S;
}());
exports.RoomMatchRequestC2S = RoomMatchRequestC2S;
var RoomInviteRequestC2S = /** @class */ (function () {
    function RoomInviteRequestC2S() {
        this.MSG_ID = 3073;
    }
    RoomInviteRequestC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RoomInviteRequestC2S;
}());
exports.RoomInviteRequestC2S = RoomInviteRequestC2S;
var RoomPlayWithC2S = /** @class */ (function () {
    function RoomPlayWithC2S() {
        this.MSG_ID = 3075;
    }
    RoomPlayWithC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.inviteeParam);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RoomPlayWithC2S;
}());
exports.RoomPlayWithC2S = RoomPlayWithC2S;
var RoomPlayConfirmC2S = /** @class */ (function () {
    function RoomPlayConfirmC2S() {
        this.MSG_ID = 3077;
    }
    RoomPlayConfirmC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RoomPlayConfirmC2S;
}());
exports.RoomPlayConfirmC2S = RoomPlayConfirmC2S;
var RoomInviterC2S = /** @class */ (function () {
    function RoomInviterC2S() {
        this.MSG_ID = 3084;
    }
    RoomInviterC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.inviterParam);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RoomInviterC2S;
}());
exports.RoomInviterC2S = RoomInviterC2S;
var RoomInvisibleC2S = /** @class */ (function () {
    function RoomInvisibleC2S() {
        this.MSG_ID = 3086;
    }
    RoomInvisibleC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return RoomInvisibleC2S;
}());
exports.RoomInvisibleC2S = RoomInvisibleC2S;
var RoomMatchRequestS2C = /** @class */ (function () {
    function RoomMatchRequestS2C() {
    }
    RoomMatchRequestS2C.decode = function (byteArray) {
        var obj = new RoomMatchRequestS2C();
        return obj;
    };
    RoomMatchRequestS2C.EVENT_NAME = "RoomMatchRequestS2C";
    return RoomMatchRequestS2C;
}());
exports.RoomMatchRequestS2C = RoomMatchRequestS2C;
var RoomInviteRequestS2C = /** @class */ (function () {
    function RoomInviteRequestS2C() {
    }
    RoomInviteRequestS2C.decode = function (byteArray) {
        var obj = new RoomInviteRequestS2C();
        obj.inviteeParam = byteArray.readUTF();
        return obj;
    };
    RoomInviteRequestS2C.EVENT_NAME = "RoomInviteRequestS2C";
    return RoomInviteRequestS2C;
}());
exports.RoomInviteRequestS2C = RoomInviteRequestS2C;
var RoomInviteTimeoutS2C = /** @class */ (function () {
    function RoomInviteTimeoutS2C() {
    }
    RoomInviteTimeoutS2C.decode = function (byteArray) {
        var obj = new RoomInviteTimeoutS2C();
        obj.roomId = byteArray.readUnsignedInt();
        return obj;
    };
    RoomInviteTimeoutS2C.EVENT_NAME = "RoomInviteTimeoutS2C";
    return RoomInviteTimeoutS2C;
}());
exports.RoomInviteTimeoutS2C = RoomInviteTimeoutS2C;
var RoomPlayWithS2C = /** @class */ (function () {
    function RoomPlayWithS2C() {
    }
    RoomPlayWithS2C.decode = function (byteArray) {
        var obj = new RoomPlayWithS2C();
        obj.roomId = byteArray.readUnsignedInt();
        return obj;
    };
    RoomPlayWithS2C.EVENT_NAME = "RoomPlayWithS2C";
    return RoomPlayWithS2C;
}());
exports.RoomPlayWithS2C = RoomPlayWithS2C;
var RoomPlayCreateS2C = /** @class */ (function () {
    function RoomPlayCreateS2C() {
    }
    RoomPlayCreateS2C.decode = function (byteArray) {
        var obj = new RoomPlayCreateS2C();
        var len;
        obj.roomId = byteArray.readUnsignedInt();
        obj.roomType = byteArray.readUnsignedByte();
        obj.roomOwner = byteArray.readDouble();
        obj.redId = byteArray.readDouble();
        obj.bluId = byteArray.readDouble();
        obj.playmates = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.playmates.push(ProtoType.PPlaymate.decode(byteArray));
        }
        return obj;
    };
    RoomPlayCreateS2C.EVENT_NAME = "RoomPlayCreateS2C";
    return RoomPlayCreateS2C;
}());
exports.RoomPlayCreateS2C = RoomPlayCreateS2C;
var RoomPlayConfirmS2C = /** @class */ (function () {
    function RoomPlayConfirmS2C() {
    }
    RoomPlayConfirmS2C.decode = function (byteArray) {
        var obj = new RoomPlayConfirmS2C();
        var len;
        obj.confirmList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.confirmList.push(byteArray.readDouble());
        }
        return obj;
    };
    RoomPlayConfirmS2C.EVENT_NAME = "RoomPlayConfirmS2C";
    return RoomPlayConfirmS2C;
}());
exports.RoomPlayConfirmS2C = RoomPlayConfirmS2C;
var RoomPlayStartS2C = /** @class */ (function () {
    function RoomPlayStartS2C() {
    }
    RoomPlayStartS2C.decode = function (byteArray) {
        var obj = new RoomPlayStartS2C();
        obj.roomId = byteArray.readUnsignedInt();
        return obj;
    };
    RoomPlayStartS2C.EVENT_NAME = "RoomPlayStartS2C";
    return RoomPlayStartS2C;
}());
exports.RoomPlayStartS2C = RoomPlayStartS2C;
var RoomReadyTimeoutS2C = /** @class */ (function () {
    function RoomReadyTimeoutS2C() {
    }
    RoomReadyTimeoutS2C.decode = function (byteArray) {
        var obj = new RoomReadyTimeoutS2C();
        return obj;
    };
    RoomReadyTimeoutS2C.EVENT_NAME = "RoomReadyTimeoutS2C";
    return RoomReadyTimeoutS2C;
}());
exports.RoomReadyTimeoutS2C = RoomReadyTimeoutS2C;
var RoomPlayFinishS2C = /** @class */ (function () {
    function RoomPlayFinishS2C() {
    }
    RoomPlayFinishS2C.decode = function (byteArray) {
        var obj = new RoomPlayFinishS2C();
        obj.roomId = byteArray.readUnsignedInt();
        obj.winSide = byteArray.readUnsignedByte();
        obj.winPlaymateId = byteArray.readDouble();
        obj.saveAnimalCount = byteArray.readUnsignedInt();
        obj.score = byteArray.readUnsignedInt();
        obj.winScore = byteArray.readUnsignedInt();
        obj.winCount = byteArray.readUnsignedInt();
        obj.dailyWin = byteArray.readUnsignedInt();
        obj.dailyCnt = byteArray.readUnsignedInt();
        obj.weeklyWin = byteArray.readUnsignedInt();
        obj.weeklyCnt = byteArray.readUnsignedInt();
        obj.showContinue = byteArray.readUnsignedByte();
        obj.activeBuffCount = byteArray.readUnsignedInt();
        return obj;
    };
    RoomPlayFinishS2C.EVENT_NAME = "RoomPlayFinishS2C";
    return RoomPlayFinishS2C;
}());
exports.RoomPlayFinishS2C = RoomPlayFinishS2C;
var RoomOpponentLeaveS2C = /** @class */ (function () {
    function RoomOpponentLeaveS2C() {
    }
    RoomOpponentLeaveS2C.decode = function (byteArray) {
        var obj = new RoomOpponentLeaveS2C();
        obj.opponentId = byteArray.readDouble();
        return obj;
    };
    RoomOpponentLeaveS2C.EVENT_NAME = "RoomOpponentLeaveS2C";
    return RoomOpponentLeaveS2C;
}());
exports.RoomOpponentLeaveS2C = RoomOpponentLeaveS2C;
var RoomInviterS2C = /** @class */ (function () {
    function RoomInviterS2C() {
    }
    RoomInviterS2C.decode = function (byteArray) {
        var obj = new RoomInviterS2C();
        obj.inviterParam = byteArray.readUTF();
        obj.playmate = ProtoType.PPlaymate.decode(byteArray);
        return obj;
    };
    RoomInviterS2C.EVENT_NAME = "RoomInviterS2C";
    return RoomInviterS2C;
}());
exports.RoomInviterS2C = RoomInviterS2C;
var RoomInvisibleS2C = /** @class */ (function () {
    function RoomInvisibleS2C() {
    }
    RoomInvisibleS2C.decode = function (byteArray) {
        var obj = new RoomInvisibleS2C();
        return obj;
    };
    RoomInvisibleS2C.EVENT_NAME = "RoomInvisibleS2C";
    return RoomInvisibleS2C;
}());
exports.RoomInvisibleS2C = RoomInvisibleS2C;
var RoomMatchTimeoutS2C = /** @class */ (function () {
    function RoomMatchTimeoutS2C() {
    }
    RoomMatchTimeoutS2C.decode = function (byteArray) {
        var obj = new RoomMatchTimeoutS2C();
        return obj;
    };
    RoomMatchTimeoutS2C.EVENT_NAME = "RoomMatchTimeoutS2C";
    return RoomMatchTimeoutS2C;
}());
exports.RoomMatchTimeoutS2C = RoomMatchTimeoutS2C;

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
        //# sourceMappingURL=ProtoSectionRoom.js.map
        