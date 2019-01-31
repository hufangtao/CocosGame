(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/proto/mods/ProtoSectionDebug.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '586acwFHlRNh6b0B3Q9l2DZ', 'ProtoSectionDebug', __filename);
// scripts/app/common/net/proto/mods/ProtoSectionDebug.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
var DebugErrorS2C = /** @class */ (function () {
    function DebugErrorS2C() {
    }
    DebugErrorS2C.decode = function (byteArray) {
        var obj = new DebugErrorS2C();
        obj.msgid = byteArray.readUnsignedShort();
        obj.code = byteArray.readUnsignedShort();
        return obj;
    };
    DebugErrorS2C.EVENT_NAME = "DebugErrorS2C";
    return DebugErrorS2C;
}());
exports.DebugErrorS2C = DebugErrorS2C;

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
        //# sourceMappingURL=ProtoSectionDebug.js.map
        