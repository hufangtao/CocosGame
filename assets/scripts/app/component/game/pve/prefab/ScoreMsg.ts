import NodePool from "../../NodePool";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScoreMsg extends cc.Component {

    @property(cc.Label)
    public labScore: cc.Label = null;

    @property({ type: cc.Asset })
    public font_red: cc.Asset = null;
    @property({ type: cc.Asset })
    public font_blue: cc.Asset = null;
    //   @property(cc.Sprite)
    //   public imgBackground: cc.Sprite = null;

    public start() {
    }

    public setMessage(count, score: number, x, y) {
        if (count <= 6) {
            this.labScore.font = this.font_blue;
        } else {
            this.labScore.font = this.font_red;
        }
        this.labScore.string = score + '';
        const textSize = this.labScore.node.getContentSize();
        // this.imgBackground.node.setContentSize(textSize.width + 70, textSize.height + 40);

        this.node.opacity = 255;
        let offestX = (Math.random() - 0.5) * 20;
        let offestY = (Math.random() - 0.5) * 20;
        this.node.setPosition(80 * (x - 4) + 80 / 2 + offestX,
            80 * y + 80 + offestY);

        const delay = cc.delayTime(0.2);
        const action = cc.spawn([cc.moveBy(1.3, cc.v2(0, 70)), cc.fadeTo(1.3, 0)]);
        const recycle = cc.callFunc(function () {
            NodePool.putNodeScore(this.node);
        }, this);
        const seqActions = cc.sequence([delay, action, recycle]);
        this.node.runAction(seqActions);
    }

    public onDestroy() {
    }
}
