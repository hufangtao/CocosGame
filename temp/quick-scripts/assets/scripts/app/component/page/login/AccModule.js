(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/login/AccModule.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9ceb4UlwnFKyrt/yunrKY2S', 'AccModule', __filename);
// scripts/app/component/page/login/AccModule.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataAcc_1 = require("../../../module/data/mod/DataAcc");
var AccNetHandler_1 = require("./AccNetHandler");
var BaseModule_1 = require("../../../module/BaseModule");
var AccModule = /** @class */ (function (_super) {
    __extends(AccModule, _super);
    function AccModule() {
        return _super.call(this, AccModule.MODULE_NAME) || this;
    }
    AccModule.prototype.onCreated = function () {
        this.dataAcc = new DataAcc_1.default();
        this.protoHandler = new AccNetHandler_1.default();
    };
    Object.defineProperty(AccModule.prototype, "LoginData", {
        set: function (loginData) {
            this.dataAcc.accOpenId = loginData.openid;
            this.dataAcc.accPlatform = loginData.platform;
            this.dataAcc.accOpenKey = loginData.openkey;
            this.dataAcc.accPlatformParam = loginData.params;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccModule.prototype, "PlayerId", {
        get: function () {
            return this.dataAcc.playerId;
        },
        set: function (playerId) {
            this.dataAcc.playerId = playerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccModule.prototype, "ProtoHandler", {
        get: function () {
            return this.protoHandler;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccModule.prototype, "DataAcc", {
        get: function () {
            return this.dataAcc;
        },
        enumerable: true,
        configurable: true
    });
    AccModule.MODULE_NAME = "acc";
    return AccModule;
}(BaseModule_1.default));
exports.default = AccModule;

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
        //# sourceMappingURL=AccModule.js.map
        