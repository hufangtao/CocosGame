"use strict";
cc._RF.push(module, 'f78f4Q6Mh9PcJ/n3ZE51OPJ', 'DYAudio');
// scripts/dyGame/DYAudio.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYData_1 = require("./DYData");
var DYAudio = /** @class */ (function () {
    function DYAudio() {
    }
    DYAudio.playEffect = function (filePath, loop, volume) {
        if (volume === void 0) { volume = 1.0; }
        return DYAudioHelper.theInstance.playEffect(filePath, loop, volume);
    };
    DYAudio.playMusic = function (filePath, loop, volume) {
        if (volume === void 0) { volume = 1.0; }
        return DYAudioHelper.theInstance.playMusic(filePath, loop, volume);
    };
    DYAudio.stopMusic = function (audioId) {
        return DYAudioHelper.theInstance.stopMusic(audioId);
    };
    DYAudio.hasMusicPlaying = function () {
        return DYAudioHelper.theInstance.hasMusicPlaying();
    };
    // 独奏指定音效的处理: playTheEffect, stopTheEffect, getTheEffect
    DYAudio.playTheEffect = function (filePath, loop, volume) {
        DYAudioHelper.theInstance.playTheEffect(filePath, loop, volume);
    };
    DYAudio.stopTheEffect = function () {
        DYAudioHelper.theInstance.stopTheEffect();
    };
    DYAudio.getTheEffect = function () {
        return DYAudioHelper.theInstance.getTheEffect();
    };
    DYAudio.setLoop = function (audioId, loop) {
        cc.audioEngine.setLoop(audioId, loop);
    };
    DYAudio.isLoop = function (audioId) {
        return cc.audioEngine.isLoop(audioId);
    };
    DYAudio.setVolume = function (audioId, volume) {
        cc.audioEngine.setVolume(audioId, volume);
    };
    DYAudio.getVolume = function (audioId) {
        return cc.audioEngine.getVolume(audioId);
    };
    DYAudio.pause = function (audioId) {
        cc.audioEngine.pause(audioId);
    };
    DYAudio.resume = function (audioId) {
        DYAudioHelper.theInstance.resume(audioId);
    };
    DYAudio.pauseAll = function () {
        cc.audioEngine.pauseAll();
    };
    DYAudio.resumeAll = function () {
        DYAudioHelper.theInstance.resumeAll();
    };
    DYAudio.stop = function (audioId) {
        cc.audioEngine.stop(audioId);
    };
    DYAudio.stopAll = function () {
        DYAudioHelper.theInstance.stopAll();
    };
    DYAudio.getDuration = function (audioId) {
        return cc.audioEngine.getDuration(audioId);
    };
    DYAudio.getState = function (audioId) {
        return cc.audioEngine.getState(audioId);
    };
    DYAudio.setFinishCallback = function (audioId, callback) {
        cc.audioEngine.setFinishCallback(audioId, callback);
    };
    DYAudio.uncache = function (filePath) {
        cc.audioEngine.uncache(filePath);
    };
    DYAudio.uncacheAll = function () {
        cc.audioEngine.uncacheAll();
    };
    DYAudio.setMusicMute = function (flag) {
        DYAudioHelper.theInstance.setMusicMute(flag);
    };
    DYAudio.setSoundMute = function (flag) {
        DYAudioHelper.theInstance.setSoundMute(flag);
    };
    DYAudio.isMusicMute = function () {
        return DYAudioHelper.theInstance.isMusicMute();
    };
    DYAudio.isSoundMute = function () {
        return DYAudioHelper.theInstance.isSoundMute();
    };
    return DYAudio;
}());
exports.default = DYAudio;
var kMusicFlag = "5d88ad10-bb04-43c1-aeb7-332cd2ceb268";
var kSoundFlag = "14a4c65c-d25c-4867-a840-9ac3b0021d19";
var S_MUSIC_FLAG = false;
var S_SOUND_FLAG = false;
var DYAudioHelper = /** @class */ (function () {
    function DYAudioHelper() {
        this.mCurMusic = null;
        this.mCurMusicFile = null;
        this.mCurTheEffect = null;
        this.mMusicVol = 1.0;
        this.mSoundVol = 1.0;
    }
    Object.defineProperty(DYAudioHelper, "theInstance", {
        get: function () {
            if (!DYAudioHelper.mInstance) {
                DYAudioHelper.mInstance = new DYAudioHelper();
            }
            return DYAudioHelper.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DYAudioHelper.prototype.playEffect = function (filePath, loop, volume) {
        if (S_SOUND_FLAG || !filePath) {
            return;
        }
        this.mSoundVol = volume;
        return cc.audioEngine.play(filePath, loop, volume);
    };
    DYAudioHelper.prototype.playMusic = function (filePath, loop, volume) {
        var self = this;
        filePath = filePath || self.mCurMusicFile;
        if (self.isMusicMute() || !filePath) {
            return;
        }
        if (self.mCurMusic != null) {
            if (filePath == self.mCurMusicFile) {
                return;
            }
            self.stopMusic(self.mCurMusic);
        }
        this.mMusicVol = volume;
        self.mCurMusic = cc.audioEngine.play(filePath, loop, volume);
        self.mCurMusicFile = filePath;
        return self.mCurMusic;
    };
    DYAudioHelper.prototype.stopMusic = function (audioId) {
        var self = this;
        self.stopTheEffect();
        if (self.mCurMusic == null) {
            return;
        }
        audioId = audioId || self.mCurMusic;
        cc.audioEngine.stop(audioId);
        self.mCurMusic = null;
    };
    // 独奏指定音效的处理: playTheEffect, stopTheEffect, getTheEffect
    DYAudioHelper.prototype.playTheEffect = function (snd, loop, volume) {
        var self = this;
        if (self.isSoundMute()) {
            return;
        }
        if (!self.mCurTheEffect) {
            cc.audioEngine.pauseAll();
            self.mCurTheEffect = cc.audioEngine.play(snd, loop, volume);
        }
    };
    DYAudioHelper.prototype.stopTheEffect = function () {
        var self = this;
        if (!self.mCurTheEffect) {
            return;
        }
        cc.audioEngine.stop(self.mCurTheEffect);
        self.mCurTheEffect = null;
        self.resumeAll();
    };
    DYAudioHelper.prototype.getTheEffect = function () {
        return this.mCurTheEffect;
    };
    DYAudioHelper.prototype.resume = function (audioId) {
        if (S_MUSIC_FLAG) {
            return;
        }
        cc.audioEngine.resume(audioId);
    };
    DYAudioHelper.prototype.resumeAll = function () {
        if (S_MUSIC_FLAG) {
            return;
        }
        return cc.audioEngine.resumeAll();
    };
    DYAudioHelper.prototype.stopAll = function () {
        this.stopTheEffect();
        return cc.audioEngine.stopAll();
    };
    DYAudioHelper.prototype.setMusicMute = function (flag) {
        S_MUSIC_FLAG = flag;
        DYData_1.default.setStat(kMusicFlag, S_MUSIC_FLAG ? "TRUE" : "FALSE");
        if (flag) {
            this.playMusic(null, true, this.mMusicVol);
        }
        else {
            this.stopMusic(null);
        }
    };
    DYAudioHelper.prototype.setSoundMute = function (flag) {
        S_SOUND_FLAG = flag;
        DYData_1.default.setStat(kSoundFlag, S_SOUND_FLAG ? "TRUE" : "FALSE");
    };
    DYAudioHelper.prototype.hasMusicPlaying = function () {
        if (this.mCurMusic) {
            return true;
        }
        else {
            return false;
        }
    };
    DYAudioHelper.prototype.isMusicMute = function () {
        return S_MUSIC_FLAG;
    };
    DYAudioHelper.prototype.isSoundMute = function () {
        return S_SOUND_FLAG;
    };
    return DYAudioHelper;
}());

cc._RF.pop();