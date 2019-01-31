(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/module/data/mod/DataPlay.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '80a7dDDi/JBOJ7IsAtJn0j9', 'DataPlay', __filename);
// scripts/app/module/data/mod/DataPlay.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules = require("../../Modules");
var PlayDefine_1 = require("../../../component/game/PlayDefine");
var DataPlay = /** @class */ (function () {
    function DataPlay() {
        // public redSidePlayerId: number;
        // public bluSidePlayerId: number;
        // public enterRoomConfirm: boolean = false;
        // public playRoomId: number;
        // public opponentPlaymate: PPlaymate;
        // public redId: number;
        // public bluId: number;
        this.phase = 1;
    }
    Object.defineProperty(DataPlay.prototype, "colorNum", {
        get: function () {
            return PlayDefine_1.PHASE[this.phase - 1].color_num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "Phase", {
        get: function () {
            return this.phase;
        },
        set: function (value) {
            this.phase = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "CurRoundId", {
        get: function () {
            return this.curRoundId;
        },
        set: function (value) {
            this.curRoundId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "CurRoomId", {
        get: function () {
            return Modules.Home.DataRoom.currentRoom;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "CurOperatorId", {
        get: function () {
            return this.curOperatorId;
        },
        set: function (value) {
            this.curOperatorId = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "CurOperatorSide", {
        get: function () {
            if (this.curOperatorId === this.BluSideId) {
                return PlayDefine_1.PlaySide.BLU;
            }
            if (this.curOperatorId === this.RedSideId) {
                return PlayDefine_1.PlaySide.RED;
            }
            return PlayDefine_1.PlaySide.UNKNOWN;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "MySide", {
        get: function () {
            if (Modules.Acc.PlayerId === this.BluSideId) {
                return PlayDefine_1.PlaySide.BLU;
            }
            return PlayDefine_1.PlaySide.RED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "AiSide", {
        get: function () {
            if (Modules.Acc.PlayerId === this.BluSideId) {
                return PlayDefine_1.PlaySide.RED;
            }
            return PlayDefine_1.PlaySide.BLU;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "MyName", {
        get: function () {
            return Modules.Home.PlayerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "MyId", {
        get: function () {
            return Modules.Home.PlayerId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "showHeadImg", {
        get: function () {
            return Modules.Home.PlayerHeadUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "OpponentSide", {
        get: function () {
            if (Modules.Home.OpponentId === this.BluSideId) {
                return PlayDefine_1.PlaySide.BLU;
            }
            return PlayDefine_1.PlaySide.RED;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "OpponentId", {
        get: function () {
            return Modules.Home.OpponentId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "OpponentName", {
        get: function () {
            return Modules.Home.OpponentName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "OpponentHeadUrl", {
        get: function () {
            return Modules.Home.OpponentHeadUrl;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "BluSideId", {
        get: function () {
            return Modules.Home.DataRoom.bluId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPlay.prototype, "RedSideId", {
        get: function () {
            return Modules.Home.DataRoom.redId;
        },
        enumerable: true,
        configurable: true
    });
    return DataPlay;
}());
exports.default = DataPlay;

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
        //# sourceMappingURL=DataPlay.js.map
        