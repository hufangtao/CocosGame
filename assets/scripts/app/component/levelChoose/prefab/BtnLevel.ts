import { Play } from "../../../module/Modules";

const { ccclass, property } = cc._decorator

@ccclass
export default class BtnLevel extends cc.Component {
    @property
    isAllChildrenUse: boolean = false;

    @property(cc.Label)
    labLevel: cc.Label = null;
    @property(cc.Node)
    nodEmptyStar: cc.Node = null;
    @property(cc.Node)
    nodStar: cc.Node = null;

    level = 0;

    onLoad() {

    }

    setInteractable(Interactable) {
        this.node.getComponent(cc.Button).interactable = Interactable;
        if (!Interactable) {
            this.nodEmptyStar.active = false;
            this.nodStar.active = false;
        }
    }

    setLevel(level) {
        this.labLevel.string = level;
        this.level = level;
    }

    setCurLevel(isShowStar = false) {
        this.node.getChildByName('labLevel').active = false;
        if(!isShowStar){
            this.nodEmptyStar.active = false;
            this.nodStar.active = false;
        }
    }

    setStar(PveStat) {
        this.nodEmptyStar.active = true;
        this.nodStar.active = true;
        var _score = Play.LevelDatas['level_' + this.level].score;
        if (!_score) {
            return
        }
        if (PveStat.score >= _score[2]) {
            this.nodStar.children[0].active = true;
            this.nodStar.children[1].active = true;
            this.nodStar.children[2].active = true;
        } else if (PveStat.score >= _score[1]) {
            this.nodStar.children[0].active = true;
            this.nodStar.children[1].active = true;
            this.nodStar.children[2].active = false;
        } else if (PveStat.score >= _score[0]) {
            this.nodStar.children[0].active = true;
            this.nodStar.children[1].active = false;
            this.nodStar.children[2].active = false;
        } else {
            this.nodStar.children[0].active = false;
            this.nodStar.children[1].active = false;
            this.nodStar.children[2].active = false;
        }
    }
}