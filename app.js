const form = document.getElementById("form");
const input = document.getElementById("input");
const taskList = document.getElementById("tasks-list");
const template = document.getElementById("template").content;
const fragment = document.createDocumentFragment();

let tasks = {
    123456778: {
        id: 123456778,
        text: "Tarea #1",
        state: true,
    },
    123456779: {
        id: 123456779,
        text: "Tarea #2",
        state: false,
    },
};

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tasks")){
        tasks = JSON.parse(localStorage.getItem("tasks"))
    }

   printTasks();
});

taskList.addEventListener("click", (event) => {
    //btnAction(event);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log(event.target[0].value);

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
    console.log(tasks);

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

        if(task.state){
            clone.querySelector(".task_main").classList.replace("yellow", "green");
            clone.querySelector(".task_check_icon").classList.replace("d-block", "d-none");
            clone.querySelector(".task_undo_icon").classList.replace("d-none", "d-block");
        } else {
            clone.querySelector(".task_main").classList.replace("green", "yellow");
            clone.querySelector(".task_check_icon").classList.replace("d-none", "d-block");
            clone.querySelector(".task_undo_icon").classList.replace("d-block", "d-none");   
        }

        fragment.appendChild(clone);

    });

    taskList.appendChild(fragment);
};
