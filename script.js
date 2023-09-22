'use strict';

// some variables;

const OPERATORS=['+','-','*','/'];
const POWER='POWER(',FACTORIAL='FACTORIAL(';
let data={
    operation:[],
    formula:[]
};
let ans=0;
let calculator_buttons = [
    {
        name : "rad",
        symbol : "Rad",
        formula : false,
        type : "key"
    },
    {
        name : "deg",
        symbol : "Deg",
        formula : false,
        type : "key"
    },
    {
        name : "square-root",
        symbol : "√",
        formula : "Math.sqrt",
        type : "math_function"
    },
    {
        name : "square",
        symbol : "x²",
        formula : POWER,
        type : "math_function"
    },
    {
        name : "open-parenthesis",
        symbol : "(",
        formula : "(",
        type : "number"
    },
    {
        name : "close-parenthesis",
        symbol : ")",
        formula : ")",
        type : "number"
    },
    {
        name : "clear",
        symbol : "C",
        formula : false,
        type : "key"
    },
    {
        name : "delete",
        symbol : "⌫",
        formula : false,
        type : "key"
    },
    {
        name : "pi",
        symbol : "π",
        formula : "Math.PI",
        type : "number"
    },
    {
        name : "cos",
        symbol : "cos",
        formula : "trigo(Math.cos,",
        type : "trigo_function"
    },{
        name : "sin",
        symbol : "sin",
        formula : "trigo(Math.sin,",
        type : "trigo_function"
    },{
        name : "tan",
        symbol : "tan",
        formula : "trigo(Math.tan,",
        type : "trigo_function"
    },{
        name : "7",
        symbol : 7,
        formula : 7,
        type : "number"
    },{
        name : "8",
        symbol : 8,
        formula : 8,
        type : "number"
    },{
        name : "9",
        symbol : 9,
        formula : 9,
        type : "number"
    },
    {
        name : "division",
        symbol : "÷",
        formula : "/",
        type : "operator"
    },
    {
        name : "e",
        symbol : "e",
        formula : "Math.E",
        type : "number"
    },
    {
        name : "acos",
        symbol : "acos",
        formula : "inv_trigo(Math.acos,",
        type : "trigo_function"
    },{
        name : "asin",
        symbol : "asin",
        formula : "inv_trigo(Math.asin,",
        type : "trigo_function"
    },{
        name : "atan",
        symbol : "atan",
        formula : "inv_trigo(Math.atan,",
        type : "trigo_function"
    },
    {
        name : "4",
        symbol : 4,
        formula : 4,
        type : "number"
    },{
        name : "5",
        symbol : 5,
        formula : 5,
        type : "number"
    },{
        name : "6",
        symbol : 6,
        formula : 6,
        type : "number"
    },{
        name : "multiplication",
        symbol : "×",
        formula : "*",
        type : "operator"
    },{
        name : "factorial",
        symbol : "x!",
        formula : FACTORIAL,
        type : "math_function"
    },{
        name : "exp",
        symbol : "exp",
        formula : "Math.exp",
        type : "math_function"
    },{
        name : "ln",
        symbol : "ln",
        formula : "Math.log",
        type : "math_function"
    },{
        name : "log",
        symbol : "log",
        formula : "Math.log10",
        type : "math_function"
    },{
        name : "1",
        symbol : 1,
        formula : 1,
        type : "number"
    },{
        name : "2",
        symbol : 2,
        formula : 2,
        type : "number"
    },{
        name : "3",
        symbol : 3,
        formula : 3,
        type : "number"
    },{
        name : "subtraction",
        symbol : "–",
        formula : "-",
        type : "operator"
    },{
        name : "power",
        symbol : "x<span>y</span>",
        formula : POWER,
        type : "math_function"
    },{
        name : "ANS",
        symbol : "ANS",
        formula : "ans",
        type : "number"
    },{
        name : "percent",
        symbol : "%",
        formula : "/100",
        type : "number"
    },{
        name : "comma",
        symbol : ".",
        formula : ".",
        type : "number"
    },{
        name : "0",
        symbol : 0,
        formula : 0,
        type : "number"
    },{
        name : "calculate",
        symbol : "=",
        formula : "=",
        type : "calculate"
    },{
        name : "addition",
        symbol : "+",
        formula : "+",
        type : "operator"
    }
];
// selecting elements;
const input_element=document.querySelector('.input');
const output_operation_element=document.querySelector('.operation .value');
const output_result_element=document.querySelector('.result .value');
//console.log(output_result_element);

// create calculator buttons;

