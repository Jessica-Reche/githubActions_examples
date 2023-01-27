const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
const resultado_tests = parseInt(core.getInput("resultado_tests"));
const frase_positiva = core.getInput("frase_positiva");
const frase_negativa = core.getInput("frase_negativa");
class Meme {
  constructor(resultado_tests, frase_positiva, frase_negativa) {

    this.texto = "";
    this.resultado_tests = resultado_tests;
    this.subreddit = "meme";
    this.frase_positiva = frase_positiva;
    this.frase_negativa = frase_negativa;
    
  }
  test() {
    if (this.resultado_tests === 0) {
      if (this.resultado_tests!== 1) {
        this.subreddit = 'happy';
        
        this.texto = frase_positiva;
      }
    } else {
      this.subreddit = 'sad';
      this.texto = frase_negativa;
    }
  }
  async run() {
    this.test();
    try {
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
new Meme(resultado_tests,frase_positiva,frase_negativa).run();
