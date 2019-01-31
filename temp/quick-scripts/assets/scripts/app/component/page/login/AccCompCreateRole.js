(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/page/login/AccCompCreateRole.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'cd8d2Ek4I1LMot/2gSyQAsd', 'AccCompCreateRole', __filename);
// scripts/app/component/page/login/AccCompCreateRole.ts

Object.defineProperty(exports, "__esModule", { value: true });
var BaseComponent_1 = require("../../BaseComponent");
var ConfigVO = require("../../../common/config/vo/ConfigVO");
var ProtoSectionAcc_1 = require("../../../common/net/proto/mods/ProtoSectionAcc");
var GamePersist_1 = require("../../../common/persist/GamePersist");
var NetUtil_1 = require("../../../common/net/NetUtil");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var AccCompCreateRole = /** @class */ (function (_super) {
    __extends(AccCompCreateRole, _super);
    function AccCompCreateRole() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nodeCreateContainer = null;
        _this.nodeSelectHeadContainer = null;
        _this.btnSelectHead = null;
        _this.btnSelectHeadDone = null;
        _this.btnDoCreate = null;
        _this.btnSexBoy = null;
        _this.btnSexGirl = null;
        _this.btnRandomName = null;
        _this.headList = null;
        _this.inputRollName = null;
        _this.spfBlue = null;
        _this.spfRed = null;
        // 头像信息
        _this.selectedHeadSp = null;
        _this.selectedHeadNode = null;
        _this.selectedHeadIndex = null;
        _this.HeadRingRed = null;
        _this.HeadRingBlue = null;
        // 性别信息
        _this.sexInfo = null;
        // 玩家名称
        _this.accName = null;
        _this.surnNameLen = null;
        _this.maleNameLen = null;
        _this.femaleNameLen = null;
        return _this;
    }
    AccCompCreateRole.prototype.onLoad = function () {
        var self = this;
        this.btnSelectHead.node.on(cc.Node.EventType.TOUCH_END, this.selectHead, this);
        this.btnSelectHeadDone.node.on(cc.Node.EventType.TOUCH_END, this.selectHeadDone, this);
        this.btnDoCreate.node.on(cc.Node.EventType.TOUCH_END, this.doCreate, this);
        this.btnRandomName.node.on(cc.Node.EventType.TOUCH_END, this.createRandomName, this);
        self.HeadRingRed = this.spfRed;
        self.HeadRingBlue = this.spfBlue;
        // 随机一个头像
        this.selectedHeadIndex = Math.floor(Math.random() * 9 + 1);
        this.selectedHeadNode = this.headList.getChildByName("NodeHead" + this.selectedHeadIndex);
        this.selectedHeadSp = this.selectedHeadNode.getChildByName("Head").getComponentInChildren(cc.Sprite).spriteFrame;
        this.selectedHeadNode.getChildByName("icon-select").active = true;
        this.nodeCreateContainer.getChildByName("HeadContainer").getComponentInChildren(cc.Sprite).spriteFrame = this.selectedHeadSp;
        // 随机一个性别
        this.setSexInfo(Math.floor(Math.random() * 1 + 1));
        this.btnSexBoy.node.on(cc.Node.EventType.TOUCH_END, function () {
            self.setSexInfo(1);
        }, this);
        this.btnSexGirl.node.on(cc.Node.EventType.TOUCH_END, function () {
            self.setSexInfo(2);
        }, this);
        var _loop_1 = function (i) {
            var headName = "NodeHead" + i;
            var headNode = this_1.headList.getChildByName(headName);
            headNode.getChildByName("icon-select").active = false;
            self.selectedHeadNode.getChildByName("icon-select").active = true;
            headNode.on(cc.Node.EventType.TOUCH_END, function () {
                GamePersist_1.default.INSTANCE.btnAudio_1();
                self.selectedHeadSp = headNode.getChildByName("Head").getComponentInChildren(cc.Sprite).spriteFrame;
                self.selectedHeadIndex = i;
                self.selectedHeadNode.getChildByName("icon-select").active = false;
                self.selectedHeadNode = headNode;
                self.selectedHeadNode.getChildByName("icon-select").active = true;
            }, this_1);
        };
        var this_1 = this;
        // 绑定一组头像选择按钮
        for (var i = 1; i < 10; i++) {
            _loop_1(i);
        }
        // 随机角色名
        this.femaleNameLen = ConfigVO.FemaleName.getExtra("id_list").length;
        this.maleNameLen = ConfigVO.MaleName.getExtra("id_list").length;
        this.surnNameLen = ConfigVO.Surname.getExtra("id_list").length;
        this.createRandomName();
    };
    AccCompCreateRole.prototype.selectHead = function () {
        this.nodeCreateContainer.active = false;
        this.nodeSelectHeadContainer.active = true;
    };
    // 设置玩家性别
    AccCompCreateRole.prototype.setSexInfo = function (sex) {
        if (this.sexInfo === sex) {
            return;
        }
        else {
            this.sexInfo = sex;
        }
        if (sex === 1) {
            this.btnSexBoy.node.getChildByName("edging").active = true;
            this.btnSexGirl.node.getChildByName("edging").active = false;
        }
        else {
            this.btnSexBoy.node.getChildByName("edging").active = false;
            this.btnSexGirl.node.getChildByName("edging").active = true;
        }
        this.createRandomName();
    };
    AccCompCreateRole.prototype.selectHeadDone = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        this.nodeCreateContainer.active = true;
        this.nodeSelectHeadContainer.active = false;
        this.nodeCreateContainer.getChildByName("HeadContainer").getComponentInChildren(cc.Sprite).spriteFrame = this.selectedHeadSp;
    };
    AccCompCreateRole.prototype.doCreate = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var msg = new ProtoSectionAcc_1.AccCreateWithParamsC2S();
        // 性别 1男2女
        msg.sex = this.sexInfo;
        msg.head = this.selectedHeadIndex;
        msg.name = this.inputRollName.string;
        msg.params = " ";
        //console.log(msg);
        NetUtil_1.default.SendMsg(msg);
    };
    AccCompCreateRole.prototype.createRandomName = function () {
        GamePersist_1.default.INSTANCE.btnAudio_1();
        var surname = ConfigVO.Surname.get(ConfigVO.Surname.getExtra("id_list")[Math.floor(Math.random() * this.surnNameLen)]).name;
        var lastname;
        if (this.sexInfo === 1) {
            lastname = ConfigVO.MaleName.get(ConfigVO.MaleName.getExtra("id_list")[Math.floor(Math.random() * this.surnNameLen)]).name;
        }
        else {
            lastname = ConfigVO.FemaleName.get(ConfigVO.FemaleName.getExtra("id_list")[Math.floor(Math.random() * this.femaleNameLen)]).name;
        }
        this.accName = surname + lastname;
        this.inputRollName.string = this.accName;
    };
    __decorate([
        property(cc.Node)
    ], AccCompCreateRole.prototype, "nodeCreateContainer", void 0);
    __decorate([
        property(cc.Node)
    ], AccCompCreateRole.prototype, "nodeSelectHeadContainer", void 0);
    __decorate([
        property(cc.Button)
    ], AccCompCreateRole.prototype, "btnSelectHead", void 0);
    __decorate([
        property(cc.Button)
    ], AccCompCreateRole.prototype, "btnSelectHeadDone", void 0);
    __decorate([
        property(cc.Button)
    ], AccCompCreateRole.prototype, "btnDoCreate", void 0);
    __decorate([
        property(cc.Button)
    ], AccCompCreateRole.prototype, "btnSexBoy", void 0);
    __decorate([
        property(cc.Button)
    ], AccCompCreateRole.prototype, "btnSexGirl", void 0);
    __decorate([
        property(cc.Button)
    ], AccCompCreateRole.prototype, "btnRandomName", void 0);
    __decorate([
        property(cc.Node)
    ], AccCompCreateRole.prototype, "headList", void 0);
    __decorate([
        property(cc.EditBox)
    ], AccCompCreateRole.prototype, "inputRollName", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], AccCompCreateRole.prototype, "spfBlue", void 0);
    __decorate([
        property(cc.SpriteFrame)
    ], AccCompCreateRole.prototype, "spfRed", void 0);
    AccCompCreateRole = __decorate([
        ccclass
    ], AccCompCreateRole);
    return AccCompCreateRole;
}(BaseComponent_1.default));
exports.default = AccCompCreateRole;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=AccCompCreateRole.js.map
        