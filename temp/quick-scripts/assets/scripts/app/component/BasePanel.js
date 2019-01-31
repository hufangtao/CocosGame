(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/BasePanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a0bb4C/WFdJUaph/9r7Nwjm', 'BasePanel', __filename);
// scripts/app/component/BasePanel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent_1 = require("./BaseComponent");
// 所有弹出面板的基类
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BasePanel = /** @class */ (function (_super) {
    __extends(BasePanel, _super);
    function BasePanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BasePanel.prototype.start = function () {
        _super.prototype.start.call(this);
    };
    BasePanel.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
    };
    BasePanel.prototype.viewNode = function () {
        return this.node;
    };
    BasePanel = __decorate([
        ccclass
    ], BasePanel);
    return BasePanel;
}(BaseComponent_1.default));
exports.default = BasePanel;

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
        //# sourceMappingURL=BasePanel.js.map
        