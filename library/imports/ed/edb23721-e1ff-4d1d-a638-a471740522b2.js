"use strict";
cc._RF.push(module, 'edb23ch4f9NHaY4pHF0BSKy', 'RankItemPve');
// scripts/app/component/levelChoose/prefab/RankItemPve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankItem = /** @class */ (function (_super) {
    __extends(RankItem, _super);
    function RankItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.medal_1 = null;
        _this.medal_2 = null;
        _this.medal_3 = null;
        _this.labRank = null;
        _this.labName = null;
        _this.labScore = null;
        _this.nodBg_1 = null;
        _this.nodBg_2 = null;
        _this.ranknum_blue = null;
        _this.ranknum_red = null;
        return _this;
    }
    RankItem.prototype.updateItem = function (itemID, data) {
        this.itemID = itemID;
        if (itemID == 0) {
            this.medal_1.active = true;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        }
        else if (itemID == 1) {
            this.medal_1.active = false;
            this.medal_2.active = true;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        }
        else if (itemID == 2) {
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = true;
            this.labRank.node.active = false;
        }
        else {
            // 排名
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = true;
            this.labRank.string = (itemID + 1) + "";
        }
        // 好友名字
        var name = data.name;
        if (name.length > 6) {
            name = name.substring(0, 5);
        }
        this.labName.string = name;
        // 分数
        this.labScore.string = data.score;
        var myRankPos = Modules_1.Home.PveRank.myPos || 0;
        // 榜次
        if (myRankPos == itemID + 1) {
            // this.labRank.font = this.ranknum_blue;
            this.labName.node.color = cc.color(37, 88, 165, 255);
            this.labScore.node.color = cc.color(37, 88, 165, 255);
            this.nodBg_1.active = false;
            this.nodBg_2.active = true;
        }
        else {
            // this.labRank.font = this.ranknum_red;
            this.labName.node.color = cc.color(186, 70, 25, 255);
            this.labScore.node.color = cc.color(186, 70, 25, 255);
            this.nodBg_1.active = true;
            this.nodBg_2.active = false;
        }
    };
    RankItem.prototype.setMyRank = function (rankNum) {
        if (rankNum == 0) {
            this.medal_1.active = true;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        }
        else if (rankNum == 1) {
            this.medal_1.active = false;
            this.medal_2.active = true;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        }
        else if (rankNum == 2) {
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = true;
            this.labRank.node.active = false;
        }
        else {
            // 排名
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = true;
            this.labRank.string = (rankNum + 1) + "";
            this.labName.node.color = cc.color(37, 88, 165, 255);
            this.labScore.node.color = cc.color(37, 88, 165, 255);
        }
    };
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "medal_1", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "medal_2", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "medal_3", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labRank", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labName", void 0);
    __decorate([
        property(cc.Label)
    ], RankItem.prototype, "labScore", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "nodBg_1", void 0);
    __decorate([
        property(cc.Node)
    ], RankItem.prototype, "nodBg_2", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], RankItem.prototype, "ranknum_blue", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], RankItem.prototype, "ranknum_red", void 0);
    RankItem = __decorate([
        ccclass
    ], RankItem);
    return RankItem;
}(cc.Component));
exports.default = RankItem;

cc._RF.pop();