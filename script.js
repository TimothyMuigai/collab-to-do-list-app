      
let input = document.getElementById("input-task");
let add = document.getElementById("add-task");
let taskList = document.getElementById("tasks-list");

input.addEventListener('keypress', (e) => {
    if (e.key === "Enter") {
        add.click();
    }
});

// Add task 
add.addEventListener('click', () => {
    let inputText = input.value.trim();
    if (inputText === "") {
        alert("Please Enter a Task");
    } else {
        addTaskToList(inputText, false); 
        saveTasks();
    }
    input.value = "";
});

 addTaskToList=(inputText, isCompleted = false)=> {
    let li = document.createElement("li");

    let span = document.createElement("span");
    span.textContent = inputText;
    if (isCompleted) {
        span.classList.add("completed");
    }

    // Toggle 
    span.addEventListener('click', () => {
        span.classList.toggle("completed");
        saveTasks();
    });

   
    // Delete
    let deleteButton = document.createElement("img");
    deleteButton.src = "images/delete.svg";
    deleteButton.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });
