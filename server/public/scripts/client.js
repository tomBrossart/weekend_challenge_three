
$(document).ready(function(){
  console.log('jQuery sourced.');
  addClickHandlers();
  refreshTasks();
});

function appendToDom(tasks) {
  $('#taskList').empty();
  for(var i = 0; i < tasks.length; i+= 1) {
    var task = tasks[i];
    var $tr = $('<tr></tr>');
    $tr.data('task', task);
    $tr.append('<td>' + task.tasks + '</td>');
    $tr.append('<td><button class="mark ' + task.status + '">Mark Complete</button></td>');
    $tr.append('<td><button class= "deleteBtn" data-taskid="'+ task.id +'">Delete</button></td>');
    $('#taskList').append($tr);
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
    var taskId = $(this).data('taskid');
    console.log($(this));
    console.log('Delete task with id of', taskId);
    // deleteTask(taskId); CREATE THIS SATURDAY
  });

  // Function called when edit button is clicked
  $('#taskList').on('click', '.mark', function(){
    // Set editng to true, used when we submit the form
    // editingBook = true;
    // We attached the entire book object as data to our table row
    // $(this).parent() is the <td>
    // $(this).parent().parent() is the <tr> that we attached our data to
    // var selectedBook = $(this).parent().parent().data('book');
    // console.log(selectedBook);
    // editingBookId = selectedBook.id;
    console.log("complete clicked");
    $(this).hide();
    $(this).parent().parent().addClass('marked');

    // Set the form values to the thing we're editing
    // $('#author').val(selectedBook.author);
    // $('#title').val(selectedBook.title);
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
      console.log("checking type", typeof response, typeof response.tasks, typeof response.tasks.tasks);
      appendToDom(response.tasks);
    }
  });
}
//
// // UPDATE a.k.a. PUT
// function updateBook(bookToUpdate) {
//   // YOUR AJAX CODE HERE
//   $.ajax({
//     type: 'PUT',
//     url: '/tasks',
//     data: bookToUpdate,
//     success: function(response) {
//       console.log("Put response", response);
//       refreshBooks();
//     }
//   });
// }
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
//       refreshBooks();
//     }
//   });
//
// }
//
// // Append array of books to the DOM
