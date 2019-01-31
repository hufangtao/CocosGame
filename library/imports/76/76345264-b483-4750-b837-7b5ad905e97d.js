"use strict";
cc._RF.push(module, '76345JktINHULg3e1rZBel9', 'DYGame');
// scripts/dyGame/DYGame.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 所有组件的基类
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var DYGame = /** @class */ (function (_super) {
    __extends(DYGame, _super);
    function DYGame() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DYGame_1 = DYGame;
    DYGame.prototype.onLoad = function () {
        cc.game.addPersistRootNode(this.node);
        DYGame_1.theRoot = this;
    };
    DYGame.theRoot = null;
    DYGame = DYGame_1 = __decorate([
        ccclass
    ], DYGame);
    return DYGame;
    var DYGame_1;
}(cc.Component));
exports.default = DYGame;

cc._RF.pop();