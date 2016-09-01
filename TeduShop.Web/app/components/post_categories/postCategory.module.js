(function() {
    angular.module("tedushop.post_categories", ["tedushop.common"]).config(config);

    config.$inject = ["$stateProvider", "$urlRouterProvider"];

    function config($stateProvider, $urlRouterProvider) {
        $stateProvider.state("post_categories", {
            url: "/post_categories",
            templateUrl: "/app/components/post_categories/postCategoryListView.html",
            controller: "postCategorytListController"
        }).state("add_post_category", {
            url: "/add_post_category",
            templateUrl: "/app/components/post_categories/postCategoryAddView.html",
            controller: "postCategorytAddController"
        }).state("edit_post_category", {
            url: "/edit_post_category/:id",
            templateUrl: "/app/components/post_categories/postCategoryEditView.html",
            controller: "postCategorytEditController"
        }).state("clone_post_category", {
            url: "/add_post_category/:id",
            templateUrl: "/app/components/post_categories/postCategoryAddView.html",
            controller: "postCategorytAddController"
        });
    }
})();