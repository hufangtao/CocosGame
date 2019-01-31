export class UIFunc {
    static openUI(uiName, callBack, node?) {
        UIFuncHelper.theInstance.openUI(uiName, callBack, node);
    }
    static closeUI(uiName, callBack) {
        UIFuncHelper.theInstance.closeUI(uiName, callBack);
    }
    static findUI(uiName) {
        UIFuncHelper.theInstance.findUI(uiName);
    }
}

class UIFuncHelper {
    public static get theInstance(): UIFuncHelper {
        if (!UIFuncHelper.mInstance) {
            UIFuncHelper.mInstance = new UIFuncHelper();
        }
        return UIFuncHelper.mInstance;
    }
    private static mInstance;

    cacheUIList = [];
    uiList = [];
    openUI(uiName, callBack, node) {
        // 缓存--
        node = (node ? node : cc.Canvas.instance.node);
        for (var i = 0; i < this.cacheUIList.length; i++) {
            var temp = this.cacheUIList[i];
            if (temp && temp.name === uiName) {
                temp.active = true;
                temp.parent = node;
                this.uiList.push(temp)
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
        cc.loader.loadRes('ui/' + uiName, (err, prefab) => {
            if (err) {
                cc.error(err.message || err);
                return;
            }

            var temp = cc.instantiate(prefab);
            temp.parent = node;
            this.uiList.push(temp)

            var panel = temp.getComponent("uiPanel");
            if (panel) {
                panel.show();
            }

            // event--
            if (callBack) {
                callBack(temp);
            }
        });
    }

    closeUI(uiName, callBack) {
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
    }

    findUI(uiName) {
        for (var i = this.uiList.length - 1; i >= 0; i--) {
            var temp = this.uiList[i];
            if (temp && temp.name === uiName) {
                return temp;
            }
        }
    }
}