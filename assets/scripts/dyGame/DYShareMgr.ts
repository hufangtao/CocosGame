import DYUtils from "./DYUtils";


export enum DYShareEvent{
    EVENT_INIT_SUCC 	= "EVENT_INIT_SUCC",
    EVENT_INIT_FAIL     = "EVENT_INIT_FAIL",
    EVENT_SHARE_SUCC 	= "EVENT_SHARE_SUCC",
    EVENT_SHARE_FAIL    = "EVENT_SHARE_FAIL",
}

export default class DYShareMgr{
    static init (param: any, listener: Function){
        var param = param || {};

		var tFuncListener = function(strEvent){
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
			if (cc.sys.os == cc.sys.OS_ANDROID){
				// 安卓
				jsb.reflection.callStaticMethod("com/dygame/common/DYShareMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
			}
			else{
				// 其它版本
				DYUtils.scheduleOnce(function(){
					var et = cc.js.createMap();
					et.event = DYShareEvent.EVENT_INIT_SUCC;
					et.param = JSON.stringify({});
					DYUtils.popInvoke(nListener)(JSON.stringify(et));
				}, 0.1);
			}
		}
		else if (cc.sys.isBrowser){
		}
    }

    static share(param: any, listener: Function){
		var tContent = "";
		if ("android" == DYUtils.platform()){
            tContent = "https://play.google.com/store/apps/developer?id=doozii";
        }
        else if ("ios" == DYUtils.platform()){
        	tContent = "https://itunes.apple.com/us/developer/ye-tian/id1127699301";
        }

		var param = param || {
			method : "default",
            title : "King Marbles",
            content : tContent,
            imgpath : cc.url.raw("resources/Texture/dzads.jpg"),
		};

		var tFuncListener = function(strEvent){
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
			if ("android" == DYUtils.platform()){
				// 安卓
				jsb.reflection.callStaticMethod("com/dygame/common/DYShareMgr", "share", "(Ljava/lang/String;I)V", strParam, nListener);
			}
			else if ("ios" == DYUtils.platform()){
				jsb.reflection.callStaticMethod("DYShareMgr_iOS", "share:withListener:", strParam, nListener.toString());
			}
		}
		else if (cc.sys.isBrowser){
			// 暂未实现，模拟失败
			DYUtils.scheduleOnce(function(){
				var et = cc.js.createMap();
				et.event = dy.login.EVENT_SHARE_FAIL;
				et.param = JSON.stringify({});
				DYUtils.popInvoke(nListener)(JSON.stringify(et));
			}, 0.1);
		}
	}
}
