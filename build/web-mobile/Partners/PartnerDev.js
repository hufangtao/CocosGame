Partner =  Partner.extends();

Partner.userInfo = {};
Partner.SHOW_GM = true;

  // 进行账号授权操作
Partner.doAccAuthorize = function(didAccAuthorizeCallback, inputAccountCallback, existSaved) {
  Partner.didAccAuthorizeCallback = didAccAuthorizeCallback;
  inputAccountCallback(1);
}

// 成功获取的账号授权
Partner.didAccAuthorize = function(accData) {
  Partner.didAccAuthorizeCallback(accData);
}

Partner.copyToClipboard = function(str) {
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
  
  if(selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
Partner.energyTest = function () {
  return false;
}
// 进行邀请的操作
Partner.doInvite = function(params, inviteCallback) {
  var inviterUrl = location.origin + location.pathname + "?inviter=" + params;
  var callbackParam = {};
  callbackParam.url = inviterUrl;
  inviteCallback(true, callbackParam);
}

// Zip文件下载器
Partner.zipDownloadHandler = function(item, callback) {
  var xhr = cc.loader.getXMLHttpRequest();
  xhr.open("GET", item.url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function(evt) {
    var arrayBuffer = xhr.response;
    if(arrayBuffer) {
      callback(null, arrayBuffer);
    } else {
      callback(new Error("download zip failed" + evt));
    }
  }
  xhr.onerror = function(evt) {
    callback(new Error("download zip faied" + evt));
  }
  xhr.send(null)
}

// Zip文件加载器
Partner.zipLoadHandler = function(item, callback) {
  var arrayBuffer = item.content;
  var zipFile = new JSZip(arrayBuffer);
  var files = {};
  var zipObjects = zipFile.files;
  for (var fileName in zipObjects) {
    if(zipObjects.hasOwnProperty(fileName)) {
      var zipObject = zipObjects[fileName];
      files[fileName] = zipObject.asUint8Array();
    }
  }
  callback(null, files);
}

Partner.registerZipLoad = function() {
  cc.loader.addDownloadHandlers({"zip": Partner.zipDownloadHandler});
  cc.loader.addLoadHandlers({"zip": Partner.zipLoadHandler});
}

Partner.getServerId = function(){
    return "221";
};
