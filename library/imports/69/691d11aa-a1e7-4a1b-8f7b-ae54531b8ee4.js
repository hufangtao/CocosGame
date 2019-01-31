"use strict";
cc._RF.push(module, '691d1GqoedKG497rlRTG47k', 'LoadDefine');
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