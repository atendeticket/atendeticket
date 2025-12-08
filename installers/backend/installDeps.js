const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installDeps() {
    info('Instalando dependências do backend...');
    await runCommand('npm', ['install']);
    success('Dependências do backend instaladas!');
}

module.exports = { installDeps };
