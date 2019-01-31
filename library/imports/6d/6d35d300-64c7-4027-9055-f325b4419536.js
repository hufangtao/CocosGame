"use strict";
cc._RF.push(module, '6d35dMAZMdAJ5BV8yW0QZU2', 'LoginUI');
// scripts/app/component/page/login/LoginUI.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AccManager_1 = require("./AccManager");
var BaseUI_1 = require("../../BaseUI");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var Loader_1 = require("../../../common/loader/Loader");
var DotAnimation_1 = require("../preload/DotAnimation");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LoginUI = /** @class */ (function (_super) {
    __extends(LoginUI, _super);
    function LoginUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeAccInput = null;
        _this.nodeAccCreateRole = null;
        _this.btnLogin = null;
        _this.btnServer = null;
        _this.btnReAuthorize = null;
        _this.userAccount = null;
        _this.loadingAnimation = null;
        return _this;
    }
    /*
    ================
    生命周期回调
    ================
    */
    LoginUI.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        this.btnLogin.node.on(cc.Node.EventType.TOUCH_END, this.handleLoginWithInput, this);
        this.btnServer.node.on(cc.Node.EventType.TOUCH_END, this.handleSelectServer, this);
        this.btnServer.node.active = false;
        this.btnReAuthorize.node.on(cc.Node.EventType.TOUCH_END, this.onReAuthorize, this);
        // if (Partner.PARTNER_NAME === "Dev") {
        //   this.btnTestWaiting.node.active = true;
        // } else {
        //   this.btnTestWaiting.node.active = false;
        // }
        //固定服务器ID
        AccManager_1.default.INSTANCE.setServerData(window['Partner'].getServerId());
        var dotAnimation = DotAnimation_1.default.NewDotAnimation();
        dotAnimation.node.parent = this.node;
        dotAnimation.node.y = (-458);
        this.loadingAnimation = dotAnimation;
    };
    LoginUI.prototype.hideLoading = function () {
        if (this.loadingAnimation) {
            this.loadingAnimation.node.active = false;
        }
    };
    LoginUI.prototype.showLoading = function () {
        if (this.loadingAnimation) {
            this.loadingAnimation.node.active = true;
        }
    };
    LoginUI.prototype.start = function () {
        _super.prototype.start.call(this);
        AccManager_1.default.INSTANCE.LoginUI = this;
        // 调用第三方合作商进行账号授权操作
        var self = this;
        window['Partner'].doAccAuthorize(function (data) {
            AccManager_1.default.INSTANCE.didGetAuthorize(data);
        }, function (howTo) {
            self.showAccInput(howTo);
        }, AccManager_1.default.INSTANCE.existSavedGameAccount());
    };
    LoginUI.prototype.onDestroy = function () {
        AccManager_1.default.INSTANCE.LoginUI = null;
    };
    LoginUI.prototype.uiName = function () {
        return "LoginUI";
    };
    LoginUI.prototype.onReAuthorize = function () {
        // GamePersist.INSTANCE.btnAudio_1();
        var that = this;
        this.showLoading();
        // 调用第三方合作商进行账号授权操作
        window['Partner'].doAccAuthorize(function (data) {
            AccManager_1.default.INSTANCE.didGetAuthorize(data);
        }, function (howTo) {
            that.showAccInput(howTo);
        }, AccManager_1.default.INSTANCE.existSavedGameAccount());
    };
    // ================================================
    /*
    howTo
        0: 什么都不做
        1: 显示输入账号界面 这个仅在开发环境才会有
        2: 显示重新登录按钮 用于新触发第三方登录逻辑
    */
    LoginUI.prototype.showAccInput = function (howTo) {
        if (howTo === 0) {
            this.nodeAccInput.active = false;
            this.btnReAuthorize.node.active = false;
            return;
        }
        this.hideLoading();
        if (howTo === 1) {
            this.nodeAccInput.active = true;
        }
        else {
            this.btnReAuthorize.node.active = true;
        }
    };
    // 使用玩家输入的账号进行登录
    LoginUI.prototype.handleLoginWithInput = function (event) {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var account = this.userAccount.string;
        if (!account || account.length < 1) {
            GamePersist_1.default.INSTANCE.toast("请输入账号");
            return;
        }
        var data = {};
        data.openid = account;
        data.openkey = account;
        data.platform = "Dev";
        data.params = "";
        window['Partner'].didAccAuthorize(data);
    };
    LoginUI.prototype.handleSelectServer = function (event) {
        var self = this;
        GamePersist_1.default.INSTANCE.btnAudio_1();
        GamePersist_1.default.INSTANCE.ForceWaiting();
        Loader_1.default.loadSingle("prefab/login/SelectServer", function (err, ss) {
            var ssNode = cc.instantiate(ss);
            ssNode.parent = self.node;
            ssNode.setPosition(0, 0);
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    // 显示创建角色的界面
    LoginUI.prototype.showAccCreateRole = function () {
        var self = this;
        this.showAccInput(0);
        GamePersist_1.default.INSTANCE.ForceWaiting();
        Loader_1.default.loadSingle("prefab/login/AccCreateRole", function (err, prefab) {
            var nodeCreateRole = cc.instantiate(prefab);
            nodeCreateRole.parent = self.nodeAccCreateRole;
            nodeCreateRole.setPosition(0, 0);
            GamePersist_1.default.INSTANCE.CancelWaiting();
        });
    };
    __decorate([
        property(cc.Node)
    ], LoginUI.prototype, "nodeAccInput", void 0);
    __decorate([
        property(cc.Node)
    ], LoginUI.prototype, "nodeAccCreateRole", void 0);
    __decorate([
        property(cc.Button)
    ], LoginUI.prototype, "btnLogin", void 0);
    __decorate([
        property(cc.Button)
    ], LoginUI.prototype, "btnServer", void 0);
    __decorate([
        property(cc.Button)
    ], LoginUI.prototype, "btnReAuthorize", void 0);
    __decorate([
        property(cc.EditBox)
    ], LoginUI.prototype, "userAccount", void 0);
    LoginUI = __decorate([
        ccclass
    ], LoginUI);
    return LoginUI;
}(BaseUI_1.default));
exports.default = LoginUI;

cc._RF.pop();