"use strict";
cc._RF.push(module, 'c770cx2EhhI1LpesgKpHrsM', 'BaseUI');
// scripts/app/component/BaseUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Defines_1 = require("../common/Defines");
var GamePersist_1 = require("../common/persist/GamePersist");
// 所有场景入口UI的基类
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var BaseUI = /** @class */ (function (_super) {
    __extends(BaseUI, _super);
    function BaseUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toastPrefab = null;
        _this.panelLayer = null;
        _this.toastLayer = null;
        _this.waitingLayer = null;
        return _this;
    }
    BaseUI.prototype.onLoad = function () {
        GamePersist_1.default.ToastPool.clear();
        if (CC_DEBUG) {
            // cc.director.setDisplayStats(false);
            // MemoryDetector.showMemoryStatus();
        }
        var canvas = this.node.getComponent(cc.Canvas);
        if (canvas) {
            if (canvas.designResolution.width / canvas.designResolution.height <= cc.view.getCanvasSize().width / cc.view.getCanvasSize().height) {
                canvas.fitHeight = true;
                canvas.fitWidth = false;
            }
            else {
                canvas.fitHeight = false;
                canvas.fitWidth = true;
            }
            // panel layer
            this.panelLayer = new cc.Node(Defines_1.UI_LAYER_POP_TIPS);
            this.panelLayer.parent = this.node;
            this.panelLayer.setPosition(0, 0);
            this.panelLayer.zIndex = 99;
            // toast layer
            this.toastLayer = new cc.Node(Defines_1.UI_LAYER_POP_TIPS);
            this.toastLayer.parent = canvas.node;
            this.toastLayer.x = 0;
            this.toastLayer.y = 0;
            this.toastLayer.zIndex = Defines_1.ZORDER_UI_LAYER_POP_TIPS;
            // waiting layer
            this.waitingLayer = new cc.Node(Defines_1.UI_LAYER_WAITING);
            this.waitingLayer.parent = canvas.node;
            this.waitingLayer.setPosition(0, 0);
            this.waitingLayer.zIndex = Defines_1.ZORDER_UI_LAYER_WAITING;
        }
    };
    BaseUI.prototype.start = function () {
        GamePersist_1.default.INSTANCE.RootUI = this;
        this.onLoadSceneEnd();
    };
    BaseUI.prototype.onLoadSceneEnd = function () {
        GamePersist_1.default.INSTANCE.onLoadSceneEnd();
    };
    BaseUI.prototype.uiName = function () {
        throw (new Error("must define your ui'name"));
    };
    // 显示面板
    BaseUI.prototype.showPanel = function (panel) {
        var viewNode = panel.viewNode();
        viewNode.parent = this.panelLayer;
    };
    // 销毁panel中的节点 
    BaseUI.prototype.destroyPanel = function () {
        this.panelLayer.removeAllChildren(true);
    };
    // 显示等待
    BaseUI.prototype.showWaiting = function (node, msg) {
    };
    BaseUI.prototype.onAppHide = function () {
    };
    BaseUI.prototype.onAppShow = function () {
    };
    __decorate([
        property(cc.Prefab)
    ], BaseUI.prototype, "toastPrefab", void 0);
    BaseUI = __decorate([
        ccclass
    ], BaseUI);
    return BaseUI;
}(cc.Component));
exports.default = BaseUI;

cc._RF.pop();