import { IProtoMsgC2S } from "./proto/ProtoDefine";
import NetController from "./NetController";

export default class NetUtil {
  public static SendMsg(msg: IProtoMsgC2S) {
    // console.log(msg);
    NetController.INSTANCE.send(msg);
  }
}
