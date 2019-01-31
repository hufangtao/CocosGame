// 不规则触摸
const { ccclass, requireComponent, menu } = cc._decorator;
@ccclass
@requireComponent(cc.PolygonCollider)
@menu('Component/PolygonHitTest')
export default class PolygonHitTest extends cc.Component {
    onLoad() {
        this.node._oldHitTest = this.node._hitTest.bind(this.node);
        this.node._hitTest = this.polygonHitTest.bind(this.node);
    };
    /**
     * 不规则多边形触摸测试
     * @param {触摸点} point 
     * @param {监听} listener 
     */
    polygonHitTest(point, listener) {
        var polygonCollider = this.getComponent(cc.PolygonCollider);
        if (polygonCollider) {
            point = this.convertToNodeSpace(point);
            point.x -= this.getContentSize().width / 2;
            point.y -= this.getContentSize().height / 2;
            return cc.Intersection.pointInPolygon(point, polygonCollider.points);
        } else {
            return this._oldHitTest(point, listener);
        }
    }
}
