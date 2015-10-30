'use strict';

angular.module('myApp.home', ['ngRoute', 'firebase'])

// Declared route
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}])



// Home controller
.controller('HomeCtrl', ['$scope', '$location', 'CommonProp', '$firebaseAuth', function($scope, $location, CommonProp, $firebaseAuth) {
    var firebaseObj = new Firebase("https://popping-fire-1827.firebaseio.com/");
    var auth = $firebaseAuth(firebaseObj);

    $scope.signIn = function(event) {
        event.preventDefault();  // To prevent form refresh
        var username = $scope.user.email;
        var password = $scope.user.password;


        auth.$authWithPassword({
                email: username,
                password: password
            })
            .then(function(user) {
                // Success callback
                console.log('Authentication successful');
                $location.path('/welcome');
                CommonProp.setUser(user.password.email);
            }, function(error) {
                // Failure callback
                console.log('Authentication failure');
                $scope.regError = true;
                $scope.regErrorMessage = error.message;
            });
    }

}])

//Home service user
.service('CommonProp', function() {
    var user = '';
    return {
        getUser: function() {
            return user;
        },
        setUser: function(value) {
            user = value;
        }
    };
})

//Home service logout
.service('SignOut', function() {
    return{
        signOut : function(event) {
            event.preventDefault();  // To prevent form refresh
            auth.$unauth();
            CommonProp.setUser("");
            console.log('Logout successful');
            $location.path('/home');
        }
    }
})