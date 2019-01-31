"use strict";
cc._RF.push(module, 'db1ba3iYjhGQ6uh23LTke3m', 'GameWebSocket');
// scripts/app/common/net/socket/GameWebSocket.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../../event/EventDispatcher");
var InternalWebSocket_1 = require("./InternalWebSocket");
var SocketDefine_1 = require("./SocketDefine");
var NetByteArray_1 = require("../NetByteArray");
var GameWebSocket = /** @class */ (function (_super) {
    __extends(GameWebSocket, _super);
    function GameWebSocket() {
        var _this = _super.call(this) || this;
        // 对于文本类型的socket数据时 写入内容暂存数据
        _this.writeMessage = "";
        // 对于文本类型的socket数据是 读取内容暂存数据
        _this.readMessage = "";
        // 是否已有字节写入
        _this.isBytesWritten = false;
        // 是否已经连接
        _this.isConnected = false;
        // 是否正在进行连接
        _this.isConnecting = false;
        // socket数据类型
        _this.socketType = GameWebSocket.TYPE_STRING;
        _this.isConnected = false;
        _this.writeMessage = "";
        _this.readMessage = "";
        _this.node = new cc.Node("dygame-websocket");
        _this.socket = new InternalWebSocket_1.default();
        _this.socket.addCallbacks(_this.onConnect, _this.onClose, _this.onSocketData, _this.onError, _this);
        return _this;
    }
    Object.defineProperty(GameWebSocket.prototype, "type", {
        get: function () {
            return this.socketType;
        },
        set: function (value) {
            this.socketType = value;
            if (value === GameWebSocket.TYPE_BINARY && !this.writeBuffer) {
                this.readBuffer = new NetByteArray_1.ByteArray();
                this.writeBuffer = new NetByteArray_1.ByteArray();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameWebSocket.prototype, "connected", {
        // socket 是否已经连接
        get: function () {
            return this.isConnected;
        },
        enumerable: true,
        configurable: true
    });
    // 指定host和port进行连接
    GameWebSocket.prototype.connect = function (host, port) {
        if (!this.isConnecting && !this.isConnected) {
            this.isConnecting = true;
            this.socket.connect(host, port);
        }
    };
    // 根据url连接服务器
    GameWebSocket.prototype.connectByUrl = function (url) {
        if (!this.isConnecting && !this.isConnected) {
            this.isConnecting = true;
            this.socket.connectByUrl(url);
        }
    };
    // 关闭socket连接
    GameWebSocket.prototype.close = function () {
        if (this.isConnected) {
            this.socket.close();
        }
    };
    // 立即往socket写入数据
    GameWebSocket.prototype.flush = function () {
        if (!this.isConnected) {
            return;
        }
        if (this.writeMessage) {
            this.socket.send(this.writeMessage);
            this.writeMessage = "";
        }
        if (this.isBytesWritten) {
            this.socket.send(this.writeBuffer.buffer);
            this.isBytesWritten = false;
            this.writeBuffer.clear();
        }
    };
    // 发送文本
    GameWebSocket.prototype.writeUTF = function (message) {
        if (!this.isConnected) {
            return;
        }
        if (this.socketType === GameWebSocket.TYPE_BINARY) {
            this.isBytesWritten = true;
            this.writeBuffer.writeUTF(message);
        }
        else {
            this.writeMessage += message;
        }
        this.flush();
    };
    // 读取文本
    GameWebSocket.prototype.readUTF = function () {
        var message;
        if (this.socketType === GameWebSocket.TYPE_BINARY) {
            this.readBuffer.position = 0;
            message = this.readBuffer.readUTF();
            this.readBuffer.clear();
        }
        else {
            message = this.readMessage;
            this.readMessage = "";
        }
        return message;
    };
    // 写入字节
    GameWebSocket.prototype.writeBytes = function (bytes, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (!this.isConnected) {
            return;
        }
        if (!this.writeBuffer) {
            DyGame.$error(1);
            return;
        }
        this.isBytesWritten = true;
        this.writeBuffer.writeBytes(bytes, offset, length);
        this.flush();
    };
    // 读取字节内容写入到目标缓存
    GameWebSocket.prototype.readBytes = function (dstBuffer, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (!this.readBuffer) {
            DyGame.$error(1);
            return;
        }
        this.readBuffer.position = 0;
        this.readBuffer.readBytes(dstBuffer, offset, length);
        this.readBuffer.clear();
    };
    // socket 连接成功时回调
    GameWebSocket.prototype.onConnect = function () {
        this.isConnected = true;
        this.isConnecting = false;
        this.emit(SocketDefine_1.SOCKET_CONNECT);
    };
    // socket 连接断开时回调
    GameWebSocket.prototype.onClose = function () {
        this.isConnected = false;
        this.emit(SocketDefine_1.SOCKET_CLOSE);
    };
    // socket 出现错误时回调
    GameWebSocket.prototype.onError = function () {
        if (this.isConnecting) {
            this.isConnecting = false;
        }
        this.emit(SocketDefine_1.SOCKET_IO_ERROR);
    };
    // socket 收到数据
    GameWebSocket.prototype.onSocketData = function (message) {
        if (typeof message === "string") {
            this.readMessage += message;
        }
        else {
            this.readBuffer._writeUint8Array(new Uint8Array(message));
        }
        this.emit(SocketDefine_1.SOCKET_DATA);
    };
    GameWebSocket.TYPE_STRING = "webSocketTypeString";
    GameWebSocket.TYPE_BINARY = "webSocketTypeBinary";
    return GameWebSocket;
}(EventDispatcher_1.default));
exports.default = GameWebSocket;

cc._RF.pop();