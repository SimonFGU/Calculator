const playAudio = () => document.getElementById("audio").play()

class ArithmeticValue {
    constructor(StringValue, IsNumber) {
        this.StringValue = StringValue
        this.IsNumber = IsNumber
    }
    IsNumberDouble = false
}

let ArithmeticArray = [new ArithmeticValue('0', false)]
let OpenBracketCount = 0

function ArithmeticArrayToHtml(){
    let ArithmeticString1 = ''
    let ArithmeticString2 = ''
    let ArithmeticArrayStart = 1
    let OpenBracketCountToWrite = OpenBracketCount
    switch (ArithmeticArray.length){
        case 1:
            ArithmeticArrayStart = 0
            break
    }
    for (let i = ArithmeticArrayStart; i < ArithmeticArray.length; i++){
        if (ArithmeticArray[i].StringValue === '^'){
            ArithmeticString1 = ArithmeticString1.slice(0, -1)
            ArithmeticString1 = ArithmeticString1 + ArithmeticArray[i].StringValue
        }
        else{
            ArithmeticString1 = ArithmeticString1 + ArithmeticArray[i].StringValue + ' '
        }
    }
    if(ArithmeticString1.slice(ArithmeticString1.length - 1) === ' '){
        ArithmeticString1 = ArithmeticString1.slice(0, -1)
    }
    while (OpenBracketCountToWrite > 0){
        ArithmeticString2 = ArithmeticString2 + ' )'
        OpenBracketCountToWrite--
    }
    document.getElementById("text1").innerText = ArithmeticString1
    document.getElementById("text2").innerText = ArithmeticString2
}

function Add(string, IsNumber){

    if (ArithmeticArray[ArithmeticArray.length - 1].IsNumber === true && IsNumber === true){
        if((ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1) === '%' && string !== '%')
        || (ArithmeticArray[ArithmeticArray.length - 1].StringValue === 'π' && string !== '%') 
        || string === 'π'){
            ArithmeticArray.push(new ArithmeticValue('×', false))
            ArithmeticArray.push(new ArithmeticValue(string, IsNumber))
            switch(string){
                case '.':
                    ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble = true
                    break
            }
        }
        else if (ArithmeticArray[ArithmeticArray.length - 1].StringValue === '0' && string !== '%'  && string !== '.'){
            ArithmeticArray[ArithmeticArray.length - 1].StringValue = string
        }
        else if (string === '.' && ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble === true) {
            /*Don't do anything*/
        }
        else{
            switch(string){
                case '.':
                    ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble = true
                    break
            }
            ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue + string
        }
    }

    else if (ArithmeticArray[ArithmeticArray.length - 1].IsNumber === false && IsNumber == false){
        if (string === '-'
        && ArithmeticArray[ArithmeticArray.length - 1].StringValue !== '+' 
        && ArithmeticArray[ArithmeticArray.length - 1].StringValue !== '-'
        && ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1) !== ')'
        && ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1) !== '%'){
            ArithmeticArray.push(new ArithmeticValue(string, true))
        }
        else if (string === '(' || string === '√('
        || ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1) === ')'
        || ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1) === '%'){
            ArithmeticArray.push(new ArithmeticValue(string, false))
        }
        else if (ArithmeticArray[ArithmeticArray.length - 1].StringValue === '(' || ArithmeticArray[ArithmeticArray.length - 1].StringValue === '√('){
            /*Don't do anything*/
        }
        else if(ArithmeticArray.length === 1){
            ArithmeticArray.push(new ArithmeticValue('0', true))
            ArithmeticArray.push(new ArithmeticValue(string, false))
        }
        else{
            ArithmeticArray[ArithmeticArray.length - 1].StringValue = string
        }
    }

    else if (ArithmeticArray[ArithmeticArray.length - 1].IsNumber === false && IsNumber == true){
        switch(string){
            case '%':
                switch(ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1)){
                    case '(':
                        /*Don't do anything*/
                        break
                    case ')':
                    case '%':
                        ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue + string
                        break;
                    default:
                        switch(ArithmeticArray.length){
                            case 1:
                                ArithmeticArray.push(new ArithmeticValue('0%', true))
                                break
                            default:
                                ArithmeticArray.pop()
                                ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue + string
                                break
                        }
                }
                break
            default:
                switch (ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1)){
                    case ')':
                    case '%':
                        ArithmeticArray.push(new ArithmeticValue('×', false))
                }
                ArithmeticArray.push(new ArithmeticValue(string, IsNumber))
                switch(string){
                    case '.':
                        ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble = true
                        break
                }
                break
        }
    }

    else{
        if(ArithmeticArray[ArithmeticArray.length - 1].StringValue !== '-'){
            switch(string){
                case '(':
                case '√(':
                    ArithmeticArray.push(new ArithmeticValue('×', false))
                    break
            }
            ArithmeticArray.push(new ArithmeticValue(string, IsNumber))
        }
    }

    ArithmeticArrayToHtml()
}

