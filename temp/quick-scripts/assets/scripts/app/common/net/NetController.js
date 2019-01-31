(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/NetController.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0bdfbrU9rBJsLt+PVaDqda+', 'NetController', __filename);
// scripts/app/common/net/NetController.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SocketDefine_1 = require("./socket/SocketDefine");
var NetByteArray_1 = require("./NetByteArray");
var ProtoReflect = require("./proto/ProtoReflect");
var ProtoCrypto = require("./proto/ProtoCrypto");
var GameWebSocket_1 = require("./socket/GameWebSocket");
var ProtoDispatcher_1 = require("./proto/ProtoDispatcher");
var GamePersist_1 = require("../persist/GamePersist");
var AccManager_1 = require("../../component/page/login/AccManager");
var Misc = require("../Misc");
var RuntimeManager_1 = require("../runtime/RuntimeManager");
var Defines_1 = require("../Defines");
var NetController = /** @class */ (function () {
    function NetController() {
        this.isLoadingPreload = false;
        this.connectFailedTimes = 0;
        this.connectedSuccess = false;
        this.coreNode = new cc.Node("node-netcontroller");
        GamePersist_1.default.RootNodeNet.addChild(this.coreNode);
        this.protoBuffer = new NetByteArray_1.ByteArray();
        this.socket = new GameWebSocket_1.default();
        this.coreNode.addChild(this.socket.node);
        this.socket.type = GameWebSocket_1.default.TYPE_BINARY;
        this.socket.on(SocketDefine_1.SOCKET_DATA, this.onSocketData, this);
        this.socket.on(SocketDefine_1.SOCKET_CONNECT, this.onSocketOpen, this);
        this.socket.on(SocketDefine_1.SOCKET_CLOSE, this.onSocketClose, this);
        this.socket.on(SocketDefine_1.SOCKET_IO_ERROR, this.onSocketError, this);
    }
    Object.defineProperty(NetController, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new NetController();
            }
            return NetController.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NetController.prototype, "Connected", {
        get: function () {
            return this.socket.connected;
        },
        enumerable: true,
        configurable: true
    });
    NetController.prototype.emit = function (message, detail) {
        this.node.emit(message, detail);
    };
    NetController.prototype.on = function (type, callback, target, useCapture) {
        this.coreNode.on(type, callback, target, useCapture);
    };
    NetController.prototype.off = function (type, callback, target, useCapture) {
        this.coreNode.off(type, callback, target, useCapture);
    };
    Object.defineProperty(NetController.prototype, "node", {
        get: function () {
            return this.coreNode;
        },
        enumerable: true,
        configurable: true
    });
    NetController.prototype.reConnect = function (host, port, path, isSecurity) {
        this.protoBuffer = null;
        this.socket.node.destroy();
        this.socket = null;
        this.protoBuffer = new NetByteArray_1.ByteArray();
        this.socket = new GameWebSocket_1.default();
        this.coreNode.addChild(this.socket.node);
        this.socket.type = GameWebSocket_1.default.TYPE_BINARY;
        this.socket.on(SocketDefine_1.SOCKET_DATA, this.onSocketData, this);
        this.socket.on(SocketDefine_1.SOCKET_CONNECT, this.onSocketOpen, this);
        this.socket.on(SocketDefine_1.SOCKET_CLOSE, this.onSocketClose, this);
        this.socket.on(SocketDefine_1.SOCKET_IO_ERROR, this.onSocketError, this);
        this.connect(host, port, path, isSecurity);
    };
    // 连接服务器 可以同时制定paht和是否使用安全套接字
    NetController.prototype.connect = function (host, port, path, isSecurity) {
        this.host = host;
        this.port = port;
        this.path = path;
        this.isSecurity = isSecurity;
        this.connectedSuccess = false;
        this.doConnect();
    };
    // 发送c2s协议
    NetController.prototype.send = function (msg) {
        this.socket.writeBytes(msg.encode());
    };
    NetController.prototype.onSocketOpen = function () {
        this.connectedSuccess = true;
        this.connectFailedTimes = 0;
        this.socket.on(SocketDefine_1.SOCKET_CLOSE, this.onSocketClose, this);
        var event = new cc.Event.EventCustom(SocketDefine_1.SOCKET_CONNECT, false);
        this.coreNode.emit(SocketDefine_1.SOCKET_CONNECT, event);
    };
    NetController.prototype.onSocketClose = function () {
        if (!this.connectedSuccess) {
            this.connectFailedTimes++;
            if (this.connectFailedTimes > 5) {
                Misc.goToPreload();
                this.isLoadingPreload = true;
            }
            else {
                if (!this.host) {
                    Misc.goToPreload();
                    return;
                }
                this.doConnect();
            }
            return;
        }
        // 在后台的时候不进行处理
        if (RuntimeManager_1.default.INSTANCE.IsBackground) {
            return;
        }
        // 当前已经在进行重加载中
        if (this.isLoadingPreload) {
            return;
        }
        var rootUI = GamePersist_1.default.INSTANCE.RootUI;
        if (!rootUI) {
            Misc.goToPreload();
            this.isLoadingPreload = true;
            return;
        }
        // 当前在大厅界面
        if (rootUI.uiName() === "HomeUI") {
            // 如果已经尝试过重新登录 则直接从头开始
            if (AccManager_1.default.INSTANCE.RetryTimes > 0) {
                this.isLoadingPreload = true;
                Misc.goToPreload();
                return;
            }
            AccManager_1.default.INSTANCE.reConnectServer();
            return;
        }
        // 当前在房间比赛
        if (rootUI.uiName() === "PlayUI") {
            Misc.goToHome(Defines_1.OpenHomeFrom.UI_PLAY);
            return;
        }
        // 当前在登陆界面
        if (rootUI.uiName() === "LoginUI") {
            return;
        }
        Misc.goToPreload();
        this.isLoadingPreload = true;
    };
    NetController.prototype.onSocketError = function () {
    };
    NetController.prototype.onSocketData = function () {
        // TODO 应该让内存循环使用
        // 放置占用一块过大的内存 如果当前始终缓存数据都已经处理 并且超过阈值就先释放
        var bufferLen = this.protoBuffer.length;
        if (bufferLen === this.protoBuffer.position && bufferLen >= 1024) {
            this.protoBuffer.clear();
        }
        this.socket.readBytes(this.protoBuffer, this.protoBuffer.length);
        this.parseProto();
    };
    NetController.prototype.doConnect = function () {
        var schema = this.isSecurity ? "wss://" : "ws://";
        var serverUrl = schema + this.host + ":" + this.port;
        if (this.path) {
            serverUrl += ("/" + this.path);
        }
        this.socket.connectByUrl(serverUrl);
    };
    // 解析协议
    NetController.prototype.parseProto = function () {
        while (this.protoBuffer.length !== this.protoBuffer.position) {
            var protoMsgLen = this.protoBuffer.readUnsignedShort();
            if (protoMsgLen > this.protoBuffer.bytesAvailable) {
                // 数据包尚未接收完整 把位置回退
                this.protoBuffer.position = this.protoBuffer.position - 2;
                break;
            }
            // 根据长度将协议数据包读入
            var bytes = new NetByteArray_1.ByteArray();
            this.protoBuffer.readBytes(bytes, 0, protoMsgLen);
            // 读取index, 如果非0表示消息已经加密
            var index = bytes.readUnsignedByte();
            if (index) {
                bytes = ProtoCrypto.decode(index, bytes);
            }
            // 确定协议Id和解析类 进行协议的解析
            var protoMsgSecId = bytes.readUnsignedByte();
            var protoMsgSubId = bytes.readUnsignedByte();
            var protoMsgId = (protoMsgSecId << 8) + protoMsgSubId;
            var protoClazz = ProtoReflect.ProtoMsgMap[protoMsgId];
            if (protoClazz && protoClazz.decode && protoClazz.EVENT_NAME) {
                var protoMsg = protoClazz.decode(bytes);
                protoMsg.MSG_ID = protoMsgId;
                var protoMsgEventName = protoClazz.EVENT_NAME;
                var protoMsgDispatcher = ProtoDispatcher_1.DispatcherList[protoMsgSecId];
                if (protoMsgEventName !== "AccServertimeS2C") {
                    // //console.log("协议返回--%s", protoMsgEventName);
                }
                // console.log(protoMsg);
                protoMsgDispatcher.emit(protoMsgEventName, protoMsg);
            }
            else {
                // console.error("unknonw msg id: ", protoMsgId);
            }
        }
    };
    return NetController;
}());
exports.default = NetController;

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
        //# sourceMappingURL=NetController.js.map
        