"use strict";
cc._RF.push(module, '146b11+G0xAO6Rbjs34+oxl', 'Modules');
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