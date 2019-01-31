import {TILE_TYPE, BOMB_TYPE, BLOCK_COLOR } from "../PlayDefine";
import StateMgr from "./StateMgr";
import { Play } from "../../../module/Modules";
import { DYNotify } from "../../../../dyGame/DYNotify";
import panelGuidePve from "./panelGuidePve";

const { ccclass, property } = cc._decorator;
@ccclass
export default class PanelHeaderPve extends cc.Component {
    public static get INSTANCE() {
        return PanelHeaderPve.singleInstance;
    }
    private static singleInstance: PanelHeaderPve;

    @property(cc.Label)
    labCountDown: cc.Label = null;
    @property(cc.Label)
    labLevel: cc.Label = null;
    @property(cc.Label)
    labScore: cc.Label = null;
    @property(cc.Prefab)
    pfbTableware: cc.Prefab = null;

    @property(cc.Node)
    nodObjective: cc.Node = null;

    @property(cc.Node)
    nodLastTime: cc.Node = null;
    @property(cc.Node)
    nodLastStep: cc.Node = null;

    @property(cc.Node)
    nodPanelTile: cc.Node = null;

    @property(panelGuidePve)
    panelGuide: panelGuidePve = null;

    @property(cc.Node)
    nodGameOver: cc.Node = null;

    @property(cc.Node)
    nodScoreProgress: cc.Node = null;

   

    private objective = null;

    private layerGame = null;

    public leaves = 0;

    private passedTime = 0;
    private remainTime = 10;

    public _isObjectiveDone = [false, false, false, false, false];
    PlayUI;
    onLoad() {
        this.PlayUI = cc.find('Canvas').getComponent('PlayUIPve');

        PanelHeaderPve.singleInstance = this;

        this.nodLastTime.active = false;
        this.nodLastStep.active = false;


    }

    // 设置目标位置
    saveObjectivesPs() {
        let index = 0;
        for (let i = 0; i < Play.DataPve.objectives.length; ++i) {
            for (let j = 0; j < Play.DataPve.objectives[i].length; ++j) {
                var sprite = this.nodObjective.children[index].getChildByName('sprite');
                let p_world = sprite.parent.convertToWorldSpaceAR(sprite.getPosition());
                let p_node = this.nodPanelTile.convertToNodeSpaceAR(p_world);
                Play.DataPve.objectives[i][j].position = p_node;
                index++;
            }
        }
    }

    async gameOver() {
        return new Promise((resolve, reject) => {
            this.nodGameOver.active = true;
            let anim = this.nodGameOver.getComponent(cc.Animation);
            anim.play('aniBonusTime');
            anim.on('finished', () => {
                this.nodGameOver.active = false;
                resolve();
            }, this)

        })
    }

    public isObjectiveDone(tileType, type) {
        for (let i = 0; i < this.objective.length; ++i) {
            if (this.objective[i].tileType == tileType && this.objective[i].type == type) {
                return this._isObjectiveDone[i];
            }
        }
        return true;
    }

    updateScore(score) {
        this.getScore(score);
    }

    getScore(score) {
        this.labScore.string = score + '';

        var nodBg = this.nodScoreProgress.getChildByName('nodBg');
        var nodBar = this.nodScoreProgress.getChildByName('nodBar');
        var nodStar = this.nodScoreProgress.getChildByName('nodStar');

        var _score = Play.LevelDatas['level_' + Play.DataPve.curLevel].score;

        nodBar.width = score / _score[3] * nodBg.width;

        var ps_1 = nodBg.convertToWorldSpaceAR(cc.v2(_score[0] / _score[3] * nodBg.width, 0));
        var ps_2 = nodBg.convertToWorldSpaceAR(cc.v2(_score[1] / _score[3] * nodBg.width, 0));
        var ps_3 = nodBg.convertToWorldSpaceAR(cc.v2(_score[2] / _score[3] * nodBg.width, 0));
        nodStar.children[0].x = nodStar.convertToNodeSpaceAR(ps_1).x;
        nodStar.children[1].x = nodStar.convertToNodeSpaceAR(ps_2).x;
        nodStar.children[2].x = nodStar.convertToNodeSpaceAR(ps_3).x;

        nodStar.children[3].x = nodStar.convertToNodeSpaceAR(ps_1).x;
        nodStar.children[4].x = nodStar.convertToNodeSpaceAR(ps_2).x;
        nodStar.children[5].x = nodStar.convertToNodeSpaceAR(ps_3).x;

        if (score >= _score[2]) {
            for (let x = 3; x < 6; ++x) {
                if (!nodStar.children[x].active) {
                    nodStar.children[x].active = true;
                    nodStar.children[x].getComponent(cc.Animation).play('aniSpawnStar');
                }
            }
        } else if (score >= _score[1]) {
            for (let x = 3; x < 5; ++x) {
                if (!nodStar.children[x].active) {
                    nodStar.children[x].active = true;
                    nodStar.children[x].getComponent(cc.Animation).play('aniSpawnStar');
                }
            }
            nodStar.children[5].active = false;
        } else if (score >= _score[0]) {
            if (!nodStar.children[3].active) {
                nodStar.children[3].active = true;
                nodStar.children[3].getComponent(cc.Animation).play('aniSpawnStar');
            }
            nodStar.children[4].active = false;
            nodStar.children[5].active = false;
        } else {
            nodStar.children[3].active = false;
            nodStar.children[4].active = false;
            nodStar.children[5].active = false;
        }
    }


