(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/component/prefab/PlaymateHead.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e7a4eyqV7VES7T57YzX9W4T', 'PlaymateHead', __filename);
// scripts/app/component/prefab/PlaymateHead.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var PlaymateHead = /** @class */ (function (_super) {
    __extends(PlaymateHead, _super);
    function PlaymateHead() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.imgHead = null;
        _this.playmateId = 0;
        return _this;
    }
    PlaymateHead.GetComponent = function (node) {
        return node.getComponent("PlaymateHead");
    };
    PlaymateHead.prototype.setSize = function (width, height) {
        this.node.setContentSize(width, height);
        this.imgHead.node.setContentSize(width, height);
    };
    PlaymateHead.prototype.start = function () {
    };
    PlaymateHead.prototype.showUnknownHead = function () {
        this.imgHead.node.active = false;
    };
    Object.defineProperty(PlaymateHead.prototype, "HeadUrl", {
        // 设置头像的Url
        set: function (url) {
            var _this = this;
            if (this.headImgUrl === url) {
                return;
            }
            if (url.length < 1) {
                return;
            }
            this.headImgUrl = url;
            if (this.headImgUrl.substr(0, 5) == "head_") {
                var ImgUrl = this.headImgUrl.substring(0, this.headImgUrl.lastIndexOf('.'));
                cc.loader.loadRes("res/prefab/createRole/img_" + ImgUrl, cc.SpriteFrame, function (err, spriteFrame) {
                    if (err) {
                        cc.warn("load head img:" + url + " err:" + err);
                        _this.imgHead.node.active = false;
                        return;
                    }
                    _this.imgHead.spriteFrame = spriteFrame;
                    // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
                });
                return;
            }
            var remoteUrl = window['Partner'].HEAD_IMG_HOST + this.headImgUrl;
            cc.loader.load(remoteUrl, function (err, texture) {
                if (err) {
                    cc.warn("load head img:" + url + " err:" + err);
                    _this.imgHead.node.active = false;
                    return;
                }
                if (_this.imgHead) {
                    _this.imgHead.spriteFrame = new cc.SpriteFrame(texture);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaymateHead.prototype, "PlaymateId", {
        get: function () {
            return this.playmateId;
        },
        set: function (value) {
            this.playmateId = value;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        property(cc.Sprite)
    ], PlaymateHead.prototype, "imgHead", void 0);
    PlaymateHead = __decorate([
        ccclass
    ], PlaymateHead);
    return PlaymateHead;
}(cc.Component));
exports.default = PlaymateHead;

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
        //# sourceMappingURL=PlaymateHead.js.map
        