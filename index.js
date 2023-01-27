const fs = require("fs");
const { memeAsync } = require("memejs");
const core = require("@actions/core");
const readmePath = './README.md';

const frase_positiva = process.env.frase_positiva || 'Los tests han funcionado y lo sabes';
const frase_negativa = process.env.frase_negativa || 'Los tests han fallado y lo sabes';
const resultado_tests = process.env.resultado_tests || 1;

fs.readFile(readmePath, 'utf8', (err, data) => {
  if (err) {
    throw new Error(`Error al leer el archivo: ${err}`);
  }

  let newData;
  if (resultado_tests === '0') {
    newData = data + `\n\n${frase_positiva}`;
  } else {
    newData = data + `\n\n${frase_negativa}`;
  }


  fs.writeFile(readmePath, newData, 'utf8', (err) => {
    if (err) {
      throw new Error(`Error al escribir el archivo: ${err}`);
    }
    //Añadimos un meme al readme
    memeAsync(newData,newData,"Impact",30,"" ).then(meme => {
      fs.appendFile(readmePath, `\n\n![Meme](${meme}) <h1>${newData}</h1>`, 'utf8', (err) => {
        if (err) {
          throw new Error(`Error al escribir el archivo: ${err}`);
        }
      });
    });
    console.log('Meme agregado al readme con éxito');
  });
});
