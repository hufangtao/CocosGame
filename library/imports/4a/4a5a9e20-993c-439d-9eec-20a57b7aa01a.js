"use strict";
cc._RF.push(module, '4a5a94gmTxDnZ7sIKV7eqAa', 'FrameManager');
// scripts/app/component/game/pve/FrameManager.ts

Object.defineProperty(exports, "__esModule", { value: true });
var Modules_1 = require("../../../module/Modules");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var FrameManager = /** @class */ (function (_super) {
    __extends(FrameManager, _super);
    function FrameManager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pfbExterior = null;
        _this.pfbInner = null;
        _this.panelFrame = null;
        _this.exterior = [];
        _this.inner = [];
        _this.frames = [];
        return _this;
    }
    FrameManager.prototype.onLoad = function () {
        // this.initFrame();
    };
    FrameManager.prototype.start = function () {
    };
    // 初始化边框
    FrameManager.prototype.initFrame = function () {
        this.addFrame();
        this.connectLine();
    };
    FrameManager.prototype.connectLine = function () {
        // 横向向右连
        // 纵向向下连
        for (var x = 0; x < 8; ++x) {
            this.searchColLeftStart(x, 0);
            this.searchColRightStart(x, 0);
        }
        for (var y = 0; y < 9; ++y) {
            this.searchRowDownStart(0, y);
            this.searchRowUpStart(0, y);
        }
    };
    FrameManager.prototype.searchRowUpStart = function (startX, startY) {
        for (var x = startX; x < 8; ++x) {
            if (startY - 1 >= 0 && Modules_1.Play.DataPve.grid[x][startY - 1] == 0) {
                if (this.exterior[x][startY - 1].up_left == 1) {
                    this.searchRowUpEnd(x, startY, true);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[x][startY] == 1) {
                if (this.inner[x][startY].down_left == 1) {
                    this.searchRowUpEnd(x, startY, false);
                    break;
                }
            }
        }
    };
    //
    FrameManager.prototype.searchRowUpEnd = function (startX, startY, isExterior) {
        for (var x = startX; x < 8; ++x) {
            if (startY - 1 >= 0 && Modules_1.Play.DataPve.grid[x][startY - 1] == 0) {
                if (this.exterior[x][startY - 1].up_right == 1) {
                    var distance = x - startX;
                    if (isExterior) {
                        this.frames[startX][startY - 1].up_left.width = 80 * (distance + 1) - 40;
                    }
                    else {
                        this.frames[startX][startY].down_left.height = 80 * (distance + 1) - 25;
                    }
                    this.searchRowUpStart(x + 1, startY);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[x][startY] == 1) {
                if (this.inner[x][startY].down_right == 1) {
                    var distance = x - startX;
                    if (isExterior) {
                        this.frames[startX][startY - 1].up_left.width = 80 * (distance + 1) - 25;
                    }
                    else {
                        this.frames[startX][startY].down_left.height = 80 * (distance + 1) - 10;
                    }
                    this.searchRowUpStart(x + 1, startY);
                    return;
                }
            }
        }
    };
    FrameManager.prototype.searchRowDownStart = function (startX, startY) {
        for (var x = startX; x < 8; ++x) {
            if (startY + 1 < 9 && Modules_1.Play.DataPve.grid[x][startY + 1] == 0) {
                if (this.exterior[x][startY + 1].down_left == 1) {
                    this.searchRowDownEnd(x, startY, true);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[x][startY] == 1) {
                if (this.inner[x][startY].up_left == 1) {
                    this.searchRowDownEnd(x, startY, false);
                    break;
                }
            }
        }
    };
    FrameManager.prototype.searchRowDownEnd = function (startX, startY, isExterior) {
        for (var x = startX; x < 8; ++x) {
            if (startY + 1 < 9 && Modules_1.Play.DataPve.grid[x][startY + 1] == 0) {
                if (this.exterior[x][startY + 1].down_right == 1) {
                    var distance = x - startX;
                    if (isExterior) {
                        this.frames[startX][startY + 1].down_left.height = 80 * (distance + 1) - 40;
                    }
                    else {
                        this.frames[startX][startY].up_left.height = 80 * (distance + 1) - 26;
                    }
                    this.searchRowDownStart(x + 1, startY);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[x][startY] == 1) {
                if (this.inner[x][startY].up_right == 1) {
                    var distance = x - startX;
                    if (isExterior) {
                        this.frames[startX][startY + 1].down_left.height = 80 * (distance + 1) - 26;
                    }
                    else {
                        this.frames[startX][startY].up_left.height = 80 * (distance + 1) - 10;
                    }
                    this.searchRowDownStart(x + 1, startY);
                    return;
                }
            }
        }
    };
    FrameManager.prototype.searchColLeftStart = function (startX, startY) {
        for (var y = startY; y < 9; ++y) {
            if (startX - 1 >= 0 && Modules_1.Play.DataPve.grid[startX - 1][y] == 0) {
                if (this.exterior[startX - 1][y].down_right == 1) {
                    this.searchColLeftEnd(startX, y, true);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[startX][y] == 1) {
                if (this.inner[startX][y].down_left == 1) {
                    this.searchColLeftEnd(startX, y, false);
                    break;
                }
            }
        }
    };
    FrameManager.prototype.searchColLeftEnd = function (startX, startY, isExterior) {
        for (var y = startY; y < 9; ++y) {
            if (startX - 1 >= 0 && Modules_1.Play.DataPve.grid[startX - 1][y] == 0) {
                if (this.exterior[startX - 1][y].up_right == 1) {
                    var distance = y - startY;
                    if (isExterior) {
                        this.frames[startX - 1][startY].down_right.width = 80 * (distance + 1) - 39;
                    }
                    else {
                        this.frames[startX][startY].down_left.width = 80 * (distance + 1) - 25;
                    }
                    this.searchColLeftStart(startX, y + 1);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[startX][y] == 1) {
                if (this.inner[startX][y].up_left == 1) {
                    var distance = y - startY;
                    if (isExterior) {
                        this.frames[startX - 1][startY].down_right.width = 80 * (distance + 1) - 25;
                    }
                    else {
                        this.frames[startX][startY].down_left.width = 80 * (distance + 1) - 10;
                    }
                    this.searchColLeftStart(startX, y + 1);
                    break;
                }
            }
        }
    };
    FrameManager.prototype.searchColRightEnd = function (startX, startY, isExterior) {
        for (var y = startY; y < 9; ++y) {
            if (startX + 1 < 8 && Modules_1.Play.DataPve.grid[startX + 1][y] == 0) {
                if (this.exterior[startX + 1][y].up_left == 1) {
                    var distance = y - startY;
                    if (isExterior) {
                        this.frames[startX + 1][startY].down_left.width = 80 * (distance + 1) - 39;
                    }
                    else {
                        this.frames[startX][startY].down_right.height = 80 * (distance + 1) - 26;
                    }
                    this.searchColRightStart(startX, y + 1);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[startX][y] == 1) {
                if (this.inner[startX][y].up_right == 1) {
                    var distance = y - startY;
                    if (isExterior) {
                        this.frames[startX + 1][startY].down_left.width = 80 * (distance + 1) - 24;
                    }
                    else {
                        this.frames[startX][startY].down_right.height = 80 * (distance + 1) - 9;
                    }
                    this.searchColRightStart(startX, y + 1);
                    break;
                }
            }
        }
    };
    FrameManager.prototype.searchColRightStart = function (startX, startY) {
        for (var y = startY; y < 9; ++y) {
            if (startX + 1 < 8 && Modules_1.Play.DataPve.grid[startX + 1][y] == 0) {
                if (this.exterior[startX + 1][y].down_left == 1) {
                    this.searchColRightEnd(startX, y, true);
                    break;
                }
            }
            if (Modules_1.Play.DataPve.grid[startX][y] == 1) {
                if (this.inner[startX][y].down_right == 1) {
                    this.searchColRightEnd(startX, y, false);
                    break;
                }
            }
        }
    };
    FrameManager.prototype.setInner = function (x, y, type) {
        var nodFrame = null;
        this.frames[x][y] = this.frames[x][y] || {
            up_left: null,
            up_right: null,
            down_right: null,
            down_left: null
        };
        var startX = -3.5 * 80;
        var startY = 0.5 * 80;
        if (type == 1) {
            nodFrame = cc.instantiate(this.pfbInner);
            nodFrame.scaleX = -1;
            nodFrame.rotation = 270;
            nodFrame.setPosition(80 * x + startX - 54, 80 * y + startY + 55);
            this.frames[x][y].up_left = nodFrame;
        }
        else if (type == 2) {
            nodFrame = cc.instantiate(this.pfbInner);
            nodFrame.rotation = 90;
            nodFrame.setPosition(80 * x + startX + 55, 80 * y + startY + 55);
            this.frames[x][y].up_right = nodFrame;
        }
        else if (type == 3) {
            nodFrame = cc.instantiate(this.pfbInner);
            nodFrame.rotation = 180;
            nodFrame.setPosition(80 * x + startX + 55, 80 * y + startY - 55);
            this.frames[x][y].down_right = nodFrame;
        }
        else if (type == 4) {
            nodFrame = cc.instantiate(this.pfbInner);
            nodFrame.rotation = 270;
            nodFrame.setPosition(80 * x + startX - 54, 80 * y + startY - 55);
            this.frames[x][y].down_left = nodFrame;
        }
        if (nodFrame) {
            nodFrame.parent = this.panelFrame;
        }
    };
    FrameManager.prototype.setExterior = function (x, y, type) {
        var nodFrame = null;
        this.frames[x][y] = this.frames[x][y] || {
            up_left: null,
            up_right: null,
            down_right: null,
            down_left: null
        };
        var startX = -3.5 * 80;
        var startY = 0.5 * 80;
        if (type == 1) {
            nodFrame = cc.instantiate(this.pfbExterior);
            // nodFrame.scaleX = -1;
            // nodFrame.rotation = 270;
            nodFrame.setPosition(80 * x + startX - 40, 80 * y + startY + 39);
            this.frames[x][y].up_left = nodFrame;
        }
        else if (type == 2) {
            nodFrame = cc.instantiate(this.pfbExterior);
            nodFrame.rotation = 90;
            nodFrame.setPosition(80 * x + startX + 40, 80 * y + startY + 40);
            this.frames[x][y].up_right = nodFrame;
        }
        else if (type == 3) {
            nodFrame = cc.instantiate(this.pfbExterior);
            nodFrame.scaleX = -1;
            nodFrame.rotation = 90;
            nodFrame.setPosition(80 * x + startX + 40, 80 * y + startY - 40);
            this.frames[x][y].down_right = nodFrame;
        }
        else if (type == 4) {
            nodFrame = cc.instantiate(this.pfbExterior);
            nodFrame.rotation = 270;
            nodFrame.setPosition(80 * x + startX - 39, 80 * y + startY - 40);
            this.frames[x][y].down_left = nodFrame;
        }
        if (nodFrame) {
            nodFrame.parent = this.panelFrame;
        }
    };
    // 添加边角frame
    FrameManager.prototype.addFrame = function () {
        this.frames = [];
        this.inner = []; // 内角
        this.exterior = [];
        for (var x = 0; x < 8; ++x) {
            this.frames[x] = [];
            this.inner[x] = [];
            this.exterior[x] = [];
            for (var y = 0; y < 9; ++y) {
                if (Modules_1.Play.DataPve.grid[x][y] == 0) {
                    // this.inner[x][y] = null;
                    this.exterior[x][y] = {
                        up_left: 0,
                        up_right: 0,
                        down_right: 0,
                        down_left: 0
                    };
                    // 判断外角
                    if (x - 1 >= 0 && y + 1 < 9 && Modules_1.Play.DataPve.grid[x - 1][y] == 1 && Modules_1.Play.DataPve.grid[x][y + 1] == 1) {
                        // 1
                        this.exterior[x][y].up_left = 1;
                        this.setExterior(x, y, 1);
                    }
                    if (x + 1 < 8 && y + 1 < 9 && Modules_1.Play.DataPve.grid[x + 1][y] == 1 && Modules_1.Play.DataPve.grid[x][y + 1] == 1) {
                        // 2
                        this.exterior[x][y].up_right = 1;
                        this.setExterior(x, y, 2);
                    }
                    if (x + 1 < 8 && y - 1 >= 0 && Modules_1.Play.DataPve.grid[x + 1][y] == 1 && Modules_1.Play.DataPve.grid[x][y - 1] == 1) {
                        // 3
                        this.exterior[x][y].down_right = 1;
                        this.setExterior(x, y, 3);
                    }
                    if (x - 1 >= 0 && y - 1 >= 0 && Modules_1.Play.DataPve.grid[x - 1][y] == 1 && Modules_1.Play.DataPve.grid[x][y - 1] == 1) {
                        // 4
                        this.exterior[x][y].down_left = 1;
                        this.setExterior(x, y, 4);
                    }
                }
                else {
                    // 判断内角
                    this.inner[x][y] = {
                        up_left: 0,
                        up_right: 0,
                        down_right: 0,
                        down_left: 0
                    };
                    // 1
                    if (x - 1 < 0) {
                        if (y + 1 >= 9) {
                            this.inner[x][y].up_left = 1;
                            this.setInner(x, y, 1);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y + 1] == 0) {
                            this.inner[x][y].up_left = 1;
                            this.setInner(x, y, 1);
                        }
                    }
                    else if (Modules_1.Play.DataPve.grid[x - 1][y] == 0) {
                        if (y + 1 >= 9) {
                            this.inner[x][y].up_left = 1;
                            this.setInner(x, y, 1);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y + 1] == 0 && Modules_1.Play.DataPve.grid[x - 1][y + 1] == 0) {
                            this.inner[x][y].up_left = 1;
                            this.setInner(x, y, 1);
                        }
                    }
                    // 2
                    if (x + 1 >= 8) {
                        if (y + 1 >= 9) {
                            this.inner[x][y].up_right = 1;
                            this.setInner(x, y, 2);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y + 1] == 0) {
                            this.inner[x][y].up_right = 1;
                            this.setInner(x, y, 2);
                        }
                    }
                    else if (Modules_1.Play.DataPve.grid[x + 1][y] == 0) {
                        if (y + 1 >= 9) {
                            this.inner[x][y].up_right = 1;
                            this.setInner(x, y, 2);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y + 1] == 0 && Modules_1.Play.DataPve.grid[x + 1][y + 1] == 0) {
                            this.inner[x][y].up_right = 1;
                            this.setInner(x, y, 2);
                        }
                    }
                    // 3
                    if (x + 1 >= 8) {
                        if (y - 1 < 0) {
                            this.inner[x][y].down_right = 1;
                            this.setInner(x, y, 3);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y - 1] == 0) {
                            this.inner[x][y].down_right = 1;
                            this.setInner(x, y, 3);
                        }
                    }
                    else if (Modules_1.Play.DataPve.grid[x + 1][y] == 0) {
                        if (y - 1 < 0) {
                            this.inner[x][y].down_right = 1;
                            this.setInner(x, y, 3);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y - 1] == 0 && Modules_1.Play.DataPve.grid[x + 1][y - 1] == 0) {
                            this.inner[x][y].down_right = 1;
                            this.setInner(x, y, 3);
                        }
                    }
                    // 4
                    if (x - 1 < 0) {
                        if (y - 1 < 0) {
                            this.inner[x][y].down_left = 1;
                            this.setInner(x, y, 4);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y - 1] == 0) {
                            this.inner[x][y].down_left = 1;
                            this.setInner(x, y, 4);
                        }
                    }
                    else if (Modules_1.Play.DataPve.grid[x - 1][y] == 0) {
                        if (y - 1 < 0) {
                            this.inner[x][y].down_left = 1;
                            this.setInner(x, y, 4);
                        }
                        else if (Modules_1.Play.DataPve.grid[x][y - 1] == 0 && Modules_1.Play.DataPve.grid[x - 1][y - 1] == 0) {
                            this.inner[x][y].down_left = 1;
                            this.setInner(x, y, 4);
                        }
                    }
                }
            }
        }
    };
    __decorate([
        property(cc.Prefab)
    ], FrameManager.prototype, "pfbExterior", void 0);
    __decorate([
        property(cc.Prefab)
    ], FrameManager.prototype, "pfbInner", void 0);
    __decorate([
        property(cc.Node)
    ], FrameManager.prototype, "panelFrame", void 0);
    FrameManager = __decorate([
        ccclass
    ], FrameManager);
    return FrameManager;
}(cc.Component));
exports.default = FrameManager;

cc._RF.pop();