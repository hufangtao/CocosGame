import ResLoader from "../loader/Loader";
import { ILoadedResourceMap } from "../loader/LoadDefine";
import { RESOURCE_CONFIG_PATH_ROOT } from "../Defines";
import * as ConfigVO from "./vo/ConfigVO";
import { ByteArray } from "../net/NetByteArray";
import { Play } from "../../module/Modules";

const ClazzMap = {
};

function loadJsons(dirName) {
  return new Promise((resolve, reject) => {
    cc.loader.loadResDir(dirName, (err, assets, urls) => {
      for (let i = 0; i < assets.length; ++i) {
        if (urls[i] === 'config/Map') {
          let mapData = assets[i].json;
          Play.LevelDatas = mapData;
          continue;
        }
        let configName = urls[i].substring(dirName.length + 1)
        let data = assets[i].json;
        onConfigLoaded(configName, data);
      }
      resolve();
    })
  })
}

function loadJson(name: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    ResLoader.loadConfig(name, function (err, resource) {
      if (err) {
        cc.warn(`load config:${name} err:${err}`);
        resolve(null);
        return;
      }
      resolve(resource);
    });
  });
}

function loadZip(name: string): Promise<any> {
  return new Promise<any>((resolve, reject) => {
    ResLoader.loadSingle(RESOURCE_CONFIG_PATH_ROOT + name, function (err, resource) {
      if (err) {
        cc.warn(`load zip:${name} err:${err}`);
        resolve(null);
        return;
      }
      resolve(resource);
    });
  });
}

function getConfigPath(name: string): string {
  return RESOURCE_CONFIG_PATH_ROOT + name;
}

function onConfigLoaded(configName: string, data: any) {
  const name = configName.replace(/^(?:Sys|Client)?(.*)$/, "$1");
  if (ConfigVO[name]) {
    const vo = ConfigVO[name];
    if (vo.isInited) {
      return;
    }
  }

  ConfigVO[name].setClass(ClazzMap[name]);
  ConfigVO[name].initData(data);
}

function onZipLoaded(files: any) {
  for (const fileName of Object.keys(files)) {
    const data = files[fileName] as Uint8Array;
    const bytes: ByteArray = new ByteArray(data);
    const fileContent = bytes.readUTFBytes(bytes.bytesAvailable);
    const confName = fileName.split(".")[0];
    onConfigLoaded(confName, JSON.parse(fileContent));
  }
}

export async function loadAllConfig() {
  // const serverListName: string = "ServerList";
  // const serverList = await loadJson(serverListName);
  // if (!serverList) {
  //   return false;
  // }
  // onConfigLoaded(serverListName, serverList);
  await loadJsons('config');
  return true;

  // 加载zip包

  // return new Promise((resolve, reject) => {
  //   cc.loader.loadRes("config/other", (err, zipFile) => {
  //     if (!zipFile) {
  //       reject(false);
  //     }
  //     onZipLoaded(zipFile);
  //     resolve(true);
  //   });
  // })
  // const zipFile: JSZip = await loadZip("other");
}
