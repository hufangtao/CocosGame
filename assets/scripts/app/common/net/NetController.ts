import { SOCKET_CLOSE, SOCKET_CONNECT, SOCKET_DATA, SOCKET_IO_ERROR } from "./socket/SocketDefine";
import { ByteArray } from "./NetByteArray";
import * as ProtoReflect from "./proto/ProtoReflect";
import * as ProtoCrypto from "./proto/ProtoCrypto";
import GameWebSocket from "./socket/GameWebSocket";
import IEventDispatcher from "../event/IEventDispatcher";
import { DispatcherList, fillDispatcher } from "./proto/ProtoDispatcher";
import GamePersist from "../persist/GamePersist";
import { IProtoMsgC2S } from "./proto/ProtoDefine";
import AccManager from "../../component/page/login/AccManager";
import * as Misc from "../Misc";
import RuntimeManager from "../runtime/RuntimeManager";
import { OpenHomeFrom } from "../Defines";

export default class NetController implements IEventDispatcher {
  private static singleInstance: NetController;

  public isLoadingPreload: boolean = false;


  private socket: GameWebSocket;
  private protoBuffer: ByteArray;
  private coreNode: cc.Node;

  private host: string;
  private port: number;
  private path: string;
  private isSecurity: boolean;

  private connectFailedTimes: number = 0;
  private connectedSuccess: boolean = false;

  public static get INSTANCE() {
    if (!this.singleInstance) {
      this.singleInstance = new NetController();
    }
    return NetController.singleInstance;
  }

  constructor() {
    this.coreNode = new cc.Node("node-netcontroller");
    GamePersist.RootNodeNet.addChild(this.coreNode);

    this.protoBuffer = new ByteArray();
    this.socket = new GameWebSocket();
    this.coreNode.addChild(this.socket.node);
    this.socket.type = GameWebSocket.TYPE_BINARY;
    this.socket.on(SOCKET_DATA, this.onSocketData, this);
    this.socket.on(SOCKET_CONNECT, this.onSocketOpen, this);
    this.socket.on(SOCKET_CLOSE, this.onSocketClose, this);
    this.socket.on(SOCKET_IO_ERROR, this.onSocketError, this);
  }

  public get Connected(): boolean {
    return this.socket.connected;
  }

  public emit(message: string, detail?: any) {
    this.node.emit(message, detail);
  }

  public on(type: string, callback: (data) => void, target?: any, useCapture?: boolean): void {
    this.coreNode.on(type, callback, target, useCapture);
  }

  public off(type: string, callback: Function, target?: any, useCapture?: boolean): void {
    this.coreNode.off(type, callback, target, useCapture);
  }

  public get node(): cc.Node {
    return this.coreNode;
  }

  public reConnect(host: string, port: number, path?: string, isSecurity?: boolean): void {
    this.protoBuffer = null;
    this.socket.node.destroy();
    this.socket = null;

    this.protoBuffer = new ByteArray();
    this.socket = new GameWebSocket();
    this.coreNode.addChild(this.socket.node);
    this.socket.type = GameWebSocket.TYPE_BINARY;
    this.socket.on(SOCKET_DATA, this.onSocketData, this);
    this.socket.on(SOCKET_CONNECT, this.onSocketOpen, this);
    this.socket.on(SOCKET_CLOSE, this.onSocketClose, this);
    this.socket.on(SOCKET_IO_ERROR, this.onSocketError, this);

    this.connect(host, port, path, isSecurity);
  }

  // 连接服务器 可以同时制定paht和是否使用安全套接字
  public connect(host: string, port: number, path?: string, isSecurity?: boolean): void {
    this.host = host;
    this.port = port;
    this.path = path;
    this.isSecurity = isSecurity;
    this.connectedSuccess = false;
    this.doConnect();
  }

  // 发送c2s协议
  public send(msg: IProtoMsgC2S) {
    this.socket.writeBytes(msg.encode());
  }

  public onSocketOpen(): void {
    this.connectedSuccess = true;
    this.connectFailedTimes = 0;
    this.socket.on(SOCKET_CLOSE, this.onSocketClose, this);
    const event: cc.Event.EventCustom = new cc.Event.EventCustom(SOCKET_CONNECT, false);
    this.coreNode.emit(SOCKET_CONNECT, event);
  }

