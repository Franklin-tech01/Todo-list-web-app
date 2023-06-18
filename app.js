document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-button").addEventListener("click", login);
  document.getElementById("add-task-button").addEventListener("click", addTask);
  document.getElementById("logout-button").addEventListener("click", logout);
});

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Check if username and password are valid (in this case, any non-empty values)
  if (username && password) {

    var currentUsername = localStorage.getItem("username")
    var currentPassword = localStorage.getItem("password")

    if (  currentUsername && currentUsername !== username ){
      localStorage.clear();// Clear the localStorage if the usernames are different
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.location.href = "Todo.html";
  } else {
    alert("Invalid username or password!");
  }

  
}

function logout() {
  window.location.href = "index.html";
}

const taskInput = document.getElementById("taskInput");
const listItems = document.getElementById("list-items");

// Retrieve the todo list from localStorage, if available
var savedData = localStorage.getItem("data");
if (savedData) {
  listItems.innerHTML = savedData;
}

// function to add task
function addTask() {
  if (taskInput.value === "") {
    alert("Input cannot be empty!!!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = taskInput.value;
    listItems.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }

  taskInput.value = "";
  saveData();
}

listItems.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listItems.innerHTML);
}