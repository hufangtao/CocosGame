import NodePool from "../NodePool";
import {
    TILE_TYPE,
    GRID_TYPE,
    BOMB_TYPE,
    TABLEWARE_TYPE,
    GAME_STAT,
    TILE_ZINDEX,
    BLOCKDES_TYPE,
    TRANSPORT_TYPE,
    Action_type,
} from "../PlayDefine";
import PanelHeaderPve from "./PanelHeaderPve";
import { PlayPveFinishC2S } from "../../../common/net/proto/mods/ProtoSectionPlay";
import NetUtil from "../../../common/net/NetUtil";
import StateMgr from "./StateMgr";
import { ValueKey } from "../../../common/Defines";
import * as Algorithm from "../Algorithm";
import PlayUIPve from "./PlayUIPve";
import DataPve from "./DataPve";
import { Play } from "../../../module/Modules";
import { UIFunc } from "../../../common/UIFunc";
import UIObjective from "../../../ui/UIObjective";
import { Message } from "../../../common/Message";
import { DYNotify } from "../../../../dyGame/DYNotify";
import GamePersist from "../../../common/persist/GamePersist";
import * as Modules from "../../../module/Modules";
import SocialManager from "../../../common/social/SocialManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerGamePve extends cc.Component {
    @property(cc.Prefab)
    pfbScore: cc.Prefab = null;
    @property(cc.Prefab)
    pfbBlock: cc.Prefab = null;
    @property(cc.Prefab)
    pfbBomb: cc.Prefab = null;
    @property(cc.Prefab)
    pfbObstacle: cc.Prefab = null;
    @property(cc.Prefab)
    pfbWall: cc.Prefab = null;
    @property(cc.Prefab)
    pfbTableware: cc.Prefab = null;
    @property(cc.Prefab)
    pfbTransport: cc.Prefab = null;
    @property(cc.Prefab)
    pfbGate: cc.Prefab = null;
    @property(cc.Prefab)
    pfbBonusBall: cc.Prefab = null;
    @property(cc.Prefab)
    pfbTileBg: cc.Prefab = null;
    @property(cc.Prefab)
    pfbParticle: cc.Prefab = null;

    @property(cc.Node)
    panelTile: cc.Node = null;
    @property(cc.Node)
    panelScore: cc.Node = null;
    @property(cc.Node)
    panelParticle: cc.Node = null;
    @property(cc.Node)
    panelTrickDown: cc.Node = null;
    @property(cc.Node)
    panelTrickUp: cc.Node = null;
    @property(cc.Node)
    panelGuide: cc.Node = null;
    @property(PanelHeaderPve)
    panelHeader: PanelHeaderPve = null;
    @property(cc.Node)
    panelSpine: cc.Node = null;
    @property(cc.Node)
    panelBonus: cc.Node = null;

    @property(cc.Node)
    panelGrid: cc.Node = null;


    @property(cc.SpriteFrame)
    spfTileBg: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfTileBgLight: cc.SpriteFrame = null;

    public PlayUI: PlayUIPve = null;

    public remindTime = 0;
    public oneSec = 0;
    public time = 0;

    public count = 0;

    public lastArr = [];

    public arr = [];

    public tiles = [];
    private transports = [];
    private tileBgs = [];

    private actionList = [];

    private hadRemind = false;
    private transportMove = false;

    public canTouch = true;

    hadAudAreaPlay;
    hadAudColPlay;
    hadAudOneColorPlay;

    touched: boolean = false;
    oneColorActionOver = true;

    bonusCallBack = null;
    gameStat = null;

    blockArrLength = 0;
    obstacleCnt;
    dataPve: DataPve = null;
    UIObjective: UIObjective;
    public onLoad() {
        Play.DataPve.gameBegan = false;
    }

    public start() {

    }

    public init(playUI) {
        this.PlayUI = playUI;
        Play.DataPve.game = this;
    }

    public initData() {
        this.gameStat = GAME_STAT.GAMEING

        this.remindTime = 0;
        this.oneSec = 0;
        this.time = 0;

        this.count = 0;
        this.obstacleCnt = 0;

        this.lastArr = [];

        this.arr = [];

        this.tiles = [];
        this.transports = [];
        this.tileBgs = [];

        this.actionList = [];

        this.hadRemind = true;

        this.canTouch = true;
        this.hadAudAreaPlay = true;
        this.hadAudColPlay = true;
        this.hadAudOneColorPlay = true;
        this.panelBonus.active = false;

        Play.DataPve.clearFreeNodes();
        this.panelTile.destroyAllChildren();
        this.panelTrickDown.destroyAllChildren();
        this.panelParticle.destroyAllChildren();
        this.panelSpine.destroyAllChildren();

    }

    public loadLevelData(cb) {
        this.initData();
        this.panelTile.parent.getComponent('Board_pve').initMap(this);
        this.panelHeader.init(this);

        UIFunc.openUI('UIObjective', (node) => {
            this.UIObjective = node.getComponent('UIObjective');
            this.UIObjective.initObjective(this);
            cb && cb();
        })
    }

    gameBegin() {
        this.UIObjective.panelObjectiveAction();
        this.resetRemindTime();
    }

    public operateLogic(touchX, touchY, tileType, type, subType, isTouch = false) {
        if (!StateMgr.INSTANCE.canOperate() || this.gameStat != GAME_STAT.GAMEING) {
            return
        }
        if (StateMgr.INSTANCE.haveTransport && !StateMgr.INSTANCE.isTransportOver) {
            return;
        }
        if (tileType == TILE_TYPE.BLOCK) {
            this.destroyBlock(touchX, touchY, type);
        } else if (tileType == TILE_TYPE.BOMB) {
            if (StateMgr.INSTANCE.haveTransport) {
                StateMgr.INSTANCE.isTransportOver = false;
            }
            this.transportMove = true;
            this.ignite(touchX, touchY, type, isTouch);
        }
    }

    ignite(touchX, touchY, type, isTouch = false) {
        switch (type) {
            case BOMB_TYPE.BOMB_COLUMN:
                this.panelHeader.panelGuide.guide();
                this.bombColumn(touchX, touchY, isTouch);
                break;
            case BOMB_TYPE.BOMB_AROUND:
                this.panelHeader.panelGuide.guide();
                this.bombAround(touchX, touchY, isTouch);
                break;
            case BOMB_TYPE.BOMB_ONE_COLOR:
                this.panelHeader.panelGuide.guide();
                this.bombColor(touchX, touchY, isTouch);
                break;
        }
    }

    getScore(count, x, y) {
        if (count <= 1) {
            var score = 40;
        } else {
            var score = 20 * (count + 2) * (count - 1);
        }
        let nodScore = NodePool.getNodeScore();
        nodScore.parent = this.panelScore;
        nodScore.getComponent('ScoreMsg').setMessage(count, score, x, y);
        Play.DataPve.getScore(score)
    }

    // 生成道具消除
    async spawnPropDestroy(arr, touchX, touchY) {
        var self = this;
        this.PlayUI.Audio.spawnBomb();
        Play.DataPve.stepSpawnPet += arr.length;
        Play.DataPve.stepSpawnBug += arr.length;

        this.canTouch = false;
        this.panelHeader.addStep();

        let bomb;
        let type;
        for (var index in arr) {
            var x = Number(arr[index].split("#")[0]);
            var y = Number(arr[index].split("#")[1]);
            this.tiles[x][y].node.stopAllActions();
            if (x == touchX && y == touchY) {
                Algorithm.tileBgEffect(this, 0, x, y, 0.8);
                bomb = this.tiles[x][y].node;
                type = this.tiles[x][y].type;
                bomb.zIndex = TILE_ZINDEX.ACTION;
            }
        }

        let actionArr = [];
        for (var index in arr) {
            var x = Number(arr[index].split("#")[0]);
            var y = Number(arr[index].split("#")[1]);

            this.affectAround(x, y);
            Algorithm.tileBgEffect(this, 0, x, y, 0.8);
            if (this.tiles[x][y] != bomb) {
                this.tiles[x][y].node.zIndex = TILE_ZINDEX.ACTION_LOW;
            }

            let position = this.tiles[x][y].node.position.sub(bomb.position);
            position.mulSelf(0.1);
            var action = cc.sequence(
                cc.spawn(
                    cc.scaleTo(0.05, 1.1),
                    cc.moveBy(0.05, position),
                ),
                cc.delayTime(0.05),
                cc.moveTo(0.1, bomb.getPosition()).easing(cc.easeQuarticActionIn()),
                cc.callFunc(function (tile) {
                    tile.destroyTile(BLOCKDES_TYPE.NOACTION_FIRSTDES, true);
                }.bind(self, this.tiles[x][y]), this)
            )
            Algorithm.addAction(actionArr, this.tiles[x][y].node, action);
            // this.tiles[x][y] = null;
        }
        await Algorithm.runActions(actionArr);
        if (arr.length >= 9) {
            await self.spawnBomb(touchX, touchY, BOMB_TYPE.BOMB_ONE_COLOR, type);
        } else if (arr.length >= 7) {
            await self.spawnBomb(touchX, touchY, BOMB_TYPE.BOMB_AROUND);
        } else {
            await self.spawnBomb(touchX, touchY, BOMB_TYPE.BOMB_COLUMN);
        }
        this.moveAllTileDown();

        if (Play.DataPve.levelData.grid.transport.length <= 0) {
            this.canTouch = true;
        }
    }

    // 普通消除
    blockScheduleCb;
    petScheduleCb;
    wallScheduleCb;
    async normalDestroy(arr, touchX, touchY, type) {
        //执行消除
        var self = this;
        this.panelHeader.addStep();
        this.PlayUI.Audio.strip();

        var isRecoveryDone = PanelHeaderPve.INSTANCE.isObjectiveDone(TILE_TYPE.BLOCK, type);

        this.unschedule(this.blockScheduleCb);
        StateMgr.INSTANCE.isCollectOver = false;
        this.blockScheduleCb = () => {
            StateMgr.INSTANCE.isCollectOver = true;
            this.gameOver();
        }
        this.scheduleOnce(this.blockScheduleCb, 0.6);

        for (var index in arr) {
            var x = Number(arr[index].split("#")[0]);
            var y = Number(arr[index].split("#")[1]);
            this.affectAround(x, y);
            // 播放粒子
            if (isRecoveryDone) {
                Algorithm.tileBgEffect(this, 0, x, y, 0.6);
            } else {
                Algorithm.tileBgEffect(this, 0, x, y, 0.4);
            }
            // 销毁方块
            var blockComponent = this.tiles[x][y];
            blockComponent.recovery(true);
        }

        let delayTime = 0.3;
        if (isRecoveryDone) {
            delayTime = 0.3;
        }
        await Algorithm.delay(delayTime);
        this.moveAllTileDown();
        Play.DataPve.stepSpawnPet += arr.length;
        Play.DataPve.stepSpawnBug += arr.length;
    }
    // 不能消除
    cannotDestroy(touchX, touchY) {
        cc.log("不能消除")
        if (!this.tiles[touchX][touchY]) {
            return
        }
        this.tiles[touchX][touchY].node.stopActionByTag(Action_type.NoMatch);
        let action = cc.sequence(
            // cc.blink(1, 3),
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.scaleTo(0.2, 0.9, 0.9),
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.scaleTo(0.2, 0.9, 0.9),
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.scaleTo(0.2, 0.9, 0.9),
            cc.scaleTo(0.15, 1.05, 1.05),
            cc.scaleTo(0.05, 1, 1),
            cc.delayTime(1.5),
        )
        this.tiles[touchX][touchY].node.runAction(action);
        action.setTag(Action_type.NoMatch);
    }

    // 点击方块
    private async destroyBlock(touchX, touchY, type) {
        var self = this;
        this.stopRemindAction();
        var arr = new Array();
        var scanArr = new Array();
        Algorithm.scanAround(touchX, touchY, -1, -1, type, arr, scanArr, this.tiles);
        if (arr.length > 1) {
            if (StateMgr.INSTANCE.haveTransport) {
                StateMgr.INSTANCE.isTransportOver = false;
            }
            self.transportMove = true;

            this.getScore(arr.length, touchX, touchY)
            this.hadRemindTime();
            this.remindTime = 0;
            if (arr.length >= 5) {
                this.spawnPropDestroy(arr, touchX, touchY);
            } else {
                this.normalDestroy(arr, touchX, touchY, type);
            }
        } else {
            this.cannotDestroy(touchX, touchY);
        }
    }

    private affectAround(x, y) {
        if (x - 1 >= 0 && x - 1 < 8 && y >= 0 && y < 9) {
            this.destroyprop(x - 1, y);
        }
        if (x + 1 >= 0 && x + 1 < 8 && y >= 0 && y < 9) {
            this.destroyprop(x + 1, y);
        }
        if (x >= 0 && x < 8 && y + 1 >= 0 && y + 1 < 9) {
            this.destroyprop(x, y + 1);
        }
        if (x >= 0 && x < 8 && y - 1 >= 0 && y - 1 < 9) {
            this.destroyprop(x, y - 1);
        }
    }
    private destroyprop(x, y) {
        if (Play.DataPve.grid[x][y] != 0) {
            if (this.tiles[x][y]) {
                let tileComponent = null;
                tileComponent = this.tiles[x][y];
                if (tileComponent.tileType === TILE_TYPE.TABLEWARE) {
                    if (tileComponent.type === TABLEWARE_TYPE.TYPE_3) {

                    } else {
                        if (tileComponent) {
                            tileComponent.affected();
                        }
                    }
                } else if (this.tiles[x][y].tileType === TILE_TYPE.WALL) {
                    tileComponent = this.tiles[x][y];
                    if (tileComponent) {
                        tileComponent.affected();
                    }
                }

            }
        }
    }

    addBomb(nodBomb) {
        let hasAdd = false;
        for (let i = 0; i < this.actionList.length; ++i) {
            if (this.actionList[i] == nodBomb) {
                hasAdd = true;
            }
        }
        if (hasAdd) {
            return false;
        } else {
            this.actionList.push(nodBomb);
            return true;
        }
    }

    // 当前列的其他风车isdestroy属性改为true
    changeWindmillStatCol(x, y) {
        for (let i = 0; i < this.tiles[x].length; ++i) {
            if (i !== y && this.tiles[x] && this.tiles[x][i] && this.tiles[x][i].type === BOMB_TYPE.BOMB_ONE_COLOR
                && this.tiles[x][i].subType === this.tiles[x][y].subType) {
                this.tiles[x][i].isAction = true;
            }
        }
    }
    // 周围的其他风车isdestroy属性改为true
    changeWindmillStatAround(touchX, touchY, x, y) {
        for (var i = 1; i >= -1; --i) {
            for (var j = 1; j >= -1; --j) {
                var xx = touchX + i;
                var yy = touchY + j;
                if (xx === x || yy === y) {
                    continue;
                }
                if (this.tiles[xx] && this.tiles[xx][yy] && this.tiles[xx][yy].type === BOMB_TYPE.BOMB_ONE_COLOR
                    && this.tiles[xx][yy].subType === this.tiles[x][y].subType) {
                    this.tiles[xx][yy].isAction = true;
                }
            }
        }
    }

    bombUp(touchX, touchY, i) {
        var self = this;
        if (!self.tiles[touchX][i]) {
            return;
        }
        this.scheduleOnce(() => {
            let tileComponent = self.tiles[touchX][i];
            if (!tileComponent || tileComponent.isAction) {
                return;
            }
            if (tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(self, 0, touchX, i, 0.8);
            if (self.tiles[touchX][i].tileType === TILE_TYPE.BOMB) {
                if (tileComponent.type === BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(false);
                } else if (tileComponent.type === BOMB_TYPE.BOMB_ONE_COLOR) {
                    // 当前列的其他风车isdestroy改为true
                    this.changeWindmillStatCol(touchX, i);
                    tileComponent.ignite();
                } else {
                    tileComponent.ignite();
                }
            } else if (self.tiles[touchX][i].tileType === TILE_TYPE.PET) {

            } else if (self.tiles[touchX][i].tileType === TILE_TYPE.TABLEWARE) {
                tileComponent = self.tiles[touchX][i];
                self.tiles[touchX][i] = null;
                tileComponent.destroyTile()
            } else if (self.tiles[touchX][i].tileType === TILE_TYPE.BLOCK) {
                self.getScore(1, touchX, i);
                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_LASTDES);
            } else {
                self.getScore(1, touchX, i);
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(touchX, i, self.tiles)
        }, (i - touchY) * 0.02)
    }

    bombDown(touchX, touchY, j) {
        var self = this;
        if (!self.tiles[touchX][j]) {
            return;
        }

        this.scheduleOnce(() => {
            var tileComponent = self.tiles[touchX][j];
            if (!tileComponent || tileComponent.isAction) {
                return;
            }
            if (tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(self, 0, touchX, j, 0.8);
            if (self.tiles[touchX][j].tileType === TILE_TYPE.BOMB) {
                if (tileComponent.type === BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(false);
                } else if (tileComponent.type === BOMB_TYPE.BOMB_ONE_COLOR) {
                    // 当前列的其他风车isdestroy改为true
                    this.changeWindmillStatCol(touchX, j);
                    tileComponent.ignite();
                } else {
                    tileComponent.ignite();
                }
            } else if (self.tiles[touchX][j].tileType === TILE_TYPE.PET) {

            } else if (self.tiles[touchX][j].tileType === TILE_TYPE.TABLEWARE) {
                tileComponent = self.tiles[touchX][j];
                self.tiles[touchX][j] = null;
                tileComponent.destroyTile()
            } else if (self.tiles[touchX][j].tileType === TILE_TYPE.BLOCK) {
                self.getScore(1, touchX, j);
                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_LASTDES);
            } else {
                self.getScore(1, touchX, j);
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(touchX, j, self.tiles)
        }, (touchY - j) * 0.02)
    }

    // 点击炸弹列
    private async bombColumn(touchX, touchY, isTouch) {
        var self = this;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];
        if (bombComponent.tileType != TILE_TYPE.BOMB && bombComponent.type != BOMB_TYPE.BOMB_COLUMN) {
            return;
        }
        if (!this.addBomb(nodBomb)) {
            return;
        };
        StateMgr.INSTANCE.isBombOver = false;

        this.stopRemindAction();
        this.remindTime = 0;
        this.canTouch = false;

        // 增加步数
        if (isTouch) {
            this.panelHeader.addStep();
        }
        // 播放音效
        if (this.gameStat == GAME_STAT.GAMEING) {
            this.PlayUI.Audio.bombRow();
        } else {
            if (!this.hadAudColPlay) {
                this.hadAudColPlay = true;
                this.PlayUI.Audio.bombRow();
                self.scheduleOnce(() => {
                    this.hadAudColPlay = false;
                }, 0.2)
            }
        }
        bombComponent.isAction = true;

        let anim = nodBomb.getComponent(cc.Animation);
        anim.stop();
        anim.play('aniBombCol');

        Algorithm.bothSiedAct(touchX, touchY, this.tiles);

        for (let i = touchY + 1, j = touchY - 1; i < self.tiles[0].length || j >= 0; ++i, --j) {
            self.bombUp(touchX, touchY, i);
            if (j >= 0) {
                self.bombDown(touchX, touchY, j);
            }
        }

        await Algorithm.delay(0.5);

        // 播放完成删除
        for (let i = 0; i < self.actionList.length; ++i) {
            if (nodBomb == self.actionList[i]) {
                self.actionList.splice(i, 1);
                bombComponent.destroyTile();
                break;
            }
        }

        // 如果没有炸弹，下落
        if (self.actionList.length == 0) {
            StateMgr.INSTANCE.isBombOver = true;
            self.canTouch = true;
            if (self.gameStat !== GAME_STAT.GAMEING) {
                self.igniteBomb();
                return;
            }
            self.panelHeader.panelGuide.guide();
            self.moveAllTileDown();
        } else {
            self.moveAllTileDown();
        }
    }

    // 点击炸弹周围
    private async bombAround(touchX, touchY, isTouch) {
        var self = this;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];
        if (bombComponent.tileType != TILE_TYPE.BOMB && bombComponent.type != BOMB_TYPE.BOMB_AROUND) {
            return;
        }
        if (!this.addBomb(nodBomb)) {
            return;
        };
        StateMgr.INSTANCE.isBombOver = false;

        this.stopRemindAction();
        this.remindTime = 0;
        this.canTouch = false;
        // 增加步数
        if (isTouch) {
            this.panelHeader.addStep();
        }
        // 播放音效
        if (this.gameStat == GAME_STAT.GAMEING) {
            this.PlayUI.Audio.bombAround();
        } else {
            if (!this.hadAudAreaPlay) {
                this.hadAudAreaPlay = true;
                this.PlayUI.Audio.bombAround();
                self.scheduleOnce(() => {
                    this.hadAudAreaPlay = false;
                }, 0.2)
            }
        }
        self.scheduleOnce(function () {
            self.moveAllTileDown();
        }, 0.4);
        var fruitCnt = await this.bombAroundAnimation(touchX, touchY, bombComponent);
        // self.getScore(fruitCnt, touchX, touchY);

        // 播放完成删除
        for (let k = 0; k < self.actionList.length; ++k) {
            if (nodBomb == self.actionList[k]) {
                self.actionList.splice(k, 1);
            }
        }

        // 如果没有炸弹，下落
        if (self.actionList.length == 0) {
            StateMgr.INSTANCE.isBombOver = true;
            self.canTouch = true;
            if (self.gameStat !== GAME_STAT.GAMEING) {
                self.igniteBomb();
                return;
            }
            self.moveAllTileDown();
            self.panelHeader.panelGuide.guide();
        } else {

        }

    }

    async bombAroundAnimation(touchX, touchY, bombComponent) {
        var self = this;
        var fruitCnt = 0;
        return new Promise((resolve, reject) => {
            for (var i = 2; i >= -2; --i) {
                for (var j = 2; j >= -2; --j) {
                    if ((i == 0 && j == 0) || !self.tiles[touchX + i] || !self.tiles[touchX + i][touchY + j]) {
                        continue
                    }
                    // 背景效果
                    if (i == 2 || j == 2 || i == -2 || j == -2) {
                        Algorithm.tileBgEffect(self, 2, touchX + i, touchY + j, 0.7);
                    } else {
                        Algorithm.tileBgEffect(self, 0, touchX + i, touchY + j, 0.9);
                    }
                    var tileComponent = self.tiles[touchX + i][touchY + j];
                    if (tileComponent.tileType === TILE_TYPE.BLOCK) {
                        if (!tileComponent.isDestroying) {
                            if (i == 2 || j == 2 || i == -2 || j == -2) {

                            } else {
                                self.getScore(1, touchX + i, touchY + j);
                            }
                            fruitCnt++;
                            tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_LASTDES);
                            }.bind(self, i, j, tileComponent));
                        }
                    } else if (tileComponent.tileType === TILE_TYPE.TABLEWARE) {
                        tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                            tileComponent.destroyTile();
                        }.bind(self, i, j, tileComponent));
                    } else if (tileComponent.tileType === TILE_TYPE.WALL) {
                        if (i == 2 || j == 2 || i == -2 || j == -2) {

                        } else {
                            tileComponent.destroyTile();
                        }
                    } else if (tileComponent.tileType === TILE_TYPE.BOMB) {
                        tileComponent.billowAct(touchX, touchY, function (x, y, tileComponent) {
                            if (self.tiles[x][y] && self.tiles[x][y].type === BOMB_TYPE.BOMB_ONE_COLOR) {
                                if (!tileComponent.isAction) {
                                    self.changeWindmillStatAround(touchX, touchY, x, y);
                                    tileComponent.ignite();
                                }
                            } else {
                                tileComponent.ignite();
                                // self.tiles[tileComponent.x][tileComponent.y] = null;
                            }
                        }.bind(self, touchX + i, touchY + j, tileComponent));
                    } else if (tileComponent.tileType === TILE_TYPE.PET) {
                        tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                        }.bind(self, i, j, tileComponent));
                    }
                }
            }
            var animComponent;
            for (let i = 0; i < this.actionList.length; ++i) {
                if (bombComponent.node == this.actionList[i]) {
                    animComponent = bombComponent.getComponent(cc.Animation);
                }
            }
            animComponent.onFire = function () {
                self.scheduleOnce(() => {
                    bombComponent.destroyTile();
                    resolve(fruitCnt);
                }, 0.2)
            }
            animComponent.play('aniBombArea');
        })
    }

    // 点击炸弹单色
    private async bombColor(touchX, touchY, isTouch) {
        var self = this;
        var bombComponent = this.tiles[touchX][touchY];
        var nodBomb = bombComponent.node;
        if (bombComponent.tileType != TILE_TYPE.BOMB && bombComponent.type != BOMB_TYPE.BOMB_ONE_COLOR) {
            return;
        }
        if (!this.addBomb(nodBomb)) {
            return;
        };

        nodBomb.zIndex = TILE_ZINDEX.LOW;
        this.stopRemindAction();
        this.canTouch = false;
        bombComponent.isDestroying = true;
        StateMgr.INSTANCE.isBombOver = false;
        this.remindTime = 0;
        if (isTouch) {
            this.panelHeader.addStep();
        }

        this.PlayUI.Audio.bombMagnet();

        let fruitCnt = 0;


        // 消除同颜色水果
        for (var x = 0; x < this.tiles.length; x++) {
            for (var y = 0; y < this.tiles[0].length; y++) {
                if (!this.tiles[x][y] || (this.tiles[x][y] && (this.tiles[x][y].tileType !== TILE_TYPE.BLOCK && this.tiles[x][y].tileType !== TILE_TYPE.BOMB))) {
                    continue
                }
                var blockComponent = this.tiles[x][y];
                if (blockComponent.isDestroying || (this.tiles[x][y].tileType === TILE_TYPE.BLOCK && blockComponent.type !== bombComponent.subType)
                    || (this.tiles[x][y].tileType === TILE_TYPE.BOMB
                        && (!blockComponent.isAction || blockComponent.type !== bombComponent.type || blockComponent.subType !== bombComponent.subType))
                ) {
                    continue;
                }

                (function (x, y, blockComponent) {
                    // 水果播放晃动动画
                    blockComponent.isDestroying = true;
                    blockComponent.node.zIndex = TILE_ZINDEX.ACTION_LOW;
                    blockComponent.canTouch = false;
                    blockComponent.node.runAction(cc.sequence(
                        cc.skewTo(0.08, 15, -15),
                        cc.skewTo(0.08, -15, 15),
                        cc.skewTo(0.08, 15, -15),
                        cc.skewTo(0.08, -15, 15),
                        cc.skewTo(0.08, 15, -15),
                        cc.skewTo(0.08, -15, 15),
                        cc.skewTo(0.08, 15, -15),
                        cc.skewTo(0.08, -15, 15),
                        cc.skewTo(0.06, 0, 0),
                        cc.callFunc(() => {
                            self.getScore(1, blockComponent.x, blockComponent.y);
                            blockComponent.node.scale = 1.2;
                            self.tiles[blockComponent.x][blockComponent.y] = null;

                            // let direc = Math.floor(Math.random() * 4);
                            // if (direc === 0) {
                            //     blockComponent.node.runAction(cc.moveBy(0.1, 40, 40));
                            // } else if (direc === 1) {
                            //     blockComponent.node.runAction(cc.moveBy(0.1, 40, -40));
                            // } else if (direc === 2) {
                            //     blockComponent.node.runAction(cc.moveBy(0.1, -40, -40));
                            // } else if (direc === 3) {
                            //     blockComponent.node.runAction(cc.moveBy(0.1, -40, 40));
                            // }
                        })
                    ))

                    let node = new cc.Node();
                    node.parent = self.panelParticle;
                    node.position = bombComponent.getArrPosition();
                    let time = Math.random() * 0.8;
                    // 水果旋转效果
                    self.scheduleOnce(() => {
                        if (!blockComponent.isDestroying) {
                            return;
                        }
                        let blockPosition = node.convertToNodeSpaceAR(blockComponent.node.parent.convertToWorldSpaceAR(blockComponent.node.position));
                        blockComponent.node.parent = node;
                        blockComponent.node.position = blockPosition;
                        let position = nodBomb.convertToNodeSpaceAR(nodBomb.parent.convertToWorldSpaceAR(bombComponent.getArrPosition()));
                        blockComponent.node.runAction(cc.sequence(
                            // cc.delayTime(0.5),
                            cc.spawn(
                                cc.scaleTo(1.5, 0.4, 0.4).easing(cc.easeQuinticActionIn()),
                                cc.moveTo(1.5, position.x, position.y).easing(cc.easeQuinticActionIn()),
                                // cc.rotateBy(1, -time / 1 * 360),
                            ),
                            cc.callFunc(() => {
                                Play.DataPve.collectFruitCnt[blockComponent.type - 1]++;
                                blockComponent.recoveryObjective(false);
                                blockComponent.node.destroy();
                            })
                        ));
                        node.runAction(cc.sequence(
                            cc.spawn(
                                cc.scaleTo(1.5, 0, 0).easing(cc.easeQuinticActionIn()),
                                cc.rotateBy(1.5, 360).easing(cc.easeQuinticActionIn())),
                            cc.callFunc(() => {
                                node.destroy();
                            })
                        ));
                    }, time)
                })(x, y, blockComponent);
            }
        }
        self.scheduleOnce(() => {
            self.moveAllTileDown();
        }, 1.4)
        let anim = nodBomb.getComponent(cc.Animation);
        self.scheduleOnce(() => {
            anim.play('aniOneColorBomb');
            this.playWindmillBg(nodBomb);
        }, 0.2)

        await Algorithm.delay(2.3);
        this.resetRemindTime();
        anim.stop();
        for (let k = 0; k < self.actionList.length; ++k) {
            if (nodBomb == self.actionList[k]) {
                self.actionList.splice(k, 1);
                self.tiles[touchX][touchY] = null;
                bombComponent.isDestroying = false;
                bombComponent.destroyTile();
            }
        }

        if (self.actionList.length == 0) {
            StateMgr.INSTANCE.isBombOver = true;
            self.canTouch = true;
            if (self.gameStat !== GAME_STAT.GAMEING) {
                self.igniteBomb();
                return;
            }
            self.panelHeader.panelGuide.guide();
            self.moveAllTileDown();
        } else {
            self.moveAllTileDown();
        }
    }

    // 风车动画
    playWindmillBg(node) {
        let bg = node.getChildByName('content').getChildByName('bombzzj1').getChildByName('bg');
        bg.active = true;
        for (let i = 0; i < bg.children.length; ++i) {
            bg.children[i].getComponent(cc.Animation).play();
        }

        let bgStar1 = node.getChildByName('content').getChildByName('bombzzj1').getChildByName('bgStar1');
        bgStar1.active = true;
        for (let i = 0; i < bgStar1.children.length; ++i) {
            bgStar1.children[i].getComponent(cc.Animation).play();
        }

        let bgStar2 = node.getChildByName('content').getChildByName('bombzzj1').getChildByName('bgStar2');
        bgStar2.active = true;
        for (let i = 0; i < bgStar2.children.length; ++i) {
            bgStar2.children[i].getComponent(cc.Animation).play();
        }
    }

    // 是否为下落口
    isDownEntry(x, y) {
        for (let i = 0; i < Play.DataPve.levelData.fallDownPoint.length; ++i) {
            let pointX = Math.floor(Play.DataPve.levelData.fallDownPoint[i] / (this.tiles.length + 1));
            let pointY = Play.DataPve.levelData.fallDownPoint[i] % this.tiles[0].length;
            if (pointX === x && pointY === y) {
                return true;
            }
        }
        return false;
    }

    recursive = 0;
    // 已有的方块下落
    async tileDown() {
        // console.log('tileDown');
        let self = this;
        this.recursive++;
        let delayTime = 0.08;
        let hadDown = false;
        for (let y = 0; y < 9; ++y) {
            for (let x = 0; x < 8; ++x) {
                if (Play.DataPve.grid[x][y] === GRID_TYPE.EMPTY) {
                    continue;
                }
                if (this.tiles[x][y]) {
                    continue;
                }
                if (this.tiles[x][y + 1] && this.tiles[x][y + 1].tileType !== TILE_TYPE.WALL) {
                    // 上方为可下落
                    if (this.tiles[x][y + 1].tileType === TILE_TYPE.BOMB && this.tiles[x][y + 1].isDestroying) {
                        continue;
                    }
                    this.tiles[x][y] = this.tiles[x][y + 1];
                    this.tiles[x][y + 1] = null;
                    this.tiles[x][y].moveTo(x, y, null);
                    hadDown = true;
                } else if (this.tiles[x][y + 1] && this.tiles[x][y + 1].tileType === TILE_TYPE.WALL) {
                    // 上方为墙
                    if (this.tiles[x - 1] && this.tiles[x - 1][y + 1] && this.tiles[x - 1][y + 1].tileType !== TILE_TYPE.WALL) {
                        if (this.tiles[x - 1][y + 1].tileType !== TILE_TYPE.BOMB || !this.tiles[x - 1][y + 1].isDestroying) {
                            this.tiles[x - 1][y + 1].moveTo(x, y, null);
                            this.tiles[x][y] = this.tiles[x - 1][y + 1];
                            this.tiles[x - 1][y + 1] = null;
                            hadDown = true;
                            continue;
                        }
                    }
                    if (this.tiles[x + 1] && this.tiles[x + 1][y + 1] && this.tiles[x + 1][y + 1].tileType !== TILE_TYPE.WALL) {
                        if (this.tiles[x + 1][y + 1].tileType !== TILE_TYPE.BOMB || !this.tiles[x + 1][y + 1].isDestroying) {
                            this.tiles[x + 1][y + 1].moveTo(x, y, null);
                            this.tiles[x][y] = this.tiles[x + 1][y + 1];
                            this.tiles[x + 1][y + 1] = null;
                            hadDown = true;
                        }
                    }
                } else if (Play.DataPve.grid[x][y] === GRID_TYPE.UPGATE) {
                    // 上方有传送门
                    let newX = 0;
                    let newY = 0;
                    for (let i = 0; i < Play.DataPve.levelData.grid.gate.length; ++i) {
                        if (Play.DataPve.levelData.grid.gate[i].upgate == x * 9 + y) {
                            newX = Math.floor(Play.DataPve.levelData.grid.gate[i].downgate / (this.tiles.length + 1));
                            newY = Play.DataPve.levelData.grid.gate[i].downgate % this.tiles[0].length;
                        }
                    }
                    if (this.tiles[newX][newY]) {
                        // 上方不为空
                        if (this.tiles[newX][newY].tileType !== TILE_TYPE.WALL) {
                            if (this.tiles[newX][newY].tileType !== TILE_TYPE.BOMB || !this.tiles[newX][newY].isDestroying) {
                                this.tiles[x][y] = this.tiles[newX][newY];
                                this.tiles[newX][newY] = null;
                                // this.tiles[x][y].setArrPosition(x, y + 1);
                                this.tiles[x][y].gateTo(x, y, null);
                                delayTime = 0.13;
                                hadDown = true;
                            }
                        }
                    }
                } else if (Play.DataPve.grid[x][y + 1] === 0 && !this.isDownEntry(x, y) && Play.DataPve.grid[x][y] !== GRID_TYPE.UPGATE) {
                    // 上方没有格子且不是下落点，且没有传送门
                    if (this.tiles[x - 1] && this.tiles[x - 1][y + 1]) {
                        if (this.tiles[x - 1][y + 1].tileType !== TILE_TYPE.WALL) {
                            if (this.tiles[x - 1][y + 1].tileType !== TILE_TYPE.BOMB ||
                                (this.tiles[x - 1][y + 1].tileType === TILE_TYPE.BOMB && !this.tiles[x - 1][y + 1].isDestroying)) {
                                this.tiles[x - 1][y + 1].moveTo(x, y, null);
                                this.tiles[x][y] = this.tiles[x - 1][y + 1];
                                this.tiles[x - 1][y + 1] = null;
                                hadDown = true;
                                continue;
                            }
                        }
                    }
                    if (this.tiles[x + 1] && this.tiles[x + 1][y + 1]) {
                        if (this.tiles[x + 1][y + 1].tileType !== TILE_TYPE.WALL) {
                            if (this.tiles[x + 1][y + 1].tileType !== TILE_TYPE.BOMB ||
                                (this.tiles[x + 1][y + 1].tileType === TILE_TYPE.BOMB && !this.tiles[x + 1][y + 1].isDestroying)) {
                                this.tiles[x + 1][y + 1].moveTo(x, y, null);
                                this.tiles[x][y] = this.tiles[x + 1][y + 1];
                                this.tiles[x + 1][y + 1] = null;
                                hadDown = true;
                            }
                        }
                    }
                } else if (this.isDownEntry(x, y)) {
                    // 当前为下落点
                    this.spawnRandomTile(x, y);
                    hadDown = true;
                } else {
                    // 上方为空

                }
            }
        }

        if (hadDown) {
            await Algorithm.delay(delayTime);
            this.tileDown();
        }
        this.recursive--;

        if (this.recursive === 0) {
            // await Algorithm.delay(0.42);

            this.panelHeader.panelGuide.guide();

            StateMgr.INSTANCE.isGameOver = true;
            StateMgr.INSTANCE.isAllDownOver = true;

            if (StateMgr.INSTANCE.haveTransport) {
                this.transport();
            }
            this.resetRemindTime();
            this.gameOver();
            this.scheduleOnce(() => {
            }, 1);
        }
    }
    // 所有方块向下移动
    public async moveAllTileDown() {
        if (!StateMgr.INSTANCE.canAllDown()) {
            return
        }
        // console.log('movedown')
        this.hadRemindTime();
        StateMgr.INSTANCE.isGameOver = false;
        StateMgr.INSTANCE.isAllDownOver = false;
        this.tileDown();
    }

    // 轨道移动
    async transport() {
        let self = this;
        if (!this.transportMove) {
            return;
        }
        if (!StateMgr.INSTANCE.canTransport()) {
            return
        }

        this.transportMove = false;
        let transport = Play.DataPve.levelData.grid.transport;

        for (let i = 0; i < transport.length; ++i) {
            let startX = Math.floor(transport[i].start / (Play.DataPve.grid.length + 1));
            let startY = transport[i].start % Play.DataPve.grid[0].length;
            let endX = Math.floor(transport[i].end / (Play.DataPve.grid.length + 1));
            let endY = transport[i].end % Play.DataPve.grid[0].length;


            if (transport[i].type === TRANSPORT_TYPE.LEFT) {
                // 把移动方向的第一个tile放到transport的mask节点之下
                let endTile = this.tiles[startX][startY];
                let node = cc.instantiate(endTile.node);
                node.parent = this.transports[startX][startY].getChildByName('mask');
                node.x = 0;
                node.y = 0;
                // 复制第一个tile放到最后一个transport的mask节点之下，同时设置坐标
                let oldParent = endTile.node.parent;
                endTile.node.parent = this.transports[endX][endY].getChildByName('mask');
                endTile.node.x = 80;
                endTile.node.y = 0;
                // 播放动作
                var action1 = cc.sequence(
                    cc.moveTo(0.3, -80, 0),
                    cc.callFunc(() => {
                        node.destroy();
                    })
                )
                node.runAction(action1);

                var action2 = cc.sequence(
                    cc.moveTo(0.3, 0, 0),
                    cc.callFunc(() => {
                        endTile.node.parent = oldParent;
                        endTile.setArrPosition(endX, endY);
                        if (StateMgr.INSTANCE.haveTransport && endTile.tileType === TILE_TYPE.PET) {
                            endTile.getObstacle(true);
                        }
                    })
                )
                endTile.node.runAction(action2);

                for (let j = startX + 1; j <= endX; ++j) {
                    this.tiles[j - 1][startY] = this.tiles[j][startY];
                    this.tiles[j][startY].transportTo(j - 1, startY, null, false);
                }
                this.tiles[endX][endY] = endTile;
            }
            if (transport[i].type === TRANSPORT_TYPE.RIGHT) {
                // 把移动方向的第一个tile放到transport的mask节点之下
                let endTile = this.tiles[endX][endY];
                let node = cc.instantiate(endTile.node);
                node.parent = this.transports[endX][endY].getChildByName('mask');
                node.x = 0;
                node.y = 0;
                // 复制第一个tile放到最后一个transport的mask节点之下，同时设置坐标
                let oldParent = endTile.node.parent;
                endTile.node.parent = this.transports[startX][startY].getChildByName('mask');
                endTile.node.x = -80;
                endTile.node.y = 0;
                // 播放动作
                var action1 = cc.sequence(
                    cc.moveTo(0.3, 80, 0),
                    cc.callFunc(() => {
                        node.destroy();
                    })
                )
                node.runAction(action1);

                var action2 = cc.sequence(
                    cc.moveTo(0.3, 0, 0),
                    cc.callFunc(() => {
                        endTile.node.parent = oldParent;
                        endTile.setArrPosition(startX, startY);
                        if (StateMgr.INSTANCE.haveTransport && endTile.tileType === TILE_TYPE.PET) {
                            endTile.getObstacle(true);
                        }
                    })
                )
                endTile.node.runAction(action2);

                for (let j = endX - 1; j >= startX; --j) {
                    this.tiles[j + 1][startY] = this.tiles[j][startY];
                    this.tiles[j][startY].transportTo(j + 1, startY, null, false);
                }
                this.tiles[startX][startY] = endTile;
            }
            // if (transport[i].type === TRANSPORT_TYPE.UP) {
            //     this.tiles[startX][startY].node.parent = this.transports[startX][startY].getChildByName('mask');
            // }
            // if (transport[i].type === TRANSPORT_TYPE.DOWN) {
            //     this.tiles[endX][endY].node.parent = this.transports[startX][startY].getChildByName('mask');
            // }
        }
        await Algorithm.delay(0.3);
        if (StateMgr.INSTANCE.haveTransport) {
            StateMgr.INSTANCE.isTransportOver = true;
        }

        self.canTouch = true;
        self.gameOver();
    }

    hadShowAddStep = false;
    checkResult() {
        if (Play.DataPve.checkWin()) {
            let playPveFinishC2S = new PlayPveFinishC2S();
            playPveFinishC2S.pveId = Play.DataPve.curLevel;
            playPveFinishC2S.pveWin = 1;
            playPveFinishC2S.pveScore = Play.DataPve.score;
            playPveFinishC2S.remainStepsTime = Play.DataPve.saveStep > Play.DataPve.saveTime ? Play.DataPve.saveStep : Play.DataPve.saveTime;
            // console.log(playPveFinishC2S.remainStepsTime);
            window['Partner'].postMsg(4, { valuekey: ValueKey.levelScore, score: Play.DataPve.score });

            // 更新社交需要的数据
            SocialManager.INSTANCE.setUserStar(Modules.Home.DataPlayer.FortuneStar + Modules.Home.DataPlayer.PlayCntWin / Modules.Home.DataPlayer.PlayCntTotal);
            NetUtil.SendMsg(playPveFinishC2S);
            DYNotify.post(Message.GAME_WIN)
        } else if (StateMgr.INSTANCE.isStopOperate && !Play.DataPve.checkWin()) {
            if (Play.DataPve.hadAddStep) {
                this.PlayUI.loseGame();
            } else {
                if (!this.hadShowAddStep) {
                    this.hadShowAddStep = true;
                    UIFunc.openUI('UIAddStep', (node) => {
                        node.getComponent('UIAddStep').init(this);
                    })
                }
            }
        }
    }

    //生成新的方块
    public spawnRandomTile(x, y) {
        Play.DataPve.spawnObjective((tileType, type, subType) => {
            if (!tileType) {
                this.spawnBlock(x, y);
            } else if (tileType === TILE_TYPE.PET) {
                this.spawnPet(x, y, type, true);
            } else if (tileType === TILE_TYPE.TABLEWARE) {
                this.spawnTableware(x, y, type, true);
            }
        })
    }
    // 生成一个指定方块
    public spawnTile(x, y, tileType, type, subType) {
        if (tileType === TILE_TYPE.PET) {
            this.spawnPet(x, y, type, false);
        } else if (tileType === TILE_TYPE.TABLEWARE) {
            this.spawnTableware(x, y, type, false);
        }
        Play.DataPve.changePetOrBugData(tileType, type, subType);
    }
    // 生成炸弹
    private async spawnBomb(x: number, y: number, type, subType?) {
        return new Promise((resolve, reject) => {
            if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
            }
            let nodBomb = Play.DataPve.popBomb();
            if (nodBomb.parent != this.panelTile) {
                nodBomb.parent = this.panelTile;
            }
            nodBomb.zIndex = TILE_ZINDEX.NORMAL;
            let bombComponent = this.tiles[x][y] = nodBomb.getComponent('Bomb');
            nodBomb.scale = 1;
            let width = 80;
            bombComponent.init();
            bombComponent.setContentSize(width, width);
            bombComponent.game = this;
            bombComponent.type = type;
            bombComponent.setArrPosition(x, y);
            if (type == BOMB_TYPE.BOMB_ONE_COLOR) {
                bombComponent.subType = subType;
                let animation = nodBomb.getComponent(cc.Animation);
                animation.play('aniSpawnZZJ');
                animation['onSpawnZZJFinished'] = () => {
                    bombComponent.genBombAnimation();
                }
                resolve();
            } else {
                bombComponent.genBombAnimation();
                resolve();
            }
        })
    }
    // 生成Pet
    private spawnPet(x: number, y: number, type, isDown = true) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
        }
        let nodPet = Play.DataPve.popObstacle();
        if (nodPet.parent != this.panelSpine) {
            nodPet.parent = this.panelSpine;
        }
        nodPet.zIndex = TILE_ZINDEX.NORMAL;
        let petComponent = this.tiles[x][y] = nodPet.getComponent("Obstacle");
        petComponent.type = type;
        let width = 80;
        petComponent.game = this;
        nodPet.scale = 1;
        petComponent.setContentSize(width, width);
        if (isDown) {
            petComponent.newTile(x, y)
        } else {
            petComponent.setArrPosition(x, y)
        }
    }

    // 生成block
    private spawnBlock(x: number, y: number, type?) {
        let nodBlock = Play.DataPve.popBlock();
        if (nodBlock.parent != this.panelTile) {
            nodBlock.parent = this.panelTile;
        }
        nodBlock.zIndex = TILE_ZINDEX.NORMAL;
        nodBlock.stopAllActions();
        let blockComponent = this.tiles[x][y] = nodBlock.getComponent("Block");
        blockComponent.init();

        blockComponent.game = this;
        nodBlock.scale = 1;

        let width = 80;
        blockComponent.setContentSize(width, width);
        let randomNum = type;
        if (!randomNum) {
            randomNum = Math.floor(Math.random() * Play.DataPve.levelData.blockcount) + 1;
            blockComponent.type = randomNum;
            blockComponent.newTile(x, y)
        } else {
            blockComponent.type = randomNum;
            blockComponent.setArrPosition(x, y)
        }
    }
    // 生成tableware
    private spawnTableware(x: number, y: number, type, isDown = true) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
        }
        let nodTableware = cc.instantiate(Play.DataPve.pfbTableware);
        if (nodTableware.parent != this.panelTile) {
            nodTableware.parent = this.panelTile;
        }
        nodTableware.zIndex = TILE_ZINDEX.NORMAL;
        let tablewareComponent = this.tiles[x][y] = nodTableware.getComponent("Tableware");
        tablewareComponent.game = this;
        tablewareComponent.type = type;

        let width = 80;
        tablewareComponent.setContentSize(width, width);

        if (isDown) {
            tablewareComponent.newTile(x, y)
        } else {
            tablewareComponent.setArrPosition(x, y)
        }

    }
    // 生成Wall
    private spawnWall(x: number, y: number, type) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
        }
        let nodWall = cc.instantiate(Play.DataPve.pfbWall);
        if (nodWall.parent != this.panelTile) {
            nodWall.parent = this.panelTile;
        }
        nodWall.zIndex = TILE_ZINDEX.NORMAL;
        let wallComponent = this.tiles[x][y] = nodWall.getComponent("Wall");
        wallComponent.game = this;
        wallComponent.type = type;

        let width = 80;
        wallComponent.setContentSize(width, width);

        wallComponent.setArrPosition(x, y)
    }


    // 播放粒子
    playParticle(x, y) {
        return;
        let node = cc.instantiate(this.pfbParticle);
        node.parent = this.panelParticle;
        node.getComponent('Particle').setArrPosition(x, y);
        node.getComponent('Particle').play();
    }

    private stopRemindAction() {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                    this.tiles[x][y].node.stopActionByTag(Action_type.Tip);
                }
            }
        }
    }

    /**
     * gameover的几种情况：
     * 进入引爆道具阶段
     * 成功
     * 
     * 都需要下落完成
     * 
     * 失败
     * 1.时间到达
     * 2.步数耗尽
     * 都需要下落完成
     */
    public async gameOver() {
        if (!StateMgr.INSTANCE.canGameOver()) {
            return
        }
        if (Play.DataPve.checkWin() && !this.panelBonus.active) {
            this.canTouch = true;
        }
        if (!Play.DataPve.checkWin()) {
            this.checkResult();
            return
        }
        StateMgr.INSTANCE.isStopOperate = true;
        this.panelBonus.active = true;

        // 时间关卡
        if (Play.DataPve.isTimeLevel) {
            this.checkResult();
            return
        }
        StateMgr.INSTANCE.isGameOver = false;

        if (this.gameStat == GAME_STAT.GAMEING) {
            Play.DataPve.saveStepAndTime();
            Play.DataPve.gameBegan = false;
            this.canTouch = false;
            this.stopRemindAction();
            this.hadRemindTime();
            // this.bonusCallBack = cb;
            this.PlayUI.Audio.stopBgPve();
            this.PlayUI.Audio.bonusTime();
            this.gameStat = GAME_STAT.BONUSTIME;
            await this.panelHeader.gameOver();
            StateMgr.INSTANCE.isBonusActionOver = true;

            StateMgr.INSTANCE.isGameOver = true;
            // let bombArr = 0;
            this.hadAudAreaPlay = false;
            this.hadAudColPlay = false;

            this.igniteBomb();
        } else if (!this.hadBomb() && StateMgr.INSTANCE.canBonus() && this.gameStat == GAME_STAT.BONUSTIME) {
            StateMgr.INSTANCE.isBonusOver = true;
            // let hasBomb = await this.bonusTime();

            await this.bonusTime();
            this.gameStat = GAME_STAT.CHECKRESULT;
            // StateMgr.INSTANCE.isGameOver = false;
            this.igniteBomb();

            // if (!hasBomb) {
            //     this.gameOver();
            // }
        } else if (!this.hadBomb() && (this.gameStat == GAME_STAT.CHECKRESULT && StateMgr.INSTANCE.isStopOperate)) {
            this.PlayUI.Audio.stopBonusTime();
            this.gameStat = GAME_STAT.GAMEOVER;
            this.checkResult();
        }
    }

    hadBomb() {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BOMB) {
                    return true;
                }
            }
        }
        return false
    }

    // 按规律引爆炸弹
    // 从左上角开始引爆第一个，等待连锁触发完成，引爆第二个
    async igniteBomb() {
        var count = 0;
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BOMB) {
                    var bombComponent = this.tiles[x][y];
                    bombComponent.ignite();
                    count++;
                    return;
                }
            }
        }
        await Algorithm.delay(0.2);
        this.moveAllTileDown();
    }

    async showBonusTime() {
        if (StateMgr.INSTANCE.canBonus()) {
            await this.bonusTime();
            StateMgr.INSTANCE.isBonusOver = true;
            // this.bonusCallBack && this.bonusCallBack();
        }
    }

    resetRemindTime() {
        this.hadRemind = false
        this.oneSec = 0;
        this.remindTime = 0;
    }
    hadRemindTime() {
        this.hadRemind = true
    }

    // 背景波浪动画
    effect(x, y) {
        if (!this.tileBgs[x] || !this.tileBgs[x][y] || this.tileBgs[x][y].hadAction) {
            this.scheduleOnce(() => {
                if (this.tileBgs[x + 1] && this.tileBgs[x + 1][y] && !this.tileBgs[x + 1][y].hadAction) {
                    this.effect(x + 1, y);
                }
                if (this.tileBgs[x - 1] && this.tileBgs[x - 1][y] && !this.tileBgs[x - 1][y].hadAction) {
                    this.effect(x - 1, y);

                }
                if (this.tileBgs[x] && this.tileBgs[x][y + 1] && !this.tileBgs[x][y + 1].hadAction) {
                    this.effect(x, y + 1);

                }
                if (this.tileBgs[x] && this.tileBgs[x][y - 1] && !this.tileBgs[x][y - 1].hadAction) {
                    this.effect(x, y - 1);

                }
            }, 0.1)
            return;
        }
        this.tileBgs[x][y].hadAction = true;

        let action = cc.sequence(
            cc.fadeTo(0.1, 150),
            cc.callFunc(() => {
                if (this.tileBgs[x + 1] && this.tileBgs[x + 1][y] && !this.tileBgs[x + 1][y].hadAction) {
                    this.effect(x + 1, y);
                }
                if (this.tileBgs[x - 1] && this.tileBgs[x - 1][y] && !this.tileBgs[x - 1][y].hadAction) {
                    this.effect(x - 1, y);

                }
                if (this.tileBgs[x] && this.tileBgs[x][y + 1] && !this.tileBgs[x][y + 1].hadAction) {
                    this.effect(x, y + 1);

                }
                if (this.tileBgs[x] && this.tileBgs[x][y - 1] && !this.tileBgs[x][y - 1].hadAction) {
                    this.effect(x, y - 1);

                }
            }),
            cc.fadeTo(0.2, 255),
            cc.fadeOut(0.4),
            cc.callFunc(() => {
                this.tileBgs[x][y].hadAction = false;
            })
        );

        this.tileBgs[x][y].getChildByName('sprLight').runAction(action);
    }

    async bonusTime() {
        var self = this;

        if (this.panelHeader.nodLastTime.active) {
            return;
        }

        this.effect(3, 4);
        this.effect(4, 4);

        await Algorithm.delay(1);

        var arrBlock = [];
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                    arrBlock.push(x + '#' + y);
                }
            }
        }

        var arr = new Array();
        var count = Play.DataPve.remainStep;
        if (Play.DataPve.levelData.step == 0) {
            count = 0;
        }
        Algorithm.randomMore(count, arrBlock.length, arr, (index) => {
            return false;
        });

        for (var i = 0; i < arr.length; ++i) {
            let x = Number(arrBlock[arr[i]].split("#")[0]);
            let y = Number(arrBlock[arr[i]].split("#")[1]);

            var nodBonusBall = cc.instantiate(Play.DataPve.pfbBonusBall);
            nodBonusBall.parent = this.panelBonus;
            var startPs = this.node.convertToNodeSpaceAR(this.panelHeader.labCountDown.node.parent.convertToWorldSpaceAR(this.panelHeader.labCountDown.node.position));
            nodBonusBall.setPosition(startPs);
            var position = this.node.convertToNodeSpaceAR(this.panelTile.convertToWorldSpaceAR(this.tiles[x][y].node.getPosition()));
            nodBonusBall.runAction(cc.sequence(
                cc.moveTo(0.5, position),
                cc.callFunc(function (x, y, nodBonusBall) {
                    let type = Math.random() > 0.5 ? BOMB_TYPE.BOMB_AROUND : BOMB_TYPE.BOMB_COLUMN;
                    this.spawnBomb(x, y, type);
                    this.panelHeader.addStep();
                    nodBonusBall.destroy();
                }.bind(this, x, y, nodBonusBall))
            ));
            await Algorithm.delay(0.3);
        }
        await Algorithm.delay(0.4);
        this.hadAudAreaPlay = false;
    }

    update(dt) {
        if (!Play.DataPve.gameBegan) {
            return;
        }

        this.oneSec += dt;
        this.remindTime += dt;
        if (this.oneSec >= 2 && !this.hadRemind && !StateMgr.INSTANCE.isStopOperate) {
            this.oneSec = 0;
            // 提示动画
            var allArr = Algorithm.checkoutMatch(this.tiles);

            if (this.remindTime >= 5 && allArr.length > 0) {
                this.hadRemindTime();
                var index = Math.floor(Math.random() * allArr.length);
                var arr = allArr[index];
                this.stopRemindAction();

                this.lastArr = arr;
                for (let i = 0; i < arr.length; ++i) {
                    var x = Number(arr[i].split("#")[0]);
                    var y = Number(arr[i].split("#")[1]);
                    if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                        this.tiles[x][y].node.stopActionByTag(Action_type.Tip);

                        var action = cc.repeatForever(
                            cc.sequence(
                                // cc.blink(1, 3),
                                cc.scaleTo(0.1, 1.1, 1.1),
                                cc.scaleTo(0.2, 0.9, 0.9),
                                cc.scaleTo(0.1, 1.1, 1.1),
                                cc.scaleTo(0.2, 0.9, 0.9),
                                cc.scaleTo(0.1, 1.1, 1.1),
                                cc.scaleTo(0.2, 0.9, 0.9),
                                cc.scaleTo(0.15, 1.05, 1.05),
                                cc.scaleTo(0.05, 1, 1),
                                cc.delayTime(1.5),
                            )
                        )

                        this.tiles[x][y].node.runAction(action);
                        action.setTag(Action_type.Tip);
                    }
                }
            } else if (allArr.length <= 0) {
                GamePersist.INSTANCE.toast('没有可消除的组合')
                this.hadRemindTime();
                this.canTouch = false;
                this.scheduleOnce(() => {
                    Algorithm.shuffleTiles(this.tiles, () => {
                        this.scheduleOnce(function () {
                            this.resetRemindTime();
                            this.canTouch = true;
                            this.moveAllTileDown(false);
                        }, 1);
                    });
                }, 2)
            }
        }
    }
}
