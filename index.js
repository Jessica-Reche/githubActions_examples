const fs = require("fs");
const {memeAsync} = require("memejs");
const core = require("@actions/core");

async function run() {
  const frase_positiva = core.getEnv("frase_positiva");
  const frase_negativa = core.getEnv("frase_negativa");
  const resultado_tests = core.getInput("resultado_tests");
  let texto_superior;
  let texto_inferior;
  let texto;
  if (resultado_tests === 'success') {
    texto_superior = frase_positiva.split("\n")[0];
    texto=frase_positiva;
    texto_inferior = frase_positiva.split("\n")[1];
  } else {
    texto=frase_negativa;
    texto_superior = frase_negativa.split("\n")[0];
    texto_inferior = frase_negativa.split("\n")[1];
  }

  memeAsync(texto_superior, texto_inferior, "Impact", 30, "")
  .then(json => {
    let readme = fs.readFileSync("README.md", "utf-8");
    readme += `<h1>${texto}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
    fs.writeFileSync("README.md", readme);
    console.log("Meme añadido al readme");
  }).catch(e => console.log(e));
}

run();