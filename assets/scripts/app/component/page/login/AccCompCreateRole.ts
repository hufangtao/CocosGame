import BaseComponent from "../../BaseComponent";
import * as ConfigVO from "../../../common/config/vo/ConfigVO";
import { AccCreateWithParamsC2S } from "../../../common/net/proto/mods/ProtoSectionAcc";
import { FemaleName } from "../../../common/config/vo/ConfigVO";
import GamePersist from "../../../common/persist/GamePersist";
import NetUtil from "../../../common/net/NetUtil";
const {ccclass, property} = cc._decorator;

@ccclass
export default class AccCompCreateRole extends BaseComponent {
  @property(cc.Node)
  public nodeCreateContainer: cc.Node = null;

  @property(cc.Node)
  public nodeSelectHeadContainer: cc.Node = null;

  @property(cc.Button)
  public btnSelectHead: cc.Button = null;

  @property(cc.Button)
  public btnSelectHeadDone: cc.Button = null;

  @property(cc.Button)
  public btnDoCreate: cc.Button = null;

  @property(cc.Button)
  public btnSexBoy: cc.Button = null;
  
  @property(cc.Button)
  public btnSexGirl: cc.Button = null;

  @property(cc.Button)
  public btnRandomName: cc.Button = null;

  @property(cc.Node)
  public headList: cc.Node = null;

  @property(cc.EditBox)
  public inputRollName: cc.EditBox = null;

  @property(cc.SpriteFrame)
  public spfBlue: cc.SpriteFrame = null;
  @property(cc.SpriteFrame)
  public spfRed: cc.SpriteFrame = null;

  // 头像信息
  private selectedHeadSp: cc.SpriteFrame = null;
  private selectedHeadNode: cc.Node = null;
  private selectedHeadIndex: number = null;

  private HeadRingRed: cc.SpriteFrame = null;
  private HeadRingBlue: cc.SpriteFrame = null;

  // 性别信息
  private sexInfo: number = null;

  // 玩家名称
  private accName: string = null;
  private surnNameLen: number = null;
  private maleNameLen: number = null;
  private femaleNameLen: number = null;


  public onLoad() {

    const self = this;

    this.btnSelectHead.node.on(cc.Node.EventType.TOUCH_END, this.selectHead, this);
    this.btnSelectHeadDone.node.on(cc.Node.EventType.TOUCH_END, this.selectHeadDone, this);
    this.btnDoCreate.node.on(cc.Node.EventType.TOUCH_END, this.doCreate, this);
    this.btnRandomName.node.on(cc.Node.EventType.TOUCH_END, this.createRandomName, this);

    self.HeadRingRed = this.spfRed;
    self.HeadRingBlue = this.spfBlue;


    // 随机一个头像
    this.selectedHeadIndex = Math.floor(Math.random() * 9 + 1);
    this.selectedHeadNode = this.headList.getChildByName("NodeHead" + this.selectedHeadIndex);
    this.selectedHeadSp = this.selectedHeadNode.getChildByName("Head").getComponentInChildren(cc.Sprite).spriteFrame;
    this.selectedHeadNode.getChildByName("icon-select").active = true;
    this.nodeCreateContainer.getChildByName("HeadContainer").getComponentInChildren(cc.Sprite).spriteFrame = this.selectedHeadSp;

    // 随机一个性别
    this.setSexInfo(Math.floor(Math.random() * 1 + 1));
    this.btnSexBoy.node.on(cc.Node.EventType.TOUCH_END, function() {
      self.setSexInfo(1);
    }, this);
    this.btnSexGirl.node.on(cc.Node.EventType.TOUCH_END, function() {
      self.setSexInfo(2);
    }, this);


    // 绑定一组头像选择按钮
    for (let i = 1 ; i < 10 ; i++) {
      const headName = "NodeHead" + i;
      const headNode: cc.Node = this.headList.getChildByName(headName);
      headNode.getChildByName("icon-select").active = false;
      self.selectedHeadNode.getChildByName("icon-select").active = true;

      headNode.on(cc.Node.EventType.TOUCH_END, function() {
        GamePersist.INSTANCE.btnAudio_1();
        self.selectedHeadSp = headNode.getChildByName("Head").getComponentInChildren(cc.Sprite).spriteFrame;
        self.selectedHeadIndex = i;
        self.selectedHeadNode.getChildByName("icon-select").active = false;
        self.selectedHeadNode = headNode;
        self.selectedHeadNode.getChildByName("icon-select").active = true;
      }, this );
    }

    // 随机角色名
    this.femaleNameLen = ConfigVO.FemaleName.getExtra("id_list").length;
    this.maleNameLen = ConfigVO.MaleName.getExtra("id_list").length;
    this.surnNameLen = ConfigVO.Surname.getExtra("id_list").length;
    this.createRandomName();
  }


  private selectHead() {
    this.nodeCreateContainer.active = false;
    this.nodeSelectHeadContainer.active = true;
  }

  // 设置玩家性别
  private setSexInfo(sex: number) {
    if (this.sexInfo === sex) {
      return;
    } else {
      this.sexInfo = sex;
    }
    
    if (sex === 1) {
      this.btnSexBoy.node.getChildByName("edging").active = true;
      this.btnSexGirl.node.getChildByName("edging").active = false;
    } else {
      this.btnSexBoy.node.getChildByName("edging").active = false;
      this.btnSexGirl.node.getChildByName("edging").active = true;
    }
    this.createRandomName();
  }

  private selectHeadDone() {
    GamePersist.INSTANCE.btnAudio_1();
    this.nodeCreateContainer.active = true;
    this.nodeSelectHeadContainer.active = false;
    this.nodeCreateContainer.getChildByName("HeadContainer").getComponentInChildren(cc.Sprite).spriteFrame = this.selectedHeadSp;
  }

  private doCreate() {
    GamePersist.INSTANCE.btnAudio_1();
    const msg: AccCreateWithParamsC2S = new AccCreateWithParamsC2S();
    // 性别 1男2女

    msg.sex = this.sexInfo;
    msg.head = this.selectedHeadIndex;
    msg.name = this.inputRollName.string;
    msg.params = " ";

    //console.log(msg);
    NetUtil.SendMsg(msg);
  }

  private createRandomName() {
    GamePersist.INSTANCE.btnAudio_1();
    const surname: string = ConfigVO.Surname.get(ConfigVO.Surname.getExtra("id_list")[Math.floor(Math.random() * this.surnNameLen)]).name;
    let lastname: string ;

    if (this.sexInfo === 1) {
      lastname = ConfigVO.MaleName.get(ConfigVO.MaleName.getExtra("id_list")[Math.floor(Math.random() * this.surnNameLen)]).name;
    } else {
      lastname = ConfigVO.FemaleName.get(ConfigVO.FemaleName.getExtra("id_list")[Math.floor(Math.random() * this.femaleNameLen)]).name;
    }

    this.accName = surname + lastname ;
    this.inputRollName.string = this.accName;
  }

}
