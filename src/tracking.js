'use strict';

var Tracker = module.exports = function(options) {
};

function randomString(len) {
  var id = [];
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < len; i++) {
    id.push(chars.charAt(Math.floor(Math.random() * chars.length)));
  }

  return id.join('');
}

function getCookies(names) {
  var ret = {};

  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cData = cookies[i].split('=', 2);
    var cName = cData[0].replace(/^[ ]+/, '');

    if (names.indexOf(cName) !== -1) {
      ret[cName] = cData[1];
    }
  }

  return ret;
}

function setCookie(name, value, expires) {
  document.cookie = name + '=' + value +
    '; expires=' + expires.toGMTString() + ';';
}

// Retrieve (or set and return) an ID for this user's logged out session.
function getLoggedOutData() {
  // Do not return a logged out ID if the user is logged in, for privacy purpose
  if (window.reddit && window.reddit.logged) {
    return {};
  }

  var cookies = getCookies(['loid', 'loidcreated']);
  if (cookies.loid) {
    return cookies;
  }

  var loggedOutId = randomString(18);
  var created = (new Date()).toISOString();
  var expires = new Date();
  expires.setFullYear(expires.getFullYear() + 2);
  setCookie('loid', loggedOutId, expires);
  setCookie('loidcreated', created, expires);

  return getCookies(['loid', 'loidcreated']);
}

Tracker.prototype.getTrackingData = function() {
  return getLoggedOutData();
};

Tracker.prototype.getTrackingParams = function() {
  var data =  getLoggedOutData();
  if (data && data.loid) {
    return '&loid=' + data.loid + '&loidcreated=' + data.loidcreated;
  }

  return '';
};

// Export to `window`, for browser wo/browserify.
if (typeof window !== 'undefined') {
  var redditlib = (window.redditlib = window.redditlib || {});

  redditlib.Tracker = Tracker;
}
