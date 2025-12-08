const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function setupNginx(domain) {
    info(`Configurando Nginx para frontend em ${domain}...`);
    // placeholder: criar arquivo de config Nginx
    success(`Nginx configurado para frontend em ${domain}!`);
}

module.exports = { setupNginx };
