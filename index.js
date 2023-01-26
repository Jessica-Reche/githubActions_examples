const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");


async function run() {

  let texto_superior;
  let texto_inferior;
  let texto;
  try {
    if (Number(core.getInput("resultado_tests")) === 0  ) {	
      texto_superior = frase_positiva.split("\n")[0];
      texto ="Los tests han funcionado y lo sabes" ;
      texto_inferior =core.getInput("frase_positiva").split("\n")[1];
    } else {
      //se guarda en la variable texto el tipo de error que se ha producido y el tipo de dato que es la variable resultado_tests
      texto = "Los tests han fallado y lo sabes";
      texto_superior = getInput("frase_negativa").split("\n")[0];
      texto_inferior = getInput("frase_negativa").split("\n")[1];

    }
  } catch (e) {
    console.log(e);
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