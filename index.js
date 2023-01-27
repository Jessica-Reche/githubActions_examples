const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");

class Meme {
  constructor() {
    this.texto_superior = "";
    this.texto = "";
    this.texto_inferior = "";
    this.frase_positiva = core.getInput("frase_positiva");
    this.frase_negativa = core.getInput("frase_negativa");
    this.resultado_tests = Number(core.getInput("resultado_tests"));
    this.subreddit = "dankmemes"; // Subreddit predeterminado
  }

  testPositivo() {
    if (this.resultado_tests === 0) {
      this.texto_superior = this.frase_positiva.split("\n")[0];
      this.texto = "Los tests han funcionado y lo sabes";
      this.texto_inferior = this.frase_positiva.split("\n")[1];
    }
  }

  testNegativo() {
    if (this.resultado_tests === 1) {
      this.texto_superior = this.frase_negativa.split("\n")[0];
      this.texto = "Los tests no han funcionado y lo sabes";
      this.texto_inferior = this.frase_negativa.split("\n")[1];
    }
  }

  async run() {
    this.testPositivo();
    this.testNegativo();

    try {
        const json = await memeAsync(this.texto_superior, this.texto_inferior, "Impact", 30, this.subreddit);
        let readme = fs.readFileSync("README.md", "utf-8");
        readme += `<h1>${this.texto}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
        fs.writeFileSync("README.md", readme);
        console.log("Meme añadido al readme");
    } catch (e) {
        console.log("Error: ", e);
    }
  }
}

const meme = new Meme();
meme.run();
