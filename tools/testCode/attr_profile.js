 
exports.getById = function(bid){
   return HY_ATTRS[bid.toString()];
};

var HY_ATTRS = {
	// Example  最大7065
	"7000":{
		NAME : "精神力", 
	},
	"7044":{
		NAME : "最大精神力", 
	},
	"7001":{
		NAME : "失眠值", 
	},	
	"7045":{
		NAME : "最大失眠值", 
	},	
	"7002":{
		NAME : "最大生命", 
	},	
	"7003":{
		NAME : "生命", 
	},	
	"7004":{
		NAME : "外伤值", 
	},	
	"7046":{
		NAME : "最大外伤值", 
	},
	"7005":{
		NAME : "内伤值", 
	},	
	"7047":{
		NAME : "最大内伤值", 
	},	
	"7006":{
		NAME : "饥饿度", 
	},	
	"7048":{
		NAME : "最大饥饿度", 
	},	
	"7007":{
		NAME : "基础移动速度", 		//用于计算达到不同地点需要的时间
	},	
	"7042":{
		NAME : "是否拥有骆驼", 		//用于计算达到不同地点需要的时间
	},
	"7041":{
		NAME : "是否拥有船", 		//用于计算达到不同地点需要的时间
	},		
	"7008":{
		NAME : "负重", 
	},
	"7040":{
		NAME : "最大负重", 
	},		
	"7012":{						//通用于角色，怪物，武器工具
		NAME : "防御力", 
	},	
	"7013":{						//通用于角色，怪物，武器工具
		NAME : "攻击力", 
	},	
	"7014":{						//通用于角色，怪物，武器工具
		NAME : "战斗中移动速度", 
	},		
	"7016":{						//通用于角色，怪物，武器工具
		NAME : "近战命中", 
	},	
	"7017":{						//通用于角色，怪物，武器工具
		NAME : "远程命中", 
	},	
	"7018":{						//通用于角色，怪物，武器工具
		NAME : "闪避", 
	},	
	"7019":{						//通用于角色，怪物，武器工具
		NAME : "攻击速度", 
	},	
	"7020":{
		NAME : "战利品获取修正值", 
	},
	"7021":{
		NAME : "采集值", 
	},	
	"7022":{
		NAME : "挖掘值", 
	},	
	"7023":{
		NAME : "砍伐值", 
	},	
	"7024":{
		NAME : "抓捕值", 
	},	
	"7025":{
		NAME : "免疫力", 
	},	
	"7026":{
		NAME : "协调能力", 
	},	
	"7027":{
		NAME : "与XX好感度", 
	},	
	"7032":{
		NAME : "密道发现概率", 
	},	
	"7051":{
		NAME : "是否为社交达人", 
	},	
	"7052":{
		NAME : "体温", 
	},	
	"7053":{
		NAME : "御寒参数", 
	},	
	"7054":{
		NAME : "是否制作了鞋", 
	},	
	"7055":{
		NAME : "是否制作了包", 
	},	
//以上为角色属性，以下为环境等其他属性
	"7033":{						//特指可再生资源点
		NAME : "资源当前数量", 
	},	
	"7034":{						//特指可再生资源点
		NAME : "资源数量上限", 
	},	
	"7035":{						//特指可再生资源点
		NAME : "资源数量增量", 
	},	
	"7015":{
		NAME : "天数", 
	},
	"7036":{						
		NAME : "季节", 
	},	
	"7037":{						
		NAME : "天气", 
	},
	"7038":{						
		NAME : "昼夜", 
	},	
	"7039":{						//随着天数增加的难度系数，影响怪物强度
		NAME : "难度修正", 
	},
	"7009":{
		NAME : "室外温度", 
	},	
	"7010":{
		NAME : "室内温度", 
	},	
	"7011":{
		NAME : "体感温度", 
	},	
	"7028":{
		NAME : "宠物忠诚度", 
	},	
	"7049":{
		NAME : "最大宠物忠诚度", 
	},
	"7029":{
		NAME : "宠物饱食度", 
	},	
	"7050":{
		NAME : "最大宠物饱食度", 
	},	
	"7030":{
		NAME : "宠物伤害率", 
	},	
	"7031":{						//指武器工具耐久
		NAME : "耐久度", 
	},
	"7056":{						
		NAME : "保暖能力", 
	},	
	"7057":{						
		NAME : "攻击距离", 
	},	
	"7058":{						
		NAME : "临界饥饿度", 
	},	
	"7059":{						
		NAME : "总行程", 
	},
	"7063":{						
		NAME : "角色影响食物暴击", 
	},	
	"7064":{						
		NAME : "角色影响工具暴击", 
	},
	"7065":{						
		NAME : "BUFF抗寒参数", 
	},
	"7100":{						
		NAME : "临时强化防御", 
	},
	"7101":{						
		NAME : "D类临时强化攻击", 
	},
	"7101":{						
		NAME : "临时强化炸弹攻击", 
	},
	"7102":{						
		NAME : "临时强化进程攻击", 
	},
	"7103":{						
		NAME : "临时强化远程攻击", 
	},
	"7104":{						
		NAME : "食品命中率加成", 
	},
	"7105":{						
		NAME : "攻速B类加成", 
	},
	"7106":{						
		NAME : "移速B类加成", 
	},
};