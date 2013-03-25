// https://developers.google.com/maps/documentation/geocoding/#Limits
// http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false
// http://mapicons.nicolasmollet.com/
var guidebookConfig = function($routeProvider) {
     $routeProvider
       .when('/new', {
         controller: 'GeoCtrl',
         templateUrl: '../view/one.html'
       })
       .when("/list", {
         controller: 'ListCtrl',
         templateUrl: '../view/list.html'
       })
};

angular.module("myapp", ['ngResource']).config(guidebookConfig);

function ListCtrl($scope, $resource) {
  var Company = $resource("/company/:_id", {_id: "@_id"});  
  $scope.companies = Company.query();


}

function GeoCtrl($scope, $resource, $routeParams) {

  var Company = $resource("/company/:_id", {_id: "@_id"});

  var loc;
	var geocoder = new google.maps.Geocoder();
	var mapOptions = {
          center: new google.maps.LatLng(35.6580681,139.7515992), // minato-ku
          zoom: 14,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  var markers = [];

  google.maps.Map.prototype.clearMarkers = function() {
    for(var i=0; i < markers.length; i++){
        markers[i].setMap(null);
    }
    markers = [];
  };

  $scope.addCompany = function(company) {
    var c = new Company(company);
    console.log(c);
    c.location = loc;
    c.$save();
  }

	$scope.locate = function() {
	  console.log("locate:"+$scope.address);
	  var local_scope = $scope;
	  geocoder.geocode( { 'address': $scope.address}, function(results, status) { 
      if (status == google.maps.GeocoderStatus.OK) {
      	loc = results[0]["geometry"]["location"];
      	console.log(loc["kb"]+","+loc["lb"]);
        map.clearMarkers();
      	map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            title: $scope.address,
            flat:true,
            icon: "/icons/office-building.png",
            position: results[0].geometry.location
        });
        markers.push(marker);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
      
    });

	}

}