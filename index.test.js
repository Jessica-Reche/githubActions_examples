//test que comprueba que la estructura del archivo esta bien
test("Comprueba que el archivo index.js tiene la estructura correcta", () => {
  const index = fs.readFileSync("index.js", "utf-8");
  expect(index).toMatch(/const fs = require\("fs"\);/);
  expect(index).toMatch(/const meme = require\("nodejs-meme-generator"\);/);
  expect(index).toMatch(/const core = require\("@actions\/core"\);/);
  expect(index).toMatch(/async function run\(\) {/);
  expect(index).toMatch(/const frase_positiva = core.getInput\("frase_positiva"\);/);
  expect(index).toMatch(/const frase_negativa = core.getInput\("frase_negativa"\);/);
  expect(index).toMatch(/const resultado_tests = core.getInput\("resultado_tests"\);/);
  expect(index).toMatch(/let texto;/);
  expect(index).toMatch(/if \(resultado_tests === 'success'\) {/);
  expect(index).toMatch(/texto = frase_positiva;/);
  expect(index).toMatch(/} else {/);
  expect(index).toMatch(/texto = frase_negativa;/);
  expect(index).toMatch(/meme.generate\("your_text", texto\).then\(url => {/);
  expect(index).toMatch(/let readme = fs.readFileSync\("readme.md", "utf-8"\);/);
  expect(index).toMatch(/readme += `\n![meme]\(\${url}\)`;/);
  expect(index).toMatch(/fs.writeFileSync\("readme.md", readme\);/);
  expect(index).toMatch(/console.log\("Meme añadido al readme"\);/);
  expect(index).toMatch(/run\(\);/);
});
