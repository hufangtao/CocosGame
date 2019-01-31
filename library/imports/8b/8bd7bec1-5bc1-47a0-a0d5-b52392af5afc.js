"use strict";
cc._RF.push(module, '8bd7b7BW8FHoKDVtSOSr1r8', 'Defines');
// scripts/app/common/Defines.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 游戏 网络 持久化节点的根节点
exports.GAME_PERSIST_NODE_ROOT_NET = "node-game-persist-net-root";
exports.GAME_PERSIST_NODE_ROOT_MODULE = "node-game-persist-module-root";
// 配置文件的游戏资源目录
exports.RESOURCE_CONFIG_PATH_ROOT = "config/";
exports.UI_LAYER_POP_TIPS = "node-ui-pop-tips";
exports.UI_LAYER_WAITING = "node-ui-layer-waiting";
exports.ZORDER_UI_LAYER_POP_TIPS = 100;
exports.ZORDER_UI_LAYER_WAITING = 101;
var OpenHomeFrom;
(function (OpenHomeFrom) {
    OpenHomeFrom[OpenHomeFrom["UI_LOGIN"] = 1] = "UI_LOGIN";
    OpenHomeFrom[OpenHomeFrom["UI_PLAY"] = 2] = "UI_PLAY";
    OpenHomeFrom[OpenHomeFrom["UI_GUIDE"] = 3] = "UI_GUIDE";
    OpenHomeFrom[OpenHomeFrom["UI_AIFIN"] = 4] = "UI_AIFIN";
})(OpenHomeFrom = exports.OpenHomeFrom || (exports.OpenHomeFrom = {}));
var Fortune;
(function (Fortune) {
    Fortune[Fortune["Gold"] = 1] = "Gold";
    Fortune[Fortune["Score"] = 2] = "Score";
    Fortune[Fortune["Star"] = 3] = "Star";
    Fortune[Fortune["Energy"] = 4] = "Energy";
    Fortune[Fortune["PvpBuff"] = 5] = "PvpBuff";
})(Fortune = exports.Fortune || (exports.Fortune = {}));
exports.ValueKey = {
    levelScore: 'levelScore',
    gameRate: 'gameRate',
};

cc._RF.pop();