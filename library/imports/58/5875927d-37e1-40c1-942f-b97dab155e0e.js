"use strict";
cc._RF.push(module, '58759J9N+FAwZQvuX2rFV4O', 'Particle');
// scripts/app/component/game/Particle.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Particle = /** @class */ (function (_super) {
    __extends(Particle, _super);
    function Particle() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.particle1 = null;
        _this.particle2 = null;
        _this.particle3 = null;
        return _this;
        // update (dt) {}
    }
    Particle.prototype.setArrPosition = function (x, y) {
        this.node.setPosition(80 * (x - 4) + 80 / 2, 80 * y + 80 / 2);
    };
    Particle.prototype.play = function () {
        var _this = this;
        this.particle1.resetSystem();
        this.particle2.resetSystem();
        this.particle3.resetSystem();
        this.scheduleOnce(function () {
            _this.node.destroy();
        }, 1);
    };
    __decorate([
        property(cc.ParticleSystem)
    ], Particle.prototype, "particle1", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], Particle.prototype, "particle2", void 0);
    __decorate([
        property(cc.ParticleSystem)
    ], Particle.prototype, "particle3", void 0);
    Particle = __decorate([
        ccclass
    ], Particle);
    return Particle;
}(cc.Component));
exports.default = Particle;

cc._RF.pop();