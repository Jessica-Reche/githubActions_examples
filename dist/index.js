/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 40:
/***/ ((module) => {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 438:
/***/ ((module) => {

module.exports = eval("require")("memegen");


/***/ }),

/***/ 147:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
const fs = __nccwpck_require__(147);
const memegen = __nccwpck_require__(438);
const core = __nccwpck_require__(40);

async function run() {
  const frase_positiva = core.getInput("frase_positiva");
  const frase_negativa = core.getInput("frase_negativa");
  const resultado_tests = core.getInput("resultado_tests");
  let texto;
  if (resultado_tests === 'success') {
    texto = frase_positiva;
  } else {
    texto = frase_negativa;
  }

  memegen.generate(texto.split("\n")[0], texto.split("\n")[1]).then(url => {
    let readme = fs.readFileSync("readme.md", "utf-8");
    readme += `\n![meme](${url})`;
    fs.writeFileSync("readme.md", readme);
    console.log("Meme añadido al readme");
  });
}

run();

})();

module.exports = __webpack_exports__;
/******/ })()
;