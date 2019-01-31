(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pvp/prefab/Encourage.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '814548K5tpERZA1PsmHyGgy', 'Encourage', __filename);
// scripts/app/component/game/pvp/prefab/Encourage.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Encourage = /** @class */ (function (_super) {
    __extends(Encourage, _super);
    function Encourage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.sprite = null;
        return _this;
    }
    Encourage.prototype.setType = function (type) {
        var _this = this;
        cc.loader.loadRes('res/prefab/encourage/word_encourage_' + type, cc.SpriteFrame, function (err, spriteFrame) {
            _this.sprite.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });
        this.node.opacity = 255;
        this.node.setPosition(0, 500);
        var delay = cc.delayTime(0.2);
        var action = cc.spawn([cc.moveBy(1.3, cc.v2(0, 70)), cc.fadeTo(1.3, 0)]);
        var recycle = cc.callFunc(function () {
            Modules_1.Play.DataPvp.pushEncourage(this.node);
        }, this);
        var seqActions = cc.sequence([delay, action, recycle]);
        this.node.runAction(seqActions);
    };
    Encourage.prototype.onDestroy = function () {
    };
    __decorate([
        property(cc.Sprite)
    ], Encourage.prototype, "sprite", void 0);
    Encourage = __decorate([
        ccclass
    ], Encourage);
    return Encourage;
}(cc.Component));
exports.default = Encourage;

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
        //# sourceMappingURL=Encourage.js.map
        