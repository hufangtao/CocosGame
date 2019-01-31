import BaseModule from "./BaseModule";
import * as Modules from "./Modules";

export class ModuleManager {

  private static singleInstance: ModuleManager;

  public static get INSTANCE() {
    if (!this.singleInstance) {
      this.singleInstance = new ModuleManager();
    }
    return this.singleInstance;
  }

  // 所有子模块的索引
  private subModules: BaseModule[];

  // 初始化
  public init() {
    if (!this.subModules) {
      this.subModules = [];
      // 各子模块的创建
      Modules.create();
    }

    this.subModules.forEach((mod: BaseModule) => {
      mod.init();
    });
  }

  /**
   * 添加新的模块
   */
  public addModule(mod: BaseModule) {
    this.subModules.push(mod);
  }

}

export function InitManager() {
  ModuleManager.INSTANCE.init();
}

export function AddModule(mod: BaseModule) {
  ModuleManager.INSTANCE.addModule(mod);
}
