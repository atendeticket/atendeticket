const inquirer = require('inquirer');

async function updatePrompts() {
    const answers = await inquirer.prompt([
        { type: 'confirm', name: 'updateSystem', message: 'Deseja atualizar o sistema?', default: true },
        { type: 'confirm', name: 'updateBackend', message: 'Deseja atualizar o backend?', default: true },
        { type: 'confirm', name: 'updateFrontend', message: 'Deseja atualizar o frontend?', default: true },
    ]);
    return answers;
}

module.exports = { updatePrompts };
