const { info, success } = require('../core/logger');

async function unblock() {
    info('Executando ação de unblock...');
    success('Unblock finalizado!');
}

module.exports = { unblock };
