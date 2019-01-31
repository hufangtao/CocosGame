Partner = Partner.extends();

Partner.userInfo = {};
Partner.SHOW_GM = true;
Partner.PARTNER_NAME = 'qqplay';
Partner.HEAD_IMG_HOST = "";
Partner.FLAUNT_PIC_HOST = "https://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/";

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

Partner.energyTest = function () {
    return false;
}

// 监控qqplay 整个生命周期
new BK.Game({
    onLoad: function () {
        if (Partner.onShow) {
            Partner.onShow(GameStatusInfo.gameParam);
        }
    },
    onMaximize: function () {
    },
    onMinimize: function () {
        if (Partner.onHide) {
            Partner.onHide();
        }
    },
    onEnterBackground: function () {
        if (Partner.onHide) {
            Partner.onHide();
        }
    },
    onEnterForeground: function () {
    },
    onShare: function () {
        var shareParam = Partner.qqplayFlaunt();
        console.log("=====================BK.Game.onShare on right================" + shareParam);
        return shareParam;
    },
    onShareComplete: function (app, retCode, shareDest, isFirstShare) {
    }
});

Partner.getLaunchQuery = function () {
    var launchOption = GameStatusInfo.gameParam;
    console.log("##########launchOption:" + launchOption);
    if (launchOption) {
        var option = {};
        var optionArr = launchOption.split("&");

        for (var i = 0; i < optionArr.length; i++) {
            var itemStr = optionArr[i];
            var itemArr = itemStr.split("=");
            if (0 === i){
                option.inviter = itemArr[1];
            } else if (1 === i) {
                option.from = itemArr[1];
            } else if (2 === i) {
                option.time = itemArr[1];
            }
        }
        console.log("option-------------------" + option.inviter + option.from + option.time);
        return option;
    } else {
        return "";
    }
}

// 进行邀请
Partner.doInvite = function (params, inviteCallback) {
    console.log("=============邀请============" + params.summary + params.qqImgUrl + params.extendInfo);
    params.success = function (succObj) {
        BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
        inviteCallback && inviteCallback();
    };
    params.fail = function (failObj) {
        BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
    };
    params.complete = function () {
        BK.Console.log('分享完成');
    };
    BK.Share.share(params);
}

// 炫耀一下
Partner.doFlaunt = function (params, flauntCallback) {
    console.log("=============炫耀一下============" + params.title + params.imageUrl + params.query);
    Partner.startFlauntTime = Date.now();
    BK.Share.share({
        title: params.title,
        summary: params.title,
        qqImgUrl: "http://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/" + params.imageUrl,
        socialPicPath: "GameRes://res/raw-assets/resources/res/share/" + params.imageUrl,
        extendInfo: "",
        success: function (succObj) {
            BK.Console.log('分享成功', succObj.code, JSON.stringify(succObj.data));
            Partner.onShareComplete && Partner.onShareComplete();
            if (Partner.onShow) {
                Partner.onShow(GameStatusInfo.gameParam);
            }
        },
        fail: function (failObj) {
            BK.Console.log('分享失败', failObj.code, JSON.stringify(failObj.msg));
        },
        complete: function () {
            BK.Console.log('分享完成，不论成功失败');
        }
    });
};

// 账号授权相关
Partner.supportUserInfo = function () {
    return true;
};

function fetchLoginData() {
    BK.QQ.fetchOpenKey(function (errCode, cmd, data) {
        if (errCode == 0) {
            var openKey = data.openKey;
            getQQNickName(openKey);
        }
    });
}

function getQQNickName(openKey) {
    BK.MQQ.Account.getNick(GameStatusInfo.openId, function (openID, nick) {
        getQQHead(openKey, nick);
    });
}

function base64ArrayBuffer(arrayBuffer) {
    var base64 = ''
    var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    var bytes = new Uint8Array(arrayBuffer)
    var byteLength = bytes.byteLength
    var byteRemainder = byteLength % 3
    var mainLength = byteLength - byteRemainder

    var a, b, c, d
    var chunk

// Main loop deals with bytes in chunks of 3
    for (var i = 0; i < mainLength; i = i + 3) {
        // Combine the three bytes into a single integer
        chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2]

        // Use bitmasks to extract 6-bit segments from the triplet
        a = (chunk & 16515072) >> 18 // 16515072 = (2^6 - 1) << 18
        b = (chunk & 258048) >> 12 // 258048   = (2^6 - 1) << 12
        c = (chunk & 4032) >> 6 // 4032     = (2^6 - 1) << 6
        d = chunk & 63               // 63       = 2^6 - 1

        // Convert the raw binary segments to the appropriate ASCII encoding
        base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d]
    }

