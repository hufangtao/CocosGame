(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIMatch.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e00e6k6MNpMbrvZPTfViGSb', 'UIMatch', __filename);
// scripts/app/ui/UIMatch.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var Misc = require("../common/Misc");
var PlayDefine_1 = require("../component/game/PlayDefine");
var UIFunc_1 = require("../common/UIFunc");
var HomeManager_1 = require("../component/page/home/HomeManager");
var DYNotify_1 = require("../../dyGame/DYNotify");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIMatch = /** @class */ (function (_super) {
    __extends(UIMatch, _super);
    function UIMatch() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labTime = null;
        _this.nod_Head = null;
        _this.btnBack = null;
        _this.nodDots = null;
        _this.nodMyHead = null;
        _this.sprMyHonor = null;
        _this.labMyName = null;
        _this.sprMySex = null;
        _this.nodOpponentHead = null;
        _this.sprOpponentHonor = null;
        _this.labOpponentName = null;
        _this.sprOpponentSex = null;
        _this.nodSprSearching = null;
        _this.nodSearching = null;
        _this.nodSearched = null;
        _this.spfMale = null;
        _this.spfFemale = null;
        _this.passedTime = 0;
        _this.hadLoadScene = false;
        return _this;
        // update (dt) {}
    }
    UIMatch.prototype.onEnable = function () {
        this.passedTime = 0;
        this.labTime.string = "" + this.passedTime;
        this.setMyInfo();
        this.checkTime();
        // NodePool.initPool();
        DYNotify_1.DYNotify.regObserver(PlayDefine_1.Event_type.GAMESTART, this.onNotify, this);
        // cc.director.preloadScene('game',()=>{
        //     this.hadLoadScene = true;
        // });
        this.doitAction();
        this.btnBack.active = true;
    };
    UIMatch.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == PlayDefine_1.Event_type.GAMESTART) {
            self.loadGameScene();
        }
    };
    UIMatch.prototype.loadGameScene = function () {
        cc.audioEngine.stopAll();
        cc.log('loadGameScene');
        this.btnBack.active = false;
        cc.director.preloadScene('game', function () {
            setTimeout(function () {
                cc.director.loadScene('game');
                UIFunc_1.UIFunc.closeUI('UIMatch', function () { });
                UIFunc_1.UIFunc.closeUI('UIChoosePvp', function () { });
            }, 50);
        });
    };
    UIMatch.prototype.checkTime = function () {
        this.schedule(this.schCB, 1);
    };
    UIMatch.prototype.schCB = function () {
        this.passedTime++;
        this.labTime.string = "" + this.passedTime;
    };
    UIMatch.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
        this.unschedule(this.schCB);
    };
    UIMatch.prototype.setOpponentInfo = function () {
        var self = this;
        this.nodSearching.active = false;
        this.nodSprSearching.active = false;
        this.sprOpponentSex.node.parent.active = true;
        this.nodSearched.active = true;
        this.setHead(this.nodOpponentHead, Modules_1.Home.DataRoom.opponentPlaymate.headImg);
        var nStarNum = Modules_1.Home.DataRoom.opponentPlaymate.star;
        var honerId = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprOpponentHonor.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });
        this.labOpponentName.string = Modules_1.Home.DataRoom.opponentPlaymate.name;
        if (Modules_1.Home.DataRoom.opponentPlaymate.sex == 1) {
            this.sprOpponentSex.spriteFrame = this.spfMale;
        }
        else {
            this.sprOpponentSex.spriteFrame = this.spfFemale;
        }
    };
    UIMatch.prototype.setMyInfo = function () {
        var self = this;
        this.nodSearching.active = true;
        this.nodSprSearching.active = true;
        this.sprOpponentSex.node.parent.active = false;
        this.nodSearched.active = false;
        this.setHead(this.nodMyHead, Modules_1.Home.DataPlayer.MyHeadUrl);
        var nStarNum = Modules_1.Home.DataPlayer.FortuneStar;
        var honerId = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprMyHonor.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });
        this.labMyName.string = Modules_1.Play.DataPlay.MyName;
        if (Modules_1.Home.DataPlayer.MySex == 1) {
            this.sprMySex.spriteFrame = this.spfMale;
        }
        else {
            this.sprMySex.spriteFrame = this.spfFemale;
        }
    };
    UIMatch.prototype.setHead = function (node, headUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                cc.loader.loadRes("prefab/component/PlaymateHead", cc.Prefab, function (err, prefab) {
                    var nodItem = cc.instantiate(prefab);
                    nodItem.parent = node;
                    nodItem.setPosition(0, 0);
                    nodItem.getComponent('PlaymateHead').setSize(_this.nodMyHead.getContentSize());
                    nodItem.getComponent('PlaymateHead').HeadUrl = headUrl;
                    // cc.loader.setAutoReleaseRecursively(prefab, true)
                });
                return [2 /*return*/];
            });
        });
    };
    UIMatch.prototype.doitAction = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.nodDots.children[0].y = 0;
                        this.nodDots.children[1].y = 0;
                        this.nodDots.children[2].y = 0;
                        this.nodDots.children[3].y = 0;
                        this.nodDots.children[4].y = 0;
                        this.nodDots.children[5].y = 0;
                        _a.label = 1;
                    case 1:
                        if (!Modules_1.Home.DataPlayer.IsMatching) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.runAction(this.nodDots.children[0], false)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.runAction(this.nodDots.children[1], false)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.runAction(this.nodDots.children[2], false)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.runAction(this.nodDots.children[3], false)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.runAction(this.nodDots.children[4], false)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.runAction(this.nodDots.children[5], true)];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    UIMatch.prototype.runAction = function (node, delay) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var action = cc.sequence(cc.moveBy(0.05, 0, 10), cc.callFunc(function () {
                            if (!delay) {
                                resolve();
                            }
                        }), cc.moveBy(0.1, 0, -10), cc.callFunc(function () {
                            if (delay) {
                                self.scheduleOnce(function () {
                                    resolve();
                                }, 0.5);
                            }
                        }));
                        node.runAction(action);
                    })];
            });
        });
    };
    UIMatch.prototype.doCancelMatch = function () {
        // 如果当前没有在匹配状态 直接返回
        GamePersist_1.default.INSTANCE.btnAudio_2();
        UIFunc_1.UIFunc.closeUI('UIMatch', function () { });
        this.unscheduleAllCallbacks();
        Modules_1.Home.DataPlayer.IsMatching = false;
        HomeManager_1.default.INSTANCE.makeInvisibleRequest();
    };
    __decorate([
        property(cc.Label)
    ], UIMatch.prototype, "labTime", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nod_Head", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "btnBack", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nodDots", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nodMyHead", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIMatch.prototype, "sprMyHonor", void 0);
    __decorate([
        property(cc.Label)
    ], UIMatch.prototype, "labMyName", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIMatch.prototype, "sprMySex", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nodOpponentHead", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIMatch.prototype, "sprOpponentHonor", void 0);
    __decorate([
        property(cc.Label)
    ], UIMatch.prototype, "labOpponentName", void 0);
    __decorate([
        property(cc.Sprite)
    ], UIMatch.prototype, "sprOpponentSex", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nodSprSearching", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nodSearching", void 0);
    __decorate([
        property(cc.Node)
    ], UIMatch.prototype, "nodSearched", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIMatch.prototype, "spfMale", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], UIMatch.prototype, "spfFemale", void 0);
    UIMatch = __decorate([
        ccclass
    ], UIMatch);
    return UIMatch;
}(cc.Component));
exports.default = UIMatch;

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
        //# sourceMappingURL=UIMatch.js.map
        