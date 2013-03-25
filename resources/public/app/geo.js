// https://developers.google.com/maps/documentation/geocoding/#Limits
// http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false
angular.module("myapp", ['ngResource']);

function GeoCtrl($scope) {

	// $scope.remaining = "enter address";
	var geocoder = new google.maps.Geocoder();
	var mapOptions = {
          // center: new google.maps.LatLng(-34.397, 150.644),
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

	$scope.locate = function() {
	  console.log("locate:"+$scope.geotext);
	  $scope.remaining = "locating:"+$scope.geotext;
	  var local_scope = $scope;
	  var loc;
	  geocoder.geocode( { 'address': $scope.geotext}, function(results, status) { 
      if (status == google.maps.GeocoderStatus.OK) {
      	loc = results[0]["geometry"]["location"];
      	console.log(loc["kb"]+","+loc["lb"]);

      	map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });

        // alert($.get("/"));
		// $scope.remaining = "yes";


      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
      
    });

	}

}