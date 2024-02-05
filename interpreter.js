const { ErrorHandler } = require('./ErrorHandler/errorHandler');
const { Lexer } = require('./lexer');
const { Environment } = require('./Environment/environment');
const { Parser } = require('./parser');

const { globalLog } = require('./Log/log');

class Interpreter {
    constructor(input) {
        globalLog.clear();

        this.errorHandler = new ErrorHandler();
        this.environment = new Environment(null);
        this.lexer = new Lexer(input);
        this.parser = new Parser(this.environment);
        this.parser.load(this.lexer.tokens);
        this.statements = this.parser.parse();
    };
};

module.exports = {
    Interpreter,
};