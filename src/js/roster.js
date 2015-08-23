var app = require("./application");
var raw = window.rosterData;
var labels = require("./labels");
var memory = require("./memory");

var saved = memory.get();

var byPosition = {};
raw.forEach(function(row) {
  row.pos = labels[row.pos];
  if (!byPosition[row.pos]) byPosition[row.pos] = [];
  byPosition[row.pos].push(row);
  row.image = row.last + "_" + row.first.replace(/\.$/, "") + ".jpg";
  if (saved.indexOf(row.no) > -1) row.selected = true;
});
for (var key in byPosition) {
  if (byPosition[key].length == 1) {
    byPosition[key][0].selected = true;
  }
}

var roster = function($scope) {

  $scope.players = raw;
  $scope.positions = Object.keys(byPosition).sort().map(k => ({ label: k, players: byPosition[k] }));

  $scope.selectedCount = raw.filter(x => x.selected).length;
  $scope.selectedCost = raw.reduce((n, x) => x.selected ? n + x.cap : n, 0);

  $scope.maximumCount = 53;
  $scope.maximumCost = 148257738;

  $scope.togglePlayer = function(player) {
    player.selected = !player.selected;
    var count = 0;
    var cost = 0;
    raw.forEach(function(p) {
      if (p.selected) {
        count++;
        cost += p.cap;
      }
    });
    $scope.selectedCount = count;
    $scope.selectedCost = cost;
    memory.set(raw.filter(p => p.selected).map(p => p.no));

  };

};
roster.$inject = ["$scope"];
app.controller("roster", roster);