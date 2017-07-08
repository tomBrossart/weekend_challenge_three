
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
    $tr.data('task', task);
    $tr.append('<td class="' + task.status + '">' + task.tasks + '</td>');
    if(task.status == "complete") {
      $tr.append('<p>Donezo!</p>');
    }
    else {
    $tr.append('<td><button class="mark ' + task.status + '">Mark Complete</button></td>');
    }
    $tr.append('<td><button class= "deleteBtn" data-taskid="'+ task.id +'">Delete</button></td>');
    $('#taskList').append($tr);
  //  if task.status = complete {append check mark}
  // else {append button}           ($('button[class]'))
  }
}


// OLD CODE
function addClickHandlers() {
  console.log('Listeners added.');
  // Function called when the submit button is clicked
  $('#addBtn').on('click', function(){
    console.log('Add button clicked.');
    var newTask = {};
    newTask.task = $('#task').val();
    newTask.status = 'incomplete';
    addTask(newTask);
    $('input').val('');
  });

  // Function called when delete button is clicked
  $('#taskList').on('click', '.deleteBtn', function(){
    // We attached the bookid as data on our button
    var taskId = $(this).parent().parent().data('taskid');
    console.log($(this));
    console.log('Delete task with id of', taskId);
    // deleteTask(taskId); CREATE THIS SATURDAY
  });

  // Function called when edit button is clicked
  $('#taskList').on('click', '.mark', function(){
    // create deleivery object to go from client to server
    var updatedTask = {};
    // store task ID and status as properties in that object
    updatedTask.id = $(this).parent().parent().data('taskid');
    updatedTask.status = "complete";
    // // update CSS to make task appear marked
    // $(this).parent().parent().addClass('marked');
    console.log("updatedTask", updatedTask);
    // remove the Mark Done btn
    // NOT EFFECTIVE TO HIDE BUTTON HERE BECAUSE markComplete will run refreshTasks which will run appendToDom
    // $(this).hide();
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

// // DELETE
// function deleteBook(bookId) {
//   // When using URL params, your url would be...
//   // '/tasks/' + bookId
//   // YOUR AJAX CODE HERE
//   $.ajax({
//     type: 'DELETE',
//     url: '/tasks/' + bookId,
//     success: function(response) {
//       console.log("Delete response", response);
//       refreshTasks();
//     }
//   });
//
// }
//
// // Append array of books to the DOM
