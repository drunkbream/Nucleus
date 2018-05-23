@import 'common.js'

var onRun = function(context) {
  var document = context.document;
  var selection = context.selection;
  var unlayers = [];

  function createMasterSymbol(layer){
    var layers = layer.layers();
    var symbolName = layer.name();

   // Create symbol from layers and don't send to symbol page
    var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layers, symbolName, true);
    var symbolMaster = symbolInstance.symbolMaster();

    // Move symbol to same place of layer
    // symbolMaster.setLayerListExpandedType(1);
    symbolMaster.setRect(symbolInstance.absoluteRect().rect());
  }

  selection.forEach(function(selected){
    if (isSymbolInstance(selected)) {
      unlayers.push(selected.detachByReplacingWithGroup());
    }
  });


  var loopSelection = unlayers.length > 0 ? unlayers.objectEnumerator() : selection.objectEnumerator();
  var layer;
  while (layer = loopSelection.nextObject()) {

      var layers = MSLayerArray.arrayWithLayers([layer]);
      if (MSSymbolCreator.canCreateSymbolFromLayers(layers)) {

          var symbolName = layer.name();

         // Create symbol from layers and don't send to symbol page
          var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(layers, symbolName, true);
          var symbolMaster = symbolInstance.symbolMaster();

          // Move symbol to same place of layer
          symbolMaster.setRect(symbolInstance.absoluteRect().rect());
          // Collapse artboard
          symbolMaster.setLayerListExpandedType(1);
          // Remove symbol instance
          // symbolInstance.removeFromParent();
      }
  }
};
