const { info, success } = require('../../core/logger');
const fs = require('fs');
const path = require('path');

async function setEnv(node_env, backend_url, frontend_url, port, db_host, db_user, db_pass, db_name, db_port, db_dialect, jwt_secret, jwt_refresh_secret, redis_uri, user_limit, connections_limit) {
    info('Configurando variáveis de ambiente (backend)...');

    // ensure idempotency
    let backendUrl = backend_url.replace(/^https?:\/\//, '');
    backendUrl = backendUrl.split('/')[0];
    backendUrl = `https://${backendUrl}`;

    // ensure idempotency
    let frontendUrl = frontend_url.replace(/^https?:\/\//, '');
    frontendUrl = frontendUrl.split('/')[0];
    frontendUrl = `https://${frontendUrl}`;

    const envContent = `NODE_ENV=${node_env}

BACKEND_URL=${backendUrl}
FRONTEND_URL=${frontendUrl}
PORT=${port}

DB_HOST=${db_host}
DB_USER=${db_user}
DB_PASS=${db_pass}
DB_NAME=${db_name}
DB_PORT=${db_port}
DB_DIALECT=${db_dialect}

JWT_SECRET=${jwt_secret}
JWT_REFRESH_SECRET=${jwt_refresh_secret}

REDIS_URI=${redis_uri}

USER_LIMIT=${user_limit}
CONNECTIONS_LIMIT=${connections_limit}`;

    const envPath = path.join(process.cwd(), 'backend', '.env');
    fs.writeFileSync(envPath, envContent);

    success('Variáveis de ambiente do backend configuradas!');
}

module.exports = { setEnv };
