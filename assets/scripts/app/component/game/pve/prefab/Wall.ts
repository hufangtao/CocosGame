import { TILE_TYPE, TABLEWARE_TYPE, Action_type } from "../../PlayDefine";
import BaseTile from "./BaseTile";
import StateMgr from "../StateMgr";
import { Play } from "../../../../module/Modules";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Wall extends BaseTile {

    @property(cc.Sprite)
    sprTile: cc.Sprite = null;
    @property(cc.Sprite)
    sprCircle: cc.Sprite = null;
    @property(cc.Sprite)
    sprCross: cc.Sprite = null;

    @property(cc.SpriteFrame)
    spf_type_1_1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_type_1_2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_type_2_1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spf_type_2_2: cc.SpriteFrame = null;

    private _state = null;

    private _collectPosition = cc.v2(-133, 915.2);

    animation: cc.Animation = null;

    onLoad() {
        this._tileType = TILE_TYPE.WALL;
        this.animation = this.node.getComponent(cc.Animation);
    }

    start() {

    }
    onDestroy() {
        this.node.stopAllActions();
        super.onDestroy();
    }
    onDisable() {
        this.node.stopAllActions();
        super.onDisable();
    }
    public init() {
        this.node.active = true;
        this.node.scale = 1;
        this.sprTile.node.active = true;
        this.sprTile.node.scale = 1;
        this.sprCircle.node.active = false;
        this.sprCross.node.active = false;
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

    public set type(value) {
        this._type = value;
        this.setState(value);
        this.setSpfByType(value);
    }
    public get type() {
        return this._type;
    }
    private setState(type) {
        switch (type) {
            case TABLEWARE_TYPE.TYPE_1:
                this._state = 2;
                break;
            case TABLEWARE_TYPE.TYPE_2:
                this._state = 2;
                break;
        }
    }
    public setSpfByType(type) {
        switch (type) {
            case TABLEWARE_TYPE.TYPE_1:
                switch (this._state) {
                    case 2:
                        this.sprTile.spriteFrame = this.spf_type_1_1;
                        break;
                    case 1:
                        this.sprTile.spriteFrame = this.spf_type_1_2;
                        break;
                }
                break;
            case TABLEWARE_TYPE.TYPE_2:
                switch (this._state) {
                    case 2:
                        this.sprTile.spriteFrame = this.spf_type_2_1;
                        break;
                    case 1:
                        this.sprTile.spriteFrame = this.spf_type_2_2;
                        break;
                }
                break;
        }
    }
    public newTile(x, y) {

        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * y + this.node.height / 2 + 700);

        this.moveTo(x, y);
    }
    // 移动到特定点
    public moveTo(x, y, isDown = true) {
        var self = this;
        this.x = x;
        this.y = y;
        if (isDown) {
            var action = cc.sequence(
                cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 - 15)),
                cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 + 5)),
                cc.moveTo(0.1, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {

                })
            );
        } else {
            var action = cc.moveTo(0.8, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                this.node.height * y + this.node.height / 2));
        }

        this.node.stopActionByTag(Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(Action_type.MoveTo);
    }

    public affected() {
        this.destroyTile();
    }

    // 方块销毁
    public destroyTile(type?) {
        var self = this;
        self._state--;
        this._game.PlayUI.Audio.destroyFlower();
        if (self._state > 0) {
            this.playBloomAnim();
        } else {
            self._game.tiles[self.x][self.y] = null;
            this.isDestroying = true;
            this.playDestroyAnim();
            var position = Play.DataPve.needRecovery(this.tileType, this.type, this.subType);

            this.animation.on('finished', () => {

                this.unschedule(this.game.wallScheduleCb);
                StateMgr.INSTANCE.isCollectOver = false;
                this.game.wallScheduleCb = () => {
                    StateMgr.INSTANCE.isCollectOver = true;
                }
                this.scheduleOnce(this.game.wallScheduleCb, 0.6);
                this.scheduleOnce(()=>{
                    self.recoveryObjective();
                }, 0.6);


                var action = cc.sequence(
                    cc.moveBy(0.1, 0, - 100),
                    cc.callFunc(() => {
                        setTimeout(() => {
                            self._game.moveAllTileDown();
                        }, 0);
                    }),
                    cc.moveTo(0.3, position.x, position.y),
                    cc.scaleTo(0.2, 0),
                )
                self.node.runAction(action);
            })
        }
    }

    playBloomAnim() {
        this.animation.play('aniWallBloom');
    }
    playDestroyAnim() {
        this.animation.play('aniWallDestroy');
    }
}