function AddParenthesisStart(){
    OpenBracketCount++
    Add('(', false)
}

function AddParenthesisEnd(){
    if(OpenBracketCount > 0 && (ArithmeticArray[ArithmeticArray.length - 1].IsNumber === true)){
        OpenBracketCount--
        Add(' )', false)
    }
}

function AddSquareRoot(){
    OpenBracketCount++
    Add('√(', false)
}

function BackSpace(){
    switch(ArithmeticArray.length){
        case 1:
            break
        default:
            switch (ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(ArithmeticArray[ArithmeticArray.length - 1].StringValue.length - 1)) {
                case '.':
                    ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble = false
                    break;
                case ')':
                    OpenBracketCount++
                    ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(0, -1)
                    break
                case '(':
                    switch(ArithmeticArray[ArithmeticArray.length - 1].StringValue){
                        case '√(':
                            ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(0, -1)
                            break
                    }
                    OpenBracketCount--
                    break
            }
            ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(0, -1)
            switch (ArithmeticArray[ArithmeticArray.length - 1].StringValue){
                case '':
                    ArithmeticArray.pop()
                    break;
            }
            break
    }
    ArithmeticArrayToHtml()
}

function Delete(){
    ArithmeticArray = [new ArithmeticValue('0', false)]
    OpenBracketCount = 0
    ArithmeticArrayToHtml()
}

