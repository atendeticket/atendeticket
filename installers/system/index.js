const { updateSystem } = require('./updateSystem');
const { installNode } = require('./installNode');
const { installDocker } = require('./installDocker');
const { installPM2 } = require('./installPM2');
const { installNginx } = require('./installNginx');
const { installCertbot } = require('./installCertbot');
const { createUser } = require('./createUser');

module.exports = {
    updateSystem,
    installNode,
    installDocker,
    installPM2,
    installNginx,
    installCertbot,
    createUser
};
