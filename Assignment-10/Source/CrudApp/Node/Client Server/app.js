'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope, $http) {

    $http( {
        method: 'Get',
        url: 'https://api.mlab.com/api/1/databases/rakandb/collections/Users?apiKey=fBFbFnTXux4haYJeLgtldL37EIfFT_zt'
    } )

        .then(function(response) {
            $scope.movies = response.data
        }, function(response) {
            $scope.movise= "Something went wrong";
        });

    $scope.getShow= function(movieId) {

        $http.delete("https://api.mlab.com/api/1/databases/rakandb/collections/Users/"+movieId+"?apiKey=fBFbFnTXux4haYJeLgtldL37EIfFT_zt")

            .then(function(response) {

                window.location.reload( true );

                alert("Delete the user Successfully");

            }, function(response) {
                $scope.movise= "Something went wrong";
            });

    };

    $scope.updateShow= function(movieId,fname,lname) {  $http({
        method: 'PUT',
        url: 'https://api.mlab.com/api/1/databases/rakandb/collections/Users/' + movieId+ '?apiKey=fBFbFnTXux4haYJeLgtldL37EIfFT_zt',
        data: JSON.stringify({
            "$set": {
                fname: $scope.FName,
                lname: $scope.LName
            }
        }),
        contentType: "application/json"
    }).success(function () {
        // $scope.user.first ="";
        // $scope.user.last ="";
        // $scope.password ="";
        // $scope.email ="";
        alert("Updated Successfully");

        // $scope.msg ="User created successfully";
    })
    }

})
app.controller('postserviceCtrl', function ($scope, $http) {
    $scope.fname = null;
    $scope.lname = null;
    $scope.adress = null;
    $scope.phone = null;
    $scope.password = null;
    $scope.email = null;


    $scope.postdata = function (fname, lname, email,password,adress,phone) {
        var data = {
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            adress: adress,
            phone: phone


        };
//Call the services
        $http.post('https://api.mlab.com/api/1/databases/rakandb/collections/Users?apiKey=fBFbFnTXux4haYJeLgtldL37EIfFT_zt', JSON.stringify(data)).then(function (response) {
            if (response.data)
                window.location.href = "http://127.0.0.1:8081/home.html";
        }, function (response) {
            $scope.msg = "Service not Exists";
            $scope.statusval = response.status;
            $scope.statustext = response.statusText;
            $scope.headers = response.headers();
        });
    };
})
;