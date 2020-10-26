"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const pp = new index_1.PowerPrompt();
test();
async function test() {
    pp.printLine();
    //pp.print("Default Text");
    //pp.printLine();
    //pp.printTitle("Title");
    //pp.printLine();
    //pp.print(test_function);
    //pp.printLine();
    /*let input = await pp.input("Give me Input >>");
    pp.print("Your Input: " + input);
    pp.printLine();*/
    /*let choose = await pp.choose("Choose X(=true) or Y(=false):", "x", "y", "X", "Y", false);
    pp.print("Your Input: " + choose);
    pp.printLine();*/
    //let options:string[] = ["Option 1", "Option 2", "Option 3"];
    /*let select = await pp.select("Select one Option:", options);
    pp.print("Your Input: " + select);
    pp.printLine();*/
    /*let multiselect = await pp.multiSelect("Select Options:", options, 0);
    pp.print("Your Input: " + multiselect);
    pp.printLine();*/
    pp.close(true);
}
function test_function() {
}
//# sourceMappingURL=test.js.map