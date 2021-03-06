// 
exports.getById = function(rid){
   return HY_ROLES[rid.toString()];
};

var HY_ROLES = {
	// 美食家
	"1000" : {
		SHOP : 0,
		BUILD : 3102,
		BASE : {
			7000	:	60	,	//	精神力
			7044	:	100	,	//	最大精神力	
			7001	:	0	,	//	失眠值
			7045	:	100	,	//	最大失眠值
			7002	:	350	,	//	最大生命
			7003	:	350	,	//	生命
			7004	:	100	,	//	外伤值
			7046	:	100	,	//	最大外伤值
			7005	:	100	,	//	内伤值
			7047	:	100	,	//	最大内伤值
			7006	:	100	,	//	饥饿度
			7048	:	100	,	//	最大饥饿度
			7007	:	1	,	//	基础移动速度
			7008	:	0	,	//	负重
			7012	:	0	,	//	防御力
			7013	:	15	,	//	空手攻击力
			7014	:	1	,	//	战斗中移动速度
			7016	:	90	,	//	近战命中率90%
			7017	:	90	,	//	远程命中率90%
			7018	:	20	,	//	闪避率20%
			7019	:	1	,	//	攻击速度
			7020	:	0	,	//	战利品获取修正值
			7021	:	1	,	//	采集值
			7022	:	1	,	//	挖掘值
			7023	:	1	,	//	砍伐值
			7024	:	1	,	//	抓捕值
			7025	:	10	,	//	免疫力
			7026	:	10	,	//	协调能力
			7027	:	0	,	//	与XX好感度
			7032	:	20	,	//	密道发现概率20%
			7040	:	40	,	//	最大负重
			7041	:	0	,	//	是否拥有船
			7042	:	0	,	//	是否拥有骆驼
			7051	:	0	,	//	是否为社交达人	
			7052	:	36	,	//	体温
			7053	:	12	,	//	御寒参数	
			7054	:	0	,	//	是否制作了鞋
			7055	:	0	,	//	是否制作了包	
			7059 	: 	0	,	//  总行程
			7063	:   5   ,   //  角色影响食物暴击

			7100	:	0	,	//	反伤概率
			7101	:	0	,	//	反伤伤害值
			7102	:	0	,	//	恐吓概率
			7103	:	0	,	//	中毒概率
			7104	:	0	,	//	晕眩概率
			7105	:	0	,	//	冰冻概率
			7106	:	0	,	//	吸血概率
			7107	:	0	,	//	吸血值
			7108	:	0	,	//	反伤抵抗概率
			7109	:	0	,	//	反伤抵抗伤害值
			7110	:	0	,	//	命中要害抵抗概率
			7111	:	0	,	//	命中要害抵抗伤害
			7112	:	0	,	//	抵抗恐吓概率
			7113	:	0	,	//	抵抗中毒概率
			7114	:	0	,	//	抵抗晕眩概率
			7115	:	0	,	//	抵抗冰冻概率
			7116	:	0	,	//	抵抗吸血概率
			7117	:	0	,	//	抵抗吸血值
		},
	},
	// 冶金师
	"1001" : {
		SHOP : 2,
		BUILD : 3100,
		BASE : {
			7000	:	60	,	//	精神力
			7044	:	100	,	//	最大精神力	
			7001	:	0	,	//	失眠值
			7045	:	100	,	//	最大失眠值
			7002	:	350	,	//	最大生命
			7003	:	350	,	//	生命
			7004	:	100	,	//	外伤值
			7046	:	100	,	//	最大外伤值
			7005	:	100	,	//	内伤值
			7047	:	100	,	//	最大内伤值
			7006	:	100	,	//	饥饿度
			7048	:	100	,	//	最大饥饿度
			7007	:	1	,	//	基础移动速度
			7008	:	0	,	//	负重
			7012	:	0	,	//	防御力
			7013	:	15	,	//	空手攻击力
			7014	:	1	,	//	战斗中移动速度
			7016	:	90	,	//	近战命中率90%
			7017	:	90	,	//	远程命中率90%
			7018	:	20	,	//	闪避率20%
			7019	:	1	,	//	攻击速度
			7020	:	0	,	//	战利品获取修正值
			7021	:	1	,	//	采集值
			7022	:	1	,	//	挖掘值
			7023	:	1	,	//	砍伐值
			7024	:	1	,	//	抓捕值
			7025	:	10	,	//	免疫力
			7026	:	10	,	//	协调能力
			7027	:	0	,	//	与XX好感度
			7032	:	20	,	//	密道发现概率20%
			7040	:	40	,	//	最大负重
			7041	:	0	,	//	是否拥有船
			7042	:	0	,	//	是否拥有骆驼
			7051	:	0	,	//	是否为社交达人	
			7052	:	36	,	//	体温
			7053	:	12	,	//	御寒参数	
			7054	:	0	,	//	是否制作了鞋
			7055	:	0	,	//	是否制作了包	
			7059 	: 	0	,	//  总行程
			7064	:   5   ,   //  角色影响工具暴击

			7100	:	0	,	//	反伤概率
			7101	:	0	,	//	反伤伤害值
			7102	:	0	,	//	恐吓概率
			7103	:	0	,	//	中毒概率
			7104	:	0	,	//	晕眩概率
			7105	:	0	,	//	冰冻概率
			7106	:	0	,	//	吸血概率
			7107	:	0	,	//	吸血值
			7108	:	0	,	//	反伤抵抗概率
			7109	:	0	,	//	反伤抵抗伤害值
			7110	:	0	,	//	命中要害抵抗概率
			7111	:	0	,	//	命中要害抵抗伤害
			7112	:	0	,	//	抵抗恐吓概率
			7113	:	0	,	//	抵抗中毒概率
			7114	:	0	,	//	抵抗晕眩概率
			7115	:	0	,	//	抵抗冰冻概率
			7116	:	0	,	//	抵抗吸血概率
			7117	:	0	,	//	抵抗吸血值
		},
	},
	// 探险家
	"1002" : {
		SHOP : 1,
		BUILD : 3101,
		BASE : {
			7000	:	60	,	//	精神力
			7044	:	100	,	//	最大精神力	
			7001	:	0	,	//	失眠值
			7045	:	100	,	//	最大失眠值
			7002	:	350	,	//	最大生命
			7003	:	350	,	//	生命
			7004	:	100	,	//	外伤值
			7046	:	100	,	//	最大外伤值
			7005	:	100	,	//	内伤值
			7047	:	100	,	//	最大内伤值
			7006	:	100	,	//	饥饿度
			7048	:	100	,	//	最大饥饿度
			7007	:	1	,	//	基础移动速度
			7008	:	0	,	//	负重
			7012	:	0	,	//	防御力
			7013	:	15	,	//	空手攻击力
			7014	:	1	,	//	战斗中移动速度
			7016	:	90	,	//	近战命中率90%
			7017	:	90	,	//	远程命中率90%
			7018	:	20	,	//	闪避率20%
			7019	:	1	,	//	攻击速度
			7020	:	0	,	//	战利品获取修正值
			7021	:	1	,	//	采集值
			7022	:	1	,	//	挖掘值
			7023	:	1	,	//	砍伐值
			7024	:	1	,	//	抓捕值
			7025	:	10	,	//	免疫力
			7026	:	10	,	//	协调能力
			7027	:	0	,	//	与XX好感度
			7032	:	20	,	//	密道发现概率20%
			7040	:	40	,	//	最大负重
			7041	:	0	,	//	是否拥有船
			7042	:	0	,	//	是否拥有骆驼
			7051	:	0	,	//	是否为社交达人	
			7052	:	36	,	//	体温
			7053	:	12	,	//	御寒参数	
			7054	:	0	,	//	是否制作了鞋
			7055	:	0	,	//	是否制作了包	
			7059 	: 	0	,	//  总行程

			7100	:	0	,	//	反伤概率
			7101	:	0	,	//	反伤伤害值
			7102	:	0	,	//	恐吓概率
			7103	:	0	,	//	中毒概率
			7104	:	0	,	//	晕眩概率
			7105	:	0	,	//	冰冻概率
			7106	:	0	,	//	吸血概率
			7107	:	0	,	//	吸血值
			7108	:	0	,	//	反伤抵抗概率
			7109	:	0	,	//	反伤抵抗伤害值
			7110	:	0	,	//	命中要害抵抗概率
			7111	:	0	,	//	命中要害抵抗伤害
			7112	:	0	,	//	抵抗恐吓概率
			7113	:	0	,	//	抵抗中毒概率
			7114	:	0	,	//	抵抗晕眩概率
			7115	:	0	,	//	抵抗冰冻概率
			7116	:	0	,	//	抵抗吸血概率
			7117	:	0	,	//	抵抗吸血值
		},
	},
	// 野食小哥
	"1003" : {
		SHOP : 3,
		BUILD : 3105,
		BASE : {
			7000	:	60	,	//	精神力
			7044	:	100	,	//	最大精神力	
			7001	:	0	,	//	失眠值
			7045	:	100	,	//	最大失眠值
			7002	:	350	,	//	最大生命
			7003	:	350	,	//	生命
			7004	:	100	,	//	外伤值
			7046	:	100	,	//	最大外伤值
			7005	:	100	,	//	内伤值
			7047	:	100	,	//	最大内伤值
			7006	:	100	,	//	饥饿度
			7048	:	100	,	//	最大饥饿度
			7007	:	1	,	//	基础移动速度
			7008	:	0	,	//	负重
			7012	:	0	,	//	防御力
			7013	:	15	,	//	空手攻击力
			7014	:	1	,	//	战斗中移动速度
			7016	:	90	,	//	近战命中率90%
			7017	:	90	,	//	远程命中率90%
			7018	:	20	,	//	闪避率20%
			7019	:	1	,	//	攻击速度
			7020	:	0	,	//	战利品获取修正值
			7021	:	1	,	//	采集值
			7022	:	1	,	//	挖掘值
			7023	:	1	,	//	砍伐值
			7024	:	1	,	//	抓捕值
			7025	:	10	,	//	免疫力
			7026	:	10	,	//	协调能力
			7027	:	0	,	//	与XX好感度
			7032	:	20	,	//	密道发现概率20%
			7040	:	40	,	//	最大负重
			7041	:	0	,	//	是否拥有船
			7042	:	0	,	//	是否拥有骆驼
			7051	:	0	,	//	是否为社交达人	
			7052	:	36	,	//	体温
			7053	:	12	,	//	御寒参数	
			7054	:	0	,	//	是否制作了鞋
			7055	:	0	,	//	是否制作了包	
			7059 	: 	0	,	//  总行程

			7100	:	0	,	//	反伤概率
			7101	:	0	,	//	反伤伤害值
			7102	:	0	,	//	恐吓概率
			7103	:	0	,	//	中毒概率
			7104	:	0	,	//	晕眩概率
			7105	:	0	,	//	冰冻概率
			7106	:	0	,	//	吸血概率
			7107	:	0	,	//	吸血值
			7108	:	0	,	//	反伤抵抗概率
			7109	:	0	,	//	反伤抵抗伤害值
			7110	:	0	,	//	命中要害抵抗概率
			7111	:	0	,	//	命中要害抵抗伤害
			7112	:	0	,	//	抵抗恐吓概率
			7113	:	0	,	//	抵抗中毒概率
			7114	:	0	,	//	抵抗晕眩概率
			7115	:	0	,	//	抵抗冰冻概率
			7116	:	0	,	//	抵抗吸血概率
			7117	:	0	,	//	抵抗吸血值
		},
	},
};