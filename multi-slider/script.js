angular.module('trix-multi-slider', [])
.controller('Ctrl', function($scope) {
    $scope.points = [
        4,
        4,
        4,
    ];
    $scope.Add = function(x) {
        $scope.points.push(x);
    }
})
.directive('multiSlider', function($document) {
    return {
        restrict: 'E',
        templateUrl: "multi-slider.html",
        replace: true,
        scope: {
            step: '@',
            array: '=',
        },
        link: function($scope, element, attributes) {
            function cancel(e) {
                e.preventDefault();
                e.stopPropagation();
            }
            $scope.cumulative = function() {
                var cum = 0;
                var result = [];
                $scope.array.forEach(function(val) {
                    cum += val;
                    result.push(cum);
                });
                return result;
            };
            $scope.sum = function() {
                return $scope.array.reduce(function(s, x) {return s+x}, 0);
            };
            $scope.decrease = function(i) {
                if($scope.array[i] > 1) {
                    $scope.array[i] -= 1;
                    $scope.array[i+1] += 1;
                }
            };
            $scope.increase = function(i) {
                if($scope.array[i+1] > 1) {
                    $scope.array[i] += 1;
                    $scope.array[i+1] -= 1;
                }
            };
            $scope.remove = function(i) {
                var n = $scope.array.length;
                if(n < 2) return;

                // find a neighbor to take the freed up span
                var j;
                if(i == $scope.array.length-1) {
                    j = i-1;
                } else {
                    j = i+1;
                }

                $scope.array[j] += $scope.array[i];
                $scope.array.splice(i, 1);
            };
            $scope.append = function() {
                var n = $scope.array.length;
                if($scope.array[n-1] > 1) {
                    $scope.array[n-1] -= 1;
                    $scope.array.push(1);
                }
            };
        },
    }
});
