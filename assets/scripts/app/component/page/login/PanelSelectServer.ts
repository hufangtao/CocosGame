import BasePanel from "../../BasePanel";
import * as ConfigVO from "../../../common/config/vo/ConfigVO";
import AccManager from "./AccManager";
import GamePersist from "../../../common/persist/GamePersist";



const {ccclass, property} = cc._decorator;

@ccclass
export default class PanelSelectServer extends BasePanel {
  

  @property(cc.Node)
  public panelNode: cc.Node = null;

  @property(cc.Node)
  public contentNode: cc.Node = null;

  @property(cc.Node)
  public rootNode: cc.Node = null ;

  @property(cc.Button)
  public closeBtn: cc.Button = null ;

  private serverGroup: string = null;

  private groupLen: number = null;

  private grouplist: any = null ;

  private default: number = 0;


    public start() {

      this.serverGroup = window['Partner'].SERVER_GROUP;

      this.grouplist = ConfigVO.ServerList.getExtra("group_list")[this.serverGroup];
      this.groupLen = this.grouplist.length;

      this.closeBtn.node.on(cc.Node.EventType.TOUCH_END, this.onCloseBtn, this);

      for ( let i = 0; i < this.groupLen ; i++) {
      this.createPanel(ConfigVO.ServerList.get(this.grouplist[i]).name, i);
      if ( ConfigVO.ServerList.get(this.grouplist[i]).default === 1) {
           this.default = i;
      }
      }
    }

    public createPanel( serverName: string, index: number) {
        const newNode = cc.instantiate(this.panelNode);
        newNode.active = true;
        newNode.getChildByName("btn").getChildByName("name").getComponent(cc.Label).string = serverName ;
        newNode.parent = this.contentNode;
        const self = this;
        newNode.getChildByName("btn").on(cc.Node.EventType.TOUCH_END, function(event) {
          GamePersist.INSTANCE.btnAudio_1();
          self.switchServer(index); 
          }, this);

    }

    public switchServer(index: number) {
      
      const serverID: string = this.grouplist[index];

      AccManager.INSTANCE.setServerData(serverID);
      this.rootNode.destroy();
      
      

    }

    public onCloseBtn() {
      GamePersist.INSTANCE.btnAudio_1();
      this.rootNode.destroy();
    }

  }



