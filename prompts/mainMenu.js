const inquirer = require('inquirer');

async function mainMenuPrompt() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Escolha uma ação:',
            choices: [
                { name: 'Instalar sistema', value: 'install' },
                { name: 'Atualizar sistema', value: 'update' },
            ],
        },
    ]);
    return answers.action;
}

module.exports = { mainMenuPrompt };
