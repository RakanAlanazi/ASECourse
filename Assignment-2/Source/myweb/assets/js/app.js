var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

animateApp.config(function($routeProvider) {
    $routeProvider
    	.when('/', {
    		templateUrl: 'Login.html',
            controller: 'LoginController'
    	})
    	.when('/Home', {
    		templateUrl: 'Home.html',
            controller: 'HomeController'
    	})
    	.when('/Register', {
    		templateUrl: 'Register.html',
            controller: 'RegisterController'
    	});

});

animateApp.controller('LoginController', function($scope) {
    $scope.pageClass = 'Login';
});

animateApp.controller('HomeController', function($scope) {
    $scope.pageClass = 'Home';
});

animateApp.controller('RegisterController', function($scope) {
    $scope.pageClass = 'Register';
});

angular.module('GoogleDirection', [])
	.controller('googlemapoutput', function ($scope) {

		var map;
		var mapOptions;
		var directionsDisplay = new google.maps.DirectionsRenderer({
			draggable: true
		});
		var directionsService = new google.maps.DirectionsService();

		$scope.initialize = function () {
			var pos = new google.maps.LatLng(0, 0);
			var mapOptions = {
				zoom: 3,
				center: pos
			};

			map = new google.maps.Map(document.getElementById('map-canvas'),
				mapOptions);
		};
		$scope.calcRoute = function () {
			var end = document.getElementById('endlocation').value;
			var start = document.getElementById('startlocation').value;

			var request = {
				origin: start,
				destination: end,
				travelMode: google.maps.TravelMode.DRIVING
			};

			directionsService.route(request, function (response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setMap(map);
					directionsDisplay.setDirections(response);
					console.log(status);
				}

			});
		};

		google.maps.event.addDomListener(window, 'load', $scope.initialize);

	})

	.controller('weatherctrl', function($scope, $http) {

		$scope.CityValue = "Kansas City";
		$scope.StateValue = "MO";

		$scope.getWeather = function() {
			$scope.targetUrl = 'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + $scope.StateValue+'/' + $scope.CityValue +'.json'
			$http.get( $scope.targetUrl ).success(function(data) {
				console.log(data);
				temp = data.current_observation.temp_f;
				icon = data.current_observation.icon_url;
				weather = data.current_observation.weather;
				console.log(temp);
				$scope.currentweather = {
					html: "Currently " + temp + " &deg; F and " + weather + ""
				}
				$scope.currentIcon = {
					html: "<img src='" + icon + "'/>"
				}

			})
		};
		$scope.getWeather1 = function() {
			$scope.targetUrl = 'https://api.wunderground.com/api/36b799dc821d5836/conditions/q/' + $scope.StateValue+'/' + $scope.CityValue +'.json'
			$http.get( $scope.targetUrl ).success(function(data) {
				console.log(data);
				temp = data.current_observation.temp_f;
				icon = data.current_observation.icon_url;
				weather = data.current_observation.weather;
				console.log(temp);
				$scope.currentweather = {
					html: "Currently " + temp + " &deg; F and " + weather + ""
				}
				$scope.currentIcon = {
					html: "<img src='" + icon + "'/>"
				}

			})
		};

	});

