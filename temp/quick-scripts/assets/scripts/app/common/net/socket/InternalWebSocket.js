(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/socket/InternalWebSocket.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ce06bG2GnpB8YdTpTlMNI0s', 'InternalWebSocket', __filename);
// scripts/app/common/net/socket/InternalWebSocket.ts

Object.defineProperty(exports, "__esModule", { value: true });
var InternalWebScoket = /** @class */ (function () {
    function InternalWebScoket() {
        this.host = "";
        this.port = 0;
    }
    InternalWebScoket.prototype.addCallbacks = function (onConnect, onClose, onSocketData, onError, thisObj) {
        this.onConnect = onConnect;
        this.onClose = onClose;
        this.onSocketData = onSocketData;
        this.onError = onError;
        this.thisObject = thisObj;
    };
    InternalWebScoket.prototype.connect = function (host, port) {
        this.port = port;
        this.host = host;
        var socketServerUrl = "ws://" + this.host + ":" + this.port;
        this.socket = new WebSocket(socketServerUrl);
        this.socket.binaryType = "arraybuffer";
        this._bindEvent();
    };
    InternalWebScoket.prototype.connectByUrl = function (url) {
        this.socket = new WebSocket(url);
        this.socket.binaryType = "arraybuffer";
        this._bindEvent();
    };
    InternalWebScoket.prototype.send = function (message) {
        this.socket.send(message);
    };
    InternalWebScoket.prototype.close = function () {
        this.socket.close();
    };
    InternalWebScoket.prototype._bindEvent = function () {
        var that = this;
        var socket = this.socket;
        socket.onopen = function () {
            if (that.onConnect) {
                that.onConnect.call(that.thisObject);
            }
        };
        socket.onclose = function () {
            if (that.onClose) {
                that.onClose.call(that.thisObject);
            }
        };
        socket.onerror = function () {
            if (that.onError) {
                that.onError.call(that.thisObject);
            }
        };
        socket.onmessage = function (e) {
            if (that.onSocketData) {
                that.onSocketData.call(that.thisObject, e.data);
            }
        };
    };
    return InternalWebScoket;
}());
exports.default = InternalWebScoket;

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
        //# sourceMappingURL=InternalWebSocket.js.map
        