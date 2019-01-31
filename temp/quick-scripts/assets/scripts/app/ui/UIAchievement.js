(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIAchievement.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cbbd5NMTPVJ66VCz/BUGYOp', 'UIAchievement', __filename);
// scripts/app/ui/UIAchievement.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var SocialManager_1 = require("../common/social/SocialManager");
var Misc = require("../common/Misc");
var PlayDefine_1 = require("../component/game/PlayDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIAchievement = /** @class */ (function (_super) {
    __extends(UIAchievement, _super);
    function UIAchievement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headFrame = null;
        _this.labName = null;
        _this.spHoner = null; // honer.
        _this.pStartNode = null; // 星数
        _this.sprMale = null;
        _this.sprFemale = null;
        _this.pShareBtn = null; // 分享
        _this.pCloseLabel = null; // 返回
        _this.gameCountLabel = null;
        _this.rateofWinLabel = null;
        _this.rateofWinOneWeekLabel = null;
        _this.successiveWinLabel = null;
        _this.matchOnceLabel = null;
        _this.saveOnceLabel = null;
        _this.pveTotal = null;
        _this.pveWin = null;
        _this.pveAchievement = null;
        _this.pvpAchievement = null;
        return _this;
    }
    UIAchievement.prototype.onLoad = function () {
        var _this = this;
        // 玩家星数
        var self = this;
        var nStarNum = Modules_1.Home.DataPlayer.FortuneStar;
        var honerId = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            self.spHoner.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });
        var showStarNum = Misc.calcShowStarCount(nStarNum);
        for (var i = 1; i <= showStarNum; i++) {
            this.pStartNode.getChildByName("" + i).active = true;
        }
        // // 头像
        // Misc.showHeadImg(this.pHeadNode, Modules.Home.DataPlayer.MyId, Modules.Home.DataPlayer.MyHeadUrl);
        cc.loader.loadRes("prefab/play/PlayPlaymateHead", cc.Prefab, function (err, prefab) {
            var nodItem = cc.instantiate(prefab);
            nodItem.parent = _this.headFrame;
            nodItem.setPosition(0, 0);
            var playmateHead = nodItem.getComponent("PlayPlaymateHead");
            playmateHead.setPlaymate(Modules_1.Home.DataPlayer.MyHeadUrl);
            playmateHead.setColorFrame(PlayDefine_1.PlaySide.RED);
            playmateHead.setScale(1.2);
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        });
        // 玩家名字
        this.labName.string = Modules_1.Play.DataPlay.MyName;
        if (Modules_1.Home.DataPlayer.MySex == 1) {
            this.sprMale.active = true;
            this.sprFemale.active = false;
        }
        else {
            this.sprMale.active = false;
            this.sprFemale.active = true;
        }
        // 单周对局胜率
        if (Modules_1.Home.DataPlayer.PlayWeeklyTotal === 0) {
            this.rateofWinOneWeekLabel.string = "0";
        }
        else {
            var winPercent = Modules_1.Home.DataPlayer.PlayWeeklyWin / Modules_1.Home.DataPlayer.PlayWeeklyTotal;
            this.rateofWinOneWeekLabel.string = Misc.formatPercent(winPercent);
        }
        if (Modules_1.Home.DataPlayer.PlayCntTotal === 0) {
            this.rateofWinLabel.string = "0";
        }
        else {
            var winPercent = Modules_1.Home.DataPlayer.PlayCntWin / Modules_1.Home.DataPlayer.PlayCntTotal;
            this.rateofWinLabel.string = Misc.formatPercent(winPercent);
        }
        // pve成功率
        if (Modules_1.Home.DataPlayer.PlayPveTotal === 0) {
            this.pveWin.string = "0";
        }
        else {
            var winPercent = Modules_1.Home.DataPlayer.PlayPveWin / Modules_1.Home.DataPlayer.PlayPveTotal;
            this.pveWin.string = Misc.formatPercent(winPercent);
        }
        this.matchOnceLabel.string = "" + Modules_1.Home.DataPlayer.PlayMatchOnce;
        this.saveOnceLabel.string = "" + Modules_1.Home.DataPlayer.PlaySaveOnce;
        this.pveTotal.string = "" + Modules_1.Home.DataPlayer.PlayPveTotal;
        this.gameCountLabel.string = "" + Modules_1.Home.DataPlayer.PlayCntTotal;
        this.successiveWinLabel.string = "" + Modules_1.Home.DataPlayer.MaxSuccessiveWin;
    };
    UIAchievement.prototype.start = function () {
    };
    // 分享按钮
    UIAchievement.prototype.shareBtn = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var param = SocialManager_1.default.INSTANCE.makeFlauntParam();
        window['Partner'].doFlaunt(param, function (time) {
        });
    };
    // 返回按钮
    UIAchievement.prototype.closeBtn = function () {
        var _this = this;
        GamePersist_1.default.INSTANCE.btnAudio_2();
        GamePersist_1.default.INSTANCE.panelFadeOut(this.node, function () {
            _this.node.active = false;
            _this.node.destroy();
            _this.showHomeAd();
        });
    };
    UIAchievement.prototype.showHomeAd = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].showHomeAd();
        }
    };
    // 显示pve模式的成就
    UIAchievement.prototype.showPve = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.pvpAchievement.node.active = false;
        this.pveAchievement.node.active = true;
    };
    // 显示pvp模式的成就
    UIAchievement.prototype.showPvp = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.pveAchievement.node.active = false;
        this.pvpAchievement.node.active = true;
    };
    __decorate([
        property(cc.Node)
    ], UIAchievement.prototype, "headFrame", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "labName", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIAchievement.prototype, "spHoner", void 0);
    __decorate([
        property(cc.Node)
    ], UIAchievement.prototype, "pStartNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIAchievement.prototype, "sprMale", void 0);
    __decorate([
        property(cc.Node)
    ], UIAchievement.prototype, "sprFemale", void 0);
    __decorate([
        property(cc.Button)
    ], UIAchievement.prototype, "pShareBtn", void 0);
    __decorate([
        property(cc.Button)
    ], UIAchievement.prototype, "pCloseLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "gameCountLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "rateofWinLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "rateofWinOneWeekLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "successiveWinLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "matchOnceLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "saveOnceLabel", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "pveTotal", void 0);
    __decorate([
        property(cc.Label)
    ], UIAchievement.prototype, "pveWin", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIAchievement.prototype, "pveAchievement", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIAchievement.prototype, "pvpAchievement", void 0);
    UIAchievement = __decorate([
        ccclass
    ], UIAchievement);
    return UIAchievement;
}(cc.Component));
exports.default = UIAchievement;

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
        //# sourceMappingURL=UIAchievement.js.map
        