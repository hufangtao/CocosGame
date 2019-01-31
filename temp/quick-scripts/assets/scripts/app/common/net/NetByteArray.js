(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/app/common/net/NetByteArray.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '06975GWSmBDaIi8/tEr3iRx', 'NetByteArray', __filename);
// scripts/app/common/net/NetByteArray.ts

Object.defineProperty(exports, "__esModule", { value: true });
// 字段大小端定义
var Endian = /** @class */ (function () {
    function Endian() {
    }
    Endian.ENDIAN_LITTLE = "littleEndian";
    Endian.ENDIAN_BIG = "bigEndian";
    return Endian;
}());
exports.Endian = Endian;
// 字段大小端枚举
var EndianConst;
(function (EndianConst) {
    EndianConst[EndianConst["ENDIAN_LITTLE"] = 0] = "ENDIAN_LITTLE";
    EndianConst[EndianConst["ENDIAN_BIG"] = 1] = "ENDIAN_BIG";
})(EndianConst = exports.EndianConst || (exports.EndianConst = {}));
// 类型字节大小
var ByteArraySize;
(function (ByteArraySize) {
    ByteArraySize[ByteArraySize["SIZE_OF_BOOLEAN"] = 1] = "SIZE_OF_BOOLEAN";
    ByteArraySize[ByteArraySize["SIZE_OF_INT8"] = 1] = "SIZE_OF_INT8";
    ByteArraySize[ByteArraySize["SIZE_OF_INT16"] = 2] = "SIZE_OF_INT16";
    ByteArraySize[ByteArraySize["SIZE_OF_INT32"] = 4] = "SIZE_OF_INT32";
    ByteArraySize[ByteArraySize["SIZE_OF_UINT8"] = 1] = "SIZE_OF_UINT8";
    ByteArraySize[ByteArraySize["SIZE_OF_UINT16"] = 2] = "SIZE_OF_UINT16";
    ByteArraySize[ByteArraySize["SIZE_OF_UINT32"] = 4] = "SIZE_OF_UINT32";
    ByteArraySize[ByteArraySize["SIZE_OF_FLOAT32"] = 4] = "SIZE_OF_FLOAT32";
    ByteArraySize[ByteArraySize["SIZE_OF_FLOAT64"] = 8] = "SIZE_OF_FLOAT64";
})(ByteArraySize || (ByteArraySize = {}));
var ByteArray = /** @class */ (function () {
    function ByteArray(buffer, bufExtSize) {
        if (bufExtSize === void 0) { bufExtSize = 0; }
        this.bufferExtSize = 0;
        this.EOF_BYTE = -1;
        this.EOF_CODE_POINT = -1;
        if (bufExtSize < 0) {
            bufExtSize = 0;
        }
        this.bufferExtSize = bufExtSize;
        var bytes;
        var wpos = 0;
        if (buffer) {
            var arrUnit8 = void 0;
            if (buffer instanceof Uint8Array) {
                arrUnit8 = buffer;
                wpos = buffer.length;
            }
            else {
                // 获取uint8 array的视图
                arrUnit8 = new Uint8Array(buffer);
                wpos = buffer.byteLength;
            }
            // 计算bytes
            if (bufExtSize === 0) {
                bytes = new Uint8Array(wpos);
            }
            else {
                var multi = ((wpos / bufExtSize) | 0) + 1;
                bytes = new Uint8Array(bufExtSize * multi);
            }
            // 拷贝已有的数据
            bytes.set(arrUnit8);
        }
        else {
            bytes = new Uint8Array(bufExtSize);
        }
        this.writePosition = wpos;
        this.curPosition = 0;
        this.bufBytes = bytes;
        this.data = new DataView(bytes.buffer);
        this.endian = Endian.ENDIAN_BIG;
    }
    Object.defineProperty(ByteArray.prototype, "endian", {
        get: function () {
            return this.$endian === EndianConst.ENDIAN_LITTLE ? Endian.ENDIAN_LITTLE : Endian.ENDIAN_BIG;
        },
        set: function (value) {
            this.$endian = value === Endian.ENDIAN_LITTLE ? EndianConst.ENDIAN_LITTLE : EndianConst.ENDIAN_BIG;
            this.$isLittleEndian = this.$endian === EndianConst.ENDIAN_LITTLE;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "readAvailable", {
        get: function () {
            return this.writePosition - this.curPosition;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "buffer", {
        get: function () {
            return this.data.buffer.slice(0, this.writePosition);
        },
        set: function (value) {
            var wpos = value.byteLength;
            var arrUnit8 = new Uint8Array(value);
            var bufExtSize = this.bufferExtSize;
            var bytes;
            if (bufExtSize === 0) {
                bytes = new Uint8Array(wpos);
            }
            else {
                var multi = (wpos / bufExtSize | 0) + 1;
                bytes = new Uint8Array(multi * bufExtSize);
            }
            bytes.set(arrUnit8);
            this.writePosition = wpos;
            this.bufBytes = bytes;
            this.data = new DataView(bytes.buffer);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "rawBuffer", {
        get: function () {
            return this.data.buffer;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "bytes", {
        get: function () {
            return this.bufBytes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "dataView", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "bufferOffset", {
        get: function () {
            return this.data.byteOffset;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "position", {
        get: function () {
            return this.curPosition;
        },
        set: function (value) {
            this.curPosition = value;
            if (value > this.writePosition) {
                this.writePosition = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "length", {
        get: function () {
            return this.writePosition;
        },
        set: function (value) {
            this.writePosition = value;
            if (this.data.byteLength > value) {
                this.curPosition = value;
            }
            this._validateBuffer(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ByteArray.prototype, "bytesAvailable", {
        get: function () {
            return this.data.byteLength - this.curPosition;
        },
        enumerable: true,
        configurable: true
    });
    ByteArray.prototype.clear = function () {
        var buffer = new ArrayBuffer(this.bufferExtSize);
        this.data = new DataView(buffer);
        this.bufBytes = new Uint8Array(buffer);
        this.curPosition = 0;
        this.writePosition = 0;
    };
    ByteArray.prototype.validate = function (len) {
        var bl = this.bufBytes.length;
        if (bl > 0 && this.curPosition + len <= bl) {
            return true;
        }
        else {
            DyGame.$error(1);
        }
    };
    ByteArray.prototype.readBoolean = function () {
        if (this.validate(ByteArraySize.SIZE_OF_BOOLEAN)) {
            return !!this.bufBytes[this.position++];
        }
    };
    ByteArray.prototype.readByte = function () {
        if (this.validate(ByteArraySize.SIZE_OF_INT8)) {
            return this.data.getInt8(this.position++);
        }
    };
    // 读取字节内容 并写入到目标缓存
    ByteArray.prototype.readBytes = function (dstBuffer, offset, length) {
        if (offset === void 0) { offset = 0; }
        if (length === void 0) { length = 0; }
        if (!dstBuffer) {
            return;
        }
        var pos = this.curPosition;
        var available = this.writePosition - pos;
        if (available < 0) {
            DyGame.$error(1);
            return;
        }
        if (length === 0) {
            length = available;
        }
        else if (length > available) {
            DyGame.$error(1);
            return;
        }
        var position = dstBuffer.curPosition;
        dstBuffer.curPosition = 0; // 此处设为0 是想dstBuffer的长度就是offset + length
        dstBuffer.validateBuffer(offset + length);
        dstBuffer.curPosition = position;
        dstBuffer.bufBytes.set(this.bufBytes.subarray(pos, pos + length), offset); // 拷贝字节
        this.position += length; // 修改读取游标
    };
    ByteArray.prototype.readDouble = function () {
        var low = this.readUnsignedInt();
        var high = this.readUnsignedInt();
        return low * 0x100000000 + high;
    };
    ByteArray.prototype.readFloat = function () {
        if (this.validate(ByteArraySize.SIZE_OF_FLOAT32)) {
            var value = this.data.getFloat32(this.curPosition, this.$isLittleEndian);
            this.position += ByteArraySize.SIZE_OF_FLOAT32;
            return value;
        }
    };
    ByteArray.prototype.readInt = function () {
        if (this.validate(ByteArraySize.SIZE_OF_INT32)) {
            var value = this.data.getInt32(this.curPosition, this.$isLittleEndian);
            this.position += ByteArraySize.SIZE_OF_INT32;
            return value;
        }
    };
    ByteArray.prototype.readShort = function () {
        if (this.validate(ByteArraySize.SIZE_OF_INT16)) {
            var value = this.data.getInt16(this.curPosition, this.$isLittleEndian);
            this.position += ByteArraySize.SIZE_OF_INT16;
            return value;
        }
    };
    ByteArray.prototype.readUnsignedByte = function () {
        if (this.validate(ByteArraySize.SIZE_OF_UINT8)) {
            return this.bufBytes[this.position++];
        }
    };
    ByteArray.prototype.readUnsignedInt = function () {
        if (this.validate(ByteArraySize.SIZE_OF_UINT32)) {
            var value = this.data.getUint32(this.position, this.$isLittleEndian);
            this.position += ByteArraySize.SIZE_OF_UINT32;
            return value;
        }
    };
    ByteArray.prototype.readUnsignedShort = function () {
        if (this.validate(ByteArraySize.SIZE_OF_UINT16)) {
            var value = this.data.getUint16(this.position, this.$isLittleEndian);
            this.position += ByteArraySize.SIZE_OF_UINT16;
            return value;
        }
    };
    ByteArray.prototype.readUTF = function () {
        var length = this.readUnsignedShort();
        if (length > 0) {
            return this.readUTFBytes(length);
        }
        else {
            return "";
        }
    };
    ByteArray.prototype.readUTFBytes = function (length) {
        if (!this.validate(length)) {
            return;
        }
        var data = this.data;
        var bytes = new Uint8Array(data.buffer, data.byteOffset + this.curPosition, length);
        this.position += length;
        return this.decodeUTF8(bytes);
    };
    ByteArray.prototype.writeBoolean = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_BOOLEAN);
        this.bufBytes[this.position++] = +value;
    };
    ByteArray.prototype.writeByte = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_INT8);
        this.bufBytes[this.position++] = value & 0xff;
    };
    ByteArray.prototype.writeBytes = function (bytesArr, offset, length) {
        var writeLength;
        if (offset < 0) {
            return;
        }
        if (length < 0) {
            return;
        }
        if (length === 0) {
            writeLength = bytesArr.length - offset;
        }
        else {
            writeLength = Math.min(bytesArr.length - offset, length);
        }
        if (writeLength > 0) {
            this.validateBuffer(writeLength);
            this.bufBytes.set(bytesArr.bufBytes.subarray(offset, writeLength), this.curPosition);
            this.position = this.curPosition + writeLength;
        }
    };
    ByteArray.prototype.writeDouble = function (value) {
        var low = Math.floor(value / 0x100000000);
        this.writeUnsignedInt(low);
        this.writeUnsignedInt(((value & 0xffffffff) >>> 0));
    };
    ByteArray.prototype.writeFloat = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_FLOAT32);
        this.data.setFloat32(this.curPosition, value, this.$isLittleEndian);
        this.position += ByteArraySize.SIZE_OF_FLOAT32;
    };
    ByteArray.prototype.writeInt = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_INT32);
        this.data.setInt32(this.curPosition, value, this.$isLittleEndian);
        this.position += ByteArraySize.SIZE_OF_INT32;
    };
    ByteArray.prototype.writeShort = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_INT16);
        this.data.setInt16(this.curPosition, value, this.$isLittleEndian);
        this.position += ByteArraySize.SIZE_OF_INT16;
    };
    ByteArray.prototype.writeUnsignedInt = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_UINT32);
        this.data.setUint32(this.curPosition, value, this.$isLittleEndian);
        this.position += ByteArraySize.SIZE_OF_UINT32;
    };
    ByteArray.prototype.writeUnsignedShort = function (value) {
        this.validateBuffer(ByteArraySize.SIZE_OF_UINT16);
        this.data.setUint16(this.curPosition, value, this.$isLittleEndian);
        this.position += ByteArraySize.SIZE_OF_UINT16;
    };
    ByteArray.prototype.writeUTF = function (value) {
        var utf8Bytes = this.encodeUTF8(value);
        var length = utf8Bytes.length;
        this.validateBuffer(ByteArraySize.SIZE_OF_UINT16 + length);
        this.data.setUint16(this.curPosition, length, this.$isLittleEndian);
        this.position += ByteArraySize.SIZE_OF_UINT16;
        this._writeUint8Array(utf8Bytes, false);
    };
    ByteArray.prototype.writeUTFBytes = function (value) {
        this._writeUint8Array(this.encodeUTF8(value));
    };
    ByteArray.prototype.toString = function () {
        return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
    };
    ByteArray.prototype._writeUint8Array = function (bytes, validateBuffer) {
        if (validateBuffer === void 0) { validateBuffer = true; }
        var pos = this.curPosition;
        var npos = pos + bytes.length;
        if (validateBuffer) {
            this.validateBuffer(npos);
        }
        this.bytes.set(bytes, pos);
        this.position = npos;
    };
    ByteArray.prototype.validateBuffer = function (len) {
        // this.writePosition = len > this.writePosition ? len : this.writePosition;
        this.writePosition = Math.max(this.writePosition, len);
        len += this.curPosition;
        this._validateBuffer(len);
    };
    ByteArray.prototype._validateBuffer = function (value) {
        if (this.data.byteLength < value) {
            var bufExt = this.bufferExtSize;
            var tmp = void 0;
            if (bufExt === 0) {
                tmp = new Uint8Array(value);
            }
            else {
                var nLen = (((value / bufExt) >> 0) + 1) * bufExt;
                tmp = new Uint8Array(nLen);
            }
            tmp.set(this.bufBytes);
            this.bufBytes = tmp;
            this.data = new DataView(tmp.buffer);
        }
    };
    ByteArray.prototype.inRange = function (a, min, max) {
        return min <= a && a <= max;
    };
    ByteArray.prototype.div = function (n, d) {
        return Math.floor(n / d);
    };
    ByteArray.prototype.encoderError = function (codePoint) {
        DyGame.$error(1026, codePoint);
    };
    ByteArray.prototype.decoderError = function (fatal, optCodePoint) {
        if (fatal) {
            DyGame.$error(1);
        }
        return optCodePoint || 0xFFFD;
    };
    ByteArray.prototype.encodeUTF8 = function (str) {
        var pos = 0;
        var codePoints = this.stringToCodePoints(str);
        var outputBytes = [];
        while (codePoints.length > pos) {
            var codePoint = codePoints[pos++];
            if (this.inRange(codePoint, 0xD800, 0xDFFF)) {
                this.encoderError(codePoint);
            }
            else if (this.inRange(codePoint, 0x0000, 0x007f)) {
                outputBytes.push(codePoint);
            }
            else {
                var count = void 0;
                var offset = void 0;
                if (this.inRange(codePoint, 0x0080, 0x07FF)) {
                    count = 1;
                    offset = 0xC0;
                }
                else if (this.inRange(codePoint, 0x0800, 0xFFFF)) {
                    count = 2;
                    offset = 0xE0;
                }
                else if (this.inRange(codePoint, 0x10000, 0x10FFFF)) {
                    count = 3;
                    offset = 0xF0;
                }
                outputBytes.push(this.div(codePoint, Math.pow(64, count)) + offset);
                while (count > 0) {
                    var temp = this.div(codePoint, Math.pow(64, count - 1));
                    outputBytes.push(0x80 + (temp % 64));
                    count -= 1;
                }
            }
        }
        return new Uint8Array(outputBytes);
    };
    ByteArray.prototype.decodeUTF8 = function (data) {
        var fatal = false;
        var pos = 0;
        var result = "";
        var codePoint;
        var utf8CodePoint = 0;
        var utf8BytesNeeded = 0;
        var utf8BytesSeen = 0;
        var utf8LowerBoundary = 0;
        while (data.length > pos) {
            var curByte = data[pos++];
            if (curByte === this.EOF_BYTE) {
                if (utf8BytesNeeded !== 0) {
                    codePoint = this.decoderError(fatal);
                }
                else {
                    codePoint = this.EOF_CODE_POINT;
                }
            }
            else {
                if (utf8BytesNeeded === 0) {
                    if (this.inRange(curByte, 0x00, 0x7F)) {
                        codePoint = curByte;
                    }
                    else {
                        if (this.inRange(curByte, 0xC2, 0xDF)) {
                            utf8BytesNeeded = 1;
                            utf8LowerBoundary = 0x80;
                            utf8CodePoint = curByte - 0xC0;
                        }
                        else if (this.inRange(curByte, 0xE0, 0xEF)) {
                            utf8BytesNeeded = 2;
                            utf8LowerBoundary = 0x800;
                            utf8CodePoint = curByte - 0xE0;
                        }
                        else if (this.inRange(curByte, 0xF0, 0xF4)) {
                            utf8BytesNeeded = 3;
                            utf8LowerBoundary = 0x10000;
                            utf8CodePoint = curByte - 0xF0;
                        }
                        else {
                            this.decoderError(fatal);
                        }
                        utf8CodePoint = utf8CodePoint * Math.pow(64, utf8BytesNeeded);
                        codePoint = null;
                    }
                }
                else if (!this.inRange(curByte, 0x80, 0xBF)) {
                    utf8CodePoint = 0;
                    utf8BytesNeeded = 0;
                    utf8BytesSeen = 0;
                    utf8LowerBoundary = 0;
                    pos--;
                    codePoint = this.decoderError(fatal, curByte);
                }
                else {
                    utf8BytesSeen += 1;
                    utf8CodePoint = utf8CodePoint + (curByte - 0x80) * Math.pow(64, utf8BytesNeeded - utf8BytesSeen);
                    if (utf8BytesSeen !== utf8BytesNeeded) {
                        codePoint = null;
                    }
                    else {
                        var cp = utf8CodePoint;
                        var lowerBoundary = utf8LowerBoundary;
                        utf8CodePoint = 0;
                        utf8BytesNeeded = 0;
                        utf8BytesSeen = 0;
                        utf8LowerBoundary = 0;
                        if (this.inRange(cp, lowerBoundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
                            codePoint = cp;
                        }
                        else {
                            codePoint = this.decoderError(fatal, curByte);
                        }
                    }
                }
            }
            // Decode string
            if (codePoint !== null && codePoint !== this.EOF_CODE_POINT) {
                if (codePoint <= 0xFFFF) {
                    if (codePoint > 0) {
                        result += String.fromCharCode(codePoint);
                    }
                }
                else {
                    codePoint -= 0x10000;
                    result += String.fromCharCode(0xD800 + ((codePoint >> 10) & 0x3ff));
                    result += String.fromCharCode(0xDC00 + (codePoint & 0x3ff));
                }
            }
        }
        return result;
    };
    ByteArray.prototype.stringToCodePoints = function (content) {
        /** @type {Array.<number>} */
        var cps = [];
        // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
        var i = 0;
        var n = content.length;
        while (i < content.length) {
            var c = content.charCodeAt(i);
            if (!this.inRange(c, 0xD800, 0xDFFF)) {
                cps.push(c);
            }
            else if (this.inRange(c, 0xDC00, 0xDFFF)) {
                cps.push(0xFFFD);
            }
            else { // (inRange(c, 0xD800, 0xDBFF))
                if (i === n - 1) {
                    cps.push(0xFFFD);
                }
                else {
                    var d = content.charCodeAt(i + 1);
                    if (this.inRange(d, 0xDC00, 0xDFFF)) {
                        var a = c & 0x3FF;
                        var b = d & 0x3FF;
                        i += 1;
                        cps.push(0x10000 + (a << 10) + b);
                    }
                    else {
                        cps.push(0xFFFD);
                    }
                }
            }
            i += 1;
        }
        return cps;
    };
    return ByteArray;
}());
exports.ByteArray = ByteArray;

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=NetByteArray.js.map
        