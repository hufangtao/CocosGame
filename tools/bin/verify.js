var fs = require("fs");
var md5 = require("./md5");
var crypto = require('crypto');

var jsonObjects = [];

/**
 * md5加密计算
 * @param {*} jsonObjects 
 * @param {*} salt 
 */
var md5sum = function (jsonObjects, salt) {
    // var md5 = crypto.createHash("md5");
    var str = salt;
    // md5.update(salt);
    for (var key in jsonObjects) {
        // md5.update(JSON.stringify(jsonObjects[key]));
        str += JSON.stringify(jsonObjects[key]);
        // console.log(md5.hex_md5(str));
    }
    // str = md5.digest("hex");
    return md5.hex_md5(str);
}

/**
 * 创建加密文件并写入
 * @param {*} jsonObjects JSON对象 
 * @param {*} salt 密钥
 * @param {*} path 写入路径
 */
var createVerifyFile = function (jsonObjects, salt, path) {
    var md5 = md5sum(jsonObjects, salt);
    var json = JSON.parse('{"md5": 5}');
    json["md5"] = md5;
    console.log(JSON.stringify(json));
    fs.writeFile(path, JSON.stringify(json), function (err) {
            if (err) {
                console.log("write error.");
            } else {
                console.log("has finished.");
            }
        });
}

/**
 * 获取JsonObjects
 * @param {*} path json文件夹路径 
 */
var getJsonObjects = function (path) {
    var jsonObjects = [];
    var files = fs.readdirSync(path);
    files.sort();
    for (var filename of files) {
        if (filename.endsWith(".json") && filename != "verify.json") {
            var str = fs.readFileSync(path + filename);
            console.log(filename);
            jsonObjects.push(JSON.parse(str));
            // fileList.push(filename);
        }
    }
    // console.log(fileList);
    return jsonObjects;
}

var arguments = process.argv.splice(2);
console.log(arguments);
// var path = "D:\\Workspace\\DYGameH\\settings\\"
var path = arguments[0];
var salt = arguments[1];
var jsonObjects = getJsonObjects(path);
// node ./bin/verify.js ../assets/resources/Profiles/ hello_world ../assets/resources/Profiles/verify.json
createVerifyFile(jsonObjects, salt, arguments[2]);