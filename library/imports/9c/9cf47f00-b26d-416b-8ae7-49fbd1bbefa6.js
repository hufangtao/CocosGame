"use strict";
cc._RF.push(module, '9cf478Asm1Ba4rnSfvRu++m', 'UIQuick');
// scripts/app/ui/UIQuick.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var UIFunc_1 = require("../common/UIFunc");
var DYAudio_1 = require("../../dyGame/DYAudio");
var ProtoSectionPlay_1 = require("../common/net/proto/mods/ProtoSectionPlay");
var PlayManager_1 = require("../component/game/PlayManager");
var NetUtil_1 = require("../common/net/NetUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIQuick = /** @class */ (function (_super) {
    __extends(UIQuick, _super);
    function UIQuick() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hasTouched = false;
        return _this;
        // update (dt) {}
    }
    UIQuick.prototype.onEnable = function () {
        this.node.on('touchstart', this.closePanelQuick, this);
    };
    UIQuick.prototype.onDisable = function () {
        this.node.off('touchstart', this.closePanelQuick, this);
    };
    UIQuick.prototype.start = function () {
    };
    UIQuick.prototype.closePanelQuick = function () {
        var _this = this;
        if (this.hasTouched) {
            return;
        }
        this.hasTouched = true;
        Modules_1.Play.DataPve.gameBegan = true;
        GamePersist_1.default.INSTANCE.panelFadeOut(this.node, function () {
            _this.node.active = false;
            _this.node.opacity = 255;
            _this.hasTouched = false;
            UIFunc_1.UIFunc.closeUI('UIQuick', function () { });
        });
    };
    UIQuick.prototype.hideOverAd = function () {
        if (window['Partner'].supportAd()) {
            window['Partner'].hideOverAd();
        }
    };
    UIQuick.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnGameBack':
                UIFunc_1.UIFunc.closeUI('UIQuick', function () { });
                GamePersist_1.default.INSTANCE.btnAudio_1();
                DYAudio_1.default.stopMusic();
                this.hideOverAd();
                GamePersist_1.default.INSTANCE.loadScene('levelChoose');
                break;
            case 'btnNotQuick':
                UIFunc_1.UIFunc.closeUI('UIQuick', function () { });
                GamePersist_1.default.INSTANCE.btnAudio_1();
                var startPve = new ProtoSectionPlay_1.PlayStartPveC2S();
                PlayManager_1.default.INSTANCE.PveEnterType = 3;
                NetUtil_1.default.SendMsg(startPve);
                // this.playAgain();
                break;
        }
    };
    UIQuick = __decorate([
        ccclass
    ], UIQuick);
    return UIQuick;
}(cc.Component));
exports.default = UIQuick;

cc._RF.pop();