(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/PlayDefine.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'c2780izCx1En6M8KlRYVvoB', 'PlayDefine', __filename);
// scripts/app/component/game/PlayDefine.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.ACC_BAR_MAX = 70;
exports.Event_type = {
    RANK_RESULT: 'rankResult',
    GAMESTART: 'gameStart',
};
exports.ONE_GAME_TIME = 120; // pvp一局游戏时间
// 生成宠物需要的步数
exports.STEP_SPAWN_PET = 8;
exports.STEP_SPAWN_BUG = 8;
// 场上宠物最大数量
exports.COUNT_BOARD_PET = 8;
// 场上虫子最大数量
exports.COUNT_BOARD_BUG = 8;
// pvp水果颜色个数
exports.PVP_FRUIT_COLOR_CNT = 6;
exports.TEACH_FRUIT_COLOR_CNT = 5;
exports.MAX_MATCH = 20;
var Action_type;
(function (Action_type) {
    Action_type[Action_type["MoveTo"] = 1] = "MoveTo";
    Action_type[Action_type["GateTo"] = 2] = "GateTo";
    Action_type[Action_type["Tip"] = 3] = "Tip";
    Action_type[Action_type["Shake"] = 4] = "Shake";
    Action_type[Action_type["GuideMask"] = 5] = "GuideMask";
    Action_type[Action_type["NoMatch"] = 5] = "NoMatch";
})(Action_type = exports.Action_type || (exports.Action_type = {}));
exports.SCORE = {
    "level_1": 100,
    "level_2": 200,
    "level_3": 300,
    "level_4": 400,
    "level_5": 500,
    "level_6": 600,
    "level_7": 700,
    "level_8": 800,
    "level_9": 900,
    "level_10": 1000,
};
var ColorType;
(function (ColorType) {
    ColorType[ColorType["Red"] = 1] = "Red";
    ColorType[ColorType["Green"] = 2] = "Green";
})(ColorType = exports.ColorType || (exports.ColorType = {}));
var FaceType;
(function (FaceType) {
    FaceType[FaceType["Sand"] = 1] = "Sand";
    FaceType[FaceType["Happy"] = 2] = "Happy";
})(FaceType = exports.FaceType || (exports.FaceType = {}));
var FaceAnimationType;
(function (FaceAnimationType) {
    FaceAnimationType[FaceAnimationType["Xuayun"] = 1] = "Xuayun";
    FaceAnimationType[FaceAnimationType["Yanhua"] = 2] = "Yanhua";
    FaceAnimationType[FaceAnimationType["Yun"] = 3] = "Yun";
})(FaceAnimationType = exports.FaceAnimationType || (exports.FaceAnimationType = {}));
// block销毁方式
var BLOCKDES_TYPE;
(function (BLOCKDES_TYPE) {
    BLOCKDES_TYPE[BLOCKDES_TYPE["NOACTION_NODES"] = 1] = "NOACTION_NODES";
    BLOCKDES_TYPE[BLOCKDES_TYPE["NOACTION_FIRSTDES"] = 2] = "NOACTION_FIRSTDES";
    BLOCKDES_TYPE[BLOCKDES_TYPE["ACTION_FIRSTDES"] = 3] = "ACTION_FIRSTDES";
    BLOCKDES_TYPE[BLOCKDES_TYPE["ACTION_LASTDES"] = 4] = "ACTION_LASTDES";
    BLOCKDES_TYPE[BLOCKDES_TYPE["ACTION_NODES"] = 5] = "ACTION_NODES";
})(BLOCKDES_TYPE = exports.BLOCKDES_TYPE || (exports.BLOCKDES_TYPE = {}));
var GAME_STAT;
(function (GAME_STAT) {
    GAME_STAT[GAME_STAT["GAMEING"] = 1] = "GAMEING";
    GAME_STAT[GAME_STAT["BONUSTIME"] = 2] = "BONUSTIME";
    GAME_STAT[GAME_STAT["CHECKRESULT"] = 3] = "CHECKRESULT";
    GAME_STAT[GAME_STAT["GAMEOVER"] = 4] = "GAMEOVER";
})(GAME_STAT = exports.GAME_STAT || (exports.GAME_STAT = {}));
exports.PHASE = [
    {
        phase: 1,
        color_num: 3,
        step: 0,
    },
    {
        phase: 2,
        color_num: 4,
        step: 30,
    },
    {
        phase: 3,
        color_num: 5,
        step: 60,
    },
    {
        phase: 4,
        color_num: 5,
        step: 100,
    },
];
var GRID_TYPE;
(function (GRID_TYPE) {
    GRID_TYPE[GRID_TYPE["EMPTY"] = 0] = "EMPTY";
    GRID_TYPE[GRID_TYPE["TILE"] = 1] = "TILE";
    GRID_TYPE[GRID_TYPE["LEFTTRANSPORT"] = 2] = "LEFTTRANSPORT";
    GRID_TYPE[GRID_TYPE["RIGHTTRANSPORT"] = 3] = "RIGHTTRANSPORT";
    GRID_TYPE[GRID_TYPE["UPTRANSPORT"] = 4] = "UPTRANSPORT";
    GRID_TYPE[GRID_TYPE["DOWNTRANSPORT"] = 5] = "DOWNTRANSPORT";
    GRID_TYPE[GRID_TYPE["UPGATE"] = 6] = "UPGATE";
    GRID_TYPE[GRID_TYPE["DOWNGATE"] = 7] = "DOWNGATE";
})(GRID_TYPE = exports.GRID_TYPE || (exports.GRID_TYPE = {}));
var TILE_TYPE;
(function (TILE_TYPE) {
    TILE_TYPE[TILE_TYPE["BLOCK"] = 1] = "BLOCK";
    TILE_TYPE[TILE_TYPE["BOMB"] = 2] = "BOMB";
    TILE_TYPE[TILE_TYPE["PET"] = 3] = "PET";
    TILE_TYPE[TILE_TYPE["WALL"] = 4] = "WALL";
    TILE_TYPE[TILE_TYPE["TABLEWARE"] = 5] = "TABLEWARE";
})(TILE_TYPE = exports.TILE_TYPE || (exports.TILE_TYPE = {}));
var BLOCK_COLOR;
(function (BLOCK_COLOR) {
    BLOCK_COLOR[BLOCK_COLOR["RED"] = 1] = "RED";
    BLOCK_COLOR[BLOCK_COLOR["GREEN"] = 2] = "GREEN";
    BLOCK_COLOR[BLOCK_COLOR["BLUE"] = 3] = "BLUE";
    BLOCK_COLOR[BLOCK_COLOR["YELLOW"] = 4] = "YELLOW";
    BLOCK_COLOR[BLOCK_COLOR["PURPLE"] = 5] = "PURPLE";
    BLOCK_COLOR[BLOCK_COLOR["SIX"] = 6] = "SIX";
    BLOCK_COLOR[BLOCK_COLOR["COLORS"] = 7] = "COLORS";
})(BLOCK_COLOR = exports.BLOCK_COLOR || (exports.BLOCK_COLOR = {}));
var BOMB_TYPE;
(function (BOMB_TYPE) {
    BOMB_TYPE[BOMB_TYPE["BOMB_ROW"] = 1] = "BOMB_ROW";
    BOMB_TYPE[BOMB_TYPE["BOMB_COLUMN"] = 2] = "BOMB_COLUMN";
    BOMB_TYPE[BOMB_TYPE["BOMB_AROUND"] = 3] = "BOMB_AROUND";
    BOMB_TYPE[BOMB_TYPE["BOMB_ONE_COLOR"] = 4] = "BOMB_ONE_COLOR";
    BOMB_TYPE[BOMB_TYPE["BOMB_ROWSTRONG"] = 5] = "BOMB_ROWSTRONG";
    BOMB_TYPE[BOMB_TYPE["BOMB_COLUMNSTRONG"] = 6] = "BOMB_COLUMNSTRONG";
})(BOMB_TYPE = exports.BOMB_TYPE || (exports.BOMB_TYPE = {}));
var PET_TYPE;
(function (PET_TYPE) {
    PET_TYPE[PET_TYPE["TYPE_1"] = 1] = "TYPE_1";
    PET_TYPE[PET_TYPE["TYPE_2"] = 2] = "TYPE_2";
    PET_TYPE[PET_TYPE["TYPE_3"] = 3] = "TYPE_3";
    PET_TYPE[PET_TYPE["TYPE_4"] = 4] = "TYPE_4";
})(PET_TYPE = exports.PET_TYPE || (exports.PET_TYPE = {}));
var WALL_TYPE;
(function (WALL_TYPE) {
    WALL_TYPE[WALL_TYPE["TYPE_1"] = 1] = "TYPE_1";
    WALL_TYPE[WALL_TYPE["TYPE_2"] = 2] = "TYPE_2";
    WALL_TYPE[WALL_TYPE["TYPE_3"] = 3] = "TYPE_3";
    WALL_TYPE[WALL_TYPE["TYPE_4"] = 4] = "TYPE_4";
})(WALL_TYPE = exports.WALL_TYPE || (exports.WALL_TYPE = {}));
var TABLEWARE_TYPE;
(function (TABLEWARE_TYPE) {
    TABLEWARE_TYPE[TABLEWARE_TYPE["TYPE_1"] = 1] = "TYPE_1";
    TABLEWARE_TYPE[TABLEWARE_TYPE["TYPE_2"] = 2] = "TYPE_2";
    TABLEWARE_TYPE[TABLEWARE_TYPE["TYPE_3"] = 3] = "TYPE_3";
    TABLEWARE_TYPE[TABLEWARE_TYPE["TYPE_4"] = 4] = "TYPE_4";
})(TABLEWARE_TYPE = exports.TABLEWARE_TYPE || (exports.TABLEWARE_TYPE = {}));
var TRANSPORT_TYPE;
(function (TRANSPORT_TYPE) {
    TRANSPORT_TYPE[TRANSPORT_TYPE["LEFT"] = 1] = "LEFT";
    TRANSPORT_TYPE[TRANSPORT_TYPE["RIGHT"] = 2] = "RIGHT";
    TRANSPORT_TYPE[TRANSPORT_TYPE["UP"] = 3] = "UP";
    TRANSPORT_TYPE[TRANSPORT_TYPE["DOWN"] = 4] = "DOWN";
})(TRANSPORT_TYPE = exports.TRANSPORT_TYPE || (exports.TRANSPORT_TYPE = {}));
var PARTICAL_TYPE;
(function (PARTICAL_TYPE) {
    PARTICAL_TYPE[PARTICAL_TYPE["BOMB_COL"] = 1] = "BOMB_COL";
    PARTICAL_TYPE[PARTICAL_TYPE["BLOCK"] = 2] = "BLOCK";
    PARTICAL_TYPE[PARTICAL_TYPE["TABLEWARE"] = 3] = "TABLEWARE";
    PARTICAL_TYPE[PARTICAL_TYPE["WALL"] = 4] = "WALL";
})(PARTICAL_TYPE = exports.PARTICAL_TYPE || (exports.PARTICAL_TYPE = {}));
// 1.可消除可移动的球；2.可消除不可移动的墙；3.可移动，只能炸掉的bug；4.可移动不可消除，可掉落的宠物；5.三叶草
var OBSTACLE_TYPE;
(function (OBSTACLE_TYPE) {
})(OBSTACLE_TYPE = exports.OBSTACLE_TYPE || (exports.OBSTACLE_TYPE = {}));
var PlaySide;
(function (PlaySide) {
    PlaySide[PlaySide["UNKNOWN"] = 0] = "UNKNOWN";
    PlaySide[PlaySide["RED"] = 1] = "RED";
    PlaySide[PlaySide["BLU"] = 2] = "BLU";
})(PlaySide = exports.PlaySide || (exports.PlaySide = {}));
var GUIDE_TYPE;
(function (GUIDE_TYPE) {
    GUIDE_TYPE[GUIDE_TYPE["SAVE_SUC"] = 0] = "SAVE_SUC";
    GUIDE_TYPE[GUIDE_TYPE["TIME"] = 1] = "TIME";
    GUIDE_TYPE[GUIDE_TYPE["HEAD"] = 2] = "HEAD";
    GUIDE_TYPE[GUIDE_TYPE["COUNT"] = 3] = "COUNT";
    GUIDE_TYPE[GUIDE_TYPE["TIME60"] = 4] = "TIME60";
    GUIDE_TYPE[GUIDE_TYPE["BUFF_TIP"] = 5] = "BUFF_TIP";
    GUIDE_TYPE[GUIDE_TYPE["USE_BUFF_COUNT"] = 6] = "USE_BUFF_COUNT";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF1_SUC"] = 7] = "ACTIVE_BUFF1_SUC";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF2_SUC"] = 8] = "ACTIVE_BUFF2_SUC";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF3_SUC"] = 9] = "ACTIVE_BUFF3_SUC";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF4_SUC"] = 10] = "ACTIVE_BUFF4_SUC";
    GUIDE_TYPE[GUIDE_TYPE["GET_BUFF"] = 11] = "GET_BUFF";
    GUIDE_TYPE[GUIDE_TYPE["BOMB_SUC"] = 12] = "BOMB_SUC";
    GUIDE_TYPE[GUIDE_TYPE["BOMB_COL_STR_SUC"] = 13] = "BOMB_COL_STR_SUC";
    GUIDE_TYPE[GUIDE_TYPE["GEN_FLOWER1"] = 14] = "GEN_FLOWER1";
    GUIDE_TYPE[GUIDE_TYPE["GEN_FLOWER2"] = 15] = "GEN_FLOWER2";
    GUIDE_TYPE[GUIDE_TYPE["BOMB_COL"] = 100] = "BOMB_COL";
    GUIDE_TYPE[GUIDE_TYPE["BOMB_COL_STR"] = 101] = "BOMB_COL_STR";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF1"] = 102] = "ACTIVE_BUFF1";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF2"] = 103] = "ACTIVE_BUFF2";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF3"] = 104] = "ACTIVE_BUFF3";
    GUIDE_TYPE[GUIDE_TYPE["ACTIVE_BUFF4"] = 105] = "ACTIVE_BUFF4";
    GUIDE_TYPE[GUIDE_TYPE["MATCH1"] = 106] = "MATCH1";
    GUIDE_TYPE[GUIDE_TYPE["MATCH2"] = 107] = "MATCH2";
    GUIDE_TYPE[GUIDE_TYPE["SAVE"] = 108] = "SAVE";
})(GUIDE_TYPE = exports.GUIDE_TYPE || (exports.GUIDE_TYPE = {}));
var TILE_ZINDEX;
(function (TILE_ZINDEX) {
    TILE_ZINDEX[TILE_ZINDEX["LOW"] = 0] = "LOW";
    TILE_ZINDEX[TILE_ZINDEX["NORMAL"] = 1] = "NORMAL";
    TILE_ZINDEX[TILE_ZINDEX["ACTION_LOW"] = 10] = "ACTION_LOW";
    TILE_ZINDEX[TILE_ZINDEX["ACTION"] = 11] = "ACTION";
})(TILE_ZINDEX = exports.TILE_ZINDEX || (exports.TILE_ZINDEX = {}));
var GAME_MODEL;
(function (GAME_MODEL) {
    GAME_MODEL[GAME_MODEL["PVE"] = 0] = "PVE";
    GAME_MODEL[GAME_MODEL["PVP"] = 1] = "PVP";
})(GAME_MODEL = exports.GAME_MODEL || (exports.GAME_MODEL = {}));
var OBJECTIVE_TYPE;
(function (OBJECTIVE_TYPE) {
    OBJECTIVE_TYPE[OBJECTIVE_TYPE["NORMAL"] = 0] = "NORMAL";
    OBJECTIVE_TYPE[OBJECTIVE_TYPE["BAN"] = 1] = "BAN";
    OBJECTIVE_TYPE[OBJECTIVE_TYPE["QUESTION"] = 2] = "QUESTION";
})(OBJECTIVE_TYPE = exports.OBJECTIVE_TYPE || (exports.OBJECTIVE_TYPE = {}));

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
        //# sourceMappingURL=PlayDefine.js.map
        