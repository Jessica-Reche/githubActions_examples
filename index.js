const fs = require("fs");
const {memeAsync} = require("memejs");
const core = require("@actions/core");

async function run() {
  try {
//acceder desde las variables de entorno
    const frase_positiva = core.getInput("frase_positiva");
    const frase_negativa = core.getInput("frase_negativa");
    const resultado_tests = core.getState("resultado_tests");

    console.log("frase_positiva: ", frase_positiva);
    console.log("frase_negativa: ", frase_negativa);
    console.log("resultado_tests: ", resultado_tests);
    generar_meme(frase_positiva, frase_negativa, resultado_tests);
  } catch (error) {
    core.setFailed(error.message);
  }
}

function generar_meme(frase_positiva, frase_negativa, resultado_tests) {
  let texto_superior;
  let texto_inferior;
  let texto;
  if (resultado_tests == 'exitoso') {
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