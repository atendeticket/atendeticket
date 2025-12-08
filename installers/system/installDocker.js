const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installDocker() {
    info('Instalando Docker...');
    await runCommand('sudo', ['apt', 'install', '-y', 'docker.io']);
    await runCommand('sudo', ['systemctl', 'enable', '--now', 'docker']);
    success('Docker instalado!');
}

module.exports = { installDocker };
