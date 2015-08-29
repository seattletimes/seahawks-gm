var Share = require("./share.min.js");

var addQuery = function(url, query) {
  var joiner = url.indexOf("?") > -1 ? "&" : "?";
  return url + joiner + query;
};

var utm = function(source, medium) {
  return `utm_source=${source}&utm_medium=${medium || "social"}&utm_campaign=projects`;
};

var here = window.location.href;

var s = new Share(".share", {
  ui: {
    flyout: "top left"
  },
  networks: {
    google_plus: {
      url: addQuery(here, utm("google+"))
    },
    twitter: {
      url: addQuery(here, utm("twitter"))
    },
    facebook: {
      url: addQuery(here, utm("facebook"))
    },
    pinterest: {
      url: addQuery(here, utm("pinterest"))
    }
  }
});

s.config.networks.email.description += " " + addQuery(here, utm("email_share", "email"));

var setUrls = function() {
  var here = window.location.href;
  s.config.networks.facebook.url = addQuery(here, utm("facebook"));
  s.config.networks.google_plus.url = addQuery(here, utm("google+"));
  s.config.networks.twitter.url = addQuery(here, utm("twitter"));
  s.config.networks.pinterest.url = addQuery(here, utm("pinterest"));
  s.config.networks.email.description += " " + addQuery(here, utm("email_share", "email"));
}

module.exports = {
  button: s,
  refresh: setUrls
};
