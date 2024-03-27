const { ErrorHandler } = require('../ErrorHandler/errorHandler');
const { ScriptFunction } = require('../scriptFunction');

class Assignment {
    constructor(token, expression, evaluator, environment) {
        this.identifier = token.value;
        this.expression = expression;

        this.evaluator = evaluator;
        this.environment = environment;
        this.evaluator.load(expression);
        this.value = this.evaluator.evaluate().value;
        this.operate();
    };
    operate() {
        this.environment.assign(this.identifier, this.value);
    };
};

class Binary {
    constructor(leftNode, operator, rightNode, evaluator) {
        this.evaluator = evaluator;

        this.evaluator.load(leftNode);
        this.leftNode = this.evaluator.evaluate();

        this.evaluator.load(rightNode);
        this.rightNode = this.evaluator.evaluate();

        this.operator = operator.type;
        this.value = this.operate();
    };

    operate() {
        if (this.operator == 'PLUS') {
            return this.leftNode.value + this.rightNode.value;
        };
        if (this.operator == 'MINUS') {
            return this.leftNode.value - this.rightNode.value;
        };
        if (this.operator == 'MULTIPLY') {
            return this.leftNode.value * this.rightNode.value;
        };
        if (this.operator == 'DIVIDE') {
            return this.leftNode.value / this.rightNode.value;
        };
        if (this.operator == 'MODULO') {
            return this.leftNode.value % this.rightNode.value;
        };
        if (this.operator == 'EQUALTO') {
            return this.leftNode.value == this.rightNode.value;
        };
        if (this.operator == 'NOTEQUALTO') {
            return this.leftNode.value != this.rightNode.value;
        };
        if (this.operator == 'GREATERTHAN') {
            return this.leftNode.value > this.rightNode.value;
        };
        if (this.operator == 'LESSTHAN') {
            return this.leftNode.value < this.rightNode.value;
        };
        if (this.operator == 'GREATERTHANEQUAL') {
            return this.leftNode.value >= this.rightNode.value;
        };
        if (this.operator == 'LESSTHANEQUAL') {
            return this.leftNode.value <= this.rightNode.value;
        };
    }
};

class Unary {
    constructor(operator, expression, evaluator) {
        this.evaluator = evaluator;
        this.evaluator.load(expression);

        this.operator = operator;
        this.expression = expression;
        this.value = this.operate();
    }
    operate() {
        if (this.operator.type == "MINUS") {
            return (- (this.evaluator.evaluate().value));
        };
        if (this.operator.type == "PLUS") {
            return (this.evaluator.evaluate().value);
        }
        if (this.operator.type == "NOT") {
            return !(this.evaluator.evaluate().value);
        }
    };
}

class Call {
    constructor(callee, args, evaluator, environment) {
        this.errorHandler = new ErrorHandler();
        this.callee = callee;
        this.evaluator = evaluator;
        this.args = this.evaluateArgs(args);
        this.environment = environment;
        this.value = this.operate();
    };

    evaluateArgs(args) {
        let parsedArgs = [];
        for (let arg of args) {
            this.evaluator.load(arg);
            let argValue = this.evaluator.evaluate().value;
            parsedArgs.push(argValue);
        }
        return parsedArgs;
    };

    operate() {
        const scriptFunction = this.environment.get(this.callee.value);
        if (!(scriptFunction instanceof ScriptFunction)) {
            this.errorHandler.throw(
                `INVALID CALLEE TYPE`,
                this.callee.line,
                this.callee.col,
            );
        };
        return scriptFunction.call(this.args);
    };
};

class Literal {
    constructor(token) {
        if (token.type == "NUMBER") {
            this.value = parseFloat(token.value);
        };
        if (token.type == "STRING") {
            this.value = token.value;
        };
    };
};

class Group {
    constructor(expression, evaluator) {
        this.evaluator = evaluator;
        this.evaluator.load(expression);
        this.value = this.evaluator.evaluate().value;
    };
};

class Variable {
    constructor(token, environment) {
        this.identifier = token.value;
        this.environment = environment;
        this.value = this.fetchValue();
    }
    fetchValue() {
        return this.environment.get(this.identifier);
    };
}
class Evaluator {
    constructor(environment) {
        this.environment = environment;

        this.errorHandler = new ErrorHandler();
        this.rawExpression = null;
        this.index = null;
        this.previousToken = null;
        this.currentToken = null;
        this.nextToken = null;
        this.openingParen = 0;
        this.closingParen = 0;
        this.bars = 0;
    };

    load(tokens) {
        this.rawExpression = tokens;
        this.resetToEnd();
    }

    reset() {
        this.index = 0;
        this.previousToken = null;
        this.currentToken = this.rawExpression[this.index];
        this.nextToken = this.rawExpression[this.index + 1];
        this.openingParen = 0;
        this.closingParen = 0;

        this.checkParenthese();
        this.checkBar();
    };

