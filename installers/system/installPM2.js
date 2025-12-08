const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installPM2() {
    info('Instalando PM2...');
    await runCommand('sudo', ['npm', 'install', '-g', 'pm2']);
    success('PM2 instalado!');
}

module.exports = { installPM2 };
