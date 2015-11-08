'use strict';

/**
 * Bootsrap GitDone: load toolbar and attach pjax events
 */

var Gitdone = Gitdone || {settings: {}, pages: {}};

Gitdone.initializeToolbar = function (context) {
  console.log("initialize toolbar");
  // var toolbar = $('<div class="container"></div>');
  // toolbar.append('<span class="mega-octicon octicon-checklist"></span>');
  // $('.header', context).before(toolbar);
}

Gitdone.pages.repoHome = {
  route: /.*\/github.com\/[^\/]+\/[^\/]+$/i,
  on: function (context) {
    $('.header, .pagehead-actions', context).hide();
    $('.sunken-menu-group li:not([aria-label=Issues])', context).hide();
    $('.sunken-menu-group li[aria-label=Issues] a .full-word', context).html("Tasks");
    $('.overall-summary, .repository-lang-stats-graph', context).hide();
    $('.file-navigation, .commit-tease, .file-wrap', context).hide();
    $('.only-with-full-nav', context).hide();

    // fetch milestone summary to show on repo page
    $.ajax(document.URL + '/milestones', {
      success: function (data) {
        $('.repository-meta', context).after($('.issues-listing > .table-list', data)
          .css('width', 'auto'));
      }
    });
    // fetch labels to show in sidebar
    $.ajax(document.URL + '/labels', {
      success: function (data) {
        $('.sunken-menu', context).after($('.labels-list > .table-list', data)
          .css('width', 'auto'));
        $('.labels-list-actions', context).hide();
      }
    });
  },
  off: function (context) {
    $('.sunken-menu, .sunken-menu-group li', context).show();
    $('.repository-sidebar .table-list', context).remove();
  }
}

Gitdone.pages.issueList = {
  route: /.*\/issues/i,
  on: function (context) {
    $('.header, .pagehead-actions, .sunken-menu', context).hide();
    $('.subnav-item:nth-child(2)', context).hide();
    $('.protip', context).hide();
  },
  off: function (context) {
    $('.sunken-menu, .sunken-menu-group li', context).show();
  }
}

Gitdone.pages.singleIssue = {
  route: /.*\/issues\/.*/i,
  on: function (context) {
    $('.header, .pagehead-actions, .sunken-menu').hide();
  },
  off: function (context) {
    $('.sunken-menu, .sunken-menu-group li').show();
  }
}


Gitdone.undoClean = function (url, context) {
  $.each(Gitdone.pages, function (key, page) {
    if (url.match(page.route)) {
      page.off(context);
    }
  });
}

Gitdone.cleanInterface = function (url, context) {
  $.each(Gitdone.pages, function (key, page) {
    if (url.match(page.route)) {
      page.on(context);
    }
  });
}

$(document).ready(function () {
  Gitdone.initializeToolbar(document);

  $(document).on('pjax:start', function(content, options) {
    Gitdone.undoClean(content.result, document);
  });
  $(document).on('pjax:end', function(content, options) {
    Gitdone.cleanInterface(document.URL, document);
  });

  Gitdone.cleanInterface(document.URL, document);
});



