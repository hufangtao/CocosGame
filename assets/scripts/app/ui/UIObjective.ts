import LayerGamePve from "../component/game/pve/LayerGamePve";
import { Play } from "../module/Modules";
import { UIFunc } from "../common/UIFunc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIObjective extends cc.Component {

    @property(cc.Node)
    nodContent: cc.Node = null;

    layerGame: LayerGamePve;

    onLoad() {

    }

    start() {

    }

    // 设置开局提示面板
    initObjective(layerGame) {
        this.layerGame = layerGame;
        let panelHeader = this.layerGame.panelHeader;
        this.nodContent.stopAllActions();
        this.nodContent.x = -720;
        var nodObjectives = this.nodContent.getChildByName('nodObjectives');
        for (let i = 0; i < nodObjectives.children.length; ++i) {
            nodObjectives.children[i].active = false;
        }
        var count = 0;
        for (let i = 0; i < panelHeader.nodObjective.children.length; ++i) {
            if (panelHeader.nodObjective.children[i].active) {
                count++;
                nodObjectives.children[i].active = true;
                var node = cc.instantiate(panelHeader.nodObjective.children[i].getChildByName('sprite').children[0]);
                nodObjectives.children[i].getChildByName('sprite').destroyAllChildren();
                node.parent = nodObjectives.children[i].getChildByName('sprite');
                nodObjectives.children[i].getChildByName('labObjective').getComponent(cc.Label).string =
                    panelHeader.nodObjective.children[i].getChildByName('labObjective').getComponent(cc.Label).string;

                nodObjectives.children[i].getChildByName('ban').active = panelHeader.nodObjective.children[i].getChildByName('ban').active;
                nodObjectives.children[i].getChildByName('arrow').active = panelHeader.nodObjective.children[i].getChildByName('arrow').active;
                nodObjectives.children[i].getChildByName('question').active = panelHeader.nodObjective.children[i].getChildByName('question').active;
                nodObjectives.children[i].getChildByName('sprite').active = panelHeader.nodObjective.children[i].getChildByName('sprite').active;
                nodObjectives.children[i].getChildByName('labObjective').active = panelHeader.nodObjective.children[i].getChildByName('labObjective').active;
            }
        }
        if (count == 1) {
            nodObjectives.width = 150;
            // nodObjectives.children[0].x = 0;
        } else {
            nodObjectives.width = 300;
        }
    }
    // 提示面板动画
    panelObjectiveAction() {
        var action = cc.sequence(
            cc.moveTo(0.5, 20, 0),
            cc.moveTo(0.2, 0, 0),
            cc.delayTime(1),
            cc.moveTo(0.5, 720, 0),
            cc.callFunc(() => {
                if (!Play.DataPve.isTimeLevel) {
                    Play.DataPve.gameBegan = true;
                }
                UIFunc.closeUI('UIObjective',()=>{});
                this.layerGame.panelGuide.getComponent('panelGuidePve').showGuide();
            })
        )
        this.nodContent.runAction(action);
    }

    // update (dt) {}
}
