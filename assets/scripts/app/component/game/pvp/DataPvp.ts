import { TILE_TYPE, BLOCKDES_TYPE, BLOCK_COLOR } from "../PlayDefine";
import { Home } from "../../../module/Modules";
import { calcHonorId } from "../../../common/Misc";

export default class DataPvp {
    public pfbScore: cc.Prefab = null;
    public pfbBlock: cc.Prefab = null;
    public pfbBomb: cc.Prefab = null;
    public pfbObstacle: cc.Prefab = null;
    public pfbTileBg: cc.Prefab = null;
    public pfbEncourage: cc.Prefab = null;
    public pfbWall: cc.Prefab = null;

    panelHeader;
    bottom;
    layerGame;
    playUI;

    public grid = [];

    remainTime = 0;// 剩余时间

    _opponentPetAllCnt: number;// 对手宠物总数，记录服务器发过来的数据
    _opponentBoardPetCnt: number;// 对手棋盘上的数据

    _myPetAllCnt: number;// 我的宠物总数，记录服务器的数据

    _petAllCnt: number;// 宠物总数，记录本地的数据
    _petCnt: number;// 宠物收集数量
    _petBeGrabedCnt: number;// 宠物被抢夺数量
    _petGrabCnt: number;// 宠物抢夺数量
    _petSpawnCnt: number;// 宠物生成的数量
    



    public get opponentPetAllCnt() {
        return this._opponentPetAllCnt;
    }
    public set opponentPetAllCnt(value) {
        this._opponentPetAllCnt = value;
    }

    public get opponentBoardPetCnt() {
        return this._opponentBoardPetCnt;
    }
    public set opponentBoardPetCnt(value) {
        this._opponentBoardPetCnt = value;
    }

    public get myPetAllCnt() {
        return this._myPetAllCnt;
    }
    public set myPetAllCnt(value) {
        this._myPetAllCnt = value;
    }

    public get petAllCnt() {
        return this._petCnt + this._petGrabCnt;
    }

    public get petCnt() {
        return this._petCnt;
    }
    public set petCnt(value) {
        this._petCnt = value;
    }
    public get petBeGrabedCnt() {
        return this._petBeGrabedCnt;
    }
    public set petBeGrabedCnt(value) {
        this._petBeGrabedCnt = value;
    }
    public get petGrabCnt() {
        return this._petGrabCnt;
    }
    public set petGrabCnt(value) {
        this._petGrabCnt = value;
    }
    public get petSpawnCnt() {
        return this._petSpawnCnt;
    }
    public set petSpawnCnt(value) {
        this._petSpawnCnt = value;
    }

    isSpawnStrongRocket = false;// 是否生成加强火箭
    private _oldGrade: number;// 对局之前的星星数
    private _oldPvpRank: number;// 对局之前的排行
    public get oldPvpRank() {
        return this._oldPvpRank;
    }
    public set oldPvpRank(value) {
        this._oldPvpRank = value;
    }

    private _beginTime = 0;//对局开始时间

    private _operateCount: number;//点消次数，点击炸弹不算，目前用在被动buff上
    public get operateCount() {
        return this._operateCount;
    }
    public set operateCount(value) {
        this._operateCount = value;
    }


    private _waittingSpawnPetCount: number = 0;// 等待被生成的宠物
    private _waittingSpawnRocketCount: number = 0;// 等待被生成的火箭
    private _waittingSpawnStrongRocketCount: number = 0;// 等待被生成的加强火箭
    public get waittingSpawnPetCount() {
        return this._waittingSpawnPetCount;
    }
    public set waittingSpawnPetCount(value) {
        this._waittingSpawnPetCount = value;
    }
    public get waittingSpawnRocketCount() {
        return this._waittingSpawnRocketCount;
    }
    public set waittingSpawnRocketCount(value) {
        this._waittingSpawnRocketCount = value;
    }
    public get waittingSpawnStrongRocketCount() {
        return this._waittingSpawnStrongRocketCount;
    }
    public set waittingSpawnStrongRocketCount(value) {
        this._waittingSpawnStrongRocketCount = value;
    }

    // 保存当前pvp排名
    saveCurRank() {
        this._oldPvpRank = Home.DataRank.MyRank;
    }
    // 是否升级
    isRankUp() {
        if (this._oldPvpRank > Home.DataRank.MyRank) {
            return true;
        }
        return false;
    }

