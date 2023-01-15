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
async function sendTelegramMessage(token, message) {
    try {
        
        const bot = new Telegram(token, {polling: true});
        //get name of chat
        const id = await bot.getChatIdByUsername('@JessrtBot');
        const chat = await bot.getChat(id);
        message= chat.username ? message += `@${chat.username}` : message += `${chat.first_name}`;
        await bot.sendMessage(id, `${message} `);
        msgSend = "Mensaje enviado";
        console.log(msgSend);
        core.setOutput("FINAL_RESULT", msgSend);
        //stop bot and exit
       await bot.stopPolling();
       await process.exit(0);


    } catch (error) {
      core.setFailed(error.message);
    }
  }




const telegramToken = core.getInput('TELEGRAM_TOKEN');
//const telegramChatId = core.getInput('TELEGRAM_CHAT_ID');
const message = `Workflow ejecutado correctamente tras el último commit. Saludos  `;
 sha();
sendTelegramMessage(telegramToken, message);