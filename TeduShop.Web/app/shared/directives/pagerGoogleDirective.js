(function(app) {
    "use strict";

    app.directive("pagerGoogleDirective", pagerGoogleDirective);

    function pagerGoogleDirective() {
        return {
            scope: {
                page: "@",
                total: "@",
                searchFunc: "&"
            },
            replace: true,
            restrict: "E",
            templateUrl: "/app/shared/directives/pagerGoogleDirective.html",
            link: function(scope) {
                scope.search = function(i) {
                    if (scope.searchFunc) {
                        scope.searchFunc({ page: i - 1 });
                    }
                };

                scope.range = function() {
                    var result = [];

                    for (var j = 0; j < scope.total; j++) {
                        result.push(j + 1);
                    }

                    return result;
                };
            }
            /*controller: [
                "$scope", function($scope) {
                    $scope.search = function(i) {
                        if ($scope.searchFunc) {
                            $scope.searchFunc({ page: i });
                        }
                    };

                    $scope.range = function() {
                        var result = [];

                        for (var j = 0; j < $scope.total; j++) {
                            result.push(j + 1);
                        }

                        return result;
                    };
                }
            ]*/
        };
    }

})(angular.module("tedushop.common"));