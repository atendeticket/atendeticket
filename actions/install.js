const { installNode } = require('../installers/system/installNode');
const { info, success } = require('../core/logger');

async function install() {
    info('Iniciando instalação completa...');
    await installNode();
    success('Instalação concluída!');
}

module.exports = { install };
