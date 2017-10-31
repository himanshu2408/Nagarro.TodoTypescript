var TodoList = /** @class */ (function () {
    function TodoList() {
        this.id = 1;
        this.todos = [];
    }
    TodoList.prototype.add = function (todo) {
        this.todos.push(todo);
    };
    TodoList.prototype.markAsComplete = function (id) {
        this.todos.forEach(function (todo) {
            if (todo._id == id) {
                todo.completed = true;
            }
        });
        console.log("All todos: " + JSON.stringify(this.todos));
    };
    TodoList.prototype.markAsIncomplete = function (id) {
        this.todos.forEach(function (todo) {
            if (todo._id == id) {
                todo.completed = false;
            }
        });
        console.log("All todos: " + JSON.stringify(this.todos));
    };
    TodoList.prototype.deleteTodo = function (id) {
        var index = 0;
        this.todos.forEach(function (todo) {
            if (todo._id < id) {
                index++;
            }
        });
        this.todos.splice(index, 1);
        this.display();
    };
    TodoList.prototype.editTodo = function (todoElement) {
        var todoId = todoElement.parentElement.parentElement.parentElement.id;
        var retrievedTodoValue = todoElement.value;
        this.todos.forEach(function (todo) {
            if (todo._id == todoId) {
                todo.name = retrievedTodoValue;
            }
        });
        console.log("All todos: ", JSON.stringify(this.todos));
    };
    TodoList.prototype.toggleTodoStatus = function (checkBox) {
        var id = checkBox.parentElement.parentElement.parentElement.id;
        var tickId = 'tick-' + id;
        if (checkBox.checked) {
            document.getElementById(tickId).className = "";
            todoList.markAsComplete(id);
        }
        else {
            document.getElementById(tickId).className = "hidden";
            todoList.markAsIncomplete(id);
        }
    };
    TodoList.prototype.display = function () {
        console.log("All todos: " + JSON.stringify(this.todos));
        document.getElementById('todos').innerHTML = "";
        this.todos.forEach(function (todo) {
            var tickId = 'tick-' + todo._id;
            document.getElementById('todos').innerHTML += "\n                <li id='" + todo._id + "'>\n                    <div class=\"row\"  style=\"margin: 3px\">\n                        <div class=\"col-sm-1\">\n                            <input type=\"checkbox\" onchange=\"todoList.toggleTodoStatus(this)\">\n                        </div>\n                        <div class=\"col-sm-8\">\n                        <input type=\"text\" value=\"" + todo.name + "\"  onkeyup=\"todoList.editTodo(this)\" class=\"form-control\">\n                        </div>\n                        <div class=\"col-sm-3\">\n                            <button type=\"button\" class=\"btn btn-default btn-sm\" onclick=\"todoList.deleteTodo(this.parentElement.parentElement.parentElement.id)\">\n                                <span class=\"glyphicon glyphicon-trash\"></span>\n                            </button>&nbsp;&nbsp;&nbsp;\n                            <a href=\"#\" class=\"hidden\" id=\"" + tickId + "\">\n                              <span class=\"glyphicon glyphicon-ok\" style=\"color: greenyellow\"></span>\n                            </a>\n                        </div>\n                    </div>\n                </li>";
        });
    };
    return TodoList;
}());
var todoList = new TodoList();
function addTodo(name) {
    var todo = {
        _id: todoList.id,
        name: name,
        completed: false
    };
    todoList.id++;
    todoList.add(todo);
    todoList.display();
}
