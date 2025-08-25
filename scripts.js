const to_do = document.querySelector(".container_to_do");
const back = document.getElementById("back");
const add = document.getElementById("add");
const text = document.getElementById("text");
const next = document.getElementById("next");
let page = 0;           // Página actual
const perPage = 7;    // Tareas por página



document.addEventListener("DOMContentLoaded", () => {
    renderTasks();
})

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

add.addEventListener("click",addTask);
add.addEventListener("click",()=>{
    const card = document.querySelector(".card:last-child");
    card.classList.add("animated");
})
text.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
        const card = document.querySelector(".card:last-child");
    card.classList.add("animated");
    }
});
function addTask() {
const textValue = text.value.trim(); 

if(textValue === "") return;

    const task = {
        id: Date.now(),
        text: textValue
    };

    saveLocalTasks(task);
    renderTasks();
    text.value = "";
}


console.log(new Date().toLocaleTimeString());

function createTask(task) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <p>${task.text}</p>
        <div class="date">        
        <span>${new Date().toLocaleDateString()}
        </span>
        <span>
        ${new Date().toLocaleTimeString()}
        </span>
        </div>
        <button class="delete submit">❌</button>
        
    `;
    renderRemove(task, card);
}

function renderRemove  (task, card) {
card.querySelector(".delete").addEventListener("click", () => {
        card.classList.remove("animated");
        card.classList.add("animated_out");
        setTimeout(() => {
            card.remove()
            deleteLocalTask(task.id);
        }, 500); // Esperar a que termine la animación
    });
    to_do.appendChild(card);
}


function deleteLocalTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function saveLocalTasks(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks)) || [];
}