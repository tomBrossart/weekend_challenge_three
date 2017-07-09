
$(document).ready(function(){
  console.log('jQuery sourced.');
  addClickHandlers();
  refreshTasks();
});

function appendToDom(tasks) {
  $('#taskList').empty();
  for(var i = 0; i < tasks.length; i+= 1) {
    var task = tasks[i];
    var $tr = $('<tr data-taskid="' + task.id + '"></tr>');
    // $tr.data('task', task);
    $tr.append('<td class="task ' + task.status + '">' + task.tasks + '</td>');
    // if task is already complete just add Delete button
    if(task.status == "complete") {
      $tr.append('<td><button class= "deleteBtn" data-taskid="'+ task.id +'">Delete</button></td>');
      $('#taskList').append($tr);
    }
    // otherwise add Done and Delete button
    else {
      $tr.append('<td><button class="mark ' + task.status + '">Done</button>' +
      '<button class= "deleteBtn" data-taskid="'+ task.id +'">Delete</button></td>');
      //  incomplete tasks go to top of table
      $('#taskList').prepend($tr);
    }
  }
}

// this function listens for clicks on btns: add, delete, and done
function addClickHandlers() {
  console.log('Listeners added.');
  // Function called when the add button is clicked
  $('#addBtn').on('click', function(){
    console.log('Add button clicked.');
    var newTask = {};
    newTask.task = $('#task').val();
    newTask.status = 'incomplete';
    // make sure there is input to add to database
    if(newTask.task === '') {
      alert("Please enter a task to add!");
    }
    else{
      addTask(newTask);
      $('input').val('');
    }
  });

  // Function called when delete button is clicked
  $('#taskList').on('click', '.deleteBtn', function(){
    // We attached the bookid as data on our button
    var taskId = $(this).parent().parent().data('taskid');
    console.log($(this));
    console.log('Delete task with id of', taskId);
    // verify user intent to delete
    if (confirm("Are you sure you want to delete this task?")) {
    deleteTask(taskId);
    }
    else { }
    // NOT WORKING CORRECTLY -- to be refactored in future
    // ConfirmDialog('Are you sure you want to delete this task?');
  });

  // Function called when edit button is clicked
  $('#taskList').on('click', '.mark', function(){
    // create deleivery object to go from client to server
    var updatedTask = {};
    // store task ID and status as properties in that object
    updatedTask.id = $(this).parent().parent().data('taskid');
    updatedTask.status = "complete";
    console.log("updatedTask", updatedTask);
    // call markComplete for PUT request
    markComplete(updatedTask);
  });
} // end of click handlers

// CREATE a.k.a. POST a.k.a. INSERT
function addTask(taskToAdd) {
  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: taskToAdd,
    success: function(response) {
      console.log('Response from server.');
      refreshTasks();
    }
  });
}

// READ a.k.a. GET a.k.a. SELECT
function refreshTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks',
    success: function(response) {
      console.log("GET response", response.tasks);
      // checking typeof response, confusion on array vs object response
      console.log("checking type", typeof response, typeof response.tasks, typeof response.tasks.tasks);
      appendToDom(response.tasks);
    }
  });
}

// UPDATE a.k.a. PUT
function markComplete(task) {
  $.ajax({
    type: 'PUT',
    url: '/tasks',
    data: task,
    success: function(response) {
      console.log("Put response", response);
      refreshTasks();
    }
  });
}

// DELETE
function deleteTask(taskId) {
  // When using URL params, your url would be...
  // '/tasks/' + bookId
  // YOUR AJAX CODE HERE
  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + taskId,
    success: function(response) {
      console.log("Delete response", response);
      refreshTasks();
    }
  });
}

// COMMENTED OUT BECAUSE COULDN'T GET TO WORK
//confirm if user wants to delete task
// function ConfirmDialog(message) {
//   $('<div id="dialog"></div>').appendTo('body').html('<div id="dialog"><h6>' + message + '?</h6></div>')
//   .dialog({
//     modal: true, title: 'Delete message',
//     zIndex: 99999,
//     autoOpen: true,
//     width: 300,
//     height: 'auto',
//     resizable: false,
//     buttons: {
//       Yes: function() {
//         // this might be a scope issue with taskId
//         deleteTask(taskId);
//       },
//       No: function() {
//         $(this).dialog("close");
//       }
//     },
//     close: function (event, ui) {
//       $(this).remove();
//     }
//   }); //end of dialog
// } // end of ConfirmDialog
