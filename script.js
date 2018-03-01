var scren = document.getElementById("screen_label");
var sub_scren = document.getElementById("sub_screen_label");
var numbers = document.getElementsByClassName("num");
var sub_val = "";
var temp = "0";
var temp_sub = "";
var stack = [];
var funcs = [add, sub, times, div, mod, pow, sq, sqrt, neg, pow10x, log, exp, faq, sin, cos, tan];
var pre = [1, 1, 2, 2, 2, 3];

//Integer that defines the position that unary funcs start from...
var unary = 6;
document.innerHTML = "";
//Add Events to numbers
for (var i = numbers.length - 1; i >= 0; i--) {
	var numBtn = numbers[i];
	add_num_event(numBtn);
}

//Other Btns
var dotBtn = document.getElementById("dot");
dotBtn.addEventListener("click", on_dot);

var piBtn = document.getElementById("pi");
piBtn.addEventListener("click", on_pi);




//Clear btn
var clear = document.getElementById("clear");
clear.addEventListener("click", on_clear);

var clear_e = document.getElementById("CE");
clear_e.addEventListener("click", on_ce);

//BackSpace
var bckspace = document.getElementById("bckspace");
bckspace.addEventListener("click", on_bckspace);

////binary ops

//addition
var dAdd = document.getElementById("plus");
dAdd.addEventListener("click", on_add);

//subtraction
var dSub = document.getElementById("minus");
dSub.addEventListener("click", on_sub);

//Multiplication
var dTimes = document.getElementById("times");
dTimes.addEventListener("click", on_times);

//Division
var dTivide = document.getElementById("divide");
dTivide.addEventListener("click", on_div);

//Modulo
var dMod = document.getElementById("mod");
dMod.addEventListener("click", on_mod);

//Power
var dPow = document.getElementById("pow");
dPow.addEventListener("click", on_pow);


////Unary ops

//Square
var dSq = document.getElementById("sq");
dSq.addEventListener("click", on_sq);

//Square root
var dSqrt = document.getElementById("sqrt");
dSqrt.addEventListener("click", on_sqrt);

//Negate
var dNeg= document.getElementById("neg");
dNeg.addEventListener("click", on_neg);

//
var dPow10x = document.getElementById("pow10x");
dPow10x.addEventListener("click", on_pow10x);

//Power
var dLog= document.getElementById("log");
dLog.addEventListener("click", on_log);

//Power
var dExp = document.getElementById("exp");
dExp.addEventListener("click", on_exp);

//Power
var dFaq = document.getElementById("faq");
dFaq.addEventListener("click", on_faq);

//Sine
var dSine = document.getElementById("sin");
dSine.addEventListener("click", on_sin);

//cosine
var dCos = document.getElementById("cos");
dCos.addEventListener("click", on_cos);

//Tangent
var dTan = document.getElementById("tan");
dTan.addEventListener("click", on_tan);




//Equals
var dEquals = document.getElementById("equals");
dEquals.addEventListener("click", on_equals);
function add_num_event(numBtn){
	var val =numBtn.getElementsByTagName("p")[0].innerHTML;
	numBtn.addEventListener("click", function(){
		click_num(val);
	});
}

function get_arity(func){
	var pos = funcs.indexOf(func);
	if (pos >= unary){
		return 1;
	}
	return 2;
}

function push(func){
	var pos = funcs.indexOf(func);
	if (get_arity(func)==1){
		var peek = stack[stack.length-1];
		var solu;
		if (typeof(peek) == "number"){
			var op = stack.pop();
			solu = func(op);
			clear_temp();
			add_temp(solu);
			temp_sub = get_string(func, temp_sub.length>0?temp_sub:op);
			display_sub(temp_sub);
		}else{
			solu = func(Number(temp));
			var op2 = temp;
			clear_temp();
			add_temp(solu);
			temp_sub = get_string(func, temp_sub.length>0?temp_sub:op2);
			display_sub(temp_sub);
		}
	}else{
		var solu;
		if (stack.length >1){
			add_sub(get_string(func, temp_sub.length>0?temp_sub:temp));
			while (stack.length>1){
				var newfunc = stack[stack.length-1];
				if (typeof(newfunc) == "number"){
					temp = stack.pop();
					newfunc = stack[stack.length-1];
				}
					var newpos = funcs.indexOf(newfunc);
				if (pre[pos]<=pre[newpos]){
					var op = stack.pop();
					var op1 = stack.pop();
					var op2 = Number(temp);
					solu = op(op1, op2);
					clear_temp();
					display(solu);
					stack.push(solu);
				}else{
					var op2 = Number(temp);
					stack.push(op2);
					// stack.push(func);
					clear_temp();
					display(op2);
					break;
				}
			}
			stack.push(func);
		}
		else if(stack.length > 0){
			var op2 = stack[stack.length-1];
			stack.push(func);
			add_sub(get_string(func, temp_sub.length>0?temp_sub:op2));
			clear_temp();
		}
		else{
			var op2 = Number(temp);
			stack.push(op2)
			stack.push(func);
			add_sub(get_string(func, temp_sub.length>0?temp_sub:op2));
			clear_temp();
			display(op2);
		}
	}
	return false;
}
function on_keydown(event){
	var code= event.keyCode;
	var shiftKey = event.shiftKey;
	console.log(code);
	if (code >= 48 && code <= 57 && !shiftKey){
		click_num(event.key);
	}else if(code == 8){
		on_bckspace();
	}else if(code == 27){
		on_clear();
	}else if(code == 187){
		if (shiftKey){
			on_add();
		}else{
			on_equals();
		}
	}else if(code == 13){
		on_equals();
	}else if(code == 189){
		if (!shiftKey){
			on_sub();
		}
	}else if (code == 56){
		if (shiftKey){
			on_times();
		}
	}else if (code == 191){
		if (!shiftKey){
			on_div();
		}
	}else if (code == 190){
		if (!shiftKey){
			on_dot();
		}
	}else if (code == 54){
		if (shiftKey){
			on_pow();
		}
	}else if (code ==49){
		if (shiftKey){
			on_faq();
		}
	}else if(code == 46){
		if (!shiftKey){
			on_ce();
		}
	}else if(code == 53	){
		if (shiftKey){
			on_mod();
		}
	}else if(code == 83	){
		on_sin();
	}else if(code == 67	){
		on_cos();
	}else if(code == 84	){
		on_tan();
	}
}

