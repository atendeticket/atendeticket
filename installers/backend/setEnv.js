const { info, success } = require('../../core/logger');
const fs = require('fs');
const path = require('path');

async function setEnv(node_env, backend_url, frontend_url, proxy_port, port, db_host, db_dialect, db_user, db_pass, db_name, db_port, master_key, import_fallback_file, timeout_to_import_message, app_trialexpiration, jwt_secret, jwt_refresh_secret, redis_uri, redis_opt_limiter_max, redis_opt_limiter_duration, flow_menu_cooldown_sec, user_limit, connections_limit, closed_send_by_me, verify_token, mp_access_token, facebook_app_id, facebook_app_secret, smtp_host, smtp_port, smtp_secure, smtp_user, smtp_pass, smtp_from) {
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
PROXY_PORT=${proxy_port}
PORT=${port}

DB_HOST=${db_host}
DB_DIALECT=${db_dialect}
DB_USER=${db_user}
DB_PASS=${db_pass}
DB_NAME=${db_name}
DB_PORT=${db_port}

MASTER_KEY=${master_key}

IMPORT_FALLBACK_FILE=${import_fallback_file}

TIMEOUT_TO_IMPORT_MESSAGE=${timeout_to_import_message}

APP_TRIALEXPIRATION=${app_trialexpiration}

JWT_SECRET=${jwt_secret}
JWT_REFRESH_SECRET=${jwt_refresh_secret}

# REDIS CONFIGURADO AUTOMATICAMENTE
REDIS_URI=${redis_uri}
REDIS_OPT_LIMITER_MAX=${redis_opt_limiter_max}
REDIS_OPT_LIMITER_DURATION=${redis_opt_limiter_duration}

FLOW_MENU_COOLDOWN_SEC=${flow_menu_cooldown_sec}

USER_LIMIT=${user_limit}
CONNECTIONS_LIMIT=${connections_limit}
CLOSED_SEND_BY_ME=${closed_send_by_me}

VERIFY_TOKEN=${verify_token}

#METODOS DE PAGAMENTO
MP_ACCESS_TOKEN=${mp_access_token}

FACEBOOK_APP_ID=${facebook_app_id}
FACEBOOK_APP_SECRET=${facebook_app_secret}

# EMAIL
SMTP_HOST="${smtp_host}"
SMTP_PORT="${smtp_port}"
SMTP_SECURE="${smtp_secure}"
SMTP_USER="${smtp_user}"
SMTP_PASS="${smtp_pass}"
SMTP_FROM="${smtp_from}"`;

    const envPath = path.join(process.cwd(), 'backend', '.env');
    fs.writeFileSync(envPath, envContent);

    success('Variáveis de ambiente configuradas com Redis automático');
}

module.exports = { setEnv };
