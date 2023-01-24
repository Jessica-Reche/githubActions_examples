/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 545:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

const fs = __nccwpck_require__(147);
const nodeMemes = __nccwpck_require__(847);

async function run(params) {
  let { frase_positiva, frase_negativa, resultado_tests } = params;
  let text;
  if(resultado_tests === 'success'){
    text = frase_positiva;
  }else{
    text = frase_negativa;
  }
  if (!fs.existsSync('readme.md')) {
    fs.writeFileSync('readme.md', '# README\n');
  }
  let meme = await nodeMemes.meme('doge',text,text);
  fs.appendFileSync('readme.md', '\n' + meme);
  return 'Meme añadido al readme';
}

module.exports = {
  run: run
}


/***/ }),

/***/ 847:
/***/ ((module) => {

module.exports = eval("require")("node-memes");


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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __nccwpck_require__(545);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;