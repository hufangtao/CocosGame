(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/ui/UIGetProp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e7967vmgX1Mw7iGOyI2LG7k', 'UIGetProp', __filename);
// scripts/app/ui/UIGetProp.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYAudio_1 = require("../../dyGame/DYAudio");
var ProtoType_1 = require("../common/net/proto/ProtoType");
var Modules_1 = require("../module/Modules");
var UIFunc_1 = require("../common/UIFunc");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var UIGetProp = /** @class */ (function (_super) {
    __extends(UIGetProp, _super);
    function UIGetProp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audGetProp = null;
        _this.nodMoreProp = null;
        // 广告获得的道具
        _this.hadGetProp = false;
        return _this;
        // update (dt) {}
    }
    UIGetProp.prototype.onEnable = function () {
        var nodBuffs = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodBuffs.scale = 1;
        nodBuffs.setPosition(0, 0);
        this.nodMoreProp.active = false;
        this.node.getChildByName('nodOneProp').active = false;
        for (var i = 0; i < nodBuffs.children.length - 3; ++i) {
            nodBuffs.children[i].active = false;
            nodBuffs.children[i].setPosition(0, 0);
        }
    };
    UIGetProp.prototype.start = function () {
    };
    // 播放获得道具音效
    UIGetProp.prototype.playAudioGetProp = function () {
        DYAudio_1.default.playEffect(this.audGetProp, false);
    };
    UIGetProp.prototype.achieveCoin = function (coinCount, cb) {
        var _this = this;
        this.node.active = true;
        var nodBuffs = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodBuffs.getChildByName('labCount').getComponent(cc.Label).string = coinCount + '';
        nodBuffs.getChildByName('coin').active = true;
        var animation = this.node.getComponent(cc.Animation);
        animation['closeProp'] = function () {
            _this.node.active = false;
            cb && cb();
        };
        animation.play('getProp2');
    };
    // 多个道具的展示
    UIGetProp.prototype.moreProp = function (goodList, cb) {
        // 初始化道具图标及数量
        var nodGoods = this.nodMoreProp.getChildByName('nodGoods');
        for (var i = 0; i < nodGoods.children.length; ++i) {
            nodGoods.children[i].active = false;
        }
        var nodGood;
        for (var i = 0; i < goodList.length; ++i) {
            nodGood = nodGoods.children[i];
            if (!nodGood) {
                break;
            }
            nodGood.active = true;
            for (var j = 0; j < nodGood.children.length - 2; ++j) {
                nodGood.children[j].active = false;
            }
            nodGood.getChildByName('labCount').getComponent(cc.Label).string = goodList[i].goodsNum + '';
            this.showGoodById(nodGood, goodList[i].goodsId);
        }
        var animation = this.node.getComponent(cc.Animation);
        animation['closeProp'] = function () {
            cb && cb();
        };
        animation.play('getProp3');
    };
    // 根据goodid显示
    UIGetProp.prototype.showGoodById = function (node, id) {
        switch (id) {
            case 1:
                node.getChildByName('buff1').active = true;
                break;
            case 2:
                node.getChildByName('buff2').active = true;
                break;
            case 3:
                node.getChildByName('buff3').active = true;
                break;
            case 4:
                node.getChildByName('buff4').active = true;
                break;
            case 11:
                node.getChildByName('coin').active = true;
                break;
            case 12:
                break;
            case 13:
                break;
            case 14:
                node.getChildByName('energy').active = true;
                break;
        }
    };
    UIGetProp.prototype.scorePvpAchieveProp = function () {
        var _this = this;
        if (this.hadGetProp) {
            return;
        }
        this.hadGetProp = true;
        setTimeout(function () {
            _this.hadGetProp = false;
        }, 1000);
        var param;
        var prop = new ProtoType_1.PGoods();
        for (var i = 0; i < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++i) {
            var hadParam = false;
            for (var j = 0; j < Modules_1.Home.DataPlayer.PlayerGoodsDataLast.length; ++j) {
                if (Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId == Modules_1.Home.DataPlayer.PlayerGoodsDataLast[j].goodsId) {
                    if (Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum == Modules_1.Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum) {
                        hadParam = true;
                    }
                    else {
                        param = Modules_1.Home.DataPlayer.PlayerGoodsData[i];
                        hadParam = true;
                        prop.goodsId = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId;
                        prop.goodsNum = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum - Modules_1.Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum;
                        break;
                    }
                }
            }
            if (!hadParam) {
                param = Modules_1.Home.DataPlayer.PlayerGoodsData[i];
                prop.goodsId = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId;
                prop.goodsNum = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum;
            }
        }
        Modules_1.Home.DataPlayer.UpdataPlayerGoodsLast([param]);
        // console.log('获得道具', prop);
        this.scorePvpPlayGetProp(prop.goodsId, prop.goodsNum);
    };
    UIGetProp.prototype.scorePvpPlayGetProp = function (index, count) {
        var _this = this;
        var nodBuffs = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodBuffs.scale = 1;
        this.node.active = true;
        this.showBuffByIndex(index, count);
        var animation = this.node.getComponent(cc.Animation);
        animation['closeProp'] = function () {
            _this.node.active = false;
            UIFunc_1.UIFunc.closeUI('UIGetProp', function () { });
        };
        animation.play('getProp2');
    };
    // home场景广告获得的道具
    UIGetProp.prototype.homeAchieveProp = function (Prop) {
        this.Prop = Prop;
        var param;
        var prop = new ProtoType_1.PGoods();
        for (var i = 0; i < Modules_1.Home.DataPlayer.PlayerGoodsData.length; ++i) {
            var hadParam = false;
            for (var j = 0; j < Modules_1.Home.DataPlayer.PlayerGoodsDataLast.length; ++j) {
                if (Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId == Modules_1.Home.DataPlayer.PlayerGoodsDataLast[j].goodsId) {
                    if (Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum == Modules_1.Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum) {
                        hadParam = true;
                    }
                    else {
                        param = Modules_1.Home.DataPlayer.PlayerGoodsData[i];
                        hadParam = true;
                        prop.goodsId = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId;
                        prop.goodsNum = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum - Modules_1.Home.DataPlayer.PlayerGoodsDataLast[j].goodsNum;
                        break;
                    }
                }
            }
            if (!hadParam) {
                param = Modules_1.Home.DataPlayer.PlayerGoodsData[i];
                prop.goodsId = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsId;
                prop.goodsNum = Modules_1.Home.DataPlayer.PlayerGoodsData[i].goodsNum;
            }
        }
        Modules_1.Home.DataPlayer.UpdataPlayerGoodsLast([param]);
        // console.log('获得道具', prop);
        this.playGetProp(prop.goodsId, prop.goodsNum);
    };
    // 获取道具的位置
    UIGetProp.prototype.getPropPsByIndex = function (index) {
        var nodProp = this.Prop.nodBuffSlot.children[index - 1];
        if (!nodProp) {
            return cc.v2(0, 0);
        }
        var position = nodProp.parent.convertToWorldSpaceAR(nodProp.position);
        return this.node.getChildByName('nodOneProp').convertToNodeSpaceAR(position);
    };
    // 根据道具显示图标
    UIGetProp.prototype.showBuffByIndex = function (index, count) {
        var nodes = this.node.getChildByName('nodOneProp').getChildByName('buffs');
        nodes.getChildByName('labCount').getComponent(cc.Label).string = count + '';
        nodes.getChildByName('coin').active = false;
        for (var i = 0; i < nodes.children.length - 3; ++i) {
            if (i === index - 1) {
                nodes.children[i].active = true;
            }
            else {
                nodes.children[i].active = false;
            }
        }
    };
    // 播放获得道具动画
    UIGetProp.prototype.playGetProp = function (index, count) {
        var _this = this;
        this.playAudioGetProp();
        this.node.getChildByName('nodOneProp').getChildByName('buffs').position = cc.v2(0, 0);
        var animation = this.node.getComponent(cc.Animation);
        animation.stop('getProp');
        var position = this.getPropPsByIndex(index);
        this.showBuffByIndex(index, count);
        animation['move'] = function () {
            _this.node.getChildByName('nodOneProp').getChildByName('buffs').runAction(cc.sequence(cc.spawn(cc.moveTo(0.5, position), cc.scaleTo(0.5, 0.2, 0.2)), cc.callFunc(function () {
                _this.Prop.updateBuff();
                UIFunc_1.UIFunc.closeUI('UIGetProp', function () { });
            })));
        };
        animation.play('getProp');
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], UIGetProp.prototype, "audGetProp", void 0);
    __decorate([
        property(cc.Node)
    ], UIGetProp.prototype, "nodMoreProp", void 0);
    UIGetProp = __decorate([
        ccclass
    ], UIGetProp);
    return UIGetProp;
}(cc.Component));
exports.default = UIGetProp;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=UIGetProp.js.map
        