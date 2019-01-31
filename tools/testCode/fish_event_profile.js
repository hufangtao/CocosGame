// 
exports.getFight = function(bid){
	return dy.utils.clone(R_STAGE[bid.toString()]);
};

exports.getBox = function(bid){
	return dy.utils.clone(M_STAGE[bid.toString()]);
};


var R_STAGE = {

	"5031":{
			ID : '5031',
            NAME : "水蟒",
            PIC : "Texture/Monster/1021",
            MONSTER : [1021,1021],
            DANGER : "3",
            DROP_ID : 7000,
            DESC : "你感觉有东西上钩了，一拉鱼竿没想到是两条水蟒",//关卡进入描述
            DESC1 : "",//关卡战斗中描述
            DESC2 : "你成功击败了水蟒",//关卡战斗结束描述
        },


	"5032":{
			ID : '5032',
            NAME : "食人鱼",
            PIC : "Texture/Monster/1012",
            MONSTER : [1012,1012,1012],
            DANGER : "4",
            DROP_ID : 7001,
            DESC : "生肉的血腥引来了一群食人鱼，你连忙应战",//关卡进入描述
            DESC1 : "",//关卡战斗中描述
            DESC2 : "你成功击败了食人鱼群",//关卡战斗结束描述
        },


	"5033":{
			ID : '5033',
            NAME : "鳄鱼",
            PIC : "Texture/Monster/1018",
            MONSTER : [1018,1018],
            DANGER : "7",
            DROP_ID : 7002,
            DESC : "在你专心钓鱼的时候，两只鳄鱼突然向你发起攻击",//关卡进入描述
            DESC1 : "",//关卡战斗中描述
            DESC2 : "你成功击败了鳄鱼",//关卡战斗结束描述
        },


	"5034":{
			ID : '5034',
            NAME : "鳄鱼",
            PIC : "Texture/Monster/1019",
            MONSTER : [1018,1019],
            DANGER : "8",
            DROP_ID : 7003,
            DESC : "在你专心钓鱼的时候，两只鳄鱼突然向你发起攻击",//关卡进入描述
            DESC1 : "",//关卡战斗中描述
            DESC2 : "你成功击败了鳄鱼",//关卡战斗结束描述
        },


	"5035":{
			ID : '5035',
            NAME : "鲨鱼",
            PIC : "Texture/Monster/1031",
            MONSTER : [1031, 1031, 1031],
            DANGER : "5",
            DROP_ID : 7004,
            DESC : "你感受到水流的异样，回头一看是几头鲨鱼向你冲了过来",//关卡进入描述
            DESC1 : "",//关卡战斗中描述
            DESC2 : "你成功击败了鲨鱼",//关卡战斗结束描述
        },
};

var M_STAGE = {
	'5036':{
			
            ID : '5036',
            NAME : "箱子",
            PIC : "Texture/Monster/1211",
            OPEN_WAYS : ["0", "4100", "4112"],
            DROP_ID : 7005,
            DESC : "你感觉鱼钩好像钩住什么重物，费了不小的劲儿拉出一个破旧的箱子",//关卡进入描述
            DESC1 : "努力开启中...",//关卡战斗中描述
            DESC2 : "你成功开启了箱子",//关卡战斗结束描述
        },
}