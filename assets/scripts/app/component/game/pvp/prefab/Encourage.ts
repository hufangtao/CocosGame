import { Play } from "../../../../module/Modules";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Encourage extends cc.Component {

    @property(cc.Sprite)
    public sprite: cc.Sprite = null;

    public setType(type) {
        cc.loader.loadRes('res/prefab/encourage/word_encourage_' + type, cc.SpriteFrame, (err, spriteFrame) => {
            this.sprite.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });

        this.node.opacity = 255;
        this.node.setPosition(0, 500);

        const delay = cc.delayTime(0.2);
        const action = cc.spawn([cc.moveBy(1.3, cc.v2(0, 70)), cc.fadeTo(1.3, 0)]);
        const recycle = cc.callFunc(function () {
            Play.DataPvp.pushEncourage(this.node)
        }, this);
        const seqActions = cc.sequence([delay, action, recycle]);
        this.node.runAction(seqActions);
    }

    public onDestroy() {
    }
}