    resetToEnd() {
        this.index = this.rawExpression.length - 1;
        this.previousToken = this.rawExpression[this.index - 1];
        this.currentToken = this.rawExpression[this.index];
        this.nextToken = null;
        this.openingParen = 0;
        this.closingParen = 0;

        this.checkParenthese();
        this.checkBar();
    };

    next() {
        this.index++;
        this.previousToken = this.rawExpression[this.index - 1];
        this.currentToken = this.rawExpression[this.index];
        this.nextToken = this.rawExpression[this.index + 1];

        this.checkParenthese();
        this.checkBar();
    };

    prev() {
        this.index--;
        this.previousToken = this.rawExpression[this.index - 1];
        this.currentToken = this.rawExpression[this.index];
        this.nextToken = this.rawExpression[this.index + 1];

        this.checkParenthese();
        this.checkBar();
    };

    checkParenthese() {
        if (this.currentToken) {
            if (this.currentToken.type == "LPAREN") {
                this.openingParen++;
            };
            if (this.currentToken.type == "RPAREN") {
                this.closingParen++;
            };
        };
    };

    checkBar() {
        if (this.currentToken) {
            if (this.currentToken.type == "BAR") {
                this.bars++;
            };
        };
    };

    isInGroup() {
        return (this.openingParen != this.closingParen) || (this.bars % 2 != 0);
    }

    isOperator(token) {
        let operators = [
            "MULTIPLY",
            "DIVIDE",
            "PLUS",
            "MINUS",
            "MODULO",
            "GREATERTHAN",
            "GREATERTHANEQUAL",
            "LESSTHAN",
            "LESSTHANEQUAL",
            "EQUALTO",
            "NOTEQUALTO",
            "NOT",
        ];
        return (operators.includes(token.type));
    };

    isEqualityOperator(token) {
        let operators = [
            "EQUALTO",
            "NOTEQUALTO",
        ];
        return (operators.includes(token.type));
    }

    isComparissonOperator(token) {
        let operators = [
            "GREATERTHAN",
            "GREATERTHANEQUAL",
            "LESSTHAN",
            "LESSTHANEQUAL",
        ];
        return (operators.includes(token.type));
    }

    isAdditionOperator(token) {
        let operators = [
            "PLUS",
            "MINUS",
        ];
        return (operators.includes(token.type));
    }

    isMultiplicationOperator(token) {
        let operators = [
            "MULTIPLY",
            "DIVIDE",
            "MODULO",
        ];
        return (operators.includes(token.type));
    }

    isUnaryOperator(token) {
        let operators = [
            "MINUS",
            "NOT",
            "PLUS",
        ];
        return (operators.includes(token.type));
    }

    isLiteral(token) {
        let types = [
            "STRING",
            "NUMBER",
        ];
        return (types.includes(token.type));
    }

    isReserved(token) {
        let types = [
            // "FOR",
            "WHILE",
            // "RETURN",
            "SHOW",
        ];
        return types.includes(token.type);
    };

    isForbidden(token) {
        let types = [
            "RBRACE",
            "LBRACE",
            "SEMICOLON",
            "DOT",
            "DECLARATOR",
        ];
        return types.includes(token.type);
    }

    handleAssignment() {
        // console.log('isAssignment')
        let assigned = this.rawExpression.slice(0, this.index);
        let expression = this.rawExpression.slice(this.index + 1);

        if (assigned.length != 1 || !expression.length) {
            this.errorHandler.throw(
                'UNABLE TO PARSE ASSIGNMENT',
                this.currentToken.line,
                this.currentToken.col
            );
        };

        let identifier = assigned[0];

        if (identifier.type != 'IDENTIFIER') {
            this.errorHandler.throw(
                'INVALID ASSIGNEE',
                this.currentToken.line,
                this.currentToken.col
            );
        };

        let node = new Assignment(
            identifier,
            expression,
            this,
            this.environment
        );
        return node;
    };

    handleBinary() {
        // console.log('isBinary')
        let leftNode = this.rawExpression.slice(0, this.index);
        let rightNode = this.rawExpression.slice(this.index + 1);

        if (!leftNode.length || !rightNode.length) {
            this.errorHandler.throw(
                'UNABLE TO PARSE BINARY EXPRESSION',
                this.currentToken.line,
                this.currentToken.col
            );
        };

        let node = new Binary(
            leftNode,
            this.currentToken,
            rightNode,
            this
        )
        return node;
    }

    handleUnary() {
        // console.log('isUnary')
        let expr = this.rawExpression.slice(this.index + 1);

        if (!expr.length) {
            this.errorHandler.throw(
                'UNABLE TO PARSE UNARY EXPRESSION',
                this.currentToken.line,
                this.currentToken.col
            );
        }

        let node = new Unary(
            this.currentToken,
            expr,
            this,
        );
        return node;
    };

