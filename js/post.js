// utilities functions

var inMax = function(elt) {
	// Switch into max mode

	if (dotclear.maxMode == '1') return;

	// Change toolbar button title and icon
	jsToolBar.prototype.elements.maxEdit.title = dotclear.msg.maxEditHide;
	jsToolBar.prototype.elements.maxEdit.icon = 'index.php?pf=maxEdit/img/max-off.png';
	//	Don't know how to refresh this button !?! So, jQuery will help me
	$('button.jstb_maxEdit')
		.attr('title',dotclear.msg.maxEditHide)
		.css('background-image','url(index.php?pf=maxEdit/img/max-off.png)');

	dotclear.maxMode = '1';

	if (dotclear.maxMode_FullScreen == '1') {
		if (fullScreenApi.supportsFullScreen) {
			fullScreenApi.requestFullScreen(document.documentElement);
		}
	}
};

var outMax = function(elt) {
	// Exit from max mode

	if (dotclear.maxMode == '0') return;

	// Restore toolbar button title
	jsToolBar.prototype.elements.maxEdit.title = dotclear.msg.maxEditShow;
	jsToolBar.prototype.elements.maxEdit.icon = 'index.php?pf=maxEdit/img/max-on.png';
	//	Don't know how to refresh this button !?! So, jQuery will help me
	$('button.jstb_maxEdit')
		.attr('title',dotclear.msg.maxEditShow)
		.css('background-image','url(index.php?pf=maxEdit/img/max-on.png)');

	dotclear.maxMode = '0';
};

var switchMax = function(elt) {
	if (dotclear.maxMode == '0') {
		inMax(elt);
	} else {
		outMax(elt);
	}
};

// Toolbar button for series

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
jsToolBar.prototype.elements.maxEdit.icon = 'index.php?pf=maxEdit/img/max-on.png';
jsToolBar.prototype.elements.maxEdit.fn.wiki = function() {
	switchMax(this);
};
jsToolBar.prototype.elements.maxEdit.fn.xhtml = function() {
	switchMax(this);
};
jsToolBar.prototype.elements.maxEdit.fn.wysiwyg = function() {
	switchMax(this);
};
jsToolBar.prototype.elements.maxEdit.fn.markdown = function() {
	switchMax(this);
};

$(document).ready(function() {
	dotclear.maxMode = '0';
	jsToolBar.prototype.elements.maxEdit.title = dotclear.msg.maxEditShow;
	jsToolBar.prototype.elements.maxEdit.icon = 'index.php?pf=maxEdit/img/max-on.png';
});
