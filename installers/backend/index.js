const { createDatabase } = require('./createDatabase');
const { createRedis } = require('./createRedis');
const { setEnv } = require('./setEnv');
const { installDeps } = require('./installDeps');
const { build } = require('./build');
const { migrate } = require('./migrate');
const { seed } = require('./seed');
const { startPM2 } = require('./startPM2');
const { setupNginx } = require('./setupNginx');

module.exports = {
    createDatabase,
    createRedis,
    setEnv,
    installDeps,
    build,
    migrate,
    seed,
    startPM2,
    setupNginx
};
