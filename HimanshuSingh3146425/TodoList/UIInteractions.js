window.onload = function () {
    addButton = document.getElementById('addTodo');
    addButton.onclick = function () {
        var name = document.getElementById('name').value;
        addTodo(name);
    }


};