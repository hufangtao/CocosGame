; (function () {
    Partner = Partner.extends();

    Partner.userInfo = {};
    Partner.SHOW_GM = true;
    Partner.PARTNER_NAME = 'qgame';
    Partner.HEAD_IMG_HOST = "";
    Partner.FLAUNT_PIC_HOST = "https://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/";

    Partner.alert = function (msg) {
        qg.showToast({
            message: 'qgame' + msg
        })
    }
    // 进行账号授权操作
    Partner.doAccAuthorize = function (didAccAuthorizeCallback, inputAccountCallback, existSaved) {
        Partner.didAccAuthorizeCallback = didAccAuthorizeCallback;
        Partner.getProfile();
    }

    // 账号授权相关
    Partner.supportUserInfo = function () {
        return true;
    };

    Partner.authorize = function () {
        qg.authorize({
            type: "token",
            success: function (obj) {
                qg.showToast({
                    message: "accessToken: " + obj.accessToken
                })
                setToken(obj.accessToken);
                getProfile(obj.accessToken);

            },
            fail: function (data, code) {
                qg.showToast({
                    message: "handling fail, fail code: " + code
                })
            }
        })
    }

    Partner.getProfile = function () {
        getToken((accessToken) => {
            if (accessToken) {
                getProfile(accessToken);
            } else {
                Partner.authorize();
            }
        });

    }

    Partner.initVideoAd = function () {
        if (Partner.videoAd == null) {
            Partner.videoAd = qg.createInterstitialAd({
                posId: 'xxxx'
            });
        }
    };

    Partner.showVideoAd = function (overCallback, errorCallback) {
        Partner.watchOverVide = overCallback;
        Partner.watchErrorVide = errorCallback;
        Partner.videoAd.show().catch(function (err) {
            Partner.watchErrorVide && Partner.watchErrorVide();
            console.log("播放失败，错误为");
            console.log(err);
        });

    };

    Partner.initHomeAd = function (homeAdCallback) {
        Partner.homeAdCallback = homeAdCallback;
        Partner.homeBanner = qg.createBannerAd({
            adUnitId: 'adunit-8eaf09e8bd9be0be',
            posId: 'xxxx',
            style: {}
        });
    }

    Partner.showHomeAd = function (showHomeAdCallback) {
        if (showHomeAdCallback) {
            Partner.showHomeAdCallback = showHomeAdCallback;
        }
        if (!Partner.homeBanner) {
            return;
        }
        Partner.homeBanner.show().then(function () {
            Partner.showHomeAdCallback && Partner.showHomeAdCallback();
            //console.log("banner成功加载");
        }).catch(function (err) {
            //console.log(err);
        });
    }

    Partner.hideHomeAd = function () {
        if (Partner.homeBanner) {
            Partner.homeBanner.hide();
        }
    }



    Partner.supportSocialFriend = function () {
        return false;
    }

    Partner.supportShop = function () {
        return false;
    }

    Partner.supportAd = function () {
        return qg.getSystemInfoSync() >= 1031;
    }

    Partner.supportGameClub = function () {
        return false;
    }

    Partner.getServerId = function () {
        // return "501";
        return "221";
    };
})()

function getToken(cb) {
    qg.getStorage({
        key: 'token',
        success: function (data) {
            // cb && cb(data);
            cb && cb(data);
        },
        fail: function (data, code) {
            qg.showToast({
                message: "handling fail, code = ${code}"
            })
        }
    })
}
function setToken(token) {
    qg.setStorage({
        key: 'token',
        value: token,
        success: function (data) {
            qg.showToast({
                message: "保存token success"
            })
            console.log('setToken success')
        },
        fail: function (data, code) {
            console.log(`handling fail, code = ${code}`)
        }
    })
}

function getProfile(accessToken) {
    qg.getProfile({
        token: accessToken,
        success: function (data) {
            qg.showToast({
                message: "accessToken: " + accessToken
            })

            var jsonParam = {
                "nickName": data.nickname,
                "imgUrl": data.avatar
            };
            var strParam = JSON.stringify(jsonParam);
            var loginData = {
                platform: Partner.PARTNER_NAME,
                openid: data.openid,
                openkey: "",
                params: strParam
            };
            Partner.didAccAuthorizeCallback && Partner.didAccAuthorizeCallback(loginData);
        },
        fail: function (data, code) {
            qg.showToast({
                message: "handling fail, code=" + code
            })
            Partner.authorize();
        }
    })
}