// // Business Logic for ToDoList ---------
// function ToDoList() {
//   this.tasks = {};
//   this.currentId = 0;
// }

// ToDoList.prototype.addTask = function(task) {
//   task.id = this.assignId();
//   this.tasks[task.id] = task;
// };

// ToDoList.prototype.assignId = function() {
//   this.currentId += 1;
//   return this.currentId;
// };

// ToDoList.prototype.findTask = function(id) {
//   if (this.tasks[id] !== undefined) {
//     return this.tasks[id];
//   }
//   return false;
// };

// ToDoList.prototype.deleteTask = function(id) {
//   if (this.tasks[id] === undefined) {
//     return false;
//   }
//   delete this.tasks[id];
//   return true;
// };

// function Task(task, date, time) {
//   this.task = task;
//   this.date = date;
//   this.time = time;
// }

// // function markTaskAsDoneUI(toDoList) {
// //   toDoList.toggleClass("completed");
// //  }

// function markTaskAsDoneUI(taskId) {
//   $('#' + taskId).addClass('completed');
// }

// // function markAsDone() {
// //    const toDoList = $(this).parent();
// //    markTaskAsDoneUI(toDoList);
// //  }

// function markAsDone() {
//   const taskId = $(this).parent().attr('id');
//   markTaskAsDoneUI(taskId);
// }



// // User Interface Logic ---------
// let toDoList = new ToDoList();

// function displayTaskDetails(toDoListToDisplay) {
//   let taskList = $("ul#task");
//   let checkbox = "checkbox"
//   let htmlForTaskInfo = "";
//   Object.keys(toDoListToDisplay.tasks).forEach(function(key) {
//     const task = toDoListToDisplay.findTask(key);
//     htmlForTaskInfo += "<li id=" + task.id + ">" + task.task + " " + "<input type=" + checkbox + " class='task-checkbox'></input> </li>";
//   });
//   taskList.html(htmlForTaskInfo);
// }

// function showTask(taskId) {
//   const task = toDoList.findTask(taskId);
//   $("#info").show(2000);
//   $(".task").html(task.task);
//   $(".date").html(task.date);
//   $(".time").html(task.time);
//   let buttons = $("#buttons");
//   buttons.empty();
//   buttons.append("<button class='deleteButton' id=" + task.id + ">Delete</button>");
// }

// function attachToDoListListeners() {
//   // $("ul#task").on("click", "li", function() {
//   //   showTask(this.id);
//   // });
//   $("ul#task").on("change", ".task-checkbox", markAsDone);
//   $("ul#task").on("click", "li", function() {
//     showTask(this.id);
//   });

//   $("#buttons").on("click", ".deleteButton", function() {
//     toDoList.deleteTask(this.id);
//     $("#info").hide();
//     displayTaskDetails(toDoList);
//   });
// }

// $(document).ready(function() {
//   attachToDoListListeners();
//   $("form#formOne").submit(function(event) {
//     event.preventDefault();
//     const inputtedTask = $("input#task").val();
//     const inputtedDate = $("input#date").val();
//     const inputtedTime = $("input#time").val();
//     $("input#task").val("");
//     $("input#date").val("");
//     $("input#time").val("");
//     let newTask = new Task(inputtedTask, inputtedDate, inputtedTime);
//     toDoList.addTask(newTask);
//     displayTaskDetails(toDoList);
//   });
// });

// Business Logic for ToDoList ---------
function ToDoList() {
  this.tasks = {};
  this.currentId = 0;
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks[task.id] = task;
};

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

ToDoList.prototype.findTask = function(id) {
  if (this.tasks[id] !== undefined) {
    return this.tasks[id];
  }
  return false;
};

ToDoList.prototype.deleteTask = function(id) {
  if (this.tasks[id] === undefined) {
    return false;
  }
  delete this.tasks[id];
  return true;
};

ToDoList.prototype.markTaskAsDone = function(id) {
  if (this.tasks[id] !== undefined) {
    this.tasks[id].completed = true;
    return true;
  }
  return false;
};

function Task(task, date, time) {
  this.task = task;
  this.date = date;
  this.time = time;
  this.completed = false; // Added 'completed' property to track task completion
}

// User Interface Logic ---------
let toDoList = new ToDoList();

function displayTaskDetails(toDoListToDisplay) {
  let taskList = $("ul#task");
  taskList.empty(); // Clear the task list before re-rendering
  let checkbox = "checkbox"
  let htmlForTaskInfo = "";
  Object.keys(toDoListToDisplay.tasks).forEach(function(key) {
    const task = toDoListToDisplay.findTask(key);
    const completedClass = task.completed ? "completed" : ""; // Add 'completed' class if task is completed
    const checkboxChecked = task.completed ? "checked" : ""; // Add 'checked' attribute if task is completed
    htmlForTaskInfo += `<li id="${task.id}" class="${completedClass}">${task.task}<input type="${checkbox}" class="task-checkbox" ${checkboxChecked}></input></li>`;
  });
  taskList.html(htmlForTaskInfo);
}

function showTask(taskId) {
  const task = toDoList.findTask(taskId);
  $("#info").show(2000);
  $(".task").html(task.task);
  $(".date").html(task.date);
  $(".time").html(task.time);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append(`<button class="deleteButton" id="${task.id}">Delete</button>`);
}

function attachToDoListListeners() {
  $("ul#task").on("click", "li", function() {
    showTask(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    toDoList.deleteTask(this.id);
    $("#info").hide();
    displayTaskDetails(toDoList);
  });
  $(document).on("change", ".task-checkbox", function() {
    const taskId = $(this).parent().attr("id");
    toDoList.markTaskAsDone(taskId);
    displayTaskDetails(toDoList);
  });
}

$(document).ready(function() {
  attachToDoListListeners();
  $("form#formOne").submit(function(event) {
    event.preventDefault();
    const inputtedTask = $("input#task").val();
    const inputtedDate = $("input#date").val();
    const inputtedTime = $("input#time").val();
    $("input#task").val("");
    $("input#date").val("");
    $("input#time").val("");
    let newTask = new Task(inputtedTask, inputtedDate, inputtedTime);
    toDoList.addTask(newTask);
    displayTaskDetails(toDoList);
  });
});
