import { BLOCK_COLOR, TILE_TYPE, BLOCKDES_TYPE } from "../../PlayDefine";
import { Play } from "../../../../module/Modules";
import BaseTile from "../../pve/prefab/BaseTile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BlockPvp extends BaseTile {
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

    @property(cc.SpriteFrame)
    spf_six: cc.SpriteFrame = null;

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
        super.onDisable();
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

    // 方块销毁
    public async destroyTile(type) {
        var self = this;

        this.isDestroying = true;
        this.recoveryObjective();
        // this._game.playParticle(this.x,this.y);

        if (type === BLOCKDES_TYPE.NOACTION_NODES) {
            // 不播放爆炸动画，不销毁
            self.node.stopAllActions();
            Play.DataPvp.pushBlock(self.node);
        } else if (type === BLOCKDES_TYPE.NOACTION_FIRSTDES) {
            // 不播放动画，销毁tile
            self._game.tiles[self.x][self.y] = null;
            self.node.stopAllActions();
            Play.DataPvp.pushBlock(self.node);
        } else if (type === BLOCKDES_TYPE.ACTION_FIRSTDES) {
            // 播放动画，先销毁tile
            self._game.tiles[self.x][self.y] = null;
            let anim = this.node.getComponent(cc.Animation);
            anim.finished = () => {
                Play.DataPvp.pushBlock(self.node);
                this._game.moveAllTileDown();
            }
            anim.play('aniBlock_blue');
        } else if (type === BLOCKDES_TYPE.ACTION_LASTDES) {
            // 播放动画，后销毁tile
            let anim = this.node.getComponent(cc.Animation);
            anim.finished = () => {
                self._game.tiles[self.x][self.y] = null;
                Play.DataPvp.pushBlock(self.node);
                this._game.moveAllTileDown();
            }
            anim.play('aniBlock_blue');
        } else if (type === BLOCKDES_TYPE.ACTION_NODES) {
            // 播放动画，不销毁tile
            let anim = this.node.getComponent(cc.Animation);
            anim.finished = () => {
                Play.DataPvp.pushBlock(self.node);
                this._game.moveAllTileDown();
            }
            anim.play('aniBlock_blue');
        }else{
            self.node.stopAllActions();
            Play.DataPvp.pushBlock(self.node);
        }
    }

    public newTile(x: number, y: number, minY, isMoveTo = true) {
        this.isDestroying = false;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprTile.node.opacity = 255;
        this.node.stopAllActions();

        this.x = x;
        this.y = y;
        if (isMoveTo) {
            this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
                this.node.height * (9 - minY + y + 1.5));
            this.moveTo(x, y, null, minY);
        } else {
            this.setArrPosition(x, y);
        }
    }
    // 移动到特定点
    public moveTo(x: number, y: number, cb, minY?, isDown = true) {
        var self = this;

        let v = 50;
        let g = 9.8 * 300;
        let d;
        if (minY || minY === 0) {
            d = this.node.height * (9 - minY + 1.5);//200,840
        } else {
            d = this.node.height * (this.y - y);
        }
        let t = Math.sqrt((d - v) / g);

        let v1 = (- 0.5 * g * t - v) * 1;
        g = g * 3;
        let t1 = - v1 / g;
        let d1 = v1 * t1 + 0.5 * g * t1 * t1;//-d / 15; // -56 -13.3  
        // console.log(d1);
        // console.log(t1);

        let v2 = 0;
        let d2 = - d1;
        let t2 = Math.sqrt((d2 - v2) / g);

        if (isDown) {
            var action = cc.sequence(
                cc.moveTo(t, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)).easing(cc.easeIn(2)),
                cc.moveTo(t1, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 - d1)).easing(cc.easeIn(2)),
                cc.moveTo(t2, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)).easing(cc.easeIn(2)),
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
        this.x = x;
        this.y = y;
        this._canTouch = false;
        this.node.stopActionByTag(1);
        this.node.runAction(action);
        action.setTag(1);
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
            case BLOCK_COLOR.SIX:
                this.sprTile.spriteFrame = this.spf_six;
                break;
        }
    }

    onTouchStart(event) {
        if (!this._game || !this._canTouch || !this._game.canTouch || this.isDestroying) {
            return;
        }
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType);
    }
}