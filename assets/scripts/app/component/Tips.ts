const { ccclass, property } = cc._decorator;

@ccclass
export default class Tip extends cc.Component {
    show() {
        this.node.active = true;
        this.node.opacity = 255;
        let index = Math.floor(Math.random() * 6);
        for (let i = 0; i < this.node.children.length; ++i) {
            if (index == i) {
                this.node.children[i].active = true;
            } else {
                this.node.children[i].active = false;
            }
        }
    }
    hide(){
        this.node.active = false;
    }
}