// Deal with the remaining bytes and padding
    if (byteRemainder == 1) {
        chunk = bytes[mainLength]

        a = (chunk & 252) >> 2 // 252 = (2^6 - 1) << 2

        // Set the 4 least significant bits to zero
        b = (chunk & 3) << 4 // 3   = 2^2 - 1

        base64 += encodings[a] + encodings[b] + '=='
    } else if (byteRemainder == 2) {
        chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1]

        a = (chunk & 64512) >> 10 // 64512 = (2^6 - 1) << 10
        b = (chunk & 1008) >> 4 // 1008  = (2^6 - 1) << 4

        // Set the 2 least significant bits to zero
        c = (chunk & 15) << 2 // 15    = 2^4 - 1

        base64 += encodings[a] + encodings[b] + encodings[c] + '='
    }

    return base64
}

function getQQHead(openKey, nickName) {
    BK.MQQ.Account.getHeadEx(GameStatusInfo.openId, function (openID, imgPath) {
        var imgBuff = BK.FileUtil.readFile(imgPath);
        var arrBuff = BK.Misc.BKBufferToArrayBuffer(imgBuff);
        var baseBuff = base64ArrayBuffer(arrBuff);
        console.log("enter getHead callback " + openID);
        var jsonParam = {
            "openkey": openKey,
            "nickName": nickName,
            "imgBuffer": baseBuff
        };
        var strParam = JSON.stringify(jsonParam);
        var loginData = {
            platform: Partner.PARTNER_NAME,
            openid: GameStatusInfo.openId,
            openkey: "",
            params: strParam
        };
        Partner.didAccAuthorize(loginData);
    });
}

Partner.doAccAuthorize = function (didAccAuthorizeCallback, inputAccountCallback, existSaved) {
    Partner.didAccAuthorize = didAccAuthorizeCallback;
    fetchLoginData();
};

Partner.didAccAuthorize = function (accData) {
    Partner.didAccAuthorizeCallback(accData);
};

Partner.copyToClipboard = function (str) {
};

// 注册分享app的回调
Partner.registerShareAppCallback = function (callback1, callback2) {
    Partner.ShareParam = callback1;
    Partner.onShareComplete = callback2;
}

Partner.qqplayFlaunt = function () {
    var param = Partner.ShareParam();
    var shareInfo = {
        summary: param.title,
        localPicPath: "GameRes://res/raw-assets/resources/res/share/" + param.imageUrl,
        picUrl: "http://dsqpk-cdn.dayukeji.com/fruit/flaunt_pics/" + param.imageUrl,
        extendInfo: GameStatusInfo.openId
    };
    console.log("qq play Flaunt share info " + shareInfo.summary + shareInfo.picUrl + shareInfo.extendInfo);
    return shareInfo;
}

// 广告相关
Partner.supportAd = function () {
    return true;
};

Partner.initHomeAd = function (homeAdCallback) {
    Partner.homeAdCallback = homeAdCallback;
    console.log("enter initHomeAd==================================");
    // Partner.homeBanner = BK.Advertisement.createBannerAd({viewId : 1001});
    // Partner.homeBanner.onLoad(function () {
    //     console.log("gome banner loaded");
    // });
    // Partner.homeBanner.onError(function (err) {
    //     console.log("home banner error" + err.msg + err.code);
    // });
    BK.Advertisement.fetchBannerAd(function (retCode, msg, adBannerHandle) {
        if (retCode === 0) {
            Partner.homeBanner = adBannerHandle;
            Partner.homeBanner.show(function (succCode, msg, handle) {
                if (succCode === 0) {
                } else {
                    console.log("==========show HomeBanner Ad in callback Error===================" + msg);
                }
            });
        } else {
            console.log("==========fetch HomeBanner Ad Error===================" + retCode);
        }
    });
}

Partner.showHomeAd = function (showHomeAdCallback) {
    if (showHomeAdCallback) {
        Partner.showHomeAdCallback = showHomeAdCallback;
    }
    if (!Partner.homeBanner) {
        return;
    }
    Partner.homeBanner.show(function (succCode, msg, handle) {
        if (succCode === 0) {
        } else {
            console.log("==========show HomeBanner Ad Error===================" + msg);
        }
    });
}
Partner.hideHomeAd = function () {
    if (Partner.homeBanner) {
        Partner.homeBanner.close();
        Partner.homeBanner = null;
    }
}

