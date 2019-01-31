(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/module/Modules.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '146b11+G0xAO6Rbjs34+oxl', 'Modules', __filename);
// scripts/app/module/Modules.ts

Object.defineProperty(exports, "__esModule", { value: true });
var AccModule_1 = require("../component/page/login/AccModule");
var HomeModule_1 = require("../component/page/home/HomeModule");
var PlayMoudle_1 = require("../component/game/PlayMoudle");
function create() {
    exports.Acc = new AccModule_1.default();
    exports.Home = new HomeModule_1.default();
    exports.Play = new PlayMoudle_1.default();
}
exports.create = create;

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
        //# sourceMappingURL=Modules.js.map
        