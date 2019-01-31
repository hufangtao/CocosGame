"use strict";
cc._RF.push(module, '26811qS9IpLALfWfk7H6dvO', 'UIObjective');
// scripts/app/ui/UIObjective.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var UIFunc_1 = require("../common/UIFunc");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIObjective = /** @class */ (function (_super) {
    __extends(UIObjective, _super);
    function UIObjective() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodContent = null;
        return _this;
        // update (dt) {}
    }
    UIObjective.prototype.onLoad = function () {
    };
    UIObjective.prototype.start = function () {
    };
    // 设置开局提示面板
    UIObjective.prototype.initObjective = function (layerGame) {
        this.layerGame = layerGame;
        var panelHeader = this.layerGame.panelHeader;
        this.nodContent.stopAllActions();
        this.nodContent.x = -720;
        var nodObjectives = this.nodContent.getChildByName('nodObjectives');
        for (var i = 0; i < nodObjectives.children.length; ++i) {
            nodObjectives.children[i].active = false;
        }
        var count = 0;
        for (var i = 0; i < panelHeader.nodObjective.children.length; ++i) {
            if (panelHeader.nodObjective.children[i].active) {
                count++;
                nodObjectives.children[i].active = true;
                var node = cc.instantiate(panelHeader.nodObjective.children[i].getChildByName('sprite').children[0]);
                nodObjectives.children[i].getChildByName('sprite').destroyAllChildren();
                node.parent = nodObjectives.children[i].getChildByName('sprite');
                nodObjectives.children[i].getChildByName('labObjective').getComponent(cc.Label).string =
                    panelHeader.nodObjective.children[i].getChildByName('labObjective').getComponent(cc.Label).string;
                nodObjectives.children[i].getChildByName('ban').active = panelHeader.nodObjective.children[i].getChildByName('ban').active;
                nodObjectives.children[i].getChildByName('arrow').active = panelHeader.nodObjective.children[i].getChildByName('arrow').active;
                nodObjectives.children[i].getChildByName('question').active = panelHeader.nodObjective.children[i].getChildByName('question').active;
                nodObjectives.children[i].getChildByName('sprite').active = panelHeader.nodObjective.children[i].getChildByName('sprite').active;
                nodObjectives.children[i].getChildByName('labObjective').active = panelHeader.nodObjective.children[i].getChildByName('labObjective').active;
            }
        }
        if (count == 1) {
            nodObjectives.width = 150;
            // nodObjectives.children[0].x = 0;
        }
        else {
            nodObjectives.width = 300;
        }
    };
    // 提示面板动画
    UIObjective.prototype.panelObjectiveAction = function () {
        var _this = this;
        var action = cc.sequence(cc.moveTo(0.5, 20, 0), cc.moveTo(0.2, 0, 0), cc.delayTime(1), cc.moveTo(0.5, 720, 0), cc.callFunc(function () {
            if (!Modules_1.Play.DataPve.isTimeLevel) {
                Modules_1.Play.DataPve.gameBegan = true;
            }
            UIFunc_1.UIFunc.closeUI('UIObjective', function () { });
            _this.layerGame.panelGuide.getComponent('panelGuidePve').showGuide();
        }));
        this.nodContent.runAction(action);
    };
    __decorate([
        property(cc.Node)
    ], UIObjective.prototype, "nodContent", void 0);
    UIObjective = __decorate([
        ccclass
    ], UIObjective);
    return UIObjective;
}(cc.Component));
exports.default = UIObjective;

cc._RF.pop();