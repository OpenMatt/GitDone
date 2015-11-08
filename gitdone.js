'use strict';


class Gitdone {
  constructor() {
    this.modifyUI(document.URL);
  }

  modifyUI(url) {
    if (Gitdone.isIssueListPage(url)) {
      $('.header, .pagehead-actions, .sunken-menu').hide();
      $('.subnav-links > :nth-child(2)').hide();
    }

    if (Gitdone.isIssuesPage(url)) {
      $('.header, .pagehead-actions, .sunken-menu').hide();
      $('.protip').hide();
    }

    if (Gitdone.isRepoPage(url)) {
      $('.header, .pagehead-actions').hide();
      $('.sunken-menu-group li:not([aria-label=Issues])').hide();
      $('.overall-summary, .repository-lang-stats-graph').hide();
      $('.file-navigation, .file-wrap').hide();
      $('.only-with-full-nav').hide();
    }
  }

  addElements() {

  }

  renderToolbarUI() {

  }
}

Gitdone.isIssueListPage = function (url) {
  return url.match(/.*\/issues\/.*/i);
}
Gitdone.isIssuesPage = function (url) {
  return url.match(/.*\/issues/i);
}
Gitdone.isRepoPage = function (url) {
  return url.match(/.*\/github.com\/[^\/]+\/[^\/]+$/i);
}

var gitdone = new Gitdone();
