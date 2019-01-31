(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/prefab/Toast.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5979dL6QVRMgqWaEZNvTZay', 'Toast', __filename);
// scripts/app/component/prefab/Toast.ts

Object.defineProperty(exports, "__esModule", { value: true });
var GamePersist_1 = require("../../common/persist/GamePersist");
var PlayDefine_1 = require("../game/PlayDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Toast = /** @class */ (function (_super) {
    __extends(Toast, _super);
    function Toast() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textMsg = null;
        _this.imgBackground = null;
        return _this;
    }
    Toast.prototype.start = function () {
    };
    Toast.prototype.setMessage = function (message, colorType, delayTime) {
        this.textMsg.string = message;
        this.textMsg['_updateRenderData'](true);
        var textSize = this.textMsg.node.getContentSize();
        this.imgBackground.node.setContentSize(textSize.width + 90, textSize.height + 70);
        this.node.opacity = 255;
        this.node.position = new cc.Vec2(0, 0);
        if (colorType === PlayDefine_1.ColorType.Green) {
            this.textMsg.node.color = new cc.Color(46, 99, 25);
        }
        else {
            // 红
            this.textMsg.node.color = new cc.Color(173, 53, 53);
        }
        delayTime = (delayTime ? delayTime : 1);
        var delay = cc.delayTime(delayTime);
        var action = cc.spawn([cc.moveBy(1.3, cc.v2(0, 70)), cc.fadeTo(1.3, 0)]);
        var recycle = cc.callFunc(function () {
            GamePersist_1.default.ToastPool.put(this.node);
        }, this);
        var seqActions = cc.sequence([delay, action, recycle]);
        this.node.runAction(seqActions);
    };
    Toast.prototype.onDestroy = function () {
    };
    __decorate([
        property(cc.Label)
    ], Toast.prototype, "textMsg", void 0);
    __decorate([
        property(cc.Sprite)
    ], Toast.prototype, "imgBackground", void 0);
    Toast = __decorate([
        ccclass
    ], Toast);
    return Toast;
}(cc.Component));
exports.default = Toast;

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
        //# sourceMappingURL=Toast.js.map
        