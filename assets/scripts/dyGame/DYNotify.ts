
export class DYNotify {
    public static regObserver(eventName: string, handler: Function, target: any) {
        DYNotifyHelper.theInstance.regObserver(eventName, handler, target);
    }

    public static unregObserver(eventName: string, handler: Function, target: any) {
        DYNotifyHelper.theInstance.unregObserver(eventName, handler, target);
    }

    public static removeAllObservers(target: any) {
        DYNotifyHelper.theInstance.removeAllObservers(target);
    }

    public static post(eventName: string, data?: any) {
        DYNotifyHelper.theInstance.onNotify(eventName, data);
    }
}

class DYNotifyHelper {
    public static get theInstance(): DYNotifyHelper {
        if (!DYNotifyHelper.mInstance) {
            DYNotifyHelper.mInstance = new DYNotifyHelper();
        }
        return DYNotifyHelper.mInstance;
    }
    private static mInstance;
    private mHandlers = {};

    public regObserver(eventName: string, handler: Function, target: any) {
        var tHandlerList = this.mHandlers[eventName];
        if (!tHandlerList) {
            tHandlerList = [];
            this.mHandlers[eventName] = tHandlerList;
        }

        for (var i = 0; i < tHandlerList.length; ++i) {
            if (!tHandlerList[i]) {
                tHandlerList.handler = handler;
                tHandlerList.target = target;
                return i;
            }
        }

        tHandlerList.push({ handler: handler, target: target });
        return tHandlerList.length;
    };

    public unregObserver(eventName: string, handler: Function, target: any) {
        console.log(this.mHandlers);
        var tHandlerList = this.mHandlers[eventName];
        if (!tHandlerList) {
            return;
        }

        for (var i = 0; i < tHandlerList.length; ++i) {
            if (tHandlerList[i].handler === handler && tHandlerList[i].target === target) {
                tHandlerList.splice(i, 1);
                break;
            }
        }
    }

    public removeAllObservers(target: any) {
        for (var eventName in this.mHandlers) {
            var tHandlerList = this.mHandlers[eventName];
            for (var i = 0; i < tHandlerList.length; ++i) {
                if (tHandlerList[i].target === target) {
                    tHandlerList.splice(i, 1);
                }
            }
        }
    }

    public onNotify(eventName: string, data: any) {
        var tHandlerList = this.mHandlers[eventName];
        if (!tHandlerList) {
            return;
        }

        for (var i = 0; i < tHandlerList.length; ++i) {
            var handler = tHandlerList[i].handler;
            var target = tHandlerList[i].target;
            if (handler) {
                try {
                    if (target) {
                        handler.call(target, target, eventName, data);
                    } else {
                        handler.call(data, target, eventName);
                    }
                } catch (e) {
                    cc.log(e)
                }
            }
        }
    }
}

