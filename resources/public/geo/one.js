function GeoCtrl($scope, $resource, $routeParams, CompanyResource) {

  // var Company = $resource("/company/:_id", {_id: "@_id"});

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

  $scope.updateIcon = function() {
      if($scope.company.type)
        $("#type-icon").attr("src", "/icons/"+$scope.company.type+".png");
  }

  $scope.addCompany = function(company) {
    var c = new CompanyResource(company);
    if(c.location == undefined)
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

  // load company if we have an id
  var id = $routeParams["id"];
  if(id != undefined) {
    $scope.company = CompanyResource.get({_id : id}, function() {
      addMarker($scope.company.location);
      $scope.updateIcon();
    }); 
  }

}