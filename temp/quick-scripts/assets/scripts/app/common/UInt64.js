(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/UInt64.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7d851arFfRNi5ymQDzzqxL/', 'UInt64', __filename);
// scripts/app/common/UInt64.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UInt64 = /** @class */ (function () {
    function UInt64(high, low) {
        this.low = 0;
        this.high = 0;
        this.high = high;
        this.low = low;
    }
    UInt64.prototype.Set = function (high, low) {
        this.high = high;
        this.low = low;
    };
    UInt64.prototype.SetVal = function (val) {
        this.low = val >>> 31;
        this.low = val >>> 1;
        this.high = ((val & 0xffffffff) >>> 0);
    };
    UInt64.prototype.Low = function () {
        return this.low;
    };
    UInt64.prototype.High = function () {
        return this.high;
    };
    Object.defineProperty(UInt64.prototype, "IsZero", {
        get: function () { return this.high === 0 && this.low === 0; },
        enumerable: true,
        configurable: true
    });
    UInt64.prototype.ToNumber = function () {
        return this.low * 0x100000000 + this.high;
    };
    UInt64.prototype.Equal = function (other) {
        return other.High() === this.high && other.Low() === this.low;
    };
    return UInt64;
}());
exports.default = UInt64;

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
        //# sourceMappingURL=UInt64.js.map
        