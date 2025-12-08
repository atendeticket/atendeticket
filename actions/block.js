const { info, success } = require('../core/logger');

async function block() {
    info('Executando ação de block...');
    success('Block finalizado!');
}

module.exports = { block };
