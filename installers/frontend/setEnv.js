const { info, success } = require('../../core/logger');
const fs = require('fs');
const path = require('path');

async function setEnv(backend_url, hours_close_tickets_auto, backend_protocol, backend_host, backend_port_param, locale, timezone, number_support, facebook_app_id, require_business_management, certificates, https, ssl_crt_file, ssl_key_file, react_app_facebook_app_id, react_app_require_business_management, generate_sourcemap, disable_eslint_plugin) {
    info('Configurando variáveis de ambiente (frontend)...');

    // ensure idempotency
    let backendUrl = backend_url.replace(/^https?:\/\//, '');
    backendUrl = backendUrl.split('/')[0];
    backendUrl = `https://${backendUrl}`;

    const envContent = `REACT_APP_BACKEND_URL=${backendUrl}
REACT_APP_HOURS_CLOSE_TICKETS_AUTO=${hours_close_tickets_auto}

REACT_APP_BACKEND_PROTOCOL=${backend_protocol}
REACT_APP_BACKEND_HOST=${backend_host}
REACT_APP_BACKEND_PORT=${backend_port_param}
REACT_APP_LOCALE=${locale}
REACT_APP_TIMEZONE=${timezone}
REACT_APP_NUMBER_SUPPORT=${number_support}

CERTIFICADOS=${certificates}
HTTPS=${https}
SSL_CRT_FILE=${ssl_crt_file}
SSL_KEY_FILE=${ssl_key_file}

REACT_APP_FACEBOOK_APP_ID=${facebook_app_id}
REACT_APP_REQUIRE_BUSINESS_MANAGEMENT=${require_business_management}

# Variáveis para build
GENERATE_SOURCEMAP=${generate_sourcemap}
DISABLE_ESLINT_PLUGIN=${disable_eslint_plugin}`;

    const envPath = path.join(process.cwd(), 'frontend', '.env');
    fs.writeFileSync(envPath, envContent);

    // Create server.js for production build
    const serverContent = `//simple express server to run frontend production build;
const express = require("express");
const path = require("path");
const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
app.listen(${backend_port_param});`;

    const serverPath = path.join(process.cwd(), 'frontend', 'server.js');
    fs.writeFileSync(serverPath, serverContent);

    success('Variáveis de ambiente do frontend configuradas!');
}

module.exports = { setEnv };
