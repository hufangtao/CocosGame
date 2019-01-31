"use strict";
cc._RF.push(module, 'ef518YkYotFR7/Kmtwg9Zza', 'UIScorePvp');
// scripts/app/ui/UIScorePvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../common/Message");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var Modules_1 = require("../module/Modules");
var ProtoSectionRank_1 = require("../common/net/proto/mods/ProtoSectionRank");
var ProtoSectionPlay_1 = require("../common/net/proto/mods/ProtoSectionPlay");
var Defines_1 = require("../common/Defines");
var PlayManager_1 = require("../component/game/PlayManager");
var Misc = require("../common/Misc");
var DYNotify_1 = require("../../dyGame/DYNotify");
var UIFunc_1 = require("../common/UIFunc");
var ShareManager_1 = require("../common/ShareManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIScorePvp = /** @class */ (function (_super) {
    __extends(UIScorePvp, _super);
    function UIScorePvp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodHead = null;
        _this.nodWinSprite = null;
        _this.nodLoseSprite = null;
        _this.nodDrawSprite = null;
        _this.nodWinBgSprite = null;
        _this.nodLoseBgSprite = null;
        _this.nodShineSprite = null;
        _this.nodStars = null;
        _this.labSaveAnimalCoint = null;
        _this.labWinCount = null;
        _this.labDailyCount = null;
        _this.labRateDailyWin = null;
        _this.labRateWeekWin = null;
        _this.sprGrade = null;
        _this.btnContinue = null;
        _this.bgParticle = null;
        _this.nodNewGrade = null;
        _this.btnAd = null;
        _this.labCoin = null;
        _this.labLoseOrWin = null;
        _this.labCoinInPanel = null;
        _this.nodDoubleCoin = null;
        _this.gameContinueType = null;
        _this.againSF = null;
        _this.continueSF = null;
        _this.opInviteSF = null;
        _this.opLeaveSF = null;
        _this.waitagreeSF = null;
        _this.noagainGreySF = null;
        _this.PlayUI = null;
        _this.time = 0;
        return _this;
    }
    // 电视晃动
    UIScorePvp.prototype.tvAction = function (win) {
        var btnAd = this.btnAd.node;
        btnAd.on('click', this.showAdGetProp, this);
        var nodTv = btnAd.getChildByName('icon-tv');
        nodTv.getComponent(cc.Animation).play('tvShake');
    };
    UIScorePvp.prototype.showAdGetProp = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].showVideoAd(function () {
                ShareManager_1.ShareManager.Instance.notifyWatchAdGetProp();
            }, function () {
                ShareManager_1.ShareManager.Instance.share(3);
            });
        }
        else {
            GamePersist_1.default.INSTANCE.toast('不支持广告');
            ShareManager_1.ShareManager.Instance.notifyWatchAdGetProp();
        }
    };
    UIScorePvp.prototype.init = function (playUI) {
        this.PlayUI = playUI;
    };
    UIScorePvp.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.UIRankUpdate, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_PRIZE, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify_1.DYNotify.regObserver(Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.btnContinue.interactable = true;
        this.nodNewGrade.active = false;
        this.requestRankData();
        this.nodDoubleCoin.active = false;
        this.canLoadUIGetProp = true;
        this.coinNum = 0;
        this.nodDoubleCoin.getChildByName('content').active = false;
        window['Partner'].postMsg(3, { valuekey: Defines_1.ValueKey.gameRate });
        this.subContextView = this.node.getChildByName('sprBeyond').getComponent(cc.WXSubContextView);
        if (window['wx']) {
            this.subContextView.enabled = false;
        }
    };
    UIScorePvp.prototype.update = function (dt) {
        if (!window['wx']) {
            return;
        }
        this.time += dt;
        if (this.time >= 2 && this.subContextView) {
            this.time = 0;
            this.subContextView.update();
        }
    };
    UIScorePvp.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    UIScorePvp.prototype.onNotify = function (target, tag, param) {
        var _this = this;
        var self = target;
        if (tag == Message_1.Message.UIRankUpdate) {
            if (Modules_1.Play.DataPvp.isGradeUp()) {
                self.rankUp();
            }
        }
        else if (tag === Message_1.Message.EVENT_MODULE_PLAYER_PRIZE) {
            if (!this.canLoadUIGetProp) {
                return;
            }
            this.canLoadUIGetProp = false;
            UIFunc_1.UIFunc.openUI('UIGetProp', function (node) {
                _this.canLoadUIGetProp = true;
                node.getComponent('UIGetProp').scorePvpAchieveProp();
            });
        }
        else if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 3) {
                return;
            }
            if (param.success == 1) {
                self.watchAd();
            }
            else if (param.success === 2) {
                GamePersist_1.default.INSTANCE.toast('今日分享已达上限');
            }
        }
        else if (tag === Message_1.Message.EVENT_MODULE_PLAYER_FORTUNE) {
            self.showGetCoin();
        }
    };
    // 更新排行
    UIScorePvp.prototype.requestRankData = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        var rankDataReq = new ProtoSectionRank_1.RankPlayStarC2S();
        rankDataReq.posStart = 1;
        rankDataReq.posEnd = 50;
        NetUtil_1.default.SendMsg(rankDataReq);
    };
    UIScorePvp.prototype.continue = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        if (Modules_1.Home.DataRoom.opponentPlaymate.id == 1) {
            Modules_1.Home.OpenHomeFrom = Defines_1.OpenHomeFrom.UI_AIFIN;
            PlayManager_1.default.INSTANCE.onBack();
        }
        else {
            var playContinue = new ProtoSectionPlay_1.PlayContinueC2S();
            NetUtil_1.default.SendMsg(playContinue);
        }
        UIFunc_1.UIFunc.closeUI('UIScorePvp', function () { });
    };
    UIScorePvp.prototype.giveUp = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        PlayManager_1.default.INSTANCE.onBack();
        UIFunc_1.UIFunc.closeUI('UIScorePvp', function () { });
    };
    UIScorePvp.prototype.showStar = function (num) {
        for (var i = 0; i < this.nodStars.children.length; ++i) {
            if (i <= num - 1) {
                this.nodStars.children[i].opacity = 0;
                this.nodStars.children[i].scale = 2;
                var action = cc.sequence(cc.delayTime(0.2 * i), cc.callFunc(function (target) {
                    target.opacity = 255;
                }, this), cc.scaleTo(0.1, 0.9, 0.9), cc.scaleTo(0.05, 1, 1));
                this.nodStars.children[i].active = true;
                this.nodStars.children[i].runAction(action);
            }
            else {
                this.nodStars.children[i].active = false;
            }
        }
        this.gradeUp();
    };
    // 段位升级
    UIScorePvp.prototype.gradeUp = function () {
        var _this = this;
        if (Modules_1.Play.DataPvp.isGradeUp()) {
            // 播放段位升级动画
            var myStar = Modules_1.Home.DataPlayer.FortuneStar;
            var sysHonorId = Misc.calcHonorId(myStar);
            cc.loader.loadRes('res/rank/rank-' + sysHonorId, cc.SpriteFrame, function (err, spriteFrame) {
                _this.nodNewGrade.getChildByName('mask').getChildByName('sprGrade').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
            });
            this.nodNewGrade.active = true;
            this.nodNewGrade.parent.getComponent(cc.Animation).play('gradeUp');
            this.scheduleOnce(function () {
                _this.rankUp();
            }, 3);
        }
        else {
        }
    };
    // 排行升级
    UIScorePvp.prototype.rankUp = function () {
        var _this = this;
        if (Modules_1.Play.DataPvp.isRankUp()) {
            // console.log('rankUp');
            cc.loader.loadRes('prefab/play/RankUp', cc.Prefab, function (err, prefab) {
                var node = cc.instantiate(prefab);
                node.parent = _this.node;
                var rankUp = node.getComponent('RankUp');
                rankUp.showAction(true);
                // cc.loader.setAutoReleaseRecursively(prefab, true)
            });
        }
    };
    UIScorePvp.prototype.setContinueBtn = function (type) {
        switch (type) {
            case 0:
                // 失败
                this.gameContinueType.spriteFrame = this.againSF;
                break;
            case 1:
                // 胜利
                this.gameContinueType.spriteFrame = this.continueSF;
                break;
            case 2:
                // 对手请求
                this.gameContinueType.spriteFrame = this.opInviteSF;
                break;
            case 3:
                // 对手离开
                this.gameContinueType.spriteFrame = this.opLeaveSF;
                this.btnContinue.interactable = false;
                break;
            case 4:
                // 等待同意
                this.gameContinueType.spriteFrame = this.waitagreeSF;
                break;
            case 5:
                // 失败ai
                this.gameContinueType.spriteFrame = this.noagainGreySF;
                break;
        }
        // AI对战结束，显示继续匹配
        if (Modules_1.Home.DataRoom.opponentPlaymate.id == 1) {
            this.btnContinue.interactable = false;
            this.gameContinueType.spriteFrame = this.opLeaveSF;
        }
    };
    // 显示双倍金币弹窗
    UIScorePvp.prototype.showDoubleCoin = function () {
        var _this = this;
        this.nodDoubleCoin.active = true;
        this.labCoinInPanel.string = this.coinNum + '';
        this.scheduleOnce(function () {
            _this.nodDoubleCoin.getChildByName('content').active = true;
        }, 1);
    };
    UIScorePvp.prototype.playFinish = function (playResult, nodHead) {
        this.coinNum = playResult.score;
        this.showGameData(playResult, nodHead);
        this.showResultUI(playResult.winSide);
        this.headAction();
    };
    // 显示游戏数据
    UIScorePvp.prototype.showGameData = function (playResult, nodHead) {
        var self = this;
        cc.log(playResult.score);
        this.labCoin.string = playResult.score + '';
        var node = cc.instantiate(nodHead);
        node.parent = this.nodHead.getChildByName('head');
        node.setPosition(0, 0);
        node.getComponent('PlaymateHead').setSize(200, 200);
        var myStar = Modules_1.Home.DataPlayer.FortuneStar;
        var sysHonorId;
        var showStarNum;
        if (Modules_1.Play.DataPvp.isGradeUp()) {
            sysHonorId = Misc.calcHonorId(myStar - 1);
            showStarNum = Misc.calcShowStarCount(myStar);
        }
        else {
            sysHonorId = Misc.calcHonorId(myStar);
            showStarNum = Misc.calcShowStarCount(myStar);
        }
        cc.loader.loadRes('res/rank/rank-' + sysHonorId, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprGrade.spriteFrame = spriteFrame;
        });
        this.showStar(showStarNum);
        this.labSaveAnimalCoint.string = playResult.saveAnimalCount + '';
        this.labWinCount.string = playResult.winCount + ''; // 连胜
        this.labDailyCount.string = playResult.activeBuffCount + '';
        var daliyRate = playResult.dailyWin * 100 / playResult.dailyCnt;
        if (!daliyRate) {
            daliyRate = 0;
        }
        var WeekRate = playResult.weeklyWin * 100 / playResult.weeklyCnt;
        if (!WeekRate) {
            WeekRate = 0;
        }
        this.labRateDailyWin.string = Math.floor(daliyRate) + '%';
        this.labRateWeekWin.string = Math.floor(WeekRate) + '%';
    };
    // 显示游戏结果的ui
    UIScorePvp.prototype.showResultUI = function (winSide) {
        //背景光环转动效果
        var shine_action = cc.repeatForever(cc.rotateBy(4, 360));
        //胜利、失败、平局 显示的动态效果
        var action = cc.sequence(cc.callFunc(function (target) {
            target.scale = 2;
        }, this), cc.scaleTo(0.1, 0.9, 0.9), cc.scaleTo(0.01, 1, 1));
        if (winSide == 0) {
            // 平局
            this.PlayUI.Audio.victory();
            this.tvAction(false);
            this.nodShineSprite.active = false;
            this.bgParticle.active = false;
            this.nodWinBgSprite.active = true;
            this.nodLoseBgSprite.active = false;
            this.nodWinSprite.active = false;
            this.nodLoseSprite.active = false;
            this.nodDrawSprite.active = true;
            this.nodDrawSprite.runAction(action);
            this.labCoin.node.active = false;
            this.labLoseOrWin.string = '平局未能获得金币';
            this.setContinueBtn(1);
        }
        else if (winSide == Modules_1.Play.DataPlay.MySide) {
            // 胜利
            this.PlayUI.Audio.victory();
            this.tvAction(true);
            this.nodShineSprite.active = true;
            this.nodShineSprite.runAction(shine_action);
            this.bgParticle.active = true;
            this.bgParticle.opacity = 255;
            this.nodWinBgSprite.active = true;
            this.nodLoseBgSprite.active = false;
            this.nodWinSprite.active = true;
            this.nodLoseSprite.active = false;
            this.nodDrawSprite.active = false;
            this.nodWinSprite.runAction(action);
            this.labCoin.node.active = true;
            ;
            this.labLoseOrWin.string = '您赢得金币:';
            this.setContinueBtn(1);
            this.showDoubleCoin();
        }
        else {
            // 失败
            this.PlayUI.Audio.lose();
            this.tvAction(false);
            this.nodShineSprite.active = false;
            this.bgParticle.active = false;
            this.nodWinBgSprite.active = false;
            this.nodLoseBgSprite.active = true;
            this.nodWinSprite.active = false;
            this.nodLoseSprite.active = true;
            this.nodDrawSprite.active = false;
            this.nodLoseSprite.runAction(action);
            this.labCoin.node.active = true;
            ;
            this.labLoseOrWin.string = '您输掉金币:';
            this.setContinueBtn(0);
        }
    };
    // 头像突出的动态效果
    UIScorePvp.prototype.headAction = function () {
        var head_frame = this.nodHead;
        var head_action = cc.sequence(cc.callFunc(function (target) {
            target.y = (target.y - 200);
        }, this), cc.moveBy(0.2, cc.v2(0, 220)), cc.moveBy(0.01, cc.v2(0, -20)));
        head_frame.runAction(head_action);
    };
    // 收取双倍金币
    UIScorePvp.prototype.doubleCoin = function () {
        GamePersist_1.default.INSTANCE.blockInput();
        this.showAdDoubleCoin();
    };
    // 显示获得金币效果
    UIScorePvp.prototype.showGetCoin = function () {
        var _this = this;
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc_1.UIFunc.openUI('UIGetProp', function (node) {
            node.getComponent('UIGetProp').achieveCoin(_this.coinNum, function () {
                _this.canLoadUIGetProp = true;
                _this.nodDoubleCoin.active = false;
                _this.labCoin.string = _this.coinNum * 2 + '';
                UIFunc_1.UIFunc.closeUI('UIGetProp', function () { });
            });
        });
    };
    UIScorePvp.prototype.showAdDoubleCoin = function () {
        var _this = this;
        if (window['Partner'].supportAd()) {
            window['Partner'].showVideoAd(function () {
                ShareManager_1.ShareManager.Instance.notifyWatchAdDoubleCoin();
                _this.showGetCoin();
            }, function () {
                ShareManager_1.ShareManager.Instance.share(7);
            });
        }
        else {
            GamePersist_1.default.INSTANCE.toast('不支持广告');
            ShareManager_1.ShareManager.Instance.notifyWatchAdDoubleCoin();
            this.showGetCoin();
        }
    };
    // 跳过双倍收取
    UIScorePvp.prototype.hideDoubleCoin = function () {
        this.nodDoubleCoin.active = false;
    };
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodHead", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodWinSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodLoseSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodDrawSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodWinBgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodLoseBgSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodShineSprite", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodStars", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labSaveAnimalCoint", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labWinCount", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labDailyCount", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labRateDailyWin", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labRateWeekWin", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIScorePvp.prototype, "sprGrade", void 0);
    __decorate([
        property(cc.Button)
    ], UIScorePvp.prototype, "btnContinue", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "bgParticle", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodNewGrade", void 0);
    __decorate([
        property(cc.Button)
    ], UIScorePvp.prototype, "btnAd", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labCoin", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labLoseOrWin", void 0);
    __decorate([
        property(cc.Label)
    ], UIScorePvp.prototype, "labCoinInPanel", void 0);
    __decorate([
        property(cc.Node)
    ], UIScorePvp.prototype, "nodDoubleCoin", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIScorePvp.prototype, "gameContinueType", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePvp.prototype, "againSF", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePvp.prototype, "continueSF", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePvp.prototype, "opInviteSF", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePvp.prototype, "opLeaveSF", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePvp.prototype, "waitagreeSF", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIScorePvp.prototype, "noagainGreySF", void 0);
    UIScorePvp = __decorate([
        ccclass
    ], UIScorePvp);
    return UIScorePvp;
}(cc.Component));
exports.default = UIScorePvp;

cc._RF.pop();