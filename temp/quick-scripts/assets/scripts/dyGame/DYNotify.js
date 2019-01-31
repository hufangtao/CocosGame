(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/dyGame/DYNotify.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '35388pEvrdEWrnyWx3wzbjK', 'DYNotify', __filename);
// scripts/dyGame/DYNotify.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYNotify = /** @class */ (function () {
    function DYNotify() {
    }
    DYNotify.regObserver = function (eventName, handler, target) {
        DYNotifyHelper.theInstance.regObserver(eventName, handler, target);
    };
    DYNotify.unregObserver = function (eventName, handler, target) {
        DYNotifyHelper.theInstance.unregObserver(eventName, handler, target);
    };
    DYNotify.removeAllObservers = function (target) {
        DYNotifyHelper.theInstance.removeAllObservers(target);
    };
    DYNotify.post = function (eventName, data) {
        DYNotifyHelper.theInstance.onNotify(eventName, data);
    };
    return DYNotify;
}());
exports.DYNotify = DYNotify;
var DYNotifyHelper = /** @class */ (function () {
    function DYNotifyHelper() {
        this.mHandlers = {};
    }
    Object.defineProperty(DYNotifyHelper, "theInstance", {
        get: function () {
            if (!DYNotifyHelper.mInstance) {
                DYNotifyHelper.mInstance = new DYNotifyHelper();
            }
            return DYNotifyHelper.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DYNotifyHelper.prototype.regObserver = function (eventName, handler, target) {
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
    ;
    DYNotifyHelper.prototype.unregObserver = function (eventName, handler, target) {
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
    };
    DYNotifyHelper.prototype.removeAllObservers = function (target) {
        for (var eventName in this.mHandlers) {
            var tHandlerList = this.mHandlers[eventName];
            for (var i = 0; i < tHandlerList.length; ++i) {
                if (tHandlerList[i].target === target) {
                    tHandlerList.splice(i, 1);
                }
            }
        }
    };
    DYNotifyHelper.prototype.onNotify = function (eventName, data) {
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
                    }
                    else {
                        handler.call(data, target, eventName);
                    }
                }
                catch (e) {
                    cc.log(e);
                }
            }
        }
    };
    return DYNotifyHelper;
}());

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
        //# sourceMappingURL=DYNotify.js.map
        