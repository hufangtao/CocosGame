"use strict";
cc._RF.push(module, '5e7d8WiHlBHAaQqJD8zBjBx', 'DYAudioH');
// scripts/dyGame/DYAudioH.ts

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 统一的音效管理器
 */
var DYAudioH = /** @class */ (function () {
    function DYAudioH() {
    }
    DYAudioH.playBgm = function (url) {
        DYAudioHHelper.Instance.playBgm(url);
    };
    DYAudioH.playEffect = function (url) {
        DYAudioHHelper.Instance.playEffect(url);
    };
    return DYAudioH;
}());
exports.default = DYAudioH;
var DYAudioHHelper = /** @class */ (function () {
    function DYAudioHHelper() {
        this.effectMap = [];
        this.bgmAudio = new Audio();
        this.bgmAudio.loop = true;
    }
    Object.defineProperty(DYAudioHHelper, "Instance", {
        get: function () {
            if (!DYAudioHHelper.myInstance) {
                DYAudioHHelper.myInstance = new DYAudioHHelper();
            }
            return DYAudioHHelper.myInstance;
        },
        enumerable: true,
        configurable: true
    });
    DYAudioHHelper.prototype.playBgm = function (url) {
        if (cc.loader.md5Pipe) {
            url = cc.loader.md5Pipe.transformURL(url);
        }
        var src = this.bgmAudio.src.substring(this.bgmAudio.src.length - url.length);
        if (url == src) {
            return;
        }
        this.bgmAudio.currentTime = 0;
        if (Partner.CDN_HOST) {
            url = Partner.CDN_HOST + url;
        }
        this.bgmAudio.src = url;
        // this.bgmAudio.src = cc.url.raw(url);
        this.bgmAudio.play();
    };
    DYAudioHHelper.prototype.playEffect = function (url) {
        var effectAudio = new Audio();
        if (cc.loader.md5Pipe) {
            url = cc.loader.md5Pipe.transformURL(url);
        }
        if (Partner.CDN_HOST) {
            url = Partner.CDN_HOST + url;
        }
        effectAudio.src = url;
        effectAudio.currentTime = 0;
        effectAudio.play();
    };
    return DYAudioHHelper;
}());

cc._RF.pop();