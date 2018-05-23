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
}

// MSTextLayer
function isText(layer) {
	return layer.class() == MSTextLayer;
}

function alert(title, message){
	var app = NSApplication. sharedApplication();
	app.displayDialog_withTitle_(message, title);
}

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

function tagAndNames(layer){
			var fullLayerName = layer.name(),
			splitName = getAllTags(fullLayerName),
			layerName = splitName == null ? fullLayerName : splitName[0];
		 	inTag = getAllTagsWithoutName(fullLayerName) ?  true : false;

			return {fullName: fullLayerName, tags: inTag, name: layerName}
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
