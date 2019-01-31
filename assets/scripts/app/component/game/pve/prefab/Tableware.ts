import { TILE_TYPE, TABLEWARE_TYPE, Action_type } from "../../PlayDefine";
import DYNotify from "../../../../../dyGame/DYNotify";
import BaseTile from "./BaseTile";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Tableware extends BaseTile {

    @property(cc.Sprite)
    sprTile: cc.Sprite = null;

    @property(cc.SpriteFrame)
    spf_shaozi: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_panzi: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_panzi_2: cc.SpriteFrame = null;

    onLoad() {
        this._tileType = TILE_TYPE.TABLEWARE;
        this.node.on('touchstart', this.onTouchStart, this);
    }
    onDestroy() {
        this.node.stopAllActions();
        super.onDestroy();
    }
    onDisable() {
        this.node.stopAllActions();
        super.onDisable();
    }
    private onTouchStart() {
        if (this._canTouch) {
            this.node.stopActionByTag(Action_type.NoMatch);
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
            this.node.runAction(action);
            action.setTag(Action_type.NoMatch);
        }
    }

    public init() {
        this.node.active = true;
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
    }

    public setContentSize(width, height) {
        this.node.setContentSize(width, height);
        this.sprTile.node.setContentSize(width, height);
    }

    public setArrPosition(x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * y + this.node.height / 2);
    }
    public setSpfByType(type) {
        switch (type) {
            case TABLEWARE_TYPE.TYPE_1:
                this.sprTile.spriteFrame = this.spf_shaozi;
                break;
            case TABLEWARE_TYPE.TYPE_2:
                this.sprTile.spriteFrame = this.spf_panzi;
                break;
            case TABLEWARE_TYPE.TYPE_3:
                this.sprTile.spriteFrame = this.spf_panzi_2;
                break;
        }
    }
    public newTile(x, y, isMoveTo = true) {
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * (y + 1.5));

        if (isMoveTo) {
            this.moveTo(x, y, null);
        }
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
                this._game.tiles[x][y].setArrPosition(x, y + 1);
                this.moveTo(x, y, cb);
                this._canTouch = true;
                cb && cb();
            })
        );

        this._canTouch = false;
        this.node.stopActionByTag(Action_type.GateTo);
        this.node.runAction(action);
        action.setTag(Action_type.GateTo);
    }
    // 移动到特定点
    public moveTo(x, y, cb, isDown = true) {
        var self = this;

        this.x = x;
        this.y = y;
        if (isDown) {
            var action = cc.sequence(
                cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 - 15)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 + 5)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    cb && cb();
                })
            );
        } else {
            var action = cc.sequence(
                cc.moveTo(0.8, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    cb && cb();
                })
            )
        }

        this.node.stopActionByTag(Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(Action_type.MoveTo);
    }

    public affected() {
        this.destroyTile()
    }

    // 方块销毁
    public destroyTile(type?) {
        this.isDestroying = true;
        var self = this;
        self._game.tiles[self.x][self.y] = null;
        if(this.type === TABLEWARE_TYPE.TYPE_3){
            this._game.PlayUI.Audio.destroyBug();
        }else{
            this._game.PlayUI.Audio.destroyBottle();
        }
        var action = cc.sequence(
            cc.scaleTo(0.3, 0),
            cc.callFunc(() => {
                self.recoveryObjective();
                setTimeout(() => {
                    self.node.destroy();
                }, 0)
            })
        );
        this.node.runAction(action);
    }
}
