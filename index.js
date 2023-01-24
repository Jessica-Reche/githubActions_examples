const fs = require("fs");
const memejs = require("memejs");


const core = require("@actions/core");

async function run() {
  const frase_positiva = core.getInput("frase_positiva");
  const frase_negativa = core.getInput("frase_negativa");
  const resultado_tests = core.getInput("resultado_tests");
  let texto;
  if (resultado_tests === 'success') {
    texto = frase_positiva;
  } else {
    texto = frase_negativa;
  }

  memejs.meme({text: [texto.split("\n")[0], texto.split("\n")[1]], font: 'impact', fontSize: 30, caption: 'test'}).then(url => {

    let readme = fs.readFileSync("readme.md", "utf-8");
    readme += `\n![meme](${url})`;
    fs.writeFileSync("readme.md", readme);
    console.log("Meme añadido al readme");
  });
}

run();
