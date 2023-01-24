//test que comprueba que la estructura del archivo esta bien
test("Comprueba que el archivo index.js tiene la estructura correcta", () => {
  const index = fs.readFileSync("index.js", "utf-8");

  expect(index).toMatch(/async function run\(\) {/);
  expect(index).toMatch(/const frase_positiva = core.getInput\("frase_positiva"\);/);
  expect(index).toMatch(/const frase_negativa = core.getInput\("frase_negativa"\);/);
  expect(index).toMatch(/const resultado_tests = core.getInput\("resultado_tests"\);/);
 
});
