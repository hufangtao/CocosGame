export default class DataAcc {
  public accOpenId: string; // 登陆账号的唯一Id 一般是第三方提供的
  public accOpenKey: string;
  public accPlatform: string;
  public accPlatformParam: string;


  public playerId: number;
  public gameOpenId: string;      // 游戏角色账号的唯一Id 游戏服务器提供
  public gameOpenIdSign: string;  // 游戏发放的token 用于验证gameOpenId是否有效
  public gameLoginToken: string;  // 本次角色登陆的token
  public gameUnionid: string;     // unionid
}
