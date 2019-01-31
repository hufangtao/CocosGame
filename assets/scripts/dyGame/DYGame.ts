import DYUtils from "./DYUtils";
import DYNotify from './DYNotify';

// 所有组件的基类
const {ccclass, property} = cc._decorator;

@ccclass
export default class DYGame extends cc.Component {
    static theRoot : DYGame = null;

    public onLoad() {
        cc.game.addPersistRootNode(this.node);
        DYGame.theRoot = this;  
    }
}
