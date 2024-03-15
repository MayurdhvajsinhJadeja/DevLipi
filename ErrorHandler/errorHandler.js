const { globalLog } = require('../Log/log');

class ErrorHandler {
    constructor() {
        this.log = globalLog;
    };

    throw(msg, line, col) {
        let err;
        if (line && col) {
            err = `${msg} -- line: ${line}, col: ${col}`
        } else {
            err = `${msg}`
        };
        try {
            throw new Error(err);
        } catch (e) {
            // console.error(e);
            this.log.error(e, line);
            // process.exit(1);
        };
    };
};

module.exports = {
    ErrorHandler,
};