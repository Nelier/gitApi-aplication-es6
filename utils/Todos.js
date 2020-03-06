//DOM Loads
const buttonSec1 = document.querySelector('#sec1 #but1');
const inputSec1 = document.querySelector('#sec1 #inp1');
const button2Sec1 = document.querySelector('#sec1 #but2');

//All Content
class list {
    constructor() {
        this.Todo = [];
    }
    addTodo(todoAux) {
        this.Todo.push(todoAux);
        console.log('Todo adicionado!');
    }
}

class TodoList extends list {

    printTodos() {
        this.Todo.map(function(aux) {
            console.log(aux);
        })
    }
}

//On Load
var minhaLista = new TodoList();
buttonSec1.onclick = function() {
    minhaLista.addTodo(inputSec1.value);
}
button2Sec1.onclick = function() {
    minhaLista.printTodos();
}