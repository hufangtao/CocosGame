import { Home, Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import NetUtil from "../common/net/NetUtil";
import SocialManager from "../common/social/SocialManager";
import * as Misc from "../common/Misc";
import { PlaySide } from "../component/game/PlayDefine";
import { PlayerShareGameC2S } from "../common/net/proto/mods/ProtoSectionPlayer";
import PlayPlaymateHead from "../component/prefab/PlayPlaymateHead";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIAchievement extends cc.Component {

    @property(cc.Node)
    private headFrame: cc.Node = null;

    @property(cc.Label)
    private labName: cc.Label = null;

    @property(cc.Sprite)
    private spHoner: cc.Sprite = null;      // honer.

    @property(cc.Node)
    private pStartNode: cc.Node = null;      // 星数

    @property(cc.Node)
    private sprMale: cc.Node = null;
    @property(cc.Node)
    private sprFemale: cc.Node = null;

    @property(cc.Button)
    private pShareBtn: cc.Button = null;    // 分享

    @property(cc.Button)
    private pCloseLabel: cc.Button = null;   // 返回

    @property(cc.Label)
    private gameCountLabel: cc.Label = null;
    @property(cc.Label)
    private rateofWinLabel: cc.Label = null;
    @property(cc.Label)
    private rateofWinOneWeekLabel: cc.Label = null;
    @property(cc.Label)
    private successiveWinLabel: cc.Label = null;
    @property(cc.Label)
    private matchOnceLabel: cc.Label = null;
    @property(cc.Label)
    private saveOnceLabel: cc.Label = null;
    @property(cc.Label)
    private pveTotal: cc.Label = null;
    @property(cc.Label)
    private pveWin: cc.Label = null;


    @property(cc.Sprite)
    private pveAchievement: cc.Sprite = null;
    @property(cc.Sprite)
    private pvpAchievement: cc.Sprite = null;

    public onLoad() {
        // 玩家星数
        var self = this;
        const nStarNum: number = Home.DataPlayer.FortuneStar;
        const honerId: number = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, (err, spriteFrame) => {
            self.spHoner.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });
        const showStarNum = Misc.calcShowStarCount(nStarNum);
        for (let i = 1; i <= showStarNum; i++) {
            this.pStartNode.getChildByName("" + i).active = true;
        }

        // // 头像
        // Misc.showHeadImg(this.pHeadNode, Modules.Home.DataPlayer.MyId, Modules.Home.DataPlayer.MyHeadUrl);

        cc.loader.loadRes("prefab/play/PlayPlaymateHead", cc.Prefab, (err, prefab) => {
            var nodItem = cc.instantiate(prefab)
            nodItem.parent = this.headFrame;
            nodItem.setPosition(0, 0)
            const playmateHead: PlayPlaymateHead = nodItem.getComponent("PlayPlaymateHead");
            playmateHead.setPlaymate(Home.DataPlayer.MyHeadUrl);
            playmateHead.setColorFrame(PlaySide.RED);
            playmateHead.setScale(1.2);
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        })


        // 玩家名字
        this.labName.string = Play.DataPlay.MyName;
        if (Home.DataPlayer.MySex == 1) {
            this.sprMale.active = true;
            this.sprFemale.active = false;
        } else {
            this.sprMale.active = false;
            this.sprFemale.active = true;
        }

        // 单周对局胜率
        if (Home.DataPlayer.PlayWeeklyTotal === 0) {
            this.rateofWinOneWeekLabel.string = "0";
        } else {
            const winPercent = Home.DataPlayer.PlayWeeklyWin / Home.DataPlayer.PlayWeeklyTotal;
            this.rateofWinOneWeekLabel.string = Misc.formatPercent(winPercent);
        }

        if (Home.DataPlayer.PlayCntTotal === 0) {
            this.rateofWinLabel.string = "0";
        } else {
            const winPercent = Home.DataPlayer.PlayCntWin / Home.DataPlayer.PlayCntTotal;
            this.rateofWinLabel.string = Misc.formatPercent(winPercent);
        }

        // pve成功率
        if (Home.DataPlayer.PlayPveTotal === 0) {
            this.pveWin.string = "0";
        } else {
            const winPercent = Home.DataPlayer.PlayPveWin / Home.DataPlayer.PlayPveTotal;
            this.pveWin.string = Misc.formatPercent(winPercent);
        }

        this.matchOnceLabel.string = `${Home.DataPlayer.PlayMatchOnce}`;
        this.saveOnceLabel.string = `${Home.DataPlayer.PlaySaveOnce}`;
        this.pveTotal.string = `${Home.DataPlayer.PlayPveTotal}`;
        this.gameCountLabel.string = `${Home.DataPlayer.PlayCntTotal}`;
        this.successiveWinLabel.string = `${Home.DataPlayer.MaxSuccessiveWin}`;
    }
    
    public start() {
    }

    // 分享按钮
    public shareBtn(): void {
        GamePersist.INSTANCE.btnAudio_1();
        const param = SocialManager.INSTANCE.makeFlauntParam();
        window['Partner'].doFlaunt(param, function (time) {

        });
    }

    // 返回按钮
    public closeBtn(): void {
        GamePersist.INSTANCE.btnAudio_2();
        GamePersist.INSTANCE.panelFadeOut(this.node, () => {
            this.node.active = false;
            this.node.destroy();
            this.showHomeAd();
        });

    }

    showHomeAd() {
        if (window['Partner'].supportAd()) {
            window['Partner'].showHomeAd();
        }
    }
    // 显示pve模式的成就
    public showPve(): void {
        GamePersist.INSTANCE.btnAudio_1();
        this.pvpAchievement.node.active = false;
        this.pveAchievement.node.active = true;
    }

    // 显示pvp模式的成就
    public showPvp(): void {
        GamePersist.INSTANCE.btnAudio_1();
        this.pveAchievement.node.active = false;
        this.pvpAchievement.node.active = true;
    }

}
