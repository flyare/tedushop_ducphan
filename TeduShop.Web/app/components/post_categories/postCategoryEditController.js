(function (app) {
    app.controller("productCategorytEditController", productCategorytEditController);

    productCategorytEditController.$inject = ["$scope", "apiService", "notificationService", "$state", "$stateParams", "commonService"];

    function productCategorytEditController($scope, apiService, notificationService, $state, $stateParams, commonService) {
        $scope.productCategory = {
        };

        $scope.getSeoTitle = getSeoTitle;

        $scope.updateProductCategory = updateProductCategory;

        function getSeoTitle() {
            $scope.productCategory.Alias = commonService.getSeoTitle($scope.productCategory.Name);
        }

        function loadProductCategoryDetail() {
            apiService.get("/api/productcategory/getbyid/" + $stateParams.id, null, function (result) {
                $scope.productCategory = result.data;
            }, function (error) {
                console.log(error);
                notificationService.displayError(error);
            });
        }

        function updateProductCategory() {
            apiService.put("/api/productcategory/update/", $scope.productCategory, function (result) {
                notificationService.displaySuccess(result.data.Name + " đã được cập nhật.");
                $state.go("product_categories");
            }, function (error) {
                console.log(error);
                notificationService.displayError("Cập nhật không thành công.");
            });
        }

        function loadParentCategory() {
            apiService.get("/api/productcategory/getallparents", null, function (result) {
                $scope.parentCategories = result.data;
            }, function (error) {
                console.log(error);
            });
        }

        loadParentCategory();
        loadProductCategoryDetail();
    }

})(angular.module("tedushop.product_categories"));