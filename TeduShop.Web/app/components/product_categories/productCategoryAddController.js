(function(app) {
    app.controller("productCategorytAddController", productCategorytAddController);

    productCategorytAddController.$inject = ["$scope", "apiService", "notificationService", "$state"];

    function productCategorytAddController($scope, apiService, notificationService, $state) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true,
            Name: "Danh muc 1",
            Alias: "Danh-muc-1"
        };

        $scope.parentCategories = [];

        $scope.addProductCategory = addProductCategory;

        function addProductCategory() {
            apiService.post("/api/productcategory/create", $scope.productCategory, function(result) {
                notificationService.displaySuccess(result.data.Name + " đã được thêm mới.");
                $state.go("product_categories");
            }, function (error) {
                console.log(error);
                notificationService.displayError("Thêm mới không thành công.");
            });
        }

        function loadParentCategory() {
            apiService.get("/api/productcategory/getallparents", null, function(result) {
                $scope.parentCategories = result.data;
            }, function(error) {
                console.log(error);
            });
        }

        loadParentCategory();
    }

})(angular.module("tedushop.product_categories"));