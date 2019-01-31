

const {ccclass, property} = cc._decorator;

@ccclass
export default class DelayActiveButton extends cc.Component {

    @property(cc.Button)
    public theButton: cc.Button = null;

    @property()
    public time: number = 0;

    @property(cc.Label)
    public btnLable: cc.Label = null;

    public btnLabelShow: string = "button";

    private timer: number = 0;
    // LIFE-CYCLE CALLBACKS:

    public onLoad() {
      this.timer = 0;
      this.theButton.interactable = false;
    }

    public start() {
      this.scheduleOnce(this.testTimer, this.time);

    }
    public testTimer() {
      this.theButton.interactable = true;
    }

    public update(dt) {
      this.timer += dt;
      this.test(this.timer);
    }
    public test(t: number) {
      if (this.timer < 1) {
        this.btnLable.string = this.time.toString();
      }
      if (this.timer >= Math.floor(t) && this.timer < Math.floor(t) + 1) {
        this.btnLable.string = (this.time - Math.floor(t)).toString();
      }
      if (this.timer > this.time) {
        this.btnLable.string = this.btnLabelShow;
      }
    }


}
