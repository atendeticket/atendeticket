const { info, success } = require('../core/logger');

async function changeDomain(domain) {
    info(`Alterando domínio para ${domain}...`);
    success(`Domínio alterado para ${domain}!`);
}

module.exports = { changeDomain };
