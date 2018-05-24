import * as common from './common.js';

export function detachAction (context) {
  var document = context.document;
  var selection = context.selection;

  function getSymbolInstance(selection){
    selection.forEach(function(selected){
      if (isGroup(selected)) {
        getSymbolInstance(selected.layers());
      } else if (isSymbolInstance(selected)) {
        selected.detachByReplacingWithGroup().setLayerListExpandedType(1);
      }
    });
  }

  getSymbolInstance(selection);
};
