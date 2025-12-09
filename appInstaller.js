const { mainMenuPrompt } = require('./prompts/mainMenu');
const { installPrompts } = require('./prompts/installPrompts');
const { domainPrompt } = require('./prompts/domainPrompts');
const { updatePrompts } = require('./prompts/updatePrompts');

const { updateSystem, installNode, installDocker, installPM2, installNginx, installCertbot, createUser } = require('./installers/system');
const { createDatabase, createRedis, setEnv: setBackendEnv, installDeps: installBackendDeps, build: buildBackend, migrate, seed, startPM2: startBackendPM2, setupNginx: setupBackendNginx } = require('./installers/backend');
const { setEnv: setFrontendEnv, installDeps: installFrontendDeps, build: buildFrontend, startPM2: startFrontendPM2, setupNginx: setupFrontendNginx } = require('./installers/frontend');
const { setupSSL } = require('./ssl/setupSSL');
const { delete: deleteAction } = require('./actions/delete');
const { block } = require('./actions/block');
const { unblock } = require('./actions/unblock');
const { changeDomain } = require('./actions/changeDomain');
const { update } = require('./actions/update');

const { info, success } = require('./core/logger');

async function runInstaller() {
    info('Bem-vindo ao instalador do AtendeTicket!');
    
    const mainMenu = await mainMenuPrompt();

    if (mainMenu.action === 'install') {
        const answers = await installPrompts();

        // Generate JWT secrets
        const jwt_secret = require('crypto').randomBytes(64).toString('base64');
        const jwt_refresh_secret = require('crypto').randomBytes(64).toString('base64');

        // Configurações automáticas do Redis
        const redis_host = "localhost";
        const redis_password = answers.mysql_root_password;
        const redis_uri = `redis://:${redis_password}@${redis_host}:${answers.redisPort}`;

        // Sistema
        await updateSystem();
        await installNode();
        await installDocker();
        await installPM2();
        await installNginx();
        await installCertbot();
        await createUser(answers.mysql_root_password);

        // Backend
        await createDatabase(answers.instancia_add, answers.mysql_root_password);
        await createRedis(answers.instancia_add, answers.redisPort, answers.mysql_root_password);
        await setBackendEnv(
            '', // node_env
            answers.backendUrl,
            answers.frontendUrl,
            443, // proxy_port
            answers.backendPort,
            'localhost', // db_host
            'postgres', // db_dialect
            answers.instancia_add, // db_user
            answers.mysql_root_password, // db_pass
            answers.instancia_add, // db_name
            5432, // db_port
            'senha_master', // master_key
            1, // import_fallback_file
            1000, // timeout_to_import_message
            3, // app_trialexpiration
            jwt_secret,
            jwt_refresh_secret,
            redis_uri,
            1, // redis_opt_limiter_max
            3000, // redis_opt_limiter_duration
            8, // flow_menu_cooldown_sec
            answers.max_user, // user_limit
            answers.max_whats, // connections_limit
            true, // closed_send_by_me
            'whaticket', // verify_token
            '', // mp_access_token
            '2813216208828642', // facebook_app_id
            '8233912aeade366dd8e2ebef6be256b6', // facebook_app_secret
            'smtp.gmail.com', // smtp_host
            '587', // smtp_port
            'false', // smtp_secure
            'seuemail@gmail.com', // smtp_user
            'suasenha', // smtp_pass
            'Redefinição de senha <seuemail@gmail.com>' // smtp_from
        );
        await installBackendDeps();
        await buildBackend();
        await migrate();
        await seed();
        await startBackendPM2();
        await setupBackendNginx(answers.backendUrl.replace(/^https?:\/\//, ''));

        // Frontend
        await setFrontendEnv(
            answers.backendUrl,
            24, // hours_close_tickets_auto
            'https', // backend_protocol
            answers.backendUrl.replace(/^https?:\/\//, ''), // backend_host
            answers.backendPort, // backend_port_param
            'pt-br', // locale
            'America/Sao_Paulo', // timezone
            '55XXXXXXXXXXX', // number_support
            '2813216208828642', // facebook_app_id
            true, // require_business_management
            false, // certificates
            true, // https
            'F:\\bkpidx\\workflow\\backend\\certs\\localhost.pem', // ssl_crt_file
            'F:\\bkpidx\\workflow\\backend\\certs\\localhost-key.pem', // ssl_key_file
            '2813216208828642', // react_app_facebook_app_id
            true, // react_app_require_business_management
            false, // generate_sourcemap
            false // disable_eslint_plugin
        );
        await installFrontendDeps();
        await buildFrontend();
        await startFrontendPM2();
        await setupFrontendNginx(answers.frontendUrl.replace(/^https?:\/\//, ''));

        // SSL
        const backend_domain = answers.backendUrl.replace(/^https?:\/\//, '');
        const frontend_domain = answers.frontendUrl.replace(/^https?:\/\//, '');
        await setupSSL(backend_domain, frontend_domain, answers.deployEmail);

        success('Instalação completa do Multizap!');
    }

    if (mainMenu.action === 'update') {
        const answers = await updatePrompts();

        if (answers.updateSystem) await updateSystem();
        if (answers.updateBackend) {
            await installBackendDeps();
            await buildBackend();
            await migrate();
            await seed();
            await startBackendPM2();
        }
        if (answers.updateFrontend) {
            await installFrontendDeps();
            await buildFrontend();
            await startFrontendPM2();
        }

        success('Atualização concluída!');
    }

    if (mainMenu.action === 'delete') {
        await deleteAction();
        success('Instância deletada com sucesso!');
    }

    if (mainMenu.action === 'block') {
        await block();
        success('Instância bloqueada com sucesso!');
    }

    if (mainMenu.action === 'unblock') {
        await unblock();
        success('Instância desbloqueada com sucesso!');
    }

    if (mainMenu.action === 'changeDomain') {
        await changeDomain();
        success('Domínio alterado com sucesso!');
    }

    if (mainMenu.action === 'update') {
        await update();
        success('Atualização concluída!');
    }
}

async function handleMenu(choice) {
    if (choice.action === 'install') {
        const answers = await installPrompts();

        // Generate JWT secrets
        const jwt_secret = require('crypto').randomBytes(64).toString('base64');
        const jwt_refresh_secret = require('crypto').randomBytes(64).toString('base64');

        // Configurações automáticas do Redis
        const redis_host = "localhost";
        const redis_password = answers.mysql_root_password;
        const redis_uri = `redis://:${redis_password}@${redis_host}:${answers.redisPort}`;

        // Sistema
        await updateSystem();
        await installNode();
        await installDocker();
        await installPM2();
        await installNginx();
        await installCertbot();
        await createUser(answers.mysql_root_password);

        // Backend
        await createDatabase(answers.instancia_add, answers.mysql_root_password);
        await createRedis(answers.instancia_add, answers.redisPort, answers.mysql_root_password);
        await setBackendEnv(
            '', // node_env
            answers.backendUrl,
            answers.frontendUrl,
            443, // proxy_port
            answers.backendPort,
            'localhost', // db_host
            'postgres', // db_dialect
            answers.instancia_add, // db_user
            answers.mysql_root_password, // db_pass
            answers.instancia_add, // db_name
            5432, // db_port
            'senha_master', // master_key
            1, // import_fallback_file
            1000, // timeout_to_import_message
            3, // app_trialexpiration
            jwt_secret,
            jwt_refresh_secret,
            redis_uri,
            1, // redis_opt_limiter_max
            3000, // redis_opt_limiter_duration
            8, // flow_menu_cooldown_sec
            answers.max_user, // user_limit
            answers.max_whats, // connections_limit
            true, // closed_send_by_me
            'whaticket', // verify_token
            '', // mp_access_token
            '2813216208828642', // facebook_app_id
            '8233912aeade366dd8e2ebef6be256b6', // facebook_app_secret
            'smtp.gmail.com', // smtp_host
            '587', // smtp_port
            'false', // smtp_secure
            'seuemail@gmail.com', // smtp_user
            'suasenha', // smtp_pass
            'Redefinição de senha <seuemail@gmail.com>' // smtp_from
        );
        await installBackendDeps();
        await buildBackend();
        await migrate();
        await seed();
        await startBackendPM2();
        await setupBackendNginx(answers.backendUrl.replace(/^https?:\/\//, ''));

        // Frontend
        await setFrontendEnv(
            answers.backendUrl,
            24, // hours_close_tickets_auto
            'https', // backend_protocol
            answers.backendUrl.replace(/^https?:\/\//, ''), // backend_host
            answers.backendPort, // backend_port_param
            'pt-br', // locale
            'America/Sao_Paulo', // timezone
            '55XXXXXXXXXXX', // number_support
            '2813216208828642', // facebook_app_id
            true, // require_business_management
            false, // certificates
            true, // https
            'F:\\bkpidx\\workflow\\backend\\certs\\localhost.pem', // ssl_crt_file
            'F:\\bkpidx\\workflow\\backend\\certs\\localhost-key.pem', // ssl_key_file
            '2813216208828642', // react_app_facebook_app_id
            true, // react_app_require_business_management
            false, // generate_sourcemap
            false // disable_eslint_plugin
        );
        await installFrontendDeps();
        await buildFrontend();
        await startFrontendPM2();
        await setupFrontendNginx(answers.frontendUrl.replace(/^https?:\/\//, ''));

        // SSL
        const backend_domain = answers.backendUrl.replace(/^https?:\/\//, '');
        const frontend_domain = answers.frontendUrl.replace(/^https?:\/\//, '');
        await setupSSL(backend_domain, frontend_domain, answers.deployEmail);

        success('Instalação completa do Multizap!');
    }

    if (choice.action === 'update') {
        const answers = await updatePrompts();

        if (answers.updateSystem) await updateSystem();
        if (answers.updateBackend) {
            await installBackendDeps();
            await buildBackend();
            await migrate();
            await seed();
            await startBackendPM2();
        }
        if (answers.updateFrontend) {
            await installFrontendDeps();
            await buildFrontend();
            await startFrontendPM2();
        }

        success('Atualização concluída!');
    }

    if (choice.action === 'delete') {
        await deleteAction();
        success('Instância deletada com sucesso!');
    }

    if (choice.action === 'block') {
        await block();
        success('Instância bloqueada com sucesso!');
    }

    if (choice.action === 'unblock') {
        await unblock();
        success('Instância desbloqueada com sucesso!');
    }

    if (choice.action === 'changeDomain') {
        await changeDomain();
        success('Domínio alterado com sucesso!');
    }

    if (choice.action === 'update') {
        await update();
        success('Atualização concluída!');
    }
}

module.exports = { runInstaller, handleMenu };
