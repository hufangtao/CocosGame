import { Home, Play } from "../../../module/Modules";
import { TILE_TYPE, Action_type } from "../PlayDefine";

enum TIPS {
    level1_tip1 = 1,
    level1_tip2,
    level1_tip3,
    level1_tip4,
    level4_tip1,
    level4_tip2,
    level4_tip3,
    level4_tip4,
    level4_tip5,
    level4_tip6,
    level4_tip7,
    level4_tip8,
    level5_tip1,
    level5_tip2,
    level5_tip3,
    level5_tip4,
    level8_tip1,
    level9_tip1,
    level9_tip2,
    level10_tip1,
    level11_tip1,
    level13_tip1,
    level15_tip1,
    level17_tip1,
    level20_tip1,
    level23_tip1,
    level27_tip1,
    level31_tip1,
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class panelGuidePve extends cc.Component {
    @property(cc.Node)
    nodLight: cc.Node = null;
    @property(cc.Node)
    nodMask: cc.Node = null;
    @property(cc.Node)
    nodFrame: cc.Node = null;

    @property(cc.Node)
    nodBoard: cc.Node = null;

    @property(cc.Node)
    nodSprHand: cc.Node = null;

    @property(cc.Button)
    button: cc.Button = null;

    @property(cc.Label)
    labTip: cc.Label = null;
    @property(cc.Node)
    labContinue: cc.Node = null;

    @property(cc.Node)
    panelTile: cc.Node = null;

    @property(cc.Node)
    panelBonus: cc.Node = null;

    touchPosition = null;

    game = null;
    hadTouched = false;
    hadGuide = false;
    hadDone = false;
    nextTip = 0;

    onLoad() {
        this.node.active = false;
    }

    timeTip() {
        this.node.active = true;
        this.button.node.active = true;
        var string = '注意啦，本关是计时关卡，要在规定时间内完成任务，你准备好了嘛'
        
        this.setGuide(string, cc.v2(-200, -314), cc.size(80, 160), false, 3, false);
        this.labContinue.active = false;
        this.button.node.on('click', this.touchEvent, this)
    }

    touchEvent() {
        Play.DataPve.gameBegan = true;
        this.button.node.targetOff(this)
        this.button.node.stopAllActions();
        this.button.node.scale = 1;
        this.button.node.active = false;
        this.node.active = false;
    }

    showGuide() {
        this.node.active = true;
        this.game = this.node.parent.getComponent('LayerGamePve');
        this.hadTouched = false;
        this.hadGuide = false;
        this.hadDone = false;
        this.initGuide();
    }

    startGuide() {
        this.hadDone = false;
    }
    endGuide() {
        this.hadDone = true;
    }

    initGuide() {
        this.nextTip = null;
        switch (Play.DataPve.curLevel) {
            case 1:
                this.nextTip = TIPS.level1_tip1;
                break;
            case 4:
                this.nextTip = TIPS.level4_tip1;
                break;
            case 5:
                this.nextTip = TIPS.level5_tip1;
                break;
            case 8:
                this.nextTip = TIPS.level8_tip1;
                break;
            case 9:
                this.nextTip = TIPS.level9_tip1;
                break;
            case 10:
                this.nextTip = TIPS.level10_tip1;
                break;
            case 11:
                this.nextTip = TIPS.level11_tip1;
                break;
            case 13:
                this.nextTip = TIPS.level13_tip1;
                break;
            case 15:
                this.nextTip = TIPS.level15_tip1;
                break;
            case 17:
                this.nextTip = TIPS.level17_tip1;
                break;
            case 20:
                this.nextTip = TIPS.level20_tip1;
                break;
            case 23:
                this.nextTip = TIPS.level23_tip1;
                break;
            case 27:
                this.nextTip = TIPS.level27_tip1;
                break;
            case 31:
                this.nextTip = TIPS.level31_tip1;
                break;
        }

        if (Home.DataPlayer.Level >= Play.DataPve.curLevel) {
            if (Play.DataPve.levelData.time > 0) {
                this.timeTip();
            } else {
                this.node.active = false;
                Play.DataPve.gameBegan = true;
            }
        }else{
            if(!this.nextTip){
                if (Play.DataPve.levelData.time > 0) {
                    this.timeTip();
                } else {
                    this.node.active = false;
                    Play.DataPve.gameBegan = true;
                }
            }
        }

        this.guide();
    }


    guide() {
        if (Home.DataPlayer.Level >= Play.DataPve.curLevel) {
            return
        }
        if (this.hadDone) {
            return;
        }
        switch (this.nextTip) {
            case TIPS.level1_tip1:
                this.level1_tip1();
                break;
            case TIPS.level1_tip2:
                this.level1_tip2();
                break;
            case TIPS.level1_tip3:
                this.level1_tip3();
                break;
            case TIPS.level4_tip1:
                this.level4_tip1();
                break;
            case TIPS.level4_tip2:
                this.level4_tip2();
                break;
            case TIPS.level4_tip3:
                this.level4_tip3();
                break;
            case TIPS.level4_tip6:
                this.level4_tip6();
                break;
            case TIPS.level4_tip7:
                this.level4_tip7();
                break;
            case TIPS.level5_tip1:
                this.level5_tip1();
                break;
            case TIPS.level5_tip2:
                this.level5_tip2();
                break;
            case TIPS.level5_tip3:
                this.level5_tip3();
                break;
            case TIPS.level8_tip1:
                this.level8_tip1();
                break;
            case TIPS.level9_tip1:
                this.level9_tip1();
                break;
            case TIPS.level10_tip1:
                this.level10_tip1();
                break;
            case TIPS.level11_tip1:
                this.level11_tip1();
                break;
            case TIPS.level13_tip1:
                this.level13_tip1();
                break;
            case TIPS.level15_tip1:
                this.level15_tip1();
                break;
            case TIPS.level17_tip1:
                this.level17_tip1();
                break;
            case TIPS.level20_tip1:
                this.level20_tip1();
                break;
            case TIPS.level23_tip1:
                this.level23_tip1();
                break;
            case TIPS.level27_tip1:
                this.level27_tip1();
                break;
            case TIPS.level31_tip1:
                this.level31_tip1();
                break;
            default:
            // this.node.active = false;
            // Play.DataPve.gameBegan = true;
        }
    }

    async runAction(node, action) {
        return new Promise((resolve, reject) => {
            let tAction = cc.sequence(
                action,
                cc.callFunc(() => {
                    resolve();
                })
            )
            node.runAction(tAction);
        })
    }

    async setGuide(string, ps, size, isShowHand, type, isShowMask = true) {
        var self = this;
        this.node.active = true;
        this.panelBonus.active = true;
        this.hadTouched = true;
        this.nodMask.getComponent(cc.Mask).enabled = isShowMask;
        this.nodFrame.active = isShowMask;
        this.labTip.string = string;
        this.nodBoard.height = this.labTip.node.height + 60;
        let ps1 = cc.v2(38, -100);
        let ps2 = cc.v2(38, 455);
        let ps3 = cc.v2(38, 158);
        if (type == 1) {
            this.nodBoard.setPosition(ps1);
        } else if (type == 2) {
            this.nodBoard.setPosition(ps2);
        } else if (type == 3) {
            this.nodBoard.setPosition(ps3);
        }

        this.node.targetOff(this);
        this.nodLight.setPosition(ps);
        this.nodFrame.scale = 1;
        this.nodLight.scale = 1;
        this.nodMask.setContentSize(size);
        size = cc.size(size.width + 58, size.height + 50);
        // this.nodFrame.setPosition(ps);
        this.nodFrame.setContentSize(size);

        if (isShowHand) {
            this.labContinue.active = false;
            this.nodSprHand.active = true;
            this.nodSprHand.setPosition(ps.add(cc.v2(80, - this.nodMask.height / 2 - 30)));
        } else {
            this.nodSprHand.active = false;
            this.labContinue.active = true;
        }
        this.nodLight.stopActionByTag(Action_type.GuideMask);
        this.nodFrame.stopAllActions();

        if (!isShowMask) {
            this.panelBonus.active = false;
            this.hadTouched = false;
            return
        }
        this.panelBonus.active = false;
        this.hadTouched = false;
    }

    scaleAction() {
        var action = cc.repeatForever(
            cc.sequence(
                cc.scaleTo(1, 1.1, 1.1),
                cc.scaleTo(1, 1, 1)
            )
        )
        this.nodLight.runAction(action);
        action.setTag(Action_type.GuideMask);
    }

    level1_tip1() {
        this.nextTip = TIPS.level1_tip1;
        var string = '2个或以上连在一起的水果点击即可消除哦'
        this.setGuide(string, cc.v2(-40, -154), cc.size(85, 170), true, 2);
        this.node.on('touchstart', this.touchEvent_level1_tip1, this)
    }
    level1_tip2() {
        this.nextTip = TIPS.level1_tip2;
        var string = '消除完这些水果才能通关哦'
        this.setGuide(string, cc.v2(-100, 414), cc.size(200, 120), false, 1);
        this.node.on('touchstart', this.touchEvent_level1_tip2, this)
    }
    level1_tip3() {
        this.nextTip = TIPS.level1_tip3;
        var string = '注意这里还有步数的限制哦'
        var ps = this.node.getChildByName('boardPos').position;
        this.setGuide(string, ps, cc.size(280, 110), false, 1);
        this.node.on('touchstart', this.touchEvent_level1_tip3, this)
    }
    level1_tip4(level) {
        if (1 != Play.DataPve.curLevel) {
            return
        }
        if (Home.DataPlayer.Level >= Play.DataPve.curLevel) {
            return
        }
        if (this.hadGuide) {
            return
        }
        this.nextTip = TIPS.level1_tip4;
        this.hadGuide = true;
        var string = '你已经完成一个水果的消除了，还有的继续加油哦'
        var ps = [
            cc.v2(-156, 418),
            cc.v2(-46, 418),
            cc.v2(64, 418),
            cc.v2(174, 418),
            cc.v2(284, 418),
        ];
        this.setGuide(string, ps[level], cc.size(110, 110), false, 1);
        this.node.on('touchstart', this.touchEvent_level1_tip4, this)
    }

    level4_tip1() {
        this.nextTip = TIPS.level4_tip1;
        var string = '试试5个连续的水果消除有什么效果'
        this.setGuide(string, cc.v2(200, -114), cc.size(80, 400), true, 2);
        this.node.on('touchstart', this.touchEvent_level4_tip1, this)
    }
    level4_tip2() {
        this.nextTip = TIPS.level4_tip2;
        this.hadTouched = false;
        var string = '看，合成了一个火箭，快试试看火箭有什么用'
        // let ps = null;
        // for (var x = 0; x < Play.DataPve.grid.length; ++x) {
        //     for (var y = 0; y < Play.DataPve.grid[x].length; ++y) {
        //         if (this.game.tiles[x][y] && this.game.tiles[x][y].name == 'Bomb') {
        //             ps = this.node.convertToNodeSpaceAR(this.panelTile.convertToWorldSpaceAR(this.game.tiles[x][y].getPosition()));
        //         }
        //     }
        // }
        // ps = ps || cc.v2(120, -114)
        // this.nodMask.setPosition(ps);
        this.setGuide(string, cc.v2(200, -274), cc.size(80, 80), true, 2);
        this.node.on('touchstart', this.touchEvent_level4_tip2, this)
    }
    level4_tip3() {
        this.nextTip = TIPS.level4_tip3;
        var string = '火箭可以消除一列的水果'
        this.setGuide(string, cc.v2(200, -274), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level4_tip3, this)
    }
    level4_tip4() {
        this.nextTip = TIPS.level4_tip4;
        var string = '连续的5个或6个水果可以合成一个火箭'
        this.setGuide(string, cc.v2(200, -274), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level4_tip4, this)
    }
    level4_tip5() {
        this.nextTip = TIPS.level4_tip5;
        this.hadTouched = false;
        var string = '试试7个连续的水果消除有什么效果'
        this.setGuide(string, cc.v2(-200, -114), cc.size(80, 560), true, 2);
        this.node.on('touchstart', this.touchEvent_level4_tip5, this)
    }
    level4_tip6() {
        this.nextTip = TIPS.level4_tip6;
        this.hadTouched = false;
        var string = '看，合成了一个炸弹，快试试看炸弹有什么用'
        this.setGuide(string, cc.v2(-200, -354), cc.size(80, 80), true, 2);
        this.node.on('touchstart', this.touchEvent_level4_tip6, this)
    }
    level4_tip7() {
        this.nextTip = TIPS.level4_tip7;
        this.hadTouched = false;
        var string = '炸弹可以炸掉周围的9个水果'
        this.setGuide(string, cc.v2(-200, -354), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level4_tip7, this)
    }
    level4_tip8() {
        this.nextTip = TIPS.level4_tip8;
        var string = '连续的7个或8个水果可以合成一个炸弹'
        this.setGuide(string, cc.v2(-200, -354), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level4_tip8, this)
    }
    level5_tip1() {
        this.nextTip = TIPS.level5_tip1;
        this.node.active = true;
        var string = '试试9个连续的水果消除有什么效果'
        this.setGuide(string, cc.v2(-40, -114), cc.size(240, 240), true, 2);
        this.node.on('touchstart', this.touchEvent_level5_tip1, this)
    }
    level5_tip2() {
        this.nextTip = TIPS.level5_tip2;
        this.hadTouched = false;
        var string = '看，合成了一个风车，快试试看风车有什么用'

        let ps = null;
        for (var x = 0; x < Play.DataPve.grid.length; ++x) {
            for (var y = 0; y < Play.DataPve.grid[x].length; ++y) {
                if (this.game.tiles[x][y] && this.game.tiles[x][y].tileType === TILE_TYPE.BOMB) {
                    ps = this.node.convertToNodeSpaceAR(this.panelTile.convertToWorldSpaceAR(this.game.tiles[x][y].node.getPosition()));
                }
            }
        }
        ps = ps || cc.v2(-40, -434)
        this.setGuide(string, ps, cc.size(80, 80), true, 2);
        this.node.on('touchstart', this.touchEvent_level5_tip2, this)
    }
    level5_tip3() {
        this.nextTip = TIPS.level5_tip3;
        this.hadTouched = false;
        var string = '风车可以把相同类型的水果全部消除掉'
        this.setGuide(string, cc.v2(-40, -434), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level5_tip3, this)
    }
    level5_tip4() {
        this.nextTip = TIPS.level5_tip4;
        this.hadTouched = false;
        var string = '连续9个或以上的水果可以合成一个风车'
        this.setGuide(string, cc.v2(-40, -434), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level5_tip4, this)
    }
    level8_tip1() {
        this.nextTip = TIPS.level8_tip1;
        var string = '消除小宠物下方的水果让它掉落至最下端即可让它们回家'
        this.setGuide(string, cc.v2(-40, -434), cc.size(80, 80), false, 3, false);
        this.node.on('touchstart', this.touchEvent_level8_tip1, this)
    }
    level9_tip1() {
        this.nextTip = TIPS.level9_tip1;
        var string = '这个杯子是障碍物，试着在它的周围完成一次消除看看会怎么样'
        this.setGuide(string, cc.v2(40, 126), cc.size(80, 80), false, 2);
        this.node.on('touchstart', this.touchEvent_level9_tip2, this)
    }
    level10_tip1() {
        this.nextTip = TIPS.level10_tip1;
        this.hadTouched = false;
        var string = '注意这关需要让不同的宠物回家哦'
        this.setGuide(string, cc.v2(-40, -434), cc.size(80, 80), false, 1, false);
        this.node.on('touchstart', this.touchEvent_level10_tip1, this)
    }
    level11_tip1() {
        this.nextTip = TIPS.level11_tip1;
        this.button.node.active = true;
        var string = '注意啦，本关是计时关卡，要在规定时间内完成任务，你准备好了嘛'
        this.setGuide(string, cc.v2(40, -114), cc.size(80, 80), false, 3, false);
        this.labContinue.active = false;
        this.button.node.on('touchstart', this.touchEvent_level11_tip1, this)
    }
    level13_tip1() {
        this.nextTip = TIPS.level13_tip1;
        var string = '这里里的花朵需要在周围消除两次水果才能消除，且被砖块挡住花朵是不会下落的哦'
        this.setGuide(string, cc.v2(-40, 46), cc.size(80, 80), false, 2);
        this.node.on('touchstart', this.touchEvent_level13_tip1, this)
    }
    level15_tip1() {
        this.nextTip = TIPS.level15_tip1;
        var string = '这个传送门可以把水果隔空传送'
        this.setGuide(string, cc.v2(-280, 46), cc.size(80, 80), false, 2);
        this.node.on('touchstart', this.touchEvent_level15_tip1, this)
    }
    level17_tip1() {
        this.nextTip = TIPS.level17_tip1;
        var string = '水果旁讨厌的虫子必须使用火箭火焰或者炸弹才能消灭呢'
        this.setGuide(string, cc.v2(-120, -34), cc.size(80, 80), false, 2);
        this.node.on('touchstart', this.touchEvent_level17_tip1, this)
    }

    level20_tip1() {
        this.nextTip = TIPS.level20_tip1;
        var string = '水果们都坐上行李传送带啦'
        this.setGuide(string, cc.v2(0, -114), cc.size(640, 80), false, 2);
        this.node.on('touchstart', this.touchEvent_level20_tip1, this)
    }

    level23_tip1() {
        this.nextTip = TIPS.level23_tip1;
        var string = '只有完成了现有的任务，才会显示问号中的任务哦'
        this.setGuide(string, cc.v2(-100, 420), cc.size(250, 120), false, 1);
        this.node.on('touchstart', this.touchEvent_level23_tip1, this)
    }

    level27_tip1() {
        this.nextTip = TIPS.level27_tip1;
        var string = '只有按照顺序消除才能计数哦'
        this.setGuide(string, cc.v2(-100, 420), cc.size(250, 120), false, 1);
        this.node.on('touchstart', this.touchEvent_level27_tip1, this)
    }

    level31_tip1() {
        this.nextTip = TIPS.level31_tip1;
        var string = '有禁止标志的水果可不能点击消除，否则任务会重置哦'
        this.setGuide(string, cc.v2(0, 420), cc.size(550, 120), false, 1);
        this.node.on('touchstart', this.touchEvent_level31_tip1, this)
    }

    touchEvent_level1_tip1(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            component.onTouchStart();
            this.node.active = false;
            this.nextTip = TIPS.level1_tip2;
            // this.level1_tip2();
        }
    }
    touchEvent_level1_tip2(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.nextTip = TIPS.level1_tip3;
        this.level1_tip3();
    }
    touchEvent_level1_tip3(event) {
        if (this.hadTouched) {
            return
        }
        this.hadDone = true;
        this.node.active = false;
    }
    touchEvent_level1_tip4(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
    }

