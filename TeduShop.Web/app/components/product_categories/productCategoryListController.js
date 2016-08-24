(function(app) {
    app.controller("productCategorytListController", productCategorytListController);

    productCategorytListController.$inject = ["$scope", "apiService", "notificationService"];

    function productCategorytListController($scope, apiService, notificationService) {
        $scope.productCategories = [];

        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.totalCount = 0;

        $scope.keyword = "";

        $scope.search = search;
        $scope.getProductCagories = getProductCagories;

        function search() {
            $scope.getProductCagories();
        }

        function getProductCagories(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 4
                }
            };
            apiService.get("/api/productcategory/getall", config, function (result) {

                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning("Không tìm thấy bản ghi nào.");
                }

                $scope.productCategories = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;

            }, function() {
                console.log("Load productCategories failed");
            });
        }

        $scope.getProductCagories();
    }

})(angular.module("tedushop.product_categories"));