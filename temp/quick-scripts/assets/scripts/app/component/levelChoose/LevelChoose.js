(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/levelChoose/LevelChoose.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f10a74hYjxCE6yI2UoaGdPK', 'LevelChoose', __filename);
// scripts/app/component/levelChoose/LevelChoose.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules = require("../../module/Modules");
var BaseUI_1 = require("../BaseUI");
var PlayManager_1 = require("../game/PlayManager");
var DYAudio_1 = require("../../../dyGame/DYAudio");
var GamePersist_1 = require("../../common/persist/GamePersist");
var Defines_1 = require("../../common/Defines");
var UIFunc_1 = require("../../common/UIFunc");
var Message_1 = require("../../common/Message");
var DYNotify_1 = require("../../../dyGame/DYNotify");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LevelChoose = /** @class */ (function (_super) {
    __extends(LevelChoose, _super);
    function LevelChoose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.contentBg = null;
        _this.energyCount = null;
        _this.energyTimer = null;
        _this.pfbBlock = null;
        _this.pfbBomb = null;
        _this.pfbObstacle = null;
        _this.pfbWall = null;
        _this.pfbTableware = null;
        _this.scrollView = null;
        _this.audHomeBg = null;
        _this.time = 0;
        _this.maxPage = 0;
        _this.pageY = 0;
        _this.currPage = 0;
        _this.startY = 1024;
        _this.length1 = 1024;
        _this.length2 = 976;
        return _this;
    }
    LevelChoose.prototype.onLoad = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                _super.prototype.onLoad.call(this);
                DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
                PlayManager_1.default.INSTANCE.LevelChooseUI = this;
                this.scrollView.node.on('scrolling', this.onScrolling, this);
                if (!DYAudio_1.default.hasMusicPlaying()) {
                    DYAudio_1.default.playMusic(this.audHomeBg, true);
                }
                this.setZIndex();
                this.contentBg.children[4].zIndex = 6;
                this.scrollView.content.y = -cc.view.getVisibleSize().height / 2 - 200;
                this.maxPage = 1;
                return [2 /*return*/];
            });
        });
    };
    LevelChoose.prototype.setZIndex = function () {
        for (var i = 0; i < 4; ++i) {
            this.contentBg.children[i].zIndex = i + 1;
        }
    };
    LevelChoose.prototype.onDestroy = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    LevelChoose.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 1) {
                return;
            }
            if (param.success === 1) {
                self.showEnergyEmpty(2);
            }
        }
    };
    LevelChoose.prototype.uiName = function () {
        return "LevelChoose";
    };
    LevelChoose.prototype.start = function () {
        _super.prototype.start.call(this);
    };
    LevelChoose.prototype.onScrolling = function (event) {
        var currY = this.scrollView.content.y;
        var baseY = cc.view.getVisibleSize().height / 2;
        this.pageY = currY + this.startY + baseY + this.length1 * Math.ceil(this.currPage / 2) + this.length2 * Math.floor(this.currPage / 2);
        if (this.pageY <= 0) {
            if (this.currPage >= this.maxPage) {
                return;
            }
            this.currPage++;
            if (this.currPage > 2) {
                this.scrollView.content.height += this.currPage % 2 == 0 ? this.length2 : this.length1;
                this.contentBg.children[3].zIndex = 0;
                this.contentBg.children[3].y += (this.length1 + this.length2) * 2;
                this.contentBg.children.sort(function (a, b) {
                    return a.zIndex - b.zIndex;
                });
                this.setZIndex();
            }
            // console.log(this.currPage);
        }
        else if (this.pageY >= (this.currPage % 2 == 0 ? this.length2 : this.length1)) {
            this.currPage--;
            if (this.currPage > 1) {
                this.scrollView.content.height -= this.currPage % 2 == 0 ? this.length2 : this.length1;
                this.contentBg.children[0].zIndex = 5;
                this.contentBg.children[0].y -= (this.length1 + this.length2) * 2;
                this.contentBg.children.sort(function (a, b) {
                    return a.zIndex - b.zIndex;
                });
                this.setZIndex();
            }
            // console.log(this.currPage);
        }
    };
    LevelChoose.prototype.chooseLevel = function (level) {
        var _this = this;
        Modules.Play.DataPve.curLevel = level;
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UILevelInfo', function (node) {
            node.getComponent('UILevelInfo').initLevelInfo(_this);
            // GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'),()=>{
            // });
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    LevelChoose.prototype.showEnergyEmpty = function (mode) {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        UIFunc_1.UIFunc.openUI('UIEnergy', function (node) {
            node.getComponent('UIEnergy').setMode(mode);
            GamePersist_1.default.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    LevelChoose.prototype.enterPveGame = function () {
        GamePersist_1.default.INSTANCE.loadScene("pve_game", function () {
            DYAudio_1.default.stopMusic();
        });
    };
    LevelChoose.prototype.update = function (dt) {
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
    LevelChoose.prototype.getEnergy = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        if (Modules.Home.DataPlayer.FortuneEnergy >= 30) {
            GamePersist_1.default.INSTANCE.toast('体力已经满啦');
        }
        else {
            this.showEnergyEmpty(3);
        }
    };
    LevelChoose.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnBack':
                GamePersist_1.default.INSTANCE.btnAudio_2();
                this.goToHome();
                break;
            case 'btnGetEnergy':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.getEnergy();
                break;
        }
    };
    LevelChoose.prototype.levelChoose = function (index) {
        this.chooseLevel(index);
    };
    LevelChoose.prototype.goToHome = function () {
        GamePersist_1.default.INSTANCE.loadScene('home', function () {
            Modules.Home.OpenHomeFrom = Defines_1.OpenHomeFrom.UI_PLAY;
        });
    };
    __decorate([
        property(cc.Node)
    ], LevelChoose.prototype, "contentBg", void 0);
    __decorate([
        property(cc.Label)
    ], LevelChoose.prototype, "energyCount", void 0);
    __decorate([
        property(cc.Label)
    ], LevelChoose.prototype, "energyTimer", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelChoose.prototype, "pfbBlock", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelChoose.prototype, "pfbBomb", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelChoose.prototype, "pfbObstacle", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelChoose.prototype, "pfbWall", void 0);
    __decorate([
        property(cc.Prefab)
    ], LevelChoose.prototype, "pfbTableware", void 0);
    __decorate([
        property(cc.ScrollView)
    ], LevelChoose.prototype, "scrollView", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], LevelChoose.prototype, "audHomeBg", void 0);
    LevelChoose = __decorate([
        ccclass
    ], LevelChoose);
    return LevelChoose;
}(BaseUI_1.default));
exports.default = LevelChoose;

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
        //# sourceMappingURL=LevelChoose.js.map
        