"use strict";
cc._RF.push(module, '0e1bf19AvFMUp1aeGKLIcUN', 'DYShareMgr');
// scripts/dyGame/DYShareMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYUtils_1 = require("./DYUtils");
var DYShareEvent;
(function (DYShareEvent) {
    DYShareEvent["EVENT_INIT_SUCC"] = "EVENT_INIT_SUCC";
    DYShareEvent["EVENT_INIT_FAIL"] = "EVENT_INIT_FAIL";
    DYShareEvent["EVENT_SHARE_SUCC"] = "EVENT_SHARE_SUCC";
    DYShareEvent["EVENT_SHARE_FAIL"] = "EVENT_SHARE_FAIL";
})(DYShareEvent = exports.DYShareEvent || (exports.DYShareEvent = {}));
var DYShareMgr = /** @class */ (function () {
    function DYShareMgr() {
    }
    DYShareMgr.init = function (param, listener) {
        var param = param || {};
        var tFuncListener = function (strEvent) {
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
            if (cc.sys.os == cc.sys.OS_ANDROID) {
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYShareMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else {
                // 其它版本
                DYUtils_1.default.scheduleOnce(function () {
                    var et = cc.js.createMap();
                    et.event = DYShareEvent.EVENT_INIT_SUCC;
                    et.param = JSON.stringify({});
                    DYUtils_1.default.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser) {
        }
    };
    DYShareMgr.share = function (param, listener) {
        var tContent = "";
        if ("android" == DYUtils_1.default.platform()) {
            tContent = "https://play.google.com/store/apps/developer?id=doozii";
        }
        else if ("ios" == DYUtils_1.default.platform()) {
            tContent = "https://itunes.apple.com/us/developer/ye-tian/id1127699301";
        }
        var param = param || {
            method: "default",
            title: "King Marbles",
            content: tContent,
            imgpath: cc.url.raw("resources/Texture/dzads.jpg"),
        };
        var tFuncListener = function (strEvent) {
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
            if ("android" == DYUtils_1.default.platform()) {
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYShareMgr", "share", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils_1.default.platform()) {
                jsb.reflection.callStaticMethod("DYShareMgr_iOS", "share:withListener:", strParam, nListener.toString());
            }
        }
        else if (cc.sys.isBrowser) {
            // 暂未实现，模拟失败
            DYUtils_1.default.scheduleOnce(function () {
                var et = cc.js.createMap();
                et.event = dy.login.EVENT_SHARE_FAIL;
                et.param = JSON.stringify({});
                DYUtils_1.default.popInvoke(nListener)(JSON.stringify(et));
            }, 0.1);
        }
    };
    return DYShareMgr;
}());
exports.default = DYShareMgr;

cc._RF.pop();