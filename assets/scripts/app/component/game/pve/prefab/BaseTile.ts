import { TILE_TYPE, TILE_ZINDEX, GAME_MODEL, Action_type } from "../../PlayDefine";
import { Play } from "../../../../module/Modules";
import LayerGame from "../../pvp/LayerGame";
import LayerGamePve from "../LayerGamePve";

const { ccclass, property } = cc._decorator;

@ccclass
export default class BaseTile extends cc.Component {
    @property(cc.Node)
    nodContent: cc.Node = null;

    x: number;
    y: number;

    private _isDestroying: boolean = false;
    private _isMoving: boolean = false;

    _tileType: TILE_TYPE = null;
    _type = null;
    _subType = null;

    force: cc.Vec2 = null;

    distance1 = 50;
    distance2 = 15;

    distance3 = 30;
    distance4 = 10;

    _game;

    _canTouch = false;

    public get game() {
        return this._game;
    }
    public set game(value) {
        this._game = value;
    }

    public get canTouch() {
        return this._canTouch;
    }
    public set canTouch(value) {
        this._canTouch = value;
    }

    public get tileType() {
        return this._tileType;
    }
    public set tileType(value) {
        this.setSpfByTileType(value);
        this._tileType = value;
    }
    public get type() {
        return this._type;
    }
    public set type(value) {
        this._type = value;
        this.setSpfByType(value);
    }
    public get subType() {
        return this._subType;
    }
    public set subType(value) {
        this.setSpfBySubType(value);
        this._subType = value;
    }

    public set isDestroying(value) {
        this._isDestroying = value;
    }
    public get isDestroying() {
        return this._isDestroying;
    }
    onLoad() {

    }
    onDestroy() {
    }
    onDisable() {
        this.actionCallBack = null;
        cc.director.getScheduler().unscheduleAllForTarget(this);
        this.node.targetOff(this.node);
    }

    onEnable() {

    }

    setSpfByTileType(type) {

    }
    setSpfByType(type) {

    }
    setSpfBySubType(type) {

    }
    // 正确的位置
    public getArrPosition() {
        return cc.v2(this.node.width * (this.x - 4) + this.node.width / 2,
            this.node.height * this.y + this.node.height / 2);
    }

    public newTile(x: number, y: number, isMoveTo = true) {

    }

    // 收获目标
    recoveryObjective(isTouch?) {
        if (Play.GameModel === GAME_MODEL.PVE) {
            Play.DataPve.getObjective(this.tileType, this.type, this.subType, isTouch);
            this._game.gameOver();
        }
    }



    init() {
        this.actionCallBack = null;
        this._canTouch = true;
    }

    actionCallBack;
    // 圆形波浪动作，炸弹
    billowAct(x, y, cb) {
        var self = this;
        this.force = this.getForce(x, y);
        if (!this.force) {
            return;
        }
        self._canTouch = false;
        this.node.zIndex = TILE_ZINDEX.ACTION_LOW;

        let instance1 = cc.v2(this.x - x, this.y - y).mag();
        if (instance1 < 2) {
            this.isDestroying = true;
            var action = cc.sequence(
                cc.moveBy(0.1, self.force.x * self.distance1 * 2, self.force.y * self.distance1 * 2).easing(cc.easeOut(2)),
                cc.moveTo(0.2, 0, 0),
                cc.spawn(cc.moveBy(0.2, self.force.x * self.distance2 * 2, self.force.y * self.distance2 * 2),
                    cc.callFunc(() => {
                        // self.actionCallBack && self.actionCallBack();
                        // self.actionCallBack = null;
                    })),
                // cc.moveBy(0.2, this.force.x * this.distance2, -speedX * this.distance2),
                cc.moveTo(0.2, 0, 0),
                cc.delayTime(1),
                cc.callFunc((() => {
                    self.node.zIndex = TILE_ZINDEX.NORMAL;
                    self.node.scale = 1;
                    self._canTouch = true;
                }))
            )

            self.nodContent.stopActionByTag(Action_type.Shake);
            self.nodContent.runAction(action);
            action.setTag(Action_type.Shake);

            if (!self.actionCallBack) {
                self.actionCallBack = cb;
                self.scheduleOnce(() => {
                    self.actionCallBack && self.actionCallBack();
                }, 0.3)
            }
        } else {
            var action = cc.sequence(
                cc.moveBy(0.1, this.force.x * this.distance1, this.force.y * this.distance1).easing(cc.easeOut(2)),
                cc.moveTo(0.2, 0, 0),
                cc.spawn(cc.moveBy(0.2, self.force.x * self.distance2 * 2, self.force.y * self.distance2 * 2),
                    cc.callFunc(() => {
                        // self.actionCallBack && self.actionCallBack();
                        // self.actionCallBack = null;
                    })),
                cc.moveTo(0.2, 0, 0),
                cc.callFunc((() => {
                    self.node.zIndex = TILE_ZINDEX.NORMAL;
                    self._canTouch = true;
                }))
            )
            self.nodContent.stopActionByTag(Action_type.Shake);
            self.nodContent.runAction(action);
            action.setTag(Action_type.Shake);
        }
    }

    getForce(x, y) {
        var force = cc.v2(this.x, this.y).sub(cc.v2(x, y));
        var arrPosition = this.getArrPosition();
        var curPosition = this.node.position;
        var length = arrPosition.sub(curPosition).mag();

        var normalize = force.normalize();
        // if (length >= this.distance1 * normalize.mag()) {
        //     return null
        // }
        return normalize;
    }

    // 两侧抖动动作，辣椒
    bothSideAct(x, cb) {
        this.force = this.getForce(x, this.y);
        if (!this.force) {
            return;
        }
        this._canTouch = false;
        this.node.zIndex = TILE_ZINDEX.ACTION_LOW;

        var action = cc.sequence(
            cc.moveBy(0.1, this.force.x * this.distance3, 0).easing(cc.easeOut(2)),
            cc.moveTo(0.2, 0, 0),
            cc.moveBy(0.2, this.force.x * this.distance4, 0),
            cc.moveTo(0.2, 0, 0),
            cc.callFunc((() => {
                this.node.zIndex = TILE_ZINDEX.NORMAL;
                this._canTouch = true;
            }))
        )
        this.nodContent.stopActionByTag(Action_type.Shake);
        this.nodContent.runAction(action);
        action.setTag(Action_type.Shake);
    }
}