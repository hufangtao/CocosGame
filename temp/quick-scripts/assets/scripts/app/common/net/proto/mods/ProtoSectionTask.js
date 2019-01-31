(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/proto/mods/ProtoSectionTask.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '93c416Xvp1Heb8//L4T4KKo', 'ProtoSectionTask', __filename);
// scripts/app/common/net/proto/mods/ProtoSectionTask.ts

// Auto Generated. Please don't change manually!
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../NetByteArray.ts">
var NetByteArray_1 = require("../../NetByteArray");
var ProtoType = require("../ProtoType");
var TaskListC2S = /** @class */ (function () {
    function TaskListC2S() {
        this.MSG_ID = 4097;
    }
    TaskListC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return TaskListC2S;
}());
exports.TaskListC2S = TaskListC2S;
var TaskGainAwardC2S = /** @class */ (function () {
    function TaskGainAwardC2S() {
        this.MSG_ID = 4099;
    }
    TaskGainAwardC2S.prototype.encode = function () {
        var byteArray = new NetByteArray_1.ByteArray();
        byteArray.writeUnsignedShort(0);
        byteArray.writeByte(0);
        byteArray.writeUnsignedShort(this.MSG_ID);
        byteArray.writeUnsignedInt(this.id);
        byteArray.position = 0;
        byteArray.writeUnsignedShort(byteArray.length - 2);
        return byteArray;
    };
    return TaskGainAwardC2S;
}());
exports.TaskGainAwardC2S = TaskGainAwardC2S;
var TaskListS2C = /** @class */ (function () {
    function TaskListS2C() {
    }
    TaskListS2C.decode = function (byteArray) {
        var obj = new TaskListS2C();
        var len;
        obj.task = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.task.push(ProtoType.PTask.decode(byteArray));
        }
        return obj;
    };
    TaskListS2C.EVENT_NAME = "TaskListS2C";
    return TaskListS2C;
}());
exports.TaskListS2C = TaskListS2C;
var TaskUpdateS2C = /** @class */ (function () {
    function TaskUpdateS2C() {
    }
    TaskUpdateS2C.decode = function (byteArray) {
        var obj = new TaskUpdateS2C();
        var len;
        obj.task = new Array();
        len = byteArray.readShort();
        for (var i = 0; i < len; i++) {
            obj.task.push(ProtoType.PTask.decode(byteArray));
        }
        return obj;
    };
    TaskUpdateS2C.EVENT_NAME = "TaskUpdateS2C";
    return TaskUpdateS2C;
}());
exports.TaskUpdateS2C = TaskUpdateS2C;
var TaskGainAwardS2C = /** @class */ (function () {
    function TaskGainAwardS2C() {
    }
    TaskGainAwardS2C.decode = function (byteArray) {
        var obj = new TaskGainAwardS2C();
        return obj;
    };
    TaskGainAwardS2C.EVENT_NAME = "TaskGainAwardS2C";
    return TaskGainAwardS2C;
}());
exports.TaskGainAwardS2C = TaskGainAwardS2C;

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
        //# sourceMappingURL=ProtoSectionTask.js.map
        