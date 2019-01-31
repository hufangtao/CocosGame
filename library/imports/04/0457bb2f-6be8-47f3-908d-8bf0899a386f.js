"use strict";
cc._RF.push(module, '0457bsva+hH85CNi/CJmjhv', 'DYADMgr');
// scripts/dyGame/DYADMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYUtils_1 = require("./DYUtils");
var DYADType;
(function (DYADType) {
    DYADType["BANNER"] = "BANNER";
    DYADType["INTERSTITIAL"] = "INTERSTITIAL";
    DYADType["VIDEO"] = "VIDEO";
    DYADType["INCENTIVE"] = "INCENTIVE";
    DYADType["WALL"] = "WALL";
})(DYADType = exports.DYADType || (exports.DYADType = {}));
var DYADEvent;
(function (DYADEvent) {
    DYADEvent["EVENT_INIT_SUCC"] = "EVENT_INIT_SUCC";
    DYADEvent["EVENT_INIT_FAIL"] = "EVENT_INIT_FAIL";
    DYADEvent["EVENT_CLOSE"] = "EVENT_CLOSE";
    DYADEvent["EVENT_REWARD"] = "EVENT_REWARD";
})(DYADEvent = exports.DYADEvent || (exports.DYADEvent = {}));
var DYADMgr = /** @class */ (function () {
    function DYADMgr() {
    }
    DYADMgr.init = function (param, listener) {
        var param = param || {};
        var tFuncListener = function (strEvent) {
            // DDLOG("tFuncListener in DYIAPMgr.init: {0}", strEvent);
            var et = JSON.parse(strEvent);
            et.param = JSON.parse(et.param);
            // et = {event:dy.login.EVENT_INIT_OK, param:{}}
            if (listener) {
                listener(et);
            }
        };
        var strParam = JSON.stringify(param);
        var nListener = DYUtils_1.default.pushInvoke(tFuncListener);
        if (cc.sys.isNative) {
            // 客户端版本
            if ("android" == DYUtils_1.default.platform()) {
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYADMgr_iOS", "init:withListener:", strParam, nListener.toString());
            }
        }
    };
    DYADMgr.canShow = function (adType) {
        var tRet = "";
        if (cc.sys.isNative) {
            // 客户端版本
            if ("android" == DYUtils_1.default.platform()) {
                // 安卓
                tRet = jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "canShow", "(Ljava/lang/String;)Ljava/lang/String;", adType);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                tRet = jsb.reflection.callStaticMethod("DYADMgr_iOS", "canShow:", adType);
            }
        }
        return (tRet == "TRUE");
    };
    DYADMgr.show = function (adType) {
        if (cc.sys.isNative) {
            // 客户端版本
            if ("android" == DYUtils_1.default.platform()) {
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "show", "(Ljava/lang/String;)V", adType);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYADMgr_iOS", "show:", adType);
            }
        }
    };
    DYADMgr.hide = function (adType) {
        if (cc.sys.isNative) {
            // 客户端版本
            if ("android" == DYUtils_1.default.platform()) {
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "hide", "(Ljava/lang/String;)V", adType);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYADMgr_iOS", "hide:", adType);
            }
        }
    };
    return DYADMgr;
}());
exports.default = DYADMgr;
;

cc._RF.pop();