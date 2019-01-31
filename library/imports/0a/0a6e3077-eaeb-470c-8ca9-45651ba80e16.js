"use strict";
cc._RF.push(module, '0a6e3B36utHDIypRWUbqA4W', 'Tips');
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