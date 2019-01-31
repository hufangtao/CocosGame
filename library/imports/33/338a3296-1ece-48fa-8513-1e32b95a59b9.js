"use strict";
cc._RF.push(module, '338a3KWHs5I+oUTHjK5Wlm5', 'AccManager');
// scripts/app/component/page/login/AccManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var SocketDefine_1 = require("../../../common/net/socket/SocketDefine");
var NetController_1 = require("../../../common/net/NetController");
var Modules = require("../../../module/Modules");
var ConfigVO = require("../../../common/config/vo/ConfigVO");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var HomeManager_1 = require("../home/HomeManager");
var Misc_1 = require("../../../common/Misc");
var ProtoReflect_1 = require("../../../common/net/proto/ProtoReflect");
var NetUtil_1 = require("../../../common/net/NetUtil");
var ProtoSectionAcc_1 = require("../../../common/net/proto/mods/ProtoSectionAcc");
var Defines_1 = require("../../../common/Defines");
var AccManager = /** @class */ (function () {
    function AccManager() {
        this.retryTimes = 0; // 断开连接后 重新连接尝试的次数
        this.accModule = Modules.Acc;
    }
    Object.defineProperty(AccManager, "INSTANCE", {
        get: function () {
            if (!this.singleInstance) {
                this.singleInstance = new AccManager();
            }
            return this.singleInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccManager.prototype, "LoginUI", {
        get: function () {
            return this.loginUI;
        },
        set: function (value) {
            this.loginUI = value;
        },
        enumerable: true,
        configurable: true
    });
    AccManager.prototype.setServerData = function (ID) {
        this.serverID = ID;
        // this.loginUI.btnServer.node.getComponentInChildren(cc.Label).string = ConfigVO.ServerList.get(ID).name;
    };
    // 获取到授权
    AccManager.prototype.didGetAuthorize = function (data) {
        this.accModule.LoginData = data;
        if (NetController_1.default.INSTANCE.Connected) {
            this.requestLogin();
        }
        else {
            this.connectServer(data);
        }
    };
    // 进入游戏
    AccManager.prototype.didEnterGame = function () {
        //console.log("didEnterGame 成功进入游戏");
    };
    // 切换到Home 这里有一个加载过程 非直接切换过去
    AccManager.prototype.switchToHome = function () {
        Modules.Home.OpenHomeFrom = Defines_1.OpenHomeFrom.UI_LOGIN;
        GamePersist_1.default.INSTANCE.loadScene('home');
    };
    // 进行网络连接
    AccManager.prototype.connectServer = function (data) {
        this.retryTimes = 0;
        NetController_1.default.INSTANCE.on(SocketDefine_1.SOCKET_CONNECT, this.onServerConnected, this);
        NetController_1.default.INSTANCE.off(SocketDefine_1.SOCKET_CONNECT, this.onServerReConnected, this);
        var serverVo = ConfigVO.ServerList.get(this.serverID);
        NetController_1.default.INSTANCE.connect(serverVo.ip, serverVo.port, serverVo.path, serverVo.security);
    };
    // 重新连接服务器
    AccManager.prototype.reConnectServer = function () {
        GamePersist_1.default.INSTANCE.ForceWaiting();
        this.retryTimes = this.retryTimes + 1;
        NetController_1.default.INSTANCE.on(SocketDefine_1.SOCKET_CONNECT, this.onServerReConnected, this);
        NetController_1.default.INSTANCE.off(SocketDefine_1.SOCKET_CONNECT, this.onServerConnected, this);
        var serverVo = ConfigVO.ServerList.get(this.serverID);
        NetController_1.default.INSTANCE.reConnect(serverVo.ip, serverVo.port, serverVo.path, serverVo.security);
    };
    // 网络成功连接
    AccManager.prototype.onServerConnected = function (data) {
        NetController_1.default.INSTANCE.off(SocketDefine_1.SOCKET_CONNECT, this.onServerConnected, this);
        this.requestLogin();
    };
    // 网络重新连接成功
    AccManager.prototype.onServerReConnected = function () {
        NetController_1.default.INSTANCE.off(SocketDefine_1.SOCKET_CONNECT, this.onServerReConnected, this);
        this.requestReLogin();
    };
    // 请求登录
    AccManager.prototype.requestLogin = function () {
        var gameAccount = this.getGameAccount();
        // console.log("gameAccount",gameAccount,"game_open_id",gameAccount.game_open_id);
        var gameAccountId = gameAccount.game_open_id;
        var gameAccountSign = gameAccount.game_open_id_sign;
        // 发送登陆协议
        var loginMsg = new ProtoSectionAcc_1.AccLoginC2S();
        loginMsg.platform = this.accModule.DataAcc.accPlatform;
        loginMsg.channelParam = this.accModule.DataAcc.accPlatformParam;
        loginMsg.channelOpenId = this.accModule.DataAcc.accOpenId;
        loginMsg.gameAccountId = gameAccountId;
        loginMsg.gameAccountSign = gameAccountSign;
        console.log("发送的登录协议" + loginMsg.platform + loginMsg.channelOpenId + "频道openid" + loginMsg.channelParam);
        NetUtil_1.default.SendMsg(loginMsg);
    };
    // 请求重新登录
    AccManager.prototype.requestReLogin = function () {
        var reloginMsg = new ProtoSectionAcc_1.AccReloginC2S();
        reloginMsg.id = this.accModule.PlayerId;
        reloginMsg.loginKey = this.accModule.DataAcc.gameLoginToken;
        reloginMsg.openId = this.accModule.DataAcc.gameOpenId;
        NetUtil_1.default.SendMsg(reloginMsg);
    };
    // 收到服务器端的登陆回应
    AccManager.prototype.onReceiveLoginS2C = function (msg) {
        if (!this.loginUI) {
            return;
        }
        if (msg.code > 0) {
            this.loginUI.hideLoading();
            var errMsg = Misc_1.protoErrMsg(msg.code);
            GamePersist_1.default.INSTANCE.Toast(errMsg);
            window['Partner'].cleanLoginState();
            if (window['Partner'].PARTNER_NAME !== "Dev") {
                this.loginUI.showAccInput(2);
            }
            return;
        }
        var channelOpenId = msg.channelOpenId; // 第三方的open id
        var gameAccountId = msg.gameAccountId; // 游戏角色的账号Id
        var gameAccountSign = msg.gameAccountSign; // 游戏账号Id的签名(用于验证)
        var gameLoginToken = msg.gameLoginKey; // 本次登陆的token
        this.accModule.DataAcc.accOpenId = channelOpenId;
        this.accModule.DataAcc.gameLoginToken = gameLoginToken;
        this.accModule.DataAcc.gameUnionid = gameLoginToken;
        this.accModule.DataAcc.gameOpenId = gameAccountId;
        this.accModule.DataAcc.gameOpenIdSign = gameAccountSign;
        // 同时存储到Partner中
        window['Partner'].userInfo.openId = channelOpenId;
        this.saveGameAccount();
        var playerId = msg.id;
        // console.log("msg:",msg,"msg.id",msg.id);
        if (playerId > 0) {
            this.accModule.PlayerId = playerId;
            this.doSendEnterGame();
        }
        else {
            this.handleCreatePlayer();
        }
        // 开始同步服务器时间
        GamePersist_1.default.INSTANCE.startSyncServerTime();
    };
    // 收到重新登录的返回
    AccManager.prototype.onReceiveReLoginS2C = function (msg) {
        GamePersist_1.default.INSTANCE.CancelWaiting();
        // 重登录成功
        cc.log(msg);
        if (msg.code === 0) {
            this.retryTimes = 0;
            HomeManager_1.default.INSTANCE.onReLaunch();
        }
    };
    // 收到创建角色的返回
    AccManager.prototype.onReceiveCreateS2C = function (msg) {
        if (!this.loginUI) {
            return;
        }
        if (msg.code > 0) {
            var errMsg = ProtoReflect_1.ProtoErrorCode[msg.code] || "ErrCode:" + msg.code;
            GamePersist_1.default.INSTANCE.toast(errMsg);
            return;
        }
        var playerId = msg.id;
        this.accModule.PlayerId = playerId;
        // 进入游戏
        this.doSendEnterGame();
    };
    // 收到服务器对进入游戏的返回
    AccManager.prototype.onReceiveEnterS2C = function (msg) {
        if (!this.loginUI) {
            return;
        }
        if (msg.code > 0) {
            // TODO 进行错误的提示
            GamePersist_1.default.INSTANCE.toast("EnterS2C" + msg.code);
            return;
        }
        this.didEnterGame();
    };
    // 发送进入游戏协议
    AccManager.prototype.doSendEnterGame = function () {
        var enterMsg = new ProtoSectionAcc_1.AccEnterC2S();
        enterMsg.id = this.accModule.PlayerId;
        NetUtil_1.default.SendMsg(enterMsg);
    };
    // 角色创建逻辑 如果平台支持获取用户信息 就不显示创建角色的界面
    AccManager.prototype.handleCreatePlayer = function () {
        if (window['Partner'].supportUserInfo()) {
            this.doSendCreatePlayer();
        }
        else {
            this.loginUI.showAccCreateRole();
        }
    };
    // 发送创建玩家协议
    AccManager.prototype.doSendCreatePlayer = function () {
        var createMsg = new ProtoSectionAcc_1.AccCreateC2S();
        NetUtil_1.default.SendMsg(createMsg);
    };
    Object.defineProperty(AccManager.prototype, "RetryTimes", {
        get: function () {
            return this.retryTimes;
        },
        set: function (value) {
            this.retryTimes = value;
        },
        enumerable: true,
        configurable: true
    });
    // 请求服务器时间
    AccManager.prototype.requestServerTime = function () {
        if (NetController_1.default.INSTANCE.Connected) {
            var msgServerTime = new ProtoSectionAcc_1.AccServertimeC2S();
            NetUtil_1.default.SendMsg(msgServerTime);
        }
    };
    // 是否存在保存的游戏账号信息
    AccManager.prototype.existSavedGameAccount = function () {
        var gameAccount = this.getGameAccount();
        var gameOpenId = gameAccount.game_open_id;
        var gameOpenSign = gameAccount.game_open_id_sign;
        return gameOpenId !== "" && gameOpenSign !== "";
    };
    AccManager.prototype.saveGameAccount = function () {
        var key = "game_account";
        var gameAccount = {
            game_open_id: this.accModule.DataAcc.gameOpenId,
            game_open_id_sign: this.accModule.DataAcc.gameOpenIdSign,
        };
        var data = JSON.stringify(gameAccount);
        cc.sys.localStorage.setItem(key, data);
    };
    AccManager.prototype.getGameAccount = function () {
        var key = "game_account";
        var gameAccount = {
            game_open_id: "",
            game_open_id_sign: "",
        };
        var data = cc.sys.localStorage.getItem(key);
        try {
            if (data) {
                var savedData = JSON.parse(data);
                if (savedData.game_open_id) {
                    gameAccount.game_open_id = savedData.game_open_id;
                    gameAccount.game_open_id_sign = savedData.game_open_id_sign;
                }
            }
        }
        catch (e) {
            cc.warn("faild parse account data");
        }
        return gameAccount;
    };
    return AccManager;
}());
exports.default = AccManager;

cc._RF.pop();