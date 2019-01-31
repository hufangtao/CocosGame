
Partner = Partner.extends();


Partner.PARTNER_NAME = "Huawei";

// 授权进行登录
Partner.doAccAuthorize = function(didAccAuthorizeCallback, inputAccountCallback, existSaved) {
  Partner.didAccAuthorizeCallback = didAccAuthorizeCallback;
  window.HiSpaceObject.getPlayerId();
  inputAccountCallback(0);
};

// 华为在执行 getPlayId()后主动调用
window.setPlayerId = function(playerId, appId, ts, sign) {
  alert("#######"+"playerId:"+playerId+"######appid:"+appId+"#####ts:"+ts+"##########sign"+sign);
  var jsonParam = {
    "ts": ts,
    "sign": sign
  };
  var strParam = JSON.stringify(jsonParam);
  var accData = {};
  accData.openid = playerId;
  accData.openkey = playerId;
  accData.platform = "Huawei";
  accData.params = strParam;
  // 传参数
  Partner.didAccAuthorize(accData);
};

Partner.didAccAuthorize = function(accData) {
  // alert("#######didAccAuthorize");
  Partner.didAccAuthorizeCallback(accData);
};
Partner.energyTest = function () {
  return false;
}