import { ILoadBatch, LoadCompleteCallback, ILoadedResourceMap, SINGLE_BATCH_KEY } from "./LoadDefine";
import LoadItem from "./LoadItem";

export default class LoadBatch implements ILoadBatch {
  private static uniqId: number = 0;

  public id: number;

  private error: Error;
  private curCount: number;
  private totalCount: number;
  private allCompletedCallback: LoadCompleteCallback;
  private loadedResource: ILoadedResourceMap<any>;

  constructor() {
    this.id = LoadBatch.uniqId++;
    this.curCount = 0;
    this.totalCount = 0;
  }

  public then(callback: LoadCompleteCallback) {
    this.allCompletedCallback = callback;
  }

  public add(loadItem: LoadItem) {
    loadItem.batch = this;
    this.curCount++;
    this.totalCount++;
  }

  public remove(loadItem: LoadItem, error: Error, resource: any) {
    this.curCount--;
    if (!error) {
      if (!this.loadedResource) {
        this.loadedResource = {};
      }
      this.loadedResource[loadItem.key()] = resource;
    } else {
      if (!this.error) {
        this.error = error;
      }
    }

    if (this.curCount <= 0) {
      if (this.allCompletedCallback) {
        if (this.totalCount < 2) {
          if (!this.error) {
            this.allCompletedCallback(this.error, this.loadedResource[SINGLE_BATCH_KEY]);
          } else {
            this.allCompletedCallback(this.error, null);
          }
        } else {
          this.allCompletedCallback(this.error, this.loadedResource);
        }
      }
    }
  }
}
