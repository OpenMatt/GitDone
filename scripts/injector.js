'use strict';

/**
 * A content_script that injects our bootstrap.js into pages
 */

var s = document.createElement('script');
s.src = chrome.extension.getURL('scripts/bootstrap.js');
s.onload = function() {
    this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);
