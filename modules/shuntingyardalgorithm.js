// Declaring the operators in the order of precedence from high to low
var OPERATORS_STR = "^/*+-"
var OPERATORS = []
for (var i = 0; i < OPERATORS_STR.length; i++){
    OPERATORS.push(OPERATORS_STR.charAt(i));
}
// Reverses the order to make it from low to high (so we can compare the order using indices)
OPERATORS.reverse()

function separate_tokens(expression) {
    let token_list = [];
    let is_reading_number = false;
    let number_read = "";

    for (let char of expression) {
        // Ignore blank spaces
        if (char === ' ') {
            continue;
        } else {
            if (!isNaN(parseInt(char))) {
                is_reading_number = true;
                number_read += char;
            } else {
                if (is_reading_number) {
                    token_list.push(parseInt(number_read));
                    is_reading_number = false;
                    number_read = "";
                }
                token_list.push(char);
            }
        }
    }

    if (is_reading_number) {
        token_list.push(parseInt(number_read));
    }

    return token_list;
}

function sya(list) {
    let queue = [];
    let stack = [];

    for (let token of list) {
        if (!isNaN(parseInt(token))) {
            queue.push(token);
        } else if (OPERATORS.includes(token)) {
            let token_rank = OPERATORS.indexOf(token);
            while (stack.length > 0 && OPERATORS.includes(stack[stack.length - 1]) && OPERATORS.indexOf(stack[stack.length - 1]) > token_rank) {
                queue.push(stack.pop());
            }
            stack.push(token);
        } else if (token === '(') {
            stack.push(token);
        } else if (token === ')') {
            while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                queue.push(stack.pop());
            }
            stack.pop(); // Discard the left bracket
        } else {
            return [];
        }
    }

    while (stack.length > 0) {
        queue.push(stack.pop());
    }

    return queue;
}

function operate(a, b, operator) {
    switch (operator) {
        case "^":
            return Math.pow(a, b);
        case "/":
            return a / b;
        case "*":
            return a * b;
        case "+":
            return a + b;
        case "-":
            return a - b;
        default:
            return NaN; // Handle invalid operators
    }
}

function perform_operations(reverse_polish) {
    let stack = [];

    for (let token of reverse_polish) {
        if (!isNaN(parseInt(token))) {
            stack.push(token);
        } else if (OPERATORS.includes(token)) {
            let n2 = stack.pop();
            let n1 = stack.pop();
            let result = operate(n1, n2, token);
            stack.push(result);
        }
    }

    return stack.pop();
}

function evaluate(expression) {
    try {
        let token_list = separate_tokens(expression);
        let reverse_polish_stack = sya(token_list);
        let answer = perform_operations(reverse_polish_stack);
        if (isNaN(answer)) answer = "Invalid Expression";
        return answer;
    } catch (error) {
        if (error instanceof TypeError || error instanceof SyntaxError) {
            return "Invalid Expression";
        } else if (error instanceof Error && error.message.includes("Division by zero")) {
            return "Invalid Expression ( Division by Zero )";
        }
    }
}