function Arithmetic(){
    function Calculat (StartIndex, StopIndex){

        for (i = StartIndex; i < StopIndex; i++){
            if (ArithmeticArray[i].StringValue.toString().slice(ArithmeticArray[i].StringValue.length - 1) === '('){
                let ParenthesisStart = i
                for (ii = StopIndex - 1; ii > StartIndex - 1; ii--){
                    if (ArithmeticArray[ii].StringValue.toString().slice(0, 1) === ' '){
                        Calculat (ParenthesisStart + 1, ii)
                        if (ArithmeticArray[ParenthesisStart].StringValue === '√('){
                            ArithmeticArray[ParenthesisStart + 1].StringValue = Math.sqrt(parseFloat(ArithmeticArray[ParenthesisStart + 1].StringValue))
                        }
                        while (ArithmeticArray[ParenthesisStart + 2].StringValue.toString().slice(ArithmeticArray[ParenthesisStart + 2].StringValue.length - 1) === '%'){
                            ArithmeticArray[ParenthesisStart + 1].StringValue = parseFloat(ArithmeticArray[ParenthesisStart + 1].StringValue) / 100
                            ArithmeticArray[ParenthesisStart + 2].StringValue = ArithmeticArray[ParenthesisStart + 2].StringValue.toString().slice(0, -1)
                        }
                        ArithmeticArray.splice(ParenthesisStart, 1)
                        ArithmeticArray.splice(ParenthesisStart + 1, 1)
                        StopIndex = StopIndex - ((ii - 1) - (ParenthesisStart + 1)) - 2
                        ii = -1
                        i = ParenthesisStart - 1
                    }
                }
            }
        }

        for (i = StartIndex; i < StopIndex; i++){
            let NumberOfPercent = 0
            while (ArithmeticArray[i].StringValue.toString().slice(ArithmeticArray[i].StringValue.length - 1) === '%'){
                NumberOfPercent++
                ArithmeticArray[i].StringValue = ArithmeticArray[i].StringValue.toString().slice(0, -1)
            }
            switch (ArithmeticArray[i].StringValue){
                case 'π':
                    ArithmeticArray[i].StringValue = Math.PI
                    break
            }
            while (NumberOfPercent > 0){
                ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i].StringValue) / 100
                NumberOfPercent--
            }
        }

        for (i = StartIndex; i < StopIndex; i++){
            let NumberOfPercent = 0
            while (ArithmeticArray[i].StringValue.toString().slice(ArithmeticArray[i].StringValue.length - 1) === '%'){
                NumberOfPercent++
                ArithmeticArray[i].StringValue = ArithmeticArray[i].StringValue.toString().slice(0, -1)
            }
            while (NumberOfPercent > 0){
                ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i].StringValue) / 100
                NumberOfPercent--
            }
        }

        for (i = StartIndex; i < StopIndex; i++){
            switch (ArithmeticArray[i].StringValue){
                case '^':
                    ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i - 1].StringValue) ** parseFloat(ArithmeticArray[i + 1].StringValue)
                    ArithmeticArray.splice(i - 1, 1)
                    ArithmeticArray.splice(i, 1)
                    i--
                    StopIndex = StopIndex - 2
                    break
            }
        }

        for (i = StartIndex; i < StopIndex; i++){
            switch (ArithmeticArray[i].StringValue){
                case '×':
                    ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i - 1].StringValue) * parseFloat(ArithmeticArray[i + 1].StringValue)
                    ArithmeticArray.splice(i - 1, 1)
                    ArithmeticArray.splice(i, 1)
                    i--
                    StopIndex = StopIndex - 2
                    break
                case '÷':
                    ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i - 1].StringValue) / parseFloat(ArithmeticArray[i + 1].StringValue)
                    ArithmeticArray.splice(i - 1, 1)
                    ArithmeticArray.splice(i, 1)
                    i--
                    StopIndex = StopIndex - 2
                    break
            }
        }

        for (i = StartIndex; i < StopIndex; i++){
            switch (ArithmeticArray[i].StringValue){
                case '+':
                    ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i - 1].StringValue) + parseFloat(ArithmeticArray[i + 1].StringValue)
                    ArithmeticArray.splice(i - 1, 1)
                    ArithmeticArray.splice(i, 1)
                    i--
                    StopIndex = StopIndex - 2
                    break
                case '-':
                    ArithmeticArray[i].StringValue = parseFloat(ArithmeticArray[i - 1].StringValue) - parseFloat(ArithmeticArray[i + 1].StringValue)
                    ArithmeticArray.splice(i - 1, 1)
                    ArithmeticArray.splice(i, 1)
                    i--
                    StopIndex = StopIndex - 2
                    break
            }
        }
    }
    if (ArithmeticArray[ArithmeticArray.length - 1].IsNumber === false && ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(0, 1) !== ' '){
            // don't do anything
            console.log('hello');
    } 
    else{
        while (OpenBracketCount > 0){
            ArithmeticArray.push(new ArithmeticValue(' )', false))
            OpenBracketCount--
        }
        Calculat(1, ArithmeticArray.length)
        ArithmeticArray[ArithmeticArray.length - 1].StringValue = ArithmeticArray[ArithmeticArray.length - 1].StringValue.toString()
        ArithmeticArray[ArithmeticArray.length - 1].IsNumber = true
        ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble = false
        for (i = 0; i < ArithmeticArray[ArithmeticArray.length - 1].StringValue.length; i++){
            if (ArithmeticArray[ArithmeticArray.length - 1].StringValue.slice(i, i + 1) === '.'){
                ArithmeticArray[ArithmeticArray.length - 1].IsNumberDouble = true
                i = ArithmeticArray[ArithmeticArray.length - 1].StringValue.length
            }
        }
        document.getElementById("text1").innerText = ArithmeticArray[ArithmeticArray.length - 1].StringValue 
        document.getElementById("text2").innerText = ''
    }
}