(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/persist/GamePersist.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '88aaaO+QdhDOK0KQjR13/TG', 'GamePersist', __filename);
// scripts/app/common/persist/GamePersist.ts

Object.defineProperty(exports, "__esModule", { value: true });
//console.log('GamePersist-loading');
var Defines = require("../Defines");
var ModuleManagerUtil = require("../../module/ModuleManager");
var AccManager_1 = require("../../component/page/login/AccManager");
var ProtoDispatcher = require("../net/proto/ProtoDispatcher");
var NetController_1 = require("../net/NetController");
var SocialManager_1 = require("../social/SocialManager");
var RuntimeManager_1 = require("../runtime/RuntimeManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var GamePersist = /** @class */ (function (_super) {
    __extends(GamePersist, _super);
    function GamePersist() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toastPrefab = null;
        _this.pBtnAudio_1 = null; // 按钮声音
        _this.pBtnAudio_2 = null; // 按钮声音
        _this.nodTip = null;
        _this.nodWaitting = null;
        _this.layerToast = null;
        _this.nodeProtoErrDispatcher = null;
        _this.rootUI = null;
        _this.waitingPool = null;
        _this.waitingNode = null;
        _this.serverTime = 0;
        _this.syncServerTimeTick = 0;
        _this.directionScene = null;
        // 是否显示了且未隐藏切换场景动画
        _this._hasShowTips = false;
        return _this;
    }
    GamePersist_1 = GamePersist;
    Object.defineProperty(GamePersist, "INSTANCE", {
        get: function () {
            return GamePersist_1.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    GamePersist.prototype.onLoad = function () {
        // cc.view.enableAntiAlias(false);
        GamePersist_1.singleInstance = this;
        var self = this;
        cc.game.addPersistRootNode(this.node);
        Partner.registerZipLoad();
        Partner.registerToastCallback(function (msg) {
            self.toast(msg);
        });
        // 网络的root节点
        GamePersist_1.PERSIST_ROOT_NODE_NET = new cc.Node(Defines.GAME_PERSIST_NODE_ROOT_NET);
        this.node.addChild(GamePersist_1.PERSIST_ROOT_NODE_NET);
        this.nodeProtoErrDispatcher = new cc.Node();
        this.node.addChild(this.nodeProtoErrDispatcher);
        // 模块的root节点
        GamePersist_1.PERSIST_ROOT_NODE_MODULE = new cc.Node(Defines.GAME_PERSIST_NODE_ROOT_MODULE);
        this.node.addChild(GamePersist_1.PERSIST_ROOT_NODE_MODULE);
        // 协议各子模块触发器节点添加到NetController
        ProtoDispatcher.fillDispatcher(NetController_1.default.INSTANCE.node);
        // 各子模块逻辑控制初始化
        ModuleManagerUtil.InitManager();
        // // 初始化toast复用节点
        // for (let i = 0; i < 5; i++) {
        //   GamePersist.ToastPool.put(cc.instantiate(this.toastPrefab));
        // }
        SocialManager_1.default.INSTANCE.init();
        RuntimeManager_1.default.INSTANCE.init();
    };
    GamePersist.prototype.start = function () {
        //console.log('GamePersist-start');
        AccManager_1.default.INSTANCE.RetryTimes = 0;
        this.node.x = cc.view.getVisibleSize().width / 2;
        this.node.y = cc.view.getVisibleSize().height / 2;
    };
    Object.defineProperty(GamePersist, "RootNodeNet", {
        get: function () {
            return GamePersist_1.PERSIST_ROOT_NODE_NET;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamePersist, "RootNodeModule", {
        get: function () {
            return GamePersist_1.PERSIST_ROOT_NODE_MODULE;
        },
        enumerable: true,
        configurable: true
    });
    GamePersist.prototype.ForceWaiting = function (msg) {
        this.nodWaitting.active = true;
        this.nodWaitting.getComponent(cc.Animation).play('aniWaitting');
    };
    GamePersist.prototype.CancelWaiting = function () {
        this.nodWaitting.getComponent(cc.Animation).stop('aniWaitting');
        this.nodWaitting.active = false;
    };
    GamePersist.prototype.Toast = function (msg) {
        GamePersist_1.INSTANCE.toast(msg);
    };
    // toast tips
    GamePersist.prototype.toast = function (message, colorType, delayTime) {
        var toastNode = GamePersist_1.ToastPool.get();
        if (!toastNode) {
            toastNode = cc.instantiate(this.toastPrefab);
        }
        toastNode.parent = this.layerToast;
        var toast = toastNode.getComponent("Toast");
        toast.setMessage(message, colorType, delayTime);
        return toast;
    };
    // 显示维护信息
    GamePersist.prototype.showMaintain = function (msg) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.rootUI) {
                    return [2 /*return*/];
                }
                this.ForceWaiting();
                try {
                    // const panel: PanelConfirm = await PanelConfirm.NewPanel();
                    // panel.configOnlyYes();
                    // panel.setContent(msg);
                    // this.rootUI.showPanel(panel);
                }
                catch (err) {
                    cc.error("load confirm panel err:" + err);
                }
                this.CancelWaiting();
                return [2 /*return*/];
            });
        });
    };
    // 开始同步时间
    GamePersist.prototype.startSyncServerTime = function () {
        var self = this;
        var callback = function () {
            AccManager_1.default.INSTANCE.requestServerTime();
        };
        // 为了防止添加2次
        this.unschedule(callback);
        this.schedule(callback, 5);
    };
    // 播放按钮音效
    GamePersist.prototype.btnAudio_1 = function () {
        cc.audioEngine.play(this.pBtnAudio_1, false, 1.0);
    };
    GamePersist.prototype.btnAudio_2 = function () {
        cc.audioEngine.play(this.pBtnAudio_2, false, 1.0);
    };
    // 触发协议错误事件
    GamePersist.prototype.EmitProtoError = function (protoMsgSection, protoName, errCode, errMsg) {
        var eventName = "proto_section_" + protoMsgSection;
        var errProto = {};
        errProto.errCode = errCode;
        errProto.errMsg = errMsg;
        errProto.protoName = protoName;
        this.nodeProtoErrDispatcher.emit(eventName, errProto);
    };
    // 注册关注协议错误事件
    GamePersist.prototype.OnProtoError = function (protoMsgSection, callback, target) {
        var eventName = "proto_section_" + protoMsgSection;
        this.nodeProtoErrDispatcher.on(eventName, callback, target);
    };
    // 取消关注协议错误事件
    GamePersist.prototype.OffProtoError = function (protoMsgSection, callback, target) {
        var eventName = "proto_section_" + protoMsgSection;
        this.nodeProtoErrDispatcher.off(eventName, callback, target);
    };
    Object.defineProperty(GamePersist.prototype, "ServerTime", {
        get: function () {
            return this.serverTime;
        },
        set: function (value) {
            this.serverTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamePersist.prototype, "RootUI", {
        get: function () {
            return this.rootUI;
        },
        set: function (value) {
            this.rootUI = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GamePersist.prototype, "WaitingPool", {
        get: function () {
            return this.waitingPool;
        },
        enumerable: true,
        configurable: true
    });
    // 开始切换场景
    GamePersist.prototype.loadScene = function (sceneName, cb) {
        if (!this._hasShowTips) {
            this._hasShowTips = true;
            this.nodTip.getComponent('Tips').show();
        }
        var time = Date.now();
        cc.director.preloadScene(sceneName, function () {
            var leftTime = Date.now() - time;
            if (false && leftTime < 1000) {
                setTimeout(function () {
                    cc.director.loadScene(sceneName, function () {
                        cb && cb();
                    });
                }, (1000 - leftTime));
            }
            else {
                setTimeout(function () {
                    cc.director.loadScene(sceneName, function () {
                        cb && cb();
                    });
                }, 50);
            }
        });
    };
    // 切换场景完成回调
    GamePersist.prototype.onLoadSceneEnd = function (cb) {
        var _this = this;
        if (!this._hasShowTips) {
            return;
        }
        this._hasShowTips = false;
        var action = cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
            cb && cb();
            _this.nodTip.getComponent('Tips').hide();
        }));
        this.nodTip.runAction(action);
    };
    GamePersist.prototype.panelPopUp = function (node, cb) {
        node.stopAllActions();
        var action = cc.sequence(cc.scaleTo(0.1, 1.02, 1.02), cc.scaleTo(0.1, 0.98, 0.98), cc.scaleTo(0.1, 1, 1), cc.callFunc(function () {
            cb && cb();
        }));
        node.active = true;
        node.scale = 0.95;
        node.runAction(action);
    };
    GamePersist.prototype.panelFadeOut = function (node, cb) {
        node.stopAllActions();
        var action = cc.sequence(cc.fadeOut(0.2), cc.callFunc(function () {
            cb && cb();
        }));
        node.runAction(action);
    };
    GamePersist.prototype.blockInput = function () {
        GamePersist_1.singleInstance.getComponent(cc.BlockInputEvents).enabled = true;
        setTimeout(function () {
            GamePersist_1.singleInstance.node.getComponent(cc.BlockInputEvents).enabled = false;
        }, 1000);
    };
    var GamePersist_1;
    GamePersist.ToastPool = new cc.NodePool();
    GamePersist.PlaySplashPool = new cc.NodePool();
    __decorate([
        property(cc.Prefab)
    ], GamePersist.prototype, "toastPrefab", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GamePersist.prototype, "pBtnAudio_1", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], GamePersist.prototype, "pBtnAudio_2", void 0);
    __decorate([
        property(cc.Node)
    ], GamePersist.prototype, "nodTip", void 0);
    __decorate([
        property(cc.Node)
    ], GamePersist.prototype, "nodWaitting", void 0);
    __decorate([
        property(cc.Node)
    ], GamePersist.prototype, "layerToast", void 0);
    GamePersist = GamePersist_1 = __decorate([
        ccclass
    ], GamePersist);
    return GamePersist;
}(cc.Component));
exports.default = GamePersist;

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
        //# sourceMappingURL=GamePersist.js.map
        