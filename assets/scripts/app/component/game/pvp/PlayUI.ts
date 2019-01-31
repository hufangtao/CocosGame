import BaseUI from "../../BaseUI";
import PlayManager from "../PlayManager";
import PanelHeader from "./PanelHeader";
import { Home, Play } from "../../../module/Modules";
import { RoomPlayFinishS2C } from "../../../common/net/proto/mods/ProtoSectionRoom";
import LayerGame from "./LayerGame";
import GamePersist from "../../../common/persist/GamePersist";
import * as Modules from "../../../module/Modules";
import { OpenHomeFrom } from "../../../common/Defines";
import { PlayGuideFinishC2S, PlayAiFinishC2S, PlayGiveUpC2S, PlayContinueC2S, PlayActiveBuffS2C, PlayStolenAnimalS2C, PlayBoardStatusS2C } from "../../../common/net/proto/mods/ProtoSectionPlay";
import NetUtil from "../../../common/net/NetUtil";
import Audio from "../Audio";
import { GAME_MODEL, PlaySide, ColorType, FaceType, FaceAnimationType } from "../PlayDefine";
import DYAudio from "../../../../dyGame/DYAudio";
import { UIFunc } from "../../../common/UIFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayUI extends BaseUI {
    @property(cc.Node)
    panelHeaderNode: cc.Node = null;
    @property(PanelHeader)
    panelHeader: PanelHeader = null;

    @property(cc.Node)
    layerGameNode: cc.Node = null;
    @property(LayerGame)
    layerGame: LayerGame = null;

    @property(cc.Node)
    readyGoAction: cc.Node = null;

    @property(cc.Node)
    spriteGameOver: cc.Node = null;

    @property(cc.Node)
    spritegrayBg: cc.Node = null;

    @property(Audio)
    Audio: Audio = null;

    private nodHead_1;
    private nodHead_2;

    public onLoad() {
        super.onLoad();
        PlayManager.INSTANCE.PlayUI = this;
        Play.GameModel = GAME_MODEL.PVP;

        this.layerGameNode.active = true;

        this.layerGame.init(this);
        Play.DataPvp.playUI = this;
        Play.DataPvp.layerGame = this.layerGame;
        Play.DataPvp.gameOver = false;
        this.hideHomeAd();
        window['Partner'].hideGameClub();
    }

    public start() {
        super.start();
        this.Audio.playBg();
    }
    onLoadSceneEnd() {
        this.init();
    }

    async init() {
        this.setPrefab();
        this.layerGame.gameBegain();
        this.beReady(0);

        this.loadHead();

        this.layerGameNode.active = true;
    }
    hideHomeAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].hideHomeAd();
        }
    }
    setPrefab() {
        Play.DataPvp.pfbScore = this.layerGame.pfbScore;
        Play.DataPvp.pfbBlock = this.layerGame.pfbBlock;
        Play.DataPvp.pfbBomb = this.layerGame.pfbBomb;
        Play.DataPvp.pfbObstacle = this.layerGame.pfbObstacle;
        Play.DataPvp.pfbTileBg = this.layerGame.pfbTileBg;
        Play.DataPvp.pfbEncourage = this.layerGame.pfbEncourage;
        Play.DataPvp.pfbWall = this.layerGame.pfbWall;
    }

    public async loadHead() {
        let res = await this.loadRes('prefab/component/PlaymateHead');
        this.nodHead_1 = cc.instantiate(res);
        this.nodHead_2 = cc.instantiate(res);
        this.panelHeader.setHead(this.nodHead_1, this.nodHead_2);
    }

    // 准备好了 可以指定延迟时间后, 再通知服务器
    private beReady(delay: number = 0) {
        if (delay > 0) {
            // delay秒后通知服务器 确认进入房间
            this.scheduleOnce(function () {
                PlayManager.INSTANCE.readyRequest();
            }, delay);
        } else {
            PlayManager.INSTANCE.readyRequest();
        }
    }

    public newRound() {
        if (this.layerGame.pvpTeach) {
            cc.log('readygoAction');
            this.readygoAction();
            this.onReadyResponse();
        } else {
            // if (this.layerGame.pvpAi) {
            // cc.log('readygoAction');
            // this.readygoAction();
            // }

        }
        GamePersist.INSTANCE.onLoadSceneEnd();
        this.layerGame.canTouch = true;
    }

    public onReadyResponse() {
        if (!PlayManager.INSTANCE.PlayUI.layerGame.pvpTeach) {
            cc.log('readygoAction');
            this.readygoAction();
        }
        if (this.fristGame) {
            // else {
            //     console.log("guide---------", PlayManager.INSTANCE.PlayUI.layerGame.pvpTeach);
            //     this.layerGame.guide();
            // }
        }
    }

    public getAnimal(saveCount, animalSide) {
        if (animalSide === Play.DataPlay.MySide) {
            Play.DataPvp.myPetAllCnt = saveCount;
        } else {
            Play.DataPvp.opponentPetAllCnt = saveCount;
        }
        this.panelHeader.getAnimal();
    }

    // 一局结束 加载结算页面
    public onPlayFinish(playResult: RoomPlayFinishS2C) {
        this.layerGame.gameOver();
        Play.DataPvp.gameBegan = false;
        Play.DataPvp.gameOver = true;
        if (this.layerGame.pvpTeach) {
            this.loadGuideOver();
        } else {
            this.spriteGameOver.active = true;
            let anim = this.spriteGameOver.getComponent(cc.Animation);
            anim.play('aniGameOver');
            anim.targetOff('finished');
            anim.on('finished', () => {
                this.loadLayerScore(playResult);
                PlayManager.INSTANCE.onPvpFinish(this.layerGame.maxMatchCount);
            }, this);
        }
    }

    // 加载guideover预制
    loadGuideOver() {
        GamePersist.INSTANCE.ForceWaiting();
        cc.loader.loadRes('prefab/play/pvp/GuideOver', cc.Prefab, (err, prefab) => {
            this.spriteGameOver.active = false;
            let node = cc.instantiate(prefab);
            node.parent = this.node;
            GamePersist.INSTANCE.CancelWaiting();
            node.on("touchstart", function () {
                Modules.Home.OpenHomeFrom = OpenHomeFrom.UI_GUIDE;
                PlayManager.INSTANCE.onBack();
            });
            let guideFinish = new PlayGuideFinishC2S();
            guideFinish.guideFinish = 1;
            NetUtil.SendMsg(guideFinish);
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        });
    }

    hadLoadLayerScore = false;
    //加载score
    loadLayerScore(playResult: RoomPlayFinishS2C) {
        if (this.hadLoadLayerScore) {
            return;
        }
        this.hadLoadLayerScore = true;
        
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIScorePvp',(node)=>{
            this.spriteGameOver.active = false;
            GamePersist.INSTANCE.CancelWaiting();
            let UIScorePvp = node.getComponent('UIScorePvp');
            UIScorePvp.init(this);
            UIScorePvp.playFinish(playResult, this.nodHead_1);
        })
        
    }

    // 再来一局确认开始
    public didOneMorePlay() {

    }

    public setContinueBtn(type) {
        let layerScoreNode = this.node.getChildByName('UIScorePvp');
        if (layerScoreNode) {
            layerScoreNode.getComponent('UIScorePvp').setContinueBtn(type);
        }
    }

    fristGame = true;
    // 再来一局
    public onOneMorePlay() {
        this.Audio.playBg();
        this.fristGame = false;
        this.hadLoadLayerScore = false;
        this.layerGameNode.active = true;
        this.layerGame.gameBegain();
        this.beReady(0);
        this.loadHead();
        this.panelHeader.init();
    }

    public uiName(): string {
        return "PlayUI";
    }

    private async loadRes(url) {
        return new Promise<any>((resolve, reject) => {
            cc.loader.loadRes(url, (err, res) => {
                if (err) {
                    resolve(null)
                } else {
                    resolve(res)
                }
            })
        })
    }

    // 一方投掷了一个花朵
    genBlockResponse(genSide, row) {
        // 关闭花朵产生
        return;
        if (genSide == Play.DataPlay.MySide) {
            this.setToast('对手不屑地丢给你一朵花', ColorType.Red);
            this.layerGame.gainFlower(row);
            this.Audio.flower();
        } else {
            this.setToast('对手也不过如此嘛，送ta朵花好了', ColorType.Green);
        }
    }

    // 一方使用了道具
    onActiveBuff(data: PlayActiveBuffS2C) {
        if (data.effected === 0) {
            return;
        }
        if (data.effectSide === Play.DataPlay.MySide) {
            this.effectPlayer(data.buffId);
        } else {
            this.effectOpponent(data.buffId);
        }
    }

    // 偷取宠物
    onStolenAnimal(data: PlayStolenAnimalS2C) {
        if (data.animalSide === Play.DataPlay.MySide) {
            if (data.stealCount > 0) {
                this.setToast('嘿嘿，偷偷拿几个ta不知道', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,FaceAnimationType.Xuayun);
                this.layerGame.grabPet(data.stealCount);
                this.Audio.buff2();
            } else {
                this.setToast('额，ta怎么1个宠物都没有', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yanhua);
                this.Audio.miss();
            }
        } else {
            if (data.stealCount > 0) {
                this.setToast('天，对手偷偷拿了你的宠物', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yanhua);
                this.Audio.trick();
            } else {
                this.setToast('晕，你啥都没有，恰好对方一无所获', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,FaceAnimationType.Xuayun);
                this.Audio.opponentMiss();
            }
        }
    }

    // 更新棋盘上的宠物数量
    onBoardStatusResponse(data: PlayBoardStatusS2C) {
        if (data.side !== Play.DataPlay.MySide) {
            Play.DataPvp.opponentBoardPetCnt = data.animalNum;
        }
    }


    // 影响到对手
    effectOpponent(propType) {
        switch (propType) {
            case 1:
                this.setToast('对手汇聚洪荒之力，消灭了ta看到的一切', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yanhua);
                break;
            case 2:
                break;
            case 3:
                this.setToast('给你遮上眼睛，看你还剩几分能耐', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,null);
                this.Audio.buff3();
                break;
            case 4:
                this.setToast('捣乱ta是我的乐趣', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,FaceAnimationType.Xuayun);
                this.Audio.buff3();
                break;
        }
    }
    // 影响到我
    effectPlayer(propType) {
        switch (propType) {
            case 1:
                this.setToast('啊啊啊，我的小宇宙爆发啦', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,FaceAnimationType.Xuayun);
                this.layerGame.destroyAllTiles();
                this.Audio.buff1();
                break;
            case 2:
                this.layerGame.losePet();
                break;
            case 3:
                this.setToast('对手不想和你说话，给你一朵云自己体会', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,null);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yun);
                this.layerGame.showCloud();
                this.Audio.trick();
                break;
            case 4:
                this.setToast('对手气急败坏地想扰乱你的节奏', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yanhua);
                this.Audio.trick();
                this.scheduleOnce(() => {
                    this.layerGame.prop4();
                    this.Audio.buff4();
                }, 2)
                break;
        }
    }

    iUseProp(propType) {
        switch (propType) {
            case 1:
                this.setToast('啊啊啊，我的小宇宙爆发啦', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,FaceAnimationType.Xuayun);
                this.layerGame.destroyAllTiles();
                this.Audio.buff1();
                break;
            case 2:
                // this.setToast('我使用了吸取');
                this.layerGame.grabPet(null);
                break;
            case 3:
                this.setToast('给你遮上眼睛，看你还剩几分能耐', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,null);
                this.Audio.buff3();
                break;
            case 4:
                this.setToast('捣乱ta是我的乐趣', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy,FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand,FaceAnimationType.Xuayun);
                this.Audio.buff3();
                break;
        }
    }
    opponentUseProp(propType) {
        switch (propType) {
            case 1:
                this.setToast('对手汇聚洪荒之力，消灭了ta看到的一切', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yanhua);
                break;
            case 2:
                // this.setToast('对手使用了吸取');
                this.layerGame.losePet();
                break;
            case 3:
                this.setToast('对手不想和你说话，给你一朵云自己体会', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,null);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yun);
                this.layerGame.showCloud();
                this.Audio.trick();
                break;
            case 4:
                this.setToast('对手气急败坏地想扰乱你的节奏', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand,FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy,FaceAnimationType.Yanhua);
                this.Audio.trick();
                this.scheduleOnce(() => {
                    this.layerGame.prop4();
                    this.Audio.buff4();
                }, 2)
                break;
        }
    }

    // 道具提示
    propTips(type) {
        this.layerGame.bottom.propTips(type);
    }

    public continue() {
        let playContinue = new PlayContinueC2S();
        NetUtil.SendMsg(playContinue);
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'backButton':
                GamePersist.INSTANCE.btnAudio_1();
                if (!PlayManager.INSTANCE.PlayUI.layerGame.pvpTeach) {
                    UIFunc.openUI('UIQuitConfirmPvp',(node)=>{
                        GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
                    })
                } else {
                    this.setToast("请先完成教学哦");
                }
                break;
            case 'btnShowTip':
                GamePersist.INSTANCE.btnAudio_1();
                this.loadPvpTip();
                break;
        }
    }

    hadLoadPvpTip = false;
    // 加载pvp提示
    loadPvpTip() {
        if (this.hadLoadPvpTip) {
            return;
        }
        this.hadLoadPvpTip = true;
        UIFunc.openUI('UIPvpTips',(node)=>{
            node.parent = this.node;
            let btnEvent = function () {
                UIFunc.closeUI('UIPvpTips',()=>{})
            }
            node.getChildByName('btnBack1').on('click', btnEvent, this);
            this.hadLoadPvpTip = false;
        })
    }

    //显示ReadyGo
    public readygoAction() {
        let self = this;
        self.Audio.readyGo();
        this.scheduleOnce(() => {
            self.readyGoAction.active = true;
            self.readyGoAction.getComponent(cc.Animation).play("readyGo");
            self.readyGoAction.getComponent(cc.Animation).on('finished', this.closeReadyGo, this);
        }, 0.2);
    }

    closeReadyGo() {
        this.readyGoAction.active = false;
        this.layerGame.guide();
        Play.DataPvp.gameBegan = true;
        Play.DataPvp.gameOver = false;
        Play.DataPvp.beginTime = Date.now();
        Play.DataPvp.saveCurRank();
        Play.DataPvp.saveCurGrade();
        this.layerGame.sendBoardPetCnt();
    }

    onDestroy() {
    }

    setToast(msg: string, colorType?:ColorType) {
        let toast = GamePersist.INSTANCE.toast(msg,colorType,2.5);
        for (let i = 0; i < toast.node.parent.children.length; ++i) {
            toast.node.parent.children[i].runAction(cc.moveBy(0.2, 0, 100));
        }
    }

}