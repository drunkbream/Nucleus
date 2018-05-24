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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/sync.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: isPage, isArtboard, isSymbolMaster, isSymbolInstance, isSymbol, isGroup, isLayer, isText, alert, getFirstTag, getAllTags, getAllTagsWithoutName, getPropName, getPropVal, tagAndNames, rgbaCode, getShadow, getInnerShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPage", function() { return isPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArtboard", function() { return isArtboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbolMaster", function() { return isSymbolMaster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbolInstance", function() { return isSymbolInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbol", function() { return isSymbol; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGroup", function() { return isGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLayer", function() { return isLayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isText", function() { return isText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alert", function() { return alert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFirstTag", function() { return getFirstTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllTags", function() { return getAllTags; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAllTagsWithoutName", function() { return getAllTagsWithoutName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropName", function() { return getPropName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPropVal", function() { return getPropVal; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tagAndNames", function() { return tagAndNames; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rgbaCode", function() { return rgbaCode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getShadow", function() { return getShadow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInnerShadow", function() { return getInnerShadow; });
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
      layerName = splitName == null ? fullLayerName : splitName[0],
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

/***/ "./src/sync.js":
/*!*********************!*\
  !*** ./src/sync.js ***!
  \*********************/
/*! exports provided: syncAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "syncAction", function() { return syncAction; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/common.js");

function syncAction(context) {
  var doc = context.document,
      selection = context.selection,
      nucleonsLayers = [],
      syncLayers = [],
      selectedLayer = selection.firstObject(),
      sharedStyles = context.document.documentData().layerStyles().sharedStyles();

  function separator(layer) {
    var names = _common__WEBPACK_IMPORTED_MODULE_0__["tagAndNames"](layer);

    if (names.name == 'nucleon') {
      nucleonsLayers.push(layer);
    } else if (names.tags) {
      syncLayers.push(layer);
    }
  }

  function getInnerLayers(objects) {
    var result = [];
    objects.forEach(function (obj) {
      if (_common__WEBPACK_IMPORTED_MODULE_0__["isSymbolMaster"](obj) || _common__WEBPACK_IMPORTED_MODULE_0__["isGroup"](obj)) {
        getInnerLayers(obj.layers());
      } else {
        separator(obj);
      }
    });
  }

  function getSyncLayers(pages) {
    for (var i = 0; i < pages.length; i++) {
      var page = pages.objectAtIndex(i);

      if (page.name() == 'Symbols') {
        getInnerLayers(page.layers());
      } else {
        page.artboards().forEach(function (artboard) {
          if (artboard.name() == 'Nucleons') {
            getInnerLayers(artboard.layers());
          }
        });
      }
    }
  }

  getSyncLayers(doc.pages());

  function getShadownucleonsValues(nucleon) {
    var nucleonShadow = nucleon.style().enabledShadows(),
        nucleonInnerShadow = nucleon.style().enabledInnerShadows(),
        shadowValues = {};

    if (nucleonShadow.length != 0) {
      nucleonShadow.forEach(function (s) {
        shadowValues.shadow = {};
        shadowValues.shadow.color = s.color();
        shadowValues.shadow.offsetX = s.offsetX();
        shadowValues.shadow.offsetY = s.offsetY();
        shadowValues.shadow.blurRadius = s.blurRadius();
        shadowValues.shadow.spread = s.spread();
      });
    }

    if (nucleonInnerShadow.length != 0) {
      nucleonInnerShadow.forEach(function (s) {
        shadowValues.innerShadow = {};
        shadowValues.innerShadow.color = s.color();
        shadowValues.innerShadow.offsetX = s.offsetX();
        shadowValues.innerShadow.offsetY = s.offsetY();
        shadowValues.innerShadow.blurRadius = s.blurRadius();
        shadowValues.innerShadow.spread = s.spread();
      });
    }

    return shadowValues;
  }

  function getTextProps(nucleon) {
    return {
      fontName: nucleon.font().fontName(),
      fontSize: nucleon.font().pointSize(),
      lineHeight: nucleon.lineHeight(),
      textTransform: nucleon.styleAttributes().MSAttributedStringTextTransformAttribute,
      textKern: nucleon.styleAttributes().NSKern
    };
  }

  function getRadiusnucleonsValues(nucleon) {
    var points = [];
    var radius = {};
    nucleon.children().forEach(function (e) {
      if (e.class() == 'MSRectangleShape') {
        points = e.points();
      }
    });
    radius.topLeft = Math.round(points.objectAtIndex(0).cornerRadius());
    radius.topRight = Math.round(points.objectAtIndex(1).cornerRadius());
    radius.bottomRight = Math.round(points.objectAtIndex(2).cornerRadius());
    radius.bottomLeft = Math.round(points.objectAtIndex(3).cornerRadius());
    return radius;
  }

  function setRadius(layer, obj) {
    layer.children().forEach(function (e) {
      if (e.class() == 'MSRectangleShape') {
        e.points().objectAtIndex(0).setCornerRadius(obj.topLeft);
        e.points().objectAtIndex(1).setCornerRadius(obj.topRight);
        e.points().objectAtIndex(2).setCornerRadius(obj.bottomRight);
        e.points().objectAtIndex(3).setCornerRadius(obj.bottomLeft);
      }
    });
  }

  function nucleonProps(nucleon) {
    var tagName = _common__WEBPACK_IMPORTED_MODULE_0__["getAllTags"](nucleon.name());
    var key = tagName[1].charAt(0);
    return {
      h: key == 'h' ? nucleon.frame().height() : null,
      w: key == 'w' ? nucleon.frame().width() : null,
      b: key == 'b' ? nucleon.style().firstEnabledFill().color() : null,
      c: key == 'c' ? nucleon.textColor() : null,
      t: key == 't' ? getTextProps(nucleon) : null,
      s: key == 's' ? getShadownucleonsValues(nucleon) : null,
      r: key == 'r' ? getRadiusnucleonsValues(nucleon) : null
    };
  }

  function tagsValues(nucleons) {
    var values = {};
    nucleons.forEach(function (nucleon) {
      var nucleonName = _common__WEBPACK_IMPORTED_MODULE_0__["getAllTags"](nucleon.name());
      var tagName = nucleonName[1];
      values[tagName] = nucleonProps(nucleon);
    });
    return values;
  }

  var nucleonValues = tagsValues(nucleonsLayers);

  function setTextProps(layer, obj) {
    if (obj.textTransform == 1) {
      layer.addAttribute_value("MSAttributedStringTextTransformAttribute", obj.textTransform);
    } else {
      layer.addAttribute_value("MSAttributedStringTextTransformAttribute", 0);
    }

    layer.setCharacterSpacing(obj.textKern);
    layer.setFontPostscriptName(obj.fontName);
    layer.setFontSize(obj.fontSize);
    layer.setLineHeight(obj.lineHeight);
  }

  ;

  function setShadows(layer, obj) {
    layer.style().removeAllStyleShadows();
    layer.style().removeAllStyleInnerShadows();

    if (obj.shadow) {
      var shadow = layer.style().addStylePartOfType(2);
      shadow.color = obj.shadow.color;
      shadow.offsetX = obj.shadow.offsetX;
      shadow.offsetY = obj.shadow.offsetY;
      shadow.blurRadius = obj.shadow.blurRadius;
      shadow.spread = obj.shadow.spread;
    }

    if (obj.innerShadow) {
      var innerShadow = layer.style().addStylePartOfType(3);
      innerShadow.color = obj.innerShadow.color;
      innerShadow.offsetX = obj.innerShadow.offsetX;
      innerShadow.offsetY = obj.innerShadow.offsetY;
      innerShadow.blurRadius = obj.innerShadow.blurRadius;
      innerShadow.spread = obj.innerShadow.spread;
    }

    context.document.reloadInspector();
  }

  function sync(layers) {
    layers.forEach(function (layer) {
      var tagsNames = layer.name().split("#").slice(1);
      tagsNames.forEach(function (tagName) {
        var key = tagName.charAt(0);
        setSyncProps(layer, tagName, key);
      });
    });
  }

  function setSyncProps(layer, tagName, key) {
    var value = new Object(nucleonValues[tagName]);
    key == 'h' ? layer.frame().height = value[key] : null;
    key == 'w' || key == 'o' ? layer.frame().width = value[key] : null;
    key == 'b' ? layer.style().firstEnabledFill().color = value[key] : null;
    key == 'c' ? layer.setTextColor(value[key]) : null;
    key == 't' ? setTextProps(layer, value[key]) : null;
    key == 's' ? setShadows(layer, value[key]) : null;
    key == 'r' ? setRadius(layer, value[key]) : null;
  }

  sync(syncLayers);
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
that['syncAction'] = __skpm_run.bind(this, 'syncAction');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=sync.js.map