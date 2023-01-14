const Telegram = require('node-telegram-bot-api');
const {core ,setFailed } = require('@actions/core');
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
        await bot.sendMessage(chatId, message);
        core.setOutput("RESULT", "Mensaje enviado");

    } catch (error) {
      setFailed(error.message);
    }
  }




const telegramToken = core.getInput('TELEGRAM_TOKEN');
const telegramChatId = core.getInput('TELEGRAM_CHAT_ID');
const message = `Workflow ejecutado correctamente tras el último commit. Saludos ${nombre}`;
 sha();
sendTelegramMessage(telegramToken, telegramChatId, message);