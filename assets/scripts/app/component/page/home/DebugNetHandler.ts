import { DebugDispatcher } from "../../../common/net/proto/ProtoDispatcher";
import { DebugErrorS2C } from "../../../common/net/proto/mods/ProtoSectionDebug";
import { ProtoErrorCode, ProtoMsgMap } from "../../../common/net/proto/ProtoReflect";
import GamePersist from "../../../common/persist/GamePersist";
const { ccclass } = cc._decorator;

@ccclass
export default class DebugNetHandler {
  private msgErrorCallback = {};

  constructor() {
    DebugDispatcher.on(DebugErrorS2C.EVENT_NAME, this.onReceiveMsgError, this);
  }

  private onReceiveMsgError(message) {
    const debugErrorS2C: DebugErrorS2C = message;
    const errCode = debugErrorS2C.code;
    const msgId   = debugErrorS2C.msgid;
    const clazz   = ProtoMsgMap[msgId];
    const eventName: string = clazz.EVENT_NAME;
    const errMsg  = ProtoErrorCode[errCode] || "ErrCode:" + errCode;
    const protoMsgSection = msgId >> 8;
    GamePersist.INSTANCE.EmitProtoError(protoMsgSection, eventName, errCode, errMsg);
    /*
    const debugErrorS2C: DebugErrorS2C = message;
    const errCode = debugErrorS2C.code;
    const msgId   = debugErrorS2C.msgid;
    const clazz   = ProtoMsgMap[msgId];
    const eventName: string = clazz.EVENT_NAME;
    const errMsg  = ProtoErrorCode[errCode];
    const callbackConf: any = this.msgErrorCallback[eventName];
    if (callbackConf) {
      const callbackFunc    = callbackConf.callback;
      const context = callbackConf.context;
      callbackFunc.call(context, eventName, errCode);
    }
    */
  }

  /*
  // 注册某个协议的错误码的回调
  public onMsgError(eventName: string, callback: Function, callbackThis?: any) {
    const callbackConf: any = {};
    callbackConf.callback   = callback;
    callbackConf.context    = callbackThis;
    callbackConf[eventName] = callbackConf;
  }
  // 关闭某个协议的错误码的回调
  public offMsgError(eventName: string) {
    delete this.msgErrorCallback[eventName];
  }
  */
}
