"use strict";
cc._RF.push(module, 'c9745OjbUJKJZAFmqO1s6Ec', 'UIQuitConfirmPvp');
// scripts/app/ui/UIQuitConfirmPvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var ProtoSectionPlay_1 = require("../common/net/proto/mods/ProtoSectionPlay");
var UIFunc_1 = require("../common/UIFunc");
var PlayManager_1 = require("../component/game/PlayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var NewClass = /** @class */ (function (_super) {
    __extends(NewClass, _super);
    function NewClass() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodContent = null;
        return _this;
        // update (dt) {}
    }
    NewClass.prototype.onLoad = function () {
    };
    NewClass.prototype.start = function () {
    };
    NewClass.prototype.giveUp = function () {
        if (PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpAi) {
            var ai_finish = new ProtoSectionPlay_1.PlayAiFinishC2S();
            ai_finish.saveAnimalCount = Modules_1.Play.DataPvp.petAllCnt;
            ai_finish.winSide = Modules_1.Play.DataPlay.AiSide;
            NetUtil_1.default.SendMsg(ai_finish);
            return;
        }
        var playGiveUp = new ProtoSectionPlay_1.PlayGiveUpC2S();
        NetUtil_1.default.SendMsg(playGiveUp);
    };
    NewClass.prototype.btnListener = function (event) {
        var _this = this;
        var target = event.target;
        switch (target.name) {
            case 'btnGiveUp':
                GamePersist_1.default.INSTANCE.panelFadeOut(this.nodContent, function () {
                    _this.nodContent.active = false;
                    _this.nodContent.opacity = 255;
                    UIFunc_1.UIFunc.closeUI('UIQuitConfirmPvp', function () { });
                });
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.giveUp();
                break;
            case 'continue':
                GamePersist_1.default.INSTANCE.btnAudio_2();
                GamePersist_1.default.INSTANCE.panelFadeOut(this.nodContent, function () {
                    _this.nodContent.active = false;
                    _this.nodContent.opacity = 255;
                    UIFunc_1.UIFunc.closeUI('UIQuitConfirmPvp', function () { });
                });
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], NewClass.prototype, "nodContent", void 0);
    NewClass = __decorate([
        ccclass
    ], NewClass);
    return NewClass;
}(cc.Component));
exports.default = NewClass;

cc._RF.pop();