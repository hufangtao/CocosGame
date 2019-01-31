(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/proto/mods/ProtoSectionPlay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3761e6il8xMDIqlqsYstrek', 'ProtoSectionPlay', __filename);
// scripts/app/common/net/proto/mods/ProtoSectionPlay.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoCrypto = require("../ProtoCrypto");
var PlayReadyC2S = /** @class */ (function () {
    function PlayReadyC2S() {
        this.MSG_ID = 5120;
    }
    PlayReadyC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedInt(this.roomId);
        var index = (PlayReadyC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
        PlayReadyC2S.EncryptIndex = index;
        return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
    };
    PlayReadyC2S.EncryptIndex = 0;
    return PlayReadyC2S;
}());
exports.PlayReadyC2S = PlayReadyC2S;
var PlaySaveAnimalC2S = /** @class */ (function () {
    function PlaySaveAnimalC2S() {
        this.MSG_ID = 5122;
    }
    PlaySaveAnimalC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlaySaveAnimalC2S;
}());
exports.PlaySaveAnimalC2S = PlaySaveAnimalC2S;
var PlayContinueC2S = /** @class */ (function () {
    function PlayContinueC2S() {
        this.MSG_ID = 5124;
    }
    PlayContinueC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        var index = (PlayContinueC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
        PlayContinueC2S.EncryptIndex = index;
        return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
    };
    PlayContinueC2S.EncryptIndex = 0;
    return PlayContinueC2S;
}());
exports.PlayContinueC2S = PlayContinueC2S;
var PlayGiveUpC2S = /** @class */ (function () {
    function PlayGiveUpC2S() {
        this.MSG_ID = 5125;
    }
    PlayGiveUpC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        var index = (PlayGiveUpC2S.EncryptIndex + 1) % ProtoCrypto.KeyMask;
        PlayGiveUpC2S.EncryptIndex = index;
        return ProtoCrypto.encode(index, this.MSG_ID, byteArray);
    };
    PlayGiveUpC2S.EncryptIndex = 0;
    return PlayGiveUpC2S;
}());
exports.PlayGiveUpC2S = PlayGiveUpC2S;
var PlayPveFinishC2S = /** @class */ (function () {
    function PlayPveFinishC2S() {
        this.MSG_ID = 5127;
    }
    PlayPveFinishC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.pveId);
        byteArray.writeByte(this.pveWin);
        byteArray.writeUnsignedInt(this.pveScore);
        byteArray.writeByte(this.remainStepsTime);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayPveFinishC2S;
}());
exports.PlayPveFinishC2S = PlayPveFinishC2S;
var PlayPvpFinishC2S = /** @class */ (function () {
    function PlayPvpFinishC2S() {
        this.MSG_ID = 5128;
    }
    PlayPvpFinishC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.matchOnce);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayPvpFinishC2S;
}());
exports.PlayPvpFinishC2S = PlayPvpFinishC2S;
var PlayGuideFinishC2S = /** @class */ (function () {
    function PlayGuideFinishC2S() {
        this.MSG_ID = 5129;
    }
    PlayGuideFinishC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.guideFinish);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayGuideFinishC2S;
}());
exports.PlayGuideFinishC2S = PlayGuideFinishC2S;
var PlayAiFinishC2S = /** @class */ (function () {
    function PlayAiFinishC2S() {
        this.MSG_ID = 5130;
    }
    PlayAiFinishC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.saveAnimalCount);
        byteArray.writeUnsignedInt(this.winSide);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayAiFinishC2S;
}());
exports.PlayAiFinishC2S = PlayAiFinishC2S;
var PlayStartPveC2S = /** @class */ (function () {
    function PlayStartPveC2S() {
        this.MSG_ID = 5131;
    }
    PlayStartPveC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayStartPveC2S;
}());
exports.PlayStartPveC2S = PlayStartPveC2S;
var PlayActiveBuffC2S = /** @class */ (function () {
    function PlayActiveBuffC2S() {
        this.MSG_ID = 5132;
    }
    PlayActiveBuffC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.slotId);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayActiveBuffC2S;
}());
exports.PlayActiveBuffC2S = PlayActiveBuffC2S;
var PlayStolenAnimalC2S = /** @class */ (function () {
    function PlayStolenAnimalC2S() {
        this.MSG_ID = 5133;
    }
    PlayStolenAnimalC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.num);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayStolenAnimalC2S;
}());
exports.PlayStolenAnimalC2S = PlayStolenAnimalC2S;
var PlayBoardStatusC2S = /** @class */ (function () {
    function PlayBoardStatusC2S() {
        this.MSG_ID = 5134;
    }
    PlayBoardStatusC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeByte(this.animalNum);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return PlayBoardStatusC2S;
}());
exports.PlayBoardStatusC2S = PlayBoardStatusC2S;
var PlayReadyS2C = /** @class */ (function () {
    function PlayReadyS2C() {
    }
    PlayReadyS2C.decode = function (byteArray) {
        var obj = new PlayReadyS2C();
        obj.roomId = byteArray.readUnsignedInt();
        return obj;
    };
    PlayReadyS2C.EVENT_NAME = "PlayReadyS2C";
    return PlayReadyS2C;
}());
exports.PlayReadyS2C = PlayReadyS2C;
var PlayNewRoundS2C = /** @class */ (function () {
    function PlayNewRoundS2C() {
    }
    PlayNewRoundS2C.decode = function (byteArray) {
        var obj = new PlayNewRoundS2C();
        obj.playmateId = byteArray.readDouble();
        obj.roundId = byteArray.readUnsignedInt();
        obj.roundDeadline = byteArray.readUnsignedInt();
        return obj;
    };
    PlayNewRoundS2C.EVENT_NAME = "PlayNewRoundS2C";
    return PlayNewRoundS2C;
}());
exports.PlayNewRoundS2C = PlayNewRoundS2C;
var PlaySaveAnimalS2C = /** @class */ (function () {
    function PlaySaveAnimalS2C() {
    }
    PlaySaveAnimalS2C.decode = function (byteArray) {
        var obj = new PlaySaveAnimalS2C();
        obj.saveCount = byteArray.readUnsignedInt();
        obj.animalSide = byteArray.readUnsignedByte();
        return obj;
    };
    PlaySaveAnimalS2C.EVENT_NAME = "PlaySaveAnimalS2C";
    return PlaySaveAnimalS2C;
}());
exports.PlaySaveAnimalS2C = PlaySaveAnimalS2C;
var PlayGenBlockS2C = /** @class */ (function () {
    function PlayGenBlockS2C() {
    }
    PlayGenBlockS2C.decode = function (byteArray) {
        var obj = new PlayGenBlockS2C();
        obj.genSide = byteArray.readUnsignedByte();
        obj.row = byteArray.readUnsignedByte();
        return obj;
    };
    PlayGenBlockS2C.EVENT_NAME = "PlayGenBlockS2C";
    return PlayGenBlockS2C;
}());
exports.PlayGenBlockS2C = PlayGenBlockS2C;
var PlayContinueS2C = /** @class */ (function () {
    function PlayContinueS2C() {
    }
    PlayContinueS2C.decode = function (byteArray) {
        var obj = new PlayContinueS2C();
        var len;
        obj.roomId = byteArray.readUnsignedInt();
        obj.continueList = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.continueList.push(byteArray.readDouble());
        }
        return obj;
    };
    PlayContinueS2C.EVENT_NAME = "PlayContinueS2C";
    return PlayContinueS2C;
}());
exports.PlayContinueS2C = PlayContinueS2C;
var PlayNewPhaseS2C = /** @class */ (function () {
    function PlayNewPhaseS2C() {
    }
    PlayNewPhaseS2C.decode = function (byteArray) {
        var obj = new PlayNewPhaseS2C();
        obj.phaseId = byteArray.readUnsignedByte();
        obj.phaseDeadline = byteArray.readUnsignedInt();
        return obj;
    };
    PlayNewPhaseS2C.EVENT_NAME = "PlayNewPhaseS2C";
    return PlayNewPhaseS2C;
}());
exports.PlayNewPhaseS2C = PlayNewPhaseS2C;
var PlayStartPveS2C = /** @class */ (function () {
    function PlayStartPveS2C() {
    }
    PlayStartPveS2C.decode = function (byteArray) {
        var obj = new PlayStartPveS2C();
        obj.started = byteArray.readUnsignedByte();
        return obj;
    };
    PlayStartPveS2C.EVENT_NAME = "PlayStartPveS2C";
    return PlayStartPveS2C;
}());
exports.PlayStartPveS2C = PlayStartPveS2C;
var PlayActiveBuffS2C = /** @class */ (function () {
    function PlayActiveBuffS2C() {
    }
    PlayActiveBuffS2C.decode = function (byteArray) {
        var obj = new PlayActiveBuffS2C();
        obj.buffId = byteArray.readUnsignedByte();
        obj.effectSide = byteArray.readUnsignedByte();
        obj.effected = byteArray.readUnsignedByte();
        return obj;
    };
    PlayActiveBuffS2C.EVENT_NAME = "PlayActiveBuffS2C";
    return PlayActiveBuffS2C;
}());
exports.PlayActiveBuffS2C = PlayActiveBuffS2C;
var PlayStolenAnimalS2C = /** @class */ (function () {
    function PlayStolenAnimalS2C() {
    }
    PlayStolenAnimalS2C.decode = function (byteArray) {
        var obj = new PlayStolenAnimalS2C();
        obj.stealCount = byteArray.readUnsignedInt();
        obj.animalSide = byteArray.readUnsignedByte();
        return obj;
    };
    PlayStolenAnimalS2C.EVENT_NAME = "PlayStolenAnimalS2C";
    return PlayStolenAnimalS2C;
}());
exports.PlayStolenAnimalS2C = PlayStolenAnimalS2C;
var PlayBoardStatusS2C = /** @class */ (function () {
    function PlayBoardStatusS2C() {
    }
    PlayBoardStatusS2C.decode = function (byteArray) {
        var obj = new PlayBoardStatusS2C();
        obj.animalNum = byteArray.readUnsignedByte();
        obj.side = byteArray.readUnsignedByte();
        return obj;
    };
    PlayBoardStatusS2C.EVENT_NAME = "PlayBoardStatusS2C";
    return PlayBoardStatusS2C;
}());
exports.PlayBoardStatusS2C = PlayBoardStatusS2C;

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
        //# sourceMappingURL=ProtoSectionPlay.js.map
        