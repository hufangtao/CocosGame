import BaseUI from "../../BaseUI";
import GamePersist from "../../../common/persist/GamePersist";
import NodePool from "../NodePool";
import DYAudio from "../../../../dyGame/DYAudio";
import PlayManager from "../PlayManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayStory extends BaseUI {

    @property(cc.Node)
    story1: cc.Node = null;
    @property(cc.Node)
    story2: cc.Node = null;
    @property(cc.Node)
    story3: cc.Node = null;

    @property(cc.Node)
    enterButton: cc.Node = null;

    private tabAction;
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        super.onLoad();

        // NodePool.initPool();

        this.tabAction = cc.sequence(
            cc.moveTo(0, cc.v2(0, -1280)),
            cc.callFunc(function (target) {
                //console.log(target);
                target.active = true;
            }, this),
            cc.moveTo(1, cc.v2(0, 0)));
        let self = this;
        this.enterButton.active = true;
        this.enterButton.opacity = 0;
        let action = cc.sequence(
            cc.fadeTo(1, 255),
            cc.callFunc(function () {
                let actionA = cc.repeatForever(
                    cc.sequence(cc.fadeTo(1, 0),
                        cc.fadeTo(1, 255)));
                self.enterButton.runAction(actionA);
            })
        );
        this.enterButton.runAction(action);
        this.node.on("touchstart", this.onTouchStart, this);

        cc.director.preloadScene('game');
    }

    canTouch = true;
    state = 1;
    onTouchStart() {
        if(!this.canTouch){
            return;
        }
        if(this.state === 1){
            this.story1.active = false;
            this.story2.active = true;
            this.state = 2;
            this.canTouch = false;
            this.scheduleOnce(()=>{
                this.canTouch = true;
            },1)
        }else if(this.state === 2){
            this.story2.active = false;
            this.story3.active = true;
            this.state = 3;
            this.canTouch = false;
            this.scheduleOnce(()=>{
                this.canTouch = true;
            },1)
        }else if(this.state === 3){
            GamePersist.INSTANCE.loadScene("game", () => {
                PlayManager.INSTANCE.PlayUI.layerGame.pvpTeach = true;
                PlayManager.INSTANCE.newRound(null);
            });
        }
    }

    start() {
        console.log("enter PlayStory start===========");
        super.start();
    }

    public uiName(): string {
        return "PlayStoryUI";
    }

    onContinue(event, data) {
        switch (data) {
            case "1":
                this.story2.active = true;
                this.story2.runAction(this.tabAction);
                break;
            case "2":
                this.story3.active = true;
                this.story3.runAction(this.tabAction);
                break;
            case "end":
                cc.director.loadScene("game", function () {
                    PlayManager.INSTANCE.PlayUI.layerGame.pvpTeach = true;
                    PlayManager.INSTANCE.newRound(null);
                });
                break;

        }
    }

    // update (dt) {}
}
