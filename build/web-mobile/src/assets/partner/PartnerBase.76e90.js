(function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n(e):"function"==typeof define&&define.amd?define(n):n(e)})("undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:this,function(e){var o=e.Partner||{};Object.setPrototypeOf=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e},o.SERVER_GROUP=0,o.PARTNER_NAME="Dev",o.CHANNEL=0,o.CDN_HOST="",o.HEAD_IMG_HOST="https://dsqpk-cdn.dayukeji.com/fruit/wxhead/",o.toastCallback=null,o.userInfo={},o.extends=function(){var e={};return Object.setPrototypeOf(e,o),e.super=o,e},o.getLaunchOptions=function(){return o.getLaunchQuery()},o.getLaunchQuery=function(){var e=location.search;if(!e)return{};var n=new Object;if(-1!=e.indexOf("?"))for(var t=e.substr(1).split("&"),o=0;o<t.length;o++){var r=t[o].split("=");if(2<r.length){var a=t[o].split(r[0]+"=");n[r[0]]=a[1]}else n[r[0]]=r[1]}return n},o.postMsg=function(e,n){},o.getKeyChain=function(n,e){if(n)return e.split(".").every(function(e){return!!n[e]&&(n=n[e],!0)})?n:void 0},o.doAccAuthorize=function(e,n,t){o.didAccAuthorizeCallback=e,n(1)},o.copyToClipboard=function(e){var n=document.createElement("textarea");n.value=e,n.setAttribute("readonly",""),n.style.contain="strict",n.style.position="absolute",n.style.left="-9999px",n.style.fontSize="12pt",document.body.appendChild(n);var t=!1,o=document.getSelection();0<o.rangeCount&&(t=o.getRangeAt(0)),n.select(),document.execCommand("copy"),document.body.removeChild(n),t&&(document.getSelection().removeAllRanges(),document.getSelection().addRange(t))},o.doInvite=function(e,n){var t=location.origin+location.pathname+"?inviter="+e,o={};o.url=t,n(!0,o)},o.doFlaunt=function(e){o.toastCallback&&o.toastCallback("当前平台不支持此功能")},o.previewImg=function(e){o.toastCallback&&o.toastCallback("当前平台不支持此功能")},o.didAccAuthorize=function(e){o.didAccAuthorizeCallback(e)},o.setUserStar=function(e){},o.getSharedCanvas=function(){return null},o.zipDownloadHandler=function(e,t){var o=cc.loader.getXMLHttpRequest();o.open("GET",e.url,!0),o.responseType="arraybuffer",o.onload=function(e){var n=o.response;n?t(null,n):t(new Error("download zip failed"+e))},o.onerror=function(e){t(new Error("download zip faied"+e))},o.send(null)},o.zipLoadHandler=function(e,n){var t=e.content,o={},r=new JSZip(t).files;for(var a in r)if(r.hasOwnProperty(a)){var i=r[a];o[a]=i.asUint8Array()}n(null,o)},o.registerZipLoad=function(){cc.loader.addDownloadHandlers({zip:o.zipDownloadHandler}),cc.loader.addLoadHandlers({zip:o.zipLoadHandler})},o.resUpdate=function(e){e()},o.needPreloadOpponentHead=function(){return!1},o.cleanLoginState=function(){},o.energyTest=function(){return!0},o.showShareMenu=function(){},o.hideShareMenu=function(){},o.registerShareAppCallback=function(e){},o.shareImgUrl=function(e){return e},o.registerOnShowCallback=function(e){},o.registerOnHideCallback=function(e){},o.registerToastCallback=function(e){o.toastCallback=e},o.sendDomainMsg=function(e){},o.supportSocialFriend=function(){return!1},o.supportUserInfo=function(){return!1},o.getCommendatoryData=function(e,n){},o.getServerId=function(){return"221"},e.Partner=o});