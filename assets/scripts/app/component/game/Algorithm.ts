import { GRID_TYPE, TILE_TYPE,  } from "./PlayDefine";
import { Play } from "../../module/Modules";

export function scanAround(x: number, y: number, lastX, lastY, type, arr, scanArr, tiles,isPve = true) {
    let GRID = isPve ? Play.DataPve.grid : Play.DataPvp.grid;

    if (!tiles[x][y] || GRID[x][y] == GRID_TYPE.EMPTY) {
        return;
    }
    var blockComponent = tiles[x][y];
    if (blockComponent && blockComponent.isDesTroying) {
        return;
    }
    if (blockComponent.tileType !== TILE_TYPE.BLOCK) {
        return;
    }
    var isClear = false;
    if (scanArr == undefined) {
        scanArr = new Array();
    }
    // 扫描过的节点不再扫描
    if (scanArr.indexOf(x + "#" + y) == -1) {
        scanArr.push(x + "#" + y);
    } else {
        return;
    }
    // 扫描上
    if (y + 1 < tiles[0].length && lastY != (y + 1) && tiles[x][y + 1]) {
        if (tiles[x][y + 1].tileType === TILE_TYPE.BLOCK) {
            var tileComponent = tiles[x][y + 1];
            var nextNum = parseInt(tileComponent.type);
            if (nextNum == type) {
                if (arr.indexOf(x + "#" + y) == -1) {
                    arr.push(x + "#" + y);
                }
                scanAround(x, y + 1, x, y, type, arr, scanArr, tiles,isPve);
                isClear = true;
            }
        }
    }
    // 扫描下
    if (y - 1 >= 0 && lastY != (y - 1) && tiles[x][y - 1]) {
        if (tiles[x][y - 1].tileType === TILE_TYPE.BLOCK) {
            var tileComponent = tiles[x][y - 1];
            var nextNum = parseInt(tileComponent.type);
            if (nextNum == type) {
                if (arr.indexOf(x + "#" + y) == -1) {
                    arr.push(x + "#" + y);
                }
                scanAround(x, y - 1, x, y, type, arr, scanArr, tiles,isPve);
                isClear = true;
            }
        }
    }
    // 扫描左
    if (x - 1 >= 0 && lastX != (x - 1) && tiles[x - 1][y]) {
        if (tiles[x - 1][y].tileType === TILE_TYPE.BLOCK) {
            var tileComponent = tiles[x - 1][y];
            var nextNum = parseInt(tileComponent.type);
            if (nextNum == type) {
                if (arr.indexOf(x + "#" + y) == -1) {
                    arr.push(x + "#" + y);
                }
                scanAround(x - 1, y, x, y, type, arr, scanArr, tiles,isPve);
                isClear = true;
            }
        }
    }
    // 扫描右
    if (x + 1 < tiles.length && lastX != (x + 1) && tiles[x + 1][y]) {
        if (tiles[x + 1][y].tileType === TILE_TYPE.BLOCK) {
            var tileComponent = tiles[x + 1][y];
            var nextNum = parseInt(tileComponent.type);
            if (nextNum == type) {
                if (arr.indexOf(x + "#" + y) == -1) {
                    arr.push(x + "#" + y);
                }
                scanAround(x + 1, y, x, y, type, arr, scanArr, tiles,isPve);
                isClear = true;
            }
        }
    }
    // 四周都不通，但不是出发遍历点，并且数字相同，也加入到数组
    if (!isClear && (lastX != -1 && lastY != -1)) {
        if (tiles[x][y].tileType === TILE_TYPE.BLOCK) {
            var tileComponent = tiles[x][y];
            var curNum = parseInt(tileComponent.type)
            if (curNum == type) {
                if (arr.indexOf(x + "#" + y) == -1) {
                    arr.push(x + "#" + y);
                }
            }
        }
    }
}

// 可消除提示
export function checkoutMatch(tiles,isPve = true) {
    let GRID = isPve ? Play.DataPve.grid : Play.DataPvp.grid;
    var allArr = new Array();
    var scanArr = new Array();
    for (var x = 0; x < tiles.length; x++) {
        for (var y = 0; y < tiles[0].length; y++) {
            if (GRID[x][y] == 0 || !tiles[x][y]) {
                continue;
            }
            var arr = new Array();
            // var scanArr = new Array();

            if (tiles[x][y].tileType === TILE_TYPE.BLOCK) {
                var type = tiles[x][y].type;
                scanAround(x, y, -1, -1, type, arr, scanArr, tiles,isPve);

                if (arr.length > 1) {
                    allArr.push(arr);
                }
            }

        }
    }
    return allArr;
}

