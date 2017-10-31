interface Todo {
    _id: number,
    name: string,
    completed: boolean
}

class TodoList {
    private todos: Todo[];
    public id = 1;
    constructor( ) {
        this.todos = [];
    }
    add(todo : Todo):void {
        this.todos.push(todo);
    }

    markAsComplete(id: number):void{
        this.todos.forEach(function (todo) {
            if(todo._id == id){
                todo.completed = true;
            }
        });
        console.log(`All todos: ${JSON.stringify(this.todos)}`);
    }

    markAsIncomplete(id: number): void{
        this.todos.forEach(function (todo) {
            if(todo._id == id){
                todo.completed = false;
            }
        });
        console.log(`All todos: ${JSON.stringify(this.todos)}`);
    }

    deleteTodo(id: number): void{
        var index = 0;
        this.todos.forEach(function (todo) {
            if(todo._id < id){
                index++;
            }

        });
        this.todos.splice(index, 1);
        this.display()
    }

    editTodo(todoElement){
        var todoId = todoElement.parentElement.parentElement.parentElement.id;
        var retrievedTodoValue = todoElement.value;

        this.todos.forEach(function (todo) {
           if(todo._id == todoId) {
               todo.name = retrievedTodoValue;
           }
        });
        console.log("All todos: ", JSON.stringify(this.todos));
    }


    toggleTodoStatus(checkBox){
        var id = checkBox.parentElement.parentElement.parentElement.id;
        var tickId = 'tick-'+id;
        if(checkBox.checked){
            document.getElementById(tickId).className = "";
            todoList.markAsComplete(id);
        }
        else {
            document.getElementById(tickId).className = "hidden";
            todoList.markAsIncomplete(id);
        }
    }


    display() {
        console.log(`All todos: ${JSON.stringify(this.todos)}`);
        document.getElementById('todos').innerHTML = ``;
        this.todos.forEach(function (todo) {
            var tickId = 'tick-'+todo._id;
            document.getElementById('todos').innerHTML += `
                <li id='${todo._id}'>
                    <div class="row"  style="margin: 3px">
                        <div class="col-sm-1">
                            <input type="checkbox" onchange="todoList.toggleTodoStatus(this)">
                        </div>
                        <div class="col-sm-8">
                        <input type="text" value="${todo.name}"  onkeyup="todoList.editTodo(this)" class="form-control">
                        </div>
                        <div class="col-sm-3">
                            <button type="button" class="btn btn-default btn-sm" onclick="todoList.deleteTodo(this.parentElement.parentElement.parentElement.id)">
                                <span class="glyphicon glyphicon-trash"></span>
                            </button>&nbsp;&nbsp;&nbsp;
                            <a href="#" class="hidden" id="${tickId}">
                              <span class="glyphicon glyphicon-ok" style="color: greenyellow"></span>
                            </a>
                        </div>
                    </div>
                </li>`
        });
    }

}

var todoList = new TodoList();

function addTodo(name){
    var todo : Todo = {
        _id: todoList.id,
        name: name,
        completed: false
    };
    todoList.id++;
    todoList.add(todo);
    todoList.display();
}
