import BaseUI from "../../BaseUI";
import PanelHeaderPve from "./PanelHeaderPve";
import { PlayPveFinishC2S, PlayStartPveC2S } from "../../../common/net/proto/mods/ProtoSectionPlay";
import { Home, Play } from "../../../module/Modules";
import GamePersist from "../../../common/persist/GamePersist";
import DYAudio from "../../../../dyGame/DYAudio";
import Audio from "../Audio";
import PlayManager from "../PlayManager";
import NetUtil from "../../../common/net/NetUtil";
import NodePool from "../NodePool";
import StateMgr from "./StateMgr";
import { ValueKey } from "../../../common/Defines";
import { PlayerWatchAdC2S } from "../../../common/net/proto/mods/ProtoSectionPlayer";
import SocialManager from "../../../common/social/SocialManager";
import { UIFunc } from "../../../common/UIFunc";
import UIScorePve from "../../../ui/UIScorePve";
import { Message } from "../../../common/Message";
import { GAME_MODEL } from "../PlayDefine";
import LayerGamePve from "./LayerGamePve";
import { DYNotify } from "../../../../dyGame/DYNotify";
import HomeModule from "../../page/home/HomeModule";
import * as Modules from "../../../module/Modules";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayUIPve extends BaseUI {
    @property(cc.Node)
    panelHeaderNode: cc.Node = null;
    @property(PanelHeaderPve)
    panelHeader: PanelHeaderPve = null;

    @property(cc.Node)
    layerGameNode: cc.Node = null;
    @property(LayerGamePve)
    layerGame: LayerGamePve = null;

    @property(Audio)
    Audio: Audio = null;

    dataPlay = null;

    UIScorePve: UIScorePve;
    isOver = false;
    isBonusOver = false;

    public async onLoad() {
        super.onLoad();
        StateMgr.INSTANCE.init();
        PlayManager.INSTANCE.PlayUIPve = this;
        Play.GameModel = GAME_MODEL.PVE;

        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify.regObserver(Message.GAME_WIN, this.onNotify, this);
        DYNotify.regObserver(Message.GAME_LOST, this.onNotify, this);

        this.layerGame.init(this);
        // this.showOverAd();
        UIFunc.closeUI('UIScorePve',(node)=>{})
        window['Partner'].hideGameClub();
    }

    showOverAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].showOverAd();
        }
    }
    hideOverAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].hideOverAd();
        }
    }
    public start() {
        super.start();

        this.layerGameNode.active = true;
        this.isOver = false;
        this.isBonusOver = false;

        this.Audio.playBg();

    }
    onLoadSceneEnd() {
        this.init();
    }
    public uiName(): string {
        return "PlayUIPve";
    }

    async init() {
        this.setPrefab();
        NodePool.initPool();
        this.layerGame.loadLevelData(()=>{
            GamePersist.INSTANCE.onLoadSceneEnd();
            this.layerGame.gameBegin();
        });
    }

    setPrefab() {
        Play.DataPve.pfbScore = this.layerGame.pfbScore;
        Play.DataPve.pfbBlock = this.layerGame.pfbBlock;
        Play.DataPve.pfbBomb = this.layerGame.pfbBomb;
        Play.DataPve.pfbObstacle = this.layerGame.pfbObstacle;
        Play.DataPve.pfbWall = this.layerGame.pfbWall;
        Play.DataPve.pfbTableware = this.layerGame.pfbTableware;
        Play.DataPve.pfbTransport = this.layerGame.pfbTransport;
        Play.DataPve.pfbGate = this.layerGame.pfbGate;
        Play.DataPve.pfbBonusBall = this.layerGame.pfbBonusBall;
        Play.DataPve.pfbTileBg = this.layerGame.pfbTileBg;
    }

    nextLevel() {
        let level = Play.DataPve.curLevel + 1;
        let levelData = Play.LevelDatas['level_' + level];
        if (!levelData) {
            GamePersist.INSTANCE.toast('程序员小哥哥还在加班开发中');
            return
        }
        var startPve = new PlayStartPveC2S();
        PlayManager.INSTANCE.PveEnterType = 1;
        NetUtil.SendMsg(startPve);
    }

    loadGame() {
        let level = Play.DataPve.curLevel + 1;
        if (level <= Home.DataPlayer.Level + 1) {
            Play.DataPve.clearFreeNodes();
            Play.DataPve.curLevel = level;
            GamePersist.INSTANCE.loadScene('pve_game');
            this.hideOverAd();
        }
    }

    loseGame() {
        let playPveFinishC2S = new PlayPveFinishC2S();
        playPveFinishC2S.pveId = Play.DataPve.curLevel;
        playPveFinishC2S.pveWin = 2;
        playPveFinishC2S.pveScore = Play.DataPve.score;
        playPveFinishC2S.remainStepsTime = Play.DataPve.saveStep > Play.DataPve.saveTime ? Play.DataPve.saveStep : Play.DataPve.saveTime;
        window['Partner'].postMsg(4, { valuekey: ValueKey.levelScore, score: Play.DataPve.score });

        // 更新社交需要的数据
        SocialManager.INSTANCE.setUserStar(Modules.Home.DataPlayer.FortuneStar + Modules.Home.DataPlayer.PlayCntWin / Modules.Home.DataPlayer.PlayCntTotal);
        NetUtil.SendMsg(playPveFinishC2S);
        DYNotify.post(Message.GAME_LOST)
    }

    playAgain() {
        Play.DataPve.clearFreeNodes();
        GamePersist.INSTANCE.loadScene('pve_game');
        this.hideOverAd();
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnNextLevel':
                GamePersist.INSTANCE.btnAudio_1();
                this.nextLevel();
                break;
            case 'btnContinue':
                GamePersist.INSTANCE.btnAudio_1();
                var startPve = new PlayStartPveC2S();
                PlayManager.INSTANCE.PveEnterType = 2;
                NetUtil.SendMsg(startPve);
                // this.playAgain();
                break;
            case 'btnBack':
                GamePersist.INSTANCE.btnAudio_1();
                // GamePersist.INSTANCE.blockInput();
                this.pauseGame();
                break;
        }
    }

    public onAppHide() {
        window['Partner'].hideOverAd();
    }

    pauseGame() {
        UIFunc.openUI('UIQuick', (node) => {
            GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'), () => {

            });
        })
        Play.DataPve.gameBegan = false;
    }

    private async onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.GAME_WIN) {
            self.showScore(1);
        } else if (tag == Message.GAME_LOST) {
            self.showScore(0);
        } else if (tag == Message.GET_SHARE_CNT) {
            if(param.reason != 1){
                return;
            }
            if (param.success === 1) {
                self.showEnergyEmpty(2);
            }
        }
    }

    // 看广告回调
    onWatchAd() {
        UIFunc.closeUI('UIAddStep', () => { })
        if (Play.DataPve.levelData.time > 0) {
            StateMgr.INSTANCE.isStopOperate = false;
            Play.DataPve.hadAddStep = true;
            Play.DataPve.remainTime = 10;
            this.panelHeader.updateTime();
        } else {
            StateMgr.INSTANCE.isStopOperate = false;
            Play.DataPve.hadAddStep = true;
            Play.DataPve.remainStep = 5;
            this.panelHeader.updateLabelStep();
        }
    }

    loadUIScorePve() {
        this.hideOverAd();
        UIFunc.openUI('UIScorePve', (node) => {
            this.UIScorePve = node.getComponent('UIScorePve');

            if (this.canshowScore) {
                this.UIScorePve.init(this);
                if (this.scoreType === 0) {
                    this.UIScorePve.lose();
                } else {
                    this.UIScorePve.win();
                }
            }
        });
    }

    canshowScore = false;
    scoreType;
    // 0失败,1成功
    showScore(type) {
        if (this.canshowScore) {
            return;
        }
        if (this.UIScorePve) {
            this.UIScorePve.init(this);
            if (type === 0) {
                this.UIScorePve.lose();
            } else {
                this.UIScorePve.win();
            }
        } else {
            this.loadUIScorePve();
            this.canshowScore = true;
            this.scoreType = type;
        }
    }

    showEnergyEmpty(mode) {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIEnergy', (node) => {
            node.getComponent('UIEnergy').setMode(mode);
            GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
            GamePersist.INSTANCE.CancelWaiting();
        })
    }

    onDestroy() {
        DYNotify.removeAllObservers(this);
    }

}