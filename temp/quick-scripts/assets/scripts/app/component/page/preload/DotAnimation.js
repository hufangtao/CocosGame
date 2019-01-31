(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/preload/DotAnimation.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fe07cYhUCpORpq2nM2GNWsG', 'DotAnimation', __filename);
// scripts/app/component/page/preload/DotAnimation.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DotAnimation = /** @class */ (function (_super) {
    __extends(DotAnimation, _super);
    function DotAnimation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 画点graph节点
        _this.dotGraphic = null;
        _this.dotNode = null;
        // 变量提示点的数目
        _this.dotNum = 0;
        // 背景graph节点
        _this.bgGraphic = null;
        return _this;
    }
    DotAnimation_1 = DotAnimation;
    DotAnimation.NewDotAnimation = function () {
        var animationNode = new cc.Node();
        var dotAnimation = animationNode.addComponent(DotAnimation_1);
        return dotAnimation;
    };
    DotAnimation.prototype.onLoad = function () {
        /*
        // 创建渲染背景的组件
        this.bgGraphic = this.node.addComponent(cc.Graphics);
        this.drawBackground();
        */
        // 创建渲染dot的节点
        this.dotNode = new cc.Node();
        this.node.addChild(this.dotNode);
        this.dotGraphic = this.dotNode.addComponent(cc.Graphics);
        var self = this;
        this.schedule(function () {
            self.updateDots();
        }, 0.5);
    };
    DotAnimation.prototype.updateDots = function () {
        var gap = 25;
        if (this.dotNum < 3) {
            this.drawDot(this.dotNum * gap - gap, 0, 7);
            this.dotNum++;
        }
        else {
            this.dotNum = 0;
            this.dotGraphic.clear();
        }
    };
    DotAnimation.prototype.drawDot = function (posX, posY, size) {
        this.dotGraphic.circle(posX, posY, size);
        this.dotGraphic.stroke();
        this.dotGraphic.fill();
    };
    DotAnimation.prototype.drawBackground = function () {
        var width = 200;
        var height = 40;
        this.bgGraphic.rect(-(width / 2), -(height / 2), width, height);
        this.bgGraphic.fillColor = new cc.Color(0, 0, 0, 0);
        this.bgGraphic.stroke();
        this.bgGraphic.fill();
    };
    DotAnimation = DotAnimation_1 = __decorate([
        ccclass
    ], DotAnimation);
    return DotAnimation;
    var DotAnimation_1;
}(cc.Component));
exports.default = DotAnimation;

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
        //# sourceMappingURL=DotAnimation.js.map
        