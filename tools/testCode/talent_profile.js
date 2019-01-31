// 
exports.getById = function(tid){
   return HY_TALENTS[tid.toString()];
};

// 此处的赋值是角色属性绝对值加成!
// type 0为幸存者  1为战斗 2为生存 3为探索

var HY_TALENTS = {
	// 幸存者
	"2000" : {
		TYPE : 0,
		NAME : "无",
		DESC : "能够活下来已经是很幸运了",
		BASE : {

		},
		ATTR : {
			
		},
	},

	// 神枪手   提高命中参数25%
	"2001" : {
		TYPE : 1,
		NAME : "",
		NAME : "神射手",
		DESC : "你对弓有着异样的天赋\n提高25%远程命中率",
		BASE : {
			7017 : 25,
		},
		ATTR : {
			
		},
	},
	// 大块头
	"2002" : {
		TYPE : 2,
		NAME : "大家伙",
		DESC : "块头的优势在这里体现了出来\n提高100生命值上限",
		BASE : {
			7002 : 100,
			7003 : 100,
		},
		ATTR : {
		},
	},
	// 拾荒者
	"2003" : {
		TYPE : 3,
		NAME : "清扫者",
		DESC : "清扫会有意外收获\n有概率获取双倍副本资源",
		BASE : {

		},
		ATTR : 10,//拾荒额外收获触发概率
		// ATTR : 100,//测试
	},
	// 社交达人
	"2004" : {
		TYPE : 3,
		NAME : "万人迷",
		DESC : "这是个看脸的荒野\n拒绝请求不降低友好度，且有概率额外获得物品",
		BASE : {

		},
		ATTR : 30,//NPC额外赠与触发概率
	},
	// 罗盘者
	"2005" : {
		TYPE : 2,
		NAME : "占星师",
		DESC : "星辰会指引你前进的方向\n降低迷失方向几率",
		BASE : {

		},
		ATTR : -15,//降低15%概率
		// ATTR : -9000,//测试
	},
	// 陷阱者
	"2006" : {
		TYPE : 2,
		NAME : "陷猎者",
		DESC : "好的猎人只需要守株待兔\n提高陷阱捕获猎物几率",
		BASE : {

		},
		ATTR : 20,// “陷阱专家”的捕获成功率加成值
		// ATTR : 1000,//测试
	},
	// 基础攻击距离+1
	"2007" : {
		TYPE : 1,
		NAME : "长臂猿",
		DESC : "似乎你的手臂比一般人要长一些\n提高1基础攻击距离，但闪避几率降低",
		BASE : {
			7018 : -20,
		},
		ATTR : 1,// 基础攻击距离+1
	},
	// 不装备任何武器时攻击和闪避提高
	"2008" : {
		TYPE : 1,
		NAME : "空手道",
		DESC : "武器有时是一种累赘\n不装备任何武器时提高攻击和闪避",
		BASE : {

		},
		ATTR : {
			ATTACK : 10,//增加10点攻击
			MISS : 10,//提高10%闪避
		},
	},
	// 狂暴者
	"2009" : {
		TYPE : 1,
		NAME : "嗜血者",
		DESC : "越是危险的情况力量越大\n血量过低时提高攻击力",
		BASE : {

		},
		ATTR : 1.2,//低于20%伤害提高至1.2倍
		// ATTR : 10,//测试
	},
	// 武器耐久度一定概率不消耗
	"2010" : {
		TYPE : 1,
		NAME : "养护者",
		DESC : "对待武器也要像爱人一样\n降低武器耐久度消耗",
		BASE : {

		},
		ATTR : 30,//30%概率不消耗
		// ATTR : 100,//测试
	},
	// 恢复者
	"2011" : {
		TYPE : 1,
		NAME : "银刚狼",
		DESC : "远比不上金刚狼\n每次战斗后回复部分自身损失的生命值",
		BASE : {

		},
		ATTR : {
			MIN : 20,
			MAX : 30,//恢复损失的20-30血
			// MIN : 100,
			// MAX : 100,//测试			
		},//恢复该场战斗损失血量百分比
	},
	// 药品恢复效果提高30%
	"2012" : {
		TYPE : 2,
		NAME : "药剂师",
		DESC : "同样的药，不同的效果\n提高药品恢复效果",
		BASE : {

		},
		ATTR : {
			MIN : 20,
			MAX : 30,//提高20-30%
			// MIN : 1000,
			// MAX : 1000,//测试
		},
	},
	// 低温抗性增加
	"2013" : {
		TYPE : 2,
		NAME : "北境者",
		DESC : "长期生活在北方\n增加低温抗性",
		BASE : {
			 7053 : 18,//初始值12
			// 7053 : 999,//测试
		},
		ATTR : {
		},
	},
	// 外伤/外伤增长速度降低
	"2014" : {
		TYPE : 2,
		NAME : "石皮者",
		DESC : "皮肤与一般人有所不同\n降低外伤和内伤增长速度",
		BASE : {

		},
		ATTR : {
			MIN : 20,
			MAX : 30,//降低20-30内外伤速度
			// MIN : 100,
			// MAX : 100,//测试			
		},
	},
	// 失眠值增长速度降低
	"2015" : {
		TYPE : 2,
		NAME : "修仙者",
		DESC : "熬夜越深，修为越高\n降低失眠值增长速度",
		BASE : {

		},
		ATTR : {
			MIN : 20,
			MAX : 30,//降低20-30%失眠值增长
			// MIN : 100,
			// MAX : 100,//测试			
		},
	},
	// 饥饿度上限增加且食物恢复效果增加
	"2016" : {
		TYPE : 2,
		NAME : "小吃货",
		DESC : "只要有东西吃，就很满足了\n增加饥饿度上限增加和食物恢复效果",
		BASE : {
			7006 : 30,
			7048 : 30,//饥饿度和上限提高30点
			// 7006 : 300,
			// 7048 : 300,//测试
		},
		ATTR : {
			MIN : 20,
			MAX : 30,//恢复效果增加20-30%
			// MIN : 100,
			// MAX : 100,//测试
		},
	},
	// 生态恢复速度增加
	"2017" : {
		TYPE : 2,
		NAME : "环境家",
		DESC : "天灾大多是人祸\n增加循环资源点生态恢复速度",
		BASE : {

		},
		ATTR : 1.2,//恢复速度提高至120%
		// ATTR : 100,//测试
	},
	// 降低夜袭概率,原概率计算出来后减去本天赋概率
	"2018" : {
		TYPE : 3,
		NAME : "夜语者",
		DESC : "黑夜与你同在\n降低营地夜晚被袭击概率",
		BASE : {

		},
		ATTR : 	{
			GUARD :8,//降低8%夜袭概率
			// GUARD :200,//测试
		},

	},
	// 增加建筑耐久度上限
	"2019" : {
		TYPE : 3,
		NAME : "建筑师",
		DESC : "好的设计和工序会影响建筑的使用\n增加建筑耐久度上限",
		BASE : {

		},
		ATTR : {
			DURATION : 20,
			
		},
	},
	// 增加发现隐藏关卡概率
	"2020" : {
		TYPE : 3,
		NAME : "洞察者",
		DESC : "仔细观察，有不同的东西\n增加发现隐藏关卡概率",
		BASE : {

		},
		ATTR : {
			MIN : 15,
			MAX : 15,
		},//默认概率为20%，此处增加的为绝对概率
	},
	// 从沉船逃离降低遭遇鲨鱼的概率
	"2021" : {
		TYPE : 3,
		NAME : "速泳者",
		DESC : "游泳的速度关系到生命\n离开沉船时不会遭遇鲨鱼",
		BASE : {

		},
		ATTR : {
			MIN : 0,
			MAX : 0,
		},
	},
	// 交易时，能用更低的价格换取更多的物资
	"2022" : {
		TYPE : 3,
		NAME : "谈判家",
		DESC : "良好的谈判技巧有很大的帮助\n交易时能用更低的价格换取更多的物资",
		BASE : {

		},
		ATTR : 70,
	},
};