import * as common from './common';

export function syncAction(context) {
    var doc = context.document,
        selection = context.selection,
        nucleonsLayers = [],
        syncLayers = [],
        selectedLayer = selection.firstObject(),
        sharedStyles = context.document.documentData().layerStyles().sharedStyles();

        function separator(layer) {
            var names = tagAndNames(layer);
            if (names.name == 'nucleon') {
                nucleonsLayers.push(layer);
            } else if (names.tags) {
                syncLayers.push(layer);
            }
        }

        function getInnerLayers(objects) {
            var result = [];
            objects.forEach(function(obj) {
                if (isSymbolMaster(obj) || isGroup(obj)) {
                    getInnerLayers(obj.layers())
                } else {
                    separator(obj);
                }
            })
        }

        function getSyncLayers(pages) {
            for (var i = 0; i < pages.length; i++) {
                var page = pages.objectAtIndex(i);

                if (page.name() == 'Symbols') {
                    getInnerLayers(page.layers());
                } else {
                    page.artboards().forEach(function(artboard) {
                        if (artboard.name() == 'Nucleons') {
                            getInnerLayers(artboard.layers());
                        }
                    })
                }
            }
        }

        getSyncLayers(doc.pages());

    function getShadownucleonsValues(nucleon){
        var nucleonShadow = nucleon.style().enabledShadows(),
            nucleonInnerShadow = nucleon.style().enabledInnerShadows(),
            shadowValues = {};

        if (nucleonShadow.length != 0) {
          nucleonShadow.forEach(function(s){
              shadowValues.shadow = {};
              shadowValues.shadow.color = s.color();
              shadowValues.shadow.offsetX = s.offsetX();
              shadowValues.shadow.offsetY = s.offsetY();
              shadowValues.shadow.blurRadius = s.blurRadius();
              shadowValues.shadow.spread = s.spread();
          })
        }

        if (nucleonInnerShadow.length != 0) {
          nucleonInnerShadow.forEach(function(s){
              shadowValues.innerShadow = {};
              shadowValues.innerShadow.color = s.color();
              shadowValues.innerShadow.offsetX = s.offsetX();
              shadowValues.innerShadow.offsetY = s.offsetY();
              shadowValues.innerShadow.blurRadius = s.blurRadius();
              shadowValues.innerShadow.spread = s.spread();
          })
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
        }
    }

    function getRadiusnucleonsValues(nucleon){
        var points = [];
        var radius = {};

        nucleon.children().forEach(function(e){
            if(e.class() == 'MSRectangleShape') {
                points = e.points();
            }
        });

        radius.topLeft = Math.round(points.objectAtIndex(0).cornerRadius());
        radius.topRight = Math.round(points.objectAtIndex(1).cornerRadius());
        radius.bottomRight = Math.round(points.objectAtIndex(2).cornerRadius());
        radius.bottomLeft = Math.round(points.objectAtIndex(3).cornerRadius());

        return radius;
    }

    function setRadius(layer, obj){
      layer.children().forEach(function(e){
        if(e.class() == 'MSRectangleShape') {
          e.points().objectAtIndex(0).setCornerRadius(obj.topLeft);
          e.points().objectAtIndex(1).setCornerRadius(obj.topRight);
          e.points().objectAtIndex(2).setCornerRadius(obj.bottomRight);
          e.points().objectAtIndex(3).setCornerRadius(obj.bottomLeft);
        }
      });
    }

    function nucleonProps(nucleon) {
        var tagName = getAllTags(nucleon.name());
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

    function tagsValues(nucleons){
        var values = {};

        nucleons.forEach((nucleon) => {
            var nucleonName = getAllTags(nucleon.name());
            var tagName = nucleonName[1];
            values[tagName] = nucleonProps(nucleon);
        })

        return values;
    }

    var nucleonValues = tagsValues(nucleonsLayers);

    function setTextProps(layer, obj) {
        if (obj.textTransform == 1) {
          layer.addAttribute_value("MSAttributedStringTextTransformAttribute", obj.textTransform);
        } else {
          layer.addAttribute_value("MSAttributedStringTextTransformAttribute", 0);
        }
        layer.setCharacterSpacing(obj.textKern());
        layer.setFontPostscriptName(obj.fontName);
        layer.setFontSize(obj.fontSize);
        layer.setLineHeight(obj.lineHeight);
    };

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

    function sync(layers){
        layers.forEach(function(layer){
            var tagsNames = layer.name().split("#").slice(1);

            tagsNames.forEach(function(tagName){
                var key = tagName.charAt(0);
                setSyncProps(layer, tagName, key);
            })
        })
    }

    function setSyncProps(layer, tagName, key){
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
};
