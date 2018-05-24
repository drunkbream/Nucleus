var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/detach.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

function isPage(layer) {
  return layer.class() == MSPage;
}

function isArtboard(layer) {
  return layer.class() == MSArtboardGroup;
}

function isSymbolMaster(layer) {
  return layer.class() == MSSymbolMaster;
}

function isSymbolInstance(layer) {
  return layer.class() == MSSymbolInstance;
}

function isSymbol(layer) {
  return layer.class() == MSSymbolInstance || layer.class() == MSSymbolMaster;
}

function isGroup(layer) {
  return layer.class() == MSLayerGroup;
}

function isLayer(layer) {
  return !isGroup(layer) && !isText(layer);
} // MSTextLayer


function isText(layer) {
  return layer.class() == MSTextLayer;
}

function alert(title, message) {
  var app = NSApplication.sharedApplication();
  app.displayDialog_withTitle_(message, title);
}

function getFirstTag(str) {
  return str.match(/[^#\ ^\.]+/g);
}

function getAllTags(str) {
  return str.match(/[^#\ ^\.]+/g);
}

function getAllTagsWithoutName(str) {
  return str.match(/#([^#\ ^\.]+)/);
}

function getPropName(str) {
  var split = str.match(/(.+)\:\s*(.+)/);
  return split[1];
}

function getPropVal(str) {
  var split = str.match(/(.+)\:\s*(.+)/);
  return split[2];
}

function tagAndNames(layer) {
  var fullLayerName = layer.name(),
      splitName = getAllTags(fullLayerName),
      layerName = splitName == null ? fullLayerName : splitName[0];
  inTag = getAllTagsWithoutName(fullLayerName) ? true : false;
  return {
    fullName: fullLayerName,
    tags: inTag,
    name: layerName
  };
}

function rgbaCode(color) {
  var red = Math.round(color.red() * 255);
  var green = Math.round(color.green() * 255);
  var blue = Math.round(color.blue() * 255);
  return 'rgba(' + red + ',' + green + ',' + blue + ',' + color.alpha() + ')';
}

function getShadow(style) {
  var shadows = style.enabledShadows();
  var len = shadows.length;

  if (len == 0) {
    return null;
  } else {
    return shadows[len - 1];
  }
}

function getInnerShadow(style) {
  var shadows = style.enabledInnerShadows();
  var len = shadows.length;

  if (len == 0) {
    return null;
  } else {
    return shadows[len - 1];
  }
}

/***/ }),

/***/ "./src/detach.js":
/*!***********************!*\
  !*** ./src/detach.js ***!
  \***********************/
/*! exports provided: detachAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "detachAction", function() { return detachAction; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/common.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common_js__WEBPACK_IMPORTED_MODULE_0__);

function detachAction(context) {
  var document = context.document;
  var selection = context.selection;

  function getSymbolInstance(selection) {
    selection.forEach(function (selected) {
      if (isGroup(selected)) {
        getSymbolInstance(selected.layers());
      } else if (isSymbolInstance(selected)) {
        selected.detachByReplacingWithGroup().setLayerListExpandedType(1);
      }
    });
  }

  getSymbolInstance(selection);
}
;

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=detach.js.map