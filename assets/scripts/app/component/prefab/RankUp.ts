import { Play, Home } from "../../module/Modules";
import { PStarRank } from "../../common/net/proto/ProtoType";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankUp extends cc.Component {
    @property(cc.Node)
    nodItems: cc.Node = null;

    @property(cc.Node)
    nodMyItem: cc.Node = null;

    onLoad() {

    }

    start() {

    }

    showAction(isPvp) {
        this.initItem(isPvp);
    }

    initItem(isPvp) {
        this.nodMyItem.destroyAllChildren();
        this.nodItems.destroyAllChildren();
        this.loadItemPrefab(isPvp, (prefab) => {
            let beyondCount = Play.DataPvp.oldPvpRank - Home.DataRank.MyRank;
            if (beyondCount > 5) {
                beyondCount = 5;
            }
            let myData = Home.DataRank.GlobalRankData[Home.DataRank.MyRank];
            // 初始化我的item
            let myRankItem = this.getNodItem(prefab);
            myRankItem.updateItem(Play.DataPvp.oldPvpRank - 1, myData);
            myRankItem.node.parent = this.nodMyItem;
            myRankItem.node.getChildByName('bg_0').active = false;
            myRankItem.node.getChildByName('bg_1').active = true;
            myRankItem.node.y = 0;

            for (let i = 0; i < beyondCount; ++i) {
                let data = Home.DataRank.GlobalRankData[Home.DataRank.MyRank - i - 1];
                let RankItem = this.getNodItem(prefab);
                RankItem.node.parent = this.nodItems;
                RankItem.node.y = 0;
                if (!data) {
                    continue
                }
                RankItem.updateItem(Home.DataRank.MyRank - i, data);
            }

            this.getComponent(cc.Animation).play('rankUp');
            this.scheduleOnce(() => {
                myRankItem.setMyRank(Home.DataRank.MyRank - 1);
            }, 1.1);
            this.scheduleOnce(() => {
                this.node.destroy();
            }, 2);
        });
    }

    // 获取item的脚本组件
    getNodItem(prefab) {
        if (!prefab) {
            return;
        }
        let node = cc.instantiate(prefab);
        let RankItem = node.getComponent(prefab.name);
        return RankItem;
    }

    // 加载item prefab
    loadItemPrefab(isPvp, cb) {
        let prefab;
        if (isPvp) {
            cc.loader.loadRes('prefab/home/RankItem', cc.Prefab, (err, res) => {
                prefab = res;
                // cc.loader.setAutoReleaseRecursively(res, true)
                cb && cb(prefab);
            });

        } else {
            cc.loader.loadRes('prefab/levelChoose/RankItemPve', cc.Prefab, (err, res) => {
                prefab = res;
                // cc.loader.setAutoReleaseRecursively(res, true)
                cb && cb(prefab);
            });
        }
    }
    // update (dt) {}
}
