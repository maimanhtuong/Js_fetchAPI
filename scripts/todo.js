"use strict";

const task = document.getElementById("input-task");
const addTaskBtn = document.getElementById("btn-add");
const owner = getStorage("currentUser").userName;
const isDone = false;
var taskArr = getStorage("taskArr") 

//ADD LISTENER TO ADD BUTTON
addTaskBtn.addEventListener("click", function () {
    console.log(task);
  let newTask = new Task(task.value, isDone, owner);
  if (validate()) {
    taskArr.push(newTask);
    setStorage("taskArr", taskArr);
    task.value = "";
    renderTasks();
  }
});

function validate() {
  if (task.value === "") {
    alert("Task cannot be empty");
    return false;
  }
  return true;
}

//RENDER TASKS
function renderTasks() {
    taskArr = getStorage("taskArr");
    let todoList = document.getElementById("todo-list");
    todoList.innerHTML = "";
    for(let i=0; i<taskArr.length; i++){

        if(taskArr[i].owner === owner){
        todoList.innerHTML += `
        <li class=""  onclick="clickTask(${i})">${taskArr[i].task}<span class="close" onclick="removeTask(${i})">×</span></li>
        `;
        }else{
            todoList.innerHTML += `
            <li style="display: none;">${taskArr[i].task}<span class="close" onclick="removeTask(${i})">×</span></li>
            `;
        }

    };
}
addEventListener("load", renderTasks);

//REMOVE TASK
function removeTask(index) {
    const a = confirm("Are you sure you want to delete this task?");
    if(a){
    taskArr.splice(index, 1);
    setStorage("taskArr", taskArr);
    renderTasks();
    }else{
        return;
    }
}

//RENDER USERNAME
function renderUsername() {
  const  userName = document.getElementById("userName");
    userName.innerHTML ='Todo list of '+ getStorage('currentUser').userName;
}
addEventListener("load", renderUsername);

//CLICK ON TASK
function clickTask(index) {
    console.log(index);
    console.log(taskArr);
    if(taskArr[index].isDone==false){
    taskArr[index].isDone = !taskArr[index].isDone;
    setStorage("taskArr", taskArr);
    renderTasks();
    console.log(document.getElementById("todo-list").children[index]);
    document.getElementById("todo-list").children[index].classList.add("checked");
    }else{
        taskArr[index].isDone = !taskArr[index].isDone;
       setStorage("taskArr", taskArr);
        renderTasks();
        console.log(document.getElementById("todo-list").children[index]);
        document.getElementById("todo-list").children[index].classList.remove("checked");

    }
   
    

}




