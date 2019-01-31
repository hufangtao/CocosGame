(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/home/HomeModule.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'b762fp32wRAk4VaLQUOCbqZ', 'HomeModule', __filename);
// scripts/app/component/page/home/HomeModule.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseModule_1 = require("../../../module/BaseModule");
var DataPlayer_1 = require("../../../module/data/mod/DataPlayer");
var DataRoom_1 = require("../../../module/data/mod/DataRoom");
var DataRank_1 = require("../../../module/data/mod/DataRank");
var PlayerNetHandler_1 = require("./PlayerNetHandler");
var RoomNetHandler_1 = require("./RoomNetHandler");
var DebugNetHandler_1 = require("./DebugNetHandler");
var HomeModule = /** @class */ (function (_super) {
    __extends(HomeModule, _super);
    function HomeModule() {
        var _this = _super.call(this, HomeModule.MODULE_NAME) || this;
        _this.timeOffset = 0;
        return _this;
    }
    HomeModule.prototype.onCreated = function () {
        this.dataPlayer = new DataPlayer_1.default();
        this.dataRoom = new DataRoom_1.default();
        this.dataRank = new DataRank_1.default();
        this.pveRank = null;
        this.protoPlayerHandler = new PlayerNetHandler_1.default();
        this.protoRoomHandler = new RoomNetHandler_1.default();
        this.protoDebugHandler = new DebugNetHandler_1.default();
    };
    Object.defineProperty(HomeModule.prototype, "TimeOffset", {
        get: function () {
            return this.timeOffset;
        },
        set: function (value) {
            this.timeOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    HomeModule.prototype.resetHome = function () {
        this.dataRoom = new DataRoom_1.default();
    };
    Object.defineProperty(HomeModule.prototype, "DataPlayer", {
        get: function () {
            return this.dataPlayer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "OpenHomeFrom", {
        get: function () {
            return this.openHomeFrom;
        },
        set: function (from) {
            this.openHomeFrom = from;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "PlayerName", {
        get: function () {
            return this.dataPlayer.MyName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "PlayerId", {
        get: function () {
            return this.dataPlayer.MyId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "PlayerHeadUrl", {
        get: function () {
            return this.dataPlayer.MyHeadUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "OpponentId", {
        get: function () {
            return this.dataRoom.OpponentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "OpponentName", {
        get: function () {
            return this.dataRoom.OpponentName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "OpponentHeadUrl", {
        get: function () {
            return this.dataRoom.OpponentHeadUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "OpponentSex", {
        // xlchen add
        get: function () {
            return this.dataRoom.OpponentSex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "DataRoom", {
        get: function () {
            return this.dataRoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "MyPlayerInfo", {
        set: function (value) {
            this.dataPlayer.MyPlayer = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "PlayerSex", {
        get: function () {
            return this.dataPlayer.MySex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "DataRank", {
        // xlchen add
        get: function () {
            return this.dataRank;
        },
        set: function (data) {
            this.dataRank = data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HomeModule.prototype, "PveRank", {
        get: function () {
            return this.pveRank;
        },
        set: function (value) {
            this.pveRank = value;
        },
        enumerable: true,
        configurable: true
    });
    HomeModule.MODULE_NAME = "home";
    return HomeModule;
}(BaseModule_1.default));
exports.default = HomeModule;

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
        //# sourceMappingURL=HomeModule.js.map
        