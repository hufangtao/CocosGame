(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIRank.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '27ff99kZ4RGaJAaABVwE/a0', 'UIRank', __filename);
// scripts/app/ui/UIRank.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../common/Message");
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var Defines_1 = require("../common/Defines");
var NetUtil_1 = require("../common/net/NetUtil");
var ProtoSectionRank_1 = require("../common/net/proto/mods/ProtoSectionRank");
var RankTopThreePlayer_1 = require("../component/page/home/prefab/RankTopThreePlayer");
var SocialManager_1 = require("../common/social/SocialManager");
var Misc = require("../common/Misc");
var ConfigVO = require("../common/config/vo/ConfigVO");
var DYNotify_1 = require("../../dyGame/DYNotify");
var ProtoType_1 = require("../common/net/proto/ProtoType");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var kkRankType;
(function (kkRankType) {
    kkRankType[kkRankType["Friend"] = 1] = "Friend";
    kkRankType[kkRankType["Global"] = 2] = "Global";
})(kkRankType || (kkRankType = {}));
var UIRank = /** @class */ (function (_super) {
    __extends(UIRank, _super);
    function UIRank() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeGlobalContainer = null; // 全服排行榜容器
        _this.pGlobalFirstNode = null;
        _this.pGlobalSecondNode = null;
        _this.pGlobalThirdNode = null;
        _this.pGlobalRankList = null; // 全服排行list面板
        _this.pInRankNode = null; // 在排名中
        _this.textGlobalRankPos = null; // 上榜榜次
        _this.textOutsideGlobalRank = null; // 未上榜提示
        _this.pNobodyLabel = null; // 没有内容时的提示
        _this.nodNotSupport = null; // 不支持的功能
        _this.nodFriendRank = null;
        _this.isShowFriendRank = false;
        return _this;
    }
    UIRank_1 = UIRank;
    UIRank.GetComponent = function (node) {
        return node.getComponent(UIRank_1);
    };
    UIRank.prototype.onLoad = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.UIRankUpdate, this.onNotify, this);
    };
    UIRank.prototype.init = function () {
        this.requestRankData();
        if (window['Partner'].supportSocialFriend() && window["wx"]) {
            this.initDisplay();
        }
    };
    UIRank.prototype.onEnable = function () {
    };
    UIRank.prototype.onDisable = function () {
        this.isShowFriendRank = false;
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    UIRank.prototype.initDisplay = function () {
        var openDataContext = window["wx"].getOpenDataContext();
        var sharedCanvas = openDataContext.canvas;
        sharedCanvas.width = 720;
        sharedCanvas.height = 1280;
    };
    UIRank.prototype.onDestroy = function () {
        Modules_1.Home.DataRank.GlobalRankData = null;
    };
    // 关闭当前页面
    UIRank.prototype.closeLayerBtn = function () {
        var _this = this;
        GamePersist_1.default.INSTANCE.btnAudio_2();
        GamePersist_1.default.INSTANCE.panelFadeOut(this.node, function () {
            _this.node.active = false;
            _this.node.destroy();
            _this.showHomeAd();
        });
    };
    UIRank.prototype.showHomeAd = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].showHomeAd();
        }
    };
    // 好友和全服排行切换按钮
    UIRank.prototype.radioButtonClicked = function (toggle, customEventData) {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        if (customEventData === "2") {
            this.showFriendRank();
        }
        else if (customEventData === "1") {
            if (Modules_1.Home.DataRank.GlobalRankData && Modules_1.Home.DataRank.GlobalRankData.length > 0) {
                this.showGlobalRank();
            }
            else {
                this.requestRankData();
            }
        }
    };
    // 查看好友排行
    UIRank.prototype.showFriendRank = function () {
        if (this.rankType === kkRankType.Friend) {
            return;
        }
        this.rankType = kkRankType.Friend;
        this.hideGlobalRank();
        // 是否支持好友排行榜
        if (!window['Partner'].supportSocialFriend()) {
            this.showNotSupport();
            return;
        }
        // qqplay 排行榜特殊处理
        if (window['Partner'].PARTNER_NAME == 'qqplay') {
            window['Partner'].getRankList(this.showFriendDateRank.bind(this));
            return;
        }
        //qqplay 排行榜特殊处理
        window['Partner'].postMsg(2, { valuekey: Defines_1.ValueKey.gameRate });
        this.nodFriendRank.active = true;
        this.isShowFriendRank = true;
    };
    UIRank.prototype.showFriendDateRank = function (data) {
        console.log("enter friend data rank==============================");
        console.log("  ===================data11:" + JSON.stringify(data));
        var friendData = new Array();
        for (var i = 0; i < data.data.ranking_list.length; ++i) {
            var rd = data.data.ranking_list[i];
            var obj = new ProtoType_1.PStarRank();
            obj.id = 1;
            obj.name = rd.nick;
            obj.headImg = rd.url + "?aa=aa.jpg";
            obj.sex = 1;
            obj.star = parseInt(rd.score / 10000 + "");
            obj.rateOfWin = (rd.score % 10000) / 100;
            friendData.push(obj);
            if (rd.selfFlag) {
                Modules_1.Home.DataRank.FriendRankMyRank = i + 1;
            }
        }
        Modules_1.Home.DataRank.FriendRankData = friendData;
        console.log("  ===================data22:" + JSON.stringify(Modules_1.Home.DataRank.FriendRankData));
        this.rankType = kkRankType.Friend;
        this.nodFriendRank.active = false;
        this.nodNotSupport.active = false;
        this.nodeGlobalContainer.active = true;
        // 没有玩家时
        var vecRankData = Modules_1.Home.DataRank.FriendRankData;
        if (!vecRankData || vecRankData.length <= 0) {
            this.showNobody();
            return;
        }
        // 获取list内容节点,如果节点数>0，就暴利认为已经加载过
        var pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
        var nChildCount = pListConetn.childrenCount;
        if (nChildCount > 0) {
            console.log("nChildCount > 0 ==============================");
            pListConetn.removeAllChildren();
        }
        this.fillGlobalRank();
        // 自己的信息
        this.myRankInfo(kkRankType.Friend);
    };
    // 通知进行隐藏
    UIRank.prototype.hideMirrorRank = function () {
        var domainMsg = {};
        domainMsg.name = "HideRank";
        window['Partner'].sendDomainMsg(domainMsg);
    };
    // 通知进行关闭
    UIRank.prototype.closeMirrorRank = function () {
        // const domainMsg: any = {};
        // domainMsg.name = "CloseRank";
        // Partner.sendDomainMsg(domainMsg);
    };
    // 查看全服排行
    UIRank.prototype.showGlobalRank = function () {
        if (this.rankType === kkRankType.Global) {
            return;
        }
        this.rankType = kkRankType.Global;
        this.hideFriendRank();
        this.nodNotSupport.active = false;
        this.nodeGlobalContainer.active = true;
        // 没有玩家时
        var vecRankData = Modules_1.Home.DataRank.GlobalRankData;
        if (!vecRankData || vecRankData.length <= 0) {
            this.showNobody();
            return;
        }
        // 获取list内容节点,如果节点数>0，就暴利认为已经加载过
        var pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
        var nChildCount = pListConetn.childrenCount;
        if (nChildCount > 0) {
            pListConetn.removeAllChildren();
        }
        this.fillGlobalRank();
        // 自己的信息
        this.myRankInfo(kkRankType.Global);
    };
    // 请求数据
    UIRank.prototype.requestRankData = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        var rankDataReq = new ProtoSectionRank_1.RankPlayStarC2S();
        rankDataReq.posStart = 1;
        rankDataReq.posEnd = 50;
        NetUtil_1.default.SendMsg(rankDataReq);
    };
    // 返回数
    UIRank.prototype.onReceiveRankData = function () {
        GamePersist_1.default.INSTANCE.CancelWaiting();
        this.showGlobalRank();
    };
    UIRank.prototype.fillGlobalRank = function () {
        console.log("enter fill in global rank============================");
        var rankList = Modules_1.Home.DataRank.GlobalRankData;
        if (this.rankType == kkRankType.Friend) {
            rankList = Modules_1.Home.DataRank.FriendRankData;
        }
        console.log("  ===================data:" + rankList.length + "========" + JSON.stringify(rankList));
        this.getComponent('ListView').showRank(rankList);
        // 前3名
        var topThree = 0;
        for (var i = 0; i < rankList.length; i++) {
            console.log("set rank===============================");
            var rankIdx = i + 1;
            topThree = rankIdx;
            if (rankIdx === 1) {
                var firstPlayer = RankTopThreePlayer_1.default.GetComponent(this.pGlobalFirstNode);
                firstPlayer.setRankPlayer(rankList[i]);
                console.log("first set rank");
            }
            else if (rankIdx === 2) {
                var secondPlayer = RankTopThreePlayer_1.default.GetComponent(this.pGlobalSecondNode);
                secondPlayer.setRankPlayer(rankList[i]);
                console.log("secondPlayer set rank");
            }
            else if (rankIdx === 3) {
                var thirdPlayer = RankTopThreePlayer_1.default.GetComponent(this.pGlobalThirdNode);
                thirdPlayer.setRankPlayer(rankList[i]);
                console.log("thirdPlayer set rank");
            }
            else {
                break;
            }
        }
        topThree = topThree + 1;
        for (topThree; topThree <= 3; topThree++) {
            if (topThree === 1) {
                var firstPlayer = RankTopThreePlayer_1.default.GetComponent(this.pGlobalFirstNode);
                firstPlayer.setEmpty();
                console.log("first set setEmpty");
            }
            else if (topThree === 2) {
                var secondPlayer = RankTopThreePlayer_1.default.GetComponent(this.pGlobalSecondNode);
                secondPlayer.setEmpty();
                console.log("secondPlayer set setEmpty");
            }
            else if (topThree === 3) {
                var thirdPlayer = RankTopThreePlayer_1.default.GetComponent(this.pGlobalThirdNode);
                thirdPlayer.setEmpty();
                console.log("thirdPlayer set setEmpty");
            }
        }
        var pListConetn = cc.find("rank_list/view/content", this.pGlobalRankList);
        if (!pListConetn) {
            cc.error("can't find rank list content");
            return;
        }
    };
    // 自己的排行
    UIRank.prototype.myRankInfo = function (type) {
        var myRankPos = Modules_1.Home.DataRank.MyRank || 0;
        if (this.rankType == kkRankType.Friend) {
            myRankPos = Modules_1.Home.DataRank.FriendRankMyRank || 0;
        }
        // 榜次
        if (myRankPos === 0) {
            // 显示未上榜
            this.textOutsideGlobalRank.active = true;
            this.pInRankNode.getChildByName("randNumBg_sp").active = false;
        }
        else {
            this.textGlobalRankPos.string = "" + myRankPos;
        }
        // 名字
        var pNameLabel = this.pInRankNode.getChildByName("name_label").getComponent(cc.Label);
        pNameLabel.string = Modules_1.Play.DataPlay.MyName;
        // 段位
        var myStar = Modules_1.Home.DataPlayer.FortuneStar;
        var StarNum = Misc.calcShowStarCount(myStar);
        var pGradeLabel = this.pInRankNode.getChildByName("grade_label").getComponent(cc.Label);
        pGradeLabel.string = Misc.getGradeName(myStar) + " " + StarNum + "星";
        // 胜率
        var pRateofWinLabel = this.pInRankNode.getChildByName("winrate_label").getComponent(cc.Label);
        if (Modules_1.Home.DataPlayer.PlayCntTotal === 0) {
            pRateofWinLabel.string = "0";
        }
        else {
            var winPercent = Modules_1.Home.DataPlayer.PlayCntWin / Modules_1.Home.DataPlayer.PlayCntTotal;
            pRateofWinLabel.string = Misc.formatPercent(winPercent);
        }
    };
    // 没有人上榜
    UIRank.prototype.showNobody = function () {
        this.nodeGlobalContainer.active = false;
        this.pNobodyLabel.node.active = true;
    };
    UIRank.prototype.showNotSupport = function () {
        this.nodeGlobalContainer.active = false;
        this.pNobodyLabel.node.active = false;
        this.nodNotSupport.active = true;
    };
    UIRank.prototype.hideGlobalRank = function () {
        this.nodeGlobalContainer.active = false;
    };
    UIRank.prototype.hideFriendRank = function () {
        this.nodFriendRank.active = false;
        this.isShowFriendRank = false;
    };
    UIRank.prototype.gatherHonorConf = function () {
        var honorConf = {};
        var rangeList = ConfigVO.Honor.getExtra("range");
        honorConf.range = rangeList;
        var honorNameMap = {};
        for (var i = 0; i < rangeList.length; i++) {
            var range = rangeList[i];
            var honorId = range[0];
            var sysHonor = ConfigVO.Honor.get(honorId);
            var honorName = sysHonor.name;
            honorNameMap[honorId] = honorName;
        }
        honorConf.name = honorNameMap;
        var maxStarList = ConfigVO.Honor.getExtra("max_star");
        var maxStar = maxStarList[0];
        honorConf.maxStar = maxStar;
        return honorConf;
    };
    // 分享按钮
    UIRank.prototype.shareBtn = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var param = SocialManager_1.default.INSTANCE.makeFlauntParam();
        window['Partner'].doFlaunt(param, function () {
        });
    };
    // 广告
    UIRank.prototype.showAdBtn = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        if (window['Partner'].supportAd()) {
            window['Partner'].initVideoAd(function () {
                window['Partner'].videoAd = null;
            });
            window['Partner'].showVideoAd();
        }
        else {
        }
    };
    UIRank.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.UIRankUpdate) {
            self.onReceiveRankData();
        }
    };
    var UIRank_1;
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "nodeGlobalContainer", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "pGlobalFirstNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "pGlobalSecondNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "pGlobalThirdNode", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "pGlobalRankList", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "pInRankNode", void 0);
    __decorate([
        property(cc.Label)
    ], UIRank.prototype, "textGlobalRankPos", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "textOutsideGlobalRank", void 0);
    __decorate([
        property(cc.Label)
    ], UIRank.prototype, "pNobodyLabel", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "nodNotSupport", void 0);
    __decorate([
        property(cc.Node)
    ], UIRank.prototype, "nodFriendRank", void 0);
    UIRank = UIRank_1 = __decorate([
        ccclass
    ], UIRank);
    return UIRank;
}(cc.Component));
exports.default = UIRank;

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
        //# sourceMappingURL=UIRank.js.map
        