import * as Misc from "../../../../common/Misc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankItem extends cc.Component {

    @property(cc.Label)
    labRank: cc.Label = null;
    @property(cc.Label)
    labName: cc.Label = null;
    @property(cc.Label)
    labGrade: cc.Label = null;
    @property(cc.Label)
    labRate: cc.Label = null;

    itemID;

    updateItem(itemID, data) {
        this.itemID = itemID;
        
        // 好友名字
        let name = data.name;
        if(name.length > 6){
            name = name.substring(0,5);
        }
        this.labName.string = name;
        this.labName.node.color = new cc.Color(186,70,25,255);

        // 段位
        const StarNum = Misc.calcShowStarCount(data.star);
        this.labGrade.string = Misc.getGradeName(data.star) + " " + StarNum + "星";

        // 胜率
        this.labRate.string = Misc.formatPercent(data.rateOfWin / 100);
        
        // 榜次
        this.labRank.string = (itemID + 1) + "";
    }

    setMyRank(rankNum){
        this.labRank.string = (rankNum + 1) + "";
    }
}
