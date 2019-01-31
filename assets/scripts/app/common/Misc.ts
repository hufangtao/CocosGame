import * as ConfigVO from "./config/vo/ConfigVO";
import * as Modules from "../module/Modules";
import PlaymateHead from "../component/prefab/PlaymateHead";
import { OpenHomeFrom } from "./Defines";
import { ProtoErrorCode } from "./net/proto/ProtoReflect";

// 可索引的稀疏数组结构
export interface ISparseArr<T> {
  [index: number]: T;
}

export function goToPreload() {
  cc.director.loadScene("preload");
}


export function goToHome(from: OpenHomeFrom = OpenHomeFrom.UI_LOGIN) {
  cc.director.loadScene("home");
  Modules.Home.OpenHomeFrom = from;
}

export interface ILvlDataGenerator<T> {
  updateLvlData(template: T, lvl: number): T;
}

export interface IPanel {
  viewNode();
}

export interface IRootUI {
  showWaiting(node: cc.Node, msg?: string);
  showPanel(panel: IPanel);
  uiName(): string;
  onAppHide();
  onAppShow();
}

export interface IAnimation {
  config(name: string, frames: number, times: number);
  play();
}

export function setButtonSpriteFrame(button: cc.Button, spFrame: cc.SpriteFrame) {
  const buttonSp: cc.Sprite = button.getComponent(cc.Sprite);
  buttonSp.spriteFrame = spFrame;
  buttonSp.enabled = false;
  buttonSp.enabled = true;
}

// 根据星数计算荣耀段位
export function calcHonorId(star: number): number {
  const rangeList: any[] = ConfigVO.Honor.getExtra("range");
  for (let i = 0; i < rangeList.length; i++) {
    const range: number[] = rangeList[i];
    const honorId = range[0];
    const minStar = range[1];
    if (star >= minStar) {
      return honorId;
    }
  }
}

// 根据星数计算段位名称
export function getGradeName(star: number): string {
  const maxStarList: number[] = ConfigVO.Honor.getExtra("max_star");
  const maxStar = maxStarList[0];
  if (star >= maxStar) {
    return "最强王者";
  }
  const sysHonorId: number = calcHonorId(star);
  const sysHonor: ConfigVO.IHonorVO = ConfigVO.Honor.get(sysHonorId);
  return sysHonor.name;
}

export function calcShowStarCount(star: number): number {
  let showStarNum: number = 0;
  if (star > 0) {
    const maxStarList: number[] = ConfigVO.Honor.getExtra("max_star");
    const maxStar = maxStarList[0];
    if (star >= maxStar) {
      showStarNum = 5;
    } else {
      showStarNum = star % 5;
      if (showStarNum === 0) {
        showStarNum = 5;
      }
    }
  }
  return showStarNum;
}

export function formatDateTime(inputTime: number): string {
  const date = new Date(inputTime);
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const strM = m < 10 ? ("0" + m) : ("" + m);
  const d = date.getDate();
  const strD = d < 10 ? ("0" + d) : ("" + d);
  const h = date.getHours();
  const strH = h < 10 ? ("0" + h) : ("" + h);
  const min = date.getMinutes();
  const strMin = min < 10 ? ("0" + min) : ("" + min);
  const sec = date.getSeconds();
  const strSec = sec < 10 ? ("0" + sec) : ("" + sec);
  return y + "-" + strM + "-" + strD + " " + strH + ":" + strMin + ":" + strSec;
}

export function showHeadImg(headNode: cc.Node, playmateId: number, headUrl: string) {
  const playmateHead = PlaymateHead.GetComponent(headNode);
  playmateHead.PlaymateId = playmateId;
  playmateHead.HeadUrl = headUrl;
}

// 从数组中随机选择一个
export function randSelect<T>(items: T[]): T {
  if (!items) {
    return;
  }
  const cnt = items.length;
  const index = Math.floor(cnt * Math.random());
  return items[index];
}

// 随机一个主动分享内容
export function randManualShare(): ConfigVO.IShareVO {
  return randShare("manual_list");
}

// 随机一个邀请分享内容
export function randInviteShare(): ConfigVO.IShareVO {
  return randShare("invite_list");
}

// 随机一个炫耀分享内容
export function randFlauntShare(): ConfigVO.IShareVO {
  return randShare("flaunt_list");
}

export function formatPercent(value: number): string {
  return `${Math.floor(value * 100)}%`;
}

// 随机整数
export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randShare(kind: string): ConfigVO.IShareVO {
  const inviteList = ConfigVO.Share.getExtra(kind);
  const shareId: number = randSelect(inviteList);
  return ConfigVO.Share.get(shareId);
}

export function protoErrMsg(code: number): string {
  const msg = ProtoErrorCode[code];
  if (!msg) {
    return `ErrorCode:${code}`;
  }
  return msg;
}

export function httpPost(url, params, callback) {
  const xhr = cc.loader.getXMLHttpRequest();
  xhr.onreadystatechange = function () {
    cc.log("xhr.readyState=" + xhr.readyState + "  xhr.status=" + xhr.status);
    if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
      const respone = xhr.responseText;
      callback(respone);
    } else {
      callback(null);
    }
  };

  xhr.open("POST", url, true);
  if (cc.sys.isNative) {
    xhr.setRequestHeader("Accept-Encoding", "gzip,deflate");
  }
  xhr.timeout = 5000; // 5 seconds for timeout  
  xhr.send(params);
} 
