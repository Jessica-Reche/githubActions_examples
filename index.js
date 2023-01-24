const fs = require('fs');
const nodeMemes = require('node-memes');

async function run(params) {
  let { frase_positiva, frase_negativa, resultado_tests } = params;
  let text;
  if(resultado_tests === 'success'){
    text = frase_positiva;
  }else{
    text = frase_negativa;
  }
  if (!fs.existsSync('readme.md')) {
    fs.writeFileSync('readme.md', '# README\n');
  }
  let meme = await nodeMemes.meme('doge',text,text);
  fs.appendFileSync('readme.md', '\n' + meme);
  return 'Meme añadido al readme';
}

module.exports = {
  run: run
}
