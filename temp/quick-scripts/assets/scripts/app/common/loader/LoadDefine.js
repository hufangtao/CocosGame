(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/loader/LoadDefine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '691d1GqoedKG497rlRTG47k', 'LoadDefine', __filename);
// scripts/app/common/loader/LoadDefine.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SINGLE_BATCH_KEY = "single";
// 加载项当前的状态
var LoadItemStatus;
(function (LoadItemStatus) {
    LoadItemStatus[LoadItemStatus["IDLE"] = 0] = "IDLE";
    LoadItemStatus[LoadItemStatus["STARTED"] = 1] = "STARTED";
    LoadItemStatus[LoadItemStatus["FINISHED"] = 2] = "FINISHED";
    LoadItemStatus[LoadItemStatus["ERROR"] = 3] = "ERROR";
    LoadItemStatus[LoadItemStatus["WAIT"] = 4] = "WAIT";
})(LoadItemStatus = exports.LoadItemStatus || (exports.LoadItemStatus = {}));
// 加载项的优先级
var LoaderPriority;
(function (LoaderPriority) {
    LoaderPriority[LoaderPriority["AFTERMOST"] = 0] = "AFTERMOST";
    LoaderPriority[LoaderPriority["NORMAL"] = 1] = "NORMAL";
    LoaderPriority[LoaderPriority["IMPORTANT"] = 2] = "IMPORTANT";
    LoaderPriority[LoaderPriority["URGENT"] = 3] = "URGENT";
})(LoaderPriority = exports.LoaderPriority || (exports.LoaderPriority = {}));

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
        //# sourceMappingURL=LoadDefine.js.map
        