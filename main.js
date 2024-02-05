const fs = require('fs');
const path = require('path');
const { Lexer } = require('./lexer');

const filePath = './index.lipi';

if (path.extname(filePath) !== '.lipi') {
    console.error('Invalid file extension. Expected .lipi');
} else {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err}`);
            return;
        }
        const lexer = new Lexer(data);
        const tokens = lexer.tokens;
        console.log('Tokens:', tokens);
    });
}
