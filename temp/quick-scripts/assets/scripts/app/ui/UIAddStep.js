(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIAddStep.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5a45egJf+NNmpXEXBbmz2Q4', 'UIAddStep', __filename);
// scripts/app/ui/UIAddStep.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Message_1 = require("../common/Message");
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var UIFunc_1 = require("../common/UIFunc");
var StateMgr_1 = require("../component/game/pve/StateMgr");
var DYNotify_1 = require("../../dyGame/DYNotify");
var ShareManager_1 = require("../common/ShareManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIAddStep = /** @class */ (function (_super) {
    __extends(UIAddStep, _super);
    function UIAddStep() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UIAddStep.prototype.onEnable = function () {
        DYNotify_1.DYNotify.regObserver(Message_1.Message.GET_SHARE_CNT, this.onNotify, this);
    };
    UIAddStep.prototype.onDisable = function () {
        DYNotify_1.DYNotify.removeAllObservers(this);
    };
    // 显示增加步数界面
    UIAddStep.prototype.init = function (layerGame) {
        this.layerGame = layerGame;
        if (Modules_1.Play.DataPve.levelData.time > 0) {
            this.node.getChildByName('addTime').active = true;
            this.node.getChildByName('addStep').active = false;
        }
        else {
            this.node.getChildByName('addTime').active = false;
            this.node.getChildByName('addStep').active = true;
        }
    };
    UIAddStep.prototype.showAd = function () {
        var _this = this;
        if (window['Partner'].supportAd()) {
            GamePersist_1.default.INSTANCE.blockInput();
            window['Partner'].showVideoAd(function () {
                ShareManager_1.ShareManager.Instance.notifyWatchAdAddStep();
                _this.onWatchAd();
            }, function () {
                _this.share();
            });
        }
        else {
            cc.log('不支持广告');
            ShareManager_1.ShareManager.Instance.notifyWatchAdAddStep();
            this.onWatchAd();
        }
    };
    // 看广告回调
    UIAddStep.prototype.onWatchAd = function () {
        UIFunc_1.UIFunc.closeUI('UIAddStep', function () { });
        if (Modules_1.Play.DataPve.levelData.time > 0) {
            StateMgr_1.default.INSTANCE.isStopOperate = false;
            Modules_1.Play.DataPve.hadAddStep = true;
            Modules_1.Play.DataPve.remainTime = 10;
            this.layerGame.panelHeader.updateTime();
        }
        else {
            StateMgr_1.default.INSTANCE.isStopOperate = false;
            Modules_1.Play.DataPve.hadAddStep = true;
            Modules_1.Play.DataPve.remainStep = 5;
            this.layerGame.panelHeader.updateLabelStep();
        }
    };
    UIAddStep.prototype.onNotify = function (target, tag, param) {
        var self = target;
        if (tag == Message_1.Message.GET_SHARE_CNT) {
            if (param.reason != 5) {
                return;
            }
            if (param.success == 1) {
                self.onWatchAd();
            }
            else if (param.success === 0) {
                GamePersist_1.default.INSTANCE.toast('免费额外资源已用完，明天再试试');
            }
        }
    };
    UIAddStep.prototype.share = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        ShareManager_1.ShareManager.Instance.share(5);
    };
    UIAddStep.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnGiveUp':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.layerGame.PlayUI.loseGame();
                UIFunc_1.UIFunc.closeUI('UIAddStep', function () { });
                break;
            case 'btnWatchAd':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.showAd();
                // this.onWatchAd();
                break;
        }
    };
    UIAddStep = __decorate([
        ccclass
    ], UIAddStep);
    return UIAddStep;
}(cc.Component));
exports.default = UIAddStep;

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
        //# sourceMappingURL=UIAddStep.js.map
        