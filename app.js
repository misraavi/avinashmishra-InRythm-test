var app = angular.module('app', []);

// --- YOUR CODE STARTS HERE ---
app.controller("namesController", ["$scope","namesService", function ($scope, namesService) {
    $scope.newName ="";
    $scope.names = [];
    $scope.addName = function (){
        if ($scope.newName != "")
        {
            namesService.addName($scope.newName);
            $scope.newName = "";
        }
    }
    $scope.deleteName = function(name){
        namesService.deleteName(name);
    }
    namesService.getNames().then(function (data){
        $scope.names = data;
    });

} ]);
app.factory("namesService",["$http","$q", function ($http, $q){
    var names = [];
    var getNames = function (){
        var defer = $q.defer();
        $http.get("data/names.json").then(function (response){
            names = response.data;
            defer.resolve(names);
        }, function () {
            defer.reject(response);
        });
        return defer.promise;
    };
    var addName = function (name){
        names.push(name);
    };
    var deleteName = function(name){
        var idx = names.indexOf(name)
        names.splice(idx, 1);
    }
    return {
        getNames: getNames,
        addName: addName,
        deleteName:deleteName
    }
}])
app.directive("nameTag",["namesService",function (namesService){
    return {
        restrict: "E",
        template: `<div class=\"nameTag-container col-sm-4 col-md-4\">
                        <div class=\"row nameTag-header\">Hello my name is</div>
                        <div class=\"row nameTag-detail\"> {{name}} || <a href=\"#\" ng-click=deleteName(name)>delete</a></div>
                    </div>`

    }
}]);
// --- YOUR CODE ENDS HERE ---
