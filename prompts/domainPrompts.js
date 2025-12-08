const inquirer = require('inquirer');

async function domainPrompt() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'domain', message: 'Informe o domínio que deseja configurar:' }
    ]);
    return answers.domain;
}

module.exports = { domainPrompt };
