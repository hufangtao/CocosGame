(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/loader/Loader.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9e51534etJPnLXFybPDZFGF', 'Loader', __filename);
// scripts/app/common/loader/Loader.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LoadDefine_1 = require("./LoadDefine");
var LoadItem_1 = require("./LoadItem");
var LoadBatch_1 = require("./LoadBatch");
var Defines_1 = require("../Defines");
var ResLoader = /** @class */ (function () {
    function ResLoader() {
    }
    // 加载一个配置文件 仅用来加载配置文件
    ResLoader.loadConfig = function (cfgName, callback) {
        var path = Defines_1.RESOURCE_CONFIG_PATH_ROOT + cfgName;
        ResLoader.loadSingle(path, callback);
    };
    ResLoader.loadSpriteFrame = function (path, callback) {
        ResLoader.loadSingle(path, callback, LoadDefine_1.LoaderPriority.NORMAL, LoadDefine_1.SINGLE_BATCH_KEY, cc.SpriteFrame);
    };
    // 加载一个SpriteAtlas
    ResLoader.loadSpriteAtlas = function (path, callback) {
        ResLoader.loadSingle(path, callback, LoadDefine_1.LoaderPriority.NORMAL, LoadDefine_1.SINGLE_BATCH_KEY, cc.SpriteAtlas);
    };
    // 加载一个文件
    ResLoader.loadSingle = function (path, callback, priority, key, assetType) {
        key = key || LoadDefine_1.SINGLE_BATCH_KEY;
        priority = priority || LoadDefine_1.LoaderPriority.NORMAL;
        var loadItem = new LoadItem_1.default(path, priority, key, assetType);
        loadItem.status = LoadDefine_1.LoadItemStatus.IDLE;
        var batch = new LoadBatch_1.default();
        batch.then(callback);
        ResLoader.add(loadItem, batch);
        ResLoader.sortItems();
        ResLoader.loadNext();
    };
    // 加载多个文件
    ResLoader.loadMulti = function (lists, callback, priority) {
        var len = lists.length;
        priority = priority || LoadDefine_1.LoaderPriority.NORMAL;
        var loadBatch = new LoadBatch_1.default();
        loadBatch.then(callback);
        for (var i = 0; i < len; i++) {
            var loadItemDesc = lists[i];
            var loadItem = new LoadItem_1.default(loadItemDesc.path, priority, loadItemDesc.key, loadItemDesc.assetType);
            ResLoader.add(loadItem, loadBatch);
        }
        ResLoader.sortItems();
        ResLoader.loadNext();
    };
    ResLoader.onItemComplete = function (loadItem, error, resource) {
        ResLoader.remove(loadItem, error, resource);
    };
    ResLoader.remove = function (loadItem, error, resource) {
        var idx = ResLoader.loadItems.indexOf(loadItem);
        ResLoader.loadItems.splice(idx, 1);
        if (loadItem.batch) {
            loadItem.batch.remove(loadItem, error, resource);
        }
        ResLoader.tryCompleteWait(loadItem.path, error, resource);
        loadItem.dispose();
    };
    // 如果当前有其他正在等待该资源的加载 则一并完成
    ResLoader.tryCompleteWait = function (path, error, resource) {
        for (var i = 0; i < ResLoader.length; i++) {
            var loadItem = ResLoader.loadItems[i];
            if (loadItem.path === path && loadItem.status === LoadDefine_1.LoadItemStatus.WAIT) {
                ResLoader.onItemComplete(loadItem, error, resource);
                // 这里之所以使用break 是因为这次找到的LoadItem会继续找相同的加载 所以这里break掉就可以了
                break;
            }
        }
    };
    ResLoader.add = function (loadItem, batch) {
        loadItem.then(ResLoader.onItemComplete);
        loadItem.additionIndex = batch.id;
        batch.add(loadItem);
        if (ResLoader.isLoading(loadItem.path)) {
            loadItem.status = LoadDefine_1.LoadItemStatus.WAIT;
            loadItem.priority = LoadDefine_1.LoaderPriority.AFTERMOST;
            loadItem.additionIndex = -1;
        }
        ResLoader.loadItems.push(loadItem);
    };
    ResLoader.sortItems = function () {
        ResLoader.insertSort("additionIndex");
        ResLoader.insertSort("priority");
    };
    ResLoader.insertSort = function (prop) {
        var tmpItem;
        var i;
        var j;
        for (i = 1; i < ResLoader.loadItems.length; i++) {
            tmpItem = ResLoader.loadItems[i];
            for (j = i - 1; j >= 0; j--) {
                if (ResLoader.loadItems[j][prop] < tmpItem[prop]) {
                    ResLoader.loadItems[j + 1] = ResLoader.loadItems[j];
                    ResLoader.loadItems[j] = tmpItem;
                }
                else {
                    break;
                }
            }
        }
    };
    ResLoader.loadNext = function () {
        var loadItem = ResLoader.getNextItemToLoad();
        if (loadItem) {
            loadItem.load();
            ResLoader.loadNext();
        }
    };
    ResLoader.getNextItemToLoad = function () {
        var i = 0;
        while (i < ResLoader.loadItems.length) {
            var loadItem = ResLoader.loadItems[i];
            if (loadItem.status === LoadDefine_1.LoadItemStatus.IDLE) {
                return loadItem;
            }
            i++;
        }
        return null;
    };
    ResLoader.isLoading = function (path) {
        var i = 0;
        while (i < ResLoader.loadItems.length) {
            if (ResLoader.loadItems[i].path === path) {
                return true;
            }
            i++;
        }
        return false;
    };
    // 加载项列表
    ResLoader.loadItems = [];
    return ResLoader;
}());
exports.default = ResLoader;

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
        //# sourceMappingURL=Loader.js.map
        