import DataAcc from "../../../module/data/mod/DataAcc";
import AccNetHandler from "./AccNetHandler";
import BaseModule from "../../../module/BaseModule";

export default class AccModule extends BaseModule {
  private static MODULE_NAME: string = "acc";

  private dataAcc: DataAcc;
  private protoHandler: AccNetHandler;

  constructor() {
    super(AccModule.MODULE_NAME);
  }

  public onCreated() {
    this.dataAcc = new DataAcc();
    this.protoHandler = new AccNetHandler();
  }

  public set LoginData(loginData) {
    this.dataAcc.accOpenId        = loginData.openid;
    this.dataAcc.accPlatform      = loginData.platform;
    this.dataAcc.accOpenKey       = loginData.openkey;
    this.dataAcc.accPlatformParam = loginData.params;
  }

  public set PlayerId(playerId: number) {
    this.dataAcc.playerId = playerId;
  }

  public get PlayerId(): number {
    return this.dataAcc.playerId;
  }

  public get ProtoHandler(): AccNetHandler {
    return this.protoHandler;
  }

  public get DataAcc(): DataAcc {
    return this.dataAcc;
  }
}
