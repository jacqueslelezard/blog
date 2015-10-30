'use strict';

angular.module('myApp.welcome', ['ngRoute', 'firebase'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/welcome', {
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl'
    });
}])

.controller('WelcomeCtrl', ['$scope', 'CommonProp', '$location', '$firebaseAuth', '$firebaseArray', '$firebaseObject', function($scope, CommonProp, $location, $firebaseAuth, $firebaseArray, $firebaseObject) {
    //check if the user is connected
    $scope.username = CommonProp.getUser();
    $scope.connected = ($scope.username != "");
    //console.log($scope.connected);
    var firebaseLogin = new Firebase("https://popping-fire-1827.firebaseio.com/");
    var auth = $firebaseAuth(firebaseLogin);

    $scope.signOut = function(event) {
        event.preventDefault();  // To prevent form refresh
        auth.$unauth();
        CommonProp.setUser("");
        console.log('Logout successful');
        $location.path('/home');
    }

    //console.log("articles loading..");
    var firebaseObj = new Firebase("https://popping-fire-1827.firebaseio.com/Articles");
    $scope.articles = $firebaseArray(firebaseObj);

    $scope.editPost= function(id) {
        var editfirebase = new Firebase("https://popping-fire-1827.firebaseio.com/Articles/" + id);
        $scope.postToUpdate = $firebaseObject(editfirebase);
        $('#editModal').modal();      // triggers the modal pop up
    }

    $scope.update = function(){
        console.log("updating article...");
        var articleToUpdate = new Firebase("https://popping-fire-1827.firebaseio.com/Articles/"+$scope.postToUpdate.$id);
        articleToUpdate.update({
            title: $scope.postToUpdate.title,
            post: $scope.postToUpdate.post,
            emailId: $scope.postToUpdate.emailId
        })
        $('#editModal').modal('hide');
    }

    $scope.delete = function(id){
        console.log("deleting article...");
        var articleToDelete = new Firebase("https://popping-fire-1827.firebaseio.com/Articles/" + id);
        articleToDelete.remove()
        $('#deleteModal').modal('hide');
    }

}]);