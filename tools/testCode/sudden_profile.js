// 
exports.getById = function(rid){
   return dy.utils.clone(HY_SUDDENS[rid.toString()]);
};

exports.TYPE_HURT = 1;                  //意外受伤
exports.TYPE_FIGHT = 2;                 //意外遇袭
exports.TYPE_SHIP = 3;                 //沉船离开遇袭
exports.TYPE_MAZE = 4;                 //迷宫

exports.RW_HURT = 24;                    //恶劣天气影响意外受伤概率
exports.RW_MONSTER = 0;                 //恶劣天气影响意外遇袭概率
exports.RW_MAZE = 5;                 //恶劣天气影响迷宫概率

exports.RD_HURT = 40;                    //黑暗影响意外受伤概率
exports.RD_MONSTER = 40;                 //黑暗影响意外遇袭概率
exports.RD_MAZE = 35;                 //黑暗影响迷宫概率

exports.RS_HURT = -20;                    //鞋子影响意外受伤概率
exports.RS_MONSTER = -10;                 //鞋子影响意外遇袭概率
exports.RS_MAZE = -10;                 //鞋子影响迷宫概率

exports.RC_HURT = -20;                    //拥有骆驼且在陆路影响意外受伤概率
exports.RC_MONSTER = -10;                 //拥有骆驼且在陆路影响意外遇袭概率
exports.RC_MAZE = -10;                 //恶拥有骆驼且在陆路影响迷宫概率

exports.RB_HURT = -20;                    //拥有船且在水路影响意外受伤概率
exports.RB_MONSTER = -80;                 //拥有船且在水路影响意外遇袭概率
exports.RB_MAZE = -80;                 //拥有船且在水路影响迷宫概率

exports.RP_HURT = 24;                    //宠物影响意外受伤概率
exports.RP_MONSTER = 0;                 //宠物影响意外遇袭概率
exports.RP_MAZE = -10;                 //宠物影响迷宫概率

// exports.RT_HURT = 24;                    //天赋影响意外受伤概率
// exports.RT_MONSTER = 0;                 //天赋影响意外遇袭概率
// exports.RT_MAZE = -20;                 //天赋影响迷宫概率  更改为在talent_profile配置


