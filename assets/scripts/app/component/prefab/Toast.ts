import GamePersist from "../../common/persist/GamePersist";
import { ColorType } from "../game/PlayDefine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Toast extends cc.Component {

  @property(cc.Label)
  public textMsg: cc.Label = null;
  @property(cc.Sprite)
  public imgBackground: cc.Sprite = null;

  public start() {
  }

  public setMessage(message: string, colorType, delayTime) {
    this.textMsg.string = message;
    this.textMsg['_updateRenderData'](true);
    const textSize = this.textMsg.node.getContentSize();
    this.imgBackground.node.setContentSize(textSize.width + 90, textSize.height + 70);

    this.node.opacity = 255;
    this.node.position = new cc.Vec2(0, 0);

    if (colorType === ColorType.Green) {
      this.textMsg.node.color = new cc.Color(46, 99, 25);
    } else {
      // 红
      this.textMsg.node.color = new cc.Color(173, 53, 53);

    }
    delayTime = (delayTime ? delayTime : 1);
    const delay = cc.delayTime(delayTime);
    const action = cc.spawn([cc.moveBy(1.3, cc.v2(0, 70)), cc.fadeTo(1.3, 0)]);
    const recycle = cc.callFunc(function () {
      GamePersist.ToastPool.put(this.node);
    }, this);
    const seqActions = cc.sequence([delay, action, recycle]);
    this.node.runAction(seqActions);
  }

  public onDestroy() {
  }
}
