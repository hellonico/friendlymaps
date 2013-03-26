// Geocoding
// https://developers.google.com/maps/documentation/geocoding/#Limits

// Sample Query[not used]
// http://maps.googleapis.com/maps/api/geocode/json?sensor=true&address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=true_or_false

// Map Icons
// http://mapicons.nicolasmollet.com/

// Map Reference
// http://www.nanchatte.com/map/showDifferentInfoWindowOnEachMarker.html

var guidebookConfig = function($routeProvider) {
     $routeProvider
       .when('/edit/:id', {
         controller: 'GeoCtrl',
         templateUrl: '../view/one.html'
       })
       .when('/new', {
         controller: 'GeoCtrl',
         templateUrl: '../view/one.html'
       })
       .when("/list", {
         controller: 'ListCtrl',
         templateUrl: '../view/list.html'
       })
       .when("/map", {
         controller: 'MapCtrl',
         templateUrl: '../view/map.html'
       })
};

angular.module("myapp", ['ngResource']).config(guidebookConfig);

function ListCtrl($scope, $resource) {
  var Company = $resource("/company/:_id", {_id: "@_id"});  
  $scope.companies = Company.query();

  $scope.delete = function(company) {
    console.log(company);
    company.$delete();
    $scope.companies = Company.query();
  }
 
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
  function addMarker(loc) {
    console.log(loc);

    var latlng = new google.maps.LatLng(loc["kb"], loc["lb"]);
   
    map.clearMarkers();
    map.setCenter(latlng);
    var marker = new google.maps.Marker({
      map: map,
      title: $scope.company.address,
      flat:true,
      icon: "/icons/office-building.png",
      position: latlng
        });
      markers.push(marker);
  }


  $scope.addCompany = function(company) {
    var c = new Company(company);
    c.location = loc;
    c.$save();
  }

	$scope.locate = function() {
	  console.log("locate:"+$scope.company.address);
	  var local_scope = $scope;
	  geocoder.geocode( { 'address': $scope.company.address}, function(results, status) { 
      if (status == google.maps.GeocoderStatus.OK) {
      	loc = results[0]["geometry"]["location"];
      	addMarker(loc);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
      
    });
	}

  // load object if we have an id
  var id = $routeParams["id"];
  if(id != undefined) {
    $scope.company = Company.get({_id : id}, function() {
      addMarker($scope.company.location);
    }); 
  }

}

function MapCtrl($scope, $resource, $location) {
   // resources
   var Company = $resource("/company/:_id", {_id: "@_id"}); 

   $scope.details = "Select a company";

   // map options
   var mapOptions = {
          center: new google.maps.LatLng(35.6580681,139.7515992), // minato-ku
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

   $scope.companies = Company.query(function() {
    addMarkers($scope.companies);
   });

   function attachMessage(marker, msg) {
    google.maps.event.addListener(marker, 'click', function(event) {
      new google.maps.InfoWindow({
        content: msg
      }).open(marker.getMap(), marker);
    });
  }

  function addMarkers(companies) {
    var data = new Array();
    for(i = 0 ; i < companies.length ;  i++) {
      var loc = companies[i]["location"];
      var latlng = new google.maps.LatLng(loc["kb"], loc["lb"]);
      data.push({position: latlng, content: companies[i]["name"]});
    }

    for (i = 0; i < data.length; i++) {
    var myMarker = new google.maps.Marker({
      position: data[i].position,
      icon: "/icons/office-building.png",
      map: map,
      title: data[i].content,
      custom : companies[i]
    });


     google.maps.event.addListener(myMarker, 'click', function(event) {
      console.log(event);
      $("#details").html("<h2>"+this.custom["name"]+"</h2>");
      if (this.custom["address"])
      $("#details").append("<h4>"+this.custom["address"]+"</h4>");
      if (this.custom["description"])
      $("#details").append("<h4>"+this.custom["description"]+"</h4>");
     });

    }

  }
  
}