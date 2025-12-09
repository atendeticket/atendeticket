const inquirer = require("inquirer");

async function mainMenuPrompt() {
    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Escolha uma ação:',
            choices: [
                { name: 'Instalar sistema', value: 'install' },
                { name: 'Atualizar sistema', value: 'update' },
                { name: 'Deletar instância', value: 'delete' },
                { name: 'Bloquear instância', value: 'block' },
                { name: 'Desbloquear instância', value: 'unblock' },
                { name: 'Alterar domínio', value: 'changeDomain' },
            ],
        },
    ]);
    return answers;
}

module.exports = { mainMenuPrompt };
