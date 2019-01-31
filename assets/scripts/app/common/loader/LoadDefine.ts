
export const SINGLE_BATCH_KEY = "single";

export interface ILoadedResourceMap<T> {
  [key: string]: T;
}

export type LoadCompleteCallback =  (error: Error, resource: ILoadedResourceMap<any>|any) => void;

// 加载项的接口
export interface ILoadItem {
  key(): string;
  dispose(): void;
}

// 多个资源同时加载时 每项资源的描述
export interface ILoadItemDesc {
  key: string;
  path: string;
  assetType?: typeof cc.Asset;
}

// 多个资源同时加载时的打包
export interface ILoadBatch {
  remove(loadItem: ILoadItem, error: Error, resouce: any);
}

// 加载项当前的状态
export enum LoadItemStatus {
  IDLE,
  STARTED,
  FINISHED,
  ERROR,
  WAIT,
}

// 加载项的优先级
export enum LoaderPriority {
  AFTERMOST,       // 不重要的 可以等其他加载后再来加载
  NORMAL,          // 普通资源
  IMPORTANT,       // 重要资源
  URGENT,          // 急需资源
}
