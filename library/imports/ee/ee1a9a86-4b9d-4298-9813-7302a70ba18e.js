"use strict";
cc._RF.push(module, 'ee1a9qGS51CmJgTcwKnC6GO', 'BaseConfig');
// scripts/app/common/config/BaseConfig.ts

Object.defineProperty(exports, "__esModule", { value: true });
var defaultLvlGenerator = {
    updateLvlData: function (template, lvl) {
        return template;
    },
};
// 策划配置数据的泛型类
var BaseConfig = /** @class */ (function () {
    function BaseConfig(name) {
        this.isInited = false;
        this.data = [];
        this.extraData = undefined;
        this.lvlGenerator = undefined;
        this.name = name;
    }
    BaseConfig.prototype.setClass = function (clazz) {
        this.clazz = clazz || function () { };
    };
    BaseConfig.prototype.initData = function (obj) {
        if (!obj) {
            return;
        }
        var keys = obj.key;
        var data = obj.vals;
        var cols = obj.cols;
        obj.key = undefined;
        obj.vals = undefined;
        obj.cols = undefined;
        var keyCnt = keys.length;
        var colCnt = cols.length;
        var clazz = this.clazz;
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            // 计算本条数据的索引
            var key = item[keys[0]];
            for (var j = 1; j < keyCnt; j++) {
                key += ("_" + item[keys[j]]);
            }
            // 将数据转换成一个对象实例
            var instance = new clazz();
            for (var j = 0; j < colCnt; j++) {
                var colName = cols[j];
                instance[colName] = item[j];
            }
            // 如果对应的key已经存在一个值了 就把数据放在一个数组里
            var existedValue = this.data[key];
            if (existedValue) {
                if (Array.prototype === existedValue.__proto__) {
                    existedValue.push(instance);
                }
                else {
                    this.data[key] = instance;
                }
            }
            else {
                this.data[key] = instance;
            }
            this.isInited = true;
        }
        // 其他属性保持在extra里面
        for (var k in obj) {
            if (obj[k] !== undefined) {
                if (!this.extraData) {
                    this.extraData = {};
                }
                this.extraData[k] = obj[k];
            }
        }
    };
    BaseConfig.prototype.get = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var key = params.join("_");
        return this.data[key];
    };
    BaseConfig.prototype.getGroup = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        var key = params.join("_");
        return this.data[key];
    };
    BaseConfig.prototype.getAll = function () {
        return this.data;
    };
    BaseConfig.prototype.getList = function () {
        var tmp;
        tmp = this.data;
        return tmp;
    };
    // 获取额外数据
    BaseConfig.prototype.getExtra = function (key) {
        return this.extraData[key];
    };
    // 设置额外数据
    BaseConfig.prototype.setExtra = function (key, value) {
        this.extraData[key] = value;
    };
    // 设置等级数据生成器
    BaseConfig.prototype.setLvlGenerator = function (generator) {
        this.lvlGenerator = generator;
    };
    // 根据等级获取数据
    BaseConfig.prototype.getByLvl = function (id, lvl) {
        var key = id + "_" + lvl;
        var keyValue = this.data[key];
        var generator = this.lvlGenerator || defaultLvlGenerator;
        // 对应等级的数据没有，则去找其他等级的，然后根据生成规则计算出本等级的数值
        if (keyValue === undefined) {
            var originLvl = lvl;
            // 直到找到一个有对应等级的配置的数据
            var tmpKey = void 0;
            while (!keyValue && lvl > 0) {
                lvl--;
                tmpKey = id + "_" + lvl;
                keyValue = this.data[tmpKey];
            }
            // 如果找到了其他等级的值，就可以根据设定计算出来了
            if (keyValue) {
                var wantedKeyValue = generator.updateLvlData(keyValue, originLvl);
                this.data[key] = wantedKeyValue;
                keyValue = wantedKeyValue;
            }
            else {
                this.data[key] = null;
            }
            // 然后再计算一下中间等级数据 下次查找可以快一些
            var midLvl = Math.ceil((originLvl + lvl) / 2);
            if (midLvl !== lvl && midLvl !== originLvl) {
                var midKey = id + "_" + midLvl;
                var midKeyValue = keyValue ? generator.updateLvlData(keyValue, midLvl) : null;
                this.data[midKey] = midKeyValue;
            }
        }
        return keyValue;
    };
    return BaseConfig;
}());
exports.default = BaseConfig;

cc._RF.pop();