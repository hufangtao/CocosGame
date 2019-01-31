import { Home, Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import { TILE_TYPE, BOMB_TYPE, BLOCK_COLOR } from "../component/game/PlayDefine";
import { PlayStartPveC2S } from "../common/net/proto/mods/ProtoSectionPlay";
import { UIFunc } from "../common/UIFunc";
import PlayManager from "../component/game/PlayManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UILevelInfo extends cc.Component {
    @property(cc.Node)
    nodObjectives: cc.Node = null;
    @property(cc.Node)
    nodContent: cc.Node = null;
    @property(cc.Label)
    labLevel: cc.Label = null;
    @property(cc.Node)
    nodRank: cc.Node = null;

    levelChoose;

    onLoad() {
    }

    private loadPrefab(url, callback) {
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            if (!err) {
                callback(prefab);
            }
        })
    }

    public initLevelInfo(levelChoose) {
        this.levelChoose = levelChoose;
        this.labLevel.string = Play.DataPve.curLevel + '';
        this.showObjectives();
        this.showStar();
        this.loadRank();
    }

    // 显示目标
    private showObjectives() {
        var objective = Play.LevelDatas['level_' + Play.DataPve.curLevel].objective;
        for (let i = 0; i < this.nodObjectives.children.length; ++i) {
            this.nodObjectives.children[i].active = false;
            this.nodObjectives.children[i].getChildByName('sprAchieved').active = false;
            this.nodObjectives.children[i].getChildByName('labObjective').active = true;
            var children = this.nodObjectives.children[i].getChildByName('sprite').children;
            for (let j = 0; j < children.length; ++j) {
                children[j].destroy();
            }
        }
        let count = 0;
        for (let i = 0; i < objective.length; ++i) {
            for (let j = 0; j < objective[i].length; ++j) {
                let nodObjective = this.nodObjectives.children[count];
                let data = objective[i][j];
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
                        this.loadPrefab('prefab/play/pve/Block', (prefab) => {
                            let nodBlock = cc.instantiate(prefab)
                            var tileComponent = nodBlock.getComponent('Block');
                            nodBlock.parent = nodObjective.getChildByName('sprite');
                            tileComponent.init();
                            tileComponent.type = data.type;
                            tileComponent.setContentSize(80, 80);
                            nodBlock.scale = 1;
                            nodBlock.zIndex = 0;
                            nodBlock.x = 0;
                            nodBlock.y = 0;
                        })
                        break;
                    case TILE_TYPE.BOMB:
                        this.loadPrefab('prefab/play/pve/Bomb', (prefab) => {
                            let nodBomb = cc.instantiate(prefab)
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
                        })
                        break;
                    case TILE_TYPE.PET:

                        this.loadPrefab('prefab/play/pve/Obstacle', (prefab) => {
                            let nodPet = cc.instantiate(prefab)
                            nodPet.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodPet.getComponent('Obstacle');
                            tileComponent.type = data.type;
                            tileComponent.canTouch = false;
                            tileComponent.setContentSize(80, 80);
                            nodPet.scale = 1;
                            nodPet.zIndex = 0;
                            nodPet.x = 0;
                            nodPet.y = 0;
                        })

                        break;
                    case TILE_TYPE.TABLEWARE:
                        this.loadPrefab('prefab/play/pve/Tableware', (prefab) => {
                            let nodTableware = cc.instantiate(prefab)
                            nodTableware.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodTableware.getComponent('Tableware');
                            tileComponent.type = data.type;
                            tileComponent.canTouch = false;
                            tileComponent.setContentSize(80, 80);
                            nodTableware.scale = 1;
                            nodTableware.zIndex = 0;
                            nodTableware.x = 0;
                            nodTableware.y = 0;
                        })
                        break;
                    case TILE_TYPE.WALL:
                        this.loadPrefab('prefab/play/pve/WALL', (prefab) => {
                            let nodWall = cc.instantiate(prefab)
                            nodWall.parent = nodObjective.getChildByName('sprite');
                            var tileComponent = nodWall.getComponent('Wall');
                            tileComponent.type = data.type;
                            tileComponent.setContentSize(80, 80);
                            nodWall.scale = 1;
                            nodWall.zIndex = 0;
                            nodWall.x = 0;
                            nodWall.y = 0;
                        })
                        break;
                }
            }
        }
    }

    // 显示星星
    private showStar() {
        var nodEmptyStar = this.nodContent.getChildByName('nodEmptyStar');
        var nodStar = this.nodContent.getChildByName('nodStar');
        nodEmptyStar.active = true;
        nodStar.active = true;
        var _score = Play.LevelDatas['level_' + Play.DataPve.curLevel].score;
        var score = 0;
        if (Home.DataPlayer.PveStatArray[Play.DataPve.curLevel - 1]) {
            score = Home.DataPlayer.PveStatArray[Play.DataPve.curLevel - 1].score;
        }
        if (!_score) {
            return
        }
        if (score >= _score[2]) {
            nodStar.children[0].active = true;
            nodStar.children[1].active = true;
            nodStar.children[2].active = true;
        } else if (score >= _score[1]) {
            nodStar.children[0].active = true;
            nodStar.children[1].active = true;
            nodStar.children[2].active = false;
        } else if (score >= _score[0]) {
            nodStar.children[0].active = true;
            nodStar.children[1].active = false;
            nodStar.children[2].active = false;
        } else {
            nodStar.children[0].active = false;
            nodStar.children[1].active = false;
            nodStar.children[2].active = false;
        }
    }

    private loadRank() {
        UIFunc.openUI('UIRankPve', (node) => {
        }, this.nodRank)
    }

    // 开始游戏，播放爱心动画
    private gameStart(node) {
        var Energy = Home.DataPlayer.FortuneEnergy;
        if (!window['Partner'].energyTest() && Energy < 5) {
            this.levelChoose.showEnergyEmpty(1);
            return;
        }
        node.getChildByName('nodMask').active = true;
        var action = cc.sequence(
            cc.spawn(
                cc.moveTo(0.5, 84, 6.5),
                cc.scaleTo(0.5, 1.1, 1.1)
            ),
            cc.callFunc(() => {
                node.getChildByName('particle_energy').getComponent(cc.ParticleSystem).resetSystem();
            }),
            cc.scaleTo(0.2, 1, 1),
            cc.scaleTo(0.2, 1.1, 1.1),
            cc.scaleTo(0.2, 1, 1),
            cc.callFunc(() => {
                var startPve = new PlayStartPveC2S();
                PlayManager.INSTANCE.PveEnterType = 0;
                NetUtil.SendMsg(startPve);
                node.getChildByName('nodMask').active = false;
            })
        )
        node.getChildByName('sprHeart').runAction(action);
    }

    private closeUI() {
        Play.DataPve.curLevel = null;
        UIFunc.closeUI('UILevelInfo', () => { })
        UIFunc.closeUI('UIRankPve', () => { })
    }

    private btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnPanelBack':
                GamePersist.INSTANCE.btnAudio_2();
                this.closeUI();
                break;
            case 'btnStartPve':
                GamePersist.INSTANCE.btnAudio_1();
                this.gameStart(target);
                break;
        }
    }


    // update (dt) {}
}