    // 更新目标显示
    public updateObjective(data) {
        // console.log(data)
        let label = this.nodObjective.children[data.index].getChildByName('labObjective');
        if (data.count <= 0) {
            this.panelGuide.level1_tip4(data.index);
            label.active = false;
            this.nodObjective.children[data.index].getChildByName('sprAchieved').active = true;
        } else {
            label.active = true;
            label.getComponent(cc.Label).string = 'x' + data.count;
            this.nodObjective.children[data.index].getChildByName('question').active = false;
            this.nodObjective.children[data.index].getChildByName('sprite').active = true;
        }
    }

    start() {

    }

    public init(layerGame) {
        this.saveObjectivesPs();
        Play.DataPve.panelHead = this;
        Play.DataPve.clear();
        this.getScore(0);
        this.layerGame = layerGame;
        this.labScore.string = '0';
        this._isObjectiveDone = [false, false, false, false, false];

        Play.DataPve.remainTime = Play.DataPve.levelData.time;
        Play.DataPve.remainStep = Play.DataPve.levelData.step;

        this.labLevel.string = `第${Play.DataPve.curLevel}关`

        if (Play.DataPve.remainStep == 0) {
            Play.DataPve.isTimeLevel = true;
            this.nodLastTime.active = true;
            this.nodLastStep.active = false;
            this.labCountDown.string = Play.DataPve.remainTime + "";
            this.labCountDown.node.parent.getChildByName('labSec').getComponent(cc.Label).string = '秒';
        } else {
            Play.DataPve.isTimeLevel = false;
            this.nodLastTime.active = false;
            this.nodLastStep.active = true;
            this.labCountDown.string = Play.DataPve.remainStep + "";
            this.labCountDown.node.parent.getChildByName('labSec').getComponent(cc.Label).string = '步';
        }

        this.initObjective();
    }

