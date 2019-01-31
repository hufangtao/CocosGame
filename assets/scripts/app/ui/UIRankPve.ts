import { ValueKey } from "../common/Defines";
import { RankPveRankC2S } from "../common/net/proto/mods/ProtoSectionRank";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import { Home, Play } from "../module/Modules";
import { DYNotify } from "../../dyGame/DYNotify";
import { Message } from "../common/Message";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RankPve extends cc.Component {
    @property(cc.Prefab)
    private pListItem: cc.Prefab = null;                // 排行item

    @property(cc.Node)
    private nodeGlobalContainer: cc.Node = null;   // 全服排行榜容器

    @property(cc.Node)
    private pGlobalRankList: cc.Node = null;  // 全服排行list面板

    @property(cc.Node)
    private nodFriendToggle: cc.Node = null;
    @property(cc.Node)
    private nodGlobalToggle: cc.Node = null;

    @property(cc.Node)
    private pInRankNode: cc.Node = null;     // 在排名中

    @property(cc.Label)
    private textGlobalRankPos: cc.Label = null; // 上榜榜次

    @property(cc.Label)
    private textOutsideGlobalRank: cc.Label = null; // 未上榜提示

    @property(cc.Label)
    private pNobodyLabel: cc.Label = null;      // 没有内容时的提示

    isShowFriendRank;

    onLoad() {
        this.nodFriendToggle.on('click', this.onFriendRank, this);
        this.nodGlobalToggle.on('click', this.onGlobalRank, this);
    }
    onEnable() {
        DYNotify.regObserver(Message.RANK_RESULT, this.onNotify, this);
        this.nodGlobalToggle.getComponent(cc.Toggle).isChecked = true;
        this.nodFriendToggle.getComponent(cc.Toggle).isChecked = false;
        this.showRank();
        this.pNobodyLabel.node.active = false;
    }

    onFriendRank() {
        GamePersist.INSTANCE.btnAudio_1();
        // 是否支持好友排行榜
        if (!window['Partner'].supportSocialFriend()) {
            this.showNotSupport();
            return;
        }
        window['Partner'].postMsg(1, { valuekey: ValueKey.levelScore });
        this.node.getChildByName('nodFriendRank').active = true;
        this.nodeGlobalContainer.active = false;
        this.node.getChildByName('nodNotSupport').active = false;
        this.node.getChildByName('nobodyLabel').active = false;
        this.isShowFriendRank = true;
    }
    onGlobalRank() {
        GamePersist.INSTANCE.btnAudio_1();
        this.nodeGlobalContainer.active = true;
        this.node.getChildByName('nodNotSupport').active = false;
        this.node.getChildByName('nodFriendRank').active = false;
        this.isShowFriendRank = false;
    }

    private onNotify(target, tag, param) {
        var self = target;
        
        if (tag == Message.RANK_RESULT) {
            if (param.level == Play.DataPve.curLevel) {
                Home.PveRank = param;
                self.showGlobalRank();
            }
        }
    }

    public start() {

    }

    onDisable() {
        const pListConetn: cc.Node = cc.find("rank_list/view/content", this.pGlobalRankList);
        pListConetn.destroyAllChildren();
        this.nodeGlobalContainer.active = true;
        this.node.getChildByName('nodFriendRank').active = false;
        this.isShowFriendRank = false;
        DYNotify.removeAllObservers(this);
    }

    showRank() {
        const rankDataReq = new RankPveRankC2S();
        rankDataReq.level = Play.DataPve.curLevel;
        rankDataReq.posStart = 1;
        rankDataReq.posEnd = 10;
        NetUtil.SendMsg(rankDataReq);
    }
    // 查看全服排行
    public showGlobalRank(): void {
        this.nodeGlobalContainer.active = true;
        this.node.getChildByName('nodNotSupport').active = false;

        const pListConetn: cc.Node = cc.find("rank_list/view/content", this.pGlobalRankList);
        pListConetn.destroyAllChildren();

        cc.log(Home.PveRank.playmates)

        // 没有玩家时
        const vecRankData = Home.PveRank.playmates;
        if (!vecRankData || vecRankData.length <= 0) {
            this.showNobody();
            return;
        }

        this.fillGlobalRank();
    }

    private fillGlobalRank() {
        const rankList = Home.PveRank.playmates;
        this.getComponent('ListView').showRank(rankList);
    }


    // 没有人上榜
    private showNobody() {
        this.nodeGlobalContainer.active = false;
        this.node.getChildByName('nodNotSupport').active = false;
        this.node.getChildByName('nobodyLabel').active = true;
    }
    private showNotSupport() {
        this.nodeGlobalContainer.active = false;
        this.node.getChildByName('nodNotSupport').active = true;
    }
}
