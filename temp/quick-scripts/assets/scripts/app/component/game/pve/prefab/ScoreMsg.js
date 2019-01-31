(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pve/prefab/ScoreMsg.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1ca0fTgITBPc7jSdPsSUM2M', 'ScoreMsg', __filename);
// scripts/app/component/game/pve/prefab/ScoreMsg.ts

Object.defineProperty(exports, "__esModule", { value: true });
var NodePool_1 = require("../../NodePool");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var ScoreMsg = /** @class */ (function (_super) {
    __extends(ScoreMsg, _super);
    function ScoreMsg() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labScore = null;
        _this.font_red = null;
        _this.font_blue = null;
        return _this;
    }
    //   @property(cc.Sprite)
    //   public imgBackground: cc.Sprite = null;
    ScoreMsg.prototype.start = function () {
    };
    ScoreMsg.prototype.setMessage = function (count, score, x, y) {
        if (count <= 6) {
            this.labScore.font = this.font_blue;
        }
        else {
            this.labScore.font = this.font_red;
        }
        this.labScore.string = score + '';
        var textSize = this.labScore.node.getContentSize();
        // this.imgBackground.node.setContentSize(textSize.width + 70, textSize.height + 40);
        this.node.opacity = 255;
        var offestX = (Math.random() - 0.5) * 20;
        var offestY = (Math.random() - 0.5) * 20;
        this.node.setPosition(80 * (x - 4) + 80 / 2 + offestX, 80 * y + 80 + offestY);
        var delay = cc.delayTime(0.2);
        var action = cc.spawn([cc.moveBy(1.3, cc.v2(0, 70)), cc.fadeTo(1.3, 0)]);
        var recycle = cc.callFunc(function () {
            NodePool_1.default.putNodeScore(this.node);
        }, this);
        var seqActions = cc.sequence([delay, action, recycle]);
        this.node.runAction(seqActions);
    };
    ScoreMsg.prototype.onDestroy = function () {
    };
    __decorate([
        property(cc.Label)
    ], ScoreMsg.prototype, "labScore", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], ScoreMsg.prototype, "font_red", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], ScoreMsg.prototype, "font_blue", void 0);
    ScoreMsg = __decorate([
        ccclass
    ], ScoreMsg);
    return ScoreMsg;
}(cc.Component));
exports.default = ScoreMsg;

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
        //# sourceMappingURL=ScoreMsg.js.map
        