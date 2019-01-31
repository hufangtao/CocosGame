; (function () {
  var ID = "ResRemoteUrl";
  var REGEX = /^\w+:\/\/.*/;

  var ResRemoteUrl = window.ResRemoteUrl = function () {
    this.id = ID;
    this.async = true;
    this.pipeline = null;
    this.REMOTE_SERVER_ROOT = '';
  };

  ResRemoteUrl.ID = ID;
  ResRemoteUrl.prototype.handle = function (item, callback) {
    cc.log(1111)
    var url = item.url.substring(0, Partner.HEAD_IMG_HOST.length);
    if (url == Partner.HEAD_IMG_HOST) {
      callback(null, item);
      return;
    }

    item.url = Partner.CDN_HOST + item.url;
    console.log(item.url);
    callback(null, item);
  }

  var resRemoteUrl = window.resRemoteUrl = new ResRemoteUrl();
}());
