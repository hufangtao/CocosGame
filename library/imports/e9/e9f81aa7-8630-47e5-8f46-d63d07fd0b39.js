"use strict";
cc._RF.push(module, 'e9f81qnhjBH5Y9G1j0H/Qs5', 'PanelSelectServer');
// scripts/app/component/page/login/PanelSelectServer.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BasePanel_1 = require("../../BasePanel");
var ConfigVO = require("../../../common/config/vo/ConfigVO");
var AccManager_1 = require("./AccManager");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PanelSelectServer = /** @class */ (function (_super) {
    __extends(PanelSelectServer, _super);
    function PanelSelectServer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.panelNode = null;
        _this.contentNode = null;
        _this.rootNode = null;
        _this.closeBtn = null;
        _this.serverGroup = null;
        _this.groupLen = null;
        _this.grouplist = null;
        _this.default = 0;
        return _this;
    }
    PanelSelectServer.prototype.start = function () {
        this.serverGroup = window['Partner'].SERVER_GROUP;
        this.grouplist = ConfigVO.ServerList.getExtra("group_list")[this.serverGroup];
        this.groupLen = this.grouplist.length;
        this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, this.onCloseBtn, this);
        for (var i = 0; i < this.groupLen; i++) {
            this.createPanel(ConfigVO.ServerList.get(this.grouplist[i]).name, i);
            if (ConfigVO.ServerList.get(this.grouplist[i]).default === 1) {
                this.default = i;
            }
        }
    };
    PanelSelectServer.prototype.createPanel = function (serverName, index) {
        var newNode = cc.instantiate(this.panelNode);
        newNode.active = true;
        newNode.getChildByName("btn").getChildByName("name").getComponent(cc.Label).string = serverName;
        newNode.parent = this.contentNode;
        var self = this;
        newNode.getChildByName("btn").on(cc.Node.EventType.TOUCH_END, function (event) {
            GamePersist_1.default.INSTANCE.btnAudio_1();
            self.switchServer(index);
        }, this);
    };
    PanelSelectServer.prototype.switchServer = function (index) {
        var serverID = this.grouplist[index];
        AccManager_1.default.INSTANCE.setServerData(serverID);
        this.rootNode.destroy();
    };
    PanelSelectServer.prototype.onCloseBtn = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.rootNode.destroy();
    };
    __decorate([
        property(cc.Node)
    ], PanelSelectServer.prototype, "panelNode", void 0);
    __decorate([
        property(cc.Node)
    ], PanelSelectServer.prototype, "contentNode", void 0);
    __decorate([
        property(cc.Node)
    ], PanelSelectServer.prototype, "rootNode", void 0);
    __decorate([
        property(cc.Button)
    ], PanelSelectServer.prototype, "closeBtn", void 0);
    PanelSelectServer = __decorate([
        ccclass
    ], PanelSelectServer);
    return PanelSelectServer;
}(BasePanel_1.default));
exports.default = PanelSelectServer;

cc._RF.pop();