import { TILE_TYPE, PET_TYPE, TILE_ZINDEX, GRID_TYPE, Action_type } from "../../PlayDefine";
import BaseTile from "./BaseTile";
import { Play } from "../../../../module/Modules";
import StateMgr from "../StateMgr";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Obstacle extends BaseTile {
    @property(sp.Skeleton)
    spine: sp.Skeleton = null;

    @property({type: cc.Asset})
    spine_dog: cc.Asset = null;

    @property(cc.Node)
    public nodStars: cc.Node = null;

    isAction = false;

    onLoad() {
        super.onLoad();
        this._tileType = TILE_TYPE.PET;
        this.spine.animation = null;
        this.node.on('touchstart', this.onTouch, this);
        this.spine.setCompleteListener(trackEntry => {
            this.spine.animation = null;
        });
        this.randomPlayAni();
    }

    onTouch(event) {
        this.spine.setAnimation(0, 'animation', false);
    }

    public init() {
        this.node.stopAllActions();
        this.isAction = false;
        this.node.active = true;
        this.node.scale = 1;
        this.spine.node.active = true;
        this.spine.node.scale = 1;
        this.nodStars.active = false;
    }

    public setContentSize(width, height) {
        this.node.setContentSize(width, height);
    }

    public setArrPosition(x, y) {
        this.x = x;
        this.y = y;
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * y + this.node.height / 2);
    }
    public setSpfByType(type) {
        this.init();
        switch (type) {
            case PET_TYPE.TYPE_1:
                this.spine.setSkin('mao');
                break;
            case PET_TYPE.TYPE_2:
                this.spine.setSkin('tuzi');
                break;
            case PET_TYPE.TYPE_3:
                this.spine.setSkin('xiong');
                break;
            case PET_TYPE.TYPE_4:
                this.spine.setSkin('zhu');
                break;
        }
        this.spine.setToSetupPose();
    }
    public newTile(x, y, isMoveTo = true) {
        this.setArrPosition(x, y)
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
        if (this.canRecovery()) {
            this._game.tiles[this.x][this.y] = null;
        }

        if (isDown) {
            var action = cc.sequence(
                cc.moveTo(0.08, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 - 15)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2 + 5)),
                cc.moveTo(0.05, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    self.getObstacle();
                    self.onTouch(null);
                    cb && cb();
                })
            );
        } else {
            var action = cc.sequence(
                cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    self.getObstacle();
                    cb && cb();
                })
            )
        }

        this.node.stopActionByTag(Action_type.MoveTo);
        this.node.runAction(action);
        action.setTag(Action_type.MoveTo);
    }

    getCollectPosition() {
        return Play.DataPve.needRecovery(this.tileType, this.type, this.subType);
    }

    // 方块销毁
    public destroyTile(type?) {
        var self = this;
        Play.DataPve.pushObstacle(self.node);
    }

    // 可以回收
    canRecovery() {
        if (Play.DataPve.grid[this.x][this.y - 1] && Play.DataPve.grid[this.x][this.y - 1] !== GRID_TYPE.EMPTY) {
            return false;
        }
        if (Play.DataPve.grid[this.x][this.y] === GRID_TYPE.DOWNGATE) {
            return false;
        }
        return true;
    }

    // 检查回收
    getObstacle(needDestroy = false) {
        if (!this.canRecovery()) {
            return;
        }

        if (needDestroy) {
            this._game.tiles[this.x][this.y] = null;
        }

        // 回收
        this.recoveryObstacle();
        this._game.PlayUI.Audio.collect();
    }

    public onDestroy() {
        super.onDestroy();
        this.unschedule(this.onTouch);
    }
    onDisable() {
        this.node.stopAllActions();
        super.onDisable();
    }

    // 间隔一段时间播放一次动画
    randomPlayAni() {
        var duration = Math.random() * 20 + 10;
        this.unschedule(this.onTouch);
        this.schedule(this.onTouch, duration);
    }

    billowAct(x, y, cb) {
        this.onTouch(null);
        super.billowAct(x, y, cb);
    }

    bothSideAct(x, cb) {
        this.onTouch(null);
        super.bothSideAct(x, cb);
    }

    getAction1() {
        let position = this.getCollectPosition();
        position = this._game.panelTile.convertToWorldSpaceAR(position);
        position = this.node.convertToNodeSpaceAR(position);

        let direc = Math.random() > 0.5 ? -1 : 1;
        let des = (Math.random() * 270 + 30) * direc;
        let action = cc.spawn(
            cc.moveTo(1, position.x, position.y).easing(cc.easeCubicActionIn()),
            cc.sequence(
                cc.moveBy(0.7, des, 0),
                cc.moveBy(0.3, -des, 0).easing(cc.easeCircleActionIn())
            ))

        return action;
    }

    getAction2() {
        let direc = Math.random() > 0.5 ? -1 : 1;
        let des = (Math.random() * 270 + 30) / 2 * direc

        let action = cc.spawn(
            cc.rotateBy(1, 720),
            cc.sequence(
                cc.moveBy(0.7, 0, -des),
                cc.moveBy(0.3, 0, des).easing(cc.easeCircleActionIn())
            ),
            cc.sequence(
                cc.scaleTo(0.7, 1.3, 1.3),
                cc.scaleTo(0.3, 1, 1).easing(cc.easeCircleActionIn())
            ));
        return action;
    }

    recoveryObstacle() {
        this._game.moveAllTileDown();
        this.spine.node.active = false;
        this.node.zIndex = TILE_ZINDEX.ACTION;
        this.nodStars.active = true;
        for (let i = 0; i < this.nodStars.children.length; ++i) {
            this.nodStars.children[i].stopAllActions();
            this.nodStars.children[i].getChildByName('sprite').stopAllActions();
            this.nodStars.children[i].position = cc.v2(0, 0);
            this.nodStars.children[i].getChildByName('sprite').position = cc.v2(0, 0);
            this.nodStars.children[i].runAction(this.getAction1());
            this.nodStars.children[i].getChildByName('sprite').runAction(this.getAction2());
        }

        StateMgr.INSTANCE.isCollectOver = false;
        
        this.game.unschedule(this.game.petScheduleCb);
        this.game.petScheduleCb = () => {
            StateMgr.INSTANCE.isCollectOver = true;
        }
        this.game.scheduleOnce(this.game.petScheduleCb, 1);
        this.scheduleOnce(()=>{
            this.destroyTile();
            this.recoveryObjective();
        },1.05)
    }


}
