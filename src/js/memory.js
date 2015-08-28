
module.exports = {
  save(roster) {
    var bytemasks = [0, 0, 0];
    roster.forEach(function(player) {
      if (player.selected) {
        var maskIndex = Math.floor(player.id / 32);
        var bit = player.id % 32;
        var flag = Math.pow(2, bit);
        bytemasks[maskIndex] += flag;
      }
    });
    window.history.replaceState({}, "", "?" + bytemasks.join(":"));

    localStorage.setItem("seahawks-gm-2015", roster.filter(p => p.selected).map(p => p.no));
  },
  restore(roster) {
    var indexed;
    if (window.location.search) {
      var bytemasks = decodeURIComponent(window.location.search).replace(/^\?/, "").split(":").map(Number);
      roster.forEach(function(player) {
        var maskIndex = Math.floor(player.id / 32);
        var mask = bytemasks[maskIndex];
        var bit = player.id % 32;
        var flag = Math.pow(2, bit);
        player.selected = mask & flag;
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