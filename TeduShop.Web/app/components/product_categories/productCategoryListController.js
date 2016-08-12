(function (app) {
    app.controller("productCategorytListController", productCategorytListController);

    productCategorytListController.$inject = ['$scope', 'apiService']

    function productCategorytListController($scope, apiService) {
        $scope.productCategories = [];

        $scope.getProductCategories = getProductCategories;

        function getProductCategories() {
            apiService.get('/api/productcategory/getall', null, function(result) {
                $scope.productCategories = result.data;
            }, function() {
                console.log('Load productCategories failed');
            });
        }

        $scope.getProductCategories();
    }

})(angular.module("tedushop.product_categories"));