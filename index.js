const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
const frase_positiva = core.getInput("frase_positiva");
const frase_negativa = core.getInput("frase_negativa");
const resultado_tests = core.getInput("resultado_tests");


run(frase_positiva, frase_negativa, resultado_tests);

async function run(frase_positiva, frase_negativa) {

  let texto_superior;
  let texto_inferior;

  try {

    let texto = false;
    if (Number(core.getInput("resultado_tests")) === 0) {
      texto_superior = frase_positiva.split("\n")[0];
      texto = 'Los tests han funcionado y lo sabes';
      texto_inferior = frase_positiva.split("\n")[1];
      
    } else {
      texto = 'Los tests han fallado y lo sabes';
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

  } catch (e) {
    console.log(e);
  }
};