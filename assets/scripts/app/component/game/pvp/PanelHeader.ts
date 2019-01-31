
import { Play, Home } from "../../../module/Modules";
import { GUIDE_TYPE, ONE_GAME_TIME, PlaySide, FaceType, FaceAnimationType } from "../PlayDefine";
import PlayUI from "./PlayUI";
import PlayManager from "../PlayManager";
import { RoomPlayFinishS2C } from "../../../common/net/proto/mods/ProtoSectionRoom";
import NetUtil from "../../../common/net/NetUtil";
import { PlayAiFinishC2S } from "../../../common/net/proto/mods/ProtoSectionPlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelHeader extends cc.Component {
    @property(cc.Node)
    nodBlueIcon: cc.Node = null;

    @property(cc.Node)
    nodRedIcon: cc.Node = null;

    @property(cc.Label)
    labBlueName: cc.Label = null;

    @property(cc.Label)
    labRedName: cc.Label = null;

    @property(cc.Label)
    labBlueCount: cc.Label = null;

    @property(cc.Label)
    labRedCount: cc.Label = null;

    @property(cc.Label)
    labOutCount: cc.Label = null;

    @property(cc.Label)
    labCountDown: cc.Label = null;

    @property(cc.Sprite)
    sprBonusTime: cc.Sprite = null;

    @property(cc.Node)
    sprGrayBg: cc.Node = null;

    @property(cc.Node)
    sameLabel: cc.Node = null;
    @property(cc.Node)
    redLabel: cc.Node = null;
    @property(cc.Node)
    greenLabel: cc.Node = null;
    @property({ type: cc.Asset })
    fontGreen: cc.Asset = null;
    @property({ type: cc.Asset })
    fontRed: cc.Asset = null;

    @property(cc.Node)
    nodBlueFace: cc.Node = null;
    @property(cc.Node)
    nodRedFace: cc.Node = null;

    @property(cc.Label)
    labCountDownBig: cc.Label = null;

    @property(cc.Node)
    nodBeyond: cc.Node = null;

    @property(cc.Node)
    nodTip: cc.Node = null;

    public pvpTeach = false;
    public pvpAi = false;
    private _remainTime = 10;
    public passedTime = 0;

    PlayUI;

    // ai生成花朵策略相关标记位
    private bgr = -1;
    private rgb = -1;

    private myPetCnt = 0;
    private opponentPetCnt = 0;

    onLoad() {
        this.PlayUI = cc.find('Canvas').getComponent('PlayUI');
    }

    start() {
        this.setPlayMsg();
        this.init();
        // this.setProgress();
    }

    public get remainTime(): number {
        return this._remainTime;
    }
    public set remainTime(value: number) {
        this._remainTime = value;
        this.propTip();
    }

    // 可以使用道具提示
    propTip() {
        if (this._remainTime >= 120 || this._remainTime <= 0) {
            return;
        }

        if (this._remainTime % 10 !== 0) {
            return;
        }

        // console.log(Play.DataPvp.opponentBoardPetCnt);
        // 可以使用道具提示
        if (this.getPropCnt(1) > 0 && Play.DataPvp.getBoardPetCnt() >= 6) {
            if (!this.PlayUI.layerGame.bottom.canTouchSlot[0]) {
                return;
            }
            this.PlayUI.propTips(1);
        } else if (this.getPropCnt(2) > 0 && Play.DataPvp.opponentBoardPetCnt >= 4) {
            if (!this.PlayUI.layerGame.bottom.canTouchSlot[1]) {
                return;
            }
            this.PlayUI.propTips(2);
        } else if (Play.DataPvp.opponentPetAllCnt - Play.DataPvp.myPetAllCnt > 3) {
            if (this.getPropCnt(3) > 0 && this.getPropCnt(4) > 0) {
                let type = Math.random() > 0.5 ? 3 : 4;
                if (!this.PlayUI.layerGame.bottom.canTouchSlot[type - 1]) {
                    return;
                }
                this.PlayUI.propTips(type);
            } else if (this.getPropCnt(3) > 0) {
                if (!this.PlayUI.layerGame.bottom.canTouchSlot[2]) {
                    return;
                }
                this.PlayUI.propTips(3);
            } else if (this.getPropCnt(4) > 0) {
                if (!this.PlayUI.layerGame.bottom.canTouchSlot[3]) {
                    return;
                }
                this.PlayUI.propTips(4);
            }
        }
    }

    // 获取道具个数
    getPropCnt(type) {
        for (let i = 0; i < Home.DataPlayer.PlayerGoodsData.length; ++i) {
            if (Home.DataPlayer.PlayerGoodsData[i].goodsId === type) {
                return Home.DataPlayer.PlayerGoodsData[i].goodsNum;
            }
        }

        return 0;
    }

    public init() {
        this.remainTime = ONE_GAME_TIME;
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
    }

    // 加载头像
    public setHead(nodHead_1, nodHead_2) {
        nodHead_1.parent = this.nodBlueIcon;
        nodHead_2.parent = this.nodRedIcon;
        let scriptNodHead_1 = nodHead_1.getComponent('PlaymateHead');
        let scriptNodHead_2 = nodHead_2.getComponent('PlaymateHead');
        nodHead_1.setPosition(0, 0);
        nodHead_2.setPosition(0, 0);
        scriptNodHead_1.setSize(110, 110);
        scriptNodHead_2.setSize(110, 110);
        scriptNodHead_1.HeadUrl = Play.DataPlay.showHeadImg;
        scriptNodHead_2.HeadUrl = Play.DataPlay.OpponentHeadUrl;

        let blueHead = cc.instantiate(nodHead_1);
        let redHead = cc.instantiate(nodHead_2);
        this.setBeyondHead(blueHead, redHead);
    }

    // 设置超越的头像
    setBeyondHead(nodHead_1, nodHead_2) {
        nodHead_1.parent = cc.find('blue/blueMask/nodBlueIcon', this.nodBeyond);
        nodHead_2.parent = cc.find('red/redMask/nodRedIcon', this.nodBeyond);
        let scriptNodHead_1 = nodHead_1.getComponent('PlaymateHead');
        let scriptNodHead_2 = nodHead_2.getComponent('PlaymateHead');
        nodHead_1.setPosition(0, 0);
        nodHead_2.setPosition(0, 0);
        scriptNodHead_1.setSize(110, 110);
        scriptNodHead_2.setSize(110, 110);
        scriptNodHead_1.HeadUrl = Play.DataPlay.showHeadImg;
        scriptNodHead_2.HeadUrl = Play.DataPlay.OpponentHeadUrl;
    }

    // 设置玩家名字
    public setPlayMsg() {
        this.labBlueName.string = Play.DataPlay.MyName;
        this.labRedName.string = Play.DataPlay.OpponentName;
    }

    // 拯救宠物
    public getAnimal() {
        this.labBlueCount.string = "" + Play.DataPvp.petAllCnt;
        this.labRedCount.string = "" + Play.DataPvp.opponentPetAllCnt;

        this.showOutCount();
        // this.setProgress();

        // ai生成花朵策略
        if ((this.pvpTeach || this.pvpAi)) {
            if (this.pvpTeach && this.remainTime >= 50) {
                return;
            }
            if (Play.DataPvp.myPetAllCnt > Play.DataPvp.opponentPetAllCnt && this.bgr == -1) {
                // 超过
                this.rgb = -1;
                this.bgr = 1;
                this.PlayUI.genBlockResponse(Play.DataPlay.OpponentSide, 1);
            } else if (Play.DataPvp.myPetAllCnt == (Play.DataPvp.opponentPetAllCnt + 5)) {
                this.PlayUI.genBlockResponse(Play.DataPlay.OpponentSide, 3);
            } else if (Play.DataPvp.myPetAllCnt == (Play.DataPvp.opponentPetAllCnt + 10)) {
                this.PlayUI.genBlockResponse(Play.DataPlay.OpponentSide, 5);
            }
            if (Play.DataPvp.opponentPetAllCnt > Play.DataPvp.myPetAllCnt && this.rgb == -1) {
                // 超过
                this.rgb = 1;
                this.bgr = -1;
                this.PlayUI.genBlockResponse(Play.DataPlay.MySide, 1);
            } else if (Play.DataPvp.opponentPetAllCnt == (Play.DataPvp.myPetAllCnt + 5)) {
                this.PlayUI.genBlockResponse(Play.DataPlay.MySide, 2);
            } else if (Play.DataPvp.opponentPetAllCnt == (Play.DataPvp.myPetAllCnt + 10)) {
                this.PlayUI.genBlockResponse(Play.DataPlay.MySide, 3);
            }
        }
    }

    onBeyondAnimDone() {
        this.nodBeyond.active = false;
    }

    // 显示宠物收集情况
    private showOutCount() {
        let outCount = Play.DataPvp.myPetAllCnt - Play.DataPvp.opponentPetAllCnt;
        if (outCount > 0) {
            if (this.labOutCount.font == this.fontRed) {
                this.labOutCount.font = this.fontGreen;
            }
            this.redLabel.active = false;
            this.greenLabel.active = true;
            this.sameLabel.active = false;
            this.labOutCount.string = String(outCount);

            if (this.myPetCnt <= this.opponentPetCnt) {
                this.labBlueCount.node.runAction(cc.sequence(
                    cc.scaleTo(0.252, 2, 2),
                    cc.scaleTo(0.084, 1.8, 1.8),
                    cc.scaleTo(0.084, 2, 2),
                    cc.delayTime(1),
                    cc.scaleTo(0.252, 1, 1),
                ));

                cc.find('blue/score', this.nodBeyond).getComponent(cc.Label).string = '' + Play.DataPvp.myPetAllCnt;
                cc.find('red/score', this.nodBeyond).getComponent(cc.Label).string = '' + Play.DataPvp.opponentPetAllCnt;
                this.nodBeyond.active = true;
                this.nodBeyond.getComponent(cc.Animation).stop();
                this.nodBeyond.getComponent(cc.Animation).play('pvpBeyond');
                this.nodBeyond.getComponent(cc.Animation).on('finished', this.onBeyondAnimDone, this)
            }

        } else if (outCount < 0) {
            if (this.labOutCount.font == this.fontGreen) {
                this.labOutCount.font = this.fontRed;
            }
            this.redLabel.active = true;
            this.greenLabel.active = false;
            this.sameLabel.active = false;
            this.labOutCount.string = String(-outCount);

            if (this.myPetCnt >= this.opponentPetCnt) {
                this.labRedCount.node.runAction(cc.sequence(
                    cc.scaleTo(0.252, 2, 2),
                    cc.scaleTo(0.084, 1.8, 1.8),
                    cc.scaleTo(0.084, 2, 2),
                    cc.delayTime(1),
                    cc.scaleTo(0.252, 1, 1),
                ));
                cc.find('blue/score', this.nodBeyond).getComponent(cc.Label).string = '' + Play.DataPvp.myPetAllCnt;
                cc.find('red/score', this.nodBeyond).getComponent(cc.Label).string = '' + Play.DataPvp.opponentPetAllCnt;
                this.nodBeyond.active = true;
                this.nodBeyond.getComponent(cc.Animation).stop();
                this.nodBeyond.getComponent(cc.Animation).on('finished', this.onBeyondAnimDone, this)
                this.nodBeyond.getComponent(cc.Animation).play('pvpLag');
            }
        } else {
            // this.labOutCount.string = '不相上下';
            this.redLabel.active = false;
            this.greenLabel.active = false;
            this.sameLabel.active = true;
            this.labOutCount.string = '';
        }

        this.myPetCnt = Play.DataPvp.myPetAllCnt;
        this.opponentPetCnt = Play.DataPvp.opponentPetAllCnt;
    }

    // 提示时间
    remaindTime(time) {
        this.PlayUI.Audio.remaindTime();
        let content = this.nodTip.getChildByName('content');
        let label = content.getChildByName('label');
        label.getComponent(cc.Label).string = time + '秒';
        content.runAction(cc.sequence(
            cc.moveBy(0.2, 222, 0),
            cc.delayTime(2.5),
            cc.moveBy(0.2, -222, 0)
        ))
    }

    // 剩余时间
    getRemainTime() {
        var remainTime;
        if (this.pvpTeach) {
            remainTime = ONE_GAME_TIME - this.passedTime;
        } else {
            remainTime = ONE_GAME_TIME - (Date.now() - Play.DataPvp.beginTime) / 1000;
        }
        if (remainTime > 120) {
            remainTime = 120;
        }
        if (remainTime < 0) {
            remainTime = 0;
        }
        return remainTime;
    }

    closeFace() {
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
    }
    // 显示表情
    showFace(side, faceType: FaceType, animationType) {
        if (side === PlaySide.BLU) {
            this.nodBlueFace.active = true;
            this.unschedule(this.closeFace);
            this.scheduleOnce(this.closeFace, 2.5)
            if (faceType === FaceType.Sand) {
                this.nodBlueFace.getChildByName('sand').active = true;
                this.nodBlueFace.getChildByName('happy').active = false;
            } else {
                this.nodBlueFace.getChildByName('sand').active = false;
                this.nodBlueFace.getChildByName('happy').active = true;
            }

            if (animationType === FaceAnimationType.Xuayun) {
                this.nodBlueFace.getComponent(cc.Animation).play('vertigo');
            } else if (animationType === FaceAnimationType.Yanhua) {
                this.nodBlueFace.getComponent(cc.Animation).play('yanhua');
            } else if (animationType === FaceAnimationType.Yun) {
                this.nodBlueFace.getComponent(cc.Animation).play('cloudFace');
            }
        } else {
            this.nodRedFace.active = true;
            this.unschedule(this.closeFace);
            this.scheduleOnce(this.closeFace, 2.5)
            if (faceType === FaceType.Sand) {
                this.nodRedFace.getChildByName('sand').active = true;
                this.nodRedFace.getChildByName('happy').active = false;
            } else {
                this.nodRedFace.getChildByName('sand').active = false;
                this.nodRedFace.getChildByName('happy').active = true;
            }

            if (animationType === FaceAnimationType.Xuayun) {
                this.nodRedFace.getComponent(cc.Animation).play('vertigo');
            } else if (animationType === FaceAnimationType.Yanhua) {
                this.nodRedFace.getComponent(cc.Animation).play('yanhua');
            } else if (animationType === FaceAnimationType.Yun) {
                this.nodRedFace.getComponent(cc.Animation).play('cloudFace');
            }
        }
    }

    ////////////////////////////////////AI////////////////////////////////////////////////////////////
    // 随机使用道具的时间
    time1;
    time2;
    time3;
    time4;
    getUsePropRandomTime() {
        this.unUseProp = [1, 2, 3, 4];
        this.time1 = Math.floor(Math.random() * 25 + 10);
        this.time2 = Math.floor(Math.random() * 24 + 36);
        this.time3 = Math.floor(Math.random() * 24 + 61);
        this.time4 = Math.floor(Math.random() * 24 + 86);
        // console.log(this.time1);
        // console.log(this.time2);
        // console.log(this.time3);
        // console.log(this.time4);
    }

    // ai使用道具
    aiUseProp() {
        if (this.remainTime === this.time1) {
            this.useRandomProp();
        } else if (this.remainTime === this.time2) {
            this.useRandomProp();
        } else if (this.remainTime === this.time3) {
            this.useRandomProp();
        } else if (this.remainTime === this.time4) {
            this.useRandomProp();
        }
    }
    unUseProp = [1, 2, 3, 4];
    // 随机使用一个道具
    useRandomProp() {
        let propIndex = Math.floor(Math.random() * this.unUseProp.length);
        let propType = this.unUseProp.splice(propIndex, 1)[0];
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
    }
    ////////////////////////////////////AI////////////////////////////////////////////////////////////


    update(dt) {
        if (!Play.DataPvp.gameBegan) {
            return
        }
        this.passedTime += dt;
        let time = Math.floor(this.getRemainTime());

        if (this.remainTime != time && this.remainTime >= 0) {
            this.remainTime = time;
            this.labCountDown.string = this.remainTime + "";

            if (this.remainTime == 60) {
                this.remaindTime(60);
                Play.DataPvp.isSpawnStrongRocket = true;
                this.PlayUI.setToast('剩余60s，火箭升级');
            }
            if (this.remainTime == 30) {
                this.remaindTime(30);
            }

            let self = this;
            if (self.pvpTeach || self.pvpAi) {
                let randomTime = Math.random();
                self.scheduleOnce(function () {
                    if (self.remainTime > 1) {
                        let delta = Play.DataPvp.myPetAllCnt - Play.DataPvp.opponentPetAllCnt;
                        let jilv = 0;
                        if (delta <= -6) {
                            jilv = 0.01;
                        } else if (delta <= -3) {
                            jilv = 0.02;
                        } else if (delta <= 0) {
                            jilv = 0.05;
                        } else if (delta <= 3) {
                            jilv = 0.10;
                        } else if (delta <= 6) {
                            jilv = 0.20;
                        } else {
                            jilv = 0.30;
                        }
                        let randomNum = Math.floor(Math.random() + jilv);
                        Play.DataPvp.opponentPetAllCnt += randomNum;
                        if (randomNum != 0) {
                            self.getAnimal();
                        }
                    }
                }, randomTime);
            }

            // 小于10秒时开始倒计时声音
            if (this.remainTime < 10 && this.remainTime >= 1) {
                this.labCountDownBig.string = this.remainTime + "";
                this.labCountDownBig.node.active = true;
                let action = cc.sequence(
                    cc.callFunc(() => {
                        this.labCountDownBig.node.color = new cc.Color(255, 0, 0, 255);
                    }),
                    cc.delayTime(0.2),
                    cc.callFunc(() => {
                        this.labCountDownBig.node.color = new cc.Color(255, 255, 255, 255);
                    })
                );
                this.labCountDownBig.node.runAction(action);
                this.PlayUI.Audio.countDownAudio();
            } else if (this.remainTime <= 0) {
                Play.DataPvp.gameBegan = false;
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
                    PlayManager.INSTANCE.PlayUI.layerGame.pvpGuide.setGuide(GUIDE_TYPE.TIME60);
                }
            }
            if ((this.pvpTeach || this.pvpAi) && this.remainTime == 30) {
                if (this.pvpTeach) {
                    PlayManager.INSTANCE.PlayUI.layerGame.pvpGuide.setGuide(GUIDE_TYPE.BUFF_TIP);
                }
            }
            // 0秒
            if ((this.pvpTeach || this.pvpAi) && this.remainTime <= 0) {
                Play.DataPlay.Phase = 1;
                if (this.pvpTeach) {
                    PlayManager.INSTANCE.PlayUI.onPlayFinish(null);
                }
                if (this.pvpAi) {
                    //send finish msg
                    let ai_finish = new PlayAiFinishC2S();
                    ai_finish.saveAnimalCount = Play.DataPvp.myPetAllCnt;
                    if (Play.DataPvp.myPetAllCnt > Play.DataPvp.opponentPetAllCnt) {
                        ai_finish.winSide = Play.DataPlay.MySide;
                    } else if (Play.DataPvp.myPetAllCnt == Play.DataPvp.opponentPetAllCnt) {
                        ai_finish.winSide = 0;
                    } else {
                        ai_finish.winSide = Play.DataPlay.AiSide;
                    }
                    NetUtil.SendMsg(ai_finish);
                }
            }
        }
    }
}
