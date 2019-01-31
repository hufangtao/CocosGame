import PanelHeader from "./PanelHeader";

import {
    TILE_TYPE,
    MAX_MATCH,
    BOMB_TYPE,
    GRID_TYPE,
    GUIDE_TYPE, TILE_ZINDEX, BLOCKDES_TYPE, BLOCK_COLOR, WALL_TYPE, PVP_FRUIT_COLOR_CNT, TEACH_FRUIT_COLOR_CNT, PlaySide, ColorType, FaceType, FaceAnimationType
} from "../PlayDefine";
import { Play, Home } from "../../../module/Modules";
import PlayUI from "./PlayUI";
import PvpGuide from "./PvpGuide";
import StateMgr from "../pve/StateMgr";
import * as Algorithm from "../Algorithm";
import { Bottom } from "./Bottom";
import { PlayStolenAnimalC2S, PlayBoardStatusC2S } from "../../../common/net/proto/mods/ProtoSectionPlay";
import NetUtil from "../../../common/net/NetUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LayerGame extends cc.Component {
    @property(cc.Prefab)
    pfbScore: cc.Prefab = null;
    @property(cc.Prefab)
    pfbBlock: cc.Prefab = null;
    @property(cc.Prefab)
    pfbBomb: cc.Prefab = null;
    @property(cc.Prefab)
    pfbObstacle: cc.Prefab = null;
    @property(cc.Prefab)
    pfbTileBg: cc.Prefab = null;
    @property(cc.Prefab)
    pfbEncourage: cc.Prefab = null;
    @property(cc.Prefab)
    pfbWall: cc.Prefab = null;
    @property(cc.Prefab)
    pfbParticle: cc.Prefab = null;

    @property(cc.Node)
    panelTile: cc.Node = null;
    @property(cc.Node)
    panelSpine: cc.Node = null;

    @property(cc.Node)
    panelParticle: cc.Node = null;

    @property(PanelHeader)
    panelHeader: PanelHeader = null;

    @property(PvpGuide)
    pvpGuide: PvpGuide = null;

    @property(cc.Node)
    panelGrid: cc.Node = null;

    @property(Bottom)
    bottom: Bottom = null;

    @property(cc.SpriteFrame)
    spfTileBg: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfTileBgLight: cc.SpriteFrame = null;

    @property(cc.Node)
    nodCloud: cc.Node = null;

    public pvpTeach = false;
    public pvpAi = false;
    private spawnedBomb = false;
    private first = true;
    private firstDown = false;
    private firstBombCol = true;
    private firstBombColStr = true;
    private firstBombA = true;
    private firstSave = true;
    private firstGenFlower = true;
    private saveDown = 0;

    public PlayUI: PlayUI = null;

    public remindTime = 0;// 提示时间
    public oneSec = 0;  // 一秒累加时间
    public accumulatorTime = 0; //蓄力条刷新时间

    public tiles = [];
    private tileBgs = [];

    private hadRemind = false;

    public maxMatchCount = 0;
    public matchCountSum = 0; //蓄力条每次计数

    public canTouch = false;

    public bombOver = true;// 炸弹结束
    public downOver = true;// 下落结束

    public onLoad() {
        this.bottom.init(this);
    }

    public init(playUI) {
        this.PlayUI = playUI;
    }

    public start() {
    }

    public guide() {
        if (this.pvpTeach) {
            this.pvpGuide.setGuide(GUIDE_TYPE.MATCH1);
            this.pvpGuide.setGuide(GUIDE_TYPE.MATCH2);
        }
    }

    public gameBegain() {
        this.bottom.initCanTouchSlot();
        Play.DataPvp.initFreeNodes();
        this.panelTile.destroyAllChildren();
        this.panelParticle.destroyAllChildren();
        this.panelSpine.destroyAllChildren();
        this.bombOver = true;

        this.destroyAllTilesOver = true;
        this.remindTime = 0;
        this.oneSec = 0;
        this.hadRemind = false;

        this.panelTile.parent.getComponent('Board').initMap(this);
    }


    // 发送棋盘上宠物个数
    sendBoardPetCnt() {
        let playBoardStatus = new PlayBoardStatusC2S();
        playBoardStatus.animalNum = Play.DataPvp.getBoardPetCnt();
        NetUtil.SendMsg(playBoardStatus);
    }

    public operateLogic(touchX, touchY, tileType, type, subType, isTouch = false) {
        if (tileType == TILE_TYPE.BLOCK) {
            this.destroyBlock(touchX, touchY, type);
        } else if (tileType == TILE_TYPE.BOMB) {
            this.ignite(touchX, touchY, type, null, isTouch);
        }
    }

    ignite(touchX, touchY, type, arr, isTouch = false) {
        switch (type) {
            case BOMB_TYPE.BOMB_COLUMN:
                this.bombColumn(touchX, touchY, isTouch, arr);
                break;
            case BOMB_TYPE.BOMB_ROW:
                this.bombRow(touchX, touchY, isTouch, arr);
                break;
            case BOMB_TYPE.BOMB_COLUMNSTRONG:
                this.bombColumnStrong(touchX, touchY, isTouch, arr);
                break;
            case BOMB_TYPE.BOMB_ROWSTRONG:
                this.bombRowStrong(touchX, touchY, isTouch, arr);
                break;
            case BOMB_TYPE.BOMB_AROUND:
                this.bombAround(touchX, touchY, isTouch);
                break;
        }
    }


    private randomMore(count, length, arr, cb) {
        if (count > length) {
            return
        }
        let index = Math.floor(Math.random() * length);
        for (let i = 0; i < arr.length; ++i) {
            if (index == arr[i]) {
                this.randomMore(count, length, arr, cb);
                return;
            }
        }
        if (cb(index)) {
            this.randomMore(count, length, arr, cb);
            return;
        }
        arr.push(index);
        count--;
        if (count > 0) {
            this.randomMore(count, length, arr, cb);
        }
    }

    // 每操作一次,改变爆竹方向
    private onceOperate() {
        this.changeCracker();
    }

    // 改变爆竹方向
    private changeCracker() {
        for (let x = 0; x < this.tiles.length; ++x) {
            for (let y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BOMB) {
                    this.tiles[x][y].changeType();
                }
            }
        }
    }

    /**
     * 增加操作数，点击炸弹不计入
     */
    addOperateCount() {
        Play.DataPvp.operateCount++;
    }
    // 点击方块
    private async destroyBlock(touchX, touchY, curNum) {
        var self = this;
        this.stopRemindAction();
        var arr = [];
        var scanArr = [];
        Algorithm.scanAround(touchX, touchY, -1, -1, curNum, arr, scanArr, this.tiles, false);

        if (arr.length > 1) {
            this.addOperateCount();
            this.onceOperate();

            if (this.pvpGuide) {
                this.firstDown = true;
            }
            this.matchCountSum += arr.length;
            if (this.maxMatchCount < arr.length) {
                this.maxMatchCount = arr.length;
            }

            this.hadRemind = true;
            this.remindTime = 0;
            if (arr.length >= 5) {
                this.PlayUI.Audio.spawnBomb();

                let bomb;
                let type;
                for (var index in arr) {
                    var x = Number(arr[index].split("#")[0]);
                    var y = Number(arr[index].split("#")[1]);
                    this.tiles[x][y].node.stopAllActions();
                    if (x == touchX && y == touchY) {
                        Algorithm.tileBgEffect(this, 0, x, y, 0.5);
                        bomb = this.tiles[x][y].node;
                        type = bomb.type;
                        bomb.zIndex = TILE_ZINDEX.ACTION;
                    }
                }

                let actionArr = [];
                for (var index in arr) {
                    var x = Number(arr[index].split("#")[0]);
                    var y = Number(arr[index].split("#")[1]);
                    this.affectAround(x, y);

                    Algorithm.tileBgEffect(this, 0, x, y, 0.5);
                    if (this.tiles[x][y].node != bomb) {
                        this.tiles[x][y].node.zIndex = TILE_ZINDEX.ACTION_LOW;
                    }
                    let blockComponent = self.tiles[x][y];
                    self.tiles[x][y] = null;
                    blockComponent.canTouch = false;
                    let position = blockComponent.node.position.sub(bomb.position);
                    position.mulSelf(0.1);
                    (function (blockComponent, position) {
                        var action = cc.sequence(
                            cc.spawn(
                                cc.scaleTo(0.05, 1.1),
                                cc.moveBy(0.05, position),
                            ),
                            cc.delayTime(0.05),
                            cc.moveTo(0.1, bomb.getPosition()).easing(cc.easeQuarticActionIn()),
                            cc.callFunc(() => {
                                blockComponent.destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
                            })
                        )
                        Algorithm.addAction(actionArr, blockComponent.node, action);
                    })(blockComponent, position);
                }

                self.showEncourage(arr);

                self.chooseBomb(touchX, touchY, arr.length);

                Play.DataPvp.stepSpawnPet += arr.length;
                // 生成宠物
                // if (Play.DataPvp.objectiveSpawnCnt[0] - this.panelHeader.myAnimalCount < 8) {
                //     this.spawnPets(touchX, touchY, arr);
                // }
                await Algorithm.runActions(actionArr);

                this.spawnedBomb = true;
                this.canTouch = true;
                this.moveAllTileDown();
            } else {
                //执行消除
                this.PlayUI.Audio.strip();
                for (var index in arr) {
                    var x = Number(arr[index].split("#")[0]);
                    var y = Number(arr[index].split("#")[1]);
                    this.affectAround(x, y);

                    // 播放粒子
                    Algorithm.tileBgEffect(this, 0, x, y, 0.5);
                    // 销毁方块
                    this.tiles[x][y].node.zIndex = TILE_ZINDEX.ACTION_LOW;
                    this.tiles[x][y].destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);

                }
                // await Algorithm.delay(0.4);
                Play.DataPvp.stepSpawnPet += arr.length;
                this.moveAllTileDown();

            }
        } else {
            this.tiles[touchX][touchY].node.stopActionByTag(3);
            let action = cc.sequence(
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
            action.setTag(3);
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
        if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.WALL) {
            this.tiles[x][y].affected();
        }
    }

    // 选择生成炸弹
    chooseBomb(x, y, length) {
        if (Play.DataPvp.isSpawnStrongRocket) {
            this.spawnBomb(x, y, BOMB_TYPE.BOMB_COLUMNSTRONG);
        } else {
            this.spawnBomb(x, y, BOMB_TYPE.BOMB_COLUMN);
        }

        return;

        if (length < 7) {
            this.spawnBomb(x, y, BOMB_TYPE.BOMB_COLUMN);
        } else {
            this.spawnBomb(x, y, BOMB_TYPE.BOMB_COLUMNSTRONG);
        }
    }

    // 所有炸弹是否炸完
    isBombOver(arr) {
        for (let i = 0; i < arr.length; ++i) {
            if (!arr[i].isDestroying) {
                return false;
            }
        }
        return true;
    }

    // 点击炸弹列
    private async bombColumn(touchX, touchY, isTouch, arr) {
        //console.log('bombcol')
        var self = this;
        this.bombOver = false;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];
        if (bombComponent.tileType !== TILE_TYPE.BOMB) {
            return;
        }
        this.stopRemindAction();
        this.remindTime = 0;
        // this.canTouch = false;
        this.PlayUI.Audio.bombRow();
        nodBomb.getComponent(cc.Animation).play('aniBombCol');
        Algorithm.bothSiedAct(touchX, touchY, this.tiles);

        this.tiles[touchX][touchY] = null;
        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);

        arr = arr || [];
        arr.push(bombComponent);
        for (let i = touchY + 1, j = touchY - 1; i < self.tiles[0].length || j >= 0; ++i, --j) {
            self.bombUp(touchX, touchY, touchX, i, bombComponent, arr);
            self.bombDown(touchX, touchY, touchX, j, bombComponent, arr);
        }

        await Algorithm.delay(0.4);
        if (isTouch) {
            this.onceOperate();
        }

        bombComponent.destroyTile();
        if (this.isBombOver(arr)) {
            this.showEncourage(arr);
        }
        this.canTouch = true;
        this.bombOver = true;
        self.moveAllTileDown();
    }
    // 点击炸弹行
    private async bombRow(touchX, touchY, isTouch, arr) {
        var self = this;
        this.bombOver = false;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];
        if (bombComponent.tileType !== TILE_TYPE.BOMB) {
            return;
        }

        this.stopRemindAction();
        this.remindTime = 0;
        // this.canTouch = false;
        this.PlayUI.Audio.bombRow();
        nodBomb.rotation = 90;
        nodBomb.getComponent(cc.Animation).play('aniBombCol');
        // Algorithm.bothSiedAct(touchX, touchY, this.tiles);
        this.tiles[touchX][touchY] = null;
        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);

        arr = arr || [];
        arr.push(bombComponent);
        for (let i = touchX + 1, j = touchX - 1; i < self.tiles.length || j >= 0; ++i, --j) {
            self.bombRight(touchX, touchY, touchY, i, bombComponent, arr);
            self.bombLeft(touchX, touchY, touchY, j, bombComponent, arr);
        }

        await Algorithm.delay(0.4);
        if (isTouch) {
            this.onceOperate();
        }

        bombComponent.destroyTile();
        if (this.isBombOver(arr)) {
            this.showEncourage(arr);
        }
        this.canTouch = true;
        this.bombOver = true;
        self.moveAllTileDown();
    }

    // 点击炸弹列加强
    private async bombColumnStrong(touchX, touchY, isTouch, arr) {
        //console.log('bombcol')
        var self = this;
        this.bombOver = false;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];
        if (bombComponent.tileType !== TILE_TYPE.BOMB) {
            return;
        }
        this.stopRemindAction();
        this.remindTime = 0;
        // this.canTouch = false;
        this.PlayUI.Audio.bombRow();
        nodBomb.getComponent(cc.Animation).play('aniBombColStrong');
        Algorithm.bothSiedAct(touchX, touchY, this.tiles);

        this.tiles[touchX][touchY] = null;
        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);

        arr = arr || [];
        arr.push(bombComponent);
        for (let i = touchY + 1, j = touchY - 1; i < self.tiles[0].length || j >= 0; ++i, --j) {
            self.bombUp(touchX, touchY, touchX, i, bombComponent, arr);
            self.bombDown(touchX, touchY, touchX, j, bombComponent, arr);
        }

        await Algorithm.delay(0.1);
        let tX = touchX - 1;
        if (tX >= 0) {
            for (let i = touchY, j = touchY; i < self.tiles[0].length || j >= 0; ++i, --j) {
                self.bombUp(touchX, touchY, tX, i, bombComponent, arr);
                self.bombDown(touchX, touchY, tX, j, bombComponent, arr);
            }
        }

        tX = touchX + 1;
        if (tX < self.tiles[0].length) {
            for (let i = touchY, j = touchY; i < self.tiles[0].length || j >= 0; ++i, --j) {
                self.bombUp(touchX, touchY, tX, i, bombComponent, arr);
                self.bombDown(touchX, touchY, tX, j, bombComponent, arr);
            }
        }

        await Algorithm.delay(0.4);
        if (isTouch) {
            this.onceOperate();
        }
        bombComponent.destroyTile();
        if (this.isBombOver(arr)) {
            this.showEncourage(arr);
        }
        this.canTouch = true;
        this.bombOver = true;
        self.moveAllTileDown();
    }

    // 点击炸弹行加强
    private async bombRowStrong(touchX, touchY, isTouch, arr) {
        var self = this;
        this.bombOver = false;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];
        if (bombComponent.tileType !== TILE_TYPE.BOMB) {
            return;
        }
        this.stopRemindAction();
        this.remindTime = 0;
        this.canTouch = false;
        this.PlayUI.Audio.bombRow();
        nodBomb.rotation = 90;
        nodBomb.getComponent(cc.Animation).play('aniBombColStrong');
        // Algorithm.bothSiedAct(touchX, touchY, this.tiles);
        this.tiles[touchX][touchY] = null;
        Algorithm.tileBgEffect(this, 0, touchX, touchY, 0.8);


        arr = arr || [];
        arr.push(bombComponent);
        for (let i = touchX + 1, j = touchX - 1; i < self.tiles.length || j >= 0; ++i, --j) {
            self.bombRight(touchX, touchY, touchY, i, bombComponent, arr);
            self.bombLeft(touchX, touchY, touchY, j, bombComponent, arr);
        }
        await Algorithm.delay(0.2);

        let tY = touchY - 1;
        if (tY >= 0) {
            for (let i = touchX, j = touchX; i < self.tiles.length || j >= 0; ++i, --j) {
                self.bombRight(touchX, touchY, tY, i, bombComponent, arr);
                self.bombLeft(touchX, touchY, tY, j, bombComponent, arr);
            }
        }

        tY = touchY + 1;
        if (tY < self.tiles.length) {
            for (let i = touchX, j = touchX; i < self.tiles.length || j >= 0; ++i, --j) {
                self.bombRight(touchX, touchY, tY, i, bombComponent, arr);
                self.bombLeft(touchX, touchY, tY, j, bombComponent, arr);
            }
        }

        await Algorithm.delay(0.4);
        if (isTouch) {
            this.onceOperate();
        }
        bombComponent.destroyTile();
        if (this.isBombOver(arr)) {
            this.showEncourage(arr);
        }
        this.canTouch = true;
        this.bombOver = true;
        self.moveAllTileDown();
    }

    playRowBombAni(line) {
        let nodBomb = Play.DataPvp.popBomb();
        if (nodBomb.parent != this.panelTile) {
            nodBomb.parent = this.panelTile;
        }
        let bombComponent = nodBomb.getComponent('BombPvp');
        bombComponent.init();
        nodBomb.y = 80 * line + 40;
        nodBomb.scale = 1;
        nodBomb.rotation = 90;
        nodBomb.getComponent(cc.Animation).play('aniBombCol');
    }



    bombUp(touchX, touchY, x, i, bombComponent, arr) {
        var self = this;
        if (!self.tiles[x][i]) {
            return;
        }

        this.scheduleOnce(() => {
            let tileComponent = self.tiles[x][i];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(this, 0, x, i, 0.8);
            if (tileComponent.tileType === TILE_TYPE.BOMB) {
                if (tileComponent.type === BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(arr, false);
                } else if (touchX === x && tileComponent.type === BOMB_TYPE.BOMB_COLUMNSTRONG
                    && bombComponent.type === BOMB_TYPE.BOMB_COLUMNSTRONG) {
                    tileComponent.ignite(arr, false);
                } else {
                    tileComponent.ignite(arr);
                }
            } else if (tileComponent.tileType === TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);
            } else if (tileComponent.tileType === TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(x, i, self.tiles)
        }, (i - touchY) * 0.02)

    }

    bombDown(touchX, touchY, x, j, bombComponent, arr) {
        var self = this;
        if (!self.tiles[x][j]) {
            return;
        }

        this.scheduleOnce(() => {
            let tileComponent = self.tiles[x][j];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(this, 0, x, j, 0.8);
            if (tileComponent.tileType === TILE_TYPE.BOMB) {
                if (tileComponent.type === BOMB_TYPE.BOMB_COLUMN) {
                    tileComponent.ignite(arr, false);
                } else if (touchX === x && tileComponent.type === BOMB_TYPE.BOMB_COLUMNSTRONG
                    && bombComponent.type === BOMB_TYPE.BOMB_COLUMNSTRONG) {
                    tileComponent.ignite(arr, false);
                } else {
                    tileComponent.ignite(arr);
                }
            } else if (tileComponent.tileType === TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);
            } else if (tileComponent.tileType === TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            Algorithm.bothSiedAct(x, j, self.tiles)
        }, (touchY - j) * 0.02)
    }

    bombRight(touchX, touchY, y, i, bombComponent, arr) {
        var self = this;

        if (!self.tiles[i] || !self.tiles[i][y]) {
            return;
        }

        this.scheduleOnce(() => {
            let tileComponent = self.tiles[i][y];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(this, 0, i, y, 0.8);
            if (tileComponent.tileType === TILE_TYPE.BOMB) {
                if (tileComponent.type === BOMB_TYPE.BOMB_ROW) {
                    tileComponent.ignite(arr, false);
                } else if (touchX === y && tileComponent.type === BOMB_TYPE.BOMB_ROWSTRONG
                    && bombComponent.type === BOMB_TYPE.BOMB_ROWSTRONG) {
                    tileComponent.ignite(arr, false);
                } else {
                    tileComponent.ignite(arr);
                }
            } else if (tileComponent.tileType === TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);
            } else if (tileComponent.tileType === TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            // Algorithm.bothSiedAct(i, touchY, self.tiles)
        }, (i - touchX) * 0.02)

    }

    bombLeft(touchX, touchY, y, j, bombComponent, arr) {
        var self = this;
        if (!self.tiles[j] || !self.tiles[j][y]) {
            return;
        }

        this.scheduleOnce(() => {
            let tileComponent = self.tiles[j][y];
            if (!tileComponent || tileComponent.isDestroying) {
                return;
            }
            Algorithm.tileBgEffect(this, 0, j, y, 0.8);
            if (tileComponent.tileType === TILE_TYPE.BOMB) {
                if (tileComponent.type === BOMB_TYPE.BOMB_ROW) {
                    tileComponent.ignite(arr, false);
                } else if (touchX === y && tileComponent.type === BOMB_TYPE.BOMB_ROWSTRONG
                    && bombComponent.type === BOMB_TYPE.BOMB_ROWSTRONG) {
                    tileComponent.ignite(arr, false);
                } else {
                    tileComponent.ignite(arr);
                }
            } else if (tileComponent.tileType === TILE_TYPE.BLOCK) {
                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);
            } else if (tileComponent.tileType === TILE_TYPE.WALL) {
                tileComponent.destroyTile();
            }
            // Algorithm.bothSiedAct(j, touchY, self.tiles)
        }, (touchX - j) * 0.02)
    }

    // 点击炸弹周围
    private async bombAround(touchX, touchY, isTouch) {
        var self = this;
        this.bombOver = false;

        var nodBomb = this.tiles[touchX][touchY].node;
        var bombComponent = this.tiles[touchX][touchY];

        this.stopRemindAction();
        this.remindTime = 0;
        // this.canTouch = false;

        await this.bombAroundAnimation(touchX, touchY, nodBomb);
        self.moveAllTileDown();

        self.canTouch = true;
        self.bombOver = true;

        this.PlayUI.Audio.bombAround();
    }

    async bombAroundAnimation(touchX, touchY, nodBomb) {
        var self = this;
        return new Promise((resolve, reject) => {
            for (var i = 2; i >= -2; --i) {
                for (var j = 2; j >= -2; --j) {
                    if ((i == 0 && j == 0) || !self.tiles[touchX + i] || !self.tiles[touchX + i][touchY + j]) {
                        continue
                    }
                    // 粒子
                    if (i == 2 || j == 2 || i == -2 || j == -2) {
                        Algorithm.tileBgEffect(self, 2, touchX + i, touchY + j, 0.7);
                    } else {
                        Algorithm.tileBgEffect(self, 0, touchX + i, touchY + j, 0.9);
                    }

                    if (self.tiles[touchX + i][touchY + j].tileType === TILE_TYPE.BLOCK) {
                        var tileComponent = self.tiles[touchX + i][touchY + j];
                        if (!tileComponent.isDestroying) {
                            tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                tileComponent.destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);
                            }.bind(self, i, j, tileComponent));
                        }
                    } else if (self.tiles[touchX + i][touchY + j].tileType === TILE_TYPE.BOMB) {
                        var tileComponent = self.tiles[touchX + i][touchY + j];
                        if (!tileComponent.isDestroying) {
                            tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                                tileComponent.ignite();
                            }.bind(self, i, j, tileComponent));
                        }
                    } else if (self.tiles[touchX + i][touchY + j].tileType === TILE_TYPE.PET) {
                        var tileComponent = self.tiles[touchX + i][touchY + j];
                        tileComponent.billowAct(touchX, touchY, function (i, j, tileComponent) {
                        }.bind(self, i, j, tileComponent));
                    }
                }
            }
            var animComponent = nodBomb.getComponent(cc.Animation);

            animComponent.onFire = function () {
                let bombComponent = nodBomb.getComponent('BombPvp');
                self.tiles[bombComponent.x][bombComponent.y] = null;
                bombComponent.destroyTile();
                resolve();
            }
            animComponent.play('aniBombArea');
        })
    }

    async tileDown() {
        for (let x = 0; x < this.tiles.length; ++x) {
            for (let y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y]) {
                    continue;
                }
                for (let yy = y + 1; yy < this.tiles[x].length; ++yy) {
                    if (this.tiles[x][yy] && this.tiles[x][yy].tileType === TILE_TYPE.WALL) {
                        break;
                    }
                    if (!this.tiles[x][yy] || (this.tiles[x][yy].tileType === TILE_TYPE.BOMB && this.tiles[x][yy].isDestroying)) {
                        continue;
                    }
                    if (this.tiles[x][yy].tileType === TILE_TYPE.PET && y === 0) {
                        this.tiles[x][y] = this.tiles[x][yy];
                        this.tiles[x][yy] = null;
                        this.tiles[x][y].moveTo(x, y, null);
                        yy--;
                        continue;
                    }
                    this.tiles[x][y] = this.tiles[x][yy];
                    this.tiles[x][yy] = null;
                    this.tiles[x][y].moveTo(x, y, null);
                    break;
                }
            }
        }
        this.fillVavancy();
    }


    // 根据游戏阶段和下方水果颜色，设置下落水果颜色
    getBlockColor(x, y) {
        if (this.pvpTeach) {
            return Math.floor(Math.random() * TEACH_FRUIT_COLOR_CNT) + 1;
        }
        let num = Math.random();
        let arrType = [BLOCK_COLOR.RED, BLOCK_COLOR.GREEN, BLOCK_COLOR.BLUE, BLOCK_COLOR.YELLOW, BLOCK_COLOR.PURPLE, BLOCK_COLOR.SIX];
        for (let i = 0; i < arrType.length; ++i) {
            if (this.tiles[x] && this.tiles[x][y - 1] && arrType[i] === this.tiles[x][y - 1].type) {
                let t = arrType[0];
                arrType[0] = arrType[i];
                arrType[i] = t;
                break;
            }
        }

        if (!Play.DataPvp.isSpawnStrongRocket) {
            let color = 0;
            if (num <= 0.25) {
                color = arrType[0];
            } else if (num <= 0.4) {
                color = arrType[2];
            } else if (num <= 0.55) {
                color = arrType[3];
            } else if (num <= 0.7) {
                color = arrType[4];
            } else if (num <= 0.85) {
                color = arrType[5];
            } else if (num <= 1) {
                color = arrType[6];
            }
            return color;
        } else {
            return null;
        }

    }


    /**
     * 所有方块向下移动
     */
    public async moveAllTileDown() {
        if (!this.destroyAllTilesOver) {
            return;
        }
        this.hadRemindTime();
        this.downOver = false;
        //console.log('moveDown');

        this.tileDown();
    }

    // 空缺地方生成tile
    async fillVavancy() {
        // 因为有花朵，可能存在空格子，所以要从上向下遍历
        let hadNull = false;
        for (let x = 0; x < this.tiles.length; ++x) {
            for (let y = 8; y >= 0; --y) {
                if (!this.tiles[x][y]) {
                    hadNull = true;
                    break;
                }
                if (this.tiles[x][y].tileType === TILE_TYPE.WALL) {
                    break;
                }
            }
        }

        if (hadNull) {
            for (let x = 0; x < this.tiles.length; ++x) {
                let minY = -1;

                for (let y = 8; y >= 0; --y) {
                    if (this.tiles[x][y]) {
                        if (this.tiles[x][y].tileType === TILE_TYPE.WALL) {
                            break;
                        } else {
                            continue;
                        }
                    }
                    minY = y;
                }
                if (minY < 0) {
                    continue;
                }
                for (let y = minY; y < 9; ++y) {
                    if (this.tiles[x][y]) {
                        if (this.tiles[x][y].tileType === TILE_TYPE.WALL) {
                            break;
                        } else {
                            continue;
                        }
                    }

                    if (y - 1 < 0 || (this.tiles[x][y - 1] && this.tiles[x][y - 1].tileType !== TILE_TYPE.BLOCK)) {
                        this.spawnTile(x, y, minY, null);
                    }
                    if (this.tiles[x][y - 1] && this.tiles[x][y - 1].tileType === TILE_TYPE.BLOCK) {
                        let color = this.getBlockColor(x, y);
                        // let color = Math.floor(Math.random() * PVP_FRUIT_COLOR_CNT) + 1;
                        this.spawnTile(x, y, minY, color);
                    }
                }
            }
            this.tileDown();
        } else {
            await Algorithm.delay(0.5);
            this.downOver = true;

            this.pveTeach();
            this.resetRemindTime();
        }
    }

    getObstacle() {
        let self = this;
        Play.DataPvp.petCnt++;
        if (self.pvpTeach || self.pvpAi) {
            self.PlayUI.getAnimal(Play.DataPvp.petAllCnt, Play.DataPlay.MySide);
            let randomTime = Math.random() * 5;
            self.scheduleOnce(function () {
                if (self.panelHeader.remainTime > 1) {
                    let randomNum = Math.floor(Math.random() + 0.3);
                    Play.DataPvp.opponentPetAllCnt += randomNum;
                    if (randomNum != 0) {
                        self.PlayUI.getAnimal(Play.DataPvp.opponentPetAllCnt, Play.DataPlay.AiSide);
                    }
                }
            }, randomTime);
        }

        if (this.pvpTeach && this.firstSave) {
            this.pvpGuide.setGuide(GUIDE_TYPE.SAVE_SUC);
            this.firstSave = false;
        }
    }



    // pve教学
    pveTeach() {
        var self = this;
        // pvp教学第一次消除
        if (this.pvpTeach && this.firstDown && (!this.spawnedBomb)) {
            this.firstDown = false;
        }

        if (this.pvpTeach && this.spawnedBomb && (this.saveDown == 0) && (this.firstBombA || this.firstBombCol)) {
            for (let x = 0; x < self.tiles.length; ++x) {
                for (let y = 0; y < self.tiles[0].length; ++y) {
                    if (self.tiles[x][y] && self.tiles[x][y].tileType === TILE_TYPE.BOMB) {
                        let bombComponent = self.tiles[x][y];
                        let panelpos = this.panelTile.convertToWorldSpaceAR(bombComponent.node.getPosition());
                        switch (bombComponent.type) {
                            case BOMB_TYPE.BOMB_COLUMN:
                                if (this.firstBombCol) {
                                    this.pvpGuide.setGuide(GUIDE_TYPE.BOMB_COL, panelpos);
                                    this.pvpGuide.setGuide(GUIDE_TYPE.BOMB_SUC);
                                    this.firstBombCol = false;
                                }
                                break;
                            case BOMB_TYPE.BOMB_COLUMNSTRONG:
                                if (this.firstBombA) {
                                    this.pvpGuide.setGuide(GUIDE_TYPE.BOMB_COL_STR, panelpos);
                                    this.pvpGuide.setGuide(GUIDE_TYPE.BOMB_COL_STR_SUC);
                                    this.firstBombA = false;
                                }
                                break;
                        }
                    }
                }
            }
            if (this.firstDown) {
                this.firstDown = false;
            }
        }
    }


    //生成新的方块
    public spawnTile(x, y, minY, type) {
        // 生成宠物
        if (Play.DataPvp.canSpawnPet()) {
            Play.DataPvp.waittingSpawnPetCount--;
            this.spawnPet(x, y, true, minY);
            this.sendBoardPetCnt();
            return;
        }

        // 生成火箭
        if (Play.DataPvp.waittingSpawnRocketCount > 0) {
            Play.DataPvp.waittingSpawnRocketCount--;
            this.spawnBomb(x, y, BOMB_TYPE.BOMB_COLUMN, minY, true);
            return;
        }
        if (Play.DataPvp.waittingSpawnStrongRocketCount > 0) {
            Play.DataPvp.waittingSpawnStrongRocketCount--;
            this.spawnBomb(x, y, BOMB_TYPE.BOMB_COLUMNSTRONG, minY, true);
            return;
        }

        this.spawnBlock(x, y, type, minY);
    }


    // 生成炸弹
    private spawnBomb(x: number, y: number, type, minY?, isDown?) {
        if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
            this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_FIRSTDES);
        }
        let nodBomb = Play.DataPvp.popBomb();
        if (nodBomb.parent != this.panelTile) {
            nodBomb.parent = this.panelTile;
        }
        let bombComponent = this.tiles[x][y] = nodBomb.getComponent('BombPvp');
        bombComponent.init();
        nodBomb.scale = 1;
        nodBomb.zIndex = TILE_ZINDEX.NORMAL;
        let width = 80;
        bombComponent.setContentSize(width, width);
        bombComponent.game = this;
        bombComponent.type = type;
        if (isDown) {
            bombComponent.newTile(x, y, minY)
        } else {
            bombComponent.setArrPosition(x, y)
            bombComponent.genBombAnimation();
        }
    }

    // 生成宠物
    private spawnPet(x: number, y: number, isDown, minY?) {
        if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.BLOCK) {
            this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_FIRSTDES);
        }
        Play.DataPvp.petSpawnCnt++;
        var nodPet = Play.DataPvp.popObstacle();
        if (nodPet.parent != this.panelSpine) {
            nodPet.parent = this.panelSpine;
        }
        var petComponent = this.tiles[x][y] = nodPet.getComponent("ObstaclePvp");
        petComponent.init();
        var width = 80;
        petComponent.game = this;
        petComponent.type = Math.floor(Math.random() * 4 + 1);
        nodPet.scale = 1;
        nodPet.zIndex = TILE_ZINDEX.NORMAL;
        petComponent.setContentSize(width, width);
        if (isDown) {
            petComponent.newTile(x, y, minY)
        } else {
            petComponent.setArrPosition(x, y)
        }
    }

    // 生成block
    private spawnBlock(x: number, y: number, type?, minY?, isDown?) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile(BLOCKDES_TYPE.NOACTION_NODES);
        }
        let nodBlock = Play.DataPvp.popBlock();
        if (nodBlock.parent != this.panelTile) {
            nodBlock.parent = this.panelTile;
        }
        let blockComponent = this.tiles[x][y] = nodBlock.getComponent("BlockPvp");
        blockComponent.init();
        blockComponent.game = this;
        nodBlock.scale = 1;
        nodBlock.zIndex = TILE_ZINDEX.NORMAL;

        let width = 80;
        blockComponent.setContentSize(width, width);
        let colotCnt = PVP_FRUIT_COLOR_CNT;
        if (this.pvpTeach) {
            colotCnt = TEACH_FRUIT_COLOR_CNT;
        }
        type = type ? type : Math.floor(Math.random() * colotCnt) + 1;
        blockComponent.type = type;
        blockComponent.newTile(x, y, minY, isDown)
    }



    // 生成Wall
    private spawnWall(x: number, y: number, type) {
        if (this.tiles[x][y]) {
            this.tiles[x][y].destroyTile();
            this.tiles[x][y] = null;
        }
        let nodWall = cc.instantiate(Play.DataPvp.pfbWall);
        if (nodWall.parent != this.panelTile) {
            nodWall.parent = this.panelTile;
        }
        nodWall.zIndex = TILE_ZINDEX.NORMAL;
        let wallComponent = this.tiles[x][y] = nodWall.getComponent("WallPvp");
        wallComponent.game = this;
        wallComponent.type = type;

        let width = 80;
        wallComponent.setContentSize(width, width);

        wallComponent.setArrPosition(x, y)
    }

    // 播放粒子
    playParticle(x, y) {
        let node = cc.instantiate(this.pfbParticle);
        node.parent = this.panelParticle;
        node.getComponent('Particle').setArrPosition(x, y);
        node.getComponent('Particle').play();
    }

    private stopRemindAction() {
        for (var x = 0; x < this.tiles.length; ++x) {
            for (var y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].node) {
                    this.tiles[x][y].node.stopActionByTag(2);
                    this.tiles[x][y].node.scale = 1;
                }
            }
        }
    }

    public gameOver() {
        this.cancelCloud();
        this.canTouch = false;
        this.stopRemindAction();
        this.hadRemind = true;

    }

    resetRemindTime() {
        this.hadRemind = false
        this.oneSec = 0;
        this.remindTime = 0;
    }
    hadRemindTime() {
        this.hadRemind = true;
    }

    update(dt) {
        if (!Play.DataPvp.gameBegan) {
            return;
        }

        this.remindTime += dt;
        this.oneSec += dt;
        if (this.oneSec >= 1 && !this.hadRemind && !StateMgr.INSTANCE.isStopOperate) {
            this.oneSec = 0;
            // 提示动画
            var allArr = Algorithm.checkoutMatch(this.tiles, false);

            if (this.remindTime >= 5 && allArr.length > 0) {
                this.hadRemind = true;
                var index = Math.floor(Math.random() * allArr.length);
                var arr = allArr[index];
                this.stopRemindAction();

                for (let i = 0; i < arr.length; ++i) {
                    var x = Number(arr[i].split("#")[0]);
                    var y = Number(arr[i].split("#")[1]);
                    this.tiles[x][y].node.stopActionByTag(2);
                    this.tiles[x][y].node.opacity = 255;

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
                    action.setTag(2);
                }
            } else if (allArr.length <= 0) {
                //console.log('没有可消除的组合');
                this.hadRemindTime();
                this.PlayUI.setToast('没有可消除的组合')
                this.canTouch = false;
                this.scheduleOnce(() => {
                    Algorithm.shuffleTiles(this.tiles, () => {
                        this.scheduleOnce(function () {
                            this.canTouch = true;
                            this.moveAllTileDown();
                        }, 1);
                    }, false);

                }, 2)
            }
        }
    }

    // 云
    showCloud() {
        this.nodCloud.active = true;
        this.nodCloud.opacity = 255;

        this.nodCloud.stopActionByTag(1);
        this.nodCloud.getComponent(cc.Animation).play('propCloud');
        this.unschedule(this.hideCloud);
        this.scheduleOnce(this.hideCloud, 10);
    }
    hideCloud() {
        let action = cc.sequence(
            cc.fadeTo(0.5, 0),
            cc.callFunc(() => {
                this.nodCloud.active = false;
                this.nodCloud.opacity = 255;
            })
        )
        this.nodCloud.runAction(action);
        action.setTag(1);
    }
    // 取消云
    cancelCloud() {
        this.unschedule(this.hideCloud);
        this.nodCloud.active = false;
        this.nodCloud.opacity = 255;
    }

    // 清屏动作
    destroyAllTilesOver;
    destroyAllTiles() {
        this.destroyAllTilesOver = false;
        this.hadRemindTime();
        this.effect(3, 4);
        this.effect(4, 4);
        this.scheduleOnce(() => {
            this.destroyAllTilesOver = true;
            this.moveAllTileDown();
        }, 0.8)
    }

    // 被抢夺
    beGrabedObstacle() {
        let self = this;
        Play.DataPvp.petBeGrabedCnt++;
        if (self.pvpTeach || self.pvpAi) {
            Play.DataPvp.opponentPetAllCnt++;
            self.PlayUI.getAnimal(Play.DataPvp.opponentPetAllCnt, Play.DataPlay.AiSide);
        }
    }
    // 抢夺
    grabedObstacle() {
        let self = this;
        Play.DataPvp.petGrabCnt++;
        self.PlayUI.getAnimal(Play.DataPvp.petAllCnt, Play.DataPlay.MySide);
    }

    // 吸取宠物
    async grabPet(count) {
        if (this.pvpAi) {
            count = Math.floor(Math.random() * 8);
            this.grabPetAction(count);

            if (count > 0) {
                this.PlayUI.setToast('嘿嘿，偷偷拿几个ta不知道', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy, FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand, FaceAnimationType.Xuayun);
                this.PlayUI.Audio.buff2();
            } else {
                this.PlayUI.setToast('额，ta怎么1个宠物都没有', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand, FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy, FaceAnimationType.Yanhua);
                this.PlayUI.Audio.miss();
            }

        } else {
            this.grabPetAction(count);
        }
        for (let i = 0; i < count; ++i) {
            this.grabedObstacle();
            await Algorithm.delay(0.1);
        }
    }

    // 吸取宠物动作
    async grabPetAction(count) {
        for (let i = 0; i < count; ++i) {
            var nodPet = Play.DataPvp.popObstacle();
            var petComponent = nodPet.getComponent("ObstaclePvp");
            petComponent._game = this;
            petComponent.init();
            if (nodPet.parent != this.panelSpine) {
                nodPet.parent = this.panelSpine;
            }
            nodPet.setPosition(petComponent._collectPosition2);
            petComponent.grabPet();
            await Algorithm.delay(0.1);
        }
    }

    // 失去宠物
    losePet() {
        let count = 0;
        this.canTouch = false;
        for (let x = 0; x < this.tiles.length; ++x) {
            for (let y = 0; y < this.tiles[0].length; ++y) {
                if (this.tiles[x][y] && this.tiles[x][y].tileType === TILE_TYPE.PET) {
                    this.tiles[x][y].runGrabAction(count);
                    count++;
                }
            }
        }

        if (this.pvpAi) {
            if (count > 0) {
                this.PlayUI.setToast('天，对手偷偷拿了你的宠物', ColorType.Red);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Sand, FaceAnimationType.Xuayun);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Happy, FaceAnimationType.Yanhua);
                this.PlayUI.Audio.trick();
            } else {
                this.PlayUI.setToast('晕，你啥都没有，恰好对方一无所获', ColorType.Green);
                this.panelHeader.showFace(PlaySide.BLU, FaceType.Happy, FaceAnimationType.Yanhua);
                this.panelHeader.showFace(PlaySide.RED, FaceType.Sand, FaceAnimationType.Xuayun);
                this.PlayUI.Audio.opponentMiss();
            }
        } else {
            // 发送偷取个数
            // console.log('失去' + count);
            let playStolenAnimal = new PlayStolenAnimalC2S();
            playStolenAnimal.num = count;
            NetUtil.SendMsg(playStolenAnimal);
        }

        this.scheduleOnce(() => {
            this.canTouch = true;
        }, count * 0.1);
    }

    // 打乱顺序
    prop4() {
        Algorithm.shuffleTiles(this.tiles, () => {

        }, false)
    }

    // 鼓励词
    showEncourage(arr) {
        if (arr.length <= 0) {
            return;
        }
        let num = 0;
        if (typeof (arr[0]) === 'string') {
            num = arr.length;
        } else {
            for (let i = 0; i < arr.length; ++i) {
                if (arr[i].type === BOMB_TYPE.BOMB_COLUMN) {
                    num += 9;
                } else if (arr[i].type === BOMB_TYPE.BOMB_ROW) {
                    num += 9;
                } else if (arr[i].type === BOMB_TYPE.BOMB_COLUMNSTRONG) {
                    num += 25;
                } else if (arr[i].type === BOMB_TYPE.BOMB_ROWSTRONG) {
                    num += 25;
                }
            }
        }

        let type = 0;
        if (num >= 33) {
            type = 5;
            this.PlayUI.Audio.unbelievable();
        } else if (num >= 26) {
            type = 4;
            this.PlayUI.Audio.amazing();
        } else if (num >= 15) {
            type = 3;
            this.PlayUI.Audio.excellent();
        } else if (num >= 8) {
            type = 2;
            this.PlayUI.Audio.great();
        } else if (num >= 6) {
            type = 1;
            this.PlayUI.Audio.good();
        }

        if (type !== 0) {
            let node = Play.DataPvp.popEncourage();
            node.parent = this.panelParticle;
            node.getComponent('Encourage').setType(type);
        }
    }

    // 生成一个花
    async gainFlower(row) {
        let arr = [];
        for (let i = 0; i < this.tiles.length; ++i) {
            // 从最下一行选择一个水果，替换成花朵
            if (!this.tiles[i][row - 1] || this.tiles[i][row - 1].tileType === TILE_TYPE.BLOCK) {
                arr.push(this.tiles[i][row - 1]);
            }
        }
        if (arr.length > 0) {
            let index = Math.floor(Math.random() * arr.length);
            if (arr[index]) {
                var nodWall = Play.DataPvp.popWall();
                var wallComponent = nodWall.getComponent("WallPvp");
                wallComponent._game = this;
                wallComponent.init();
                wallComponent.type = WALL_TYPE.TYPE_1;
                if (nodWall.parent != this.panelSpine) {
                    nodWall.parent = this.panelSpine;
                }
                nodWall.setPosition(wallComponent._collectPosition2);
                wallComponent.getFlower(arr[index].x, arr[index].y);
                nodWall.zIndex = TILE_ZINDEX.ACTION;

                await Algorithm.delay(1);
                this.spawnWall(arr[index].x, arr[index].y, WALL_TYPE.TYPE_1);
                if (this.pvpTeach && this.firstGenFlower) {
                    let bombComponent = this.tiles[arr[index].x][arr[index].y];
                    let panelpos = this.panelTile.convertToWorldSpaceAR(bombComponent.node.getPosition());
                    this.pvpGuide.setGuide(GUIDE_TYPE.GEN_FLOWER1, panelpos);
                    this.firstGenFlower = false;
                }
            }
        } else {
            // console.log('没有空位啦');
        }
    }

    onDestroy() {
        cc.director.getScheduler().unscheduleAllForTarget(this);
        this.node.targetOff(this.node);
    }

    // 背景波浪动画,消除全屏
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
            cc.fadeTo(0.06, 150),
            cc.callFunc(() => {
                if (this.tiles[x][y]) {
                    if (this.tiles[x][y].tileType === TILE_TYPE.PET) {

                    } else if (this.tiles[x][y].tileType === TILE_TYPE.WALL) {
                        this.tiles[x][y].destroyTile(2);
                    } else if (this.tiles[x][y].tileType === TILE_TYPE.BOMB) {
                        this.tiles[x][y].ignite();
                    } else {
                        this.tiles[x][y].destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES);
                    }
                }

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
            cc.fadeTo(0.12, 255),
            cc.fadeOut(0.24),
            cc.callFunc(() => {
                this.tileBgs[x][y].hadAction = false;
            })
        );

        this.tileBgs[x][y].getChildByName('sprLight').runAction(action);
    }

}
