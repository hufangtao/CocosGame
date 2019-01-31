(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/home/DebugNetHandler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '977c73g6DZLtoP+DcEKAfPp', 'DebugNetHandler', __filename);
// scripts/app/component/page/home/DebugNetHandler.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoDispatcher_1 = require("../../../common/net/proto/ProtoDispatcher");
var ProtoSectionDebug_1 = require("../../../common/net/proto/mods/ProtoSectionDebug");
var ProtoReflect_1 = require("../../../common/net/proto/ProtoReflect");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var ccclass = cc._decorator.ccclass;
var DebugNetHandler = /** @class */ (function () {
    function DebugNetHandler() {
        this.msgErrorCallback = {};
        ProtoDispatcher_1.DebugDispatcher.on(ProtoSectionDebug_1.DebugErrorS2C.EVENT_NAME, this.onReceiveMsgError, this);
    }
    DebugNetHandler.prototype.onReceiveMsgError = function (message) {
        var debugErrorS2C = message;
        var errCode = debugErrorS2C.code;
        var msgId = debugErrorS2C.msgid;
        var clazz = ProtoReflect_1.ProtoMsgMap[msgId];
        var eventName = clazz.EVENT_NAME;
        var errMsg = ProtoReflect_1.ProtoErrorCode[errCode] || "ErrCode:" + errCode;
        var protoMsgSection = msgId >> 8;
        GamePersist_1.default.INSTANCE.EmitProtoError(protoMsgSection, eventName, errCode, errMsg);
        /*
        const debugErrorS2C: DebugErrorS2C = message;
        const errCode = debugErrorS2C.code;
        const msgId   = debugErrorS2C.msgid;
        const clazz   = ProtoMsgMap[msgId];
        const eventName: string = clazz.EVENT_NAME;
        const errMsg  = ProtoErrorCode[errCode];
        const callbackConf: any = this.msgErrorCallback[eventName];
        if (callbackConf) {
          const callbackFunc    = callbackConf.callback;
          const context = callbackConf.context;
          callbackFunc.call(context, eventName, errCode);
        }
        */
    };
    DebugNetHandler = __decorate([
        ccclass
    ], DebugNetHandler);
    return DebugNetHandler;
}());
exports.default = DebugNetHandler;

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
        //# sourceMappingURL=DebugNetHandler.js.map
        