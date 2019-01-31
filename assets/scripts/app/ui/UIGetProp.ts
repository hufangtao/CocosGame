import DYAudio from "../../dyGame/DYAudio";
import { PGoods } from "../common/net/proto/ProtoType";
import { Home } from "../module/Modules";
import { UIFunc } from "../common/UIFunc";
import Prop from "../component/page/home/Prop";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIGetProp extends cc.Component {

    @property({ type: cc.AudioClip })
    audGetProp: cc.AudioClip = null;
    @property(cc.Node)
    nodMoreProp: cc.Node = null;

    Prop: Prop;
    onEnable() {
        let nodBuffs = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodBuffs.scale = 1;
        nodBuffs.setPosition(0, 0);

        this.nodMoreProp.active = false;
        this.node.getChildByName('nodOneProp').active = false;

        for (let i = 0; i < nodBuffs.children.length - 3; ++i) {
            nodBuffs.children[i].active = false;
            nodBuffs.children[i].setPosition(0, 0);
        }
    }

    start() {

    }

    // 播放获得道具音效
    playAudioGetProp() {
        DYAudio.playEffect(this.audGetProp, false);
    }

    achieveCoin(coinCount, cb) {
        this.node.active = true;
        let nodBuffs = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodBuffs.getChildByName('labCount').getComponent(cc.Label).string = coinCount + '';

        nodBuffs.getChildByName('coin').active = true;
        let animation = this.node.getComponent(cc.Animation);
        animation['closeProp'] = () => {
            this.node.active = false;
            cb && cb();
        }
        animation.play('getProp2');
    }

    // 多个道具的展示
    moreProp(goodList, cb) {
        // 初始化道具图标及数量
        let nodGoods = this.nodMoreProp.getChildByName('nodGoods');
        for (let i = 0; i < nodGoods.children.length; ++i) {
            nodGoods.children[i].active = false;
        }
        let nodGood;
        for (let i = 0; i < goodList.length; ++i) {
            nodGood = nodGoods.children[i];
            if (!nodGood) {
                break;
            }
            nodGood.active = true;
            for (let j = 0; j < nodGood.children.length - 2; ++j) {
                nodGood.children[j].active = false;
            }
            nodGood.getChildByName('labCount').getComponent(cc.Label).string = goodList[i].goodsNum + '';
            this.showGoodById(nodGood, goodList[i].goodsId);
        }

        let animation = this.node.getComponent(cc.Animation);
        animation['closeProp'] = () => {
            cb && cb();
        }
        animation.play('getProp3');
    }

    // 根据goodid显示
    showGoodById(node, id) {
        switch (id) {
            case 1:
                node.getChildByName('buff1').active = true;
                break;
            case 2:
                node.getChildByName('buff2').active = true;
                break;
            case 3:
                node.getChildByName('buff3').active = true;
                break;
            case 4:
                node.getChildByName('buff4').active = true;
                break;
            case 11:
                node.getChildByName('coin').active = true;
                break;
            case 12:
                break;
            case 13:
                break;
            case 14:
                node.getChildByName('energy').active = true;
                break;

        }
    }


    // 广告获得的道具
    hadGetProp = false;
    scorePvpAchieveProp() {
        if (this.hadGetProp) {
            return;
        }
        this.hadGetProp = true;
        setTimeout(() => {
            this.hadGetProp = false;
        }, 1000);
        let param;
        let prop = new PGoods();
        for (let i = 0; i < Home.DataPlayer.PlayerGoodsData.length; ++i) {
            let hadParam = false;
            for (let j = 0; j < Home.DataPlayer.PlayerGoodsDataLast.length; ++j) {
                if (Home.DataPlayer.PlayerGoodsData[i].goodsId == Home.DataPlayer.PlayerGoodsDataLast[j].goodsId) {
                    if (Home.DataPlayer.PlayerGoodsData[i].goodsNum == Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum) {
                        hadParam = true;
                    } else {
                        param = Home.DataPlayer.PlayerGoodsData[i];
                        hadParam = true;
                        prop.goodsId = Home.DataPlayer.PlayerGoodsData[i].goodsId;
                        prop.goodsNum = Home.DataPlayer.PlayerGoodsData[i].goodsNum - Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum;
                        break;
                    }
                }
            }
            if (!hadParam) {
                param = Home.DataPlayer.PlayerGoodsData[i];
                prop.goodsId = Home.DataPlayer.PlayerGoodsData[i].goodsId;
                prop.goodsNum = Home.DataPlayer.PlayerGoodsData[i].goodsNum;
            }
        }
        Home.DataPlayer.UpdataPlayerGoodsLast([param]);
        // console.log('获得道具', prop);
        this.scorePvpPlayGetProp(prop.goodsId, prop.goodsNum);
    }

    scorePvpPlayGetProp(index, count) {
        let nodBuffs = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodBuffs.scale = 1;
        this.node.active = true;
        this.showBuffByIndex(index, count);
        let animation = this.node.getComponent(cc.Animation);
        animation['closeProp'] = () => {
            this.node.active = false;
            UIFunc.closeUI('UIGetProp',()=>{});
        }
        animation.play('getProp2');
    }

    // home场景广告获得的道具
    homeAchieveProp(Prop) {
        this.Prop = Prop;
        let param;
        let prop = new PGoods();
        for (let i = 0; i < Home.DataPlayer.PlayerGoodsData.length; ++i) {
            let hadParam = false;
            for (let j = 0; j < Home.DataPlayer.PlayerGoodsDataLast.length; ++j) {
                if (Home.DataPlayer.PlayerGoodsData[i].goodsId == Home.DataPlayer.PlayerGoodsDataLast[j].goodsId) {
                    if (Home.DataPlayer.PlayerGoodsData[i].goodsNum == Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum) {
                        hadParam = true;
                    } else {
                        param = Home.DataPlayer.PlayerGoodsData[i];
                        hadParam = true;
                        prop.goodsId = Home.DataPlayer.PlayerGoodsData[i].goodsId;
                        prop.goodsNum = Home.DataPlayer.PlayerGoodsData[i].goodsNum - Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum;
                        break;
                    }
                }
            }
            if (!hadParam) {
                param = Home.DataPlayer.PlayerGoodsData[i];
                prop.goodsId = Home.DataPlayer.PlayerGoodsData[i].goodsId;
                prop.goodsNum = Home.DataPlayer.PlayerGoodsData[i].goodsNum;
            }
        }
        Home.DataPlayer.UpdataPlayerGoodsLast([param]);
        // console.log('获得道具', prop);
        this.playGetProp(prop.goodsId, prop.goodsNum);
    }

    // 获取道具的位置
    getPropPsByIndex(index: number): cc.Vec2 {
        let nodProp = this.Prop.nodBuffSlot.children[index - 1];
        if (!nodProp) {
            return cc.v2(0, 0);
        }
        let position = nodProp.parent.convertToWorldSpaceAR(nodProp.position);
        return this.node.getChildByName('nodOneProp').convertToNodeSpaceAR(position);
    }

    // 根据道具显示图标
    showBuffByIndex(index: number, count: number) {
        let nodes = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodes.getChildByName('labCount').getComponent(cc.Label).string = count + '';
        nodes.getChildByName('coin').active = false;
        for (let i = 0; i < nodes.children.length - 3; ++i) {
            if (i === index - 1) {
                nodes.children[i].active = true;
            } else {
                nodes.children[i].active = false;
            }
        }
    }

    // 播放获得道具动画
    playGetProp(index: number, count: number) {
        this.playAudioGetProp();
        this.node.getChildByName('nodOneProp').getChildByName('buffs').position = cc.v2(0, 0);
        let animation = this.node.getComponent(cc.Animation);
        animation.stop('getProp');
        let position = this.getPropPsByIndex(index);
        this.showBuffByIndex(index, count);
        animation['move'] = () => {
            this.node.getChildByName('nodOneProp').getChildByName('buffs').runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(0.5, position),
                    cc.scaleTo(0.5, 0.2, 0.2)
                ),
                cc.callFunc(() => {
                    this.Prop.updateBuff();
                    UIFunc.closeUI('UIGetProp', () => { })
                })
            ));
        }
        animation.play('getProp');
    }

    // update (dt) {}
}
