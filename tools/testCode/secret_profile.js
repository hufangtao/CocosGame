// 
exports.getById = function(pid){
   return dy.utils.clone(HY_SECRETS[pid.toString()]);
};

var HY_SECRETS = {
    "101" : {
        ID : "101",
        NAME : "神秘洞穴",
        DESC : "你在探索乱石林的过程中，发现了一个隐藏的洞穴。",
        R_STAGE : [
            {
                NAME : "奇怪的箱子",
                PIC : "Texture/Monster/1211",
                OPEN_WAYS : ["0", "4100", "4112"],
                DROP_ID : 103,
                DESC : "一个外形完好的箱子，静静地呆在角落中",//关卡进入描述
                DESC1 : "努力打开中...",//关卡战斗中描述
                DESC2 : "你成功打开了箱子",//关卡战斗结束描述
            },
        ],
        M_STAGE : [
            {
                NAME : "狼群",
                PIC : "Texture/Monster/1002",
                MONSTER : [1001, 1002, 1003, 1003, 1003],
                DANGER : "高",
                DROP_ID : 0,
                DESC : "一群狼出现在你的面前，打量了你一下，便围了上来",
            },
            {
                NAME : "狼群",
                PIC : "Texture/Monster/1003",
                MONSTER : [1001, 1002, 1003, 1003, 1003],
                DANGER : "高",
                DROP_ID : 0,
                DESC : "一群狼出现在你的面前，打量了你一下，便围了上来",
            },
        ],
    },
	"401" : {
        ID : "401",
        NAME : "奇特洞穴",
        DESC : "你在丘陵探索时，发现了一个隐藏的洞穴",
        R_STAGE : [

        ],
        M_STAGE : [
            {
                NAME : "熊",
                PIC : "Texture/Monster/1015",
                MONSTER : [1015,1015],
                DANGER : "5",
                DROP_ID : 0,
                DESC : "你的视野里出现了两头熊，它们转了个头看见了你",
            },           
            {
                NAME : "熊王",
                PIC : "Texture/Monster/1017",
                MONSTER : [1017],
                DANGER : "6",
                DROP_ID : 407,
                DESC : "你的视野里出现了一头巨大无比的熊",
            },                       
        ],
	},
	"501" : {
        ID : "501",
        NAME : "阴暗洞穴",
        DESC : "你一脚踩空，发现了一个阴暗的洞穴",
        R_STAGE : [
            {
                NAME : "角落的铁矿",
                PIC : "Texture/Monster/1205",
                OPEN_WAYS : ["0", "4100", "4112"],
                DROP_ID : 507,
                DESC : "几块矿石藏在在角落，看样子应该是裸露的铁矿",//关卡进入描述
                DESC1 : "努力采矿中...",//关卡战斗中描述
                DESC2 : "你成功采到了铁矿",//关卡战斗结束描述
            },            
        ],
        M_STAGE : [
            {
                NAME : "蛇",
                PIC : "Texture/Monster/1021",
                MONSTER : [1021,1021,1023],
                DANGER : "5",
                DROP_ID : 0,
                DESC : "你突然感受到什么动静，仔细一看，三条蛇向着你游动过来",
            },
            {
                NAME : "眼镜王蛇",
                PIC : "Texture/Monster/1024",
                MONSTER : [1024],
                DANGER : "5",
                DROP_ID : 506,
                DESC : "眼镜王蛇向你吐着信子，准备对你发起攻击",
            },            
        ],
	},
    "701" : {
        ID : "701",
        NAME : "隐藏密林",
        DESC : "你脚下一滑，摔了一跤，爬起来时发现了一片隐秘的丛林",
        R_STAGE : [
            // {
            //     NAME : "矮树",
            //     PIC : "Texture/Monster/1002",
            //     OPEN_WAYS : ["0", "4100", "4112"],
            //     DROP_ID : 704,
            //     DESC : "一棵矮树出现在你的眼前",
            // }, 
            // {
            //     NAME : "野土豆",
            //     PIC : "Texture/Monster/1002",
            //     OPEN_WAYS : ["0"],
            //     DROP_ID : 705,
            //     DESC : "你在草丛中发现了几株野土豆",
            // },
            // {
            //     NAME : "野薄荷",
            //     PIC : "Texture/Monster/1002",
            //     OPEN_WAYS : ["0"],
            //     DROP_ID : 706,
            //     DESC : "你在草丛中发现了几株野薄荷",
            // },
        ],
        M_STAGE : [
            {
                NAME : "野猪群",
                PIC : "Texture/Monster/1009",
                MONSTER : [1009,1009,1009,1010],
                DANGER : "7",
                DROP_ID : 0,
                DESC : "一群野猪突然出现在你的面前",
            },
            {
                NAME : "野猪群",
                PIC : "Texture/Monster/1009",
                MONSTER : [1009,1009,1009,1010],
                DANGER : "7",
                DROP_ID : 0,
                DESC : "一群野猪突然出现在你的面前，并摆出了战斗姿态",
            },
            {
                NAME : "野猪王",
                PIC : "Texture/Monster/1011",
                MONSTER : [1011],
                DANGER : "7",
                DROP_ID : 708,
                DESC : "伴随着一声愤怒的吼叫，野猪王出现在你的视野中",
            },            
        ],
    },
    "901" : {
        ID : "901",
        NAME : "隐秘山洞",
        DESC : "你在山脚发现了一个入口不明显的山洞",
        R_STAGE : [
            {
                NAME : "人参",
                PIC : "Texture/Monster/1207",
                OPEN_WAYS : ["0"],
                DROP_ID : 907,
                DESC : "你在角落发现了一株人参，人参有着很强的恢复能力",//关卡进入描述
                DESC1 : "努力采集中...",//关卡战斗中描述
                DESC2 : "你成功采集到了人参",//关卡战斗结束描述
            }, 
            // {
            //     NAME : "裸露的铁矿",
            //     PIC : "Texture/Monster/1002",
            //     OPEN_WAYS : ["0", "4100", "4112"],
            //     DROP_ID : 905,
            //     DESC : "一些铁矿裸露在地面",
            // },
        ],
        M_STAGE : [
            {
                NAME : "猛虎",
                PIC : "Texture/Monster/1025",
                MONSTER : [1025,1025],
                DANGER : "7",
                DROP_ID : 902,
                DESC : "两只猛虎出现在你的视野里，你没想到这里居然还有猛虎，看样子难免一战",
            },
            {
                NAME : "猛虎",
                PIC : "Texture/Monster/1025",
                MONSTER : [1025,1025],
                DANGER : "7",
                DROP_ID : 902,
                DESC : "两只猛虎出现在你的视野里，你没想到这里居然还有猛虎，看样子难免一战",
            },
            {
                NAME : "虎王",
                PIC : "Texture/Monster/1027",
                MONSTER : [1027],
                DANGER : "8",
                DROP_ID : 902,
                DESC : "伴随着一声愤怒的吼叫，虎王出现在你的视野中，看来难免一战了",
            },
        ],
    },
    // "1001" : {
    //     ID : "1001",
    //     NAME : "迷雾丛林",
    //     DESC : "前方的沼泽迷雾笼罩，似乎有什么隐藏于其中",
    //     R_STAGE : [
    //         {
    //             NAME : "水洼",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1003,
    //             DESC : "看上去清澈明亮的水洼",
    //         },
    //         {
    //             NAME : "黏土堆",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1005,
    //             DESC : "一堆比较适合用来建筑的黏土",
    //         },
    //     ],
    //     M_STAGE : [
    //         {
    //             NAME : "鳄鱼",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1018,1019],
    //             DANGER : "高",
    //             DROP_ID : 1002,
    //             DESC : "两只凶猛的鳄鱼从沼泽里浮出来",
    //         },
    //         {
    //             NAME : "鳄鱼",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1018,1019],
    //             DANGER : "高",
    //             DROP_ID : 1002,
    //             DESC : "两只凶猛的鳄鱼从沼泽里浮出来",
    //         },
    //         {
    //             NAME : "鳄鱼",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1020],
    //             DANGER : "高",
    //             DROP_ID : 1006,
    //             DESC : "一只凶猛的鳄鱼从沼泽里浮出来",
    //         },
    //     ],
    // },
    // "1101" : {
    //     ID : "1101",
    //     NAME : "沙漠洞穴",
    //     DESC : "你发现了一个不知道是动物挖掘还是天然形成的沙穴",
    //     R_STAGE : [
    //         {
    //             NAME : "软金",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1102,
    //             DESC : "一些软金矿裸露在地面",
    //         }, 
    //         {
    //             NAME : "硝石",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1103,
    //             DESC : "你看到一个混有硝石的泥土堆",
    //         },            
    //     ],
    //     M_STAGE : [
    //         {
    //             NAME : "蛇",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1022,1022],
    //             DANGER : "高",
    //             DROP_ID : 1101,
    //             DESC : "两条蛇向你盘旋而来",
    //         },
    //         {
    //             NAME : "蛇",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1022,1022],
    //             DANGER : "高",
    //             DROP_ID : 1101,
    //             DESC : "两条蛇向你盘旋而来",
    //         },
    //         {
    //             NAME : "蛇",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1022,1022],
    //             DANGER : "高",
    //             DROP_ID : 1101,
    //             DESC : "两条蛇向你盘旋而来",
    //         },            
    //     ],
    // },
    // "1301" : {
    //     ID : "1301",
    //     NAME : "茂密丛林",
    //     DESC : "前方有一个比之前茂密很多的树林",
    //     R_STAGE : [        
    //         {
    //             NAME : "草药丛",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1303,
    //             DESC : "几株草药隐藏在草丛中",
    //         },
    //         {
    //             NAME : "油脂树",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0", "4100", "4112"],
    //             DROP_ID : 1304,
    //             DESC : "一棵高大的油脂树",
    //         },
    //     ],
    //     M_STAGE : [
    //         {
    //             NAME : "猛虎",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1025,1026],
    //             DANGER : "低",
    //             DROP_ID : 1302,
    //             DESC : "两只猛虎拦住了你的去路",
    //         },
    //         {
    //             NAME : "猛虎",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1025,1026],
    //             DANGER : "低",
    //             DROP_ID : 1302,
    //             DESC : "两只猛虎拦住了你的去路",
    //         },
    //         {
    //             NAME : "虎王",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1027],
    //             DANGER : "低",
    //             DROP_ID : 1305,
    //             DESC : "虎王拦住了你的去路",
    //         },            
    //     ],
    // },
    // "1401" : {
    //     ID : "1401",
    //     NAME : "隐藏山洞",
    //     DESC : "你发现树林后方隐藏着一个山洞",
    //     R_STAGE : [
    //         {
    //             NAME : "漆黑的树",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0", "4100", "4112"],
    //             DROP_ID : 1403,
    //             DESC : "部分被烧焦的树",
    //         },
    //         {
    //             NAME : "野土豆",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1404,
    //             DESC : "你在草丛中发现了几株野土豆",
    //         },
    //          {
    //             NAME : "草药丛",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1405,
    //             DESC : "几株草药隐藏在草丛中",
    //         },
    //     ],
    //     M_STAGE : [
    //         {
    //             NAME : "狼群",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1005,1005,1005,1005],
    //             DANGER : "低",
    //             DROP_ID : 1401,
    //             DESC : "一群狼包围了你",
    //         },
    //         {
    //             NAME : "狼群",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1005,1005,1005,1005],
    //             DANGER : "低",
    //             DROP_ID : 1401,
    //             DESC : "一群狼包围了你",
    //         },  
    //         {
    //             NAME : "野狼王",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1007],
    //             DANGER : "低",
    //             DROP_ID : 1406,
    //             DESC : "野狼王拦住了你的去路",
    //         },           
    //     ],
    // },
    // "1501" : {
    //     ID : "1501",
    //     NAME : "茂密丛林",
    //     DESC : "前方有一个阳光都被完全遮蔽的树林",
    //     R_STAGE : [
    //         {
    //             NAME : "蜂窝",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1508,
    //             DESC : "藏着大量蜂蜜的蜂窝",
    //         },
    //         {
    //             NAME : "野薄荷",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1509,
    //             DESC : "你在草丛中发现了几株野薄荷",
    //         },
    //         {
    //             NAME : "水洼",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1510,
    //             DESC : "看上去清澈明亮的水洼",
    //         },
    //     ],
    //     M_STAGE : [
    //         {
    //             NAME : "熊",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1015,1015,1015],
    //             DANGER : "低",
    //             DROP_ID : 1502,
    //             DESC : "三头熊出现在你的视野中",
    //         }, 
    //         {
    //             NAME : "熊王",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1017],
    //             DANGER : "低",
    //             DROP_ID : 1513,
    //             DESC : "熊王拦住了你的去路",
    //         },
    //         {
    //             NAME : "野狼王",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1007],
    //             DANGER : "低",
    //             DROP_ID : 1514,
    //             DESC : "野狼王拦住了你的去路",
    //         },
    //     ],
    // },
    // "1601" : {
    //     ID : "1601",
    //     NAME : "火山秘洞",
    //     DESC : "你在火山脚下看到了一个隐藏洞穴入口",
    //     R_STAGE : [
    //         {
    //             NAME : "石片",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1603,
    //             DESC : "一堆凌乱的石片",
    //         },
    //         {
    //             NAME : "硫磺",
    //             PIC : "Texture/Monster/1002",
    //             OPEN_WAYS : ["0"],
    //             DROP_ID : 1604,
    //             DESC : "火山口附近的硫磺矿",
    //         },
    //     ],
    //     M_STAGE : [
    //         {
    //             NAME : "狼群",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1005,1005,1005,1005],
    //             DANGER : "低",
    //             DROP_ID : 1601,
    //             DESC : "一群狼包围了你",
    //         },
    //         {
    //             NAME : "野狼王",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1007],
    //             DANGER : "低",
    //             DROP_ID : 1605,
    //             DESC : "野狼王拦住了你的去路",
    //         },
    //         {
    //             NAME : "野狼王",
    //             PIC : "Texture/Monster/1001",
    //             MONSTER : [1007],
    //             DANGER : "低",
    //             DROP_ID : 1605,
    //             DESC : "野狼王拦住了你的去路",
    //         },           
    //     ],
    // },  
};