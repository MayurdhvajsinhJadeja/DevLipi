class Log {
    constructor() {
        this.values = '';
    };

    add(log) {
        console.log(log); 
    };

    error(e, ln) {
        console.error(`Error: ${e.message} at line ${ln}`);
    };

    clear() {
        this.values = '';
        return this;
    };
};

let globalLog = new Log();

module.exports = {
    globalLog,
};
