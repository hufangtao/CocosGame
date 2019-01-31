import DYCrypto from './DYCrypto';
import * as Config from './Config';
import DYData from './DYData';
import { find } from '../../../creator';
import DYNotify from './DYNotify';


const S_JSB_CACHE_PATH = "jsb_cache/";
const S_JSB_HOTFIX_PATH = "c98759c9a82b24c176af027949f417b0/";
const S_APP_SECRET = "apsdfAJOJ(#@&($0809283JLJOOJ";

let kGameVer    = "5d4ac9f2-5658-4dca-9bb0-5f287e0d614b";
let kUniqueID   = "8b40c787-95cf-4976-b29e-df8d25ce5e5d";

let S_JSB_FUNC_ID = 1000;
let S_JSB_FUNC = {};
let S_POOLS = {};

export default class DYUtils{
    public static pushInvoke(cb: Function) : number{
        let funcId = (++S_JSB_FUNC_ID);

        var strFuncId = DYUtils.format("{0}", funcId);
        S_JSB_FUNC[strFuncId] = cb;

        return funcId;
    }

    static popInvoke(funcId : number, bReserve: boolean = false) : Function{
        var strFuncId = DYUtils.format("{0}", funcId);
        var cb = S_JSB_FUNC[strFuncId];
        if (!bReserve){
            delete S_JSB_FUNC[strFuncId];
        }

        return cb;
    }
    /**
     * @returns a number in [from, to]
     */
    static random(from: number, to: number){
        var abs = Math.abs(to - from) + 1;
        var rand = Math.floor(Math.random() * abs);
        var min = Math.min(from, to);
        return (min + rand);
    }

    /**
     * @returns a clone of an object
     * ATTENTION: the deep copy is relative, it doesn't work for inner object, just fine for properties
     */
    static clone(a) {
        if(!a){
            return a;
        }

        var at = typeof(a);
        if (at == "object" ){
            // 忽略所有组件类型的 "deep copy"
            if(a.__classname__){
                return a;
            }

            var ret = undefined;
            if(a instanceof Array){
                ret = [];
                for (var i = 0; i < a.length; i++) {
                    let t = this.clone(a[i]);
                    if(t || t == 0 || t == "" || t == false){
                        ret[i] = t;
                    }
                }
            }
            else{
                ret = {}
                for(var key in a) {
                    if (a.hasOwnProperty(key)){
                        let t = this.clone(a[key]);
                        if(t || t == 0 || t == "" || t == false){
                            ret[key] = t;
                        }
                    }
                }
            }
            return ret;
        }
        return a;
    }

    /**
     * @returns a guid string
     */
    // static guid() {
    //     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    //         var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    //         return v.toString(16);
    //     });
    // }
    static guid() : string{
        function S4() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }
    
    /**
     * @returns current tick from system
     */
    static currentTick() : number{
        return Date.now();
    }

    /**
     * @returns current second from system
     */
    static currentSecond() : number{
        return Math.floor(this.currentTick()/1000);
    }

    static delegate(client: any, clientMethod: Function) : Function { 
        return function() { 
            return clientMethod.apply(client, arguments); 
        } 
    }

    public static platform() : string{
        if (cc.sys.isNative){
            switch(cc.sys.platform){
            case cc.sys.WIN32 : 
                return "win32"
            case cc.sys.LINUX : 
                return "linux"
            case cc.sys.MACOS : 
                return "mac"
            case cc.sys.ANDROID : 
                return "android"
            case cc.sys.IPHONE : 
            case cc.sys.IPAD : 
                return "ios"
            default: 
                return "unknown"
            }
        }

        return "web";
    }

    static md5(plain: string) : string{
        return DYCrypto.md5.hex_md5(plain);
    }

    static gameId () : string{
        return Config.GAME_ID;
    }
    static gameVer () : string{
        var ver = DYData.getStat(kGameVer, Config.GAME_VER);
        if(DYUtils.compareVer(ver, Config.GAME_VER) < 0){
            ver = Config.GAME_VER;
            DYData.setStat(kGameVer, ver);
        }

        return ver; 
    }

    static gameOrigVer () : string{
        return Config.GAME_VER;
    }

    static setGameVer(ver: string) : void{
        DYData.setStat(kGameVer, ver);
    }

    static channel () : string{
        return "";
    }
    static gameMode () : string{
        return Config.GAME_MODE;
    }


   
    // for DDLOG
    static DDLOG(obj: any, ...sourceObj: any[]){
        var log = DYUtils.format.apply(this, arguments);
        //console.log(log);
    };
    static DDINFO(obj: any, ...sourceObj: any[]){
        var log = DYUtils.format.apply(this, arguments);
        console.warn(log);
    };
    static DDERROR(obj: any, ...sourceObj: any[]){
        var log = DYUtils.format.apply(this, arguments);
        console.error(log);
    };

    // for String
    static format(msg: string|any, ...subst: any[]): string{
        var argLen = arguments.length;
        if (0 === argLen) {
            return "";
        }
        var msg = arguments[0];
        if (1 === argLen) {
            return "" + msg;
        }
        let args = arguments[1];
        if (arguments.length == 2 && typeof (args) == "object") {
            for (let key in args) {
                if(args[key]!=undefined){
                    let reg = new RegExp("({" + key + "})", "g");
                    msg = msg.replace(reg, args[key]);
                }
            }
        }
        else {
            for (let i = 1; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //let reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出
　　　　　　　　　　　　let reg= new RegExp("({)" + (i-1) + "(})", "g");
                    msg = msg.replace(reg, arguments[i]);
                }
            }
        }