function createCalculatorButtons(){
    const btns_per_row=8;
    let added_btns=0;

    calculator_buttons.forEach( button=>{
        // create a new row after creating 8 buttons
        if(added_btns%btns_per_row==0){
            input_element.innerHTML+='<div class="row"></div>';
        }

        // selectingmthe right row(last row)
        const row=document.querySelector('.row:last-child');

        // add buttons in inner html of each row;
        row.innerHTML+=`<button id="${button.name}">${button.symbol}</button>`;
        added_btns++;
    })
}
createCalculatorButtons();

//adding event listener to input_element;
// console.log(input_element);
input_element.addEventListener('click',function(event){
    // clicked button is target_button;
    const target_btn=event.target;
    // console.log(targer_btn);

    calculator_buttons.forEach(button=>{
        if(button.name==target_btn.id)calculator(button);
    })
})

let RADIAN=true;

const rad_btn=document.getElementById("rad");
//console.log(rad_btn);
const deg_btn=document.getElementById('deg');
//console.log(deg_btn);
rad_btn.classList.add('active-angle');
function angleToggle(){
    rad_btn.classList.toggle('active-angle');
    deg_btn.classList.toggle('active-angle');
}

// calculator() takes clicked button(object);
function calculator(button){
    // console.log(button);
    // we have 6 types of buttons so different operations for each type;
    // operation array includes symbols which we display on screen;
    // formula array includes actual formula(which will be a javaScript code(string=>eval())) to evaluate the value and get result;
    if(button.name=='rad'){
        RADIAN=true;
        angleToggle();
    }
    else if(button.name=='deg'){
        RADIAN=false;
        angleToggle();
    }
    if(button.type=='operator'){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    }
    else if(button.type=='number'){
        data.operation.push(button.symbol);
        data.formula.push(button.formula);

    }
    else if(button.type=='trigo_function'){
        // no complications with trigo functions;
        data.operation.push(button.symbol+'(');
        data.formula.push(button.formula);
        
    }
    else if(button.type=='math_function'){
        // have complications with math functions;
        // 20+2!+4^(10)(in operation array)=>(20+2factorial+4Math.pow(10)  (syntex error)) => 20+factorial(2)+Math.pow(4,10) (in formula array how to write this?);
        let symbol,formula;

        if(button.name=='factorial'){
            symbol="!";
            formula=button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);

        }
        else if(button.name=='square'){
            symbol="^(";
            formula=button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");

        }
        else if(button.name=='power'){
            symbol="^(";
            formula=button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            // console.log(data.operation);
            // console.log(data.formula);

        }
        else{
            symbol=button.symbol+'(';
        formula=button.formula+'(';
        data.operation.push(symbol);
        data.formula.push(formula);
        }
        

  
    }
    else if(button.type=='key'){
         // if user click C button we empty both array;
         // if user delete , we just pop() last element form each array;
         if(button.name=='clear'){
            data.operation=[];
            data.formula=[];
            updateOutputResult(0);
         }
         else if(button.name=='delete'){
            data.operation.pop();
            data.formula.pop();
         }

        
    }
    else if(button.type=='calculate'){
        let formula_str=data.formula.join('');

        let POWER_SEARCH_RESULT=search(data.formula,POWER);
        //console.log(POWER_SEARCH_RESULT);
        let FACTORIAL_SEARCH_RESULT=search(data.formula,FACTORIAL);
        // console.log(data.formula,POWER_SEARCH_RESULT,FACTORIAL_SEARCH_RESULT);

        // Get power base;
        const BASES=powerBaseGetter(data.formula,POWER_SEARCH_RESULT)
         // console.log(BASES);
         // Replace the bases in the right way in formula;
         BASES.forEach(base=>{
            let toReplace=base+POWER;
            let replacement='Math.pow('+base+',';
            formula_str=formula_str.replace(toReplace,replacement);
           // console.log(formula_str);
         })

         // replace factorial issue;
         const NUMBERS=factorialNumberGetter(data.formula,FACTORIAL_SEARCH_RESULT);
         //console.log(NUMBERS);
         NUMBERS.forEach(factorial=>{
            formula_str=formula_str.replace(factorial.toReplace,factorial.replacement);
         })
        // console.log(formula_str);


         

        let result;
        try{
            result=eval(formula_str);
        }catch(e){
            if(e instanceof SyntaxError){
                result="Syntax Error!";
                updateOutputResult(result); 
                return;
            }


        }
        ans=result;
        data.formula=[result];
        data.operation=[result];
        updateOutputResult(result);  
        return;
    }

    updateOutputOperation(data.operation.join(''));
}
// power baseGetter function;
function powerBaseGetter(formula,POWER_SEARCH_RESULT){

    let power_bases=[];
    POWER_SEARCH_RESULT.forEach(power_index=>{
        let base=[];
        let parantheses_count=0;
        let previous_index=power_index-1;
        

        while(previous_index>=0){
            if(formula[previous_index]=='(')parantheses_count--;
            if(formula[previous_index]==')')parantheses_count++;
            let is_operator=false;

            OPERATORS.forEach(O=>{
                if(formula[previous_index]==O)is_operator=true;
            })
            let is_power=formula[previous_index]==POWER;
            if(is_operator&&parantheses_count==0||is_power)break;
            base.unshift(formula[previous_index]);
            previous_index--;

        }
        power_bases.push(base.join(''));
    })
    return power_bases;

}

