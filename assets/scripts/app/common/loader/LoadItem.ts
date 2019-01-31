import { LoaderPriority, ILoadBatch, ILoadItem, LoadItemStatus } from "./LoadDefine";

export default class LoadItem implements ILoadItem {
  public itemKey: string;
  public path: string;
  public assetType: typeof cc.Asset | typeof cc.RawAsset;
  public priority: LoaderPriority;
  public additionIndex: number;
  public batch: ILoadBatch;
  public status: LoadItemStatus;

  private completeCallback: (loadItem: LoadItem, error: Error, resource: any) => void;
  private loadBatch: ILoadBatch;

  private filled: boolean = false;

  constructor(path: string, priority?: LoaderPriority, key?: string, assetType?: typeof cc.Asset | typeof cc.RawAsset) {
    this.path      = path;
    this.itemKey   = key;
    this.assetType = assetType;
    this.priority  = priority || LoaderPriority.NORMAL;
    this.status    = LoadItemStatus.IDLE;
  }

  public key() {
    return this.itemKey;
  }

  public load() {
    this.status = LoadItemStatus.STARTED;
    const that = this;
    if (this.assetType) {
      cc.loader.loadRes(this.path, this.assetType, function(error: Error, resource: any) {
        that.internalComplete(error, resource);
      });
    } else {
      cc.loader.loadRes(this.path, function(error: Error, resource: any) {
        that.internalComplete(error, resource);
      });
    }
  }

  public then(callback: (loadItem: LoadItem, error: Error, resource: any) => void) {
    this.completeCallback = callback;
  }

  public dispose() {
    this.status = LoadItemStatus.FINISHED;
    this.completeCallback = null;
    this.batch = null;
  }

  private internalComplete(error: Error, resource: any) {
    this.completeCallback(this, error, resource);
  }
}
