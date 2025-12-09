const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function installNode() {
    info('Instalando Node.js + NPM + NPX...');
    await runCommand('curl', ['-fsSL', 'https://deb.nodesource.com/setup_20.x', '|', 'bash', '-']);
    await runCommand('sudo', ['apt', 'install', '-y', 'nodejs']);
    await runCommand('sudo', ['npm', 'install', '-g', 'npm@latest']);
    success('Node.js + NPM + NPX instalados!');
}

module.exports = { installNode };
