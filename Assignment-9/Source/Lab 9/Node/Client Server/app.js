'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])


    .controller('View1Ctrl', function ($scope, $http) {

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log(position.coords.latitude);
            console.log(position.coords.longitude);

            $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+ position.coords.latitude +"&lon="+ position.coords.longitude+"&units=imperial&appid=a4e90c978599d4b8759f03bd61515911")

                .then(function(response) {

                    $scope.temp= response.data.main.temp
                    $scope.pressure= response.data.main.pressure
                    $scope.humidity= response.data.main.humidity
                    $scope.temp_min= response.data.main.temp_min
                    $scope.temp_max= response.data.main.temp_max



                }, function(response) {
                    $scope.content = "Something went wrong";
                });


            $http.get('https://api.foursquare.com/v2/venues/search?ll=' + position.coords.latitude + ',' + position.coords.longitude +'&query=theaters&limit=5&client_id=GNZX4JTWM3IHVXORIOHW0APZCFGKG4TZA5UVWVATGVJWQVTK&client_secret=JRHDY0S3YN1UVD0F1DUDNTOEF1VE5D0RIRUITFMNIDV01BOI&v=20160212')

                .then(function(response) {

                    $scope.theaters1= response.data.response.venues[1].name
                    $scope.address1= response.data.response.venues[1].location.address

                    $scope.theaters2= response.data.response.venues[2].name
                    $scope.address2= response.data.response.venues[2].location.address

                    $scope.theaters3= response.data.response.venues[3].name
                    $scope.address3= response.data.response.venues[3].location.address




                }, function(response) {
                    $scope.theater= "Something went wrong in theater";
                });

            $http.get("https://www.omdbapi.com/?s=saw&y=&r=json")

                .then(function(response) {
                    $scope.movie = response.data.Search[1]

                }, function(response) {
                    $scope.movie= "Something went wrong";
                });

            $http.get("https://www.omdbapi.com/?i=tt0432348&y=&plot=short&r=json")

                .then(function(response) {
                    $scope.movieIMBDtitel = response.data.Title
                    $scope.movieIMBDyear = response.data.Year
                    $scope.movieIMBDplot = response.data.Plot
                    $scope.movieIMBDrated = response.data.Rated
                    $scope.movieIMBDgenre = response.data.Genre
                    $scope.movieIMBDposter = response.data.Poster



                }, function(response) {
                    $scope.movieIMBD = "Something went wrong";
                });

        });




    });