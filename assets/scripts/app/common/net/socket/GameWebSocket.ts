import EventDispatcher from "../../event/EventDispatcher";
import InternalWebScoket from "./InternalWebSocket";
import { SOCKET_CLOSE, SOCKET_CONNECT, SOCKET_DATA, SOCKET_IO_ERROR } from "./SocketDefine";
import { ByteArray } from "../NetByteArray";

export default class GameWebSocket extends EventDispatcher {

  public static TYPE_STRING: string = "webSocketTypeString";
  public static TYPE_BINARY: string = "webSocketTypeBinary";

  private socket: InternalWebScoket;

  // 对于文本类型的socket数据时 写入内容暂存数据
  private writeMessage: string = "";
  // 对于文本类型的socket数据是 读取内容暂存数据
  private readMessage: string = "";

  // 读取缓存 从socket读取数据
  private readBuffer: ByteArray;
  // 写入缓存 往socket写入数据
  private writeBuffer: ByteArray;

  // 是否已有字节写入
  private isBytesWritten: boolean = false;
  // 是否已经连接
  private isConnected: boolean = false;
  // 是否正在进行连接
  private isConnecting: boolean = false;

  // socket数据类型
  private socketType: string = GameWebSocket.TYPE_STRING;

  constructor() {
    super();
    this.isConnected = false;
    this.writeMessage = "";
    this.readMessage = "";
    this.node = new cc.Node("dygame-websocket");
    this.socket = new InternalWebScoket();
    this.socket.addCallbacks(this.onConnect, this.onClose, this.onSocketData, this.onError, this);
  }

  public get type(): string {
    return this.socketType;
  }

  public set type(value: string) {
    this.socketType = value;
    if (value === GameWebSocket.TYPE_BINARY && !this.writeBuffer) {
      this.readBuffer = new ByteArray();
      this.writeBuffer = new ByteArray();
    }
  }

  // socket 是否已经连接
  public get connected(): boolean {
    return this.isConnected;
  }

  // 指定host和port进行连接
  public connect(host: string, port: number) {
    if (!this.isConnecting && !this.isConnected) {
      this.isConnecting = true;
      this.socket.connect(host, port);
    }
  }

  // 根据url连接服务器
  public connectByUrl(url: string): void {
    if (!this.isConnecting && !this.isConnected) {
      this.isConnecting = true;
      this.socket.connectByUrl(url);
    }
  }

  // 关闭socket连接
  public close(): void {
    if (this.isConnected) {
      this.socket.close();
    }
  }

  // 立即往socket写入数据
  public flush(): void {
    if (!this.isConnected) {
      return;
    }

    if (this.writeMessage) {
      this.socket.send(this.writeMessage);
      this.writeMessage = "";
    }
    if (this.isBytesWritten) {
      this.socket.send(this.writeBuffer.buffer);
      this.isBytesWritten = false;
      this.writeBuffer.clear();
    }
  }

  // 发送文本
  public writeUTF(message: string): void {
    if (!this.isConnected) {
      return;
    }

    if (this.socketType === GameWebSocket.TYPE_BINARY) {
      this.isBytesWritten = true;
      this.writeBuffer.writeUTF(message);
    } else {
      this.writeMessage += message;
    }

    this.flush();
  }

  // 读取文本
  public readUTF(): string {
    let message: string;
    if (this.socketType === GameWebSocket.TYPE_BINARY) {
      this.readBuffer.position = 0;
      message = this.readBuffer.readUTF();
      this.readBuffer.clear();
    } else {
      message = this.readMessage;
      this.readMessage = "";
    }
    return message;
  }

  // 写入字节
  public writeBytes(bytes: ByteArray, offset: number = 0, length: number = 0): void {
    if (!this.isConnected) {
      return;
    }
    if (!this.writeBuffer) {
      DyGame.$error(1);
      return;
    }

    this.isBytesWritten = true;
    this.writeBuffer.writeBytes(bytes, offset, length);
    this.flush();
  }

  // 读取字节内容写入到目标缓存
  public readBytes(dstBuffer: ByteArray, offset: number = 0, length: number = 0): void {
    if (!this.readBuffer) {
      DyGame.$error(1);
      return;
    }
    this.readBuffer.position = 0;
    this.readBuffer.readBytes(dstBuffer, offset, length);
    this.readBuffer.clear();
  }

  // socket 连接成功时回调
  private onConnect(): void {
    this.isConnected = true;
    this.isConnecting = false;
    this.emit(SOCKET_CONNECT);
  }

  // socket 连接断开时回调
  private onClose(): void {
    this.isConnected = false;
    this.emit(SOCKET_CLOSE);
  }

  // socket 出现错误时回调
  private onError(): void {
    if (this.isConnecting) {
      this.isConnecting = false;
    }
    this.emit(SOCKET_IO_ERROR);
  }

  // socket 收到数据
  private onSocketData(message: any): void {
    if (typeof message === "string") {
      this.readMessage += message;
    } else {
      this.readBuffer._writeUint8Array(new Uint8Array(message));
    }
    this.emit(SOCKET_DATA);
  }

}
