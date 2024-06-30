var OPERATORS_STR = "^/*+-"
var OPERATORS = []
for (var i = 0; i < OPERATORS_STR.length; i++){
    OPERATORS.push(OPERATORS_STR.charAt(i))
}
OPERATORS.reverse()


console.log(OPERATORS)