const { ccclass, property } = cc._decorator;

@ccclass
export default class PlaymateHead extends cc.Component {

  public static GetComponent(node: cc.Node): PlaymateHead {
    return node.getComponent("PlaymateHead");
  }

  @property(cc.Sprite)
  private imgHead: cc.Sprite = null;

  private playmateId: number = 0;
  private headImgUrl: string;


  public setSize(width, height) {
    this.node.setContentSize(width, height);
    this.imgHead.node.setContentSize(width, height);
  }

  public start() {
  }

  public showUnknownHead() {
    this.imgHead.node.active = false;
  }

  // 设置头像的Url
  public set HeadUrl(url: string) {
    if (this.headImgUrl === url) {
      return;
    }
    if (url.length < 1) {
      return;
    }
    this.headImgUrl = url;

    if (this.headImgUrl.substr(0, 5) == "head_") {
      var ImgUrl = this.headImgUrl.substring(0, this.headImgUrl.lastIndexOf('.'));
      cc.loader.loadRes("res/prefab/createRole/img_" + ImgUrl, cc.SpriteFrame, (err, spriteFrame) => {
        if (err) {
          cc.warn(`load head img:${url} err:${err}`);
          this.imgHead.node.active = false;
          return;
        }
        this.imgHead.spriteFrame = spriteFrame;
        // cc.loader.setAutoReleaseRecursively(spriteFrame, true)
      });
      return;
    }

    const remoteUrl = window['Partner'].HEAD_IMG_HOST + this.headImgUrl;
    cc.loader.load(remoteUrl, (err, texture: cc.Texture2D) => {
      if (err) {
        cc.warn(`load head img:${url} err:${err}`);

        this.imgHead.node.active = false;
        return;
      }
      if (this.imgHead) {
        this.imgHead.spriteFrame = new cc.SpriteFrame(texture);
      }
    });
  }

  public get PlaymateId(): number {
    return this.playmateId;
  }
  public set PlaymateId(value: number) {
    this.playmateId = value;
  }
}
