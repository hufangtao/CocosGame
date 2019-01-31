"use strict";
cc._RF.push(module, '3e688RsLeBN9qoLImcbG17A', 'LayerGame');
// scripts/app/component/game/pvp/LayerGame.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PanelHeader_1 = require("./PanelHeader");
var PlayDefine_1 = require("../PlayDefine");
var Modules_1 = require("../../../module/Modules");
var PvpGuide_1 = require("./PvpGuide");
var StateMgr_1 = require("../pve/StateMgr");
var Algorithm = require("../Algorithm");
var Bottom_1 = require("./Bottom");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var NetUtil_1 = require("../../../common/net/NetUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LayerGame = /** @class */ (function (_super) {
    __extends(LayerGame, _super);
    function LayerGame() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pfbScore = null;
        _this.pfbBlock = null;
        _this.pfbBomb = null;
        _this.pfbObstacle = null;
        _this.pfbTileBg = null;
        _this.pfbEncourage = null;
        _this.pfbWall = null;
        _this.pfbParticle = null;
        _this.panelTile = null;
        _this.panelSpine = null;
        _this.panelParticle = null;
        _this.panelHeader = null;
        _this.pvpGuide = null;
        _this.panelGrid = null;
        _this.bottom = null;
        _this.spfTileBg = null;
        _this.spfTileBgLight = null;
        _this.nodCloud = null;
        _this.pvpTeach = false;
        _this.pvpAi = false;
        _this.spawnedBomb = false;
        _this.first = true;
        _this.firstDown = false;
        _this.firstBombCol = true;
        _this.firstBombColStr = true;
        _this.firstBombA = true;
        _this.firstSave = true;
        _this.firstGenFlower = true;
        _this.saveDown = 0;
        _this.PlayUI = null;
        _this.remindTime = 0; // 提示时间
        _this.oneSec = 0; // 一秒累加时间
        _this.accumulatorTime = 0; //蓄力条刷新时间
        _this.tiles = [];
        _this.tileBgs = [];
        _this.hadRemind = false;
        _this.maxMatchCount = 0;
        _this.matchCountSum = 0; //蓄力条每次计数
        _this.canTouch = false;
        _this.bombOver = true; // 炸弹结束
        _this.downOver = true; // 下落结束
        return _this;
    }
    LayerGame.prototype.onLoad = function () {
        this.bottom.init(this);
    };
    LayerGame.prototype.init = function (playUI) {
        this.PlayUI = playUI;
    };
    LayerGame.prototype.start = function () {
    };
    LayerGame.prototype.guide = function () {
        if (this.pvpTeach) {
            this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.MATCH1);
            this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.MATCH2);
        }
    };
    LayerGame.prototype.gameBegain = function () {
        this.bottom.initCanTouchSlot();
        Modules_1.Play.DataPvp.initFreeNodes();
        this.panelTile.destroyAllChildren();
        this.panelParticle.destroyAllChildren();
        this.panelSpine.destroyAllChildren();
        this.bombOver = true;
        this.destroyAllTilesOver = true;
        this.remindTime = 0;
        this.oneSec = 0;
        this.hadRemind = false;
        this.panelTile.parent.getComponent('Board').initMap(this);
    };
    // 发送棋盘上宠物个数
    LayerGame.prototype.sendBoardPetCnt = function () {
        var playBoardStatus = new ProtoSectionPlay_1.PlayBoardStatusC2S();
        playBoardStatus.animalNum = Modules_1.Play.DataPvp.getBoardPetCnt();
        NetUtil_1.default.SendMsg(playBoardStatus);
    };
    LayerGame.prototype.operateLogic = function (touchX, touchY, tileType, type, subType, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        if (tileType == PlayDefine_1.TILE_TYPE.BLOCK) {
            this.destroyBlock(touchX, touchY, type);
        }
        else if (tileType == PlayDefine_1.TILE_TYPE.BOMB) {
            this.ignite(touchX, touchY, type, null, isTouch);
        }
    };
    LayerGame.prototype.ignite = function (touchX, touchY, type, arr, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        switch (type) {
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMN:
                this.bombColumn(touchX, touchY, isTouch, arr);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ROW:
                this.bombRow(touchX, touchY, isTouch, arr);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG:
                this.bombColumnStrong(touchX, touchY, isTouch, arr);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG:
                this.bombRowStrong(touchX, touchY, isTouch, arr);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_AROUND:
                this.bombAround(touchX, touchY, isTouch);
                break;
        }
    };
    LayerGame.prototype.randomMore = function (count, length, arr, cb) {
        if (count > length) {
            return;
        }
        var index = Math.floor(Math.random() * length);
        for (var i = 0; i < arr.length; ++i) {
            if (index == arr[i]) {
                this.randomMore(count, length, arr, cb);
                return;
            }
        }
        if (cb(index)) {
            this.randomMore(count, length, arr, cb);
            return;
        }
        arr.push(index);
        count--;
        if (count > 0) {
            this.randomMore(count, length, arr, cb);
        }
    };
    // 每操作一次,改变爆竹方向
    LayerGame.prototype.onceOperate = function () {
        this.changeCracker();
    };
    // 改变爆竹方向
    LayerGame.prototype.changeCracker = function () {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                    this.tiles[x][y].changeType();
                }
            }
        }
    };
    /**
     * 增加操作数，点击炸弹不计入
     */
    LayerGame.prototype.addOperateCount = function () {
        Modules_1.Play.DataPvp.operateCount++;
    };
    // 点击方块
    LayerGame.prototype.destroyBlock = function (touchX, touchY, curNum) {
        return __awaiter(this, void 0, void 0, function () {
            var self, arr, scanArr, bomb_1, type, index, x, y, actionArr_1, index, x, y, blockComponent, position, index, x, y, action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.stopRemindAction();
                        arr = [];
                        scanArr = [];
                        Algorithm.scanAround(touchX, touchY, -1, -1, curNum, arr, scanArr, this.tiles, false);
                        if (!(arr.length > 1)) return [3 /*break*/, 4];
                        this.addOperateCount();
                        this.onceOperate();
                        if (this.pvpGuide) {
                            this.firstDown = true;
                        }
                        this.matchCountSum += arr.length;
                        if (this.maxMatchCount < arr.length) {
                            this.maxMatchCount = arr.length;
                        }
                        this.hadRemind = true;
                        this.remindTime = 0;
                        if (!(arr.length >= 5)) return [3 /*break*/, 2];
                        this.PlayUI.Audio.spawnBomb();
                        type = void 0;
                        for (index in arr) {
                            x = Number(arr[index].split("#")[0]);
                            y = Number(arr[index].split("#")[1]);
                            this.tiles[x][y].node.stopAllActions();
                            if (x == touchX && y == touchY) {
                                Algorithm.tileBgEffect(this, 0, x, y, 0.5);
                                bomb_1 = this.tiles[x][y].node;
                                type = bomb_1.type;
                                bomb_1.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION;
                            }
                        }
                        actionArr_1 = [];
                        for (index in arr) {
                            x = Number(arr[index].split("#")[0]);
                            y = Number(arr[index].split("#")[1]);
                            this.affectAround(x, y);
                            Algorithm.tileBgEffect(this, 0, x, y, 0.5);
                            if (this.tiles[x][y].node != bomb_1) {
                                this.tiles[x][y].node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
                            }
                            blockComponent = self.tiles[x][y];
                            self.tiles[x][y] = null;
                            blockComponent.canTouch = false;
                            position = blockComponent.node.position.sub(bomb_1.position);
                            position.mulSelf(0.1);
                            (function (blockComponent, position) {
                                var action = cc.sequence(cc.spawn(cc.scaleTo(0.05, 1.1), cc.moveBy(0.05, position)), cc.delayTime(0.05), cc.moveTo(0.1, bomb_1.getPosition()).easing(cc.easeQuarticActionIn()), cc.callFunc(function () {
                                    blockComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
                                }));
                                Algorithm.addAction(actionArr_1, blockComponent.node, action);
                            })(blockComponent, position);
                        }
                        self.showEncourage(arr);
                        self.chooseBomb(touchX, touchY, arr.length);
                        Modules_1.Play.DataPvp.stepSpawnPet += arr.length;
                        // 生成宠物
                        // if (Play.DataPvp.objectiveSpawnCnt[0] - this.panelHeader.myAnimalCount < 8) {
                        //     this.spawnPets(touchX, touchY, arr);
                        // }
                        return [4 /*yield*/, Algorithm.runActions(actionArr_1)];
                    case 1:
                        // 生成宠物
                        // if (Play.DataPvp.objectiveSpawnCnt[0] - this.panelHeader.myAnimalCount < 8) {
                        //     this.spawnPets(touchX, touchY, arr);
                        // }
                        _a.sent();
                        this.spawnedBomb = true;
                        this.canTouch = true;
                        this.moveAllTileDown();
                        return [3 /*break*/, 3];
                    case 2:
                        //执行消除
                        this.PlayUI.Audio.strip();
                        for (index in arr) {
                            x = Number(arr[index].split("#")[0]);
                            y = Number(arr[index].split("#")[1]);
                            this.affectAround(x, y);
                            // 播放粒子
                            Algorithm.tileBgEffect(this, 0, x, y, 0.5);
                            // 销毁方块
                            this.tiles[x][y].node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
                            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
                        }
                        // await Algorithm.delay(0.4);
                        Modules_1.Play.DataPvp.stepSpawnPet += arr.length;
                        this.moveAllTileDown();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        this.tiles[touchX][touchY].node.stopActionByTag(3);
                        action = cc.sequence(cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.15, 1.05, 1.05), cc.scaleTo(0.05, 1, 1), cc.delayTime(1.5));
                        this.tiles[touchX][touchY].node.runAction(action);
                        action.setTag(3);
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LayerGame.prototype.affectAround = function (x, y) {
        if (x - 1 >= 0 && x - 1 < 8 && y >= 0 && y < 9) {
            this.destroyprop(x - 1, y);
        }
        if (x + 1 >= 0 && x + 1 < 8 && y >= 0 && y < 9) {
            this.destroyprop(x + 1, y);
        }
        if (x >= 0 && x < 8 && y + 1 >= 0 && y + 1 < 9) {
            this.destroyprop(x, y + 1);
        }
        if (x >= 0 && x < 8 && y - 1 >= 0 && y - 1 < 9) {
            this.destroyprop(x, y - 1);
        }
    };
    LayerGame.prototype.destroyprop = function (x, y) {
        if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.WALL) {
            this.tiles[x][y].affected();
        }
    };
    // 选择生成炸弹
    LayerGame.prototype.chooseBomb = function (x, y, length) {
        if (Modules_1.Play.DataPvp.isSpawnStrongRocket) {
            this.spawnBomb(x, y, PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG);
        }
        else {
            this.spawnBomb(x, y, PlayDefine_1.BOMB_TYPE.BOMB_COLUMN);
        }
        return;
        if (length < 7) {
            this.spawnBomb(x, y, PlayDefine_1.BOMB_TYPE.BOMB_COLUMN);
        }
        else {
            this.spawnBomb(x, y, PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG);
        }
    };
    // 所有炸弹是否炸完
    LayerGame.prototype.isBombOver = function (arr) {
        for (var i = 0; i < arr.length; ++i) {
            if (!arr[i].isDestroying) {
                return false;
            }
        }
        return true;
    };
    // 点击炸弹列
    LayerGame.prototype.bombColumn = function (touchX, touchY, isTouch, arr) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.bombOver = false;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        if (bombComponent.tileType !== PlayDefine_1.TILE_TYPE.BOMB) {
                            return [2 /*return*/];
                        }
                        this.stopRemindAction();
                        this.remindTime = 0;
                        // this.canTouch = false;
                        this.PlayUI.Audio.bombRow();
                        nodBomb.getComponent(cc.Animation).play('aniBombCol');
                        Algorithm.bothSiedAct(touchX, touchY, this.tiles);
                        this.tiles[touchX][touchY] = null;
                        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);
                        arr = arr || [];
                        arr.push(bombComponent);
                        for (i = touchY + 1, j = touchY - 1; i < self.tiles[0].length || j >= 0; ++i, --j) {
                            self.bombUp(touchX, touchY, touchX, i, bombComponent, arr);
                            self.bombDown(touchX, touchY, touchX, j, bombComponent, arr);
                        }
                        return [4 /*yield*/, Algorithm.delay(0.4)];
                    case 1:
                        _a.sent();
                        if (isTouch) {
                            this.onceOperate();
                        }
                        bombComponent.destroyTile();
                        if (this.isBombOver(arr)) {
                            this.showEncourage(arr);
                        }
                        this.canTouch = true;
                        this.bombOver = true;
                        self.moveAllTileDown();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 点击炸弹行
    LayerGame.prototype.bombRow = function (touchX, touchY, isTouch, arr) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.bombOver = false;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        if (bombComponent.tileType !== PlayDefine_1.TILE_TYPE.BOMB) {
                            return [2 /*return*/];
                        }
                        this.stopRemindAction();
                        this.remindTime = 0;
                        // this.canTouch = false;
                        this.PlayUI.Audio.bombRow();
                        nodBomb.rotation = 90;
                        nodBomb.getComponent(cc.Animation).play('aniBombCol');
                        // Algorithm.bothSiedAct(touchX, touchY, this.tiles);
                        this.tiles[touchX][touchY] = null;
                        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);
                        arr = arr || [];
                        arr.push(bombComponent);
                        for (i = touchX + 1, j = touchX - 1; i < self.tiles.length || j >= 0; ++i, --j) {
                            self.bombRight(touchX, touchY, touchY, i, bombComponent, arr);
                            self.bombLeft(touchX, touchY, touchY, j, bombComponent, arr);
                        }
                        return [4 /*yield*/, Algorithm.delay(0.4)];
                    case 1:
                        _a.sent();
                        if (isTouch) {
                            this.onceOperate();
                        }
                        bombComponent.destroyTile();
                        if (this.isBombOver(arr)) {
                            this.showEncourage(arr);
                        }
                        this.canTouch = true;
                        this.bombOver = true;
                        self.moveAllTileDown();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 点击炸弹列加强
    LayerGame.prototype.bombColumnStrong = function (touchX, touchY, isTouch, arr) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent, i, j, tX, i, j, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.bombOver = false;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        if (bombComponent.tileType !== PlayDefine_1.TILE_TYPE.BOMB) {
                            return [2 /*return*/];
                        }
                        this.stopRemindAction();
                        this.remindTime = 0;
                        // this.canTouch = false;
                        this.PlayUI.Audio.bombRow();
                        nodBomb.getComponent(cc.Animation).play('aniBombColStrong');
                        Algorithm.bothSiedAct(touchX, touchY, this.tiles);
                        this.tiles[touchX][touchY] = null;
                        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);
                        arr = arr || [];
                        arr.push(bombComponent);
                        for (i = touchY + 1, j = touchY - 1; i < self.tiles[0].length || j >= 0; ++i, --j) {
                            self.bombUp(touchX, touchY, touchX, i, bombComponent, arr);
                            self.bombDown(touchX, touchY, touchX, j, bombComponent, arr);
                        }
                        return [4 /*yield*/, Algorithm.delay(0.1)];
                    case 1:
                        _a.sent();
                        tX = touchX - 1;
                        if (tX >= 0) {
                            for (i = touchY, j = touchY; i < self.tiles[0].length || j >= 0; ++i, --j) {
                                self.bombUp(touchX, touchY, tX, i, bombComponent, arr);
                                self.bombDown(touchX, touchY, tX, j, bombComponent, arr);
                            }
                        }
                        tX = touchX + 1;
                        if (tX < self.tiles[0].length) {
                            for (i = touchY, j = touchY; i < self.tiles[0].length || j >= 0; ++i, --j) {
                                self.bombUp(touchX, touchY, tX, i, bombComponent, arr);
                                self.bombDown(touchX, touchY, tX, j, bombComponent, arr);
                            }
                        }
                        return [4 /*yield*/, Algorithm.delay(0.4)];
                    case 2:
                        _a.sent();
                        if (isTouch) {
                            this.onceOperate();
                        }
                        bombComponent.destroyTile();
                        if (this.isBombOver(arr)) {
                            this.showEncourage(arr);
                        }
                        this.canTouch = true;
                        this.bombOver = true;
                        self.moveAllTileDown();
                        return [2 /*return*/];
                }
            });
        });
    };
    // 点击炸弹行加强
    LayerGame.prototype.bombRowStrong = function (touchX, touchY, isTouch, arr) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent, i, j, tY, i, j, i, j;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.bombOver = false;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        if (bombComponent.tileType !== PlayDefine_1.TILE_TYPE.BOMB) {
                            return [2 /*return*/];
                        }
                        this.stopRemindAction();
                        this.remindTime = 0;
                        this.canTouch = false;
                        this.PlayUI.Audio.bombRow();
                        nodBomb.rotation = 90;
                        nodBomb.getComponent(cc.Animation).play('aniBombColStrong');
                        // Algorithm.bothSiedAct(touchX, touchY, this.tiles);
                        this.tiles[touchX][touchY] = null;
                        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);
                        arr = arr || [];
                        arr.push(bombComponent);
                        for (i = touchX + 1, j = touchX - 1; i < self.tiles.length || j >= 0; ++i, --j) {
                            self.bombRight(touchX, touchY, touchY, i, bombComponent, arr);
                            self.bombLeft(touchX, touchY, touchY, j, bombComponent, arr);
                        }
                        return [4 /*yield*/, Algorithm.delay(0.2)];
                    case 1:
                        _a.sent();
                        tY = touchY - 1;
                        if (tY >= 0) {
                            for (i = touchX, j = touchX; i < self.tiles.length || j >= 0; ++i, --j) {
                                self.bombRight(touchX, touchY, tY, i, bombComponent, arr);
                                self.bombLeft(touchX, touchY, tY, j, bombComponent, arr);
                            }
                        }
                        tY = touchY + 1;
                        if (tY < self.tiles.length) {
                            for (i = touchX, j = touchX; i < self.tiles.length || j >= 0; ++i, --j) {
                                self.bombRight(touchX, touchY, tY, i, bombComponent, arr);
                                self.bombLeft(touchX, touchY, tY, j, bombComponent, arr);
                            }
                        }
                        return [4 /*yield*/, Algorithm.delay(0.4)];
                    case 2:
                        _a.sent();
                        if (isTouch) {
                            this.onceOperate();
                        }
                        bombComponent.destroyTile();
                        if (this.isBombOver(arr)) {
                            this.showEncourage(arr);
                        }
                        this.canTouch = true;
                        this.bombOver = true;
                        self.moveAllTileDown();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGame.prototype.playRowBombAni = function (line) {
        var nodBomb = Modules_1.Play.DataPvp.popBomb();
        if (nodBomb.parent != this.panelTile) {
            nodBomb.parent = this.panelTile;
        }
        var bombComponent = nodBomb.getComponent('BombPvp');
        bombComponent.init();
        nodBomb.y = 80 * line + 40;
        nodBomb.scale = 1;
        nodBomb.rotation = 90;
        nodBomb.getComponent(cc.Animation).play('aniBombCol');
    };
    LayerGame.prototype.bombUp = function (touchX, touchY, x, i, bombComponent, arr) {
        var _this = this;
        var self = this;
        if (!self.tiles[x][i]) {
            return;
        }
        this.scheduleOnce(function () {
            var tileComponent = self.tiles[x][i];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(_this, 0, x, i, 0.8);
            if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(arr, false);
                }
                else if (touchX === x && tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG
                    && bombComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG) {
                    tileComponent.ignite(arr, false);
                }
                else {
                    tileComponent.ignite(arr);
                }
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(x, i, self.tiles);
        }, (i - touchY) * 0.02);
    };
    LayerGame.prototype.bombDown = function (touchX, touchY, x, j, bombComponent, arr) {
        var _this = this;
        var self = this;
        if (!self.tiles[x][j]) {
            return;
        }
        this.scheduleOnce(function () {
            var tileComponent = self.tiles[x][j];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(_this, 0, x, j, 0.8);
            if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(arr, false);
                }
                else if (touchX === x && tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG
                    && bombComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG) {
                    tileComponent.ignite(arr, false);
                }
                else {
                    tileComponent.ignite(arr);
                }
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(x, j, self.tiles);
        }, (touchY - j) * 0.02);
    };
    LayerGame.prototype.bombRight = function (touchX, touchY, y, i, bombComponent, arr) {
        var _this = this;
        var self = this;
        if (!self.tiles[i] || !self.tiles[i][y]) {
            return;
        }
        this.scheduleOnce(function () {
            var tileComponent = self.tiles[i][y];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(_this, 0, i, y, 0.8);
            if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ROW) {
                    tileComponent.ignite(arr, false);
                }
                else if (touchX === y && tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG
                    && bombComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG) {
                    tileComponent.ignite(arr, false);
                }
                else {
                    tileComponent.ignite(arr);
                }
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            // Algorithm.bothSiedAct(i, touchY, self.tiles)
        }, (i - touchX) * 0.02);
    };
    LayerGame.prototype.bombLeft = function (touchX, touchY, y, j, bombComponent, arr) {
        var _this = this;
        var self = this;
        if (!self.tiles[j] || !self.tiles[j][y]) {
            return;
        }
        this.scheduleOnce(function () {
            var tileComponent = self.tiles[j][y];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(_this, 0, j, y, 0.8);
            if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ROW) {
                    tileComponent.ignite(arr, false);
                }
                else if (touchX === y && tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG
                    && bombComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG) {
                    tileComponent.ignite(arr, false);
                }
                else {
                    tileComponent.ignite(arr);
                }
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
            }
            else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            // Algorithm.bothSiedAct(j, touchY, self.tiles)
        }, (touchX - j) * 0.02);
    };
    // 点击炸弹周围
    LayerGame.prototype.bombAround = function (touchX, touchY, isTouch) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.bombOver = false;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        this.stopRemindAction();
                        this.remindTime = 0;
                        // this.canTouch = false;
                        return [4 /*yield*/, this.bombAroundAnimation(touchX, touchY, nodBomb)];
                    case 1:
                        // this.canTouch = false;
                        _a.sent();
                        self.moveAllTileDown();
                        self.canTouch = true;
                        self.bombOver = true;
                        this.PlayUI.Audio.bombAround();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGame.prototype.bombAroundAnimation = function (touchX, touchY, nodBomb) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        for (var i = 2; i >= -2; --i) {
                            for (var j = 2; j >= -2; --j) {
                                if ((i == 0 && j == 0) || !self.tiles[touchX + i] || !self.tiles[touchX + i][touchY + j]) {
                                    continue;
                                }
                                // 粒子
                                if (i == 2 || j == 2 || i == -2 || j == -2) {
                                    Algorithm.tileBgEffect(self, 2, touchX + i, touchY + j, 0.7);
                                }
                                else {
                                    Algorithm.tileBgEffect(self, 0, touchX + i, touchY + j, 0.9);
                                }
                                if (self.tiles[touchX + i][touchY + j].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                                    var tileComponent = self.tiles[touchX + i][touchY + j];
                                    if (!tileComponent.isDestroying) {
                                        tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                            tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
                                        }.bind(self, i, j, tileComponent));
                                    }
                                }
                                else if (self.tiles[touchX + i][touchY + j].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                                    var tileComponent = self.tiles[touchX + i][touchY + j];
                                    if (!tileComponent.isDestroying) {
                                        tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                            tileComponent.ignite();
                                        }.bind(self, i, j, tileComponent));
                                    }
                                }
                                else if (self.tiles[touchX + i][touchY + j].tileType === PlayDefine_1.TILE_TYPE.PET) {
                                    var tileComponent = self.tiles[touchX + i][touchY + j];
                                    tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                    }.bind(self, i, j, tileComponent));
                                }
                            }
                        }
                        var animComponent = nodBomb.getComponent(cc.Animation);
                        animComponent.onFire = function () {
                            var bombComponent = nodBomb.getComponent('BombPvp');
                            self.tiles[bombComponent.x][bombComponent.y] = null;
                            bombComponent.destroyTile();
                            resolve();
                        };
                        animComponent.play('aniBombArea');
                    })];
            });
        });
    };
    LayerGame.prototype.tileDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var x, y, yy;
            return __generator(this, function (_a) {
                for (x = 0; x < this.tiles.length; ++x) {
                    for (y = 0; y < this.tiles[0].length; ++y) {
                        if (this.tiles[x][y]) {
                            continue;
                        }
                        for (yy = y + 1; yy < this.tiles[x].length; ++yy) {
                            if (this.tiles[x][yy] && this.tiles[x][yy].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                                break;
                            }
                            if (!this.tiles[x][yy] || (this.tiles[x][yy].tileType === PlayDefine_1.TILE_TYPE.BOMB && this.tiles[x][yy].isDestroying)) {
                                continue;
                            }
                            if (this.tiles[x][yy].tileType === PlayDefine_1.TILE_TYPE.PET && y === 0) {
                                this.tiles[x][y] = this.tiles[x][yy];
                                this.tiles[x][yy] = null;
                                this.tiles[x][y].moveTo(x, y, null);
                                yy--;
                                continue;
                            }
                            this.tiles[x][y] = this.tiles[x][yy];
                            this.tiles[x][yy] = null;
                            this.tiles[x][y].moveTo(x, y, null);
                            break;
                        }
                    }
                }
                this.fillVavancy();
                return [2 /*return*/];
            });
        });
    };
    // 根据游戏阶段和下方水果颜色，设置下落水果颜色
    LayerGame.prototype.getBlockColor = function (x, y) {
        if (this.pvpTeach) {
            return Math.floor(Math.random() * PlayDefine_1.TEACH_FRUIT_COLOR_CNT) + 1;
        }
        var num = Math.random();
        var arrType = [PlayDefine_1.BLOCK_COLOR.RED, PlayDefine_1.BLOCK_COLOR.GREEN, PlayDefine_1.BLOCK_COLOR.BLUE, PlayDefine_1.BLOCK_COLOR.YELLOW, PlayDefine_1.BLOCK_COLOR.PURPLE, PlayDefine_1.BLOCK_COLOR.SIX];
        for (var i = 0; i < arrType.length; ++i) {
            if (this.tiles[x] && this.tiles[x][y - 1] && arrType[i] === this.tiles[x][y - 1].type) {
                var t = arrType[0];
                arrType[0] = arrType[i];
                arrType[i] = t;
                break;
            }
        }
        if (!Modules_1.Play.DataPvp.isSpawnStrongRocket) {
            var color = 0;
            if (num <= 0.25) {
                color = arrType[0];
            }
            else if (num <= 0.4) {
                color = arrType[2];
            }
            else if (num <= 0.55) {
                color = arrType[3];
            }
            else if (num <= 0.7) {
                color = arrType[4];
            }
            else if (num <= 0.85) {
                color = arrType[5];
            }
            else if (num <= 1) {
                color = arrType[6];
            }
            return color;
        }
        else {
            return null;
        }
    };
    /**
     * 所有方块向下移动
     */
    LayerGame.prototype.moveAllTileDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!this.destroyAllTilesOver) {
                    return [2 /*return*/];
                }
                this.hadRemindTime();
                this.downOver = false;
                //console.log('moveDown');
                this.tileDown();
                return [2 /*return*/];
            });
        });
    };
    // 空缺地方生成tile
    LayerGame.prototype.fillVavancy = function () {
        return __awaiter(this, void 0, void 0, function () {
            var hadNull, x, y, x, minY, y, y, color;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        hadNull = false;
                        for (x = 0; x < this.tiles.length; ++x) {
                            for (y = 8; y >= 0; --y) {
                                if (!this.tiles[x][y]) {
                                    hadNull = true;
                                    break;
                                }
                                if (this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                                    break;
                                }
                            }
                        }
                        if (!hadNull) return [3 /*break*/, 1];
                        for (x = 0; x < this.tiles.length; ++x) {
                            minY = -1;
                            for (y = 8; y >= 0; --y) {
                                if (this.tiles[x][y]) {
                                    if (this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                                        break;
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                minY = y;
                            }
                            if (minY < 0) {
                                continue;
                            }
                            for (y = minY; y < 9; ++y) {
                                if (this.tiles[x][y]) {
                                    if (this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                                        break;
                                    }
                                    else {
                                        continue;
                                    }
                                }
                                if (y - 1 < 0 || (this.tiles[x][y - 1] && this.tiles[x][y - 1].tileType !== PlayDefine_1.TILE_TYPE.BLOCK)) {
                                    this.spawnTile(x, y, minY, null);
                                }
                                if (this.tiles[x][y - 1] && this.tiles[x][y - 1].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                                    color = this.getBlockColor(x, y);
                                    // let color = Math.floor(Math.random() * PVP_FRUIT_COLOR_CNT) + 1;
                                    this.spawnTile(x, y, minY, color);
                                }
                            }
                        }
                        this.tileDown();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, Algorithm.delay(0.5)];
                    case 2:
                        _a.sent();
                        this.downOver = true;
                        this.pveTeach();
                        this.resetRemindTime();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LayerGame.prototype.getObstacle = function () {
        var self = this;
        Modules_1.Play.DataPvp.petCnt++;
        if (self.pvpTeach || self.pvpAi) {
            self.PlayUI.getAnimal(Modules_1.Play.DataPvp.petAllCnt, Modules_1.Play.DataPlay.MySide);
            var randomTime = Math.random() * 5;
            self.scheduleOnce(function () {
                if (self.panelHeader.remainTime > 1) {
                    var randomNum = Math.floor(Math.random() + 0.3);
                    Modules_1.Play.DataPvp.opponentPetAllCnt += randomNum;
                    if (randomNum != 0) {
                        self.PlayUI.getAnimal(Modules_1.Play.DataPvp.opponentPetAllCnt, Modules_1.Play.DataPlay.AiSide);
                    }
                }
            }, randomTime);
        }
        if (this.pvpTeach && this.firstSave) {
            this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.SAVE_SUC);
            this.firstSave = false;
        }
    };
    // pve教学
    LayerGame.prototype.pveTeach = function () {
        var self = this;
        // pvp教学第一次消除
        if (this.pvpTeach && this.firstDown && (!this.spawnedBomb)) {
            this.firstDown = false;
        }
        if (this.pvpTeach && this.spawnedBomb && (this.saveDown == 0) && (this.firstBombA || this.firstBombCol)) {
            for (var x = 0; x < self.tiles.length; ++x) {
                for (var y = 0; y < self.tiles[0].length; ++y) {
                    if (self.tiles[x][y] && self.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                        var bombComponent = self.tiles[x][y];
                        var panelpos = this.panelTile.convertToWorldSpaceAR(bombComponent.node.getPosition());
                        switch (bombComponent.type) {
                            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMN:
                                if (this.firstBombCol) {
                                    this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.BOMB_COL, panelpos);
                                    this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.BOMB_SUC);
                                    this.firstBombCol = false;
                                }
                                break;
                            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG:
                                if (this.firstBombA) {
                                    this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.BOMB_COL_STR, panelpos);
                                    this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.BOMB_COL_STR_SUC);
                                    this.firstBombA = false;
                                }
                                break;
                        }
                    }
                }
            }
            if (this.firstDown) {
                this.firstDown = false;
            }
        }
    };
    //生成新的方块
    LayerGame.prototype.spawnTile = function (x, y, minY, type) {
        // 生成宠物
        if (Modules_1.Play.DataPvp.canSpawnPet()) {
            Modules_1.Play.DataPvp.waittingSpawnPetCount--;
            this.spawnPet(x, y, true, minY);
            this.sendBoardPetCnt();
            return;
        }
        // 生成火箭
        if (Modules_1.Play.DataPvp.waittingSpawnRocketCount > 0) {
            Modules_1.Play.DataPvp.waittingSpawnRocketCount--;
            this.spawnBomb(x, y, PlayDefine_1.BOMB_TYPE.BOMB_COLUMN, minY, true);
            return;
        }
        if (Modules_1.Play.DataPvp.waittingSpawnStrongRocketCount > 0) {
            Modules_1.Play.DataPvp.waittingSpawnStrongRocketCount--;
            this.spawnBomb(x, y, PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG, minY, true);
            return;
        }
        this.spawnBlock(x, y, type, minY);
    };
    // 生成炸弹
    LayerGame.prototype.spawnBomb = function (x, y, type, minY, isDown) {
        if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_FIRSTDES);
        }
        var nodBomb = Modules_1.Play.DataPvp.popBomb();
        if (nodBomb.parent != this.panelTile) {
            nodBomb.parent = this.panelTile;
        }
        var bombComponent = this.tiles[x][y] = nodBomb.getComponent('BombPvp');
        bombComponent.init();
        nodBomb.scale = 1;
        nodBomb.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        var width = 80;
        bombComponent.setContentSize(width, width);
        bombComponent.game = this;
        bombComponent.type = type;
        if (isDown) {
            bombComponent.newTile(x, y, minY);
        }
        else {
            bombComponent.setArrPosition(x, y);
            bombComponent.genBombAnimation();
        }
    };
    // 生成宠物
    LayerGame.prototype.spawnPet = function (x, y, isDown, minY) {
        if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_FIRSTDES);
        }
        Modules_1.Play.DataPvp.petSpawnCnt++;
        var nodPet = Modules_1.Play.DataPvp.popObstacle();
        if (nodPet.parent != this.panelSpine) {
            nodPet.parent = this.panelSpine;
        }
        var petComponent = this.tiles[x][y] = nodPet.getComponent("ObstaclePvp");
        petComponent.init();
        var width = 80;
        petComponent.game = this;
        petComponent.type = Math.floor(Math.random() * 4 + 1);
        nodPet.scale = 1;
        nodPet.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        petComponent.setContentSize(width, width);
        if (isDown) {
            petComponent.newTile(x, y, minY);
        }
        else {
            petComponent.setArrPosition(x, y);
        }
    };
    // 生成block
    LayerGame.prototype.spawnBlock = function (x, y, type, minY, isDown) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
        }
        var nodBlock = Modules_1.Play.DataPvp.popBlock();
        if (nodBlock.parent != this.panelTile) {
            nodBlock.parent = this.panelTile;
        }
        var blockComponent = this.tiles[x][y] = nodBlock.getComponent("BlockPvp");
        blockComponent.init();
        blockComponent.game = this;
        nodBlock.scale = 1;
        nodBlock.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        var width = 80;
        blockComponent.setContentSize(width, width);
        var colotCnt = PlayDefine_1.PVP_FRUIT_COLOR_CNT;
        if (this.pvpTeach) {
            colotCnt = PlayDefine_1.TEACH_FRUIT_COLOR_CNT;
        }
        type = type ? type : Math.floor(Math.random() * colotCnt) + 1;
        blockComponent.type = type;
        blockComponent.newTile(x, y, minY, isDown);
    };
    // 生成Wall
    LayerGame.prototype.spawnWall = function (x, y, type) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile();
            this.tiles[x][y] = null;
        }
        var nodWall = cc.instantiate(Modules_1.Play.DataPvp.pfbWall);
        if (nodWall.parent != this.panelTile) {
            nodWall.parent = this.panelTile;
        }
        nodWall.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        var wallComponent = this.tiles[x][y] = nodWall.getComponent("WallPvp");
        wallComponent.game = this;
        wallComponent.type = type;
        var width = 80;
        wallComponent.setContentSize(width, width);
        wallComponent.setArrPosition(x, y);
    };
    // 播放粒子
    LayerGame.prototype.playParticle = function (x, y) {
        var node = cc.instantiate(this.pfbParticle);
        node.parent = this.panelParticle;
        node.getComponent('Particle').setArrPosition(x, y);
        node.getComponent('Particle').play();
    };
    LayerGame.prototype.stopRemindAction = function () {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].node) {
                    this.tiles[x][y].node.stopActionByTag(2);
                    this.tiles[x][y].node.scale = 1;
                }
            }
        }
    };
    LayerGame.prototype.gameOver = function () {
        this.cancelCloud();
        this.canTouch = false;
        this.stopRemindAction();
        this.hadRemind = true;
    };
    LayerGame.prototype.resetRemindTime = function () {
        this.hadRemind = false;
        this.oneSec = 0;
        this.remindTime = 0;
    };
    LayerGame.prototype.hadRemindTime = function () {
        this.hadRemind = true;
    };
    LayerGame.prototype.update = function (dt) {
        var _this = this;
        if (!Modules_1.Play.DataPvp.gameBegan) {
            return;
        }
        this.remindTime += dt;
        this.oneSec += dt;
        if (this.oneSec >= 1 && !this.hadRemind && !StateMgr_1.default.INSTANCE.isStopOperate) {
            this.oneSec = 0;
            // 提示动画
            var allArr = Algorithm.checkoutMatch(this.tiles, false);
            if (this.remindTime >= 5 && allArr.length > 0) {
                this.hadRemind = true;
                var index = Math.floor(Math.random() * allArr.length);
                var arr = allArr[index];
                this.stopRemindAction();
                for (var i = 0; i < arr.length; ++i) {
                    var x = Number(arr[i].split("#")[0]);
                    var y = Number(arr[i].split("#")[1]);
                    this.tiles[x][y].node.stopActionByTag(2);
                    this.tiles[x][y].node.opacity = 255;
                    var action = cc.repeatForever(cc.sequence(
                    // cc.blink(1, 3),
                    cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.15, 1.05, 1.05), cc.scaleTo(0.05, 1, 1), cc.delayTime(1.5)));
                    this.tiles[x][y].node.runAction(action);
                    action.setTag(2);
                }
            }
            else if (allArr.length <= 0) {
                //console.log('没有可消除的组合');
                this.hadRemindTime();
                this.PlayUI.setToast('没有可消除的组合');
                this.canTouch = false;
                this.scheduleOnce(function () {
                    Algorithm.shuffleTiles(_this.tiles, function () {
                        _this.scheduleOnce(function () {
                            this.canTouch = true;
                            this.moveAllTileDown();
                        }, 1);
                    }, false);
                }, 2);
            }
        }
    };
    // 云
    LayerGame.prototype.showCloud = function () {
        this.nodCloud.active = true;
        this.nodCloud.opacity = 255;
        this.nodCloud.stopActionByTag(1);
        this.nodCloud.getComponent(cc.Animation).play('propCloud');
        this.unschedule(this.hideCloud);
        this.scheduleOnce(this.hideCloud, 10);
    };
    LayerGame.prototype.hideCloud = function () {
        var _this = this;
        var action = cc.sequence(cc.fadeTo(0.5, 0), cc.callFunc(function () {
            _this.nodCloud.active = false;
            _this.nodCloud.opacity = 255;
        }));
        this.nodCloud.runAction(action);
        action.setTag(1);
    };
    // 取消云
    LayerGame.prototype.cancelCloud = function () {
        this.unschedule(this.hideCloud);
        this.nodCloud.active = false;
        this.nodCloud.opacity = 255;
    };
    LayerGame.prototype.destroyAllTiles = function () {
        var _this = this;
        this.destroyAllTilesOver = false;
        this.hadRemindTime();
        this.effect(3, 4);
        this.effect(4, 4);
        this.scheduleOnce(function () {
            _this.destroyAllTilesOver = true;
            _this.moveAllTileDown();
        }, 0.8);
    };
    // 被抢夺
    LayerGame.prototype.beGrabedObstacle = function () {
        var self = this;
        Modules_1.Play.DataPvp.petBeGrabedCnt++;
        if (self.pvpTeach || self.pvpAi) {
            Modules_1.Play.DataPvp.opponentPetAllCnt++;
            self.PlayUI.getAnimal(Modules_1.Play.DataPvp.opponentPetAllCnt, Modules_1.Play.DataPlay.AiSide);
        }
    };
    // 抢夺
    LayerGame.prototype.grabedObstacle = function () {
        var self = this;
        Modules_1.Play.DataPvp.petGrabCnt++;
        self.PlayUI.getAnimal(Modules_1.Play.DataPvp.petAllCnt, Modules_1.Play.DataPlay.MySide);
    };
    // 吸取宠物
    LayerGame.prototype.grabPet = function (count) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.pvpAi) {
                            count = Math.floor(Math.random() * 8);
                            this.grabPetAction(count);
                            if (count > 0) {
                                this.PlayUI.setToast('嘿嘿，偷偷拿几个ta不知道', PlayDefine_1.ColorType.Green);
                                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                                this.PlayUI.Audio.buff2();
                            }
                            else {
                                this.PlayUI.setToast('额，ta怎么1个宠物都没有', PlayDefine_1.ColorType.Red);
                                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                                this.PlayUI.Audio.miss();
                            }
                        }
                        else {
                            this.grabPetAction(count);
                        }
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < count)) return [3 /*break*/, 4];
                        this.grabedObstacle();
                        return [4 /*yield*/, Algorithm.delay(0.1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 吸取宠物动作
    LayerGame.prototype.grabPetAction = function (count) {
        return __awaiter(this, void 0, void 0, function () {
            var i, nodPet, petComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < count)) return [3 /*break*/, 4];
                        nodPet = Modules_1.Play.DataPvp.popObstacle();
                        petComponent = nodPet.getComponent("ObstaclePvp");
                        petComponent._game = this;
                        petComponent.init();
                        if (nodPet.parent != this.panelSpine) {
                            nodPet.parent = this.panelSpine;
                        }
                        nodPet.setPosition(petComponent._collectPosition2);
                        petComponent.grabPet();
                        return [4 /*yield*/, Algorithm.delay(0.1)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        ++i;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // 失去宠物
    LayerGame.prototype.losePet = function () {
        var _this = this;
        var count = 0;
        this.canTouch = false;
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.PET) {
                    this.tiles[x][y].runGrabAction(count);
                    count++;
                }
            }
        }
        if (this.pvpAi) {
            if (count > 0) {
                this.PlayUI.setToast('天，对手偷偷拿了你的宠物', PlayDefine_1.ColorType.Red);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.PlayUI.Audio.trick();
            }
            else {
                this.PlayUI.setToast('晕，你啥都没有，恰好对方一无所获', PlayDefine_1.ColorType.Green);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.BLU, PlayDefine_1.FaceType.Happy, PlayDefine_1.FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlayDefine_1.PlaySide.RED, PlayDefine_1.FaceType.Sand, PlayDefine_1.FaceAnimationType.Xuayun);
                this.PlayUI.Audio.opponentMiss();
            }
        }
        else {
            // 发送偷取个数
            // console.log('失去' + count);
            var playStolenAnimal = new ProtoSectionPlay_1.PlayStolenAnimalC2S();
            playStolenAnimal.num = count;
            NetUtil_1.default.SendMsg(playStolenAnimal);
        }
        this.scheduleOnce(function () {
            _this.canTouch = true;
        }, count * 0.1);
    };
    // 打乱顺序
    LayerGame.prototype.prop4 = function () {
        Algorithm.shuffleTiles(this.tiles, function () {
        }, false);
    };
    // 鼓励词
    LayerGame.prototype.showEncourage = function (arr) {
        if (arr.length <= 0) {
            return;
        }
        var num = 0;
        if (typeof (arr[0]) === 'string') {
            num = arr.length;
        }
        else {
            for (var i = 0; i < arr.length; ++i) {
                if (arr[i].type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                    num += 9;
                }
                else if (arr[i].type === PlayDefine_1.BOMB_TYPE.BOMB_ROW) {
                    num += 9;
                }
                else if (arr[i].type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMNSTRONG) {
                    num += 25;
                }
                else if (arr[i].type === PlayDefine_1.BOMB_TYPE.BOMB_ROWSTRONG) {
                    num += 25;
                }
            }
        }
        var type = 0;
        if (num >= 33) {
            type = 5;
            this.PlayUI.Audio.unbelievable();
        }
        else if (num >= 26) {
            type = 4;
            this.PlayUI.Audio.amazing();
        }
        else if (num >= 15) {
            type = 3;
            this.PlayUI.Audio.excellent();
        }
        else if (num >= 8) {
            type = 2;
            this.PlayUI.Audio.great();
        }
        else if (num >= 6) {
            type = 1;
            this.PlayUI.Audio.good();
        }
        if (type !== 0) {
            var node = Modules_1.Play.DataPvp.popEncourage();
            node.parent = this.panelParticle;
            node.getComponent('Encourage').setType(type);
        }
    };
    // 生成一个花
    LayerGame.prototype.gainFlower = function (row) {
        return __awaiter(this, void 0, void 0, function () {
            var arr, i, index, nodWall, wallComponent, bombComponent, panelpos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        arr = [];
                        for (i = 0; i < this.tiles.length; ++i) {
                            // 从最下一行选择一个水果，替换成花朵
                            if (!this.tiles[i][row - 1] || this.tiles[i][row - 1].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                                arr.push(this.tiles[i][row - 1]);
                            }
                        }
                        if (!(arr.length > 0)) return [3 /*break*/, 3];
                        index = Math.floor(Math.random() * arr.length);
                        if (!arr[index]) return [3 /*break*/, 2];
                        nodWall = Modules_1.Play.DataPvp.popWall();
                        wallComponent = nodWall.getComponent("WallPvp");
                        wallComponent._game = this;
                        wallComponent.init();
                        wallComponent.type = PlayDefine_1.WALL_TYPE.TYPE_1;
                        if (nodWall.parent != this.panelSpine) {
                            nodWall.parent = this.panelSpine;
                        }
                        nodWall.setPosition(wallComponent._collectPosition2);
                        wallComponent.getFlower(arr[index].x, arr[index].y);
                        nodWall.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION;
                        return [4 /*yield*/, Algorithm.delay(1)];
                    case 1:
                        _a.sent();
                        this.spawnWall(arr[index].x, arr[index].y, PlayDefine_1.WALL_TYPE.TYPE_1);
                        if (this.pvpTeach && this.firstGenFlower) {
                            bombComponent = this.tiles[arr[index].x][arr[index].y];
                            panelpos = this.panelTile.convertToWorldSpaceAR(bombComponent.node.getPosition());
                            this.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.GEN_FLOWER1, panelpos);
                            this.firstGenFlower = false;
                        }
                        _a.label = 2;
                    case 2: return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LayerGame.prototype.onDestroy = function () {
        cc.director.getScheduler().unscheduleAllForTarget(this);
        this.node.targetOff(this.node);
    };
    // 背景波浪动画,消除全屏
    LayerGame.prototype.effect = function (x, y) {
        var _this = this;
        if (!this.tileBgs[x] || !this.tileBgs[x][y] || this.tileBgs[x][y].hadAction) {
            this.scheduleOnce(function () {
                if (_this.tileBgs[x + 1] && _this.tileBgs[x + 1][y] && !_this.tileBgs[x + 1][y].hadAction) {
                    _this.effect(x + 1, y);
                }
                if (_this.tileBgs[x - 1] && _this.tileBgs[x - 1][y] && !_this.tileBgs[x - 1][y].hadAction) {
                    _this.effect(x - 1, y);
                }
                if (_this.tileBgs[x] && _this.tileBgs[x][y + 1] && !_this.tileBgs[x][y + 1].hadAction) {
                    _this.effect(x, y + 1);
                }
                if (_this.tileBgs[x] && _this.tileBgs[x][y - 1] && !_this.tileBgs[x][y - 1].hadAction) {
                    _this.effect(x, y - 1);
                }
            }, 0.1);
            return;
        }
        this.tileBgs[x][y].hadAction = true;
        var action = cc.sequence(cc.fadeTo(0.06, 150), cc.callFunc(function () {
            if (_this.tiles[x][y]) {
                if (_this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.PET) {
                }
                else if (_this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                    _this.tiles[x][y].destroyTile(2);
                }
                else if (_this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                    _this.tiles[x][y].ignite();
                }
                else {
                    _this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_FIRSTDES);
                }
            }
            if (_this.tileBgs[x + 1] && _this.tileBgs[x + 1][y] && !_this.tileBgs[x + 1][y].hadAction) {
                _this.effect(x + 1, y);
            }
            if (_this.tileBgs[x - 1] && _this.tileBgs[x - 1][y] && !_this.tileBgs[x - 1][y].hadAction) {
                _this.effect(x - 1, y);
            }
            if (_this.tileBgs[x] && _this.tileBgs[x][y + 1] && !_this.tileBgs[x][y + 1].hadAction) {
                _this.effect(x, y + 1);
            }
            if (_this.tileBgs[x] && _this.tileBgs[x][y - 1] && !_this.tileBgs[x][y - 1].hadAction) {
                _this.effect(x, y - 1);
            }
        }), cc.fadeTo(0.12, 255), cc.fadeOut(0.24), cc.callFunc(function () {
            _this.tileBgs[x][y].hadAction = false;
        }));
        this.tileBgs[x][y].getChildByName('sprLight').runAction(action);
    };
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbScore", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbBlock", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbBomb", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbObstacle", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbTileBg", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbEncourage", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbWall", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGame.prototype, "pfbParticle", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGame.prototype, "panelTile", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGame.prototype, "panelSpine", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGame.prototype, "panelParticle", void 0);
    __decorate([
        property(PanelHeader_1.default)
    ], LayerGame.prototype, "panelHeader", void 0);
    __decorate([
        property(PvpGuide_1.default)
    ], LayerGame.prototype, "pvpGuide", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGame.prototype, "panelGrid", void 0);
    __decorate([
        property(Bottom_1.Bottom)
    ], LayerGame.prototype, "bottom", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LayerGame.prototype, "spfTileBg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LayerGame.prototype, "spfTileBgLight", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGame.prototype, "nodCloud", void 0);
    LayerGame = __decorate([
        ccclass
    ], LayerGame);
    return LayerGame;
}(cc.Component));
exports.default = LayerGame;

cc._RF.pop();