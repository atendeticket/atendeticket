const { runCommand } = require('../core/exec');
const { info, success } = require('../core/logger');

async function deleteAction() {
    info('Executando ação de delete...');

    // Assuming we need to prompt for instancia name, but for now using a placeholder
    // In a real implementation, you'd prompt for the instancia name
    const instancia = 'example'; // This should be prompted or passed as parameter

    // Remove Redis container
    await runCommand('docker', ['rm', '-f', `redis-${instancia}`]);

    // Remove nginx sites
    await runCommand('sudo', ['rm', '-f', `/etc/nginx/sites-enabled/${instancia}`]);
    await runCommand('sudo', ['rm', '-f', `/etc/nginx/sites-available/${instancia}`]);

    // Remove instance directory
    await runCommand('sudo', ['rm', '-rf', `/home/deploy/${instancia}`]);

    // Delete PM2 processes
    await runCommand('pm2', ['delete', `${instancia}-backend`, `${instancia}-frontend`]);
    await runCommand('pm2', ['save']);

    success('Instância deletada com sucesso!');
}

module.exports = { delete: deleteAction };