var HY_SUDDENS = {
    "100" : {                           
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "你不慎被树枝绊倒，损失5点生命值，加重5点外伤值" ,
        ATTR : {"7003" : -5, "7004" : -5},
    },
    "101" : {                           
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "穿过石林的时候你被石头划伤，损失10点生命值，加重5点外伤值" ,
        ATTR : {"7003" : -10, "7004" : -5},
    },
    "102" : {                           //
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "你被灌木上的尖刺扎伤，损失5点生命值，加重5点外伤值" ,
        ATTR : {"7003" : -5, "7004" : -5},
    },
    "105" : {                           //
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "你不慎踩到湿滑的石头，不慎跌倒，损失10点生命值，加重5点外伤值" ,
        ATTR : {"7003" : -10, "7004" : -5},
    },
    "106" : {                           //
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "你被断掉的竹子划伤，损失10点生命值，加重5点外伤值" ,
        ATTR : {"7003" : -10, "7004" : -5},
    },
    "108" : {                           //
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "地上有个深坑，你没留意栽了下去，损失15点生命值，加重15点外伤值" ,
        ATTR : {"7003" : -15, "7004" : -15},
    },
    "113" : {                           //
        TYPE : "1",                     //意外受伤
        TITLE : "意外受伤",
        DESC : "爬山的时候你脚下一滑，还好迅速稳住了自己，但依旧损失10点生命值，加重10点外伤值" ,
        ATTR : {"7003" : -10, "7004" : -10},
    },

    "0" : {
        TYPE : "2",                     //强度测试
        NAME : "测试", 
        PIC : "Texture/Monster/1001",
        MONSTER : [1035,1035,1035,1035],
        DANGER : "高",
        DESC : "强度测试",
        DROP_ID : 0,
    },

	"200" : {
        TYPE : "2",                     //意外遇袭
        NAME : "狼", 
        PIC : "Texture/Monster/1001",
        MONSTER : [1002],
        DANGER : "2",
        DESC : "你在路途中遭遇到了一头狼",
        DROP_ID : 2,
	},

    "202" : {
        TYPE : "2",                     //意外遇袭
        NAME : "野猪", 
        PIC : "Texture/Monster/1009",
        MONSTER : [1009],
        DANGER : "2",
        DESC : "你走到一半，发现了一头野猪正看着你",
        DROP_ID : 2,
    },

    "207" : {
        TYPE : "2",                     //意外遇袭
        NAME : "蛇", 
        PIC : "Texture/Monster/1021",
        MONSTER : [1021],
        DANGER : "2",
        DESC : "你听到了什么动静，仔细一看是一条蛇",
        DROP_ID : 2,
    },

    "208" : {
        TYPE : "2",                     //意外遇袭
        NAME : "熊", 
        PIC : "Texture/Monster/1016",
        MONSTER : [1014],
        DANGER : "3",
        DESC : "你走到一半，发现了一头熊正看着你",
        DROP_ID : 2,
    },


    "209" : {
        TYPE : "2",                     //意外遇袭
        NAME : "食人鱼", 
        PIC : "Texture/Monster/1012",
        MONSTER : [1012],
        DANGER : "3",
        DESC : "你觉得有什么东西跟着你，回头一看是一条食人鱼",
        DROP_ID : 2,
    },

    "210" : {
        TYPE : "2",                     //意外遇袭
        NAME : "猛虎", 
        PIC : "Texture/Monster/1025",
        MONSTER : [1025],
        DANGER : "4",
        DESC : "你在野外听到了一声嘶吼，随声而来一头猛虎",
        DROP_ID : 2,
    },

    "214" : {
        TYPE : "2",                     //意外遇袭
        NAME : "蛇", 
        PIC : "Texture/Monster/1022",
        MONSTER : [1022],
        DANGER : "3",
        DESC : "你听到了什么动静，仔细一看是一条蛇",
        DROP_ID : 2,
    },

    "217" : {
        TYPE : "2",                     //意外遇袭
        NAME : "狼", 
        PIC : "Texture/Monster/1006",
        MONSTER : [1006],
        DANGER : "4",
        DESC : "你在路途中遭遇到了一头狼",
        DROP_ID : 2,
    },

    "219" : {
        TYPE : "2",                     //意外遇袭
        NAME : "食人族", 
        PIC : "Texture/Monster/1028",
        MONSTER : [1028],
        DANGER : "5",
        DESC : "你遭遇了食人族，他舔了舔嘴唇",
        DROP_ID : 0,
    },

    "221" : {
        TYPE : "2",                     //意外遇袭
        NAME : "鲨鱼", 
        PIC : "Texture/Monster/1031",
        MONSTER : [1031],
        DANGER : "3",
        DESC : "弥散到海水中的血液味道引来了一群鲨鱼",
        DROP_ID : 2,
    },

    "301" : {
        TYPE : "3",                     //沉船遇袭
        NAME : "鲨鱼", 
        PIC : "Texture/Monster/1031",
        MONSTER : [1031,1031,1031],
        DANGER : "？",
        DESC : "你在沉船中停留，弥散到海水中的血液味道引来了一群鲨鱼",
        DROP_ID : 2,
    },

    "302" : {
        TYPE : "3",                     //沉船遇袭
        NAME : "鲨鱼", 
        PIC : "Texture/Monster/1031",
        MONSTER : [1031,1031,1031],
        DANGER : "？",
        DESC : "你在沉船中停留，弥散到海水中的血液味道引来了一群鲨鱼",
        DROP_ID : 2,
    },  

    "303" : {
        TYPE : "3",                     //沉船遇袭
        NAME : "鲨鱼", 
        PIC : "Texture/Monster/1031",
        MONSTER : [1031,1031,1031],
        DANGER : "？",
        DESC : "你在沉船中停留，弥散到海水中的血液味道引来了一群鲨鱼",
        DROP_ID : 2,
    },

    "401" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "1",                     //映射到maze表
    },
    "402" : {
        TYPE : "4",                     //迷宫类型
        MAZE : "2",                     //映射到maze表
    },    
    "403" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "3",                     //映射到maze表
    }, 
    "404" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "4",                     //映射到maze表
    }, 
    "405" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "5",                     //映射到maze表
    }, 
    "406" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "6",                     //映射到maze表
    }, 
    "407" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "7",                     //映射到maze表
    }, 
    "408" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "8",                     //映射到maze表
    }, 
    "409" : {                           //从area映射而来
        TYPE : "4",                     //迷宫类型
        MAZE : "9",                     //映射到maze表
    }, 

};