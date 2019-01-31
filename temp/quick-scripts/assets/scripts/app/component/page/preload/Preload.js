(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/preload/Preload.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e53d1BlkntD7okx5HH0u79l', 'Preload', __filename);
// scripts/app/component/page/preload/Preload.ts

Object.defineProperty(exports, "__esModule", { value: true });
//console.log('preload-loading')
var ConfigEntry = require("../../../common/config/ConfigEntry");
var BaseUI_1 = require("../../BaseUI");
var NetController_1 = require("../../../common/net/NetController");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PreloadUI = /** @class */ (function (_super) {
    __extends(PreloadUI, _super);
    function PreloadUI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loadTip = null; // 加载资源时的提示信息
        _this.loadProgress = null;
        _this.progressBar = null;
        return _this;
    }
    PreloadUI.prototype.onLoad = function () {
        _super.prototype.onLoad.call(this);
        window['Partner'].initGameClub();
    };
    PreloadUI.prototype.uiName = function () {
        return "PreloadUI";
    };
    PreloadUI.prototype.start = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                _super.prototype.start.call(this);
                this.loadProgress.string = '0%';
                self = this;
                self.loadConfigs();
                NetController_1.default.INSTANCE.isLoadingPreload = false;
                return [2 /*return*/];
            });
        });
    };
    PreloadUI.prototype.loadConfig = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        cc.loader.loadRes(url, function (err, res) {
                            if (err) {
                                resolve(null);
                            }
                            else {
                                resolve(res);
                            }
                        });
                    })];
            });
        });
    };
    PreloadUI.prototype.loadConfigs = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.loadTip.string = "请稍后，正在加载配置...";
                        self.progressBar.progress = 0.7;
                        self.loadProgress.string = '70%';
                        return [4 /*yield*/, ConfigEntry.loadAllConfig()];
                    case 1:
                        _a.sent();
                        self.loadTip.string = "加载完成，即将进入游戏！";
                        self.progressBar.progress = 1;
                        self.loadProgress.string = '100%';
                        self.gotToLogin();
                        return [2 /*return*/];
                }
            });
        });
    };
    PreloadUI.prototype.gotToLogin = function () {
        cc.director.loadScene("login");
    };
    __decorate([
        property(cc.Label)
    ], PreloadUI.prototype, "loadTip", void 0);
    __decorate([
        property(cc.Label)
    ], PreloadUI.prototype, "loadProgress", void 0);
    __decorate([
        property(cc.ProgressBar)
    ], PreloadUI.prototype, "progressBar", void 0);
    PreloadUI = __decorate([
        ccclass
    ], PreloadUI);
    return PreloadUI;
}(BaseUI_1.default));
exports.default = PreloadUI;

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
        //# sourceMappingURL=Preload.js.map
        