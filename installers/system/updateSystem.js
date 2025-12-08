const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function updateSystem() {
    info('Atualizando pacotes do sistema...');
    await runCommand('sudo', ['apt', 'update']);
    await runCommand('sudo', ['apt', 'upgrade', '-y']);
    success('Sistema atualizado!');
}

module.exports = { updateSystem };
