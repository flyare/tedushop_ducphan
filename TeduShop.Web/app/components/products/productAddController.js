(function (app) {
    app.controller("productAddController", productAddController);

    productAddController.$inject = ["$scope", "apiService", "notificationService", "$state", "commonService", "$stateParams"];

    function productAddController($scope, apiService, notificationService, $state, commonService, $stateParams) {
        $scope.product = {
            CreatedDate: new Date(),
            Status: true,
            Name: "",
            Alias: ""
        };

        $scope.editorOptions = {
            languague: "vi",
            height: "200px"
        }

        $scope.addProduct = addProduct;

        $scope.getSeoTitle = getSeoTitle;

        function getSeoTitle() {
            $scope.product.Alias = commonService.getSeoTitle($scope.product.Name);
        }

        function addProduct() {
            apiService.post("/api/product/create", $scope.product, function (result) {
                notificationService.displaySuccess(result.data.Name + " đã được thêm mới.");
                $state.go("products");
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

        function loadProductDetail() {
            if ($stateParams.id) {
                apiService.get("/api/product/getbyid/" + $stateParams.id, null, function (result) {
                    $scope.product = result.data;
                }, function (error) {
                    console.log(error);
                    notificationService.displayError(error);
                });
            }
        }

        $scope.chooseImage = function() {
            var finder = new CKFinder();
            finder.selectActionFunction = function(fileUrl) {
                $scope.product.Image = fileUrl;
            }

            finder.popup();
        }

        loadProductCategory();
        loadProductDetail();
    }
})(angular.module("tedushop.products"));