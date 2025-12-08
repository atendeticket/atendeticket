const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installDeps() {
    info('Instalando dependências do frontend...');
    await runCommand('npm', ['install']);
    success('Dependências do frontend instaladas!');
}

module.exports = { installDeps };
