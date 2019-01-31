import PlaymateHead from "./PlaymateHead";
import { PlaySide } from "../game/PlayDefine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class PlayPlaymateHead extends cc.Component {

  public static getComponent(headNode: cc.Node): PlayPlaymateHead {
    const component: PlayPlaymateHead = headNode.getComponent("PlayPlaymateHead");
    return component;
  }

  @property(cc.Prefab)
  public prefabPlaymateHead: cc.Prefab  = null;

  // 红/蓝框(默认隐藏)
  @property(cc.Node)
  private colorFrameNode: cc.Node = null;

  // 默认头像
  @property(cc.Sprite)
  private unknownHead: cc.Sprite = null;

  @property(cc.Sprite)
  private nameBgSprite: cc.Sprite = null;

  // 名字（默认隐藏）
  @property(cc.Label)
  private nameLabel: cc.Label = null;

  // 性别（默认隐藏）
  @property(cc.Node)
  private sexIconNode: cc.Node = null;

  private nameBgOriginalWidth: number = 0;
  private nodePlaymateHead: cc.Node = null;

  public onLoad() {
    this.nameBgOriginalWidth = this.nameBgSprite.node.width;

    this.nodePlaymateHead = cc.instantiate(this.prefabPlaymateHead);
    this.nodePlaymateHead.parent = this.node;
    this.nodePlaymateHead.setPosition(0, 0);
  }

  public start() {
    this.colorFrameNode.zIndex = (100);
  }

  public setPlaymate(headUrl: string) {
    this.unknownHead.node.active = false;
    const playmateHead: PlaymateHead = PlaymateHead.GetComponent(this.nodePlaymateHead);
    playmateHead.HeadUrl = headUrl;
  }

  public setScale(value: number) {
    this.node.scale = value;
  }

  public setColorFrame(side: PlaySide) {
    this.colorFrameNode.active = true;
    if (side === PlaySide.BLU) {
      this.colorFrameNode.getChildByName("blueBg").active = true;
      this.colorFrameNode.getChildByName("redBg").active = false;
    } else {
      this.colorFrameNode.getChildByName("blueBg").active = false;
      this.colorFrameNode.getChildByName("redBg").active = true;
    }
  }

  // 如果需要设置名字，先将其显示
  public setName(name: string) {
    this.nameBgSprite.node.active = true;
    this.nameLabel.node.active = true;
    this.nameLabel.string = name;
  }
  
  // 如果需要设置性别，先将其显示
  public setSex(sex: number) {
    this.sexIconNode.active = true;
    if (sex === 1) {
      this.sexIconNode.getChildByName("female").active = false;
      this.sexIconNode.getChildByName("male").active = true;
    } else {
      this.sexIconNode.getChildByName("male").active = false;
      this.sexIconNode.getChildByName("female").active = true;
    }
  }
}