    // 保存当前段位
    saveCurGrade() {
        this._oldGrade = Home.DataPlayer.FortuneStar;
    }
    // 是否升级
    isGradeUp() {
        return false;
        let oldGrade = calcHonorId(this._oldGrade);
        let newGrade = calcHonorId(Home.DataPlayer.FortuneStar);
        if (Home.DataRank.MyRank > 50) {
            return false;
        }
        // 升级
        if (oldGrade < newGrade) {
            return true;
        }
        // 未变化
        if (oldGrade == newGrade) {
            return false;
        }
        // 降级
        if (oldGrade > newGrade) {
            return false;
        }
    }

    ////////////////////原gamedata的内容////////////////////////////////////
    public _stepSpawnPet: number = 0;
    public gameBegan: boolean = null;
    public gameOver: boolean = null;

    public levelData = null;

    public clear() {
        this._myPetAllCnt = 0;
        this._opponentBoardPetCnt = 0;
        this._petAllCnt = 0;
        this._petCnt = 0;
        this._petSpawnCnt = 0;
        this._petBeGrabedCnt = 0;
        this._petGrabCnt = 0;
        this._opponentPetAllCnt = 0;
        this._waittingSpawnPetCount = 0;
        this._waittingSpawnRocketCount = 0;
        this._waittingSpawnStrongRocketCount = 0;
        this._operateCount = 0;
        this.isSpawnStrongRocket = false;
        this.stepSpawnPet = 0;
    }
    ////////////////////////////////////////////////////////

    initFreeNodes() {
        this.clear();
        delete this.freeBlocks;
        delete this.freeBombs;
        delete this.freeObstacles;
        delete this.freeWalls;
        delete this.freeEncourages;

        this.freeBlocks = [];
        this.freeBombs = [];
        this.freeObstacles = [];
        this.freeWalls = [];
        this.freeEncourages = [];
    }

    public getBoardPetCnt() {
        return this._petSpawnCnt - this._petCnt - this._petBeGrabedCnt;
    }

    public canSpawnPet(): boolean {
        if (this.getBoardPetCnt() < 8 && this._waittingSpawnPetCount > 0) {
            return true;
        }
        return false;
    }

    public get stepSpawnPet() {
        return this._stepSpawnPet;
    }
    public set stepSpawnPet(value) {
        if (value >= 8) {
            this._waittingSpawnPetCount++;
            this._stepSpawnPet = 0;
            return;
        }
        this._stepSpawnPet = value;
    }

    public get beginTime() {
        return this._beginTime;
    }
    public set beginTime(value) {
        this._beginTime = value;
    }

    freeBlocks = [];
    freeBombs = [];
    freeObstacles = [];
    freeEncourages = [];
    freeWalls = [];
    popBlock(): cc.Node {
        var nodBlock = null;
        if (this.freeBlocks.length > 0) {
            nodBlock = this.freeBlocks.pop();
        } else {
            nodBlock = cc.instantiate(this.pfbBlock);
        }
        nodBlock.active = true;
        return nodBlock;
    }
    pushBlock(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this.freeBlocks.push(node);
    }
    popBomb(): cc.Node {
        var nodBomb = null;
        if (this.freeBombs.length > 0) {
            nodBomb = this.freeBombs.pop();
        } else {
            nodBomb = cc.instantiate(this.pfbBomb);
        }
        nodBomb.active = true;
        return nodBomb;
    }
    pushBomb(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this.freeBombs.push(node);
    }
    popObstacle(): cc.Node {
        var nodObstacle = null;
        if (this.freeObstacles.length > 0) {
            nodObstacle = this.freeObstacles.pop();
        } else {
            nodObstacle = cc.instantiate(this.pfbObstacle);
        }
        nodObstacle.active = true;
        return nodObstacle;
    }
    pushObstacle(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this.freeObstacles.push(node);
    }
    popWall(): cc.Node {
        var nodWall = null;
        if (this.freeWalls.length > 0) {
            nodWall = this.freeWalls.pop();
        } else {
            nodWall = cc.instantiate(this.pfbWall);
        }
        nodWall.active = true;
        return nodWall;
    }
    pushWall(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this.freeWalls.push(node);
    }
    popEncourage(): cc.Node {
        var nodEncourage = null;
        if (this.freeEncourages.length > 0) {
            nodEncourage = this.freeEncourages.pop();
        } else {
            nodEncourage = cc.instantiate(this.pfbEncourage);
        }
        nodEncourage.active = true;
        return nodEncourage;
    }
    pushEncourage(node: cc.Node) {
        node.active = false;
        node.x = 10000;
        this.freeEncourages.push(node);
    }
}
