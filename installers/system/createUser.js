const { runCommand } = require('../../core/exec');
const { info } = require('../../core/logger');

async function systemCreateUser(username, password) {
    info(`💻 Agora, vamos criar o usuário ${username} para a nova instância...`);

    // Cria o usuário com home, shell bash e grupo sudo
    await runCommand('sudo', ['useradd', '-m', '-s', '/bin/bash', '-G', 'sudo', username]);

    // Define a senha do usuário de forma não interativa
    await runCommand('sudo', ['chpasswd'], { input: `${username}:${password}` });

    info(`✅ Usuário ${username} criado com sucesso!`);
}

module.exports = { systemCreateUser };
