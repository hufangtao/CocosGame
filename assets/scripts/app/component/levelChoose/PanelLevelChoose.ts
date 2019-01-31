import { Home } from "../../module/Modules";
import PlaymateHead from "../prefab/PlaymateHead";
import GamePersist from "../../common/persist/GamePersist";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PanelLevelChoose extends cc.Component {
    @property(cc.Node)
    nodHead: cc.Node = null;

    @property(cc.Prefab)
    pHeadPerfab: cc.Prefab = null;

    @property(cc.Node)
    nodBtnLevel: cc.Node = null;

    @property(cc.SpriteFrame)
    spfBtnNormal: cc.SpriteFrame = null;
    @property(cc.SpriteFrame)
    spfBtnLocked: cc.SpriteFrame = null;

    LevelChoose = null

    onLoad() {
        
    }

    start() {
        this.setBtnStat();
        this.LevelChoose = this.node.parent.getComponent('LevelChoose');
    }

    setBtnStat() {
        for (let i = 0; i < this.nodBtnLevel.children.length; ++i) {
            if (this.nodBtnLevel.children[i]) {
                this.nodBtnLevel.children[i].on('click', this.levelChoose, this)
                this.nodBtnLevel.children[i].name = 'BtnLevel_' + i;
                this.nodBtnLevel.children[i].getComponent('BtnLevel').setLevel(i + 1);
                this.nodBtnLevel.children[i].getChildByName('labLevel').active = true;
            }
        }

        // console.log(Home.DataPlayer.PveStatArray);
        for (let i = 0; i < Home.DataPlayer.Level; ++i) {
            if (this.nodBtnLevel.children[i]) {
                this.nodBtnLevel.children[i].getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = this.spfBtnNormal;
                if(!Home.DataPlayer.PveStatArray[i]){
                    continue;
                }
                this.nodBtnLevel.children[i].getComponent('BtnLevel').setStar(Home.DataPlayer.PveStatArray[i]);
            }
        }

        let node = this.nodBtnLevel.children[Home.DataPlayer.Level];
        if(node){
            node.getComponent('BtnLevel').setCurLevel();
        }else{
            node = this.nodBtnLevel.children[Home.DataPlayer.Level - 1];
            node.getComponent('BtnLevel').setCurLevel(true);
        }

        for (let i = Home.DataPlayer.Level + 1; i < this.nodBtnLevel.children.length; ++i) {
            if (this.nodBtnLevel.children[i]) {
                this.nodBtnLevel.children[i].getComponent('BtnLevel').setInteractable(false);
                this.nodBtnLevel.children[i].getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = this.spfBtnLocked;
            }
        }
        this.setHead();
    }

    setHead(){
        let index = Home.DataPlayer.Level;
        if(Home.DataPlayer.Level == this.nodBtnLevel.children.length){
            index = Home.DataPlayer.Level - 1;
        }
        var nodButton = this.nodBtnLevel.children[index];
        let ps_w = this.nodBtnLevel.convertToWorldSpaceAR(nodButton.getPosition());
        this.nodHead.setPosition(this.nodHead.parent.convertToNodeSpaceAR(ps_w));

        const pHeadNode = cc.instantiate(this.pHeadPerfab);
        pHeadNode.parent = this.nodHead.getChildByName('head');
        pHeadNode.setPosition(0, 0);
        const playmateHead: PlaymateHead = pHeadNode.getComponent("PlaymateHead");
        playmateHead.HeadUrl = Home.DataPlayer.MyHeadUrl;
        playmateHead.setSize(110,110);
    }

    levelChoose(event: cc.Event.EventTouch) {
        GamePersist.INSTANCE.btnAudio_1();
        var target = event.target;
        let level = target.name.substring(9);
        this.LevelChoose.levelChoose(Number(level) + 1);
    }

    public btnListener(event: cc.Event.EventTouch) {
        var target = event.target;
        switch (target.name) {
            case 'btnPanelBack':
                GamePersist.INSTANCE.btnAudio_2();
                break;
            case 'btnStartPve':
                GamePersist.INSTANCE.btnAudio_1();
                break;
        }
    }


    // update (dt) {}
}
