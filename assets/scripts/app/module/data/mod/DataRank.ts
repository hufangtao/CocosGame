import {RankPlayStarS2C} from "../../../common/net/proto/mods/ProtoSectionRank";
import {PPveRank, PStarRank} from "../../../common/net/proto/ProtoType";
export default class DataRank {

  private nMyRank: number = 0;
  private nFriendRankMyRank: number = 0;

  // 游戏排行数据
  private vecGlobalRankData: PStarRank[];
  private vecFriendRankData: PStarRank[];

  public get FriendRankData(): PStarRank[]{
      return this.vecFriendRankData;
  }
  public set FriendRankData(data: PStarRank[]){
      this.vecFriendRankData = data;
  }

  public get GlobalRankData(): PStarRank[] {
    return this.vecGlobalRankData;
  }

  public set GlobalRankData(data: PStarRank[]) {
    this.vecGlobalRankData = data;
  }

  public get MyRank(): number {
    return this.nMyRank;
  }

  public set MyRank(data: number) {
    this.nMyRank = data;
  }

  public get FriendRankMyRank():number{
      return this.nFriendRankMyRank;
  }
  public set FriendRankMyRank(data: number){
      this.nFriendRankMyRank = data;
  }

}

export class PveDataRank {

    private nMyRank: number = 0;

    // 游戏排行数据
    private vecGlobalRankData: PPveRank[];

    public get GlobalRankData(): PPveRank[] {
        return this.vecGlobalRankData;
    }

    public set GlobalRankData(data: PPveRank[]) {
        this.vecGlobalRankData = data;
    }

    public get MyRank(): number {
        return this.nMyRank;
    }

    public set MyRank(data: number) {
        this.nMyRank = data;
    }
}