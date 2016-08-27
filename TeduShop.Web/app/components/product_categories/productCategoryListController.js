(function (app) {
    app.controller("productCategorytListController", productCategorytListController);

    productCategorytListController.$inject = ["$scope", "apiService", "notificationService", "$ngBootbox", "$filter"];

    function productCategorytListController($scope, apiService, notificationService, $ngBootbox, $filter) {
        $scope.productCategories = [];

        $scope.page = 0;
        $scope.pageCount = 0;
        $scope.totalCount = 0;

        $scope.keyword = "";

        $scope.delDisable = true;

        $scope.isAll = false;

        $scope.search = search;

        $scope.getProductCagories = getProductCagories;

        $scope.deleteProductCategory = deleteProductCategory;

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
                        checkedProductCategories: listId.toString()
                    }
                }
                apiService.del('/api/productcategory/deletemulti', config, function (result) {
                    notificationService.displaySuccess('Xóa thành công ' + result.data + ' bản ghi.');
                    search();
                }, function (error) {
                    notificationService.displayError('Xóa không thành công');
                });
            }, function () {
            });
        }

        $scope.$watch("productCategories", function (n, o) {
            var checked = $filter("filter")(n, { checked: true });
            if (checked.length) {
                $scope.selected = checked;
                $scope.delDisable = false;
            } else {
                $scope.delDisable = true;
            }

            angular.forEach($scope.productCategories, function (item) {
                if (item.checked === false) {
                    $scope.isAll = false;
                }
            });
        }, true);

        function checkAll() {
            if ($scope.isAll === false) {
                angular.forEach($scope.productCategories, function (item) {
                    item.checked = true;
                });

                $scope.isAll = true;
            } else {
                angular.forEach($scope.productCategories, function (item) {
                    item.checked = false;
                });

                $scope.isAll = false;
            }
        }

        function deleteProductCategory(id) {
            $ngBootbox.confirm("Bạn chắc chăn muốn xóa?").then(function () {
                var config = {
                    params: {
                        id: id
                    }
                }
                apiService.del("/api/productcategory/delete", config, function (result) {
                    notificationService.displaySuccess("Xóa thành công.");
                    search();
                });
            }, function () {
            });
        }

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
                $scope.isAll = false;
            }, function () {
                console.log("Load productCategories failed");
            });
        }

        $scope.getProductCagories();
    }
})(angular.module("tedushop.product_categories"));