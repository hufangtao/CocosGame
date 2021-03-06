// 
exports.getById = function(tid){
   return HY_TASKS[tid.toString()];
};

exports.getAllTasks = function(){
	return HY_TASKS;
};

// 当前的 TASK 列表
var HY_TASKS = {

	"1" : {
		TITLE : "寻找食物",
		TIPS : "去乱石林狩猎野兽，收集一些野兽的肉回来",
		COND : {
		},
		COMP : {
			// 物品数量
			"1004" : {
				"4020" : 4,
			},
		},
	},

	// "2" : {
	// 	TITLE : "建造床铺",
	// 	TIPS : "没有睡觉的地方无法在荒野中生存下去，建造一个简陋的床吧",
	// 	COND : {
	// 	},
	// 	COMP : {
	// 		"1010" : {//建筑等级			
	// 				"3003" : 1,			
	// 		},
	// 	},
	// },

	"3" : {
		TITLE : "建造火堆",
		TIPS : "吃生食会造成内伤感染，建造一个简易的火堆来烹饪食物",
		COND : {
		"1004" : {
				"4020" : 4,
			},	
			"1003" : {
				"2" : 1, 	//某个关卡是否已解锁
 			},					
		},
		COMP : {
			"1010" : {//建筑等级			
					"3002" : 1,			
			},
		},
	},

	"5" : {
		TITLE : "制作斧头",
		TIPS : "斧头可以用来砍伐植物，也可以用来攻击野兽，制造一把石斧在荒野之中非常必要，点击营地中的工具台制造你的第一把石斧。",
		COND : {
			"1010" : {//建筑等级			
					"3002" : 1,			
			},			
		},
		COMP : {
			// 物品数量
			"1004" : {
				"4100" : 1,
			},
		},
	},
	"4" : {
		TITLE : "恢复精神",
		TIPS : "精神过低会带来一系列不良状态，睡觉是唯一的恢复精神值的途径",
		COND : {
			"1009" : {//角色状态			
					"7000" : {
							MIN:0,
							MAX:50,
					},
			},	
			"1004" : {
				"4100" : 1,
			},		
		},
		COMP : {
			"1009" : {//角色状态			
					"7000" : {
							MIN:70,
							MAX:100,
					},
			},
		},	
	},

	"2" : {
		TITLE : "制作火把",
		TIPS : "在一片陌生的荒野生活很容易迷路，制造并装备一个火把能极大程度降低迷路的概率。鱼油或者树脂都可以用来制造火把",
		COND : {
			"1004" : {
				"4028" : 1,
			},		
		},
		COMP : {
			"1004" : {
				"4114" : 1,
			},
		},	
	},



	"7" : {
		TITLE : "控制循环",
		TIPS : "有些地点在被探索完毕之后将成为可持续资源点，能够持续再生部分资源，剩余数量越多再生速度越快，但有其上限。不同资源之间有相互促进或者抑制的关系。可持续的资源点图标略有不同，瀑布就是这样的资源点，去查看一下。",
		COND : {
			"1003" : [			// 条件类型: 关卡解锁/完成
				{
					"8" : {
						UNLOCK : true,		// 关卡是否要求解锁
						COMPLETE : false ,// 关卡是否要求完成
					},
				},			
			],			
		},
		COMP : {
			"1003" : [			// 条件类型: 关卡解锁/完成
				{
					"8" : {
						UNLOCK : true,		// 关卡是否要求解锁
						COMPLETE : true ,// 关卡是否要求完成
					},
				},			
			],
		},
	},

	"6" : {
		TITLE : "烤肉充饥",
		TIPS : "饥饿会影响睡眠的恢复效果，过于饥饿会造成内伤。尽量不要吃生食，把在乱石林收集到的生肉在火堆上烤熟食用可回复饥饿度。务必要时刻关注饥饿度，不要过于饥饿。",
		COND : {
			"1009" : {//角色状态			
					"7006" : {
							MIN:0,
							MAX:40,
					},
			},			
		},
		COMP : {
			"1009" : {//角色状态			
					"7006" : {
							MIN:60,
							MAX:100,
					},
			},
		},	
	},

	"8" : {
		TITLE : "建造药盒",
		TIPS : "在荒野中，不可避免遭遇内外伤或者失眠，建造一个药盒能够制作简单的药物来缓解伤痛，也可以通过泡茶来缓解失眠。在营地找到药盒的位置开始建造。",
		COND : {
			// 物品数量
			"1003" : [			// 条件类型: 关卡解锁/完成
				{
					"8" : {
						UNLOCK : true,		// 关卡是否要求解锁
						COMPLETE : true ,// 关卡是否要求完成
					},
				},			
			],			
			"1004" : {
				"4003" : 1,
			},			
		},
		COMP : {
			"1010" : {//建筑等级			
				"3004" : 1,			
			},
		},
	},

	"9" : {
		TITLE : "治疗外伤",
		TIPS : "战斗、意外事故会引发外伤，外伤会引发内伤导致损血，你的外伤已经很严重了，快使用药物治疗外伤。绷带和药酒可显著治疗外伤，制造绷带需要的药草和藤条可以在灌木丛和瀑布等地方收集到。",
		COND : {
			"1009" : {//角色状态			
					"7004" : {
							MIN:0,
							MAX:70,
					},
					"7005" : {
							MIN:70,
							MAX:100,
					},					
			},				
		},
		COMP : {
			"1009" : {//角色状态			
					"7004" : {
							MIN:95,
							MAX:100,
					},				
			},
		},
	},

	"12" : {
		TITLE : "恢复生命",
		TIPS : "生命值一旦降低到0就会死亡，可通过睡眠恢复生命，但睡眠前请注意其他例如饥饿外伤内伤失眠值等状态，以保证睡眠能正常恢复生命值。试着恢复一下生命。",
		COND : {
			"1009" : {//角色状态			
					"7003" : {
							MIN:0,
							MAX:250,
					},				
			},			
		},
		COMP : {
			"1009" : {//角色状态			
					"7003" : {
							MIN:320,
							MAX:450,
					},				
			},
		},
	},


	"11" : {
		TITLE : "解除失眠",
		TIPS : "失眠值过高会显著影响睡眠的恢复效果，尽量保持规律作息，当失眠值过高时注意服用薄荷茶或者蜂蜜。薄荷茶可以在药盒制造，所需的材料灌木丛可以收集到。",
		COND : {
			"1009" : {//角色状态			
					"7001" : {
							MIN:70,
							MAX:100,
					},				
			},			
		},
		COMP : {
			"1009" : {//角色状态			
					"7001" : {
							MIN:0,
							MAX:30,
					},				
			},
		},
	},


	"10" : {
		TITLE : "治疗内伤",
		TIPS : "吃生食、低温、长期外伤都会引发内伤，内伤过重会导致生命迅速流逝，你的内伤已经很严重了，赶紧治疗内伤。服用汤药或者直接食用药草都可治疗内伤，但汤药效果更好。制造汤药所需的水和草药可以在灌木丛中找到。",
		COND : {
			"1009" : {//角色状态			
					"7005" : {
							MIN:0,
							MAX:70,
					},
					"7004" : {
							MIN:70,
							MAX:100,
					},					
			},				
		},
		COMP : {
			"1009" : {//角色状态			
					"7005" : {
							MIN:95,
							MAX:100,
					},				
			},
		},
	},

	"13" : {
		TITLE : "逃出生天",
		TIPS : "了解了荒野生存的基本知识，在保证能生存的前提下，尽情探索并逃出荒野。",
		COND : {
		"1002" : 10,
		},
		COMP : {
			"1009" : {//角色状态			
					"7003" : {
							MIN:500,
							MAX:1000,
					},				
			},
		},
	},


};