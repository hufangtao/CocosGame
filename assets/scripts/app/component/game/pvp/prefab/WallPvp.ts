import { TILE_TYPE, TABLEWARE_TYPE } from "../../PlayDefine";
import BaseTile from "../../pve/prefab/BaseTile";
import LayerGame from "../LayerGame";
import { Play } from "../../../../module/Modules";
import DYAudio from "../../../../../dyGame/DYAudio";

const { ccclass, property } = cc._decorator;

@ccclass
export default class WallPvp extends BaseTile {

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

    @property({ type: cc.AudioClip })
    audFloerDestroy: cc.AudioClip = null;

    private _state = null;

    animation: cc.Animation = null;

    private _collectPosition = cc.v2(-155, 855);
    private _collectPosition2 = cc.v2(284, 855);
    public _game: LayerGame;

    onLoad() {
        this._tileType = TILE_TYPE.WALL;
        this.animation = this.node.getComponent(cc.Animation);
    }

    start() {

    }
    onDestroy() {
        super.onDestroy();
    }
    onDisable() {
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
        this.node.stopActionByTag(1);
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

        this.node.runAction(action);
        action.setTag(1);
    }

    public affected() {
        this.destroyTile();
    }

    // 方块销毁
    public destroyTile(type?) {
        var self = this;
        if (type == 2) {
            self._state = 0;
        } else {
            self._state--;
        }
        if (self._state > 0) {
            this.playBloomAnim();
        } else if (self._state == 0) {
            this.isDestroying = true;
            this.playDestroyAnim();

            this.animation.targetOff('finished');
            this.animation.on('finished', this.onFinished, this)
        }
    }

    onFinished() {
        var self = this;
        self._game.tiles[self.x][self.y] = null;

        var action = cc.sequence(
            cc.moveBy(0.1, 0, - 100),
            cc.callFunc(() => {
                // self._game.tiles[self.x][self.y] = null;
                setTimeout(() => {
                    self._game.moveAllTileDown();
                }, 0);
            }),
            cc.scaleTo(0.2, 0),
            cc.callFunc(() => {
                Play.DataPvp.pushWall(self.node)
            })
        )
        self.node.runAction(action);
    }

    playBloomAnim() {
        this.animation.play('aniWallBloom');
    }
    playDestroyAnim() {
        DYAudio.playEffect(this.audFloerDestroy, false);
        this.animation.play('aniWallDestroy');
    }

    // 扔花动作
    getFlower(x, y) {
        let startPs = this._collectPosition2;
        let endPs = cc.v2(80 * (x - 4) + 80 / 2,
            80 * y + 80 / 2);
        let tan = (endPs.x - startPs.x) / (endPs.y - startPs.y);
        let angle = Math.round(Math.atan(tan) / (Math.PI / 180));

        endPs = this.node.parent.convertToWorldSpaceAR(endPs);
        endPs = this.node.convertToNodeSpaceAR(endPs);

        let sign = Math.random() > 0.5 ? 1 : -1;
        let offset = 100 * sign;

        let action = cc.sequence(
            cc.spawn(
                cc.moveTo(1, endPs),
                cc.sequence(
                    cc.moveBy(0.34, offset, 0).easing(cc.easeIn(0.34)),
                    cc.moveBy(0.66, -offset, 0).easing(cc.easeOut(0.66)),
                )),
            cc.callFunc(() => {
                this.nodContent.rotation = 0;
                this.sprTile.node.rotation = 0;
                this.nodContent.position = cc.v2(0, 0);
                Play.DataPvp.pushWall(this.node);
            })
        );


        this.nodContent.rotation = angle;
        this.sprTile.node.rotation = -angle;
        this.nodContent.runAction(action);
    }
}
