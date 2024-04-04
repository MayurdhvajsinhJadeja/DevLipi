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
      const filename = file.endsWith('.lipi') ? file : file + '.lipi';
      if (!fs.existsSync(filename)) {
        console.log(`ERROR: File '${filename}' not found`);
        process.exit(1);
      }
      const data = fs.readFileSync(filename, 'utf8');
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
