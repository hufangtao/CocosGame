
const { ccclass, property, menu } = cc._decorator;
@ccclass
@menu('Component/ListView')
export default class ListView extends cc.Component {
    @property(cc.ScrollView)
    scrollView: cc.ScrollView = null;

    @property(cc.String)
    itemName: string = '';
    @property(cc.String)
    pfbRoot: string = '';

    @property()
    itemHeight: number = 0;
    @property()
    spawnCount: number = 0;
    @property()
    totalCount: number = 0;
    @property()
    spacing: number = 0;
    @property()
    updateInterval: number = 0;// 刷新时间
    @property()
    bufferZone: number = 0;

    viewContent;
    content;
    items;
    datas;
    updateTimer;
    lastContentPosY;
    hadShowRank = false;

    showRank(datas) {
        this.totalCount = datas.length;
        this.hadShowRank = true;
        this.viewContent = this.scrollView.node.getChildByName('view');
        this.content = this.scrollView.content;
        this.items = []; // array to store spawned items
        this.datas = datas;
        this.initialize();
        this.updateTimer = 0;
        this.updateInterval = 0.1;
        this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down
        this.scrollView.scrollToTop(0);
    }

    initialize() {
        this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing; // get total content height
        cc.loader.loadRes(this.pfbRoot + this.itemName, cc.Prefab, (err,prefab) => {
            var itemCnt = this.spawnCount;
            if(this.datas.length < this.spawnCount){
                itemCnt = this.datas.length
            }
            for (let i = 0; i < itemCnt; ++i) { // spawn items, we only need to do this once
                var nodItem = cc.instantiate(prefab)
                nodItem.parent = this.content;
                nodItem.setPosition(0, -this.itemHeight * (0.5 + i) - this.spacing * (i + 1));
                nodItem.getComponent(this.itemName).updateItem(i, this.datas[i]);
                this.items.push(nodItem);
            }
            // cc.loader.setAutoReleaseRecursively(prefab, true) 
        })
    }

    getPositionInView(item) { // get item position in scrollview's node space
        if (!item.parent) {
            return
        }
        let worldPos = item.parent.convertToWorldSpaceAR(item.position);
        let viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    }

    update(dt) {
        if (!this.hadShowRank) {
            return
        }
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        this.updateTimer = 0;
        let items = this.items;
        let buffer = this.bufferZone + this.viewContent.height / 2;
        let isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        let offset = (this.itemHeight + this.spacing) * items.length;
        for (let i = 0; i < items.length; ++i) {
            let viewPos = this.getPositionInView(items[i]);
            if (viewPos) {
                if (isDown) {
                    // if away from buffer zone and not reaching top of content
                    if (viewPos.y < -buffer && items[i].y + offset < 0) {
                        items[i].y = (items[i].y + offset);
                        let item = items[i].getComponent(this.itemName);
                        let itemId = item.itemID - items.length;
                        item.updateItem(itemId, this.datas[itemId]);
                    }
                } else {
                    // if away from buffer zone and not reaching bottom of content
                    if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                        items[i].y = (items[i].y - offset);
                        let item = items[i].getComponent(this.itemName);
                        let itemId = item.itemID + items.length;
                        item.updateItem(itemId, this.datas[itemId]);
                    }
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    }
};
