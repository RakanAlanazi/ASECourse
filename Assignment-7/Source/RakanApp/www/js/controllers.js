angular.module('starter.controllers', ['ngCordova'])


  .controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};

    $scope.registration = function() {

      $state.go('registration');
    };
    $scope.login = function() {
      LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        $state.go('tab.home');
      }).error(function(data) {
        var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: 'Please check your credentials!'
        });
      });
    }
  })

  .controller('DashCtrl', function($scope, $http) {
  $scope.getWeather=function() {

  var resp = $http.get("http://api.openweathermap.org/data/2.5/weather?q="+$scope.city+"&units=imperial&appid=a4e90c978599d4b8759f03bd61515911");
  resp.success(function(data,status,headers,config){
    console.log("data : "+data.weather[0].id);
    $scope.temperatureSource = data.main.temp;
    $scope.pressureSource = data.main.pressure;
    $scope.descSource = data.weather[0].description;

  });
  resp.error(function(data,status,headers,config){
    alert("Failure during service call!!")
  });
};

})

.controller('ChatsCtrl',  function($scope,$http) {
  $scope.venueList = new Array();
  $scope.mostRecentReview;
  $scope.getVenues = function () {
    var placeEntered = document.getElementById("txt_placeName").value.replace(/\s/g, "");
    if (placeEntered != null && placeEntered != "") {
      document.getElementById('div_ReviewList').style.display = 'none';
      //This is the API that gives the list of venues based on the place and search query.
      var handler = $http.get("http://api.sqoot.com/v2/coupons?api_key=b61qrv&location="+placeEntered+"&per_page=5");
      handler.success(function (data) {

        if (data != null && data.coupons != null) {
          for (var i = 0; i < data.coupons.length; i++) {
            $scope.venueList[i] = {
              "name": data.coupons[i].coupon.title,
              "category": data.coupons[i].coupon.category_name,
              "id": data.coupons[i].coupon.id,
              "location": placeEntered
            };
          }
        }
        $scope.testLogin = function(k) {
          var k = "Rakan"
          return k;
        }
      })
      handler.error(function (data) {
        alert("There was some error processing your request. Please try after some time.");
      });
    }
  }

})

  .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


  .controller('HomeCtrl', function($scope, $stateParams) {
  })

  .controller('MapController', function($scope, $cordovaGeolocation, $ionicLoading) {

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {

      $ionicLoading.show({
        template: '<ion-spinner icon="bubbles"></ion-spinner><br/>Locating you!!!'
      });

      var posOptions = {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0
      };
      $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
        var lat  = position.coords.latitude;
        var long = position.coords.longitude;
        console.log(lat);
        console.log(long);
        var myLatlng = new google.maps.LatLng(lat, long);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
          position: myLatlng,
          title: 'My Location!!!'
        });
        marker.setMap(map);
        $scope.map = map;
        $ionicLoading.hide();

      }, function(err) {
        $ionicLoading.hide();
        console.log(err);
      });
    }
  })

  .controller('RegisterCtrl', function($scope,$state) {
    $scope.data = {};
    $scope.registration = function() {

      $state.go('registration');
    }
  })
    .controller('AccountCtrl', function($scope,  $http) {
      this.movieSearch = '';
      this.formAction = function () {
        $http.get('https://www.omdbapi.com/?s=' + this.movieSearch + '&y=&r=json').then(function (response) {
          $scope.movies = response.data.Search
        });
      };
      this.movieSelect = function (imdbID) {
        $http.get('https://www.omdbapi.com/?i=' + imdbID + '&y=&plot=short&r=json').then(function (data) {
          console.log(data.data);
          $scope.movie = data.data;
        });
      };

    });
