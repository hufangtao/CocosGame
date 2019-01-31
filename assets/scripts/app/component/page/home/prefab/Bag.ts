import { Home } from "../../../../module/Modules";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Bag extends cc.Component {

    @property(cc.Node)
    nodContent: cc.Node = null;
    @property(cc.Prefab)
    pfbProp: cc.Prefab = null;

    @property(cc.SpriteFrame)
    spfProp1: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfProp2: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfProp3: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfProp4: cc.SpriteFrame = null;

    onLoad() {
        this.loadBagContent();
    }

    start() {

    }

    // 加载背包内容
    loadBagContent() {
        for (let i = 0; i < Home.DataPlayer.PlayerGoodsData.length; ++i) {
            let good = Home.DataPlayer.PlayerGoodsData[i];
            let nodProp = cc.instantiate(this.pfbProp);
            nodProp.parent = this.nodContent;
            nodProp.getChildByName('propIcon').getComponent(cc.Sprite).spriteFrame = this.getSpfById(good.goodsId);
            nodProp.getChildByName('labCount').getComponent(cc.Label).string = good.goodsNum + '';
        }
    }

    getSpfById(goodId) {
        let spriteFrame;
        switch (goodId) {
            case 1:
                spriteFrame = this.spfProp1;
                break;
            case 2:
                spriteFrame = this.spfProp2;
                break;
            case 3:
                spriteFrame = this.spfProp3;
                break;
            case 4:
                spriteFrame = this.spfProp4;
                break;
        }
        return spriteFrame;
    }

    closePanel() {
        this.node.active = false;
    }
    // update (dt) {}
}
