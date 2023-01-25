const { execSync } = require('child_process');
const { random } = require('memejs');

// Obtener parámetros de entrada
const frase_positiva = process.env.frase_positiva;
const frase_negativa = process.env.frase_negativa;
const resultado_tests = process.env.resultado_tests;

// Ejecutar tests
let tests_passed = true;
try {
    execSync('npm test');
} catch (err) {
    tests_passed = false;
}

// Generar meme
let texto_meme = frase_positiva;
if (!tests_passed) {
    texto_meme = frase_negativa;
}
random(texto_meme).then(meme => {
    const readme = `#Meme
    <h1>${texto}</h1> <img src="${meme.url}" alt="meme" width="500" height="500"></img>
`;
    fs.writeFileSync('README.md', readme);
    console.log('Meme añadido al readme');
});
