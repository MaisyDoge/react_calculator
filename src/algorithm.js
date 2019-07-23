class Operation {
    constructor(operation, prevNum) {
        this.operation = operation;
        this.prevNum = prevNum;
        this.postNum = undefined;
        this.tier = ['*', '/'].includes(operation) ? 2 : 1;
    }
    evaluate() {
        if (this.prevNum === undefined || this.postNum === undefined) {
            return undefined;
        }
        try {
            this.prevNum.number = parseFloat(this.prevNum.number);
            this.postNum.number = parseFloat(this.postNum.number);
        } catch (error) {
            return undefined;
        }
        switch (this.operation) {
            case '+':
                return this.prevNum.number + this.postNum.number;
            case '-':
                return this.prevNum.number - this.postNum.number;
            case '*':
                return this.prevNum.number * this.postNum.number;
            case '/':
                return this.prevNum.number / this.postNum.number;
            default:
                return undefined;
        }
    }
}
class Number {
    constructor(number, prevOp = undefined, postOp = undefined) {
        this.number = number;
        this.prevOp = prevOp;
        this.postOp = postOp;
    }
}
function Algorithm(question) {
    console.log("question is " + question);
    // base cases
    if (question.length === 0) {
        return '';
    } else if (question.length === 1 && !isNaN(question[0])) {
        return parseInt(question[0], 10);
    } else if (question.length === 1 && isNaN(question[0])) {
        return '';
    } else if (isNaN(question[0])) {
        return '';
    }
    const numbers = ['.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const operations = ['+', '-', '*', '/'];
    let previous;
    let str;
    let current;
    // convert question to list of operations
    const listOfTier2 = [];
    const listOfTier1 = [];
    for (let i = 0; i < question.length; i += 1) {
        str = question[i];
        if (previous === undefined) {
            //is a number
            previous = 1;
            current = new Number(str);
            continue;
        } else if (current !== undefined) {
            // we can assume that current is the int from the last iteration
            if (numbers.includes(str)) {
                current.number += str;
                continue;
            } else if (operations.includes(str)) {
                const newOp = new Operation(str, current);
                current.postOp = newOp;
                if (newOp.tier === 2) {
                    listOfTier2.push(newOp);
                } else if (newOp.tier === 1) {
                    listOfTier1.push(newOp);
                }
                previous = newOp;
                current = undefined;
                continue;
            } else {
                return '';
            }
        }
        // we can assume that the last string was an op
        // current is int, previous is Operation
        if (previous !== 1) {
            const newInt = new Number(str, previous);
            previous.postNum = newInt;
            current = newInt;
        }
        
    }
    var op;
    var res;
    try {
        for (var i=0;i<listOfTier2.length;i+=1) {
            if (i === listOfTier2.length-1 && listOfTier1.length === 0) {
                res = listOfTier2[i].evaluate();
                return res !== undefined ? res : "";
            } else {
                op = listOfTier2[i];
                res = op.evaluate();
                if (op.postNum.postOp !== undefined) {
                    op.prevNum.number = res;
                    op.postNum.postOp.prevNum = op.prevNum;
                } else if (op.prevNum.prevOp !== undefined) {
                    op.postNum.number = res;
                    op.prevNum.prevOp.postNum = op. postNum;
                }
            }
        }
        for (var i=0;i<listOfTier1.length;i+=1) {
            if (i === listOfTier1.length-1) {
                res = listOfTier1[i].evaluate();
                return res !== undefined ? res : "";
            } else {
                op = listOfTier1[i];
                res = op.evaluate();
                if (op.postNum.postOp !== undefined) {
                    op.prevNum.number = res;
                    op.postNum.postOp.prevNum = op.prevNum;
                } else if (op.prevNum.prevOp !== undefined) {
                    op.postNum.number = res;
                    op.prevNum.prevOp.postNum = op. postNum;
                }
            }
        }
        if (current !== undefined) {
            return current.number;
        }
    } catch (error) {
        return '';
    }
    return '';
}
export default Algorithm;
