(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/levelChoose/prefab/BtnLevel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'ade5e9GENNBpIhsaqKAZmXf', 'BtnLevel', __filename);
// scripts/app/component/levelChoose/prefab/BtnLevel.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BtnLevel = /** @class */ (function (_super) {
    __extends(BtnLevel, _super);
    function BtnLevel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isAllChildrenUse = false;
        _this.labLevel = null;
        _this.nodEmptyStar = null;
        _this.nodStar = null;
        _this.level = 0;
        return _this;
    }
    BtnLevel.prototype.onLoad = function () {
    };
    BtnLevel.prototype.setInteractable = function (Interactable) {
        this.node.getComponent(cc.Button).interactable = Interactable;
        if (!Interactable) {
            this.nodEmptyStar.active = false;
            this.nodStar.active = false;
        }
    };
    BtnLevel.prototype.setLevel = function (level) {
        this.labLevel.string = level;
        this.level = level;
    };
    BtnLevel.prototype.setCurLevel = function (isShowStar) {
        if (isShowStar === void 0) { isShowStar = false; }
        this.node.getChildByName('labLevel').active = false;
        if (!isShowStar) {
            this.nodEmptyStar.active = false;
            this.nodStar.active = false;
        }
    };
    BtnLevel.prototype.setStar = function (PveStat) {
        this.nodEmptyStar.active = true;
        this.nodStar.active = true;
        var _score = Modules_1.Play.LevelDatas['level_' + this.level].score;
        if (!_score) {
            return;
        }
        if (PveStat.score >= _score[2]) {
            this.nodStar.children[0].active = true;
            this.nodStar.children[1].active = true;
            this.nodStar.children[2].active = true;
        }
        else if (PveStat.score >= _score[1]) {
            this.nodStar.children[0].active = true;
            this.nodStar.children[1].active = true;
            this.nodStar.children[2].active = false;
        }
        else if (PveStat.score >= _score[0]) {
            this.nodStar.children[0].active = true;
            this.nodStar.children[1].active = false;
            this.nodStar.children[2].active = false;
        }
        else {
            this.nodStar.children[0].active = false;
            this.nodStar.children[1].active = false;
            this.nodStar.children[2].active = false;
        }
    };
    __decorate([
        property
    ], BtnLevel.prototype, "isAllChildrenUse", void 0);
    __decorate([
        property(cc.Label)
    ], BtnLevel.prototype, "labLevel", void 0);
    __decorate([
        property(cc.Node)
    ], BtnLevel.prototype, "nodEmptyStar", void 0);
    __decorate([
        property(cc.Node)
    ], BtnLevel.prototype, "nodStar", void 0);
    BtnLevel = __decorate([
        ccclass
    ], BtnLevel);
    return BtnLevel;
}(cc.Component));
exports.default = BtnLevel;

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
        //# sourceMappingURL=BtnLevel.js.map
        