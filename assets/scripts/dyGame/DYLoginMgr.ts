import DYUtils from "./DYUtils";

export enum DYLoginEvent{
    EVENT_INIT_SUCC 	= "EVENT_INIT_SUCC",
	EVENT_INIT_FAIL     = "EVENT_INIT_FAIL",
	EVENT_LOGIN_SUCC    = "EVENT_LOGIN_SUCC",
	EVENT_LOGIN_FAIL    = "EVENT_LOGIN_FAIL",
	EVENT_LOGOUT_SUCC   = "EVENT_LOGOUT_SUCC",
	EVENT_LOGOUT_FAIL   = "EVENT_LOGOUT_FAIL",
}

export class DYLoginMgr{
    static init (param : any, listener : Function){
        var self = this;
		var param = param || {};

		var tFuncListener = function(strEvent){
			// DDLOG("tFuncListener in DYLoginMgr.init: {0}", strEvent);
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
				jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "init", "(Ljava/lang/String;I)V", strParam, nListener);
			}
			else if ("ios" == DYUtils.platform()){
				jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "init:withListener:", strParam, nListener.toString());
			}
			else{
				// 其它版本
				DYUtils.scheduleOnce(function(){
					var et = cc.js.createMap();
					et.event = DYLoginEvent.EVENT_INIT_SUCC;
					et.param = JSON.stringify({});
					DYUtils.popInvoke(nListener)(JSON.stringify(et));
				}, 0.1);
			}
		}
		else if (cc.sys.isBrowser){
			// 浏览器版本
		}
    }

    // 登录
	static login (param : any, listener : Function){
		var param = param || {};

		var tFuncListener = function(strEvent){
			// DDLOG("tFuncListener in DYLoginMgr.login: {0}", strEvent);
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
				jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "login", "(Ljava/lang/String;I)V", strParam, nListener);
			}
			else if ("ios" == DYUtils.platform()){
				jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "login:withListener:", strParam, nListener.toString());
			}
			else{
				DYUtils.scheduleOnce(function(){
					var et = cc.js.createMap();
					et.event = DYLoginEvent.EVENT_LOGIN_SUCC;
					et.param = JSON.stringify({
						id : "",
						token : "",
						name : "",
						param : ""
					});
					DYUtils.popInvoke(nListener)(JSON.stringify(et));
				}, 0.1);
			}
		}
		else if (cc.sys.isBrowser){
			// 浏览器版本
		}
    }
    
    static isGuest() : boolean{
		return (DYUtils.getParamExt("K_IS_GUEST") == "TRUE");
    }
    
    static regLogout(param : any, listener : Function){
		var param = param || {};

		var tFuncListener = function(strEvent){
			// DDLOG("tFuncListener in DYLoginMgr.regLogout: {0}", strEvent);
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
				jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "regLogout", "(Ljava/lang/String;I)V", strParam, nListener);
			}
			else if ("ios" == DYUtils.platform()){
				jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "regLogout:withListener:", strParam, nListener.toString());
			}
		}
		else if (cc.sys.isBrowser){
		}
	}

	static logout(param : any){
		var param = param || {};

		var strParam = JSON.stringify(param);
		if (cc.sys.isNative){
			// 客户端版本
			if ("android" == DYUtils.platform()){
				// 安卓
				jsb.reflection.callStaticMethod("com/dygame/common/DYLoginMgr", "logout", "(Ljava/lang/String;I)V", strParam, 0);
			}
			else if ("ios" == DYUtils.platform()){
				jsb.reflection.callStaticMethod("DYLoginMgr_iOS", "logout:withListener:", strParam, "0");
			}
		}
		else if (cc.sys.isBrowser){
			
		}
	}
}
