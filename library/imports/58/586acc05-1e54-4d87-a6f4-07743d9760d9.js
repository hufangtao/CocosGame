"use strict";
cc._RF.push(module, '586acwFHlRNh6b0B3Q9l2DZ', 'ProtoSectionDebug');
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