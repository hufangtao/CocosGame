import DYUtils from './DYUtils';
export enum DYIAPEvent{
    EVENT_INIT_SUCC = "EVENT_INIT_SUCC",
    EVENT_INIT_FAIL = "EVENT_INIT_FAIL",
    EVENT_PAY_SUCC = "EVENT_PAY_SUCC",
    EVENT_PAY_FAIL = "EVENT_PAY_FAIL",
    EVENT_REFUND_SUCC = "EVENT_REFUND_SUCC",
    EVENT_REFUND_FAIL = "EVENT_REFUND_FAIL",
}

export default class DYIAPMgr{
    static init(param : any, listener : Function){
        var self = this;
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
                jsb.reflection.callStaticMethod("com/dygame/common/DYIAPMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils.platform()){
                jsb.reflection.callStaticMethod("DYIAPMgr_iOS", "init:withListener:", strParam, nListener.toString());
            }
            else{
                // 其它版本
                DYUtils.scheduleOnce(function(){
                    var et = cc.js.createMap();
                    et.event = DYIAPEvent.EVENT_INIT_SUCC;
                    et.param = JSON.stringify({});
                    DYUtils.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser){
            // 浏览器版本
        }
    }

    static pay(param : any, listener : Function){
        var self = this;
        var param = param || {};

        var tFuncListener = function(strEvent){
            // DDLOG("tFuncListener in DYIAPMgr.pay: {0}", strEvent);

            var et = JSON.parse(strEvent);
            et.param = JSON.parse(et.param);

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
                jsb.reflection.callStaticMethod("com/dygame/common/DYIAPMgr", "pay", "(Ljava/lang/String;I)V", strParam, nListener);
            }
            else if ("ios" == DYUtils.platform()){
                jsb.reflection.callStaticMethod("DYIAPMgr_iOS", "pay:withListener:", strParam, nListener.toString());
            }
            else{
                // 其它版本
                // DDLOG("Not support on this native version, os = {0}", cc.sys.os);

                DYUtils.scheduleOnce(function(){
                    var et = cc.js.createMap();
                    et.event = DYIAPEvent.EVENT_PAY_FAIL;
                    et.param = strParam;

                    DYUtils.popInvoke(nListener)(JSON.stringify(et));
                }, 0.1);
            }
        }
        else if (cc.sys.isBrowser){
           
        }
    }
}