import { PStarRank } from "../../../../common/net/proto/ProtoType";
import * as Misc from "../../../../common/Misc";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RankTopThreePlayer extends cc.Component {

  public static GetComponent(node: cc.Node): RankTopThreePlayer {
    return node.getComponent(RankTopThreePlayer);
  }

  @property(cc.Label)
  public textHonor: cc.Label = null;

  @property(cc.Label)
  public textName: cc.Label = null;

  @property(cc.Node)
  public nodeHead: cc.Node = null;

  @property(cc.Sprite)
  public imgMale: cc.Sprite = null;

  @property(cc.Sprite)
  public imgFemale: cc.Sprite = null;

  public start() {

  }

  public setEmpty() {
      console.log("enter set setEmpty Player===========================");
    this.imgFemale.node.active = false;
    this.imgMale.node.active = false;
    this.nodeHead.active = false;
    this.textHonor.string = "";
    this.textName.string = "";
  }

  public setRankPlayer(playerStar: PStarRank) {
    console.log("enter set Rank Player===========================");
    this.nodeHead.active = true;
    const headImg = playerStar.headImg;
    const playerId = playerStar.id;
    const playStar = playerStar.star;
    Misc.showHeadImg(this.nodeHead, playerId, headImg);
    this.textName.string = playerStar.name;
    this.textHonor.string = Misc.getGradeName(playStar);
    const isMale: boolean = playerStar.sex === 1;
    this.imgFemale.node.active = !isMale;
    this.imgMale.node.active = isMale;
  }
}
