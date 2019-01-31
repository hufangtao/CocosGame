import { TILE_TYPE, BLOCK_COLOR, BOMB_TYPE } from "../../PlayDefine";
import StateMgr from "../../pve/StateMgr";
import { Play } from "../../../../module/Modules";
import BaseTile from "../../pve/prefab/BaseTile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BombPvp extends BaseTile {
    @property(cc.Sprite)
    sprHandle: cc.Sprite = null;
    @property(cc.Sprite)
    sprDot: cc.Sprite = null;

    @property(cc.Sprite)
    sprTile: cc.Sprite = null;
    @property(cc.Sprite)
    sprTileZZJ: cc.Sprite = null;

    @property(cc.Sprite)
    sprBg: cc.Sprite = null;

    @property(cc.SpriteFrame)
    spf_bomb_row: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_column: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_row_strong: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_column_strong: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_column_light: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_around: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_around_light: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_red: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_red_handle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_red_dot: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_green: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_green_handle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_green_dot: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_blue: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_blue_handle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_blue_dot: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_yellow: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_yellow_handle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_yellow_dot: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_purple: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_purple_handle: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_bomb_purple_dot: cc.SpriteFrame = null;

    @property(cc.SpriteFrame)
    spf_bomb_colors: cc.SpriteFrame = null;

    isAction = false;

    private _isAlive = true;
    private anim = null;

    onLoad() {
        this._tileType = TILE_TYPE.BOMB;
    }

    onEnable() {
        this.node.on('touchstart', this.onTouchStart, this);
    }
    onDisable() {
        super.onDisable();
        this.node.off('touchstart', this.onTouchStart, this);
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


    public setContentSize(width, height) {
        // this.sprTile.node.setContentSize(width, height);
        this.node.setContentSize(width, height);
    }

    public init() {
        super.init();
        this.isDestroying = false;
        this.isAction = false;

        this.sprTile.node.scale = 1;
        this.nodContent.setPosition(0, 0);
        this.node.stopAllActions();
        this.node.rotation = 0;
        this.nodContent.stopAllActions();
        this.getComponent(cc.Animation).stop();
        this.sprTile.node.active = true;
        this.sprTileZZJ.node.active = true;
        this.sprTileZZJ.node.rotation = 0;
        this.nodContent.getChildByName('bombArea1').active = false;
        this.nodContent.getChildByName('bombArea2').active = false;
        this.nodContent.getChildByName('bombzzj1').active = false;
        this.nodContent.getChildByName('lajiao1').active = false;
        this.nodContent.getChildByName('lajiao2').active = false;
        this.nodContent.getChildByName('bombzzj2').active = false;
        this.nodContent.getChildByName('sprite').active = false;
        this.nodContent.getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = null;
    }



    public setArrPosition(x: number, y: number) {
        this._canTouch = true;
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * y + this.node.height / 2);
    }

    public setSpfByType(type) {
        let self = this;
        this.sprBg.node.active = false;
        this.getComponent(cc.Animation).stop('aniZhazhijiBg');
        switch (type) {
            case BOMB_TYPE.BOMB_ROW:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_row;
                break;
            case BOMB_TYPE.BOMB_COLUMN:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_column;
                break;
            case BOMB_TYPE.BOMB_ROWSTRONG:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_row_strong;
                break;
            case BOMB_TYPE.BOMB_COLUMNSTRONG:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_column_strong;
                break;
            case BOMB_TYPE.BOMB_AROUND:
                this.hideWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_around;
                break;
            case BOMB_TYPE.BOMB_ONE_COLOR:
                this.showWindmill();
                this.sprTile.spriteFrame = this.spf_bomb_colors;
                break;
        }
    }

    hideWindmill() {
        this.sprHandle.node.active = false;
        this.sprDot.node.active = false;
    }
    showWindmill() {
        this.sprHandle.node.active = true;
        this.sprDot.node.active = true;
    }

    genBombAnimation() {
        let self = this;
        this.sprBg.node.active = true;
        let anim = this.getComponent(cc.Animation);
        anim.genBombEnd = function () {
            self.sprBg.node.scale = 1;
            self.sprBg.node.active = false;
            if (self._type == BOMB_TYPE.BOMB_AROUND) {
                anim.play('aniAreaNormal');
                // console.log('aniAreaNormal');
            } else if (self._type == BOMB_TYPE.BOMB_COLUMN) {
                // anim.play('lajiao-normal');
            } else if (self._type == BOMB_TYPE.BOMB_ROW) {
                // anim.play('lajiao-normal');
            }
        };
        switch (this._type) {
            case BOMB_TYPE.BOMB_COLUMN:
                anim.play('aniGenBomb');
                break;
            case BOMB_TYPE.BOMB_AROUND:
                anim.play('aniGenBomb');
                break;
            case BOMB_TYPE.BOMB_ONE_COLOR:
                anim.play('aniZhazhijiBg');
                break;
            default:
                anim.play('aniGenBomb');
                break;
        }
    }

    public setSpfBySubType(color) {
        if (this._type != BOMB_TYPE.BOMB_ONE_COLOR) {
            return
        }
        this.showWindmill();
        switch (color) {
            case BLOCK_COLOR.RED:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_red;
                this.sprHandle.spriteFrame = this.spf_bomb_red_handle;
                this.sprDot.spriteFrame = this.spf_bomb_red_dot;
                this.sprBg.node.color = new cc.Color(255, 60, 68);
                break;
            case BLOCK_COLOR.GREEN:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_green;
                this.sprHandle.spriteFrame = this.spf_bomb_green_handle;
                this.sprDot.spriteFrame = this.spf_bomb_green_dot;
                this.sprBg.node.color = new cc.Color(60, 212, 78);
                break;
            case BLOCK_COLOR.BLUE:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_blue;
                this.sprHandle.spriteFrame = this.spf_bomb_blue_handle;
                this.sprDot.spriteFrame = this.spf_bomb_blue_dot;
                this.sprBg.node.color = new cc.Color(65, 91, 199);
                break;
            case BLOCK_COLOR.YELLOW:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_yellow;
                this.sprHandle.spriteFrame = this.spf_bomb_yellow_handle;
                this.sprDot.spriteFrame = this.spf_bomb_yellow_dot;
                this.sprBg.node.color = new cc.Color(240, 178, 90);
                break;
            case BLOCK_COLOR.PURPLE:
                this.sprTileZZJ.spriteFrame = this.spf_bomb_purple;
                this.sprHandle.spriteFrame = this.spf_bomb_purple_handle;
                this.sprDot.spriteFrame = this.spf_bomb_purple_dot;
                this.sprBg.node.color = new cc.Color(94, 33, 160);
                break;
            case BLOCK_COLOR.COLORS:
                this.hideWindmill();
                this.sprTileZZJ.spriteFrame = this.spf_bomb_colors;
                break;
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

    public destroyTile(cb, Action = true, isDelete = true) {
        var self = this;
        this.isDestroying = true;
        this.isAction = true;
        this.node.stopAllActions();
        this.sprTile.node.stopAllActions();
        this.canTouch = false;
        let anim = this.getComponent(cc.Animation);
        this.sprBg.node.active = false;
        anim.stop('aniAreaNormal');
        this.nodContent.getChildByName('bombArea2').active = false;
        anim.stop('aniZhazhijiBg');

        if (isDelete) {
            // self._game.tiles[self.x][self.y] = null;
        }
        Play.DataPvp.pushBomb(self.node);
    }

    onTouchStart(event) {
        if (!this._game || !this.canTouch || (this._game && !this._game.canTouch) || !StateMgr.INSTANCE.canOperate() || this.isDestroying) {
            return;
        }
        this.canTouch = false;
        this.recoveryObjective();
        this._game.operateLogic(this.x, this.y, this._tileType, this._type, this._subType, true);
    }

    public ignite(arr, isAction = true) {
        if (this.isAction) {
            return;
        }
        this.isAction = true;
        this.recoveryObjective();
        if (isAction) {
            this._game.ignite(this.x, this.y, this._type, arr);
        } else {
            this._game.tiles[this.x][this.y] = null;
            this.destroyTile(null, null);
        }
    }

    // 改变类型
    changeType() {
        if (this.type === BOMB_TYPE.BOMB_COLUMN) {
            this.type = BOMB_TYPE.BOMB_ROW;
        } else if (this.type === BOMB_TYPE.BOMB_ROW) {
            this.type = BOMB_TYPE.BOMB_COLUMN;
        } else if (this.type === BOMB_TYPE.BOMB_ROWSTRONG) {
            this.type = BOMB_TYPE.BOMB_COLUMNSTRONG;
        } else if (this.type === BOMB_TYPE.BOMB_COLUMNSTRONG) {
            this.type = BOMB_TYPE.BOMB_ROWSTRONG;
        }
    }
}
