(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/dyGame/DYIAPMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '17f3bpCwh5Lh6KewMCRfQwW', 'DYIAPMgr', __filename);
// scripts/dyGame/DYIAPMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYUtils_1 = require("./DYUtils");
var DYIAPEvent;
(function (DYIAPEvent) {
    DYIAPEvent["EVENT_INIT_SUCC"] = "EVENT_INIT_SUCC";
    DYIAPEvent["EVENT_INIT_FAIL"] = "EVENT_INIT_FAIL";
    DYIAPEvent["EVENT_PAY_SUCC"] = "EVENT_PAY_SUCC";
    DYIAPEvent["EVENT_PAY_FAIL"] = "EVENT_PAY_FAIL";
    DYIAPEvent["EVENT_REFUND_SUCC"] = "EVENT_REFUND_SUCC";
    DYIAPEvent["EVENT_REFUND_FAIL"] = "EVENT_REFUND_FAIL";
})(DYIAPEvent = exports.DYIAPEvent || (exports.DYIAPEvent = {}));
var DYIAPMgr = /** @class */ (function () {
    function DYIAPMgr() {
    }
    DYIAPMgr.init = function (param, listener) {
        var self = this;
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
                jsb.reflection.callStaticMethod("com/dygame/common/DYIAPMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYIAPMgr_iOS", "init:withListener:", strParam, nListener.toString());
            }
            else {
                // 其它版本
                DYUtils_1.default.scheduleOnce(function () {
                    var et = cc.js.createMap();
                    et.event = DYIAPEvent.EVENT_INIT_SUCC;
                    et.param = JSON.stringify({});
                    DYUtils_1.default.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser) {
            // 浏览器版本
        }
    };
    DYIAPMgr.pay = function (param, listener) {
        var self = this;
        var param = param || {};
        var tFuncListener = function (strEvent) {
            // DDLOG("tFuncListener in DYIAPMgr.pay: {0}", strEvent);
            var et = JSON.parse(strEvent);
            et.param = JSON.parse(et.param);
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
                jsb.reflection.callStaticMethod("com/dygame/common/DYIAPMgr", "pay", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYIAPMgr_iOS", "pay:withListener:", strParam, nListener.toString());
            }
            else {
                // 其它版本
                // DDLOG("Not support on this native version, os = {0}", cc.sys.os);
                DYUtils_1.default.scheduleOnce(function () {
                    var et = cc.js.createMap();
                    et.event = DYIAPEvent.EVENT_PAY_FAIL;
                    et.param = strParam;
                    DYUtils_1.default.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser) {
        }
    };
    return DYIAPMgr;
}());
exports.default = DYIAPMgr;

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
        //# sourceMappingURL=DYIAPMgr.js.map
        