class Log {
    constructor() {
        this.values = '';
    };

    add(log) {
        console.log('\x1b[32m%s\x1b[0m', 'saphalam:');
        console.log(log); 
    };

    error(e, ln) {
        console.log('\x1b[31m%s\x1b[0m', 'truṭiḥ utpannā');
        console.error(`Error: ${e.message}`);
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
