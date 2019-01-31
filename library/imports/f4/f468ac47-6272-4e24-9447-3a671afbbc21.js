"use strict";
cc._RF.push(module, 'f468axHYnJOJJRHOmca+7wh', 'ProtoReflect');
// scripts/app/common/net/proto/ProtoReflect.ts

Object.defineProperty(exports, "__esModule", { value: true });
var ProtoDebug = require("./mods/ProtoSectionDebug");
var ProtoAcc = require("./mods/ProtoSectionAcc");
var ProtoPlayer = require("./mods/ProtoSectionPlayer");
var ProtoRoom = require("./mods/ProtoSectionRoom");
var ProtoActivity = require("./mods/ProtoSectionActivity");
var ProtoChat = require("./mods/ProtoSectionChat");
var ProtoGoods = require("./mods/ProtoSectionGoods");
var ProtoTask = require("./mods/ProtoSectionTask");
var ProtoRank = require("./mods/ProtoSectionRank");
var ProtoPlay = require("./mods/ProtoSectionPlay");
var ProtoBuff = require("./mods/ProtoSectionBuff");
var ProtoSignIn = require("./mods/ProtoSectionSignIn");
var ProtoSection;
(function (ProtoSection) {
    ProtoSection[ProtoSection["debug"] = 9] = "debug";
    ProtoSection[ProtoSection["acc"] = 10] = "acc";
    ProtoSection[ProtoSection["player"] = 11] = "player";
    ProtoSection[ProtoSection["room"] = 12] = "room";
    ProtoSection[ProtoSection["activity"] = 13] = "activity";
    ProtoSection[ProtoSection["chat"] = 14] = "chat";
    ProtoSection[ProtoSection["goods"] = 15] = "goods";
    ProtoSection[ProtoSection["task"] = 16] = "task";
    ProtoSection[ProtoSection["award"] = 17] = "award";
    ProtoSection[ProtoSection["payment"] = 18] = "payment";
    ProtoSection[ProtoSection["rank"] = 19] = "rank";
    ProtoSection[ProtoSection["play"] = 20] = "play";
    ProtoSection[ProtoSection["buff"] = 21] = "buff";
    ProtoSection[ProtoSection["signIn"] = 22] = "signIn";
})(ProtoSection = exports.ProtoSection || (exports.ProtoSection = {}));
exports.ProtoMsgMap = {
    2304: ProtoDebug.DebugErrorS2C,
    2560: ProtoAcc.AccLoginS2C,
    2562: ProtoAcc.AccCreateS2C,
    2564: ProtoAcc.AccEnterS2C,
    2565: ProtoAcc.AccKickOfflineS2C,
    2566: ProtoAcc.AccReloginS2C,
    2567: ProtoAcc.AccServertimeS2C,
    2570: ProtoAcc.AccBanS2C,
    2571: ProtoAcc.AccMaintainS2C,
    2816: ProtoPlayer.PlayerSelfInfoS2C,
    2817: ProtoPlayer.PlayerFortuneS2C,
    2818: ProtoPlayer.PlayerPlayStatS2C,
    2819: ProtoPlayer.PlayerShareGameS2C,
    2820: ProtoPlayer.PlayerPveStatS2C,
    2847: ProtoPlayer.PlayerDailyClearedS2C,
    2877: ProtoPlayer.PlayerCommitAddressS2C,
    2878: ProtoPlayer.PlayerAddressS2C,
    3072: ProtoRoom.RoomMatchRequestS2C,
    3073: ProtoRoom.RoomInviteRequestS2C,
    3074: ProtoRoom.RoomInviteTimeoutS2C,
    3075: ProtoRoom.RoomPlayWithS2C,
    3076: ProtoRoom.RoomPlayCreateS2C,
    3077: ProtoRoom.RoomPlayConfirmS2C,
    3078: ProtoRoom.RoomPlayStartS2C,
    3079: ProtoRoom.RoomReadyTimeoutS2C,
    3082: ProtoRoom.RoomPlayFinishS2C,
    3083: ProtoRoom.RoomOpponentLeaveS2C,
    3084: ProtoRoom.RoomInviterS2C,
    3086: ProtoRoom.RoomInvisibleS2C,
    3087: ProtoRoom.RoomMatchTimeoutS2C,
    3329: ProtoActivity.ActivityListS2C,
    3330: ProtoActivity.ActivityInfoS2C,
    3585: ProtoChat.ChatCommonLanguageS2C,
    3586: ProtoChat.ChatFaceS2C,
    3587: ProtoChat.ChatTextS2C,
    3588: ProtoChat.ChatVoiceS2C,
    3589: ProtoChat.ChatNoticeS2C,
    3840: ProtoGoods.GoodsPullS2C,
    3841: ProtoGoods.GoodsUpdateS2C,
    3871: ProtoGoods.GoodsExchangeS2C,
    3872: ProtoGoods.GoodsExchangeRemainS2C,
    3891: ProtoGoods.GoodsTurntableRunS2C,
    3892: ProtoGoods.GoodsTurntableRecordPullS2C,
    3893: ProtoGoods.GoodsTurntableRecordNewS2C,
    4097: ProtoTask.TaskListS2C,
    4098: ProtoTask.TaskUpdateS2C,
    4099: ProtoTask.TaskGainAwardS2C,
    4865: ProtoRank.RankPlayStarS2C,
    4866: ProtoRank.RankPveRankS2C,
    5120: ProtoPlay.PlayReadyS2C,
    5121: ProtoPlay.PlayNewRoundS2C,
    5122: ProtoPlay.PlaySaveAnimalS2C,
    5123: ProtoPlay.PlayGenBlockS2C,
    5124: ProtoPlay.PlayContinueS2C,
    5126: ProtoPlay.PlayNewPhaseS2C,
    5131: ProtoPlay.PlayStartPveS2C,
    5132: ProtoPlay.PlayActiveBuffS2C,
    5133: ProtoPlay.PlayStolenAnimalS2C,
    5134: ProtoPlay.PlayBoardStatusS2C,
    5377: ProtoBuff.BuffBuffStatusS2C,
    5378: ProtoBuff.BuffGenS2C,
    5633: ProtoSignIn.SignInSignS2C,
    5634: ProtoSignIn.SignInSignListS2C,
};
var ProtoErrorCode;
(function (ProtoErrorCode) {
    ProtoErrorCode[ProtoErrorCode["\u6210\u529F"] = 0] = "\u6210\u529F";
    ProtoErrorCode[ProtoErrorCode["\u672A\u77E5\u9519\u8BEF"] = 1] = "\u672A\u77E5\u9519\u8BEF";
    ProtoErrorCode[ProtoErrorCode["\u623F\u95F4\u5DF2\u6EE1"] = 2] = "\u623F\u95F4\u5DF2\u6EE1";
    ProtoErrorCode[ProtoErrorCode["\u623F\u95F4\u4E0D\u5B58\u5728"] = 3] = "\u623F\u95F4\u4E0D\u5B58\u5728";
    ProtoErrorCode[ProtoErrorCode["\u9700\u8981\u5FAE\u4FE1\u91CD\u65B0\u767B\u9646\u6388\u6743"] = 4] = "\u9700\u8981\u5FAE\u4FE1\u91CD\u65B0\u767B\u9646\u6388\u6743";
    ProtoErrorCode[ProtoErrorCode["\u5931\u8D25"] = 5] = "\u5931\u8D25";
    ProtoErrorCode[ProtoErrorCode["\u7CFB\u7EDF\u9519\u8BEF"] = 1000] = "\u7CFB\u7EDF\u9519\u8BEF";
    ProtoErrorCode[ProtoErrorCode["\u6570\u636E\u5E93\u9519\u8BEF"] = 1001] = "\u6570\u636E\u5E93\u9519\u8BEF";
    ProtoErrorCode[ProtoErrorCode["mnesia\u6570\u636E\u5E93\u9519\u8BEF"] = 1002] = "mnesia\u6570\u636E\u5E93\u9519\u8BEF";
    ProtoErrorCode[ProtoErrorCode["\u5BF9\u8C61\u4E0D\u5B58\u5728"] = 1003] = "\u5BF9\u8C61\u4E0D\u5B58\u5728";
    ProtoErrorCode[ProtoErrorCode["\u53C2\u6570\u9519\u8BEF"] = 1004] = "\u53C2\u6570\u9519\u8BEF";
    ProtoErrorCode[ProtoErrorCode["\u6CA1\u6709\u6743\u9650\u8BBF\u95EE"] = 1005] = "\u6CA1\u6709\u6743\u9650\u8BBF\u95EE";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u6570\u636E\u6D41\u91CF\u8D85\u8FC7\u9650\u5236"] = 1006] = "\u73A9\u5BB6\u6570\u636E\u6D41\u91CF\u8D85\u8FC7\u9650\u5236";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u6570\u636E\u5305\u8D85\u8FC7\u9650\u5236"] = 1007] = "\u73A9\u5BB6\u6570\u636E\u5305\u8D85\u8FC7\u9650\u5236";
    ProtoErrorCode[ProtoErrorCode["\u8BF7\u6C42\u8D85\u65F6"] = 1008] = "\u8BF7\u6C42\u8D85\u65F6";
    ProtoErrorCode[ProtoErrorCode["\u8DE8\u670D\u670D\u52A1\u6682\u4E0D\u53EF\u7528"] = 1009] = "\u8DE8\u670D\u670D\u52A1\u6682\u4E0D\u53EF\u7528";
    ProtoErrorCode[ProtoErrorCode["\u8BA4\u8BC1\u5931\u8D25"] = 1100] = "\u8BA4\u8BC1\u5931\u8D25";
    ProtoErrorCode[ProtoErrorCode["\u7EF4\u62A4\u72B6\u6001"] = 1101] = "\u7EF4\u62A4\u72B6\u6001";
    ProtoErrorCode[ProtoErrorCode["\u9700\u8981\u91CD\u65B0\u767B\u9646"] = 1102] = "\u9700\u8981\u91CD\u65B0\u767B\u9646";
    ProtoErrorCode[ProtoErrorCode["\u65F6\u95F4\u4E0D\u5408\u6CD5"] = 1103] = "\u65F6\u95F4\u4E0D\u5408\u6CD5";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u4F5C\u5F0A"] = 1104] = "\u73A9\u5BB6\u4F5C\u5F0A";
    ProtoErrorCode[ProtoErrorCode["\u5185\u5BB9\u5305\u542B\u975E\u6CD5\u4FE1\u606F\u6216\u957F\u5EA6\u4E0D\u5408\u9002"] = 1105] = "\u5185\u5BB9\u5305\u542B\u975E\u6CD5\u4FE1\u606F\u6216\u957F\u5EA6\u4E0D\u5408\u9002";
    ProtoErrorCode[ProtoErrorCode["\u540D\u79F0\u5DF2\u5B58\u5728"] = 1106] = "\u540D\u79F0\u5DF2\u5B58\u5728";
    ProtoErrorCode[ProtoErrorCode["\u6027\u522B\u4E0D\u5408\u6CD5"] = 1107] = "\u6027\u522B\u4E0D\u5408\u6CD5";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u4E0D\u5B58\u5728"] = 1108] = "\u73A9\u5BB6\u4E0D\u5B58\u5728";
    ProtoErrorCode[ProtoErrorCode["\u623F\u5361\u4E0D\u8DB3"] = 1200] = "\u623F\u5361\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u91D1\u5E01\u4E0D\u8DB3"] = 1201] = "\u91D1\u5E01\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u7ECF\u9A8C\u4E0D\u8DB3"] = 1202] = "\u7ECF\u9A8C\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u79EF\u5206\u4E0D\u8DB3"] = 1203] = "\u79EF\u5206\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u6750\u6599\u4E0D\u8DB3"] = 1204] = "\u6750\u6599\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["VIP\u7B49\u7EA7\u4E0D\u8DB3"] = 1205] = "VIP\u7B49\u7EA7\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u7B49\u7EA7\u4E0D\u7B26"] = 1206] = "\u73A9\u5BB6\u7B49\u7EA7\u4E0D\u7B26";
    ProtoErrorCode[ProtoErrorCode["cd\u65F6\u95F4\u975E\u6CD5"] = 1207] = "cd\u65F6\u95F4\u975E\u6CD5";
    ProtoErrorCode[ProtoErrorCode["\u6B21\u6570\u4E0D\u8DB3"] = 1208] = "\u6B21\u6570\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u8D2D\u4E70\u6B21\u6570\u4E0D\u8DB3"] = 1209] = "\u8D2D\u4E70\u6B21\u6570\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u7EA2\u5305\u5DF2\u5151\u5B8C"] = 1210] = "\u7EA2\u5305\u5DF2\u5151\u5B8C";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u6EE1\u7EA7"] = 1300] = "\u73A9\u5BB6\u6EE1\u7EA7";
    ProtoErrorCode[ProtoErrorCode["\u94DC\u94B1\u5230\u8FBE\u4E0A\u9650"] = 1301] = "\u94DC\u94B1\u5230\u8FBE\u4E0A\u9650";
    ProtoErrorCode[ProtoErrorCode["\u91D1\u5E01\u5230\u8FBE\u4E0A\u9650"] = 1302] = "\u91D1\u5E01\u5230\u8FBE\u4E0A\u9650";
    ProtoErrorCode[ProtoErrorCode["\u4EE3\u91D1\u52B5\u5230\u8FBE\u4E0A\u9650"] = 1303] = "\u4EE3\u91D1\u52B5\u5230\u8FBE\u4E0A\u9650";
    ProtoErrorCode[ProtoErrorCode["\u80CC\u5305\u53EF\u62D3\u5C55\u683C\u6570\u5DF2\u8FBE\u4E0A\u9650"] = 1304] = "\u80CC\u5305\u53EF\u62D3\u5C55\u683C\u6570\u5DF2\u8FBE\u4E0A\u9650";
    ProtoErrorCode[ProtoErrorCode["\u5DF2\u8FBE\u4E0A\u9650"] = 1305] = "\u5DF2\u8FBE\u4E0A\u9650";
    ProtoErrorCode[ProtoErrorCode["\u672A\u5F00\u542F"] = 1400] = "\u672A\u5F00\u542F";
    ProtoErrorCode[ProtoErrorCode["\u672A\u6FC0\u6D3B"] = 1401] = "\u672A\u6FC0\u6D3B";
    ProtoErrorCode[ProtoErrorCode["\u672A\u5B8C\u6210"] = 1402] = "\u672A\u5B8C\u6210";
    ProtoErrorCode[ProtoErrorCode["\u672A\u901A\u8FC7"] = 1403] = "\u672A\u901A\u8FC7";
    ProtoErrorCode[ProtoErrorCode["\u8FDB\u884C\u4E2D"] = 1404] = "\u8FDB\u884C\u4E2D";
    ProtoErrorCode[ProtoErrorCode["\u5DF2\u5B8C\u6210"] = 1405] = "\u5DF2\u5B8C\u6210";
    ProtoErrorCode[ProtoErrorCode["\u5DF2\u9886\u53D6"] = 1406] = "\u5DF2\u9886\u53D6";
    ProtoErrorCode[ProtoErrorCode["\u5DF2\u88AB\u5176\u4ED6\u73A9\u5BB6\u9886\u53D6"] = 1407] = "\u5DF2\u88AB\u5176\u4ED6\u73A9\u5BB6\u9886\u53D6";
    ProtoErrorCode[ProtoErrorCode["\u6761\u4EF6\u4E0D\u6EE1\u8DB3"] = 1500] = "\u6761\u4EF6\u4E0D\u6EE1\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u5DF2\u8FC7\u671F"] = 1501] = "\u5DF2\u8FC7\u671F";
    ProtoErrorCode[ProtoErrorCode["\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u76EE\u6807"] = 1502] = "\u6CA1\u6709\u7B26\u5408\u6761\u4EF6\u7684\u76EE\u6807";
    ProtoErrorCode[ProtoErrorCode["\u5BF9\u5E94\u76EE\u6807\u4E0D\u5B58\u5728"] = 1503] = "\u5BF9\u5E94\u76EE\u6807\u4E0D\u5B58\u5728";
    ProtoErrorCode[ProtoErrorCode["\u5BF9\u5E94\u76EE\u6807\u5DF2\u8FBE\u6210, \u65E0\u987B\u91CD\u590D\u64CD\u4F5C"] = 1504] = "\u5BF9\u5E94\u76EE\u6807\u5DF2\u8FBE\u6210, \u65E0\u987B\u91CD\u590D\u64CD\u4F5C";
    ProtoErrorCode[ProtoErrorCode["\u4E0D\u80FD\u5BF9\u81EA\u5DF1\u6267\u884C\u8BE5\u64CD\u4F5C"] = 1600] = "\u4E0D\u80FD\u5BF9\u81EA\u5DF1\u6267\u884C\u8BE5\u64CD\u4F5C";
    ProtoErrorCode[ProtoErrorCode["\u73A9\u5BB6\u4E0D\u5B58\u5728\u6216\u8005\u79BB\u7EBF"] = 1601] = "\u73A9\u5BB6\u4E0D\u5B58\u5728\u6216\u8005\u79BB\u7EBF";
    ProtoErrorCode[ProtoErrorCode["\u672A\u6536\u5230\u9080\u8BF7"] = 1602] = "\u672A\u6536\u5230\u9080\u8BF7";
    ProtoErrorCode[ProtoErrorCode["\u6D3B\u52A8\u672A\u5F00\u542F"] = 1700] = "\u6D3B\u52A8\u672A\u5F00\u542F";
    ProtoErrorCode[ProtoErrorCode["\u6D3B\u52A8\u5DF2\u7ED3\u675F"] = 1701] = "\u6D3B\u52A8\u5DF2\u7ED3\u675F";
    ProtoErrorCode[ProtoErrorCode["\u526F\u672C\u5DF2\u7ED3\u675F"] = 1800] = "\u526F\u672C\u5DF2\u7ED3\u675F";
    ProtoErrorCode[ProtoErrorCode["\u5730\u56FE\u5DF2\u6EE1"] = 1801] = "\u5730\u56FE\u5DF2\u6EE1";
    ProtoErrorCode[ProtoErrorCode["\u5DF2\u5728\u5730\u56FE\u5185"] = 1802] = "\u5DF2\u5728\u5730\u56FE\u5185";
    ProtoErrorCode[ProtoErrorCode["\u6240\u6709\u5730\u56FE\u5747\u4EBA\u6EE1"] = 1803] = "\u6240\u6709\u5730\u56FE\u5747\u4EBA\u6EE1";
    ProtoErrorCode[ProtoErrorCode["\u6CA1\u6709\u623F\u95F4"] = 1804] = "\u6CA1\u6709\u623F\u95F4";
    ProtoErrorCode[ProtoErrorCode["\u4E0D\u5728\u526F\u672C\u5185"] = 1805] = "\u4E0D\u5728\u526F\u672C\u5185";
    ProtoErrorCode[ProtoErrorCode["\u76EE\u6807\u4F4D\u7F6E\u4E0D\u53EF\u5230\u8FBE"] = 1806] = "\u76EE\u6807\u4F4D\u7F6E\u4E0D\u53EF\u5230\u8FBE";
    ProtoErrorCode[ProtoErrorCode["\u80CC\u5305\u5DF2\u6EE1"] = 1900] = "\u80CC\u5305\u5DF2\u6EE1";
    ProtoErrorCode[ProtoErrorCode["\u7269\u54C1\u4E0D\u5B58\u5728"] = 1901] = "\u7269\u54C1\u4E0D\u5B58\u5728";
    ProtoErrorCode[ProtoErrorCode["\u7269\u54C1\u4E0D\u53EF\u4F7F\u7528"] = 1902] = "\u7269\u54C1\u4E0D\u53EF\u4F7F\u7528";
    ProtoErrorCode[ProtoErrorCode["\u7269\u54C1\u7C7B\u578B\u4E0D\u652F\u6301"] = 1903] = "\u7269\u54C1\u7C7B\u578B\u4E0D\u652F\u6301";
    ProtoErrorCode[ProtoErrorCode["\u7269\u54C1\u7C7B\u578B\u4E0D\u7B26"] = 1904] = "\u7269\u54C1\u7C7B\u578B\u4E0D\u7B26";
    ProtoErrorCode[ProtoErrorCode["\u7269\u54C1\u6B63\u5728\u51B7\u5374"] = 1905] = "\u7269\u54C1\u6B63\u5728\u51B7\u5374";
    ProtoErrorCode[ProtoErrorCode["\u7269\u54C1\u6570\u91CF\u4E0D\u8DB3"] = 1906] = "\u7269\u54C1\u6570\u91CF\u4E0D\u8DB3";
    ProtoErrorCode[ProtoErrorCode["\u5F53\u524D\u5DF2\u5728\u623F\u95F4\u4E2D"] = 2000] = "\u5F53\u524D\u5DF2\u5728\u623F\u95F4\u4E2D";
    ProtoErrorCode[ProtoErrorCode["\u724C\u5C40\u5DF2\u7ECF\u5F00\u59CB"] = 2001] = "\u724C\u5C40\u5DF2\u7ECF\u5F00\u59CB";
    ProtoErrorCode[ProtoErrorCode["\u5C1A\u672A\u9996\u5145"] = 2002] = "\u5C1A\u672A\u9996\u5145";
    ProtoErrorCode[ProtoErrorCode["\u672C\u671F\u593A\u5B9D\u6D3B\u52A8\u5DF2\u7ED3\u675F"] = 2003] = "\u672C\u671F\u593A\u5B9D\u6D3B\u52A8\u5DF2\u7ED3\u675F";
    ProtoErrorCode[ProtoErrorCode["\u623F\u95F4\u4E3B\u4EBA\u5DF2\u7ECF\u79BB\u5F00"] = 2004] = "\u623F\u95F4\u4E3B\u4EBA\u5DF2\u7ECF\u79BB\u5F00";
    ProtoErrorCode[ProtoErrorCode["\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A"] = 2100] = "\u59D3\u540D\u4E0D\u80FD\u4E3A\u7A7A";
    ProtoErrorCode[ProtoErrorCode["\u5FC5\u987B11\u4F4D\u53F7\u7801"] = 2101] = "\u5FC5\u987B11\u4F4D\u53F7\u7801";
    ProtoErrorCode[ProtoErrorCode["\u5730\u5740\u4E0D\u6B63\u786E"] = 2102] = "\u5730\u5740\u4E0D\u6B63\u786E";
})(ProtoErrorCode = exports.ProtoErrorCode || (exports.ProtoErrorCode = {}));

cc._RF.pop();