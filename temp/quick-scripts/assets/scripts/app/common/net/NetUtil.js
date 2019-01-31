(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/NetUtil.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e97cbrOI+xGl57y9BdAI/Cl', 'NetUtil', __filename);
// scripts/app/common/net/NetUtil.ts

Object.defineProperty(exports, "__esModule", { value: true });
var NetController_1 = require("./NetController");
var NetUtil = /** @class */ (function () {
    function NetUtil() {
    }
    NetUtil.SendMsg = function (msg) {
        // console.log(msg);
        NetController_1.default.INSTANCE.send(msg);
    };
    return NetUtil;
}());
exports.default = NetUtil;

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
        //# sourceMappingURL=NetUtil.js.map
        