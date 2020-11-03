const ansi      = require("./ansi");
const config    = require("./config.json");

const line = fillString("-", "-", config.terminal.length);

export function closeStdin():void{
    process.stdin.destroy();
}

function fillString(str:string, char:string, length:number):string{
    if(char.length > 0){
        while(str.length <= length){
            str += char;
        }
    }
    return str;
}

export function getChoose(str:string, charTrue:string, charFalse:string):Boolean{
    switch(str.toLowerCase()){
        case charTrue:
            return true;
        case charFalse:
            return false;
        default:
            return undefined;
    }
}

export function log(output:string, color:string, newLine:Boolean):void{
    process.stdout.write(color + output + config.ansi.reset);
    if(newLine){
        process.stdout.write("\n");
    }
}

function logCommand(output):void{
    log(output, config.colors.command, true);
}

function logDefault(output):void{
    log(output, config.colors.default, true);
}

function logError(output):void{
    log(output, config.colors.error, true);
}

function logInput(output):void{
    log(output, config.colors.input, true);
}

function logOption(output):void{
    log(output, config.colors.option, true);
}

function logSelected(output):void{
    log(output, config.colors.selected, true);
}

function logTitle(output):void{
    log(output, config.colors.title, true);
}

export function print(output):void{
    printType(output, logDefault);
}

export function printChoose(bool:Boolean, strTrue:string, strFalse):void{
    if(bool === undefined){
        log("UNDEFINED", config.colors.error, true);
    }else{
        if(bool){
            log(strTrue, config.colors.selected, true);
        }else{
            log(strFalse, config.colors.selected, true);
        }
    }
}

export function printCommand(output):void{
    printType(output, logCommand);
}

export function printError(output):void{
    printType(output, logError);
}

export function printInput(output):void{
    printType(output, logInput);
}

export function printLine(){
    log(line, config.colors.line, true);
}

export function printOption(output):void{
    printType(output, logOption);
}

export function printOptions(options:string[], selectFirst:Boolean):void{
    let newLine:Boolean;
    let color;
    let x:string;
    for(let i:number = 0; i<options.length; i++){
        newLine = i < options.length - 1;
        color = i == 0 ? config.colors.selected : config.colors.option;
        if(selectFirst){
            x = i == 0 ? "X" : " ";
        }else{
            x = " ";
        }
        log("[" + x + "] " + options[i], color, newLine);
    }
}

export function printSelected(output):void{
    printType(output, logSelected);
}

export function printTitle(output):void{
    printType(output, logTitle);
}

function printType(output, callback):void{
    switch(typeof output){
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

export function removeTabsAndBreaks(str:string):string{
    str = str.replace("\n", "");
    str = str.replace("\t", "");
    return str;
}

export function selectNextLine(previous:Boolean, options:string[], position:number):number{
    ansi.beginOfLine(0);
    let row:string = "[ ] " + options[options.length - position - 1];
    log(row, config.colors.option, false);
    if(previous){
        ansi.previousLine(1);
        position++;
    }else{
        ansi.nextLine(1);
        position--;
    }
    row = "[X] " + options[options.length - position - 1];
    log(row, config.colors.selected, false);
    ansi.beginOfLine(1);
    return position;
}

export function multiSelectNextLine(previous:Boolean, options:string[], selected:Boolean[], position:number):number{
    ansi.beginOfLine(0);
    let sel:Boolean = selected[selected.length - position - 1];
    let row :string;
    if(sel){
        row = "[X] " + options[options.length - position - 1];
        log(row, config.colors.selected, false);
    }else{
        row = "[ ] " + options[options.length - position - 1];
        log(row, config.colors.option, false);
    }
    if(previous){
        ansi.previousLine(1);
        position++;
    }else{
        ansi.nextLine(1);
        position--;
    }

    sel = selected[selected.length - position - 1];
    if(sel){
        row = "[X] " + options[options.length - position - 1];
    }else{
        row = "[ ] " + options[options.length - position - 1];
    }
    log(row, config.colors.selected, false);
    ansi.beginOfLine(1);
    return position;
}