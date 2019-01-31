(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/game/PlayNetHandler.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3ae56qM7ahE+bEUsHOpW8wa', 'PlayNetHandler', __filename);
// scripts/app/component/game/PlayNetHandler.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoSectionPlay_1 = require("../../common/net/proto/mods/ProtoSectionPlay");
var ProtoSectionRoom_1 = require("../../common/net/proto/mods/ProtoSectionRoom");
var ProtoDispatcher_1 = require("../../common/net/proto/ProtoDispatcher");
var PlayManager_1 = require("./PlayManager");
var ProtoSectionRank_1 = require("../../common/net/proto/mods/ProtoSectionRank");
var Message_1 = require("../../common/Message");
var DYNotify_1 = require("../../../dyGame/DYNotify");
var PlayNetHandler = /** @class */ (function () {
    function PlayNetHandler() {
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlaySaveAnimalS2C.EVENT_NAME, this.onSaveAnimalResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayGenBlockS2C.EVENT_NAME, this.onGenBlockResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayReadyS2C.EVENT_NAME, this.onReadyResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayNewRoundS2C.EVENT_NAME, this.onNewRoundResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayContinueS2C.EVENT_NAME, this.onContinueResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayNewPhaseS2C.EVENT_NAME, this.onNewPhaseResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayStartPveS2C.EVENT_NAME, this.onStartPve, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayActiveBuffS2C.EVENT_NAME, this.onActiveBuffResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayStolenAnimalS2C.EVENT_NAME, this.onStolenAnimalResponse, this);
        ProtoDispatcher_1.PlayDispatcher.on(ProtoSectionPlay_1.PlayBoardStatusS2C.EVENT_NAME, this.onBoardStatusResponse, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomReadyTimeoutS2C.EVENT_NAME, this.onReadyTimeout, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomPlayFinishS2C.EVENT_NAME, this.onPlayFinish, this);
        ProtoDispatcher_1.RoomDispatcher.on(ProtoSectionRoom_1.RoomOpponentLeaveS2C.EVENT_NAME, this.onOpponentLeave, this);
        ProtoDispatcher_1.RankDispatcher.on(ProtoSectionRank_1.RankPveRankS2C.EVENT_NAME, this.onPveRankDataReceived, this);
    }
    PlayNetHandler.prototype.onSaveAnimalResponse = function (message) {
        var sveAnimalS2C = message;
        PlayManager_1.default.INSTANCE.getAnimalResponse(sveAnimalS2C);
    };
    PlayNetHandler.prototype.onGenBlockResponse = function (message) {
        var genBlockS2C = message;
        PlayManager_1.default.INSTANCE.genBlockResponse(genBlockS2C);
    };
    PlayNetHandler.prototype.onReadyResponse = function (message) {
        var playReadyS2C = message;
        PlayManager_1.default.INSTANCE.onReadyResponse(playReadyS2C);
    };
    PlayNetHandler.prototype.onContinueResponse = function (message) {
        var playContinueS2C = message;
        PlayManager_1.default.INSTANCE.onContinueResponse(playContinueS2C);
    };
    PlayNetHandler.prototype.onNewRoundResponse = function (message) {
        var newRoundS2C = message;
        PlayManager_1.default.INSTANCE.newRound(newRoundS2C);
    };
    PlayNetHandler.prototype.onNewPhaseResponse = function (message) {
        var newPhaseS2C = message;
        PlayManager_1.default.INSTANCE.newPhase(newPhaseS2C);
    };
    PlayNetHandler.prototype.onStartPve = function (message) {
        var startPveS2C = message;
        PlayManager_1.default.INSTANCE.startPve(startPveS2C);
    };
    PlayNetHandler.prototype.onReadyTimeout = function (message) {
        // 此时提醒准备时间超时，
        PlayManager_1.default.INSTANCE.onBack();
    };
    // 一局结束
    PlayNetHandler.prototype.onPlayFinish = function (message) {
        var playResult = message;
        PlayManager_1.default.INSTANCE.onPlayFinish(playResult);
    };
    // 对手离开
    PlayNetHandler.prototype.onOpponentLeave = function (message) {
        var opponentLeave = message;
        //console.log("####################onOpponentLeave");
        if (!PlayManager_1.default.INSTANCE.PlayUI) {
            return;
        }
        PlayManager_1.default.INSTANCE.onOpponentLeave();
    };
    PlayNetHandler.prototype.onPveRankDataReceived = function (message) {
        var rankData = message;
        // Home.PveRank = new PveDataRank();
        // Home.PveRank.GlobalRankData = rankData.playmates;
        // Home.PveRank.MyRank = rankData.myPos;
        cc.log('RANK_RESULT');
        DYNotify_1.DYNotify.post(Message_1.Message.RANK_RESULT, rankData);
    };
    PlayNetHandler.prototype.onActiveBuffResponse = function (message) {
        var buffData = message;
        PlayManager_1.default.INSTANCE.onActiveBuff(buffData);
    };
    PlayNetHandler.prototype.onStolenAnimalResponse = function (message) {
        var stolenAnimalData = message;
        PlayManager_1.default.INSTANCE.onStolenAnimal(stolenAnimalData);
    };
    PlayNetHandler.prototype.onBoardStatusResponse = function (message) {
        var playBoardStatus = message;
        PlayManager_1.default.INSTANCE.onBoardStatusResponse(playBoardStatus);
    };
    return PlayNetHandler;
}());
exports.default = PlayNetHandler;

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
        //# sourceMappingURL=PlayNetHandler.js.map
        