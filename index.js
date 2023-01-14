const Telegram = require('node-telegram-bot-api');
const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
    try {
        // Get the Telegram token from the input
        const telegramToken = core.getInput('TELEGRAM_TOKEN');
        // Create a new Telegram bot
        const bot = new Telegram(telegramToken, { polling: true });
        bot.getUpdates().then(updates => {
            const chatId = updates[0].message.chat.id;
            console.log(chatId);
            const nombre = updates[0].message.chat.first_name;

            const message = `Workflow ejecutado correctamente tras el último commit. Saludos ${nombre}`;
            bot.sendMessage(chatId, message);
            // Set the output result variable
            core.setOutput("RESULT", "Mensaje enviado")
        });
        //nombre





        // Get the commit SHA
        const context = github.context;
        const sha = context.sha;
        const repo = context.repo.repo;
        const owner = context.repo.owner;
        console.log(`El último commit en el repositorio ${repo} de ${owner} tiene el sha: ${sha} y el id del chat es: ${chatId}`);

    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
