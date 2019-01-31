import { LoaderPriority, SINGLE_BATCH_KEY, LoadCompleteCallback, LoadItemStatus, ILoadItemDesc } from "./LoadDefine";
import LoadItem from "./LoadItem";
import LoadBatch from "./LoadBatch";
import { RESOURCE_CONFIG_PATH_ROOT } from "../Defines";

export default class ResLoader {

  // 加载一个配置文件 仅用来加载配置文件
  public static loadConfig(cfgName: string, callback: LoadCompleteCallback) {
    const path = RESOURCE_CONFIG_PATH_ROOT + cfgName;
    ResLoader.loadSingle(path, callback);
  }

  public static loadSpriteFrame(path: string, callback: LoadCompleteCallback) {
    ResLoader.loadSingle(path, callback, LoaderPriority.NORMAL, SINGLE_BATCH_KEY, cc.SpriteFrame);
  }

  // 加载一个SpriteAtlas
  public static loadSpriteAtlas(path: string, callback: LoadCompleteCallback) {
    ResLoader.loadSingle(path, callback, LoaderPriority.NORMAL, SINGLE_BATCH_KEY, cc.SpriteAtlas);
  }


  // 加载一个文件
  public static loadSingle(path: string, callback: LoadCompleteCallback, priority?: LoaderPriority, key?: string, assetType?: typeof cc.Asset | typeof cc.RawAsset) {
    key = key || SINGLE_BATCH_KEY;
    priority = priority || LoaderPriority.NORMAL;
    const loadItem = new LoadItem(path, priority, key, assetType);
    loadItem.status = LoadItemStatus.IDLE;
    const batch = new LoadBatch();
    batch.then(callback);
    ResLoader.add(loadItem, batch);
    ResLoader.sortItems();
    ResLoader.loadNext();
  }

  // 加载多个文件
  public static loadMulti(lists: ILoadItemDesc[], callback: LoadCompleteCallback, priority?: LoaderPriority) {
    const len: number = lists.length;
    priority = priority || LoaderPriority.NORMAL;
    const loadBatch = new LoadBatch();
    loadBatch.then(callback);
    for (let i = 0; i < len; i++) {
      const loadItemDesc: ILoadItemDesc = lists[i];
      const loadItem = new LoadItem(loadItemDesc.path, priority, loadItemDesc.key, loadItemDesc.assetType);
      ResLoader.add(loadItem, loadBatch);
    }
    ResLoader.sortItems();
    ResLoader.loadNext();
  }

  // 加载项列表
  private static loadItems: LoadItem[] = [];

  private static onItemComplete(loadItem: LoadItem, error: Error, resource: any) {
    ResLoader.remove(loadItem, error, resource);
  }

  private static remove(loadItem: LoadItem, error: Error, resource: any) {
    const idx = ResLoader.loadItems.indexOf(loadItem);
    ResLoader.loadItems.splice(idx, 1);
    if (loadItem.batch) {
      loadItem.batch.remove(loadItem, error, resource);
    }
    ResLoader.tryCompleteWait(loadItem.path, error, resource);
    loadItem.dispose();
  }

  // 如果当前有其他正在等待该资源的加载 则一并完成
  private static tryCompleteWait(path: string, error: Error, resource: any) {
    for (let i = 0; i < ResLoader.length; i++) {
      const loadItem = ResLoader.loadItems[i];
      if (loadItem.path === path && loadItem.status === LoadItemStatus.WAIT) {
        ResLoader.onItemComplete(loadItem, error, resource);
        // 这里之所以使用break 是因为这次找到的LoadItem会继续找相同的加载 所以这里break掉就可以了
        break;
      }
    }
  }

  private static add(loadItem: LoadItem, batch: LoadBatch) {
    loadItem.then(ResLoader.onItemComplete);
    loadItem.additionIndex = batch.id;
    batch.add(loadItem);

    if (ResLoader.isLoading(loadItem.path)) {
      loadItem.status = LoadItemStatus.WAIT;
      loadItem.priority = LoaderPriority.AFTERMOST;
      loadItem.additionIndex = -1;
    }
    ResLoader.loadItems.push(loadItem);
  }

  private static sortItems() {
    ResLoader.insertSort("additionIndex");
    ResLoader.insertSort("priority");
  }

  private static insertSort(prop: string) {
    let tmpItem: LoadItem;
    let i: number;
    let j: number;
    for (i = 1; i < ResLoader.loadItems.length; i ++) {
      tmpItem = ResLoader.loadItems[i];
      for (j = i - 1; j >= 0; j--) {
        if (ResLoader.loadItems[j][prop] < tmpItem[prop]) {
          ResLoader.loadItems[j + 1] = ResLoader.loadItems[j];
          ResLoader.loadItems[j] = tmpItem;
        } else {
          break;
        }
      }
    }
  }

  private static loadNext() {
    const loadItem: LoadItem = ResLoader.getNextItemToLoad();
    if (loadItem) {
      loadItem.load();
      ResLoader.loadNext();
    }
  }

  private static getNextItemToLoad(): LoadItem {
    let i = 0;
    while (i < ResLoader.loadItems.length) {
      const loadItem: LoadItem = ResLoader.loadItems[i];
      if (loadItem.status === LoadItemStatus.IDLE) {
        return loadItem;
      }
      i ++;
    }
    return null;
  }

  private static isLoading(path: string): boolean {
    let i = 0;
    while (i < ResLoader.loadItems.length) {
      if (ResLoader.loadItems[i].path === path) {
        return true;
      }
      i++;
    }
    return false;
  }
}
