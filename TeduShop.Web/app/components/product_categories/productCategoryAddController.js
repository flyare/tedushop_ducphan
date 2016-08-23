(function (app) {
    app.controller("productCategorytAddController", productCategorytAddController);

    productCategorytAddController.$inject = ["$scope", "apiService", "notificationService"];

    function productCategorytAddController($scope, apiService, notificationService) {
        $scope.productCategory = {
            CreatedDate: new Date()
        }
    }

})(angular.module("tedushop.product_categories"));