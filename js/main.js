const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks =[];

if(localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task){
    renderTask(task);
});

checkEmptyList ();

form.addEventListener('submit', addTask);

tasksList.addEventListener('click', deleteTask);

tasksList.addEventListener('click', doneTask);

function addTask(event) {
    event.preventDefault();

    const taskText = taskInput.value;

    const newTask = {
        id: Date.now(),
        Text: taskText,
        done: false
    }

    tasks.push(newTask);

    saveToLocaalStorage();

    renderTask(newTask);

    taskInput.value = "";
    taskInput.focus();

    checkEmptyList ();
}

function deleteTask(event) {
    if(event.target.dataset.action !== 'delete') return;
    
    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const index = tasks.findIndex((task) => task.id === id);

    tasks.splice(index, 1);

    saveToLocaalStorage();

    parentNode.remove();

    checkEmptyList ();
}


function doneTask(event) {
    if(event.target.dataset.action !== 'done') return;

    const parentNode = event.target.closest('.list-group-item');

    const id = Number(parentNode.id);

    const task = tasks.find((task) => task.id === id);

    if (!task || !parentNode.querySelector('.task-title')) return; // Добавьте проверку наличия задачи и элемента task-title

    

    task.done = !task.done;

    saveToLocaalStorage();

    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');


}

function checkEmptyList () {
    if(tasks.length === 0) {
        const emptyListElement = `<li id="emptyList" class="list-group-item empty-list">
        <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
        <div class="empty-list__title">Список дел пуст</div>
    </li>`;

        tasksList.insertAdjacentHTML('afterbegin', emptyListElement);
    }
    if(tasks.length > 0) {
        const emptyListEL = document.querySelector('#emptyList');
        emptyListEL ?emptyListEL.remove() : null;
    }
}

function saveToLocaalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
    
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';


    const taskHtml = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${task.Text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
</li>
`
    tasksList.insertAdjacentHTML('beforeend', taskHtml);
}