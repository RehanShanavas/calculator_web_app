function display(character){
	if (character == ' '){
		return
	}
	document.getElementById("expression").value += character
}

function solve(){
	expression = document.getElementById("expression").value
	// result = math.evaluate(expression)
	result = expression
	document.getElementById("result").innerHTML = result
}

function key_pressed(event){
	x = 5
}