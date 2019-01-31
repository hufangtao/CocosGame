(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/home/HomeUI.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'af37aLC1sVFG4FoKsW5aAxo', 'HomeUI', __filename);
// scripts/app/component/page/home/HomeUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseUI_1 = require("../../BaseUI");
var HomeManager_1 = require("./HomeManager");
var Loader_1 = require("../../../common/loader/Loader");
var ProtoSectionRoom_1 = require("../../../common/net/proto/mods/ProtoSectionRoom");
var NetController_1 = require("../../../common/net/NetController");
var Modules = require("../../../module/Modules");
var Defines_1 = require("../../../common/Defines");
var RuntimeManager_1 = require("../../../common/runtime/RuntimeManager");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var Modules_1 = require("../../../module/Modules");
var ProtoSectionPlayer_1 = require("../../../common/net/proto/mods/ProtoSectionPlayer");
var NetUtil_1 = require("../../../common/net/NetUtil");
var PlayManager_1 = require("../../game/PlayManager");
var DYAudio_1 = require("../../../../dyGame/DYAudio");
var ProtoType_1 = require("../../../common/net/proto/ProtoType");
var RoomDefine_1 = require("./RoomDefine");
var UIFunc_1 = require("../../../common/UIFunc");
var Message_1 = require("../../../common/Message");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var ProtoSectionSignIn_1 = require("../../../common/net/proto/mods/ProtoSectionSignIn");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var HomeUI = /** @class */ (function (_super) {
    __extends(HomeUI, _super);
    function HomeUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.btnStartMatch = null;
        _this.btnStartPVE = null;
        _this.btnInviteFriend = null;
        _this.btnGm = null;
        _this.btnPreview = null;
        _this.btnCommendatory = null;
        _this.nodHead = null;
        _this.pHeadPerfab = null;
        _this.audHomeBg = null;
        _this.labMoneyCount = null;
        _this.energyCount = null;
        _this.energyTimer = null;
        _this.labName = null;
        _this.pointer = null;
        _this.nodAdTip = null;
        return _this;
    }
    HomeUI.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        cc.director.getCollisionManager().enabled = true;
        DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(RoomDefine_1.BuffUpdate, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.Prop = this.node.getChildByName('Hall').getChildByName('Prop').getComponent('Prop');
        this.Prop.init(this);
        this.node.on('touchstart', this.Prop.onSlotClick, this.Prop);
        this.setName();
        this.showADTip();
        Modules_1.Home.DataPlayer.PlayerGoodsDataLast = Modules_1.Home.DataPlayer.PlayerGoodsData;
        HomeManager_1.default.INSTANCE.playerGoodsRequest();
        cc.director.preloadScene('levelChoose');
        window['Partner'].showGameClub();
        HomeManager_1.default.INSTANCE.UIInviteFriend = null;
    };
    HomeUI.prototype.showADTip = function () {
        var _this = this;
        this.nodAdTip.active = true;
        this.scheduleOnce(function () {
            _this.nodAdTip.active = false;
            _this.nodAdTip.parent.getChildByName('btnWatchAd').getComponent(cc.Animation).play('tvShake');
        }, 4.2);
    };
    HomeUI.prototype.hideADTip = function () {
        this.nodAdTip.active = false;
        this.pointer.active = false;
    };
    // 设置用户名
    HomeUI.prototype.setName = function () {
        this.labName.string = Modules.Play.DataPlay.MyName;
    };
    HomeUI.prototype.onEnable = function () {
        this.updateMmoney();
    };
    HomeUI.prototype.updateMmoney = function () {
        this.labMoneyCount.string = Modules_1.Home.DataPlayer.FortuneGold + '';
    };
    HomeUI.prototype.onDisable = function () {
        cc.director.getCollisionManager().enabled = false;
    };
    HomeUI.prototype.start = function () {
        _super.prototype.start.call(this);
        PlayManager_1.default.INSTANCE.PlayUI = null;
        PlayManager_1.default.INSTANCE.PlayUIPve = null;
        HomeManager_1.default.INSTANCE.HomeUI = this;
        Modules.Home.DataPlayer.IsMatching = false;
        this.btnPreview.node.active = false;
        // 如果当前网络没有连接 则重新连接
        if (!NetController_1.default.INSTANCE.Connected) {
            NetController_1.default.INSTANCE.onSocketClose();
            return;
        }
        if (Modules.Home.OpenHomeFrom === Defines_1.OpenHomeFrom.UI_LOGIN) {
            var reLaunchOptions = RuntimeManager_1.default.INSTANCE.ReLaunchOptions;
            if (reLaunchOptions && reLaunchOptions.query && reLaunchOptions.query.inviter) {
                HomeManager_1.default.INSTANCE.showInvitePanelAsInvitee(reLaunchOptions.query.inviter);
            }
            else {
                var pathParams = window['Partner'].getLaunchQuery();
                if (pathParams.inviter) {
                    HomeManager_1.default.INSTANCE.showInvitePanelAsInvitee(pathParams.inviter);
                }
            }
        }
        else if (Modules.Home.OpenHomeFrom === Defines_1.OpenHomeFrom.UI_PLAY) {
            // const reLaunchOptions = RuntimeManager.INSTANCE.ReLaunchOptions;
            // if (reLaunchOptions && reLaunchOptions.query && reLaunchOptions.query.inviter) {
            //     HomeManager.INSTANCE.showInvitePanelAsInvitee(reLaunchOptions.query.inviter);
            // }
        }
        else if (Modules.Home.OpenHomeFrom === Defines_1.OpenHomeFrom.UI_AIFIN) {
            // if (Home.DataRoom.OpponentId === 1) {
            //     this.handleStartMatch();
            // }
        }
        this.tex = new cc.Texture2D();
        var displayNode = new cc.Node();
        displayNode.parent = this.node;
        this.display = displayNode.addComponent(cc.Sprite);
        this.display.node.setPosition(0, 0);
        this.display.node.zIndex = (100);
        this.display.node.active = false;
        if (Modules.Home.DataPlayer.Guide == 0) {
            this.activePvpTeach();
        }
        else {
            if (Modules.Home.OpenHomeFrom === Defines_1.OpenHomeFrom.UI_GUIDE) {
                // console.log("open home from ui UI_GUIDE");
                // this.showGuideHand();
            }
            // this.notifySignList();
            this.showHead();
            DYAudio_1.default.playMusic(this.audHomeBg, true);
            this.Prop.showHomeAd();
            GamePersist_1.default.INSTANCE.onLoadSceneEnd();
        }
    };
    HomeUI.prototype.onLoadSceneEnd = function () {
    };
    HomeUI.prototype.showGuideHand = function () {
        this.pointer.active = true;
        this.pointer.getComponent(cc.Animation).play("aniGuide");
    };
    HomeUI.prototype.showHead = function () {
        var pHeadNode = cc.instantiate(this.pHeadPerfab);
        pHeadNode.setPosition(0, 0);
        pHeadNode.parent = this.nodHead;
        var playmateHead = pHeadNode.getComponent("PlaymateHead");
        playmateHead.HeadUrl = Modules.Home.DataPlayer.MyHeadUrl;
    };
    HomeUI.prototype.activePvpTeach = function () {
        // this.LayerMatch.active = true;
        var opponentPlaymate = new ProtoType_1.PPlaymate();
        opponentPlaymate.id = 1;
        opponentPlaymate.name = "我是电脑";
        var head_index = Math.floor((Math.random() + 1) * 5);
        opponentPlaymate.headImg = "head_" + head_index + ".png";
        opponentPlaymate.sex = 1;
        opponentPlaymate.star = 0;
        Modules_1.Home.DataRoom.bluId = Modules.Acc.PlayerId;
        Modules_1.Home.DataRoom.opponentPlaymate = opponentPlaymate;
        GamePersist_1.default.INSTANCE.loadScene("bgStory");
    };
    HomeUI.prototype.activePvpAi = function () {
        // 如果当前没有在匹配状态 直接返回
        if (!Modules.Home.DataPlayer.IsMatching) {
            return;
        }
        // this.LayerMatch.active = true;
        this.scheduleOnce(function () {
            GamePersist_1.default.INSTANCE.loadScene("game", function () {
                PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpAi = true;
                PlayManager_1.default.INSTANCE.newRound(null);
            });
        });
        this.Prop.hideHomeAd();
    };
    HomeUI.prototype.showCommendatoryIcon = function () {
        var _this = this;
        var remoteIcon = Modules.Home.DataPlayer.CommendatoryData[0].push_icon;
        cc.loader.load(remoteIcon, function (err, texture) {
            if (GamePersist_1.default.INSTANCE.RootUI.uiName() === "HomeUI") {
                if (err) {
                    _this.btnCommendatory.node.active = false;
                }
                else {
                    _this.btnCommendatory.node.active = true;
                    var icon = _this.btnCommendatory.node.getChildByName("iconSprite").getComponent(cc.Sprite);
                    icon.spriteFrame = new cc.SpriteFrame(texture);
                }
            }
        });
    };
    HomeUI.prototype.onDestroy = function () {
        cc.director.getScheduler().unscheduleAllForTarget(this);
        DYNotify_1.DYNotify.removeAllObservers(this);
        HomeManager_1.default.INSTANCE.HomeUI = null;
    };
    HomeUI.prototype.uiName = function () {
        return "HomeUI";
    };
    HomeUI.prototype.update = function (dt) {
        var date = new Date();
        var NowSec = parseInt(String(date.getTime() / 1000)) - Modules.Home.TimeOffset;
        var EnergyFullTime = parseInt(Modules.Home.DataPlayer.EnergyFullTime);
        var time = EnergyFullTime - NowSec;
        var Energy = Modules.Home.DataPlayer.FortuneEnergy;
        this.energyCount.string = Energy + "";
        if (EnergyFullTime == 0) {
            this.energyTimer.string = "已满";
            return;
        }
        var nextEnergy = time % 300;
        var min = parseInt(nextEnergy / 60 + "") + "";
        min = min.length > 1 ? min : "0" + min;
        var sec = parseInt(nextEnergy % 60 + "") + "";
        sec = sec.length > 1 ? sec : "0" + sec;
        this.energyTimer.string = min + ":" + sec;
    };
    HomeUI.prototype.handleCancelMatch = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.doCancelMatch();
    };
    HomeUI.prototype.doCancelMatch = function () {
        // 如果当前没有在匹配状态 直接返回
        Modules.Home.DataPlayer.IsMatching = false;
        if (!Modules.Home.DataPlayer.IsMatching) {
            return;
        }
        this.unscheduleAllCallbacks();
        HomeManager_1.default.INSTANCE.makeInvisibleRequest();
    };
    HomeUI.prototype.handleChooseRoom = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                GamePersist_1.default.INSTANCE.ForceWaiting();
                UIFunc_1.UIFunc.openUI('UIChoosePvp', function () {
                    GamePersist_1.default.INSTANCE.CancelWaiting();
                });
                return [2 /*return*/];
            });
        });
    };
    // 邀请好友
    HomeUI.prototype.handleInviteFriend = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.Prop.hideHomeAd();
        // 手动调用取消匹配
        if (Modules.Home.DataPlayer.IsMatching) {
            this.doCancelMatch();
        }
        var inviteReq = new ProtoSectionRoom_1.RoomInviteRequestC2S();
        NetUtil_1.default.SendMsg(inviteReq);
    };
    HomeUI.prototype.handleSign = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UISign', function () {
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    HomeUI.prototype.handleTurntable = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UITurntable', function () {
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    // 设置
    HomeUI.prototype.handleSetting = function () {
        GamePersist_1.default.INSTANCE.toast('暂未开放');
        // HomeManager.INSTANCE.showSettingsPanel();
    };
    // 背包
    HomeUI.prototype.handleBag = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        HomeManager_1.default.INSTANCE.showBagPanel();
    };
    // 排行榜
    HomeUI.prototype.handleRank = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        HomeManager_1.default.INSTANCE.showRankPanel();
    };
    // 商店
    HomeUI.prototype.handleShop = function () {
        GamePersist_1.default.INSTANCE.toast('暂未开放');
        return;
        GamePersist_1.default.INSTANCE.btnAudio_1();
        HomeManager_1.default.INSTANCE.showShopLayer();
    };
    // 个人信息成就
    HomeUI.prototype.handleAchievement = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        HomeManager_1.default.INSTANCE.showAchievementlayer();
    };
    // 当成功匹配的时候
    HomeUI.prototype.onMatchPlayCreate = function () {
        var self = this;
        this.node.getChildByName('UIMatch').getComponent('UIMatch').setOpponentInfo();
    };
    HomeUI.prototype.handleGetServerTime = function (event) {
    };
    HomeUI.prototype.handleGm = function () {
        var self = this;
        Loader_1.default.loadSingle("prefab/home/GmPanel", function (err, gm) {
            var gmNode = cc.instantiate(gm);
            gmNode.parent = self.node;
            gmNode.setPosition(0, 0);
        });
    };
    HomeUI.prototype.handlePreview = function () {
        var self = this;
        window['Partner'].previewImg({});
    };
    HomeUI.prototype.onAppHide = function () {
        if (Modules.Home.DataPlayer.IsMatching) {
            this.handleCancelMatch();
            this.node.getChildByName('UIMatch').getComponent('UIMatch').doCancelMatch();
        }
        window['Partner'].hideHomeAd();
    };
    HomeUI.prototype.handleCommendatory = function () {
        var arrData = Modules.Home.DataPlayer.CommendatoryData;
        var result = [];
        for (var i = 0; i < arrData.length; i++) {
            result.push(arrData[0].push_img);
        }
        window['Partner'].previewImg(result);
    };
    HomeUI.prototype.startPVE = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dataPoint;
            return __generator(this, function (_a) {
                dataPoint = new ProtoSectionPlayer_1.PlayerClickC2S();
                dataPoint.point = 2;
                NetUtil_1.default.SendMsg(dataPoint);
                GamePersist_1.default.INSTANCE.directionScene = 'levelChoose';
                GamePersist_1.default.INSTANCE.loadScene("levelChoose");
                this.Prop.hideHomeAd();
                return [2 /*return*/];
            });
        });
    };
    HomeUI.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 1) {
                return;
            }
            if (param.success === 1) {
                self.showEnergyEmpty(2);
            }
        }
        else if (tag === Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE) {
            this.updateMmoney();
        }
        else if (tag === Message_1.Message.SIGN_List) {
            for (var i = 0; i < param.list.length; ++i) {
                var data = param.list[i];
                if (data.slot != param.now) {
                    continue;
                }
                if (data.signed === 1) {
                    return;
                }
                if (UIFunc_1.UIFunc.findUI('UISign')) {
                    return;
                }
                UIFunc_1.UIFunc.openUI('UISign', function () { });
                DYNotify_1.DYNotify.unregObserver(Message_1.Message.SIGN_List, this.onNotify, this);
            }
        }
    };
    // 请求签到列表
    HomeUI.prototype.notifySignList = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.SIGN_List, this.onNotify, this);
        var signInSignList = new ProtoSectionSignIn_1.SignInSignListC2S();
        NetUtil_1.default.SendMsg(signInSignList);
    };
    HomeUI.prototype.showEnergyEmpty = function (mode) {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIEnergy', function (node) {
            node.getComponent('UIEnergy').setMode(mode);
            GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    // 获得体力
    HomeUI.prototype.getEnergy = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        if (Modules_1.Home.DataPlayer.FortuneEnergy >= 30) {
            GamePersist_1.default.INSTANCE.toast('体力已经满啦');
        }
        else {
            this.showEnergyEmpty(3);
        }
    };
    HomeUI.prototype.startMatch = function () {
        var dataPoint = new ProtoSectionPlayer_1.PlayerClickC2S();
        dataPoint.point = 1;
        NetUtil_1.default.SendMsg(dataPoint);
        Modules_1.Home.OpenHomeFrom = Defines_1.OpenHomeFrom.UI_PLAY;
        Modules_1.Home.DataPlayer.IsMatching = true;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIMatch', function () {
            HomeManager_1.default.INSTANCE.makeMatchRequest(1);
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    HomeUI.prototype.btnListener = function (event) {
        this.pointer.active = false;
        var target = event.target;
        this.Prop.onSlotClick(null);
        switch (target.name) {
            case 'btnBack':
                this.doCancelMatch();
                break;
            case 'btnStartMatch':
                this.handleChooseRoom();
                // this.startMatch();
                break;
            case 'btnInviteFriend':
                this.handleInviteFriend();
                break;
            case 'btnStartPVE':
                this.startPVE();
                break;
            case 'btnShowRank':
                this.handleRank();
                break;
            case 'btnShowShop':
                this.handleShop();
                break;
            case 'btnGm':
                this.handleGm();
                break;
            case 'btnPreview':
                this.handlePreview();
                break;
            case 'btnCommendatory':
                this.handleCommendatory();
                break;
            case 'btnStartPVE':
                this.startPVE();
                break;
            case 'btnSign':
                this.handleSign();
                break;
            case 'btnTurntable':
                this.handleTurntable();
                break;
            case 'BtnSetting':
                this.handleSetting();
                break;
            case 'BtnRank':
                this.Prop.hideHomeAd();
                this.handleRank();
                break;
            case 'BtnBag':
                this.handleBag();
                break;
            case 'BtnShop':
                this.handleShop();
                break;
            case 'BtnScore':
                this.Prop.hideHomeAd();
                this.handleAchievement();
                break;
            case 'btnGetEnergy':
                this.getEnergy();
                break;
            case 'btnAddCoin':
                this.loadUIGetCoin();
                break;
        }
    };
    // 加载获取金币窗口
    HomeUI.prototype.loadUIGetCoin = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIGetCoin', function (node) {
            GamePersist_1.default.INSTANCE.CancelWaiting();
            node.getComponent('UIGetCoin').setType(2);
        });
    };
    __decorate([
        property(cc.Node)
    ], HomeUI.prototype, "btnStartMatch", void 0);
    __decorate([
        property(cc.Node)
    ], HomeUI.prototype, "btnStartPVE", void 0);
    __decorate([
        property(cc.Button)
    ], HomeUI.prototype, "btnInviteFriend", void 0);
    __decorate([
        property(cc.Button)
    ], HomeUI.prototype, "btnGm", void 0);
    __decorate([
        property(cc.Button)
    ], HomeUI.prototype, "btnPreview", void 0);
    __decorate([
        property(cc.Button)
    ], HomeUI.prototype, "btnCommendatory", void 0);
    __decorate([
        property(cc.Node)
    ], HomeUI.prototype, "nodHead", void 0);
    __decorate([
        property(cc.Prefab)
    ], HomeUI.prototype, "pHeadPerfab", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], HomeUI.prototype, "audHomeBg", void 0);
    __decorate([
        property(cc.Label)
    ], HomeUI.prototype, "labMoneyCount", void 0);
    __decorate([
        property(cc.Label)
    ], HomeUI.prototype, "energyCount", void 0);
    __decorate([
        property(cc.Label)
    ], HomeUI.prototype, "energyTimer", void 0);
    __decorate([
        property(cc.Label)
    ], HomeUI.prototype, "labName", void 0);
    __decorate([
        property(cc.Node)
    ], HomeUI.prototype, "pointer", void 0);
    __decorate([
        property(cc.Node)
    ], HomeUI.prototype, "nodAdTip", void 0);
    HomeUI = __decorate([
        ccclass
    ], HomeUI);
    return HomeUI;
}(BaseUI_1.default));
exports.default = HomeUI;

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
        //# sourceMappingURL=HomeUI.js.map
        