// 
exports.getById = function(bid){
	return HY_AREAS[bid.toString()];
};

//SUDDEN中编号0表示不触发，仅用来占据权重

var HY_AREAS = {

	"0":{
		NAME : "林中空地" , 
		TYPE : "1" ,		//行动速度目前只有两种类型: 1---陆路; 2---水路
		RATIO : 1.3 ,		//RATIO为未使用正确工具速度参数
		T_RATIO : 1.8 ,		//T_RATIO为使用正确工具速度参数
		H_PARAM : 0, 		// 地形命中参数  
		DARK : 0,			//是否黑暗
		SUDDEN : [0,0],		//可触发意外事件的列表   
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -15,		//POT点触发迷宫的基础概率
	},
	
	"1":{
		NAME : "乱石林" , 
		TYPE : "1" ,		//行动速度目前只有两种类型: 1---陆路; 2---水路
		RATIO : 1.3 ,		//RATIO为未使用正确工具速度参数
		T_RATIO : 1.8 ,		//T_RATIO为使用正确工具速度参数
		H_PARAM : 0, 		// 地形命中参数  
		DARK : 0,			//是否黑暗
		SUDDEN : [0,0],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -15,		//POT点触发迷宫的基础概率
	},
	"2":{
		NAME : "灌木丛" , 
		TYPE : "1" ,		
		RATIO : 1.3 ,		
		T_RATIO : 1.8 ,		
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [401,200],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -1000,		//POT点触发迷宫的基础概率		
	},
	"3":{
		NAME : "海岸" , 
		TYPE : "1" ,		
		RATIO : 1.3 ,		
		T_RATIO : 1.8 ,		
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [0,202],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -15,		//POT点触发迷宫的基础概率		
	},
	"4":{
		NAME : "林中暗流" , 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,		
		SUDDEN : [404,202],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -15,		//POT点触发迷宫的基础概率
	},
	"5":{
		NAME : "瀑布", 
		TYPE : "2" ,
		RATIO : 1.1 ,
		T_RATIO : 1.5 ,
		H_PARAM : 90, 		
		DARK : 0,	
		SUDDEN : [403,200],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -15,		//POT点触发迷宫的基础概率
	},
	"6":{
		NAME : "竹林" , 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,		
		SUDDEN : [402,0],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -15,		//POT点触发迷宫的基础概率
	},	
	"7":{
		NAME : "溶洞", 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 30, 		
		DARK : 1,	
		SUDDEN : [405,207],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"8":{
		NAME : "丘陵" , 
		TYPE : "1" ,		
		RATIO : 1.3 ,		
		T_RATIO : 1.8 ,		
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [0,208],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 15,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率		
	},
	"9":{
		NAME : "湖泊", 
		TYPE : "2" ,
		RATIO : 1.1 ,
		T_RATIO : 1.5 ,
		H_PARAM : 90, 		
		DARK : 0,	
		SUDDEN : [209,0],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 15,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"10":{
		NAME : "雨林" , 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [406,210],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率	
	},	
	"11":{
		NAME : "松木林" , 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [407,200],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率		
	},	
	"12":{
		NAME : "沼泽地", 
		TYPE : "2" ,
		RATIO : 1.1 ,
		T_RATIO : 1.5 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [409,207],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"13":{
		NAME : "山脉", 
		TYPE : "1" ,
		RATIO : 1.3 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [408,219],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 15,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"14":{
		NAME : "荒漠", 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [0,214],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},	
	"15":{
		NAME : "原始森林" , 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [407,219],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率	
	},
	"16":{
		NAME : "火山", 
		TYPE : "1" ,
		RATIO : 1.3 ,
		T_RATIO : 1.8 ,
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [0,208],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 15,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"17":{
		NAME : "雪原" , 
		TYPE : "1" ,		
		RATIO : 1.3 ,		
		T_RATIO : 1.8 ,		
		H_PARAM : 0, 		
		DARK : 0,		
		SUDDEN : [0,217],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"18":{
		NAME : "绿洲" , 
		TYPE : "1" ,		
		RATIO : 1.3 ,		
		T_RATIO : 1.8 ,		
		H_PARAM : 0, 		
		DARK : 0,	
		SUDDEN : [0],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 15,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率		
	},
	"19":{
		NAME : "黑暗囚室", 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 30, 		
		DARK : 1,	
		SUDDEN : [0,219],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
	"20":{
		NAME : "戈壁遗迹", 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 30, 		
		DARK : 1,	
		SUDDEN : [0,214],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率		
	},
	"21":{
		NAME : "沉船", 
		TYPE : "2" ,
		RATIO : 1.1 ,
		T_RATIO : 1.5 ,
		H_PARAM : 90, 		
		DARK : 0,	
		SUDDEN : [221],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 10,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},	
	"22":{
		NAME : "洞窟", 
		TYPE : "1" ,
		RATIO : 1.4 ,
		T_RATIO : 1.8 ,
		H_PARAM : 30, 		
		DARK : 1,	
		SUDDEN : [0,219],		//可触发意外事件的列表
		SR_HURT : -1000, 		//POT点触发意外受伤的基础概率
		SR_MONSTER : 20,	//POT点触发意外遇袭的基础概率
		SR_MAZE : -18,		//POT点触发迷宫的基础概率
	},
};