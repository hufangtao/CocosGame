exports.getById = function(nid){
   return HY_NATURE[nid.toString()];
};

var HY_NATURE = {
	SEASON : {
		"1" : {
			ID : "1",
			NAME : "spring",
		},
		"2" : {
			ID : "2",
			NAME : "summer",
		},
		"3" : {
			ID : "3",
			NAME : "autumn",
		},
		"4" : {
			ID : "4",
			NAME : "winter",
		},
	},

	TEMPERATURE : {
		//spring
		"1" : {
			"1"		:	-5	,
			"2"		:	-3	,
			"3"		:	-2	,
			"4"		:	-1	,
			"5"		:	0	,
			"6"		:	1	,
			"7"		:	2	,
			"8"		:	3	,
			"9"		:	4	,
			"10"	:	5	,
			"11"	:	6	,
			"12"	:	7	,
			"13"	:	8	,
			"14"	:	9	,
			"15"	:	10	,
			"16"	:	11	,
			"17"	:	12	,
			"18"	:	13	,
			"19"	:	14	,
			"20"	:	15	,
			"21"	:	16	,
			"22"	:	17	,
			"23"	:	18	,
			"24"	:	18	,
			"25"	:	19	,
			"26"	:	19	,
			"27"	:	20	,
			"28"	:	20	,
			"29"	:	21	,
			"30"	:	21	,
		},
		//summer
		"2" : {
			"1"		:	22	,
			"2"		:	23	,
			"3"		:	23	,
			"4"		:	24	,
			"5"		:	24	,
			"6"		:	25	,
			"7"		:	25	,
			"8"		:	26	,
			"9"		:	26	,
			"10"	:	27	,
			"11"	:	27	,
			"12"	:	28	,
			"13"	:	28	,
			"14"	:	29	,
			"15"	:	29	,
			"16"	:	30	,
			"17"	:	31	,
			"18"	:	32	,
			"19"	:	33	,
			"20"	:	34	,
			"21"	:	34	,
			"22"	:	35	,
			"23"	:	35	,
			"24"	:	36	,
			"25"	:	36	,
			"26"	:	34	,
			"27"	:	32	,
			"28"	:	31	,
			"29"	:	30	,
			"30"	:	28	,			
		}, 
		//autumn
		"3" : {
			"1"		:	26	,
			"2"		:	25	,
			"3"		:	24	,
			"4"		:	23	,
			"5"		:	22	,
			"6"		:	21	,
			"7"		:	20	,
			"8"		:	19	,
			"9"		:	18	,
			"10"	:	17	,
			"11"	:	16	,
			"12"	:	15	,
			"13"	:	14	,
			"14"	:	13	,
			"15"	:	12	,
			"16"	:	11	,
			"17"	:	10	,
			"18"	:	9	,
			"19"	:	8	,
			"20"	:	7	,
			"21"	:	6	,
			"22"	:	6	,
			"23"	:	5	,
			"24"	:	5	,
			"25"	:	4	,
			"26"	:	4	,
			"27"	:	3	,
			"28"	:	2	,
			"29"	:	2	,
			"30"	:	1	,		
		}, 
		//winter
		"4" : {
			"1"		:	0	,
			"2"		:	-1	,
			"3"		:	-2	,
			"4"		:	-4	,
			"5"		:	-5	,
			"6"		:	-6	,
			"7"		:	-10	,
			"8"		:	-12	,
			"9"		:	-14	,
			"10"	:	-16	,
			"11"	:	-18	,
			"12"	:	-10	,
			"13"	:	-12	,
			"14"	:	-14	,
			"15"	:	-16	,
			"16"	:	-18	,
			"17"	:	-20	,
			"18"	:	-22	,
			"19"	:	-24	,
			"20"	:	-26	,
			"21"	:	-28	,
			"22"	:	-30	,
			"23"	:	-32	,
			"24"	:	-34	,
			"25"	:	-30	,
			"26"	:	-26	,
			"27"	:	-20	,
			"28"	:	-18	,
			"29"	:	-12	,
			"30"	:	-8	,	
		}, 

		FACTOR : {
			DAY : {
				"0" 	: -7,
				"1" 	: -7,
				"2" 	: -7,
				"3" 	: -7,
				"4" 	: -2,
				"5" 	: -2,
				"6" 	: -2,
				"7" 	: -2,
				"8" 	: 2,
				"9" 	: 2,
				"10" 	: 2,
				"11" 	: 2,
				"12" 	: 4,
				"13" 	: 4,
				"14" 	: 4,
				"15" 	: 4,
				"16" 	: 0,
				"17" 	: 0,
				"18" 	: 0,
				"19" 	: 0,
				"20" 	: -4,
				"21" 	: -4,
				"22" 	: -4,
				"23" 	: -4,
			},

			WEATHER : {
				"1" : 2, 
				"2" : 0, 
				"3" : -2, 
				"4" : -4, 
				"5" : -7,
			},
		},
	},
	
	WEATHER : {
		"1" : {
			ID : "1",
			NAME1 : "sunny",		// 0度及以上的天气
			NAME2 : "sunny",		// 0度以下的天气
			H_TIME1 : 8*3600,
			H_TIME2 : 16*3600,
			NEXT : ['2', '3'],
		},
		"2" : {
			ID : "2",
			NAME1 : "cloudy",
			NAME2 : "cloudy",
			H_TIME1 : 8*3600,
			H_TIME2 : 16*3600,
			NEXT : ['1', '3', '4'],
		},
		"3" : {
			ID : "3",
			NAME1 : "foggy",
			NAME2 : "foggy",
			H_TIME1 : 8*3600,
			H_TIME2 : 16*3600,
			NEXT : ['1', '2', '4', '5'],
		},
		"4" : {
			ID : "4",
			NAME1 : "rainny",
			NAME2 : "snowy",
			H_TIME1 : 8*3600,
			H_TIME2 : 16*3600,
			NEXT : ['1', '3', '5'],
		},
		"5" : {
			ID : "5",
			NAME1 : "rainstorm",
			NAME2 : "snowstorm",
			H_TIME1 : 8*3600,
			H_TIME2 : 16*3600,
			NEXT : ['1', '3'],
		},
	}, 
};