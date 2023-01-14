const Telegram = require('node-telegram-bot-api');
const {core,setFailed } = require('@actions/core');
const github = require('@actions/github');
let chatId;

//get the chat id from the bot

async function getChatId() {
    const chat = await bot.getChat('MiBot');
   return chatId = chat.id;
    // Ahora puedes usar la variable chatId fuera de la promesa
    
}






async function sendTelegramMessage(telegramToken, chatId, message) {
    try {
        // Get the commit SHA
         const context = github.context;
         const sha = context.sha;
         const repo = context.repo.repo;
         const owner = context.repo.owner;
         console.log(`El último commit en el repositorio ${repo} de ${owner} tiene el sha: ${sha} y el id del chat es: ${chatId}`);

         const bot = new Telegram(telegramToken, {polling: true});
         await bot.sendMessage(chatId, message);
         core.setOutput("RESULT", "Mensaje enviado")
       

    } catch (error) {
      setFailed(error.message);
    }
  }

//get the chat id from getChat()





const telegramToken = core.getInput('TELEGRAM_TOKEN');
const message = `Workflow ejecutado correctamente tras el último commit. Saludos ${nombre} ${getChatId()}`;

sendTelegramMessage(telegramToken, telegramChatId, message);
