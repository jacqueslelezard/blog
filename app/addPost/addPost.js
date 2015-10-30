'use strict';

angular.module('myApp.addPost', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/addPost', {
        templateUrl: 'addPost/addPost.html',
        controller: 'AddPostCtrl'
    });
}])

.controller('AddPostCtrl', ['$scope', 'CommonProp', '$location', '$firebase', function($scope, CommonProp, $location, $firebase) {
    //check if the user is connected
    $scope.username = CommonProp.getUser();
    $scope.connected = ($scope.username != "");
    console.log("user connected : " + $scope.connected);

    $scope.addPost = function() {
        console.log("submission...");
        //connecting to firebase
        var firebaseObj = new Firebase("https://popping-fire-1827.firebaseio.com/Articles");
        //var auth = $firebaseAuth(firebaseObj);
        //var fire = $firebase(firebaseObj);

        var title = $scope.article.title;
        var post = $scope.article.post;

        //Adding the data to firebase
        firebaseObj.push({
            title: title,
            post: post,
            emailId: CommonProp.getUser()
        });
        console.log("submission seems ok");
        $location.path('/welcome');
    }

    /*$scope.signOut = function(event) {
        event.preventDefault();  // To prevent form refresh
        auth.$unauth();
        CommonProp.setUser("");
        console.log('Logout successful');
        $location.path('/home');
    }*/
}]);