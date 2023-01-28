'use strict'
const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
class Meme {
  //declarlo como variable de clase
  constructor() {
    this.test_result = Number(core.getInput("resultado_tests"));
    this.frase_positiva = core.getInput("frase_positiva");
    this.frase_negativa = core.getInput("frase_negativa");
    this.mensajes = {};
  }
  mensajesInputs() {
    this.mensajes = {
      0:[this.frase_positiva, "happy"],
      1:[this.frase_negativa, "sad"]
    }[this.test_result];

  }

  async run() {
    this.mensajesInputs();
    try {
      const json = await memeAsync();
      json.subreddit =this.mensajes[1] ;
      let readme = fs.readFileSync("README.md", "utf-8");
      readme = `<h1>${this.mensajes[0]}</h1> <img src="${json.url}" alt="meme" width="500" height="500"></img>`;
      fs.writeFileSync("README.md", readme);
      console.log("Meme añadido al readme");
    } catch (e) {
      console.log(e);
    }
  }
};

new Meme().run();



