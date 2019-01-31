import { Home, Play } from "../module/Modules";
import GamePersist from "../common/persist/GamePersist";
import * as Misc from "../common/Misc";
import { Event_type } from "../component/game/PlayDefine";
import { UIFunc } from "../common/UIFunc";
import HomeManager from "../component/page/home/HomeManager";
import { DYNotify } from "../../dyGame/DYNotify";

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIMatch extends cc.Component {
    @property(cc.Label)
    labTime: cc.Label = null;
    @property(cc.Node)
    nod_Head: cc.Node = null;

    @property(cc.Node)
    btnBack: cc.Node = null;

    @property(cc.Node)
    nodDots: cc.Node = null;

    @property(cc.Node)
    nodMyHead: cc.Node = null;
    @property(cc.Sprite)
    sprMyHonor: cc.Sprite = null;
    @property(cc.Label)
    labMyName: cc.Label = null;
    @property(cc.Sprite)
    sprMySex: cc.Sprite = null;

    @property(cc.Node)
    nodOpponentHead: cc.Node = null;
    @property(cc.Sprite)
    sprOpponentHonor: cc.Sprite = null;
    @property(cc.Label)
    labOpponentName: cc.Label = null;
    @property(cc.Sprite)
    sprOpponentSex: cc.Sprite = null;

    @property(cc.Node)
    nodSprSearching: cc.Node = null;

    @property(cc.Node)
    nodSearching: cc.Node = null;
    @property(cc.Node)
    nodSearched: cc.Node = null;

    @property(cc.SpriteFrame)
    private spfMale = null;
    @property(cc.SpriteFrame)
    private spfFemale = null;

    passedTime = 0;
    hadLoadScene = false;

    onEnable() {
        this.passedTime = 0;
        this.labTime.string = `${this.passedTime}`
        this.setMyInfo();
        this.checkTime();
        // NodePool.initPool();
        DYNotify.regObserver(Event_type.GAMESTART, this.onNotify, this);
        // cc.director.preloadScene('game',()=>{
        //     this.hadLoadScene = true;
        // });
        this.doitAction();
        this.btnBack.active = true;
    }

    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Event_type.GAMESTART) {
            self.loadGameScene();
        }
    }

    loadGameScene() {
        cc.audioEngine.stopAll();
        cc.log('loadGameScene');

        this.btnBack.active = false;
        cc.director.preloadScene('game', () => {
            setTimeout(() => {
                cc.director.loadScene('game');
                UIFunc.closeUI('UIMatch', () => { });
                UIFunc.closeUI('UIChoosePvp', () => { });
            }, 50);
        });
    }

    checkTime() {
        this.schedule(this.schCB, 1);
    }

    schCB() {
        this.passedTime++;
        this.labTime.string = `${this.passedTime}`
    }

    onDisable() {
        DYNotify.removeAllObservers(this);
        this.unschedule(this.schCB);
    }

    setOpponentInfo() {
        var self = this;
        this.nodSearching.active = false;
        this.nodSprSearching.active = false;

        this.sprOpponentSex.node.parent.active = true;
        this.nodSearched.active = true;

        this.setHead(this.nodOpponentHead, Home.DataRoom.opponentPlaymate.headImg);

        const nStarNum: number = Home.DataRoom.opponentPlaymate.star;
        const honerId: number = Misc.calcHonorId(nStarNum);

        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprOpponentHonor.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });

        this.labOpponentName.string = Home.DataRoom.opponentPlaymate.name;
        if (Home.DataRoom.opponentPlaymate.sex == 1) {
            this.sprOpponentSex.spriteFrame = this.spfMale;
        } else {
            this.sprOpponentSex.spriteFrame = this.spfFemale;
        }
    }

    setMyInfo() {
        var self = this;
        this.nodSearching.active = true;
        this.nodSprSearching.active = true;

        this.sprOpponentSex.node.parent.active = false;
        this.nodSearched.active = false;

        this.setHead(this.nodMyHead, Home.DataPlayer.MyHeadUrl);

        const nStarNum: number = Home.DataPlayer.FortuneStar;

        const honerId: number = Misc.calcHonorId(nStarNum);
        cc.loader.loadRes('res/rank/rank-' + honerId, cc.SpriteFrame, function (err, spriteFrame) {
            self.sprMyHonor.spriteFrame = spriteFrame;
            // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
        });

        this.labMyName.string = Play.DataPlay.MyName;
        if (Home.DataPlayer.MySex == 1) {
            this.sprMySex.spriteFrame = this.spfMale;
        } else {
            this.sprMySex.spriteFrame = this.spfFemale;
        }

    }

    private async setHead(node, headUrl) {
        cc.loader.loadRes("prefab/component/PlaymateHead", cc.Prefab, (err, prefab) => {
            var nodItem = cc.instantiate(prefab)
            nodItem.parent = node;

            nodItem.setPosition(0, 0)
            nodItem.getComponent('PlaymateHead').setSize(this.nodMyHead.getContentSize());
            nodItem.getComponent('PlaymateHead').HeadUrl = headUrl;
            // cc.loader.setAutoReleaseRecursively(prefab, true)
        })
    }

    async doitAction() {
        this.nodDots.children[0].y = 0;
        this.nodDots.children[1].y = 0;
        this.nodDots.children[2].y = 0;
        this.nodDots.children[3].y = 0;
        this.nodDots.children[4].y = 0;
        this.nodDots.children[5].y = 0;
        while (Home.DataPlayer.IsMatching) {
            await this.runAction(this.nodDots.children[0], false);
            await this.runAction(this.nodDots.children[1], false);
            await this.runAction(this.nodDots.children[2], false);
            await this.runAction(this.nodDots.children[3], false);
            await this.runAction(this.nodDots.children[4], false);
            await this.runAction(this.nodDots.children[5], true);
        }

    }

    private async runAction(node, delay) {
        var self = this;
        return new Promise((resolve, reject) => {
            var action = cc.sequence(
                cc.moveBy(0.05, 0, 10),
                cc.callFunc(() => {
                    if (!delay) {
                        resolve();
                    }
                }),
                cc.moveBy(0.1, 0, -10),
                cc.callFunc(() => {
                    if (delay) {
                        self.scheduleOnce(() => {
                            resolve();
                        }, 0.5)
                    }
                }),
            )
            node.runAction(action);
        })
    }

    public doCancelMatch() {
        // 如果当前没有在匹配状态 直接返回
        GamePersist.INSTANCE.btnAudio_2();
        UIFunc.closeUI('UIMatch', () => { });

        this.unscheduleAllCallbacks();

        Home.DataPlayer.IsMatching = false;
        HomeManager.INSTANCE.makeInvisibleRequest();
    }

    // update (dt) {}
}
