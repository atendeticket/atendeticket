const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function startPM2() {
    info('Iniciando backend com PM2...');
    await runCommand('pm2', ['start', 'npm', '--name', 'backend', '--', 'start']);
    success('Backend iniciado com PM2!');
}

module.exports = { startPM2 };
