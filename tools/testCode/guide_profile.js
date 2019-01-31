// 
exports.getById = function(bid){
  return HY_GUIDE[bid.toString()];
};

//SUDDEN中编号0表示不触发，仅用来占据权重

var HY_GUIDE = {

  "_0":{//外伤
    TEXT : "背包：点击头像可打开背包，在背包中可进行装备更换、使用和物品丢弃等操作。" , 
    NEXT : "0",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:-349,
    Y:466,
    W:128,
    H:160,
    CANTOUCH : false,
  },
  "0":{//外伤
    TEXT : "外伤值：损失外伤不仅会导致感染，更会影响战斗能力。可通过使用绷带或者药酒治疗。请保持外伤长期在接近满的状态。" , 
    NEXT : "1",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:-198,
    Y:480,
    W:54,
    H:50,
    CANTOUCH : false,
  },
  "1":{//内伤
    TEXT : "内伤值：包括肠道、呼吸和外伤感染，感染会使生命值迅速流失。可通过使用汤药等治疗。请保持内伤长期在接近满的状态。" , 
    NEXT : "2",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:-116,
    Y:480,
    W:54,
    H:50,
    CANTOUCH : false,
  },
  "2":{//饥饿度
    TEXT : "饥饿度：长期处于空腹状态会造成多种负面影响，务必摄入足够的食物。" , 
    NEXT : "3",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:-36,
    Y:480,
    W:54,
    H:50,
    CANTOUCH : false,
  },
  "3":{//精神
    TEXT : "精神值：影响工作和战斗效率，可通过睡眠恢复。" , 
    NEXT : "4",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:44,
    Y:480,
    W:54,
    H:50,
    CANTOUCH : false,
  },
  "4":{//失眠值
    TEXT : "失眠值：心情不佳会引发失眠，降低回复效果。可通过饮用蜂蜜或者薄荷茶提高。" , 
    NEXT : "5",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:124,
    Y:480,
    W:54,
    H:50,
    CANTOUCH : false,//选中部分可否点击
  },
  "5":{//生命值
    TEXT : "生命值：生命值为0时死亡，远离外伤和感染，保证食物和睡眠的充足，注意调节心情。" , 
    // NEXT : "6",
    END : '5',//点击跳过下一个出现的引导
    ISEND : false,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:204,
    Y:480,
    W:54,
    H:50,
    CANTOUCH : false,
  },
  "39":{//石斧装备0
    TEXT : "点击仓库中的武器，武器就会被移动到背包中。" , 
    END : '41',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "40",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:80,
    Y:-220,
    W:100,
    H:70,
    CANTOUCH : true,
  },
  "40":{//石斧装备1
    TEXT : "点击装备栏中的近战武器栏位" , 
    END : '41',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "41",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:-170,
    Y:250,
    W:90,
    H:70,
    CANTOUCH : true,
  },
  "41":{//石斧装备2
    TEXT : "选择你的武器进行装备" , 
    END : '41',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "39_0",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:200,//文本内容高度
    X:-310,
    Y:20,
    W:616,
    H:100,
    CANTOUCH : true,
  },
  "39_0":{//石斧装备0
    TEXT : "点击仓库中的火把，火把就会被移动到背包中。装备火把能极大程度降低在荒野中迷路的概率。" , 
    END : '41_0',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "40_0",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:30,//文本内容高度
    X:80,
    Y:-220,
    W:100,
    H:70,
    CANTOUCH : true,
  },
  "40_0":{//火把装备
    TEXT : "点击装备栏中的火把栏位" , 
    END : '41_0',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "41_0",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:-15,//文本内容高度
    X:74,
    Y:250,
    W:90,
    H:70,
    CANTOUCH : true,
  },
  "41_0":{//火把装备
    TEXT : "选择你的火把进行装备" , 
    END : '41_0',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:200,//文本内容高度
    X:-310,
    Y:20,
    W:616,
    H:100,
    CANTOUCH : true,
  },
  "43":{//脱险0
    TEXT : "你想到了一个逃离荒野的方法，来确认下需要做哪些准备。" , 
    END : '45',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "44",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:100,//文本内容高度
    X:-346,
    Y:-615,
    W:70,
    H:80,
    CANTOUCH : true,
  },
  "44":{//脱险1
    TEXT : "点击逃离按钮查看详情。" , 
    END : '45',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    NEXT : "45",
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:100,//文本内容高度
    X:-20,
    Y:-620,
    W:75,
    H:85,
    CANTOUCH : true,
  },
  "45":{//脱险2
    TEXT : "收集材料，尝试逃离荒野。" , 
    END : '45',//点击跳过下一个出现的引导
    POS : {'x':239,'y':500},
    ISEND : true,//为false出现下一页和跳过按钮
    TOP:400,//文本内容高度
    X:-340,
    Y:-580,
    W:680,
    H:1000,
    CANTOUCH : true,
  },
};