var app = angular.module('trix-lego', ['ngDragDrop']);

app
.directive("bordered", function() {
    return function(scope, element, attributes) {
        element.css('border', 'thin solid black');
    }
})
.controller('legoCtrl', function($scope) {
    $scope.doc = new LegoDoc();

    $scope.doc
    .NewRow()
        .NewColumn()
        .NewColumn()
        .NewColumn()
        .PackRow()
    .NewRow()
        .NewColumn()
        .NewColumn()
        .PackRow()
    ;
 });

function LegoDoc() {
    this.rows = [];
    this.row  = null;
}

LegoDoc.prototype.NewRow = function(options) {
    this.row = {
        columns: []
    };
    this.rows.push(this.row);
    return this;
}
LegoDoc.prototype.NewColumn = function(options) {
    var col = {
        content: HolderIpsum.paragraph(),
        definedSpan: 0,
    }
    this.row.columns.push(col);

    return this;
}
LegoDoc.prototype.PackRow = function() {
    var definedSpan = 0;
    var definedCount = 0;
    var totalSpan   = 12;

    // compute the total defined span and how many
    this.row.columns.forEach(function(col) {
        if(col.definedSpan) {
            definedSpan += col.definedSpan;
            definedCount += 1;
        }
    });

    // spread the undefined span evenly over all default columns
    var defaultSpan = Math.floor((totalSpan - definedSpan) / (this.row.columns.length - definedCount));

    this.row.columns.forEach(function(col) {
        col.span = (col.definedSpan) ? col.definedSpan : defaultSpan;
    });

    return this;
}