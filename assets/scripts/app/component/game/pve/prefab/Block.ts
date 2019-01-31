import { BLOCK_COLOR, TILE_TYPE, TILE_ZINDEX, BLOCKDES_TYPE, Action_type } from "../../PlayDefine";
import StateMgr from "../StateMgr";
import BaseTile from "./BaseTile";
import { Play } from "../../../../module/Modules";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Block extends BaseTile {
    @property(cc.SpriteFrame)
    spf_red: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_green: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_blue: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_yellow: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_purple: cc.SpriteFrame = null;

    @property(cc.Sprite)
    sprTile: cc.Sprite = null;

    @property(cc.Sprite)
    sprEffect: cc.Sprite = null;

    private _isAlive = true;

    public onLoad() {
        super.onLoad();
        this._tileType = TILE_TYPE.BLOCK;
    }

    onEnable() {
        this.node.on('touchstart', this.onTouchStart, this);
    }
    onDisable() {
        this.node.stopAllActions();
        super.onDisable();
        this.node.off('touchstart', this.onTouchStart, this);
    }
    public start() {

    }

    onDestroy() {
        super.onDestroy();
    }

    public get isAlive() {
        return this._isAlive;
    }
    public set isAlive(value) {
        this._isAlive = value;
    }

    public init() {
        super.init();
        this._canTouch = false;
        this.node.stopAllActions();
        this.nodContent.stopAllActions();
        this.nodContent.setPosition(0, 0);
        this.isDestroying = false;

        this.getComponent(cc.Animation).stop();
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprEffect.node.active = false;
        this.sprEffect.spriteFrame = null;
        this.setContentSize(80, 80);
    }

    public setContentSize(width, height) {
        this.sprTile.node.active = true;
        this.sprTile.node.setContentSize(width, height);
        this.node.setContentSize(width, height);
    }
    public setArrPosition(x: number, y: number) {
        this._canTouch = true;
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * y + this.node.height / 2);
    }

    // 轨道
    public transportTo(x: number, y: number, cb) {
        this.moveTo(x, y, cb, false);
    }

    // 传送门
    public gateTo(x: number, y: number, cb) {
        this.x = x;
        this.y = y;
        var action = cc.sequence(
            cc.moveTo(0.05, cc.v2(this.node.x, this.node.y - this.node.height)),
            cc.callFunc(() => {
                if (this._game.tiles[x][y]) {
                    this._game.tiles[x][y].setArrPosition(x, y + 1);
                    this.moveTo(x, y, cb);
                    this._canTouch = true;
                    cb && cb();
                }
            })
        );

        this._canTouch = false;
        this.node.stopActionByTag(Action_type.GateTo);
        this.node.runAction(action);
        action.setTag(Action_type.GateTo);
    }

    // 移动到特定点
    public moveTo(x: number, y: number, cb, isDown = true) {
        var self = this;

        this.x = x;
        this.y = y;

        if (isDown) {
            var action = cc.sequence(
                cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                }),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 - 15)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 + 5)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    this._canTouch = true;
                    cb && cb();
                })
            );
        } else {
            var action = cc.sequence(
                cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    this._canTouch = true;
                    cb && cb();
                    // this._game.canTouch = true;
                })
            )
        }

        this._canTouch = false;
        this.node.stopActionByTag(Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(Action_type.MoveTo);
    }

    // 方块销毁
    public async destroyTile(type, isTouch?) {
        var self = this;
        this.isDestroying = true;

        this.recoveryObjective(isTouch);

        this._game.playParticle(this.x, this.y);

        if (type === BLOCKDES_TYPE.NOACTION_NODES) {
            // 不播放爆炸动画，不销毁
            self.node.stopAllActions();
            Play.DataPve.pushBlock(self.node);
        } else if (type === BLOCKDES_TYPE.NOACTION_FIRSTDES) {
            // 不播放动画，销毁tile
            self._game.tiles[self.x][self.y] = null;
            self.node.stopAllActions();
            Play.DataPve.pushBlock(self.node);
        } else if (type === BLOCKDES_TYPE.ACTION_FIRSTDES) {
            // 播放动画，先销毁tile
            self._game.tiles[self.x][self.y] = null;
            let anim = this.node.getComponent(cc.Animation);
            anim['finished'] = () => {
                Play.DataPve.pushBlock(self.node);
            }
            anim.play('aniBlock_blue');
        } else if (type === BLOCKDES_TYPE.ACTION_LASTDES) {
            // 播放动画，后销毁tile
            let anim = this.node.getComponent(cc.Animation);
            anim['finished'] = () => {
                self._game.tiles[self.x][self.y] = null;
                Play.DataPve.pushBlock(self.node);
            }
            anim.play('aniBlock_blue');
        } else if (type === BLOCKDES_TYPE.ACTION_NODES) {
            // 播放动画，后销毁tile
            let anim = this.node.getComponent(cc.Animation);
            anim['finished'] = () => {
                Play.DataPve.pushBlock(self.node);
            }
            anim.play('aniBlock_blue');
        }
    }

    public newTile(x: number, y: number, isMoveTo = true) {
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.node.stopAllActions();
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * (y + 1.5));

        this.x = x;
        this.y = y;
        this.moveTo(x, y, null, isMoveTo);
    }

    public setSpfByType(color) {
        this.init();
        switch (color) {
            case BLOCK_COLOR.RED:
                this.sprTile.spriteFrame = this.spf_red;
                break;
            case BLOCK_COLOR.GREEN:
                this.sprTile.spriteFrame = this.spf_green;
                break;
            case BLOCK_COLOR.BLUE:
                this.sprTile.spriteFrame = this.spf_blue;
                break;
            case BLOCK_COLOR.YELLOW:
                this.sprTile.spriteFrame = this.spf_yellow;
                break;
            case BLOCK_COLOR.PURPLE:
                this.sprTile.spriteFrame = this.spf_purple;
                break;
        }
    }

    onTouchStart(event) {
        if (!this._game || !this._canTouch || !this._game.canTouch || this.isDestroying) {
            return;
        }
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType);
    }



    public async recovery(isTouch?) {
        var self = this;
        if (this.isDestroying) {
            return
        }
        this.isDestroying = true;
        self.node.zIndex = TILE_ZINDEX.ACTION_LOW;

        var position = Play.DataPve.needRecovery(this.tileType, this.type, this.subType);
        if (!position) {
            self.destroyTile(BLOCKDES_TYPE.ACTION_FIRSTDES, isTouch);
            return;
        }
        // 回收
        self._game.tiles[self.x][self.y] = null;
        var action = cc.sequence(
            cc.moveBy(0.1, 0, - 100),
            cc.moveTo(0.3, position.x, position.y),
            cc.scaleTo(0.2, 0),
            cc.callFunc(() => {
                this.recoveryObjective(true);
                Play.DataPve.pushBlock(self.node);
            })
        )
        self.node.runAction(action);
    }
}