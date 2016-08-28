(function (app) {
    app.controller("productListController", productListController);

    productListController.$inject = ["$scope", "apiService", "notificationService", "$ngBootbox", "$filter"];

    function productListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.products = [];

        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.totalCount = 0;

        $scope.keyword = "";

        $scope.delDisable = true;

        $scope.isAll = false;

        $scope.search = search;

        $scope.getProducts = getProducts;

        $scope.deleteProduct = deleteProduct;

        $scope.deleteMultiple = deleteMultiple;

        $scope.checkAll = checkAll;

        function deleteMultiple() {
            $ngBootbox.confirm("Bạn chắc chăn muốn xóa?").then(function () {
                var listId = [];
                $.each($scope.selected, function (i, item) {
                    listId.push(item.ID);
                });
                console.log(listId.toString());
                var config = {
                    params: {
                        checkedProducts: listId.toString()
                    }
                }
                apiService.del('/api/product/deletemulti', config, function (result) {
                    notificationService.displaySuccess('Xóa thành công ' + result.data + ' bản ghi.');
                    search();
                }, function (error) {
                    notificationService.displayError('Xóa không thành công');
                });
            }, function () {
            });
        }

        $scope.$watch("products", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $scope.delDisable = false;
            } else {
                $scope.delDisable = true;
            }

            angular.forEach($scope.products, function (item) {
                if (item.checked === false) {
                    $scope.isAll = false;
                }
            });
        }, true);

        function checkAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.products, function (item) {
                    item.checked = true;
                });

                $scope.isAll = true;
            } else {
                angular.forEach($scope.products, function (item) {
                    item.checked = false;
                });

                $scope.isAll = false;
            }
        }

        function deleteProduct(id) {
            $ngBootbox.confirm("Bạn chắc chăn muốn xóa?").then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del("/api/product/delete", config, function (result) {
                    notificationService.displaySuccess("Xóa thành công.");
                    search();
                });
            }, function () {
            });
        }

        function search() {
            $scope.getProducts();
        }

        function getProducts(page) {
            page = page || 0;
            var config = {
                params: {
                    keyword: $scope.keyword,
                    page: page,
                    pageSize: 4
                }
            };

            apiService.get("/api/product/getall", config, function (result) {
                if (result.data.TotalCount == 0) {
                    notificationService.displayWarning("Không tìm thấy bản ghi nào.");
                }

                $scope.products = result.data.Items;
                $scope.page = result.data.Page;
                $scope.pagesCount = result.data.TotalPages;
                $scope.totalCount = result.data.TotalCount;
                $scope.isAll = false;

                console.log(result.data.Items);
            }, function () {
                console.log("Load products failed");
            });
        }

        $scope.getProducts();
    }
})(angular.module("tedushop.products"));