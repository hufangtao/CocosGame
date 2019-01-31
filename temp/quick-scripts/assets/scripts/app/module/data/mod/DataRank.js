(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/module/data/mod/DataRank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '88b49fW5ulAFpx3kJuSDn4+', 'DataRank', __filename);
// scripts/app/module/data/mod/DataRank.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataRank = /** @class */ (function () {
    function DataRank() {
        this.nMyRank = 0;
        this.nFriendRankMyRank = 0;
    }
    Object.defineProperty(DataRank.prototype, "FriendRankData", {
        get: function () {
            return this.vecFriendRankData;
        },
        set: function (data) {
            this.vecFriendRankData = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRank.prototype, "GlobalRankData", {
        get: function () {
            return this.vecGlobalRankData;
        },
        set: function (data) {
            this.vecGlobalRankData = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRank.prototype, "MyRank", {
        get: function () {
            return this.nMyRank;
        },
        set: function (data) {
            this.nMyRank = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRank.prototype, "FriendRankMyRank", {
        get: function () {
            return this.nFriendRankMyRank;
        },
        set: function (data) {
            this.nFriendRankMyRank = data;
        },
        enumerable: true,
        configurable: true
    });
    return DataRank;
}());
exports.default = DataRank;
var PveDataRank = /** @class */ (function () {
    function PveDataRank() {
        this.nMyRank = 0;
    }
    Object.defineProperty(PveDataRank.prototype, "GlobalRankData", {
        get: function () {
            return this.vecGlobalRankData;
        },
        set: function (data) {
            this.vecGlobalRankData = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PveDataRank.prototype, "MyRank", {
        get: function () {
            return this.nMyRank;
        },
        set: function (data) {
            this.nMyRank = data;
        },
        enumerable: true,
        configurable: true
    });
    return PveDataRank;
}());
exports.PveDataRank = PveDataRank;

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
        //# sourceMappingURL=DataRank.js.map
        