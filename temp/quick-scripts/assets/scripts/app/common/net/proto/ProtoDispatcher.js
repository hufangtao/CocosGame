(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/proto/ProtoDispatcher.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '1a75fyihy9NAbyBx2PvOEB3', 'ProtoDispatcher', __filename);
// scripts/app/common/net/proto/ProtoDispatcher.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher_1 = require("../../event/EventDispatcher");
var DispatcherList = [];
exports.DispatcherList = DispatcherList;
exports.DebugDispatcher = new EventDispatcher_1.default();
DispatcherList[9] = exports.DebugDispatcher;
exports.AccDispatcher = new EventDispatcher_1.default();
DispatcherList[10] = exports.AccDispatcher;
exports.PlayerDispatcher = new EventDispatcher_1.default();
DispatcherList[11] = exports.PlayerDispatcher;
exports.RoomDispatcher = new EventDispatcher_1.default();
DispatcherList[12] = exports.RoomDispatcher;
exports.ActivityDispatcher = new EventDispatcher_1.default();
DispatcherList[13] = exports.ActivityDispatcher;
exports.ChatDispatcher = new EventDispatcher_1.default();
DispatcherList[14] = exports.ChatDispatcher;
exports.GoodsDispatcher = new EventDispatcher_1.default();
DispatcherList[15] = exports.GoodsDispatcher;
exports.TaskDispatcher = new EventDispatcher_1.default();
DispatcherList[16] = exports.TaskDispatcher;
exports.AwardDispatcher = new EventDispatcher_1.default();
DispatcherList[17] = exports.AwardDispatcher;
exports.PaymentDispatcher = new EventDispatcher_1.default();
DispatcherList[18] = exports.PaymentDispatcher;
exports.RankDispatcher = new EventDispatcher_1.default();
DispatcherList[19] = exports.RankDispatcher;
exports.PlayDispatcher = new EventDispatcher_1.default();
DispatcherList[20] = exports.PlayDispatcher;
exports.BuffDispatcher = new EventDispatcher_1.default();
DispatcherList[21] = exports.BuffDispatcher;
exports.SignInDispatcher = new EventDispatcher_1.default();
DispatcherList[22] = exports.SignInDispatcher;
function fillDispatcher(parentNode) {
    var coreNode;
    coreNode = new cc.Node("node-proto-dispatcher-debug");
    exports.DebugDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-acc");
    exports.AccDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-player");
    exports.PlayerDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-room");
    exports.RoomDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-activity");
    exports.ActivityDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-chat");
    exports.ChatDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-goods");
    exports.GoodsDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-task");
    exports.TaskDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-award");
    exports.AwardDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-payment");
    exports.PaymentDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-rank");
    exports.RankDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-play");
    exports.PlayDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-buff");
    exports.BuffDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
    coreNode = new cc.Node("node-proto-dispatcher-sign_in");
    exports.SignInDispatcher.node = coreNode;
    parentNode.addChild(coreNode);
}
exports.fillDispatcher = fillDispatcher;

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
        //# sourceMappingURL=ProtoDispatcher.js.map
        