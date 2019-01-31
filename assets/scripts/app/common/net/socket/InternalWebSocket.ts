export default class InternalWebScoket {
  private socket: WebSocket;

  private onConnect: () => void;
  private onClose: () => void;
  private onSocketData: (data: any) => void;
  private onError: () => void;
  private thisObject: any;
  private host: string = "";
  private port: number = 0;

  public addCallbacks(onConnect: () => void,
                      onClose: () => void,
                      onSocketData: (data: any) => void,
                      onError: () => void,
                      thisObj: any): void {

    this.onConnect = onConnect;
    this.onClose = onClose;
    this.onSocketData = onSocketData;
    this.onError = onError;
    this.thisObject = thisObj;
  }

  public connect(host: string, port: number): void {
    this.port = port;
    this.host = host;

    const socketServerUrl = "ws://" + this.host + ":" + this.port;
    this.socket = new WebSocket(socketServerUrl);
    this.socket.binaryType = "arraybuffer";
    this._bindEvent();
  }

  public connectByUrl(url: string): void {
    this.socket = new WebSocket(url);
    this.socket.binaryType = "arraybuffer";
    this._bindEvent();
  }

  public send(message: any): void {
    this.socket.send(message);
  }

  public close(): void {
    this.socket.close();
  }

  private _bindEvent(): void {
    const that = this;
    const socket = this.socket;

    socket.onopen = function() {
      if (that.onConnect) {
        that.onConnect.call(that.thisObject);
      }
    };

    socket.onclose = function() {
      if (that.onClose) {
        that.onClose.call(that.thisObject);
      }
    };

    socket.onerror = function() {
      if (that.onError) {
        that.onError.call(that.thisObject);
      }
    };

    socket.onmessage = function(e) {
      if (that.onSocketData) {
        that.onSocketData.call(that.thisObject, e.data);
      }
    };
  }
}
