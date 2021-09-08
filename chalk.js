const chalk = require('chalk');

const validator=require('validator')
//console.log(chalk.redBright("Green"))

var check=validator.isEmail('malik.com');
console.log( check? chalk.green(check):chalk.red(check));