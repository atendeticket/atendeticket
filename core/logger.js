const chalk = require('chalk');

function info(msg) {
    console.log(chalk.cyan('[INFO]'), msg);
}

function success(msg) {
    console.log(chalk.green('[SUCCESS]'), msg);
}

function error(msg) {
    console.error(chalk.red('[ERROR]'), msg);
}

module.exports = { info, success, error };
