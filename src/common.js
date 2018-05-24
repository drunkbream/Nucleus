export function isPage(layer) {
	return layer.class() == MSPage;
}

export function isArtboard(layer) {
	return layer.class() == MSArtboardGroup;
}

export function isSymbolMaster(layer) {
	return layer.class() == MSSymbolMaster;
}

export function isSymbolInstance(layer) {
	return layer.class() == MSSymbolInstance;
}

export function isSymbol(layer) {
	return layer.class() == MSSymbolInstance || layer.class() == MSSymbolMaster;
}

export function isGroup(layer) {
	return layer.class() == MSLayerGroup;
}

export function isLayer(layer) {
	return !isGroup(layer) && !isText(layer);
}

// MSTextLayer
export function isText(layer) {
	return layer.class() == MSTextLayer;
}

export function alert(title, message){
	var app = NSApplication. sharedApplication();
	app.displayDialog_withTitle_(message, title);
}

export function getFirstTag(str){
	return str.match(/[^#\ ^\.]+/g);
}

export function getAllTags(str){
	return str.match(/[^#\ ^\.]+/g);
}

export function getAllTagsWithoutName(str){
	 return str.match(/#([^#\ ^\.]+)/);
}

export function getPropName(str){
	var split = str.match(/(.+)\:\s*(.+)/);
	return split[1];
}

export function getPropVal(str){
	var split = str.match(/(.+)\:\s*(.+)/);
	return split[2];
}

export function tagAndNames(layer){
			var fullLayerName = layer.name(),
			splitName = getAllTags(fullLayerName),
			layerName = splitName == null ? fullLayerName : splitName[0],
		 	inTag = getAllTagsWithoutName(fullLayerName) ?  true : false;

			return {fullName: fullLayerName, tags: inTag, name: layerName}
	}


export function rgbaCode(color) {
  var red = Math.round(color.red() * 255);
  var green = Math.round(color.green() * 255);
  var blue = Math.round(color.blue() * 255);

  return 'rgba(' + red + ',' + green + ',' + blue + ',' + color.alpha() + ')';
}

export function getShadow(style) {
	var shadows = style.enabledShadows();
	var len = shadows.length;

	if (len == 0) {
		return null;
	} else {
		return shadows[len - 1];
	}
}

export function getInnerShadow(style) {
	var shadows = style.enabledInnerShadows();
	var len = shadows.length;

	if (len == 0) {
		return null;
	} else {
		return shadows[len - 1];
	}
}
