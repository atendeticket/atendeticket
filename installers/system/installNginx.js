const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installNginx() {
    info('Instalando Nginx...');
    await runCommand('sudo', ['apt', 'install', '-y', 'nginx']);
    await runCommand('sudo', ['systemctl', 'enable', '--now', 'nginx']);
    success('Nginx instalado!');
}

module.exports = { installNginx };
