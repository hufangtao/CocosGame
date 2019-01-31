import { GUIDE_TYPE } from "../PlayDefine";
import { fillDispatcher } from "../../../common/net/proto/ProtoDispatcher";
import Game = cc.Game;
import { Play } from "../../../module/Modules";
import v2 = cc.v2;
import HomeManager from "../../page/home/HomeManager";
import PlayManager from "../PlayManager";
import { PlayActiveBuffS2C, PlayStolenAnimalS2C, PlaySaveAnimalS2C } from "../../../common/net/proto/mods/ProtoSectionPlay";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PvpGuide extends cc.Component {

    @property(cc.Node)
    nodMask: cc.Node = null;

    @property(cc.Node)
    mask_frame: cc.Node = null;

    @property(cc.Node)
    buffNode: cc.Node = null;
    @property(cc.Node)
    timeNode: cc.Node = null;
    @property(cc.Node)
    headNode: cc.Node = null;
    @property(cc.Node)
    countNode: cc.Node = null;
    @property(cc.Label)
    tipsLabel: cc.Label = null;
    @property(cc.Node)
    blackBoardNode: cc.Node = null;
    @property(cc.Node)
    continueNode: cc.Node = null;

    @property(cc.Sprite)
    pointSprite: cc.Sprite = null;

    @property(cc.Node)
    panelTile: cc.Node = null;

    private guideQueue = null;
    private queueSize = 0;

    private curGuideType = 0;

    onLoad() {
        this.node.on('touchstart', this.onTouchStart, this);
    }

    onTouchStart(event) {
        let pt = this.nodMask.convertTouchToNodeSpaceAR(event);
        let rect = cc.rect(-this.nodMask.width / 2, -this.nodMask.height / 2, this.nodMask.width, this.nodMask.height);

        if (rect.contains(pt)) {
            //console.log("Touch in Rect",pt,this.nodMask.convertToWorldSpaceAR(pt));
            let px = this.panelTile.convertToNodeSpaceAR(this.nodMask.convertToWorldSpaceAR(pt))
            let position = this.getXYByPosition(px);
            let nodTile = null;
            switch (this.curGuideType) {
                case GUIDE_TYPE.ACTIVE_BUFF1:
                    var activeBuff = new PlayActiveBuffS2C();
                    activeBuff.buffId = 1;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 2;
                    PlayManager.INSTANCE.onActiveBuff(activeBuff);
                    HomeManager.INSTANCE.onBuffStatus(1, 0, 0);
                    Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case GUIDE_TYPE.ACTIVE_BUFF2:
                    var activeBuff = new PlayActiveBuffS2C();
                    var stealAnimal = new PlayStolenAnimalS2C();
                    stealAnimal.animalSide = 2;
                    stealAnimal.stealCount = 4;
                    var saveAnimal = new PlaySaveAnimalS2C();
                    saveAnimal.animalSide = 2;
                    stealAnimal.stealCount = 4;
                    activeBuff.buffId = 2;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 1;
                    PlayManager.INSTANCE.getAnimalResponse(saveAnimal);
                    PlayManager.INSTANCE.onStolenAnimal(stealAnimal);
                    HomeManager.INSTANCE.onBuffStatus(1, 0, 0);
                    Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case GUIDE_TYPE.ACTIVE_BUFF3:
                    var activeBuff = new PlayActiveBuffS2C();
                    activeBuff.buffId = 3;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 1;
                    PlayManager.INSTANCE.onActiveBuff(activeBuff);
                    HomeManager.INSTANCE.onBuffStatus(1, 0, 0);
                    Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case GUIDE_TYPE.ACTIVE_BUFF4:
                    var activeBuff = new PlayActiveBuffS2C();
                    activeBuff.buffId = 4;
                    activeBuff.effected = 1;
                    activeBuff.effectSide = 1;
                    PlayManager.INSTANCE.onActiveBuff(activeBuff);
                    HomeManager.INSTANCE.onBuffStatus(1, 0, 0);
                    Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case GUIDE_TYPE.BOMB_COL:
                case GUIDE_TYPE.BOMB_COL_STR:
                    nodTile = this.node.parent.getComponent('LayerGame').tiles[position.x][position.y];
                    var bombComponent = nodTile.getComponent('BombPvp');
                    if (bombComponent != null) {
                        this.pointSprite.node.active = false;
                        this.nodMask.opacity = 0;
                        bombComponent.onTouchStart();
                    }
                    Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
                case GUIDE_TYPE.MATCH2:
                case GUIDE_TYPE.SAVE:
                case GUIDE_TYPE.MATCH1:
                    // console.log("match1");
                    nodTile = this.node.parent.getComponent('LayerGame').tiles[position.x][position.y];
                    var blockComponent = nodTile.getComponent('BlockPvp');
                    // console.log("block Component:", blockComponent);
                    if (blockComponent != null) {
                        blockComponent.onTouchStart();
                    }
                    Play.DataPvp.gameBegan = true;
                    this.node.active = false;
                    break;
            }
        } else {
            //console.log("Touch continue",event);
            if (this.curGuideType >= 100) {
                return;
            }
            Play.DataPvp.gameBegan = true;
            this.node.active = false;
        }

        if (!this.node.active) {
            this.performGuide();
        }
    }

    getXYByPosition(position) {
        let x = Math.floor(position.x / 80) + 4;
        let y = Math.floor(position.y / 80);
        return { x: x, y: y }
    }

    initGuide(tips: boolean, tipsString: string, tipsPos, maskPos, maskSize, continueTip = false, pointer = false) {
        this.continueNode.active = continueTip;
        this.blackBoardNode.active = tips;
        this.tipsLabel.string = tipsString;
        if (this.tipsLabel.node.height >= 160) {
            this.blackBoardNode.height = this.tipsLabel.node.height + 40;
        } else {
            this.blackBoardNode.height = 160;
        }
        this.blackBoardNode.y = (tipsPos);
        this.nodMask.setPosition(maskPos);
        this.mask_frame.setPosition(this.nodMask.getPosition());
        this.pointSprite.node.active = pointer;
        this.pointSprite.node.setPosition(this.nodMask.getPosition());
        this.pointSprite.node.getComponent(cc.Animation).play("aniGuide");
        this.nodMask.setContentSize(maskSize);
        this.mask_frame.setContentSize(maskSize.width + 40, maskSize.height + 40);
    }

    performGuide() {
        if (this.queueSize <= 0) {
            return;
        }

        Play.DataPvp.gameBegan = false;

        let guide = [];
        guide = this.guideQueue.pop();
        this.queueSize--;
        let guideType = guide[0];
        let bombPos = guide[1];
        this.curGuideType = guideType;
        this.node.active = true;
        this.nodMask.active = true;
        this.nodMask.opacity = 200;
        let pos = null;
        this.blackBoardNode.active = true;
        switch (guideType) {
            case GUIDE_TYPE.MATCH1:
                var maskPos = cc.v2(-160, -30);
                var maskSize = new cc.Size(160, 80);
                var tipsString = "点击2个及以上相邻的同类水果即可消除";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, false, true);
                break;
            case GUIDE_TYPE.MATCH2:
                var maskPos = cc.v2(200, -30);
                var maskSize = new cc.Size(80, 240);
                var tipsString = "再点击试一次";
                this.initGuide(true, tipsString, 190, maskPos, maskSize, false, true);
                this.setGuide(GUIDE_TYPE.SAVE);
                break;
            case GUIDE_TYPE.SAVE:
                // var maskPos = cc.v2(40 + 80, -30 - 80 * 3);
                var maskPos = cc.v2(120, -390);
                var maskSize = new cc.Size(80, 160);
                var tipsString = "通过消除水果使动物下落到棋盘底部，即可完成收集";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, false, true);
                break;
            case GUIDE_TYPE.SAVE_SUC:
                var maskPos = cc.v2(0, 420);
                var maskSize = new cc.Size(400, 150);
                var tipsString = "恭喜你拯救了宠物! 这里记录了双方收集的宠物数，游戏结束时数量多的一方获胜";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                this.setGuide(GUIDE_TYPE.TIME);
                break;
            case GUIDE_TYPE.TIME:
                var maskPos = this.timeNode.getPosition();
                var maskSize = this.timeNode.getContentSize();
                var tipsString = "比赛总时长为120s";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                if (PlayManager.INSTANCE.PlayUI.panelHeader.passedTime < 55) {
                    PlayManager.INSTANCE.PlayUI.panelHeader.passedTime = 55;
                }
                break;
            case GUIDE_TYPE.TIME60:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "当游戏到达60秒时，\n游戏进入第2阶段，此时火箭回得到加强，试着合成一个强力火箭";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                break;
            case GUIDE_TYPE.BOMB_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "真棒，就是这样!";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                break;
            case GUIDE_TYPE.BOMB_COL_STR_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "哇！强力火箭是不是更厉害了";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                break;
            case GUIDE_TYPE.BUFF_TIP:
                var maskPos = cc.v2(0, -547);
                var maskSize = new cc.Size(500, 100);
                var tipsString = "对战中有多个技能可以选择使用哦";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF1);
                break;
            case GUIDE_TYPE.BOMB_COL:
                // this.nodMask.active = false;
                var tipsPos = 160;
                pos = this.node.convertToNodeSpaceAR(bombPos);
                if (bombPos.y > 650) {
                    tipsPos = -160;
                }
                maskPos = pos;
                var maskSize = new cc.Size(80, 80);
                var tipsString = "哇，恭喜你合成了一个火箭，默认方向是竖向的，每次点击将改变火箭方向，快来试试吧";
                this.initGuide(true, tipsString, tipsPos, maskPos, maskSize, false, true);
                break;
            case GUIDE_TYPE.BOMB_COL_STR:
                var tipsPos = 160;
                pos = this.node.convertToNodeSpaceAR(bombPos);
                if (bombPos.y > 650) {
                    tipsPos = -160;
                }
                maskPos = pos;
                var maskSize = new cc.Size(80, 80);
                var tipsString = "哇，恭喜你合成了强力火箭，快点击试试吧";
                this.initGuide(true, tipsString, tipsPos, maskPos, maskSize, false, true);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF1:
                // 设置一个技能
                HomeManager.INSTANCE.onBuffStatus(1, 1, 1);
                var maskPos = cc.v2(-180, -547);
                var maskSize = new cc.Size(100, 100);
                var tipsString = "先试一试这个技能有什么用吧";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, false, true);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF1_SUC);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF1_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "恭喜你消除了全屏";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                this.setGuide(GUIDE_TYPE.GET_BUFF);
                // this.setGuide(GUIDE_TYPE.ACTIVE_BUFF2);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF2:
                // 设置一个技能
                HomeManager.INSTANCE.onBuffStatus(1, 2, 1);
                var maskPos = this.buffNode.getPosition();
                var maskSize = this.buffNode.getContentSize();
                var tipsString = "你还可以把对手棋盘上的宠物抢来，快试试使用这个技能吧";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF2_SUC);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF2_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "你成功从对手棋盘上抢夺了宠物";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                // this.setGuide(GUIDE_TYPE.GET_BUFF);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF3);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF3:
                // 设置一个技能
                HomeManager.INSTANCE.onBuffStatus(1, 3, 1);
                var maskPos = this.buffNode.getPosition();
                var maskSize = this.buffNode.getContentSize();
                var tipsString = "你还可以用这个技能遮挡对手视野10秒";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF3_SUC);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF3_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "很好";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF4);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF4:
                // 设置一个技能
                HomeManager.INSTANCE.onBuffStatus(1, 4, 1);
                var maskPos = this.buffNode.getPosition();
                var maskSize = this.buffNode.getContentSize();
                var tipsString = "甚至你想打乱对方阵脚，还可以使用这个技能";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(GUIDE_TYPE.ACTIVE_BUFF4_SUC);
                break;
            case GUIDE_TYPE.ACTIVE_BUFF4_SUC:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(80, 80);
                var tipsString = "你成功打乱了对手的棋盘";
                this.initGuide(true, tipsString, 160, maskPos, maskSize);
                this.setGuide(GUIDE_TYPE.GET_BUFF);
                break;
            case GUIDE_TYPE.GET_BUFF:
                var maskPos = cc.v2(80, -547);
                var maskSize = new cc.Size(400, 120);
                var tipsString = "更多丰富的技能可以通过主页看广告免费获得哦";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true);
                this.setGuide(GUIDE_TYPE.USE_BUFF_COUNT);
                break;
            case GUIDE_TYPE.USE_BUFF_COUNT:
                var maskPos = cc.v2(10000, 10000);
                var maskSize = new cc.Size(400, 120);
                var tipsString = "记住每局每个技能只能使用一次哦";
                this.initGuide(true, tipsString, 160, maskPos, maskSize, true, false);
                if (PlayManager.INSTANCE.PlayUI.panelHeader.passedTime < 105) {
                    PlayManager.INSTANCE.PlayUI.panelHeader.passedTime = 105;
                }
                break;
            // case GUIDE_TYPE.GEN_FLOWER1:
            //     var tipsPos = 160;
            //     pos = this.node.convertToNodeSpaceAR(bombPos);
            //     if (bombPos.y > 650) {
            //         tipsPos = -160;
            //     }
            //     maskPos = pos;
            //     var maskSize = new cc.Size(80, 80);
            //     var tipsString = "当对手比分超过你的时候，会在最下面一行生成一朵花，花朵会挡住水果的下落，需要再花朵周围消除两次才可消除";
            //     this.initGuide(true, tipsString, tipsPos, maskPos, maskSize,true,false);
            //     this.setGuide(GUIDE_TYPE.GEN_FLOWER2);
            //     break;
            // case GUIDE_TYPE.GEN_FLOWER2:
            //     var maskPos = cc.v2(10000, 10000);
            //     var maskSize = new cc.Size(80, 80);
            //     var tipsString = "比分差距越大，花朵生成位置越高哦，加油超越对手，你也给ta抛一朵花";
            //     this.initGuide(true, tipsString, 160, maskPos, maskSize, true,false);
            //     if (PlayManager.INSTANCE.PlayUI.panelHeader.passedTime < 105) {
            //         PlayManager.INSTANCE.PlayUI.panelHeader.passedTime = 105;
            //     }
            //     break;
        }
    }

    setGuide(guideType: GUIDE_TYPE, bombPos = null) {
        if (this.guideQueue == null) {
            this.guideQueue = [];
        }
        // console.log("set guideType", guideType);
        let guide = [];
        guide[0] = guideType;
        guide[1] = bombPos;
        this.guideQueue.unshift(guide);
        this.queueSize++;
        if (!this.node.active) {
            this.performGuide();
        }
    }

    // update (dt) {}
}
