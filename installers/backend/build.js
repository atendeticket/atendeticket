const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function build() {
    info('Construindo backend...');
    await runCommand('npm', ['run', 'build']);
    success('Backend construído!');
}

module.exports = { build };
