(function(app) {
    app.filter("statusFilter", function() {
        return function(input) {
            return input ? "Kịch hoạt" : "Khóa";
        }
    });
})(angular.module("tedushop.common"))