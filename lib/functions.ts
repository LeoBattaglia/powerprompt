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

function getErrorMessage(name:string):string{
    for(let error of config.errors){
        if(error.name === name){
            return "ERROR " + error.message;
        }
    }
}

export function log(output:string, color:string, newLine:Boolean):void{
    process.stdout.write(color + output + config.ansi.reset);
    if(newLine){
        process.stdout.write("\n");
    }
}

function logDefault(output):void{
    log(output, config.colors.default, true);
}

function logError(name:string, output):void{
    log(getErrorMessage(name) + ": " + typeof output, config.colors.error, true);
}

function logTitle(output):void{
    log(output, config.colors.title, true);
}

export function print(output):void{
    switch(typeof output){
        case "boolean":
            logDefault(output);
            break;
        case "number":
            logDefault(output);
            break;
        case "string":
            logDefault(output);
            break;
        default:
            logError("unknown_type", output);
    }
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

export function printLine(){
    log(line, config.colors.line, true);
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

export function printTitle(output):void{
    switch(typeof output){
        case "boolean":
            logTitle(output);
            break;
        case "number":
            logTitle(output);
            break;
        case "string":
            logTitle(output);
            break;
        default:
            logError("unknown_type", output);
    }
}

export function removeTabsAndBreaks(str:string):string{
    str = str.replace("\n", "");
    str = str.replace("\t", "");
    return str;
}

export function selectNextLine(previous:Boolean, options:string[], position:number):number{
    ansi.left(1);
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
    ansi.left(1);
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