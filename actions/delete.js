const { info, success } = require('../core/logger');

async function deleteAction() {
    info('Executando ação de delete...');
    success('Delete finalizado!');
}

module.exports = { delete: deleteAction };
