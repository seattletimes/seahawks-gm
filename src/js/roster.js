var app = require("./application");
var raw = window.rosterData;
var labels = require("./labels");

var byPosition = {};
raw.forEach(function(row) {
  row.pos = labels[row.pos];
  if (!byPosition[row.pos]) byPosition[row.pos] = [];
  byPosition[row.pos].push(row);
  row.image = row.last + "_" + row.first.replace(/\.$/, "") + ".jpg";
});

var roster = function($scope) {

  $scope.players = raw;
  $scope.positions = Object.keys(byPosition).map(k => ({ label: k, players: byPosition[k] }));

  $scope.selectedCount = 0;
  $scope.selectedCost = 0;

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
  };

};
roster.$inject = ["$scope"];
app.controller("roster", roster);