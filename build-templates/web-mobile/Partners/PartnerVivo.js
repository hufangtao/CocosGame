;(function () {
    Partner = Partner.extends();

    Partner.userInfo = {};
    Partner.SHOW_GM = true;
    Partner.PARTNER_NAME = 'vivo';
    Partner.FLAUNT_PIC_HOST = "https://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/";
    Partner.CDN_HOST = "https://dsqpk-cdn.dayukeji.com/fruit/vivo_res/";
    Partner.HEAD_IMG_HOST = "https://sgaxx-play2.dayukeji.com/wx_head/";


    // Zip文件下载器
    Partner.zipDownloadHandler = function (item, callback) {
        // 小程序这里这个函数不应该有实现 因为不会调用这里
    };

    // Zip文件加载器
    Partner.zipLoadHandler = function (item, callback) {
        var arrayBuffer = item.content;
        var files = {};
        var originalBytes = new Uint8Array(arrayBuffer);
        var zipFile = new Zlib.Unzip(originalBytes, {verify: false});
        var fileNames = zipFile.getFilenames();
        var n = fileNames.length;
        for (var i = 0; i < n; i++) {
            var fileName = fileNames[i];
            var fileData = zipFile.decompress(fileName)
            files[fileName] = fileData;
        }
        //console.log("###files", files);
        callback(null, files);
    };

    Partner.registerZipLoad = function () {
        cc.loader.addLoadHandlers({"zip": Partner.zipLoadHandler});
    };

    // 炫耀一下
    Partner.doFlaunt = function (params, flauntCallback) {

    };


    // 账号授权相关
    Partner.supportUserInfo = function () {
        return true;
    };

    function fetchLoginData() {
        var user = hy_dj_sdk.getBaseData();
        console.log("user data", user);
        var jsonParam = {
            "nickName": user.userName,
            "imgPath": user.userImage,
            "appAccountId": user.appAccountId,
            "session": user.session
        };
        var strParam = JSON.stringify(jsonParam);
        let loginData = {
            platform: Partner.PARTNER_NAME,
            openid: user.userId+"",
            openkey: "",
            params: strParam
        };
        console.log("login Data:",loginData);
        Partner.didAccAuthorize(loginData);
    }

    Partner.doAccAuthorize = function (didAccAuthorizeCallback, inputAccountCallback, existSaved) {
        Partner.didAccAuthorize = didAccAuthorizeCallback;
        var config = new Object();
        config.zIndex = 9999;
        config.pin = 1;
        window.hy_dj_sdk.ready(config,function(){
            console.log("xiaomi sdk 接入正常");
            fetchLoginData();
        });
    };

    Partner.didAccAuthorize = function (accData) {
        Partner.didAccAuthorizeCallback(accData);
    };

    // xiaomi服
    Partner.getServerId = function(){
        return "503";
    };

    // 广告相关
    Partner.supportAd = function () {
        return true;
    };

})();