// FACTORIAL NO GETTER;
function factorialNumberGetter(formula,FACTORIAL_SEARCH_RESULT){
      let numbers=[];
      let factorial_sequence=0;
      FACTORIAL_SEARCH_RESULT.forEach(factorial_index=>{
        let number=[];

        let next_index=factorial_index+1;
        let next_input=formula[next_index];

        if(next_input==FACTORIAL){
            factorial_sequence++;
            return;
        }

        let first_factorial_index=factorial_index-factorial_sequence;
        let previous_index=first_factorial_index-1;

        let parantheses_count=0;
        //let previous_index=power_index-1;
        

        while(previous_index>=0){
            if(formula[previous_index]=='(')parantheses_count--;
            if(formula[previous_index]==')')parantheses_count++;
            let is_operator=false;

            OPERATORS.forEach(O=>{
                if(formula[previous_index]==O)is_operator=true;
            })
            if(is_operator&&parantheses_count==0)break;
            number.unshift(formula[previous_index]);
            previous_index--;

        }

        let number_str=number.join('');
         const factorial="factorial(", close_paranthesis=')';
         let times=factorial_sequence+1;

         let toReplace=number_str+FACTORIAL.repeat(times);
         let replacement=factorial.repeat(times)+number_str+close_paranthesis;

         numbers.push({
            toReplace:toReplace,
            replacement:replacement
         })

         factorial_sequence=0;
         //console.log(number);


      })

      return numbers;
};


// search functions;
function search(array,keyword){
    let search_result=[];
    array.forEach((e,index)=>{
        if(e==keyword)search_result.push(index);
    })
    return search_result;
}
// Updata Function;
function updateOutputOperation(operation){
    output_operation_element.innerHTML=operation;
}
function updateOutputResult(result){
    output_result_element.innerHTML=result;
}
// factorial Function;
function factorial(n){
    if(n%1!=0)return gamma(n+1);
    if(n==0||n==1)return 1;
    let res=1;
    for(let i=1;i<=n;i++){
        res*=i;
        if(res===Infinity)return Infinity;
    }
    return res;
}

// trigo function;
function trigo(callback,angle){
    if(!RADIAN){
        angle*=(Math.PI/180);
    }
    return callback(angle);
}
function inv_trigo(callback,value){
    let angle=callback(value);
    if(!RADIAN){
        angle*=(180/Math.PI);
    }
    return angle;

}

// GAMMA FUNCTINON
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if(n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
      n--;
      var x = p[0];
      for(var i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      var t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}

// Dark Mode;
const htmlEL=document.querySelector('html');
const themeIcon=document.getElementById('theme-icon');
// console.log(themeIcon);
const toast=document.getElementById("toast");
const darkTheme='css/dark.css';
const lightTheme='css/light.css';
const sunIcon='images/SunIcon.svg';
const moonIcon='images/MoonIcon.svg';
// console.log(theme);
// console.log(htmlEL);
themeIcon.addEventListener('click',function(){
    const themeEL=document.getElementById('theme');
    setTimeout(()=>{
        toast.innerHTML='Calculator';
    },1500);
    if(themeEL.getAttribute('href')==darkTheme){
        themeEL.setAttribute('href',lightTheme);
        themeIcon.setAttribute('src',moonIcon);
        toast.innerHTML="Light Mode ☀️"
    }
    else {
        themeEL.setAttribute("href", darkTheme);
        themeIcon.setAttribute("src", sunIcon);
        toast.innerHTML = "Dark Mode 🌙";
    }

    
})
// const theme=document.querySelector('#theme');
// console.log(theme);
// console.log(theme.getAttribute('href'));
// theme.setAttribute('href',sy.css);