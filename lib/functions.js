"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiSelectNextLine = exports.selectNextLine = exports.removeTabsAndBreaks = exports.printTitle = exports.printSelected = exports.printOptions = exports.printOption = exports.printLine = exports.printInput = exports.printError = exports.printCommand = exports.printChoose = exports.print = exports.log = exports.getChoose = exports.closeStdin = void 0;
const ansi = require("./ansi");
const config = require("./config.json");
const line = fillString("-", "-", config.terminal.length);
function closeStdin() {
    process.stdin.destroy();
}
exports.closeStdin = closeStdin;
function fillString(str, char, length) {
    if (char.length > 0) {
        while (str.length <= length) {
            str += char;
        }
    }
    return str;
}
function getChoose(str, charTrue, charFalse) {
    switch (str.toLowerCase()) {
        case charTrue:
            return true;
        case charFalse:
            return false;
        default:
            return undefined;
    }
}
exports.getChoose = getChoose;
function log(output, color, newLine) {
    process.stdout.write(color + output + config.ansi.reset);
    if (newLine) {
        process.stdout.write("\n");
    }
}
exports.log = log;
function logCommand(output) {
    log(output, config.colors.command, true);
}
function logDefault(output) {
    log(output, config.colors.default, true);
}
function logError(output) {
    log(output, config.colors.error, true);
}
function logInput(output) {
    log(output, config.colors.input, true);
}
function logOption(output) {
    log(output, config.colors.option, true);
}
function logSelected(output) {
    log(output, config.colors.selected, true);
}
function logTitle(output) {
    log(output, config.colors.title, true);
}
function print(output) {
    printType(output, logDefault);
}
exports.print = print;
function printChoose(bool, strTrue, strFalse) {
    if (bool === undefined) {
        log("UNDEFINED", config.colors.error, true);
    }
    else {
        if (bool) {
            log(strTrue, config.colors.selected, true);
        }
        else {
            log(strFalse, config.colors.selected, true);
        }
    }
}
exports.printChoose = printChoose;
function printCommand(output) {
    printType(output, logCommand);
}
exports.printCommand = printCommand;
function printError(output) {
    printType(output, logError);
}
exports.printError = printError;
function printInput(output) {
    printType(output, logInput);
}
exports.printInput = printInput;
function printLine() {
    log(line, config.colors.line, true);
}
exports.printLine = printLine;
function printOption(output) {
    printType(output, logOption);
}
exports.printOption = printOption;
function printOptions(options, selectFirst) {
    let newLine;
    let color;
    let x;
    for (let i = 0; i < options.length; i++) {
        newLine = i < options.length - 1;
        color = i == 0 ? config.colors.selected : config.colors.option;
        if (selectFirst) {
            x = i == 0 ? "X" : " ";
        }
        else {
            x = " ";
        }
        log("[" + x + "] " + options[i], color, newLine);
    }
}
exports.printOptions = printOptions;
function printSelected(output) {
    printType(output, logSelected);
}
exports.printSelected = printSelected;
function printTitle(output) {
    printType(output, logTitle);
}
exports.printTitle = printTitle;
function printType(output, callback) {
    switch (typeof output) {
        case "boolean":
            callback(output);
            break;
        case "number":
            callback(output);
            break;
        case "string":
            callback(output);
            break;
        default:
            logError("Unknown Type: " + typeof output);
    }
}
function removeTabsAndBreaks(str) {
    str = str.replace("\n", "");
    str = str.replace("\t", "");
    return str;
}
exports.removeTabsAndBreaks = removeTabsAndBreaks;
function selectNextLine(previous, options, position) {
    ansi.beginOfLine(0);
    let row = "[ ] " + options[options.length - position - 1];
    log(row, config.colors.option, false);
    if (previous) {
        ansi.previousLine(1);
        position++;
    }
    else {
        ansi.nextLine(1);
        position--;
    }
    row = "[X] " + options[options.length - position - 1];
    log(row, config.colors.selected, false);
    ansi.beginOfLine(1);
    return position;
}
exports.selectNextLine = selectNextLine;
function multiSelectNextLine(previous, options, selected, position) {
    ansi.beginOfLine(0);
    let sel = selected[selected.length - position - 1];
    let row;
    if (sel) {
        row = "[X] " + options[options.length - position - 1];
        log(row, config.colors.selected, false);
    }
    else {
        row = "[ ] " + options[options.length - position - 1];
        log(row, config.colors.option, false);
    }
    if (previous) {
        ansi.previousLine(1);
        position++;
    }
    else {
        ansi.nextLine(1);
        position--;
    }
    sel = selected[selected.length - position - 1];
    if (sel) {
        row = "[X] " + options[options.length - position - 1];
    }
    else {
        row = "[ ] " + options[options.length - position - 1];
    }
    log(row, config.colors.selected, false);
    ansi.beginOfLine(1);
    return position;
}
exports.multiSelectNextLine = multiSelectNextLine;
//# sourceMappingURL=functions.js.map