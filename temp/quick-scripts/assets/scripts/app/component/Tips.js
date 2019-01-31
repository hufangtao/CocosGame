(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/Tips.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0a6e3B36utHDIypRWUbqA4W', 'Tips', __filename);
// scripts/app/component/Tips.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Tip = /** @class */ (function (_super) {
    __extends(Tip, _super);
    function Tip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tip.prototype.show = function () {
        this.node.active = true;
        this.node.opacity = 255;
        var index = Math.floor(Math.random() * 6);
        for (var i = 0; i < this.node.children.length; ++i) {
            if (index == i) {
                this.node.children[i].active = true;
            }
            else {
                this.node.children[i].active = false;
            }
        }
    };
    Tip.prototype.hide = function () {
        this.node.active = false;
    };
    Tip = __decorate([
        ccclass
    ], Tip);
    return Tip;
}(cc.Component));
exports.default = Tip;

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
        //# sourceMappingURL=Tips.js.map
        