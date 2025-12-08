const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function createUser(username) {
    info(`Criando usuário ${username}...`);
    await runCommand('sudo', ['adduser', username]);
    success(`Usuário ${username} criado!`);
}

module.exports = { createUser };
