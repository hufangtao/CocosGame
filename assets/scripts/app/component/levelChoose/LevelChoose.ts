import * as Modules from "../../module/Modules";
import BaseUI from "../BaseUI";
import PlayManager from "../game/PlayManager";
import DYAudio from "../../../dyGame/DYAudio";
import GamePersist from "../../common/persist/GamePersist";
import { OpenHomeFrom } from "../../common/Defines";
import { UIFunc } from "../../common/UIFunc";
import { Message } from "../../common/Message";
import { DYNotify } from "../../../dyGame/DYNotify";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelChoose extends BaseUI {
    @property(cc.Node)
    contentBg: cc.Node = null;

    @property(cc.Label)
    energyCount: cc.Label = null;
    @property(cc.Label)
    energyTimer: cc.Label = null;

    @property(cc.Prefab)
    pfbBlock: cc.Prefab = null;
    @property(cc.Prefab)
    pfbBomb: cc.Prefab = null;
    @property(cc.Prefab)
    pfbObstacle: cc.Prefab = null;
    @property(cc.Prefab)
    pfbWall: cc.Prefab = null;
    @property(cc.Prefab)
    pfbTableware: cc.Prefab = null;

    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;


    @property({ type: cc.AudioClip })
    public audHomeBg: cc.AudioClip = null;

    time = 0;
    maxPage = 0;

    async onLoad() {
        super.onLoad();
        DYNotify.regObserver(Message.GET_SHARE_CNT, this.onNotify, this);

        PlayManager.INSTANCE.LevelChooseUI = this;

        this.scrollView.node.on('scrolling', this.onScrolling, this);

        if (!DYAudio.hasMusicPlaying()) {
            DYAudio.playMusic(this.audHomeBg, true);
        }

        this.setZIndex();
        this.contentBg.children[4].zIndex = 6;
        this.scrollView.content.y = - cc.view.getVisibleSize().height / 2 - 200;
        this.maxPage = 1;
    }

    setZIndex() {
        for (let i = 0; i < 4; ++i) {
            this.contentBg.children[i].zIndex = i + 1;
        }
    }

    onDestroy() {
        DYNotify.removeAllObservers(this);
    }
    private onNotify(target, tag, param) {
        var self = target;
        if (tag == Message.GET_SHARE_CNT) {
            if(param.reason != 1){
                return;
            }
            if (param.success === 1) {
                self.showEnergyEmpty(2);
            }
        }
    }

    public uiName(): string {
        return "LevelChoose";
    }

    start() {
        super.start();
    }

    pageY = 0;
    currPage = 0;
    startY = 1024;
    length1 = 1024;
    length2 = 976;
    onScrolling(event) {
        let currY = this.scrollView.content.y;
        let baseY = cc.view.getVisibleSize().height / 2;
        this.pageY = currY + this.startY + baseY + this.length1 * Math.ceil(this.currPage / 2) + this.length2 * Math.floor(this.currPage / 2);

        if (this.pageY <= 0) {
            if (this.currPage >= this.maxPage) {
                return;
            }
            this.currPage++;
            if (this.currPage > 2) {
                this.scrollView.content.height += this.currPage % 2 == 0 ? this.length2 : this.length1;
                this.contentBg.children[3].zIndex = 0;
                this.contentBg.children[3].y += (this.length1 + this.length2) * 2;
                this.contentBg.children.sort((a, b) => {
                    return a.zIndex - b.zIndex;
                })
                this.setZIndex();
            }
            // console.log(this.currPage);
        } else if (this.pageY >= (this.currPage % 2 == 0 ? this.length2 : this.length1)) {
            this.currPage--;
            if (this.currPage > 1) {
                this.scrollView.content.height -= this.currPage % 2 == 0 ? this.length2 : this.length1;
                this.contentBg.children[0].zIndex = 5;
                this.contentBg.children[0].y -= (this.length1 + this.length2) * 2;
                this.contentBg.children.sort((a, b) => {
                    return a.zIndex - b.zIndex;
                })
                this.setZIndex();
            }
            // console.log(this.currPage);
        }
    }

    private chooseLevel(level) {
        Modules.Play.DataPve.curLevel = level;
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UILevelInfo',(node)=>{
            node.getComponent('UILevelInfo').initLevelInfo(this);
            // GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'),()=>{
            // });
            GamePersist.INSTANCE.CancelWaiting();
        })
    }
    
    showEnergyEmpty(mode) {
        GamePersist.INSTANCE.ForceWaiting();
        UIFunc.openUI('UIEnergy',(node)=>{
            node.getComponent('UIEnergy').setMode(mode);
            GamePersist.INSTANCE.panelPopUp(node.getChildByName('nodContent'));
            GamePersist.INSTANCE.CancelWaiting();
        })
    }

    enterPveGame() {
        GamePersist.INSTANCE.loadScene("pve_game", () => {
            DYAudio.stopMusic();
        });
    }

    public update(dt) {
        var date = new Date();
        var NowSec = parseInt(String(date.getTime() / 1000)) - Modules.Home.TimeOffset;
        var EnergyFullTime = parseInt(Modules.Home.DataPlayer.EnergyFullTime);
        var time = EnergyFullTime - NowSec;
        var Energy = Modules.Home.DataPlayer.FortuneEnergy;
        this.energyCount.string = Energy + "";
        if (EnergyFullTime == 0) {
            this.energyTimer.string = "已满";
            return;
        }
        var nextEnergy = time % 300;

        var min = parseInt(nextEnergy / 60 + "") + "";
        min = min.length > 1 ? min : "0" + min;
        var sec = parseInt(nextEnergy % 60 + "") + "";
        sec = sec.length > 1 ? sec : "0" + sec;

        this.energyTimer.string = min + ":" + sec;
    }

    getEnergy() {
        GamePersist.INSTANCE.btnAudio_1();
        if (Modules.Home.DataPlayer.FortuneEnergy >= 30) {
            GamePersist.INSTANCE.toast('体力已经满啦');
        } else {
            this.showEnergyEmpty(3);
        }
    }
    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnBack':
                GamePersist.INSTANCE.btnAudio_2();
                this.goToHome();
                break;
            case 'btnGetEnergy':
                GamePersist.INSTANCE.btnAudio_1();
                this.getEnergy();
                break;
        }
    }

    public levelChoose(index) {
        this.chooseLevel(index);
    }

    goToHome() {
        GamePersist.INSTANCE.loadScene('home', () => {
            Modules.Home.OpenHomeFrom = OpenHomeFrom.UI_PLAY;
        })
    }
}
