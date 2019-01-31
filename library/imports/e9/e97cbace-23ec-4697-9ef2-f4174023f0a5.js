"use strict";
cc._RF.push(module, 'e97cbrOI+xGl57y9BdAI/Cl', 'NetUtil');
// scripts/app/common/net/NetUtil.ts

Object.defineProperty(exports, "__esModule", { value: true });
var NetController_1 = require("./NetController");
var NetUtil = /** @class */ (function () {
    function NetUtil() {
    }
    NetUtil.SendMsg = function (msg) {
        // console.log(msg);
        NetController_1.default.INSTANCE.send(msg);
    };
    return NetUtil;
}());
exports.default = NetUtil;

cc._RF.pop();