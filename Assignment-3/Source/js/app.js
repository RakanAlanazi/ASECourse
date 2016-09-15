var app = angular.module('MyLocation',[]);

app.controller('MyLocationController',function($scope,$http){

	navigator.geolocation.getCurrentPosition(function (position) {
		console.log(position.coords.latitude);
		console.log(position.coords.longitude);
		var result = $http.get("https://api.foursquare.com/v2/venues/search?ll="+position.coords.latitude+","+position.coords.longitude+"&query=theaters&limit=5&client_id=GNZX4JTWM3IHVXORIOHW0APZCFGKG4TZA5UVWVATGVJWQVTK&client_secret=JRHDY0S3YN1UVD0F1DUDNTOEF1VE5D0RIRUITFMNIDV01BOI&v=20160212");
		var myweather = $http.get("http://api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude+"&appid=3ff07f8975e307cace3e09fd200c9847");

		result.success(function(data,status,headers,config){
			console.log("data : "+data.response.venues[1]);
			$scope.venues = data.response.venues;

			if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
				for (var i = 0; i < data.response.venues.length; i++) {
					$scope.venueList[i] = {
						"name": data.response.venues[i].name,
						"id": data.response.venues[i].id,
						"location": data.response.venues[i].location
					};
				}
			}

		});

		result.error(function(data,status,headers,config){
			alert("Failure during service call!!")
		});

	});

	$scope.getReviews = function (venueSelected) {
		if (venueSelected != null) {
			//This is the API call being made to get the reviews(tips) for the selected place or venue.
			var handler = $http.get("https://api.foursquare.com/v2/venues/" + venueSelected.id + "/tips" +
				"?sort=recent" +
				"&client_id=GNZX4JTWM3IHVXORIOHW0APZCFGKG4TZA5UVWVATGVJWQVTK" +
				"&client_secret=JRHDY0S3YN1UVD0F1DUDNTOEF1VE5D0RIRUITFMNIDV01BOI&v=20160215" +
				"&limit=5");
			handler.success(function (result) {
				if (result != null && result.response != null && result.response.tips != null &&
					result.response.tips.items != null) {
					$scope.mostRecentReview = result.response.tips.items[0];
					//This is the Alchemy API for getting the sentiment of the most recent review for a place.
					var callback = $http.get("http://gateway-a.watsonplatform.net/calls/text/TextGetTextSentiment" +
						"?apikey=a3f2771bf009c3f9f23fb1742e823afd09828485" +
						"&outputMode=json&text=" + $scope.mostRecentReview.text);
					callback.success(function (data) {
						if(data!=null && data.docSentiment!=null)
						{
							$scope.ReviewWithSentiment = {"reviewText" : $scope.mostRecentReview.text,
								"sentiment":data.docSentiment.type,
								"score":data.docSentiment.score  };
							document.getElementById('div_ReviewList').style.display = 'block';


						}
					})
				}
			})
			handler.error(function (result) {
				alert("There was some error processing your request. Please try after some time.")
			})
		}

	}




});