function SearchCtrl($scope, $routeParams, $http, $resource) {
    
    console.log("searching for:"+$routeParams["name"]);
    var comp = $resource('/company/:verb', {verb: "search"}, {'search':  {method:'GET'} });

  	$scope.companies = comp.query({"name" : $routeParams["name"]}, function(data) {
      console.log(data);
    });	
}