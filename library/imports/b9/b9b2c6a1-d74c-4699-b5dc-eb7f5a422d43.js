"use strict";
cc._RF.push(module, 'b9b2cah10xGmbXc639aQi1D', 'DYLoginMgr');
// scripts/dyGame/DYLoginMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYUtils_1 = require("./DYUtils");
var DYLoginEvent;
(function (DYLoginEvent) {
    DYLoginEvent["EVENT_INIT_SUCC"] = "EVENT_INIT_SUCC";
    DYLoginEvent["EVENT_INIT_FAIL"] = "EVENT_INIT_FAIL";
    DYLoginEvent["EVENT_LOGIN_SUCC"] = "EVENT_LOGIN_SUCC";
    DYLoginEvent["EVENT_LOGIN_FAIL"] = "EVENT_LOGIN_FAIL";
    DYLoginEvent["EVENT_LOGOUT_SUCC"] = "EVENT_LOGOUT_SUCC";
    DYLoginEvent["EVENT_LOGOUT_FAIL"] = "EVENT_LOGOUT_FAIL";
})(DYLoginEvent = exports.DYLoginEvent || (exports.DYLoginEvent = {}));
var DYLoginMgr = /** @class */ (function () {
    function DYLoginMgr() {
    }
    DYLoginMgr.init = function (param, listener) {
        var self = this;
        var param = param || {};
        var tFuncListener = function (strEvent) {
            // DDLOG("tFuncListener in DYLoginMgr.init: {0}", strEvent);
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
                jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "init:withListener:", strParam, nListener.toString());
            }
            else {
                // 其它版本
                DYUtils_1.default.scheduleOnce(function () {
                    var et = cc.js.createMap();
                    et.event = DYLoginEvent.EVENT_INIT_SUCC;
                    et.param = JSON.stringify({});
                    DYUtils_1.default.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser) {
            // 浏览器版本
        }
    };
    // 登录
    DYLoginMgr.login = function (param, listener) {
        var param = param || {};
        var tFuncListener = function (strEvent) {
            // DDLOG("tFuncListener in DYLoginMgr.login: {0}", strEvent);
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
                jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "login", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "login:withListener:", strParam, nListener.toString());
            }
            else {
                DYUtils_1.default.scheduleOnce(function () {
                    var et = cc.js.createMap();
                    et.event = DYLoginEvent.EVENT_LOGIN_SUCC;
                    et.param = JSON.stringify({
                        id: "",
                        token: "",
                        name: "",
                        param: ""
                    });
                    DYUtils_1.default.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser) {
            // 浏览器版本
        }
    };
    DYLoginMgr.isGuest = function () {
        return (DYUtils_1.default.getParamExt("K_IS_GUEST") == "TRUE");
    };
    DYLoginMgr.regLogout = function (param, listener) {
        var param = param || {};
        var tFuncListener = function (strEvent) {
            // DDLOG("tFuncListener in DYLoginMgr.regLogout: {0}", strEvent);
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
                jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "regLogout", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "regLogout:withListener:", strParam, nListener.toString());
            }
        }
        else if (cc.sys.isBrowser) {
        }
    };
    DYLoginMgr.logout = function (param) {
        var param = param || {};
        var strParam = JSON.stringify(param);
        if (cc.sys.isNative) {
            // 客户端版本
            if ("android" == DYUtils_1.default.platform()) {
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "logout", "(Ljava/lang/String;I)V", strParam, 0);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "logout:withListener:", strParam, "0");
            }
        }
        else if (cc.sys.isBrowser) {
        }
    };
    return DYLoginMgr;
}());
exports.DYLoginMgr = DYLoginMgr;

cc._RF.pop();