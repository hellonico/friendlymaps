function MapCtrl($scope, $resource, $location, CompanyResource) {

   // map options
   var mapOptions = {
          center: new google.maps.LatLng(35.6580681,139.7515992), // minato-ku
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    };
   var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

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

    for (i = 0; i < companies.length; i++) {
    
    var loc = companies[i]["location"];

    var myMarker = new google.maps.Marker({
      position: new google.maps.LatLng(loc["kb"], loc["lb"]),
      icon: "/icons/"+companies[i]["type"]+".png",
      map: map,
      title: companies[i]["name"],
      custom : companies[i]
    });


     google.maps.event.addListener(myMarker, 'click', function(event) {
      console.log(event);
      $("#details").html("<h3>"+this.custom["name"]+"</h3>");
      if (this.custom["address"])
      $("#details").append("<h5>"+this.custom["address"]+"</h5>");
      if (this.custom["description"])
      $("#details").append("<h5>"+this.custom["description"]+"</h5>");
     });

    }

  }
  
}