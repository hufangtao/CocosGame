"use strict";
cc._RF.push(module, 'd0bc2UBkyZL4I2Q/FFLc7/C', 'UIInviteFriend');
// scripts/app/ui/UIInviteFriend.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var PlayDefine_1 = require("../component/game/PlayDefine");
var UIFunc_1 = require("../common/UIFunc");
var ProtoSectionRoom_1 = require("../common/net/proto/mods/ProtoSectionRoom");
var HomeManager_1 = require("../component/page/home/HomeManager");
var PlaymateHead_1 = require("../component/prefab/PlaymateHead");
var ProtoDispatcher_1 = require("../common/net/proto/ProtoDispatcher");
var Misc = require("../common/Misc");
var DYNotify_1 = require("../../dyGame/DYNotify");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIInviteFriend = /** @class */ (function (_super) {
    __extends(UIInviteFriend, _super);
    function UIInviteFriend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodMyInfo = null;
        _this.nodOpponentInfo = null;
        _this.nodNoOpponent = null;
        _this.myPlayMateHead = null;
        _this.opponentPlayMateHead = null;
        _this.btnStartPlay = null;
        _this.btnCloseInvite = null;
        _this.btnNewInvite = null;
        _this.btnBack2 = null;
        _this.labButton = null;
        _this.labTip = null;
        _this.spfMale = null;
        _this.spfFemale = null;
        return _this;
    }
    UIInviteFriend_1 = UIInviteFriend;
    UIInviteFriend.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(PlayDefine_1.Event_type.GAMESTART, this.onNotify, this);
        this.nodOpponentInfo.active = false;
        this.nodNoOpponent.active = true;
        this.initMyInfo();
        this.labTip.string = '<b>' + '好友正在赶来的路上...' + '</b>';
        this.labButton.string = '<b>' + '开始游戏' + '</b>';
        this.btnStartPlay.interactable = false;
        this.btnNewInvite.node.active = true;
        this.btnBack2.node.active = false;
    };
    UIInviteFriend.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == PlayDefine_1.Event_type.GAMESTART) {
            self.loadGameScene();
        }
    };
    UIInviteFriend.prototype.loadGameScene = function () {
        cc.audioEngine.stopAll();
        cc.log('loadGameScene');
        cc.director.preloadScene('game', function () {
            setTimeout(function () {
                cc.director.loadScene('game');
                UIFunc_1.UIFunc.closeUI('UIInviteFriend', function () { });
            }, 50);
        });
    };
    UIInviteFriend.prototype.onDisable = function () {
        this.inviteeId = null;
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    UIInviteFriend.prototype.start = function () {
    };
    Object.defineProperty(UIInviteFriend.prototype, "InviteStatus", {
        set: function (val) {
            if (this.inviteStatus === val) {
                return;
            }
            var prevStatus = this.inviteStatus;
            this.inviteStatus = val;
            this.switchNodeActive();
        },
        enumerable: true,
        configurable: true
    });
    UIInviteFriend.prototype.switchNodeActive = function () {
        if (this.inviteStatus === UIInviteFriend_1.INIVTE_CLOSE) {
            this.btnBack2.node.active = true;
            ;
            this.labButton.string = '<b>' + '房间关闭' + '</b>';
            this.labTip.string = '<b>' + '房间关闭' + '</b>';
            this.btnStartPlay.interactable = false;
            this.btnNewInvite.node.active = false;
            this.clearOpponentInfo();
        }
    };
    UIInviteFriend.prototype.initMyInfo = function () {
        var _this = this;
        this.myPlayMateHead.HeadUrl = Modules_1.Home.DataPlayer.MyHeadUrl;
        this.nodMyInfo.getChildByName('name').getComponent(cc.Label).string = Modules_1.Home.DataPlayer.MyName;
        var nStarNum = Modules_1.Home.DataPlayer.FortuneStar;
        var honerId = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            _this.nodMyInfo.getChildByName('rank').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        if (Modules_1.Home.DataPlayer.MySex == 1) {
            this.nodMyInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfMale;
        }
        else {
            this.nodMyInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfFemale;
        }
    };
    UIInviteFriend.prototype.setOpponentInfo = function () {
        var _this = this;
        this.nodOpponentInfo.active = true;
        this.nodNoOpponent.active = false;
        this.opponentPlayMateHead.HeadUrl = Modules_1.Play.DataPlay.OpponentHeadUrl;
        this.nodOpponentInfo.getChildByName('name').getComponent(cc.Label).string = Modules_1.Play.DataPlay.OpponentName;
        var nStarNum = Modules_1.Home.DataRoom.opponentPlaymate.star;
        var honerId = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            _this.nodOpponentInfo.getChildByName('rank').getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        if (Modules_1.Home.DataRoom.opponentPlaymate.sex == 1) {
            this.nodOpponentInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfMale;
        }
        else {
            this.nodOpponentInfo.getChildByName('sex').getComponent(cc.Sprite).spriteFrame = this.spfFemale;
        }
    };
    UIInviteFriend.prototype.clearMyInfo = function () {
        this.nodMyInfo.active = false;
    };
    UIInviteFriend.prototype.clearOpponentInfo = function () {
        this.nodOpponentInfo.active = false;
        this.nodNoOpponent.active = true;
    };
    // 设置邀请者的参数
    UIInviteFriend.prototype.makeInivterInfoRequest = function (inviterParam) {
        // 不是被邀请者 不应该触发此处的逻辑
        if (this.inviteeId !== Modules_1.Home.PlayerId) {
            return;
        }
        this.inviterParam = inviterParam;
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomInviterS2C.EVENT_NAME, this.onReciveInviterInfo, this);
        var roomInviter = new ProtoSectionRoom_1.RoomInviterC2S();
        roomInviter.inviterParam = inviterParam;
        NetUtil_1.default.SendMsg(roomInviter);
    };
    // 收到邀请者的信息
    UIInviteFriend.prototype.onReciveInviterInfo = function (data) {
        var inviter = data;
        if (inviter.inviterParam !== this.inviterParam) {
            return;
        }
        ProtoDispatcher_1.RoomDispatcher.off(ProtoSectionRoom_1.RoomInviterS2C.EVENT_NAME, this.onReciveInviterInfo, this);
        var opponentPlaymate = inviter.playmate;
        // this.showHeadImg(this.nodeOpponentHead, opponentPlaymate.id, opponentPlaymate.headImg);
        if (Modules_1.Home.DataPlayer.MyId === opponentPlaymate.id) {
            cc.log('这是我分享的链接');
            UIFunc_1.UIFunc.closeUI('UIInviteFriend', function () {
                HomeManager_1.default.INSTANCE.showHomeAd();
            });
            return;
        }
        Modules_1.Home.DataRoom.opponentPlaymate = opponentPlaymate;
        this.setOpponentInfo();
        this.makePlayWithRequest(inviter.inviterParam);
    };
    // 请求和邀请者进行对战
    UIInviteFriend.prototype.makePlayWithRequest = function (inviterParam) {
        var playWith = new ProtoSectionRoom_1.RoomPlayWithC2S();
        playWith.inviteeParam = inviterParam;
        NetUtil_1.default.SendMsg(playWith);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomPlayWithS2C.EVENT_NAME, this.onPlayWithReceived, this);
    };
    // 接受邀请的请求被处理
    // 如果房间Id为0 表示房间已经关闭
    // 如果房间Id不为0 则进行确认 等待邀请者确认后开始比赛
    UIInviteFriend.prototype.onPlayWithReceived = function (data) {
        cc.log('onPlayWithReceived');
        ProtoDispatcher_1.RoomDispatcher.off(ProtoSectionRoom_1.RoomPlayWithS2C.EVENT_NAME, this.onPlayWithReceived, this);
        var playWith = data;
        if (playWith.roomId > 0) {
            console.log("play with room:", playWith.roomId);
        }
        else {
            this.InviteStatus = UIInviteFriend_1.INIVTE_CLOSE;
        }
    };
    // 比赛创建
    UIInviteFriend.prototype.onPlayCreate = function () {
        cc.log('onPlayCreate');
        this.InviteStatus = UIInviteFriend_1.INVITE_CREATE;
        // this.waitingTipsLabel.node.active = false;
        this.labTip.string = '<b>' + '等待开始...' + '</b>';
        if (this.inviteeId === Modules_1.Home.PlayerId) {
            // 如果当前的玩家是被邀请者 则自动确认
            this.makeConfirmRequest();
            this.btnNewInvite.node.active = false;
            this.btnStartPlay.interactable = false;
            this.btnBack2.node.active = false;
            this.labButton.string = '<b>' + '等待开始' + '</b>';
        }
        else {
            this.labButton.string = '<b>' + '开始游戏' + '</b>';
            this.btnStartPlay.interactable = true;
            this.btnNewInvite.node.active = false;
            this.setOpponentInfo();
        }
    };
    UIInviteFriend.prototype.makeConfirmRequest = function () {
        var confirm = new ProtoSectionRoom_1.RoomPlayConfirmC2S();
        NetUtil_1.default.SendMsg(confirm);
    };
    // 返回大厅 取消邀请
    UIInviteFriend.prototype.onCloseInvitePage = function () {
        HomeManager_1.default.INSTANCE.hideHomeAd();
        GamePersist_1.default.INSTANCE.btnAudio_1();
        HomeManager_1.default.INSTANCE.makeInvisibleRequest();
        UIFunc_1.UIFunc.closeUI('UIInviteFriend', function () {
            HomeManager_1.default.INSTANCE.UIInviteFriend = null;
            HomeManager_1.default.INSTANCE.showHomeAd();
        });
    };
    UIInviteFriend.prototype.onOpponentLeave = function (playmateId) {
        // GamePersist.INSTANCE.Toast("对方离开");
        if (this.inviteeId === Modules_1.Home.PlayerId) {
            // 被邀请者进入房间关闭状态
            this.InviteStatus = UIInviteFriend_1.INIVTE_CLOSE;
            this.btnBack2.node.active = true;
            ;
            this.labButton.string = '<b>' + '房间关闭' + '</b>';
            this.labTip.string = '<b>' + '房间关闭' + '</b>';
            this.btnStartPlay.interactable = false;
            this.clearOpponentInfo();
        }
        else {
            // 邀请者进入等待状态
            this.InviteStatus = UIInviteFriend_1.INVITE_WAITING;
            this.btnNewInvite.node.active = true;
            this.btnStartPlay.interactable = false;
            this.labButton.string = '<b>' + '开始游戏' + '</b>';
            this.labTip.string = '<b>' + '对方离开' + '</b>';
            this.clearOpponentInfo();
        }
    };
    // 开始游戏
    UIInviteFriend.prototype.onStartPlay = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.makeConfirmRequest();
    };
    UIInviteFriend.prototype.handleNewInvite = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var inviteReq = new ProtoSectionRoom_1.RoomInviteRequestC2S();
        NetUtil_1.default.SendMsg(inviteReq);
    };
    UIInviteFriend.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnBack2':
            case 'btnBack':
                this.onCloseInvitePage();
                break;
            case 'btnStartGame':
                GamePersist_1.default.INSTANCE.blockInput();
                this.onStartPlay();
                break;
            case 'btnInvite':
                this.handleNewInvite();
                break;
        }
    };
    var UIInviteFriend_1;
    UIInviteFriend.INVITE_WAITING = 1;
    UIInviteFriend.INVITE_CREATE = 2;
    UIInviteFriend.INIVTE_CLOSE = 3;
    __decorate([
        property(cc.Node)
    ], UIInviteFriend.prototype, "nodMyInfo", void 0);
    __decorate([
        property(cc.Node)
    ], UIInviteFriend.prototype, "nodOpponentInfo", void 0);
    __decorate([
        property(cc.Node)
    ], UIInviteFriend.prototype, "nodNoOpponent", void 0);
    __decorate([
        property(PlaymateHead_1.default)
    ], UIInviteFriend.prototype, "myPlayMateHead", void 0);
    __decorate([
        property(PlaymateHead_1.default)
    ], UIInviteFriend.prototype, "opponentPlayMateHead", void 0);
    __decorate([
        property(cc.Button)
    ], UIInviteFriend.prototype, "btnStartPlay", void 0);
    __decorate([
        property(cc.Button)
    ], UIInviteFriend.prototype, "btnCloseInvite", void 0);
    __decorate([
        property(cc.Button)
    ], UIInviteFriend.prototype, "btnNewInvite", void 0);
    __decorate([
        property(cc.Button)
    ], UIInviteFriend.prototype, "btnBack2", void 0);
    __decorate([
        property(cc.RichText)
    ], UIInviteFriend.prototype, "labButton", void 0);
    __decorate([
        property(cc.RichText)
    ], UIInviteFriend.prototype, "labTip", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIInviteFriend.prototype, "spfMale", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIInviteFriend.prototype, "spfFemale", void 0);
    UIInviteFriend = UIInviteFriend_1 = __decorate([
        ccclass
    ], UIInviteFriend);
    return UIInviteFriend;
}(cc.Component));
exports.default = UIInviteFriend;

cc._RF.pop();