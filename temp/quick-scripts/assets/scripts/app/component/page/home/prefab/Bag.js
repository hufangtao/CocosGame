(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/home/prefab/Bag.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e6ab01CO9dHZatM4qpdmUB9', 'Bag', __filename);
// scripts/app/component/page/home/prefab/Bag.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Bag = /** @class */ (function (_super) {
    __extends(Bag, _super);
    function Bag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodContent = null;
        _this.pfbProp = null;
        _this.spfProp1 = null;
        _this.spfProp2 = null;
        _this.spfProp3 = null;
        _this.spfProp4 = null;
        return _this;
        // update (dt) {}
    }
    Bag.prototype.onLoad = function () {
        this.loadBagContent();
    };
    Bag.prototype.start = function () {
    };
    // 加载背包内容
    Bag.prototype.loadBagContent = function () {
        for (var i = 0; i < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++i) {
            var good = Modules_1.Home.DataPlayer.PlayerGoodsData[i];
            var nodProp = cc.instantiate(this.pfbProp);
            nodProp.parent = this.nodContent;
            nodProp.getChildByName('propIcon').getComponent(cc.Sprite).spriteFrame = this.getSpfById(good.goodsId);
            nodProp.getChildByName('labCount').getComponent(cc.Label).string = good.goodsNum + '';
        }
    };
    Bag.prototype.getSpfById = function (goodId) {
        var spriteFrame;
        switch (goodId) {
            case 1:
                spriteFrame = this.spfProp1;
                break;
            case 2:
                spriteFrame = this.spfProp2;
                break;
            case 3:
                spriteFrame = this.spfProp3;
                break;
            case 4:
                spriteFrame = this.spfProp4;
                break;
        }
        return spriteFrame;
    };
    Bag.prototype.closePanel = function () {
        this.node.active = false;
    };
    __decorate([
        property(cc.Node)
    ], Bag.prototype, "nodContent", void 0);
    __decorate([
        property(cc.Prefab)
    ], Bag.prototype, "pfbProp", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bag.prototype, "spfProp1", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bag.prototype, "spfProp2", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bag.prototype, "spfProp3", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Bag.prototype, "spfProp4", void 0);
    Bag = __decorate([
        ccclass
    ], Bag);
    return Bag;
}(cc.Component));
exports.default = Bag;

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
        //# sourceMappingURL=Bag.js.map
        