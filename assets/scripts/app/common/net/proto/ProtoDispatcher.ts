import EventDispatcher from "../../event/EventDispatcher";

const DispatcherList: EventDispatcher[] = [];

export const DebugDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[9] = DebugDispatcher;
export const AccDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[10] = AccDispatcher;
export const PlayerDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[11] = PlayerDispatcher;
export const RoomDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[12] = RoomDispatcher;
export const ActivityDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[13] = ActivityDispatcher;
export const ChatDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[14] = ChatDispatcher;
export const GoodsDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[15] = GoodsDispatcher;
export const TaskDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[16] = TaskDispatcher;
export const AwardDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[17] = AwardDispatcher;
export const PaymentDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[18] = PaymentDispatcher;
export const RankDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[19] = RankDispatcher;
export const PlayDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[20] = PlayDispatcher;
export const BuffDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[21] = BuffDispatcher;
export const SignInDispatcher: EventDispatcher = new EventDispatcher();
DispatcherList[22] = SignInDispatcher;

export function fillDispatcher(parentNode: cc.Node): void {
  let coreNode: cc.Node;
  coreNode = new cc.Node("node-proto-dispatcher-debug");
  DebugDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-acc");
  AccDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-player");
  PlayerDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-room");
  RoomDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-activity");
  ActivityDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-chat");
  ChatDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-goods");
  GoodsDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-task");
  TaskDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-award");
  AwardDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-payment");
  PaymentDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-rank");
  RankDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-play");
  PlayDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-buff");
  BuffDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
  coreNode = new cc.Node("node-proto-dispatcher-sign_in");
  SignInDispatcher.node = coreNode;
  parentNode.addChild(coreNode);
}

export { DispatcherList };
