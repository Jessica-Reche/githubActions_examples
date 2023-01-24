const fs = require('fs');
const nodeMemes = require('node-memes');
const { run } = require('./index');

describe('Custom action meme', () => {
  beforeEach(() => {
    if (fs.existsSync('readme.md')) {
      fs.unlinkSync('readme.md');
    }
  });

  test('Should create readme and add meme', async () => {
    let params = {
      frase_positiva: "Los tests han funcionado y lo sabes",
      frase_negativa: "Los tests han fallado y lo sabes",
      resultado_tests: 'success'
    }
    let result = await run(params);
    expect(result).toBe('Meme añadido al readme');
    expect(fs.existsSync('readme.md')).toBe(true);
  });
});
