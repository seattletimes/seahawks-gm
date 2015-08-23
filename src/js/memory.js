
module.exports = {
  save(roster) {
    var upper = 0;
    var lower = 0;
    roster.forEach(function(player, index) {
      if (player.selected) {
        if (index < 53) {
          lower += Math.pow(2, index);
        } else {
          upper += Math.pow(2, index - 53);
        }
      }
    });
    window.history.replaceState({}, "", `?${upper}:${lower}`);

    localStorage.setItem("seahawks-gm-2015", roster.filter(p => p.selected).map(p => p.no));
  },
  restore(roster) {
    var indexed;
    if (window.location.search) {
      var [upper, lower] = window.location.search.replace(/^\?/, "").split(":");
      roster.forEach(function(player, index) {
        var compare, mask;
        if (index < 53) {
          compare = lower;
          mask = Math.pow(2, index - 1);
        } else {
          compare = upper;
          mask = Math.pow(2, index - 53);
        }
        player.selected = compare & mask;
      });
    } else {
      //restore from the localStorage list
      var local = localStorage.getItem("seahawks-gm-2015");
      if (!local) return;
      local = local.split(",").map(Number);
      roster.forEach(function(player) {
        player.selected = local.indexOf(player.no) > -1;
      });
    }
  }
}