/*global $, jQuery, jsToolBar, dotclear */
'use strict';

// Jquery functions

// The style function (cope with important for priority)
// ex: $('#element').style('width','100vw','important')
// from: http://aramk.com/blog/2012/01/17/adding-css-rules-with-important-using-jquery/
jQuery.fn.style = function (styleName, value, priority = '') {
  // DOM node
  const node = this.get(0);
  // Ensure we have a DOM node
  if (typeof node == 'undefined') {
    return;
  }
  // CSSStyleDeclaration
  const { style } = this.get(0);
  // Getter/Setter
  if (typeof styleName === 'undefined') {
    // Get CSSStyleDeclaration
    return style;
  }
  if (typeof value === 'undefined') {
    // Get style property
    return style.getPropertyValue(styleName);
  }
  // Set style property
  style.setProperty(styleName, value, priority);
};

// Ready, set, go \o/
$(() => {
  // Local storage
  const maxEdit = {
    mode: false,
    vars: dotclear.getData('maxedit'),
  };

  const inMax = (elt) => {
    // Switch into max mode

    if (maxEdit.mode) return;

    // Retrieve DOM elements
    maxEdit.elt = {
      wrapper: $(elt.editor).parent(),
      top: $('> label', $(elt.editor).parent()),
      content: $(elt.editor),
      bottom: $(elt.toolbar),
      parents: $(elt.editor).parent().parents(),
      source: $(elt.textarea),
      iframe: $(elt.iframe),
      switcher: $(elt.switcher),
    };

    // Get current vertical scroll window position and scroll top
    maxEdit.scrollPosition = $(window).scrollTop();
    $(window).scrollTop(0);

    // Wrapper's parents
    // Save parents attributes
    maxEdit.elt.parents.each((i, e) => {
      saveStyleAttribute(e);
    });
    // Then set attributes of wrapper parents
    maxEdit.elt.parents.css('position', 'static').css('overflow', 'visible').css('z-index', 9999);
    // With special cases for body and html parents
    $('body', 'html').css('overflow', 'hidden').css('width', '0').css('height', '0');

    // Wrapper
    maxEdit.elt.wrapper.each((i, e) => {
      saveStyleAttribute(e);
    });
    maxEdit.elt.wrapper
      .css('margin-bottom', 0)
      .css('position', 'absolute')
      .css('z-index', 9999)
      .css('left', 0)
      .css('top', 0)
      .style('width', '100vw', 'important');

    // Top (ie label)
    maxEdit.elt.top.each((i, e) => {
      saveStyleAttribute(e);
    });
    maxEdit.elt.top.css('display', 'none');

    // switcher (if exists)
    if (maxEdit.elt.switcher !== undefined) {
      maxEdit.elt.switcher.each((i, e) => {
        saveStyleAttribute(e);
      });
      maxEdit.elt.switcher.css('display', 'none');
    }

    // Get current height of editor toolbar
    maxEdit.toolbarHeight = maxEdit.elt.bottom.outerHeight(true);

    // Content (ie Editor)
    maxEdit.elt.content.each((i, e) => {
      saveStyleAttribute(e);
    });
    maxEdit.elt.content.css('height', `calc(100vh - ${maxEdit.toolbarHeight}px)`);

    // iframe (if exists)
    if (maxEdit.elt.iframe !== undefined) {
      maxEdit.elt.iframe.each((i, e) => {
        saveStyleAttribute(e);
      });
      maxEdit.elt.iframe.css('height', `calc(100vh - ${maxEdit.toolbarHeight}px)`);
    }
    // Source (ie Textarea)
    maxEdit.elt.source.each((i, e) => {
      saveStyleAttribute(e);
    });
    maxEdit.elt.source
      .css('height', '100%')
      .css('border', 'none')
      .css('padding', '2.5em')
      .css('box-shadow', 'none')
      .css('resize', 'none')
      .css('max-width', '80em')
      .css('margin', '0 auto')
      .css('font-size', 'larger');

    // Bottom (ie Toolbar)
    maxEdit.elt.bottom.each((i, e) => {
      saveStyleAttribute(e);
    });
    maxEdit.elt.bottom.css('border-radius', '0').css('background', 'currentColor');

    // Change toolbar button title and icon
    $(elt.toolbar)
      .children('button.jstb_maxEdit')
      .attr('title', maxEdit.vars.hide)
      .css('background-image', 'url(' + maxEdit.vars.icon_off + ')');

    maxEdit.mode = true;
  };

  const outMax = (elt) => {
    // Exit from max mode

    if (!maxEdit.mode) return;

    // Restore all saved initial attributes
    maxEdit.elt.bottom.each((i, e) => {
      restoreStyleAttribute(e);
    });
    maxEdit.elt.source.each((i, e) => {
      restoreStyleAttribute(e);
    });
    maxEdit.elt.content.each((i, e) => {
      restoreStyleAttribute(e);
    });
    if (maxEdit.elt.iframe !== undefined) {
      maxEdit.elt.iframe.each((i, e) => {
        restoreStyleAttribute(e);
      });
    }
    if (maxEdit.elt.switcher !== undefined) {
      maxEdit.elt.switcher.each((i, e) => {
        restoreStyleAttribute(e);
      });
    }
    maxEdit.elt.top.each((i, e) => {
      restoreStyleAttribute(e);
    });
    maxEdit.elt.wrapper.each((i, e) => {
      restoreStyleAttribute(e);
    });
    maxEdit.elt.parents.each((i, e) => {
      restoreStyleAttribute(e);
    });

    // Restore window vertical scroll position
    $(window).scrollTop(maxEdit.scrollPosition);

    // Restore toolbar button title
    $(elt.toolbar)
      .children('button.jstb_maxEdit')
      .attr('title', maxEdit.vars.show)
      .css('background-image', 'url(' + maxEdit.vars.icon_on + ')');

    maxEdit.mode = false;
  };

  const switchMax = (elt) => {
    if (maxEdit.mode) {
      outMax(elt);
    } else {
      inMax(elt);
    }
  };

  const saveStyleAttribute = (elt) => {
    // Save style attribute of given HTML element
    const style = $(elt).attr('style');
    if (style !== undefined) {
      $(elt).data('maxedit', style);
    }
  };

  const restoreStyleAttribute = (elt) => {
    // Restore a previously saved style attribute of a given HTML element
    const style = $(elt).data('maxedit');
    if (style === undefined) {
      $(elt).removeAttr('style');
    } else {
      $(elt).attr('style', style);
    }
  };

  // Toolbar button
  jsToolBar.prototype.elements.maxEditSpace = {
    type: 'space',
    format: {
      wysiwyg: true,
      wiki: true,
      xhtml: true,
      markdown: true,
    },
  };

  jsToolBar.prototype.elements.maxEdit = {
    type: 'button',
    title: 'Max',
    shortkey: 'KeyF',
    shortkey_name: 'F',
    fn: {},
  };
  jsToolBar.prototype.elements.maxEdit.title = maxEdit.vars.show;
  jsToolBar.prototype.elements.maxEdit.icon = maxEdit.vars.icon_on;

  jsToolBar.prototype.elements.maxEdit.fn.wiki = function () {
    switchMax(this);
  };
  jsToolBar.prototype.elements.maxEdit.fn.xhtml = function () {
    switchMax(this);
  };
  jsToolBar.prototype.elements.maxEdit.fn.wysiwyg = function () {
    switchMax(this);
  };
  jsToolBar.prototype.elements.maxEdit.fn.markdown = function () {
    switchMax(this);
  };

  maxEdit.mode = false;

  // Set current toolbar context
  jsToolBar.prototype.elements.maxEdit.context = maxEdit.vars.context;

  // Cope with toolbar height changing on viewport resize
  $(window).on('resize', () => {
    if (maxEdit.mode) {
      // In maximized mode
      const tbh = maxEdit.elt.bottom.outerHeight(true);
      if (tbh !== maxEdit.toolbarHeight) {
        // Toolbar height change, update content height accrodingly
        maxEdit.toolbarHeight = tbh;
        maxEdit.elt.content.css('height', `calc(100vh - ${tbh}px)`);
        if (maxEdit.elt.iframe !== undefined) {
          // Toolbar height change, update iframe height accordingly too
          maxEdit.elt.iframe.css('height', `calc(100vh - ${tbh}px)`);
        }
      }
    }
  });
});
