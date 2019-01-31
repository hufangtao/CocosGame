import { AccDispatcher, DebugDispatcher } from "../../../common/net/proto/ProtoDispatcher";
import { AccServertimeS2C, AccLoginS2C, AccCreateS2C, AccEnterS2C, AccReloginS2C, AccMaintainS2C } from "../../../common/net/proto/mods/ProtoSectionAcc";
import AccManager from "./AccManager";
import GamePersist from "../../../common/persist/GamePersist";
import { ProtoSection, ProtoErrorCode } from "../../../common/net/proto/ProtoReflect";
import { IProtoError } from "../../../common/Defines";
import { DebugErrorS2C } from "../../../common/net/proto/mods/ProtoSectionDebug";

export default class AccNetHandler {

  constructor() {
    AccDispatcher.on(AccServertimeS2C.EVENT_NAME, this.onServerTime, this);
    AccDispatcher.on(AccLoginS2C.EVENT_NAME,      this.onLoginS2C, this);
    AccDispatcher.on(AccCreateS2C.EVENT_NAME,     this.onCreateS2C, this);
    AccDispatcher.on(AccEnterS2C.EVENT_NAME,      this.onEnterS2C, this);
    AccDispatcher.on(AccReloginS2C.EVENT_NAME,    this.onReLoginS2C, this);
    AccDispatcher.on(AccMaintainS2C.EVENT_NAME,   this.onMaintainS2C, this);

    // GamePersist.INSTANCE.OnProtoError(ProtoSection.acc, this.onProtoError, this);
    DebugDispatcher.on(DebugErrorS2C.EVENT_NAME,this.onProtoError,this);
  }

  // 处理协议统一的错误码返回
  public onProtoError(message) {
    const protoError: DebugErrorS2C = message;
    const protoErrCode = protoError.code;
    GamePersist.INSTANCE.Toast(ProtoErrorCode[protoErrCode]);
  }


  // 收到服务器时间
  public onServerTime(message) {
    const serverTime: AccServertimeS2C = message;
    // console.log("get server time:", serverTime.time);
    GamePersist.INSTANCE.ServerTime = serverTime.time;
  }

  // 收到登陆协议返回
  public onLoginS2C(message) {
    cc.log(message);
    const loginS2C: AccLoginS2C = message;
    AccManager.INSTANCE.onReceiveLoginS2C(loginS2C);
  }

  public onReLoginS2C(message) {
    cc.log('onReLoginS2C');
    const reloginS2C: AccReloginS2C = message;
    AccManager.INSTANCE.onReceiveReLoginS2C(reloginS2C);
  }

  // 收到创建角色返回
  public onCreateS2C(message) {
    const createS2C: AccCreateS2C = message;
    AccManager.INSTANCE.onReceiveCreateS2C(createS2C);
  }

  // 收到进入游戏的结果
  public onEnterS2C(message) {
    const enterS2C: AccEnterS2C = message;
    AccManager.INSTANCE.onReceiveEnterS2C(enterS2C);
  }

  public onMaintainS2C(message) {
    const maintianS2C: AccMaintainS2C = message;
    const maintainMsg = maintianS2C.desc;
    GamePersist.INSTANCE.showMaintain(maintainMsg);
  }
}
