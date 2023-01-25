const memejs = require('memejs');
const fs = require('fs');

function createMeme(frase_positiva, frase_negativa, resultado_tests) {
    // Obtener un meme aleatorio de la API de memejs
    memejs.getMeme((err, meme) => {
        if (err) {
            console.error(err);
            return;
        }
        // Decidir que frase usar para el meme
        let frase = "";
        if (resultado_tests) {
            frase = frase_positiva;
        } else {
            frase = frase_negativa;
        }
        // Crear el meme con la frase deseada
        const memeUrl = meme.url;
        const memeCaption = frase;
        const memeImage = `<img src="${memeUrl}" alt="${memeCaption}"/>`;
        // Añadir el meme al archivo readme.md
        fs.readFile('readme.md', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
            const newData = data + "\n" + memeImage + "\n" + memeCaption;
            fs.writeFile('readme.md', newData, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log("Meme añadido al readme");
            });
        });
    });
}

module.exports = { createMeme };
