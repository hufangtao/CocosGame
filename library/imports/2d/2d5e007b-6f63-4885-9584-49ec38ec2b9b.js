"use strict";
cc._RF.push(module, '2d5e0B7b2NIhZWESew47Cub', 'DYLoader');
// scripts/dyGame/DYLoader.ts

Object.defineProperty(exports, "__esModule", { value: true });
var DYLoader = /** @class */ (function () {
    function DYLoader() {
    }
    DYLoader.loadRes = function (url, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        DYLoaderHelper.theInstance.loadRes(url, type, resolve);
                    })];
            });
        });
    };
    DYLoader.loadStaticRes = function (url, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        DYLoaderHelper.theInstance.loadStaticRes(url, type, resolve);
                    })];
            });
        });
    };
    DYLoader.preloadScene = function (sceneName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        DYLoaderHelper.theInstance.preloadScene(sceneName, resolve);
                    })];
            });
        });
    };
    DYLoader.releaseStaticRes = function (url) {
        DYLoaderHelper.theInstance.releaseStaticRes(url);
    };
    return DYLoader;
}());
exports.default = DYLoader;
var DYLoaderHelper = /** @class */ (function () {
    function DYLoaderHelper() {
    }
    Object.defineProperty(DYLoaderHelper, "theInstance", {
        get: function () {
            if (!DYLoaderHelper.mInstance) {
                DYLoaderHelper.mInstance = new DYLoaderHelper();
            }
            return DYLoaderHelper.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    // Boot 时的预加载: 
    // 这里是DYGameH可处理的最早的时刻, 应该只处理最紧急的预加载, 如 Main页需要的资源等
    DYLoaderHelper.prototype.preloadWhenBoot = function () {
    };
    // Main 时的预加载:
    // 这里用户会选 选择新开始游戏, 此处需加载人物选择与引导相关的资源
    DYLoaderHelper.prototype.preloadWhenMain = function () {
    };
    // StoryBegin 时的预加载:
    // 这里用户会选 选择新开始游戏, 此处需加载人物选择与引导相关的资源
    DYLoaderHelper.prototype.preloadWhenStoryBegin = function () {
    };
    // Home 时的预加载:
    // 这里用户会选 选择新开始游戏, 此处需加载人物选择与引导相关的资源
    DYLoaderHelper.prototype.preloadWhenHome = function () {
    };
    DYLoaderHelper.prototype.preloadScene = function (sceneName, completeCallback) {
        cc.director.preloadScene(sceneName, function () {
            completeCallback && completeCallback();
        });
    };
    // 加载的资源及资源引用的其它资源在切换场景时自动删除
    DYLoaderHelper.prototype.loadRes = function (url, type, completeCallback) {
        cc.loader.loadRes(url, type, function (err, res) {
            if (completeCallback) {
                completeCallback(res);
            }
            if (!err) {
                // 这样处理的原因是: 
                // 这是因为 loadRes("btn/btn1", cc.SpriteFrame ...) 获取的是 SpriteFrame 资源，
                // 而 releaseRes("btn/btn1") 释放的是 Texture2D 资源本身，并没有释放 spriteFrame，
                // 所以再次加载的时候，获取到了之前缓存的 spriteFrame，而它的贴图其实已经删除了。
                // 问题的根本还是因为一个 url 可以对应不同 type 的多个资源。
                // var deps = cc.loader.getDependsRecursively(res);
                // // cc.loader.setAutoReleaseRecursively(deps, true);
            }
        });
    };
    // 加载的资源及资源引用的其它资源在切换场景时也不会被删除
    DYLoaderHelper.prototype.loadStaticRes = function (url, type, completeCallback) {
        cc.loader.loadRes(url, type, function (err, res) {
            if (completeCallback) {
                completeCallback(res);
            }
            if (!err) {
                var deps = cc.loader.getDependsRecursively(res);
                // cc.loader.setAutoReleaseRecursively(deps, false);
            }
        });
    };
    // 立即释放资源（缓存引用和资源内容都被清理，需要等gc）
    DYLoaderHelper.prototype.releaseStaticRes = function (url) {
        var deps = cc.loader.getDependsRecursively(url);
        cc.loader.release(deps);
    };
    return DYLoaderHelper;
}());
;

cc._RF.pop();