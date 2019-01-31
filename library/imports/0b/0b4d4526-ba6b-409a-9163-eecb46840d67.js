"use strict";
cc._RF.push(module, '0b4d4UmumtAmpFj7stGhA1n', 'LoadBatch');
// scripts/app/common/loader/LoadBatch.ts

Object.defineProperty(exports, "__esModule", { value: true });
var LoadDefine_1 = require("./LoadDefine");
var LoadBatch = /** @class */ (function () {
    function LoadBatch() {
        this.id = LoadBatch.uniqId++;
        this.curCount = 0;
        this.totalCount = 0;
    }
    LoadBatch.prototype.then = function (callback) {
        this.allCompletedCallback = callback;
    };
    LoadBatch.prototype.add = function (loadItem) {
        loadItem.batch = this;
        this.curCount++;
        this.totalCount++;
    };
    LoadBatch.prototype.remove = function (loadItem, error, resource) {
        this.curCount--;
        if (!error) {
            if (!this.loadedResource) {
                this.loadedResource = {};
            }
            this.loadedResource[loadItem.key()] = resource;
        }
        else {
            if (!this.error) {
                this.error = error;
            }
        }
        if (this.curCount <= 0) {
            if (this.allCompletedCallback) {
                if (this.totalCount < 2) {
                    if (!this.error) {
                        this.allCompletedCallback(this.error, this.loadedResource[LoadDefine_1.SINGLE_BATCH_KEY]);
                    }
                    else {
                        this.allCompletedCallback(this.error, null);
                    }
                }
                else {
                    this.allCompletedCallback(this.error, this.loadedResource);
                }
            }
        }
    };
    LoadBatch.uniqId = 0;
    return LoadBatch;
}());
exports.default = LoadBatch;

cc._RF.pop();