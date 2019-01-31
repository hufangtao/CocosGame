(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/login/AccNetHandler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '6e871Z0CjJKUoKkYqNqg+z0', 'AccNetHandler', __filename);
// scripts/app/component/page/login/AccNetHandler.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoDispatcher_1 = require("../../../common/net/proto/ProtoDispatcher");
var ProtoSectionAcc_1 = require("../../../common/net/proto/mods/ProtoSectionAcc");
var AccManager_1 = require("./AccManager");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var ProtoReflect_1 = require("../../../common/net/proto/ProtoReflect");
var ProtoSectionDebug_1 = require("../../../common/net/proto/mods/ProtoSectionDebug");
var AccNetHandler = /** @class */ (function () {
    function AccNetHandler() {
        ProtoDispatcher_1.AccDispatcher.on(ProtoSectionAcc_1.AccServertimeS2C.EVENT_NAME, this.onServerTime, this);
        ProtoDispatcher_1.AccDispatcher.on(ProtoSectionAcc_1.AccLoginS2C.EVENT_NAME, this.onLoginS2C, this);
        ProtoDispatcher_1.AccDispatcher.on(ProtoSectionAcc_1.AccCreateS2C.EVENT_NAME, this.onCreateS2C, this);
        ProtoDispatcher_1.AccDispatcher.on(ProtoSectionAcc_1.AccEnterS2C.EVENT_NAME, this.onEnterS2C, this);
        ProtoDispatcher_1.AccDispatcher.on(ProtoSectionAcc_1.AccReloginS2C.EVENT_NAME, this.onReLoginS2C, this);
        ProtoDispatcher_1.AccDispatcher.on(ProtoSectionAcc_1.AccMaintainS2C.EVENT_NAME, this.onMaintainS2C, this);
        // GamePersist.INSTANCE.OnProtoError(ProtoSection.acc, this.onProtoError, this);
        ProtoDispatcher_1.DebugDispatcher.on(ProtoSectionDebug_1.DebugErrorS2C.EVENT_NAME, this.onProtoError, this);
    }
    // 处理协议统一的错误码返回
    AccNetHandler.prototype.onProtoError = function (message) {
        var protoError = message;
        var protoErrCode = protoError.code;
        GamePersist_1.default.INSTANCE.Toast(ProtoReflect_1.ProtoErrorCode[protoErrCode]);
    };
    // 收到服务器时间
    AccNetHandler.prototype.onServerTime = function (message) {
        var serverTime = message;
        // console.log("get server time:", serverTime.time);
        GamePersist_1.default.INSTANCE.ServerTime = serverTime.time;
    };
    // 收到登陆协议返回
    AccNetHandler.prototype.onLoginS2C = function (message) {
        cc.log(message);
        var loginS2C = message;
        AccManager_1.default.INSTANCE.onReceiveLoginS2C(loginS2C);
    };
    AccNetHandler.prototype.onReLoginS2C = function (message) {
        cc.log('onReLoginS2C');
        var reloginS2C = message;
        AccManager_1.default.INSTANCE.onReceiveReLoginS2C(reloginS2C);
    };
    // 收到创建角色返回
    AccNetHandler.prototype.onCreateS2C = function (message) {
        var createS2C = message;
        AccManager_1.default.INSTANCE.onReceiveCreateS2C(createS2C);
    };
    // 收到进入游戏的结果
    AccNetHandler.prototype.onEnterS2C = function (message) {
        var enterS2C = message;
        AccManager_1.default.INSTANCE.onReceiveEnterS2C(enterS2C);
    };
    AccNetHandler.prototype.onMaintainS2C = function (message) {
        var maintianS2C = message;
        var maintainMsg = maintianS2C.desc;
        GamePersist_1.default.INSTANCE.showMaintain(maintainMsg);
    };
    return AccNetHandler;
}());
exports.default = AccNetHandler;

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
        //# sourceMappingURL=AccNetHandler.js.map
        