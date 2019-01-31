import { TILE_TYPE, GRID_TYPE, TRANSPORT_TYPE, GAME_MODEL, PVP_FRUIT_COLOR_CNT, MAX_MATCH } from "../PlayDefine";
import { Play } from "../../../module/Modules";
import * as Algorithm from "../Algorithm";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Board extends cc.Component {
    @property(cc.Node)
    nodBoard: cc.Node = null;

    @property(cc.Node)
    panelGrid: cc.Node = null;

    @property(cc.Prefab)
    pfbTileBg: cc.Prefab = null;

    @property(cc.SpriteFrame)
    spfTileBgWhite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfTileBgBlack: cc.SpriteFrame = null;

    layerGame;

    onLoad() {
    }

    // 初始化地图
    public initMap(layerGame) {
        this.layerGame = layerGame;
        this.layerGame.panelHeader.pvpTeach = this.layerGame.pvpTeach;
        this.layerGame.panelHeader.pvpAi = this.layerGame.pvpAi;

        this.layerGame.hadRemind = false;

        this.layerGame.tiles = [];

        let levelData = Play.LevelDatas['level_0'];
        Play.DataPvp.levelData = levelData;

        if (!Play.LevelDatas || !levelData || !levelData.grid) {
            return;
        }

        for (let x = 0; x < 8; ++x) {
            Play.DataPvp.grid[x] = [];
            for (let y = 0; y < 9; ++y) {
                Play.DataPvp.grid[x][y] = GRID_TYPE.TILE;
            }
        }

        for (var x = 0; x < Play.DataPvp.grid.length; ++x) {
            this.layerGame.tiles[x] = [];
            for (var y = 0; y < Play.DataPvp.grid[x].length; ++y) {
                this.layerGame.tiles[x][y] = null;
            }
        }

        // 生成初始方块
        for (var x = 0; x < Play.DataPvp.grid.length; ++x) {
            for (var y = 0; y < Play.DataPvp.grid[x].length; ++y) {
                if (Play.DataPvp.grid[x][y] == 0) {
                    continue;
                }
                var count = 0;
                var randomNum = 0;
                while (true) {
                    if (count >= 100000) {
                        // console.log('陷入死循环');
                        return
                    }
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    // randomNum = Math.floor(Math.random() * Play.DataPlay.colorNum) + 1;
                    randomNum = this.layerGame.getBlockColor(x, y);
                    // randomNum = Math.floor(Math.random() * PVP_FRUIT_COLOR_CNT) + 1;

                    Algorithm.scanAround(x, y, -1, -1, randomNum, arr, scanArr, this.layerGame.tiles, false);
                    if (arr.length < MAX_MATCH) {
                        this.layerGame.spawnBlock(x, y, randomNum, null, false);
                        break;
                    }
                }
            }
        }

        // 生成四个宠物
        this.layerGame.spawnPet(2, 2, false);
        this.layerGame.spawnPet(2, 5, false);
        this.layerGame.spawnPet(5, 2, false);
        this.layerGame.spawnPet(5, 5, false);


        if (this.layerGame.pvpTeach) {
            this.initBlock();
        }

        this.layerGame.moveAllTileDown();
        this.initTileBg();
    }

    // 初始格子背景
    private initTileBg() {
        this.layerGame.tileBgs = [];
        for (let x = 0; x < Play.DataPvp.grid.length; ++x) {
            this.layerGame.tileBgs[x] = [];
            for (let y = 0; y < Play.DataPvp.grid[0].length; ++y) {
                if (Play.DataPvp.grid[x][y] == GRID_TYPE.EMPTY) {
                    continue
                }
                let nodTileBg = cc.instantiate(Play.DataPvp.pfbTileBg);
                this.layerGame.tileBgs[x][y] = nodTileBg;
                nodTileBg.parent = this.panelGrid;
                nodTileBg.setPosition(80 * (x - 4) + 80 / 2,
                    80 * y + 80 / 2);
            }
        }
    }

    initBlock() {
        let block = Play.DataPvp.levelData.tile.block || [];
        for (let i = 0; i < block.length; ++i) {
            let x = Math.floor(block[i].index / (this.layerGame.tiles.length + 1));
            let y = block[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnBlock(x, y, block[i].type, null, false);
        }
    }
}