// 延时
export async function delay(time, cb?: Function) {
    return new Promise<any>((resolve, reject) => {
        setTimeout(function () {
            cb && cb();
            resolve();
        }, time * 1000)
    })
}

// 添加动作
export function addAction(arr, node, action) {
    arr.push({
        node: node,
        action: action
    })
}
// 播放动作序列
export async function runActions(arr) {
    return new Promise<any>((resolve, reject) => {
        let arrLength = arr.length;
        if (arrLength <= 0) {
            resolve()
        }
        while (arr.length > 0) {
            let data = arr.splice(0, 1)[0];
            data.node.runAction(cc.sequence(data.action, cc.callFunc(() => {
                arrLength--;
                if (arrLength <= 0) {
                    resolve()
                }
            })))
        }
    })
}
// 辣椒引起的抖动
export function bothSiedAct(touchX, touchY, tiles) {
    // 抖动效果
    if (tiles[touchX + 1] && tiles[touchX + 1][touchY]) {
        tiles[touchX + 1][touchY].bothSideAct(touchX);
    }
    if (tiles[touchX - 1] && tiles[touchX - 1][touchY]) {
        tiles[touchX - 1][touchY].bothSideAct(touchX);
    }
}

// 打乱数组
export function shuffleTiles(tiles, cb,isPve =true) {
    let GRID = isPve ? Play.DataPve.grid : Play.DataPvp.grid;

    var arrPos = [];
    var arrTile = [];
    if (!tiles) {
        return
    }
    for (var x = 0; x < tiles.length; ++x) {
        for (var y = 0; y < tiles[0].length; ++y) {
            if (GRID[x][y] == 0) {
                continue
            }
            if (tiles[x][y] && (tiles[x][y].tileType === TILE_TYPE.BLOCK || tiles[x][y].tileType === TILE_TYPE.BOMB || tiles[x][y].tileType === TILE_TYPE.PET)) {
                arrPos.push(x + "#" + y)
                arrTile.push(tiles[x][y])
            }
        }
    }

    let i = arrPos.length, t, j;
    while (i) {
        j = Math.floor(Math.random() * i--);
        t = arrPos[i];

        arrPos[i] = arrPos[j];
        arrPos[j] = t;
    }

    while (arrPos.length > 0) {
        let item = arrPos.splice(0, 1)[0];
        let tile = arrTile.splice(0, 1)[0];
        let tileX = Number(item.split("#")[0]);
        let tileY = Number(item.split("#")[1]);
        tiles[tileX][tileY] = tile;

        tile.moveTo(tileX, tileY, null,null, false);
    }

    cb && cb();
}

// 背景颜色
export function tileBgEffect(game,type, x, y, time) {
    if (!(game.tileBgs[x] && game.tileBgs[x][y])) {
        return
    }
    if(game.tileBgs[x][y].hadAction){
        return;
    }
    if (0 == type) {
        game.tileBgs[x][y].getChildByName('sprLight').stopAllActions();
        game.tileBgs[x][y].getChildByName('sprLight').opacity = 200;
        game.unschedule(game.tileBgs[x][y].cb);
        game.tileBgs[x][y].cb = () => {
            game.tileBgs[x][y].getChildByName('sprLight').runAction(cc.fadeOut(time));
        }
        game.scheduleOnce(game.tileBgs[x][y].cb, 0)
    } else if (1 == type) {
        // this.tileBgs[x][y].getChildByName('sprBg').opacity = 255;
        // this.tileBgs[x][y].getChildByName('sprBg').getComponent(cc.Sprite).spriteFrame = this.spfTileBg;
    } else if (2 == type) {
        game.tileBgs[x][y].getChildByName('sprLight').stopAllActions();
        game.tileBgs[x][y].getChildByName('sprLight').opacity = 120;
        game.unschedule(game.tileBgs[x][y].cb);
        game.tileBgs[x][y].cb = () => {
            game.tileBgs[x][y].getChildByName('sprLight').runAction(cc.fadeOut(time));
        }
        game.scheduleOnce(game.tileBgs[x][y].cb, 0)
    }
}

export function randomMore(count, length, arr, cb) {
    if (count <= 0) {
        return
    }
    if (count > length) {
        return
    }
    let index = Math.floor(Math.random() * length);
    for (let i = 0; i < arr.length; ++i) {
        if (index == arr[i]) {
            this.randomMore(count, length, arr, cb);
            return;
        }
    }
    if (cb(index)) {
        this.randomMore(count, length, arr, cb);
        return;
    }
    arr.push(index);
    count--;
    if (count > 0) {
        this.randomMore(count, length, arr, cb);
    }
}