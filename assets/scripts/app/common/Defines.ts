// 游戏 网络 持久化节点的根节点
export const GAME_PERSIST_NODE_ROOT_NET: string = "node-game-persist-net-root";
export const GAME_PERSIST_NODE_ROOT_MODULE: string = "node-game-persist-module-root";
// 配置文件的游戏资源目录
export const RESOURCE_CONFIG_PATH_ROOT = "config/";


export const UI_LAYER_POP_TIPS: string = "node-ui-pop-tips";
export const UI_LAYER_WAITING: string = "node-ui-layer-waiting";

export const ZORDER_UI_LAYER_POP_TIPS: number = 100;
export const ZORDER_UI_LAYER_WAITING: number  = 101;

export interface IProtoError {
  errCode: number;
  errMsg: string;
  protoName: string;
}

export enum OpenHomeFrom {
  UI_LOGIN  = 1,   // 从登陆界面
  UI_PLAY   = 2,   // 从战斗界面
  UI_GUIDE  = 3,   // 从新手指引
  UI_AIFIN  = 4,   // AI对战结束，点击了再来一局
}

export enum Fortune {
  Gold  = 1,          // 元宝
  Score = 2,          // 积分
  Star  = 3,          // 星数
  Energy= 4,          // 体力
  PvpBuff = 5,      // pvp buff
}

export const ValueKey = {
  levelScore:'levelScore',
  gameRate:'gameRate',
}

