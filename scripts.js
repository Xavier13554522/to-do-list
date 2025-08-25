//importaciones del Dom
const to_do = document.querySelector(".container_to_do");
const back = document.getElementById("back");
const add = document.getElementById("add");
const text = document.getElementById("text");
const next = document.getElementById("next");
//Sistema de paginacion
let page = 0;           // Página actual
const perPage = 7;    // Tareas por página


//Para que renderize las tareas que esten en el localstorage si hay
document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
})
//renderiza las tareas y aplica el sistema de paginacion con el slice
function renderTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const start = page * perPage;
    const end = start + perPage;

    
    to_do.innerHTML = "";

    tasks.slice().reverse().slice(start, end).forEach(task => createTask(task));

    back.disabled = page === 0;
    next.disabled = end >= tasks.length;
}

next.addEventListener("click", () => {
    page++;
    renderTasks();
});

back.addEventListener("click", () => {
    if (page > 0) {
        page--;
        renderTasks();
    }
});
//funciones para agregar las tareas con el boton de "+" o presionando el enter
add.addEventListener("click",addTask);
add.addEventListener("click",()=>{
    const card = document.querySelector(".card:first-child");
    card.classList.add("animated");
})
text.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
        const card = document.querySelector(".card:first-child");
    card.classList.add("animated");
    }
});
function addTask() {
const textValue = text.value.trim(); 

if(textValue === "") {
    text.classList.add("error");
    setTimeout(() => {
        text.classList.remove("error");
    }, 500); // Duración de la animación
    return;
}

    const task = {
        id: Date.now(),
        text: textValue
    };

    saveLocalTasks(task);
    renderTasks();
    text.value = "";
}
//Crea la carta de las tareas en el div del container del mismo
function createTask(task) {
    const card = document.createElement("div");
    const p = document.createElement("p");
    p.textContent = task.text;
    card.classList.add("card");
    card.innerHTML = `
    <div class="date">     
    <span>${new Date().toLocaleDateString()}
    </span>
    <span>
    ${new Date().toLocaleTimeString()}
    </span>
    </div>
    <button class="delete submit">❌</button>
    `;
    card.prepend(p);
    renderRemove(task, card);
}
//funcion para eliminar alguna tarea
function renderRemove  (task, card) {
card.querySelector(".delete").addEventListener("click", () => {
        card.classList.remove("animated");
        card.classList.add("animated_out");
        setTimeout(() => {
            card.remove()
            deleteLocalTask(task.id);
            renderTasks()
        }, 500); // Esperar a que termine la animación
    });
    to_do.appendChild(card);
}
//funcion para eliminar las tareas del local storage
function deleteLocalTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
//Funcion para guardar las tareas en el local storage usando push para almacenar las nuevas
function saveLocalTasks(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks)) || [];
}