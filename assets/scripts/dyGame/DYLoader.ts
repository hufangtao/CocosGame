export default class DYLoader {
    public static async loadRes(url, type) {
        return new Promise((resolve, reject) => {
            DYLoaderHelper.theInstance.loadRes(url, type, resolve);
        })
    }

    public static async loadStaticRes(url, type) {
        return new Promise((resolve, reject) => {
            DYLoaderHelper.theInstance.loadStaticRes(url, type, resolve);
        })
    }

    public static async preloadScene(sceneName) {
        return new Promise((resolve, reject) => {
            DYLoaderHelper.theInstance.preloadScene(sceneName, resolve);
        })
    }

    public static releaseStaticRes(url) {
        DYLoaderHelper.theInstance.releaseStaticRes(url);
    }
}

class DYLoaderHelper {
    public static get theInstance(): DYLoaderHelper {
        if (!DYLoaderHelper.mInstance) {
            DYLoaderHelper.mInstance = new DYLoaderHelper();
        }
        return DYLoaderHelper.mInstance;
    }

    private static mInstance: DYLoaderHelper;
    // Boot 时的预加载: 
    // 这里是DYGameH可处理的最早的时刻, 应该只处理最紧急的预加载, 如 Main页需要的资源等
    preloadWhenBoot() {

    }

    // Main 时的预加载:
    // 这里用户会选 选择新开始游戏, 此处需加载人物选择与引导相关的资源
    preloadWhenMain() {

    }

    // StoryBegin 时的预加载:
    // 这里用户会选 选择新开始游戏, 此处需加载人物选择与引导相关的资源
    preloadWhenStoryBegin() {

    }

    // Home 时的预加载:
    // 这里用户会选 选择新开始游戏, 此处需加载人物选择与引导相关的资源
    preloadWhenHome() {

    }

    preloadScene(sceneName,completeCallback){
        cc.director.preloadScene(sceneName,()=>{
            completeCallback && completeCallback();
        })
    }

    // 加载的资源及资源引用的其它资源在切换场景时自动删除
    loadRes(url, type, completeCallback) {
         cc.loader.loadRes(url,type, (err, res) => {
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
    }

    // 加载的资源及资源引用的其它资源在切换场景时也不会被删除
    loadStaticRes(url, type, completeCallback) {
        cc.loader.loadRes(url, type, (err, res) => {
            if (completeCallback) {
                completeCallback(res);
            }
            if (!err) {
                var deps = cc.loader.getDependsRecursively(res);
                // cc.loader.setAutoReleaseRecursively(deps, false);
            }
        });
    }

    // 立即释放资源（缓存引用和资源内容都被清理，需要等gc）
    releaseStaticRes(url) {
        var deps = cc.loader.getDependsRecursively(url);
        cc.loader.release(deps);
    }

};