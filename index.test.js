//test que comprueba que estan las variables en el index.js
const {meme } = require('./index.js');
test('Comprueba que las variables estan definidas', () => {
  expect(meme).toBeDefined();
});
