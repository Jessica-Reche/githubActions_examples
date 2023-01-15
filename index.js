const Telegram = require('node-telegram-bot-api');
const core = require('@actions/core');
const github = require('@actions/github');

// Get the commit SHA
 function sha() {
    try {
        
        const context = github.context;
        const sha = context.sha;
        const repo = context.repo.repo;
        const owner = context.repo.owner;
        msgCommit = `El último commit en el repositorio ${repo} de ${owner} tiene el sha: ${sha}`;
        console.log(msgCommit);
       

    } catch (error) {
        setFailed(error.message);
    } 
}
// Send a message to a Telegram chat
async function sendTelegramMessage(token, chatId, message) {
    try {
        
        const bot = new Telegram(token, {polling: true});
        //coger el nombre de usuario del chat
        const chat = await bot.getChat(chatId);
        message= chat.username ? message += `@${chat.username}` : message += `${chat.first_name}`;
        await bot.sendMessage(chatId, `${message} `);
        msgSend = "Mensaje enviado";
        console.log(msgSend);
        core.setOutput("RESULT", msgSend);
        await bot.close();

    } catch (error) {
      core.setFailed(error.message);
    }
  }




const telegramToken = core.getInput('TELEGRAM_TOKEN');
const telegramChatId = core.getInput('TELEGRAM_CHAT_ID');
const message = `Workflow ejecutado correctamente tras el último commit. Saludos  `;
 sha();
sendTelegramMessage(telegramToken, telegramChatId, message);