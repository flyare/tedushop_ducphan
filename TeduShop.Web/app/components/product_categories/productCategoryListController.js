(function(app) {
    app.controller("productCategorytListController", productCategorytListController);

    productCategorytListController.$inject = ["$scope", "apiService"];

    function productCategorytListController($scope, apiService) {
        $scope.productCategories = [];

        $scope.page = 0;
        $scope.pageCount = 0;

        $scope.getProductCagories = getProductCagories;

        function getProductCagories(page) {
            page = page || 0;
            var config = {
                params: {
                    page: page,
                    pageSize: 2
                }
            };
            apiService.get("/api/productcategory/getall", config, function(result) {
                $scope.productCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.Count;
                $scope.totalPage = result.data.TotalCount;

            }, function() {
                console.log("Load productCategories failed");
            });
        }

        $scope.getProductCagories();
    }

})(angular.module("tedushop.product_categories"));