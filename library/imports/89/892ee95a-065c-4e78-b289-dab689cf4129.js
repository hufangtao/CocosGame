"use strict";
cc._RF.push(module, '892eelaBlxOeLKJ2raJz0Ep', 'EventDispatcher');
// scripts/app/common/event/EventDispatcher.ts

Object.defineProperty(exports, "__esModule", { value: true });
var EventDispatcher = /** @class */ (function () {
    function EventDispatcher(node) {
        if (node) {
            this.coreNode = node;
        }
    }
    Object.defineProperty(EventDispatcher.prototype, "node", {
        get: function () {
            return this.coreNode;
        },
        set: function (value) {
            this.coreNode = value;
        },
        enumerable: true,
        configurable: true
    });
    EventDispatcher.prototype.emit = function (message, detail) {
        if (this.coreNode) {
            this.coreNode.emit(message, detail);
        }
    };
    EventDispatcher.prototype.on = function (type, callback, target, useCapture) {
        if (this.coreNode) {
            this.coreNode.on(type, callback, target, useCapture);
        }
    };
    EventDispatcher.prototype.off = function (type, callback, target, useCapture) {
        this.coreNode.off(type, callback, target, useCapture);
    };
    return EventDispatcher;
}());
exports.default = EventDispatcher;

cc._RF.pop();