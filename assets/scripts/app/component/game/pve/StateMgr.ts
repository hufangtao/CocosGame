import { Play } from "../../../module/Modules";
import { GAME_MODEL } from "../PlayDefine";

export default class StateMgr extends cc.Component {
    private static singleInstance: StateMgr;
    public static get INSTANCE() {
        if (!this.singleInstance) {
            this.singleInstance = new StateMgr();
        }
        return this.singleInstance;
    }

    isGameBegin;
    isTransportBegin;


    isGameOver;

    isStopOperate;

    isBombOver;
    isCollectOver;
    isAnimalDownOver;
    isTransportOver;
    isAllDownOver;
    isBonusActionOver;
    isBonusOver;

    isTimeLevel;

    haveTransport;

    init() {
        this.isGameBegin = false;
        this.isTransportBegin = false;

        this.isGameOver = true;// 已经进入gameover
        this.isStopOperate = false;

        this.isAllDownOver = true;
        this.isBombOver = true;
        this.isCollectOver = true;// 宠物回收完成
        this.isAnimalDownOver = true;
        this.isTransportOver = true;
        this.isBonusActionOver = false;
        this.isBonusOver = false;

        this.haveTransport = false;
    }

    
    canTouch() {

    }
    canCompose() {

    }

    canAllDown() {
        let canDown = true;
        if (!this.isAllDownOver) {
            canDown = false;
        }
        return canDown;
    }
    canCollect() {
        let canCollect = true;
        if (!this.isBombOver ) {
            canCollect = false;
        }
        return canCollect;
    }
    canTransport() {
        let canTransport = true;
        if (!this.isBombOver  || !this.isAnimalDownOver || !this.isAllDownOver || this.isTransportBegin || Play.DataPve.canPetDown()) {
            canTransport = false;
        }
        return canTransport;
    }

    /**
     * 是否可操作
     * 当时间和步数结束或者目标达成，禁止操作
     */
    canOperate() {
        if(Play.GameModel == GAME_MODEL.PVP){
            return true;
        }
        let canOperate = true;
        if (Play.DataPve.levelData.grid.transport.length > 0) {
            if (!this.isBombOver || !this.isAnimalDownOver || !this.isCollectOver
                || !this.isTransportOver || !this.isAllDownOver) {
                canOperate = false;
            }
        } else {
            if(this.isStopOperate){
                canOperate = false;
            }
        }

        
        return canOperate;
    }

    /**
     * 可以进入游戏结束状态
     * 
     * 前提是1.水果消除结束，2.水果合成结束，3.水果收集结束，4.技能释放完成，5.宠物收集完成，6.传送带结束，7.下落结束
     * 
     * 
     */
    canGameOver() {
        let canGameOver = true;
        // 动画是否播放完成
        if (!this.isBombOver || !this.isCollectOver || !this.isAllDownOver || !this.isTransportOver
            || !this.isGameOver) {
            canGameOver = false;
        }
        // 步数或时间为0
        // 目标完成
        // 播放完成，时间未结束，目标未完成
        if (canGameOver && !this.isStopOperate && !Play.DataPve.checkWin()) {
            canGameOver = false;
        }

        // console.log('==================================================');
        // console.log(this.isBombOver);
        // console.log(this.isCollectOver);
        // console.log(this.isAllDownOver);
        return canGameOver;
    }

    canBonus() {
        let canBonus = true;
        if (!this.isBonusActionOver || this.isBonusOver || this.isTimeLevel) {
            canBonus = false;
        }
        return canBonus;
    }

}