        return msg;
    }

    /** 
    example:
    let str = DYUtils.fill("%02d", 5)
    str = "05";
    */
    static fill(msg: string|any, ...subst: any[]) : string{
        var as=[].slice.call(arguments);
        var fmt = as.shift();
        var i=0;
        return fmt.replace(/%(\w)?(\d)?([dfsx])/ig, function(_,a,b,c){
            var s=b?new Array(b-0+1).join(a||""):"";
            if(c=="d") s+=parseInt(as[i++]);
            return b?s.slice(b*-1):s;
        });
    }

    static scheduleOnce(listener : Function, interval : number){
        cc.director.getScheduler().schedule(listener, cc.director.getScene(), 0, 0, interval, false);
    }

    static countProperty(obj : any) : number{
        if(!obj){
            return 0;
        }
        
        return Object.getOwnPropertyNames(obj).length;
    }

    static compareVer(ver1: string, ver2: string) : number{
        let diff = 0;
        let curV = ver1;
        let reqV = ver2;

        if(curV === reqV){
            return 0;
        }

        if(!curV && !reqV){
            return 0;
        }

        if (curV && !reqV){
            return 1;
        }

        if (!curV && reqV){
            return -1;
        }

        //将两个版本号拆成数字  
        var arr1 = curV.split("."), arr2 = reqV.split(".");  
        var minLength=Math.min(arr1.length,arr2.length), position=0;  
        //依次比较版本号每一位大小，当对比得出结果后跳出循环（后文有简单介绍）  
        while(position<minLength && ((diff=parseInt(arr1[position])-parseInt(arr2[position]))==0)){  
            position++;  
        }  
        diff=(diff!=0)?diff:(arr1.length-arr2.length); 

        return diff;
    }

    static cachePath() : string{
        if (!cc.sys.isNative) {
            return S_JSB_CACHE_PATH;
        }
        var path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + S_JSB_CACHE_PATH);
        return path;
    }

    static hotfixPath() : string{
        if (!cc.sys.isNative) {
            return S_JSB_HOTFIX_PATH;
        }
        var path = ((jsb.fileUtils ? jsb.fileUtils.getWritablePath() : "/") + S_JSB_HOTFIX_PATH);
        return path;
    }

    static verifyAsset(filePath: string, asset: any) : boolean{
        var fileStr = jsb.fileUtils.getDataFromFile(filePath);
        if (!fileStr){
            return true;
        }

        var md5 = DYCrypto.md5.hex_md5_for_uint8arr(fileStr);
        if (md5.toUpperCase() === asset.md5.toUpperCase()){
            return true;
        }
        
        return false;
    }

    static createPool(key: string) : cc.NodePool{
        if(!S_POOLS[key]){
            S_POOLS[key] = new cc.NodePool();
        }
        return S_POOLS[key];
    }

    static destroyPool(key: string) : void{
        if (S_POOLS[key]){
            S_POOLS[key].clear();
            delete S_POOLS[key];
        }
    }  

    static clearAllPool(){
        for(var key in S_POOLS){
            S_POOLS[key].clear();
            delete S_POOLS[key];
        }
    }

    static stringForSec(sec: number) : string{
        var tHour   = DYUtils.fill("%02d", Math.floor(sec/3600));
        var tMin    = DYUtils.fill("%02d", Math.floor((sec%3600)/60));
        var tSec    = DYUtils.fill("%02d", Math.floor(sec%60));

        return DYUtils.format("{0}:{1}:{2}", tHour, tMin, tSec);
    }

    static stringForTick(tick: number) : string{
        var sec = Math.floor(tick / 1000);
        // var tHour   = String.padChar("%02d", Math.floor(sec/3600));
        var tMin    = DYUtils.fill("%02d", Math.floor(sec/60));
        var tSec    = DYUtils.fill("%02d", Math.floor(sec%60));
        var tTick   = DYUtils.fill("%03d", (tick%1000));

        return DYUtils.format("{0}:{1}:{2}", tMin, tSec, tTick);
    }

    static gc() : void{
        if (cc.sys.isNative){
            cc.textureCache.removeAllTextures();    
        }
        cc.sys.garbageCollect();
    }

    static getParamExt(pk: string, pp: string){
        pp = pp || "";
        
        try{
            if ("android" == DYUtils.platform()){
                return jsb.reflection.callStaticMethod("com/dygame/common/DYCommon", "getParamExt", "(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;", pk.toString(), pp.toString());
            }
            else if("ios" == DYUtils.platform()){
                return jsb.reflection.callStaticMethod("DYCommon_iOS", "getParamExt:withParam:", pk.toString(), pp.toString());
            }
            else{
                if(pk == "K_IS_GUEST"){
                    return "TRUE";
                }
            }
        }
        catch(err){}
        finally{}

        return "";
    }

    static uniqueID() : string{
        var tid = DYData.getStat(kUniqueID, "");
        if(!tid){
            tid = this.guid();
            DYData.getStat(kUniqueID, tid);
        }
        
        return tid;
    }

    static genSign(plain) : string{
        var strPlain = S_APP_SECRET + DYCrypto.base64.encode(plain);
        return DYCrypto.md5.hex_md5(strPlain);
    }

    static test(){
        DYNotify.regObserver("TEST", function(target:cc.Node, tag:string, param:any){
            DYUtils.DDLOG(DYUtils.format("onNotify: {0} with {1}", tag, param)); 
        }, "K_TEST", this);
        
        DYNotify.post("K_TEST", {t:"some param"});

        DYNotify.removeAllObservers("TEST");

        DYUtils.DDLOG(DYUtils.currentTick());
        DYUtils.scheduleOnce(function(){
            DYUtils.DDLOG(DYUtils.currentTick());
            DYUtils.DDLOG(DYUtils.format("scheduleOnce ... ")); 
        }, 0.5);
    }
}
