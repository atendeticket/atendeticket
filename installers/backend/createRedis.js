const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function createRedis(instancia_add, redis_port, redis_password) {
    info('Criando Redis & Banco Postgres...');

    // Configurações automáticas do Redis
    const redis_host = "localhost";

    await runCommand('sudo', ['usermod', '-aG', 'docker', 'deploy']);

    // Verifica se o container Redis já existe e remove se existir
    try {
        await runCommand('docker', ['ps', '-a', '--filter', `name=redis-${instancia_add}`, '--format', '{{.Names}}']);
        info('Removendo container Redis existente...');
        await runCommand('docker', ['rm', '-f', `redis-${instancia_add}`]);
    } catch (e) {
        // Container não existe, continua
    }

    info('Criando container Redis...');
    // Cria o container Redis com configurações automáticas
    await runCommand('docker', ['run', '--name', `redis-${instancia_add}`,
        '-p', `${redis_port}:6379`,
        '--restart', 'always',
        '--detach',
        'redis:alpine',
        'redis-server', '--requirepass', redis_password]);

    // Aguarda o Redis inicializar
    info('Aguardando Redis inicializar...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Verifica se o Redis está rodando
    await runCommand('docker', ['ps', '--filter', `name=redis-${instancia_add}`]);

    success('Redis criado com sucesso!');
    info(`Porta: ${redis_port}`);
    info(`Senha: mesma do banco`);

    // Configuração do PostgreSQL
    info('Configurando PostgreSQL...');
    await runCommand('sudo', ['-u', 'postgres', 'createdb', instancia_add]);
    await runCommand('sudo', ['-u', 'postgres', 'psql', '-c', `CREATE USER ${instancia_add} SUPERUSER INHERIT CREATEDB CREATEROLE;`]);
    await runCommand('sudo', ['-u', 'postgres', 'psql', '-c', `ALTER USER ${instancia_add} PASSWORD '${redis_password}';`]);

    success('PostgreSQL configurado!');
}

module.exports = { createRedis };