    initObjective() {
        this.objective = Play.DataPve.levelData.objective;

        for (let i = 0; i < this.nodObjective.children.length; ++i) {
            this.nodObjective.children[i].active = false;
            this.nodObjective.children[i].getChildByName('sprAchieved').active = false;
            this.nodObjective.children[i].getChildByName('labObjective').active = true;
            var children = this.nodObjective.children[i].getChildByName('sprite').children;
            for (let j = 0; j < children.length; ++j) {
                children[j].destroy();
            }
        }

        let count = 0;
        for (let i = 0; i < this.objective.length; ++i) {
            for (let j = 0; j < this.objective[i].length; ++j) {
                let nodObjective = this.nodObjective.children[count];
                let data = this.objective[i][j];
                nodObjective.active = true;
                if (j === 0 && i !== 0) {
                    nodObjective.getChildByName('arrow').active = true;
                } else {
                    nodObjective.getChildByName('arrow').active = false;
                }

                if (data.objectiveType === 0) {// 正常显示水果
                    nodObjective.getChildByName('ban').active = false;
                    nodObjective.getChildByName('question').active = false;
                    nodObjective.getChildByName('sprite').active = true;
                    nodObjective.getChildByName('labObjective').active = true;
                    nodObjective.getChildByName('sprAchieved').active = false;
                } else if (data.objectiveType === 1) {// 显示ban
                    nodObjective.getChildByName('ban').active = true;
                    nodObjective.getChildByName('question').active = false;
                    nodObjective.getChildByName('sprite').active = true;
                    nodObjective.getChildByName('labObjective').active = false;
                    nodObjective.getChildByName('sprAchieved').active = false;
                } else if (data.objectiveType === 2) {// 显示问号
                    nodObjective.getChildByName('ban').active = false;
                    nodObjective.getChildByName('question').active = true;
                    nodObjective.getChildByName('sprite').active = false;
                    nodObjective.getChildByName('labObjective').active = false;
                    nodObjective.getChildByName('sprAchieved').active = false;
                } else {
                    // error
                }
                count++;

                var labObjective = nodObjective.getChildByName('labObjective').getComponent(cc.Label);
                labObjective.string = `x${data.count}`;

                switch (data.tileType) {
                    case TILE_TYPE.BLOCK:
                        let nodBlock = cc.instantiate(Play.DataPve.pfbBlock)
                        var tileComponent = nodBlock.getComponent('Block');
                        nodBlock.parent = nodObjective.getChildByName('sprite');
                        tileComponent.init();
                        tileComponent.type = data.type;
                        tileComponent.setContentSize(80, 80);
                        nodBlock.scale = 1;
                        nodBlock.zIndex = 0;
                        nodBlock.x = 0;
                        nodBlock.y = 0;
                        break;
                    case TILE_TYPE.BOMB:
                        let nodBomb = cc.instantiate(Play.DataPve.pfbBomb)
                        nodBomb.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodBomb.getComponent('Bomb');
                        tileComponent.init();
                        tileComponent.type = data.type;
                        if (data.type == BOMB_TYPE.BOMB_ONE_COLOR) {
                            tileComponent.subType = BLOCK_COLOR.COLORS;
                        }
                        tileComponent.setContentSize(80, 80);
                        nodBomb.scale = 1;
                        nodBomb.zIndex = 0;
                        nodBomb.x = 0;
                        nodBomb.y = 0;
                        break;
                    case TILE_TYPE.PET:
                        let nodPet = cc.instantiate(Play.DataPve.pfbObstacle)
                        nodPet.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodPet.getComponent('Obstacle');
                        tileComponent.type = data.type;
                        tileComponent.canTouch = false;
                        tileComponent.setContentSize(80, 80);
                        nodPet.scale = 1;
                        nodPet.zIndex = 0;
                        nodPet.x = 0;
                        nodPet.y = 0;
                        break;
                    case TILE_TYPE.TABLEWARE:
                        let nodTableware = cc.instantiate(Play.DataPve.pfbTableware)
                        nodTableware.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodTableware.getComponent('Tableware');
                        tileComponent.type = data.type;
                        tileComponent.canTouch = false;
                        tileComponent.setContentSize(80, 80);
                        nodTableware.scale = 1;
                        nodTableware.zIndex = 0;
                        nodTableware.x = 0;
                        nodTableware.y = 0;
                        break;
                    case TILE_TYPE.WALL:
                        let nodWall = cc.instantiate(Play.DataPve.pfbWall)
                        nodWall.parent = nodObjective.getChildByName('sprite');
                        var tileComponent = nodWall.getComponent('Wall');
                        tileComponent.type = data.type;
                        tileComponent.setContentSize(80, 80);
                        nodWall.scale = 1;
                        nodWall.zIndex = 0;
                        nodWall.x = 0;
                        nodWall.y = 0;
                        break;
                }
            }
        }
    }

    updateLabelStep(){
        this.labCountDown.string = Play.DataPve.remainStep.toString();
    }

    // 步数计算
    public addStep() {
        if (Play.DataPve.remainStep > 0) {
            Play.DataPve.remainStep--;

            this.updateLabelStep();

            if (Play.DataPve.remainStep == 10 && !StateMgr.INSTANCE.isStopOperate) {
                var nodTip = this.node.parent.getChildByName('nodBoard').getChildByName('nodTip');
                this.PlayUI.Audio.remaindTime();
                nodTip.children[0].runAction(cc.sequence(
                    cc.moveBy(0.2, 222, 0),
                    cc.delayTime(2.5),
                    cc.moveBy(0.2, -222, 0)
                ))
            }

            if (Play.DataPve.remainStep <= 0) {
                // gameover
                StateMgr.INSTANCE.isStopOperate = true;
                this.layerGame.gameOver();
            }
        }
    }

    updateTime(){
        this.labCountDown.string = Play.DataPve.remainTime + "";
    }

    update(dt) {
        if (!Play.DataPve.gameBegan) {
            return
        }
        this.passedTime += dt;
        if (this.passedTime >= 1) {
            if (Play.DataPve.remainTime >= 1) {
                Play.DataPve.remainTime -= 1;
                this.passedTime = this.passedTime - 1;
                this.labCountDown.string = Play.DataPve.remainTime + "";

                // 小于5秒时开始倒计时声音
                if (Play.DataPve.remainTime <= 5 && Play.DataPve.remainTime >= 1) {
                    this.PlayUI.Audio.countDownAudio();
                } else if (Play.DataPve.remainTime === 0) {
                    this.PlayUI.Audio.timeEndAudio();
                    StateMgr.INSTANCE.isStopOperate = true;
                    this.layerGame.gameOver();
                }
            }
            if (Play.DataPve.remainTime < 1) {
                this.passedTime = 0;
            }
        }
    }
    onDestroy() {
        DYNotify.removeAllObservers(this);
    }
}
