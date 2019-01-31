import DYUtils from "./DYUtils";

export default class DYData{
    static getCache(key: string, def: any, noSign:boolean = false) : any {
        return DYDataHelper.theInstance.getCache(key, def, noSign);
    }

    static setCache(key: string, val: string) : void{
        DYDataHelper.theInstance.setCache(key, val);
    }

    static clearCache (key: string) : void{
        DYDataHelper.theInstance.clearCache(key);
    }

    static getStat(key: string, def: string) : string{
        return DYDataHelper.theInstance.getStat(key, def);
    }

    static setStat(key: string, val: string) : void{
        DYDataHelper.theInstance.setStat(key, val);
    }

    static clearStat(key : string) : void{
        DYDataHelper.theInstance.clearStat(key);
    }
}


class DYDataHelper{
    public static get theInstance(): DYDataHelper {
        if (!DYDataHelper.mInstance) {
            DYDataHelper.mInstance = new DYDataHelper();
        }
        return DYDataHelper.mInstance;    
      }
    
    private static mInstance: DYDataHelper;

    // For All
    mCacheData : object;
    
    public getCache(key: string, def: any, noSign:boolean) : any{
        let self = this;

        let tVal = self.mCacheData[key];
        if(!tVal){
            return def;
        }

        if(!noSign){
            return tVal;
        }

        let tSignVal = self.mCacheData[key + "_sign"];
        if(DYUtils.genSign(key.toString() + tVal.toString()) != tSignVal){
            return def;
        }

        return tVal;
    }

    public setCache(key: string, val: string) : void{
        let self = this;

        self.mCacheData[key] = val;
        self.mCacheData[key + "_sign"] = DYUtils.genSign(key.toString() + val.toString());
    }

    public clearCache (key: string) : void{
        let self = this;
        delete self.mCacheData[key];
        delete self.mCacheData[key + "_sign"];
    }

    public getStat(key: string, def: string) : string{
        let ls = cc.sys.localStorage;
        let tVal = ls.get(key);
        if(!tVal){
            return def;
        }

        let tSignVal = ls.getItem(key + "_sign");
        if(DYUtils.genSign(key.toString() + tVal.toString()) != tSignVal){
            return def;
        }

        return tVal;
    }

    public setStat(key: string, val: string) : void{
        let ls = cc.sys.localStorage;
        ls.setItem(key, val);
        ls.setItem(key + "_sign", DYUtils.genSign(key.toString() + val.toString()));
    }

    public clearStat(key : string) : void{
        let ls = cc.sys.localStorage;
        ls.removeItem(key);
    }
}