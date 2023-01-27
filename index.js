const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
const resultado_tests = parseInt(core.getInput("resultado_tests"));
class Meme {
  constructor(resultado_tests) {

    this.texto = "";
    this.resultado_tests = resultado_tests;
    this.subreddit = "meme";
  }
  test() {
    if (this.resultado_tests === 0) {
      if (this.resultado_tests!== 1) {
        this.subreddit = 'happy';
        this.texto = "Los tests han funcionado y lo sabes";
      }
    } else {
      this.subreddit = 'sad';
      this.texto = "Los tests no han funcionado y lo sabes";
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
new Meme(resultado_tests).run();
