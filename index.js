const fs = require("fs");
const {memeAsync} = require("memejs");
const core = require("@actions/core");

const fs = require("fs");
const memejs = require("memejs");

module.exports = async function(frase_positiva, frase_negativa, resultado_tests) {
  let frase = frase_negativa;
  if (resultado_tests === "success") {
    frase = frase_positiva;
  }

  const meme = await memejs.random();
  const texto = `![${frase}](${meme.url})`;

  // Añadir el texto al final del archivo readme.md
  fs.appendFileSync("readme.md", texto);

  return "Meme añadido al readme";
};
