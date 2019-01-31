;(function () {
    Partner = Partner.extends();
    Partner.PARTNER_NAME = "TouTiao";

    function isEmptyObject(obj) {
        var t;
        for (t in obj) {
            return !1;
        }
        return !0;
    }

    function loginFirstTime() {
        // 首次登录时，拉起授权
        tt.authorize({
            success(res) {
                if (res.errMsg.indexOf(":ok") !== -1) {
                    // 授权成功
                    login();
                } else {
                    Partner.inputAccount(2);
                }
            },
            fail(res) {
                // 授权失败
                Partner.inputAccount(2);
            },
            complete(res) {
            }
        });
    }

    function openSetting() {
        tt.showModal({
            title: '需要您的授权',
            content: '游戏需要您的昵称信息才能正常运行，请点击"确定"进行授权。\n在授权管理中选中"用户信息"，然后重新登陆即可。',
            showCancel: false,
            success: function (res) {
                if (res.confirm) {
                    tt.openSetting({
                        success: function (res) {
                            console.log("openSetting success", res.authSetting);
                            // 用户授权，转到login
                            login();
                        }
                    })
                }
            }
        });
    }

    function checkSettingState() {
        tt.getSetting({
            success(res) {
                var authSetting = res.authSetting;
                // 首次授权 调用登陆并获取用户信息
                if (isEmptyObject(authSetting)) {
                    loginFirstTime();
                } else {
                    // 用户没有授权访问信息
                    if (authSetting['scope.userInfo'] === false) {
                        openSetting();
                    } else {
                        login();
                    }
                }
            },
            fail(res) {

            },
            complete(res) {

            }
        });
    }

    function login(){
    //    授权成功的情况下，调用login
        console.log("authorize success login------------------------");
        tt.login({
            success (res) {
                console.log(`login调用成功${res.code} ${res.anonymousCode}`);
                tt.getUserInfo({
                    withCredentials: true,
                    success (res) {
                        console.log(`getUserInfo调用成功${res.userInfo}`);
                    },
                    fail (res) {
                        console.log(`getUserInfo调用失败`);
                    }
                });
            },
            fail (res) {
                console.log(`login调用失败`);
                Partner.inputAccount(1);
            }
        });
    }

    Partner.getLaunchOptions = function () {
        return tt.getLaunchOptionsSync();
    }

    Partner.energyTest = function () {
        return false;
    }

    Partner.getLaunchQuery = function () {
        var launchOption = tt.getLaunchOptionsSync();
        return launchOption.query;
    }

    // 进行账号授权操作
    Partner.doAccAuthorize = function (didAccAuthorizeCallback, inputAccountCallback, existSaved) {
        Partner.didAccAuthorize = didAccAuthorizeCallback;
        Partner.inputAccount = inputAccountCallback;
        checkSettingState();
    }

    Partner.copyToClipboard = function (str) {
    }

    // 进行邀请
    Partner.doInvite = function (params, inviteCallback) {
        params.complete = function () {
            inviteCallback()
        };
        params.success = function () {
        };
        params.fail = function () {
        };
        tt.shareAppMessage(params);

        var inviterUrl = location.origin + location.pathname + "?inviter=" + params;
        var callbackParam = {};
        callbackParam.url = inviterUrl;
        inviteCallback(true, callbackParam);
    }

    // 炫耀一下
    Partner.doFlaunt = function (params, flauntCallback) {
        Partner.startFlauntTime = Date.now();
        params.complete = function () {
            console.log('complete');
            // flauntCallback()
        };
        params.success = function () {
        };
        params.fail = function () {
        };
        tt.shareAppMessage(params);
        flauntCallback();
        return;

        var canvas = cc.game.canvas;
        params.complete = function () {
            flauntCallback();
        }
        params.success = function () {
        };
        params.fail = function () {
        };
        var yScale = canvas.height / 1280;
        var xScale = canvas.width / 720;
        var cutHeight = 520;
        var cutWidth = cutHeight * 5 / 4;

        cutWidth = cutWidth * xScale;
        cutHeight = cutHeight * yScale;

        var cutX = Math.max(0, (canvas.width - cutWidth) / 2);
        var cutY = ((canvas.height - cutHeight) / 2 - 70 * yScale);

        canvas.toTempFilePath({
            x: cutX,
            y: cutY,
            width: cutWidth,
            height: cutHeight,
            destWidth: 500,
            destHeight: 400,
            fileType: "jpg",
            success: function (res) {
                var imgUrl = res.tempFilePath;
                params.imageUrl = imgUrl;
                tt.shareAppMessage(params);
            }
        });
    }

    Partner.previewImg = function (params) {
        var options = {};
        // var img = "https://dsqpk-cdn.dayukeji.com/resource/res/1133.jpg";
        options.current = params[0];
        options.urls = params; //[img, img, img];
        options.success = function () {
        };
        options.fail = function () {
        };
        tt.previewImage(options);
    }

    // 成功获取的账号授权
    Partner.didAccAuthorize = function (accData) {
        Partner.didAccAuthorizeCallback(accData);
    }

    // 设置用户的数据到平台
    Partner.setUserStar = function (star) {
        // var starData = {};
        // starData.key = "play_star";
        // starData.value = star + "";
        // var kvDataList = [starData];
        // var options = {};
        // options.KVDataList = kvDataList;
        // options.success = function () {
        // };
        // options.fail = function () {
        // };
        // options.complete = function () {
        // };
        // tt.setUserCloudStorage(options);
    }


    Partner.getSharedCanvas = function () {
        // console.log("#########sharedCanvas", sharedCanvas);
        return sharedCanvas;
    }


    // Zip文件下载器
    Partner.zipDownloadHandler = function (item, callback) {
        // 小程序这里这个函数不应该有实现 因为不会调用这里
    }

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
    }

    Partner.registerZipLoad = function () {
        cc.loader.addLoadHandlers({"zip": Partner.zipLoadHandler});
    }

    //显示分享按钮
    Partner.showShareMenu = function () {
        tt.showShareMenu();
    }

    //隐藏分享按钮
    Partner.hideShareMenu = function () {
        tt.hideShareMenu();
    }

    // 注册分享app的回调
    Partner.registerShareAppCallback = function (callback1, callback2) {
        tt.onShareAppMessage(callback1);
        callback2 && callback2();
    }

    function makeResUrl(fileName) {
        if (Partner.FLAUNT_IMG_HOST) {
            return Partner.FLAUNT_IMG_HOST + fileName;
        } else {
            return fileName;
        }
    }

    Partner.shareImgUrl = function (imgName) {

        return makeResUrl(imgName);
    }


    Partner.registerOnShowCallback = function (callback) {
        tt.onShow(callback);
    }

    Partner.registerOnHideCallback = function (callback) {
        tt.onHide(callback);
    }

    Partner.sendDomainMsg = function (msg) {
        tt.postMessage(msg);
    }

    Partner.supportSocialFriend = function () {
        return true;
    }

    Partner.supportShop = function () {
        return true;
    }

    Partner.supportUserInfo = function () {
        return true;
    }

    Partner.supportAd = function () {
        return true;
    }

    Partner.supportGameClub = function () {
        return true;
    }

    Partner.initHomeAd = function (homeAdCallback) {
        Partner.homeAdCallback = homeAdCallback;
        Partner.homeBanner = tt.createBannerAd({adUnitId: 'adunit-8eaf09e8bd9be0be'});

        Partner.homeBanner.onResize(function (adRes) {
            var scrRes = tt.getSystemInfoSync();
            // 先设置广告宽度和屏幕一致，高度是否满足
            var scale = adRes.height / adRes.width;
            var fullWidthHeight = scale * scrRes.screenWidth;
            var spaceHeight = scrRes.screenHeight / 2 - 410 / (720 / scrRes.screenWidth);
            var height;
            var y;
            if (spaceHeight <= 0) {
                // 没有空间了
                Partner.hideHomeAd();
            }
            if (spaceHeight < fullWidthHeight) {
                // 不能采用全宽
                height = spaceHeight;
                y = scrRes.screenHeight / 2 + 410 / (720 / scrRes.screenWidth);
            } else {
                height = fullWidthHeight;
                y = scrRes.screenHeight - fullWidthHeight;
            }
            if (height / scale < 300) {
                height = 300 * scale;
            }
            Partner.homeBanner.style.top = y;
            Partner.homeBanner.style.left = (scrRes.screenWidth - height / scale) / 2;
            Partner.homeBanner.style.height = height;
            Partner.homeBanner.style.width = height / scale;
            Partner.homeAdCallback && Partner.homeAdCallback(scrRes.screenWidth, height / scale, height);
        });
        Partner.homeBanner.style.height = 301;
        Partner.homeBanner.onError(function (err) {
            console.log("播放错误，错误为");
            console.log(err);
        })
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

    Partner.showOverAd = function () {
        Partner.overBanner = tt.createBannerAd({adUnitId: 'adunit-7b345e261f27426b'});

        Partner.overBanner.onResize(function (adRes) {
            var scrRes = tt.getSystemInfoSync();
            // 先设置广告宽度和屏幕一致，高度是否满足
            var scale = adRes.height / adRes.width;
            var fullWidthHeight = scale * scrRes.screenWidth;
            var spaceHeight = scrRes.screenHeight / 2 - 500 / (720 / scrRes.screenWidth);
            var height;
            var y;
            if (spaceHeight <= 0) {
                // 没有空间了
                Partner.hideOverAd();
            }
            if (spaceHeight < fullWidthHeight) {
                // 不能采用全宽
                height = spaceHeight;
                y = scrRes.screenHeight / 2 + 500 / (720 / scrRes.screenWidth);
            } else {
                height = fullWidthHeight;
                y = scrRes.screenHeight - fullWidthHeight;
            }
            if (height / scale < 300) {
                height = 300 * scale;
            }
            Partner.overBanner.style.top = y;
            Partner.overBanner.style.left = (scrRes.screenWidth - height / scale) / 2;
            Partner.overBanner.style.height = height;
            Partner.overBanner.style.width = height / scale;
        });
        Partner.overBanner.style.width = 301;

        Partner.overBanner.show().then(function () {
            //console.log("banner成功加载");
        }).catch(function (err) {
            //console.log(err);
        });
        Partner.overBanner.onError(function (err) {
            console.log("播放错误，错误为");
            console.log(err);
        })
    }

    Partner.hideOverAd = function () {
        if (Partner.overBanner) {
            Partner.overBanner.hide();
        }
    }

    Partner.initVideoAd = function () {
        if (Partner.videoAd == null) {
            Partner.videoAd = tt.createRewardedVideoAd({adUnitId: 'adunit-2f956939e59860f9'});
            Partner.videoAd.onError(function (err) {
                Partner.watchErrorVide && Partner.watchErrorVide();
                console.log("播放错误，错误为");
                console.log(err);
            });
            Partner.videoAd.onClose(function (res) {
                if (res && res.isEnded || res === undefined) {
                    console.log("看完了视频，获得奖励,回调入奖励函数");
                    Partner.watchOverVide && Partner.watchOverVide();
                }
                else {
                    console.log("没有看完视频，无法获取奖励");
                }
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

    Partner.getServerId = function () {
        // return "501";
        return "221";
    };

})();
