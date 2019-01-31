(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pve/LayerGamePve.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '50331nwR5xKkZJI5wT/yU7R', 'LayerGamePve', __filename);
// scripts/app/component/game/pve/LayerGamePve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var NodePool_1 = require("../NodePool");
var PlayDefine_1 = require("../PlayDefine");
var PanelHeaderPve_1 = require("./PanelHeaderPve");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var NetUtil_1 = require("../../../common/net/NetUtil");
var StateMgr_1 = require("./StateMgr");
var Defines_1 = require("../../../common/Defines");
var Algorithm = require("../Algorithm");
var Modules_1 = require("../../../module/Modules");
var UIFunc_1 = require("../../../common/UIFunc");
var Message_1 = require("../../../common/Message");
var DYNotify_1 = require("../../../../dyGame/DYNotify");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var Modules = require("../../../module/Modules");
var SocialManager_1 = require("../../../common/social/SocialManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var LayerGamePve = /** @class */ (function (_super) {
    __extends(LayerGamePve, _super);
    function LayerGamePve() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pfbScore = null;
        _this.pfbBlock = null;
        _this.pfbBomb = null;
        _this.pfbObstacle = null;
        _this.pfbWall = null;
        _this.pfbTableware = null;
        _this.pfbTransport = null;
        _this.pfbGate = null;
        _this.pfbBonusBall = null;
        _this.pfbTileBg = null;
        _this.pfbParticle = null;
        _this.panelTile = null;
        _this.panelScore = null;
        _this.panelParticle = null;
        _this.panelTrickDown = null;
        _this.panelTrickUp = null;
        _this.panelGuide = null;
        _this.panelHeader = null;
        _this.panelSpine = null;
        _this.panelBonus = null;
        _this.panelGrid = null;
        _this.spfTileBg = null;
        _this.spfTileBgLight = null;
        _this.PlayUI = null;
        _this.remindTime = 0;
        _this.oneSec = 0;
        _this.time = 0;
        _this.count = 0;
        _this.lastArr = [];
        _this.arr = [];
        _this.tiles = [];
        _this.transports = [];
        _this.tileBgs = [];
        _this.actionList = [];
        _this.hadRemind = false;
        _this.transportMove = false;
        _this.canTouch = true;
        _this.touched = false;
        _this.oneColorActionOver = true;
        _this.bonusCallBack = null;
        _this.gameStat = null;
        _this.blockArrLength = 0;
        _this.dataPve = null;
        _this.recursive = 0;
        _this.hadShowAddStep = false;
        return _this;
    }
    LayerGamePve.prototype.onLoad = function () {
        Modules_1.Play.DataPve.gameBegan = false;
    };
    LayerGamePve.prototype.start = function () {
    };
    LayerGamePve.prototype.init = function (playUI) {
        this.PlayUI = playUI;
        Modules_1.Play.DataPve.game = this;
    };
    LayerGamePve.prototype.initData = function () {
        this.gameStat = PlayDefine_1.GAME_STAT.GAMEING;
        this.remindTime = 0;
        this.oneSec = 0;
        this.time = 0;
        this.count = 0;
        this.obstacleCnt = 0;
        this.lastArr = [];
        this.arr = [];
        this.tiles = [];
        this.transports = [];
        this.tileBgs = [];
        this.actionList = [];
        this.hadRemind = true;
        this.canTouch = true;
        this.hadAudAreaPlay = true;
        this.hadAudColPlay = true;
        this.hadAudOneColorPlay = true;
        this.panelBonus.active = false;
        Modules_1.Play.DataPve.clearFreeNodes();
        this.panelTile.destroyAllChildren();
        this.panelTrickDown.destroyAllChildren();
        this.panelParticle.destroyAllChildren();
        this.panelSpine.destroyAllChildren();
    };
    LayerGamePve.prototype.loadLevelData = function (cb) {
        var _this = this;
        this.initData();
        this.panelTile.parent.getComponent('Board_pve').initMap(this);
        this.panelHeader.init(this);
        UIFunc_1.UIFunc.openUI('UIObjective', function (node) {
            _this.UIObjective = node.getComponent('UIObjective');
            _this.UIObjective.initObjective(_this);
            cb && cb();
        });
    };
    LayerGamePve.prototype.gameBegin = function () {
        this.UIObjective.panelObjectiveAction();
        this.resetRemindTime();
    };
    LayerGamePve.prototype.operateLogic = function (touchX, touchY, tileType, type, subType, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        if (!StateMgr_1.default.INSTANCE.canOperate() || this.gameStat != PlayDefine_1.GAME_STAT.GAMEING) {
            return;
        }
        if (StateMgr_1.default.INSTANCE.haveTransport && !StateMgr_1.default.INSTANCE.isTransportOver) {
            return;
        }
        if (tileType == PlayDefine_1.TILE_TYPE.BLOCK) {
            this.destroyBlock(touchX, touchY, type);
        }
        else if (tileType == PlayDefine_1.TILE_TYPE.BOMB) {
            if (StateMgr_1.default.INSTANCE.haveTransport) {
                StateMgr_1.default.INSTANCE.isTransportOver = false;
            }
            this.transportMove = true;
            this.ignite(touchX, touchY, type, isTouch);
        }
    };
    LayerGamePve.prototype.ignite = function (touchX, touchY, type, isTouch) {
        if (isTouch === void 0) { isTouch = false; }
        switch (type) {
            case PlayDefine_1.BOMB_TYPE.BOMB_COLUMN:
                this.panelHeader.panelGuide.guide();
                this.bombColumn(touchX, touchY, isTouch);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_AROUND:
                this.panelHeader.panelGuide.guide();
                this.bombAround(touchX, touchY, isTouch);
                break;
            case PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR:
                this.panelHeader.panelGuide.guide();
                this.bombColor(touchX, touchY, isTouch);
                break;
        }
    };
    LayerGamePve.prototype.getScore = function (count, x, y) {
        if (count <= 1) {
            var score = 40;
        }
        else {
            var score = 20 * (count + 2) * (count - 1);
        }
        var nodScore = NodePool_1.default.getNodeScore();
        nodScore.parent = this.panelScore;
        nodScore.getComponent('ScoreMsg').setMessage(count, score, x, y);
        Modules_1.Play.DataPve.getScore(score);
    };
    // 生成道具消除
    LayerGamePve.prototype.spawnPropDestroy = function (arr, touchX, touchY) {
        return __awaiter(this, void 0, void 0, function () {
            var self, bomb, type, index, x, y, actionArr, index, x, y, position, action;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.PlayUI.Audio.spawnBomb();
                        Modules_1.Play.DataPve.stepSpawnPet += arr.length;
                        Modules_1.Play.DataPve.stepSpawnBug += arr.length;
                        this.canTouch = false;
                        this.panelHeader.addStep();
                        for (index in arr) {
                            x = Number(arr[index].split("#")[0]);
                            y = Number(arr[index].split("#")[1]);
                            this.tiles[x][y].node.stopAllActions();
                            if (x == touchX && y == touchY) {
                                Algorithm.tileBgEffect(this, 0, x, y, 0.8);
                                bomb = this.tiles[x][y].node;
                                type = this.tiles[x][y].type;
                                bomb.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION;
                            }
                        }
                        actionArr = [];
                        for (index in arr) {
                            x = Number(arr[index].split("#")[0]);
                            y = Number(arr[index].split("#")[1]);
                            this.affectAround(x, y);
                            Algorithm.tileBgEffect(this, 0, x, y, 0.8);
                            if (this.tiles[x][y] != bomb) {
                                this.tiles[x][y].node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
                            }
                            position = this.tiles[x][y].node.position.sub(bomb.position);
                            position.mulSelf(0.1);
                            action = cc.sequence(cc.spawn(cc.scaleTo(0.05, 1.1), cc.moveBy(0.05, position)), cc.delayTime(0.05), cc.moveTo(0.1, bomb.getPosition()).easing(cc.easeQuarticActionIn()), cc.callFunc(function (tile) {
                                tile.destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_FIRSTDES, true);
                            }.bind(self, this.tiles[x][y]), this));
                            Algorithm.addAction(actionArr, this.tiles[x][y].node, action);
                            // this.tiles[x][y] = null;
                        }
                        return [4 /*yield*/, Algorithm.runActions(actionArr)];
                    case 1:
                        _a.sent();
                        if (!(arr.length >= 9)) return [3 /*break*/, 3];
                        return [4 /*yield*/, self.spawnBomb(touchX, touchY, PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR, type)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 3:
                        if (!(arr.length >= 7)) return [3 /*break*/, 5];
                        return [4 /*yield*/, self.spawnBomb(touchX, touchY, PlayDefine_1.BOMB_TYPE.BOMB_AROUND)];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, self.spawnBomb(touchX, touchY, PlayDefine_1.BOMB_TYPE.BOMB_COLUMN)];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7:
                        this.moveAllTileDown();
                        if (Modules_1.Play.DataPve.levelData.grid.transport.length <= 0) {
                            this.canTouch = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.normalDestroy = function (arr, touchX, touchY, type) {
        return __awaiter(this, void 0, void 0, function () {
            var self, isRecoveryDone, index, x, y, blockComponent, delayTime;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.panelHeader.addStep();
                        this.PlayUI.Audio.strip();
                        isRecoveryDone = PanelHeaderPve_1.default.INSTANCE.isObjectiveDone(PlayDefine_1.TILE_TYPE.BLOCK, type);
                        this.unschedule(this.blockScheduleCb);
                        StateMgr_1.default.INSTANCE.isCollectOver = false;
                        this.blockScheduleCb = function () {
                            StateMgr_1.default.INSTANCE.isCollectOver = true;
                            _this.gameOver();
                        };
                        this.scheduleOnce(this.blockScheduleCb, 0.6);
                        for (index in arr) {
                            x = Number(arr[index].split("#")[0]);
                            y = Number(arr[index].split("#")[1]);
                            this.affectAround(x, y);
                            // 播放粒子
                            if (isRecoveryDone) {
                                Algorithm.tileBgEffect(this, 0, x, y, 0.6);
                            }
                            else {
                                Algorithm.tileBgEffect(this, 0, x, y, 0.4);
                            }
                            blockComponent = this.tiles[x][y];
                            blockComponent.recovery(true);
                        }
                        delayTime = 0.3;
                        if (isRecoveryDone) {
                            delayTime = 0.3;
                        }
                        return [4 /*yield*/, Algorithm.delay(delayTime)];
                    case 1:
                        _a.sent();
                        this.moveAllTileDown();
                        Modules_1.Play.DataPve.stepSpawnPet += arr.length;
                        Modules_1.Play.DataPve.stepSpawnBug += arr.length;
                        return [2 /*return*/];
                }
            });
        });
    };
    // 不能消除
    LayerGamePve.prototype.cannotDestroy = function (touchX, touchY) {
        cc.log("不能消除");
        if (!this.tiles[touchX][touchY]) {
            return;
        }
        this.tiles[touchX][touchY].node.stopActionByTag(PlayDefine_1.Action_type.NoMatch);
        var action = cc.sequence(
        // cc.blink(1, 3),
        cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.15, 1.05, 1.05), cc.scaleTo(0.05, 1, 1), cc.delayTime(1.5));
        this.tiles[touchX][touchY].node.runAction(action);
        action.setTag(PlayDefine_1.Action_type.NoMatch);
    };
    // 点击方块
    LayerGamePve.prototype.destroyBlock = function (touchX, touchY, type) {
        return __awaiter(this, void 0, void 0, function () {
            var self, arr, scanArr;
            return __generator(this, function (_a) {
                self = this;
                this.stopRemindAction();
                arr = new Array();
                scanArr = new Array();
                Algorithm.scanAround(touchX, touchY, -1, -1, type, arr, scanArr, this.tiles);
                if (arr.length > 1) {
                    if (StateMgr_1.default.INSTANCE.haveTransport) {
                        StateMgr_1.default.INSTANCE.isTransportOver = false;
                    }
                    self.transportMove = true;
                    this.getScore(arr.length, touchX, touchY);
                    this.hadRemindTime();
                    this.remindTime = 0;
                    if (arr.length >= 5) {
                        this.spawnPropDestroy(arr, touchX, touchY);
                    }
                    else {
                        this.normalDestroy(arr, touchX, touchY, type);
                    }
                }
                else {
                    this.cannotDestroy(touchX, touchY);
                }
                return [2 /*return*/];
            });
        });
    };
    LayerGamePve.prototype.affectAround = function (x, y) {
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
    LayerGamePve.prototype.destroyprop = function (x, y) {
        if (Modules_1.Play.DataPve.grid[x][y] != 0) {
            if (this.tiles[x][y]) {
                var tileComponent = null;
                tileComponent = this.tiles[x][y];
                if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.TABLEWARE) {
                    if (tileComponent.type === PlayDefine_1.TABLEWARE_TYPE.TYPE_3) {
                    }
                    else {
                        if (tileComponent) {
                            tileComponent.affected();
                        }
                    }
                }
                else if (this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                    tileComponent = this.tiles[x][y];
                    if (tileComponent) {
                        tileComponent.affected();
                    }
                }
            }
        }
    };
    LayerGamePve.prototype.addBomb = function (nodBomb) {
        var hasAdd = false;
        for (var i = 0; i < this.actionList.length; ++i) {
            if (this.actionList[i] == nodBomb) {
                hasAdd = true;
            }
        }
        if (hasAdd) {
            return false;
        }
        else {
            this.actionList.push(nodBomb);
            return true;
        }
    };
    // 当前列的其他风车isdestroy属性改为true
    LayerGamePve.prototype.changeWindmillStatCol = function (x, y) {
        for (var i = 0; i < this.tiles[x].length; ++i) {
            if (i !== y && this.tiles[x] && this.tiles[x][i] && this.tiles[x][i].type === PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR
                && this.tiles[x][i].subType === this.tiles[x][y].subType) {
                this.tiles[x][i].isAction = true;
            }
        }
    };
    // 周围的其他风车isdestroy属性改为true
    LayerGamePve.prototype.changeWindmillStatAround = function (touchX, touchY, x, y) {
        for (var i = 1; i >= -1; --i) {
            for (var j = 1; j >= -1; --j) {
                var xx = touchX + i;
                var yy = touchY + j;
                if (xx === x || yy === y) {
                    continue;
                }
                if (this.tiles[xx] && this.tiles[xx][yy] && this.tiles[xx][yy].type === PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR
                    && this.tiles[xx][yy].subType === this.tiles[x][y].subType) {
                    this.tiles[xx][yy].isAction = true;
                }
            }
        }
    };
    LayerGamePve.prototype.bombUp = function (touchX, touchY, i) {
        var _this = this;
        var self = this;
        if (!self.tiles[touchX][i]) {
            return;
        }
        this.scheduleOnce(function () {
            var tileComponent = self.tiles[touchX][i];
            if (!tileComponent || tileComponent.isAction) {
                return;
            }
            if (tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(self, 0, touchX, i, 0.8);
            if (self.tiles[touchX][i].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(false);
                }
                else if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                    // 当前列的其他风车isdestroy改为true
                    _this.changeWindmillStatCol(touchX, i);
                    tileComponent.ignite();
                }
                else {
                    tileComponent.ignite();
                }
            }
            else if (self.tiles[touchX][i].tileType === PlayDefine_1.TILE_TYPE.PET) {
            }
            else if (self.tiles[touchX][i].tileType === PlayDefine_1.TILE_TYPE.TABLEWARE) {
                tileComponent = self.tiles[touchX][i];
                self.tiles[touchX][i] = null;
                tileComponent.destroyTile();
            }
            else if (self.tiles[touchX][i].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                self.getScore(1, touchX, i);
                tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_LASTDES);
            }
            else {
                self.getScore(1, touchX, i);
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(touchX, i, self.tiles);
        }, (i - touchY) * 0.02);
    };
    LayerGamePve.prototype.bombDown = function (touchX, touchY, j) {
        var _this = this;
        var self = this;
        if (!self.tiles[touchX][j]) {
            return;
        }
        this.scheduleOnce(function () {
            var tileComponent = self.tiles[touchX][j];
            if (!tileComponent || tileComponent.isAction) {
                return;
            }
            if (tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(self, 0, touchX, j, 0.8);
            if (self.tiles[touchX][j].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(false);
                }
                else if (tileComponent.type === PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                    // 当前列的其他风车isdestroy改为true
                    _this.changeWindmillStatCol(touchX, j);
                    tileComponent.ignite();
                }
                else {
                    tileComponent.ignite();
                }
            }
            else if (self.tiles[touchX][j].tileType === PlayDefine_1.TILE_TYPE.PET) {
            }
            else if (self.tiles[touchX][j].tileType === PlayDefine_1.TILE_TYPE.TABLEWARE) {
                tileComponent = self.tiles[touchX][j];
                self.tiles[touchX][j] = null;
                tileComponent.destroyTile();
            }
            else if (self.tiles[touchX][j].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                self.getScore(1, touchX, j);
                tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_LASTDES);
            }
            else {
                self.getScore(1, touchX, j);
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(touchX, j, self.tiles);
        }, (touchY - j) * 0.02);
    };
    // 点击炸弹列
    LayerGamePve.prototype.bombColumn = function (touchX, touchY, isTouch) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent, anim, i, j, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        if (bombComponent.tileType != PlayDefine_1.TILE_TYPE.BOMB && bombComponent.type != PlayDefine_1.BOMB_TYPE.BOMB_COLUMN) {
                            return [2 /*return*/];
                        }
                        if (!this.addBomb(nodBomb)) {
                            return [2 /*return*/];
                        }
                        ;
                        StateMgr_1.default.INSTANCE.isBombOver = false;
                        this.stopRemindAction();
                        this.remindTime = 0;
                        this.canTouch = false;
                        // 增加步数
                        if (isTouch) {
                            this.panelHeader.addStep();
                        }
                        // 播放音效
                        if (this.gameStat == PlayDefine_1.GAME_STAT.GAMEING) {
                            this.PlayUI.Audio.bombRow();
                        }
                        else {
                            if (!this.hadAudColPlay) {
                                this.hadAudColPlay = true;
                                this.PlayUI.Audio.bombRow();
                                self.scheduleOnce(function () {
                                    _this.hadAudColPlay = false;
                                }, 0.2);
                            }
                        }
                        bombComponent.isAction = true;
                        anim = nodBomb.getComponent(cc.Animation);
                        anim.stop();
                        anim.play('aniBombCol');
                        Algorithm.bothSiedAct(touchX, touchY, this.tiles);
                        for (i = touchY + 1, j = touchY - 1; i < self.tiles[0].length || j >= 0; ++i, --j) {
                            self.bombUp(touchX, touchY, i);
                            if (j >= 0) {
                                self.bombDown(touchX, touchY, j);
                            }
                        }
                        return [4 /*yield*/, Algorithm.delay(0.5)];
                    case 1:
                        _a.sent();
                        // 播放完成删除
                        for (i = 0; i < self.actionList.length; ++i) {
                            if (nodBomb == self.actionList[i]) {
                                self.actionList.splice(i, 1);
                                bombComponent.destroyTile();
                                break;
                            }
                        }
                        // 如果没有炸弹，下落
                        if (self.actionList.length == 0) {
                            StateMgr_1.default.INSTANCE.isBombOver = true;
                            self.canTouch = true;
                            if (self.gameStat !== PlayDefine_1.GAME_STAT.GAMEING) {
                                self.igniteBomb();
                                return [2 /*return*/];
                            }
                            self.panelHeader.panelGuide.guide();
                            self.moveAllTileDown();
                        }
                        else {
                            self.moveAllTileDown();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 点击炸弹周围
    LayerGamePve.prototype.bombAround = function (touchX, touchY, isTouch) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodBomb, bombComponent, fruitCnt, k;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        nodBomb = this.tiles[touchX][touchY].node;
                        bombComponent = this.tiles[touchX][touchY];
                        if (bombComponent.tileType != PlayDefine_1.TILE_TYPE.BOMB && bombComponent.type != PlayDefine_1.BOMB_TYPE.BOMB_AROUND) {
                            return [2 /*return*/];
                        }
                        if (!this.addBomb(nodBomb)) {
                            return [2 /*return*/];
                        }
                        ;
                        StateMgr_1.default.INSTANCE.isBombOver = false;
                        this.stopRemindAction();
                        this.remindTime = 0;
                        this.canTouch = false;
                        // 增加步数
                        if (isTouch) {
                            this.panelHeader.addStep();
                        }
                        // 播放音效
                        if (this.gameStat == PlayDefine_1.GAME_STAT.GAMEING) {
                            this.PlayUI.Audio.bombAround();
                        }
                        else {
                            if (!this.hadAudAreaPlay) {
                                this.hadAudAreaPlay = true;
                                this.PlayUI.Audio.bombAround();
                                self.scheduleOnce(function () {
                                    _this.hadAudAreaPlay = false;
                                }, 0.2);
                            }
                        }
                        self.scheduleOnce(function () {
                            self.moveAllTileDown();
                        }, 0.4);
                        return [4 /*yield*/, this.bombAroundAnimation(touchX, touchY, bombComponent)];
                    case 1:
                        fruitCnt = _a.sent();
                        // self.getScore(fruitCnt, touchX, touchY);
                        // 播放完成删除
                        for (k = 0; k < self.actionList.length; ++k) {
                            if (nodBomb == self.actionList[k]) {
                                self.actionList.splice(k, 1);
                            }
                        }
                        // 如果没有炸弹，下落
                        if (self.actionList.length == 0) {
                            StateMgr_1.default.INSTANCE.isBombOver = true;
                            self.canTouch = true;
                            if (self.gameStat !== PlayDefine_1.GAME_STAT.GAMEING) {
                                self.igniteBomb();
                                return [2 /*return*/];
                            }
                            self.moveAllTileDown();
                            self.panelHeader.panelGuide.guide();
                        }
                        else {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.bombAroundAnimation = function (touchX, touchY, bombComponent) {
        return __awaiter(this, void 0, void 0, function () {
            var self, fruitCnt;
            var _this = this;
            return __generator(this, function (_a) {
                self = this;
                fruitCnt = 0;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        for (var i = 2; i >= -2; --i) {
                            for (var j = 2; j >= -2; --j) {
                                if ((i == 0 && j == 0) || !self.tiles[touchX + i] || !self.tiles[touchX + i][touchY + j]) {
                                    continue;
                                }
                                // 背景效果
                                if (i == 2 || j == 2 || i == -2 || j == -2) {
                                    Algorithm.tileBgEffect(self, 2, touchX + i, touchY + j, 0.7);
                                }
                                else {
                                    Algorithm.tileBgEffect(self, 0, touchX + i, touchY + j, 0.9);
                                }
                                var tileComponent = self.tiles[touchX + i][touchY + j];
                                if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                                    if (!tileComponent.isDestroying) {
                                        if (i == 2 || j == 2 || i == -2 || j == -2) {
                                        }
                                        else {
                                            self.getScore(1, touchX + i, touchY + j);
                                        }
                                        fruitCnt++;
                                        tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                            tileComponent.destroyTile(PlayDefine_1.BLOCKDES_TYPE.ACTION_LASTDES);
                                        }.bind(self, i, j, tileComponent));
                                    }
                                }
                                else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.TABLEWARE) {
                                    tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                        tileComponent.destroyTile();
                                    }.bind(self, i, j, tileComponent));
                                }
                                else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.WALL) {
                                    if (i == 2 || j == 2 || i == -2 || j == -2) {
                                    }
                                    else {
                                        tileComponent.destroyTile();
                                    }
                                }
                                else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                                    tileComponent.billowAct(touchX, touchY, function (x, y, tileComponent) {
                                        if (self.tiles[x][y] && self.tiles[x][y].type === PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                                            if (!tileComponent.isAction) {
                                                self.changeWindmillStatAround(touchX, touchY, x, y);
                                                tileComponent.ignite();
                                            }
                                        }
                                        else {
                                            tileComponent.ignite();
                                            // self.tiles[tileComponent.x][tileComponent.y] = null;
                                        }
                                    }.bind(self, touchX + i, touchY + j, tileComponent));
                                }
                                else if (tileComponent.tileType === PlayDefine_1.TILE_TYPE.PET) {
                                    tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                    }.bind(self, i, j, tileComponent));
                                }
                            }
                        }
                        var animComponent;
                        for (var i_1 = 0; i_1 < _this.actionList.length; ++i_1) {
                            if (bombComponent.node == _this.actionList[i_1]) {
                                animComponent = bombComponent.getComponent(cc.Animation);
                            }
                        }
                        animComponent.onFire = function () {
                            self.scheduleOnce(function () {
                                bombComponent.destroyTile();
                                resolve(fruitCnt);
                            }, 0.2);
                        };
                        animComponent.play('aniBombArea');
                    })];
            });
        });
    };
    // 点击炸弹单色
    LayerGamePve.prototype.bombColor = function (touchX, touchY, isTouch) {
        return __awaiter(this, void 0, void 0, function () {
            var self, bombComponent, nodBomb, fruitCnt, x, y, blockComponent, anim, k;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        bombComponent = this.tiles[touchX][touchY];
                        nodBomb = bombComponent.node;
                        if (bombComponent.tileType != PlayDefine_1.TILE_TYPE.BOMB && bombComponent.type != PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                            return [2 /*return*/];
                        }
                        if (!this.addBomb(nodBomb)) {
                            return [2 /*return*/];
                        }
                        ;
                        nodBomb.zIndex = PlayDefine_1.TILE_ZINDEX.LOW;
                        this.stopRemindAction();
                        this.canTouch = false;
                        bombComponent.isDestroying = true;
                        StateMgr_1.default.INSTANCE.isBombOver = false;
                        this.remindTime = 0;
                        if (isTouch) {
                            this.panelHeader.addStep();
                        }
                        this.PlayUI.Audio.bombMagnet();
                        fruitCnt = 0;
                        // 消除同颜色水果
                        for (x = 0; x < this.tiles.length; x++) {
                            for (y = 0; y < this.tiles[0].length; y++) {
                                if (!this.tiles[x][y] || (this.tiles[x][y] && (this.tiles[x][y].tileType !== PlayDefine_1.TILE_TYPE.BLOCK && this.tiles[x][y].tileType !== PlayDefine_1.TILE_TYPE.BOMB))) {
                                    continue;
                                }
                                blockComponent = this.tiles[x][y];
                                if (blockComponent.isDestroying || (this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK && blockComponent.type !== bombComponent.subType)
                                    || (this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BOMB
                                        && (!blockComponent.isAction || blockComponent.type !== bombComponent.type || blockComponent.subType !== bombComponent.subType))) {
                                    continue;
                                }
                                (function (x, y, blockComponent) {
                                    // 水果播放晃动动画
                                    blockComponent.isDestroying = true;
                                    blockComponent.node.zIndex = PlayDefine_1.TILE_ZINDEX.ACTION_LOW;
                                    blockComponent.canTouch = false;
                                    blockComponent.node.runAction(cc.sequence(cc.skewTo(0.08, 15, -15), cc.skewTo(0.08, -15, 15), cc.skewTo(0.08, 15, -15), cc.skewTo(0.08, -15, 15), cc.skewTo(0.08, 15, -15), cc.skewTo(0.08, -15, 15), cc.skewTo(0.08, 15, -15), cc.skewTo(0.08, -15, 15), cc.skewTo(0.06, 0, 0), cc.callFunc(function () {
                                        self.getScore(1, blockComponent.x, blockComponent.y);
                                        blockComponent.node.scale = 1.2;
                                        self.tiles[blockComponent.x][blockComponent.y] = null;
                                        // let direc = Math.floor(Math.random() * 4);
                                        // if (direc === 0) {
                                        //     blockComponent.node.runAction(cc.moveBy(0.1, 40, 40));
                                        // } else if (direc === 1) {
                                        //     blockComponent.node.runAction(cc.moveBy(0.1, 40, -40));
                                        // } else if (direc === 2) {
                                        //     blockComponent.node.runAction(cc.moveBy(0.1, -40, -40));
                                        // } else if (direc === 3) {
                                        //     blockComponent.node.runAction(cc.moveBy(0.1, -40, 40));
                                        // }
                                    })));
                                    var node = new cc.Node();
                                    node.parent = self.panelParticle;
                                    node.position = bombComponent.getArrPosition();
                                    var time = Math.random() * 0.8;
                                    // 水果旋转效果
                                    self.scheduleOnce(function () {
                                        if (!blockComponent.isDestroying) {
                                            return;
                                        }
                                        var blockPosition = node.convertToNodeSpaceAR(blockComponent.node.parent.convertToWorldSpaceAR(blockComponent.node.position));
                                        blockComponent.node.parent = node;
                                        blockComponent.node.position = blockPosition;
                                        var position = nodBomb.convertToNodeSpaceAR(nodBomb.parent.convertToWorldSpaceAR(bombComponent.getArrPosition()));
                                        blockComponent.node.runAction(cc.sequence(
                                        // cc.delayTime(0.5),
                                        cc.spawn(cc.scaleTo(1.5, 0.4, 0.4).easing(cc.easeQuinticActionIn()), cc.moveTo(1.5, position.x, position.y).easing(cc.easeQuinticActionIn())), cc.callFunc(function () {
                                            Modules_1.Play.DataPve.collectFruitCnt[blockComponent.type - 1]++;
                                            blockComponent.recoveryObjective(false);
                                            blockComponent.node.destroy();
                                        })));
                                        node.runAction(cc.sequence(cc.spawn(cc.scaleTo(1.5, 0, 0).easing(cc.easeQuinticActionIn()), cc.rotateBy(1.5, 360).easing(cc.easeQuinticActionIn())), cc.callFunc(function () {
                                            node.destroy();
                                        })));
                                    }, time);
                                })(x, y, blockComponent);
                            }
                        }
                        self.scheduleOnce(function () {
                            self.moveAllTileDown();
                        }, 1.4);
                        anim = nodBomb.getComponent(cc.Animation);
                        self.scheduleOnce(function () {
                            anim.play('aniOneColorBomb');
                            _this.playWindmillBg(nodBomb);
                        }, 0.2);
                        return [4 /*yield*/, Algorithm.delay(2.3)];
                    case 1:
                        _a.sent();
                        this.resetRemindTime();
                        anim.stop();
                        for (k = 0; k < self.actionList.length; ++k) {
                            if (nodBomb == self.actionList[k]) {
                                self.actionList.splice(k, 1);
                                self.tiles[touchX][touchY] = null;
                                bombComponent.isDestroying = false;
                                bombComponent.destroyTile();
                            }
                        }
                        if (self.actionList.length == 0) {
                            StateMgr_1.default.INSTANCE.isBombOver = true;
                            self.canTouch = true;
                            if (self.gameStat !== PlayDefine_1.GAME_STAT.GAMEING) {
                                self.igniteBomb();
                                return [2 /*return*/];
                            }
                            self.panelHeader.panelGuide.guide();
                            self.moveAllTileDown();
                        }
                        else {
                            self.moveAllTileDown();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 风车动画
    LayerGamePve.prototype.playWindmillBg = function (node) {
        var bg = node.getChildByName('content').getChildByName('bombzzj1').getChildByName('bg');
        bg.active = true;
        for (var i = 0; i < bg.children.length; ++i) {
            bg.children[i].getComponent(cc.Animation).play();
        }
        var bgStar1 = node.getChildByName('content').getChildByName('bombzzj1').getChildByName('bgStar1');
        bgStar1.active = true;
        for (var i = 0; i < bgStar1.children.length; ++i) {
            bgStar1.children[i].getComponent(cc.Animation).play();
        }
        var bgStar2 = node.getChildByName('content').getChildByName('bombzzj1').getChildByName('bgStar2');
        bgStar2.active = true;
        for (var i = 0; i < bgStar2.children.length; ++i) {
            bgStar2.children[i].getComponent(cc.Animation).play();
        }
    };
    // 是否为下落口
    LayerGamePve.prototype.isDownEntry = function (x, y) {
        for (var i = 0; i < Modules_1.Play.DataPve.levelData.fallDownPoint.length; ++i) {
            var pointX = Math.floor(Modules_1.Play.DataPve.levelData.fallDownPoint[i] / (this.tiles.length + 1));
            var pointY = Modules_1.Play.DataPve.levelData.fallDownPoint[i] % this.tiles[0].length;
            if (pointX === x && pointY === y) {
                return true;
            }
        }
        return false;
    };
    // 已有的方块下落
    LayerGamePve.prototype.tileDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, delayTime, hadDown, y, x, newX, newY, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        this.recursive++;
                        delayTime = 0.08;
                        hadDown = false;
                        for (y = 0; y < 9; ++y) {
                            for (x = 0; x < 8; ++x) {
                                if (Modules_1.Play.DataPve.grid[x][y] === PlayDefine_1.GRID_TYPE.EMPTY) {
                                    continue;
                                }
                                if (this.tiles[x][y]) {
                                    continue;
                                }
                                if (this.tiles[x][y + 1] && this.tiles[x][y + 1].tileType !== PlayDefine_1.TILE_TYPE.WALL) {
                                    // 上方为可下落
                                    if (this.tiles[x][y + 1].tileType === PlayDefine_1.TILE_TYPE.BOMB && this.tiles[x][y + 1].isDestroying) {
                                        continue;
                                    }
                                    this.tiles[x][y] = this.tiles[x][y + 1];
                                    this.tiles[x][y + 1] = null;
                                    this.tiles[x][y].moveTo(x, y, null);
                                    hadDown = true;
                                }
                                else if (this.tiles[x][y + 1] && this.tiles[x][y + 1].tileType === PlayDefine_1.TILE_TYPE.WALL) {
                                    // 上方为墙
                                    if (this.tiles[x - 1] && this.tiles[x - 1][y + 1] && this.tiles[x - 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.WALL) {
                                        if (this.tiles[x - 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.BOMB || !this.tiles[x - 1][y + 1].isDestroying) {
                                            this.tiles[x - 1][y + 1].moveTo(x, y, null);
                                            this.tiles[x][y] = this.tiles[x - 1][y + 1];
                                            this.tiles[x - 1][y + 1] = null;
                                            hadDown = true;
                                            continue;
                                        }
                                    }
                                    if (this.tiles[x + 1] && this.tiles[x + 1][y + 1] && this.tiles[x + 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.WALL) {
                                        if (this.tiles[x + 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.BOMB || !this.tiles[x + 1][y + 1].isDestroying) {
                                            this.tiles[x + 1][y + 1].moveTo(x, y, null);
                                            this.tiles[x][y] = this.tiles[x + 1][y + 1];
                                            this.tiles[x + 1][y + 1] = null;
                                            hadDown = true;
                                        }
                                    }
                                }
                                else if (Modules_1.Play.DataPve.grid[x][y] === PlayDefine_1.GRID_TYPE.UPGATE) {
                                    newX = 0;
                                    newY = 0;
                                    for (i = 0; i < Modules_1.Play.DataPve.levelData.grid.gate.length; ++i) {
                                        if (Modules_1.Play.DataPve.levelData.grid.gate[i].upgate == x * 9 + y) {
                                            newX = Math.floor(Modules_1.Play.DataPve.levelData.grid.gate[i].downgate / (this.tiles.length + 1));
                                            newY = Modules_1.Play.DataPve.levelData.grid.gate[i].downgate % this.tiles[0].length;
                                        }
                                    }
                                    if (this.tiles[newX][newY]) {
                                        // 上方不为空
                                        if (this.tiles[newX][newY].tileType !== PlayDefine_1.TILE_TYPE.WALL) {
                                            if (this.tiles[newX][newY].tileType !== PlayDefine_1.TILE_TYPE.BOMB || !this.tiles[newX][newY].isDestroying) {
                                                this.tiles[x][y] = this.tiles[newX][newY];
                                                this.tiles[newX][newY] = null;
                                                // this.tiles[x][y].setArrPosition(x, y + 1);
                                                this.tiles[x][y].gateTo(x, y, null);
                                                delayTime = 0.13;
                                                hadDown = true;
                                            }
                                        }
                                    }
                                }
                                else if (Modules_1.Play.DataPve.grid[x][y + 1] === 0 && !this.isDownEntry(x, y) && Modules_1.Play.DataPve.grid[x][y] !== PlayDefine_1.GRID_TYPE.UPGATE) {
                                    // 上方没有格子且不是下落点，且没有传送门
                                    if (this.tiles[x - 1] && this.tiles[x - 1][y + 1]) {
                                        if (this.tiles[x - 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.WALL) {
                                            if (this.tiles[x - 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.BOMB ||
                                                (this.tiles[x - 1][y + 1].tileType === PlayDefine_1.TILE_TYPE.BOMB && !this.tiles[x - 1][y + 1].isDestroying)) {
                                                this.tiles[x - 1][y + 1].moveTo(x, y, null);
                                                this.tiles[x][y] = this.tiles[x - 1][y + 1];
                                                this.tiles[x - 1][y + 1] = null;
                                                hadDown = true;
                                                continue;
                                            }
                                        }
                                    }
                                    if (this.tiles[x + 1] && this.tiles[x + 1][y + 1]) {
                                        if (this.tiles[x + 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.WALL) {
                                            if (this.tiles[x + 1][y + 1].tileType !== PlayDefine_1.TILE_TYPE.BOMB ||
                                                (this.tiles[x + 1][y + 1].tileType === PlayDefine_1.TILE_TYPE.BOMB && !this.tiles[x + 1][y + 1].isDestroying)) {
                                                this.tiles[x + 1][y + 1].moveTo(x, y, null);
                                                this.tiles[x][y] = this.tiles[x + 1][y + 1];
                                                this.tiles[x + 1][y + 1] = null;
                                                hadDown = true;
                                            }
                                        }
                                    }
                                }
                                else if (this.isDownEntry(x, y)) {
                                    // 当前为下落点
                                    this.spawnRandomTile(x, y);
                                    hadDown = true;
                                }
                                else {
                                    // 上方为空
                                }
                            }
                        }
                        if (!hadDown) return [3 /*break*/, 2];
                        return [4 /*yield*/, Algorithm.delay(delayTime)];
                    case 1:
                        _a.sent();
                        this.tileDown();
                        _a.label = 2;
                    case 2:
                        this.recursive--;
                        if (this.recursive === 0) {
                            // await Algorithm.delay(0.42);
                            this.panelHeader.panelGuide.guide();
                            StateMgr_1.default.INSTANCE.isGameOver = true;
                            StateMgr_1.default.INSTANCE.isAllDownOver = true;
                            if (StateMgr_1.default.INSTANCE.haveTransport) {
                                this.transport();
                            }
                            this.resetRemindTime();
                            this.gameOver();
                            this.scheduleOnce(function () {
                            }, 1);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // 所有方块向下移动
    LayerGamePve.prototype.moveAllTileDown = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!StateMgr_1.default.INSTANCE.canAllDown()) {
                    return [2 /*return*/];
                }
                // console.log('movedown')
                this.hadRemindTime();
                StateMgr_1.default.INSTANCE.isGameOver = false;
                StateMgr_1.default.INSTANCE.isAllDownOver = false;
                this.tileDown();
                return [2 /*return*/];
            });
        });
    };
    // 轨道移动
    LayerGamePve.prototype.transport = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, transport, _loop_1, this_1, action1, action2, action1, action2, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!this.transportMove) {
                            return [2 /*return*/];
                        }
                        if (!StateMgr_1.default.INSTANCE.canTransport()) {
                            return [2 /*return*/];
                        }
                        this.transportMove = false;
                        transport = Modules_1.Play.DataPve.levelData.grid.transport;
                        _loop_1 = function (i) {
                            var startX = Math.floor(transport[i].start / (Modules_1.Play.DataPve.grid.length + 1));
                            var startY = transport[i].start % Modules_1.Play.DataPve.grid[0].length;
                            var endX = Math.floor(transport[i].end / (Modules_1.Play.DataPve.grid.length + 1));
                            var endY = transport[i].end % Modules_1.Play.DataPve.grid[0].length;
                            if (transport[i].type === PlayDefine_1.TRANSPORT_TYPE.LEFT) {
                                // 把移动方向的第一个tile放到transport的mask节点之下
                                var endTile_1 = this_1.tiles[startX][startY];
                                var node_1 = cc.instantiate(endTile_1.node);
                                node_1.parent = this_1.transports[startX][startY].getChildByName('mask');
                                node_1.x = 0;
                                node_1.y = 0;
                                // 复制第一个tile放到最后一个transport的mask节点之下，同时设置坐标
                                var oldParent_1 = endTile_1.node.parent;
                                endTile_1.node.parent = this_1.transports[endX][endY].getChildByName('mask');
                                endTile_1.node.x = 80;
                                endTile_1.node.y = 0;
                                // 播放动作
                                action1 = cc.sequence(cc.moveTo(0.3, -80, 0), cc.callFunc(function () {
                                    node_1.destroy();
                                }));
                                node_1.runAction(action1);
                                action2 = cc.sequence(cc.moveTo(0.3, 0, 0), cc.callFunc(function () {
                                    endTile_1.node.parent = oldParent_1;
                                    endTile_1.setArrPosition(endX, endY);
                                    if (StateMgr_1.default.INSTANCE.haveTransport && endTile_1.tileType === PlayDefine_1.TILE_TYPE.PET) {
                                        endTile_1.getObstacle(true);
                                    }
                                }));
                                endTile_1.node.runAction(action2);
                                for (var j = startX + 1; j <= endX; ++j) {
                                    this_1.tiles[j - 1][startY] = this_1.tiles[j][startY];
                                    this_1.tiles[j][startY].transportTo(j - 1, startY, null, false);
                                }
                                this_1.tiles[endX][endY] = endTile_1;
                            }
                            if (transport[i].type === PlayDefine_1.TRANSPORT_TYPE.RIGHT) {
                                // 把移动方向的第一个tile放到transport的mask节点之下
                                var endTile_2 = this_1.tiles[endX][endY];
                                var node_2 = cc.instantiate(endTile_2.node);
                                node_2.parent = this_1.transports[endX][endY].getChildByName('mask');
                                node_2.x = 0;
                                node_2.y = 0;
                                // 复制第一个tile放到最后一个transport的mask节点之下，同时设置坐标
                                var oldParent_2 = endTile_2.node.parent;
                                endTile_2.node.parent = this_1.transports[startX][startY].getChildByName('mask');
                                endTile_2.node.x = -80;
                                endTile_2.node.y = 0;
                                // 播放动作
                                action1 = cc.sequence(cc.moveTo(0.3, 80, 0), cc.callFunc(function () {
                                    node_2.destroy();
                                }));
                                node_2.runAction(action1);
                                action2 = cc.sequence(cc.moveTo(0.3, 0, 0), cc.callFunc(function () {
                                    endTile_2.node.parent = oldParent_2;
                                    endTile_2.setArrPosition(startX, startY);
                                    if (StateMgr_1.default.INSTANCE.haveTransport && endTile_2.tileType === PlayDefine_1.TILE_TYPE.PET) {
                                        endTile_2.getObstacle(true);
                                    }
                                }));
                                endTile_2.node.runAction(action2);
                                for (var j = endX - 1; j >= startX; --j) {
                                    this_1.tiles[j + 1][startY] = this_1.tiles[j][startY];
                                    this_1.tiles[j][startY].transportTo(j + 1, startY, null, false);
                                }
                                this_1.tiles[startX][startY] = endTile_2;
                            }
                            // if (transport[i].type === TRANSPORT_TYPE.UP) {
                            //     this.tiles[startX][startY].node.parent = this.transports[startX][startY].getChildByName('mask');
                            // }
                            // if (transport[i].type === TRANSPORT_TYPE.DOWN) {
                            //     this.tiles[endX][endY].node.parent = this.transports[startX][startY].getChildByName('mask');
                            // }
                        };
                        this_1 = this;
                        for (i = 0; i < transport.length; ++i) {
                            _loop_1(i);
                        }
                        return [4 /*yield*/, Algorithm.delay(0.3)];
                    case 1:
                        _a.sent();
                        if (StateMgr_1.default.INSTANCE.haveTransport) {
                            StateMgr_1.default.INSTANCE.isTransportOver = true;
                        }
                        self.canTouch = true;
                        self.gameOver();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.checkResult = function () {
        var _this = this;
        if (Modules_1.Play.DataPve.checkWin()) {
            var playPveFinishC2S = new ProtoSectionPlay_1.PlayPveFinishC2S();
            playPveFinishC2S.pveId = Modules_1.Play.DataPve.curLevel;
            playPveFinishC2S.pveWin = 1;
            playPveFinishC2S.pveScore = Modules_1.Play.DataPve.score;
            playPveFinishC2S.remainStepsTime = Modules_1.Play.DataPve.saveStep > Modules_1.Play.DataPve.saveTime ? Modules_1.Play.DataPve.saveStep : Modules_1.Play.DataPve.saveTime;
            // console.log(playPveFinishC2S.remainStepsTime);
            window['Partner'].postMsg(4, { valuekey: Defines_1.ValueKey.levelScore, score: Modules_1.Play.DataPve.score });
            // 更新社交需要的数据
            SocialManager_1.default.INSTANCE.setUserStar(Modules.Home.DataPlayer.FortuneStar + Modules.Home.DataPlayer.PlayCntWin / Modules.Home.DataPlayer.PlayCntTotal);
            NetUtil_1.default.SendMsg(playPveFinishC2S);
            DYNotify_1.DYNotify.post(Message_1.Message.GAME_WIN);
        }
        else if (StateMgr_1.default.INSTANCE.isStopOperate && !Modules_1.Play.DataPve.checkWin()) {
            if (Modules_1.Play.DataPve.hadAddStep) {
                this.PlayUI.loseGame();
            }
            else {
                if (!this.hadShowAddStep) {
                    this.hadShowAddStep = true;
                    UIFunc_1.UIFunc.openUI('UIAddStep', function (node) {
                        node.getComponent('UIAddStep').init(_this);
                    });
                }
            }
        }
    };
    //生成新的方块
    LayerGamePve.prototype.spawnRandomTile = function (x, y) {
        var _this = this;
        Modules_1.Play.DataPve.spawnObjective(function (tileType, type, subType) {
            if (!tileType) {
                _this.spawnBlock(x, y);
            }
            else if (tileType === PlayDefine_1.TILE_TYPE.PET) {
                _this.spawnPet(x, y, type, true);
            }
            else if (tileType === PlayDefine_1.TILE_TYPE.TABLEWARE) {
                _this.spawnTableware(x, y, type, true);
            }
        });
    };
    // 生成一个指定方块
    LayerGamePve.prototype.spawnTile = function (x, y, tileType, type, subType) {
        if (tileType === PlayDefine_1.TILE_TYPE.PET) {
            this.spawnPet(x, y, type, false);
        }
        else if (tileType === PlayDefine_1.TILE_TYPE.TABLEWARE) {
            this.spawnTableware(x, y, type, false);
        }
        Modules_1.Play.DataPve.changePetOrBugData(tileType, type, subType);
    };
    // 生成炸弹
    LayerGamePve.prototype.spawnBomb = function (x, y, type, subType) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        if (_this.tiles[x][y] && _this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                            _this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
                        }
                        var nodBomb = Modules_1.Play.DataPve.popBomb();
                        if (nodBomb.parent != _this.panelTile) {
                            nodBomb.parent = _this.panelTile;
                        }
                        nodBomb.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
                        var bombComponent = _this.tiles[x][y] = nodBomb.getComponent('Bomb');
                        nodBomb.scale = 1;
                        var width = 80;
                        bombComponent.init();
                        bombComponent.setContentSize(width, width);
                        bombComponent.game = _this;
                        bombComponent.type = type;
                        bombComponent.setArrPosition(x, y);
                        if (type == PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                            bombComponent.subType = subType;
                            var animation = nodBomb.getComponent(cc.Animation);
                            animation.play('aniSpawnZZJ');
                            animation['onSpawnZZJFinished'] = function () {
                                bombComponent.genBombAnimation();
                            };
                            resolve();
                        }
                        else {
                            bombComponent.genBombAnimation();
                            resolve();
                        }
                    })];
            });
        });
    };
    // 生成Pet
    LayerGamePve.prototype.spawnPet = function (x, y, type, isDown) {
        if (isDown === void 0) { isDown = true; }
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
        }
        var nodPet = Modules_1.Play.DataPve.popObstacle();
        if (nodPet.parent != this.panelSpine) {
            nodPet.parent = this.panelSpine;
        }
        nodPet.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        var petComponent = this.tiles[x][y] = nodPet.getComponent("Obstacle");
        petComponent.type = type;
        var width = 80;
        petComponent.game = this;
        nodPet.scale = 1;
        petComponent.setContentSize(width, width);
        if (isDown) {
            petComponent.newTile(x, y);
        }
        else {
            petComponent.setArrPosition(x, y);
        }
    };
    // 生成block
    LayerGamePve.prototype.spawnBlock = function (x, y, type) {
        var nodBlock = Modules_1.Play.DataPve.popBlock();
        if (nodBlock.parent != this.panelTile) {
            nodBlock.parent = this.panelTile;
        }
        nodBlock.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        nodBlock.stopAllActions();
        var blockComponent = this.tiles[x][y] = nodBlock.getComponent("Block");
        blockComponent.init();
        blockComponent.game = this;
        nodBlock.scale = 1;
        var width = 80;
        blockComponent.setContentSize(width, width);
        var randomNum = type;
        if (!randomNum) {
            randomNum = Math.floor(Math.random() * Modules_1.Play.DataPve.levelData.blockcount) + 1;
            blockComponent.type = randomNum;
            blockComponent.newTile(x, y);
        }
        else {
            blockComponent.type = randomNum;
            blockComponent.setArrPosition(x, y);
        }
    };
    // 生成tableware
    LayerGamePve.prototype.spawnTableware = function (x, y, type, isDown) {
        if (isDown === void 0) { isDown = true; }
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
        }
        var nodTableware = cc.instantiate(Modules_1.Play.DataPve.pfbTableware);
        if (nodTableware.parent != this.panelTile) {
            nodTableware.parent = this.panelTile;
        }
        nodTableware.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        var tablewareComponent = this.tiles[x][y] = nodTableware.getComponent("Tableware");
        tablewareComponent.game = this;
        tablewareComponent.type = type;
        var width = 80;
        tablewareComponent.setContentSize(width, width);
        if (isDown) {
            tablewareComponent.newTile(x, y);
        }
        else {
            tablewareComponent.setArrPosition(x, y);
        }
    };
    // 生成Wall
    LayerGamePve.prototype.spawnWall = function (x, y, type) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(PlayDefine_1.BLOCKDES_TYPE.NOACTION_NODES);
        }
        var nodWall = cc.instantiate(Modules_1.Play.DataPve.pfbWall);
        if (nodWall.parent != this.panelTile) {
            nodWall.parent = this.panelTile;
        }
        nodWall.zIndex = PlayDefine_1.TILE_ZINDEX.NORMAL;
        var wallComponent = this.tiles[x][y] = nodWall.getComponent("Wall");
        wallComponent.game = this;
        wallComponent.type = type;
        var width = 80;
        wallComponent.setContentSize(width, width);
        wallComponent.setArrPosition(x, y);
    };
    // 播放粒子
    LayerGamePve.prototype.playParticle = function (x, y) {
        return;
        var node = cc.instantiate(this.pfbParticle);
        node.parent = this.panelParticle;
        node.getComponent('Particle').setArrPosition(x, y);
        node.getComponent('Particle').play();
    };
    LayerGamePve.prototype.stopRemindAction = function () {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                    this.tiles[x][y].node.stopActionByTag(PlayDefine_1.Action_type.Tip);
                }
            }
        }
    };
    /**
     * gameover的几种情况：
     * 进入引爆道具阶段
     * 成功
     *
     * 都需要下落完成
     *
     * 失败
     * 1.时间到达
     * 2.步数耗尽
     * 都需要下落完成
     */
    LayerGamePve.prototype.gameOver = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!StateMgr_1.default.INSTANCE.canGameOver()) {
                            return [2 /*return*/];
                        }
                        if (Modules_1.Play.DataPve.checkWin() && !this.panelBonus.active) {
                            this.canTouch = true;
                        }
                        if (!Modules_1.Play.DataPve.checkWin()) {
                            this.checkResult();
                            return [2 /*return*/];
                        }
                        StateMgr_1.default.INSTANCE.isStopOperate = true;
                        this.panelBonus.active = true;
                        // 时间关卡
                        if (Modules_1.Play.DataPve.isTimeLevel) {
                            this.checkResult();
                            return [2 /*return*/];
                        }
                        StateMgr_1.default.INSTANCE.isGameOver = false;
                        if (!(this.gameStat == PlayDefine_1.GAME_STAT.GAMEING)) return [3 /*break*/, 2];
                        Modules_1.Play.DataPve.saveStepAndTime();
                        Modules_1.Play.DataPve.gameBegan = false;
                        this.canTouch = false;
                        this.stopRemindAction();
                        this.hadRemindTime();
                        // this.bonusCallBack = cb;
                        this.PlayUI.Audio.stopBgPve();
                        this.PlayUI.Audio.bonusTime();
                        this.gameStat = PlayDefine_1.GAME_STAT.BONUSTIME;
                        return [4 /*yield*/, this.panelHeader.gameOver()];
                    case 1:
                        _a.sent();
                        StateMgr_1.default.INSTANCE.isBonusActionOver = true;
                        StateMgr_1.default.INSTANCE.isGameOver = true;
                        // let bombArr = 0;
                        this.hadAudAreaPlay = false;
                        this.hadAudColPlay = false;
                        this.igniteBomb();
                        return [3 /*break*/, 5];
                    case 2:
                        if (!(!this.hadBomb() && StateMgr_1.default.INSTANCE.canBonus() && this.gameStat == PlayDefine_1.GAME_STAT.BONUSTIME)) return [3 /*break*/, 4];
                        StateMgr_1.default.INSTANCE.isBonusOver = true;
                        // let hasBomb = await this.bonusTime();
                        return [4 /*yield*/, this.bonusTime()];
                    case 3:
                        // let hasBomb = await this.bonusTime();
                        _a.sent();
                        this.gameStat = PlayDefine_1.GAME_STAT.CHECKRESULT;
                        // StateMgr.INSTANCE.isGameOver = false;
                        this.igniteBomb();
                        return [3 /*break*/, 5];
                    case 4:
                        if (!this.hadBomb() && (this.gameStat == PlayDefine_1.GAME_STAT.CHECKRESULT && StateMgr_1.default.INSTANCE.isStopOperate)) {
                            this.PlayUI.Audio.stopBonusTime();
                            this.gameStat = PlayDefine_1.GAME_STAT.GAMEOVER;
                            this.checkResult();
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.hadBomb = function () {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                    return true;
                }
            }
        }
        return false;
    };
    // 按规律引爆炸弹
    // 从左上角开始引爆第一个，等待连锁触发完成，引爆第二个
    LayerGamePve.prototype.igniteBomb = function () {
        return __awaiter(this, void 0, void 0, function () {
            var count, x, y, bombComponent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        count = 0;
                        for (x = 0; x < this.tiles.length; ++x) {
                            for (y = 0; y < this.tiles[0].length; ++y) {
                                if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BOMB) {
                                    bombComponent = this.tiles[x][y];
                                    bombComponent.ignite();
                                    count++;
                                    return [2 /*return*/];
                                }
                            }
                        }
                        return [4 /*yield*/, Algorithm.delay(0.2)];
                    case 1:
                        _a.sent();
                        this.moveAllTileDown();
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.showBonusTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!StateMgr_1.default.INSTANCE.canBonus()) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.bonusTime()];
                    case 1:
                        _a.sent();
                        StateMgr_1.default.INSTANCE.isBonusOver = true;
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.resetRemindTime = function () {
        this.hadRemind = false;
        this.oneSec = 0;
        this.remindTime = 0;
    };
    LayerGamePve.prototype.hadRemindTime = function () {
        this.hadRemind = true;
    };
    // 背景波浪动画
    LayerGamePve.prototype.effect = function (x, y) {
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
        var action = cc.sequence(cc.fadeTo(0.1, 150), cc.callFunc(function () {
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
        }), cc.fadeTo(0.2, 255), cc.fadeOut(0.4), cc.callFunc(function () {
            _this.tileBgs[x][y].hadAction = false;
        }));
        this.tileBgs[x][y].getChildByName('sprLight').runAction(action);
    };
    LayerGamePve.prototype.bonusTime = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, arrBlock, x, y, arr, count, i, x_1, y_1, nodBonusBall, startPs, position;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (this.panelHeader.nodLastTime.active) {
                            return [2 /*return*/];
                        }
                        this.effect(3, 4);
                        this.effect(4, 4);
                        return [4 /*yield*/, Algorithm.delay(1)];
                    case 1:
                        _a.sent();
                        arrBlock = [];
                        for (x = 0; x < this.tiles.length; ++x) {
                            for (y = 0; y < this.tiles[0].length; ++y) {
                                if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                                    arrBlock.push(x + '#' + y);
                                }
                            }
                        }
                        arr = new Array();
                        count = Modules_1.Play.DataPve.remainStep;
                        if (Modules_1.Play.DataPve.levelData.step == 0) {
                            count = 0;
                        }
                        Algorithm.randomMore(count, arrBlock.length, arr, function (index) {
                            return false;
                        });
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < arr.length)) return [3 /*break*/, 5];
                        x_1 = Number(arrBlock[arr[i]].split("#")[0]);
                        y_1 = Number(arrBlock[arr[i]].split("#")[1]);
                        nodBonusBall = cc.instantiate(Modules_1.Play.DataPve.pfbBonusBall);
                        nodBonusBall.parent = this.panelBonus;
                        startPs = this.node.convertToNodeSpaceAR(this.panelHeader.labCountDown.node.parent.convertToWorldSpaceAR(this.panelHeader.labCountDown.node.position));
                        nodBonusBall.setPosition(startPs);
                        position = this.node.convertToNodeSpaceAR(this.panelTile.convertToWorldSpaceAR(this.tiles[x_1][y_1].node.getPosition()));
                        nodBonusBall.runAction(cc.sequence(cc.moveTo(0.5, position), cc.callFunc(function (x, y, nodBonusBall) {
                            var type = Math.random() > 0.5 ? PlayDefine_1.BOMB_TYPE.BOMB_AROUND : PlayDefine_1.BOMB_TYPE.BOMB_COLUMN;
                            this.spawnBomb(x, y, type);
                            this.panelHeader.addStep();
                            nodBonusBall.destroy();
                        }.bind(this, x_1, y_1, nodBonusBall))));
                        return [4 /*yield*/, Algorithm.delay(0.3)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        ++i;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, Algorithm.delay(0.4)];
                    case 6:
                        _a.sent();
                        this.hadAudAreaPlay = false;
                        return [2 /*return*/];
                }
            });
        });
    };
    LayerGamePve.prototype.update = function (dt) {
        var _this = this;
        if (!Modules_1.Play.DataPve.gameBegan) {
            return;
        }
        this.oneSec += dt;
        this.remindTime += dt;
        if (this.oneSec >= 2 && !this.hadRemind && !StateMgr_1.default.INSTANCE.isStopOperate) {
            this.oneSec = 0;
            // 提示动画
            var allArr = Algorithm.checkoutMatch(this.tiles);
            if (this.remindTime >= 5 && allArr.length > 0) {
                this.hadRemindTime();
                var index = Math.floor(Math.random() * allArr.length);
                var arr = allArr[index];
                this.stopRemindAction();
                this.lastArr = arr;
                for (var i = 0; i < arr.length; ++i) {
                    var x = Number(arr[i].split("#")[0]);
                    var y = Number(arr[i].split("#")[1]);
                    if (this.tiles[x][y] && this.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.BLOCK) {
                        this.tiles[x][y].node.stopActionByTag(PlayDefine_1.Action_type.Tip);
                        var action = cc.repeatForever(cc.sequence(
                        // cc.blink(1, 3),
                        cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.1, 1.1, 1.1), cc.scaleTo(0.2, 0.9, 0.9), cc.scaleTo(0.15, 1.05, 1.05), cc.scaleTo(0.05, 1, 1), cc.delayTime(1.5)));
                        this.tiles[x][y].node.runAction(action);
                        action.setTag(PlayDefine_1.Action_type.Tip);
                    }
                }
            }
            else if (allArr.length <= 0) {
                GamePersist_1.default.INSTANCE.toast('没有可消除的组合');
                this.hadRemindTime();
                this.canTouch = false;
                this.scheduleOnce(function () {
                    Algorithm.shuffleTiles(_this.tiles, function () {
                        _this.scheduleOnce(function () {
                            this.resetRemindTime();
                            this.canTouch = true;
                            this.moveAllTileDown(false);
                        }, 1);
                    });
                }, 2);
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbScore", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbBlock", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbBomb", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbObstacle", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbWall", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbTableware", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbTransport", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbGate", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbBonusBall", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbTileBg", void 0);
    __decorate([
        property(cc.Prefab)
    ], LayerGamePve.prototype, "pfbParticle", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelTile", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelScore", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelParticle", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelTrickDown", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelTrickUp", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelGuide", void 0);
    __decorate([
        property(PanelHeaderPve_1.default)
    ], LayerGamePve.prototype, "panelHeader", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelSpine", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelBonus", void 0);
    __decorate([
        property(cc.Node)
    ], LayerGamePve.prototype, "panelGrid", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LayerGamePve.prototype, "spfTileBg", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], LayerGamePve.prototype, "spfTileBgLight", void 0);
    LayerGamePve = __decorate([
        ccclass
    ], LayerGamePve);
    return LayerGamePve;
}(cc.Component));
exports.default = LayerGamePve;

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
        //# sourceMappingURL=LayerGamePve.js.map
        