  public onSocketClose(): void {
    if (!this.connectedSuccess) {
      this.connectFailedTimes++;
      if (this.connectFailedTimes > 5) {
        Misc.goToPreload();
        this.isLoadingPreload = true;
      } else {
        if (!this.host) {
          Misc.goToPreload();
          return;
        }
        this.doConnect();
      }
      return;
    }


    // 在后台的时候不进行处理
    if (RuntimeManager.INSTANCE.IsBackground) {
      return;
    }
    // 当前已经在进行重加载中
    if (this.isLoadingPreload) {
      return;
    }

    const rootUI = GamePersist.INSTANCE.RootUI;
    if (!rootUI) {
      Misc.goToPreload();
      this.isLoadingPreload = true;
      return;
    }

    // 当前在大厅界面
    if (rootUI.uiName() === "HomeUI") {
      // 如果已经尝试过重新登录 则直接从头开始
      if (AccManager.INSTANCE.RetryTimes > 0) {
        this.isLoadingPreload = true;
        Misc.goToPreload();
        return;
      }
      AccManager.INSTANCE.reConnectServer();
      return;
    }

    // 当前在房间比赛
    if (rootUI.uiName() === "PlayUI") {
      Misc.goToHome(OpenHomeFrom.UI_PLAY);
      return;
    }

    // 当前在登陆界面
    if (rootUI.uiName() === "LoginUI") {
      return;
    }

    Misc.goToPreload();
    this.isLoadingPreload = true;
  }

  public onSocketError(): void {
  }

  public onSocketData(): void {
    // TODO 应该让内存循环使用
    // 放置占用一块过大的内存 如果当前始终缓存数据都已经处理 并且超过阈值就先释放
    const bufferLen: number = this.protoBuffer.length;
    if (bufferLen === this.protoBuffer.position && bufferLen >= 1024) {
      this.protoBuffer.clear();
    }
    this.socket.readBytes(this.protoBuffer, this.protoBuffer.length);
    this.parseProto();
  }


  public doConnect() {
    const schema = this.isSecurity ? "wss://" : "ws://";
    let serverUrl = schema + this.host + ":" + this.port;
    if (this.path) {
      serverUrl += ("/" + this.path);
    }
    this.socket.connectByUrl(serverUrl);
  }

  // 解析协议
  private parseProto(): void {
    while (this.protoBuffer.length !== this.protoBuffer.position) {
      const protoMsgLen = this.protoBuffer.readUnsignedShort();
      if (protoMsgLen > this.protoBuffer.bytesAvailable) {
        // 数据包尚未接收完整 把位置回退
        this.protoBuffer.position = this.protoBuffer.position - 2;
        break;
      }

      // 根据长度将协议数据包读入
      let bytes: ByteArray = new ByteArray();
      this.protoBuffer.readBytes(bytes, 0, protoMsgLen);

      // 读取index, 如果非0表示消息已经加密
      const index = bytes.readUnsignedByte();
      if (index) {
        bytes = ProtoCrypto.decode(index, bytes);
      }

      // 确定协议Id和解析类 进行协议的解析
      const protoMsgSecId = bytes.readUnsignedByte();
      const protoMsgSubId = bytes.readUnsignedByte();
      const protoMsgId = (protoMsgSecId << 8) + protoMsgSubId;
      const protoClazz = ProtoReflect.ProtoMsgMap[protoMsgId];
      if (protoClazz && protoClazz.decode && protoClazz.EVENT_NAME) {
        const protoMsg = protoClazz.decode(bytes);
        protoMsg.MSG_ID = protoMsgId;
        const protoMsgEventName: string = protoClazz.EVENT_NAME;
        const protoMsgDispatcher: IEventDispatcher = DispatcherList[protoMsgSecId];
        if (protoMsgEventName !== "AccServertimeS2C") {
          // //console.log("协议返回--%s", protoMsgEventName);
        }
        // console.log(protoMsg);
        protoMsgDispatcher.emit(protoMsgEventName, protoMsg);
      } else {
        // console.error("unknonw msg id: ", protoMsgId);
      }
    }
  }
}
