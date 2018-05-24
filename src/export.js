import * as common from './common';


export function exportAction(context) {
  var ways = [];
  var doc = context.document;
  var selection = context.selection;
  var allPages = doc.pages();
  var allLayers = [];
  var selectedLayer = selection.firstObject();
  var sharedStyles = context.document.documentData().layerStyles().sharedStyles();

  for (var i = 0; i < doc.pages().length; i++) {
    var page = doc.pages().objectAtIndex(i);
    var artboards = page.artboards();
    getAllLayers(artboards);
  }

  function exportJSON(a, file_path, filename){
    var jsonName = '$' + String(filename);
  	// Create the JSON object from the layer array
    var jsonObj = {};
    jsonObj[jsonName] = a;

    function format(obj){
      var jsonAsStr = JSON.stringify(obj, null, 2);
      jsonAsStr = jsonAsStr.substring(1, jsonAsStr.length - 1);
      jsonAsStr = jsonAsStr.replace(/"/g, '')
                          .replace(/[\[\{]/g, '(')
                          .replace(/[\]\}]/g, ')')
                          .replace(/\\/g, '\'');

      return jsonAsStr;
    }

    var formattedString = format(ways).replace(/,/g, '') + format(jsonObj);
                      //   log(jsonObj);
    // jsonAsStr.replace(/\"/g, '');
    // Convert the object to a json string
    var file = NSString.stringWithString(formattedString + ';');
    // var scss = file.replace(/\{/g, '(').replace(/\}/g, ')');
    // Save the file
    file.writeToFile_atomically_encoding_error_( file_path + filename + ".scss"  ,true  ,NSUTF8StringEncoding  ,null);

    var alertMessage = jsonName+".json saved to: " + file_path;
    alert("SCSS MAP Exported!", alertMessage);
  }

  function getAllLayers(objects){
    objects.forEach(function(obj){
      var objectID = obj.objectID();

      if (isArtboard(obj)) {
        var layers = obj.layers();

        getAllLayers(layers);
        //need alert Please create the artboard
      }
      else if (isSymbolMaster(obj)) {
        var layers = obj.layers();

        allLayers.push(obj);
        getAllLayers(layers);
      }
      else if (isGroup(obj)) {
        var layers = obj.layers();

        allLayers.push(obj);
        getAllLayers(layers);
      }
      else {
        allLayers.push(obj);
      }
    })
  }

  //make sure something is selected
  if(selection.count() == 0){
    	doc.showMessage("Please select a layer.");
  }
  else {

    //allow xml to be written to the folder
    var fileTypes = NSArray.arrayWithObjects("json", null);

    //create select folder window
    var panel = NSOpenPanel.openPanel();
    panel.setCanChooseDirectories(true);
    panel.setCanCreateDirectories(true);
    panel.setAllowedFileTypes(fileTypes);

    var clicked = panel.runModal();
    //check if Ok has been clicked
  	if (clicked == NSFileHandlingPanelOKButton) {

  		var isDirectory = true;
      //get the folder path
  		var firstURL = panel.URLs().objectAtIndex(0);
      //format it to a string
  		var file_path = NSString.stringWithFormat_( NSString.stringWithString_( "%@"), firstURL);

      //remove the file:// path from string
      if (0 === file_path.indexOf("file://")) {
        file_path = file_path.substring(7);
      }
  	}
  }

  //google fonts weigts
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
     's': 'box-shadow',
   };

   function getnucleonPropVal(layer, nucleonPropName) {
      var nucleonPropValues = {};

      if (isText(layer)) {
        nucleonPropValues = { 'color': rgbaCode(layer.textColor()) }
      } else {
        nucleonPropValues = {
           'height': layer.frame().height() + 'px',
           'width': layer.frame().width() + 'px',
           'background': rgbaCode(layer.style().firstEnabledFill().color()),
           'border-radius': getRadius(layer),
           'box-shadow': getShadows(layer),
        }
      }

      return nucleonPropValues[nucleonPropName];
   }

  var  weightsNames = Object.keys(fontWeights);

  function getFirstTag(str){
    return str.match(/[^#\ ^\.]+/g);
  }

  function getAllTags(str){
    return str.match(/[^#\ ^\.]+/g);
  }

  function getAllTagsWithoutName(str){
     return str.match(/#([^#\ ^\.]+)/);
  }

  function getPropName(str){
    var split = str.match(/(.+)\:\s*(.+)/);
    return split[1];
  }

  function getPropVal(str){
    var split = str.match(/(.+)\:\s*(.+)/);
    return split[2];
  }

  function fontWeight(attr){
    var splitName = attr.match(/(.+)\-\s*(.+)/);
    var name = splitName[2].toLowerCase();

    if (splitName != null) {
        for (var i = 0; i < weightsNames.length; i++){
            if (name == weightsNames[i]) {
                return 'font-weight: ' + fontWeights[name];
            }
        }
    }
  };

  function getVariable(tag, attrs) {
     for (var i = 0; i < allLayers.length; i++) {
        var layer = allLayers[i],
            fullLayerName = String(layer.name()),
            splitName = getAllTags(fullLayerName),
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

          if (ways.indexOf(wayPath) == -1 && tag == tagName){
            ways.push(wayPath);
          }

          if (tag == tagName && key == 't' || tag == tagName && key == 'c') {
              var res;

              attrs.forEach(function(attr){
                  var attrName = getPropName(attr);

                  if (key == 't') {
                      nucleonVars.push(attrName + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ', ' +  attrName + ')');
                      res = nucleonVars;
                  } else if (attrName == 'color' && key == 'c') {
                      res = attrName + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ')';
                  }
              })

              return res;

          }
          else if (tag == tagName) {
              return nucleonVar;
          }
        }
      }
    }
  };

  function getShadows(layer){
    var shadows = layer.style().enabledShadows();
    var innerShadows = layer.style().enabledInnerShadows();
    var cssShadows = '';
    var cssInnerShadows = '';

    shadows.forEach(function(s){
        cssShadows += s.offsetX() + 'px ' + s.offsetY() + 'px ' + s.blurRadius() + 'px ' + s.spread() + 'px ' + rgbaCode(s.color()) + ', ';
    })

    innerShadows.forEach(function(s){
        cssInnerShadows += 'inset ' + s.offsetX() + 'px ' + s.offsetY() + 'px ' + s.blurRadius() + 'px ' + s.spread() + 'px ' + rgbaCode(s.color()) + ', ';
    })

    if (cssShadows && !cssInnerShadows) {
      return cssShadows.slice(0,  -2);
    }
    else if (cssInnerShadows && !cssShadows) {
      return cssInnerShadows.slice(0,  -2);
    }
    else if (cssShadows && cssInnerShadows) {
      return cssShadows.slice(0,  -2) + ', ' + cssInnerShadows.slice(0,  -2);
    }
  }

  function getRadius(layer) {
    var points = [];

    layer.children().forEach(function(e){
        if(e.class() == 'MSRectangleShape') {
            points = e.points();
        }
    });

    var radiusTopLeft = Math.round(points.objectAtIndex(0).cornerRadius()),
        radiusTopRight = Math.round(points.objectAtIndex(1).cornerRadius()),
        radiusBottomRight = Math.round(points.objectAtIndex(2).cornerRadius()),
        radiusBottomLeft = Math.round(points.objectAtIndex(3).cornerRadius());

    return  radiusTopLeft + 'px ' + radiusTopRight + 'px ' + radiusBottomRight + 'px ' + radiusBottomLeft + 'px';
  }

  function layerAttrsBuilder(layer) {
    var fullLayerName = layer.name(),
        splitName = getAllTags(fullLayerName),
        layerName = splitName == null ? fullLayerName : splitName[0],
        tagsNames = fullLayerName.split("#").slice(1),
        nucleonAttrsObj = {},
        attrsObj = {},
        rawAttrs = layer.CSSAttributes().slice(1, -1);
        attrs = [];

        rawAttrs.forEach(function(attr){
            attrs.push(attr.replace(/;/g, ''));
        })

    if (!isText(layer) && !isSymbolInstance(layer)) {
        var boxShadow = getShadows(layer) ? 'box-shadow: ' + getShadows(layer) : 'box-shadow: none';
        var radius = 'border-radius: ' + getRadius(layer);

        attrs.splice(attrs.length, 0,
          'height: ' + layer.frame().height() + 'px',
          'width: ' + layer.frame().width() + 'px',
          radius,
          boxShadow,
        );
    } else if (isText(layer)) {
      var attrFontWeight;

      attrs.forEach(function(attr) {
        if (getPropName(attr) == 'font-family') {
          attrFontWeight = fontWeight(attr);
        }
      })

      attrs.splice(attrs.length, 0,
        'line-height: ' + layer.lineHeight() + 'px',
        attrFontWeight,
      );
    }

    if (splitName[1] && tagsNames) {
        tagsNames.forEach(function(tag){
            var tagName = String(tag);
            var key = tagName.charAt(0);
            var nucleonPropName = nucleonPropNames[key];

            attrs.forEach(function(attr, index){
                    if (isText(layer) && key == 't') {
                      layerName == 'nucleon' ? nucleonAttrsObj[tagName] = attrs : attrs = getVariable(tag, attrs);
                    }
                    else if (getPropName(attr) == nucleonPropName){
                      layerName == 'nucleon' ? nucleonAttrsObj[tagName] = getnucleonPropVal(layer, nucleonPropName) : attrs[index] = getVariable(tag, attrs);
                    }
            })

            if (layerName != 'nucleon') {
              nucleonAttrsObj[layerName] = attrs;
            }
        })
    } else {
      nucleonAttrsObj[layerName] = attrs;
    }

    attrsObj[layerName] = attrs;

    if (isText(layer) || layerName == 'nucleon') {
      return nucleonAttrsObj;
    }
    else {
      return attrsObj;
    }
  };

  function buildData(collection, result) {
    collection.forEach(function(layer){
      builderData(layer, result);
    })
  }

  function builderData(layer, result) {
      var fullLayerName = layer.name(),
          splitName = getAllTags(fullLayerName),
          layerName = splitName == null ? fullLayerName : splitName[0];

      if (isSymbolInstance(layer)) {
          layer.symbolMaster().layers().forEach(function(symbolLayer){
              if (isSymbolInstance(symbolLayer)) {
                  alert("ERROR!", 'Put embedded symbol "' + symbolLayer.name() + '" in a symbol-master group.');
              }
              else {
                  var fullSymbolLayerName = symbolLayer.name();
                  var symbolSplitName = getAllTags(fullSymbolLayerName);
                  var symbolLayerName = symbolSplitName == null ? fullSymbolLayerName : symbolSplitName[0];
                  var deepCollection = symbolLayer.layers();

                  result[symbolLayerName] = {};

                  buildData(deepCollection, result[symbolLayerName]);
              }
          })
      }
      else if (isGroup(layer)) {
          var deepCollection = layer.layers();
          // log(layerName);
          result[layerName] = {};

          buildData(deepCollection, result[layerName]);
      }
      else if (isText(layer) || isLayer(layer)) {
          result = Object.assign(result, layerAttrsBuilder(layer));
      }
  }

	//loop through the selected layers and export the XML
	for(var i = 0; i < selection.count(); i++){
    var selectedLayer = selection[i],
        collectionName = String(selectedLayer.name());

    if (!isGroup(selectedLayer)) {
      alert("ERROR!", "Please select a group.");
    } else {
      var collection = selectedLayer.layers(),
          result = {};

      buildData(collection, result);
      exportJSON(result, file_path, collectionName);
    }
	}
};
