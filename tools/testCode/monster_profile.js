// 
exports.getById = function(pid){
   return dy.utils.clone(HY_MONSTERS[pid]);
};
// 物种
// 通用 0
// 狼	1
// 野猪	2
// 食人鱼	3
// 熊	4
// 鳄鱼	5
// 蛇	6
// 虎	7
// 人类	8
// 鲨鱼	9
// 羊	10
// 蜥蜴	11
// 资源	12
// 猿 13
// 虫 14
// 非生物 15
// 飞行 16
var HY_MONSTERS = {
	"1001" : {
		ID : "1001",
		NAME : "幼狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 20,
		ATK : 3,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，幼狼挣扎了几下，还是倒下了", "，幼狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "幼狼，但也不容小觑",
		AUDIO : "monster_wolf",
	},

	"1002" : {
		ID : "1002",
		NAME : "瘦弱的狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 35,
		ATK : 9,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，瘦弱的狼挣扎了几下，还是倒下了", "，瘦弱的狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "发育不良的狼，但也比较凶狠",
		AUDIO : "monster_wolf",
	},

	"1003" : {
		ID : "1003",
		NAME : "饥饿的狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 50,
		ATK : 16,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，饥饿的狼挣扎了几下，还是倒下了", "，饥饿的狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "饥饿的狼，非常凶狠",
		AUDIO : "monster_wolf",
	},

	"1004" : {
		ID : "1004",
		NAME : "成年狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 65,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，成年狼挣扎了几下，还是倒下了", "，成年狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "健壮的成年狼，战斗力不俗",
		AUDIO : "monster_wolf",
	},

	"1005" : {
		ID : "1005",
		NAME : "凶恶的狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 85,
		ATK : 23,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 95,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，凶恶的狼挣扎了几下，还是倒下了", "，凶恶的狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "凶恶的狼，一定要小心对付",
		AUDIO : "monster_wolf",
	},

	"1006" : {
		ID : "1006",
		NAME : "雪狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 95,
		ATK : 25,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，雪狼挣扎了几下，还是倒下了", "，雪狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "只在雪原才能看到的狼",
		AUDIO : "monster_wolf",
	},

	"1007" : {
		ID : "1007",
		NAME : "健壮的狼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 1,
		LIFE : 220,
		ATK : 23,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 10,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，健壮的狼挣扎了几下，还是倒下了", "，健壮的狼痛苦的哀嚎了一声，一动不动了"],
		DESC : "狼族首领，单兵战斗力也很强",
		AUDIO : "monster_wolf",
	},

	"1008" : {
		ID : "1008",
		NAME : "小野猪",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 2,
		LIFE : 30,
		ATK : 3,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["哼哼着向你冲来", "向你冲锋过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，小野猪挣扎了几下，还是倒下了", "，小野猪痛苦的哀嚎了一声，一动不动了"],
		DESC : "小野猪，但凶起来也很厉害",
		AUDIO : "monster_boar",
	},

	"1009" : {
		ID : "1009",
		NAME : "健壮的野猪",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 2,
		LIFE : 65,
		ATK : 7,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["哼哼着向你冲来", "向你冲锋过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，健壮的野猪挣扎了几下，还是倒下了", "，健壮的野猪痛苦的哀嚎了一声，一动不动了"],
		DESC : "成年的健壮野猪，杀伤力很强",
		AUDIO : "monster_boar",
	},

	"1010" : {
		ID : "1010",
		NAME : "暴怒的野猪",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 2,
		LIFE : 80,
		ATK : 13,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["哼哼着向你冲来", "向你冲锋过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，暴怒的野猪挣扎了几下，还是倒下了", "，暴怒的野猪痛苦的哀嚎了一声，一动不动了"],
		DESC : "发起怒的野猪，老虎都怕",
		AUDIO : "monster_boar",
	},

	"1011" : {
		ID : "1011",
		NAME : "野猪王",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 2,
		LIFE : 240,
		ATK : 17,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["哼哼着向你冲来", "向你冲锋过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，野猪王挣扎了几下，还是倒下了", "，野猪王痛苦的哀嚎了一声，一动不动了"],
		DESC : "成年的健壮野猪，杀伤力很强",
		AUDIO : "monster_boar",
	},

	"1012" : {
		ID : "1012",
		NAME : "食人鱼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 30,
		ATK : 17,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，食人鱼挣扎了几下，一动不动了"],
		DESC : "凶猛的食人鱼，虽然很脆弱，但牙口很厉害",
		AUDIO : "monster_water",
	},

	"1013" : {
		ID : "1013",
		NAME : "吸血鬼鱼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 40,
		ATK : 23,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1014" : {
		ID : "1014",
		NAME : "灰熊",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 4,
		LIFE : 75,
		ATK : 16,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 80,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["嗷嗷地向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，灰熊挣扎了几下，还是倒下了", "，灰熊痛苦的哀嚎了一声，一动不动了"],
		DESC : "出没于林间和丘陵的灰熊",
		AUDIO : "monster_bear",
	},

	"1015" : {
		ID : "1015",
		NAME : "暴躁的灰熊",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 4,
		LIFE : 90,
		ATK : 18,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 80,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["嗷嗷地向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，暴躁的灰熊挣扎了几下，还是倒下了", "，暴躁的灰熊痛苦的哀嚎了一声，一动不动了"],
		DESC : "出没于林间和丘陵的灰熊",
		AUDIO : "monster_bear",
	},

	"1016" : {
		ID : "1016",
		NAME : "白熊",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 4,
		LIFE : 130,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 80,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["嗷嗷地向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，白熊挣扎了几下，还是倒下了", "，白熊痛苦的哀嚎了一声，一动不动了"],
		DESC : "雪原上独有的白熊",
		AUDIO : "monster_bear",
	},

	"1017" : {
		ID : "1017",
		NAME : "熊王",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 4,
		LIFE : 310,
		ATK : 22,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["嗷嗷地向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，熊王挣扎了几下，还是倒下了", "，熊王痛苦的哀嚎了一声，一动不动了"],
		DESC : "巨大的熊王，挑战前一定要小心",
		AUDIO : "monster_bear",
	},

	"1018" : {
		ID : "1018",
		NAME : "鳄鱼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 5,
		LIFE : 120,
		ATK : 18,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你冲来"],
		BITE_DESC : ["挥动尾巴", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，鳄鱼挣扎了几下，还是倒下了"],
		DESC : "拥有惊人咬合力的鳄鱼",
		AUDIO : "monster_water",
	},

	"1019" : {
		ID : "1019",
		NAME : "湾鳄",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 5,
		LIFE : 140,
		ATK : 21,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你冲来"],
		BITE_DESC : ["挥动尾巴", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，湾鳄挣扎了几下，还是倒下了"],
		DESC : "一种常见于沼泽和河湾的鳄鱼",
		AUDIO : "monster_water",
	},

	"1020" : {
		ID : "1020",
		NAME : "铁嘴黑鳄鱼",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 5,
		LIFE : 160,
		ATK : 23,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来", "向你冲来"],
		BITE_DESC : ["挥动尾巴", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，铁嘴黑鳄鱼挣扎了几下，还是倒下了"],
		DESC : "凶猛的铁嘴鳄鱼",
		AUDIO : "monster_water",
	},

	"1021" : {
		ID : "1021",
		NAME : "水蟒",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 6,
		LIFE : 40,
		ATK : 10,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["吐着信子向你扑来", "悄悄向你游来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，水蟒挣扎了几下，还是倒下了"],
		DESC : "隐藏在水里的蟒蛇",
		AUDIO : "monster_snake",
	},

	"1022" : {
		ID : "1022",
		NAME : "沙蛇",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 6,
		LIFE : 65,
		ATK : 17,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["吐着信子向你扑来", "悄悄向你游来"],
		BITE_DESC : [ "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，沙蛇挣扎了几下，还是倒下了"],
		DESC : "只在荒漠中出现的一种蛇",
		AUDIO : "monster_snake",
	},

	"1023" : {
		ID : "1023",
		NAME : "森蚺",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 6,
		LIFE : 130,
		ATK : 16,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["吐着信子向你扑来", "悄悄向你游来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，森蚺挣扎了几下，还是倒下了"],
		DESC : "体型很大的一种蟒蛇",
		AUDIO : "monster_snake",
	},

	"1024" : {
		ID : "1024",
		NAME : "眼镜王蛇",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 6,
		LIFE : 160,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 30,		//闪避率20%

		MOVE_SPD : 2,

		MOVE_DESC : ["吐着信子向你扑来", "悄悄向你游来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，眼镜王蛇挣扎了几下，还是倒下了"],
		DESC : "毒性强烈的眼镜蛇，千万小心",
		AUDIO : "monster_snake",
	},

	"1025" : {
		ID : "1025",
		NAME : "猛虎",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 7,
		LIFE : 160,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 85,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["呼啸着向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，猛虎挣扎了几下，还是倒下了", "，猛虎痛苦的哀嚎了一声，一动不动了"],
		DESC : "拥有万兽之王之称的猛虎",
		AUDIO : "monster_tiger",
	},

	"1026" : {
		ID : "1026",
		NAME : "斑纹虎",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 7,
		LIFE : 180,
		ATK : 22,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 85,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["呼啸着向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，斑纹虎挣扎了几下，还是倒下了", "，斑纹虎痛苦的哀嚎了一声，一动不动了"],
		DESC : "体型比一般老虎大一些的斑纹虎",
		AUDIO : "monster_tiger",
	},

	"1027" : {
		ID : "1027",
		NAME : "虎王",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 7,
		LIFE : 300,
		ATK : 27,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 85,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["呼啸着向你扑来", "向你冲了过来"],
		BITE_DESC : ["挥爪", "咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，虎王挣扎了几下，还是倒下了", "，虎王痛苦的哀嚎了一声，一动不动了"],
		DESC : "虎中之王，非常危险",
		AUDIO : "monster_tiger",
	},

	"1028" : {
		ID : "1028",
		NAME : "食人族战士",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 8,
		LIFE : 140,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["快步向你跑来", "拿着石斧向你跑来"],
		BITE_DESC : ["挥动武器"],
		MISS_DESC : ["一个闪身躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，食人族战士挣扎了几下，还是倒下了"],
		DESC : "原始食人部族的战士",
		AUDIO : "monster_human",
	},

	"1029" : {
		ID : "1029",
		NAME : "食人族队长",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 8,
		LIFE : 180,
		ATK : 22,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["快步向你跑来", "举着长枪向你冲来"],
		BITE_DESC : ["挥动武器"],
		MISS_DESC : ["一个闪身躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，食人族队长挣扎了几下，还是倒下了"],
		DESC : "食人族战斗小队的队长，比一般战士强大",
		AUDIO : "monster_human",
	},

	"1030" : {
		ID : "1030",
		NAME : "食人族首领",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 8,
		LIFE : 240,
		ATK : 26,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["快步向你跑来", "拿着巨斧向你冲来"],
		BITE_DESC : ["挥动武器"],
		MISS_DESC : ["一个闪身躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，食人族首领挣扎了几下，还是倒下了"],
		DESC : "食人部族的首领，虽然武器原始，但战斗技巧高超",
		AUDIO : "monster_human",
	},

	"1031" : {
		ID : "1031",
		NAME : "剑吻鲨",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 9,
		LIFE : 60,
		ATK : 11,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 95,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，剑吻鲨挣扎了几下，一动不动了"],
		DESC : "徘徊于海里的鲨鱼，对血腥味非常敏感",
		AUDIO : "monster_water",
	},

	"1032" : {
		ID : "1032",
		NAME : "大白鲨",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 9,
		LIFE : 115,
		ATK : 15,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 100,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，大白鲨挣扎了几下，还是倒下了"],
		DESC : "凶猛的大鲨鱼，对进入海中的人类毫不留情",
		AUDIO : "monster_water",
	},

	"1033" : {
		ID : "1033",
		NAME : "绵羊",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 10,
		LIFE : 40,
		ATK : 6,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 80,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你冲来"],
		BITE_DESC : ["顶了你一下"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，绵羊挣扎了几下，还是倒下了", "，绵羊痛苦的哀嚎了一声，一动不动了"],
		DESC : "雪原上的绵羊，羊毛用来保暖是极好的",
		AUDIO : "monster_sheep",
	},

	"1035" : {
		ID : "1035",
		NAME : "蜥蜴",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 11,
		LIFE : 120,
		ATK : 24,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来"],
		BITE_DESC : ["挥爪"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，蜥蜴挣扎了几下，还是倒下了", "，蜥蜴痛苦的哀嚎了一声，一动不动了"],
		DESC : "在漆黑溶洞中觅食的蜥蜴",
		AUDIO : "monster_snake",
	},

	"1036" : {
		ID : "1036",
		NAME : "火蜥蜴",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 11,
		LIFE : 180,
		ATK : 27,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，火蜥蜴挣扎了几下，还是倒下了", "，火蜥蜴痛苦的哀嚎了一声，一动不动了"],
		DESC : "身上有红色斑纹的蜥蜴",
		AUDIO : "monster_snake",
	},

	"1038" : {
		ID : "1038",
		NAME : "海盗喽啰",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 8,
		LIFE : 180,
		ATK : 23,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["快步向你跑来", "举着长刀向你冲来"],
		BITE_DESC : ["挥动武器"],
		MISS_DESC : ["一个闪身躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，海盗喽啰挣扎了几下，还是倒下了"],
		DESC : "食人族战斗小队的队长，比一般战士强大",
		AUDIO : "monster_human",
	},

	"1039" : {
		ID : "1039",
		NAME : "海盗首领",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 8,
		LIFE : 240,
		ATK : 26,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["快步向你跑来", "拿着长刀向你冲来"],
		BITE_DESC : ["挥动武器"],
		MISS_DESC : ["一个闪身躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，海盗首领挣扎了几下，还是倒下了"],
		DESC : "食人部族的首领，虽然武器原始，但战斗技巧高超",
		AUDIO : "monster_human",
	},

	"1040" : {
		ID : "1040",
		NAME : "真BOSS",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 350,
		ATK : 30,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1041" : {
		ID : "1041",
		NAME : "伪BOSS",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 300,
		ATK : 27,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 5,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1042" : {
		ID : "1042",
		NAME : "未知怪物",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 140,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1043" : {
		ID : "1043",
		NAME : "石像",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 150,
		ATK : 25,
		DEF : 10,
		ATK_SPD : 2,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1044" : {
		ID : "1044",
		NAME : "哲罗蛙",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 80,
		ATK : 20,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1045" : {
		ID : "1045",
		NAME : "环尾狐猴",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 120,
		ATK : 18,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1046" : {
		ID : "1046",
		NAME : "蜘蛛",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 60,
		ATK : 6,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1047" : {
		ID : "1047",
		NAME : "蝙蝠",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 30,
		ATK : 18,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},

	"1048" : {
		ID : "1048",
		NAME : "洞魈",
		TYPE : "1",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 3,
		LIFE : 120,
		ATK : 15,
		DEF : 0,
		ATK_SPD : 1,
		ATK_DIS : 1,

		HIT  : 90,		//命中率100%
		DODGE: 0,		//闪避率20%

		MOVE_SPD : 1,

		MOVE_DESC : ["飞速向你游过来", "跃出水面向你扑来"],
		BITE_DESC : ["咬了一口"],
		MISS_DESC : ["借助水流，闪到一边"],
		DEATH_DESC : ["，吸血鬼鱼挣扎了几下，一动不动了"],
		DESC : "比食人鱼还要凶猛几分",
		AUDIO : "monster_water",
	},





	"1101" : {
		ID : "1101",
		NAME : "椰子树",
		TYPE : "2",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，咔嚓一声，椰子树倒下了"],
		DESC : "",
	},

	"1102" : {
		ID : "1102",
		NAME : "藤蔓",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，哗啦一声，藤蔓被你扯了下来"],
		DESC : "",
	},

	"1103" : {
		ID : "1103",
		NAME : "薄荷",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，哗啦一声，薄荷被你扯了下来"],
		DESC : "",
	},

	"1104" : {
		ID : "1104",
		NAME : "竹子",
		TYPE : "2",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，咔嚓一声，竹子被你砍倒了"],
		DESC : "",
	},

	"1105" : {
		ID : "1105",
		NAME : "草药丛",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，哗啦一声，草药被你扯了下来"],
		DESC : "",
	},

	"1106" : {
		ID : "1106",
		NAME : "蜂窝",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["蜂蜜被你从蜂窝里掏了出来"],
		DESC : "",
	},

	"1107" : {
		ID : "1107",
		NAME : "乔木",
		TYPE : "2",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 70,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，咔嚓一声，乔木倒下了"],
		DESC : "",
	},

	"1108" : {
		ID : "1108",
		NAME : "松木",
		TYPE : "2",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 70,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，咔嚓一声，松木倒下了"],
		DESC : "",
	},

	"1109" : {
		ID : "1109",
		NAME : "烧焦的树",
		TYPE : "2",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 40,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，咔嚓一声，烧焦的树倒下了"],
		DESC : "",
	},


	"1201" : {
		ID : "1201",
		NAME : "石片",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，一片锋利的石片被你从石头上敲了下来"],
		DESC : "",
	},

	"1202" : {
		ID : "1202",
		NAME : "硝石",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，硝石被你从泥土和沙石中分离了出来"],
		DESC : "",
	},

	"1216" : {
		ID : "1216",
		NAME : "石块",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，一块适合建造的石块被你找了出来"],
		DESC : "",
	},

	"1217" : {
		ID : "1217",
		NAME : "石片",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["，一块锋利的石片磨好了"],
		DESC : "",
	},

	"1221" : {
		ID : "1221",
		NAME : "赤色圆球",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 60,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["你找到一个神秘的圆球"],
		DESC : "",
	},

	"1222" : {
		ID : "1222",
		NAME : "橙色圆球",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 100,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["你找到一个神秘的圆球"],
		DESC : "",
	},
	"1223" : {
		ID : "1223",
		NAME : "黄色圆球",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 100,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["你找到一个神秘的圆球"],
		DESC : "",
	},
	"1225" : {
		ID : "1225",
		NAME : "青色圆球",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 100,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["你找到一个神秘的圆球"],
		DESC : "",
	},

	"1226" : {
		ID : "1226",
		NAME : "蓝色圆球",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 100,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["你找到一个神秘的圆球"],
		DESC : "",
	},

	"1227" : {
		ID : "1227",
		NAME : "紫色圆球",
		TYPE : "3",//1：普通怪物，2：无攻击怪物，3：石头类无战斗怪物
		SPECIES : 12,
		LIFE : 100,
		ATK : 100,
		DEF : 0,
		ATK_SPD : 2,
		ATK_DIS : 2,

		HIT  : 100,		//命中率100%
		DODGE: 20,		//闪避率20%

		MOVE_SPD : 1,

		// MOVE_DESC : ["向你扑来", "向你走来", "悄悄向你走来"],
		// BITE_DESC : ["挥爪", "咬了一口"],
		// MISS_DESC : ["狡猾的躲开了这次攻击", "灵巧的闪开了"],
		DEATH_DESC : ["你找到一个神秘的圆球"],
		DESC : "",
	},



};

//source stage
//金矿		1201
//硝石		1202
//硫磺堆	1203
//乱石块	1204
//裸露的铁矿1205
//黏土堆	1206
//人参		1207
//石片堆	1208
//水洼		1209
//土豆		1210
//箱子		1211
//硝石堆	1212
//油脂树	1213
//棕榈树	1214
//薄荷		1215
// 1001	幼狼
// 1002	瘦弱的狼
// 1003	饥饿的狼
// 1004	成年狼
// 1005	凶恶的狼
// 1006	雪狼
// 1007	野狼王
// 1008	小野猪
// 1009	健壮的野猪
// 1010	暴怒的野猪
// 1011	野猪王
// 1012	食人鱼
// 1013	吸血鬼鱼
// 1014	灰熊
// 1015	独居的灰熊
// 1016	白熊
// 1017	熊王
// 1018	鳄鱼
// 1019	湾鳄
// 1020	铁嘴黑鳄鱼
// 1021	水蟒
// 1022	沙蛇
// 1023	森蚺
// 1024	眼镜蛇
// 1025	猛虎
// 1026	斑纹虎
// 1027	虎王
// 1028	食人族战士
// 1029	食人族队长
// 1030	食人族首领
// 1031	剑吻鲨
// 1032	大白鲨
// 1033	绵羊
// 1035	蜥蜴
// 1036	火蜥蜴
// 1037	狼群
// 狼	1
// 野猪	2
// 食人鱼	3
// 熊	4
// 鳄鱼	5
// 蛇	6
// 虎	7
// 人类	8
// 鲨鱼	9
// 羊	10
// 蜥蜴	11
// 资源	12
