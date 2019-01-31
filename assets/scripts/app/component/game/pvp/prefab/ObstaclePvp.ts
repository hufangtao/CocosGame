import { TILE_TYPE, PET_TYPE, TILE_ZINDEX } from "../../PlayDefine";
import { Play } from "../../../../module/Modules";
import BaseTile from "../../pve/prefab/BaseTile";
import NetUtil from "../../../../common/net/NetUtil";
import { PlaySaveAnimalC2S } from "../../../../common/net/proto/mods/ProtoSectionPlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ObstaclePvp extends BaseTile {
    @property(sp.Skeleton)
    spine: sp.Skeleton = null;
    @property({ type: cc.Asset })
    spine_dog: cc.Asset = null;

    @property(cc.Node)
    public nodStars: cc.Node = null;



    isAction = false;

    private _collectPosition = cc.v2(-155, 855);
    private _collectPosition2 = cc.v2(155, 855);

    onLoad() {
        super.onLoad();
        this._tileType = TILE_TYPE.PET;
        this.spine.animation = null;
        this.spine.setCompleteListener(trackEntry => {
            this.spine.animation = null;
        });
    }

    onEnable() {
        this.node.on('touchstart', this.onTouch, this);
    }
    onTouch(event) {
        this.spine.setAnimation(0, 'animation', false);
    }

    public init() {
        this.isAction = false;
        this.node.active = true;
        this.node.scale = 1;
        this.spine.node.active = true;
        this.spine.node.scale = 1;
        this.randomPlayAni();

        this.nodStars.active = false;
        for (let i = 0; i < this.nodStars.children.length; ++i) {
            this.nodStars.children[i].stopAllActions();
            this.nodStars.children[i].getChildByName('sprite').stopAllActions();
            this.nodStars.children[i].position = cc.v2(0, 0);
            this.nodStars.children[i].getChildByName('sprite').position = cc.v2(0, 0);
        }
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
    public newTile(x, y, minY?) {
        this.setArrPosition(x, y)
        this.node.setPosition(this.node.width * (x - 4) + this.node.width / 2,
            this.node.height * (9 - minY + y + 1.5));
        this.moveTo(x, y, null, minY);
    }
    // 移动到特定点
    public moveTo(x, y, cb, minY?, isDown = true) {
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
                    this.getObstacle();
                    cb && cb();
                })
            );
        } else {
            var action = cc.sequence(
                cc.moveTo(0.3, cc.v2(this.node.width * (x - 4) + this.node.width / 2,
                    this.node.height * y + this.node.height / 2)),
                cc.callFunc(() => {
                    this._canTouch = true;
                    this.getObstacle();
                    cb && cb();
                    // this._game.canTouch = true;
                })
            )
        }

        this.x = x;
        this.y = y;
        if (this.canRecovery()) {
            this._game.tiles[this.x][this.y] = null;
        }
        this.node.stopActionByTag(1);
        this.node.runAction(action);
        action.setTag(1);
    }

    // 方块销毁
    public destroyTile() {
        var self = this;
        this._game.sendBoardPetCnt();
        self.nodContent.stopAllActions();
        self.node.stopAllActions();
        cc.director.getScheduler().unscheduleAllForTarget(this);
        Play.DataPvp.pushObstacle(self.node);
    }

    canRecovery() {
        if (this.y <= 0) {
            return true;
        }
        return false;
    }



    // 检查回收
    getObstacle() {
        if (this.canRecovery()) {
            // 回收
            this.recoveryObstacle();
            this._game.PlayUI.Audio.collect();
        }
    }

    sendMsg() {
        var playSaveAnimalC2S = new PlaySaveAnimalC2S();
        NetUtil.SendMsg(playSaveAnimalC2S);
    }

    public onDestroy() {
        super.onDestroy();
        this.unschedule(this.onTouch);
    }
    onDisable() {
        super.onDisable();
    }

    // 间隔一段时间播放一次动画
    randomPlayAni() {
        var duration = Math.random() * 2 + 1;
        // var duration = 2;
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
        let position = this._game.panelTile.convertToWorldSpaceAR(this._collectPosition);
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

    // 抢夺宠物动作
    runGrabAction(count) {
        this._game.tiles[this.x][this.y] = null;
        this.scheduleOnce(() => {
            let startPs = this.node.position;
            let endPs = this._collectPosition2;
            let tan = (endPs.x - startPs.x) / (endPs.y - startPs.y);
            let angle = Math.round(Math.atan(tan) / (Math.PI / 180));

            endPs = this._game.panelTile.convertToWorldSpaceAR(endPs);
            endPs = this.node.convertToNodeSpaceAR(endPs);

            let sign = Math.random() > 0.5 ? 1 : -1;
            let offset = 100 * sign;

            let action = cc.sequence(
                cc.spawn(
                    cc.moveTo(0.6, endPs),
                    cc.sequence(
                        cc.moveBy(0.2, offset, 0).easing(cc.easeIn(0.2)),
                        cc.moveBy(0.4, -offset, 0).easing(cc.easeOut(0.4)),
                    )),
                cc.callFunc(() => {
                    this.nodContent.rotation = 0;
                    this.spine.node.rotation = 0;
                    this.nodContent.position = cc.v2(0, 0);
                    this.destroyTile();
                })
            );


            this.nodContent.rotation = angle;
            this.spine.node.rotation = -angle;
            this.nodContent.runAction(action);

            this._game.moveAllTileDown();
            this._game.beGrabedObstacle();
        }, count * 0.1)
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
        this.scheduleOnce(() => {
            this._game.getObstacle();
            this.sendMsg();
            this.destroyTile();
        }, 1)
    }

    // 抢夺到宠物
    grabPet() {
        this.getComponent(cc.Animation).play('grabPet');
    }
}
