const Telegram = require('node-telegram-bot-api');
const { core, setFailed } = require('@actions/core');
const github = require('@actions/github');

//get the chat id from the bot




async function sendTelegramMessage(telegramToken, chatId, message) {
    try {
        // Get the commit SHA
        const context = github.context;
        const sha = context.sha;
        const repo = context.repo.repo;
        const owner = context.repo.owner;
        console.log(`El último commit en el repositorio ${repo} de ${owner} tiene el sha: ${sha} y el id del chat es: ${chatId}`);

        const bot = new TelegramBot(telegramToken, { polling: true });
        await bot.sendMessage(chatId, message);
        core.setOutput("RESULT", "Mensaje enviado")


    } catch (error) {
        setFailed(error.message);
    }
}


bot.getChat('JessBot').then(chat => {
    const chatId = chat.id;
    // Enviar el ID del chat en el chat
    bot.sendMessage(chatId, `El ID del chat es: ${chatId}`);
    const telegramToken = core.getInput('TELEGRAM_TOKEN');
    const message = `Workflow ejecutado correctamente tras el último commit. Saludos ${nombre}`;

    sendTelegramMessage(telegramToken, telegramChatId, message);
});


