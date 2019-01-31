"use strict";
cc._RF.push(module, '1dcd65Qr29LGJ/W8Y4CovDu', 'Board');
// scripts/app/component/game/pvp/Board.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../PlayDefine");
var Modules_1 = require("../../../module/Modules");
var Algorithm = require("../Algorithm");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Board = /** @class */ (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodBoard = null;
        _this.panelGrid = null;
        _this.pfbTileBg = null;
        _this.spfTileBgWhite = null;
        _this.spfTileBgBlack = null;
        return _this;
    }
    Board.prototype.onLoad = function () {
    };
    // 初始化地图
    Board.prototype.initMap = function (layerGame) {
        this.layerGame = layerGame;
        this.layerGame.panelHeader.pvpTeach = this.layerGame.pvpTeach;
        this.layerGame.panelHeader.pvpAi = this.layerGame.pvpAi;
        this.layerGame.hadRemind = false;
        this.layerGame.tiles = [];
        var levelData = Modules_1.Play.LevelDatas['level_0'];
        Modules_1.Play.DataPvp.levelData = levelData;
        if (!Modules_1.Play.LevelDatas || !levelData || !levelData.grid) {
            return;
        }
        for (var x_1 = 0; x_1 < 8; ++x_1) {
            Modules_1.Play.DataPvp.grid[x_1] = [];
            for (var y_1 = 0; y_1 < 9; ++y_1) {
                Modules_1.Play.DataPvp.grid[x_1][y_1] = PlayDefine_1.GRID_TYPE.TILE;
            }
        }
        for (var x = 0; x < Modules_1.Play.DataPvp.grid.length; ++x) {
            this.layerGame.tiles[x] = [];
            for (var y = 0; y < Modules_1.Play.DataPvp.grid[x].length; ++y) {
                this.layerGame.tiles[x][y] = null;
            }
        }
        // 生成初始方块
        for (var x = 0; x < Modules_1.Play.DataPvp.grid.length; ++x) {
            for (var y = 0; y < Modules_1.Play.DataPvp.grid[x].length; ++y) {
                if (Modules_1.Play.DataPvp.grid[x][y] == 0) {
                    continue;
                }
                var count = 0;
                var randomNum = 0;
                while (true) {
                    if (count >= 100000) {
                        // console.log('陷入死循环');
                        return;
                    }
                    count++;
                    var arr = new Array();
                    var scanArr = new Array();
                    // randomNum = Math.floor(Math.random() * Play.DataPlay.colorNum) + 1;
                    randomNum = this.layerGame.getBlockColor(x, y);
                    // randomNum = Math.floor(Math.random() * PVP_FRUIT_COLOR_CNT) + 1;
                    Algorithm.scanAround(x, y, -1, -1, randomNum, arr, scanArr, this.layerGame.tiles, false);
                    if (arr.length < PlayDefine_1.MAX_MATCH) {
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
    };
    // 初始格子背景
    Board.prototype.initTileBg = function () {
        this.layerGame.tileBgs = [];
        for (var x = 0; x < Modules_1.Play.DataPvp.grid.length; ++x) {
            this.layerGame.tileBgs[x] = [];
            for (var y = 0; y < Modules_1.Play.DataPvp.grid[0].length; ++y) {
                if (Modules_1.Play.DataPvp.grid[x][y] == PlayDefine_1.GRID_TYPE.EMPTY) {
                    continue;
                }
                var nodTileBg = cc.instantiate(Modules_1.Play.DataPvp.pfbTileBg);
                this.layerGame.tileBgs[x][y] = nodTileBg;
                nodTileBg.parent = this.panelGrid;
                nodTileBg.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
            }
        }
    };
    Board.prototype.initBlock = function () {
        var block = Modules_1.Play.DataPvp.levelData.tile.block || [];
        for (var i = 0; i < block.length; ++i) {
            var x = Math.floor(block[i].index / (this.layerGame.tiles.length + 1));
            var y = block[i].index % this.layerGame.tiles[0].length;
            this.layerGame.spawnBlock(x, y, block[i].type, null, false);
        }
    };
    __decorate([
        property(cc.Node)
    ], Board.prototype, "nodBoard", void 0);
    __decorate([
        property(cc.Node)
    ], Board.prototype, "panelGrid", void 0);
    __decorate([
        property(cc.Prefab)
    ], Board.prototype, "pfbTileBg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Board.prototype, "spfTileBgWhite", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], Board.prototype, "spfTileBgBlack", void 0);
    Board = __decorate([
        ccclass
    ], Board);
    return Board;
}(cc.Component));
exports.default = Board;

cc._RF.pop();