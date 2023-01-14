const Telegram = require('node-telegram-bot-api');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // Get the Telegram token from the input
        const telegramToken = core.getInput('TELEGRAM_TOKEN');
        // Create a new Telegram bot
        const bot = new Telegram(telegramToken, { polling: true });
        // Listen for messages
        bot.on('message', (msg) => {
            const nombre = msg.from.first_name;
            // Get the chat ID from the message
            const chatId = msg.chat.id;
            // Set the output ID variable 
            core.setOutput("CHAT_ID", chatId);
            const message = `Workflow ejecutado correctamente tras el último commit. Saludos ${nombre}`;
            bot.sendMessage(chatId, message);
            // Set the output result variable
            core.setOutput("result", "Mensaje enviado");
        });

        // Get the commit SHA
        const context = github.context;
        const sha = context.sha;
        const repo = context.repo.repo;
        const owner = context.repo.owner;
        console.log(`El último commit en el repositorio ${repo} de ${owner} tiene el sha: ${sha}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
