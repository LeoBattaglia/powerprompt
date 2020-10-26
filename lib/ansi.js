"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = exports.setPosition = exports.savePosition = exports.setColumn = exports.right = exports.restorePosition = exports.reset = exports.previousLine = exports.nextLine = exports.log = exports.left = exports.down = exports.clearScreenToEnd = exports.clearScreenToBegin = exports.clearLineToEnd = exports.clearLineToBegin = exports.clearEntireScreen = exports.clearEntireLine = exports.beginOfLine = void 0;
const config = require("./config.json");
function beginOfLine(num) {
    left(1000);
    right(num);
}
exports.beginOfLine = beginOfLine;
function clearEntireLine() {
    log(config.ansi.clearEntireLine);
}
exports.clearEntireLine = clearEntireLine;
function clearEntireScreen() {
    log(config.ansi.clearEntireScreen);
}
exports.clearEntireScreen = clearEntireScreen;
function clearLineToBegin() {
    log(config.ansi.clearLineToBegin);
}
exports.clearLineToBegin = clearLineToBegin;
function clearLineToEnd() {
    log(config.ansi.clearLineToEnd);
}
exports.clearLineToEnd = clearLineToEnd;
function clearScreenToBegin() {
    log(config.ansi.clearScreenToBegin);
}
exports.clearScreenToBegin = clearScreenToBegin;
function clearScreenToEnd() {
    log(config.ansi.clearScreenToEnd);
}
exports.clearScreenToEnd = clearScreenToEnd;
function down(num) {
    log(config.ansi.down.replace("{n}", num));
}
exports.down = down;
function left(num) {
    log(config.ansi.left.replace("{n}", num));
}
exports.left = left;
function log(ansi) {
    process.stdout.write(ansi);
}
exports.log = log;
function nextLine(num) {
    log(config.ansi.nextLine.replace("{n}", num));
}
exports.nextLine = nextLine;
function previousLine(num) {
    log(config.ansi.previousLine.replace("{n}", num));
}
exports.previousLine = previousLine;
function reset() {
    log(config.ansi.reset);
}
exports.reset = reset;
function restorePosition() {
    log(config.ansi.restorePosition);
}
exports.restorePosition = restorePosition;
function right(num) {
    log(config.ansi.right.replace("{n}", num));
}
exports.right = right;
function setColumn(num) {
    log(config.ansi.setColumn.replace("{n}", num));
}
exports.setColumn = setColumn;
function savePosition() {
    log(config.ansi.savePosition);
}
exports.savePosition = savePosition;
function setPosition(rows, cols) {
    let str = config.ansi.setPosition.replace("{n}", rows);
    log(str.replace("{m}", cols));
}
exports.setPosition = setPosition;
function up(num) {
    log(config.ansi.up.replace("{n}", num));
}
exports.up = up;
//# sourceMappingURL=ansi.js.map