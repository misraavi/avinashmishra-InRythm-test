var app = angular.module('app', []);
app.controller("namesController", ["$scope","namesService", function ($scope, namesService) {
    $scope.newName ="";
    $scope.namesService = namesService;
    $scope.addName = function (){
        namesService.addName($scope.newName);
        $scope.newName = "";
    }
    namesService.getNames();

} ]);
app.factory("namesService",["$http", function ($http){
    var names = [];
    var getNames = function (){
        $http.get("data/names.json").then(function (response){
            console.log(response.data);
            names = response.data;
        }, function () {
            
        });
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
        deleteName:deleteName,
        names: function () {
            return names;
        }
    }
}])
app.directive("nameTag",["namesService",function (namesService){
    return {
        resttrict: "E",
        template: "<div class=\"nameTag-container col-md-4\"><div class=\"row nameTag-header\">Hello my name is</div><div class=\"row nameTag-detail\"> {{name}} || <a href=\"#\" ng-click=deleteName()>delete</a></div></div>",
        scope: {
            name: "@"
        },
        link : function (scope, ele, attr)
        {
            scope.deleteName = function (){
                namesService.deleteName(scope.name);
            }
        }

    }
}]);
// --- YOUR CODE STARTS HERE ---

// --- YOUR CODE ENDS HERE ---
