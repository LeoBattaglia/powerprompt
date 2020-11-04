# PowerPrompt
A simple and lightweight TypeScript-Class to create CLI-Applications on node.js.

## Installation
Run `npm i powerprompt`

## Import
```
import {PowerPrompt} from "powerprompt";
const pp = new PowerPrompt();
--> Example: pp.printLine();
```

## Methods
### close()
Destroy stdin and exit process if necessary.
##### Parameters:
- exitProcess:Boolean
##### Use:
```
pp.close(true);
```

### choose()
Set prompt which lets the user choose between two options. 
##### Parameters:
- output:string
- charTrue:string
- charFalse:string
- msgTrue:string
- msgFalse:string
- abortOnWrongChar
##### Use:
```
let choose = await pp.choose("Choose X(=true) or Y(=false):", "x", "y", "X", "Y", false);
pp.print("Your Input: " + choose);
```

### input()
Set prompt for user-input.
##### Parameters:
- output:string
##### Use:
```
let input = await pp.input("Give me Input >>");
pp.print("Your Input: " + input);
```

### multiSelect()
Set prompt which lets the user select 0 or more options.
#### Parameters:
- output:string
- options:string[]
- min:number (not activated)
#### Use:
```
let options:string[] = ["Option 1", "Option 2", "Option 3"];
let multiselect = await pp.multiSelect("Select Options:", options, 0);
pp.print("Your Input: " + multiselect);
```

### print()
Print output to stdout in default-color (white).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.print("Default-Text");
```

### printCommand()
Print output to stdout in command-color (green).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printCommand("Command-Text");
```

### printError()
Print output to stdout in error-color (red).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printError("Error-Text");
```

### printInput()
Print output to stdout in input-color (white).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printInput("Input-Text");
```

### printLine()
Print a line to stdout in line-color (white).
Line-width is defined in /lib/config.json
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printLine();
```

### printOption()
Print output to stdout in option-color (yellow).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printOption("Option-Text");
```

### printSelected()
Print output to stdout in selected-color (cyan).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printSelected("Selected-Text");
```

### printTitle()
Print output to stdout in title-color (magenta).
#### Parameters:
- output:string|number|boolean
#### Use:
```
pp.printTitle("Title-Text");
```

### select()
Set prompt which lets the user select one option.
#### Parameters:
- output:string
- options:string[]
#### Use:
```
let options:string[] = ["Option 1", "Option 2", "Option 3"];
let select = await pp.select("Select one Option:", options);
pp.print("Your Input: " + select);
```

## Colors
All colors are defined in /lib/config.json

## Async/Await
In most cases, a CLI-Application needs to wait for User-Input, like in the Examples above.
It is also possible, to use the methods without "await" for asynchronous and non-blocking code.

## Parameters
None