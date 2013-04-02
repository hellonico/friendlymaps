function MapCtrl($scope, $resource, $location, CompanyResource) {

   var markers = [];

   $scope.types = CATEGORIES;

   $scope.selected = undefined;

   $scope.isSelected = function(section) {
    return $scope.selected === section;
   }

   $scope.subselect = function(type) {
    if($scope.selected == type) {
      $scope.selected = undefined;
      $scope.companies = CompanyResource.query(function() {
        addMarkers($scope.companies);  
      });  
    } else {
      $scope.selected = type;
      $scope.companies = CompanyResource.query({type: type['value']}, function() {
        addMarkers($scope.companies);  
      });  
    }

   }

   // map options
   var mapOptions = {
          center: new google.maps.LatLng(35.6580681,139.7515992), // minato-ku
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

   // init companies
   $scope.companies = CompanyResource.query(function() {
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
    // console.log("showing:"+companies.length);

    // TODO: WHY ????
    map.clearMarkers(markers);
    markers = [];

    for (i = 0; i < companies.length; i++) {
    
    var loc = companies[i]["location"];
    var latlng = new google.maps.LatLng(loc["jb"], loc["kb"]);
    
    var myMarker = new google.maps.Marker({
      position: latlng,
      icon: "/icons/"+companies[i]["type"]+".png",
      map: map,
      title: companies[i]["name"],
      custom : companies[i]
    });

     google.maps.event.addListener(myMarker, 'click', function(event) {
      // console.log(event);
        $("#details").html("<h3>"+this.custom["name"]+"</h3>");
      if (this.custom["address"])
        $("#details").append("<h5>"+this.custom["address"]+"</h5>");
      if (this.custom["description"])
        $("#details").append("<h5>"+this.custom["description"]+"</h5>");
      if (this.custom["website"])
        $("#details")
          .append("<a target=\"_blank\" href=\""+this.custom["website"]+"\">"+this.custom["website"]+"</a>");
     });

     markers.push(myMarker);

    }

    $scope.markers_count = markers.length;

  }
  
}