(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/Animation.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '3a42fZUrAROfqhkBrqUX/8K', 'Animation', __filename);
// scripts/app/component/Animation.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ConfigVO = require("../common/config/vo/ConfigVO");
var Loader_1 = require("../common/loader/Loader");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation_1 = Animation;
    Animation.NewAnimation = function (animId, loadTimeout) {
        if (loadTimeout === void 0) { loadTimeout = 5; }
        return __awaiter(this, void 0, void 0, function () {
            var p;
            return __generator(this, function (_a) {
                p = new Promise(function (resolve, reject) {
                    var animationVo = ConfigVO.Animation.get(animId);
                    if (!animationVo) {
                        cc.warn("load animation:" + animId + " config not exist");
                        resolve(null);
                        return;
                    }
                    // 设定加载超时 如果在指定时间内不能加载完成 则返回null
                    var timerId = setTimeout(function () {
                        resolve(null);
                    }, loadTimeout * 1000);
                    var animationPath = Animation_1.ANIMATION_PATH + animationVo.res;
                    Loader_1.default.loadSpriteAtlas(animationPath, function (err, atlas) {
                        clearTimeout(timerId);
                        if (!err) {
                            var animNode = new cc.Node();
                            animNode.addComponent(cc.Animation);
                            animNode.addComponent(Animation_1);
                            var sprite = animNode.addComponent(cc.Sprite);
                            var animationName = animationVo.res;
                            var animationFrameCount = animationVo.frames;
                            var animationPlayTimes = animationVo.times;
                            var animation = animNode.getComponent(Animation_1);
                            var ccAnimation = animNode.getComponent(cc.Animation);
                            var frames = [];
                            for (var i = 0; i < animationFrameCount; i++) {
                                var frameName = Animation_1.ANIMATION_FRAME_PREFIX + animationName + "-" + (i + 1);
                                var frame = atlas.getSpriteFrame(frameName);
                                frames.push(frame);
                            }
                            sprite.spriteFrame = frames[0];
                            var clip = cc.AnimationClip.createWithSpriteFrames(frames, 10);
                            clip.name = animationName;
                            clip.wrapMode = cc.WrapMode.Loop;
                            ccAnimation.addClip(clip);
                            animation.config(animationName, animationFrameCount, animationPlayTimes);
                            animation.init(); // xlchen add 将本应该在onLoad中的代码移到init中，原因是onLoad有时不会被调，还未查到原因
                            resolve(animation);
                        }
                        else {
                            cc.warn("load animation:" + animId + " err:" + err);
                            resolve(null);
                        }
                    });
                });
                return [2 /*return*/, p];
            });
        });
    };
    Animation.prototype.onDestroy = function () {
        /*
        this.ccAnimation.off("play",      this.onAnimationPlay, this);
        this.ccAnimation.off("stop",      this.onAnimationStop, this);
        this.ccAnimation.off("lastframe", this.onAnimationLastFrame, this);
        this.ccAnimation.off("finished",  this.onAnimationFinished, this);
        this.ccAnimation.off("pause",     this.onAnimationPause, this);
        this.ccAnimation.off("resume",    this.onAnimationResume, this);
        */
    };
    Animation.prototype.onLoad = function () {
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
    };
    Animation.prototype.init = function () {
        this.ccAnimation = this.node.getComponent(cc.Animation);
        var animationState = this.ccAnimation.getAnimationState(this.animName);
        if (!!animationState) {
            if (this.playTimes === 0) {
                animationState.wrapMode = cc.WrapMode.Loop;
                animationState.repeatCount = Infinity;
            }
            else {
                animationState.wrapMode = cc.WrapMode.Loop;
                animationState.repeatCount = this.playTimes;
            }
        }
    };
    Animation.prototype.dispose = function () {
        this.node.destroy();
    };
    Animation.prototype.start = function () {
    };
    Animation.prototype.play = function () {
        // //console.log("play animation", this.animName);
        this.ccAnimation.play(this.animName);
    };
    Object.defineProperty(Animation.prototype, "CCAnimation", {
        get: function () {
            return this.ccAnimation;
        },
        enumerable: true,
        configurable: true
    });
    Animation.prototype.config = function (name, frameCount, playTimes) {
        this.animName = name;
        this.frameCount = frameCount;
        this.playTimes = playTimes;
    };
    Animation.prototype.onAnimationPlay = function () {
        //console.log("#### animation => onAnimationPlay");
    };
    Animation.prototype.onAnimationStop = function () {
        //console.log("#### animation => onAnimationStop");
    };
    Animation.prototype.onAnimationLastFrame = function () {
        //console.log("#### animation => onAnimationLastFrame");
    };
    Animation.prototype.onAnimationFinished = function () {
        //console.log("#### animation => onAnimationFinished");
    };
    Animation.prototype.onAnimationPause = function () {
        //console.log("#### animation => onAnimationPause");
    };
    Animation.prototype.onAnimationResume = function () {
        //console.log("#### animation => onAnimationResume");
    };
    Animation.ANIMATION_PATH = "res/anim/";
    Animation.ANIMATION_FRAME_PREFIX = "anim-";
    Animation = Animation_1 = __decorate([
        ccclass
    ], Animation);
    return Animation;
    var Animation_1;
}(cc.Component));
exports.default = Animation;

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
        //# sourceMappingURL=Animation.js.map
        