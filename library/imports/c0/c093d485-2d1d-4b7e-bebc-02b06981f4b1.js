"use strict";
cc._RF.push(module, 'c093dSFLR1Lfr68ArBpgfSx', 'UIFunc');
// scripts/app/common/UIFunc.ts

Object.defineProperty(exports, "__esModule", { value: true });
var UIFunc = /** @class */ (function () {
    function UIFunc() {
    }
    UIFunc.openUI = function (uiName, callBack, node) {
        UIFuncHelper.theInstance.openUI(uiName, callBack, node);
    };
    UIFunc.closeUI = function (uiName, callBack) {
        UIFuncHelper.theInstance.closeUI(uiName, callBack);
    };
    UIFunc.findUI = function (uiName) {
        UIFuncHelper.theInstance.findUI(uiName);
    };
    return UIFunc;
}());
exports.UIFunc = UIFunc;
var UIFuncHelper = /** @class */ (function () {
    function UIFuncHelper() {
        this.cacheUIList = [];
        this.uiList = [];
    }
    Object.defineProperty(UIFuncHelper, "theInstance", {
        get: function () {
            if (!UIFuncHelper.mInstance) {
                UIFuncHelper.mInstance = new UIFuncHelper();
            }
            return UIFuncHelper.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    UIFuncHelper.prototype.openUI = function (uiName, callBack, node) {
        var _this = this;
        // 缓存--
        node = (node ? node : cc.Canvas.instance.node);
        for (var i = 0; i < this.cacheUIList.length; i++) {
            var temp = this.cacheUIList[i];
            if (temp && temp.name === uiName) {
                temp.active = true;
                temp.parent = node;
                this.uiList.push(temp);
                this.cacheUIList.splice(i, 1);
                var panel = temp.getComponent("uiPanel");
                if (panel) {
                    panel.show();
                }
                // event--
                if (callBack) {
                    callBack(temp);
                }
                return;
            }
        }
        // 非缓存--
        cc.loader.loadRes('ui/' + uiName, function (err, prefab) {
            if (err) {
                cc.error(err.message || err);
                return;
            }
            var temp = cc.instantiate(prefab);
            temp.parent = node;
            _this.uiList.push(temp);
            var panel = temp.getComponent("uiPanel");
            if (panel) {
                panel.show();
            }
            // event--
            if (callBack) {
                callBack(temp);
            }
        });
    };
    UIFuncHelper.prototype.closeUI = function (uiName, callBack) {
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            var temp = this.uiList[i];
            if (temp && temp.name === uiName) {
                temp.active = false;
                temp.removeFromParent(true);
                this.cacheUIList.push(temp);
                this.uiList.splice(i, 1);
                var panel = temp.getComponent("uiPanel");
                if (panel) {
                    panel.hide();
                }
                if (callBack) {
                    callBack();
                }
                return;
            }
        }
    };
    UIFuncHelper.prototype.findUI = function (uiName) {
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            var temp = this.uiList[i];
            if (temp && temp.name === uiName) {
                return temp;
            }
        }
    };
    return UIFuncHelper;
}());

cc._RF.pop();