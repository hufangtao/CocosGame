import DYAudio from "../../../dyGame/DYAudio";
import DYAudioH from "../../../dyGame/DYAudioH";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Audio extends cc.Component {

    @property({ type: cc.AudioClip })
    audBg: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audMatch: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audBomb_row: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audBomb_around: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audBomb_magnet: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audSpawn_Bomb: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audDrop: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audCountDown: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audTimeEnd: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audBonusTime: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audVictory: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audLose: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audCollect: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audBuff1: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audBuff2: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audBuff3: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audBuff4: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audGiveFlower: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audDestroyFlower: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audDestroyBottle: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audDestroyBug: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audGood: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audGreat: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audExcellent: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audAmazing: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audUnbelievable: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audReadyGo: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audTrick: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audMiss: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audOpponentMiss: cc.AudioClip = null;
    @property({ type: cc.AudioClip })
    audRemaindTime: cc.AudioClip = null;

    @property({ type: cc.AudioClip })
    audBuffInValid: cc.AudioClip = null;

    tBgPve;
    public playBg() {
        // DYAudioH.playBgm(this.audBg);
        this.tBgPve = DYAudio.playMusic(this.audBg, true);
    }
    public stopBgPve() {
        DYAudio.stopMusic(this.tBgPve);
    }

    public strip() {
        // DYAudioH.playEffect(this.audMatch);
        // let index = Math.floor(Math.random() * this.audMatchs.length)
        // DYAudio.playEffect(this.audMatchs[index],false);
        DYAudio.playEffect(this.audMatch, false);
    }

    public bombRow() {
        // DYAudioH.playEffect(this.audBomb_row);
        DYAudio.playEffect(this.audBomb_row, false);
    }

    public bombAround() {
        //console.log('bombAround');
        // DYAudioH.playEffect(this.audBomb_around);
        DYAudio.playEffect(this.audBomb_around, false);
    }

    public bombMagnet() {
        // DYAudioH.playEffect(this.audBomb_magnet);
        DYAudio.playEffect(this.audBomb_magnet, false);
    }

    public spawnBomb() {
        // DYAudioH.playEffect(this.audSpawn_Bomb);
        DYAudio.playEffect(this.audSpawn_Bomb, false);
    }

    public drop() {
        // DYAudioH.playEffect(this.audDrop);
        DYAudio.playEffect(this.audDrop, false);
    }

    public countDownAudio() {
        // DYAudioH.playEffect(this.audCountDown);
        DYAudio.playEffect(this.audCountDown, false);
    }
    public timeEndAudio() {
        // DYAudioH.playEffect(this.audTimeEnd);
        DYAudio.playEffect(this.audTimeEnd, false);
    }

    canPlayCollect = false;
    public collect() {
        if (this.canPlayCollect) {
            return;
        }
        this.canPlayCollect = true;
        // DYAudioH.playEffect(this.audCollect);
        DYAudio.playEffect(this.audCollect, false);
        this.scheduleOnce(() => {
            this.canPlayCollect = false;
        }, 1)
    }

    public victory() {
        // DYAudioH.playEffect(this.audVictory);
        DYAudio.playMusic(this.audVictory, false);
    }
    public lose() {
        // DYAudioH.playEffect(this.audLose);
        DYAudio.playMusic(this.audLose, false);
    }

    public buff1() {
        DYAudio.playEffect(this.audBuff1, false);
    }
    public buff2() {
        DYAudio.playEffect(this.audBuff2, false);
    }
    public buff3() {
        DYAudio.playEffect(this.audBuff3, false);
    }
    public buff4() {
        DYAudio.playEffect(this.audBuff4, false);
    }

    public flower() {
        DYAudio.playEffect(this.audGiveFlower, false);
    }

    public destroyFlower() {
        DYAudio.playEffect(this.audDestroyFlower, false);
    }
    public destroyBottle() {
        DYAudio.playEffect(this.audDestroyBottle, false);
    }
    public destroyBug() {
        DYAudio.playEffect(this.audDestroyBug, false);
    }

    public good() {
        DYAudio.playEffect(this.audGood, false);
    }
    public great() {
        DYAudio.playEffect(this.audGreat, false);
    }
    public excellent() {
        DYAudio.playEffect(this.audExcellent, false);
    }
    public amazing() {
        DYAudio.playEffect(this.audAmazing, false);
    }
    public unbelievable() {
        DYAudio.playEffect(this.audUnbelievable, false);
    }

    public readyGo() {
        DYAudio.playEffect(this.audReadyGo, false);
    }
    public trick() {
        DYAudio.playEffect(this.audTrick, false);
    }
    public miss() {
        DYAudio.playEffect(this.audMiss, false);
    }
    public opponentMiss() {
        DYAudio.playEffect(this.audOpponentMiss, false);
    }
    public remaindTime() {
        DYAudio.playEffect(this.audRemaindTime, false);
    }

    tBonusTime;
    public bonusTime() {
        this.tBonusTime = DYAudio.playMusic(this.audBonusTime, true);
    }
    public stopBonusTime() {
        DYAudio.stopMusic(this.tBonusTime);
    }

    public buffInValid() {
        DYAudio.playEffect(this.audBuffInValid, false);
    }
}
