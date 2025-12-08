const { runCommand } = require('../../core/exec');
const { info, success } = require('../../core/logger');

async function createDatabase(instancia_add, mysql_root_password) {
    info(`Configurando PostgreSQL para ${instancia_add}...`);

    await runCommand('sudo', ['-u', 'postgres', 'createdb', instancia_add]);
    await runCommand('sudo', ['-u', 'postgres', 'psql', '-c', `CREATE USER ${instancia_add} SUPERUSER INHERIT CREATEDB CREATEROLE;`]);
    await runCommand('sudo', ['-u', 'postgres', 'psql', '-c', `ALTER USER ${instancia_add} PASSWORD '${mysql_root_password}';`]);

    success(`Banco de dados PostgreSQL configurado para ${instancia_add}!`);
}

module.exports = { createDatabase };
