"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Array2Object = void 0;
function Array2Object(array) {
    var obj = {};
    for (var i = 0, len = array.length; i < len; i++) {
        obj[array[i]] = array[++i];
    }
    return obj;
}
exports.Array2Object = Array2Object;
