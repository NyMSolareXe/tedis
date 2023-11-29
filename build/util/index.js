"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.sleep = void 0;
function sleep(seconds) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
        }, seconds * 1000);
    });
}
exports.sleep = sleep;
exports.config = {
    port: 6379,
    host: "127.0.0.1",
    password: "tedis_love_you",
};
