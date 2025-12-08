const chalk = require('chalk');

function showBanner() {
    console.log(chalk.blue(`
     ___       _           _        _    _ _       
    / _ \\ _ __(_)_   _____| | ___  | |  (_) | ___  
   | | | | '__| \\ \\ / / _ \\ |/ _ \\ | |  | | |/ _ \\ 
   | |_| | |  | |\\ V /  __/ |  __/ | |__| | |  __/ 
    \\___/|_|  |_| \\_/ \\___|_|\\___| |____/|_|\\___| 
    `));
}

module.exports = { showBanner };
