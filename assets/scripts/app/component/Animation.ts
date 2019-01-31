import { IAnimation } from "../common/Misc";
import * as ConfigVO from "../common/config/vo/ConfigVO";
import ResLoader from "../common/loader/Loader";

const {ccclass, property} = cc._decorator;
@ccclass
export default class Animation extends cc.Component implements IAnimation {
  public static ANIMATION_PATH: string = "res/anim/";
  public static ANIMATION_FRAME_PREFIX: string = "anim-";

  public static async NewAnimation(animId: number, loadTimeout: number = 5): Promise<Animation> {
    const p = new Promise<Animation>((resolve, reject) => {
      const animationVo: ConfigVO.IAnimationVO = ConfigVO.Animation.get(animId);
      if (!animationVo) {
        cc.warn(`load animation:${animId} config not exist`);
        resolve(null);
        return;
      }
      // 设定加载超时 如果在指定时间内不能加载完成 则返回null
      const timerId = setTimeout(() => {
        resolve(null);
      }, loadTimeout * 1000);
      const animationPath = Animation.ANIMATION_PATH + animationVo.res;
      ResLoader.loadSpriteAtlas(animationPath, function(err, atlas: cc.SpriteAtlas) {
        clearTimeout(timerId);
        if (!err) {
          const animNode: cc.Node = new cc.Node();
          animNode.addComponent(cc.Animation);
          animNode.addComponent(Animation);
          const sprite = animNode.addComponent(cc.Sprite);

          const animationName = animationVo.res;
          const animationFrameCount = animationVo.frames;
          const animationPlayTimes = animationVo.times;

          const animation: Animation = animNode.getComponent(Animation);
          const ccAnimation: cc.Animation = animNode.getComponent(cc.Animation);
          const frames: cc.SpriteFrame[] = [];
          for (let i = 0;  i < animationFrameCount; i++) {
            const frameName = Animation.ANIMATION_FRAME_PREFIX + animationName + "-" + (i + 1);
            const frame = atlas.getSpriteFrame(frameName);
            frames.push(frame);
          }
          sprite.spriteFrame = frames[0];
          const clip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
          clip.name = animationName;
          clip.wrapMode = cc.WrapMode.Loop;
          ccAnimation.addClip(clip);

          animation.config(animationName, animationFrameCount, animationPlayTimes);
          animation.init();   // xlchen add 将本应该在onLoad中的代码移到init中，原因是onLoad有时不会被调，还未查到原因
          resolve(animation);
        } else {
          cc.warn(`load animation:${animId} err:${err}`);
          resolve(null);
        }
      });
    });
    return p;
  }


  private ccAnimation: cc.Animation;
  private animName: string;
  private frameCount: number;
  private playTimes: number;

  public onDestroy() {
    /*
    this.ccAnimation.off("play",      this.onAnimationPlay, this);
    this.ccAnimation.off("stop",      this.onAnimationStop, this);
    this.ccAnimation.off("lastframe", this.onAnimationLastFrame, this);
    this.ccAnimation.off("finished",  this.onAnimationFinished, this);
    this.ccAnimation.off("pause",     this.onAnimationPause, this);
    this.ccAnimation.off("resume",    this.onAnimationResume, this);
    */
  }

  public onLoad() {
    // this.ccAnimation = this.node.getComponent(cc.Animation);
    // /*
    // this.ccAnimation.on("play",      this.onAnimationPlay, this);
    // this.ccAnimation.on("stop",      this.onAnimationStop, this);
    // this.ccAnimation.on("lastframe", this.onAnimationLastFrame, this);
    // this.ccAnimation.on("finished",  this.onAnimationFinished, this);
    // this.ccAnimation.on("pause",     this.onAnimationPause, this);
    // this.ccAnimation.on("resume",    this.onAnimationResume, this);
    // */
    // const animationState = this.ccAnimation.getAnimationState(this.animName);
    // if (!!animationState) {
    //   if (this.playTimes === 0) {
    //     animationState.wrapMode = cc.WrapMode.Loop;
    //     animationState.repeatCount = Infinity;
    //   } else {
    //     animationState.wrapMode = cc.WrapMode.Loop;
    //     animationState.repeatCount = this.playTimes;
    //   }
    // }
  }

  public init() {
    this.ccAnimation = this.node.getComponent(cc.Animation);
    const animationState = this.ccAnimation.getAnimationState(this.animName);
    if (!!animationState) {
      if (this.playTimes === 0) {
        animationState.wrapMode = cc.WrapMode.Loop;
        animationState.repeatCount = Infinity;
      } else {
        animationState.wrapMode = cc.WrapMode.Loop;
        animationState.repeatCount = this.playTimes;
      }
    }
  }

  public dispose() {
    this.node.destroy();
  }

  public start() {
  }

  public play() {
    // //console.log("play animation", this.animName);
    this.ccAnimation.play(this.animName);
  }

  public get CCAnimation(): cc.Animation {
    return this.ccAnimation;
  }

  public config(name: string, frameCount: number, playTimes: number) {
    this.animName = name;
    this.frameCount = frameCount;
    this.playTimes = playTimes;
  }

  private onAnimationPlay() {
    //console.log("#### animation => onAnimationPlay");
  }
  private onAnimationStop() {
    //console.log("#### animation => onAnimationStop");
  }
  private onAnimationLastFrame() {
    //console.log("#### animation => onAnimationLastFrame");
  }
  private onAnimationFinished() {
    //console.log("#### animation => onAnimationFinished");
  }
  private onAnimationPause() {
    //console.log("#### animation => onAnimationPause");
  }
  private onAnimationResume() {
    //console.log("#### animation => onAnimationResume");
  }
}
