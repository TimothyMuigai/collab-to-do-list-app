const input = document.getElementById("input-task");
const add = document.getElementById("add-task");
const taskList = document.getElementById("tasks-list");
const selectBox = document.getElementById("selectBox");
const form = document.getElementById("form");

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    let inputText = input.value.trim();
    if (inputText === "") {
        alert("Please Enter a Task");
    } else {
        addTaskToList(inputText, false);
        saveTasks();
    }
    input.value = "";
});

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        add.click();
    }
});

const addTaskToList = (inputText, isCompleted = false) => {
    let li = document.createElement("li");
    let span = document.createElement("span");
    li.classList.add("added-task");
    span.textContent = inputText;
    if (isCompleted) {
        span.classList.add("completed");
        editButton.src.style.display="none";
    }
    span.addEventListener('click', () => {
        span.classList.toggle("completed");
        if (span.classList.contains("completed")) {
            editButton.style.display = "none";
        } else {
            editButton.style.display = "inline";
        }
        saveTasks();
    });
    
    let deleteButton = document.createElement("img");
    deleteButton.src = "images/delete.svg";
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
    
    let editButton = document.createElement("img");
    editButton.src = "images/editbutton.svg";
    editButton.addEventListener('click', () => {
        let div = document.createElement("div");
        div.classList.add("editbox");
        let textarea = document.createElement("input");
        textarea.value = span.textContent;
        textarea.addEventListener('keypress', (e) => {
            if (e.key === "Enter") {
                updateButton.click();
            }
        });
        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.id = "update-task";
        updateButton.addEventListener('click', () => {
            span.textContent = textarea.value;
            div.remove();
            saveTasks();
        });
        div.appendChild(textarea);
        div.appendChild(updateButton);
        li.appendChild(div);
    });
    
    li.appendChild(span);
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
};

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#tasks-list li").forEach((task) => {
        tasks.push({
            text: task.querySelector("span").textContent,
            completed: task.querySelector("span").classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((task) => addTaskToList(task.text, task.completed));
}

loadTasks();

selectBox.addEventListener('change', () => {
    const filter = selectBox.value;
    document.querySelectorAll("#tasks-list li").forEach((task) => {
        const isCompleted = task.querySelector("span").classList.contains("completed");
        switch (filter) {
            case "complete":
                task.style.display = isCompleted ? "flex" : "none";
                break;
            case "inComplete":
                task.style.display = !isCompleted ? "flex" : "none";
                break;
            default:
                task.style.display = "flex";
                break;
        }
    });
});