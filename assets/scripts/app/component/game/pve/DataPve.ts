import { OBJECTIVE_TYPE, TILE_TYPE, WALL_TYPE, TABLEWARE_TYPE, STEP_SPAWN_PET, STEP_SPAWN_BUG, OBSTACLE_TYPE, PET_TYPE, COUNT_BOARD_PET, COUNT_BOARD_BUG } from "../PlayDefine";

enum LevelType {
    TIME,
    STEP
}
export default class DataPve {
    public game = null;
    public panelHead = null;
    private _score: number = 0; // 游戏分数
    private _remainStep: number = 0; // 游戏剩余步数
    private _remainTime: number = 0; // 游戏剩余时间

    private _petCollectNum: number = 0;// 宠物回收中的数量

    private _saveStep: number = 0; // 保存的游戏剩余步数
    private _saveTime: number = 0; // 保存的游戏剩余时间

    private _levelDatas = null; // 关卡数据
    private _levelData = null; // 当前关卡数据
    private _objectives = []; // 当前目标数据
    private _level: number = 0; // 当前关卡

    private _fallDownPoint = [];// 下落点

    public grid = [];

    public hadAddStep = false;

    public isTimeLevel = false;

    public pfbScore: cc.Prefab = null;
    public pfbMask: cc.Prefab = null;
    public pfbBlock: cc.Prefab = null;
    public pfbBomb: cc.Prefab = null;
    public pfbObstacle: cc.Prefab = null;
    public pfbWall: cc.Prefab = null;
    public pfbTableware: cc.Prefab = null;
    public pfbTransport: cc.Prefab = null;
    public pfbGate: cc.Prefab = null;
    public pfbBonusBall: cc.Prefab = null;
    public pfbTileBg: cc.Prefab = null;

    curLevel = 1;// 当前关卡
    levelType = LevelType.STEP;// 当前关卡类型

    curScore = 0;// 当前分数

    spawnPetStep = 0; // 生成宠物的步数
    spawnBugStep = 0;

    // 是否有宠物可以下落
    canPetDown() {
        for (var x = 0; x < this.game.tiles.length; x++) {
            for (var y = 0; y < this.game.tiles[0].length; y++) {
                if (this.game.tiles[x][y] && this.game.tiles[x][y].tileType === TILE_TYPE.PET && this.game.tiles[x][y].canRecovery()) {
                    return true;
                }
            }
        }
        return false;
    }

