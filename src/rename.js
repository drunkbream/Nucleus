import * as common from './common';

var onRun = function(context) {
  var selection = context.selection;
  var layers = [];

  function labelText(label, text){
    label.setStringValue(text);
    label.setSelectable(false);
    label.setEditable(false);
    label.setBezeled(false);
    label.setDrawsBackground(false);

    return label;
  };

  // var nucleonsPrefixs = ['h', 'w', 'o', 'b', 'c', 't', 's', 'r']
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

  function createDialog(){
    var dialog = COSAlertWindow.new();
    // var tagsStr = getTags(layers).join('\n');
    // var tagLines = tagsStr.length;

    // Creating the view
    var viewWidth = 400;
    var viewHeight = 200;
    // var viewHeight = 200 + (tagLines * 1.2);
    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
      // Creating the inputs
    // var tagsLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, -136, (viewWidth / 2) - 10, viewHeight - 25));
    var fromNameLabel = NSTextField.alloc().initWithFrame(NSMakeRect(-1, viewHeight - 20, (viewWidth / 2) - 10, 20));
    var toNameLabel = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 70, (viewWidth / 2) - 10, 20));
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
    totalRenameSymbol.setState(NSOffState);

    // Labels text
    // labelText(tagsLabel, 'Tags in selection: \n' + tagsStr);
    labelText(fromNameLabel, 'From');
    labelText(toNameLabel, 'To');

    // Adding elements
    // Labels
    // view.addSubview(tagsLabel);
    view.addSubview(fromNameLabel);
    view.addSubview(toNameLabel);

    // Fields
    fromNameField.setNextKeyView_(toNameField);

    view.addSubview(fromNameField);
    view.addSubview(toNameField);
    view.addSubview(newSymbolcheckbox);
    view.addSubview(totalRenameSymbol);


    dialog.addAccessoryView(view);
    dialog.setMessageText("Change any characters in the names in all layers tree recursively")

    // Creating dialog buttons
    dialog.addButtonWithTitle("Ok");
    dialog.addButtonWithTitle("Cancel");

    var responseCode = dialog.runModal();

    if (responseCode == 1000) {
      var fromName = fromNameField.stringValue();
      var toName = toNameField.stringValue();
      var checkboxCreateSymbols = newSymbolcheckbox.state();
      var checkboxTotalRenameSymbols = totalRenameSymbol.state();

      layers.forEach(function(layer){
        var layerName = layer.name();

        if (isSymbolInstance(layer) && checkboxCreateSymbols == 1) {
             // Create symbol from layers and don't send to symbol page
             var detachedSymbolLayer = layer.detachByReplacingWithGroup();
             var symbolLayers = MSLayerArray.arrayWithLayers([detachedSymbolLayer]);

             if (MSSymbolCreator.canCreateSymbolFromLayers(symbolLayers)) {
               var symbolInstance = MSSymbolCreator.createSymbolFromLayers_withName_onSymbolsPage(symbolLayers, layerName.replace(fromName, toName), false);
               var symbolMaster = symbolInstance.symbolMaster();

               // Move symbol to same place of layer
               symbolMaster.setRect(symbolInstance.absoluteRect().rect());
               // Collapse artboard
               symbolMaster.setLayerListExpandedType(1);
               // Remove symbol instance
               // symbolInstance.removeFromParent();
             }
        } else if (isSymbolInstance(layer) && checkboxTotalRenameSymbols == 1) {
          var instanceBrothers = layer.symbolMaster().allInstances();

          instanceBrothers.forEach((inst) => {
            inst.name = layerName.replace(fromName, toName);
          })
          layer.symbolMaster().name = layerName.replace(fromName, toName);
          layer.name = layerName.replace(fromName, toName);
        } else if (!isSymbolMaster(layer)) {
          layer.name = layerName.replace(fromName, toName);
        }
      })
      // createDialog(context);
    } else {
      return false;
    }
  }

  function getLayers(l){
    l.forEach(function(layer){
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
};
