/// <reference path="/Assets/admin/libs/angular/angular.js" />
(function (app) {
    app.factory("apiService", apiService);

    apiService.$inject = ["$http", "notificationService"];

    function apiService($http, notificationService) {
        return {
            get: get,
            post: post,
            put: put
        }

        function put(url, params, success, failure) {
            $http.put(url, params).then(function (result) {
                success(result);
            }, function (error) {
                failure(error);
            });
        }

        function get(url, params, success, failure) {
            $http.get(url, params).then(function (result) {
                success(result);
            }, function (error) {
                if (error.status == "401") {
                    notificationService.displayError("Yêu cầu phải đăng nhập.");
                }
                //notificationService.displayError(error);
                failure(error);
            });
        };

        function post(url, params, success, failure) {
            $http.post(url, params).then(function(result) {
                success(result);
            }, function(error) {
                failure(error);
            });
        }
    }

})(angular.module("tedushop.common"));