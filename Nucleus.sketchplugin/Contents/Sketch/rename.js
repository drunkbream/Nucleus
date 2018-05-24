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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/rename.js");
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

/***/ "./src/rename.js":
/*!***********************!*\
  !*** ./src/rename.js ***!
  \***********************/
/*! exports provided: renameAction */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renameAction", function() { return renameAction; });
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ "./src/common.js");
/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_common_js__WEBPACK_IMPORTED_MODULE_0__);

function renameAction(context) {
  var selection = context.selection;
  var layers = [];

  function labelText(label, text) {
    label.setStringValue(text);
    label.setSelectable(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setDrawsBackground(false);
    return label;
  }

  ; // var nucleonsPrefixs = ['h', 'w', 'o', 'b', 'c', 't', 's', 'r']
  //
  // function dedupe(str, delimiter) {
  //     return str.split(delimiter).reverse().filter(function(e, i, arr) {
  //         return arr.indexOf(e, i+1) === -1;
  //     }).reverse();
  // }
  //
  // function sortingTags(tags){
  //   var result = [];
  //
  //   nucleonsPrefixs.forEach((prefix) => {
  //     tags.forEach((tag) => {
  //       var key = String(tag).charAt(0);
  //       key == prefix ? result.push(tag) : null;
  //     })
  //   })
  //   return result;
  // };
  //
  // function getTags(layers){
  //   var result = [];
  //
  //   layers.forEach(function(layer){
  //     var names = tagAndNames(layer);
  //     var tagsOnLayer = [];
  //
  //     names.tags == true ? tagsOnLayer.push(layer.name().split('#').slice(1)) : null;
  //     result = result.concat(tagsOnLayer);
  //   })
  //
  //   log(result)
  //   return result;
  // };

  function createDialog() {
    var dialog = COSAlertWindow.new(); // var tagsStr = getTags(layers).join('\n');
    // var tagLines = tagsStr.length;
    // Creating the view

    var viewWidth = 400;
    var viewHeight = 200; // var viewHeight = 200 + (tagLines * 1.2);

    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight)); // Creating the inputs
    // var tagsLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, -136, (viewWidth / 2) - 10, viewHeight - 25));

    var fromNameLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 20, viewWidth / 2 - 10, 20));
    var toNameLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 70, viewWidth / 2 - 10, 20));
    var fromNameField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 44, 300, 24));
    var toNameField = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 94, 300, 24));
    var newSymbolcheckbox = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - 125, 300, 20));
    var totalRenameSymbol = NSButton.alloc().initWithFrame(NSMakeRect(0, viewHeight - 155, 300, 20));
    newSymbolcheckbox.setButtonType(NSSwitchButton);
    newSymbolcheckbox.setBezelStyle(0);
    newSymbolcheckbox.setTitle("Generate new master symbols.");
    newSymbolcheckbox.setState(NSOffState);
    totalRenameSymbol.setButtonType(NSSwitchButton);
    totalRenameSymbol.setBezelStyle(0);
    totalRenameSymbol.setTitle("Total rename symbol.");
    totalRenameSymbol.setState(NSOffState); // Labels text
    // labelText(tagsLabel, 'Tags in selection: \n' + tagsStr);

    labelText(fromNameLabel, 'From');
    labelText(toNameLabel, 'To'); // Adding elements
    // Labels
    // view.addSubview(tagsLabel);

    view.addSubview(fromNameLabel);
    view.addSubview(toNameLabel); // Fields

    fromNameField.setNextKeyView_(toNameField);
    view.addSubview(fromNameField);
    view.addSubview(toNameField);
    view.addSubview(newSymbolcheckbox);
    view.addSubview(totalRenameSymbol);
    dialog.addAccessoryView(view);
    dialog.setMessageText("Change any characters in the names in all layers tree recursively"); // Creating dialog buttons

    dialog.addButtonWithTitle("Ok");
    dialog.addButtonWithTitle("Cancel");
    var responseCode = dialog.runModal();

    if (responseCode == 1000) {
      var fromName = fromNameField.stringValue();
      var toName = toNameField.stringValue();
      var checkboxCreateSymbols = newSymbolcheckbox.state();
      var checkboxTotalRenameSymbols = totalRenameSymbol.state();
      layers.forEach(function (layer) {
        var layerName = layer.name();

        if (isSymbolInstance(layer) && checkboxCreateSymbols == 1) {
          // Create symbol from layers and don't send to symbol page
          var detachedSymbolLayer = layer.detachByReplacingWithGroup();
          var symbolLayers = MSLayerArray.arrayWithLayers([detachedSymbolLayer]);

          if (MSSymbolCreator.canCreateSymbolFromLayers(symbolLayers)) {
            var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(symbolLayers, layerName.replace(fromName, toName), false);
            var symbolMaster = symbolInstance.symbolMaster(); // Move symbol to same place of layer

            symbolMaster.setRect(symbolInstance.absoluteRect().rect()); // Collapse artboard

            symbolMaster.setLayerListExpandedType(1); // Remove symbol instance
            // symbolInstance.removeFromParent();
          }
        } else if (isSymbolInstance(layer) && checkboxTotalRenameSymbols == 1) {
          var instanceBrothers = layer.symbolMaster().allInstances();
          instanceBrothers.forEach(function (inst) {
            inst.name = layerName.replace(fromName, toName);
          });
          layer.symbolMaster().name = layerName.replace(fromName, toName);
          layer.name = layerName.replace(fromName, toName);
        } else if (!isSymbolMaster(layer)) {
          layer.name = layerName.replace(fromName, toName);
        }
      }); // createDialog(context);
    } else {
      return false;
    }
  }

  function getLayers(l) {
    l.forEach(function (layer) {
      if (isGroup(layer)) {
        var groupLayers = layer.layers();
        layers.push(layer);
        getLayers(groupLayers);
      } else if (isSymbolInstance(layer)) {
        var master = layer.symbolMaster();
        layers.push(layer);
        layers.push(master);
        getLayers(master.layers());
      } else {
        layers.push(layer);
      }
    });
  }

  getLayers(selection);
  createDialog(context);
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

//# sourceMappingURL=rename.js.map