(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/home/prefab/RankItem.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '477edNkel1IarzOWsV95K6k', 'RankItem', __filename);
// scripts/app/component/page/home/prefab/RankItem.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Misc = require("../../../../common/Misc");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labRank = null;
        _this.labName = null;
        _this.labGrade = null;
        _this.labRate = null;
        return _this;
    }
    RankItem.prototype.updateItem = function (itemID, data) {
        this.itemID = itemID;
        // 好友名字
        var name = data.name;
        if (name.length > 6) {
            name = name.substring(0, 5);
        }
        this.labName.string = name;
        this.labName.node.color = new cc.Color(186, 70, 25, 255);
        // 段位
        var StarNum = Misc.calcShowStarCount(data.star);
        this.labGrade.string = Misc.getGradeName(data.star) + " " + StarNum + "星";
        // 胜率
        this.labRate.string = Misc.formatPercent(data.rateOfWin / 100);
        // 榜次
        this.labRank.string = (itemID + 1) + "";
    };
    RankItem.prototype.setMyRank = function (rankNum) {
        this.labRank.string = (rankNum + 1) + "";
    };
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labRank", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labName", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labGrade", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labRate", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(cc.Component));
exports.default = RankItem;

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
        //# sourceMappingURL=RankItem.js.map
        