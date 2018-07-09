import * as common from './common';

export function exportAction (context) {
  var ways = [];
  var doc = context.document;
  var selection = context.selection;
  var selectedLayer = selection.firstObject();
  // var allLayers = getLayersForExport(doc.pages(), selectedLayer);
  var allLayers = [];
  // var sharedStyles = context.document.documentData().layerStyles().sharedStyles();
  //
  for (var i = 0; i < doc.pages().length; i++) {
    var page = doc.pages().objectAtIndex(i);
    var artboards = page.artboards();
    getAllLayers(artboards);
  }

  function isIcon(layer){
    var tagsNames = layer.name().split("#").slice(1);
    var key = '';

    tagsNames.forEach((tag) => {
      var tagName = String(tag);
      tagName.charAt(0) == 'i' ? key = true : false;
    })

    return key;
  }

  function getAllLayers(objects){
    objects.forEach(function(obj){
      if (common.isArtboard(obj)) {
        var layers = obj.layers();

        getAllLayers(layers);
        //need alert Please create the artboard
      }
      else if (common.isSymbolMaster(obj)) {
        var layers = obj.layers();

        allLayers.push(obj);
        getAllLayers(layers);
      }
      else if (common.isGroup(obj)) {
        var layers = obj.layers();
        isIcon(obj) ? allLayers.push(obj) : getAllLayers(layers);
      }
      else {
        allLayers.push(obj);
      }
    })
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
    var file = NSString.stringWithString(formattedString + ';');
    // Save the file
    file.writeToFile_atomically_encoding_error_( file_path + filename + ".scss"  ,true  ,NSUTF8StringEncoding  ,null);

    var alertMessage = jsonName + " saved to: " + file_path;
    common.alert("SCSS MAP Exported!", alertMessage);
  };

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

   function getNucleonPropVal(layer, nucleonPropName, key) {
      var nucleonPropValues = {};

      if (common.isText(layer)) {
        nucleonPropValues = {
          'color': common.rgbaCode(layer.textColor()),
          'text-transform': layer.styleAttributes().MSAttributedStringTextTransformAttribute == 1 ? 'uppercase' : 'none',
        }
      } else if (key != 'i') {
        nucleonPropValues = {
           'height': layer.frame().height() + 'px',
           'width': layer.frame().width() + 'px',
           'background': common.rgbaCode(layer.style().firstEnabledFill().color()),
           'border-radius': getRadius(layer),
           'box-shadow': getShadows(layer),
        }
      } else {
        nucleonPropValues = {
          'height': layer.frame().height() + 'px',
          'width': layer.frame().width() + 'px',
          'background-image': getBase64(layer),
        }
      }

      return nucleonPropValues[nucleonPropName];
   }

  var  weightsNames = Object.keys(fontWeights);

  function getFirstTag(str){
    return str.match(/[^#\ ^\.]+/g);
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

  function getVariable(tag, attrs){
     for (var i = 0; i < allLayers.length; i++) {
        var layer = allLayers[i],
            fullLayerName = String(layer.name()),
            splitName = common.getAllTags(fullLayerName),
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

              attrs.forEach((attr) => {
                  var attrName = common.getPropName(attr);

                  if (key == 't') {
                      if (attrName == 'extend') {
                        nucleonVars.push(attrName + ': ' + "'" + tagName + "'");
                      } else {
                        nucleonVars.push(attrName + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ', ' +  attrName + ')');
                      }
                      res = nucleonVars;
                  } else if (attrName == 'color' && key == 'c') {
                      res = attrName + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ')';
                  }
              })

              return res;

          } else if (tag == tagName && key == 'i') {
            var res;

            attrs.forEach((attr) => {
              var attrName = attr.match(/^([^:]+):/);

              if (attrName[1] == 'extend') {
                nucleonVars.push(attrName[1] + ': ' + "'" + tagName + "'");
              } else {
                nucleonVars.push(attrName[1] + ': mdg($' + parentGroupName + ', ' + tagName.replace(/\#/g, '') + ', ' +  attrName[1] + ')');
              }
            })

            return nucleonVars;
          }
          else if (tag == tagName) {
              return nucleonVar;
          }
        }
      }
    }
  };

  // function clearSVG(svg){
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

  function dediplicate(a){
    var result = [];
    a.forEach(function(item) {
       if(result.indexOf(item) < 0) {
           result.push(item);
       }
    });

    return result;
  }

  function attrDelete(attrs, args) {
    for(var i = 0; i < attrs.length; i++){
      args.forEach((a) => {
        if (typeof attrs[i] == 'string' && common.getPropName(attrs[i]) == a && common.getPropName(attrs[i]) != 'background') {
          attrs.splice(i, 1);
        }
      })
    }
  }

  function getBase64(layer){
    var ancestry = MSImmutableLayerAncestry.ancestryWithMSLayer_(layer);
    var exportRequest = MSExportRequest.exportRequestsFromLayerAncestry_(ancestry).firstObject();
    exportRequest.format = 'svg';
    var exporter = MSExporter.exporterForRequest_colorSpace_(exportRequest, NSColorSpace.sRGBColorSpace());
    var data = exporter.data();
    var base64Code = data.base64EncodedStringWithOptions(NSDataBase64EncodingEndLineWithLineFeed);
    var base64 = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);

    return "url('data:image/svg+xml;base64," + base64Code + "')";
  }

  function getShadows(layer){
    var shadows = layer.style().enabledShadows();
    var innerShadows = layer.style().enabledInnerShadows();
    var cssShadows = '';
    var cssInnerShadows = '';

    shadows.forEach(function(s){
        cssShadows += s.offsetX() + 'px ' + s.offsetY() + 'px ' + s.blurRadius() + 'px ' + s.spread() + 'px ' + common.rgbaCode(s.color()) + ', ';
    })

    innerShadows.forEach(function(s){
        cssInnerShadows += 'inset ' + s.offsetX() + 'px ' + s.offsetY() + 'px ' + s.blurRadius() + 'px ' + s.spread() + 'px ' + common.rgbaCode(s.color()) + ', ';
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

  function getAttrs(layer){
    var attrs = [];
    var rawAttrs = layer.CSSAttributes();

    rawAttrs.forEach(function(attr) {
        if (!attr.match(/[\/*^\.]/g)) {
          attrs.push(attr.replace(/;/g, ''));
        }
    });

    return attrs;
  };

  function layerAttrsBuilder(layer) {
    var fullLayerName = layer.name(),
        splitName = common.getAllTags(fullLayerName),
        layerName = splitName == null ? fullLayerName : splitName[0],
        tagsNames = fullLayerName.split("#").slice(1),
        nucleonAttrsObj = {},
        attrsObj = {},
        attrs = getAttrs(layer);

    attrDelete(attrs, Object.values(nucleonPropNames));

    if (common.isLayer(layer) && !isIcon(layer)) {
      var boxShadow = getShadows(layer) ? 'box-shadow: ' + getShadows(layer) : 'box-shadow: none';
      var radius = 'border-radius: ' + getRadius(layer);


      attrs.splice(attrs.length, 0,
        'height: ' + layer.frame().height() + 'px',
        'width: ' + layer.frame().width() + 'px',
        boxShadow,
        radius,
      );

    } else if (isIcon(layer)) {
      attrs.splice(attrs.length, 0,
        'extend: ' + 'name',
        'height: ' + layer.frame().height() + 'px',
        'width: ' + layer.frame().width() + 'px',
        'background-image: ' + getBase64(layer),
      );
    }

    else if (common.isText(layer)) {
      var attrFontWeight;
      var textTransform = layer.styleAttributes().MSAttributedStringTextTransformAttribute == 1 ? 'uppercase' : 'none';

      attrs.forEach(function(attr) {
        if (common.getPropName(attr) == 'font-family') {
          attrFontWeight = fontWeight(attr);
        }
      })

      attrs.splice(attrs.length, 0,
        'extend: ' + 'name',
        // 'line-height: ' + layer.lineHeight() + 'px',// in base sketch functional
        'text-transform: ' + textTransform,
        'color: ' +  common.rgbaCode(layer.textColor()),
        attrFontWeight,
      );
    }

    var cleanAttrs = dediplicate(attrs);

    if (splitName[1] && tagsNames) {
        tagsNames.forEach(function(tag){
            var tagName = String(tag);
            var key = tagName.charAt(0);
            var nucleonPropName = nucleonPropNames[key];

            cleanAttrs.forEach(function(attr, index){
                if ((common.isText(layer) && key == 't') || key == 'i') {
                  layerName == 'nucleon' ? nucleonAttrsObj[tagName] = cleanAttrs : cleanAttrs = getVariable(tag, cleanAttrs);
                }
                else if (common.getPropName(attr) == nucleonPropName){
                  layerName == 'nucleon' ? nucleonAttrsObj[tagName] = getNucleonPropVal(layer, nucleonPropName, key) : cleanAttrs[index] = getVariable(tag, cleanAttrs);
                }
            })

            if (layerName != 'nucleon') {
              nucleonAttrsObj[layerName] = cleanAttrs;
            }
        })
    } else {
      nucleonAttrsObj[layerName] = cleanAttrs;
    }

    attrsObj[layerName] = cleanAttrs;

    if (common.isText(layer) || layerName == 'nucleon') {
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
          splitName = common.getAllTags(fullLayerName),
          layerName = splitName == null ? fullLayerName : splitName[0];

      if (common.isSymbolInstance(layer)) {
          layer.symbolMaster().layers().forEach(function(symbolLayer){
              if (common.isSymbolInstance(symbolLayer)) {
                  common.alert("ERROR!", 'Put embedded symbol "' + symbolLayer.name() + '" in a symbol-master group.');
              }
              else {
                  var fullSymbolLayerName = symbolLayer.name();
                  var symbolSplitName = common.getAllTags(fullSymbolLayerName);
                  var symbolLayerName = symbolSplitName == null ? fullSymbolLayerName : symbolSplitName[0];
                  var deepCollection = symbolLayer.layers();

                  result[symbolLayerName] = {};

                  buildData(deepCollection, result[symbolLayerName]);
              }
          })
      }
      else if (common.isGroup(layer) && !isIcon(layer)) {
          var deepCollection = layer.layers();
          result[layerName] = {};

          buildData(deepCollection, result[layerName]);
      }
      else if (common.isText(layer) || common.isLayer(layer) || isIcon(layer)) {
          result = Object.assign(result, layerAttrsBuilder(layer));
      }
  }

	// loop through the selected layers and export the XML
	for(var i = 0; i < selection.count(); i++){
    var selectedLayer = selection[i],
        collectionName = String(selectedLayer.name());

    if (!common.isGroup(selectedLayer)) {
      common.alert("ERROR!", "Please select a group.");
    } else {
      var collection = selectedLayer.layers(),
          result = {};

      buildData(collection, result);
      exportJSON(result, file_path, collectionName);
    }
	}
};
