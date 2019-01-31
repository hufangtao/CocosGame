"use strict";
cc._RF.push(module, '33c3bbNlt5EaqsamcOYTqKR', 'RankUp');
// scripts/app/component/prefab/RankUp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var RankUp = /** @class */ (function (_super) {
    __extends(RankUp, _super);
    function RankUp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodItems = null;
        _this.nodMyItem = null;
        return _this;
        // update (dt) {}
    }
    RankUp.prototype.onLoad = function () {
    };
    RankUp.prototype.start = function () {
    };
    RankUp.prototype.showAction = function (isPvp) {
        this.initItem(isPvp);
    };
    RankUp.prototype.initItem = function (isPvp) {
        var _this = this;
        this.nodMyItem.destroyAllChildren();
        this.nodItems.destroyAllChildren();
        this.loadItemPrefab(isPvp, function (prefab) {
            var beyondCount = Modules_1.Play.DataPvp.oldPvpRank - Modules_1.Home.DataRank.MyRank;
            if (beyondCount > 5) {
                beyondCount = 5;
            }
            var myData = Modules_1.Home.DataRank.GlobalRankData[Modules_1.Home.DataRank.MyRank];
            // 初始化我的item
            var myRankItem = _this.getNodItem(prefab);
            myRankItem.updateItem(Modules_1.Play.DataPvp.oldPvpRank - 1, myData);
            myRankItem.node.parent = _this.nodMyItem;
            myRankItem.node.getChildByName('bg_0').active = false;
            myRankItem.node.getChildByName('bg_1').active = true;
            myRankItem.node.y = 0;
            for (var i = 0; i < beyondCount; ++i) {
                var data = Modules_1.Home.DataRank.GlobalRankData[Modules_1.Home.DataRank.MyRank - i - 1];
                var RankItem = _this.getNodItem(prefab);
                RankItem.node.parent = _this.nodItems;
                RankItem.node.y = 0;
                if (!data) {
                    continue;
                }
                RankItem.updateItem(Modules_1.Home.DataRank.MyRank - i, data);
            }
            _this.getComponent(cc.Animation).play('rankUp');
            _this.scheduleOnce(function () {
                myRankItem.setMyRank(Modules_1.Home.DataRank.MyRank - 1);
            }, 1.1);
            _this.scheduleOnce(function () {
                _this.node.destroy();
            }, 2);
        });
    };
    // 获取item的脚本组件
    RankUp.prototype.getNodItem = function (prefab) {
        if (!prefab) {
            return;
        }
        var node = cc.instantiate(prefab);
        var RankItem = node.getComponent(prefab.name);
        return RankItem;
    };
    // 加载item prefab
    RankUp.prototype.loadItemPrefab = function (isPvp, cb) {
        var prefab;
        if (isPvp) {
            cc.loader.loadRes('prefab/home/RankItem', cc.Prefab, function (err, res) {
                prefab = res;
                // cc.loader.setAutoReleaseRecursively(res, true)
                cb && cb(prefab);
            });
        }
        else {
            cc.loader.loadRes('prefab/levelChoose/RankItemPve', cc.Prefab, function (err, res) {
                prefab = res;
                // cc.loader.setAutoReleaseRecursively(res, true)
                cb && cb(prefab);
            });
        }
    };
    __decorate([
        property(cc.Node)
    ], RankUp.prototype, "nodItems", void 0);
    __decorate([
        property(cc.Node)
    ], RankUp.prototype, "nodMyItem", void 0);
    RankUp = __decorate([
        ccclass
    ], RankUp);
    return RankUp;
}(cc.Component));
exports.default = RankUp;

cc._RF.pop();