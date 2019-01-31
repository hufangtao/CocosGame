/**
 * 统一的音效管理器
 */
export default class DYAudioH {
  public static playBgm(url) {
    DYAudioHHelper.Instance.playBgm(url);
  }

  public static playEffect(url) {
    DYAudioHHelper.Instance.playEffect(url);
  }
}

class DYAudioHHelper {
  public static myInstance: DYAudioHHelper;
  public static get Instance() {
    if (!DYAudioHHelper.myInstance) {
      DYAudioHHelper.myInstance = new DYAudioHHelper();
    }
    return DYAudioHHelper.myInstance;
  }

  bgmAudio;
  effectMap = [];

  constructor() {
    this.bgmAudio = new Audio()
    this.bgmAudio.loop = true
  }

  playBgm(url) {
    if (cc.loader.md5Pipe) {
      url = cc.loader.md5Pipe.transformURL(url);
    }
    var src = this.bgmAudio.src.substring(this.bgmAudio.src.length - url.length);
    if (url == src) {
      return;
    }
    this.bgmAudio.currentTime = 0
    if (Partner.CDN_HOST) {
      url = Partner.CDN_HOST + url;
    }
    this.bgmAudio.src = url;
    // this.bgmAudio.src = cc.url.raw(url);
    this.bgmAudio.play();
  }

  playEffect(url) {
    var effectAudio = new Audio();
    if (cc.loader.md5Pipe) {
      url = cc.loader.md5Pipe.transformURL(url);
    }
    if (Partner.CDN_HOST) {
      url = Partner.CDN_HOST + url;
    }
    effectAudio.src = url;
    effectAudio.currentTime = 0
    effectAudio.play();
  }
}
