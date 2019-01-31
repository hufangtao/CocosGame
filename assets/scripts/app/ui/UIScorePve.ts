import PlayUIPve from "../component/game/pve/PlayUIPve";
import { OBJECTIVE_TYPE } from "../component/game/PlayDefine";
import { PlayStartPveC2S } from "../common/net/proto/mods/ProtoSectionPlay";
import DYAudio from "../../dyGame/DYAudio";
import { UIFunc } from "../common/UIFunc";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import { Play } from "../module/Modules";
import PlayManager from "../component/game/PlayManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScorePve extends cc.Component {
    @property(cc.SpriteFrame)
    spfCross: cc.SpriteFrame = null;

    @property(cc.Node)
    nodSprWin: cc.Node = null;
    @property(cc.Node)
    nodSprLose: cc.Node = null;

    @property(cc.Node)
    nodBtnNextLevel: cc.Node = null;

    @property(cc.Node)
    nodNextLevelBtn: cc.Node = null;

    @property(cc.Node)
    nodObjective_score: cc.Node = null;

    @property(cc.Node)
    nodStar: cc.Node = null;

    @property(cc.Label)
    labLevel: cc.Label = null;
    @property(cc.Label)
    labScoreWin: cc.Label = null;
    @property(cc.Label)
    labScoreLose: cc.Label = null;

    @property(cc.Label)
    labEnergy: cc.Label = null;

    gameOver = false;
    _game: PlayUIPve;
    hadBalance: boolean = false;
    onEnable() {
        this.hadBalance = false;
    }
    onDisable() {
        this.gameOver = false;
    }

    init(game) {
        this._game = game;
    }

    public win() {
        if (this.gameOver) {
            return;
        }
        if (this.hadBalance) {
            return;
        }
        this.hadBalance = true;
        this.gameOver = true;
        cc.find('Canvas').getComponent('PlayUIPve').Audio.victory();
        this.nodBtnNextLevel.active = true;
        this.node.getChildByName('panelWin').active = true;
        this.node.getChildByName('panelLose').active = false;
        this.nodBtnNextLevel.setSiblingIndex(0);

        this.labLevel.string = '第' + Play.DataPve.curLevel + '关';
        this.labScoreWin.string = Play.DataPve.score + '';

        this.nodSprWin.active = true;
        this.nodSprLose.active = false;
        let level = Play.DataPve.curLevel + 1;
        let levelData = Play.LevelDatas['level_' + level];
        if (!levelData) {
            //console.log('已经是最后一局')
        }
        this.node.active = true;
        this.nodNextLevelBtn.active = true;

        var starCnt = this.calculateStar(Play.DataPve.score, level - 1);

        this.showStar(starCnt);

        // 3星 5体力
        // 2星 3
        // 1星 1
        if (starCnt == 3) {
            this.labEnergy.node.parent.active = true;
            this.labEnergy.string = '5';
        } else if (starCnt == 2) {
            this.labEnergy.node.parent.active = true;
            this.labEnergy.string = '3';
        } else if (starCnt == 1) {
            this.labEnergy.node.parent.active = true;
            this.labEnergy.string = '1';
        } else {
            this.labEnergy.node.parent.active = false;
        }
    }

    public lose() {
        if (this.gameOver) {
            return;
        }
        if (this.hadBalance) {
            return;
        }
        this.hadBalance = true;
        this.gameOver = true;
        cc.find('Canvas').getComponent('PlayUIPve').Audio.lose();
        this.nodBtnNextLevel.active = false;
        this.node.getChildByName('panelWin').active = false;
        this.node.getChildByName('panelLose').active = true;
        this.nodBtnNextLevel.setSiblingIndex(3);

        this.labLevel.string = '第' + Play.DataPve.curLevel + '关';
        this.labScoreLose.string = Play.DataPve.score + '';

        this.nodSprWin.active = false;
        this.nodSprLose.active = true;
        this.node.active = true;
        this.nodNextLevelBtn.active = false;

        this.showUnFinishedObjectives();
    }

    showUnFinishedObjectives() {
        for (let i = 0; i < this.nodObjective_score.children.length; ++i) {
            this.nodObjective_score.children[i].active = false;
        }

        let arrUnFinished = Play.DataPve.getObjectivesUnFinished();

        for (let i = 0; i < arrUnFinished.length; ++i) {
            let objective = this.nodObjective_score.children[arrUnFinished[i].index];
            objective.active = true;
            let nodTile = this._game.layerGame.panelHeader.nodObjective.children[arrUnFinished[i].index].getChildByName('sprite').children[0];
            nodTile.parent = objective.getChildByName('nodTile')

            if (arrUnFinished[i].objectiveType === OBJECTIVE_TYPE.QUESTION) {
                objective.getChildByName('question').active = true;
            } else {
                objective.getChildByName('question').active = false;
            }

            objective.getChildByName('sprCross').active = false;

            this.scheduleOnce(function () {
                objective.getComponent(cc.Animation).play();
            }.bind(this, i), (i + 1) * 0.5)
        }

    }

    private async delay(time) {
        return new Promise<any>((resolve, reject) => {
            this.scheduleOnce(function () {
                resolve();
            }, time)
        })
    }

    calculateStar(score, level) {
        var _score = Play.LevelDatas['level_' + level].score;
        if (!_score) {
            return
        }
        var starCnt = 0;
        if (score >= _score[2]) {
            starCnt = 3;
        } else if (score >= _score[1]) {
            starCnt = 2;
        } else if (score >= _score[0]) {
            starCnt = 1;
        } else {
            starCnt = 0;
        }
        return starCnt;
    }
    async showStar(starCnt) {
        this.nodStar.active = true;
        for (let i = 0; i < 3; ++i) {
            this.nodStar.children[i].children[1].active = false;
            this.nodStar.children[i].children[2].active = false;
        }
        for (let i = 0; i < starCnt; ++i) {
            this.nodStar.children[i].getComponent(cc.Animation).play('pveStar');
            await this.delay(0.17)
        }

    }


    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnNextLevel':
                GamePersist.INSTANCE.btnAudio_1();
                this._game.nextLevel();
                break;
            case 'btnContinue':
                GamePersist.INSTANCE.btnAudio_1();
                var startPve = new PlayStartPveC2S();
                PlayManager.INSTANCE.PveEnterType = 2;
                NetUtil.SendMsg(startPve);
                // this.playAgain();
                break;
            case 'btnGameBack':
                GamePersist.INSTANCE.btnAudio_1();
                DYAudio.stopMusic();
                GamePersist.INSTANCE.loadScene('levelChoose');
                UIFunc.closeUI('UIScorePve', (node) => { })
                break;
        }
    }
}
