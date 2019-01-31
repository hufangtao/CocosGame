; (function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? module.exports = factory(global)
    : typeof define === 'function' && define.amd
      ? define(factory) : factory(global)
}((
  typeof self !== 'undefined' ? self
    : typeof window !== 'undefined' ? window
      : typeof global !== 'undefined' ? global
        : this
), function (global) {
  var Partner = global.Partner || {};
  var emptyFunc = function () { };

  Object.setPrototypeOf = Object.setPrototypeOf || function (obj, proto) {
    obj.__proto__ = proto;
    return obj;
  }

  Partner.SERVER_GROUP = 0;
  Partner.PARTNER_NAME = "Dev";
  Partner.CHANNEL = 0;
  Partner.CDN_HOST = "";
  Partner.HEAD_IMG_HOST = "https://dsqpk-cdn.dayukeji.com/fruit/wxhead/";

  Partner.toastCallback = null;
  Partner.userInfo = {};

  Partner.extends = function () {
    var obj = {};
    Object.setPrototypeOf(obj, Partner);
    obj.super = Partner;
    return obj;
  };
  Partner.alert = function (msg) {
    console.log(msg);
  }

  Partner.getLaunchOptions = function () {
    return Partner.getLaunchQuery();
  };

  Partner.getLaunchQuery = function () {
    var url = location.search;
    if (!url) {
      return {};
    }
    var ret = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        var tmpStrs = strs[i].split("=");
        if (tmpStrs.length > 2) {
          var string = strs[i].split(tmpStrs[0] + "=");
          ret[tmpStrs[0]] = string[1]
        } else {
          ret[tmpStrs[0]] = tmpStrs[1]
        }
      }
    }
    return ret;
  };

  Partner.postMsg = function (type, data) {

  };

  Partner.getKeyChain = function (obj, chain) {
    if (!obj) { return undefined; }
    var params = chain.split(".");
    var flag = params.every(function (key) {
      if (obj[key]) {
        obj = obj[key];
        return true;
      }
      return false;
    });
    if (flag) {
      return obj;
    } else {
      return undefined;
    }
  };

  // 进行账号授权操作
  Partner.doAccAuthorize = function (didAccAuthorizeCallback, inputAccountCallback, existSaved) {
    Partner.didAccAuthorizeCallback = didAccAuthorizeCallback;
    inputAccountCallback(1);
  };

  Partner.copyToClipboard = function (str) {
    var el = document.createElement("textarea");
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.contain = 'strict';
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    el.style.fontSize = '12pt';
    document.body.appendChild(el);

    var selected = false;
    var selection = document.getSelection();
    if (selection.rangeCount > 0) {
      selected = selection.getRangeAt(0);
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  };

  // 进行邀请
  Partner.doInvite = function (params, inviteCallback) {
    // if (Partner.toastCallback) {
    //   Partner.toastCallback("当前平台不支持此功能");
    //   return
    // }
    var inviterUrl = location.origin + location.pathname + "?inviter=" + params;
    var callbackParam = {};
    callbackParam.url = inviterUrl;
    inviteCallback(true, callbackParam);
  };

  // 炫耀一下
  Partner.doFlaunt = function (params) {
    if (Partner.toastCallback) {
      Partner.toastCallback("当前平台不支持此功能");
    }
  };

  Partner.previewImg = function (params) {
    if (Partner.toastCallback) {
      Partner.toastCallback("当前平台不支持此功能");
    }
  };

  // 成功获取的账号授权
  Partner.didAccAuthorize = function (accData) {
    Partner.didAccAuthorizeCallback(accData);
  };

  // 设置用户的数据到平台
  Partner.setUserStar = function (star) {
  };

  Partner.getSharedCanvas = function () {
    return null;
  };

  // Zip文件下载器
  Partner.zipDownloadHandler = function (item, callback) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.open("GET", item.url, true);
    xhr.responseType = "arraybuffer";
    xhr.onload = function (evt) {
      var arrayBuffer = xhr.response;
      if (arrayBuffer) {
        callback(null, arrayBuffer);
      } else {
        callback(new Error("download zip failed" + evt));
      }
    };
    xhr.onerror = function (evt) {
      callback(new Error("download zip faied" + evt));
    };
    xhr.send(null)
  };

  // Zip文件加载器
  Partner.zipLoadHandler = function (item, callback) {
    var arrayBuffer = item.content;
    var zipFile = new JSZip(arrayBuffer);
    var files = {};
    var zipObjects = zipFile.files;
    for (var fileName in zipObjects) {
      if (zipObjects.hasOwnProperty(fileName)) {
        var zipObject = zipObjects[fileName];
        files[fileName] = zipObject.asUint8Array();
      }
    }
    callback(null, files);
  };

  Partner.registerZipLoad = function () {
    cc.loader.addDownloadHandlers({ "zip": Partner.zipDownloadHandler });
    cc.loader.addLoadHandlers({ "zip": Partner.zipLoadHandler });
  };

  // 资源更新
  Partner.resUpdate = function (callback) {
    callback();
  };

  // qqPlay 需要将头像下载到本地
  Partner.needPreloadOpponentHead = function () {
    return false;
  };

  // 清除登陆态
  Partner.cleanLoginState = function () {
    // console.log("fix some Bugs");
  };

  Partner.energyTest = function () {
    return true;
  };

  //显示分享按钮
  Partner.showShareMenu = function () {
  };

  //隐藏分享按钮
  Partner.hideShareMenu = function () {
  };

  // 注册分享app的回调
  Partner.registerShareAppCallback = function (callback1, callback2) {
  };

  Partner.shareImgUrl = function (imgName) {
    return imgName;
  };

  Partner.registerOnShowCallback = function (callback) {
  };

  Partner.registerOnHideCallback = function (callback) {
  };

  Partner.registerToastCallback = function (callback) {
    Partner.toastCallback = callback;
  };

  Partner.sendDomainMsg = function (msg) {
  };

  Partner.supportSocialFriend = function () {
    return false;
  };

  Partner.supportUserInfo = function () {
    return false;
  };

  Partner.getCommendatoryData = function (params, callback) {
  };

  Partner.getServerId = function () {
    console.log("============================================getServerId base");
    return "221";
  };

  Partner.supportAd = function (callback) {
    return false;
  };
  Partner.initGameClub = function () {

  };
  Partner.showGameClub = function () {

  };
  Partner.hideGameClub = function () {

  };

  global.Partner = Partner;
}));
