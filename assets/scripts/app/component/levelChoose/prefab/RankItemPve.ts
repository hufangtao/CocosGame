import { Home } from "../../../module/Modules";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    @property(cc.Node)
    medal_1: cc.Node = null;
    @property(cc.Node)
    medal_2: cc.Node = null;
    @property(cc.Node)
    medal_3: cc.Node = null;

    @property(cc.Label)
    labRank: cc.Label = null;
    @property(cc.Label)
    labName: cc.Label = null;
    @property(cc.Label)
    labScore: cc.Label = null;

    @property(cc.Node)
    nodBg_1: cc.Node = null;
    @property(cc.Node)
    nodBg_2: cc.Node = null;

    @property({ type: cc.Asset })
    ranknum_blue:cc.Asset = null;
    @property({ type: cc.Asset })
    ranknum_red:cc.Asset = null;

    itemID;

    updateItem(itemID, data) {
        this.itemID = itemID;
        if (itemID == 0) {
            this.medal_1.active = true;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        } else if (itemID == 1) {
            this.medal_1.active = false;
            this.medal_2.active = true;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        } else if (itemID == 2) {
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = true;
            this.labRank.node.active = false;
        } else {
            // 排名
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = true;
            this.labRank.string = (itemID + 1) + "";
        }

        // 好友名字
        let name = data.name;
        if(name.length > 6){
            name = name.substring(0,5);
        }
        this.labName.string = name;

        // 分数
        this.labScore.string = data.score;

        const myRankPos: number = Home.PveRank.myPos || 0;
        // 榜次
        if (myRankPos == itemID + 1) {
            // this.labRank.font = this.ranknum_blue;
            this.labName.node.color = cc.color(37, 88, 165, 255);
            this.labScore.node.color = cc.color(37, 88, 165, 255);
            this.nodBg_1.active = false;
            this.nodBg_2.active = true;
        } else {
            // this.labRank.font = this.ranknum_red;
            this.labName.node.color = cc.color(186, 70, 25, 255);
            this.labScore.node.color = cc.color(186, 70, 25, 255);
            this.nodBg_1.active = true;
            this.nodBg_2.active = false;
        }
    }

    setMyRank(rankNum){
        if (rankNum == 0) {
            this.medal_1.active = true;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        } else if (rankNum == 1) {
            this.medal_1.active = false;
            this.medal_2.active = true;
            this.medal_3.active = false;
            this.labRank.node.active = false;
        } else if (rankNum == 2) {
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = true;
            this.labRank.node.active = false;
        } else {
            // 排名
            this.medal_1.active = false;
            this.medal_2.active = false;
            this.medal_3.active = false;
            this.labRank.node.active = true;
            this.labRank.string = (rankNum + 1) + "";
            this.labName.node.color = cc.color(37, 88, 165, 255);
            this.labScore.node.color = cc.color(37, 88, 165, 255);
        }
    }
}
