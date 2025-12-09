const inquirer = require("inquirer");

async function installPrompts() {
    const answers = await inquirer.prompt([
        { type: 'input', name: 'domain', message: 'Informe o domínio:' },
        { type: 'confirm', name: 'ssl', message: 'Deseja configurar SSL?', default: true },
    ]);
    return answers;
}

module.exports = { installPrompts };
