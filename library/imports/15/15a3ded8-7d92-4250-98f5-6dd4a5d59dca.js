"use strict";
cc._RF.push(module, '15a3d7YfZJCUJj1bdSl1Z3K', 'PlayMoudle');
// scripts/app/component/game/PlayMoudle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseModule_1 = require("../../module/BaseModule");
var PlayNetHandler_1 = require("./PlayNetHandler");
var DataPlay_1 = require("../../module/data/mod/DataPlay");
var DataPve_1 = require("./pve/DataPve");
var DataPvp_1 = require("./pvp/DataPvp");
var PlayModule = /** @class */ (function (_super) {
    __extends(PlayModule, _super);
    function PlayModule() {
        return _super.call(this, PlayModule.MODULE_NAME) || this;
    }
    PlayModule.prototype.onCreated = function () {
        this.protoPlayHandler = new PlayNetHandler_1.default();
        this.dataPlay = new DataPlay_1.default();
        this.dataPve = new DataPve_1.default();
        this.dataPvp = new DataPvp_1.default();
    };
    Object.defineProperty(PlayModule.prototype, "DataPve", {
        get: function () {
            return this.dataPve;
        },
        enumerable: true,
        configurable: true
    });
    PlayModule.prototype.resetDataPve = function () {
        this.dataPve = new DataPve_1.default();
    };
    Object.defineProperty(PlayModule.prototype, "DataPvp", {
        get: function () {
            return this.dataPvp;
        },
        enumerable: true,
        configurable: true
    });
    PlayModule.prototype.resetDataPvp = function () {
        this.dataPvp = new DataPvp_1.default();
    };
    Object.defineProperty(PlayModule.prototype, "DataPlay", {
        get: function () {
            return this.dataPlay;
        },
        enumerable: true,
        configurable: true
    });
    PlayModule.prototype.resetPlay = function () {
        this.dataPlay = new DataPlay_1.default();
    };
    Object.defineProperty(PlayModule.prototype, "LevelDatas", {
        get: function () {
            return this.levelDatas;
        },
        set: function (value) {
            this.levelDatas = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlayModule.prototype, "GameModel", {
        get: function () {
            return this.gameModel;
        },
        set: function (value) {
            this.gameModel = value;
        },
        enumerable: true,
        configurable: true
    });
    PlayModule.MODULE_NAME = "home";
    return PlayModule;
}(BaseModule_1.default));
exports.default = PlayModule;

cc._RF.pop();