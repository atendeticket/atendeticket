const inquirer = require("inquirer");

async function installPrompts() {
    const answers = await inquirer.prompt([
        {
            type: 'password',
            name: 'mysql_root_password',
            message: '1. Senha do usuário deploy + banco de dados:',
            mask: '*'
        },
        {
            type: 'input',
            name: 'instancia_add',
            message: '2. Nome da instância/empresa (minúsculo, sem espaço, sem caracteres especiais):',
            validate: (input) => {
                if (!input) return 'Este campo é obrigatório';
                if (!/^[a-z0-9]+$/.test(input)) return 'Apenas letras minúsculas e números, sem espaços ou caracteres especiais';
                return true;
            }
        },
        {
            type: 'number',
            name: 'max_whats',
            message: '3. Limite de conexões Whats:',
            validate: (input) => {
                if (input <= 0) return 'Deve ser um número positivo';
                return true;
            }
        },
        {
            type: 'number',
            name: 'max_user',
            message: '4. Limite de usuários:',
            validate: (input) => {
                if (input <= 0) return 'Deve ser um número positivo';
                return true;
            }
        },
        {
            type: 'input',
            name: 'frontend_url',
            message: '5. Domínio do FRONTEND (ex: painel.suaempresa.com):',
            validate: (input) => {
                if (!input) return 'Este campo é obrigatório';
                return true;
            }
        },
        {
            type: 'input',
            name: 'backend_url',
            message: '6. Domínio do BACKEND (ex: api.suaempresa.com):',
            validate: (input) => {
                if (!input) return 'Este campo é obrigatório';
                return true;
            }
        },
        {
            type: 'number',
            name: 'frontend_port',
            message: '7. Porta do FRONTEND (ex: 3000):',
            default: 3000,
            validate: (input) => {
                if (input <= 0 || input > 65535) return 'Porta inválida (1-65535)';
                return true;
            }
        },
        {
            type: 'number',
            name: 'backend_port',
            message: '8. Porta do BACKEND (ex: 4000):',
            default: 4000,
            validate: (input) => {
                if (input <= 0 || input > 65535) return 'Porta inválida (1-65535)';
                return true;
            }
        },
        {
            type: 'number',
            name: 'redis_port',
            message: '9. Porta do REDIS (ex: 5000):',
            default: 5000,
            validate: (input) => {
                if (input <= 0 || input > 65535) return 'Porta inválida (1-65535)';
                return true;
            }
        },
        {
            type: 'input',
            name: 'deploy_email',
            message: '10. Email para o SSL (Certbot):',
            validate: (input) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input)) return 'Email inválido';
                return true;
            }
        }
    ]);
    return answers;
}

module.exports = { installPrompts };
