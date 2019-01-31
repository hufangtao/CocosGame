(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIInviteDevConfirm.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e4eb906kwBCQ7ZK4kKd/TWi', 'UIInviteDevConfirm', __filename);
// scripts/app/ui/UIInviteDevConfirm.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GamePersist_1 = require("../common/persist/GamePersist");
var HomeManager_1 = require("../component/page/home/HomeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIInviteDevConfirm = /** @class */ (function (_super) {
    __extends(UIInviteDevConfirm, _super);
    function UIInviteDevConfirm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.btnConfirm = null;
        return _this;
    }
    UIInviteDevConfirm.prototype.start = function () {
    };
    UIInviteDevConfirm.prototype.onDestroy = function () {
    };
    UIInviteDevConfirm.prototype.setInviteUrl = function (url) {
        this.label.string = url;
    };
    UIInviteDevConfirm.prototype.handleConfirm = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        window['Partner'].copyToClipboard(this.label.string);
        HomeManager_1.default.INSTANCE.showInvitePanel();
    };
    __decorate([
        property(cc.Label)
    ], UIInviteDevConfirm.prototype, "label", void 0);
    __decorate([
        property(cc.Button)
    ], UIInviteDevConfirm.prototype, "btnConfirm", void 0);
    UIInviteDevConfirm = __decorate([
        ccclass
    ], UIInviteDevConfirm);
    return UIInviteDevConfirm;
}(cc.Component));
exports.default = UIInviteDevConfirm;

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
        //# sourceMappingURL=UIInviteDevConfirm.js.map
        