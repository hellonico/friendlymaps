
function ListCtrl($scope, $resource) {
  var Company = $resource("/company/:_id", {_id: "@_id"});  
  $scope.companies = Company.query();

  $scope.delete = function(company) {
    console.log(company);
    company.$delete();
    $scope.companies = Company.query();
  }
 
}