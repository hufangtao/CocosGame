const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    onLoad () {
        
    }

    start () {

    }

    btnBack(){
        this.node.active = false;
    }

    // update (dt) {}
}
