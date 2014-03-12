var app = angular.module('trix-twindoc', [/*'ngSanitize'*/]);

app.controller('blackctrl', function($scope) {
    $scope.data = {
        markdown: "**hello**"
    };

    var intercom = Intercom.getInstance();
    intercom.on('edition', function(data) {
        console.debug("<<<", data);
        $scope.$apply(function() {
            $scope.data.markdown = data.markdown;
        });
    });
});

app.directive('md', function($compile) {
    return {
        restrict: 'E',
        template: "<div class='blackdoc'></div>",
        replace: true,
        scope: {markdown: "="},
        link: function(scope, element, attributes) {
            scope.$watch('markdown', function(newval, oldval) {
                element.html(marked(newval));
                $compile(element)(scope);
            });
        }
    }
});

app.controller('whitectrl', function($scope, $timeout) {
    $scope.data = {
        markdown: "**hello something here**, _please_."
    };
    var intercom = Intercom.getInstance();
    var update = function() {
        intercom.emit("edition", $scope.data);
        console.debug('>>', $scope.data);
    }
    $scope.$watch('data.markdown', update);
});

function debounce(fn, delay, $timeout) {
  console.debug(fn);
  var promise = null;
  return function () {
    var context = this, args = arguments;
    if(promise != null) $timeout.cancel(promise);
    promise = $timeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

app.directive('table', function() {
    return {
        restrict: 'E',
        link: function(scope, element, attrs) {
            element.addClass("table table-bordered");
        }
    }
});