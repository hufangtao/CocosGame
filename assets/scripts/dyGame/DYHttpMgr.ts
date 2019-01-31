import DYUtils from './DYUtils';

export enum DYUpdateEvent{
    EVENT_NO_UPDATE    = "0",
    EVENT_QUIET_UPDATE = "1", 
    EVENT_TIP_UPDATE   = "2",
    EVENT_FORCE_UPDATE = "3",
};

var S_HOTFIX_URL    = "http://entrance1.xxxy.dayukeji.com:10002/Hotfix/hotfix"; 

export default class DYHttpHelper {

    static checkUpdateInfo(cb : Function) {
        var url = S_HOTFIX_URL + "/checkupdate";
        var t = cc.js.createMap();
        t.gameId = DYUtils.gameId();
        t.gameVer = DYUtils.gameVer();
        t.gameOrigVer = DYUtils.gameOrigVer();
        t.channel = DYUtils.channel();
        t.plat = DYUtils.platform();
        t.mode = DYUtils.gameMode();

        this.requestCommon(function(err, resp) {
            if (cb) {
                cb(err, resp);
            }
        }, t, url, "GET");
    }

   
    // /** Common requestor.
    //  *
    //  * @param {function} cb "callback"
    //  * @param {table} params ""
    //  * @param {String} url "base url"
    //  * @param {String} method "GET or POST"
    //  * @return {null}
    //  */
    static requestCommon(cb: Function, params: any, url: string, method: string) {
        var xhr = cc.loader.getXMLHttpRequest();
        // this.streamXHREventsToLabel(xhr, this.xhr, this.xhrResp, "GET");

        // xhr.open("GET", "https://httpbin.org/get?show_env=1", true);
        // if (cc.sys.isNative) {
        //     xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
        // }

        let xhrcb = cb;
        let isAborted = false;

        xhr.ontimeout = function() {
            isAborted = true;
            xhr.abort();
            if (xhrcb) {
                xhrcb(-1, "ontimeout;" + url);
                xhrcb = null;
            }
        };
        xhr.timeout = 15000;

        xhr.onreadystatechange = function() {
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
                            DYUtils.DDLOG(response);
                            resp = JSON.parse(response);
                        } catch (e) {
                            resp = {};
                        }

                        // if (resp.errorCode == ERROR_TOKEN_EXPIRED) {
                        //     HYCommon.alert(dy.i18n.t("S_8"), resp.errorMsg, dy.i18n.t("S_34"), function() {
                        //         DYUtils.tryQuit(true);
                        //     });
                        // } else {
                            xhrcb(null, resp);
                        // }
                    } else {
                        xhrcb(xhr.status || -1, "on_" + xhr.status + ";" + url);
                    }

                    xhrcb = null;
                }
            }
            // else if(xhr.readyState == 1){
            //     xhr.setRequestHeader("Access-Control-Allow-Origin", "http://entrance1.xxxy.dayukeji.com"); 
            // }
        };

        xhr.onerror = function() {
            if (xhrcb) {
                xhrcb(-2, "onerror;" + url);
                xhrcb = null;
            }
        };

        params = params || {};
        params.gameId = params.gameId || DYUtils.gameId();
        params.gameVer = params.gameVer || DYUtils.gameVer();
        params.gameMode = params.gameMode || DYUtils.gameMode();
        params.plat = params.plat || DYUtils.platform();
        params.channel = params.channel || DYUtils.channel();

        var strParam = "";
        for (var key in params) {
            if (strParam.length > 0) {
                strParam = strParam + "&";
            }
            strParam = strParam + DYUtils.format("{0}={1}", key, params[key]);
        }

        if (cc.sys.isNative) {
            if ("win32" != DYUtils.platform()) {
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
                url = encodeURI(DYUtils.format("{0}?{1}&{2}={3}", url, strParam, "ts", DYUtils.currentTick()));
            }
            // DDLOG("GET urlApi : {0}", url);

            xhr.open("GET", url, true);
            xhr.send();
        } else {
            // DDLOG("POST urlApi : {0}", url);

            xhr.open("POST", url, true);
            strParam = encodeURI(strParam);
            xhr.send(strParam);
        }
    }
};