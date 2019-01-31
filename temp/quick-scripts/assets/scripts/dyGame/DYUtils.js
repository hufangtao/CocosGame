(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/dyGame/DYUtils.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f6a70AQM5ZDvoVNtX8AIAgg', 'DYUtils', __filename);
// scripts/dyGame/DYUtils.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYCrypto_1 = require("./DYCrypto");
var Config = require("./Config");
var DYData_1 = require("./DYData");
var DYNotify_1 = require("./DYNotify");
var S_JSB_CACHE_PATH = "jsb_cache/";
var S_JSB_HOTFIX_PATH = "c98759c9a82b24c176af027949f417b0/";
var S_APP_SECRET = "apsdfAJOJ(#@&($0809283JLJOOJ";
var kGameVer = "5d4ac9f2-5658-4dca-9bb0-5f287e0d614b";
var kUniqueID = "8b40c787-95cf-4976-b29e-df8d25ce5e5d";
var S_JSB_FUNC_ID = 1000;
var S_JSB_FUNC = {};
var S_POOLS = {};
var DYUtils = /** @class */ (function () {
    function DYUtils() {
    }
    DYUtils.pushInvoke = function (cb) {
        var funcId = (++S_JSB_FUNC_ID);
        var strFuncId = DYUtils.format("{0}", funcId);
        S_JSB_FUNC[strFuncId] = cb;
        return funcId;
    };
    DYUtils.popInvoke = function (funcId, bReserve) {
        if (bReserve === void 0) { bReserve = false; }
        var strFuncId = DYUtils.format("{0}", funcId);
        var cb = S_JSB_FUNC[strFuncId];
        if (!bReserve) {
            delete S_JSB_FUNC[strFuncId];
        }
        return cb;
    };
    /**
     * @returns a number in [from, to]
     */
    DYUtils.random = function (from, to) {
        var abs = Math.abs(to - from) + 1;
        var rand = Math.floor(Math.random() * abs);
        var min = Math.min(from, to);
        return (min + rand);
    };
    /**
     * @returns a clone of an object
     * ATTENTION: the deep copy is relative, it doesn't work for inner object, just fine for properties
     */
    DYUtils.clone = function (a) {
        if (!a) {
            return a;
        }
        var at = typeof (a);
        if (at == "object") {
            // 忽略所有组件类型的 "deep copy"
            if (a.__classname__) {
                return a;
            }
            var ret = undefined;
            if (a instanceof Array) {
                ret = [];
                for (var i = 0; i < a.length; i++) {
                    var t = this.clone(a[i]);
                    if (t || t == 0 || t == "" || t == false) {
                        ret[i] = t;
                    }
                }
            }
            else {
                ret = {};
                for (var key in a) {
                    if (a.hasOwnProperty(key)) {
                        var t = this.clone(a[key]);
                        if (t || t == 0 || t == "" || t == false) {
                            ret[key] = t;
                        }
                    }
                }
            }
            return ret;
        }
        return a;
    };
    /**
     * @returns a guid string
     */
    // static guid() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //         var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    //         return v.toString(16);
    //     });
    // }
    DYUtils.guid = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    };
    /**
     * @returns current tick from system
     */
    DYUtils.currentTick = function () {
        return Date.now();
    };
    /**
     * @returns current second from system
     */
    DYUtils.currentSecond = function () {
        return Math.floor(this.currentTick() / 1000);
    };
    DYUtils.delegate = function (client, clientMethod) {
        return function () {
            return clientMethod.apply(client, arguments);
        };
    };
    DYUtils.platform = function () {
        if (cc.sys.isNative) {
            switch (cc.sys.platform) {
                case cc.sys.WIN32:
                    return "win32";
                case cc.sys.LINUX:
                    return "linux";
                case cc.sys.MACOS:
                    return "mac";
                case cc.sys.ANDROID:
                    return "android";
                case cc.sys.IPHONE:
                case cc.sys.IPAD:
                    return "ios";
                default:
                    return "unknown";
            }
        }
        return "web";
    };
    DYUtils.md5 = function (plain) {
        return DYCrypto_1.default.md5.hex_md5(plain);
    };
    DYUtils.gameId = function () {
        return Config.GAME_ID;
    };
    DYUtils.gameVer = function () {
        var ver = DYData_1.default.getStat(kGameVer, Config.GAME_VER);
        if (DYUtils.compareVer(ver, Config.GAME_VER) < 0) {
            ver = Config.GAME_VER;
            DYData_1.default.setStat(kGameVer, ver);
        }
        return ver;
    };
    DYUtils.gameOrigVer = function () {
        return Config.GAME_VER;
    };
    DYUtils.setGameVer = function (ver) {
        DYData_1.default.setStat(kGameVer, ver);
    };
    DYUtils.channel = function () {
        return "";
    };
    DYUtils.gameMode = function () {
        return Config.GAME_MODE;
    };
    // for DDLOG
    DYUtils.DDLOG = function (obj) {
        var sourceObj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sourceObj[_i - 1] = arguments[_i];
        }
        var log = DYUtils.format.apply(this, arguments);
        //console.log(log);
    };
    ;
    DYUtils.DDINFO = function (obj) {
        var sourceObj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sourceObj[_i - 1] = arguments[_i];
        }
        var log = DYUtils.format.apply(this, arguments);
        console.warn(log);
    };
    ;
    DYUtils.DDERROR = function (obj) {
        var sourceObj = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sourceObj[_i - 1] = arguments[_i];
        }
        var log = DYUtils.format.apply(this, arguments);
        console.error(log);
    };
    ;
    // for String
    DYUtils.format = function (msg) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        var argLen = arguments.length;
        if (0 === argLen) {
            return "";
        }
        var msg = arguments[0];
        if (1 === argLen) {
            return "" + msg;
        }
        var args = arguments[1];
        if (arguments.length == 2 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    msg = msg.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 1; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //let reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
                    var reg = new RegExp("({)" + (i - 1) + "(})", "g");
                    msg = msg.replace(reg, arguments[i]);
                }
            }
        }
        return msg;
    };
    /**
    example:
    let str = DYUtils.fill("%02d", 5)
    str = "05";
    */
    DYUtils.fill = function (msg) {
        var subst = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            subst[_i - 1] = arguments[_i];
        }
        var as = [].slice.call(arguments);
        var fmt = as.shift();
        var i = 0;
        return fmt.replace(/%(\w)?(\d)?([dfsx])/ig, function (_, a, b, c) {
            var s = b ? new Array(b - 0 + 1).join(a || "") : "";
            if (c == "d")
                s += parseInt(as[i++]);
            return b ? s.slice(b * -1) : s;
        });
    };
    DYUtils.scheduleOnce = function (listener, interval) {
        cc.director.getScheduler().schedule(listener, cc.director.getScene(), 0, 0, interval, false);
    };
    DYUtils.countProperty = function (obj) {
        if (!obj) {
            return 0;
        }
        return Object.getOwnPropertyNames(obj).length;
    };
    DYUtils.compareVer = function (ver1, ver2) {
        var diff = 0;
        var curV = ver1;
        var reqV = ver2;
        if (curV === reqV) {
            return 0;
        }
        if (!curV && !reqV) {
            return 0;
        }
        if (curV && !reqV) {
            return 1;
        }
        if (!curV && reqV) {
            return -1;
        }
        //将两个版本号拆成数字  
        var arr1 = curV.split("."), arr2 = reqV.split(".");
        var minLength = Math.min(arr1.length, arr2.length), position = 0;
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）  
        while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
            position++;
        }
        diff = (diff != 0) ? diff : (arr1.length - arr2.length);
        return diff;
    };
    DYUtils.cachePath = function () {
        if (!cc.sys.isNative) {
            return S_JSB_CACHE_PATH;
        }
        var path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + S_JSB_CACHE_PATH);
        return path;
    };
    DYUtils.hotfixPath = function () {
        if (!cc.sys.isNative) {
            return S_JSB_HOTFIX_PATH;
        }
        var path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + S_JSB_HOTFIX_PATH);
        return path;
    };
    DYUtils.verifyAsset = function (filePath, asset) {
        var fileStr = jsb.fileUtils.getDataFromFile(filePath);
        if (!fileStr) {
            return true;
        }
        var md5 = DYCrypto_1.default.md5.hex_md5_for_uint8arr(fileStr);
        if (md5.toUpperCase() === asset.md5.toUpperCase()) {
            return true;
        }
        return false;
    };
    DYUtils.createPool = function (key) {
        if (!S_POOLS[key]) {
            S_POOLS[key] = new cc.NodePool();
        }
        return S_POOLS[key];
    };
    DYUtils.destroyPool = function (key) {
        if (S_POOLS[key]) {
            S_POOLS[key].clear();
            delete S_POOLS[key];
        }
    };
    DYUtils.clearAllPool = function () {
        for (var key in S_POOLS) {
            S_POOLS[key].clear();
            delete S_POOLS[key];
        }
    };
    DYUtils.stringForSec = function (sec) {
        var tHour = DYUtils.fill("%02d", Math.floor(sec / 3600));
        var tMin = DYUtils.fill("%02d", Math.floor((sec % 3600) / 60));
        var tSec = DYUtils.fill("%02d", Math.floor(sec % 60));
        return DYUtils.format("{0}:{1}:{2}", tHour, tMin, tSec);
    };
    DYUtils.stringForTick = function (tick) {
        var sec = Math.floor(tick / 1000);
        // var tHour   = String.padChar("%02d", Math.floor(sec/3600));
        var tMin = DYUtils.fill("%02d", Math.floor(sec / 60));
        var tSec = DYUtils.fill("%02d", Math.floor(sec % 60));
        var tTick = DYUtils.fill("%03d", (tick % 1000));
        return DYUtils.format("{0}:{1}:{2}", tMin, tSec, tTick);
    };
    DYUtils.gc = function () {
        if (cc.sys.isNative) {
            cc.textureCache.removeAllTextures();
        }
        cc.sys.garbageCollect();
    };
    DYUtils.getParamExt = function (pk, pp) {
        pp = pp || "";
        try {
            if ("android" == DYUtils.platform()) {
                return jsb.reflection.callStaticMethod("com/dygame/common/DYCommon", "getParamExt", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", pk.toString(), pp.toString());
            }
            else if ("ios" == DYUtils.platform()) {
                return jsb.reflection.callStaticMethod("DYCommon_iOS", "getParamExt:withParam:", pk.toString(), pp.toString());
            }
            else {
                if (pk == "K_IS_GUEST") {
                    return "TRUE";
                }
            }
        }
        catch (err) { }
        finally { }
        return "";
    };
    DYUtils.uniqueID = function () {
        var tid = DYData_1.default.getStat(kUniqueID, "");
        if (!tid) {
            tid = this.guid();
            DYData_1.default.getStat(kUniqueID, tid);
        }
        return tid;
    };
    DYUtils.genSign = function (plain) {
        var strPlain = S_APP_SECRET + DYCrypto_1.default.base64.encode(plain);
        return DYCrypto_1.default.md5.hex_md5(strPlain);
    };
    DYUtils.test = function () {
        DYNotify_1.default.regObserver("TEST", function (target, tag, param) {
            DYUtils.DDLOG(DYUtils.format("onNotify: {0} with {1}", tag, param));
        }, "K_TEST", this);
        DYNotify_1.default.post("K_TEST", { t: "some param" });
        DYNotify_1.default.removeAllObservers("TEST");
        DYUtils.DDLOG(DYUtils.currentTick());
        DYUtils.scheduleOnce(function () {
            DYUtils.DDLOG(DYUtils.currentTick());
            DYUtils.DDLOG(DYUtils.format("scheduleOnce ... "));
        }, 0.5);
    };
    return DYUtils;
}());
exports.default = DYUtils;

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
        //# sourceMappingURL=DYUtils.js.map
        