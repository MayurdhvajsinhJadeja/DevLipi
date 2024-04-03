#!/usr/bin/env node
const readline = require('readline');
const { exec } = require('child_process');
const fs = require('fs');

// Function to display ASCII art
console.log('\x1b[32m%s\x1b[0m', `
        ______   _______           _       _________ _______ _________
       (  __  \\ (  ____ \\|\\     /|( \\      \\__   __/(  ____ )\\__   __/
       | (  \\  )| (    \\/| )   ( || (         ) (   | (    )|   ) (   
       | |   ) || (__    | |   | || |         | |   | (____)|   | |   
       | |   | ||  __)   ( (   ) )| |         | |   |  _____)   | |   
       | |   ) || (       \\ \\_/ / | |         | |   | (         | |   
       | (__/  )| (____/\\  \\   /  | (____/\\___) (___| )      ___) (___
       (______/ (_______/   \\_/   (_______/\\_______/|/       \\_______/
                                                                      
    `);

// Function to install VS Code extension
function installVSCodeExtension(extensionName) {
    exec(`code --install-extension ${extensionName}`, (error, stdout, stderr) => {
        if (error) {
            console.error('\x1b[31m%s\x1b[0m', `Error installing ${extensionName}: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error('\x1b[31m%s\x1b[0m', `stderr: ${stderr}`);
            return;
        }
        console.log('\x1b[32m%s\x1b[0m', `Installed ${extensionName} extension successfully.`);
        console.log('Execute the file using command `aarambh <filename.lipi>`')
    });
}

// Function to create file with specified content
function createFile(filename, content) {
    fs.writeFile(filename, content, (err) => {
        if (err) throw err;
        console.log('\x1b[32m%s\x1b[0m',`File ${filename} created successfully.`);
    });
}

// Main program
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter the name of the file to create: ', (filename) => {
    rl.question('Do you want to install a VS Code extension after creating the file? (yes/no): ', (answer) => {
        filename += '.lipi';
        // Creating file with specified content
        const fileContent = `kriya namaskar|| => {
    prakashan 'namaskar jivlok';
};

namaskar||;
-> For more examples visit-> https://devlipi-mj.github.io 
-> Made By Mayurdhvajsinh Jadeja <-`;
        createFile(filename, fileContent);

        if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y' ) {
            console.log('Installing DevLipi Extension for VS Code...');
            installVSCodeExtension('MayurdhvajsinhJadeja.devlipi');
            rl.close();
        } else {
            rl.close();
        }
    });
});
