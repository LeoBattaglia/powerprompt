import {log} from "./lib/functions";

const ansi          = require("./lib/ansi");
const config        = require("./lib/config.json");
const func          = require("./lib/functions");
const readline        = require("readline");

readline.emitKeypressEvents(process.stdin);

export class PowerPrompt{
    constructor(){}

    close(){
        func.closeStdin();
        process.exit(0);
    }

    async choose(output:string, charTrue:string, charFalse:string, strTrue:string, strFalse, abortByWrongChar:Boolean){
        charTrue = charTrue.length > 1 ? charTrue.substring(0, 1) : charTrue;
        charFalse = charFalse.length > 1 ? charFalse.substring(0, 1) : charFalse;
        charTrue = charTrue.toLowerCase();
        charFalse = charFalse.toLowerCase();
        func.log(output + config.colors.command + " (" + charTrue + "|" + charFalse + ")", config.colors.input, false);
        process.stdin.setRawMode(true);
        let inputStream = new Promise((resolve) => {
            process.stdin.on("keypress", (str, key) => {
                let input:string = key.name.toString();
                input = func.removeTabsAndBreaks(input);
                if(abortByWrongChar){
                    resolve(func.getChoose(input, charTrue, charFalse));
                }else{
                    if(func.getChoose(input, charTrue, charFalse) !== undefined){
                        resolve(func.getChoose(input, charTrue, charFalse));
                    }
                }
            });
        });
        let result = await inputStream;
        process.stdin.setRawMode(false);
        ansi.left(5);
        ansi.clearLineToEnd();
        func.printChoose(result, strTrue, strFalse);
        return result;
    }

    async input(output:string){
        func.log(output + " ", config.colors.command, false);
        ansi.log(config.colors.input);
        let inputStream = new Promise((resolve) => {
            process.stdin.once("data", function(input){
                resolve(input);
            });
        });
        let result = await inputStream;
        let input:string = result.toString();
        input = func.removeTabsAndBreaks(input);
        input = input.length > 1 ? input.trim() : input;
        ansi.up(1);
        ansi.right(output.length + 1)
        func.log(input, config.colors.selected, false);
        ansi.nextLine(1);
        return input;
    }

    async multiSelect(output:string, options:string[], min:number){
        func.log(output + " ", config.colors.command, true);
        func.printOptions(options, false);
        let selected:Boolean[] = [];
        options.forEach(() => {
            selected.push(false);
        })
        ansi.previousLine(options.length - 1);
        ansi.right(1);
        process.stdin.setRawMode(true);
        let position:number = options.length - 1;
        let inputStream = new Promise((resolve) => {
            process.stdin.on("keypress", (str, key) => {
                let index:number;
                switch(key.name){
                    case "down":
                        if(position > 0){
                            position = func.multiSelectNextLine(false, options, selected, position);
                        }
                        break
                    case "up":
                        if(position < options.length - 1){
                            position = func.multiSelectNextLine(true, options, selected, position);
                        }
                        break;
                    case "return":
                        index = options.length - position - 1;
                        if(position > 0){
                            ansi.nextLine(position);
                        }
                        ansi.right(options[0].length);
                        ansi.log("\n");
                        let result:string[] = [];
                        for(let i:number=0; i<options.length; i++){
                            if(selected[i]){
                                result.push(options[i]);
                            }
                        }
                        resolve(result);
                        break;
                    case "space":
                        ansi.beginOfLine(0);
                        index = options.length - position - 1;
                        let row:string;
                        if(selected[options.length - position - 1]){
                            selected[options.length - position - 1] = false;
                            row = "[ ] " + options[options.length - position - 1];
                            log(row, config.colors.option, false);
                        }else{
                            selected[options.length - position - 1] = true;
                            row = "[X] " + options[options.length - position - 1];
                            log(row, config.colors.selected, false);
                        }


                        ansi.beginOfLine(1);

                        break;
                }
            });
        });
        let result = await inputStream;
        process.stdin.setRawMode(false);
        return result;
    }

    print(output):void{
        func.print(output);
    }

    printLine():void{
        func.printLine();
    }

    printTitle(output):void{
        func.printTitle(output);
    }

    async select(output:string, options:string[]){
        func.log(output + " ", config.colors.command, true);
        func.printOptions(options, true);
        ansi.previousLine(options.length - 1);
        ansi.right(1);
        process.stdin.setRawMode(true);
        let position:number = options.length - 1;
        let inputStream = new Promise((resolve) => {
            process.stdin.on("keypress", (str, key) => {
                switch(key.name){
                    case "down":
                        if(position > 0){
                            position = func.selectNextLine(false, options, position);
                        }
                        break
                    case "up":
                        if(position < options.length - 1){
                            position = func.selectNextLine(true, options, position);
                        }
                        break;
                    case "return":
                        let index:number = options.length - position - 1;
                        if(position > 0){
                            ansi.nextLine(position);
                        }
                        ansi.right(options[0].length);
                        ansi.log("\n");
                        resolve(options[index]);
                        break;
                }
            });
        });
        let result = await inputStream;
        process.stdin.setRawMode(false);
        return result;
    }
}