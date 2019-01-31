(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/levelChoose/PanelLevelChoose.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8a012Y/gPJBkKBtMwtt45Lm', 'PanelLevelChoose', __filename);
// scripts/app/component/levelChoose/PanelLevelChoose.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../module/Modules");
var GamePersist_1 = require("../../common/persist/GamePersist");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PanelLevelChoose = /** @class */ (function (_super) {
    __extends(PanelLevelChoose, _super);
    function PanelLevelChoose() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodHead = null;
        _this.pHeadPerfab = null;
        _this.nodBtnLevel = null;
        _this.spfBtnNormal = null;
        _this.spfBtnLocked = null;
        _this.LevelChoose = null;
        return _this;
        // update (dt) {}
    }
    PanelLevelChoose.prototype.onLoad = function () {
    };
    PanelLevelChoose.prototype.start = function () {
        this.setBtnStat();
        this.LevelChoose = this.node.parent.getComponent('LevelChoose');
    };
    PanelLevelChoose.prototype.setBtnStat = function () {
        for (var i = 0; i < this.nodBtnLevel.children.length; ++i) {
            if (this.nodBtnLevel.children[i]) {
                this.nodBtnLevel.children[i].on('click', this.levelChoose, this);
                this.nodBtnLevel.children[i].name = 'BtnLevel_' + i;
                this.nodBtnLevel.children[i].getComponent('BtnLevel').setLevel(i + 1);
                this.nodBtnLevel.children[i].getChildByName('labLevel').active = true;
            }
        }
        // console.log(Home.DataPlayer.PveStatArray);
        for (var i = 0; i < Modules_1.Home.DataPlayer.Level; ++i) {
            if (this.nodBtnLevel.children[i]) {
                this.nodBtnLevel.children[i].getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = this.spfBtnNormal;
                if (!Modules_1.Home.DataPlayer.PveStatArray[i]) {
                    continue;
                }
                this.nodBtnLevel.children[i].getComponent('BtnLevel').setStar(Modules_1.Home.DataPlayer.PveStatArray[i]);
            }
        }
        var node = this.nodBtnLevel.children[Modules_1.Home.DataPlayer.Level];
        if (node) {
            node.getComponent('BtnLevel').setCurLevel();
        }
        else {
            node = this.nodBtnLevel.children[Modules_1.Home.DataPlayer.Level - 1];
            node.getComponent('BtnLevel').setCurLevel(true);
        }
        for (var i = Modules_1.Home.DataPlayer.Level + 1; i < this.nodBtnLevel.children.length; ++i) {
            if (this.nodBtnLevel.children[i]) {
                this.nodBtnLevel.children[i].getComponent('BtnLevel').setInteractable(false);
                this.nodBtnLevel.children[i].getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = this.spfBtnLocked;
            }
        }
        this.setHead();
    };
    PanelLevelChoose.prototype.setHead = function () {
        var index = Modules_1.Home.DataPlayer.Level;
        if (Modules_1.Home.DataPlayer.Level == this.nodBtnLevel.children.length) {
            index = Modules_1.Home.DataPlayer.Level - 1;
        }
        var nodButton = this.nodBtnLevel.children[index];
        var ps_w = this.nodBtnLevel.convertToWorldSpaceAR(nodButton.getPosition());
        this.nodHead.setPosition(this.nodHead.parent.convertToNodeSpaceAR(ps_w));
        var pHeadNode = cc.instantiate(this.pHeadPerfab);
        pHeadNode.parent = this.nodHead.getChildByName('head');
        pHeadNode.setPosition(0, 0);
        var playmateHead = pHeadNode.getComponent("PlaymateHead");
        playmateHead.HeadUrl = Modules_1.Home.DataPlayer.MyHeadUrl;
        playmateHead.setSize(110, 110);
    };
    PanelLevelChoose.prototype.levelChoose = function (event) {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var target = event.target;
        var level = target.name.substring(9);
        this.LevelChoose.levelChoose(Number(level) + 1);
    };
    PanelLevelChoose.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnPanelBack':
                GamePersist_1.default.INSTANCE.btnAudio_2();
                break;
            case 'btnStartPve':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], PanelLevelChoose.prototype, "nodHead", void 0);
    __decorate([
        property(cc.Prefab)
    ], PanelLevelChoose.prototype, "pHeadPerfab", void 0);
    __decorate([
        property(cc.Node)
    ], PanelLevelChoose.prototype, "nodBtnLevel", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PanelLevelChoose.prototype, "spfBtnNormal", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], PanelLevelChoose.prototype, "spfBtnLocked", void 0);
    PanelLevelChoose = __decorate([
        ccclass
    ], PanelLevelChoose);
    return PanelLevelChoose;
}(cc.Component));
exports.default = PanelLevelChoose;

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
        //# sourceMappingURL=PanelLevelChoose.js.map
        