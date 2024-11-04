      
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
 }
 
// add tasks to db.json
const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
        fetch('http://localhost:3000/tasks', {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
                    
        }).then(alert("task added"));
});