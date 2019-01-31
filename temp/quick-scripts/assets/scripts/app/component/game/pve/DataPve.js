(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pve/DataPve.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '31413S68+BDIpYWSEyxxci3', 'DataPve', __filename);
// scripts/app/component/game/pve/DataPve.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../PlayDefine");
var LevelType;
(function (LevelType) {
    LevelType[LevelType["TIME"] = 0] = "TIME";
    LevelType[LevelType["STEP"] = 1] = "STEP";
})(LevelType || (LevelType = {}));
var DataPve = /** @class */ (function () {
    function DataPve() {
        this.game = null;
        this.panelHead = null;
        this._score = 0; // 游戏分数
        this._remainStep = 0; // 游戏剩余步数
        this._remainTime = 0; // 游戏剩余时间
        this._petCollectNum = 0; // 宠物回收中的数量
        this._saveStep = 0; // 保存的游戏剩余步数
        this._saveTime = 0; // 保存的游戏剩余时间
        this._levelDatas = null; // 关卡数据
        this._levelData = null; // 当前关卡数据
        this._objectives = []; // 当前目标数据
        this._level = 0; // 当前关卡
        this._fallDownPoint = []; // 下落点
        this.grid = [];
        this.hadAddStep = false;
        this.isTimeLevel = false;
        this.pfbScore = null;
        this.pfbMask = null;
        this.pfbBlock = null;
        this.pfbBomb = null;
        this.pfbObstacle = null;
        this.pfbWall = null;
        this.pfbTableware = null;
        this.pfbTransport = null;
        this.pfbGate = null;
        this.pfbBonusBall = null;
        this.pfbTileBg = null;
        this.curLevel = 1; // 当前关卡
        this.levelType = LevelType.STEP; // 当前关卡类型
        this.curScore = 0; // 当前分数
        this.spawnPetStep = 0; // 生成宠物的步数
        this.spawnBugStep = 0;
        ////////////////////原gamedata的内容////////////////////////////////////
        this.stepSpawnPet = 0;
        this.stepSpawnBug = 0;
        this.objectiveCnt = []; // 收集总数
        this.objectiveSpawnCnt = []; // 生成总数
        this.gameBegan = null;
        this.step = 0;
        this.spawnLeavesCnt = []; // 生成树叶数量
        this.spawnBugCnt = 0; // 生成bug数量
        this.collectFruitCnt = []; // 收集水果数量
        this.useBombCnt = []; // 触发炸弹数量
        this.collectLeavesCnt = []; // 收集树叶数量
        this.delWallCnt = []; // 消除墙数量
        this.delTablawareCnt = []; // 消除餐具数量
        this._freeBlocks = [];
        this._freeBombs = [];
        this._freeObstacles = [];
    }
    // 是否有宠物可以下落
    DataPve.prototype.canPetDown = function () {
        for (var x = 0; x < this.game.tiles.length; x++) {
            for (var y = 0; y < this.game.tiles[0].length; y++) {
                if (this.game.tiles[x][y] && this.game.tiles[x][y].tileType === PlayDefine_1.TILE_TYPE.PET && this.game.tiles[x][y].canRecovery()) {
                    return true;
                }
            }
        }
        return false;
    };
    // 是否解锁question
    DataPve.prototype.unLockQuestion = function (index, nodeIndex) {
        var canUnLock = true;
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.NORMAL && this._objectives[index][i].count > 0) {
                canUnLock = false;
            }
        }
        if (canUnLock) {
            for (var i = 0; i < this._objectives[index].length; ++i) {
                if (this._objectives[index][i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.QUESTION) {
                    this._objectives[index][i].objectiveType = PlayDefine_1.OBJECTIVE_TYPE.NORMAL;
                    var data = {
                        index: nodeIndex + i,
                        count: this._objectives[index][i].count
                    };
                    this.panelHead.updateObjective(data);
                    return;
                }
            }
        }
    };
    // 获得目标
    DataPve.prototype.getObjective = function (tileType, type, subType, isTouch) {
        // 获取当前目标组
        var nodeIndex = 0;
        var index = 0;
        for (var i = 0; i < this._objectives.length; ++i) {
            var isDone = true;
            for (var j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].count > 0) {
                    index = i;
                    isDone = false;
                    nodeIndex -= j;
                    break;
                }
                else {
                    nodeIndex++;
                }
            }
            if (!isDone) {
                break;
            }
        }
        // 遍历目标组，更新目标
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (tileType === this._objectives[index][i].tileType &&
                type === this._objectives[index][i].type) {
                if (this._objectives[index][i].subType && subType !== this._objectives[index][i].subType) {
                    continue;
                }
                if (this._objectives[index][i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.NORMAL && this._objectives[index][i].count > 0) {
                    var count = this._objectives[index][i].count - 1;
                    if (count <= 0) {
                        this._objectives[index][i].count = 0;
                        this.unLockQuestion(index, nodeIndex);
                        this.checkWin();
                    }
                    else {
                        this._objectives[index][i].count = count;
                    }
                    var data = {
                        index: nodeIndex + i,
                        count: count
                    };
                    this.panelHead.updateObjective(data);
                    return;
                }
                else if (isTouch && this._objectives[index][i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.BAN) {
                    // 重置目标
                    this.resetObjectives();
                    this.panelHead.initObjective();
                    return;
                }
            }
        }
    };
    // 是否需要收集
    DataPve.prototype.needRecovery = function (tileType, type, subType) {
        var index = this.getCurrGroup();
        // 遍历目标组，更新目标
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (tileType === this._objectives[index][i].tileType &&
                type === this._objectives[index][i].type) {
                if ((subType && subType !== this._objectives[index][i].subType)
                    || (this._objectives[index][i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.NORMAL && this._objectives[index][i].count <= 0)
                    || this._objectives[index][i].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.QUESTION) {
                    continue;
                }
                return this._objectives[index][i].position;
            }
        }
        return false;
    };
    // 增加步数
    DataPve.prototype.addSpawnStep = function (number) {
        this.stepSpawnPet += number;
        this.stepSpawnBug += number;
    };
    // 生成目标(宠物，bug)
    DataPve.prototype.spawnObjective = function (cb) {
        if (this.stepSpawnPet >= PlayDefine_1.STEP_SPAWN_PET && this.spawnPet(cb)) {
            return;
        }
        if (this.stepSpawnBug >= PlayDefine_1.STEP_SPAWN_BUG && this.spawnBug(cb)) {
            return;
        }
        // 不能生成宠物和虫子
        cb && cb(null, null, null);
    };
    // 获取当前组
    DataPve.prototype.getCurrGroup = function () {
        var index = 0;
        for (var i = 0; i < this._objectives.length; ++i) {
            var isDone = true;
            for (var j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].count > 0) {
                    index = i;
                    isDone = false;
                    break;
                }
            }
            if (!isDone) {
                break;
            }
        }
        return index;
    };
    DataPve.prototype.spawnPet = function (cb) {
        // 场上数量上限
        if (this.getBoardPetCnt() >= PlayDefine_1.COUNT_BOARD_PET) {
            return;
        }
        // 生成
        var index = this.getCurrGroup();
        var allCnt = 0; // 所有需要生成的宠物数量
        var arrCnt = [];
        var arrIndex = [];
        var indexCnt = 0;
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === PlayDefine_1.TILE_TYPE.PET && this._objectives[index][i].spawnCnt < this._levelData.objective[index][i].count) {
                allCnt += this._objectives[index][i].count;
                arrCnt.push(allCnt);
                arrIndex.push(i);
            }
        }
        if (allCnt === 0) {
            return;
        }
        var random = Math.random() * allCnt;
        for (var i = 0; i < arrCnt.length; ++i) {
            if (random <= arrCnt[i]) {
                indexCnt = i;
                break;
            }
        }
        var objective = this._objectives[index][arrIndex[indexCnt]];
        this.stepSpawnPet = 0;
        this.changePetOrBugData(objective.tileType, objective.type, objective.subType);
        cb && cb(objective.tileType, objective.type, objective.subType);
        return true;
    };
    DataPve.prototype.spawnBug = function (cb) {
        // 场上数量上限
        if (this.getBoardBugCnt() >= PlayDefine_1.COUNT_BOARD_BUG) {
            return;
        }
        // 生成
        var index = this.getCurrGroup();
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === PlayDefine_1.TILE_TYPE.TABLEWARE && this._objectives[index][i].type === PlayDefine_1.TABLEWARE_TYPE.TYPE_3
                && this._objectives[index][i].spawnCnt < this._levelData.objective[index][i].count) {
                var objective = this._objectives[index][i];
                if (objective.count === 0) {
                    return;
                }
                ;
                this.stepSpawnBug = 0;
                this.changePetOrBugData(objective.tileType, objective.type, objective.subType);
                cb && cb(objective.tileType, objective.type, objective.subType);
                return true;
            }
        }
    };
    // 计算场上宠物数量
    DataPve.prototype.getBoardPetCnt = function () {
        // 当前目标组
        var index = this.getCurrGroup();
        var count = 0;
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === PlayDefine_1.TILE_TYPE.PET) {
                // 生成数量-收集数量
                count += this._objectives[index][i].spawnCnt - (this._levelData.objective[index][i].count - this._objectives[index][i].count);
            }
        }
        return count;
    };
    // 计算场上bug数量
    DataPve.prototype.getBoardBugCnt = function () {
        // 当前目标组
        var index = this.getCurrGroup();
        var count = 0;
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === PlayDefine_1.TILE_TYPE.TABLEWARE && this._objectives[index][i].type === PlayDefine_1.TABLEWARE_TYPE.TYPE_3) {
                count += this._objectives[index][i].spawnCnt;
            }
        }
        return count;
    };
    // 修改宠物或者虫子数据
    DataPve.prototype.changePetOrBugData = function (tileType, type, subType) {
        // 当前目标组
        var index = this.getCurrGroup();
        for (var i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === tileType && this._objectives[index][i].type === type) {
                this._objectives[index][i].spawnCnt++;
            }
        }
    };
    // 计算步数
    // 获取未完成目标
    DataPve.prototype.getObjectivesUnFinished = function () {
        var arrUnFinished = [];
        var index = 0;
        for (var i = 0; i < this._objectives.length; ++i) {
            for (var j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].objectiveType === PlayDefine_1.OBJECTIVE_TYPE.BAN) {
                    index++;
                    continue;
                }
                if (this._objectives[i][j].count > 0) {
                    this._objectives[i][j].index = index;
                    arrUnFinished.push(this._objectives[i][j]);
                }
                index++;
            }
        }
        return arrUnFinished;
    };
    // 检查是否达成目标
    DataPve.prototype.checkWin = function () {
        for (var i = 0; i < this._objectives.length; ++i) {
            for (var j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].count > 0) {
                    return false;
                }
            }
        }
        // console.log('win');
        return true;
    };
    DataPve.prototype.clear = function () {
        this.stepSpawnPet = 0;
        this.stepSpawnBug = 0;
        this.spawnBugCnt = 0;
        this.score = 0;
        this.step = 0;
        this.hadAddStep = false;
        for (var i = 0; i < 4; ++i) {
            this.objectiveCnt[i] = 0;
            this.objectiveSpawnCnt[i] = 0;
        }
        for (var i = 0; i < 4; ++i) {
            this.spawnLeavesCnt[i] = 0;
        }
        for (var i = 0; i < 4; ++i) {
            this.useBombCnt[i] = 0;
        }
        for (var i = 0; i < 4; ++i) {
            this.collectLeavesCnt[i] = 0;
        }
        for (var i = 0; i < 5; ++i) {
            this.collectFruitCnt[i] = 0;
        }
        for (var i = 0; i < 5; ++i) {
            this.delWallCnt[i] = 0;
        }
        for (var i = 0; i < 5; ++i) {
            this.delTablawareCnt[i] = 0;
        }
    };
    ////////////////////////////////////////////////////////
    DataPve.prototype.clearFreeNodes = function () {
        delete this.freeBlocks;
        delete this.freeBombs;
        delete this.freeObstacles;
        this.freeBlocks = [];
        this.freeBombs = [];
        this.freeObstacles = [];
        this.pushBomb(this.popBomb());
    };
    Object.defineProperty(DataPve.prototype, "levelDatas", {
        get: function () {
            return this._levelDatas;
        },
        set: function (value) {
            this._levelDatas = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "levelData", {
        get: function () {
            return this._levelData;
        },
        set: function (value) {
            this._levelData = value;
            this.saveObjectives();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "objectives", {
        get: function () {
            return this._objectives;
        },
        enumerable: true,
        configurable: true
    });
    DataPve.prototype.saveObjectives = function () {
        this._objectives.length = 0;
        var objectives = this._levelData.objective;
        for (var i = 0; i < objectives.length; ++i) {
            var objectiveGroup = [];
            for (var j = 0; j < objectives[i].length; ++j) {
                var objective = {
                    objectiveType: objectives[i][j].objectiveType,
                    tileType: objectives[i][j].tileType,
                    type: objectives[i][j].type,
                    count: objectives[i][j].count,
                    spawnCnt: 0,
                    position: null
                };
                objectiveGroup[j] = objective;
            }
            this._objectives[i] = objectiveGroup;
        }
    };
    DataPve.prototype.resetObjectives = function () {
        var objectives = this._levelData.objective;
        for (var i = 0; i < this._objectives.length; ++i) {
            for (var j = 0; j < this._objectives[i].length; ++j) {
                this._objectives[i][j].objectiveType = objectives[i][j].objectiveType;
                this._objectives[i][j].count = objectives[i][j].count;
            }
        }
    };
    Object.defineProperty(DataPve.prototype, "fallDownPoint", {
        get: function () {
            return this._fallDownPoint;
        },
        set: function (value) {
            this._fallDownPoint = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "freeBlocks", {
        get: function () {
            return this._freeBlocks;
        },
        set: function (value) {
            this._freeBlocks = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "freeBombs", {
        get: function () {
            return this._freeBombs;
        },
        set: function (value) {
            this._freeBombs = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "freeObstacles", {
        get: function () {
            return this._freeObstacles;
        },
        set: function (value) {
            this._freeObstacles = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "remainStep", {
        get: function () {
            return this._remainStep;
        },
        set: function (value) {
            this._remainStep = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "remainTime", {
        get: function () {
            return this._remainTime;
        },
        set: function (value) {
            this._remainTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "saveStep", {
        get: function () {
            return this._saveStep;
        },
        set: function (value) {
            this._saveStep = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "saveTime", {
        get: function () {
            return this._saveTime;
        },
        set: function (value) {
            this._saveTime = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPve.prototype, "petCollectNum", {
        get: function () {
            return this._petCollectNum;
        },
        set: function (value) {
            this._petCollectNum = value;
        },
        enumerable: true,
        configurable: true
    });
    // 保存剩余步数和时间
    DataPve.prototype.saveStepAndTime = function () {
        this._saveStep = this._remainStep;
        this._saveTime = this._remainTime;
    };
    DataPve.prototype.popBlock = function () {
        var nodBlock = null;
        if (this._freeBlocks.length > 0) {
            nodBlock = this._freeBlocks.pop();
        }
        else {
            nodBlock = cc.instantiate(this.pfbBlock);
        }
        nodBlock.active = true;
        return nodBlock;
    };
    DataPve.prototype.pushBlock = function (node) {
        node.active = false;
        node.x = 10000;
        this._freeBlocks.push(node);
    };
    DataPve.prototype.popBomb = function () {
        var nodBomb = null;
        if (this._freeBombs.length > 0) {
            nodBomb = this._freeBombs.pop();
        }
        else {
            nodBomb = cc.instantiate(this.pfbBomb);
        }
        nodBomb.active = true;
        return nodBomb;
    };
    DataPve.prototype.pushBomb = function (node) {
        node.active = false;
        node.x = 10000;
        this._freeBombs.push(node);
    };
    DataPve.prototype.popObstacle = function () {
        var nodObstacle = null;
        if (this._freeObstacles.length > 0) {
            nodObstacle = this._freeObstacles.pop();
        }
        else {
            nodObstacle = cc.instantiate(this.pfbObstacle);
        }
        // nodObstacle.active = true;
        return nodObstacle;
    };
    DataPve.prototype.pushObstacle = function (node) {
        // node.active = false;
        node.x = 10000;
        this._freeObstacles.push(node);
    };
    DataPve.prototype.getScore = function (score) {
        this._score += score;
        this.updateScore();
    };
    Object.defineProperty(DataPve.prototype, "score", {
        get: function () {
            return this._score;
        },
        set: function (value) {
            this._score = value;
            this.updateScore();
        },
        enumerable: true,
        configurable: true
    });
    DataPve.prototype.clearScore = function () {
        this._score = 0;
    };
    DataPve.prototype.updateScore = function () {
        this.panelHead.updateScore(this._score);
    };
    return DataPve;
}());
exports.default = DataPve;

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
        //# sourceMappingURL=DataPve.js.map
        