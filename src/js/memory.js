var saveToURL = function(data) {

  var json = JSON.stringify(data);
  var b64 = btoa(json);
  window.history.replaceState({}, "", "?" + b64);
};

module.exports = {
  set(data) {
    saveToURL(data);
    localStorage.setItem("seahawks-gm-2015", JSON.stringify(data));
  },
  get() {
    if (window.location.search) {
      var search = window.location.search.replace(/^\?/, "");
      search = JSON.parse(atob(search));
      return search || [];
    } else {
      var local = localStorage.getItem("seahawks-gm-2015");
      return local ? JSON.parse(local) : [];
    }
  }
}