import { TILE_TYPE, GRID_TYPE, TRANSPORT_TYPE, GAME_MODEL, MAX_MATCH, PET_TYPE, BLOCK_COLOR, BOMB_TYPE, BLOCKDES_TYPE } from "../PlayDefine";
import { Play } from "../../../module/Modules";
import StateMgr from "./StateMgr";
import * as Algorithm from "../Algorithm";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Board_pve extends cc.Component {
    @property(cc.Prefab)
    pfbGate: cc.Prefab = null;
    @property(cc.Prefab)
    pfbGate2: cc.Prefab = null;
    @property(cc.Prefab)
    pfbArrow: cc.Prefab = null;

    @property(cc.Node)
    nodBoard: cc.Node = null;

    @property(cc.Node)
    panelGrid: cc.Node = null;
    @property(cc.Node)
    panelTrickUp: cc.Node = null;

    @property(cc.Prefab)
    pfbTileBg: cc.Prefab = null;

    @property(cc.SpriteFrame)
    spfTileBgWhite: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfTileBgBlack: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    spfArrow: cc.SpriteFrame = null;

    layerGame;

    onLoad() {
    }

    // 初始化地图
    public initMap(layerGame) {
        this.layerGame = layerGame;
        if (this.panelTrickUp) {
            this.panelTrickUp.destroyAllChildren();
        }
        let levelData = Play.LevelDatas['level_' + Play.DataPve.curLevel];
        Play.DataPve.levelData = levelData;

        if (!Play.LevelDatas || !levelData || !levelData.grid) {
            return;
        }
        let empty = levelData.grid.empty || [];
        let transport = levelData.grid.transport || [];
        let gate = levelData.grid.gate || [];

        for (let x = 0; x < 8; ++x) {
            Play.DataPve.grid[x] = [];
            for (let y = 0; y < 9; ++y) {
                Play.DataPve.grid[x][y] = GRID_TYPE.TILE;
            }
        }

        // 空缺
        for (let i = 0; i < empty.length; ++i) {
            let x = Math.floor(empty[i] / (Play.DataPve.grid.length + 1));
            let y = empty[i] % Play.DataPve.grid[0].length;
            Play.DataPve.grid[x][y] = GRID_TYPE.EMPTY;
        }
        // this.initTileBg();
        this.getComponent('FrameManager').initFrame();

        // 输送带
        if (transport.length > 0) {
            StateMgr.INSTANCE.haveTransport = true;
            for (let i = 0; i < transport.length; ++i) {
                let startX = Math.floor(transport[i].start / (Play.DataPve.grid.length + 1));
                let startY = transport[i].start % Play.DataPve.grid[0].length;
                let endX = Math.floor(transport[i].end / (Play.DataPve.grid.length + 1));
                let endY = transport[i].end % Play.DataPve.grid[0].length;

                for (let j = startX; j <= endX; ++j) {
                    if (Play.DataPve.grid[j][startY] != GRID_TYPE.EMPTY) {
                        if (transport[i].type === TRANSPORT_TYPE.LEFT) {
                            Play.DataPve.grid[j][startY] = GRID_TYPE.LEFTTRANSPORT;
                        } else if (transport[i].type === TRANSPORT_TYPE.RIGHT) {
                            Play.DataPve.grid[j][startY] = GRID_TYPE.RIGHTTRANSPORT;
                        } else if (transport[i].type === TRANSPORT_TYPE.UP) {
                            Play.DataPve.grid[j][startY] = GRID_TYPE.UPTRANSPORT;
                        } else if (transport[i].type === TRANSPORT_TYPE.DOWN) {
                            Play.DataPve.grid[j][startY] = GRID_TYPE.DOWNTRANSPORT;
                        }
                    }
                }
            }
        } else {
            StateMgr.INSTANCE.haveTransport = false;
        }

        // 传送门
        for (let i = 0; i < gate.length; ++i) {
            let x = Math.floor(gate[i].upgate / (Play.DataPve.grid.length + 1));
            let y = gate[i].upgate % Play.DataPve.grid[0].length;
            Play.DataPve.grid[x][y] = GRID_TYPE.UPGATE;

            var nodGate = cc.instantiate(this.pfbGate);
            nodGate.rotation = 180;
            nodGate.width = 80;
            nodGate.height = 17;
            nodGate.parent = this.panelTrickUp;
            nodGate.setPosition(80 * (x - 4) + 80 / 2,
                80 * y + 80 / 2 + 25);


            x = Math.floor(gate[i].downgate / (Play.DataPve.grid.length + 1));
            y = gate[i].downgate % Play.DataPve.grid[0].length;
            Play.DataPve.grid[x][y] = GRID_TYPE.DOWNGATE;

            var nodGate = cc.instantiate(this.pfbGate2);
            nodGate.width = 80;
            nodGate.height = 17;
            nodGate.parent = this.panelTrickUp;
            nodGate.setPosition(80 * (x - 4) + 80 / 2,
                80 * y + 80 / 2 - 28);

        }

        // 箭头
        let hasPet = false;
        for (let i = 0; i < levelData.objective.length; ++i) {
            if (levelData.objective[i].tileType == TILE_TYPE.PET) {
                hasPet = true;
            }
        }
        if (hasPet) {
            this.initDownArrow();
        }

        this.initGrid();
        this.initTileBg();
        this.initProp();
        this.initBlock();
        this.initTransport();
        this.randomItem();
        this.initFallDownPoint();
    }

    private initDownArrow() {
        for (let x = 0; x < Play.DataPve.grid.length; ++x) {
            for (let y = 0; y < Play.DataPve.grid[x].length; ++y) {
                if (Play.DataPve.grid[x][y] != GRID_TYPE.EMPTY && Play.DataPve.grid[x][y] != GRID_TYPE.DOWNGATE) {
                    var nodArrow = cc.instantiate(this.pfbArrow);
                    nodArrow.getComponent(cc.Sprite).spriteFrame = this.spfArrow;
                    nodArrow.width = 80;
                    nodArrow.height = 17;
                    nodArrow.parent = this.panelTrickUp;
                    nodArrow.setPosition(80 * (x - 4) + 80 / 2,
                        80 * y + 80 / 2 - 65);
                    nodArrow.runAction(cc.repeatForever(cc.sequence(
                        cc.moveBy(0.5, 0, -10),
                        cc.moveBy(0.5, 0, 10)
                    )))
                    break;
                }
            }
        }
    }

    // 初始格子背景
    private initTileBg() {
        this.panelGrid.destroyAllChildren();
        for (let x = 0; x < Play.DataPve.grid.length; ++x) {
            this.layerGame.tileBgs[x] = [];
            this.layerGame.transports[x] = []
            for (let y = 0; y < Play.DataPve.grid[0].length; ++y) {
                if (Play.DataPve.grid[x][y] == GRID_TYPE.EMPTY) {
                    continue
                }
                let nodTileBg = cc.instantiate(Play.DataPve.pfbTileBg);
                this.layerGame.tileBgs[x][y] = nodTileBg;
                nodTileBg.parent = this.panelGrid;
                nodTileBg.setPosition(80 * (x - 4) + 80 / 2,
                    80 * y + 80 / 2);
            }
        }
    }

    // 生成初始道具
    initProp() {
        let empty = Play.DataPve.levelData.tile.empty || [];
        let block = Play.DataPve.levelData.tile.block || [];
        let bomb = Play.DataPve.levelData.tile.bomb || [];
        let pet = Play.DataPve.levelData.tile.pet || [];
        let wall = Play.DataPve.levelData.tile.wall || [];
        let tableware = Play.DataPve.levelData.tile.tableware;

        for (let i = 0; i < empty.length; ++i) {
            let x = Math.floor(empty[i] / (this.layerGame.tiles.length + 1));
            let y = empty[i] % this.layerGame.tiles[0].length;
            if (this.layerGame.tiles[x][y]) {
                this.layerGame.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
                this.layerGame.tiles[x][y] = null;
            }
        }
        for (let i = 0; i < block.length; ++i) {
            let x = Math.floor(block[i].index / (this.layerGame.tiles.length + 1));
            let y = block[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnBlock(x, y, block[i].type);
        }
        for (let i = 0; i < bomb.length; ++i) {
            let x = Math.floor(bomb[i].index / (this.layerGame.tiles.length + 1));
            let y = bomb[i].index % this.layerGame.tiles[0].length;
            if (bomb[i].type === BOMB_TYPE.BOMB_ONE_COLOR) {
                this.layerGame.spawnBomb(x, y, bomb[i].type, BLOCK_COLOR.BLUE);
            } else {
                this.layerGame.spawnBomb(x, y, bomb[i].type);
            }
        }
        for (let i = 0; i < pet.length; ++i) {
            let x = Math.floor(pet[i].index / (this.layerGame.tiles.length + 1));
            let y = pet[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnPet(x, y, PET_TYPE.TYPE_1, false);
            Play.DataPve.changePetOrBugData(TILE_TYPE.PET, PET_TYPE.TYPE_1, null);
        }
        for (let i = 0; i < wall.length; ++i) {
            let x = Math.floor(wall[i].index / (this.layerGame.tiles.length + 1));
            let y = wall[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnWall(x, y, wall[i].type);
        }
        for (let i = 0; i < tableware.length; ++i) {
            let x = Math.floor(tableware[i].index / (this.layerGame.tiles.length + 1));
            let y = tableware[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnTableware(x, y, tableware[i].type, false);
            Play.DataPve.changePetOrBugData(TILE_TYPE.TABLEWARE, tableware[i].type, null);
        }
    }
    // 生成输送带
    initTransport() {
        for (var x = 0; x < this.layerGame.tiles.length; ++x) {
            for (var y = 0; y < this.layerGame.tiles[x].length; ++y) {
                if (Play.DataPve.grid[x][y] == GRID_TYPE.LEFTTRANSPORT) {
                    // this.panelTrick
                    let nodTransport = cc.instantiate(Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 180;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2,
                        80 * y + 80 / 2);
                } else if (Play.DataPve.grid[x][y] == GRID_TYPE.RIGHTTRANSPORT) {
                    let nodTransport = cc.instantiate(Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 0;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2,
                        80 * y + 80 / 2);
                } else if (Play.DataPve.grid[x][y] == GRID_TYPE.UPTRANSPORT) {
                    let nodTransport = cc.instantiate(Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 270;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2,
                        80 * y + 80 / 2);
                } else if (Play.DataPve.grid[x][y] == GRID_TYPE.DOWNTRANSPORT) {
                    let nodTransport = cc.instantiate(Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 90;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2,
                        80 * y + 80 / 2);
                }
            }
        }
    }
    // 生成初始方块
    initBlock() {
        for (var x = 0; x < this.layerGame.tiles.length; ++x) {
            for (var y = 0; y < this.layerGame.tiles[x].length; ++y) {
                if (Play.DataPve.grid[x][y] == GRID_TYPE.EMPTY || this.layerGame.tiles[x][y]) {
                    continue;
                }
                var count = 0;
                var randomNum = 0;
                while (true) {
                    if (count >= 1000000) {
                        return
                    }
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    randomNum = Math.floor(Math.random() * Play.DataPve.levelData.blockcount) + 1;

                    Algorithm.scanAround(x, y, -1, -1, randomNum, arr, scanArr, this.layerGame.tiles);
                    if (arr.length < MAX_MATCH) {
                        this.layerGame.spawnBlock(x, y, randomNum);
                        break;
                    }
                }
            }
        }
    }
    //  生成棋盘
    initGrid() {
        for (var x = 0; x < Play.DataPve.grid.length; ++x) {
            this.layerGame.tiles[x] = [];
            for (var y = 0; y < Play.DataPve.grid[x].length; ++y) {
                this.layerGame.tiles[x][y] = null;
            }
        }
    }

    // 生成下落点
    initFallDownPoint() {
        let fallDownPoint = Play.DataPve.levelData.fallDownPoint || [];
        for (let i = 0; i < fallDownPoint.length; ++i) {
            let x = Math.floor(fallDownPoint[i] / (this.layerGame.tiles.length + 1));
            let y = fallDownPoint[i] % this.layerGame.tiles[0].length;
            Play.DataPve.fallDownPoint.push(x + '#' + y);
        }
    }

    // 开局随机生成宠物
    private randomItem() {
        // 找出所有block
        let blocks = [];
        for (let x = 0; x < this.layerGame.tiles.length; ++x) {
            for (let y = 0; y < this.layerGame.tiles[x].length; ++y) {
                if (this.layerGame.tiles[x][y] && this.layerGame.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                    blocks.push(x + "#" + y);
                }
            }
        }

        for (let i = 0; i < Play.DataPve.levelData.spawnItem.length; ++i) {
            // 不需要生成
            if (!Play.DataPve.levelData.spawnItem[i].count) {
                continue;
            }

            for (let j = 0; j < Play.DataPve.levelData.spawnItem[i].count; ++j) {
                let item = Play.DataPve.levelData.spawnItem[i];
                // 随机一个生成一个宠物
                let typeIndex = Math.floor(Math.random() * item.type.length);
                let loop = true;
                while (loop) {
                    let index = Math.floor(Math.random() * blocks.length);
                    let x = Number(blocks[index].split("#")[0]);
                    let y = Number(blocks[index].split("#")[1]);

                    if (this.layerGame.tiles[x][y - 1] && this.layerGame.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                        this.layerGame.spawnTile(x, y, item.tileType, item.type[typeIndex], item.subType);
                        loop = false;
                    }
                }
            }
        }
    }

}
