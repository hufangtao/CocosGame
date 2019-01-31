(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/prefab/DelayActiveButton.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '04dc01hOkFJ8b+BDS3gYu60', 'DelayActiveButton', __filename);
// scripts/app/component/prefab/DelayActiveButton.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DelayActiveButton = /** @class */ (function (_super) {
    __extends(DelayActiveButton, _super);
    function DelayActiveButton() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.theButton = null;
        _this.time = 0;
        _this.btnLable = null;
        _this.btnLabelShow = "button";
        _this.timer = 0;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    DelayActiveButton.prototype.onLoad = function () {
        this.timer = 0;
        this.theButton.interactable = false;
    };
    DelayActiveButton.prototype.start = function () {
        this.scheduleOnce(this.testTimer, this.time);
    };
    DelayActiveButton.prototype.testTimer = function () {
        this.theButton.interactable = true;
    };
    DelayActiveButton.prototype.update = function (dt) {
        this.timer += dt;
        this.test(this.timer);
    };
    DelayActiveButton.prototype.test = function (t) {
        if (this.timer < 1) {
            this.btnLable.string = this.time.toString();
        }
        if (this.timer >= Math.floor(t) && this.timer < Math.floor(t) + 1) {
            this.btnLable.string = (this.time - Math.floor(t)).toString();
        }
        if (this.timer > this.time) {
            this.btnLable.string = this.btnLabelShow;
        }
    };
    __decorate([
        property(cc.Button)
    ], DelayActiveButton.prototype, "theButton", void 0);
    __decorate([
        property()
    ], DelayActiveButton.prototype, "time", void 0);
    __decorate([
        property(cc.Label)
    ], DelayActiveButton.prototype, "btnLable", void 0);
    DelayActiveButton = __decorate([
        ccclass
    ], DelayActiveButton);
    return DelayActiveButton;
}(cc.Component));
exports.default = DelayActiveButton;

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
        //# sourceMappingURL=DelayActiveButton.js.map
        