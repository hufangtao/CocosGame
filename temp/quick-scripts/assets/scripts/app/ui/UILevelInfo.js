(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UILevelInfo.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '133d7BpqgpI2a1jXyhF6cex', 'UILevelInfo', __filename);
// scripts/app/ui/UILevelInfo.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../module/Modules");
var GamePersist_1 = require("../common/persist/GamePersist");
var NetUtil_1 = require("../common/net/NetUtil");
var PlayDefine_1 = require("../component/game/PlayDefine");
var ProtoSectionPlay_1 = require("../common/net/proto/mods/ProtoSectionPlay");
var UIFunc_1 = require("../common/UIFunc");
var PlayManager_1 = require("../component/game/PlayManager");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UILevelInfo = /** @class */ (function (_super) {
    __extends(UILevelInfo, _super);
    function UILevelInfo() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodObjectives = null;
        _this.nodContent = null;
        _this.labLevel = null;
        _this.nodRank = null;
        return _this;
        // update (dt) {}
    }
    UILevelInfo.prototype.onLoad = function () {
    };
    UILevelInfo.prototype.loadPrefab = function (url, callback) {
        cc.loader.loadRes(url, cc.Prefab, function (err, prefab) {
            if (!err) {
                callback(prefab);
            }
        });
    };
    UILevelInfo.prototype.initLevelInfo = function (levelChoose) {
        this.levelChoose = levelChoose;
        this.labLevel.string = Modules_1.Play.DataPve.curLevel + '';
        this.showObjectives();
        this.showStar();
        this.loadRank();
    };
    // 显示目标
    UILevelInfo.prototype.showObjectives = function () {
        var objective = Modules_1.Play.LevelDatas['level_' + Modules_1.Play.DataPve.curLevel].objective;
        for (var i = 0; i < this.nodObjectives.children.length; ++i) {
            this.nodObjectives.children[i].active = false;
            this.nodObjectives.children[i].getChildByName('sprAchieved').active = false;
            this.nodObjectives.children[i].getChildByName('labObjective').active = true;
            var children = this.nodObjectives.children[i].getChildByName('sprite').children;
            for (var j = 0; j < children.length; ++j) {
                children[j].destroy();
            }
        }
        var count = 0;
        for (var i = 0; i < objective.length; ++i) {
            var _loop_1 = function (j) {
                var nodObjective = this_1.nodObjectives.children[count];
                var data = objective[i][j];
                nodObjective.active = true;
                if (j === 0 && i !== 0) {
                    nodObjective.getChildByName('arrow').active = true;
                }
                else {
                    nodObjective.getChildByName('arrow').active = false;
                }
                if (data.objectiveType === 0) { // 正常显示水果
                    nodObjective.getChildByName('ban').active = false;
                    nodObjective.getChildByName('question').active = false;
                    nodObjective.getChildByName('sprite').active = true;
                    nodObjective.getChildByName('labObjective').active = true;
                    nodObjective.getChildByName('sprAchieved').active = false;
                }
                else if (data.objectiveType === 1) { // 显示ban
                    nodObjective.getChildByName('ban').active = true;
                    nodObjective.getChildByName('question').active = false;
                    nodObjective.getChildByName('sprite').active = true;
                    nodObjective.getChildByName('labObjective').active = false;
                    nodObjective.getChildByName('sprAchieved').active = false;
                }
                else if (data.objectiveType === 2) { // 显示问号
                    nodObjective.getChildByName('ban').active = false;
                    nodObjective.getChildByName('question').active = true;
                    nodObjective.getChildByName('sprite').active = false;
                    nodObjective.getChildByName('labObjective').active = false;
                    nodObjective.getChildByName('sprAchieved').active = false;
                }
                else {
                    // error
                }
                count++;
                labObjective = nodObjective.getChildByName('labObjective').getComponent(cc.Label);
                labObjective.string = "x" + data.count;
                switch (data.tileType) {
                    case PlayDefine_1.TILE_TYPE.BLOCK:
                        this_1.loadPrefab('prefab/play/pve/Block', function (prefab) {
                            var nodBlock = cc.instantiate(prefab);
                            var tileComponent = nodBlock.getComponent('Block');
                            nodBlock.parent = nodObjective.getChildByName('sprite');
                            tileComponent.init();
                            tileComponent.type = data.type;
                            tileComponent.setContentSize(80, 80);
                            nodBlock.scale = 1;
                            nodBlock.zIndex = 0;
                            nodBlock.x = 0;
                            nodBlock.y = 0;
                        });
                        break;
                    case PlayDefine_1.TILE_TYPE.BOMB:
                        this_1.loadPrefab('prefab/play/pve/Bomb', function (prefab) {
                            var nodBomb = cc.instantiate(prefab);
                            nodBomb.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodBomb.getComponent('Bomb');
                            tileComponent.init();
                            tileComponent.type = data.type;
                            if (data.type == PlayDefine_1.BOMB_TYPE.BOMB_ONE_COLOR) {
                                tileComponent.subType = PlayDefine_1.BLOCK_COLOR.COLORS;
                            }
                            tileComponent.setContentSize(80, 80);
                            nodBomb.scale = 1;
                            nodBomb.zIndex = 0;
                            nodBomb.x = 0;
                            nodBomb.y = 0;
                        });
                        break;
                    case PlayDefine_1.TILE_TYPE.PET:
                        this_1.loadPrefab('prefab/play/pve/Obstacle', function (prefab) {
                            var nodPet = cc.instantiate(prefab);
                            nodPet.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodPet.getComponent('Obstacle');
                            tileComponent.type = data.type;
                            tileComponent.canTouch = false;
                            tileComponent.setContentSize(80, 80);
                            nodPet.scale = 1;
                            nodPet.zIndex = 0;
                            nodPet.x = 0;
                            nodPet.y = 0;
                        });
                        break;
                    case PlayDefine_1.TILE_TYPE.TABLEWARE:
                        this_1.loadPrefab('prefab/play/pve/Tableware', function (prefab) {
                            var nodTableware = cc.instantiate(prefab);
                            nodTableware.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodTableware.getComponent('Tableware');
                            tileComponent.type = data.type;
                            tileComponent.canTouch = false;
                            tileComponent.setContentSize(80, 80);
                            nodTableware.scale = 1;
                            nodTableware.zIndex = 0;
                            nodTableware.x = 0;
                            nodTableware.y = 0;
                        });
                        break;
                    case PlayDefine_1.TILE_TYPE.WALL:
                        this_1.loadPrefab('prefab/play/pve/WALL', function (prefab) {
                            var nodWall = cc.instantiate(prefab);
                            nodWall.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodWall.getComponent('Wall');
                            tileComponent.type = data.type;
                            tileComponent.setContentSize(80, 80);
                            nodWall.scale = 1;
                            nodWall.zIndex = 0;
                            nodWall.x = 0;
                            nodWall.y = 0;
                        });
                        break;
                }
            };
            var this_1 = this, labObjective;
            for (var j = 0; j < objective[i].length; ++j) {
                _loop_1(j);
            }
        }
    };
    // 显示星星
    UILevelInfo.prototype.showStar = function () {
        var nodEmptyStar = this.nodContent.getChildByName('nodEmptyStar');
        var nodStar = this.nodContent.getChildByName('nodStar');
        nodEmptyStar.active = true;
        nodStar.active = true;
        var _score = Modules_1.Play.LevelDatas['level_' + Modules_1.Play.DataPve.curLevel].score;
        var score = 0;
        if (Modules_1.Home.DataPlayer.PveStatArray[Modules_1.Play.DataPve.curLevel - 1]) {
            score = Modules_1.Home.DataPlayer.PveStatArray[Modules_1.Play.DataPve.curLevel - 1].score;
        }
        if (!_score) {
            return;
        }
        if (score >= _score[2]) {
            nodStar.children[0].active = true;
            nodStar.children[1].active = true;
            nodStar.children[2].active = true;
        }
        else if (score >= _score[1]) {
            nodStar.children[0].active = true;
            nodStar.children[1].active = true;
            nodStar.children[2].active = false;
        }
        else if (score >= _score[0]) {
            nodStar.children[0].active = true;
            nodStar.children[1].active = false;
            nodStar.children[2].active = false;
        }
        else {
            nodStar.children[0].active = false;
            nodStar.children[1].active = false;
            nodStar.children[2].active = false;
        }
    };
    UILevelInfo.prototype.loadRank = function () {
        UIFunc_1.UIFunc.openUI('UIRankPve', function (node) {
        }, this.nodRank);
    };
    // 开始游戏，播放爱心动画
    UILevelInfo.prototype.gameStart = function (node) {
        var Energy = Modules_1.Home.DataPlayer.FortuneEnergy;
        if (!window['Partner'].energyTest() && Energy < 5) {
            this.levelChoose.showEnergyEmpty(1);
            return;
        }
        node.getChildByName('nodMask').active = true;
        var action = cc.sequence(cc.spawn(cc.moveTo(0.5, 84, 6.5), cc.scaleTo(0.5, 1.1, 1.1)), cc.callFunc(function () {
            node.getChildByName('particle_energy').getComponent(cc.ParticleSystem).resetSystem();
        }), cc.scaleTo(0.2, 1, 1), cc.scaleTo(0.2, 1.1, 1.1), cc.scaleTo(0.2, 1, 1), cc.callFunc(function () {
            var startPve = new ProtoSectionPlay_1.PlayStartPveC2S();
            PlayManager_1.default.INSTANCE.PveEnterType = 0;
            NetUtil_1.default.SendMsg(startPve);
            node.getChildByName('nodMask').active = false;
        }));
        node.getChildByName('sprHeart').runAction(action);
    };
    UILevelInfo.prototype.closeUI = function () {
        Modules_1.Play.DataPve.curLevel = null;
        UIFunc_1.UIFunc.closeUI('UILevelInfo', function () { });
        UIFunc_1.UIFunc.closeUI('UIRankPve', function () { });
    };
    UILevelInfo.prototype.btnListener = function (event) {
        var target = event.target;
        switch (target.name) {
            case 'btnPanelBack':
                GamePersist_1.default.INSTANCE.btnAudio_2();
                this.closeUI();
                break;
            case 'btnStartPve':
                GamePersist_1.default.INSTANCE.btnAudio_1();
                this.gameStart(target);
                break;
        }
    };
    __decorate([
        property(cc.Node)
    ], UILevelInfo.prototype, "nodObjectives", void 0);
    __decorate([
        property(cc.Node)
    ], UILevelInfo.prototype, "nodContent", void 0);
    __decorate([
        property(cc.Label)
    ], UILevelInfo.prototype, "labLevel", void 0);
    __decorate([
        property(cc.Node)
    ], UILevelInfo.prototype, "nodRank", void 0);
    UILevelInfo = __decorate([
        ccclass
    ], UILevelInfo);
    return UILevelInfo;
}(cc.Component));
exports.default = UILevelInfo;

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
        //# sourceMappingURL=UILevelInfo.js.map
        