import PlayUI from "../component/game/pvp/PlayUI";
import { Message } from "../common/Message";
import SocialManager from "../common/social/SocialManager";
import GamePersist from "../common/persist/GamePersist";
import { PlayerWatchAdC2S, PlayerShareGameC2S, PlayerDoubleC2S } from "../common/net/proto/mods/ProtoSectionPlayer";
import NetUtil from "../common/net/NetUtil";
import { PGoods } from "../common/net/proto/ProtoType";
import { Home, Play } from "../module/Modules";
import { RankPlayStarC2S } from "../common/net/proto/mods/ProtoSectionRank";
import { PlayContinueC2S } from "../common/net/proto/mods/ProtoSectionPlay";
import { OpenHomeFrom, ValueKey } from "../common/Defines";
import PlayManager from "../component/game/PlayManager";
import { RoomPlayFinishS2C } from "../common/net/proto/mods/ProtoSectionRoom";
import * as Misc from "../common/Misc";
import { DYNotify } from "../../dyGame/DYNotify";
import { UIFunc } from "../common/UIFunc";
import { ShareManager } from "../common/ShareManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIScorePvp extends cc.Component {
    @property(cc.Node)
    nodHead: cc.Node = null;
    @property(cc.Node)
    nodWinSprite: cc.Node = null;
    @property(cc.Node)
    nodLoseSprite: cc.Node = null;
    @property(cc.Node)
    nodDrawSprite: cc.Node = null;
    @property(cc.Node)
    nodWinBgSprite: cc.Node = null;
    @property(cc.Node)
    nodLoseBgSprite: cc.Node = null;
    @property(cc.Node)
    nodShineSprite: cc.Node = null;
    @property(cc.Node)
    nodStars: cc.Node = null;
    @property(cc.Label)
    labSaveAnimalCoint: cc.Label = null;
    @property(cc.Label)
    labWinCount: cc.Label = null;
    @property(cc.Label)
    labDailyCount: cc.Label = null;
    @property(cc.Label)
    labRateDailyWin: cc.Label = null;
    @property(cc.Label)
    labRateWeekWin: cc.Label = null;
    @property(cc.Sprite)
    sprGrade: cc.Sprite = null;
    @property(cc.Button)
    btnContinue: cc.Button = null;
    @property(cc.Node)
    bgParticle: cc.Node = null;
    @property(cc.Node)
    nodNewGrade: cc.Node = null;
    @property(cc.Button)
    btnAd: cc.Button = null;
    @property(cc.Label)
    labCoin: cc.Label = null;
    @property(cc.Label)
    labLoseOrWin: cc.Label = null;

    @property(cc.Label)
    labCoinInPanel: cc.Label = null;

    @property(cc.Node)
    nodDoubleCoin: cc.Node = null;

    @property(cc.Sprite)
    gameContinueType: cc.Sprite = null;
    @property(cc.SpriteFrame)
    againSF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    continueSF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    opInviteSF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    opLeaveSF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    waitagreeSF: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    noagainGreySF: cc.SpriteFrame = null;

    PlayUI: PlayUI = null;

    coinNum: number;// 获取的金币数量
    subContextView
    // 电视晃动
    tvAction(win) {
        let btnAd = this.btnAd.node;
        btnAd.on('click', this.showAdGetProp, this);
        let nodTv = btnAd.getChildByName('icon-tv');
        nodTv.getComponent(cc.Animation).play('tvShake');
    }

    showAdGetProp() {
        if (window['Partner'].supportAd()) {
            window['Partner'].showVideoAd(() => {
                ShareManager.Instance.notifyWatchAdGetProp();
            }, () => {
                ShareManager.Instance.share(3);
            });
        } else {
            GamePersist.INSTANCE.toast('不支持广告');
            ShareManager.Instance.notifyWatchAdGetProp();
        }
    }

    public init(playUI) {
        this.PlayUI = playUI;
    }
    onEnable() {
        DYNotify.regObserver(Message.UIRankUpdate, this.onNotify, this);
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_PRIZE, this.onNotify, this);
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);
        DYNotify.regObserver(Message.EVENT_MODULE_PLAYER_FORTUNE, this.onNotify, this);
        this.btnContinue.interactable = true;
        this.nodNewGrade.active = false;
        this.requestRankData();
        this.nodDoubleCoin.active = false;
        this.canLoadUIGetProp = true;

        this.coinNum = 0;
        this.nodDoubleCoin.getChildByName('content').active = false;
        window['Partner'].postMsg(3, { valuekey: ValueKey.gameRate });

        this.subContextView = this.node.getChildByName('sprBeyond').getComponent(cc.WXSubContextView);
        if(window['wx']){
            this.subContextView.enabled = false;
        }
    }

    time = 0;
    update(dt){
        if(!window['wx']){
            return
        }
        this.time += dt;
        if(this.time >= 2 && this.subContextView){
            this.time = 0;
            this.subContextView.update();
        }
    }

    onDisable() {
        DYNotify.removeAllObservers(this);
    }
    canLoadUIGetProp
    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.UIRankUpdate) {
            if (Play.DataPvp.isGradeUp()) {
                self.rankUp();
            }
        } else if (tag === Message.EVENT_MODULE_PLAYER_PRIZE) {
            if (!this.canLoadUIGetProp) {
                return;
            }
            this.canLoadUIGetProp = false;
            UIFunc.openUI('UIGetProp', (node) => {
                this.canLoadUIGetProp = true;
                node.getComponent('UIGetProp').scorePvpAchieveProp();
            })
        } else if (tag == Message.GET_SHARE_CNT) {
            if (param.reason != 3) {
                return;
            }
            if (param.success == 1) {
                self.watchAd();
            } else if (param.success === 2) {
                GamePersist.INSTANCE.toast('今日分享已达上限');
            }
        } else if (tag === Message.EVENT_MODULE_PLAYER_FORTUNE) {
            self.showGetCoin();
        }
    }


    // 更新排行
    public requestRankData() {
        GamePersist.INSTANCE.ForceWaiting();
        const rankDataReq = new RankPlayStarC2S();
        rankDataReq.posStart = 1;
        rankDataReq.posEnd = 50;
        NetUtil.SendMsg(rankDataReq);
    }


    public continue() {
        GamePersist.INSTANCE.btnAudio_1();
        if (Home.DataRoom.opponentPlaymate.id == 1) {
            Home.OpenHomeFrom = OpenHomeFrom.UI_AIFIN;
            PlayManager.INSTANCE.onBack();
        } else {
            let playContinue = new PlayContinueC2S();
            NetUtil.SendMsg(playContinue);
        }
        UIFunc.closeUI('UIScorePvp',()=>{})
    }

    public giveUp() {
        GamePersist.INSTANCE.btnAudio_1();
        PlayManager.INSTANCE.onBack();
        UIFunc.closeUI('UIScorePvp',()=>{})
    }

    private showStar(num) {
        for (let i = 0; i < this.nodStars.children.length; ++i) {
            if (i <= num - 1) {
                this.nodStars.children[i].opacity = 0;
                this.nodStars.children[i].scale = 2;
                let action = cc.sequence(
                    cc.delayTime(0.2 * i),
                    cc.callFunc(function (target) {
                        target.opacity = 255;
                    }, this),
                    cc.scaleTo(0.1, 0.9, 0.9),
                    cc.scaleTo(0.05, 1, 1)
                );
                this.nodStars.children[i].active = true;
                this.nodStars.children[i].runAction(action);
            } else {
                this.nodStars.children[i].active = false;
            }
        }

        this.gradeUp();
    }

    // 段位升级
    gradeUp() {
        if (Play.DataPvp.isGradeUp()) {
            // 播放段位升级动画
            let myStar = Home.DataPlayer.FortuneStar;
            let sysHonorId = Misc.calcHonorId(myStar);
            cc.loader.loadRes('res/rank/rank-' + sysHonorId, cc.SpriteFrame, (err, spriteFrame) => {
                this.nodNewGrade.getChildByName('mask').getChildByName('sprGrade').getComponent(cc.Sprite).spriteFrame = spriteFrame;
                // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
            });
            this.nodNewGrade.active = true;
            this.nodNewGrade.parent.getComponent(cc.Animation).play('gradeUp');
            this.scheduleOnce(() => {
                this.rankUp();
            }, 3);
        } else {

        }
    }

    // 排行升级
    rankUp() {
        if (Play.DataPvp.isRankUp()) {
            // console.log('rankUp');
            cc.loader.loadRes('prefab/play/RankUp', cc.Prefab, (err, prefab) => {
                let node = cc.instantiate(prefab);
                node.parent = this.node;
                let rankUp = node.getComponent('RankUp');
                rankUp.showAction(true);
                // cc.loader.setAutoReleaseRecursively(prefab, true)
            });
        }
    }

    public setContinueBtn(type) {
        switch (type) {
            case 0:
                // 失败
                this.gameContinueType.spriteFrame = this.againSF;
                break;
            case 1:
                // 胜利
                this.gameContinueType.spriteFrame = this.continueSF;
                break;
            case 2:
                // 对手请求
                this.gameContinueType.spriteFrame = this.opInviteSF;
                break;
            case 3:
                // 对手离开
                this.gameContinueType.spriteFrame = this.opLeaveSF;
                this.btnContinue.interactable = false;
                break;
            case 4:
                // 等待同意
                this.gameContinueType.spriteFrame = this.waitagreeSF;
                break;
            case 5:
                // 失败ai
                this.gameContinueType.spriteFrame = this.noagainGreySF;
                break;
        }

        // AI对战结束，显示继续匹配
        if (Home.DataRoom.opponentPlaymate.id == 1) {
            this.btnContinue.interactable = false;
            this.gameContinueType.spriteFrame = this.opLeaveSF;
        }
    }

    // 显示双倍金币弹窗
    showDoubleCoin() {
        this.nodDoubleCoin.active = true;
        this.labCoinInPanel.string = this.coinNum + '';
        this.scheduleOnce(() => {
            this.nodDoubleCoin.getChildByName('content').active = true;
        }, 1)
    }

    public playFinish(playResult: RoomPlayFinishS2C, nodHead) {
        this.coinNum = playResult.score;
        this.showGameData(playResult, nodHead)

        this.showResultUI(playResult.winSide);
        this.headAction();
    }

    // 显示游戏数据
    showGameData(playResult: RoomPlayFinishS2C, nodHead) {
        var self = this;
        cc.log(playResult.score);
        this.labCoin.string = playResult.score + '';
        let node = cc.instantiate(nodHead);
        node.parent = this.nodHead.getChildByName('head');
        node.setPosition(0, 0);
        node.getComponent('PlaymateHead').setSize(200, 200);

        let myStar = Home.DataPlayer.FortuneStar;
        let sysHonorId;
        let showStarNum;
        if (Play.DataPvp.isGradeUp()) {
            sysHonorId = Misc.calcHonorId(myStar - 1);
            showStarNum = Misc.calcShowStarCount(myStar);
        } else {
            sysHonorId = Misc.calcHonorId(myStar);
            showStarNum = Misc.calcShowStarCount(myStar);
        }
        cc.loader.loadRes('res/rank/rank-' + sysHonorId, cc.SpriteFrame, (err, spriteFrame) => {
            self.sprGrade.spriteFrame = spriteFrame;
        });
        this.showStar(showStarNum);

        this.labSaveAnimalCoint.string = playResult.saveAnimalCount + '';
        this.labWinCount.string = playResult.winCount + '';// 连胜
        this.labDailyCount.string = playResult.activeBuffCount + '';

        var daliyRate = playResult.dailyWin * 100 / playResult.dailyCnt;
        if (!daliyRate) {
            daliyRate = 0;
        }

        var WeekRate = playResult.weeklyWin * 100 / playResult.weeklyCnt
        if (!WeekRate) {
            WeekRate = 0;
        }

        this.labRateDailyWin.string = Math.floor(daliyRate) + '%';
        this.labRateWeekWin.string = Math.floor(WeekRate) + '%';
    }

    // 显示游戏结果的ui
    showResultUI(winSide) {
        //背景光环转动效果
        let shine_action = cc.repeatForever(cc.rotateBy(4, 360));

        //胜利、失败、平局 显示的动态效果
        let action = cc.sequence(
            cc.callFunc(function (target) {
                target.scale = 2;
            }, this),
            cc.scaleTo(0.1, 0.9, 0.9),
            cc.scaleTo(0.01, 1, 1)
        );

        if (winSide == 0) {
            // 平局
            this.PlayUI.Audio.victory();
            this.tvAction(false);
            this.nodShineSprite.active = false;
            this.bgParticle.active = false;

            this.nodWinBgSprite.active = true;
            this.nodLoseBgSprite.active = false;

            this.nodWinSprite.active = false;
            this.nodLoseSprite.active = false;
            this.nodDrawSprite.active = true;
            this.nodDrawSprite.runAction(action);
            this.labCoin.node.active = false;
            this.labLoseOrWin.string = '平局未能获得金币';
            this.setContinueBtn(1);
        } else if (winSide == Play.DataPlay.MySide) {
            // 胜利
            this.PlayUI.Audio.victory();
            this.tvAction(true);
            this.nodShineSprite.active = true;
            this.nodShineSprite.runAction(shine_action);
            this.bgParticle.active = true;
            this.bgParticle.opacity = 255;

            this.nodWinBgSprite.active = true;
            this.nodLoseBgSprite.active = false;

            this.nodWinSprite.active = true;
            this.nodLoseSprite.active = false;
            this.nodDrawSprite.active = false;
            this.nodWinSprite.runAction(action);
            this.labCoin.node.active = true;;
            this.labLoseOrWin.string = '您赢得金币:';

            this.setContinueBtn(1);
            this.showDoubleCoin();
        } else {
            // 失败
            this.PlayUI.Audio.lose();
            this.tvAction(false);
            this.nodShineSprite.active = false;
            this.bgParticle.active = false;

            this.nodWinBgSprite.active = false;
            this.nodLoseBgSprite.active = true;

            this.nodWinSprite.active = false;
            this.nodLoseSprite.active = true;
            this.nodDrawSprite.active = false;
            this.nodLoseSprite.runAction(action);
            this.labCoin.node.active = true;;
            this.labLoseOrWin.string = '您输掉金币:';
            this.setContinueBtn(0);
        }
    }

    // 头像突出的动态效果
    headAction() {
        let head_frame = this.nodHead;
        let head_action = cc.sequence(cc.callFunc(function (target) {
            target.y = (target.y - 200)
        }, this),
            cc.moveBy(0.2, cc.v2(0, 220)),
            cc.moveBy(0.01, cc.v2(0, -20)));
        head_frame.runAction(head_action);
    }

    // 收取双倍金币
    doubleCoin() {
        GamePersist.INSTANCE.blockInput();
        this.showAdDoubleCoin();
    }

    // 显示获得金币效果
    showGetCoin() {
        if (!this.canLoadUIGetProp) {
            return;
        }
        this.canLoadUIGetProp = false;
        UIFunc.openUI('UIGetProp', (node) => {
            node.getComponent('UIGetProp').achieveCoin(this.coinNum, () => {
                this.canLoadUIGetProp = true;

                this.nodDoubleCoin.active = false;
                this.labCoin.string = this.coinNum * 2 + '';
                UIFunc.closeUI('UIGetProp', () => { })
            });
        })
    }

    showAdDoubleCoin() {
        if (window['Partner'].supportAd()) {
            window['Partner'].showVideoAd(() => {
                ShareManager.Instance.notifyWatchAdDoubleCoin();
                this.showGetCoin();
            }, () => {
                ShareManager.Instance.share(7);
            });
        } else {
            GamePersist.INSTANCE.toast('不支持广告');
            ShareManager.Instance.notifyWatchAdDoubleCoin();
            this.showGetCoin();
        }
    }

    // 跳过双倍收取
    hideDoubleCoin() {
        this.nodDoubleCoin.active = false;
    }
}