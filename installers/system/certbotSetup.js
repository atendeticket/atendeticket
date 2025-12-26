const { runCommand } = require('../../core/exec');
const { info } = require('../../core/logger');

async function systemCertbotSetup(backendUrl, frontendUrl, email) {
    info('Configurando SSL com Certbot...');

    // Extract domains
    const backendDomain = backendUrl.replace(/^https?:\/\//, '').split('/')[0];
    const frontendDomain = frontendUrl.replace(/^https?:\/\//, '').split('/')[0];

    await runCommand('sudo', ['certbot', '--nginx', '--agree-tos', '--non-interactive', '--domains', `${backendDomain},${frontendDomain}`, '--email', email]);

    info('✅ SSL configurado com sucesso!');
}

module.exports = { systemCertbotSetup };
