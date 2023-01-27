const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");

class Meme {
  constructor() {
    this.texto = "";
    this.subreddit = "meme";
  }
  
  async run() {
    try {
      const resultado_tests = Number(core.getInput("resultado_tests"));
      console.log(`Valor de resultado_tests: ${resultado_tests}`); // Verificar el valor de la variable

      if (resultado_tests == 0) {
        this.subreddit = 'happy';
        this.texto = "Los tests han funcionado y lo sabes";
      } else {
        this.subreddit = 'sad';
        this.texto = "Los tests no han funcionado y lo sabes";
      }

      const json = await memeAsync();
      json.subreddit = this.subreddit;
      json.title = this.subreddit;
      let readme = fs.readFileSync("README.md", "utf-8");
      readme = `<h1>${this.texto}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
      fs.writeFileSync("README.md", readme);
      console.log("Meme añadido al readme");
    } catch (e) {
      console.log(e);
    }
  }
}
new Meme().run(); 
