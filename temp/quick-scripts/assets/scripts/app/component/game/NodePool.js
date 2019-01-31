(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/NodePool.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'df046ECo4ZH3pW4unt5EfU8', 'NodePool', __filename);
// scripts/app/component/game/NodePool.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../module/Modules");
var NodePool = /** @class */ (function () {
    function NodePool() {
    }
    NodePool.initPool = function () {
        NodePoolHelper.INSTANCE.initPool();
    };
    NodePool.getNodeBlock = function () {
        return NodePoolHelper.INSTANCE.getNodeBlock();
    };
    NodePool.getNodeBomb = function () {
        return NodePoolHelper.INSTANCE.getNodeBomb();
    };
    NodePool.getNodeWall = function () {
        return NodePoolHelper.INSTANCE.getNodeWall();
    };
    NodePool.getNodeTableware = function () {
        return NodePoolHelper.INSTANCE.getNodeTableware();
    };
    NodePool.getNodeObstacle = function () {
        return NodePoolHelper.INSTANCE.getNodeObstacle();
    };
    NodePool.getNodeScore = function () {
        return NodePoolHelper.INSTANCE.getNodeScore();
    };
    NodePool.putNodeBlock = function (value) {
        NodePoolHelper.INSTANCE.putNodeBlock(value);
    };
    NodePool.putNodeBomb = function (value) {
        NodePoolHelper.INSTANCE.putNodeBomb(value);
    };
    NodePool.putNodeWall = function (value) {
        NodePoolHelper.INSTANCE.putNodeWall(value);
    };
    NodePool.putNodeTableware = function (value) {
        NodePoolHelper.INSTANCE.putNodeTableware(value);
    };
    NodePool.putNodeObstacle = function (value) {
        NodePoolHelper.INSTANCE.putNodeObstacle(value);
    };
    NodePool.putNodeScore = function (value) {
        NodePoolHelper.INSTANCE.putNodeScore(value);
    };
    return NodePool;
}());
exports.default = NodePool;
var NodePoolHelper = /** @class */ (function () {
    function NodePoolHelper() {
    }
    Object.defineProperty(NodePoolHelper, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new NodePoolHelper();
            }
            return this.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    NodePoolHelper.prototype.initPool = function () {
        if (!this.nodPoolScore) {
            this.nodPoolScore = new cc.NodePool();
        }
        else {
            this.nodPoolScore.clear();
        }
    };
    NodePoolHelper.prototype.getNodeBlock = function () {
        if (this.nodPoolBlock.size() > 0) {
            return this.nodPoolBlock.get();
        }
        var nodBlock = cc.instantiate(Modules_1.Play.DataPve.pfbBlock);
        return nodBlock;
    };
    NodePoolHelper.prototype.getNodeBomb = function () {
        if (this.nodPoolBomb.size() > 0) {
            return this.nodPoolBomb.get();
        }
        var nodBomb = cc.instantiate(Modules_1.Play.DataPve.pfbBomb);
        return nodBomb;
    };
    NodePoolHelper.prototype.getNodeWall = function () {
        if (this.nodPoolWall.size() > 0) {
            return this.nodPoolWall.get();
        }
        var nodWall = cc.instantiate(Modules_1.Play.DataPve.pfbWall);
        return nodWall;
    };
    NodePoolHelper.prototype.getNodeTableware = function () {
        if (this.nodPoolTableware.size() > 0) {
            return this.nodPoolTableware.get();
        }
        var nodTableware = cc.instantiate(Modules_1.Play.DataPve.pfbTableware);
        return nodTableware;
    };
    NodePoolHelper.prototype.getNodeObstacle = function () {
        if (this.nodPoolObstacle.size() > 0) {
            return this.nodPoolObstacle.get();
        }
        var nodObstacle = cc.instantiate(Modules_1.Play.DataPve.pfbObstacle);
        return nodObstacle;
    };
    NodePoolHelper.prototype.getNodeScore = function () {
        if (this.nodPoolScore.size() > 0) {
            return this.nodPoolScore.get();
        }
        var nodScore = cc.instantiate(Modules_1.Play.DataPve.pfbScore);
        return nodScore;
    };
    NodePoolHelper.prototype.putNodeBlock = function (value) {
        this.nodPoolBlock.put(value);
    };
    NodePoolHelper.prototype.putNodeBomb = function (value) {
        this.nodPoolBomb.put(value);
    };
    NodePoolHelper.prototype.putNodeWall = function (value) {
        this.nodPoolWall.put(value);
    };
    NodePoolHelper.prototype.putNodeTableware = function (value) {
        this.nodPoolTableware.put(value);
    };
    NodePoolHelper.prototype.putNodeObstacle = function (value) {
        this.nodPoolObstacle.put(value);
    };
    NodePoolHelper.prototype.putNodeScore = function (value) {
        this.nodPoolScore.put(value);
    };
    return NodePoolHelper;
}());

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
        //# sourceMappingURL=NodePool.js.map
        