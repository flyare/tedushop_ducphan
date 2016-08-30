(function (app) {
    app.controller("productEditController", productEditController);

    productEditController.$inject = ["$scope", "apiService", "notificationService", "$state", "$stateParams", "commonService"];

    function productEditController($scope, apiService, notificationService, $state, $stateParams, commonService) {
        $scope.product = {
        };

        $scope.getSeoTitle = getSeoTitle;

        $scope.updateProduct = updateProduct;

        $scope.editorOptions = {
            languague: "vi",
            height: "200px"
        }

        function getSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }

        function loadProductCategoryDetail() {
            apiService.get("/api/product/getbyid/" + $stateParams.id, null, function (result) {
                $scope.product = result.data;
            }, function (error) {
                console.log(error);
                notificationService.displayError(error);
            });
        }

        function updateProduct() {
            apiService.put("/api/product/update/", $scope.product, function (result) {
                notificationService.displaySuccess(result.data.Name + " đã được cập nhật.");
                $state.go("products");
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

})(angular.module("tedushop.products"));