// Angular
// http://angular-ui.github.com/
// http://docs.angularjs.org/api/

// Geocoding
// https://developers.google.com/maps/documentation/geocoding/#Limits

// Map Icons
// http://mapicons.nicolasmollet.com/

// Map Reference
// http://www.nanchatte.com/map/showDifferentInfoWindowOnEachMarker.html

var guidebookConfig = function($routeProvider) {
     $routeProvider
       .when('/edit/:id', {
         controller: 'GeoCtrl',
         templateUrl: '/view/one.html'
       })
       .when('/new', {
         controller: 'GeoCtrl',
         templateUrl: '/view/one.html'
       })
       .when("/list", {
         controller: 'ListCtrl',
         templateUrl: '/view/list.html'
       })
       .when("/search", {
         controller: 'SearchCtrl',
         templateUrl: '/view/search.html'
       })
       .when("/map", {
         controller: 'MapCtrl',
         templateUrl: '/view/map.html'
       })
       .otherwise({redirectTo: '/list'});
};

// http://jacobmumm.com/2012/08/28/angular-js-services/
angular
  .module("myapp", ['ngResource', 'ui'])
  .config(guidebookConfig)
  .factory("CompanyResource", function ($resource) {
    return $resource("/company/:_id", {_id: "@_id"}, {'search':  {method:'GET', isArray:true} }); 
  });


google.maps.Map.prototype.clearMarkers = function(markers) {
  for(var i=0; i < markers.length; i++){
      markers[i].setMap(null);
  }
  markers = [];
};

function NavBarCtrl($scope, $location) {
  $scope.searchfield = "";

  $scope.isActive = function(route) {
    return $location.url() == route;
  }

  $scope.search = function($event) {
    $event.preventDefault();
    console.log("searching");
    $location.url( "/search?name=" + $scope.searchfield );
  }
}

var CATEGORIES = [
  {name: "StartUp", value: "startup"},
  {name: "Investor", value: "investor"},
  {name: "Incubator", value: "incubator"},
  {name: "Coworking", value: "coworking"},
  {name: "R&D Center", value: "rdcenter"},
  {name: "Community", value: "community"}
]