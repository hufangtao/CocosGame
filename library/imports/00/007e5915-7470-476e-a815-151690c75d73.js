"use strict";
cc._RF.push(module, '007e5kVdHBHbqgVFRaQx11z', 'RankTopThreePlayer');
// scripts/app/component/page/home/prefab/RankTopThreePlayer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Misc = require("../../../../common/Misc");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankTopThreePlayer = /** @class */ (function (_super) {
    __extends(RankTopThreePlayer, _super);
    function RankTopThreePlayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textHonor = null;
        _this.textName = null;
        _this.nodeHead = null;
        _this.imgMale = null;
        _this.imgFemale = null;
        return _this;
    }
    RankTopThreePlayer_1 = RankTopThreePlayer;
    RankTopThreePlayer.GetComponent = function (node) {
        return node.getComponent(RankTopThreePlayer_1);
    };
    RankTopThreePlayer.prototype.start = function () {
    };
    RankTopThreePlayer.prototype.setEmpty = function () {
        console.log("enter set setEmpty Player===========================");
        this.imgFemale.node.active = false;
        this.imgMale.node.active = false;
        this.nodeHead.active = false;
        this.textHonor.string = "";
        this.textName.string = "";
    };
    RankTopThreePlayer.prototype.setRankPlayer = function (playerStar) {
        console.log("enter set Rank Player===========================");
        this.nodeHead.active = true;
        var headImg = playerStar.headImg;
        var playerId = playerStar.id;
        var playStar = playerStar.star;
        Misc.showHeadImg(this.nodeHead, playerId, headImg);
        this.textName.string = playerStar.name;
        this.textHonor.string = Misc.getGradeName(playStar);
        var isMale = playerStar.sex === 1;
        this.imgFemale.node.active = !isMale;
        this.imgMale.node.active = isMale;
    };
    __decorate([
        property(cc.Label)
    ], RankTopThreePlayer.prototype, "textHonor", void 0);
    __decorate([
        property(cc.Label)
    ], RankTopThreePlayer.prototype, "textName", void 0);
    __decorate([
        property(cc.Node)
    ], RankTopThreePlayer.prototype, "nodeHead", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankTopThreePlayer.prototype, "imgMale", void 0);
    __decorate([
        property(cc.Sprite)
    ], RankTopThreePlayer.prototype, "imgFemale", void 0);
    RankTopThreePlayer = RankTopThreePlayer_1 = __decorate([
        ccclass
    ], RankTopThreePlayer);
    return RankTopThreePlayer;
    var RankTopThreePlayer_1;
}(cc.Component));
exports.default = RankTopThreePlayer;

cc._RF.pop();