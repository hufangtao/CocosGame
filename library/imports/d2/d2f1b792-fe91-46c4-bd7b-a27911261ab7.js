"use strict";
cc._RF.push(module, 'd2f1beS/pFGxL17onkRJhq3', 'BaseComponent');
// scripts/app/component/BaseComponent.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 所有组件的基类
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseComponent = /** @class */ (function (_super) {
    __extends(BaseComponent, _super);
    function BaseComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseComponent.prototype.start = function () {
    };
    BaseComponent.prototype.onLoad = function () {
    };
    BaseComponent = __decorate([
        ccclass
    ], BaseComponent);
    return BaseComponent;
}(cc.Component));
exports.default = BaseComponent;

cc._RF.pop();