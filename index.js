const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
class Meme {
  constructor() {
    this.texto ;
    this.subreddit = "meme";
    this.resultado_tests = Number(core.getInput("resultado_tests")) ;
  }
  
  async run() {
    try {
      const json = await memeAsync();
      json.subreddit = this.resultado_tests === 1 ? this.subreddit = 'happy' : this.subreddit = 'sad';
     
      json.title = this.subreddit;
      let readme = fs.readFileSync("README.md", "utf-8");
      readme = `<h1>${ this.texto = this.resultado_tests ? this.texto = "Los tests no han funcionado y lo sabes" : this.texto = "Los tests han fallado funcionado y lo sabes"}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
      fs.writeFileSync("README.md", readme);
      console.log("Meme añadido al readme");
    } catch (e) {
      console.log(e);
    }
  }
}
new Meme().run(); 
