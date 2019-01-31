// 
exports.getById = function(bid){
   return HY_BUFFS[bid.toString()];
};

var HY_BUFFS = {
	// 营地的生火事件
	"6000":{
		H_TIME : 12*3600, // 持续时间, 12*3600 秒
		ATTRS : {},		// 
		AUTO_RELEASE : 1,
	},

	// 温棚生产土豆
	"6001":{
		H_TIME : 48*3600, // 持续时间, 48*3600 秒
		ATTRS : {},		
		ITEMS : {"4044" : 10}, // 物品"4023"项增加 10
		AUTO_RELEASE : 0,
	},
		
	// 温棚生产薄荷
	"6002":{
		H_TIME : 48*3600, // 持续时间, 48*3600 秒
		ATTRS : {},		
		ITEMS : {"4022" : 10}, // 物品"4022"项增加 10
		AUTO_RELEASE : 0,
	},

	// 陷阱生产肉
	// "6003":{
	// 	H_TIME : 48*3600, // 持续时间, 48*3600 秒
	// 	ATTRS : {},		
	// 	ITEMS : {"4020" : 3}, // 物品"4022"项增加 3
	// 	AUTO_RELEASE : 0,
	// },	

	// 净水台生产水
	// "6004":{
	// 	H_TIME : 48*3600, // 持续时间, 48*3600 秒
	// 	ATTRS : {},		
	// 	ITEMS : {"4002" : 3}, // 物品"4002"项增加 3
	// 	AUTO_RELEASE : 0,
	// },

	//睡1小时
	"6005":{
		H_TIME : 3600, // 持续时间, 3600 秒
		ATTRS : {"7000" : 10,"7003" : 10},	//实际睡眠恢复效果1小时结算一次，并受其他参数影响，此处先用回复精神和生命暂替
		AUTO_RELEASE : 1,
	},

	//睡4小时
	"6006":{
		H_TIME : 4*3600, // 持续时间, 4*3600 秒
		ATTRS : {"7000" : 10,"7003" : 10},	//实际睡眠恢复效果1小时结算一次，并受其他参数影响，此处先用回复精神和生命暂替
		AUTO_RELEASE : 1,
	},

	//睡8小时
	"6007":{
		H_TIME : 8*3600, // 持续时间, 8*3600 秒
		ATTRS : {"7000" : 10,"7003" : 10},	//实际睡眠恢复效果1小时结算一次，并受其他参数影响，此处先用回复精神和生命暂替
		AUTO_RELEASE : 1,
	},

	//睡到天亮
	"6008":{
		H_TIME : 8*3600, // 持续时间, 此处睡到天亮需要读取当前时间计算睡眠时间，先用8小时暂替
		ATTRS : {"7000" : 10,"7003" : 10},	//实际睡眠恢复效果1小时结算一次，并受其他参数影响，此处先用回复精神和生命暂替
		AUTO_RELEASE : 1,
	},

	// 净水台生产水
	"6009":{
		H_TIME : 48*3600, // 持续时间, 48*3600 秒
		ATTRS : {},		
		ITEMS : {"4002" : 12}, // 物品"4002"项增加 3
		AUTO_RELEASE : 0,
	},

	// 净水台生产酒精
	"6010":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {},		
		ITEMS : {"4037" : 1}, // 物品"4002"项增加 3
		AUTO_RELEASE : 0,
	},

	// 码头生产肉
	"6011":{
		H_TIME : 48*3600, // 持续时间, 48*3600 秒
		ATTRS : {},		
		ITEMS : {"4020" : 5}, // 物品"4002"项增加 3
		AUTO_RELEASE : 0,
	},

	// 酿酒台酿酒
	"6012":{
		H_TIME : 48*3600, // 持续时间, 48*3600 秒
		ATTRS : {},		
		ITEMS : {"4042" : 5}, // 物品"4002"项增加 3
		AUTO_RELEASE : 0,
	},
    // 
	"7000":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7004" : 0.5/600},		
		AUTO_RELEASE : 1,
	},
	// 
	"7001":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7000" : 0.1/600},		
		AUTO_RELEASE : 1,
	},
    // 
	"7002":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7018" : 5},		
		AUTO_RELEASE : 1,
	},
	// 
	"7003":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7013" : 3},		
		AUTO_RELEASE : 1,
	},
	// 
	"7004":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7013" : 2,"7012" : 2},		
		AUTO_RELEASE : 1,
	},
	// 
	"7005":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7012" : 1},		
		AUTO_RELEASE : 1,
	},
	// 
	"7006":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7013" : 1},		
		AUTO_RELEASE : 1,
	},
	// 
	"7007":{
		H_TIME : 24*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7013" : 8},		
		AUTO_RELEASE : 1,
	},
	// 
	"7008":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7016" : 10,"7017" : 10},		
		AUTO_RELEASE : 1,
	},
	// 
	"7009":{
		H_TIME : 120*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7064" : 5},		
		AUTO_RELEASE : 1,
	},
    "7010":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7005" : 0.5/600},		
		AUTO_RELEASE : 1,

	},
	"7011":{
		H_TIME : 3600, // 持续时间, 3600秒
		ATTRS : {"7013" : 5,"7016" : 10,"7017" : 10,"7001" : -5},//此属性非BUFF使用		
		AUTO_RELEASE : 1,
	},
	"7012":{
		H_TIME : 72*3600, // 持续时间, 48*3600 秒
		ATTRS : {"7001" : -0.5/600},		
		AUTO_RELEASE : 1,
	}
	
};
