// Log.js
class Log {
    constructor() {
        this.values = '';
        this.headerPrinted = false;
        this.commonErrors = new Set();
    }

    add(log) {
        if (!this.headerPrinted) {
            console.log('\x1b[32m%s\x1b[0m', 'saphalam:');
            this.headerPrinted = true;
        }
        console.log(log);
    }

    error(e, ln) {
        if (!this.headerPrinted) {
            console.log('\x1b[31m%s\x1b[0m', 'truṭiḥ utpannā');
            this.headerPrinted = true;
        }

        const errorMessage = ln
            ? `Error: ${e.message} -- line: ${ln.line}, col: ${ln.col}`
            : `Error: ${e.message}`;

        if (!this.commonErrors.has(errorMessage)) {
            console.error(errorMessage);
            this.commonErrors.add(errorMessage);
        }
    }

    clear() {
        this.values = '';
        this.headerPrinted = false;
        this.commonErrors.clear();
        return this;
    }
}

let globalLog = new Log();
module.exports = { globalLog };