const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function startPM2() {
    info('Iniciando frontend com PM2...');
    await runCommand('pm2', ['start', 'npm', '--name', 'frontend', '--', 'start']);
    success('Frontend iniciado com PM2!');
}

module.exports = { startPM2 };
