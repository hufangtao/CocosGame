"use strict";
cc._RF.push(module, '5e463/+hV5NyoE0iybrwkWX', 'PanelHeader');
// scripts/app/component/game/pvp/PanelHeader.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var PlayDefine_1 = require("../PlayDefine");
var PlayManager_1 = require("../PlayManager");
var NetUtil_1 = require("../../../common/net/NetUtil");
var ProtoSectionPlay_1 = require("../../../common/net/proto/mods/ProtoSectionPlay");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PanelHeader = /** @class */ (function (_super) {
    __extends(PanelHeader, _super);
    function PanelHeader() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodBlueIcon = null;
        _this.nodRedIcon = null;
        _this.labBlueName = null;
        _this.labRedName = null;
        _this.labBlueCount = null;
        _this.labRedCount = null;
        _this.labOutCount = null;
        _this.labCountDown = null;
        _this.sprBonusTime = null;
        _this.sprGrayBg = null;
        _this.sameLabel = null;
        _this.redLabel = null;
        _this.greenLabel = null;
        _this.fontGreen = null;
        _this.fontRed = null;
        _this.nodBlueFace = null;
        _this.nodRedFace = null;
        _this.labCountDownBig = null;
        _this.nodBeyond = null;
        _this.nodTip = null;
        _this.pvpTeach = false;
        _this.pvpAi = false;
        _this._remainTime = 10;
        _this.passedTime = 0;
        // ai生成花朵策略相关标记位
        _this.bgr = -1;
        _this.rgb = -1;
        _this.myPetCnt = 0;
        _this.opponentPetCnt = 0;
        _this.unUseProp = [1, 2, 3, 4];
        return _this;
    }
    PanelHeader.prototype.onLoad = function () {
        this.PlayUI = cc.find('Canvas').getComponent('PlayUI');
    };
    PanelHeader.prototype.start = function () {
        this.setPlayMsg();
        this.init();
        // this.setProgress();
    };
    Object.defineProperty(PanelHeader.prototype, "remainTime", {
        get: function () {
            return this._remainTime;
        },
        set: function (value) {
            this._remainTime = value;
            this.propTip();
        },
        enumerable: true,
        configurable: true
    });
    // 可以使用道具提示
    PanelHeader.prototype.propTip = function () {
        if (this._remainTime >= 120 || this._remainTime <= 0) {
            return;
        }
        if (this._remainTime % 10 !== 0) {
            return;
        }
        // console.log(Play.DataPvp.opponentBoardPetCnt);
        // 可以使用道具提示
        if (this.getPropCnt(1) > 0 && Modules_1.Play.DataPvp.getBoardPetCnt() >= 6) {
            if (!this.PlayUI.layerGame.bottom.canTouchSlot[0]) {
                return;
            }
            this.PlayUI.propTips(1);
        }
        else if (this.getPropCnt(2) > 0 && Modules_1.Play.DataPvp.opponentBoardPetCnt >= 4) {
            if (!this.PlayUI.layerGame.bottom.canTouchSlot[1]) {
                return;
            }
            this.PlayUI.propTips(2);
        }
        else if (Modules_1.Play.DataPvp.opponentPetAllCnt - Modules_1.Play.DataPvp.myPetAllCnt > 3) {
            if (this.getPropCnt(3) > 0 && this.getPropCnt(4) > 0) {
                var type = Math.random() > 0.5 ? 3 : 4;
                if (!this.PlayUI.layerGame.bottom.canTouchSlot[type - 1]) {
                    return;
                }
                this.PlayUI.propTips(type);
            }
            else if (this.getPropCnt(3) > 0) {
                if (!this.PlayUI.layerGame.bottom.canTouchSlot[2]) {
                    return;
                }
                this.PlayUI.propTips(3);
            }
            else if (this.getPropCnt(4) > 0) {
                if (!this.PlayUI.layerGame.bottom.canTouchSlot[3]) {
                    return;
                }
                this.PlayUI.propTips(4);
            }
        }
    };
    // 获取道具个数
    PanelHeader.prototype.getPropCnt = function (type) {
        for (var i = 0; i < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++i) {
            if (Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId === type) {
                return Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum;
            }
        }
        return 0;
    };
    PanelHeader.prototype.init = function () {
        this.remainTime = PlayDefine_1.ONE_GAME_TIME;
        this.labCountDown.string = this.remainTime + "";
        this.labBlueCount.string = '0';
        this.labRedCount.string = '0';
        this.redLabel.active = false;
        this.greenLabel.active = false;
        this.sameLabel.active = true;
        // this.labOutCount.string = '不相上下';
        this.labOutCount.string = '';
        this.labCountDownBig.node.active = false;
        this.bgr = -1;
        this.rgb = -1;
        if (this.pvpAi) {
            this.getUsePropRandomTime();
        }
    };
    // 加载头像
    PanelHeader.prototype.setHead = function (nodHead_1, nodHead_2) {
        nodHead_1.parent = this.nodBlueIcon;
        nodHead_2.parent = this.nodRedIcon;
        var scriptNodHead_1 = nodHead_1.getComponent('PlaymateHead');
        var scriptNodHead_2 = nodHead_2.getComponent('PlaymateHead');
        nodHead_1.setPosition(0, 0);
        nodHead_2.setPosition(0, 0);
        scriptNodHead_1.setSize(110, 110);
        scriptNodHead_2.setSize(110, 110);
        scriptNodHead_1.HeadUrl = Modules_1.Play.DataPlay.showHeadImg;
        scriptNodHead_2.HeadUrl = Modules_1.Play.DataPlay.OpponentHeadUrl;
        var blueHead = cc.instantiate(nodHead_1);
        var redHead = cc.instantiate(nodHead_2);
        this.setBeyondHead(blueHead, redHead);
    };
    // 设置超越的头像
    PanelHeader.prototype.setBeyondHead = function (nodHead_1, nodHead_2) {
        nodHead_1.parent = cc.find('blue/blueMask/nodBlueIcon', this.nodBeyond);
        nodHead_2.parent = cc.find('red/redMask/nodRedIcon', this.nodBeyond);
        var scriptNodHead_1 = nodHead_1.getComponent('PlaymateHead');
        var scriptNodHead_2 = nodHead_2.getComponent('PlaymateHead');
        nodHead_1.setPosition(0, 0);
        nodHead_2.setPosition(0, 0);
        scriptNodHead_1.setSize(110, 110);
        scriptNodHead_2.setSize(110, 110);
        scriptNodHead_1.HeadUrl = Modules_1.Play.DataPlay.showHeadImg;
        scriptNodHead_2.HeadUrl = Modules_1.Play.DataPlay.OpponentHeadUrl;
    };
    // 设置玩家名字
    PanelHeader.prototype.setPlayMsg = function () {
        this.labBlueName.string = Modules_1.Play.DataPlay.MyName;
        this.labRedName.string = Modules_1.Play.DataPlay.OpponentName;
    };
    // 拯救宠物
    PanelHeader.prototype.getAnimal = function () {
        this.labBlueCount.string = "" + Modules_1.Play.DataPvp.petAllCnt;
        this.labRedCount.string = "" + Modules_1.Play.DataPvp.opponentPetAllCnt;
        this.showOutCount();
        // this.setProgress();
        // ai生成花朵策略
        if ((this.pvpTeach || this.pvpAi)) {
            if (this.pvpTeach && this.remainTime >= 50) {
                return;
            }
            if (Modules_1.Play.DataPvp.myPetAllCnt > Modules_1.Play.DataPvp.opponentPetAllCnt && this.bgr == -1) {
                // 超过
                this.rgb = -1;
                this.bgr = 1;
                this.PlayUI.genBlockResponse(Modules_1.Play.DataPlay.OpponentSide, 1);
            }
            else if (Modules_1.Play.DataPvp.myPetAllCnt == (Modules_1.Play.DataPvp.opponentPetAllCnt + 5)) {
                this.PlayUI.genBlockResponse(Modules_1.Play.DataPlay.OpponentSide, 3);
            }
            else if (Modules_1.Play.DataPvp.myPetAllCnt == (Modules_1.Play.DataPvp.opponentPetAllCnt + 10)) {
                this.PlayUI.genBlockResponse(Modules_1.Play.DataPlay.OpponentSide, 5);
            }
            if (Modules_1.Play.DataPvp.opponentPetAllCnt > Modules_1.Play.DataPvp.myPetAllCnt && this.rgb == -1) {
                // 超过
                this.rgb = 1;
                this.bgr = -1;
                this.PlayUI.genBlockResponse(Modules_1.Play.DataPlay.MySide, 1);
            }
            else if (Modules_1.Play.DataPvp.opponentPetAllCnt == (Modules_1.Play.DataPvp.myPetAllCnt + 5)) {
                this.PlayUI.genBlockResponse(Modules_1.Play.DataPlay.MySide, 2);
            }
            else if (Modules_1.Play.DataPvp.opponentPetAllCnt == (Modules_1.Play.DataPvp.myPetAllCnt + 10)) {
                this.PlayUI.genBlockResponse(Modules_1.Play.DataPlay.MySide, 3);
            }
        }
    };
    PanelHeader.prototype.onBeyondAnimDone = function () {
        this.nodBeyond.active = false;
    };
    // 显示宠物收集情况
    PanelHeader.prototype.showOutCount = function () {
        var outCount = Modules_1.Play.DataPvp.myPetAllCnt - Modules_1.Play.DataPvp.opponentPetAllCnt;
        if (outCount > 0) {
            if (this.labOutCount.font == this.fontRed) {
                this.labOutCount.font = this.fontGreen;
            }
            this.redLabel.active = false;
            this.greenLabel.active = true;
            this.sameLabel.active = false;
            this.labOutCount.string = String(outCount);
            if (this.myPetCnt <= this.opponentPetCnt) {
                this.labBlueCount.node.runAction(cc.sequence(cc.scaleTo(0.252, 2, 2), cc.scaleTo(0.084, 1.8, 1.8), cc.scaleTo(0.084, 2, 2), cc.delayTime(1), cc.scaleTo(0.252, 1, 1)));
                cc.find('blue/score', this.nodBeyond).getComponent(cc.Label).string = '' + Modules_1.Play.DataPvp.myPetAllCnt;
                cc.find('red/score', this.nodBeyond).getComponent(cc.Label).string = '' + Modules_1.Play.DataPvp.opponentPetAllCnt;
                this.nodBeyond.active = true;
                this.nodBeyond.getComponent(cc.Animation).stop();
                this.nodBeyond.getComponent(cc.Animation).play('pvpBeyond');
                this.nodBeyond.getComponent(cc.Animation).on('finished', this.onBeyondAnimDone, this);
            }
        }
        else if (outCount < 0) {
            if (this.labOutCount.font == this.fontGreen) {
                this.labOutCount.font = this.fontRed;
            }
            this.redLabel.active = true;
            this.greenLabel.active = false;
            this.sameLabel.active = false;
            this.labOutCount.string = String(-outCount);
            if (this.myPetCnt >= this.opponentPetCnt) {
                this.labRedCount.node.runAction(cc.sequence(cc.scaleTo(0.252, 2, 2), cc.scaleTo(0.084, 1.8, 1.8), cc.scaleTo(0.084, 2, 2), cc.delayTime(1), cc.scaleTo(0.252, 1, 1)));
                cc.find('blue/score', this.nodBeyond).getComponent(cc.Label).string = '' + Modules_1.Play.DataPvp.myPetAllCnt;
                cc.find('red/score', this.nodBeyond).getComponent(cc.Label).string = '' + Modules_1.Play.DataPvp.opponentPetAllCnt;
                this.nodBeyond.active = true;
                this.nodBeyond.getComponent(cc.Animation).stop();
                this.nodBeyond.getComponent(cc.Animation).on('finished', this.onBeyondAnimDone, this);
                this.nodBeyond.getComponent(cc.Animation).play('pvpLag');
            }
        }
        else {
            // this.labOutCount.string = '不相上下';
            this.redLabel.active = false;
            this.greenLabel.active = false;
            this.sameLabel.active = true;
            this.labOutCount.string = '';
        }
        this.myPetCnt = Modules_1.Play.DataPvp.myPetAllCnt;
        this.opponentPetCnt = Modules_1.Play.DataPvp.opponentPetAllCnt;
    };
    // 提示时间
    PanelHeader.prototype.remaindTime = function (time) {
        this.PlayUI.Audio.remaindTime();
        var content = this.nodTip.getChildByName('content');
        var label = content.getChildByName('label');
        label.getComponent(cc.Label).string = time + '秒';
        content.runAction(cc.sequence(cc.moveBy(0.2, 222, 0), cc.delayTime(2.5), cc.moveBy(0.2, -222, 0)));
    };
    // 剩余时间
    PanelHeader.prototype.getRemainTime = function () {
        var remainTime;
        if (this.pvpTeach) {
            remainTime = PlayDefine_1.ONE_GAME_TIME - this.passedTime;
        }
        else {
            remainTime = PlayDefine_1.ONE_GAME_TIME - (Date.now() - Modules_1.Play.DataPvp.beginTime) / 1000;
        }
        if (remainTime > 120) {
            remainTime = 120;
        }
        if (remainTime < 0) {
            remainTime = 0;
        }
        return remainTime;
    };
    PanelHeader.prototype.closeFace = function () {
        this.nodBlueFace.active = false;
        this.nodRedFace.active = false;
        this.nodBlueFace.getChildByName('yunxuan1').active = false;
        this.nodBlueFace.getChildByName('yunxuan2').active = false;
        this.nodBlueFace.getChildByName('yunxuan3').active = false;
        this.nodBlueFace.getChildByName('yunxuan4').active = false;
        this.nodBlueFace.getChildByName('yanhua').active = false;
        this.nodBlueFace.getChildByName('Tv-buff3').active = false;
        this.nodRedFace.getChildByName('yunxuan1').active = false;
        this.nodRedFace.getChildByName('yunxuan2').active = false;
        this.nodRedFace.getChildByName('yunxuan3').active = false;
        this.nodRedFace.getChildByName('yunxuan4').active = false;
        this.nodRedFace.getChildByName('yanhua').active = false;
        this.nodRedFace.getChildByName('Tv-buff3').active = false;
        this.nodBlueFace.getComponent(cc.Animation).stop('vertigo');
        this.nodRedFace.getComponent(cc.Animation).stop('vertigo');
        this.nodBlueFace.getComponent(cc.Animation).stop('yanhua');
        this.nodRedFace.getComponent(cc.Animation).stop('yanhua');
    };
    // 显示表情
    PanelHeader.prototype.showFace = function (side, faceType, animationType) {
        if (side === PlayDefine_1.PlaySide.BLU) {
            this.nodBlueFace.active = true;
            this.unschedule(this.closeFace);
            this.scheduleOnce(this.closeFace, 2.5);
            if (faceType === PlayDefine_1.FaceType.Sand) {
                this.nodBlueFace.getChildByName('sand').active = true;
                this.nodBlueFace.getChildByName('happy').active = false;
            }
            else {
                this.nodBlueFace.getChildByName('sand').active = false;
                this.nodBlueFace.getChildByName('happy').active = true;
            }
            if (animationType === PlayDefine_1.FaceAnimationType.Xuayun) {
                this.nodBlueFace.getComponent(cc.Animation).play('vertigo');
            }
            else if (animationType === PlayDefine_1.FaceAnimationType.Yanhua) {
                this.nodBlueFace.getComponent(cc.Animation).play('yanhua');
            }
            else if (animationType === PlayDefine_1.FaceAnimationType.Yun) {
                this.nodBlueFace.getComponent(cc.Animation).play('cloudFace');
            }
        }
        else {
            this.nodRedFace.active = true;
            this.unschedule(this.closeFace);
            this.scheduleOnce(this.closeFace, 2.5);
            if (faceType === PlayDefine_1.FaceType.Sand) {
                this.nodRedFace.getChildByName('sand').active = true;
                this.nodRedFace.getChildByName('happy').active = false;
            }
            else {
                this.nodRedFace.getChildByName('sand').active = false;
                this.nodRedFace.getChildByName('happy').active = true;
            }
            if (animationType === PlayDefine_1.FaceAnimationType.Xuayun) {
                this.nodRedFace.getComponent(cc.Animation).play('vertigo');
            }
            else if (animationType === PlayDefine_1.FaceAnimationType.Yanhua) {
                this.nodRedFace.getComponent(cc.Animation).play('yanhua');
            }
            else if (animationType === PlayDefine_1.FaceAnimationType.Yun) {
                this.nodRedFace.getComponent(cc.Animation).play('cloudFace');
            }
        }
    };
    PanelHeader.prototype.getUsePropRandomTime = function () {
        this.unUseProp = [1, 2, 3, 4];
        this.time1 = Math.floor(Math.random() * 25 + 10);
        this.time2 = Math.floor(Math.random() * 24 + 36);
        this.time3 = Math.floor(Math.random() * 24 + 61);
        this.time4 = Math.floor(Math.random() * 24 + 86);
        // console.log(this.time1);
        // console.log(this.time2);
        // console.log(this.time3);
        // console.log(this.time4);
    };
    // ai使用道具
    PanelHeader.prototype.aiUseProp = function () {
        if (this.remainTime === this.time1) {
            this.useRandomProp();
        }
        else if (this.remainTime === this.time2) {
            this.useRandomProp();
        }
        else if (this.remainTime === this.time3) {
            this.useRandomProp();
        }
        else if (this.remainTime === this.time4) {
            this.useRandomProp();
        }
    };
    // 随机使用一个道具
    PanelHeader.prototype.useRandomProp = function () {
        var propIndex = Math.floor(Math.random() * this.unUseProp.length);
        var propType = this.unUseProp.splice(propIndex, 1)[0];
        switch (propType) {
            case 1:
                this.PlayUI.opponentUseProp(1);
                break;
            case 2:
                this.PlayUI.opponentUseProp(2);
                break;
            case 3:
                this.PlayUI.opponentUseProp(3);
                break;
            case 4:
                this.PlayUI.opponentUseProp(4);
                break;
        }
    };
    ////////////////////////////////////AI////////////////////////////////////////////////////////////
    PanelHeader.prototype.update = function (dt) {
        var _this = this;
        if (!Modules_1.Play.DataPvp.gameBegan) {
            return;
        }
        this.passedTime += dt;
        var time = Math.floor(this.getRemainTime());
        if (this.remainTime != time && this.remainTime >= 0) {
            this.remainTime = time;
            this.labCountDown.string = this.remainTime + "";
            if (this.remainTime == 60) {
                this.remaindTime(60);
                Modules_1.Play.DataPvp.isSpawnStrongRocket = true;
                this.PlayUI.setToast('剩余60s，火箭升级');
            }
            if (this.remainTime == 30) {
                this.remaindTime(30);
            }
            var self_1 = this;
            if (self_1.pvpTeach || self_1.pvpAi) {
                var randomTime = Math.random();
                self_1.scheduleOnce(function () {
                    if (self_1.remainTime > 1) {
                        var delta = Modules_1.Play.DataPvp.myPetAllCnt - Modules_1.Play.DataPvp.opponentPetAllCnt;
                        var jilv = 0;
                        if (delta <= -6) {
                            jilv = 0.01;
                        }
                        else if (delta <= -3) {
                            jilv = 0.02;
                        }
                        else if (delta <= 0) {
                            jilv = 0.05;
                        }
                        else if (delta <= 3) {
                            jilv = 0.10;
                        }
                        else if (delta <= 6) {
                            jilv = 0.20;
                        }
                        else {
                            jilv = 0.30;
                        }
                        var randomNum = Math.floor(Math.random() + jilv);
                        Modules_1.Play.DataPvp.opponentPetAllCnt += randomNum;
                        if (randomNum != 0) {
                            self_1.getAnimal();
                        }
                    }
                }, randomTime);
            }
            // 小于10秒时开始倒计时声音
            if (this.remainTime < 10 && this.remainTime >= 1) {
                this.labCountDownBig.string = this.remainTime + "";
                this.labCountDownBig.node.active = true;
                var action = cc.sequence(cc.callFunc(function () {
                    _this.labCountDownBig.node.color = new cc.Color(255, 0, 0, 255);
                }), cc.delayTime(0.2), cc.callFunc(function () {
                    _this.labCountDownBig.node.color = new cc.Color(255, 255, 255, 255);
                }));
                this.labCountDownBig.node.runAction(action);
                this.PlayUI.Audio.countDownAudio();
            }
            else if (this.remainTime <= 0) {
                Modules_1.Play.DataPvp.gameBegan = false;
                this.labCountDownBig.string = this.remainTime + "";
                this.labCountDownBig.node.active = true;
                this.PlayUI.Audio.timeEndAudio();
            }
            // pvp教学的时候 begin
            // ai使用道具
            if (this.pvpAi) {
                this.aiUseProp();
            }
            // 10秒
            if ((this.pvpTeach || this.pvpAi) && this.remainTime == 60) {
                if (this.pvpTeach) {
                    PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.TIME60);
                }
            }
            if ((this.pvpTeach || this.pvpAi) && this.remainTime == 30) {
                if (this.pvpTeach) {
                    PlayManager_1.default.INSTANCE.PlayUI.layerGame.pvpGuide.setGuide(PlayDefine_1.GUIDE_TYPE.BUFF_TIP);
                }
            }
            // 0秒
            if ((this.pvpTeach || this.pvpAi) && this.remainTime <= 0) {
                Modules_1.Play.DataPlay.Phase = 1;
                if (this.pvpTeach) {
                    PlayManager_1.default.INSTANCE.PlayUI.onPlayFinish(null);
                }
                if (this.pvpAi) {
                    //send finish msg
                    var ai_finish = new ProtoSectionPlay_1.PlayAiFinishC2S();
                    ai_finish.saveAnimalCount = Modules_1.Play.DataPvp.myPetAllCnt;
                    if (Modules_1.Play.DataPvp.myPetAllCnt > Modules_1.Play.DataPvp.opponentPetAllCnt) {
                        ai_finish.winSide = Modules_1.Play.DataPlay.MySide;
                    }
                    else if (Modules_1.Play.DataPvp.myPetAllCnt == Modules_1.Play.DataPvp.opponentPetAllCnt) {
                        ai_finish.winSide = 0;
                    }
                    else {
                        ai_finish.winSide = Modules_1.Play.DataPlay.AiSide;
                    }
                    NetUtil_1.default.SendMsg(ai_finish);
                }
            }
        }
    };
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "nodBlueIcon", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "nodRedIcon", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labBlueName", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labRedName", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labBlueCount", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labRedCount", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labOutCount", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labCountDown", void 0);
    __decorate([
        property(cc.Sprite)
    ], PanelHeader.prototype, "sprBonusTime", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "sprGrayBg", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "sameLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "redLabel", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "greenLabel", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], PanelHeader.prototype, "fontGreen", void 0);
    __decorate([
        property({ type: cc.Asset })
    ], PanelHeader.prototype, "fontRed", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "nodBlueFace", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "nodRedFace", void 0);
    __decorate([
        property(cc.Label)
    ], PanelHeader.prototype, "labCountDownBig", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "nodBeyond", void 0);
    __decorate([
        property(cc.Node)
    ], PanelHeader.prototype, "nodTip", void 0);
    PanelHeader = __decorate([
        ccclass
    ], PanelHeader);
    return PanelHeader;
}(cc.Component));
exports.default = PanelHeader;

cc._RF.pop();