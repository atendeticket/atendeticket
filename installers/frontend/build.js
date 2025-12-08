const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function build() {
    info('Construindo frontend...');
    await runCommand('npm', ['run', 'build']);
    success('Frontend construído!');
}

module.exports = { build };
