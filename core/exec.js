const { spawn } = require('cross-spawn');
const { info, error } = require('./logger');

function runCommand(cmd, args = []) {
    return new Promise((resolve, reject) => {
        const child = spawn(cmd, args, { stdio: 'inherit' });
        child.on('close', code => {
            if (code === 0) resolve();
            else reject(new Error(`${cmd} falhou com código ${code}`));
        });
    });
}

module.exports = { runCommand };
