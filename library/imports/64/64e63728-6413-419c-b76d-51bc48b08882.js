"use strict";
cc._RF.push(module, '64e63coZBNBnLdtUbxIsIiC', 'Misc');
// scripts/app/common/Misc.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ConfigVO = require("./config/vo/ConfigVO");
var Modules = require("../module/Modules");
var PlaymateHead_1 = require("../component/prefab/PlaymateHead");
var Defines_1 = require("./Defines");
var ProtoReflect_1 = require("./net/proto/ProtoReflect");
function goToPreload() {
    cc.director.loadScene("preload");
}
exports.goToPreload = goToPreload;
function goToHome(from) {
    if (from === void 0) { from = Defines_1.OpenHomeFrom.UI_LOGIN; }
    cc.director.loadScene("home");
    Modules.Home.OpenHomeFrom = from;
}
exports.goToHome = goToHome;
function setButtonSpriteFrame(button, spFrame) {
    var buttonSp = button.getComponent(cc.Sprite);
    buttonSp.spriteFrame = spFrame;
    buttonSp.enabled = false;
    buttonSp.enabled = true;
}
exports.setButtonSpriteFrame = setButtonSpriteFrame;
// 根据星数计算荣耀段位
function calcHonorId(star) {
    var rangeList = ConfigVO.Honor.getExtra("range");
    for (var i = 0; i < rangeList.length; i++) {
        var range = rangeList[i];
        var honorId = range[0];
        var minStar = range[1];
        if (star >= minStar) {
            return honorId;
        }
    }
}
exports.calcHonorId = calcHonorId;
// 根据星数计算段位名称
function getGradeName(star) {
    var maxStarList = ConfigVO.Honor.getExtra("max_star");
    var maxStar = maxStarList[0];
    if (star >= maxStar) {
        return "最强王者";
    }
    var sysHonorId = calcHonorId(star);
    var sysHonor = ConfigVO.Honor.get(sysHonorId);
    return sysHonor.name;
}
exports.getGradeName = getGradeName;
function calcShowStarCount(star) {
    var showStarNum = 0;
    if (star > 0) {
        var maxStarList = ConfigVO.Honor.getExtra("max_star");
        var maxStar = maxStarList[0];
        if (star >= maxStar) {
            showStarNum = 5;
        }
        else {
            showStarNum = star % 5;
            if (showStarNum === 0) {
                showStarNum = 5;
            }
        }
    }
    return showStarNum;
}
exports.calcShowStarCount = calcShowStarCount;
function formatDateTime(inputTime) {
    var date = new Date(inputTime);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var strM = m < 10 ? ("0" + m) : ("" + m);
    var d = date.getDate();
    var strD = d < 10 ? ("0" + d) : ("" + d);
    var h = date.getHours();
    var strH = h < 10 ? ("0" + h) : ("" + h);
    var min = date.getMinutes();
    var strMin = min < 10 ? ("0" + min) : ("" + min);
    var sec = date.getSeconds();
    var strSec = sec < 10 ? ("0" + sec) : ("" + sec);
    return y + "-" + strM + "-" + strD + " " + strH + ":" + strMin + ":" + strSec;
}
exports.formatDateTime = formatDateTime;
function showHeadImg(headNode, playmateId, headUrl) {
    var playmateHead = PlaymateHead_1.default.GetComponent(headNode);
    playmateHead.PlaymateId = playmateId;
    playmateHead.HeadUrl = headUrl;
}
exports.showHeadImg = showHeadImg;
// 从数组中随机选择一个
function randSelect(items) {
    if (!items) {
        return;
    }
    var cnt = items.length;
    var index = Math.floor(cnt * Math.random());
    return items[index];
}
exports.randSelect = randSelect;
// 随机一个主动分享内容
function randManualShare() {
    return randShare("manual_list");
}
exports.randManualShare = randManualShare;
// 随机一个邀请分享内容
function randInviteShare() {
    return randShare("invite_list");
}
exports.randInviteShare = randInviteShare;
// 随机一个炫耀分享内容
function randFlauntShare() {
    return randShare("flaunt_list");
}
exports.randFlauntShare = randFlauntShare;
function formatPercent(value) {
    return Math.floor(value * 100) + "%";
}
exports.formatPercent = formatPercent;
// 随机整数
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.getRandomInt = getRandomInt;
function randShare(kind) {
    var inviteList = ConfigVO.Share.getExtra(kind);
    var shareId = randSelect(inviteList);
    return ConfigVO.Share.get(shareId);
}
function protoErrMsg(code) {
    var msg = ProtoReflect_1.ProtoErrorCode[code];
    if (!msg) {
        return "ErrorCode:" + code;
    }
    return msg;
}
exports.protoErrMsg = protoErrMsg;
function httpPost(url, params, callback) {
    var xhr = cc.loader.getXMLHttpRequest();
    xhr.onreadystatechange = function () {
        cc.log("xhr.readyState=" + xhr.readyState + "  xhr.status=" + xhr.status);
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            var respone = xhr.responseText;
            callback(respone);
        }
        else {
            callback(null);
        }
    };
    xhr.open("POST", url, true);
    if (cc.sys.isNative) {
        xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
    }
    xhr.timeout = 5000; // 5 seconds for timeout  
    xhr.send(params);
}
exports.httpPost = httpPost;

cc._RF.pop();