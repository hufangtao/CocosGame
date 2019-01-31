"use strict";
cc._RF.push(module, 'a8f82bmqpBBJ5d2wBqNs3dm', 'BaseModule');
// scripts/app/module/BaseModule.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../common/event/EventDispatcher");
var GamePersist_1 = require("../common/persist/GamePersist");
var ModuleManagerUtil = require("./ModuleManager");
var BaseModule = /** @class */ (function (_super) {
    __extends(BaseModule, _super);
    function BaseModule(name) {
        var _this = _super.call(this) || this;
        _this.node = new cc.Node("module-node-" + name);
        GamePersist_1.default.RootNodeModule.addChild(_this.node);
        ModuleManagerUtil.AddModule(_this);
        _this.onCreated();
        return _this;
    }
    BaseModule.prototype.onCreated = function () {
    };
    BaseModule.prototype.init = function () {
    };
    return BaseModule;
}(EventDispatcher_1.default));
exports.default = BaseModule;

cc._RF.pop();