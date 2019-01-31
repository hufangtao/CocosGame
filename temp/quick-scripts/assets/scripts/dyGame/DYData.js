(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/dyGame/DYData.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd294dT8AypLK490bxIEjd6+', 'DYData', __filename);
// scripts/dyGame/DYData.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYUtils_1 = require("./DYUtils");
var DYData = /** @class */ (function () {
    function DYData() {
    }
    DYData.getCache = function (key, def, noSign) {
        if (noSign === void 0) { noSign = false; }
        return DYDataHelper.theInstance.getCache(key, def, noSign);
    };
    DYData.setCache = function (key, val) {
        DYDataHelper.theInstance.setCache(key, val);
    };
    DYData.clearCache = function (key) {
        DYDataHelper.theInstance.clearCache(key);
    };
    DYData.getStat = function (key, def) {
        return DYDataHelper.theInstance.getStat(key, def);
    };
    DYData.setStat = function (key, val) {
        DYDataHelper.theInstance.setStat(key, val);
    };
    DYData.clearStat = function (key) {
        DYDataHelper.theInstance.clearStat(key);
    };
    return DYData;
}());
exports.default = DYData;
var DYDataHelper = /** @class */ (function () {
    function DYDataHelper() {
    }
    Object.defineProperty(DYDataHelper, "theInstance", {
        get: function () {
            if (!DYDataHelper.mInstance) {
                DYDataHelper.mInstance = new DYDataHelper();
            }
            return DYDataHelper.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DYDataHelper.prototype.getCache = function (key, def, noSign) {
        var self = this;
        var tVal = self.mCacheData[key];
        if (!tVal) {
            return def;
        }
        if (!noSign) {
            return tVal;
        }
        var tSignVal = self.mCacheData[key + "_sign"];
        if (DYUtils_1.default.genSign(key.toString() + tVal.toString()) != tSignVal) {
            return def;
        }
        return tVal;
    };
    DYDataHelper.prototype.setCache = function (key, val) {
        var self = this;
        self.mCacheData[key] = val;
        self.mCacheData[key + "_sign"] = DYUtils_1.default.genSign(key.toString() + val.toString());
    };
    DYDataHelper.prototype.clearCache = function (key) {
        var self = this;
        delete self.mCacheData[key];
        delete self.mCacheData[key + "_sign"];
    };
    DYDataHelper.prototype.getStat = function (key, def) {
        var ls = cc.sys.localStorage;
        var tVal = ls.get(key);
        if (!tVal) {
            return def;
        }
        var tSignVal = ls.getItem(key + "_sign");
        if (DYUtils_1.default.genSign(key.toString() + tVal.toString()) != tSignVal) {
            return def;
        }
        return tVal;
    };
    DYDataHelper.prototype.setStat = function (key, val) {
        var ls = cc.sys.localStorage;
        ls.setItem(key, val);
        ls.setItem(key + "_sign", DYUtils_1.default.genSign(key.toString() + val.toString()));
    };
    DYDataHelper.prototype.clearStat = function (key) {
        var ls = cc.sys.localStorage;
        ls.removeItem(key);
    };
    return DYDataHelper;
}());

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
        //# sourceMappingURL=DYData.js.map
        