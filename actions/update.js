const { updateSystem } = require('../installers/system/updateSystem');
const { info, success } = require('../core/logger');

async function update() {
    info('Iniciando atualização...');
    await updateSystem();
    success('Atualização concluída!');
}

module.exports = { update };
