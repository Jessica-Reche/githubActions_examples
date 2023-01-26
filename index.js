const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
const frase_positiva = core.getInput("frase_positiva");
const frase_negativa = core.getInput("frase_negativa");
const resultado_tests = core.getInput("resultado_tests");


run(frase_positiva, frase_negativa, resultado_tests);

async function run(frase_positiva, frase_negativa, resultado_tests) {

  let texto_superior;
  let texto_inferior;
  try {

    let texto = false;
    if (Number(core.getInput("resultado_tests")) === 0) {
      texto_superior = frase_positiva.split("\n")[0];
      texto = true;
      texto_inferior = frase_positiva.split("\n")[1];
    } else if (Number(core.getInput("resultado_tests")) === 1) {
      texto = false;
      texto_superior = frase_negativa.split("\n")[0];
      texto_inferior = frase_negativa.split("\n")[1];
    } else {
      //se guarda en la variable texto el tipo de error que se ha producido y el tipo de dato que es la variable resultado_tests
      texto = `Error: resultado_tests no es un número. Tipo de dato: ${typeof resultado_tests}`;
    }

    memeAsync(texto_superior, texto_inferior, "Impact", 30, "")

      .then(json => {
        const core = require("@actions/core");
        let texto = "";
        if (texto) {
          texto = "Meme positivo";
        } else {
          texto = "Meme negativo";
        }
        let readme = fs.readFileSync("README.md", "utf-8");
        readme += `<h1>${texto}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
        fs.writeFileSync("README.md", readme);
        console.log("Meme añadido al readme");
      }).catch(e => console.log(e));

  } catch (e) {
    console.log(e);
  }
};