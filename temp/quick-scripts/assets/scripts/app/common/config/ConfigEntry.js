(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/config/ConfigEntry.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '70a36fMmLxMgbHVgr4/gi7D', 'ConfigEntry', __filename);
// scripts/app/common/config/ConfigEntry.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Loader_1 = require("../loader/Loader");
var Defines_1 = require("../Defines");
var ConfigVO = require("./vo/ConfigVO");
var NetByteArray_1 = require("../net/NetByteArray");
var Modules_1 = require("../../module/Modules");
var ClazzMap = {};
function loadJsons(dirName) {
    return new Promise(function (resolve, reject) {
        cc.loader.loadResDir(dirName, function (err, assets, urls) {
            for (var i = 0; i < assets.length; ++i) {
                if (urls[i] === 'config/Map') {
                    var mapData = assets[i].json;
                    Modules_1.Play.LevelDatas = mapData;
                    continue;
                }
                var configName = urls[i].substring(dirName.length + 1);
                var data = assets[i].json;
                onConfigLoaded(configName, data);
            }
            resolve();
        });
    });
}
function loadJson(name) {
    return new Promise(function (resolve, reject) {
        Loader_1.default.loadConfig(name, function (err, resource) {
            if (err) {
                cc.warn("load config:" + name + " err:" + err);
                resolve(null);
                return;
            }
            resolve(resource);
        });
    });
}
function loadZip(name) {
    return new Promise(function (resolve, reject) {
        Loader_1.default.loadSingle(Defines_1.RESOURCE_CONFIG_PATH_ROOT + name, function (err, resource) {
            if (err) {
                cc.warn("load zip:" + name + " err:" + err);
                resolve(null);
                return;
            }
            resolve(resource);
        });
    });
}
function getConfigPath(name) {
    return Defines_1.RESOURCE_CONFIG_PATH_ROOT + name;
}
function onConfigLoaded(configName, data) {
    var name = configName.replace(/^(?:Sys|Client)?(.*)$/, "$1");
    if (ConfigVO[name]) {
        var vo = ConfigVO[name];
        if (vo.isInited) {
            return;
        }
    }
    ConfigVO[name].setClass(ClazzMap[name]);
    ConfigVO[name].initData(data);
}
function onZipLoaded(files) {
    for (var _i = 0, _a = Object.keys(files); _i < _a.length; _i++) {
        var fileName = _a[_i];
        var data = files[fileName];
        var bytes = new NetByteArray_1.ByteArray(data);
        var fileContent = bytes.readUTFBytes(bytes.bytesAvailable);
        var confName = fileName.split(".")[0];
        onConfigLoaded(confName, JSON.parse(fileContent));
    }
}
function loadAllConfig() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: 
                // const serverListName: string = "ServerList";
                // const serverList = await loadJson(serverListName);
                // if (!serverList) {
                //   return false;
                // }
                // onConfigLoaded(serverListName, serverList);
                return [4 /*yield*/, loadJsons('config')];
                case 1:
                    // const serverListName: string = "ServerList";
                    // const serverList = await loadJson(serverListName);
                    // if (!serverList) {
                    //   return false;
                    // }
                    // onConfigLoaded(serverListName, serverList);
                    _a.sent();
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.loadAllConfig = loadAllConfig;

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
        //# sourceMappingURL=ConfigEntry.js.map
        