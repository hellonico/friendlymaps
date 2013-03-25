angular.module("myapp", ['ngResource']);

// http://jsfiddle.net/johnlindquist/qmNvq/
function TodoCtrl($scope, $resource) {

    var Todo = $resource("/todo/:_id", 
        {_id: "@_id"}, 
        // {},
        {empty: {method:"DELETE"}});
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
        // console.log("delete:"+todo);
        todo.$save();
        // todo.$remove();
    }
    
    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };
    
    $scope.archive = function() {
        // var todo = new Todo();
        new Todo().$empty();
        $scope.todos = [];
        // var oldTodos = $scope.todos;
        // $scope.todos = [];
        // angular.forEach(oldTodos, function(todo) {
        //     if (!todo.done) $scope.todos.push(todo);
        // });
    };
}