(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pve/Board_pve.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5efedByw09A2pUVl7J6lV3E', 'Board_pve', __filename);
// scripts/app/component/game/pve/Board_pve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../PlayDefine");
var Modules_1 = require("../../../module/Modules");
var StateMgr_1 = require("./StateMgr");
var Algorithm = require("../Algorithm");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Board_pve = /** @class */ (function (_super) {
    __extends(Board_pve, _super);
    function Board_pve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pfbGate = null;
        _this.pfbGate2 = null;
        _this.pfbArrow = null;
        _this.nodBoard = null;
        _this.panelGrid = null;
        _this.panelTrickUp = null;
        _this.pfbTileBg = null;
        _this.spfTileBgWhite = null;
        _this.spfTileBgBlack = null;
        _this.spfArrow = null;
        return _this;
    }
    Board_pve.prototype.onLoad = function () {
    };
    // 初始化地图
    Board_pve.prototype.initMap = function (layerGame) {
        this.layerGame = layerGame;
        if (this.panelTrickUp) {
            this.panelTrickUp.destroyAllChildren();
        }
        var levelData = Modules_1.Play.LevelDatas['level_' + Modules_1.Play.DataPve.curLevel];
        Modules_1.Play.DataPve.levelData = levelData;
        if (!Modules_1.Play.LevelDatas || !levelData || !levelData.grid) {
            return;
        }
        var empty = levelData.grid.empty || [];
        var transport = levelData.grid.transport || [];
        var gate = levelData.grid.gate || [];
        for (var x = 0; x < 8; ++x) {
            Modules_1.Play.DataPve.grid[x] = [];
            for (var y = 0; y < 9; ++y) {
                Modules_1.Play.DataPve.grid[x][y] = PlayDefine_1.GRID_TYPE.TILE;
            }
        }
        // 空缺
        for (var i = 0; i < empty.length; ++i) {
            var x = Math.floor(empty[i] / (Modules_1.Play.DataPve.grid.length + 1));
            var y = empty[i] % Modules_1.Play.DataPve.grid[0].length;
            Modules_1.Play.DataPve.grid[x][y] = PlayDefine_1.GRID_TYPE.EMPTY;
        }
        // this.initTileBg();
        this.getComponent('FrameManager').initFrame();
        // 输送带
        if (transport.length > 0) {
            StateMgr_1.default.INSTANCE.haveTransport = true;
            for (var i = 0; i < transport.length; ++i) {
                var startX = Math.floor(transport[i].start / (Modules_1.Play.DataPve.grid.length + 1));
                var startY = transport[i].start % Modules_1.Play.DataPve.grid[0].length;
                var endX = Math.floor(transport[i].end / (Modules_1.Play.DataPve.grid.length + 1));
                var endY = transport[i].end % Modules_1.Play.DataPve.grid[0].length;
                for (var j = startX; j <= endX; ++j) {
                    if (Modules_1.Play.DataPve.grid[j][startY] != PlayDefine_1.GRID_TYPE.EMPTY) {
                        if (transport[i].type === PlayDefine_1.TRANSPORT_TYPE.LEFT) {
                            Modules_1.Play.DataPve.grid[j][startY] = PlayDefine_1.GRID_TYPE.LEFTTRANSPORT;
                        }
                        else if (transport[i].type === PlayDefine_1.TRANSPORT_TYPE.RIGHT) {
                            Modules_1.Play.DataPve.grid[j][startY] = PlayDefine_1.GRID_TYPE.RIGHTTRANSPORT;
                        }
                        else if (transport[i].type === PlayDefine_1.TRANSPORT_TYPE.UP) {
                            Modules_1.Play.DataPve.grid[j][startY] = PlayDefine_1.GRID_TYPE.UPTRANSPORT;
                        }
                        else if (transport[i].type === PlayDefine_1.TRANSPORT_TYPE.DOWN) {
                            Modules_1.Play.DataPve.grid[j][startY] = PlayDefine_1.GRID_TYPE.DOWNTRANSPORT;
                        }
                    }
                }
            }
        }
        else {
            StateMgr_1.default.INSTANCE.haveTransport = false;
        }
        // 传送门
        for (var i = 0; i < gate.length; ++i) {
            var x = Math.floor(gate[i].upgate / (Modules_1.Play.DataPve.grid.length + 1));
            var y = gate[i].upgate % Modules_1.Play.DataPve.grid[0].length;
            Modules_1.Play.DataPve.grid[x][y] = PlayDefine_1.GRID_TYPE.UPGATE;
            var nodGate = cc.instantiate(this.pfbGate);
            nodGate.rotation = 180;
            nodGate.width = 80;
            nodGate.height = 17;
            nodGate.parent = this.panelTrickUp;
            nodGate.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2 + 25);
            x = Math.floor(gate[i].downgate / (Modules_1.Play.DataPve.grid.length + 1));
            y = gate[i].downgate % Modules_1.Play.DataPve.grid[0].length;
            Modules_1.Play.DataPve.grid[x][y] = PlayDefine_1.GRID_TYPE.DOWNGATE;
            var nodGate = cc.instantiate(this.pfbGate2);
            nodGate.width = 80;
            nodGate.height = 17;
            nodGate.parent = this.panelTrickUp;
            nodGate.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2 - 28);
        }
        // 箭头
        var hasPet = false;
        for (var i = 0; i < levelData.objective.length; ++i) {
            if (levelData.objective[i].tileType == PlayDefine_1.TILE_TYPE.PET) {
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
    };
    Board_pve.prototype.initDownArrow = function () {
        for (var x = 0; x < Modules_1.Play.DataPve.grid.length; ++x) {
            for (var y = 0; y < Modules_1.Play.DataPve.grid[x].length; ++y) {
                if (Modules_1.Play.DataPve.grid[x][y] != PlayDefine_1.GRID_TYPE.EMPTY && Modules_1.Play.DataPve.grid[x][y] != PlayDefine_1.GRID_TYPE.DOWNGATE) {
                    var nodArrow = cc.instantiate(this.pfbArrow);
                    nodArrow.getComponent(cc.Sprite).spriteFrame = this.spfArrow;
                    nodArrow.width = 80;
                    nodArrow.height = 17;
                    nodArrow.parent = this.panelTrickUp;
                    nodArrow.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2 - 65);
                    nodArrow.runAction(cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, -10), cc.moveBy(0.5, 0, 10))));
                    break;
                }
            }
        }
    };
    // 初始格子背景
    Board_pve.prototype.initTileBg = function () {
        this.panelGrid.destroyAllChildren();
        for (var x = 0; x < Modules_1.Play.DataPve.grid.length; ++x) {
            this.layerGame.tileBgs[x] = [];
            this.layerGame.transports[x] = [];
            for (var y = 0; y < Modules_1.Play.DataPve.grid[0].length; ++y) {
                if (Modules_1.Play.DataPve.grid[x][y] == PlayDefine_1.GRID_TYPE.EMPTY) {
                    continue;
                }
                var nodTileBg = cc.instantiate(Modules_1.Play.DataPve.pfbTileBg);
                this.layerGame.tileBgs[x][y] = nodTileBg;
                nodTileBg.parent = this.panelGrid;
                nodTileBg.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
            }
        }
    };
    // 生成初始道具
    Board_pve.prototype.initProp = function () {
        var empty = Modules_1.Play.DataPve.levelData.tile.empty || [];
        var block = Modules_1.Play.DataPve.levelData.tile.block || [];
        var bomb = Modules_1.Play.DataPve.levelData.tile.bomb || [];
        var pet = Modules_1.Play.DataPve.levelData.tile.pet || [];
        var wall = Modules_1.Play.DataPve.levelData.tile.wall || [];
        var tableware = Modules_1.Play.DataPve.levelData.tile.tableware;
        for (var i = 0; i < empty.length; ++i) {
            var x = Math.floor(empty[i] / (this.layerGame.tiles.length + 1));
            var y = empty[i] % this.layerGame.tiles[0].length;
            if (this.layerGame.tiles[x][y]) {
                this.layerGame.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
                this.layerGame.tiles[x][y] = null;
            }
        }
        for (var i = 0; i < block.length; ++i) {
            var x = Math.floor(block[i].index / (this.layerGame.tiles.length + 1));
            var y = block[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnBlock(x, y, block[i].type);
        }
        for (var i = 0; i < bomb.length; ++i) {
            var x = Math.floor(bomb[i].index / (this.layerGame.tiles.length + 1));
            var y = bomb[i].index % this.layerGame.tiles[0].length;
            if (bomb[i].type === PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                this.layerGame.spawnBomb(x, y, bomb[i].type, PlayDefine_1.BLOCK_COLOR.BLUE);
            }
            else {
                this.layerGame.spawnBomb(x, y, bomb[i].type);
            }
        }
        for (var i = 0; i < pet.length; ++i) {
            var x = Math.floor(pet[i].index / (this.layerGame.tiles.length + 1));
            var y = pet[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnPet(x, y, PlayDefine_1.PET_TYPE.TYPE_1, false);
            Modules_1.Play.DataPve.changePetOrBugData(PlayDefine_1.TILE_TYPE.PET, PlayDefine_1.PET_TYPE.TYPE_1, null);
        }
        for (var i = 0; i < wall.length; ++i) {
            var x = Math.floor(wall[i].index / (this.layerGame.tiles.length + 1));
            var y = wall[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnWall(x, y, wall[i].type);
        }
        for (var i = 0; i < tableware.length; ++i) {
            var x = Math.floor(tableware[i].index / (this.layerGame.tiles.length + 1));
            var y = tableware[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnTableware(x, y, tableware[i].type, false);
            Modules_1.Play.DataPve.changePetOrBugData(PlayDefine_1.TILE_TYPE.TABLEWARE, tableware[i].type, null);
        }
    };
    // 生成输送带
    Board_pve.prototype.initTransport = function () {
        for (var x = 0; x < this.layerGame.tiles.length; ++x) {
            for (var y = 0; y < this.layerGame.tiles[x].length; ++y) {
                if (Modules_1.Play.DataPve.grid[x][y] == PlayDefine_1.GRID_TYPE.LEFTTRANSPORT) {
                    // this.panelTrick
                    var nodTransport = cc.instantiate(Modules_1.Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 180;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
                }
                else if (Modules_1.Play.DataPve.grid[x][y] == PlayDefine_1.GRID_TYPE.RIGHTTRANSPORT) {
                    var nodTransport = cc.instantiate(Modules_1.Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 0;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
                }
                else if (Modules_1.Play.DataPve.grid[x][y] == PlayDefine_1.GRID_TYPE.UPTRANSPORT) {
                    var nodTransport = cc.instantiate(Modules_1.Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 270;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
                }
                else if (Modules_1.Play.DataPve.grid[x][y] == PlayDefine_1.GRID_TYPE.DOWNTRANSPORT) {
                    var nodTransport = cc.instantiate(Modules_1.Play.DataPve.pfbTransport);
                    nodTransport.getChildByName('mask').getChildByName('sprite').rotation = 90;
                    nodTransport.parent = this.layerGame.panelTrickDown;
                    this.layerGame.transports[x][y] = nodTransport;
                    nodTransport.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
                }
            }
        }
    };
    // 生成初始方块
    Board_pve.prototype.initBlock = function () {
        for (var x = 0; x < this.layerGame.tiles.length; ++x) {
            for (var y = 0; y < this.layerGame.tiles[x].length; ++y) {
                if (Modules_1.Play.DataPve.grid[x][y] == PlayDefine_1.GRID_TYPE.EMPTY || this.layerGame.tiles[x][y]) {
                    continue;
                }
                var count = 0;
                var randomNum = 0;
                while (true) {
                    if (count >= 1000000) {
                        return;
                    }
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    randomNum = Math.floor(Math.random() * Modules_1.Play.DataPve.levelData.blockcount) + 1;
                    Algorithm.scanAround(x, y, -1, -1, randomNum, arr, scanArr, this.layerGame.tiles);
                    if (arr.length < PlayDefine_1.MAX_MATCH) {
                        this.layerGame.spawnBlock(x, y, randomNum);
                        break;
                    }
                }
            }
        }
    };
    //  生成棋盘
    Board_pve.prototype.initGrid = function () {
        for (var x = 0; x < Modules_1.Play.DataPve.grid.length; ++x) {
            this.layerGame.tiles[x] = [];
            for (var y = 0; y < Modules_1.Play.DataPve.grid[x].length; ++y) {
                this.layerGame.tiles[x][y] = null;
            }
        }
    };
    // 生成下落点
    Board_pve.prototype.initFallDownPoint = function () {
        var fallDownPoint = Modules_1.Play.DataPve.levelData.fallDownPoint || [];
        for (var i = 0; i < fallDownPoint.length; ++i) {
            var x = Math.floor(fallDownPoint[i] / (this.layerGame.tiles.length + 1));
            var y = fallDownPoint[i] % this.layerGame.tiles[0].length;
            Modules_1.Play.DataPve.fallDownPoint.push(x + '#' + y);
        }
    };
    // 开局随机生成宠物
    Board_pve.prototype.randomItem = function () {
        // 找出所有block
        var blocks = [];
        for (var x = 0; x < this.layerGame.tiles.length; ++x) {
            for (var y = 0; y < this.layerGame.tiles[x].length; ++y) {
                if (this.layerGame.tiles[x][y] && this.layerGame.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                    blocks.push(x + "#" + y);
                }
            }
        }
        for (var i = 0; i < Modules_1.Play.DataPve.levelData.spawnItem.length; ++i) {
            // 不需要生成
            if (!Modules_1.Play.DataPve.levelData.spawnItem[i].count) {
                continue;
            }
            for (var j = 0; j < Modules_1.Play.DataPve.levelData.spawnItem[i].count; ++j) {
                var item = Modules_1.Play.DataPve.levelData.spawnItem[i];
                // 随机一个生成一个宠物
                var typeIndex = Math.floor(Math.random() * item.type.length);
                var loop = true;
                while (loop) {
                    var index = Math.floor(Math.random() * blocks.length);
                    var x = Number(blocks[index].split("#")[0]);
                    var y = Number(blocks[index].split("#")[1]);
                    if (this.layerGame.tiles[x][y - 1] && this.layerGame.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                        this.layerGame.spawnTile(x, y, item.tileType, item.type[typeIndex], item.subType);
                        loop = false;
                    }
                }
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], Board_pve.prototype, "pfbGate", void 0);
    __decorate([
        property(cc.Prefab)
    ], Board_pve.prototype, "pfbGate2", void 0);
    __decorate([
        property(cc.Prefab)
    ], Board_pve.prototype, "pfbArrow", void 0);
    __decorate([
        property(cc.Node)
    ], Board_pve.prototype, "nodBoard", void 0);
    __decorate([
        property(cc.Node)
    ], Board_pve.prototype, "panelGrid", void 0);
    __decorate([
        property(cc.Node)
    ], Board_pve.prototype, "panelTrickUp", void 0);
    __decorate([
        property(cc.Prefab)
    ], Board_pve.prototype, "pfbTileBg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Board_pve.prototype, "spfTileBgWhite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Board_pve.prototype, "spfTileBgBlack", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Board_pve.prototype, "spfArrow", void 0);
    Board_pve = __decorate([
        ccclass
    ], Board_pve);
    return Board_pve;
}(cc.Component));
exports.default = Board_pve;

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
        //# sourceMappingURL=Board_pve.js.map
        