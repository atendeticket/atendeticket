const { updateSystem } = require('./updateSystem');
const { installNode } = require('./installNode');
const { installDocker } = require('./installDocker');
const { installPM2 } = require('./installPM2');
const { installNginx } = require('./installNginx');
const { installCertbot } = require('./installCertbot');
const { systemCreateUser } = require('./createUser');
const { systemCreateFolder } = require('./createFolder');
const { systemCopyProjectFiles } = require('./copyProjectFiles');
const { systemUnzipMultizap } = require('./unzipMultizap');
const { systemNginxRestart } = require('./nginxRestart');
const { systemCertbotSetup } = require('./certbotSetup');

module.exports = {
    updateSystem,
    installNode,
    installDocker,
    installPM2,
    installNginx,
    installCertbot,
    systemCreateUser,
    systemCreateFolder,
    systemCopyProjectFiles,
    systemUnzipMultizap,
    systemNginxRestart,
    systemCertbotSetup
};