    touchEvent_level4_tip1(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            this.nextTip = TIPS.level4_tip2;
            component.onTouchStart();
            // this.node.active = false;
            // this.level1_tip2();
        }
    }
    touchEvent_level4_tip2(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            this.nextTip = TIPS.level4_tip3;
            component.onTouchStart();
            this.node.active = false;
        }
    }
    touchEvent_level4_tip3(event) {
        if (this.hadTouched) {
            return
        }
        this.level4_tip4();
    }
    touchEvent_level4_tip4(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.level4_tip5();
    }
    touchEvent_level4_tip5(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            this.nextTip = TIPS.level4_tip6;
            component.onTouchStart();
            // this.node.active = false;
        }
    }
    touchEvent_level4_tip6(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            this.nextTip = TIPS.level4_tip7;
            component.onTouchStart();
            this.node.active = false;
        }
    }
    touchEvent_level4_tip7(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.level4_tip8();
    }
    touchEvent_level4_tip8(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level5_tip1(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            this.nextTip = TIPS.level5_tip2;
            component.onTouchStart();
            // this.node.active = false;
            // this.level1_tip2();
        }
    }
    touchEvent_level5_tip2(event) {
        if (this.hadTouched) {
            return
        }
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            this.hadTouched = true;
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let component = this.game.tiles[position.x][position.y];
            this.nextTip = TIPS.level5_tip3;
            component.onTouchStart();
            this.node.active = false;
        }
    }
    touchEvent_level5_tip3(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.level5_tip4();
    }
    touchEvent_level5_tip4(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level8_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level9_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
    }
    touchEvent_level9_tip2(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level10_tip1(event) {
        if (this.hadTouched) {
            return
        }
        Play.DataPve.gameBegan = true;
        this.button.node.targetOff(this)
        this.button.node.active = false;
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level11_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
        this.touchEvent();
    }
    touchEvent_level13_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level15_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level17_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level20_tip1(event) {
        if (this.hadTouched) {
            return
        }
        Play.DataPve.gameBegan = true;
        this.button.node.targetOff(this)
        this.button.node.active = false;
        this.node.active = false;
        this.hadDone = true;
    }
    touchEvent_level23_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }

    touchEvent_level27_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }

    touchEvent_level31_tip1(event) {
        if (this.hadTouched) {
            return
        }
        this.node.active = false;
        this.hadDone = true;
    }
    getXYByPosition(position) {
        let x = Math.floor(position.x / 80) + 4;
        let y = Math.floor(position.y / 80);
        return { x: x, y: y }
    }

    // update (dt) {}
}
