(function (app) {
    app.controller("productAddController", productAddController);

    productAddController.$inject = ["$scope", "apiService", "notificationService", "$state", "commonService", "$stateParams"];

    function productAddController($scope, apiService, notificationService, $state, commonService, $stateParams) {
        $scope.productCategory = {
            CreatedDate: new Date(),
            Status: true,
            Name: "Danh muc 1",
            Alias: "Danh-muc-1"
        };

        $scope.editorOptions = {
            languague: "vi",
            height: "200px"
        }

        $scope.addProduct = addProduct;

        $scope.getSeoTitle = getSeoTitle;

        function getSeoTitle() {
            $scope.productCategory.Alias = commonService.getSeoTitle($scope.productCategory.Name);
        }

        function addProduct() {
            apiService.post("/api/productcategory/create/", $scope.productCategory, function (result) {
                notificationService.displaySuccess(result.data.Name + " đã được thêm mới.");
                $state.go("product_categories");
            }, function (error) {
                console.log(error);
                notificationService.displayError("Thêm mới không thành công.");
            });
        }

        function loadProductCategory() {
            apiService.get("/api/productcategory/getallparents", null, function (result) {
                $scope.parentCategories = result.data;
            }, function (error) {
                console.log(error);
            });
        }

        function loadProductCategoryDetail() {
            if ($stateParams.id) {
                apiService.get("/api/productcategory/getbyid/" + $stateParams.id, null, function (result) {
                    $scope.productCategory = result.data;
                }, function (error) {
                    console.log(error);
                    notificationService.displayError(error);
                });
            }
        }

        loadProductCategory();
        loadProductCategoryDetail();
    }
})(angular.module("tedushop.products"));