const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function createDatabase(instancia_add, mysql_root_password) {
    info(`Configurando PostgreSQL para ${instancia_add}...`);

    // Instala PostgreSQL caso não exista
    try {
        await runCommand('psql', ['--version']);
    } catch {
        info('PostgreSQL não encontrado, instalando...');
        await runCommand('sudo', ['apt', 'update']);
        await runCommand('sudo', ['apt', 'install', '-y', 'postgresql', 'postgresql-contrib']);
    }

    // Criação de banco e usuário de forma não interativa
    const sql = `
DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_database WHERE datname = '${instancia_add}') THEN
      CREATE DATABASE ${instancia_add};
   END IF;
END
$$;

DO
$$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = '${instancia_add}') THEN
      CREATE ROLE ${instancia_add} SUPERUSER INHERIT CREATEDB CREATEROLE LOGIN PASSWORD '${mysql_root_password}';
   END IF;
END
$$;
`;

    await runCommand('sudo', ['-u', 'postgres', 'psql', '-v', 'ON_ERROR_STOP=1', '-c', sql]);

    success(`Banco de dados PostgreSQL configurado para ${instancia_add}!`);
}

module.exports = { createDatabase };
