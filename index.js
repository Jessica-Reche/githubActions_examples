const fs = require("fs");
const nodeMeme = require('node-meme');
const core = require("@actions/core");

class Meme {
  constructor() {

    this.texto = "";
    this.texto_inferior = "";
    this.frase_positiva = "";
    this.frase_positiva = core.getInput("frase_positiva");
    this.frase_negativa = core.getInput("frase_negativa");
    this.resultado_tests = Number(core.getInput("resultado_tests"));
    this.meme_name = "";
  }
  async test() {
    if (this.resultado_tests === 0) {
      this.meme_name = 'happy';
      this.texto = "Los tests han funcionado y lo sabes";
      this.texto_superior = this.frase_negativa.split("\n")[0];
      this.texto_inferior = this.frase_positiva.split("\n")[1];
    } else {
      this.meme_name = 'sad';
      this.texto_superior = this.frase_negativa.split("\n")[0];
      this.texto = "Los tests no han funcionado y lo sabes";
      this.texto_inferior = this.frase_negativa.split("\n")[1];
    }
  }

  async run() {
    await this.test();
    try {
      let readme = fs.readFileSync("README.md", "utf-8");
      nodeMeme.requestmeme(this.meme_name).then(img => {
        console.log(img);
        readme += `<h1>${this.texto}</h1> <img src="${img}" alt="meme" width="500" height="500"></img>`;
        fs.writeFileSync("README.md", readme);
        console.log("Meme añadido al readme");
      }).catch(err => {
        throw new Error(err);
      });
    } catch (e) {
      throw new Error(e);
    }
  }
}

const meme = new Meme();
meme.run();
