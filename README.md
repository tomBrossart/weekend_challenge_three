# weekend_challenge_three

FRIDAY
[X] inital files/folder setup and logging
[X] verify db connection --
[X] sketch basic visual
[X] psuedo code logic
[X] create click liteners

SATURDAY MORNING
[X] createTask() -- insert to db and call refreshTasks
[X] markComplete() -- change Class and update db
[X] deleteTask() -- delete from db and call refreshTasks
[X] plan CSS


SATURDAY AFTERNOON
[ ] implement CSS
  [X] find iphone outline to append items inside of
  [X] get outline centered on screen
  [ ] find illustration for checkmark and trashcan
  [X] absolute position app header
  [X] absolute position "Add Task" btn and input field at bottom
  [X] format table to display rows full width with same color background
  [X] get buttons in same TD
  [X] update marked complete css styling -- remove button, gray background and slight opacity
  [X] why isn't delete working right away?
[ ] create an 'are you sure: yes / no' option when deleting a task.
<!-- [ ] ADD JQUERY UI SCRIPT -->
[ ] figure out scrollbox for tasks
[X] if empty input throw alert
[X] Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.
  ** going to sort by class
  ** client side logic...



LESSONS
  * renaming table and columns in db
  * learning about CRUD and how to seperate functions
  * Not effective to update CSS in markComplete click listener because that triggers Put request --> Get request --> refresh appendToDom
  * careful setting height for table, produced strange results where rows kept filling all available space
  * In future want to try refactoring this to use <ul>and<li> instead of table -- simialr to JS/jQuery book -- curious about how appending and styling would change
    * Interesting how much of this is learning about what properties/methods/frameworks that already exist and then applying it to my current problem -- steep syntax learning curve, and then lots of exploration and iteration
  * CSS styling still feels like flailing, I want to keep building a base knowledge so that I can plan more, and practice returning to that plan when I fall down CSS rabbit holes.

  QUESTIONS
    * What is "ERROR:  duplicate key value violates unique constraint "id" in postico? And then if I execute the command several times it will insert
    * got stuck trying to add jquery-ui dialog so just used alert instead. Lots of questions about how to use dialog correctly
      RELATED THINGS TO REVIEW: https://jqueryui.com/dialog/
      https://stackoverflow.com/questions/887029/how-to-implement-confirmation-dialog-in-jquery-ui-dialog
      https://philipwalton.com/articles/what-no-one-told-you-about-z-index/








-----------------

Welcome to your 3rd-weekend challenge! Full stack is pretty awesome huh? The idea in such a short time, you are able to spin up a full application architecture is pretty incredible.

This weekend is all about showing us that you have a handle on each of the different parts of the full stack. For this weekends challenge, you are going to create a 'TO DO' application. This is the type of application that is very common to tackle when learning a new language, which makes it extremely valuable to work through for the first time, since chances are good that at some point in your career you will tackle this type of application, but in another language.

Here are the specific components for the challenge:

Create a front end experience that allows a user to create a task.
When the task is created, it should be stored inside of a database (SQL)
Whenever a task is created the front end should refresh to show all tasks that need to be completed.
Each task should have an option to 'Complete' or 'Delete'.
When a task is complete, its visual representation should change on the front end (for example, the background of the task container could change from gray to green, as well as the complete option 'checked off'. Each of these are accomplished in CSS, but will need to hook into logic to know whether or not the task is complete)
Whether or not a task is complete should also be stored in the database.
Deleting a task should remove it both from the Front End as well as the Database.
Make sure that you also show us your best styling chops.

We would recommend you spend some time thinking about how to approach this problem. Think through all the logic that will be needed prior to writing any code. Take your time, relax, remember that impostor syndrome is real, and that you are capable of knocking this out of the park!

Additionally, please include some way to recreate your initial database schema. This can be a .sql file with CREATE TABLE statements or you can create your schema automatically when your app loads.

HARD MODE

In whatever fashion you would like, create an 'are you sure: yes / no' option when deleting a task. Once again, you can interrupt this however you would like.

PRO MODE

Adjust the logic so that completed tasks are brought to the bottom of the page, where the remaining tasks left to complete are brought to the top of the list.
