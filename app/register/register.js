'use strict';

angular.module('myApp.register', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/register', {
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl'
    });
}])

// Register controller
.controller('RegisterCtrl', ['$scope', '$location', '$firebaseAuth', function($scope, $location, $firebaseAuth) {
    var firebaseObj = new Firebase("https://popping-fire-1827.firebaseio.com/");
    var auth = $firebaseAuth(firebaseObj);

    $scope.signUp = function(event) {
        event.preventDefault();  // To prevent form refresh
        var username = $scope.user.email;
        var password = $scope.user.password;

        if (!$scope.regForm.$invalid) {
            if (username && password) {
                auth.$createUser(username, password)
                    .then(function() {
                        // do things if success
                        console.log('User creation success');
                        $location.path('/home');
                    }, function(error) {
                        // do things if failure
                        console.log("Error when creating the user in Firebase"+error);
                        $scope.regError = true;
                        $scope.regErrorMessage = error.message;
                    });

            }
        }else{
            console.log("invalid form...")

        }
    };
}]);