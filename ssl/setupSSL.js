const { runCommand } = require('../core/exec');
const { info, success } = require('../core/logger');

async function setupSSL(domain) {
    info(`Configurando SSL para ${domain}...`);
    await runCommand('sudo', ['certbot', '--nginx', '-d', domain, '--non-interactive', '--agree-tos', '-m', 'admin@' + domain]);
    success(`SSL configurado para ${domain}!`);
}

module.exports = { setupSSL };