    handleCall() {
        let callee = this.previousToken;
        let args = [];
        let currentArgument = [];

        this.next();
        if (!this.currentToken) {
            this.errorHandler.throw(
                `UNABLE TO PARSE CALL EXPRESSION`,
                this.previousToken.line,
                this.previousToken.col
            );
        }

        while (this.currentToken.type != 'BAR') {
            if (this.currentToken.type != 'COMMA') {
                currentArgument.push(this.currentToken);
            } else {
                args.push(currentArgument);
                currentArgument = [];
            };
            this.next();
            if (!this.currentToken) {
                this.errorHandler.throw(
                    `EXPECTED '|' after argument list`,
                    this.previousToken.line,
                    this.previousToken.col
                )
            };
        };

        if (currentArgument.length) {
            args.push(currentArgument);
            currentArgument = [];
        }

        let node = new Call(
            callee,
            args,
            this,
            this.environment,
        )
        return node;
    };

    handleOpenParen() {
        // console.log('isGroup')
        let group = []
        while (this.isInGroup()) {
            group.push(this.currentToken);
            this.next();
            if (!this.currentToken) {
                this.errorHandler.throw(`EXPECTED ')' AFTER EXPRESSION -- EOF`);
            };
        };
        let node = new Group(
            group,
            this
        );
        return node;
    };

    handlePrimary() {
        // console.log('isPrimary')
        let node = new Literal(this.currentToken);
        return node;
    };

    handleVariable() {
        // console.log('isVariable')
        let node = new Variable(
            this.currentToken,
            this.environment
        );
        return node;
    };

    handleReserved() {
        this.errorHandler.throw(
            'UNEXPECTED KEYWORD',
            this.currentToken.line,
            this.currentToken.col,
        );
    };

    handleForbidden() {
        this.errorHandler.throw(
            'FORBIDDEN SYMBOL IN EXPRESSION',
            this.currentToken.line,
            this.currentToken.col,
        );
    };

    evaluate() {
        while (this.currentToken) {
            if (this.isForbidden(this.currentToken)) {
                this.handleForbidden();
            };
            this.prev();
        };
        this.resetToEnd();

        while (this.currentToken) {
            if (this.isReserved(this.currentToken)) {
                this.handleReserved();
            };
            this.prev();
        };
        this.reset();

        while (this.currentToken && this.nextToken) {
            if (this.isLiteral(this.currentToken) && this.isLiteral(this.nextToken)) {
                this.errorHandler.throw(
                    'UNEXPECTED LITERAL',
                    this.nextToken.line,
                    this.nextToken.col
                );
            };
            this.next();
        };
        this.reset();

        while (this.currentToken) {
            if (this.currentToken.type == 'EQUALS') {
                if (!this.isInGroup()) {
                    return this.handleAssignment();
                };
            };
            this.next();
        };
        this.resetToEnd();

        while (this.index >= 0) {
            if (this.isEqualityOperator(this.currentToken)) {
                if (!this.isInGroup()) {
                    return this.handleBinary();
                };
            };
            this.prev();
        };
        this.resetToEnd();

        while (this.index >= 0) {
            if (this.isComparissonOperator(this.currentToken)) {
                if (!this.isInGroup()) {
                    return this.handleBinary();
                };
            };
            this.prev();
        };
        this.resetToEnd();

        while (this.index >= 0) {
            if (this.isAdditionOperator(this.currentToken)) {
                if (!this.isInGroup()) {
                    if (this.previousToken) {
                        if (!this.isOperator(this.previousToken)) {
                            return this.handleBinary();
                        };
                    };
                };
            };
            this.prev();
        };
        this.resetToEnd();

        while (this.index >= 0) {
            if (this.isMultiplicationOperator(this.currentToken)) {
                if (!this.isInGroup()) {
                    return this.handleBinary();
                };
            };
            this.prev();
        };
        this.reset();

        while (this.currentToken) {
            if (this.isUnaryOperator(this.currentToken)) {
                if (!this.isInGroup()) {
                    return this.handleUnary();
                };
            };
            this.next();
        };
        this.reset();

        while (this.currentToken) {
            if (this.currentToken.type == 'BAR') {
                return this.handleCall();
            };
            this.next();
        };
        this.reset();

        while (this.currentToken) {
            if (this.currentToken.type == "LPAREN") {
                this.next();
                return this.handleOpenParen();
            };
            this.next();
        };
        this.reset();

        while (this.currentToken) {
            if (this.currentToken.type == "NUMBER" || this.currentToken.type == "STRING") {
                return this.handlePrimary();
            };
            this.next();
        };
        this.reset();

        while (this.currentToken) {
            if (this.currentToken.type == "IDENTIFIER") {
                return this.handleVariable();
            };
            this.next();
        };
        this.reset();

        return {
            value: undefined,
        };

    };
};

module.exports = {
    Evaluator,
};
