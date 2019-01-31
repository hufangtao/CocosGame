const {ccclass, property} = cc._decorator;

@ccclass
export default class Particle extends cc.Component {

    @property(cc.ParticleSystem)
    particle1: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    particle2: cc.ParticleSystem = null;
    @property(cc.ParticleSystem)
    particle3: cc.ParticleSystem = null;


    public setArrPosition(x: number, y: number) {
        this.node.setPosition(80 * (x - 4) + 80 / 2,
        80 * y + 80 / 2);
    }

    play () {
        this.particle1.resetSystem();
        this.particle2.resetSystem();
        this.particle3.resetSystem();

        this.scheduleOnce(()=>{
            this.node.destroy();
        },1);
    }

    // update (dt) {}
}
