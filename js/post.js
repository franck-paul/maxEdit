// utilities functions

var inMax = function(elt) {
	// Switch into max mode

	if (maxEdit.mode) return;

	// Retrieve DOM elements
	maxEdit.elt = {
		wrapper : $(elt.editor).parent(),
		top : $('> label',$(elt.editor).parent()),
		content : $(elt.editor),
		bottom : $(elt.toolbar),
		parents : $(elt.editor).parent().parents()
	};

	// Get current height of editor toolbar
	maxEdit.toolbarHeight = maxEdit.elt.bottom.outerHeight(true);

	// Save parents attributes
	maxEdit.elt.parents.each(function(i,e) {
		saveCssAttributes(e,['position','overflow','z-index','width','height']);
	});

	// Set attributes of wrapper parents
	maxEdit.elt.parents
		.css('position','static')
		.css('overflow','visible')
		.css('z-index',9999);
	// Special case for body and html parents
	$('body','html')
		.css('overflow','hidden')
		.css('width','0')
		.css('height','0');

	// Change toolbar button title and icon
	$(elt.toolbar).children('button.jstb_maxEdit')
		.attr('title',dotclear.msg.maxEditHide)
		.css('background-image','url(index.php?pf=maxEdit/img/max-off.png)');

	maxEdit.mode = true;
};

var outMax = function(elt) {
	// Exit from max mode

	if (!maxEdit.mode) return;

	// Restore initial attributes of wrapper parents
	maxEdit.elt.parents.each(function(i,e) {
		restoreCssAttributes(e,['position','overflow','z-index','width','height']);
	});

	// Restore toolbar button title
	$(elt.toolbar).children('button.jstb_maxEdit')
		.attr('title',dotclear.msg.maxEditShow)
		.css('background-image','url(index.php?pf=maxEdit/img/max-on.png)');

	maxEdit.mode = false;
};

var switchMax = function(elt) {
	if (!maxEdit.mode) {
		inMax(elt);
	} else {
		outMax(elt);
	}
};

var saveCssAttributes = function(elt,attrs) {
	var attributes = {};
	for (var i in attrs) {
		attributes[attrs[i]] = $(elt).css(attrs[i]);
	}
	$(elt).data('maxedit',JSON.stringify(attributes));
}

var restoreCssAttributes = function(elt) {
	var attributes = $(elt).data('maxedit');
	if (attributes && attributes !== '') {
		var attrs = JSON.parse(attributes);
		for (var attr in attrs) {
			$(elt).css(attr,attrs[attr]);
		}
	}
}

// Local storage
var maxEdit = { mode : false };

// Toolbar button
jsToolBar.prototype.elements.maxEditSpace = {type: 'space',
	format: {
		wysiwyg: true,
		wiki: true,
		xhtml: true,
		markdown: true
	}
};

jsToolBar.prototype.elements.maxEdit = {type: 'button', title: 'Max', fn:{} };
jsToolBar.prototype.elements.maxEdit.context = 'post';
jsToolBar.prototype.elements.maxEdit.fn.wiki = function() { switchMax(this); };
jsToolBar.prototype.elements.maxEdit.fn.xhtml = function() { switchMax(this); };
jsToolBar.prototype.elements.maxEdit.fn.wysiwyg = function() { switchMax(this); };
jsToolBar.prototype.elements.maxEdit.fn.markdown = function() { switchMax(this); };

// Ready, set, go \o/
$(document).ready(function() {
	maxEdit.mode = false;
	jsToolBar.prototype.elements.maxEdit.title = dotclear.msg.maxEditShow;
	jsToolBar.prototype.elements.maxEdit.icon = 'index.php?pf=maxEdit/img/max-on.png';
});
