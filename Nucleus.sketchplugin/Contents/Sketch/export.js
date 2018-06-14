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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/export.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/common.js":
/*!***********************!*\
  !*** ./src/common.js ***!
  \***********************/
/*! exports provided: isPage, isArtboard, isSymbolMaster, isSymbolInstance, isShape, isSymbol, isGroup, isLayer, isText, alert, getFirstTag, getAllTags, getAllTagsWithoutName, getPropName, getPropVal, tagAndNames, rgbaCode, getShadow, getInnerShadow */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isPage", function() { return isPage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArtboard", function() { return isArtboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbolMaster", function() { return isSymbolMaster; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSymbolInstance", function() { return isSymbolInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isShape", function() { return isShape; });
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
function isShape(layer) {
  return layer.class() == MSShapeGroup;
}
function isSymbol(layer) {
  return layer.class() == MSSymbolInstance || layer.class() == MSSymbolMaster;
}
function isGroup(layer) {
  return layer.class() == MSLayerGroup;
}
function isLayer(layer) {
  return !isGroup(layer) && !isText(layer) && !isSymbolInstance(layer);
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

/***/ "./src/export.js":
/*!***********************!*\
  !*** ./src/export.js ***!
  \***********************/
/*! exports provided: exportAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportAction", function() { return exportAction; });
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ "./src/common.js");

function exportAction(context) {
  var ways = [];
  var doc = context.document;
  var selection = context.selection;
  var selectedLayer = selection.firstObject(); // var allLayers = getLayersForExport(doc.pages(), selectedLayer);

  var allLayers = []; // var sharedStyles = context.document.documentData().layerStyles().sharedStyles();
  //

  for (var i = 0; i < doc.pages().length; i++) {
    var page = doc.pages().objectAtIndex(i);
    var artboards = page.artboards();
    getAllLayers(artboards);
  }

  function isIcon(layer) {
    var tagsNames = layer.name().split("#").slice(1);
    var key = '';
    tagsNames.forEach(function (tag) {
      var tagName = String(tag);
      tagName.charAt(0) == 'i' ? key = true : false;
    });
    return key;
  }

  function getAllLayers(objects) {
    objects.forEach(function (obj) {
      if (_common__WEBPACK_IMPORTED_MODULE_0__["isArtboard"](obj)) {
        var layers = obj.layers();
        getAllLayers(layers); //need alert Please create the artboard
      } else if (_common__WEBPACK_IMPORTED_MODULE_0__["isSymbolMaster"](obj)) {
        var layers = obj.layers();
        allLayers.push(obj);
        getAllLayers(layers);
      } else if (_common__WEBPACK_IMPORTED_MODULE_0__["isGroup"](obj)) {
        var layers = obj.layers();
        isIcon(obj) ? allLayers.push(obj) : getAllLayers(layers);
      } else {
        allLayers.push(obj);
      }
    });
  }

  function exportJSON(a, file_path, filename) {
    var jsonName = '$' + String(filename); // Create the JSON object from the layer array

    var jsonObj = {};
    jsonObj[jsonName] = a;

    function format(obj) {
      var jsonAsStr = JSON.stringify(obj, null, 2);
      jsonAsStr = jsonAsStr.substring(1, jsonAsStr.length - 1);
      jsonAsStr = jsonAsStr.replace(/"/g, '').replace(/[\[\{]/g, '(').replace(/[\]\}]/g, ')').replace(/\\/g, '\'');
      return jsonAsStr;
    }

    var formattedString = format(ways).replace(/,/g, '') + format(jsonObj);
    var file = NSString.stringWithString(formattedString + ';'); // Save the file

    file.writeToFile_atomically_encoding_error_(file_path + filename + ".scss", true, NSUTF8StringEncoding, null);
    var alertMessage = jsonName + " saved to: " + file_path;
    _common__WEBPACK_IMPORTED_MODULE_0__["alert"]("SCSS MAP Exported!", alertMessage);
  }

  ; //make sure something is selected

  if (selection.count() == 0) {
    doc.showMessage("Please select a layer.");
  } else {
    //allow xml to be written to the folder
    var fileTypes = NSArray.arrayWithObjects("json", null); //create select folder window

    var panel = NSOpenPanel.openPanel();
    panel.setCanChooseDirectories(true);
    panel.setCanCreateDirectories(true);
    panel.setAllowedFileTypes(fileTypes);
    var clicked = panel.runModal(); //check if Ok has been clicked

    if (clicked == NSFileHandlingPanelOKButton) {
      var isDirectory = true; //get the folder path

      var firstURL = panel.URLs().objectAtIndex(0); //format it to a string

      var file_path = NSString.stringWithFormat_(NSString.stringWithString_("%@"), firstURL); //remove the file:// path from string

      if (0 === file_path.indexOf("file://")) {
        file_path = file_path.substring(7);
      }
    }
  } //google fonts weigts


  var fontWeights = {
    thin: 100,
    extralight: 200,
    ultralight: 200,
    light: 300,
    book: 400,
    normal: 400,
    regular: 400,
    roman: 400,
    medium: 500,
    semibold: 600,
    demibold: 600,
    bold: 700,
    boldmt: 700,
    psboldmt: 700,
    extrabold: 800,
    ultrabold: 800,
    black: 900,
    heavy: 900
  };
  var nucleonPropNames = {
    'h': 'height',
    'w': 'width',
    'o': 'width',
    'b': 'background',
    'c': 'color',
    'r': 'border-radius',
    's': 'box-shadow'
  };

  function getNucleonPropVal(layer, nucleonPropName, key) {
    var nucleonPropValues = {};

    if (_common__WEBPACK_IMPORTED_MODULE_0__["isText"](layer)) {
      nucleonPropValues = {
        'color': _common__WEBPACK_IMPORTED_MODULE_0__["rgbaCode"](layer.textColor()),
        'text-transform': layer.styleAttributes().MSAttributedStringTextTransformAttribute == 1 ? 'uppercase' : 'lowercase'
      };
    } else if (key != 'i') {
      nucleonPropValues = {
        'height': layer.frame().height() + 'px',
        'width': layer.frame().width() + 'px',
        'background': _common__WEBPACK_IMPORTED_MODULE_0__["rgbaCode"](layer.style().firstEnabledFill().color()),
        'border-radius': getRadius(layer),
        'box-shadow': getShadows(layer)
      };
    } else {
      nucleonPropValues = {
        'height': layer.frame().height() + 'px',
        'width': layer.frame().width() + 'px',
        'background-image': getBase64(layer)
      };
    }

    return nucleonPropValues[nucleonPropName];
  }

  var weightsNames = Object.keys(fontWeights);

  function getFirstTag(str) {
    return str.match(/[^#\ ^\.]+/g);
  }

  function fontWeight(attr) {
    var splitName = attr.match(/(.+)\-\s*(.+)/);
    var name = splitName[2].toLowerCase();

    if (splitName != null) {
      for (var i = 0; i < weightsNames.length; i++) {
        if (name == weightsNames[i]) {
          return 'font-weight: ' + fontWeights[name];
        }
      }
    }
  }

  ;

  function getVariable(tag, attrs) {
    for (var i = 0; i < allLayers.length; i++) {
      var layer = allLayers[i],
          fullLayerName = String(layer.name()),
          splitName = _common__WEBPACK_IMPORTED_MODULE_0__["getAllTags"](fullLayerName),
          layerName = splitName == null ? fullLayerName : splitName[0];

      if (splitName != null && layerName == 'nucleon') {
        var tags = fullLayerName.split("#").slice(1);
        var nucleonVars = [];
        var parentGroupName = layer.parentGroup().name();
        var wayPath = '@import ' + '"' + parentGroupName + '";';

        for (var y = 0; y < tags.length; y++) {
          var tagName = String(tags[y]);
          var key = tag.charAt(0);
          var nucleonProp = nucleonPropNames[key];
          var nucleonVar = nucleonProp + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ')';

          if (ways.indexOf(wayPath) == -1 && tag == tagName) {
            ways.push(wayPath);
          }

          if (tag == tagName && key == 't' || tag == tagName && key == 'c') {
            var res;
            attrs.forEach(function (attr) {
              var attrName = _common__WEBPACK_IMPORTED_MODULE_0__["getPropName"](attr);

              if (key == 't') {
                if (attrName == 'extend') {
                  nucleonVars.push(attrName + ': ' + "'" + tagName + "'");
                } else {
                  nucleonVars.push(attrName + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ', ' + attrName + ')');
                }

                res = nucleonVars;
              } else if (attrName == 'color' && key == 'c') {
                res = attrName + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ')';
              }
            });
            return res;
          } else if (tag == tagName && key == 'i') {
            var res;
            attrs.forEach(function (attr) {
              var attrName = attr.match(/^([^:]+):/);

              if (attrName[1] == 'extend') {
                nucleonVars.push(attrName[1] + ': ' + "'" + tagName + "'");
              } else {
                nucleonVars.push(attrName[1] + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ', ' + attrName[1] + ')');
              }
            });
            return nucleonVars;
          } else if (tag == tagName) {
            return nucleonVar;
          }
        }
      }
    }
  }

  ; // function clearSVG(svg){
  //   var substr = [
  //     svg.match(/(.+)\<!\s*(.+)/),
  //     svg.match(/(.+)\<title\s*(.+)/),
  //     svg.match(/(.+)\<desc\s*(.+)/),
  //     svg.match(/(.+)\<defs\s*(.+)/)
  //   ];
  //
  //   substr.forEach((sub) => {
  //     svg.replace(sub, '');
  //   })
  // }

  function getBase64(layer) {
    var ancestry = MSImmutableLayerAncestry.ancestryWithMSLayer_(layer);
    var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_(ancestry).firstObject();
    exportRequest.format = 'svg';
    var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, NSColorSpace.sRGBColorSpace());
    var data = exporter.data();
    var base64Code = data.base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithLineFeed);
    var base64 = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);
    return "url('data:image/svg+xml;base64," + base64Code + "')";
  }

  function getShadows(layer) {
    var shadows = layer.style().enabledShadows();
    var innerShadows = layer.style().enabledInnerShadows();
    var cssShadows = '';
    var cssInnerShadows = '';
    shadows.forEach(function (s) {
      cssShadows += s.offsetX() + 'px ' + s.offsetY() + 'px ' + s.blurRadius() + 'px ' + s.spread() + 'px ' + _common__WEBPACK_IMPORTED_MODULE_0__["rgbaCode"](s.color()) + ', ';
    });
    innerShadows.forEach(function (s) {
      cssInnerShadows += 'inset ' + s.offsetX() + 'px ' + s.offsetY() + 'px ' + s.blurRadius() + 'px ' + s.spread() + 'px ' + _common__WEBPACK_IMPORTED_MODULE_0__["rgbaCode"](s.color()) + ', ';
    });

    if (cssShadows && !cssInnerShadows) {
      return cssShadows.slice(0, -2);
    } else if (cssInnerShadows && !cssShadows) {
      return cssInnerShadows.slice(0, -2);
    } else if (cssShadows && cssInnerShadows) {
      return cssShadows.slice(0, -2) + ', ' + cssInnerShadows.slice(0, -2);
    }
  }

  function getRadius(layer) {
    var points = [];
    layer.children().forEach(function (e) {
      if (e.class() == 'MSRectangleShape') {
        points = e.points();
      }
    });
    var radiusTopLeft = Math.round(points.objectAtIndex(0).cornerRadius()),
        radiusTopRight = Math.round(points.objectAtIndex(1).cornerRadius()),
        radiusBottomRight = Math.round(points.objectAtIndex(2).cornerRadius()),
        radiusBottomLeft = Math.round(points.objectAtIndex(3).cornerRadius());
    return radiusTopLeft + 'px ' + radiusTopRight + 'px ' + radiusBottomRight + 'px ' + radiusBottomLeft + 'px';
  }

  function getAttrs(layer) {
    var attrs = [];
    var rawAttrs = layer.CSSAttributes();
    rawAttrs.forEach(function (attr) {
      if (!attr.match(/[\/*^\.]/g)) {
        attrs.push(attr.replace(/;/g, ''));
      }
    });
    return attrs;
  }

  ;

  function layerAttrsBuilder(layer) {
    var fullLayerName = layer.name(),
        splitName = _common__WEBPACK_IMPORTED_MODULE_0__["getAllTags"](fullLayerName),
        layerName = splitName == null ? fullLayerName : splitName[0],
        tagsNames = fullLayerName.split("#").slice(1),
        nucleonAttrsObj = {},
        attrsObj = {},
        attrs = getAttrs(layer);

    if (_common__WEBPACK_IMPORTED_MODULE_0__["isLayer"](layer)) {
      var boxShadow = getShadows(layer) ? 'box-shadow: ' + getShadows(layer) : 'box-shadow: none'; // var radius = 'border-radius: ' + getRadius(layer);

      attrs.splice(attrs.length, 0, 'height: ' + layer.frame().height() + 'px', 'width: ' + layer.frame().width() + 'px', boxShadow // radius,
      );
    } else if (isIcon(layer)) {
      attrs.splice(attrs.length, 0, 'extend: ' + 'name', 'height: ' + layer.frame().height() + 'px', 'width: ' + layer.frame().width() + 'px', 'background-image: ' + getBase64(layer));
    } else if (_common__WEBPACK_IMPORTED_MODULE_0__["isText"](layer)) {
      var attrFontWeight;
      var textTransform = layer.styleAttributes().MSAttributedStringTextTransformAttribute == 1 ? 'uppercase' : 'lowercase';
      attrs.forEach(function (attr) {
        if (_common__WEBPACK_IMPORTED_MODULE_0__["getPropName"](attr) == 'font-family') {
          attrFontWeight = fontWeight(attr);
        }
      });
      attrs.splice(attrs.length, 0, 'extend: ' + 'name', // 'line-height: ' + layer.lineHeight() + 'px',// in base sketch functional
      'text-transform: ' + textTransform, attrFontWeight);
    }

    if (splitName[1] && tagsNames) {
      tagsNames.forEach(function (tag) {
        var tagName = String(tag);
        var key = tagName.charAt(0);
        var nucleonPropName = nucleonPropNames[key];
        attrs.forEach(function (attr, index) {
          if (_common__WEBPACK_IMPORTED_MODULE_0__["isText"](layer) && key == 't' || key == 'i') {
            layerName == 'nucleon' ? nucleonAttrsObj[tagName] = attrs : attrs = getVariable(tag, attrs);
          } else if (_common__WEBPACK_IMPORTED_MODULE_0__["getPropName"](attr) == nucleonPropName) {
            layerName == 'nucleon' ? nucleonAttrsObj[tagName] = getNucleonPropVal(layer, nucleonPropName, key) : attrs[index] = getVariable(tag, attrs);
          }
        });

        if (layerName != 'nucleon') {
          nucleonAttrsObj[layerName] = attrs;
        }
      });
    } else {
      nucleonAttrsObj[layerName] = attrs;
    }

    attrsObj[layerName] = attrs;

    if (_common__WEBPACK_IMPORTED_MODULE_0__["isText"](layer) || layerName == 'nucleon') {
      return nucleonAttrsObj;
    } else {
      return attrsObj;
    }
  }

  ;

  function buildData(collection, result) {
    collection.forEach(function (layer) {
      builderData(layer, result);
    });
  }

  function builderData(layer, result) {
    var fullLayerName = layer.name(),
        splitName = _common__WEBPACK_IMPORTED_MODULE_0__["getAllTags"](fullLayerName),
        layerName = splitName == null ? fullLayerName : splitName[0];

    if (_common__WEBPACK_IMPORTED_MODULE_0__["isSymbolInstance"](layer)) {
      layer.symbolMaster().layers().forEach(function (symbolLayer) {
        if (_common__WEBPACK_IMPORTED_MODULE_0__["isSymbolInstance"](symbolLayer)) {
          _common__WEBPACK_IMPORTED_MODULE_0__["alert"]("ERROR!", 'Put embedded symbol "' + symbolLayer.name() + '" in a symbol-master group.');
        } else {
          var fullSymbolLayerName = symbolLayer.name();
          var symbolSplitName = _common__WEBPACK_IMPORTED_MODULE_0__["getAllTags"](fullSymbolLayerName);
          var symbolLayerName = symbolSplitName == null ? fullSymbolLayerName : symbolSplitName[0];
          var deepCollection = symbolLayer.layers();
          result[symbolLayerName] = {};
          buildData(deepCollection, result[symbolLayerName]);
        }
      });
    } else if (_common__WEBPACK_IMPORTED_MODULE_0__["isGroup"](layer) && !isIcon(layer)) {
      var deepCollection = layer.layers();
      result[layerName] = {};
      buildData(deepCollection, result[layerName]);
    } else if (_common__WEBPACK_IMPORTED_MODULE_0__["isText"](layer) || _common__WEBPACK_IMPORTED_MODULE_0__["isLayer"](layer) || isIcon(layer)) {
      result = Object.assign(result, layerAttrsBuilder(layer));
    }
  } // loop through the selected layers and export the XML


  for (var i = 0; i < selection.count(); i++) {
    var selectedLayer = selection[i],
        collectionName = String(selectedLayer.name());

    if (!_common__WEBPACK_IMPORTED_MODULE_0__["isGroup"](selectedLayer)) {
      _common__WEBPACK_IMPORTED_MODULE_0__["alert"]("ERROR!", "Please select a group.");
    } else {
      var collection = selectedLayer.layers(),
          result = {};
      buildData(collection, result);
      exportJSON(result, file_path, collectionName);
    }
  }
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
that['exportAction'] = __skpm_run.bind(this, 'exportAction');
that['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=export.js.map