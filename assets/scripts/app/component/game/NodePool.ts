import { Play } from "../../module/Modules";

export default class NodePool {
    public static initPool() {
        NodePoolHelper.INSTANCE.initPool();
    }
    
    public static getNodeBlock() {
        return NodePoolHelper.INSTANCE.getNodeBlock();
    }
    public static getNodeBomb() {
        return NodePoolHelper.INSTANCE.getNodeBomb();
    }
    public static getNodeWall() {
        return NodePoolHelper.INSTANCE.getNodeWall();
    }
    public static getNodeTableware() {
        return NodePoolHelper.INSTANCE.getNodeTableware();
    }
    public static getNodeObstacle() {
        return NodePoolHelper.INSTANCE.getNodeObstacle();
    }
    public static getNodeScore() {
        return NodePoolHelper.INSTANCE.getNodeScore();
    }

    public static putNodeBlock(value: cc.Node) {
        NodePoolHelper.INSTANCE.putNodeBlock(value);
    }
    public static putNodeBomb(value: cc.Node) {
        NodePoolHelper.INSTANCE.putNodeBomb(value);
    }
    public static putNodeWall(value: cc.Node) {
        NodePoolHelper.INSTANCE.putNodeWall(value);
    }
    public static putNodeTableware(value: cc.Node) {
        NodePoolHelper.INSTANCE.putNodeTableware(value);
    }
    public static putNodeObstacle(value: cc.Node) {
        NodePoolHelper.INSTANCE.putNodeObstacle(value);
    }
    public static putNodeScore(value: cc.Node) {
        NodePoolHelper.INSTANCE.putNodeScore(value);
    }
}

class NodePoolHelper {
    private static singleInstance: NodePoolHelper;

    public static get INSTANCE() {
        if (!this.singleInstance) {
            this.singleInstance = new NodePoolHelper();
        }
        return this.singleInstance;
    }

    private nodPoolBlock: cc.NodePool;
    private nodPoolBomb: cc.NodePool;
    private nodPoolWall: cc.NodePool;
    private nodPoolTableware: cc.NodePool;
    private nodPoolObstacle: cc.NodePool;
    private nodPoolScore: cc.NodePool;

    public initPool() {
        if(!this.nodPoolScore){
            this.nodPoolScore = new cc.NodePool();
        }else{
            this.nodPoolScore.clear();
        }
    }

    public getNodeBlock() {
        if (this.nodPoolBlock.size() > 0) {
            return this.nodPoolBlock.get();
        }
        var nodBlock = cc.instantiate(Play.DataPve.pfbBlock);
        return nodBlock;
    }
    public getNodeBomb() {
        if (this.nodPoolBomb.size() > 0) {
            return this.nodPoolBomb.get();
        }
        var nodBomb = cc.instantiate(Play.DataPve.pfbBomb);
        return nodBomb;
    }

    public getNodeWall() {
        if (this.nodPoolWall.size() > 0) {
            return this.nodPoolWall.get();
        }
        var nodWall = cc.instantiate(Play.DataPve.pfbWall);
        return nodWall;
    }
    public getNodeTableware() {
        if (this.nodPoolTableware.size() > 0) {
            return this.nodPoolTableware.get();
        }
        var nodTableware = cc.instantiate(Play.DataPve.pfbTableware);
        return nodTableware;
    }

    public getNodeObstacle() {
        if (this.nodPoolObstacle.size() > 0) {
            return this.nodPoolObstacle.get();
        }
        var nodObstacle = cc.instantiate(Play.DataPve.pfbObstacle);
        return nodObstacle;
    }

    public getNodeScore() {
        if (this.nodPoolScore.size() > 0) {
            return this.nodPoolScore.get();
        }
        var nodScore = cc.instantiate(Play.DataPve.pfbScore);
        return nodScore;
    }

    public putNodeBlock(value: cc.Node) {
        this.nodPoolBlock.put(value)
    }
    public putNodeBomb(value: cc.Node) {
        this.nodPoolBomb.put(value)
    }
    public putNodeWall(value: cc.Node) {
        this.nodPoolWall.put(value)
    }
    public putNodeTableware(value: cc.Node) {
        this.nodPoolTableware.put(value)
    }
    public putNodeObstacle(value: cc.Node) {
        this.nodPoolObstacle.put(value)
    }

    public putNodeScore(value: cc.Node) {
        this.nodPoolScore.put(value)
    }
}
