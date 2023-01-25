const fs = require('fs');
const { memeAsync } = require('memejs');
const core = require('@actions/core');

async function run() {
  const frase_postiva = core.getInput('frase_postiva');
  const frase_negativa = core.getInput('frase_negativa');
  const resultado_tests = core.getInput('resultado_tests');

  if (resultado_tests == 'success') {
    const meme = await memeAsync(frase_postiva, 'success');
    fs.writeFileSync('meme.png', meme);

  } else {
    const meme = await memeAsync(frase_negativa, 'error');
    fs.writeFileSync('meme.png', meme);


  }

  console.log("Meme añadido al readme")
}

run();