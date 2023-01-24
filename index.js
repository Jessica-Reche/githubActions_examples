const fs = require("fs");
const meme = require("nodejs-meme-generator");
const core = require("@actions/core");



if (!fs.existsSync("readme.md")) {
  fs.writeFileSync("readme.md", "");
}

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

  meme.generate("your_text", texto).then(url => {
    let readme = fs.readFileSync("readme.md", "utf-8");
    readme += `\n![meme](${url})`;
    fs.writeFileSync("readme.md", readme);
    console.log("Meme añadido al readme");
    //Depende del resultado se ejecuta una cosa u otra
  });
}

run();
