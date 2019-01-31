"use strict";
cc._RF.push(module, '903e3sfgIZBgofuFOysG3tY', 'ListView');
// scripts/dyGame/component/ListView.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.scrollView = null;
        _this.itemName = '';
        _this.pfbRoot = '';
        _this.itemHeight = 0;
        _this.spawnCount = 0;
        _this.totalCount = 0;
        _this.spacing = 0;
        _this.updateInterval = 0; // 刷新时间
        _this.bufferZone = 0;
        _this.hadShowRank = false;
        return _this;
    }
    ListView.prototype.showRank = function (datas) {
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
    };
    ListView.prototype.initialize = function () {
        var _this = this;
        this.content.height = this.totalCount * (this.itemHeight + this.spacing) + this.spacing; // get total content height
        cc.loader.loadRes(this.pfbRoot + this.itemName, cc.Prefab, function (err, prefab) {
            var itemCnt = _this.spawnCount;
            if (_this.datas.length < _this.spawnCount) {
                itemCnt = _this.datas.length;
            }
            for (var i = 0; i < itemCnt; ++i) { // spawn items, we only need to do this once
                var nodItem = cc.instantiate(prefab);
                nodItem.parent = _this.content;
                nodItem.setPosition(0, -_this.itemHeight * (0.5 + i) - _this.spacing * (i + 1));
                nodItem.getComponent(_this.itemName).updateItem(i, _this.datas[i]);
                _this.items.push(nodItem);
            }
            // cc.loader.setAutoReleaseRecursively(prefab, true) 
        });
    };
    ListView.prototype.getPositionInView = function (item) {
        if (!item.parent) {
            return;
        }
        var worldPos = item.parent.convertToWorldSpaceAR(item.position);
        var viewPos = this.scrollView.node.convertToNodeSpaceAR(worldPos);
        return viewPos;
    };
    ListView.prototype.update = function (dt) {
        if (!this.hadShowRank) {
            return;
        }
        this.updateTimer += dt;
        if (this.updateTimer < this.updateInterval)
            return; // we don't need to do the math every frame
        this.updateTimer = 0;
        var items = this.items;
        var buffer = this.bufferZone + this.viewContent.height / 2;
        var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        var offset = (this.itemHeight + this.spacing) * items.length;
        for (var i = 0; i < items.length; ++i) {
            var viewPos = this.getPositionInView(items[i]);
            if (viewPos) {
                if (isDown) {
                    // if away from buffer zone and not reaching top of content
                    if (viewPos.y < -buffer && items[i].y + offset < 0) {
                        items[i].y = (items[i].y + offset);
                        var item = items[i].getComponent(this.itemName);
                        var itemId = item.itemID - items.length;
                        item.updateItem(itemId, this.datas[itemId]);
                    }
                }
                else {
                    // if away from buffer zone and not reaching bottom of content
                    if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
                        items[i].y = (items[i].y - offset);
                        var item = items[i].getComponent(this.itemName);
                        var itemId = item.itemID + items.length;
                        item.updateItem(itemId, this.datas[itemId]);
                    }
                }
            }
        }
        // update lastContentPosY
        this.lastContentPosY = this.scrollView.content.y;
    };
    __decorate([
        property(cc.ScrollView)
    ], ListView.prototype, "scrollView", void 0);
    __decorate([
        property(cc.String)
    ], ListView.prototype, "itemName", void 0);
    __decorate([
        property(cc.String)
    ], ListView.prototype, "pfbRoot", void 0);
    __decorate([
        property()
    ], ListView.prototype, "itemHeight", void 0);
    __decorate([
        property()
    ], ListView.prototype, "spawnCount", void 0);
    __decorate([
        property()
    ], ListView.prototype, "totalCount", void 0);
    __decorate([
        property()
    ], ListView.prototype, "spacing", void 0);
    __decorate([
        property()
    ], ListView.prototype, "updateInterval", void 0);
    __decorate([
        property()
    ], ListView.prototype, "bufferZone", void 0);
    ListView = __decorate([
        ccclass,
        menu('Component/ListView')
    ], ListView);
    return ListView;
}(cc.Component));
exports.default = ListView;
;

cc._RF.pop();