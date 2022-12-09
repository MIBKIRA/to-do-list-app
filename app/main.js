/* make an arrow function to saying if theres any to-do's save it in our local storage
and we encoding it as json string so that's why we're using JSON.parse*/
window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');

    const username = localStorage.getItem('username') || '';

    /*this make the browser display the name that we typing*/
    nameInput.value = username;

    /* now if we reload the page after we typing our name in will does not change
    because that will take the value that we give it to him from the local storage*/
    nameInput.addEventListener('change' , e => {
        localStorage.setItem('username' , e.target.value);
    });
    
    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        /*get some of the actual value of the priority content form HTML file */
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        };

        /*use a global variable to push todo value to the array*/
        todos.push(todo);

        /*save our local storage item so we've updated our to-do site array
        by turn it into json by json stringfiy (todos)*/
        localStorage.setItem('todos', JSON.stringify(todos));

        /*use reset() to clear the input field */
        e.target.reset();

        /*make a function called DisplayTodos because we need the items to display on screen*/
        DisplayTodos();
    });

})

function DisplayTodos () {
    /*make const of todolist to be our todo list element where we're going to push our new todo's item to*/
    const todolist = document.querySelector('#todo-list');

    /*make todolist == nothing so that every time we call display choose we're going to clear all of the elements*/
    todolist.innerHTML = '';

    /*make a loop for every single todo item in the array
    by using the golbal variable*/
    todos.forEach(todo => {
        /*create a div for each element in the array */
        const todoItem = document.createElement('div');
        //and give it a class called todo-item
        todoItem.classList.add('todo-item')

        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions =document.createElement('div');
        const edit =document.createElement('button');
        const deleteButton =document.createElement('button');


        
        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('priority');

        // that's will tell us what color is will the item takes
        if(todo.category == 'normal') {
            span.classList.add('normal');
        } else {
            span.classList.add('high');
        }

        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deleteButton.classList.add('delete');

        /*use es6 to edit the html file by adding input tag the have a todo.content value*/
        content.innerHTML = `<input type ='text' value = "${todo.content}" readonly>`;
        edit.innerHTML = 'edit';
        deleteButton.innerHTML = 'Delete';

        // now we will display the all things (input, span, edit button, delete button, ...)
        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deleteButton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);

        todolist.appendChild(todoItem);

        // but it will did not work and to make it work we have to do this condition

        if (todo.done) {
            todoItem.classList.add('done')
        }
        // setup the ckecked part to make a line across item that is done 
        input.addEventListener('click', e => {
            todo.done =e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos));

            if (todo.doe) {
                todoItem.classList.add('done');
            } else {
                todoItem.classList.remove('done')
            }

            DisplayTodos();
        })

        //activate the edit button and set it up 
        edit.addEventListener('click', e => {
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', e => {
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            })
        })

        //activate the delete button and set it up 
        deleteButton.addEventListener('click', e => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayTodos();
        })
    });
}



