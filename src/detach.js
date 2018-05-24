import * as common from './common';

export function detachAction (context) {
  var document = context.document;
  var selection = context.selection;

  function getSymbolInstance(selection){
    selection.forEach(function(selected){
      if (common.isGroup(selected)) {
        getSymbolInstance(selected.layers());
      } else if (common.isSymbolInstance(selected)) {
        selected.detachByReplacingWithGroup().setLayerListExpandedType(1);
      }
    });
  }

  getSymbolInstance(selection);
};
