import EventDispatcher from "../common/event/EventDispatcher";
import GamePersist from "../common/persist/GamePersist";
import * as  ModuleManagerUtil from "./ModuleManager";

export default class BaseModule extends EventDispatcher {
  constructor(name: string) {
    super();
    this.node = new cc.Node("module-node-" + name);
    GamePersist.RootNodeModule.addChild(this.node);

    ModuleManagerUtil.AddModule(this);
    this.onCreated();
  }

  public onCreated() {
  }

  public init() {
  }
 }
