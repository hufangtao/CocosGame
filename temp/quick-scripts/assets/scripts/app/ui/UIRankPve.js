(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIRankPve.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'a31e3fzSFxHi6kk83rXFl5T', 'UIRankPve', __filename);
// scripts/app/ui/UIRankPve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Defines_1 = require("../common/Defines");
var ProtoSectionRank_1 = require("../common/net/proto/mods/ProtoSectionRank");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var Modules_1 = require("../module/Modules");
var DYNotify_1 = require("../../dyGame/DYNotify");
var Message_1 = require("../common/Message");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankPve = /** @class */ (function (_super) {
    __extends(RankPve, _super);
    function RankPve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pListItem = null; // 排行item
        _this.nodeGlobalContainer = null; // 全服排行榜容器
        _this.pGlobalRankList = null; // 全服排行list面板
        _this.nodFriendToggle = null;
        _this.nodGlobalToggle = null;
        _this.pInRankNode = null; // 在排名中
        _this.textGlobalRankPos = null; // 上榜榜次
        _this.textOutsideGlobalRank = null; // 未上榜提示
        _this.pNobodyLabel = null; // 没有内容时的提示
        return _this;
    }
    RankPve.prototype.onLoad = function () {
        this.nodFriendToggle.on('click', this.onFriendRank, this);
        this.nodGlobalToggle.on('click', this.onGlobalRank, this);
    };
    RankPve.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.RANK_RESULT, this.onNotify, this);
        this.nodGlobalToggle.getComponent(cc.Toggle).isChecked = true;
        this.nodFriendToggle.getComponent(cc.Toggle).isChecked = false;
        this.showRank();
        this.pNobodyLabel.node.active = false;
    };
    RankPve.prototype.onFriendRank = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        // 是否支持好友排行榜
        if (!window['Partner'].supportSocialFriend()) {
            this.showNotSupport();
            return;
        }
        window['Partner'].postMsg(1, { valuekey: Defines_1.ValueKey.levelScore });
        this.node.getChildByName('nodFriendRank').active = true;
        this.nodeGlobalContainer.active = false;
        this.node.getChildByName('nodNotSupport').active = false;
        this.node.getChildByName('nobodyLabel').active = false;
        this.isShowFriendRank = true;
    };
    RankPve.prototype.onGlobalRank = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.nodeGlobalContainer.active = true;
        this.node.getChildByName('nodNotSupport').active = false;
        this.node.getChildByName('nodFriendRank').active = false;
        this.isShowFriendRank = false;
    };
    RankPve.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.RANK_RESULT) {
            if (param.level == Modules_1.Play.DataPve.curLevel) {
                Modules_1.Home.PveRank = param;
                self.showGlobalRank();
            }
        }
    };
    RankPve.prototype.start = function () {
    };
    RankPve.prototype.onDisable = function () {
        var pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
        pListConetn.destroyAllChildren();
        this.nodeGlobalContainer.active = true;
        this.node.getChildByName('nodFriendRank').active = false;
        this.isShowFriendRank = false;
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    RankPve.prototype.showRank = function () {
        var rankDataReq = new ProtoSectionRank_1.RankPveRankC2S();
        rankDataReq.level = Modules_1.Play.DataPve.curLevel;
        rankDataReq.posStart = 1;
        rankDataReq.posEnd = 10;
        NetUtil_1.default.SendMsg(rankDataReq);
    };
    // 查看全服排行
    RankPve.prototype.showGlobalRank = function () {
        this.nodeGlobalContainer.active = true;
        this.node.getChildByName('nodNotSupport').active = false;
        var pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
        pListConetn.destroyAllChildren();
        cc.log(Modules_1.Home.PveRank.playmates);
        // 没有玩家时
        var vecRankData = Modules_1.Home.PveRank.playmates;
        if (!vecRankData || vecRankData.length <= 0) {
            this.showNobody();
            return;
        }
        this.fillGlobalRank();
    };
    RankPve.prototype.fillGlobalRank = function () {
        var rankList = Modules_1.Home.PveRank.playmates;
        this.getComponent('ListView').showRank(rankList);
    };
    // 没有人上榜
    RankPve.prototype.showNobody = function () {
        this.nodeGlobalContainer.active = false;
        this.node.getChildByName('nodNotSupport').active = false;
        this.node.getChildByName('nobodyLabel').active = true;
    };
    RankPve.prototype.showNotSupport = function () {
        this.nodeGlobalContainer.active = false;
        this.node.getChildByName('nodNotSupport').active = true;
    };
    __decorate([
        property(cc.Prefab)
    ], RankPve.prototype, "pListItem", void 0);
    __decorate([
        property(cc.Node)
    ], RankPve.prototype, "nodeGlobalContainer", void 0);
    __decorate([
        property(cc.Node)
    ], RankPve.prototype, "pGlobalRankList", void 0);
    __decorate([
        property(cc.Node)
    ], RankPve.prototype, "nodFriendToggle", void 0);
    __decorate([
        property(cc.Node)
    ], RankPve.prototype, "nodGlobalToggle", void 0);
    __decorate([
        property(cc.Node)
    ], RankPve.prototype, "pInRankNode", void 0);
    __decorate([
        property(cc.Label)
    ], RankPve.prototype, "textGlobalRankPos", void 0);
    __decorate([
        property(cc.Label)
    ], RankPve.prototype, "textOutsideGlobalRank", void 0);
    __decorate([
        property(cc.Label)
    ], RankPve.prototype, "pNobodyLabel", void 0);
    RankPve = __decorate([
        ccclass
    ], RankPve);
    return RankPve;
}(cc.Component));
exports.default = RankPve;

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
        //# sourceMappingURL=UIRankPve.js.map
        