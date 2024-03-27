#!/usr/bin/env node
const { Interpreter } = require('./interpreter');
const fs = require('fs');

class DevLipi {
  constructor(input) {
    this.input = input;
    this.interpreter = new Interpreter(this.input);
  }
}

const fetchSource = () => {
  let file = process.argv[2];
  if (!file) {
    console.log('USAGE -- [ aarambh <filename.lipi> ]');
    process.exit(1);
  } else {
    try {
      if (!fs.existsSync(file)) {
        console.log(`ERROR: File '${file}' not found`);
        process.exit(1);
      } else if (!file.endsWith('.lipi')) {
        console.log('ERROR: Please provide a .lipi extension file');
        process.exit(1);
      }
      const data = fs.readFileSync(file, 'utf8');
      return data;
    } catch (e) {
      console.log('Error:', e.stack);
    }
  }

  return [];
};

console.time('interpreting time');
const program = new DevLipi(fetchSource());
const logs = program.interpreter.parser.log.values;
console.log(logs);
console.timeEnd('interpreting time');

module.exports = {
  DevLipi,
};
