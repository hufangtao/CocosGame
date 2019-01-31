"use strict";
cc._RF.push(module, '0b014aBdsxMIrQon+plO1of', 'PvpGuide');
// scripts/app/component/game/pvp/PvpGuide.ts

Object.defineProperty(exports, "__esModule", { value: true });
var PlayDefine_1 = require("../PlayDefine");
var Modules_1 = require("../../../module/Modules");
var HomeManager_1 = require("../../page/home/HomeManager");
var PlayManager_1 = require("../PlayManager");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PvpGuide = /** @class */ (function (_super) {
    __extends(PvpGuide, _super);
    function PvpGuide() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodMask = null;
        _this.mask_frame = null;
        _this.buffNode = null;
        _this.timeNode = null;
        _this.headNode = null;
        _this.countNode = null;
        _this.tipsLabel = null;
        _this.blackBoardNode = null;
        _this.continueNode = null;
        _this.pointSprite = null;
        _this.panelTile = null;
        _this.guideQueue = null;
        _this.queueSize = 0;
        _this.curGuideType = 0;
        return _this;
        // update (dt) {}
    }
    PvpGuide.prototype.onLoad = function () {
        this.node.on('touchstart', this.onTouchStart, this);
    };
    PvpGuide.prototype.onTouchStart = function (event) {
        var pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        var rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);
        if (rect.contains(pt)) {
            //console.log("Touch in Rect",pt,this.nodMask.convertToWorldSpaceAR(pt));
            var px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt));
            var position = this.getXYByPosition(px);
            var nodTile = null;
            switch (this.curGuideType) {
                case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF1:
                    var activeBuff = new ProtoSectionPlay_1.PlayActiveBuffS2C();
                    activeBuff.buffId = 1;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 2;
                    PlayManager_1.default.INSTANCE.onActiveBuff(activeBuff);
                    HomeManager_1.default.INSTANCE.onBuffStatus(1, 0, 0);
                    Modules_1.Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF2:
                    var activeBuff = new ProtoSectionPlay_1.PlayActiveBuffS2C();
                    var stealAnimal = new ProtoSectionPlay_1.PlayStolenAnimalS2C();
                    stealAnimal.animalSide = 2;
                    stealAnimal.stealCount = 4;
                    var saveAnimal = new ProtoSectionPlay_1.PlaySaveAnimalS2C();
                    saveAnimal.animalSide = 2;
                    stealAnimal.stealCount = 4;
                    activeBuff.buffId = 2;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 1;
                    PlayManager_1.default.INSTANCE.getAnimalResponse(saveAnimal);
                    PlayManager_1.default.INSTANCE.onStolenAnimal(stealAnimal);
                    HomeManager_1.default.INSTANCE.onBuffStatus(1, 0, 0);
                    Modules_1.Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF3:
                    var activeBuff = new ProtoSectionPlay_1.PlayActiveBuffS2C();
                    activeBuff.buffId = 3;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 1;
                    PlayManager_1.default.INSTANCE.onActiveBuff(activeBuff);
                    HomeManager_1.default.INSTANCE.onBuffStatus(1, 0, 0);
                    Modules_1.Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF4:
                    var activeBuff = new ProtoSectionPlay_1.PlayActiveBuffS2C();
                    activeBuff.buffId = 4;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 1;
                    PlayManager_1.default.INSTANCE.onActiveBuff(activeBuff);
                    HomeManager_1.default.INSTANCE.onBuffStatus(1, 0, 0);
                    Modules_1.Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case PlayDefine_1.GUIDE_TYPE.BOMB_COL:
                case PlayDefine_1.GUIDE_TYPE.BOMB_COL_STR:
                    nodTile = this.node.parent.getComponent('LayerGame').tiles[position.x][position.y];
                    var bombComponent = nodTile.getComponent('BombPvp');
                    if (bombComponent != null) {
                        this.pointSprite.node.active = false;
                        this.nodMask.opacity = 0;
                        bombComponent.onTouchStart();
                    }
                    Modules_1.Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case PlayDefine_1.GUIDE_TYPE.MATCH2:
                case PlayDefine_1.GUIDE_TYPE.SAVE:
                case PlayDefine_1.GUIDE_TYPE.MATCH1:
                    // console.log("match1");
                    nodTile = this.node.parent.getComponent('LayerGame').tiles[position.x][position.y];
                    var blockComponent = nodTile.getComponent('BlockPvp');
                    // console.log("block Component:", blockComponent);
                    if (blockComponent != null) {
                        blockComponent.onTouchStart();
                    }
                    Modules_1.Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
            }
        }
        else {
            //console.log("Touch continue",event);
            if (this.curGuideType >= 100) {
                return;
            }
            Modules_1.Play.DataPvp.gameBegan = true;
            this.node.active = false;
        }
        if (!this.node.active) {
            this.performGuide();
        }
    };
    PvpGuide.prototype.getXYByPosition = function (position) {
        var x = Math.floor(position.x / 80) + 4;
        var y = Math.floor(position.y / 80);
        return { x: x, y: y };
    };
    PvpGuide.prototype.initGuide = function (tips, tipsString, tipsPos, maskPos, maskSize, continueTip, pointer) {
        if (continueTip === void 0) { continueTip = false; }
        if (pointer === void 0) { pointer = false; }
        this.continueNode.active = continueTip;
        this.blackBoardNode.active = tips;
        this.tipsLabel.string = tipsString;
        if (this.tipsLabel.node.height >= 160) {
            this.blackBoardNode.height = this.tipsLabel.node.height + 40;
        }
        else {
            this.blackBoardNode.height = 160;
        }
        this.blackBoardNode.y = (tipsPos);
        this.nodMask.setPosition(maskPos);
        this.mask_frame.setPosition(this.nodMask.getPosition());
        this.pointSprite.node.active = pointer;
        this.pointSprite.node.setPosition(this.nodMask.getPosition());
        this.pointSprite.node.getComponent(cc.Animation).play("aniGuide");
        this.nodMask.setContentSize(maskSize);
        this.mask_frame.setContentSize(maskSize.width + 40, maskSize.height + 40);
    };
    PvpGuide.prototype.performGuide = function () {
        if (this.queueSize <= 0) {
            return;
        }
        Modules_1.Play.DataPvp.gameBegan = false;
        var guide = [];
        guide = this.guideQueue.pop();
        this.queueSize--;
        var guideType = guide[0];
        var bombPos = guide[1];
        this.curGuideType = guideType;
        this.node.active = true;
        this.nodMask.active = true;
        this.nodMask.opacity = 200;
        var pos = null;
        this.blackBoardNode.active = true;
        switch (guideType) {
            case PlayDefine_1.GUIDE_TYPE.MATCH1:
                var maskPos = cc.v2(-160, -30);
                var maskSize = new cc.Size(160, 80);
                var tipsString = "点击2个及以上相邻的同类水果即可消除";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, false, true);
                break;
            case PlayDefine_1.GUIDE_TYPE.MATCH2:
                var maskPos = cc.v2(200, -30);
                var maskSize = new cc.Size(80, 240);
                var tipsString = "再点击试一次";
                this.initGuide(true, tipsString, 190, maskPos, maskSize, false, true);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.SAVE);
                break;
            case PlayDefine_1.GUIDE_TYPE.SAVE:
                // var maskPos = cc.v2(40 + 80, -30 - 80 * 3);
                var maskPos = cc.v2(120, -390);
                var maskSize = new cc.Size(80, 160);
                var tipsString = "通过消除水果使动物下落到棋盘底部，即可完成收集";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, false, true);
                break;
            case PlayDefine_1.GUIDE_TYPE.SAVE_SUC:
                var maskPos = cc.v2(0, 420);
                var maskSize = new cc.Size(400, 150);
                var tipsString = "恭喜你拯救了宠物! 这里记录了双方收集的宠物数，游戏结束时数量多的一方获胜";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.TIME);
                break;
            case PlayDefine_1.GUIDE_TYPE.TIME:
                var maskPos = this.timeNode.getPosition();
                var maskSize = this.timeNode.getContentSize();
                var tipsString = "比赛总时长为120s";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                if (PlayManager_1.default.INSTANCE.PlayUI.panelHeader.passedTime < 55) {
                    PlayManager_1.default.INSTANCE.PlayUI.panelHeader.passedTime = 55;
                }
                break;
            case PlayDefine_1.GUIDE_TYPE.TIME60:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "当游戏到达60秒时，\n游戏进入第2阶段，此时火箭回得到加强，试着合成一个强力火箭";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                break;
            case PlayDefine_1.GUIDE_TYPE.BOMB_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "真棒，就是这样!";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                break;
            case PlayDefine_1.GUIDE_TYPE.BOMB_COL_STR_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "哇！强力火箭是不是更厉害了";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                break;
            case PlayDefine_1.GUIDE_TYPE.BUFF_TIP:
                var maskPos = cc.v2(0, -547);
                var maskSize = new cc.Size(500, 100);
                var tipsString = "对战中有多个技能可以选择使用哦";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF1);
                break;
            case PlayDefine_1.GUIDE_TYPE.BOMB_COL:
                // this.nodMask.active = false;
                var tipsPos = 160;
                pos = this.node.convertToNodeSpaceAR(bombPos);
                if (bombPos.y > 650) {
                    tipsPos = -160;
                }
                maskPos = pos;
                var maskSize = new cc.Size(80, 80);
                var tipsString = "哇，恭喜你合成了一个火箭，默认方向是竖向的，每次点击将改变火箭方向，快来试试吧";
                this.initGuide(true, tipsString, tipsPos, maskPos, maskSize, false, true);
                break;
            case PlayDefine_1.GUIDE_TYPE.BOMB_COL_STR:
                var tipsPos = 160;
                pos = this.node.convertToNodeSpaceAR(bombPos);
                if (bombPos.y > 650) {
                    tipsPos = -160;
                }
                maskPos = pos;
                var maskSize = new cc.Size(80, 80);
                var tipsString = "哇，恭喜你合成了强力火箭，快点击试试吧";
                this.initGuide(true, tipsString, tipsPos, maskPos, maskSize, false, true);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF1:
                // 设置一个技能
                HomeManager_1.default.INSTANCE.onBuffStatus(1, 1, 1);
                var maskPos = cc.v2(-180, -547);
                var maskSize = new cc.Size(100, 100);
                var tipsString = "先试一试这个技能有什么用吧";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, false, true);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF1_SUC);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF1_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "恭喜你消除了全屏";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.GET_BUFF);
                // this.setGuide(GUIDE_TYPE.ACTIVE_BUFF2);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF2:
                // 设置一个技能
                HomeManager_1.default.INSTANCE.onBuffStatus(1, 2, 1);
                var maskPos = this.buffNode.getPosition();
                var maskSize = this.buffNode.getContentSize();
                var tipsString = "你还可以把对手棋盘上的宠物抢来，快试试使用这个技能吧";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF2_SUC);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF2_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "你成功从对手棋盘上抢夺了宠物";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                // this.setGuide(GUIDE_TYPE.GET_BUFF);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF3);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF3:
                // 设置一个技能
                HomeManager_1.default.INSTANCE.onBuffStatus(1, 3, 1);
                var maskPos = this.buffNode.getPosition();
                var maskSize = this.buffNode.getContentSize();
                var tipsString = "你还可以用这个技能遮挡对手视野10秒";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF3_SUC);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF3_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "很好";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF4);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF4:
                // 设置一个技能
                HomeManager_1.default.INSTANCE.onBuffStatus(1, 4, 1);
                var maskPos = this.buffNode.getPosition();
                var maskSize = this.buffNode.getContentSize();
                var tipsString = "甚至你想打乱对方阵脚，还可以使用这个技能";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF4_SUC);
                break;
            case PlayDefine_1.GUIDE_TYPE.ACTIVE_BUFF4_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "你成功打乱了对手的棋盘";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.GET_BUFF);
                break;
            case PlayDefine_1.GUIDE_TYPE.GET_BUFF:
                var maskPos = cc.v2(80, -547);
                var maskSize = new cc.Size(400, 120);
                var tipsString = "更多丰富的技能可以通过主页看广告免费获得哦";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true);
                this.setGuide(PlayDefine_1.GUIDE_TYPE.USE_BUFF_COUNT);
                break;
            case PlayDefine_1.GUIDE_TYPE.USE_BUFF_COUNT:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(400, 120);
                var tipsString = "记住每局每个技能只能使用一次哦";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                if (PlayManager_1.default.INSTANCE.PlayUI.panelHeader.passedTime < 105) {
                    PlayManager_1.default.INSTANCE.PlayUI.panelHeader.passedTime = 105;
                }
                break;
            // case GUIDE_TYPE.GEN_FLOWER1:
            //     var tipsPos = 160;
            //     pos = this.node.convertToNodeSpaceAR(bombPos);
            //     if (bombPos.y > 650) {
            //         tipsPos = -160;
            //     }
            //     maskPos = pos;
            //     var maskSize = new cc.Size(80, 80);
            //     var tipsString = "当对手比分超过你的时候，会在最下面一行生成一朵花，花朵会挡住水果的下落，需要再花朵周围消除两次才可消除";
            //     this.initGuide(true, tipsString, tipsPos, maskPos, maskSize,true,false);
            //     this.setGuide(GUIDE_TYPE.GEN_FLOWER2);
            //     break;
            // case GUIDE_TYPE.GEN_FLOWER2:
            //     var maskPos = cc.v2(10000, 10000);
            //     var maskSize = new cc.Size(80, 80);
            //     var tipsString = "比分差距越大，花朵生成位置越高哦，加油超越对手，你也给ta抛一朵花";
            //     this.initGuide(true, tipsString, 160, maskPos, maskSize, true,false);
            //     if (PlayManager.INSTANCE.PlayUI.panelHeader.passedTime < 105) {
            //         PlayManager.INSTANCE.PlayUI.panelHeader.passedTime = 105;
            //     }
            //     break;
        }
    };
    PvpGuide.prototype.setGuide = function (guideType, bombPos) {
        if (bombPos === void 0) { bombPos = null; }
        if (this.guideQueue == null) {
            this.guideQueue = [];
        }
        // console.log("set guideType", guideType);
        var guide = [];
        guide[0] = guideType;
        guide[1] = bombPos;
        this.guideQueue.unshift(guide);
        this.queueSize++;
        if (!this.node.active) {
            this.performGuide();
        }
    };
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "nodMask", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "mask_frame", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "buffNode", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "timeNode", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "headNode", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "countNode", void 0);
    __decorate([
        property(cc.Label)
    ], PvpGuide.prototype, "tipsLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "blackBoardNode", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "continueNode", void 0);
    __decorate([
        property(cc.Sprite)
    ], PvpGuide.prototype, "pointSprite", void 0);
    __decorate([
        property(cc.Node)
    ], PvpGuide.prototype, "panelTile", void 0);
    PvpGuide = __decorate([
        ccclass
    ], PvpGuide);
    return PvpGuide;
}(cc.Component));
exports.default = PvpGuide;

cc._RF.pop();