Partner.hideOverAd = function () {
    if (Partner.overBanner) {
        Partner.overBanner.close();
        Partner.homeBanner = null;
    }
}

Partner.initVideoAd = function () {
    console.log("enter load video ad===========================================");
    if (Partner.videoAd == null) {
        console.log("load video ad=========================================");
        BK.Advertisement.fetchVideoAd(1, function (retCode, msg, handle) {
            console.log("===========fetch ad callback===========，code:", retCode, ",msg:", msg);
            if (retCode === 0) {
                console.log("video ad loaded=========================================");
                Partner.videoAd = handle;
            } else {
                console.log("===========视频拉取失败===========，code:", code, ",msg:", msg);
                Partner.watchErrorVide && Partner.watchErrorVide();
            }
        });

    }
};

Partner.showVideoAd = function (overCallback, errorCallback) {

    Partner.watchOverVide = overCallback;
    Partner.watchErrorVide = errorCallback;
    console.log("showVideoAd  ==================================");
    if (Partner.videoAd == null) {
        BK.Advertisement.fetchVideoAd(1, function (retCode, msg, handle) {
            console.log("===========fetch ad callback===========，code:", retCode, ",msg:", msg);
            if (retCode === 0) {
                console.log("video ad loaded=========================================");
                Partner.videoAd = handle;
                Partner.showVideoAd(overCallback, errorCallback);
            } else {
                console.log("===========视频拉取失败===========，code:", code, ",msg:", msg);
                Partner.watchErrorVide && Partner.watchErrorVide();
            }
        });
    } else {
        Partner.videoAd.setEventCallback(
            function (code, msg) {
                // 游戏关闭回调
                console.log("===========游戏关闭===========，code:", code, ",msg:", msg);
                Partner.videoAd = null;
            },
            function (code, msg) {
                Partner.videoAd = null;
                Partner.finishVideoAd = 1;
                // 视频播放结束
                console.log("===========视频播放结束===========，code:", code, ",msg:", msg, "Partner.finishVideoAd", Partner.finishVideoAd);
            },
            function (code, msg) {
                // 关闭视频
                console.log("===========关闭视频===========，code:", code, ",msg:", msg, "Partner.finishVideoAd", Partner.finishVideoAd);
                Partner.videoAd = null;
                if (1 === Partner.finishVideoAd) {
                    Partner.watchOverVide && Partner.watchOverVide();
                }
            },
            function (code, msg) {
                // 开始播放
                console.log("===========开始播放===========，code:", code, ",msg:", msg);
                Partner.videoAd = null;
            });
        Partner.videoAd.jump();
        Partner.finishVideoAd = 0;
    }
};

// 相关
Partner.registerOnShowCallback = function (callback) {
    Partner.onShow = callback;
}

Partner.registerOnHideCallback = function (callback) {
    Partner.onHide = callback;
}

// 排行榜相关
Partner.supportSocialFriend = function () {
    return true;
};

// 设置用户的数据到平台
Partner.setUserStar = function (star) {
    console.log("set -------------------- User Star " + star);
    var data = {
        userData: [
            {
                openId: GameStatusInfo.openId,
                startMs: ((new Date()).getTime()).toString(),
                endMs: ((new Date()).getTime()).toString(),
                scoreInfo: {
                    score: parseInt(star * 10000 + ""),
                },
            },
        ],
        attr: {
            score: {
                type: 'rank',
                order: 4,
            }
        },
    };
    BK.QQ.uploadScoreWithoutRoom(1, data, function (errCode, cmd, data) {
        console.log("upload suc=================================================" + JSON.stringify(data));
        if (errCode !== 0) {
            BK.Script.log(1, 1, '上传分数失败!--------------------错误码：' + errCode);
        }
    });
}

Partner.getRankList = function (callback) {
    // 拉取 pvp score 排行榜
    var attr = "score";
    var order = 1;
    var rankType = 0;
    BK.QQ.getRankListWithoutRoom(attr, order, rankType,
        function (errCode, cmd, data) {
            BK.Script.log(1, 1, "getRankListWithoutRoom callback  cmd" + cmd + " errCode:" + errCode + "  data:" + JSON.stringify(data));
            // 返回错误码信息
            if (errCode !== 0) {
                return;
            }
            // 解析数据
            if (data) {
                callback && callback(data);
            }
        });
}

// qqplay服
Partner.getServerId = function () {
    return "501";
    // return "221";
};