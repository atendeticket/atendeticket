const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installCertbot() {
    info('Instalando Certbot...');
    await runCommand('sudo', ['apt', 'install', '-y', 'certbot', 'python3-certbot-nginx']);
    success('Certbot instalado!');
}

module.exports = { installCertbot };
