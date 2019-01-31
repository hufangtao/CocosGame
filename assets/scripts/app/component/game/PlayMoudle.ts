import BaseModule from "../../module/BaseModule";
import PlayNetHandler from "./PlayNetHandler";
import DataPlay from "../../module/data/mod/DataPlay";
import DataPve from "./pve/DataPve";
import { GAME_MODEL } from "./PlayDefine";
import DataPvp from "./pvp/DataPvp";

export default class PlayModule extends BaseModule {
  private static MODULE_NAME: string = "home";

  private dataPlay: DataPlay;
  private protoPlayHandler: PlayNetHandler;
  private dataPve: DataPve;
  private dataPvp: DataPvp;
  private levelDatas;
  private gameModel:GAME_MODEL;
  

  constructor() {
    super(PlayModule.MODULE_NAME);
  }

  public onCreated() {
    this.protoPlayHandler = new PlayNetHandler();
    this.dataPlay = new DataPlay();
    this.dataPve = new DataPve();
    this.dataPvp = new DataPvp();
  }

 

  public get DataPve(): DataPve {
    return this.dataPve;
  }
  public resetDataPve() {
    this.dataPve = new DataPve();
  }

  public get DataPvp(): DataPvp {
    return this.dataPvp;
  }
  public resetDataPvp() {
    this.dataPvp = new DataPvp();
  }

  public get DataPlay(): DataPlay {
    return this.dataPlay;
  }

  public resetPlay() {
    this.dataPlay = new DataPlay();
  }

  public get LevelDatas() {
    return this.levelDatas;
  }
  public set LevelDatas(value) {
    this.levelDatas = value;
  }

  public get GameModel() {
    return this.gameModel;
  }
  public set GameModel(value) {
    this.gameModel = value;
  }
}
