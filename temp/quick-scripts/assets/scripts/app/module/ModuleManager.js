(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/module/ModuleManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '22440A5T0JAyKzRJgdSXWh9', 'ModuleManager', __filename);
// scripts/app/module/ModuleManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules = require("./Modules");
var ModuleManager = /** @class */ (function () {
    function ModuleManager() {
    }
    Object.defineProperty(ModuleManager, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new ModuleManager();
            }
            return this.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    // 初始化
    ModuleManager.prototype.init = function () {
        if (!this.subModules) {
            this.subModules = [];
            // 各子模块的创建
            Modules.create();
        }
        this.subModules.forEach(function (mod) {
            mod.init();
        });
    };
    /**
     * 添加新的模块
     */
    ModuleManager.prototype.addModule = function (mod) {
        this.subModules.push(mod);
    };
    return ModuleManager;
}());
exports.ModuleManager = ModuleManager;
function InitManager() {
    ModuleManager.INSTANCE.init();
}
exports.InitManager = InitManager;
function AddModule(mod) {
    ModuleManager.INSTANCE.addModule(mod);
}
exports.AddModule = AddModule;

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
        //# sourceMappingURL=ModuleManager.js.map
        