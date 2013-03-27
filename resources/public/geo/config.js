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
       .when("/map", {
         controller: 'MapCtrl',
         templateUrl: '/view/map.html'
       })
       .otherwise({redirectTo: '/list'});
};

// http://jacobmumm.com/2012/08/28/angular-js-services/
angular
  .module("myapp", ['ngResource'])
  .config(guidebookConfig)
  .factory("CompanyResource", function ($resource) {
    return $resource("/company/:_id", {_id: "@_id"}); 
  });


google.maps.Map.prototype.clearMarkers = function(markers) {
  for(var i=0; i < markers.length; i++){
      markers[i].setMap(null);
  }
  markers = [];
};

function NavBarCtrl($scope, $location) {
  $scope.isActive = function(route) {
    return $location.url() == route;
  }
}