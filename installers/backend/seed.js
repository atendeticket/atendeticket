const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function seed() {
    info('Populando banco com seed...');
    await runCommand('npm', ['run', 'seed']);
    success('Seed concluída!');
}

module.exports = { seed };
