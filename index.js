'use strict'
const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
class Meme {
  //declarlo como variable de clase

 
  
  constructor(mensajes,subreddit) {
    this.mensajes = mensajes;
    this.subreddit = subreddit;
  }

  async run() {
    try {
      const json = await memeAsync();
      json.subreddit = this.subreddit;
      console.log(json);
      let readme = fs.readFileSync("README.md", "utf-8");
      console.log(this.mensajes);
      readme += `<h1>${this.mensajes}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
      fs.writeFileSync("README.md", readme);
      console.log(this.mensajes);
      console.log("Meme añadido al readme");
    } catch (e) {
      console.log(e);
    }
  }
};

let mensajes = {
  0: "Los tests han funcionado y lo sabes",
  1: "Los tests han fallado y lo sabes"
}[Number(core.getInput("resultado_tests"))]
 let subreddit = {
  0: "happy",
  1: "sad"
}[Number(core.getInput("resultado_tests"))]
console.log(mensajes);
console.log(subreddit);
console.log(Number(core.getInput("resultado_tests")));

new Meme(mensajes,subreddit).run(); 
