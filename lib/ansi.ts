const config        = require("./config.json");

export function beginOfLine(num:number){
    left(1000);
    right(num);
}

export function clearEntireLine(){
    log(config.ansi.clearEntireLine);
}

export function clearEntireScreen(){
    log(config.ansi.clearEntireScreen);
}

export function clearLineToBegin(){
    log(config.ansi.clearLineToBegin);
}

export function clearLineToEnd(){
    log(config.ansi.clearLineToEnd);
}

export function clearScreenToBegin(){
    log(config.ansi.clearScreenToBegin);
}

export function clearScreenToEnd(){
    log(config.ansi.clearScreenToEnd);
}

export function down(num:number):void{
    log(config.ansi.down.replace("{n}", num));
}

export function left(num:number):void{
    log(config.ansi.left.replace("{n}", num));
}

export function log(ansi:string):void{
    process.stdout.write(ansi);
}

export function nextLine(num:number){
    log(config.ansi.nextLine.replace("{n}", num));
}

export function previousLine(num:number){
    log(config.ansi.previousLine.replace("{n}", num));
}

export function reset(){
    log(config.ansi.reset);
}

export function restorePosition(){
    log(config.ansi.restorePosition);
}

export function right(num:number):void{
    log(config.ansi.right.replace("{n}", num));
}

export function setColumn(num:number):void{
    log(config.ansi.setColumn.replace("{n}", num));
}

export function savePosition(){
    log(config.ansi.savePosition);
}

export function setPosition(rows:number, cols:number):void{
    let str = config.ansi.setPosition.replace("{n}", rows);
    log(str.replace("{m}", cols));
}

export function up(num:number):void{
    log(config.ansi.up.replace("{n}", num));
}