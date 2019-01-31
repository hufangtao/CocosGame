(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/Message.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '923878vdbJJSqnLZR/3M3sf', 'Message', __filename);
// scripts/app/common/Message.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message() {
    }
    Message.UIRankUpdate = 'UIRankUpdate';
    Message.OnShow = 'OnShow';
    Message.EVENT_MODULE_PLAYER_FORTUNE = 'EVENT_MODULE_PLAYER_FORTUNE'; // 玩家财富信息变化
    Message.EVENT_MODULE_BIG_LOTTERY = 'EVENT_MODULE_BIG_LOTTERY'; // 全服大奖信息变化
    Message.EVENT_MODULE_PLAYER_PRIZE = 'EVENT_MODULE_PLAYER_PRIZE'; // 玩家物品信息变化
    Message.EVENT_MODULE_PLAYER_PRIZE_INIT = 'EVENT_MODULE_PLAYER_PRIZE_INIT'; // 玩家物品初始化
    Message.EVENT_MODULE_PLAYER_TASK = 'EVENT_MODULE_PLAYER_TASK'; // 玩家任务信息变化
    Message.PLAY_PVE = 'PLAY_PVE';
    Message.GAME_WIN = 'GAME_WIN';
    Message.GAME_LOST = 'GAME_LOST';
    Message.RANK_RESULT = 'RANK_RESULT';
    Message.GET_SHARE_CNT = 'GET_SHARE_CNT';
    Message.EVENT_SLOT_CLICK = 'EVENT_SLOT_CLICK';
    Message.EVENT_TILE_CLICK = 'EVENT_TILE_CLICK';
    Message.BOARD_TILE_COMPONENT = 'BOARD_TILE_COMPONENT';
    Message.BOARD_SLOT_COMPONENT = 'BOARD_SLOT_COMPONENT';
    Message.ROOM_COMPONENT = 'ROOM_COMPONENT';
    Message.ROOM_AUDIO_COMPONENT = 'ROOM_AUDIO_COMPONENT';
    Message.BOARD_COMPONENT = 'BOARD_COMPONENT';
    Message.ROUND_INDICATOR_COMPONENT = 'ROUND_INDICATOR_COMPONENT';
    Message.OVER_COMPONENT = 'OVER_COMPONENT';
    Message.SIGN_List = 'SIGN_List'; // 签到列表信息返回
    Message.SIGN_RESULT = 'SIGN_RESULT'; // 签到结果信息返回
    Message.TURNTABLE_LIST = 'TURNTABLE_LIST'; // 转盘结果返回
    return Message;
}());
exports.Message = Message;

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
        //# sourceMappingURL=Message.js.map
        