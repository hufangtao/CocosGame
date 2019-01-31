"use strict";
cc._RF.push(module, 'c824cc4CipG57EyzmjQQ4UL', 'Audio');
// scripts/app/component/game/Audio.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYAudio_1 = require("../../../dyGame/DYAudio");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Audio = /** @class */ (function (_super) {
    __extends(Audio, _super);
    function Audio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.audBg = null;
        _this.audMatch = null;
        _this.audBomb_row = null;
        _this.audBomb_around = null;
        _this.audBomb_magnet = null;
        _this.audSpawn_Bomb = null;
        _this.audDrop = null;
        _this.audCountDown = null;
        _this.audTimeEnd = null;
        _this.audBonusTime = null;
        _this.audVictory = null;
        _this.audLose = null;
        _this.audCollect = null;
        _this.audBuff1 = null;
        _this.audBuff2 = null;
        _this.audBuff3 = null;
        _this.audBuff4 = null;
        _this.audGiveFlower = null;
        _this.audDestroyFlower = null;
        _this.audDestroyBottle = null;
        _this.audDestroyBug = null;
        _this.audGood = null;
        _this.audGreat = null;
        _this.audExcellent = null;
        _this.audAmazing = null;
        _this.audUnbelievable = null;
        _this.audReadyGo = null;
        _this.audTrick = null;
        _this.audMiss = null;
        _this.audOpponentMiss = null;
        _this.audRemaindTime = null;
        _this.audBuffInValid = null;
        _this.canPlayCollect = false;
        return _this;
    }
    Audio.prototype.playBg = function () {
        // DYAudioH.playBgm(this.audBg);
        this.tBgPve = DYAudio_1.default.playMusic(this.audBg, true);
    };
    Audio.prototype.stopBgPve = function () {
        DYAudio_1.default.stopMusic(this.tBgPve);
    };
    Audio.prototype.strip = function () {
        // DYAudioH.playEffect(this.audMatch);
        // let index = Math.floor(Math.random() * this.audMatchs.length)
        // DYAudio.playEffect(this.audMatchs[index],false);
        DYAudio_1.default.playEffect(this.audMatch, false);
    };
    Audio.prototype.bombRow = function () {
        // DYAudioH.playEffect(this.audBomb_row);
        DYAudio_1.default.playEffect(this.audBomb_row, false);
    };
    Audio.prototype.bombAround = function () {
        //console.log('bombAround');
        // DYAudioH.playEffect(this.audBomb_around);
        DYAudio_1.default.playEffect(this.audBomb_around, false);
    };
    Audio.prototype.bombMagnet = function () {
        // DYAudioH.playEffect(this.audBomb_magnet);
        DYAudio_1.default.playEffect(this.audBomb_magnet, false);
    };
    Audio.prototype.spawnBomb = function () {
        // DYAudioH.playEffect(this.audSpawn_Bomb);
        DYAudio_1.default.playEffect(this.audSpawn_Bomb, false);
    };
    Audio.prototype.drop = function () {
        // DYAudioH.playEffect(this.audDrop);
        DYAudio_1.default.playEffect(this.audDrop, false);
    };
    Audio.prototype.countDownAudio = function () {
        // DYAudioH.playEffect(this.audCountDown);
        DYAudio_1.default.playEffect(this.audCountDown, false);
    };
    Audio.prototype.timeEndAudio = function () {
        // DYAudioH.playEffect(this.audTimeEnd);
        DYAudio_1.default.playEffect(this.audTimeEnd, false);
    };
    Audio.prototype.collect = function () {
        var _this = this;
        if (this.canPlayCollect) {
            return;
        }
        this.canPlayCollect = true;
        // DYAudioH.playEffect(this.audCollect);
        DYAudio_1.default.playEffect(this.audCollect, false);
        this.scheduleOnce(function () {
            _this.canPlayCollect = false;
        }, 1);
    };
    Audio.prototype.victory = function () {
        // DYAudioH.playEffect(this.audVictory);
        DYAudio_1.default.playMusic(this.audVictory, false);
    };
    Audio.prototype.lose = function () {
        // DYAudioH.playEffect(this.audLose);
        DYAudio_1.default.playMusic(this.audLose, false);
    };
    Audio.prototype.buff1 = function () {
        DYAudio_1.default.playEffect(this.audBuff1, false);
    };
    Audio.prototype.buff2 = function () {
        DYAudio_1.default.playEffect(this.audBuff2, false);
    };
    Audio.prototype.buff3 = function () {
        DYAudio_1.default.playEffect(this.audBuff3, false);
    };
    Audio.prototype.buff4 = function () {
        DYAudio_1.default.playEffect(this.audBuff4, false);
    };
    Audio.prototype.flower = function () {
        DYAudio_1.default.playEffect(this.audGiveFlower, false);
    };
    Audio.prototype.destroyFlower = function () {
        DYAudio_1.default.playEffect(this.audDestroyFlower, false);
    };
    Audio.prototype.destroyBottle = function () {
        DYAudio_1.default.playEffect(this.audDestroyBottle, false);
    };
    Audio.prototype.destroyBug = function () {
        DYAudio_1.default.playEffect(this.audDestroyBug, false);
    };
    Audio.prototype.good = function () {
        DYAudio_1.default.playEffect(this.audGood, false);
    };
    Audio.prototype.great = function () {
        DYAudio_1.default.playEffect(this.audGreat, false);
    };
    Audio.prototype.excellent = function () {
        DYAudio_1.default.playEffect(this.audExcellent, false);
    };
    Audio.prototype.amazing = function () {
        DYAudio_1.default.playEffect(this.audAmazing, false);
    };
    Audio.prototype.unbelievable = function () {
        DYAudio_1.default.playEffect(this.audUnbelievable, false);
    };
    Audio.prototype.readyGo = function () {
        DYAudio_1.default.playEffect(this.audReadyGo, false);
    };
    Audio.prototype.trick = function () {
        DYAudio_1.default.playEffect(this.audTrick, false);
    };
    Audio.prototype.miss = function () {
        DYAudio_1.default.playEffect(this.audMiss, false);
    };
    Audio.prototype.opponentMiss = function () {
        DYAudio_1.default.playEffect(this.audOpponentMiss, false);
    };
    Audio.prototype.remaindTime = function () {
        DYAudio_1.default.playEffect(this.audRemaindTime, false);
    };
    Audio.prototype.bonusTime = function () {
        this.tBonusTime = DYAudio_1.default.playMusic(this.audBonusTime, true);
    };
    Audio.prototype.stopBonusTime = function () {
        DYAudio_1.default.stopMusic(this.tBonusTime);
    };
    Audio.prototype.buffInValid = function () {
        DYAudio_1.default.playEffect(this.audBuffInValid, false);
    };
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBg", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audMatch", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBomb_row", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBomb_around", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBomb_magnet", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audSpawn_Bomb", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audDrop", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audCountDown", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audTimeEnd", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBonusTime", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audVictory", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audLose", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audCollect", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBuff1", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBuff2", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBuff3", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBuff4", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audGiveFlower", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audDestroyFlower", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audDestroyBottle", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audDestroyBug", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audGood", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audGreat", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audExcellent", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audAmazing", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audUnbelievable", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audReadyGo", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audTrick", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audMiss", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audOpponentMiss", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audRemaindTime", void 0);
    __decorate([
        property({ type: cc.AudioClip })
    ], Audio.prototype, "audBuffInValid", void 0);
    Audio = __decorate([
        ccclass
    ], Audio);
    return Audio;
}(cc.Component));
exports.default = Audio;

cc._RF.pop();