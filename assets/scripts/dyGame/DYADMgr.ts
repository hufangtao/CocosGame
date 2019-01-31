import DYUtils from './DYUtils';

export enum DYADType {
    BANNER = "BANNER",          
    INTERSTITIAL = "INTERSTITIAL",
    VIDEO = "VIDEO",              
    INCENTIVE = "INCENTIVE",
    WALL = "WALL"
}

export enum DYADEvent{
    EVENT_INIT_SUCC = "EVENT_INIT_SUCC",
    EVENT_INIT_FAIL = "EVENT_INIT_FAIL",
    EVENT_CLOSE = "EVENT_CLOSE",
    EVENT_REWARD = "EVENT_REWARD"
}

export default class DYADMgr{
    public static init(param: any, listener: Function) {
        var param = param || {};

        var tFuncListener = function(strEvent){
            // DDLOG("tFuncListener in DYIAPMgr.init: {0}", strEvent);
            var et = JSON.parse(strEvent);
            et.param = JSON.parse(et.param);

            // et = {event:dy.login.EVENT_INIT_OK, param:{}}
            if (listener){
                listener(et);
            }
        }


        var strParam = JSON.stringify(param);

        var nListener = DYUtils.pushInvoke(tFuncListener);

        if (cc.sys.isNative){
            // 客户端版本
            if ("android" == DYUtils.platform()){
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils.platform()){
                jsb.reflection.callStaticMethod("DYADMgr_iOS", "init:withListener:", strParam, nListener.toString());
            }
        }
    }

    public static canShow(adType: DYADType){
        let tRet = "";
        if (cc.sys.isNative){
            // 客户端版本
            if ("android" == DYUtils.platform()){
                // 安卓
                tRet = jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "canShow", "(Ljava/lang/String;)Ljava/lang/String;", adType);
            }
            else if ("ios" == DYUtils.platform()){
                tRet = jsb.reflection.callStaticMethod("DYADMgr_iOS", "canShow:", adType);
            }
        }
        return (tRet == "TRUE");
    }

    public static show(adType: DYADType){
        if (cc.sys.isNative){
            // 客户端版本
            if ("android" == DYUtils.platform()){
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "show", "(Ljava/lang/String;)V", adType);
            }
            else if ("ios" == DYUtils.platform()){
                jsb.reflection.callStaticMethod("DYADMgr_iOS", "show:", adType);
            }
        }
    }

    public static hide(adType: DYADType){
        if (cc.sys.isNative){
            // 客户端版本
            if ("android" == DYUtils.platform()){
                // 安卓
                jsb.reflection.callStaticMethod("com/dygame/common/DYADMgr", "hide", "(Ljava/lang/String;)V", adType);
            }
            else if ("ios" == DYUtils.platform()){
                jsb.reflection.callStaticMethod("DYADMgr_iOS", "hide:", adType);
            }
        }
    }

};
