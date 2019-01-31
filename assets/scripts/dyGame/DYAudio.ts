import DYData from './DYData';

export default class DYAudio{
    static playEffect(filePath, loop: boolean, volume:number = 1.0) : number{
		return DYAudioHelper.theInstance.playEffect(filePath, loop, volume);
    }
    
    static playMusic(filePath, loop: boolean, volume: number = 1.0) : number{
		return DYAudioHelper.theInstance.playMusic(filePath, loop, volume);
    }

    static stopMusic(audioId?: number) : void{
		return  DYAudioHelper.theInstance.stopMusic(audioId);
    }
    static hasMusicPlaying() : boolean{
		return  DYAudioHelper.theInstance.hasMusicPlaying();
    }
    // 独奏指定音效的处理: playTheEffect, stopTheEffect, getTheEffect
	static playTheEffect(filePath: string, loop: boolean, volume:number) : void{
		DYAudioHelper.theInstance.playTheEffect(filePath, loop, volume);
    }

    static stopTheEffect() : void{
    	DYAudioHelper.theInstance.stopTheEffect();
    }

    static getTheEffect() : number{
    	return DYAudioHelper.theInstance.getTheEffect();
    }

    static setLoop(audioId: number, loop: boolean) : void{
		cc.audioEngine.setLoop(audioId, loop);
	}

	static isLoop(audioId: number) : boolean{
		return cc.audioEngine.isLoop(audioId);
    }
    
    static setVolume(audioId: number, volume: number) : void{
        cc.audioEngine.setVolume(audioId, volume);
	}

	static getVolume(audioId: number) : number{
        return cc.audioEngine.getVolume(audioId);
    }
    
    static pause(audioId: number) : void{
        cc.audioEngine.pause(audioId);
	}

	static resume(audioId: number) : void{
        DYAudioHelper.theInstance.resume(audioId);
	}

	static pauseAll() : void{
        cc.audioEngine.pauseAll();
	}

	static resumeAll() : void{
        DYAudioHelper.theInstance.resumeAll();
	}

	static stop(audioId: number) : void{
        cc.audioEngine.stop(audioId);
	}

	static stopAll() : void{
        DYAudioHelper.theInstance.stopAll();
    }
    
    static getDuration(audioId: number): number{
        return cc.audioEngine.getDuration(audioId);
    }		
	
    static getState(audioId: number): cc.audioEngine.AudioState{
        return cc.audioEngine.getState(audioId);
    }	

    static setFinishCallback(audioId: number, callback: Function) : void{
        cc.audioEngine.setFinishCallback(audioId, callback);
	}

	static uncache(filePath: string): void{
        cc.audioEngine.uncache(filePath);
	}

	static uncacheAll() : void{
        cc.audioEngine.uncacheAll();
	}

    static setMusicMute (flag: boolean) : void{
        DYAudioHelper.theInstance.setMusicMute(flag);
	}

	static setSoundMute (flag: boolean) : void{
        DYAudioHelper.theInstance.setSoundMute(flag);
	}

	static isMusicMute() : boolean{
        return DYAudioHelper.theInstance.isMusicMute();
	}

	static isSoundMute() : boolean{
        return DYAudioHelper.theInstance.isSoundMute();
    }
}

let kMusicFlag = "5d88ad10-bb04-43c1-aeb7-332cd2ceb268";
let kSoundFlag = "14a4c65c-d25c-4867-a840-9ac3b0021d19";

let S_MUSIC_FLAG = false;
let S_SOUND_FLAG = false;

class DYAudioHelper{
    public static get theInstance(): DYAudioHelper {
        if (!DYAudioHelper.mInstance) {
            DYAudioHelper.mInstance = new DYAudioHelper();
        }
        return DYAudioHelper.mInstance;    
      }
    
    private static mInstance: DYAudioHelper;

    private mCurMusic:number =  null;
    private mCurMusicFile:string = null;
    
    private mCurTheEffect:number = null;
    
    private mMusicVol : number = 1.0;
    private mSoundVol : number = 1.0;

    public playEffect(filePath, loop: boolean, volume:number){
		if (S_SOUND_FLAG || !filePath){
			return;
        }
        this.mSoundVol = volume;
		return cc.audioEngine.play(filePath, loop, volume);
    }
    
    public playMusic(filePath, loop: boolean, volume: number){
		let self = this;

        filePath = filePath || self.mCurMusicFile;
		if (self.isMusicMute() || !filePath){
			return;
		}

		
		if (self.mCurMusic != null) {
			if(filePath == self.mCurMusicFile){
				return;
			}
			
			self.stopMusic(self.mCurMusic);
		}
		
        this.mMusicVol = volume;
		self.mCurMusic = cc.audioEngine.play(filePath, loop, volume)
		self.mCurMusicFile = filePath;
		
		return self.mCurMusic;
    }

    public stopMusic(audioId: number) : void{
		var self = this;
		
		self.stopTheEffect()

		if (self.mCurMusic == null){
			return;
		}

		audioId = audioId || self.mCurMusic;
		cc.audioEngine.stop(audioId);

		self.mCurMusic = null;
    }
    
    // 独奏指定音效的处理: playTheEffect, stopTheEffect, getTheEffect
	public playTheEffect(snd: string, loop: boolean, volume:number){
		var self = this;
		
		if(self.isSoundMute()){
			return;
		}

        if(!self.mCurTheEffect){
            cc.audioEngine.pauseAll();
            self.mCurTheEffect = cc.audioEngine.play(snd, loop, volume);
        }
    }

    public stopTheEffect(){
    	var self = this;
    	if (!self.mCurTheEffect){
    		return;
    	}

    	cc.audioEngine.stop(self.mCurTheEffect);
        self.mCurTheEffect = null;
        self.resumeAll();
    }

    public getTheEffect() : number{
    	return this.mCurTheEffect;
    }

    public resume(audioId: number) : void{
		if(S_MUSIC_FLAG){
			return;
		}

		cc.audioEngine.resume(audioId);
	}

	public resumeAll() : void{
		if(S_MUSIC_FLAG){
			return;
		}
		
		return cc.audioEngine.resumeAll();
	}

	public stopAll() : void{
		this.stopTheEffect()
		return cc.audioEngine.stopAll();
    }
    
   
    public setMusicMute (flag: boolean) : void{
        S_MUSIC_FLAG = flag;
        DYData.setStat(kMusicFlag, S_MUSIC_FLAG?"TRUE":"FALSE");
		
		if (flag) {
			this.playMusic(null, true, this.mMusicVol);
		} else {
			this.stopMusic(null);
		}
	}

	public setSoundMute (flag: boolean) : void{
        S_SOUND_FLAG = flag;
        DYData.setStat(kSoundFlag, S_SOUND_FLAG?"TRUE":"FALSE");
	}

	public hasMusicPlaying() : boolean{
		if(this.mCurMusic){
			return true;
		}else{
			return false
		}
	}

	public isMusicMute() : boolean{
		return S_MUSIC_FLAG;
	}

	public isSoundMute() : boolean{
		return S_SOUND_FLAG;
    }
}