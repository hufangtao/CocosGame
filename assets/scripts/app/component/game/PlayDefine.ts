

export const ACC_BAR_MAX = 70;

export const Event_type = {
    RANK_RESULT: 'rankResult',
    GAMESTART: 'gameStart',
}



export const ONE_GAME_TIME = 120;// pvp一局游戏时间

// 生成宠物需要的步数
export const STEP_SPAWN_PET = 8

export const STEP_SPAWN_BUG = 8

// 场上宠物最大数量
export const COUNT_BOARD_PET = 8
// 场上虫子最大数量
export const COUNT_BOARD_BUG = 8

// pvp水果颜色个数
export const PVP_FRUIT_COLOR_CNT = 6;
export const TEACH_FRUIT_COLOR_CNT = 5;

export const MAX_MATCH = 20;

export enum Action_type {
    MoveTo = 1,
    GateTo = 2,
    Tip = 3,
    Shake = 4,
    GuideMask = 5,
    NoMatch = 5,
}

export const SCORE = {
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

}

export enum ColorType {
    Red = 1,
    Green = 2,
}
export enum FaceType {
    Sand = 1,
    Happy = 2,
}
export enum FaceAnimationType {
    Xuayun = 1,
    Yanhua = 2,
    Yun = 3,
}

// block销毁方式
export enum BLOCKDES_TYPE {
    NOACTION_NODES = 1,
    NOACTION_FIRSTDES = 2,
    ACTION_FIRSTDES = 3,
    ACTION_LASTDES = 4,
    ACTION_NODES = 5,
}

export enum GAME_STAT {
    GAMEING = 1,
    BONUSTIME = 2,
    CHECKRESULT = 3,
    GAMEOVER = 4,
}

export const PHASE = [
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
]


export enum GRID_TYPE {
    EMPTY,
    TILE,
    LEFTTRANSPORT,
    RIGHTTRANSPORT,
    UPTRANSPORT,
    DOWNTRANSPORT,
    UPGATE,
    DOWNGATE,
}

export enum TILE_TYPE {
    BLOCK = 1,// 方块，五种颜色
    BOMB = 2,// 炸弹，多个方块合成的道具
    PET = 3,// 树叶，不可销毁，落地回收
    WALL = 4,// 墙，固定位置，可销毁。冰块属于这个类型。
    TABLEWARE = 5,// 餐具，不固定位置，可销毁。bug属于这个类型。

}

export enum BLOCK_COLOR {
    RED = 1,
    GREEN = 2,
    BLUE = 3,
    YELLOW = 4,
    PURPLE = 5,
    SIX = 6,
    COLORS = 7,
}
export enum BOMB_TYPE {
    BOMB_ROW = 1,
    BOMB_COLUMN,
    BOMB_AROUND,
    BOMB_ONE_COLOR,
    BOMB_ROWSTRONG,
    BOMB_COLUMNSTRONG,
}
export enum PET_TYPE {
    TYPE_1 = 1,
    TYPE_2,
    TYPE_3,
    TYPE_4,
}
export enum WALL_TYPE {
    TYPE_1 = 1,
    TYPE_2,
    TYPE_3,
    TYPE_4,
}
export enum TABLEWARE_TYPE {
    TYPE_1 = 1,
    TYPE_2,
    TYPE_3,
    TYPE_4,
}

export enum TRANSPORT_TYPE {
    LEFT = 1,
    RIGHT,
    UP,
    DOWN,
}

export enum PARTICAL_TYPE {
    BOMB_COL = 1,
    BLOCK,
    TABLEWARE,
    WALL,
}

// 1.可消除可移动的球；2.可消除不可移动的墙；3.可移动，只能炸掉的bug；4.可移动不可消除，可掉落的宠物；5.三叶草
export enum OBSTACLE_TYPE {

}
export enum PlaySide {
    UNKNOWN = 0,
    RED = 1,
    BLU = 2,
}

export enum GUIDE_TYPE {
    SAVE_SUC,
    TIME,
    HEAD,
    COUNT,
    TIME60,
    BUFF_TIP,
    USE_BUFF_COUNT,
    ACTIVE_BUFF1_SUC,
    ACTIVE_BUFF2_SUC,
    ACTIVE_BUFF3_SUC,
    ACTIVE_BUFF4_SUC,
    GET_BUFF,
    BOMB_SUC,
    BOMB_COL_STR_SUC,
    GEN_FLOWER1,
    GEN_FLOWER2,
    BOMB_COL = 100,
    BOMB_COL_STR,
    ACTIVE_BUFF1,
    ACTIVE_BUFF2,
    ACTIVE_BUFF3,
    ACTIVE_BUFF4,
    MATCH1,
    MATCH2,
    SAVE,
}

export enum TILE_ZINDEX {
    LOW = 0,
    NORMAL = 1,
    ACTION_LOW = 10,
    ACTION = 11,
}

export enum GAME_MODEL {
    PVE,
    PVP
}

export enum OBJECTIVE_TYPE {
    NORMAL = 0,
    BAN = 1,
    QUESTION = 2,
}
