var app = angular.module('arc', []);

app.controller('team', ['$scope', '$http', function($scope, $http){
    $http.get('https://arc-ironmarvel-backend.herokuapp.com/api/friends?populate=*').then(function(data){
        $scope.team = data.data.data;
    });
}]);