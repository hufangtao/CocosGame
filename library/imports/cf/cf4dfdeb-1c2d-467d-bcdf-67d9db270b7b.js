"use strict";
cc._RF.push(module, 'cf4df3rHC1GfbzfZ9nbJwt7', 'RuntimeManager');
// scripts/app/common/runtime/RuntimeManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var NetController_1 = require("../net/NetController");
var GamePersist_1 = require("../persist/GamePersist");
var HomeManager_1 = require("../../component/page/home/HomeManager");
var Message_1 = require("../Message");
var DYNotify_1 = require("../../../dyGame/DYNotify");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RuntimeManager = /** @class */ (function () {
    function RuntimeManager() {
        this.reLaunchOptions = null;
        this.isBackground = false;
    }
    RuntimeManager_1 = RuntimeManager;
    Object.defineProperty(RuntimeManager, "INSTANCE", {
        get: function () {
            if (!RuntimeManager_1.singleInstance) {
                RuntimeManager_1.singleInstance = new RuntimeManager_1();
            }
            return RuntimeManager_1.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    RuntimeManager.prototype.init = function () {
        var self = this;
        window['Partner'].registerOnShowCallback(function (res) {
            self.onShow(res);
        });
        window['Partner'].registerOnHideCallback(function () {
            self.onHide();
        });
    };
    Object.defineProperty(RuntimeManager.prototype, "IsBackground", {
        // 当前是否在后台
        get: function () {
            return this.isBackground;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RuntimeManager.prototype, "ReLaunchOptions", {
        get: function () {
            var options = this.reLaunchOptions;
            this.reLaunchOptions = null;
            return options;
        },
        enumerable: true,
        configurable: true
    });
    RuntimeManager.prototype.onHide = function () {
        this.isBackground = true;
        GamePersist_1.default.INSTANCE.RootUI.onAppHide();
    };
    // 当回到前台的时候处理
    RuntimeManager.prototype.onShow = function (launchOptions) {
        // console.log("#########onShow isback:", this.isBackground, " connect:" + NetController.INSTANCE.Connected);
        if (!this.isBackground) {
            return;
        }
        DYNotify_1.DYNotify.post(Message_1.Message.OnShow);
        this.isBackground = false;
        GamePersist_1.default.INSTANCE.RootUI.onAppShow();
        if (window['Partner'].PARTNER_NAME === "Wechat") {
            // 1007 单聊会话
            // 1008 群聊会话
            var wxScene = launchOptions.scene || -1;
            if (!!launchOptions.reLaunch || wxScene === 1007 || wxScene === 1008) {
                this.reLaunchOptions = launchOptions;
            }
            else {
                this.reLaunchOptions = null;
            }
            // //console.log("#########launch Options:", launchOptions);
        }
        if (!NetController_1.default.INSTANCE.Connected) {
            // 如果没有连接网络 则调用NetController处理网络断开的逻辑
            NetController_1.default.INSTANCE.onSocketClose();
        }
        else {
            // 如果当前有网络 则检查是否是ReLaunch:即点击其他人分享的卡片进入
            HomeManager_1.default.INSTANCE.onReLaunch();
        }
    };
    RuntimeManager = RuntimeManager_1 = __decorate([
        ccclass
    ], RuntimeManager);
    return RuntimeManager;
    var RuntimeManager_1;
}());
exports.default = RuntimeManager;

cc._RF.pop();