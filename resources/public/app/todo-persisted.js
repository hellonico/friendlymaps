angular.module("myapp", ['ngResource']);

function TodoCtrl($scope, $resource) {

    var Todo = $resource("/todo/:_id", {_id: "@_id"}, {empty: {method:"DELETE"}});
    $scope.todos = Todo.query();
    
    $scope.addTodo = function() {
        var todo = new Todo();
        todo.text = $scope.todoText;
        todo.done = false;
        todo.$save();
        $scope.todos.push(todo);
        $scope.todoText = '';
    };

    $scope.done = function(todo) {
        todo.$save();
    }
    
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    
    $scope.archive = function() {
        new Todo().$empty();
        $scope.todos = [];
    };
    
}