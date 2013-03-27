
function ListCtrl($scope, $resource, $routeParams) {
  var Company = $resource("/company/:_id", {_id: "@_id"});  
  // if($routeParams.length > 0) {
  	// console.log();
  // } else {
  	$scope.companies = Company.query($routeParams);	
  // }

  $scope.delete = function(company) {
    console.log(company);
    company.$delete();
    $scope.companies = Company.query();
  }
 
}