function on_equals(){
	while (stack.length > 1){		
		var op = stack.pop();
		if (typeof(op)=="number"){
			temp = op;
			op = stack.pop();
		}
		var op1 = stack.pop();
		var op2 = Number(temp);
		solu = op(op1, op2);
		stack.push(solu);
		clear_temp();
	}
	if (stack.length>0){
		clear_temp();
		display(stack[stack.length-1]);
	}else{
		var sub = Number(temp);
		clear_temp();
		add_temp(sub);
	}
	clear_sub();
}

function get_string(func, a){
	switch(func){
		case div:
			return a+" ÷ ";
		case add:
			return a +" + ";
		case sub:
			return a +" - ";
		case times:
			return a +" x ";
		case mod:
			return a +" % ";
		case pow:
			return a +" ^ ";
		case sin:
			return "sin("+a+")";
		case cos:
			return "cos("+a+")";
		case tan:
			return "tan("+a+")";
		case log:
			return "log("+a+")";
		case faq:
			return a+"!";
		case sqrt:
			return "&Sqrt;("+a+")";
		case pow10x:
			return 10+"^("+a+")";
		default:
			return "";

	}
}

function on_dot(){
	add_temp(".");
}
function on_pi(){
	clear_temp();
	add_temp(Math.PI);
}
function on_exp(){
	add_temp(".e+0");
}

function on_ce(){
	clear_temp();
}
function on_clear(){
	clear_temp();
	stack=[];
	clear_sub();
}

function on_add(){
	push(add);
}
function on_sub(){
	push(sub);
}
function on_times(){
	push(times);
}
function on_div(){
	push(div);
}
function on_mod(){
	push(mod);
}
function on_pow(){
	push(pow);
}
function on_sq(){
	push(sq);
}
function on_sqrt(){
	push(sqrt);
}
function on_neg(){
	push(neg);
}
function on_pow10x(){
	push(pow10x);
}
function on_log(){
	push(log);
}
function on_faq(){
	push(faq);
}
function on_sin(){
	push(sin);
}
function on_cos(){
	push(cos);
}
function on_tan(){
	push(tan);
}

function on_bckspace(){
	var newtemp = temp.slice(0, temp.length-1);
	clear_temp();
	add_temp(newtemp);
}

function click_num(number){
	temp_sub = "";
	add_temp(number);
}
function clear_temp(){
	add_temp("");
	temp_sub = "";
}

function add(a, b){
	return a+b;
}
function sub(a, b){
	return a-b;
}
function times(a, b){
	return a*b;
}
function div(a, b){
	return a/b;
}
function mod(a, b){
	return a%b;
}
function pow(a, b){
	return Math.pow(a, b);
}
function sq(a){
	return Math.pow(a, 2);
}
function sqrt(a){
	return Math.sqrt(a);
}
function neg(a){
	return -a;
}
function pow10x(a){
	return Math.pow(10, a);
}
function log(a){
	return Math.log10(a);
}
function exp(a){
	return Math.pow(10, a);
}
function faq(a){
	if (a < 1){
		return 1;
	}else{
		return a*faq(a-1);
	}
}
function sin(a){
	return Math.sin(a);
}
function cos(a){
	return Math.cos(a);
}
function tan(a){
	return Math.tan(a);
}
function add_temp(val){
	if (val == ""){
		temp = "0";
	}else{		
		if (temp == "0"){
			if (!isNaN(Number(val))){
				temp = ""+val;
			}
		}else{
			if (!isNaN(Number(temp+val))){
				temp += ""+val;
			}	
		}
	}
	display(temp);

}
function display(val){
	scren.innerHTML = val;
}
function display_sub(val){
	sub_scren.innerHTML = val;
}
function add_sub(val){
	sub_val += val;
	sub_scren.innerHTML = sub_val;
}

function clear_sub(){
	sub_val = "";
	sub_scren.innerHTML = "";
}
