
String.prototype.replaceAll = String.prototype.replaceAll || function(s1,s2){ 
    return this.replace(new RegExp(s1,"gm"),s2); 
}

var fs = require("fs")

fs.readFile('../../build/jsb-default/src/project.js.map', function(err, data) {
    // 读取文件失败/错误
    if (err) {
        throw err;
    }
    var t1 = data.toString().replaceAll("\\\\n", "\n");

    // 读取文件成功
    fs.writeFileSync("../../build/jsb-default/src/project.map.js", t1);
});
