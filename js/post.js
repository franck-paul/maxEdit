/*
# -- BEGIN LICENSE BLOCK ----------------------------------
# This file is part of maxEdit, a plugin for Dotclear 2.
#
# Copyright (c) Franck Paul
# carnet.franck.paul@gmail.com
#
# Licensed under the GPL version 2.0 license.
# A copy of this license is available in LICENSE file or at
# http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
# -- END LICENSE BLOCK ------------------------------------
*/

// Jquery functions

// The style function (cope with important for priority)
// ex: $('#element').style('width','100vw','important')
// from: http://aramk.com/blog/2012/01/17/adding-css-rules-with-important-using-jquery/
jQuery.fn.style = function(styleName, value, priority) {
	// DOM node
	var node = this.get(0);
	// Ensure we have a DOM node
	if (typeof node == 'undefined') {
		return;
	}
	// CSSStyleDeclaration
	var style = this.get(0).style;
	// Getter/Setter
	if (typeof styleName != 'undefined') {
		if (typeof value != 'undefined') {
			// Set style property
			var priority = typeof priority != 'undefined' ? priority : '';
			style.setProperty(styleName, value, priority);
		} else {
			// Get style property
			return style.getPropertyValue(styleName);
		}
	} else {
		// Get CSSStyleDeclaration
		return style;
	}
}

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
		parents : $(elt.editor).parent().parents(),
		source : $(elt.textarea)
	};

	// Get current height of editor toolbar
	maxEdit.toolbarHeight = maxEdit.elt.bottom.outerHeight(true);

	// Get current vertical scroll window position and scroll top
	maxEdit.scrollPosition = $(window).scrollTop();
	$(window).scrollTop(0);

	// Wrapper's parents
	// Save parents attributes
	maxEdit.elt.parents.each(function(i,e) {
		saveStyleAttribute(e);
	});
	// Then set attributes of wrapper parents
	maxEdit.elt.parents
		.css('position','static')
		.css('overflow','visible')
		.css('z-index',9999);
	// With special cases for body and html parents
	$('body','html')
		.css('overflow','hidden')
		.css('width','0')
		.css('height','0');

	// Wrapper
	maxEdit.elt.wrapper.each(function(i,e) {
		saveStyleAttribute(e);
	});
	maxEdit.elt.wrapper
		.css('margin-bottom',0)
		.css('position','absolute')
		.css('z-index',9999)
		.css('left',0)
		.css('top',0)
		.style('width','100vw','important');

	// Top (ie label)
	maxEdit.elt.top.each(function(i,e) {
		saveStyleAttribute(e);
	});
	maxEdit.elt.top
		.css('display','none');

	// Content (ie Editor)
	maxEdit.elt.content.each(function(i,e) {
		saveStyleAttribute(e);
	});
	maxEdit.elt.content
		.css('height','calc(100vh - ' + maxEdit.toolbarHeight + 'px)');

	// Source (ie Textarea)
	maxEdit.elt.source.each(function(i,e) {
		saveStyleAttribute(e);
	});
	maxEdit.elt.source
		.css('height','100%')
		.css('border','none')
		.css('padding','1.25em')
		.css('box-shadow','none')
		.css('resize','none');

	// Bottom (ie Toolbar)
	maxEdit.elt.bottom.each(function(i,e) {
		saveStyleAttribute(e);
	});
	maxEdit.elt.bottom
		.css('border-radius','0');

	// Change toolbar button title and icon
	$(elt.toolbar).children('button.jstb_maxEdit')
		.attr('title',dotclear.msg.maxEditHide)
		.css('background-image','url(index.php?pf=maxEdit/img/max-off.png)');

	maxEdit.mode = true;
};

var outMax = function(elt) {
	// Exit from max mode

	if (!maxEdit.mode) return;

	// Restore all saved initial attributes
	maxEdit.elt.bottom.each(function(i,e) {
		restoreStyleAttribute(e);
	});
	maxEdit.elt.source.each(function(i,e) {
		restoreStyleAttribute(e);
	});
	maxEdit.elt.content.each(function(i,e) {
		restoreStyleAttribute(e);
	});
	maxEdit.elt.top.each(function(i,e) {
		restoreStyleAttribute(e);
	});
	maxEdit.elt.wrapper.each(function(i,e) {
		restoreStyleAttribute(e);
	});
	maxEdit.elt.parents.each(function(i,e) {
		restoreStyleAttribute(e);
	});

	// Restore window vertical scroll position
	$(window).scrollTop(maxEdit.scrollPosition);

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

var saveStyleAttribute = function(elt) {
	// Save style attribute of given HTML element
	var style = $(elt).attr('style');
	if (style !== undefined) {
		$(elt).data('maxedit',style);
	}
}

var restoreStyleAttribute = function(elt) {
	// Restore a previously saved style attribute of a given HTML element
	var style = $(elt).data('maxedit');
	if (style !== undefined) {
		$(elt).attr('style',style);
	} else {
		$(elt).removeAttr('style');
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

	// Cope with toolbar height changing on viewport resize
	$(window).resize(function() {
		if (maxEdit.mode) {
			// In maximized mode
			var tbh = maxEdit.elt.bottom.outerHeight(true);
			if (tbh !== maxEdit.toolbarHeight) {
				// Toolbar height change, update content height accrodingly
				maxEdit.toolbarHeight = tbh;
				maxEdit.elt.content
					.css('height','calc(100vh - ' + tbh + 'px)');
			}
		}
	});
});
