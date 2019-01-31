"use strict";
cc._RF.push(module, 'bbe5c+J0L9Ls7vIu+H1gU1+', 'PolygonHitTest');
// scripts/dyGame/component/PolygonHitTest.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 不规则触摸
var _a = cc._decorator, ccclass = _a.ccclass, requireComponent = _a.requireComponent, menu = _a.menu;
var PolygonHitTest = /** @class */ (function (_super) {
    __extends(PolygonHitTest, _super);
    function PolygonHitTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PolygonHitTest.prototype.onLoad = function () {
        this.node._oldHitTest = this.node._hitTest.bind(this.node);
        this.node._hitTest = this.polygonHitTest.bind(this.node);
    };
    ;
    /**
     * 不规则多边形触摸测试
     * @param {触摸点} point
     * @param {监听} listener
     */
    PolygonHitTest.prototype.polygonHitTest = function (point, listener) {
        var polygonCollider = this.getComponent(cc.PolygonCollider);
        if (polygonCollider) {
            point = this.convertToNodeSpace(point);
            point.x -= this.getContentSize().width / 2;
            point.y -= this.getContentSize().height / 2;
            return cc.Intersection.pointInPolygon(point, polygonCollider.points);
        }
        else {
            return this._oldHitTest(point, listener);
        }
    };
    PolygonHitTest = __decorate([
        ccclass,
        requireComponent(cc.PolygonCollider),
        menu('Component/PolygonHitTest')
    ], PolygonHitTest);
    return PolygonHitTest;
}(cc.Component));
exports.default = PolygonHitTest;

cc._RF.pop();