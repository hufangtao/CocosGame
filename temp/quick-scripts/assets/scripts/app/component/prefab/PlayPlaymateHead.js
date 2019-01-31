(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/prefab/PlayPlaymateHead.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '8f120LZskpKE7lPDdiN57qd', 'PlayPlaymateHead', __filename);
// scripts/app/component/prefab/PlayPlaymateHead.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlaymateHead_1 = require("./PlaymateHead");
var PlayDefine_1 = require("../game/PlayDefine");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlayPlaymateHead = /** @class */ (function (_super) {
    __extends(PlayPlaymateHead, _super);
    function PlayPlaymateHead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.prefabPlaymateHead = null;
        // 红/蓝框(默认隐藏)
        _this.colorFrameNode = null;
        // 默认头像
        _this.unknownHead = null;
        _this.nameBgSprite = null;
        // 名字（默认隐藏）
        _this.nameLabel = null;
        // 性别（默认隐藏）
        _this.sexIconNode = null;
        _this.nameBgOriginalWidth = 0;
        _this.nodePlaymateHead = null;
        return _this;
    }
    PlayPlaymateHead.getComponent = function (headNode) {
        var component = headNode.getComponent("PlayPlaymateHead");
        return component;
    };
    PlayPlaymateHead.prototype.onLoad = function () {
        this.nameBgOriginalWidth = this.nameBgSprite.node.width;
        this.nodePlaymateHead = cc.instantiate(this.prefabPlaymateHead);
        this.nodePlaymateHead.parent = this.node;
        this.nodePlaymateHead.setPosition(0, 0);
    };
    PlayPlaymateHead.prototype.start = function () {
        this.colorFrameNode.zIndex = (100);
    };
    PlayPlaymateHead.prototype.setPlaymate = function (headUrl) {
        this.unknownHead.node.active = false;
        var playmateHead = PlaymateHead_1.default.GetComponent(this.nodePlaymateHead);
        playmateHead.HeadUrl = headUrl;
    };
    PlayPlaymateHead.prototype.setScale = function (value) {
        this.node.scale = value;
    };
    PlayPlaymateHead.prototype.setColorFrame = function (side) {
        this.colorFrameNode.active = true;
        if (side === PlayDefine_1.PlaySide.BLU) {
            this.colorFrameNode.getChildByName("blueBg").active = true;
            this.colorFrameNode.getChildByName("redBg").active = false;
        }
        else {
            this.colorFrameNode.getChildByName("blueBg").active = false;
            this.colorFrameNode.getChildByName("redBg").active = true;
        }
    };
    // 如果需要设置名字，先将其显示
    PlayPlaymateHead.prototype.setName = function (name) {
        this.nameBgSprite.node.active = true;
        this.nameLabel.node.active = true;
        this.nameLabel.string = name;
    };
    // 如果需要设置性别，先将其显示
    PlayPlaymateHead.prototype.setSex = function (sex) {
        this.sexIconNode.active = true;
        if (sex === 1) {
            this.sexIconNode.getChildByName("female").active = false;
            this.sexIconNode.getChildByName("male").active = true;
        }
        else {
            this.sexIconNode.getChildByName("male").active = false;
            this.sexIconNode.getChildByName("female").active = true;
        }
    };
    __decorate([
        property(cc.Prefab)
    ], PlayPlaymateHead.prototype, "prefabPlaymateHead", void 0);
    __decorate([
        property(cc.Node)
    ], PlayPlaymateHead.prototype, "colorFrameNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], PlayPlaymateHead.prototype, "unknownHead", void 0);
    __decorate([
        property(cc.Sprite)
    ], PlayPlaymateHead.prototype, "nameBgSprite", void 0);
    __decorate([
        property(cc.Label)
    ], PlayPlaymateHead.prototype, "nameLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PlayPlaymateHead.prototype, "sexIconNode", void 0);
    PlayPlaymateHead = __decorate([
        ccclass
    ], PlayPlaymateHead);
    return PlayPlaymateHead;
}(cc.Component));
exports.default = PlayPlaymateHead;

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
        //# sourceMappingURL=PlayPlaymateHead.js.map
        