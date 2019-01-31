"use strict";
cc._RF.push(module, '7832c97tlRC74Dhyb5R8GSQ', 'PlayStory');
// scripts/app/component/game/pvp/PlayStory.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseUI_1 = require("../../BaseUI");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var PlayManager_1 = require("../PlayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayStory = /** @class */ (function (_super) {
    __extends(PlayStory, _super);
    function PlayStory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.story1 = null;
        _this.story2 = null;
        _this.story3 = null;
        _this.enterButton = null;
        _this.canTouch = true;
        _this.state = 1;
        return _this;
        // update (dt) {}
    }
    // LIFE-CYCLE CALLBACKS:
    PlayStory.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        // NodePool.initPool();
        this.tabAction = cc.sequence(cc.moveTo(0, cc.v2(0, -1280)), cc.callFunc(function (target) {
            //console.log(target);
            target.active = true;
        }, this), cc.moveTo(1, cc.v2(0, 0)));
        var self = this;
        this.enterButton.active = true;
        this.enterButton.opacity = 0;
        var action = cc.sequence(cc.fadeTo(1, 255), cc.callFunc(function () {
            var actionA = cc.repeatForever(cc.sequence(cc.fadeTo(1, 0), cc.fadeTo(1, 255)));
            self.enterButton.runAction(actionA);
        }));
        this.enterButton.runAction(action);
        this.node.on("touchstart", this.onTouchStart, this);
        cc.director.preloadScene('game');
    };
    PlayStory.prototype.onTouchStart = function () {
        var _this = this;
        if (!this.canTouch) {
            return;
        }
        if (this.state === 1) {
            this.story1.active = false;
            this.story2.active = true;
            this.state = 2;
            this.canTouch = false;
            this.scheduleOnce(function () {
                _this.canTouch = true;
            }, 1);
        }
        else if (this.state === 2) {
            this.story2.active = false;
            this.story3.active = true;
            this.state = 3;
            this.canTouch = false;
            this.scheduleOnce(function () {
                _this.canTouch = true;
            }, 1);
        }
        else if (this.state === 3) {
            GamePersist_1.default.INSTANCE.loadScene("game", function () {
                PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpTeach = true;
                PlayManager_1.default.INSTANCE.newRound(null);
            });
        }
    };
    PlayStory.prototype.start = function () {
        console.log("enter PlayStory start===========");
        _super.prototype.start.call(this);
    };
    PlayStory.prototype.uiName = function () {
        return "PlayStoryUI";
    };
    PlayStory.prototype.onContinue = function (event, data) {
        switch (data) {
            case "1":
                this.story2.active = true;
                this.story2.runAction(this.tabAction);
                break;
            case "2":
                this.story3.active = true;
                this.story3.runAction(this.tabAction);
                break;
            case "end":
                cc.director.loadScene("game", function () {
                    PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpTeach = true;
                    PlayManager_1.default.INSTANCE.newRound(null);
                });
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], PlayStory.prototype, "story1", void 0);
    __decorate([
        property(cc.Node)
    ], PlayStory.prototype, "story2", void 0);
    __decorate([
        property(cc.Node)
    ], PlayStory.prototype, "story3", void 0);
    __decorate([
        property(cc.Node)
    ], PlayStory.prototype, "enterButton", void 0);
    PlayStory = __decorate([
        ccclass
    ], PlayStory);
    return PlayStory;
}(BaseUI_1.default));
exports.default = PlayStory;

cc._RF.pop();