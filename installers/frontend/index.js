const { setEnv } = require('./setEnv');
const { installDeps } = require('./installDeps');
const { build } = require('./build');
const { startPM2 } = require('./startPM2');
const { setupNginx } = require('./setupNginx');

module.exports = {
    setEnv,
    installDeps,
    build,
    startPM2,
    setupNginx
};
