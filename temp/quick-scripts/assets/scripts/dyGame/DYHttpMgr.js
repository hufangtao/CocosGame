(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/dyGame/DYHttpMgr.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '973d63aUFJN0K6rmhT7p+S3', 'DYHttpMgr', __filename);
// scripts/dyGame/DYHttpMgr.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYUtils_1 = require("./DYUtils");
var DYUpdateEvent;
(function (DYUpdateEvent) {
    DYUpdateEvent["EVENT_NO_UPDATE"] = "0";
    DYUpdateEvent["EVENT_QUIET_UPDATE"] = "1";
    DYUpdateEvent["EVENT_TIP_UPDATE"] = "2";
    DYUpdateEvent["EVENT_FORCE_UPDATE"] = "3";
})(DYUpdateEvent = exports.DYUpdateEvent || (exports.DYUpdateEvent = {}));
;
var S_HOTFIX_URL = "http://entrance1.xxxy.dayukeji.com:10002/Hotfix/hotfix";
var DYHttpHelper = /** @class */ (function () {
    function DYHttpHelper() {
    }
    DYHttpHelper.checkUpdateInfo = function (cb) {
        var url = S_HOTFIX_URL + "/checkupdate";
        var t = cc.js.createMap();
        t.gameId = DYUtils_1.default.gameId();
        t.gameVer = DYUtils_1.default.gameVer();
        t.gameOrigVer = DYUtils_1.default.gameOrigVer();
        t.channel = DYUtils_1.default.channel();
        t.plat = DYUtils_1.default.platform();
        t.mode = DYUtils_1.default.gameMode();
        this.requestCommon(function (err, resp) {
            if (cb) {
                cb(err, resp);
            }
        }, t, url, "GET");
    };
    // /** Common requestor.
    //  *
    //  * @param {function} cb "callback"
    //  * @param {table} params ""
    //  * @param {String} url "base url"
    //  * @param {String} method "GET or POST"
    //  * @return {null}
    //  */
    DYHttpHelper.requestCommon = function (cb, params, url, method) {
        var xhr = cc.loader.getXMLHttpRequest();
        // this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, "GET");
        // xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        // if (cc.sys.isNative) {
        //     xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        // }
        var xhrcb = cb;
        var isAborted = false;
        xhr.ontimeout = function () {
            isAborted = true;
            xhr.abort();
            if (xhrcb) {
                xhrcb(-1, "ontimeout;" + url);
                xhrcb = null;
            }
        };
        xhr.timeout = 15000;
        xhr.onreadystatechange = function () {
            if (!xhr || isAborted) {
                return;
            }
            // // DDLOG("onreadystatechange, readyState={0}, statue={1}", xhr.readyState, xhr.status);
            if (xhr.readyState == 4) { // && (xhr.status >= 200 && xhr.status < 400)) {
                var response = xhr.responseText;
                // // DDLOG(response);
                if (xhrcb) {
                    var resp = {};
                    if (xhr.status == 200) {
                        try {
                            DYUtils_1.default.DDLOG(response);
                            resp = JSON.parse(response);
                        }
                        catch (e) {
                            resp = {};
                        }
                        // if (resp.errorCode == ERROR_TOKEN_EXPIRED) {
                        //     HYCommon.alert(dy.i18n.t("S_8"), resp.errorMsg, dy.i18n.t("S_34"), function() {
                        //         DYUtils.tryQuit(true);
                        //     });
                        // } else {
                        xhrcb(null, resp);
                        // }
                    }
                    else {
                        xhrcb(xhr.status || -1, "on_" + xhr.status + ";" + url);
                    }
                    xhrcb = null;
                }
            }
            // else if(xhr.readyState == 1){
            //     xhr.setRequestHeader("Access-Control-Allow-Origin", "http://entrance1.xxxy.dayukeji.com"); 
            // }
        };
        xhr.onerror = function () {
            if (xhrcb) {
                xhrcb(-2, "onerror;" + url);
                xhrcb = null;
            }
        };
        params = params || {};
        params.gameId = params.gameId || DYUtils_1.default.gameId();
        params.gameVer = params.gameVer || DYUtils_1.default.gameVer();
        params.gameMode = params.gameMode || DYUtils_1.default.gameMode();
        params.plat = params.plat || DYUtils_1.default.platform();
        params.channel = params.channel || DYUtils_1.default.channel();
        var strParam = "";
        for (var key in params) {
            if (strParam.length > 0) {
                strParam = strParam + "&";
            }
            strParam = strParam + DYUtils_1.default.format("{0}={1}", key, params[key]);
        }
        if (cc.sys.isNative) {
            if ("win32" != DYUtils_1.default.platform()) {
                xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
            }
        }
        // else{
        //     // xhr.setRequestHeader("Access-Control-Allow-Origin", "*.dayukeji.com"); 
        //     // xhr.setRequestHeader("Access-Control-Allow-Origin: http://entrance1.xxxy.dayukeji.com");
        // }
        method = method || "GET";
        if (method == "GET") {
            if (strParam.length > 0) {
                url = encodeURI(DYUtils_1.default.format("{0}?{1}&{2}={3}", url, strParam, "ts", DYUtils_1.default.currentTick()));
            }
            // DDLOG("GET urlApi : {0}", url);
            xhr.open("GET", url, true);
            xhr.send();
        }
        else {
            // DDLOG("POST urlApi : {0}", url);
            xhr.open("POST", url, true);
            strParam = encodeURI(strParam);
            xhr.send(strParam);
        }
    };
    return DYHttpHelper;
}());
exports.default = DYHttpHelper;
;

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
        //# sourceMappingURL=DYHttpMgr.js.map
        