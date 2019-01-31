"use strict";
cc._RF.push(module, '0e61b4u1NJCkrLkQGluKSWR', 'ProtoSectionChat');
// scripts/app/common/net/proto/mods/ProtoSectionChat.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ChatCommonLanguageC2S = /** @class */ (function () {
    function ChatCommonLanguageC2S() {
        this.MSG_ID = 3585;
    }
    ChatCommonLanguageC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.id);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return ChatCommonLanguageC2S;
}());
exports.ChatCommonLanguageC2S = ChatCommonLanguageC2S;
var ChatFaceC2S = /** @class */ (function () {
    function ChatFaceC2S() {
        this.MSG_ID = 3586;
    }
    ChatFaceC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.content);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return ChatFaceC2S;
}());
exports.ChatFaceC2S = ChatFaceC2S;
var ChatTextC2S = /** @class */ (function () {
    function ChatTextC2S() {
        this.MSG_ID = 3587;
    }
    ChatTextC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.content);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return ChatTextC2S;
}());
exports.ChatTextC2S = ChatTextC2S;
var ChatVoiceC2S = /** @class */ (function () {
    function ChatVoiceC2S() {
        this.MSG_ID = 3588;
    }
    ChatVoiceC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUTF(this.content);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return ChatVoiceC2S;
}());
exports.ChatVoiceC2S = ChatVoiceC2S;
var ChatCommonLanguageS2C = /** @class */ (function () {
    function ChatCommonLanguageS2C() {
    }
    ChatCommonLanguageS2C.decode = function (byteArray) {
        var obj = new ChatCommonLanguageS2C();
        obj.playerId = byteArray.readDouble();
        obj.id = byteArray.readUnsignedInt();
        return obj;
    };
    ChatCommonLanguageS2C.EVENT_NAME = "ChatCommonLanguageS2C";
    return ChatCommonLanguageS2C;
}());
exports.ChatCommonLanguageS2C = ChatCommonLanguageS2C;
var ChatFaceS2C = /** @class */ (function () {
    function ChatFaceS2C() {
    }
    ChatFaceS2C.decode = function (byteArray) {
        var obj = new ChatFaceS2C();
        obj.playerId = byteArray.readDouble();
        obj.content = byteArray.readUTF();
        return obj;
    };
    ChatFaceS2C.EVENT_NAME = "ChatFaceS2C";
    return ChatFaceS2C;
}());
exports.ChatFaceS2C = ChatFaceS2C;
var ChatTextS2C = /** @class */ (function () {
    function ChatTextS2C() {
    }
    ChatTextS2C.decode = function (byteArray) {
        var obj = new ChatTextS2C();
        obj.playerId = byteArray.readDouble();
        obj.content = byteArray.readUTF();
        return obj;
    };
    ChatTextS2C.EVENT_NAME = "ChatTextS2C";
    return ChatTextS2C;
}());
exports.ChatTextS2C = ChatTextS2C;
var ChatVoiceS2C = /** @class */ (function () {
    function ChatVoiceS2C() {
    }
    ChatVoiceS2C.decode = function (byteArray) {
        var obj = new ChatVoiceS2C();
        obj.playerId = byteArray.readDouble();
        obj.content = byteArray.readUTF();
        return obj;
    };
    ChatVoiceS2C.EVENT_NAME = "ChatVoiceS2C";
    return ChatVoiceS2C;
}());
exports.ChatVoiceS2C = ChatVoiceS2C;
var ChatNoticeS2C = /** @class */ (function () {
    function ChatNoticeS2C() {
    }
    ChatNoticeS2C.decode = function (byteArray) {
        var obj = new ChatNoticeS2C();
        obj.content = byteArray.readUTF();
        return obj;
    };
    ChatNoticeS2C.EVENT_NAME = "ChatNoticeS2C";
    return ChatNoticeS2C;
}());
exports.ChatNoticeS2C = ChatNoticeS2C;

cc._RF.pop();