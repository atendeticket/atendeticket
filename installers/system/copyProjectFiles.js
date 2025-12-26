const { runCommand } = require('../../core/exec');
const { info } = require('../../core/logger');
const path = require('path');

async function systemCopyProjectFiles(instanceName) {
    info(`💻 Copiando arquivos do projeto para ${instanceName}...`);

    // Assume AtendeTicket.zip está no diretório raiz do projeto
    const zipPath = path.join(__dirname, '../../AtendeTicket.zip');

    // Copia o zip para a pasta da instância
    await runCommand('sudo', ['cp', '-f', zipPath, `/home/deploy/${instanceName}/`]);

    // Muda proprietário para deploy
    await runCommand('sudo', ['chown', 'deploy:deploy', `/home/deploy/${instanceName}/AtendeTicket.zip`]);

    info(`✅ Arquivos copiados com sucesso!`);
}

module.exports = { systemCopyProjectFiles };
