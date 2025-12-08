const { runCommand } = require('../../core/exec');
const { info } = require('../../core/logger');

async function installNode() {
    info('Instalando Node.js...');
    await runCommand('sudo', ['apt', 'update']);
    await runCommand('sudo', ['apt', 'install', '-y', 'nodejs', 'npm']);
}

module.exports = { installNode };
