const form = document.getElementById("form");
const input = document.getElementById("input");
const taskList = document.getElementById("tasks-list");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

let tasks = {
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")){
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

   printTasks();
});

taskList.addEventListener("click", (event) => {
    btnAction(event);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    setTasks(event);
});

const setTasks = (e) => {

    if (input.value.trim() === "") {
        console.log("Esta vacio..");
        return;
    }
  
    const task = {
        id: Date.now(),
        text: input.value,
        state: false,
    };

    tasks[task.id] = task;
    
    form.reset();

    input.focus();

    printTasks();

};

const printTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks))

    if (Object.values(tasks).length === 0) {
        taskList.innerHTML = `<div class="alert"><span>No hay tareas pendientes</span></div>`;
        return;
    }

    taskList.innerHTML = "";

    Object.values(tasks).forEach((task) => {

        const clone = template.cloneNode(true);

        clone.querySelector("p").textContent = task.text;
        clone.querySelector(".task_undo_icon").dataset.id = task.id;
        clone.querySelector(".task_check_icon").dataset.id = task.id;
        clone.querySelector(".task_trush_icon").dataset.id = task.id;

        if(task.state){
            clone.querySelector(".task_main").classList.replace("yellow", "green");
            clone.querySelector(".task_check_icon").classList.replace("d-block", "d-none");
            clone.querySelector(".task_undo_icon").classList.replace("d-none", "d-block");
            clone.querySelector("p").classList.add("line-through");
        } else {
            clone.querySelector(".task_main").classList.replace("green", "yellow");
            clone.querySelector(".task_check_icon").classList.replace("d-none", "d-block");
            clone.querySelector(".task_undo_icon").classList.replace("d-block", "d-none");   
        }

        fragment.appendChild(clone);

    });

    taskList.appendChild(fragment);
};

const btnAction = (e) => {
    if (e.target.classList.contains("task_check_icon")) {
        tasks[e.target.dataset.id].state = true;
        printTasks();
    }

    if (e.target.classList.contains("task_undo_icon")) {
        tasks[e.target.dataset.id].state = false;
        printTasks();
    }

    if (e.target.classList.contains("task_trush_icon")) {
        delete tasks[e.target.dataset.id];
        printTasks();  
    }

    e.stopPropagation();
};