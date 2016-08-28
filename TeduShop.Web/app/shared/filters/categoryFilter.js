(function(app) {
    app.filter("categoryFilter", function() {
        return function(input) {
            return input ? "Kịch hoạt" : "Khóa";
        }
    });
})(angular.module("tedushop.common"))