(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/loader/LoadItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4315c9MFZ5PtZvpn0ZDQ9Gl', 'LoadItem', __filename);
// scripts/app/common/loader/LoadItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LoadDefine_1 = require("./LoadDefine");
var LoadItem = /** @class */ (function () {
    function LoadItem(path, priority, key, assetType) {
        this.filled = false;
        this.path = path;
        this.itemKey = key;
        this.assetType = assetType;
        this.priority = priority || LoadDefine_1.LoaderPriority.NORMAL;
        this.status = LoadDefine_1.LoadItemStatus.IDLE;
    }
    LoadItem.prototype.key = function () {
        return this.itemKey;
    };
    LoadItem.prototype.load = function () {
        this.status = LoadDefine_1.LoadItemStatus.STARTED;
        var that = this;
        if (this.assetType) {
            cc.loader.loadRes(this.path, this.assetType, function (error, resource) {
                that.internalComplete(error, resource);
            });
        }
        else {
            cc.loader.loadRes(this.path, function (error, resource) {
                that.internalComplete(error, resource);
            });
        }
    };
    LoadItem.prototype.then = function (callback) {
        this.completeCallback = callback;
    };
    LoadItem.prototype.dispose = function () {
        this.status = LoadDefine_1.LoadItemStatus.FINISHED;
        this.completeCallback = null;
        this.batch = null;
    };
    LoadItem.prototype.internalComplete = function (error, resource) {
        this.completeCallback(this, error, resource);
    };
    return LoadItem;
}());
exports.default = LoadItem;

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
        //# sourceMappingURL=LoadItem.js.map
        