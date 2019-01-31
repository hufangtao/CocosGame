(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/pvp/DataPvp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cec79lmtkZDhLlTB7t2Tedz', 'DataPvp', __filename);
// scripts/app/component/game/pvp/DataPvp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var Misc_1 = require("../../../common/Misc");
var DataPvp = /** @class */ (function () {
    function DataPvp() {
        this.pfbScore = null;
        this.pfbBlock = null;
        this.pfbBomb = null;
        this.pfbObstacle = null;
        this.pfbTileBg = null;
        this.pfbEncourage = null;
        this.pfbWall = null;
        this.grid = [];
        this.remainTime = 0; // 剩余时间
        this.isSpawnStrongRocket = false; // 是否生成加强火箭
        this._beginTime = 0; //对局开始时间
        this._waittingSpawnPetCount = 0; // 等待被生成的宠物
        this._waittingSpawnRocketCount = 0; // 等待被生成的火箭
        this._waittingSpawnStrongRocketCount = 0; // 等待被生成的加强火箭
        ////////////////////原gamedata的内容////////////////////////////////////
        this._stepSpawnPet = 0;
        this.gameBegan = null;
        this.gameOver = null;
        this.levelData = null;
        this.freeBlocks = [];
        this.freeBombs = [];
        this.freeObstacles = [];
        this.freeEncourages = [];
        this.freeWalls = [];
    }
    Object.defineProperty(DataPvp.prototype, "opponentPetAllCnt", {
        get: function () {
            return this._opponentPetAllCnt;
        },
        set: function (value) {
            this._opponentPetAllCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "opponentBoardPetCnt", {
        get: function () {
            return this._opponentBoardPetCnt;
        },
        set: function (value) {
            this._opponentBoardPetCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "myPetAllCnt", {
        get: function () {
            return this._myPetAllCnt;
        },
        set: function (value) {
            this._myPetAllCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "petAllCnt", {
        get: function () {
            return this._petCnt + this._petGrabCnt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "petCnt", {
        get: function () {
            return this._petCnt;
        },
        set: function (value) {
            this._petCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "petBeGrabedCnt", {
        get: function () {
            return this._petBeGrabedCnt;
        },
        set: function (value) {
            this._petBeGrabedCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "petGrabCnt", {
        get: function () {
            return this._petGrabCnt;
        },
        set: function (value) {
            this._petGrabCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "petSpawnCnt", {
        get: function () {
            return this._petSpawnCnt;
        },
        set: function (value) {
            this._petSpawnCnt = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "oldPvpRank", {
        get: function () {
            return this._oldPvpRank;
        },
        set: function (value) {
            this._oldPvpRank = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "operateCount", {
        get: function () {
            return this._operateCount;
        },
        set: function (value) {
            this._operateCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "waittingSpawnPetCount", {
        get: function () {
            return this._waittingSpawnPetCount;
        },
        set: function (value) {
            this._waittingSpawnPetCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "waittingSpawnRocketCount", {
        get: function () {
            return this._waittingSpawnRocketCount;
        },
        set: function (value) {
            this._waittingSpawnRocketCount = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "waittingSpawnStrongRocketCount", {
        get: function () {
            return this._waittingSpawnStrongRocketCount;
        },
        set: function (value) {
            this._waittingSpawnStrongRocketCount = value;
        },
        enumerable: true,
        configurable: true
    });
    // 保存当前pvp排名
    DataPvp.prototype.saveCurRank = function () {
        this._oldPvpRank = Modules_1.Home.DataRank.MyRank;
    };
    // 是否升级
    DataPvp.prototype.isRankUp = function () {
        if (this._oldPvpRank > Modules_1.Home.DataRank.MyRank) {
            return true;
        }
        return false;
    };
    // 保存当前段位
    DataPvp.prototype.saveCurGrade = function () {
        this._oldGrade = Modules_1.Home.DataPlayer.FortuneStar;
    };
    // 是否升级
    DataPvp.prototype.isGradeUp = function () {
        return false;
        var oldGrade = Misc_1.calcHonorId(this._oldGrade);
        var newGrade = Misc_1.calcHonorId(Modules_1.Home.DataPlayer.FortuneStar);
        if (Modules_1.Home.DataRank.MyRank > 50) {
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
    };
    DataPvp.prototype.clear = function () {
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
    };
    ////////////////////////////////////////////////////////
    DataPvp.prototype.initFreeNodes = function () {
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
    };
    DataPvp.prototype.getBoardPetCnt = function () {
        return this._petSpawnCnt - this._petCnt - this._petBeGrabedCnt;
    };
    DataPvp.prototype.canSpawnPet = function () {
        if (this.getBoardPetCnt() < 8 && this._waittingSpawnPetCount > 0) {
            return true;
        }
        return false;
    };
    Object.defineProperty(DataPvp.prototype, "stepSpawnPet", {
        get: function () {
            return this._stepSpawnPet;
        },
        set: function (value) {
            if (value >= 8) {
                this._waittingSpawnPetCount++;
                this._stepSpawnPet = 0;
                return;
            }
            this._stepSpawnPet = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPvp.prototype, "beginTime", {
        get: function () {
            return this._beginTime;
        },
        set: function (value) {
            this._beginTime = value;
        },
        enumerable: true,
        configurable: true
    });
    DataPvp.prototype.popBlock = function () {
        var nodBlock = null;
        if (this.freeBlocks.length > 0) {
            nodBlock = this.freeBlocks.pop();
        }
        else {
            nodBlock = cc.instantiate(this.pfbBlock);
        }
        nodBlock.active = true;
        return nodBlock;
    };
    DataPvp.prototype.pushBlock = function (node) {
        node.active = false;
        node.x = 10000;
        this.freeBlocks.push(node);
    };
    DataPvp.prototype.popBomb = function () {
        var nodBomb = null;
        if (this.freeBombs.length > 0) {
            nodBomb = this.freeBombs.pop();
        }
        else {
            nodBomb = cc.instantiate(this.pfbBomb);
        }
        nodBomb.active = true;
        return nodBomb;
    };
    DataPvp.prototype.pushBomb = function (node) {
        node.active = false;
        node.x = 10000;
        this.freeBombs.push(node);
    };
    DataPvp.prototype.popObstacle = function () {
        var nodObstacle = null;
        if (this.freeObstacles.length > 0) {
            nodObstacle = this.freeObstacles.pop();
        }
        else {
            nodObstacle = cc.instantiate(this.pfbObstacle);
        }
        nodObstacle.active = true;
        return nodObstacle;
    };
    DataPvp.prototype.pushObstacle = function (node) {
        node.active = false;
        node.x = 10000;
        this.freeObstacles.push(node);
    };
    DataPvp.prototype.popWall = function () {
        var nodWall = null;
        if (this.freeWalls.length > 0) {
            nodWall = this.freeWalls.pop();
        }
        else {
            nodWall = cc.instantiate(this.pfbWall);
        }
        nodWall.active = true;
        return nodWall;
    };
    DataPvp.prototype.pushWall = function (node) {
        node.active = false;
        node.x = 10000;
        this.freeWalls.push(node);
    };
    DataPvp.prototype.popEncourage = function () {
        var nodEncourage = null;
        if (this.freeEncourages.length > 0) {
            nodEncourage = this.freeEncourages.pop();
        }
        else {
            nodEncourage = cc.instantiate(this.pfbEncourage);
        }
        nodEncourage.active = true;
        return nodEncourage;
    };
    DataPvp.prototype.pushEncourage = function (node) {
        node.active = false;
        node.x = 10000;
        this.freeEncourages.push(node);
    };
    return DataPvp;
}());
exports.default = DataPvp;

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
        //# sourceMappingURL=DataPvp.js.map
        