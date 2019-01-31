var fs = require('fs');
fs.readFile('./trap_profile.json',function(err,data){
    if(err) throw err;

    // // maze_desc_profile
    // var jsonObj = JSON.parse(data);
    // for (var item in jsonObj) {
    //     console.log(item);

    //     var content = jsonObj[item];
    //     jsonObj[item] = {};
    //     jsonObj[item].cn = content;
    //     jsonObj[item].en = content;
    //     jsonObj[item].tw = content;
    // }

    // var jsonObj = JSON.parse(data);
    // for (var item in jsonObj) {
    //     console.log(item);
    //     if (jsonObj[item].NAME || jsonObj[item].NAME == "") {
    //         var content = jsonObj[item].NAME;
    //         jsonObj[item].NAME = {};
    //         jsonObj[item].NAME.cn = content;
    //         jsonObj[item].NAME.en = content;
    //         jsonObj[item].NAME.tw = content;
    //     }

    //     if (jsonObj[item].DESC || jsonObj[item].DESC == "") {
    //         var content = jsonObj[item].DESC;
    //         jsonObj[item].DESC = {};
    //         jsonObj[item].DESC.cn = content;
    //         jsonObj[item].DESC.en = content;
    //         jsonObj[item].DESC.tw = content;
    //     }

    //     if (jsonObj[item].DESC1 || jsonObj[item].DESC1 == "") {
    //         var content = jsonObj[item].DESC1;
    //         jsonObj[item].DESC1 = {};
    //         jsonObj[item].DESC1.cn = content;
    //         jsonObj[item].DESC1.en = content;
    //         jsonObj[item].DESC1.tw = content;
    //     }

    //     if (jsonObj[item].DESC2 || jsonObj[item].DESC2 == "") {
    //         var content = jsonObj[item].DESC2;
    //         jsonObj[item].DESC2 = {};
    //         jsonObj[item].DESC2.cn = content;
    //         jsonObj[item].DESC2.en = content;
    //         jsonObj[item].DESC2.tw = content;
    //     }

    //     if (jsonObj[item].DESCG || jsonObj[item].DESCG == "") {
    //         var content = jsonObj[item].DESCG;
    //         jsonObj[item].DESCG = {};
    //         jsonObj[item].DESCG.cn = content;
    //         jsonObj[item].DESCG.en = content;
    //         jsonObj[item].DESCG.tw = content;
    //     }

    //     if (jsonObj[item].DESCD || jsonObj[item].DESCD == "") {
    //         var content = jsonObj[item].DESCD;
    //         jsonObj[item].DESCD = {};
    //         jsonObj[item].DESCD.cn = content;
    //         jsonObj[item].DESCD.en = content;
    //         jsonObj[item].DESCD.tw = content;
    //     }

    //     if (jsonObj[item].STAGE) {
    //         // for (var ri = 0; ri < jsonObj[item].STAGE.length; ++ri) {
    //         for(var ri in jsonObj[item].STAGE){
    //             if(jsonObj[item].STAGE[ri].WAY || jsonObj[item].STAGE[ri].WAY == ""){
    //                 var content = jsonObj[item].STAGE[ri].WAY;
    //                 jsonObj[item].STAGE[ri].WAY = {};
    //                 jsonObj[item].STAGE[ri].WAY.cn = content;
    //                 jsonObj[item].STAGE[ri].WAY.en = content;
    //                 jsonObj[item].STAGE[ri].WAY.tw = content;
    //             }

    //             if(jsonObj[item].STAGE[ri].DESC || jsonObj[item].STAGE[ri].DESC == ""){
    //                 var content = jsonObj[item].STAGE[ri].DESC;
    //                 jsonObj[item].STAGE[ri].DESC = {};
    //                 jsonObj[item].STAGE[ri].DESC.cn = content;
    //                 jsonObj[item].STAGE[ri].DESC.en = content;
    //                 jsonObj[item].STAGE[ri].DESC.tw = content;
    //             }

    //             if(jsonObj[item].STAGE[ri].DESC1 || jsonObj[item].STAGE[ri].DESC1 == ""){
    //                 var content = jsonObj[item].STAGE[ri].DESC1;
    //                 jsonObj[item].STAGE[ri].DESC1 = {};
    //                 jsonObj[item].STAGE[ri].DESC1.cn = content;
    //                 jsonObj[item].STAGE[ri].DESC1.en = content;
    //                 jsonObj[item].STAGE[ri].DESC1.tw = content;
    //             }

    //             if(jsonObj[item].STAGE[ri].DESC2 || jsonObj[item].STAGE[ri].DESC2 == ""){
    //                 var content = jsonObj[item].STAGE[ri].DESC2;
    //                 jsonObj[item].STAGE[ri].DESC2 = {};
    //                 jsonObj[item].STAGE[ri].DESC2.cn = content;
    //                 jsonObj[item].STAGE[ri].DESC2.en = content;
    //                 jsonObj[item].STAGE[ri].DESC2.tw = content;
    //             }

    //             if(jsonObj[item].STAGE[ri].LAST_WORDS){
    //                 var content = jsonObj[item].STAGE[ri].LAST_WORDS.TITLE;
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TITLE = {};
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TITLE.cn = content;
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TITLE.en = content;
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TITLE.tw = content;

    //                 content = jsonObj[item].STAGE[ri].LAST_WORDS.TIP;
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TIP = {};
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TIP.cn = content;
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TIP.en = content;
    //                 jsonObj[item].STAGE[ri].LAST_WORDS.TIP.tw = content;
    //             }

    //             if(jsonObj[item].STAGE[ri].STORY){
    //                 for(var si in jsonObj[item].STAGE[ri].STORY){
    //                     if(jsonObj[item].STAGE[ri].STORY[si].NAME || jsonObj[item].STAGE[ri].STORY[si].NAME == ""){
    //                         var content = jsonObj[item].STAGE[ri].STORY[si].NAME;
    //                         jsonObj[item].STAGE[ri].STORY[si].NAME = {};
    //                         jsonObj[item].STAGE[ri].STORY[si].NAME.cn = content;
    //                         jsonObj[item].STAGE[ri].STORY[si].NAME.en = content;
    //                         jsonObj[item].STAGE[ri].STORY[si].NAME.tw = content;
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     if (jsonObj[item].STAGE) {
    //         for (var mi in jsonObj[item].STAGE){
    //             for(var ri in jsonObj[item].STAGE[mi]){
    //                 if(jsonObj[item].STAGE[mi][ri].NAME || jsonObj[item].STAGE[mi][ri].NAME == ""){
    //                     var content = jsonObj[item].STAGE[mi][ri].NAME;
    //                     jsonObj[item].STAGE[mi][ri].NAME = {};
    //                     jsonObj[item].STAGE[mi][ri].NAME.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].NAME.en = content;
    //                     jsonObj[item].STAGE[mi][ri].NAME.tw = content;
    //                 }

    //                 if(jsonObj[item].STAGE[mi][ri].WAY || jsonObj[item].STAGE[mi][ri].WAY == ""){
    //                     var content = jsonObj[item].STAGE[mi][ri].WAY;
    //                     jsonObj[item].STAGE[mi][ri].WAY = {};
    //                     jsonObj[item].STAGE[mi][ri].WAY.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].WAY.en = content;
    //                     jsonObj[item].STAGE[mi][ri].WAY.tw = content;
    //                 }

    //                 if(jsonObj[item].STAGE[mi][ri].DESC || jsonObj[item].STAGE[mi][ri].DESC == ""){
    //                     var content = jsonObj[item].STAGE[mi][ri].DESC;
    //                     jsonObj[item].STAGE[mi][ri].DESC = {};
    //                     jsonObj[item].STAGE[mi][ri].DESC.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].DESC.en = content;
    //                     jsonObj[item].STAGE[mi][ri].DESC.tw = content;
    //                 }

    //                 if(jsonObj[item].STAGE[mi][ri].DESC1 || jsonObj[item].STAGE[mi][ri].DESC1 == ""){
    //                     var content = jsonObj[item].STAGE[mi][ri].DESC1;
    //                     jsonObj[item].STAGE[mi][ri].DESC1 = {};
    //                     jsonObj[item].STAGE[mi][ri].DESC1.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].DESC1.en = content;
    //                     jsonObj[item].STAGE[mi][ri].DESC1.tw = content;
    //                 }

    //                 if(jsonObj[item].STAGE[mi][ri].DESC2 || jsonObj[item].STAGE[mi][ri].DESC2 == ""){
    //                     var content = jsonObj[item].STAGE[mi][ri].DESC2;
    //                     jsonObj[item].STAGE[mi][ri].DESC2 = {};
    //                     jsonObj[item].STAGE[mi][ri].DESC2.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].DESC2.en = content;
    //                     jsonObj[item].STAGE[mi][ri].DESC2.tw = content;
    //                 }

    //                 if(jsonObj[item].STAGE[mi][ri].LAST_WORDS){
    //                     var content = jsonObj[item].STAGE[mi][ri].LAST_WORDS.TITLE;
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TITLE = {};
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TITLE.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TITLE.en = content;
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TITLE.tw = content;

    //                     content = jsonObj[item].STAGE[mi][ri].LAST_WORDS.TIP;
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TIP = {};
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TIP.cn = content;
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TIP.en = content;
    //                     jsonObj[item].STAGE[mi][ri].LAST_WORDS.TIP.tw = content;
    //                 }

    //                 if(jsonObj[item].STAGE[mi][ri].STORY){
    //                     for(var si in jsonObj[item].STAGE[mi][ri].STORY){
    //                         if(jsonObj[item].STAGE[mi][ri].STORY[si].NAME || jsonObj[item].STAGE[mi][ri].STORY[si].NAME == ""){
    //                             var content = jsonObj[item].STAGE[mi][ri].STORY[si].NAME;
    //                             jsonObj[item].STAGE[mi][ri].STORY[si].NAME = {};
    //                             jsonObj[item].STAGE[mi][ri].STORY[si].NAME.cn = content;
    //                             jsonObj[item].STAGE[mi][ri].STORY[si].NAME.en = content;
    //                             jsonObj[item].STAGE[mi][ri].STORY[si].NAME.tw = content;
    //                         }
    //                     }
    //                 }
    //             }
    //         }
    //     }

    //     if (jsonObj[item].R_STAGE) {
    //         for (var ri = 0; ri < jsonObj[item].R_STAGE.length; ++ri) {
    //             if(jsonObj[item].R_STAGE[ri].NAME || jsonObj[item].R_STAGE[ri].NAME == ""){
    //                 var content = jsonObj[item].R_STAGE[ri].NAME;
    //                 jsonObj[item].R_STAGE[ri].NAME = {};
    //                 jsonObj[item].R_STAGE[ri].NAME.cn = content;
    //                 jsonObj[item].R_STAGE[ri].NAME.en = content;
    //                 jsonObj[item].R_STAGE[ri].NAME.tw = content;
    //             }

    //             if(jsonObj[item].R_STAGE[ri].DESC || jsonObj[item].R_STAGE[ri].DESC == ""){
    //                 var content = jsonObj[item].R_STAGE[ri].DESC;
    //                 jsonObj[item].R_STAGE[ri].DESC = {};
    //                 jsonObj[item].R_STAGE[ri].DESC.cn = content;
    //                 jsonObj[item].R_STAGE[ri].DESC.en = content;
    //                 jsonObj[item].R_STAGE[ri].DESC.tw = content;
    //             }

    //             if(jsonObj[item].R_STAGE[ri].DESC1 || jsonObj[item].R_STAGE[ri].DESC1 == ""){
    //                 var content = jsonObj[item].R_STAGE[ri].DESC1;
    //                 jsonObj[item].R_STAGE[ri].DESC1 = {};
    //                 jsonObj[item].R_STAGE[ri].DESC1.cn = content;
    //                 jsonObj[item].R_STAGE[ri].DESC1.en = content;
    //                 jsonObj[item].R_STAGE[ri].DESC1.tw = content;
    //             }

    //             if(jsonObj[item].R_STAGE[ri].DESC2 || jsonObj[item].R_STAGE[ri].DESC2 == ""){
    //                 var content = jsonObj[item].R_STAGE[ri].DESC2;
    //                 jsonObj[item].R_STAGE[ri].DESC2 = {};
    //                 jsonObj[item].R_STAGE[ri].DESC2.cn = content;
    //                 jsonObj[item].R_STAGE[ri].DESC2.en = content;
    //                 jsonObj[item].R_STAGE[ri].DESC2.tw = content;
    //             }

    //             if(jsonObj[item].R_STAGE[ri].LAST_WORDS){
    //                 var content = jsonObj[item].R_STAGE[ri].LAST_WORDS.TITLE;
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TITLE = {};
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TITLE.cn = content;
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TITLE.en = content;
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TITLE.tw = content;

    //                 content = jsonObj[item].R_STAGE[ri].LAST_WORDS.TIP;
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TIP = {};
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TIP.cn = content;
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TIP.en = content;
    //                 jsonObj[item].R_STAGE[ri].LAST_WORDS.TIP.tw = content;
    //             }
    //         }
    //     }

    //     if (jsonObj[item].R_STAGE) {
    //         for (var mi in jsonObj[item].R_STAGE){
    //             for (var ri = 0; ri < jsonObj[item].R_STAGE[mi].length; ++ri) {
    //                 if(jsonObj[item].R_STAGE[mi][ri].NAME || jsonObj[item].R_STAGE[mi][ri].NAME == ""){
    //                     var content = jsonObj[item].R_STAGE[mi][ri].NAME;
    //                     jsonObj[item].R_STAGE[mi][ri].NAME = {};
    //                     jsonObj[item].R_STAGE[mi][ri].NAME.cn = content;
    //                     jsonObj[item].R_STAGE[mi][ri].NAME.en = content;
    //                     jsonObj[item].R_STAGE[mi][ri].NAME.tw = content;
    //                 }

    //                 if(jsonObj[item].R_STAGE[mi][ri].DESC || jsonObj[item].R_STAGE[mi][ri].DESC == ""){
    //                     var content = jsonObj[item].R_STAGE[mi][ri].DESC;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC = {};
    //                     jsonObj[item].R_STAGE[mi][ri].DESC.cn = content;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC.en = content;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC.tw = content;
    //                 }

    //                 if(jsonObj[item].R_STAGE[mi][ri].DESC1 || jsonObj[item].R_STAGE[mi][ri].DESC1 == ""){
    //                     var content = jsonObj[item].R_STAGE[mi][ri].DESC1;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC1 = {};
    //                     jsonObj[item].R_STAGE[mi][ri].DESC1.cn = content;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC1.en = content;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC1.tw = content;
    //                 }

    //                 if(jsonObj[item].R_STAGE[mi][ri].DESC2 || jsonObj[item].R_STAGE[mi][ri].DESC2 == ""){
    //                     var content = jsonObj[item].R_STAGE[mi][ri].DESC2;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC2 = {};
    //                     jsonObj[item].R_STAGE[mi][ri].DESC2.cn = content;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC2.en = content;
    //                     jsonObj[item].R_STAGE[mi][ri].DESC2.tw = content;
    //                 }

    //                 if(jsonObj[item].R_STAGE[mi][ri].LAST_WORDS){
    //                     var content = jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TITLE;
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TITLE = {};
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TITLE.cn = content;
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TITLE.en = content;
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TITLE.tw = content;

    //                     content = jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TIP;
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TIP = {};
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TIP.cn = content;
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TIP.en = content;
    //                     jsonObj[item].R_STAGE[mi][ri].LAST_WORDS.TIP.tw = content;
    //                 }
    //             }
    //         }
    //     }

    //     if (jsonObj[item].M_STAGE) {
    //         for (var ri = 0; ri < jsonObj[item].M_STAGE.length; ++ri) {
    //             if(jsonObj[item].M_STAGE[ri].NAME || jsonObj[item].M_STAGE[ri].NAME == ""){
    //                 var content = jsonObj[item].M_STAGE[ri].NAME;
    //                 jsonObj[item].M_STAGE[ri].NAME = {};
    //                 jsonObj[item].M_STAGE[ri].NAME.cn = content;
    //                 jsonObj[item].M_STAGE[ri].NAME.en = content;
    //                 jsonObj[item].M_STAGE[ri].NAME.tw = content;
    //             }

    //             if(jsonObj[item].M_STAGE[ri].DESC || jsonObj[item].M_STAGE[ri].DESC == ""){
    //                 var content = jsonObj[item].M_STAGE[ri].DESC;
    //                 jsonObj[item].M_STAGE[ri].DESC = {};
    //                 jsonObj[item].M_STAGE[ri].DESC.cn = content;
    //                 jsonObj[item].M_STAGE[ri].DESC.en = content;
    //                 jsonObj[item].M_STAGE[ri].DESC.tw = content;
    //             }

    //             if(jsonObj[item].M_STAGE[ri].DESC1 || jsonObj[item].M_STAGE[ri].DESC1 == ""){
    //                 var content = jsonObj[item].M_STAGE[ri].DESC1;
    //                 jsonObj[item].M_STAGE[ri].DESC1 = {};
    //                 jsonObj[item].M_STAGE[ri].DESC1.cn = content;
    //                 jsonObj[item].M_STAGE[ri].DESC1.en = content;
    //                 jsonObj[item].M_STAGE[ri].DESC1.tw = content;
    //             }

    //             if(jsonObj[item].M_STAGE[ri].DESC2 || jsonObj[item].M_STAGE[ri].DESC2 == ""){
    //                 var content = jsonObj[item].M_STAGE[ri].DESC2;
    //                 jsonObj[item].M_STAGE[ri].DESC2 = {};
    //                 jsonObj[item].M_STAGE[ri].DESC2.cn = content;
    //                 jsonObj[item].M_STAGE[ri].DESC2.en = content;
    //                 jsonObj[item].M_STAGE[ri].DESC2.tw = content;
    //             }

    //             if(jsonObj[item].M_STAGE[ri].LAST_WORDS){
    //                 var content = jsonObj[item].M_STAGE[ri].LAST_WORDS.TITLE;
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TITLE = {};
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TITLE.cn = content;
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TITLE.en = content;
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TITLE.tw = content;

    //                 content = jsonObj[item].M_STAGE[ri].LAST_WORDS.TIP;
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TIP = {};
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TIP.cn = content;
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TIP.en = content;
    //                 jsonObj[item].M_STAGE[ri].LAST_WORDS.TIP.tw = content;
    //             }
    //         }
    //     }

    //     if (jsonObj[item].M_STAGE) {
    //         for (var mi in jsonObj[item].M_STAGE){
    //             for (var ri = 0; ri < jsonObj[item].M_STAGE[mi].length; ++ri) {
    //                 if(jsonObj[item].M_STAGE[mi][ri].NAME || jsonObj[item].M_STAGE[mi][ri].NAME == ""){
    //                     var content = jsonObj[item].M_STAGE[mi][ri].NAME;
    //                     jsonObj[item].M_STAGE[mi][ri].NAME = {};
    //                     jsonObj[item].M_STAGE[mi][ri].NAME.cn = content;
    //                     jsonObj[item].M_STAGE[mi][ri].NAME.en = content;
    //                     jsonObj[item].M_STAGE[mi][ri].NAME.tw = content;
    //                 }

    //                 if(jsonObj[item].M_STAGE[mi][ri].DESC || jsonObj[item].M_STAGE[mi][ri].DESC == ""){
    //                     var content = jsonObj[item].M_STAGE[mi][ri].DESC;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC = {};
    //                     jsonObj[item].M_STAGE[mi][ri].DESC.cn = content;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC.en = content;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC.tw = content;
    //                 }

    //                 if(jsonObj[item].M_STAGE[mi][ri].DESC1 || jsonObj[item].M_STAGE[mi][ri].DESC1 == ""){
    //                     var content = jsonObj[item].M_STAGE[mi][ri].DESC1;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC1 = {};
    //                     jsonObj[item].M_STAGE[mi][ri].DESC1.cn = content;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC1.en = content;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC1.tw = content;
    //                 }

    //                 if(jsonObj[item].M_STAGE[mi][ri].DESC2 || jsonObj[item].M_STAGE[mi][ri].DESC2 == ""){
    //                     var content = jsonObj[item].M_STAGE[mi][ri].DESC2;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC2 = {};
    //                     jsonObj[item].M_STAGE[mi][ri].DESC2.cn = content;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC2.en = content;
    //                     jsonObj[item].M_STAGE[mi][ri].DESC2.tw = content;
    //                 }

    //                 if(jsonObj[item].M_STAGE[mi][ri].LAST_WORDS){
    //                     var content = jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TITLE;
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TITLE = {};
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TITLE.cn = content;
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TITLE.en = content;
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TITLE.tw = content;

    //                     content = jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TIP;
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TIP = {};
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TIP.cn = content;
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TIP.en = content;
    //                     jsonObj[item].M_STAGE[mi][ri].LAST_WORDS.TIP.tw = content;
    //                 }
    //             }
    //         }
    //     }
    // }
    
    // var jsonObj = JSON.parse(data);
    // for (var item in jsonObj) {
    //     console.log(item);
    //     if (jsonObj[item].NAME || jsonObj[item].NAME == "") {
    //         var content = jsonObj[item].NAME;
    //         jsonObj[item].NAME = {};
    //         jsonObj[item].NAME.cn = content;
    //         jsonObj[item].NAME.en = content;
    //         jsonObj[item].NAME.tw = content;
    //     }

    //     if (jsonObj[item].MOVE_DESC || jsonObj[item].MOVE_DESC == "") {
    //         var content = jsonObj[item].MOVE_DESC;
    //         jsonObj[item].MOVE_DESC = {};
    //         jsonObj[item].MOVE_DESC.cn = content;
    //         jsonObj[item].MOVE_DESC.en = content;
    //         jsonObj[item].MOVE_DESC.tw = content;
    //     }

    //     if (jsonObj[item].BITE_DESC || jsonObj[item].BITE_DESC == "") {
    //         var content = jsonObj[item].BITE_DESC;
    //         jsonObj[item].BITE_DESC = {};
    //         jsonObj[item].BITE_DESC.cn = content;
    //         jsonObj[item].BITE_DESC.en = content;
    //         jsonObj[item].BITE_DESC.tw = content;
    //     }

    //     if (jsonObj[item].MISS_DESC || jsonObj[item].MISS_DESC == "") {
    //         var content = jsonObj[item].MISS_DESC;
    //         jsonObj[item].MISS_DESC = {};
    //         jsonObj[item].MISS_DESC.cn = content;
    //         jsonObj[item].MISS_DESC.en = content;
    //         jsonObj[item].MISS_DESC.tw = content;
    //     }

    //     if (jsonObj[item].DEATH_DESC || jsonObj[item].DEATH_DESC == "") {
    //         var content = jsonObj[item].DEATH_DESC;
    //         jsonObj[item].DEATH_DESC = {};
    //         jsonObj[item].DEATH_DESC.cn = content;
    //         jsonObj[item].DEATH_DESC.en = content;
    //         jsonObj[item].DEATH_DESC.tw = content;
    //     }

    //     if (jsonObj[item].DESC || jsonObj[item].DESC == "") {
    //         var content = jsonObj[item].DESC;
    //         jsonObj[item].DESC = {};
    //         jsonObj[item].DESC.cn = content;
    //         jsonObj[item].DESC.en = content;
    //         jsonObj[item].DESC.tw = content;
    //     }
    // }
    
    var jsonObj = JSON.parse(data);
    for (var item in jsonObj) {
        console.log(item);
        if (jsonObj[item].NAME || jsonObj[item].NAME == "") {
            var content = jsonObj[item].NAME;
            jsonObj[item].NAME = {};
            jsonObj[item].NAME.cn = content;
            jsonObj[item].NAME.en = content;
            jsonObj[item].NAME.tw = content;
        }

        if (jsonObj[item].DROP_DESC || jsonObj[item].DROP_DESC == "") {
            var content = jsonObj[item].DROP_DESC;
            jsonObj[item].DROP_DESC = {};
            jsonObj[item].DROP_DESC.cn = content;
            jsonObj[item].DROP_DESC.en = content;
            jsonObj[item].DROP_DESC.tw = content;
        }

        if (jsonObj[item].STEPS) {
            // for (var ri = 0; ri < jsonObj[item].STAGE.length; ++ri) {
            for(var ri in jsonObj[item].STEPS){
                if(jsonObj[item].STEPS[ri].DESC || jsonObj[item].STEPS[ri].DESC == ""){
                    var content = jsonObj[item].STEPS[ri].DESC;
                    jsonObj[item].STEPS[ri].DESC = {};
                    jsonObj[item].STEPS[ri].DESC.cn = content;
                    jsonObj[item].STEPS[ri].DESC.en = content;
                    jsonObj[item].STEPS[ri].DESC.tw = content;
                }
            }
        }
    }

    fs.writeFileSync('./trap_profile.json',JSON.stringify(jsonObj));
    
});
