"use strict";
cc._RF.push(module, '422f3WDM15Ah7zvZVNTstR2', 'DataRoom');
// scripts/app/module/data/mod/DataRoom.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DataRoom = /** @class */ (function () {
    function DataRoom() {
        this.currentRoom = 0;
        this.redId = 0;
        this.bluId = 0;
        this.playCount = 0; // 玩几局了
        this.roomOwner = 0;
        this.roomType = 0;
        this.enterRoomConfirm = false;
    }
    Object.defineProperty(DataRoom.prototype, "PlayCount", {
        get: function () {
            return this.playCount;
        },
        enumerable: true,
        configurable: true
    });
    DataRoom.prototype.incPlayCount = function () {
        this.playCount += 1;
    };
    Object.defineProperty(DataRoom.prototype, "RoomOwner", {
        get: function () {
            return this.roomOwner;
        },
        set: function (value) {
            this.roomOwner = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "RoomType", {
        get: function () {
            return this.roomType;
        },
        set: function (value) {
            this.roomType = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "OpponentId", {
        // 对手的Id
        get: function () {
            if (!this.opponentPlaymate) {
                return 0;
            }
            return this.opponentPlaymate.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "OpponentName", {
        // 对手的名字
        get: function () {
            if (!this.opponentPlaymate) {
                return "";
            }
            return this.opponentPlaymate.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "OpponentHeadUrl", {
        // 对手的头像url
        get: function () {
            if (!this.opponentPlaymate) {
                return "";
            }
            return this.opponentPlaymate.headImg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "OpponentSex", {
        // 对手的性别 add
        get: function () {
            if (!this.opponentPlaymate) {
                return -1;
            }
            return this.opponentPlaymate.sex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "EnterRoomConfirm", {
        // 进入房间确认
        get: function () {
            return this.enterRoomConfirm;
        },
        set: function (value) {
            this.enterRoomConfirm = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataRoom.prototype, "OpponentStar", {
        // 对手的积分
        get: function () {
            if (!this.opponentPlaymate) {
                return 0;
            }
            return this.opponentPlaymate.star;
        },
        enumerable: true,
        configurable: true
    });
    return DataRoom;
}());
exports.default = DataRoom;

cc._RF.pop();