    // 是否解锁question
    unLockQuestion(index, nodeIndex) {
        let canUnLock = true;
        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].objectiveType === OBJECTIVE_TYPE.NORMAL && this._objectives[index][i].count > 0) {
                canUnLock = false;
            }
        }
        if (canUnLock) {
            for (let i = 0; i < this._objectives[index].length; ++i) {
                if (this._objectives[index][i].objectiveType === OBJECTIVE_TYPE.QUESTION) {
                    this._objectives[index][i].objectiveType = OBJECTIVE_TYPE.NORMAL;
                    let data = {
                        index: nodeIndex + i,
                        count: this._objectives[index][i].count
                    };
                    this.panelHead.updateObjective(data);
                    return;
                }
            }

        }
    }

    // 获得目标
    getObjective(tileType, type, subType, isTouch?) {
        // 获取当前目标组
        let nodeIndex = 0;
        let index = 0;
        for (let i = 0; i < this._objectives.length; ++i) {
            let isDone = true;
            for (let j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].count > 0) {
                    index = i;
                    isDone = false;
                    nodeIndex -= j;
                    break;
                } else {
                    nodeIndex++;
                }
            }
            if (!isDone) {
                break;
            }
        }

        // 遍历目标组，更新目标
        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (tileType === this._objectives[index][i].tileType &&
                type === this._objectives[index][i].type) {
                if (this._objectives[index][i].subType && subType !== this._objectives[index][i].subType) {
                    continue;
                }
                if (this._objectives[index][i].objectiveType === OBJECTIVE_TYPE.NORMAL && this._objectives[index][i].count > 0) {
                    let count = this._objectives[index][i].count - 1;
                    if (count <= 0) {
                        this._objectives[index][i].count = 0
                        this.unLockQuestion(index, nodeIndex);
                        this.checkWin();
                    } else {
                        this._objectives[index][i].count = count;
                    }
                    let data = {
                        index: nodeIndex + i,
                        count: count
                    };
                    this.panelHead.updateObjective(data);
                    return;
                } else if (isTouch && this._objectives[index][i].objectiveType === OBJECTIVE_TYPE.BAN) {
                    // 重置目标
                    this.resetObjectives();
                    this.panelHead.initObjective();
                    return;
                }
            }
        }
    }

    // 是否需要收集
    needRecovery(tileType, type, subType) {
        let index = this.getCurrGroup();

        // 遍历目标组，更新目标
        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (tileType === this._objectives[index][i].tileType &&
                type === this._objectives[index][i].type) {
                if ((subType && subType !== this._objectives[index][i].subType)
                    || (this._objectives[index][i].objectiveType === OBJECTIVE_TYPE.NORMAL && this._objectives[index][i].count <= 0)
                    || this._objectives[index][i].objectiveType === OBJECTIVE_TYPE.QUESTION) {
                    continue;
                }
                return this._objectives[index][i].position;
            }
        }
        return false;
    }

    // 增加步数
    addSpawnStep(number: number) {
        this.stepSpawnPet += number;
        this.stepSpawnBug += number;
    }

    // 生成目标(宠物，bug)
    spawnObjective(cb) {
        if (this.stepSpawnPet >= STEP_SPAWN_PET && this.spawnPet(cb)) {
            return;
        }
        if (this.stepSpawnBug >= STEP_SPAWN_BUG && this.spawnBug(cb)) {
            return;
        }
        // 不能生成宠物和虫子
        cb && cb(null, null, null)
    }

    // 获取当前组
    getCurrGroup() {
        let index = 0;
        for (let i = 0; i < this._objectives.length; ++i) {
            let isDone = true;
            for (let j = 0; j < this._objectives[i].length; ++j) {
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
    }
    spawnPet(cb) {
        // 场上数量上限
        if (this.getBoardPetCnt() >= COUNT_BOARD_PET) {
            return;
        }
        // 生成
        let index = this.getCurrGroup();
        let allCnt = 0;// 所有需要生成的宠物数量
        let arrCnt = [];
        let arrIndex = [];
        let indexCnt = 0;
        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === TILE_TYPE.PET && this._objectives[index][i].spawnCnt < this._levelData.objective[index][i].count) {
                allCnt += this._objectives[index][i].count;
                arrCnt.push(allCnt);
                arrIndex.push(i);
            }
        }
        if (allCnt === 0) {
            return;
        }

        let random = Math.random() * allCnt;
        for (let i = 0; i < arrCnt.length; ++i) {
            if (random <= arrCnt[i]) {
                indexCnt = i;
                break;
            }
        }

        let objective = this._objectives[index][arrIndex[indexCnt]];
        this.stepSpawnPet = 0;
        this.changePetOrBugData(objective.tileType, objective.type, objective.subType);
        cb && cb(objective.tileType, objective.type, objective.subType);
        return true;
    }

    spawnBug(cb) {
        // 场上数量上限
        if (this.getBoardBugCnt() >= COUNT_BOARD_BUG) {
            return;
        }
        // 生成
        let index = this.getCurrGroup();

        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === TILE_TYPE.TABLEWARE && this._objectives[index][i].type === TABLEWARE_TYPE.TYPE_3
                && this._objectives[index][i].spawnCnt < this._levelData.objective[index][i].count) {
                let objective = this._objectives[index][i];
                if (objective.count === 0) {
                    return;
                };

                this.stepSpawnBug = 0;
                this.changePetOrBugData(objective.tileType, objective.type, objective.subType);
                cb && cb(objective.tileType, objective.type, objective.subType);
                return true;
            }
        }

    }

    // 计算场上宠物数量
    getBoardPetCnt() {
        // 当前目标组
        let index = this.getCurrGroup();

        let count = 0;
        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === TILE_TYPE.PET) {
                // 生成数量-收集数量
                count += this._objectives[index][i].spawnCnt - (this._levelData.objective[index][i].count - this._objectives[index][i].count);
            }
        }
        return count;
    }
    // 计算场上bug数量
    getBoardBugCnt() {
        // 当前目标组
        let index = this.getCurrGroup();

        let count = 0;
        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === TILE_TYPE.TABLEWARE && this._objectives[index][i].type === TABLEWARE_TYPE.TYPE_3) {
                count += this._objectives[index][i].spawnCnt;
            }
        }
        return count;
    }



    // 修改宠物或者虫子数据
    changePetOrBugData(tileType, type, subType) {
        // 当前目标组
        let index = this.getCurrGroup();

        for (let i = 0; i < this._objectives[index].length; ++i) {
            if (this._objectives[index][i].tileType === tileType && this._objectives[index][i].type === type) {
                this._objectives[index][i].spawnCnt++;
            }
        }
    }

    // 计算步数

    // 获取未完成目标
    getObjectivesUnFinished() {
        let arrUnFinished = [];
        let index = 0;
        for (let i = 0; i < this._objectives.length; ++i) {
            for (let j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].objectiveType === OBJECTIVE_TYPE.BAN) {
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
    }

    // 检查是否达成目标
    checkWin() {
        for (let i = 0; i < this._objectives.length; ++i) {
            for (let j = 0; j < this._objectives[i].length; ++j) {
                if (this._objectives[i][j].count > 0) {
                    return false;
                }
            }
        }
        // console.log('win');
        return true;
    }
    ////////////////////原gamedata的内容////////////////////////////////////
    public stepSpawnPet: number = 0;
    public stepSpawnBug: number = 0;
    public objectiveCnt: number[] = [];// 收集总数
    public objectiveSpawnCnt: number[] = [];// 生成总数
    public gameBegan: boolean = null;

    public step: number = 0;

    public spawnLeavesCnt: number[] = [];// 生成树叶数量
    public spawnBugCnt: number = 0;// 生成bug数量


    public collectFruitCnt: number[] = [];// 收集水果数量
    public useBombCnt: number[] = [];// 触发炸弹数量
    public collectLeavesCnt: number[] = [];// 收集树叶数量
    public delWallCnt: number[] = [];// 消除墙数量
    public delTablawareCnt: number[] = [];// 消除餐具数量

    public clear() {
        this.stepSpawnPet = 0;
        this.stepSpawnBug = 0;
        this.spawnBugCnt = 0;
        this.score = 0;
        this.step = 0;
        this.hadAddStep = false;
        for (let i = 0; i < 4; ++i) {
            this.objectiveCnt[i] = 0;
            this.objectiveSpawnCnt[i] = 0;
        }

        for (let i = 0; i < 4; ++i) {
            this.spawnLeavesCnt[i] = 0;
        }

        for (let i = 0; i < 4; ++i) {
            this.useBombCnt[i] = 0;
        }
        for (let i = 0; i < 4; ++i) {
            this.collectLeavesCnt[i] = 0;
        }
        for (let i = 0; i < 5; ++i) {
            this.collectFruitCnt[i] = 0;
        }
        for (let i = 0; i < 5; ++i) {
            this.delWallCnt[i] = 0;
        }
        for (let i = 0; i < 5; ++i) {
            this.delTablawareCnt[i] = 0;
        }
    }
    ////////////////////////////////////////////////////////

    clearFreeNodes() {
        delete this.freeBlocks;
        delete this.freeBombs;
        delete this.freeObstacles;

        this.freeBlocks = [];
        this.freeBombs = [];
        this.freeObstacles = [];

        this.pushBomb(this.popBomb());
    }

    public get levelDatas() {
        return this._levelDatas;
    }
    public set levelDatas(value) {
        this._levelDatas = value;
    }
    public get levelData() {
        return this._levelData;
    }
    public set levelData(value) {
        this._levelData = value;
        this.saveObjectives();
    }

    public get objectives() {
        return this._objectives;
    }

    private saveObjectives() {
        this._objectives.length = 0;
        let objectives = this._levelData.objective;
        for (let i = 0; i < objectives.length; ++i) {
            let objectiveGroup = [];
            for (let j = 0; j < objectives[i].length; ++j) {
                let objective = {
                    objectiveType: objectives[i][j].objectiveType,
                    tileType: objectives[i][j].tileType,
                    type: objectives[i][j].type,
                    count: objectives[i][j].count,
                    spawnCnt: 0,
                    position: null
                }
                objectiveGroup[j] = objective;
            }
            this._objectives[i] = objectiveGroup;
        }
    }

    private resetObjectives() {
        let objectives = this._levelData.objective;
        for (let i = 0; i < this._objectives.length; ++i) {
            for (let j = 0; j < this._objectives[i].length; ++j) {
                this._objectives[i][j].objectiveType = objectives[i][j].objectiveType;
                this._objectives[i][j].count = objectives[i][j].count;
            }
        }
    }

    public get fallDownPoint() {
        return this._fallDownPoint;
    }
    public set fallDownPoint(value) {
        this._fallDownPoint = value;
    }
    public get freeBlocks() {
        return this._freeBlocks;
    }
    public set freeBlocks(value) {
        this._freeBlocks = value;
    }
    public get freeBombs() {
        return this._freeBombs;
    }
    public set freeBombs(value) {
        this._freeBombs = value;
    }
    public get freeObstacles() {
        return this._freeObstacles;
    }
    public set freeObstacles(value) {
        this._freeObstacles = value;
    }
    public get remainStep() {
        return this._remainStep;
    }
    public set remainStep(value) {
        this._remainStep = value;
    }
    public get remainTime() {
        return this._remainTime;
    }
    public set remainTime(value) {
        this._remainTime = value;
    }
    public get saveStep() {
        return this._saveStep;
    }
    public set saveStep(value) {
        this._saveStep = value;
    }
    public get saveTime() {
        return this._saveTime;
    }
    public set saveTime(value) {
        this._saveTime = value;
    }
    public get petCollectNum() {
        return this._petCollectNum;
    }
    public set petCollectNum(value) {
        this._petCollectNum = value;
    }
    // 保存剩余步数和时间
    saveStepAndTime() {
        this._saveStep = this._remainStep;
        this._saveTime = this._remainTime;
    }

    _freeBlocks = [];
    _freeBombs = [];
    _freeObstacles = [];
    popBlock(): cc.Node {
        var nodBlock = null;
        if (this._freeBlocks.length > 0) {
            nodBlock = this._freeBlocks.pop();
        } else {
            nodBlock = cc.instantiate(this.pfbBlock);
        }
        nodBlock.active = true;
        return nodBlock;
    }
    pushBlock(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this._freeBlocks.push(node);
    }
    popBomb(): cc.Node {
        var nodBomb = null;
        if (this._freeBombs.length > 0) {
            nodBomb = this._freeBombs.pop();
        } else {
            nodBomb = cc.instantiate(this.pfbBomb);
        }
        nodBomb.active = true;
        return nodBomb;
    }
    pushBomb(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this._freeBombs.push(node);
    }
    popObstacle(): cc.Node {
        var nodObstacle = null;
        if (this._freeObstacles.length > 0) {
            nodObstacle = this._freeObstacles.pop();
        } else {
            nodObstacle = cc.instantiate(this.pfbObstacle);
        }
        // nodObstacle.active = true;
        return nodObstacle;
    }
    pushObstacle(node: cc.Node) {
        // node.active = false;
        node.x = 10000;
        this._freeObstacles.push(node);
    }


    getScore(score) {
        this._score += score;
        this.updateScore();
    }

    public get score() {
        return this._score;
    }
    public set score(value) {
        this._score = value;
        this.updateScore();
    }

    clearScore() {
        this._score = 0;
    }

    updateScore() {
        this.panelHead.updateScore(this._score);
    }

}
